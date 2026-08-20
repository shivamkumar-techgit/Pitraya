"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Clock } from "lucide-react";

interface InactivityContextType {
  lastActiveTime: number;
  resetTimer: () => void;
}

const InactivityContext = createContext<InactivityContextType>({
  lastActiveTime: Date.now(),
  resetTimer: () => {},
});

export const useInactivity = () => useContext(InactivityContext);

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 Minutes
const WARNING_THRESHOLD_MS = 14 * 60 * 1000; // Warning at 14 minutes (1 min remaining)

export function InactivityLogoutProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [lastActiveTime, setLastActiveTime] = useState<number>(() => Date.now());
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    setLastActiveTime(Date.now());
    if (showWarning) {
      setShowWarning(false);
    }
  };

  useEffect(() => {
    if (status !== "authenticated" || !session) return;

    const activityEvents = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    let throttled = false;
    const handleActivity = () => {
      if (!throttled) {
        resetTimer();
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, 1000);
      }
    };

    activityEvents.forEach((evt) => {
      window.addEventListener(evt, handleActivity, { passive: true });
    });

    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - lastActiveTime;

      if (elapsed >= INACTIVITY_TIMEOUT_MS) {
        clearInterval(checkInterval);
        signOut({ callbackUrl: "/login?reason=inactivity" });
      } else if (elapsed >= WARNING_THRESHOLD_MS) {
        const remaining = Math.max(0, Math.ceil((INACTIVITY_TIMEOUT_MS - elapsed) / 1000));
        setSecondsRemaining(remaining);
        setShowWarning(true);
      } else {
        if (showWarning) setShowWarning(false);
      }
    }, 1000);

    return () => {
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, handleActivity);
      });
      clearInterval(checkInterval);
    };
  }, [status, session, lastActiveTime, showWarning]);

  return (
    <InactivityContext.Provider value={{ lastActiveTime, resetTimer }}>
      {children}

      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-amber-950/90 border border-amber-500/50 text-amber-100 shadow-xl backdrop-blur-xl max-w-sm font-sans"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-serif text-amber-200 uppercase tracking-wider">
                  Inactivity Warning
                </h4>
                <p className="text-xs text-amber-200/80">
                  You have been inactive. For business security, your session will auto logout in{" "}
                  <strong className="text-amber-400 font-mono">{secondsRemaining}s</strong>.
                </p>
                <button
                  onClick={resetTimer}
                  className="w-full py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition cursor-pointer"
                >
                  Stay Logged In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </InactivityContext.Provider>
  );
}
