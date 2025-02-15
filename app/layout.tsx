import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME } from "./config/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="bg-base-200 py-6 text-center">
          <h1 className="text-4xl font-bold"><Link href="/">{SITE_NAME}</Link></h1>
        </header>
        <main className="max-w-3xl mx-auto px4">
          {children}
        </main>
        <footer className="bg-base-200 py-6 text-center">&copy; 2025 gorou12 All rights reserved.<br />
        This site is powered by <a href="https://www.pokete.com/">ぽけ手帳</a></footer>
      </body>
    </html>
  );
}
