import type { Metadata } from "next";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "BootsDev-X | Full Stack Developer",
  description: "Portfolio of Johanny A. Rodriguez, a Full Stack developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: ["Full Stack developer", "React", "Next.js", "TypeScript", "Node.js", "portfolio"],
  authors: [{ name: "Johanny A. Rodriguez" }],
  openGraph: {
    title: "Johanny A. Rodriguez | Full Stack Developer",
    description: "Modern web experiences built with care, performance, and intuitive design.",
    type: "website",
  },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ backgroundColor: "#020617" }}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <ScrollToTopButton />
          <div id="locale-transition-cover" data-active="false" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}
