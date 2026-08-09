import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { AdminRole } from "@prisma/client";
import { verifyPassword } from "./password";
import { createAuditLog } from "./audit";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();
        const password = credentials.password;

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            await createAuditLog({
              action: "FAILED_LOGIN",
              userEmail: email,
            });
            return null;
          }

          // Check Brute Force Account Lockout (5 failed attempts = 15-min lock)
          if (user.lockUntil && user.lockUntil > new Date()) {
            console.warn(`[NextAuth] Account locked for email: ${email} until ${user.lockUntil.toISOString()}`);
            await createAuditLog({
              action: "ACCOUNT_LOCKED",
              userId: user.id,
              userEmail: email,
            });
            throw new Error(`Account locked due to 5 failed login attempts. Try again after 15 minutes.`);
          }

          const isValidPassword = await verifyPassword(password, user.password);

          if (!isValidPassword) {
            const updatedAttempts = (user.failedLoginAttempts || 0) + 1;
            let lockUntil: Date | null = null;

            if (updatedAttempts >= 5) {
              lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15-minute lock
              console.warn(`[NextAuth] 5 failed login attempts for ${email}. Account locked until ${lockUntil.toISOString()}`);
            }

            await prisma.user.update({
              where: { id: user.id },
              data: {
                failedLoginAttempts: updatedAttempts,
                lockUntil,
              },
            });

            await createAuditLog({
              action: "FAILED_LOGIN",
              userId: user.id,
              userEmail: email,
            });

            if (lockUntil) {
              throw new Error("Account locked due to 5 failed login attempts. Try again after 15 minutes.");
            }

            return null;
          }

          // Successful login: reset failed attempts & lock state
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: 0,
              lockUntil: null,
            },
          });

          await createAuditLog({
            action: "LOGIN",
            userId: user.id,
            userEmail: user.email,
          });

          console.log(`[NextAuth Authorize] Success for user: ${email} [${user.role}]`);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            coordinatorId: user.coordinatorId,
          };
        } catch (err) {
          console.error("[NextAuth Authorize] Exception:", err instanceof Error ? err.message : String(err));
          if (err instanceof Error && err.message.includes("Account locked")) {
            throw err;
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 Hours Workday Session Cap
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as AdminRole;
        token.coordinatorId = user.coordinatorId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role as AdminRole;
        session.user.coordinatorId = token.coordinatorId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "rituals_sacred_secret_key_2026_jwt",
};
