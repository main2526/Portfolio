"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

export default function CvToast() {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("Profile");

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desactiva scroll
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // ESC para cerrar
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false);
    };
    if (show) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [show]);

  const handleOpen = () => {
    if (isMobile) {
      const link = document.createElement("a");
      link.href = "/cv.pdf";
      link.download = "CV.pdf";
      link.target = "_blank";
      link.click();
    } else {
      setShow(true);
    }
  };

  return (
    <>
      {/* Botón */}
      <button onClick={handleOpen}>{t("DownloadCV")}</button>

      {/* Modal solo visible en desktop */}
      {show && (
        <div
          className="fixed inset-0 z-50 hidden sm:flex items-center h-screen justify-center bg-blue-950/60 backdrop-blur-sm px-4"
          onClick={() => setShow(false)}
        >
          <div
            className="relative w-full max-w-6xl shadow-lg border border-black bg-white/90 dark:bg-blue-900/90 backdrop-blur-md overflow-hidden transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-secondary text-primary flex items-center justify-center shadow transition"
              title="Cerrar"
            >
              <X size={22} strokeWidth={2} />
            </button>

            {/* PDF */}
            <div className="w-full h-[85vh]">
              <iframe
                src="/cv.pdf"
                className="w-full h-full border-0"
                title="CV"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
