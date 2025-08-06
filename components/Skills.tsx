"use client";

import { useState, useRef } from "react";
import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaUnity,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiPrisma,
} from "react-icons/si";
import { useTranslations } from "next-intl";

const allSkills = [
  {
    name: "JavaScript",
    icon: FaJs,
    color: "text-yellow-400",
    category: "frontend",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-blue-600",
    category: "frontend",
  },
  {
    name: "React",
    icon: FaReact,
    color: "text-cyan-400",
    category: "frontend",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-black dark:text-white",
    category: "frontend",
  },
  {
    name: "HTML5",
    icon: FaHtml5,
    color: "text-orange-600",
    category: "frontend",
  },
  {
    name: "CSS3",
    icon: FaCss3Alt,
    color: "text-blue-500",
    category: "frontend",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "text-cyan-500",
    category: "frontend",
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "text-green-600",
    category: "backend",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "text-blue-700",
    category: "backend",
  },
  { name: "MySQL", icon: SiMysql, color: "text-blue-800", category: "backend" },
  {
    name: "Prisma",
    icon: SiPrisma,
    color: "text-slate-700 dark:text-slate-300",
    category: "backend",
  },
  { name: "Git", icon: FaGitAlt, color: "text-orange-500", category: "tool" },
  { name: "GitHub", icon: FaGithub, color: "text-black dark:text-white", category: "tool" },
  {
    name: "Unity",
    icon: FaUnity,
    color: "text-slate-700 dark:text-slate-300",
    category: "tool",
  },
];

const filters = [
  { value: "all" },
  { value: "frontend" },
  { value: "backend" },
  { value: "tool" },
];

export default function Skills() {
  const [selected, setSelected] = useState("all");
  const t = useTranslations("Skills");

  const filteredSkills =
    selected === "all"
      ? allSkills
      : allSkills.filter((skill) => skill.category === selected);

  // Ref para el scroll del carrusel
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollAmount = 200; // px a desplazar por clic

  function scrollLeft() {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }

  function scrollRight() {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  return (
    <section className="section mb-16">
      <h2 className="section-title text-3xl font-bold mb-8 text-slate-800 dark:text-slate-200 text-center relative pb-4 font-serif">
        {t("title")}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-yellow-500"></div>
      </h2>

      {/* Filtro */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelected(filter.value)}
            className={`px-4 py-1 text-sm border-2 transition-all duration-200 ${
              selected === filter.value
                ? "bg-yellow-500 text-white border-yellow-500"
                : "border-gray-300 text-slate-700 dark:text-slate-300 hover:border-yellow-500"
            }`}
          >
            {t(filter.value)}
          </button>
        ))}
      </div>

      {/* CARRUSEL en MOBILE */}
      <div className="relative block sm:hidden">
        {/* Botones de scroll */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-full shadow-md z-10"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-full shadow-md z-10"
        >
          <FaChevronRight />
        </button>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-none space-x-6 px-12"
          style={{ scrollBehavior: "smooth" }}
        >
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="skill-item flex flex-col items-center justify-center mb-4 p-5 min-w-[120px] bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 transition-all duration-300 dark:hover:border-yellow-500 hover:border-yellow-500 hover:shadow-lg group aspect-square flex-shrink-0"
            >
              <skill.icon
                className={`skill-icon text-5xl mb-4 mx-auto transition-transform duration-300 ${skill.color}`}
              />
              <div className="skill-name font-semibold text-slate-800 dark:text-slate-200 text-sm tracking-wide text-center">
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GRID en escritorio */}
      <div className="hidden sm:grid skills-grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mt-8">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="skill-item flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 transition-all duration-300 dark:hover:border-yellow-500 hover:border-yellow-500 hover:shadow-lg group aspect-square"
          >
            <skill.icon
              className={`skill-icon text-6xl mb-4 mx-auto transition-transform duration-300 ${skill.color}`}
            />
            <div className="skill-name font-semibold text-slate-800 dark:text-slate-200 text-sm tracking-wide text-center">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
