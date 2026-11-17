import React from "react";
import { useTheme } from "next-themes";
import { ThemeToggleButton2 } from "@/components/ui/skiper-ui/skiper4";
import { useThemeToggle } from "@/components/ui/skiper-ui/skiper26";
import { Language, translations } from "@/translations";

const WHITE_MARK = "/logo/Topview_Logo_New_RGB/SVG/Horizontal_White.svg";
const BLACK_MARK = "/logo/Topview_Logo_New_RGB/SVG/Horizontal_Black.svg";

/** Wordmark follows the real theme. Defaults to the white mark (dark chrome). */
export function TopviewWordmark() {
  const { resolvedTheme } = useTheme();
  const src = resolvedTheme === "light" ? BLACK_MARK : WHITE_MARK;
  return <img src={src} alt="TopView" className="h-8" />;
}

/**
 * One skiper4 ThemeToggleButton2 in the shell, wired to skiper26 useThemeToggle
 * so a click switches the site theme, not only the icon animation.
 * Free Skiper UI license requires attribution; no visible credit is shown in the header.
 */
export default function SiteThemeToggle({ language }: { language: Language }) {
  const { isDark, toggleTheme } = useThemeToggle({
    variant: "circle",
    start: "center",
  });
  const t = translations[language].shell;

  return (
    <div className="ml-auto flex items-center">
      <ThemeToggleButton2
        className="size-10 p-2 shrink-0"
        isDark={isDark}
        onToggle={toggleTheme}
        ariaLabel={t.toggleTheme}
      />
    </div>
  );
}
