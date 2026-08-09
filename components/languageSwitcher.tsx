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
    <>
      <svg className="pointer-events-none fixed h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="liquid-glass-refraction" x="-20%" y="-50%" width="140%" height="200%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.065" numOctaves={2} seed={8} result="noise" />
            <feGaussianBlur in="noise" stdDeviation="1.2" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale={22} xChannelSelector="R" yChannelSelector="B" result="refracted" />
            <feSpecularLighting in="softNoise" surfaceScale={3} specularConstant={0.7} specularExponent={24} lightingColor="#ffffff" result="shine">
              <feDistantLight azimuth={225} elevation={55} />
            </feSpecularLighting>
            <feComposite in="shine" in2="refracted" operator="in" result="rimLight" />
            <feBlend in="refracted" in2="rimLight" mode="screen" />
          </filter>
        </defs>
      </svg>

      <nav
        aria-label="Language and appearance"
        className="liquid-glass-control fixed right-3 top-3 p-1.5 text-white sm:right-6 sm:top-6"
        style={{ zIndex: 2147483647 }}
      >
        <div className="flex items-center gap-1">
          <ModeToggle />
          <span className="mx-0.5 h-5 w-px bg-white/25" aria-hidden="true" />
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => changeLocale(locale)}
              disabled={locale === currentLocale || isPending}
              aria-current={locale === currentLocale ? "page" : undefined}
              aria-label={`Switch to ${locale === "en" ? "English" : "Español"}`}
              className={`focus-ring min-h-9 min-w-10 rounded-full px-2.5 text-xs font-bold tracking-wide transition sm:px-3 ${locale === currentLocale ? "bg-amber-400/95 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,.65),0_3px_12px_rgba(245,158,11,.25)]" : "text-white/75 hover:bg-white/15 hover:text-white"}`}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
