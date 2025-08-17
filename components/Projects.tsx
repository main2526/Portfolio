"use client";

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
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
    technologies: [
      "React",
      "Next js",
      "PrismaORM",
      "TypeScript",
      "Api DeepSeek",
    ],
    github: "https://github.com/main2526/chatbot-api-key",
    demo: "https://bootschatbot.vercel.app/",
  },
  {
    titleKey: "chatbotAI.name",
    descriptionKey: "chatbotAI.description",
    technologies: ["React", "Next JS", "TypeScript", "Framer Motion"],
    github: "https://github.com/main2526/current-stock",
    demo: "https://bloxstock.vercel.app/",
  },
];

export default function Projects() {
  const t = useTranslations("Projects");
  const tPr = useTranslations("TitleP");
  const tShow = useTranslations("Watch");

  return (
    <section className="section mb-16">
      <h2 className="section-title text-3xl mb-8 text-slate-800 dark:text-slate-200 text-center relative  pb-4">
        {tPr("Pr")}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-yellow-500"></div>
      </h2>

      <div className="projects-grid space-y-12 mt-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 p-6 sm:p-10 transition-all duration-300 hover:border-yellow-500 hover:shadow-xl relative group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>

            <h3 className="project-title whitespace-nowrap text-2xl sm:text-3xl text-slate-800 dark:text-slate-200 mb-4 tracking-wide ">
              {t(project.titleKey)}
            </h3>

            <p className="project-description text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6 text-justify break-words">
              {t(project.descriptionKey)}
            </p>

            <div className="project-tech flex flex-wrap gap-3 mb-8">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="tech-tag bg-slate-800 dark:bg-slate-700 text-white dark:text-gray-200 px-4 py-2 text-sm font-medium tracking-wide border border-slate-800 dark:border-slate-700 transition-all duration-300 whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-links flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={project.github}
                className="project-link flex items-center gap-3 text-slate-800 dark:text-slate-200  text-base py-3 px-6 border-2 border-slate-800 dark:border-slate-200 transition-all duration-300 hover:bg-slate-800 hover:text-white dark:hover:bg-white dark:hover:text-slate-800 hover:shadow-lg whitespace-nowrap"
              >
                <FaGithub />
                {tShow("Github")}
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={project.demo}
                className="project-link flex items-center gap-3 text-slate-800 dark:text-slate-200 text-base py-3 px-6 border-2 border-slate-800 dark:border-slate-200 transition-all duration-300 hover:bg-slate-800 hover:text-white dark:hover:bg-white dark:hover:text-slate-800 hover:shadow-lg whitespace-nowrap"
              >
                <FaExternalLinkAlt />
                {tShow("Preview")}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
