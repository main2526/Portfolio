import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Ornament from "@/components/Ornament";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="portfolio-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg  overflow-hidden transition-colors duration-300 mt-7">
          <Header />
          <div className="content px-4 sm:px-8 md:px-12 py-10 space-y-16">
            <About />
            <Skills />
            <Ornament />
            <Projects />
            <Ornament />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}
