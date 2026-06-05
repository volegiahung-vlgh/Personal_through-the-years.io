/**
 * Derive the thumbnail URL from any image src.
 * Inserts /_thumbs/ into the path and changes the extension to .webp.
 * Safe to call in both server and client components — no Node.js deps.
 */
export function toThumbSrc(src: string): string {
  return src
    .replace(/\/images\/(?!_thumbs\/)/, '/images/_thumbs/')
    .replace(/\.[^./?#]+$/, '.webp');
}
