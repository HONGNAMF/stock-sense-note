import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sensefolio-note",
  description: "주식과 ETF를 쉽게 풀어보는 개인 투자 기록 MVP"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
