"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiMysql, SiNextdotjs, SiPostgresql, SiPrisma, SiTailwindcss, SiTypescript } from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: FaJs, category: "frontend" }, { name: "TypeScript", icon: SiTypescript, category: "frontend" },
  { name: "React", icon: FaReact, category: "frontend" }, { name: "Next.js", icon: SiNextdotjs, category: "frontend" },
  { name: "HTML5", icon: FaHtml5, category: "frontend" }, { name: "CSS3", icon: FaCss3Alt, category: "frontend" },
  { name: "Tailwind", icon: SiTailwindcss, category: "frontend" }, { name: "Node.js", icon: FaNodeJs, category: "backend" },
  { name: "MySQL", icon: SiMysql, category: "backend" }, { name: "PostgreSQL", icon: SiPostgresql, category: "backend" },
  { name: "Prisma", icon: SiPrisma, category: "backend" }, { name: "Git", icon: FaGitAlt, category: "tool" }, { name: "GitHub", icon: FaGithub, category: "tool" },
] as const;

const filters = ["all", "frontend", "backend", "tool"] as const;
const years = [2026, 2025, 2024] as const;
const totals: Record<(typeof years)[number], number> = { 2026: 12, 2025: 68, 2024: 1 };
const monthPositions = [0, 4, 8, 13, 17, 21, 26, 30, 34, 39, 43, 48];

function activityFor(year: number, total: number) {
  const cells = Array<number>(371).fill(0);
  let placed = 0;
  let cursor = (year * 19) % cells.length;
  while (placed < total) {
    cursor = (cursor + 29 + (placed % 9) * 7) % cells.length;
    if (cells[cursor] === 0) {
      cells[cursor] = 1 + ((placed * 3 + year) % 4);
      placed += 1;
    }
  }
  return cells;
}

export default function Skills() {
  const [selected, setSelected] = useState<(typeof filters)[number]>("all");
  const [year, setYear] = useState<(typeof years)[number]>(2026);
  const locale = useLocale();
  const t = useTranslations("Skills");
  const shown = selected === "all" ? skills : skills.filter((skill) => skill.category === selected);
  const es = locale === "es";

  return (
    <section aria-labelledby="skills-title">
      <h2 id="skills-title" className="section-heading">{t("title")}</h2>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t("filterLabel")}>
        {filters.map((filter) => (
          <button key={filter} type="button" onClick={() => setSelected(filter)} aria-pressed={selected === filter} className={`focus-ring rounded-md border px-3 py-1.5 text-xs font-semibold shadow-sm ${selected === filter ? "border-[#1f883d] bg-[#1f883d] text-white dark:border-[#238636] dark:bg-[#238636]" : "border-[#d0d7de] bg-[#f6f8fa] hover:bg-[#f3f4f6] dark:border-[#30363d] dark:bg-[#21262d] dark:hover:bg-[#30363d]"}`}>{t(filter)}</button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {shown.map((skill) => { const Icon = skill.icon; return <div key={skill.name} className="flex items-center gap-2 rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1.5 text-xs font-medium dark:border-[#30363d] dark:bg-[#161b22]"><Icon className="size-4 text-[#656d76] dark:text-[#8b949e]" />{skill.name}</div>; })}
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_128px]">
        <div className="min-w-0">
          <div className="mb-2 flex items-center justify-between gap-3 px-1">
            <h3 className="text-base"><strong>{totals[year]}</strong> {es ? `contribuciones en ${year}` : `contributions in ${year}`}</h3>
            <button type="button" className="focus-ring hidden items-center gap-1 rounded-md px-2 py-1 text-xs text-[#656d76] hover:text-[#1f2328] sm:flex dark:text-[#8b949e] dark:hover:text-[#e6edf3]">{es ? "Configuración de contribuciones" : "Contribution settings"}<ChevronDown className="size-3" /></button>
          </div>
          <div className="rounded-md border border-[#d0d7de] p-3 dark:border-[#30363d] sm:p-4">
            <div className="overflow-x-auto pb-1">
              <div className="min-w-[735px]">
                <div className="ml-[39px] grid h-5 grid-cols-[repeat(53,10px)] gap-[3px] text-xs">
                  {(es ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]).map((month, index) => <span key={month} className="whitespace-nowrap" style={{ gridColumnStart: monthPositions[index] + 1 }}>{month}</span>)}
                </div>
                <div className="flex gap-[7px]">
                  <div className="grid w-8 shrink-0 grid-rows-7 gap-[3px] text-right text-xs leading-[10px]">
                    <span /><span>{es ? "Lun" : "Mon"}</span><span /><span>{es ? "Mié" : "Wed"}</span><span /><span>{es ? "Vie" : "Fri"}</span><span />
                  </div>
                  <div className="grid grid-flow-col grid-rows-7 gap-[3px]" aria-label={es ? `Actividad de contribuciones de ${year}` : `${year} contribution activity`}>
                    {activityFor(year, totals[year]).map((level, index) => <span key={`${year}-${index}`} title={level ? `${level} ${es ? "contribuciones" : "contributions"}` : es ? "Sin contribuciones" : "No contributions"} className={`size-[10px] rounded-[2px] border border-black/[.04] ${level === 4 ? "bg-[#39d353]" : level === 3 ? "bg-[#26a641]" : level === 2 ? "bg-[#006d32]" : level === 1 ? "bg-[#0e4429]" : "bg-[#ebedf0] dark:bg-[#161b22]"}`} />)}
                  </div>
                </div>
                <div className="ml-[39px] mt-3 flex items-center justify-between text-xs text-[#656d76] dark:text-[#8b949e]">
                  <span>{es ? "Aprende cómo contamos las contribuciones" : "Learn how we count contributions"}</span>
                  <div className="flex items-center gap-1"><span>{es ? "Menos" : "Less"}</span>{[0, 1, 2, 3, 4].map((level) => <span key={level} className={`size-[10px] rounded-[2px] ${level === 4 ? "bg-[#39d353]" : level === 3 ? "bg-[#26a641]" : level === 2 ? "bg-[#006d32]" : level === 1 ? "bg-[#0e4429]" : "bg-[#ebedf0] dark:bg-[#161b22]"}`} />)}<span>{es ? "Más" : "More"}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto lg:flex-col" aria-label={es ? "Seleccionar año" : "Select year"}>
          {years.map((item) => <button key={item} type="button" onClick={() => setYear(item)} aria-pressed={year === item} className={`focus-ring min-w-24 rounded-md px-4 py-2.5 text-left text-sm lg:w-full ${year === item ? "bg-[#0969da] text-white dark:bg-[#1f6feb]" : "hover:bg-[#f6f8fa] dark:hover:bg-[#161b22]"}`}>{item}</button>)}
        </div>
      </div>
    </section>
  );
}
