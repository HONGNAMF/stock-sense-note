import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "해석노트",
  description: "초보자도 이해하기 쉬운 개인화 주식 분석 MVP"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
