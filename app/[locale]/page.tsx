import Header from "@/components/Header";
import ProfileSidebar from "@/components/ProfileSidebar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white transition-colors dark:bg-[#0d1117]">
      <Header />
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 pb-16 pt-6 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[296px_minmax(0,1fr)] lg:px-8">
        <ProfileSidebar />
        <div className="min-w-0 space-y-6">
          <About />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </div>
    </main>
  );
}
