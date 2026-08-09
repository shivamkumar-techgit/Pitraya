export const DESIGN = {
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1440px",
  },

  radius: {
    none: "0px",
    sm: "12px",
    md: "20px",
    lg: "28px",
    xl: "40px",
    full: "9999px",
  },

  animation: {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
    extraSlow: 1.5,
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      extraSlow: "1000ms",
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    },
  },

  colors: {
    gold: {
      primary: "var(--gold-primary)",
      primaryHover: "var(--gold-primary-hover)",
      secondary: "var(--gold-secondary)",
      accent: "var(--gold-accent)",
      rawPrimary: "#D4AF37",
      rawSecondary: "#C5A059",
    },
    background: "var(--background)",
    surface: {
      default: "var(--surface)",
      hover: "var(--surface-hover)",
    },
    border: {
      default: "var(--border)",
      subtle: "var(--border-subtle)",
      gold: "var(--border-gold)",
    },
    text: {
      primary: "var(--text-primary)",
      secondary: "var(--text-secondary)",
      muted: "var(--text-muted)",
    },
    semantic: {
      success: "var(--success)",
      warning: "var(--warning)",
      error: "var(--error)",
    },
    glass: {
      bg: "var(--glass-bg)",
      border: "var(--glass-border)",
    },
  },

  gradients: {
    gold: "var(--gradient-gold)",
    dark: "var(--gradient-dark)",
    surface: "var(--gradient-surface)",
    glass: "var(--gradient-glass)",
  },

  spacing: {
    none: "0px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",
  },

  shadows: {
    none: "none",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    goldGlow: "var(--shadow-gold-glow)",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1440px",
  },

  typography: {
    fontFamily: {
      sans: "var(--font-sans)",
      manrope: "var(--font-manrope)",
      cinzel: "var(--font-cinzel)",
      cormorant: "var(--font-cormorant)",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  },

  zIndex: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

export const DESIGN_TOKENS = DESIGN;

export type Design = typeof DESIGN;
export type DesignTokens = typeof DESIGN_TOKENS;
