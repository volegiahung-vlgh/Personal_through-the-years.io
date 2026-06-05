import fs from 'fs';
import path from 'path';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.heic', '.heif']);
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Keywords that mark a file as a "love photo" — excluded from year timeline
const LOVE_KEYWORDS = ['yêu thương', 'lời yêu', 'love letter', 'tình yêu'];

function isLovePhoto(filename: string): boolean {
  const lower = filename.toLowerCase();
  return LOVE_KEYWORDS.some(kw => lower.includes(kw));
}

/** Load caption map for a given year from src/content/captions/<year>.json */
function loadCaptions(year: number): Record<string, string> {
  try {
    const p = path.join(process.cwd(), 'src', 'content', 'captions', `${year}.json`);
    if (!fs.existsSync(p)) return {};
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch {
    return {};
  }
}

/**
 * Photos placed in /public/images/<year>/ belong to that year.
 * Excludes: files already inside an album subfolder, and love-tagged files.
 * Attaches captions from src/content/captions/<year>.json when present.
 */
export function getPhotosForYear(year: number) {
  const dir = path.join(process.cwd(), 'public', 'images', String(year));
  if (!fs.existsSync(dir)) return [];

  const allEntries = fs.readdirSync(dir, { withFileTypes: true });
  const captions = loadCaptions(year);

  // Filenames in PUBLIC album subfolders (non-_ folders) — used for dedup
  const inAlbum = new Set<string>();
  allEntries
    .filter(e => e.isDirectory() && !e.name.startsWith('_'))
    .forEach(subDir => {
      fs.readdirSync(path.join(dir, subDir.name))
        .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .forEach(f => inAlbum.add(f.toLowerCase()));
    });

  // Public loose photos directly in the year root
  const publicPhotos = allEntries
    .filter(e =>
      e.isFile() &&
      IMAGE_EXTS.has(path.extname(e.name).toLowerCase()) &&
      !inAlbum.has(e.name.toLowerCase()) &&
      !isLovePhoto(e.name)
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(e => ({
      src:       `${BASE_PATH}/images/${year}/${e.name}`,
      alt:       captions[e.name] ?? `Khoảnh khắc ${year}`,
      caption:   captions[e.name] && !captions[e.name].startsWith('TODO') ? captions[e.name] : undefined,
      isPrivate: false as const,
    }));

  // Private photos from _ prefixed subfolders — shown blurred in the same grid
  const privatePhotos = allEntries
    .filter(e => e.isDirectory() && e.name.startsWith('_'))
    .flatMap(subDir =>
      fs.readdirSync(path.join(dir, subDir.name))
        .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .sort()
        .map(f => ({
          src:       `${BASE_PATH}/images/${year}/${subDir.name}/${encodeURIComponent(f)}`,
          alt:       `Khoảnh khắc ${year}`,
          caption:   undefined as string | undefined,
          isPrivate: true as const,
        }))
    );

  return [...publicPhotos, ...privatePhotos];
}

const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

export function getAllPhotoSrcs(): string[] {
  return YEARS.flatMap(year => {
    const dir = path.join(process.cwd(), 'public', 'images', String(year));
    if (!fs.existsSync(dir)) return [];

    const srcs: string[] = [];

    // Loose files directly in the year folder
    fs.readdirSync(dir, { withFileTypes: true })
      .filter(e => e.isFile() && IMAGE_EXTS.has(path.extname(e.name).toLowerCase()) && !isLovePhoto(e.name))
      .forEach(e => srcs.push(`${BASE_PATH}/images/${year}/${e.name}`));

    // Files inside album subfolders (skip _private and other _ folders)
    fs.readdirSync(dir, { withFileTypes: true })
      .filter(e => e.isDirectory() && !e.name.startsWith('_'))
      .forEach(subDir => {
        fs.readdirSync(path.join(dir, subDir.name))
          .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()) && !isLovePhoto(f))
          .forEach(f => srcs.push(`${BASE_PATH}/images/${year}/${encodeURIComponent(subDir.name)}/${encodeURIComponent(f)}`));
      });

    return srcs;
  });
}

/**
 * Love photos: all images inside /public/images/love/
 * + any loose file in a year folder whose name contains a love keyword.
 */
export function getLovePhotos(): string[] {
  const srcs: string[] = [];

  // 1. Dedicated love folder
  const loveDir = path.join(process.cwd(), 'public', 'images', 'love');
  if (fs.existsSync(loveDir)) {
    fs.readdirSync(loveDir)
      .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .sort()
      .forEach(f => srcs.push(`${BASE_PATH}/images/love/${f}`));
  }

  // 2. Love-tagged loose files scattered in year folders
  YEARS.forEach(year => {
    const dir = path.join(process.cwd(), 'public', 'images', String(year));
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir)
      .filter(f =>
        IMAGE_EXTS.has(path.extname(f).toLowerCase()) &&
        isLovePhoto(f)
      )
      .sort()
      .forEach(f => srcs.push(`${BASE_PATH}/images/${year}/${f}`));
  });

  return srcs;
}

export interface Moment {
  name: string;
  slug: string;
  cover: string;
  count: number;
  photos: string[];
  isPrivate: boolean;
}

function formatName(slug: string): string {
  // Strip leading underscores (used by _private folder convention)
  const clean = slug.replace(/^_+/, '');
  // If name already contains Vietnamese/non-ASCII characters or spaces, return as-is
  // to avoid CSS/regex capitalize corrupting diacritics (e.g. "ChuyếN Du LịCh")
  if (/[^\x00-\x7F]/.test(clean) || clean.includes(' ')) return clean;
  return clean
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/** Photos from the Phú Quý trip folder specifically */
export function getPhuQuyPhotos(): string[] {
  const folderName = 'Chuyến du lịch Phú Quý';
  const dir = path.join(process.cwd(), 'public', 'images', '2026', folderName);
  if (!fs.existsSync(dir)) return [];
  const encodedFolder = encodeURIComponent(folderName);
  return fs
    .readdirSync(dir)
    .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .sort()
    .map(f => `${BASE_PATH}/images/2026/${encodedFolder}/${encodeURIComponent(f)}`);
}

export function getMomentsForYear(year: number): Moment[] {
  const yearDir = path.join(process.cwd(), 'public', 'images', String(year));
  if (!fs.existsSync(yearDir)) return [];

  return fs
    .readdirSync(yearDir, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('_'))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(dir => {
      const slugPath = path.join(yearDir, dir.name);
      const photos = fs
        .readdirSync(slugPath)
        .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
        .sort()
        .map(f => `${BASE_PATH}/images/${year}/${encodeURIComponent(dir.name)}/${encodeURIComponent(f)}`);
      return {
        name: formatName(dir.name),
        slug: dir.name,
        cover: photos[0] ?? '',
        count: photos.length,
        photos,
        isPrivate: dir.name.startsWith('_'),
      };
    })
    .filter(m => m.count > 0);
}
