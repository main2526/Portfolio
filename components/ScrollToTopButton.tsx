"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-2 z-50 p-3  shadow-md transition-all duration-300  cursor-pointer ease-in-out transform ${
        visible
          ? "opacity-100 bg-yellow-500 hover:bg-yellow-600 text-white"
          : "opacity-0 pointer-events-none"
      }`}
      aria-label="Volver arriba"
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
}
