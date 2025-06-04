import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { appConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: appConfig.app.name + " - " + appConfig.app.description,
  description: appConfig.app.description,
  keywords: ["博客", "Next.js", "React", "TypeScript", "Tailwind CSS", "Blog", "Modern"],
  authors: [{ name: "TBlog Team" }],
  viewport: "width=device-width, initial-scale=1",
  metadataBase: new URL(appConfig.app.url),
  openGraph: {
    title: appConfig.app.name,
    description: appConfig.app.description,
    url: appConfig.app.url,
    siteName: appConfig.app.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.app.name,
    description: appConfig.app.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('tblog-theme');
                  var useSystemTheme = localStorage.getItem('tblog-use-system-theme') === 'true';
                  
                  if (useSystemTheme || !theme) {
                    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    theme = systemTheme;
                  }
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.setProperty('--background', '#0a0a0a');
                    document.documentElement.style.setProperty('--foreground', '#ededed');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.setProperty('--background', '#ffffff');
                    document.documentElement.style.setProperty('--foreground', '#171717');
                  }
                } catch (e) {
                  // 出错时使用默认主题
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <I18nProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <main className="transition-colors duration-300">
                {children}
              </main>
            </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
