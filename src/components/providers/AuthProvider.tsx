"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { InactivityLogoutProvider } from "./InactivityLogoutProvider";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <InactivityLogoutProvider>{children}</InactivityLogoutProvider>
    </SessionProvider>
  );
}
