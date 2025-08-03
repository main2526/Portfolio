import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("AboutMe");

  return (
    <section className="mb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-slate-800 dark:text-white text-center relative pb-4 font-serif">
          {t("About")}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-yellow-500"></div>
        </h2>

        <div>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-10 font-serif max-w-none sm:max-w-prose mx-auto text-justify sm:text-left">
            {t("text")}
          </p>
        </div>

        <div className="relative px-6 sm:px-8 my-12">
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg italic leading-relaxed font-serif  mx-auto text-center sm:text-center">
            <span className="text-yellow-500 text-4xl leading-none font-serif align-top">
              “
            </span>
            {t("pros")}
            <span className="text-yellow-500 text-4xl leading-none font-serif align-top">
              ”
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
