"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { ModeToggle } from "./ModdeToggle";
const locales = ["en", "es"];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const changeLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Guarda posición de scroll y preferencias
    const scrollY = window.scrollY;
    localStorage.setItem("locale", newLocale);
    localStorage.setItem("scrollY", scrollY.toString());
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;

    // Cambia de idioma sin perder scroll
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/") || "/";

    router.replace(newPathname); // evita transición innecesaria
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    const savedScrollY = localStorage.getItem("scrollY");

    // Redirigir si el idioma no es válido
    if (savedLocale && !locales.includes(currentLocale)) {
      router.replace(`/${savedLocale}${pathname}`);
    }

    // Restaurar scroll sin parpadeos
    if (savedScrollY) {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedScrollY));
        localStorage.removeItem("scrollY");
      });
    }
  }, [pathname]);

  return (
    <nav className="fixed z-50 top-4 right-4 p-2 bg-black backdrop-blur-md border border-gray-200 dark:border-zinc-700 px-2 py-1 shadow-lg transition-all ">
      <div className="flex items-center gap-1">
        <div>
          <ModeToggle />
        </div>
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => changeLocale(locale)}
            disabled={locale === currentLocale}
            className={`px-3 py-1 text-sm transition-all duration-200 focus:outline-none 
              ${
                locale === currentLocale
                  ? "bg-orange-500 dark:text-black text-white"
                  : "text-gray-200 hover:bg-gray-700"
              }
              disabled:cursor-not-allowed disabled:opacity-70`}
            title={`Switch to ${locale.toUpperCase()}`}
          >
            {locale.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}
