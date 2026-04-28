export default function PostcodeChips({ postcodes }: { postcodes: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {postcodes.map((p) => (
        <span
          key={p}
          className="inline-flex items-center rounded-md border border-gray-line bg-white px-2.5 py-1 text-sm font-mono font-semibold text-ink"
        >
          {p}
        </span>
      ))}
    </div>
  );
}
