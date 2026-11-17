import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type AppThemeProviderProps = {
  children?: React.ReactNode;
  attribute?: "class";
  defaultTheme?: string;
  enableSystem?: boolean;
  storageKey?: string;
};

/** Vite wrapper around next-themes. Sets the theme as a class on <html>. */
const AppThemeProvider = NextThemesProvider as (
  props: AppThemeProviderProps,
) => React.ReactElement;

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="theme"
    >
      {children}
    </AppThemeProvider>
  );
}
