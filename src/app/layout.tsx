import type { Metadata } from "next";
import "./globals.css";
import { APP_DESCRIPTION, APP_DISPLAY_NAME, APP_TAGLINE } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${APP_DISPLAY_NAME} | ${APP_TAGLINE}`,
  description: APP_DESCRIPTION
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
