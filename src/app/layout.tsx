import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "센스폴리오 | Sensefolio",
  description: "내 투자 감각을 키우는 개인 투자노트"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
