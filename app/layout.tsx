import type { Metadata } from "next";
import { Radio_Canada_Big, JetBrains_Mono, Space_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { NavBar } from "@/components/nav/NavBar";
import { DevModeProvider } from "@/components/dev/DevModeProvider";
import { siteConfig } from "@/data/data";

const radioCanada = Radio_Canada_Big({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-mono",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: "700",
  style: "italic",
  variable: "--font-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — UI/UX Designer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${radioCanada.variable} ${jetbrainsMono.variable} ${spaceMono.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme — runs synchronously before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans">
        <DevModeProvider>
          <NavBar />
          <main className="mx-auto max-w-5xl px-6 pt-24">
            {children}
          </main>
        </DevModeProvider>
        {/* Netlify Identity — required for Decap CMS login redirect on every page */}
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
        <Script
          id="netlify-identity-redirect"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if(window.netlifyIdentity){window.netlifyIdentity.on("init",function(u){if(!u){window.netlifyIdentity.on("login",function(){document.location.href="/admin/";});}});}`,
          }}
        />
      </body>
    </html>
  );
}
