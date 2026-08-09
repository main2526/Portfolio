"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 420);
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`focus-ring fixed bottom-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-400 sm:bottom-6 sm:right-6 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`} aria-label="Back to top">
      <FaArrowUp aria-hidden="true" />
    </button>
  );
}
