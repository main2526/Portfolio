import type { Metadata } from "next";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "BootsDev-X | Johanny A. Rodriguez",
  description: "Portfolio of Johanny A. Rodriguez: thoughtful, useful, and human web products built with modern technologies.",
  keywords: ["software engineer", "React", "Next.js", "TypeScript", "Node.js", "portfolio"],
  authors: [{ name: "Johanny A. Rodriguez" }],
  openGraph: {
    title: "Johanny A. Rodriguez | Software Engineer",
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
