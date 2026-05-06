"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { storage } from "@/lib/storage";

export function FavoriteButton({ ticker }: { ticker: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(storage.getFavorites().includes(ticker));
  }, [ticker]);

  return (
    <button
      type="button"
      aria-label="관심종목 저장"
      onClick={() => setActive(storage.toggleFavorite(ticker).includes(ticker))}
      className={active ? "grid size-12 place-items-center rounded-full bg-coral text-red-700 shadow-soft" : "grid size-12 place-items-center rounded-full bg-white text-black/45 shadow-soft"}
    >
      <Heart size={22} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
