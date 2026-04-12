import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Trust Index — платформа оценки доверия",
  description: "Trust Score, рейтинг надёжности, проверка репутации. MVP платформы доверия.",
  keywords: [
    "trust score",
    "рейтинг доверия",
    "оценка репутации",
    "проверка человека",
    "trust index"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}