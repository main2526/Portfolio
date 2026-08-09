"use client";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useTranslations } from "next-intl";

const projects = [
  {
    titleKey: "swiftStake.name",
    descriptionKey: "swiftStake.description",
    technologies: ["React", "Next.js", "TypeScript"],
    github: "https://github.com/main2526/SwiftStake",
    demo: "https://swiftstake.vercel.app/",
  },
  {
    titleKey: "landingTurtle.name",
    descriptionKey: "landingTurtle.description",
    technologies: ["React", "Next.js", "Prisma ORM", "TypeScript", "DeepSeek API"],
    github: "https://github.com/main2526/bootsportal.git",
    demo: "https://bootsportal.vercel.app/",
  },
  {
    titleKey: "chatbotAI.name",
    descriptionKey: "chatbotAI.description",
    technologies: ["React", "Next.js", "TypeScript", "Framer Motion"],
    github: "https://github.com/main2526/chatbot-api-key.git",
    demo: "https://bootschatbot.vercel.app/",
  },
];

export default function Projects() {
  const t = useTranslations("Projects");
  const tTitle = useTranslations("TitleP");
  const tWatch = useTranslations("Watch");

  return (
    <section aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-heading">{tTitle("Pr")}</h2>
      <div className="mt-9 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <article key={project.titleKey} className={`surface-card group relative flex flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl sm:p-8 ${index === 0 ? "md:col-span-2" : ""}`}>
            <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-amber-400 to-orange-500 transition-transform duration-300 group-hover:scale-x-100" />
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-600 dark:text-amber-400">0{index + 1}</span>
            <h3 className="break-words text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">{t(project.titleKey)}</h3>
            <p className="mt-4 flex-1 text-base leading-7 text-slate-600 dark:text-slate-300">{t(project.descriptionKey)}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{tech}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 xs:flex-row sm:flex-row">
              <ProjectLink href={project.github} label={tWatch("Github")} icon={<FaGithub />} />
              <ProjectLink href={project.demo} label={tWatch("Preview")} icon={<FaExternalLinkAlt />} primary />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectLink({ href, label, icon, primary = false }: { href: string; label: string; icon: React.ReactNode; primary?: boolean }) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${primary ? "border-amber-500 bg-amber-500 text-slate-950 hover:bg-amber-400" : "border-slate-300 text-slate-800 hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-slate-600 dark:text-slate-200 dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-900"}`}>
      {icon}<span>{label}</span>
    </a>
  );
}
