"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { ModeToggle } from "./ModdeToggle";

const locales = ["en", "es"] as const;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const [isPending, startTransition] = useTransition();
  useEffect(() => { locales.forEach((locale) => { const parts = pathname.split("/"); parts[1] = locale; router.prefetch(parts.join("/") || `/${locale}`); }); }, [pathname, router]);
  useEffect(() => { const cover = document.getElementById("locale-transition-cover"); const frame = requestAnimationFrame(() => requestAnimationFrame(() => cover?.setAttribute("data-active", "false"))); return () => cancelAnimationFrame(frame); }, [pathname]);
  function changeLocale(locale: (typeof locales)[number]) { if (locale === currentLocale || isPending) return; const parts = pathname.split("/"); parts[1] = locale; document.getElementById("locale-transition-cover")?.setAttribute("data-active", "true"); document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`; startTransition(() => router.replace(parts.join("/") || `/${locale}`, { scroll: false })); }
  return (
    <nav aria-label="Language and appearance" className="fixed right-4 top-4 z-50 flex h-8 items-center rounded-md border border-white/15 bg-[#25292e] text-white dark:bg-[#010409] lg:right-8">
      <ModeToggle /><span className="h-5 w-px bg-white/15" />
      {locales.map((locale) => <button key={locale} type="button" onClick={() => changeLocale(locale)} disabled={locale === currentLocale || isPending} aria-current={locale === currentLocale ? "page" : undefined} aria-label={`Switch to ${locale === "en" ? "English" : "Español"}`} className={`focus-ring h-7 min-w-9 rounded-sm px-2 text-xs font-semibold ${locale === currentLocale ? "bg-[#0969da] text-white" : "text-[#f0f6fc] hover:bg-white/10"}`}>{locale.toUpperCase()}</button>)}
    </nav>
  );
}
