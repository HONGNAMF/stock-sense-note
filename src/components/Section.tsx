export function Section({ title, children, sub }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black tracking-normal text-ink">{title}</h2>
          {sub ? <p className="mt-1 text-sm font-medium text-black/55">{sub}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
