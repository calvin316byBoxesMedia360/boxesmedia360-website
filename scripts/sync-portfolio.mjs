// Sincroniza el portafolio público desde el repo boxesmedia360-portfolio.
// Uso:
//   npm run sync:portfolio                 -> descarga desde GitHub
//   npm run sync:portfolio -- ../carpeta   -> usa una copia local del repo
// Lee portfolio-publico.json, optimiza las imágenes (WebP) en public/portfolio/
// y escribe src/data/portfolio.json para que el sitio lo consuma.
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const RAW = 'https://raw.githubusercontent.com/calvin316byBoxesMedia360/boxesmedia360-portfolio/main/';
const localDir = process.argv[2] ? resolve(process.argv[2]) : null;
const OUT_IMG = resolve('public/portfolio');
const OUT_JSON = resolve('src/data/portfolio.json');

async function load(file, asBuffer = false) {
  if (localDir) {
    const b = await readFile(join(localDir, file));
    return asBuffer ? b : b.toString('utf8');
  }
  const res = await fetch(RAW + encodeURI(file));
  if (!res.ok) throw new Error(`No se pudo descargar ${file}: ${res.status}`);
  return asBuffer ? Buffer.from(await res.arrayBuffer()) : res.text();
}

const safeUrl = (u) => {
  if (!u) return undefined;
  try {
    const url = new URL(u);
    return url.protocol === 'https:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

const data = JSON.parse(await load('portfolio-publico.json'));
await rm(OUT_IMG, { recursive: true, force: true });
await mkdir(OUT_IMG, { recursive: true });
await mkdir(resolve('src/data'), { recursive: true });

const items = [];
for (const p of data.projects) {
  if (!/^[a-z0-9-]+$/i.test(p.id)) throw new Error(`id inválido: ${p.id}`);
  const src = await load(p.file, true);
  const name = `${p.id}.webp`;
  const img = sharp(src).rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true });
  const info = await img.webp({ quality: 80 }).toFile(join(OUT_IMG, name));
  items.push({
    id: p.id,
    client: String(p.client),
    title: String(p.title),
    category: String(p.category),
    image: `/portfolio/${name}`,
    width: info.width,
    height: info.height,
    ...(safeUrl(p.url) ? { url: safeUrl(p.url) } : {}),
  });
  console.log(`✓ ${p.id} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}

await writeFile(OUT_JSON, JSON.stringify({ source: data.repository, items }, null, 2) + '\n');
console.log(`\n${items.length} proyectos → src/data/portfolio.json`);
