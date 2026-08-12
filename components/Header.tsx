"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Bell, BookOpen, Box, Code2, Download, Mail, Menu, Plus, Search, Star, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  const es = useLocale() === "es";
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { if (!menuOpen) return; const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false); document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [menuOpen]);

  return (
    <header className="relative">
      <div className="flex h-16 items-center gap-4 bg-[#25292e] px-4 text-white dark:bg-[#010409] lg:px-8">
        <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? (es ? "Cerrar menú" : "Close menu") : (es ? "Abrir menú" : "Open menu")} className="focus-ring flex size-8 items-center justify-center rounded-md border border-white/15 text-[#f0f6fc] hover:bg-white/10 md:hidden">{menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}</button>
        <a href="#" aria-label="GitHub profile home" className="focus-ring shrink-0 rounded-full"><FaGithub className="size-8" /></a>
        <span className="hidden text-sm font-semibold sm:block">main2526</span>
        <div className="ml-2 hidden w-full max-w-[438px] md:block"><PortfolioSearch es={es} /></div>
        <HeaderControls es={es} />
      </div>
      {menuOpen && <><button type="button" className="fixed inset-0 top-16 z-40 bg-black/45 backdrop-blur-[2px] md:hidden" onClick={() => setMenuOpen(false)} aria-label={es ? "Cerrar menú" : "Close menu"} /><nav id="mobile-navigation" aria-label={es ? "Navegación móvil" : "Mobile navigation"} className="absolute inset-x-0 top-16 z-50 border-b border-[#30363d] bg-[#25292e] p-4 text-white shadow-2xl dark:bg-[#161b22] md:hidden"><PortfolioSearch es={es} onNavigate={() => setMenuOpen(false)} enableShortcut={false} /><div className="mt-3 divide-y divide-white/10"><MobileLink href="#about-title" icon={<BookOpen />} label={es ? "Resumen" : "Overview"} close={() => setMenuOpen(false)} /><MobileLink href="#projects-title" icon={<Code2 />} label={es ? "Repositorios y proyectos" : "Repositories and projects"} close={() => setMenuOpen(false)} /><MobileLink href="#skills-title" icon={<Star />} label={es ? "Competencias y contribuciones" : "Skills and contributions"} close={() => setMenuOpen(false)} /><MobileLink href="#contact-title" icon={<Mail />} label={es ? "Contacto" : "Contact"} close={() => setMenuOpen(false)} /></div></nav></>}
      <nav aria-label="Profile navigation" className="overflow-x-auto border-b border-[#d0d7de] bg-white dark:border-[#21262d] dark:bg-[#0d1117]">
        <div className="mx-auto flex h-12 min-w-max max-w-[1280px] items-end gap-1 px-4 md:pl-[280px] lg:px-8 lg:pl-[344px]">
          <Tab active icon={<BookOpen />} label={es ? "Resumen" : "Overview"} href="#about-title" />
          <Tab icon={<BookOpen />} label={es ? "Repositorios" : "Repositories"} count="3" href="#projects-title" />
          <Tab icon={<Box />} label={es ? "Proyectos" : "Projects"} href="#projects-title" />
          <Tab icon={<Star />} label={es ? "Estrellas" : "Stars"} href="#skills-title" />
        </div>
      </nav>
    </header>
  );
}

