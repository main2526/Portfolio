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
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`focus-ring fixed bottom-4 right-4 z-30 flex size-10 items-center justify-center rounded-md border border-[#d0d7de] bg-[#f6f8fa] text-[#1f2328] shadow-md hover:bg-[#f3f4f6] dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#e6edf3] dark:hover:bg-[#30363d] ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-label="Back to top">
      <FaArrowUp aria-hidden="true" />
    </button>
  );
}
