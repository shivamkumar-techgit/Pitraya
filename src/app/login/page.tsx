"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Mail, Eye, EyeOff, KeyRound, AlertCircle, Loader2, Sparkles, HelpCircle } from "lucide-react";
import { PitrayaLogoEmblem } from "@/components/common/Logo";

const PRESET_USERS = [
  { role: "Super Admin", email: "superadmin@rituals.com", pass: "SuperAdmin123!", color: "from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30" },
  { role: "Admin", email: "admin@rituals.com", pass: "Admin123!", color: "from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30" },
  { role: "Accountant", email: "accountant@rituals.com", pass: "Accountant123!", color: "from-teal-500/20 to-cyan-500/20 text-teal-300 border-teal-500/30" },
  { role: "Coordinator", email: "coordinator@rituals.com", pass: "Coordinator123!", color: "from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/30" },
  { role: "Operator", email: "operator@rituals.com", pass: "Operator123!", color: "from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/30" },
];

function AdminLoginPageContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const reason = searchParams.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      window.location.href = callbackUrl;
    }
  }, [status, session, callbackUrl]);

  const handleLoginWithCredentials = async (loginEmail: string, loginPass: string) => {
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPass.trim();

    if (!cleanEmail || !cleanPass) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email: cleanEmail,
        password: cleanPass,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please check your credentials.");
      } else if (res?.ok) {
        window.location.assign(callbackUrl);
      }
    } catch (err) {
      console.error("Login exception:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLoginWithCredentials(email, password);
  };

  const handlePresetSelect = async (presetEmail: string, presetPass: string) => {
    setEmail(presetEmail);
    setPassword(presetPass);
    await handleLoginWithCredentials(presetEmail, presetPass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 md:py-12 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md space-y-6"
      >
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-lg shadow-amber-500/5 mb-1">
            <PitrayaLogoEmblem size={52} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-serif text-amber-100 uppercase">
            Pitraya Admin Portal
          </h1>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto">
            Sacred Concierge Operations & Lineage Management
          </p>
        </div>

        {/* Card Form */}
        <div className="p-6 md:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-xl shadow-2xl space-y-6">
          {reason === "inactivity" && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-700/60 text-amber-200 text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>You were automatically logged out due to inactivity.</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/50 text-red-200 text-xs flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="login-email-input" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="login-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rituals.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/70 border border-neutral-700/80 rounded-xl text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password-input" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-amber-400 hover:text-amber-300 transition hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="login-password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-neutral-950/70 border border-neutral-700/80 rounded-xl text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Log In to Dashboard</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Quick Demo Presets (Dev Environment Only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1 font-semibold text-neutral-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Demo Quick Logins:
                </span>
                <span className="text-[11px] text-neutral-500">Click role to auto fill</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_USERS.map((p) => (
                  <button
                    key={p.role}
                    type="button"
                    onClick={() => handlePresetSelect(p.email, p.pass)}
                    className={`p-2.5 rounded-xl border text-left bg-gradient-to-br ${p.color} hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer`}
                  >
                    <p className="font-semibold text-xs">{p.role}</p>
                    <p className="text-[10px] opacity-75 truncate">{p.email}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-neutral-500">
          Protected by NextAuth.js JWT & Bcrypt Role Authorization
        </p>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-amber-400 text-xs">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      }
    >
      <AdminLoginPageContent />
    </Suspense>
  );
}
