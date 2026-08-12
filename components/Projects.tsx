"use client";

import { FaGithub } from "react-icons/fa";
import { ExternalLink, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

const projects = [
  { key: "swiftStake", tech: "TypeScript", color: "#3178c6", github: "https://github.com/main2526/SwiftStake", demo: "https://swiftstake.vercel.app/", locked: false },
  { key: "restaurantFoodDelivery", tech: "TypeScript", color: "#3178c6", github: "https://github.com/main2526/tmeal-restaurant-delicius", demo: "https://tdelicius.vercel.app/", locked: false },
  { key: "chatbotAI", tech: "TypeScript", color: "#3178c6", github: "https://github.com/main2526/chatbot-api-key.git", demo: "https://bootschatbot.vercel.app/", locked: true },
] as const;

export default function Projects() {
  const t = useTranslations("Projects");
  const title = useTranslations("TitleP");
  const watch = useTranslations("Watch");
  return (
    <section aria-labelledby="projects-title">
      <div className="mb-2 flex items-center justify-between"><h2 id="projects-title" className="text-base font-normal">{title("Pr")}</h2><a href="https://github.com/main2526?tab=repositories" target="_blank" rel="noreferrer" className="text-xs text-[#0969da] hover:underline dark:text-[#2f81f7]">View all</a></div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article key={project.key} className="surface-card flex min-h-40 flex-col p-4">
            <div className="flex items-start justify-between gap-3">
              <a href={project.github} target="_blank" rel="noreferrer" className="font-semibold text-[#0969da] hover:underline dark:text-[#2f81f7]">{t(`${project.key}.name`)}</a>
              <span className="rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs text-[#656d76] dark:border-[#30363d] dark:text-[#8b949e]">Public</span>
            </div>
            <p className="mt-3 line-clamp-3 text-xs leading-5 text-[#656d76] dark:text-[#8b949e]">{t(`${project.key}.description`)}</p>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-4 text-xs text-[#656d76] dark:text-[#8b949e]">
              <span className="flex items-center gap-1.5"><span className="size-3 rounded-full" style={{ background: project.color }} />{project.tech}</span>
              <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#0969da]"><FaGithub />{watch("Github")}</a>
              {project.locked ? <span className="flex items-center gap-1"><Lock className="size-3" />{t("chatbotAI.status")}</span> : <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#0969da]"><ExternalLink className="size-3" />{watch("Preview")}</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
