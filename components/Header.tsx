import { useTranslations } from "next-intl";
import { FaUserTie } from "react-icons/fa";
import LanguageSwitcher from "@/components/languageSwitcher";
import Link from "next/link";
import CvModal from "@/components/CvModal";
export default function Header() {
  const t = useTranslations("Profile");

  return (
    <header className="relative text-center py-12 px-4 sm:py-16 sm:px-12 bg-slate-800 dark:bg-slate-900 text-white dark:text-yellow-400">
      {/* Línea superior decorativa */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />

      {/* Contenedor del idioma */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <LanguageSwitcher />
      </div>

      {/* Imagen de perfil */}
      <div className="profile-img w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 sm:mb-8 bg-slate-700 dark:bg-slate-800 flex items-center justify-center text-5xl sm:text-6xl text-yellow-500 dark:text-yellow-400 border-4 border-yellow-500 dark:border-yellow-400 shadow-lg">
        <FaUserTie />
      </div>

      {/* Nombre */}
      <h1 className="name text-3xl sm:text-5xl font-bold mb-2 text-white dark:text-yellow-300 tracking-wide font-serif">
        Johanny A. Rodriguez
      </h1>

      {/* Título */}
      <p className="title text-lg sm:text-xl text-yellow-500 dark:text-yellow-400 font-light italic tracking-wide">
        {t("Developer")}
      </p>

      {/* Botón de Descargar CV */}
      <div className="inline-block mt-6 px-6 py-2 border border-yellow-500 dark:text-white hover:bg-yellow-500  hover:text-slate-900 dark:hover:text-slate-900 transition-colors duration-300 font-medium ">
        <CvModal />
      </div>
    </header>
  );
}
