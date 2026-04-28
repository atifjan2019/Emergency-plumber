export const MEDIA_FOLDERS = [
  { key: 'icons', label: 'Icons', description: 'Small UI icons, logos, badges (SVG / PNG).' },
  { key: 'general', label: 'General Images', description: 'Hero photos, lifestyle, marketing.' },
  { key: 'areas', label: 'Areas Images', description: 'City and area-specific photos.' },
] as const;

export type MediaFolderKey = (typeof MEDIA_FOLDERS)[number]['key'];

export const FOLDER_KEYS: readonly MediaFolderKey[] = MEDIA_FOLDERS.map((f) => f.key);

export function isMediaFolderKey(value: string): value is MediaFolderKey {
  return (FOLDER_KEYS as readonly string[]).includes(value);
}

/**
 * Extract the folder key from an R2 object key. Returns null if the file is at the root.
 */
export function folderFromKey(key: string): MediaFolderKey | null {
  const slash = key.indexOf('/');
  if (slash <= 0) return null;
  const prefix = key.slice(0, slash);
  return isMediaFolderKey(prefix) ? prefix : null;
}

/**
 * Just the filename portion (after the last slash).
 */
export function filenameFromKey(key: string): string {
  const slash = key.lastIndexOf('/');
  return slash >= 0 ? key.slice(slash + 1) : key;
}

/**
 * Build the full R2 object key from folder + filename. Folder is optional.
 */
export function buildMediaKey(folder: MediaFolderKey | null | undefined, filename: string): string {
  return folder ? `${folder}/${filename}` : filename;
}
