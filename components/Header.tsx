"use client";

import { useTranslations } from "next-intl";
import { FaCode, FaUserTie } from "react-icons/fa";
import LanguageSwitcher from "@/components/languageSwitcher";
import CvModal from "@/components/CvModal";

export default function Header() {
  const t = useTranslations("Profile");
  const tAvailable = useTranslations("Available");

  return (
    <header className="relative isolate overflow-hidden bg-slate-900 px-4 pb-14 pt-24 text-center text-white sm:px-12 sm:pb-20 sm:pt-20 dark:bg-slate-950">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" />
      <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

      <LanguageSwitcher />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <div className="relative mb-7">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-amber-400 bg-slate-800 text-5xl text-amber-400 shadow-2xl shadow-black/30 sm:h-40 sm:w-40 sm:text-6xl">
            <FaUserTie aria-hidden="true" />
          </div>
          <span className="absolute -bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-amber-400/40 bg-slate-950/90 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-lg backdrop-blur sm:left-auto sm:right-0 sm:translate-x-1/3">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {tAvailable("ava")}
          </span>
        </div>

        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-400 sm:text-sm">
          <FaCode aria-hidden="true" />
          BootsDev-X
        </div>
        <h1 className="signature-name text-balance text-4xl sm:text-6xl md:text-7xl">
          Johanny A. Rodriguez
        </h1>
        <p className="mt-4 text-base font-medium tracking-wide text-amber-400 sm:text-xl">
          {t("Developer")}
        </p>
        <CvModal />
      </div>
    </header>
  );
}
