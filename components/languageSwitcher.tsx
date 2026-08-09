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

  useEffect(() => {
    for (const locale of locales) {
      const segments = pathname.split("/");
      segments[1] = locale;
      router.prefetch(segments.join("/") || `/${locale}`);
    }
  }, [pathname, router]);

  useEffect(() => {
    const cover = document.getElementById("locale-transition-cover");
    const firstFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => cover?.setAttribute("data-active", "false"));
    });
    return () => cancelAnimationFrame(firstFrame);
  }, [pathname]);

  const changeLocale = (newLocale: (typeof locales)[number]) => {
    if (newLocale === currentLocale || isPending) return;

    const segments = pathname.split("/");
    segments[1] = newLocale;
    const nextPath = segments.join("/") || `/${newLocale}`;

    document.getElementById("locale-transition-cover")?.setAttribute("data-active", "true");
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; samesite=lax`;

    startTransition(() => {
      router.replace(nextPath, { scroll: false });
    });
  };

  return (
      <nav aria-label="Language and appearance" className="fixed right-3 top-3 z-50 rounded-full border border-white/15 bg-slate-950/90 p-1.5 text-white shadow-xl backdrop-blur-md sm:right-6 sm:top-6">
        <div className="flex items-center gap-1">
          <ModeToggle />
          <span className="mx-0.5 h-5 w-px bg-white/15" aria-hidden="true" />
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => changeLocale(locale)}
              disabled={locale === currentLocale || isPending}
              aria-current={locale === currentLocale ? "page" : undefined}
              aria-label={`Switch to ${locale === "en" ? "English" : "Español"}`}
              className={`focus-ring min-h-9 min-w-10 rounded-full px-2.5 text-xs font-bold tracking-wide transition sm:px-3 ${locale === currentLocale ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>
  );
}
