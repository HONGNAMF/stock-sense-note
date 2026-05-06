"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, LineChart, NotebookPen, UserRound } from "lucide-react";
import clsx from "clsx";

const items = [
  { href: "/", label: "홈", icon: Home },
  { href: "/glossary", label: "단어찾기", icon: BookOpen },
  { href: "/etfs", label: "ETF", icon: LineChart },
  { href: "/trades", label: "기록", icon: NotebookPen },
  { href: "/profile", label: "내 페이지", icon: UserRound }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/92 px-3 pb-3 pt-2 shadow-[0_-10px_30px_rgba(32,33,36,0.08)] backdrop-blur md:left-1/2 md:max-w-3xl md:-translate-x-1/2 md:rounded-t-2xl md:border">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "tap-highlight flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold transition",
                active ? "bg-ink text-white" : "text-black/55 hover:bg-black/[0.04] hover:text-ink"
              )}
            >
              <Icon size={18} strokeWidth={2.2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
