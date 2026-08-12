"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="focus-ring relative flex h-7 w-8 items-center justify-center rounded-sm text-[#f0f6fc] hover:bg-white/10" aria-label="Toggle color theme"><Moon className="absolute size-4 scale-0 rotate-90 dark:scale-100 dark:rotate-0" /><Sun className="size-4 scale-100 dark:scale-0" /></button>;
}
