"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaGithub, FaLinkedinIn, FaPaperPlane, FaWhatsapp } from "react-icons/fa";

const initialForm = { empresa: "", email: "", subject: "", message: "" };
const links = [
  { icon: FaLinkedinIn, title: "LinkedIn", link: "https://www.linkedin.com/in/bootsx" },
  { icon: FaGithub, title: "GitHub", link: "https://github.com/main2526" },
  { icon: FaWhatsapp, title: "WhatsApp", link: "https://api.whatsapp.com/send/?phone=18295914469" },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const t = useTranslations("ContactMe");
  const heading = useTranslations("Con");
  const es = useLocale() === "es";
  const input = "focus-ring w-full rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 py-2 text-sm shadow-inner placeholder:text-[#656d76] focus:border-[#0969da] focus:bg-white dark:border-[#30363d] dark:bg-[#0d1117] dark:placeholder:text-[#8b949e] dark:focus:border-[#2f81f7]";

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setSending(true); setStatus(null);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ empresa: form.empresa, email: form.email, message: `${form.subject}\n\n${form.message}` }) });
      if (!response.ok) throw new Error();
      setStatus({ type: "success", text: t("SendSuccess") }); setForm(initialForm);
    } catch { setStatus({ type: "error", text: t("SendError") }); }
    finally { setSending(false); }
  }

  return (
    <section aria-labelledby="contact-title" className="pb-8">
      <h2 id="contact-title" className="section-heading">{heading("v")}</h2>
      <div className="mt-4 grid overflow-hidden rounded-md border border-[#d0d7de] md:grid-cols-[240px_1fr] dark:border-[#30363d]">
        <div className="border-b border-[#d0d7de] bg-[#f6f8fa] p-5 md:border-b-0 md:border-r dark:border-[#30363d] dark:bg-[#161b22]">
          <h3 className="font-semibold">{es ? "Hablemos con calma" : "Let's talk it through"}</h3>
          <p className="mt-2 text-sm leading-6 text-[#656d76] dark:text-[#8b949e]">{es ? "Si tienes una idea, un reto o simplemente una pregunta, escríbeme. Me encantará leerte y descubrir cómo puedo aportar." : "If you have an idea, a challenge, or simply a question, write to me. I would be glad to hear from you and explore how I can help."}</p>
          <div className="mt-4 space-y-2">{links.map(({ icon: Icon, title, link }) => <a key={title} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#0969da] hover:underline dark:text-[#2f81f7]"><Icon />{t(title)}</a>)}</div>
        </div>
        <form onSubmit={submit} className="space-y-4 p-5">
          <h3 className="font-semibold">{t("SendMe")}</h3>
          <div className="grid gap-4 sm:grid-cols-2"><Field label={t("Name")}><input className={input} name="empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} required placeholder={t("YourName")} /></Field><Field label="Email"><input className={input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder={t("YourEmail")} /></Field></div>
          <Field label={t("Subject")}><input className={input} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required placeholder={t("SubjectInput")} /></Field>
          <Field label={t("Message")}><textarea className={`${input} min-h-28 resize-y`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder={t("MessageInput")} /></Field>
          <button disabled={sending} className="focus-ring inline-flex items-center gap-2 rounded-md border border-[#1f883d] bg-[#1f883d] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1a7f37] disabled:opacity-60 dark:border-[#238636] dark:bg-[#238636]"><FaPaperPlane />{sending ? t("SendIngMessage") : t("SendMessage")}</button>
          {status && <p role="status" className={`rounded-md border p-3 text-sm ${status.type === "success" ? "border-[#2da44e] bg-[#dafbe1] text-[#116329] dark:bg-[#12261e] dark:text-[#56d364]" : "border-[#cf222e] bg-[#ffebe9] text-[#82071e] dark:bg-[#2d161b] dark:text-[#ff7b72]"}`}>{status.text}</p>}
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-sm font-semibold"><span className="mb-1.5 block">{label}</span>{children}</label>; }
