import type { Metadata } from "next";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "BootsDev-X | FullStack Developer",
  description:
    "Portfolio profesional de Johanny A. Rodriguez, desarrollador Full Stack especializado en React, Next.js, Node.js y tecnologías modernas.",
  keywords:
    "desarrollador, full stack, React, Next.js, TypeScript, Node.js, portfolio",
  authors: [{ name: "Johanny A. Rodriguez" }],
  openGraph: {
    title: "Johanny A. Rodriguez - Desarrollador Full Stack",
    description: "Portfolio profesional de desarrollador Full Stack",
    type: "website",
  },
  icons: "./icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={` google-sans bg-black antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <ScrollToTopButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
