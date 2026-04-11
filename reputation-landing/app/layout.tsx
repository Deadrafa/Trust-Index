import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trust Index — система репутации",
  description:
    "Лендинг для проверки спроса на сервис рейтинга доверия и прозрачной репутации.",
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