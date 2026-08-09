import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Ornament from "@/components/Ornament";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 py-3 transition-colors sm:py-8 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 sm:rounded-3xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <Header />
          <div className="space-y-16 px-4 py-14 sm:space-y-20 sm:px-8 sm:py-20 md:px-12 lg:px-16">
            <About />
            <Skills />
            <Ornament />
            <Projects />
            <Ornament />
            <Contact />
          </div>
        </div>
      </div>
    </main>
  );
}
