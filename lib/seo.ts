import { GAS_SAFE_NUMBER } from './constants';

export const DEFAULT_OG_IMAGE =
  'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/hero.png';

const OG_IMAGE_ALIASES: Record<string, string> = {
  'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/hero.png': DEFAULT_OG_IMAGE,
};

const normalizeOgImage = (url: string): string => OG_IMAGE_ALIASES[url] ?? url;

export const ogImageFor = (settingsOgImageUrl: string | undefined, alt: string) => ({
  url: settingsOgImageUrl ? normalizeOgImage(settingsOgImageUrl) : DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  alt,
});


const GAS_SAFE_FALLBACK_RE = new RegExp(`\\b${GAS_SAFE_NUMBER}\\b`, 'g');

export const subGasSafe = (text: string, gasSafeNumber: string): string =>
  gasSafeNumber === GAS_SAFE_NUMBER ? text : text.replace(GAS_SAFE_FALLBACK_RE, gasSafeNumber);

export const subGasSafeFaq = <T extends { question: string; answer: string }>(
  items: T[],
  gasSafeNumber: string,
): T[] =>
  gasSafeNumber === GAS_SAFE_NUMBER
    ? items
    : items.map((q) => ({ ...q, answer: subGasSafe(q.answer, gasSafeNumber) }));

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
