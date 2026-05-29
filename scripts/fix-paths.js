const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) fix(full);
  }
}

function fix(file) {
  const original = fs.readFileSync(file, 'utf8');
  // Make /_next/ and /images/ paths relative so they work when opened from any folder
  const fixed = original
    .replace(/"\/_next\//g, '"_next/')
    .replace(/'\/_next\//g, "'_next/")
    .replace(/"\/images\//g, '"images/')
    .replace(/"\/favicon/g, '"favicon');
  if (fixed !== original) {
    fs.writeFileSync(file, fixed, 'utf8');
    console.log('Fixed:', path.relative(outDir, file));
  }
}

walk(outDir);
console.log('All paths made relative.');
