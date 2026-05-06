import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "해석노트",
  description: "주식과 ETF를 쉽게 풀어보는 개인 투자 해석 노트 MVP"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