function HeaderControls({ es }: { es: boolean }) {
  const [open, setOpen] = useState<"create" | "notifications" | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event instanceof MouseEvent && controlsRef.current?.contains(event.target as Node)) return;
      setOpen(null);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", close); };
  }, [open]);

  return (
    <div ref={controlsRef} className="relative ml-auto hidden items-center gap-2 pr-[174px] sm:flex">
      <div className="relative">
        <button type="button" onClick={() => setOpen((current) => current === "create" ? null : "create")} aria-expanded={open === "create"} aria-haspopup="menu" className="focus-ring flex size-8 items-center justify-center rounded-md border border-white/15 hover:bg-white/10" aria-label={es ? "Acciones rápidas" : "Quick actions"}><Plus className="size-4" /></button>
        {open === "create" && <div role="menu" className="absolute right-0 top-10 z-[80] w-64 overflow-hidden rounded-md border border-[#30363d] bg-[#161b22] py-1 text-[#e6edf3] shadow-2xl"><p className="border-b border-[#30363d] px-3 py-2 text-xs font-semibold">{es ? "Acciones rápidas" : "Quick actions"}</p><ControlLink href="#projects-title" icon={<Code2 />} label={es ? "Ver proyectos" : "View projects"} close={() => setOpen(null)} /><ControlLink href="#contact-title" icon={<Mail />} label={es ? "Enviar un mensaje" : "Send a message"} close={() => setOpen(null)} /><a role="menuitem" href="/cv.pdf" download="Johanny-Rodriguez-CV.pdf" onClick={() => setOpen(null)} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-[#21262d]"><Download className="size-4 text-[#8b949e]" />{es ? "Descargar currículum" : "Download résumé"}</a></div>}
      </div>
      <div className="relative">
        <button type="button" onClick={() => setOpen((current) => current === "notifications" ? null : "notifications")} aria-expanded={open === "notifications"} aria-haspopup="dialog" className="focus-ring relative flex size-8 items-center justify-center rounded-md border border-white/15 hover:bg-white/10" aria-label={es ? "Notificaciones" : "Notifications"}><Bell className="size-4" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#2f81f7] ring-2 ring-[#25292e] dark:ring-[#010409]" /></button>
        {open === "notifications" && <div role="dialog" aria-label={es ? "Notificaciones" : "Notifications"} className="absolute right-0 top-10 z-[80] w-72 overflow-hidden rounded-md border border-[#30363d] bg-[#161b22] text-[#e6edf3] shadow-2xl"><div className="flex items-center justify-between border-b border-[#30363d] px-3 py-2"><span className="text-sm font-semibold">{es ? "Notificaciones" : "Notifications"}</span><span className="text-xs text-[#8b949e]">1</span></div><div className="flex gap-3 p-4"><span className="mt-1 size-2 shrink-0 rounded-full bg-[#2f81f7]" /><div><p className="text-sm font-semibold">{es ? "Disponible para nuevos proyectos" : "Available for new projects"}</p><p className="mt-1 text-xs leading-5 text-[#8b949e]">{es ? "Puedes contactarme desde la sección de contacto." : "You can reach me through the contact section."}</p><a href="#contact-title" onClick={() => setOpen(null)} className="mt-2 inline-block text-xs text-[#2f81f7] hover:underline">{es ? "Ir a contacto" : "Go to contact"}</a></div></div></div>}
      </div>
    </div>
  );
}

function ControlLink({ href, icon, label, close }: { href: string; icon: React.ReactNode; label: string; close: () => void }) {
  return <a role="menuitem" href={href} onClick={close} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-[#21262d]"><span className="text-[#8b949e] [&>svg]:size-4">{icon}</span>{label}</a>;
}

function PortfolioSearch({ es, onNavigate, enableShortcut = true }: { es: boolean; onNavigate?: () => void; enableShortcut?: boolean }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const items = useMemo(() => [
    { label: es ? "Resumen — Sobre mí" : "Overview — About me", detail: "README", href: "#about-title", keywords: "perfil profile biografia biography resumen overview about sobre mi" },
    { label: "SwiftStake", detail: es ? "Proyecto" : "Project", href: "#projects-title", keywords: "swift stake defi staking project proyecto" },
    { label: "tmeal-restaurant-delicius", detail: es ? "Proyecto" : "Project", href: "#projects-title", keywords: "restaurant comida delivery proyecto project" },
    { label: "chatbot-api-key", detail: es ? "Proyecto" : "Project", href: "#projects-title", keywords: "chatbot ai deepseek proyecto project" },
    { label: es ? "Competencias técnicas" : "Technical skills", detail: "React · Next.js", href: "#skills-title", keywords: "skills competencias tecnologias technologies react next node typescript" },
    { label: es ? "Contribuciones" : "Contributions", detail: "2024 — 2026", href: "#skills-title", keywords: "github activity actividad contribuciones contributions" },
    { label: es ? "Contacto" : "Contact", detail: es ? "Enviar mensaje" : "Send message", href: "#contact-title", keywords: "contact contacto email mensaje message linkedin whatsapp" },
  ], [es]);
  const results = query.trim() ? items.filter((item) => `${item.label} ${item.detail} ${item.keywords}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6) : [];

  useEffect(() => { if (!enableShortcut) return; const handler = (event: KeyboardEvent) => { if (event.key === "/" && !event.ctrlKey && !event.metaKey && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) { event.preventDefault(); inputRef.current?.focus(); } }; document.addEventListener("keydown", handler); return () => document.removeEventListener("keydown", handler); }, [enableShortcut]);

  function navigate(href: string) { setQuery(""); setFocused(false); inputRef.current?.blur(); onNavigate?.(); const id = href.slice(1); requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })); }

  return (
    <form className="relative" role="search" onSubmit={(event) => { event.preventDefault(); if (results[active]) navigate(results[active].href); }}>
      <Search className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-[#8c959f]" />
      <label htmlFor={enableShortcut ? "portfolio-search" : "portfolio-search-mobile"} className="sr-only">{es ? "Buscar en el portafolio" : "Search portfolio"}</label>
      <input ref={inputRef} id={enableShortcut ? "portfolio-search" : "portfolio-search-mobile"} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); setFocused(true); }} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 120)} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); setActive((index) => Math.min(index + 1, Math.max(results.length - 1, 0))); } else if (event.key === "ArrowUp") { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); } else if (event.key === "Escape") { setQuery(""); inputRef.current?.blur(); } }} placeholder={es ? "Escribe / para buscar" : "Type / to search"} autoComplete="off" className="h-9 w-full rounded-md border border-[#57606a] bg-[#0d1117] pl-9 pr-12 text-sm text-white placeholder:text-[#8c959f] focus:border-[#2f81f7] focus:outline-none focus:ring-1 focus:ring-[#2f81f7]" />
      {enableShortcut && !query && <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-[#57606a] px-1.5 text-[11px] text-[#8c959f]">/</kbd>}
      {focused && query && <div className="absolute inset-x-0 top-[calc(100%+6px)] z-[70] overflow-hidden rounded-md border border-[#30363d] bg-[#161b22] py-1 text-white shadow-2xl">{results.length ? results.map((item, index) => <button key={`${item.label}-${index}`} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => navigate(item.href)} className={`flex w-full items-center justify-between gap-4 px-3 py-2.5 text-left text-sm ${active === index ? "bg-[#1f6feb]" : "hover:bg-[#21262d]"}`}><span className="truncate font-medium">{item.label}</span><span className={`shrink-0 text-xs ${active === index ? "text-white/75" : "text-[#8b949e]"}`}>{item.detail}</span></button>) : <p className="px-3 py-3 text-sm text-[#8b949e]">{es ? "No se encontraron resultados" : "No results found"}</p>}</div>}
    </form>
  );
}

function MobileLink({ href, icon, label, close }: { href: string; icon: React.ReactNode; label: string; close: () => void }) { return <a href={href} onClick={close} className="focus-ring flex items-center gap-3 rounded-md px-2 py-3 text-sm font-semibold hover:bg-white/10"><span className="[&>svg]:size-4">{icon}</span>{label}</a>; }
function Tab({ icon, label, href, count, active = false }: { icon: React.ReactNode; label: string; href: string; count?: string; active?: boolean }) { return <a href={href} className={`focus-ring flex h-12 items-center gap-2 border-b-2 px-3 text-sm ${active ? "border-[#fd8c73] font-semibold" : "border-transparent hover:border-[#d0d7de]"}`}><span className="size-4 text-[#656d76] [&>svg]:size-4 dark:text-[#8b949e]">{icon}</span>{label}{count && <span className="rounded-full bg-[#afb8c133] px-2 text-xs font-medium leading-5 dark:bg-[#6e768166]">{count}</span>}</a>; }
