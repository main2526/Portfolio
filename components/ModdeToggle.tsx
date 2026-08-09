"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-full text-slate-200 transition hover:bg-white/10 hover:text-amber-400"
      aria-label="Toggle color theme"
    >
      <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" aria-hidden="true" />
      <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" aria-hidden="true" />
    </button>
  );
}
