import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_JP({
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "ニコニコアニメトラッキング",
  description: "ニコニコで最も旬なアニメが分かる!そんなサイトです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={noto.className}>{children}</body>
    </html>
  );
}
