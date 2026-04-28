export default function PostcodeChips({ postcodes }: { postcodes: string[] }) {
  return (
    <div className="rounded-2xl border border-gray-line bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-dark text-white shadow-md shadow-primary/30">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5" aria-hidden>
              <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </span>
          <div>
            <div className="text-sm font-bold text-ink leading-tight">Postcode coverage</div>
            <div className="text-xs text-gray-soft">{postcodes.length} prefixes covered</div>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-green/30 bg-green/10 px-2.5 py-1 text-xs font-bold text-green-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
          Live
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {postcodes.map((p) => (
          <span
            key={p}
            className="group inline-flex items-center gap-1.5 rounded-lg border-2 border-gray-line bg-off-white px-3 py-2 text-sm font-mono font-bold text-ink hover:border-primary hover:bg-primary/5 hover:text-primary transition cursor-default"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition" />
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
