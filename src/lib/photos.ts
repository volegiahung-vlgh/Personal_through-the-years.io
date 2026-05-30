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

  // Collect all filenames already inside album subfolders
  const inAlbum = new Set<string>();
  fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .forEach(subDir => {
      fs.readdirSync(path.join(dir, subDir.name))
        .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .forEach(f => inAlbum.add(f.toLowerCase()));
    });

  return fs
    .readdirSync(dir)
    .filter(file =>
      IMAGE_EXTS.has(path.extname(file).toLowerCase()) &&
      !inAlbum.has(file.toLowerCase())   // skip if already in an album
    )
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

export interface Moment {
  name: string;    // formatted: "da-lat" → "Da Lat"
  slug: string;    // raw folder name
  cover: string;   // first photo src
  count: number;
  photos: string[];
}

function formatName(slug: string): string {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function getMomentsForYear(year: number): Moment[] {
  const yearDir = path.join(process.cwd(), 'public', 'images', String(year));
  if (!fs.existsSync(yearDir)) return [];

  return fs
    .readdirSync(yearDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(dir => {
      const slugPath = path.join(yearDir, dir.name);
      const photos = fs
        .readdirSync(slugPath)
        .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .sort()
        .map(f => `${BASE_PATH}/images/${year}/${dir.name}/${f}`);
      return {
        name: formatName(dir.name),
        slug: dir.name,
        cover: photos[0] ?? '',
        count: photos.length,
        photos,
      };
    })
    .filter(m => m.count > 0);
}
