"use client";
import { useTranslations } from "next-intl";
import { FaUserTie } from "react-icons/fa";
import LanguageSwitcher from "@/components/languageSwitcher";
import CvModal from "@/components/CvModal";

export default function Header() {
  const t = useTranslations("Profile");
  const tAva = useTranslations("Available");

  return (
    <header className="relative text-center py-12 px-4 sm:py-16 sm:px-12 bg-slate-800 dark:bg-slate-900 text-white dark:text-yellow-400">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />

      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <LanguageSwitcher />
      </div>

      <div className="relative flex flex-col items-center mb-3">
        <div className="relative flex flex-col items-center">
          <div className="profile-img w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 sm:mb-8 bg-slate-700 dark:bg-slate-800 flex items-center justify-center text-5xl sm:text-6xl text-yellow-500 dark:text-yellow-400 border-4 border-yellow-500 dark:border-yellow-400 shadow-lg">
            <FaUserTie />
          </div>

          <div className="relative mt-2 sm:absolute sm:top-4 sm:-right-22 sm:translate-x-[10%] sm:mt-0">
            <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#FFC107_0%,#FF5722_50%,#FFC107_100%)]"></span>
              <div className="inline-flex items-center justify-center px-3 py-1 text-sm bg-gray-800 rounded-full dark:bg-gray-800 dark:text-white/80 backdrop-blur-3xl whitespace-nowrap">
                {tAva("ava")}
              </div>
            </span>
          </div>
        </div>
      </div>

      {/* Nombre */}
      <h1 className="name text-3xl sm:text-5xl mb-2 text-white dark:text-yellow-300 tracking-wide">
        Johanny A. Rodriguez
      </h1>

      <p className="title text-lg sm:text-xl text-yellow-500 dark:text-yellow-400 font-light italic tracking-wide">
        {t("Developer")}
      </p>

      {/* Botón de Descargar CV */}

      <CvModal />
    </header>
  );
}
