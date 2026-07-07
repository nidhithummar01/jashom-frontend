import type { Metadata } from "next";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CookieConsent from "@/components/CookieConsent";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jashom Technologies — Precision GPU Engineering for High-Performance AI",
  description:
    "Expert NVIDIA GPU optimization and CUDA development services. Jashom helps organizations unlock maximum performance from their AI and machine learning workloads.",
  icons: {
    icon: "/logo/jashom-dark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var activeTheme = theme || 'light';
                  if (activeTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('mono');
                  } else if (activeTheme === 'mono') {
                    document.documentElement.classList.add('mono');
                    document.documentElement.classList.remove('dark');
                  } else if (activeTheme === 'system') {
                    var isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (isDarkSystem) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                    document.documentElement.classList.remove('mono');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.remove('mono');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
