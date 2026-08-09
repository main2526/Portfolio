"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaGithub, FaLinkedinIn, FaPaperPlane, FaWhatsapp } from "react-icons/fa";

interface FormData {
  empresa: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormData = { empresa: "", email: "", subject: "", message: "" };

const contactInfo = [
  { icon: FaLinkedinIn, title: "LinkedIn", link: "https://www.linkedin.com/in/bootsx", color: "bg-blue-600", accent: "text-blue-300" },
  { icon: FaGithub, title: "GitHub", link: "https://github.com/main2526", color: "bg-slate-700", accent: "text-slate-300" },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    link: "https://api.whatsapp.com/send/?phone=18295914469&text=Hola%2C+vi+tu+portafolio+y+quiero+hablar+contigo.+%C2%BFDisponible%3F&type=phone_number&app_absent=0",
    color: "bg-emerald-600",
    accent: "text-emerald-300",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const t = useTranslations("ContactMe");
  const tContact = useTranslations("Con");
  const locale = useLocale();
  const intro = locale === "es"
    ? {
        eyebrow: "Abierto a nuevas ideas",
        title: "¿Tienes una idea? Hagámosla realidad.",
        text: "Cuéntame un poco sobre lo que quieres construir. Te responderé con próximos pasos claros y pensados para tu proyecto.",
      }
    : {
        eyebrow: "Open to possibilities",
        title: "Have an idea? Let's make it real.",
        text: "Tell me a little about what you are building. I will get back to you with thoughtful next steps.",
      };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empresa: formData.empresa, email: formData.email, message: `${formData.subject}\n\n${formData.message}` }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data.error === "string" ? data.error : t("SendError"));
      setStatus({ type: "success", text: t("SendSuccess") });
      setFormData(initialForm);
    } catch {
      setStatus({ type: "error", text: t("SendError") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "focus-ring w-full rounded-xl border border-slate-700 bg-slate-950/45 px-4 py-3 text-base text-white placeholder:text-slate-500 transition focus:border-amber-400";

  return (
    <section aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-heading">{tContact("v")}</h2>

      <div className="relative mt-10 overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 shadow-xl shadow-slate-950/10 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-amber-400">{intro.eyebrow}</span>
            <h3 className="mt-3 max-w-sm text-2xl font-semibold leading-tight text-white sm:text-3xl">{intro.title}</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">{intro.text}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {contactInfo.map((contact) => {
                const Icon = contact.icon;
                return (
                  <a key={contact.title} href={contact.link} target="_blank" rel="noopener noreferrer" className="focus-ring group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 transition-colors hover:border-amber-400/50 hover:bg-white/[0.08]">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg text-white ${contact.color}`}><Icon aria-hidden="true" /></span>
                    <span className="min-w-0 truncate text-sm font-semibold text-white">{t(contact.title)}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5 shadow-inner sm:p-7">
            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{t("SendMe")}</h3>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t("Name")} htmlFor="empresa"><input className={inputClass} id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} required autoComplete="organization" placeholder={t("YourName")} /></Field>
                <Field label="Email" htmlFor="email"><input className={inputClass} type="email" id="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder={t("YourEmail")} /></Field>
              </div>
              <Field label={t("Subject")} htmlFor="subject"><input className={inputClass} id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder={t("SubjectInput")} /></Field>
              <Field label={t("Message")} htmlFor="message"><textarea className={`${inputClass} min-h-32 resize-y`} id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder={t("MessageInput")} /></Field>
              <button type="submit" disabled={isSubmitting} className="focus-ring flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-amber-400 px-6 py-3.5 text-base font-semibold text-slate-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" /> : <FaPaperPlane aria-hidden="true" />}
                {isSubmitting ? t("SendIngMessage") : t("SendMessage")}
              </button>
              {status && <p role="status" className={`rounded-xl border px-4 py-3 text-center text-sm ${status.type === "success" ? "border-emerald-700 bg-emerald-950/50 text-emerald-300" : "border-red-800 bg-red-950/50 text-red-300"}`}>{status.text}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div><label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-slate-200">{label}</label>{children}</div>;
}
