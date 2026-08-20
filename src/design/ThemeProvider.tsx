"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeName } from "./colors";

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // We initialize with a default value, but the actual initial theme
  // is applied by the inline script in layout.tsx to prevent FOUC.
  const [theme, setThemeState] = useState<ThemeName>("sacred-ivory");

  useEffect(() => {
    // Read the current theme from the HTML class set by the inline script
    const isDark = document.documentElement.classList.contains("dark");
    // eslint-disable-next-line
    setThemeState(isDark ? "midnight-sanctuary" : "sacred-ivory");
  }, []);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    const root = document.documentElement;

    if (newTheme === "midnight-sanctuary") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    
    // Save to localStorage for the inline script to read on next load
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "sacred-ivory" ? "midnight-sanctuary" : "sacred-ivory";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
