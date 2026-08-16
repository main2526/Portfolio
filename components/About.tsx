import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("AboutMe");
  return (
    <section aria-labelledby="about-title" className="surface-card p-6">
      <div className="mb-5 border-b border-[#d8dee4] pb-2 text-xs text-[#656d76] dark:border-[#21262d] dark:text-[#8b949e]">main2526 / README.md</div>
      <h2 id="about-title" className="border-b border-[#d8dee4] pb-2 text-2xl font-semibold dark:border-[#21262d]">👋 {t("About")}</h2>
      <p className="mt-4 text-base leading-7">{t("text")}</p>
      <p className="mt-4 text-base leading-7">{t("text2")}</p>
      <blockquote className="mt-5 border-l-4 border-[#d0d7de] pl-4 text-base italic leading-7 text-[#656d76] dark:border-[#30363d] dark:text-[#8b949e]">“{t("pros")}”</blockquote>
    </section>
  );
}
