"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { storage } from "@/lib/storage";

export function FavoriteButton({ ticker }: { ticker: string }) {
  const [active, setActive] = useState(false);
  const [guestMessage, setGuestMessage] = useState(false);

  useEffect(() => {
    setActive(storage.getFavorites().includes(ticker));
  }, [ticker]);

  function toggle() {
    if (storage.isGuest()) {
      setGuestMessage(true);
      return;
    }
    setActive(storage.toggleFavorite(ticker).includes(ticker));
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="관심종목 저장"
        onClick={toggle}
        className={active ? "grid size-12 place-items-center rounded-full bg-coral text-red-700 shadow-soft" : "grid size-12 place-items-center rounded-full bg-white text-black/45 shadow-soft"}
      >
        <Heart size={22} fill={active ? "currentColor" : "none"} />
      </button>
      {guestMessage ? (
        <div className="absolute right-0 z-10 mt-2 w-64 rounded-2xl bg-white p-4 text-sm font-bold text-black/65 shadow-soft">
          <p>이 기능은 내 센스폴리오를 만든 후 사용할 수 있어요.</p>
          <Link href="/onboarding" className="mt-3 block rounded-xl bg-ink px-3 py-2 text-center text-xs font-black text-white">
            회원가입하기
          </Link>
        </div>
      ) : null}
    </div>
  );
}
