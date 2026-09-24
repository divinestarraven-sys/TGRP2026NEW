import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const source = join(root, 'src');
const app = readFileSync(join(source, 'App.tsx'), 'utf8');
const pages = new Map();
const errors = [];

for (const [, route, component] of app.matchAll(/<Route path="([^"]+)" element=\{<([A-Za-z]+) \/>\}/g)) {
  pages.set(route, component);
}

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : /\.(tsx?|jsx?)$/.test(path) ? [path] : [];
  });
}

function checkAsset(path, label) {
  const file = join(root, 'public', path.slice(1));
  if (!existsSync(file) || statSync(file).size === 0) {
    errors.push(`${label}: missing or empty ${path}`);
  } else if (path.endsWith('.pdf') && readFileSync(file).subarray(0, 5).toString() !== '%PDF-') {
    errors.push(`${label}: invalid PDF ${path}`);
  }
}

for (const file of sourceFiles(source)) {
  const content = readFileSync(file, 'utf8');
  const links = [
    ...content.matchAll(/\b(?:to|href)="(\/[^\"]*)"/g),
    ...content.matchAll(/\bpath:\s*'(\/[^']*)'/g),
  ];
  for (const [, link] of links) {
    const [route, anchor] = link.split('#');
    if (route.startsWith('/downloads/')) checkAsset(route, file);
    else if (!pages.has(route)) errors.push(`${file}: missing route ${route}`);
    if (anchor && pages.has(route)) {
      const target = join(source, 'pages', `${pages.get(route)}.tsx`);
      if (!readFileSync(target, 'utf8').includes(`id="${anchor}"`)) {
        errors.push(`${file}: missing anchor ${link}`);
      }
    }
  }
  for (const [, anchor] of content.matchAll(/\bhref="#([^"]+)"/g)) {
    if (!content.includes(`id="${anchor}"`)) errors.push(`${file}: missing anchor #${anchor}`);
  }
}

const gallery = readFileSync(join(source, 'data/gallery.ts'), 'utf8');
for (const [, filename] of gallery.matchAll(/\$\{GALLERY_BASE_PATH\}\/([^`]+)`/g)) {
  checkAsset(`/Gallery/${filename}`, 'gallery');
}
checkAsset('/audio/01-main-bgm.mp3', 'audio player');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.size} routes, ${sourceFiles(source).length} source files, gallery, audio, and downloads.`);
}
