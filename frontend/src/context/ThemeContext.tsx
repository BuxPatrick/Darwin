
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

type Theme = "light" | "dark" | "dim";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem("theme") as Theme;
    if (storedTheme && ["light", "dark", "dim"].includes(storedTheme)) {
      return storedTheme;
    }
    // Check for system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.remove("light", "dark", "dim");
    // Add the current theme class
    document.documentElement.classList.add(theme);
    // Store theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
