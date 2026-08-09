"use client";

import { useLayoutEffect } from "react";

export default function HtmlLanguage({ locale }: { locale: string }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
