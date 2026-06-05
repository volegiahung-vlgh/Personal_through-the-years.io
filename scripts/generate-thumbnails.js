/**
 * Generate WebP thumbnails for all images in public/images/.
 * Output: public/images/_thumbs/<original-relative-path>.webp
 *
 * Usage:
 *   npm install sharp --save-dev
 *   npm run thumbnails
 *
 * Skips files that already have an up-to-date thumbnail.
 * Safe to re-run — only processes new/changed files.
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const THUMBS_DIR = path.join(IMAGES_DIR, '_thumbs');
const THUMB_WIDTH = 600;   // px — gallery grid uses ~25vw, 600px is enough
const THUMB_QUALITY = 72;  // WebP quality

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.heic', '.heif']);

let processed = 0;
let skipped = 0;
let errors = 0;

async function processImage(inputPath, outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await sharp(inputPath)
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: THUMB_QUALITY })
    .toFile(outputPath);
}

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_thumbs') continue;
      await walk(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (!IMAGE_EXTS.has(ext)) continue;

      const relative = path.relative(IMAGES_DIR, fullPath);
      const outputRelative = relative.replace(/\.[^.]+$/, '.webp');
      const outputPath = path.join(THUMBS_DIR, outputRelative);

      // Skip if thumbnail is newer than source
      if (fs.existsSync(outputPath)) {
        const srcMtime = fs.statSync(fullPath).mtimeMs;
        const outMtime = fs.statSync(outputPath).mtimeMs;
        if (outMtime >= srcMtime) {
          skipped++;
          continue;
        }
      }

      try {
        process.stdout.write(`  → ${relative}\n`);
        await processImage(fullPath, outputPath);
        processed++;
      } catch (err) {
        process.stderr.write(`  ✗ ${relative}: ${err.message}\n`);
        errors++;
      }
    }
  }
}

async function main() {
  console.log('Generating thumbnails...\n');
  const start = Date.now();
  await walk(IMAGES_DIR);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s — ${processed} generated, ${skipped} skipped, ${errors} errors`);
}

main().catch(err => { console.error(err); process.exit(1); });
