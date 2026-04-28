'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { uploadMedia, deleteMedia, type UploadActionState } from './actions';

export type MediaItemView = {
  key: string;
  url: string;
  size: number;
  uploaded_at: string;
};

const initial: UploadActionState = { ok: false, message: '', uploaded: [] };

export default function MediaGrid({
  items,
  configured,
}: {
  items: MediaItemView[];
  configured: boolean;
}) {
  const router = useRouter();
  const [state, formAction] = useActionState(uploadMedia, initial);
  const [query, setQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      router.refresh();
    }
  }, [state.ok, state.message, router]);

  useEffect(() => {
    if (!copiedKey) return;
    const t = setTimeout(() => setCopiedKey(null), 1500);
    return () => clearTimeout(t);
  }, [copiedKey]);

  function onPickFiles() {
    inputRef.current?.click();
  }

  function onFilesChosen() {
    if (!inputRef.current?.files?.length) return;
    formRef.current?.requestSubmit();
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (!configured) return;
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/')
    );
    if (files.length === 0 || !inputRef.current || !formRef.current) return;
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    inputRef.current.files = dt.files;
    formRef.current.requestSubmit();
  }

  async function copyUrl(url: string, key: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
    } catch {}
  }

  const filtered = items.filter((it) => {
    if (!query) return true;
    return it.key.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <form ref={formRef} action={formAction} className="mt-6">
        <input
          ref={inputRef}
          type="file"
          name="files"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={onFilesChosen}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            if (configured) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition ${
            !configured
              ? 'border-amber-300 bg-amber-50'
              : dragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-line bg-white hover:border-primary/50'
          }`}
        >
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l-5-5-5 5M12 3v12" />
            </svg>
          </div>
          <h3 className="mt-3 text-base font-bold text-ink">
            {configured ? 'Drop images here, or click to choose' : 'Cloudflare R2 not connected'}
          </h3>
          <p className="mt-1 text-sm text-gray-soft">
            {configured
              ? 'PNG, JPEG, WebP, GIF, AVIF, SVG · up to 15 MB per file · multiple at once.'
              : 'Set R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY in your env vars to enable uploads.'}
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={onPickFiles}
              disabled={!configured}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
              Choose images
            </button>
          </div>
          <UploadProgress />
        </div>

        {state.message && (
          <p
            className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
              state.ok
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {state.message}
          </p>
        )}
      </form>

      <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-base font-bold text-ink">All images</h2>
          <p className="text-xs text-gray-soft">
            {items.length} file{items.length === 1 ? '' : 's'} stored in R2
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-soft"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search file name…"
            className="w-full rounded-lg border border-gray-line bg-white py-2 pl-9 pr-3 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-gray-line bg-white p-12 text-center text-sm text-gray-soft">
          {items.length === 0
            ? configured
              ? 'No images uploaded yet. Drop a few above to get started.'
              : 'Connect R2 to start uploading.'
            : 'No files match this search.'}
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <li
              key={item.key}
              className="group overflow-hidden rounded-xl border border-gray-line bg-white shadow-sm transition hover:shadow-md"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="block aspect-square w-full overflow-hidden bg-off-white"
                title={item.key}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.key}
                  loading="lazy"
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </a>
              <div className="p-3">
                <div className="truncate text-xs font-semibold text-ink" title={item.key}>
                  {fileName(item.key)}
                </div>
                <div className="mt-0.5 text-[11px] text-gray-soft">
                  {formatBytes(item.size)} ·{' '}
                  {new Date(item.uploaded_at).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url, item.key)}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-line bg-white px-2 py-1 text-[11px] font-semibold text-ink hover:border-primary hover:text-primary"
                  >
                    {copiedKey === item.key ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-green-600" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 7" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-3 w-3" aria-hidden>
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                  <DeleteButton item={item} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function UploadProgress() {
  const { pending } = useFormStatus();
  if (!pending) return null;
  return (
    <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-primary">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 animate-spin" aria-hidden>
        <path strokeLinecap="round" d="M21 12a9 9 0 11-9-9" />
      </svg>
      Uploading…
    </p>
  );
}

function DeleteButton({ item }: { item: MediaItemView }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!window.confirm(`Delete ${fileName(item.key)} permanently? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.set('key', item.key);
    startTransition(async () => {
      await deleteMedia(fd);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-white px-2 py-1 text-[11px] font-semibold text-red-700 hover:border-red-400 hover:bg-red-50 disabled:opacity-60"
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}

function fileName(key: string): string {
  const parts = key.split('/');
  return parts[parts.length - 1] ?? key;
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
