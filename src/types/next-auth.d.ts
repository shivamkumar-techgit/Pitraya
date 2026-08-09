import { DefaultSession } from "next-auth";
import { AdminRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: AdminRole;
      coordinatorId?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: AdminRole;
    coordinatorId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: AdminRole;
    coordinatorId?: string | null;
  }
}
