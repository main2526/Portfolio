import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("AboutMe");

  return (
    <section aria-labelledby="about-title" className="mx-auto max-w-4xl">
      <h2 id="about-title" className="section-heading">
        {t("About")}
      </h2>
      <p className="mx-auto mt-9 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
        {t("text")}
      </p>
      <blockquote className="mx-auto mt-9 max-w-2xl border-l-2 border-amber-400 bg-amber-50/70 px-5 py-4 text-center text-base italic leading-7 text-slate-600 sm:text-lg dark:bg-amber-400/5 dark:text-slate-300">
        “{t("pros")}”
      </blockquote>
    </section>
  );
}
