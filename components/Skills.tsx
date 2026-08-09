"use client";

import { useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { useTranslations } from "next-intl";

const allSkills = [
  { name: "JavaScript", icon: FaJs, color: "text-yellow-400", category: "frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-500", category: "frontend" },
  { name: "React", icon: FaReact, color: "text-cyan-400", category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-slate-950 dark:text-white", category: "frontend" },
  { name: "HTML5", icon: FaHtml5, color: "text-orange-600", category: "frontend" },
  { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500", category: "frontend" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-500", category: "frontend" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-600", category: "backend" },
  { name: "MySQL", icon: SiMysql, color: "text-sky-600", category: "backend" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-700 dark:text-blue-400", category: "backend" },
  { name: "Prisma", icon: SiPrisma, color: "text-slate-700 dark:text-slate-200", category: "backend" },
  { name: "Git", icon: FaGitAlt, color: "text-orange-500", category: "tool" },
  { name: "GitHub", icon: FaGithub, color: "text-slate-950 dark:text-white", category: "tool" },
];

const filters = ["all", "frontend", "backend", "tool"] as const;

export default function Skills() {
  const [selected, setSelected] = useState<(typeof filters)[number]>("all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Skills");
  const filteredSkills = selected === "all" ? allSkills : allSkills.filter((skill) => skill.category === selected);

  const scroll = (direction: number) => {
    carouselRef.current?.scrollBy({ left: direction * 180, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="skills-title">
      <h2 id="skills-title" className="section-heading">{t("title")}</h2>

      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3" role="group" aria-label={t("filterLabel")}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setSelected(filter)}
            aria-pressed={selected === filter}
            className={`focus-ring rounded-full border px-4 py-2 text-sm font-medium transition ${
              selected === filter
                ? "border-amber-500 bg-amber-500 text-slate-950 shadow-sm"
                : "border-slate-300 bg-white text-slate-700 hover:border-amber-500 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-amber-400 dark:hover:text-white"
            }`}
          >
            {t(filter)}
          </button>
        ))}
      </div>

      <div className="relative mt-8 sm:hidden">
        <button type="button" onClick={() => scroll(-1)} aria-label={t("scrollLeft")} className="focus-ring absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900 p-3 text-amber-400 shadow-lg dark:bg-amber-400 dark:text-slate-950">
          <FaChevronLeft aria-hidden="true" />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label={t("scrollRight")} className="focus-ring absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900 p-3 text-amber-400 shadow-lg dark:bg-amber-400 dark:text-slate-950">
          <FaChevronRight aria-hidden="true" />
        </button>
        <div ref={carouselRef} className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-12 pb-2">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>

      <div className="mt-9 hidden grid-cols-2 gap-4 sm:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: (typeof allSkills)[number] }) {
  const Icon = skill.icon;
  return (
    <div className="surface-card flex aspect-square min-w-32 snap-center flex-col items-center justify-center p-4 sm:min-w-0">
      <Icon className={`mb-3 text-4xl ${skill.color}`} aria-hidden="true" />
      <span className="text-center text-sm font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
    </div>
  );
}
