import { BottomNav } from "@/components/BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-28 pt-5 sm:px-6">
      {children}
      <BottomNav />
    </main>
  );
}
