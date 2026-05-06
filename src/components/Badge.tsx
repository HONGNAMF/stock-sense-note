import clsx from "clsx";

const toneClasses = {
  green: "bg-mint text-emerald-950",
  yellow: "bg-lemon text-yellow-950",
  lemon: "bg-lemon text-yellow-950",
  coral: "bg-coral text-red-950",
  blue: "bg-skysoft text-sky-950",
  lilac: "bg-lilac text-violet-950",
  gray: "bg-black/[0.06] text-black/70"
};

export function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: keyof typeof toneClasses }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", toneClasses[tone])}>
      {children}
    </span>
  );
}
