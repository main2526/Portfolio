"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Download, ExternalLink, X } from "lucide-react";

export default function CvModal() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("Profile");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!show) return;
    const previousOverflow = document.body.style.overflow;
    document.documentElement.setAttribute("data-cv-open", "true");
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setShow(false);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.removeAttribute("data-cv-open");
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  const modal = show && mounted
    ? createPortal(
        <div role="dialog" aria-modal="true" aria-label={t("CVTitle")} className="fixed inset-0 z-[9999] hidden items-center justify-center bg-black/65 p-6 backdrop-blur-md md:flex" onMouseDown={(event) => event.target === event.currentTarget && setShow(false)}>
          <div className="flex h-[82vh] max-h-[760px] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl shadow-black/60">
          <div className="flex min-h-14 shrink-0 items-center justify-between border-b border-[#30363d] bg-[#161b22] px-5 text-white">
            <div className="min-w-0">
              <span className="block truncate text-sm font-semibold sm:text-base">{t("CVTitle")}</span>
              <span className="hidden text-xs text-slate-400 sm:block">PDF</span>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <a href="/cv.pdf" download="Johanny-Rodriguez-CV.pdf" className="focus-ring inline-flex h-8 items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-3 text-sm font-semibold text-[#f0f6fc] hover:bg-[#30363d]" aria-label={t("DownloadFile")}>
                <Download className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{t("DownloadFile")}</span>
              </a>
              <button ref={closeButtonRef} type="button" onClick={() => setShow(false)} className="focus-ring flex size-8 items-center justify-center rounded-md border border-[#30363d] bg-[#21262d] text-white hover:bg-[#30363d]" aria-label={t("Close")}>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 bg-[#21262d] p-3">
            <iframe src="/cv.pdf#toolbar=0&navpanes=0&view=FitH" className="h-full w-full rounded-md border-0 bg-white" title={t("CVTitle")} />
          </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <a href="/cv.pdf" download="Johanny-Rodriguez-CV.pdf" className="focus-ring mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 text-sm font-semibold shadow-sm hover:bg-[#f3f4f6] dark:border-[#30363d] dark:bg-[#21262d] dark:hover:bg-[#30363d] md:hidden">
        <Download className="h-4 w-4" aria-hidden="true" />
        {t("DownloadFile")}
      </a>
      <button type="button" onClick={() => setShow(true)} className="focus-ring mt-4 hidden h-8 w-full items-center justify-center gap-2 rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 text-sm font-semibold shadow-sm hover:bg-[#f3f4f6] dark:border-[#30363d] dark:bg-[#21262d] dark:hover:bg-[#30363d] md:inline-flex">
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        {t("DownloadCV")}
      </button>
      {modal}
    </>
  );
}
