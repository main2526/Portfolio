"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { BriefcaseBusiness, MapPin, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CvModal from "@/components/CvModal";

export default function ProfileSidebar() {
  const t = useTranslations("Profile");
  const available = useTranslations("Available");
  return (
    <aside className="md:-mt-[54px]">
      <div className="flex items-center gap-5 md:block">
        <div className="relative flfex size-24 shrink-0 items-center justify-center rounded-full border border-[#d0d7de] bg-[#f6f8fa] text-3xl font-semibold text-[#57606a] shadow-[0_0_0_1px_#ffffff] md:aspect-square md:size-full md:text-7xl dark:border-[#30363d] dark:bg-[#161b22] dark:text-[#8b949e] dark:shadow-[0_0_0_1px_#0d1117]">
          <Image src="/Logo.png" alt="Profile" width={96} height={96} className="size-full rounded-full" />
        </div>
        <div className="min-w-0 md:mt-4">
          <h1 className="truncate text-2xl font-semibold leading-7">Johanny A. Rodriguez</h1>
          <p className="truncate text-xl font-light text-[#656d76] dark:text-[#8b949e]">main2526</p>
        </div>
      </div>
      <p className="mt-4 text-base leading-6">{t("Developer")} · React, Next.js, Node.js</p>
      <div className="mt-4 flex items-center gap-2 text-sm"><span className="size-2 rounded-full bg-[#1f883d]" />{available("ava")}</div>
      <CvModal />
      <ul className="mt-4 space-y-1 text-sm">
        <li className="flex items-center gap-2"><BriefcaseBusiness className="size-4 text-[#656d76]" />Full Stack Developer</li>
        <li className="flex items-center gap-2"><MapPin className="size-4 text-[#656d76]" />Dominican Republic</li>
        <li className="flex items-center gap-2"><Mail className="size-4 text-[#656d76]" /><a className="hover:text-[#0969da] hover:underline" href="#contact-title">Contact</a></li>
        <li className="flex items-center gap-2"><FaGithub className="size-4 text-[#656d76]" /><a className="hover:text-[#0969da] hover:underline" href="https://github.com/main2526" target="_blank" rel="noreferrer">main2526</a></li>
        <li className="flex items-center gap-2"><FaLinkedin className="size-4 text-[#656d76]" /><a className="hover:text-[#0969da] hover:underline" href="https://www.linkedin.com/in/bootsx" target="_blank" rel="noreferrer">bootsx</a></li>
      </ul>
    </aside>
  );
}
