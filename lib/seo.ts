export const DEFAULT_OG_IMAGE =
  'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/hero.png';

export const ogImageFor = (settingsOgImageUrl: string | undefined, alt: string) => ({
  url: settingsOgImageUrl || DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  alt,
});

export function trimDescription(text: string, max = 155): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastBoundary = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  if (lastBoundary > max * 0.6) {
    return clean.slice(0, lastBoundary + 1);
  }
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return base.replace(/[,;:\-\s]+$/, '') + '.';
}
