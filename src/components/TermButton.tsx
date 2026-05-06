"use client";

import { useState } from "react";
import { termDescriptions } from "@/lib/constants";

export function TermButton({ term, value }: { term: keyof typeof termDescriptions; value: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((next) => !next)}
        className="w-full rounded-2xl border border-black/5 bg-white p-3 text-left shadow-sm transition hover:bg-lemon/55"
      >
        <span className="text-xs font-black text-black/45">{term}</span>
        <span className="mt-1 block text-base font-black text-ink">{value}</span>
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl border border-black/5 bg-ink p-3 text-sm font-semibold leading-5 text-white shadow-soft">
          {termDescriptions[term]}
        </div>
      ) : null}
    </div>
  );
}
