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
        <div role="dialog" aria-modal="true" aria-label={t("CVTitle")} className="fixed inset-0 z-[9999] flex flex-col bg-slate-950">
          <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-white/10 bg-slate-900 px-4 text-white sm:px-6">
            <div className="min-w-0">
              <span className="block truncate text-sm font-semibold sm:text-base">{t("CVTitle")}</span>
              <span className="hidden text-xs text-slate-400 sm:block">PDF</span>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <a href="/cv.pdf" download="Johanny-Rodriguez-CV.pdf" className="focus-ring inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm font-semibold text-slate-200 transition-colors hover:border-amber-400 hover:text-amber-400" aria-label={t("DownloadFile")}>
                <Download className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{t("DownloadFile")}</span>
              </a>
              <button ref={closeButtonRef} type="button" onClick={() => setShow(false)} className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950 transition-colors hover:bg-amber-300" aria-label={t("Close")}>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 bg-slate-800 p-0 sm:p-3">
            <iframe src="/cv.pdf#toolbar=0&navpanes=0&view=FitH" className="h-full w-full border-0 bg-white sm:rounded-xl" title={t("CVTitle")} />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button type="button" onClick={() => setShow(true)} className="focus-ring mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-400 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 hover:text-slate-950">
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        {t("DownloadCV")}
      </button>
      {modal}
    </>
  );
}
