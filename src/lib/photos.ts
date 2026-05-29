import fs from 'fs';
import path from 'path';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Rule: photos placed in /public/images/<year>/ belong to that year.
 * Returns an array of photo objects ready for PhotoGallery.
 */
export function getPhotosForYear(year: number) {
  const dir = path.join(process.cwd(), 'public', 'images', String(year));

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(file => IMAGE_EXTS.has(path.extname(file).toLowerCase()))
    .sort()
    .map(file => ({
      src: `${BASE_PATH}/images/${year}/${file}`,
      alt: `${year} — ${path.basename(file, path.extname(file))}`,
    }));
}

const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

export function getAllPhotoSrcs(): string[] {
  return YEARS.flatMap(year => {
    const dir = path.join(process.cwd(), 'public', 'images', String(year));
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter(file => IMAGE_EXTS.has(path.extname(file).toLowerCase()))
      .map(file => `${BASE_PATH}/images/${year}/${file}`);
  });
}
