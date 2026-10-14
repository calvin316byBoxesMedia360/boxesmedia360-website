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
  // Una ficha puede tener una sola imagen (file) o una galería (files); la primera es la portada
  const sources = Array.isArray(p.files) && p.files.length ? p.files : [p.file];
  const images = [];
  for (const [i, file] of sources.entries()) {
    const src = await load(file, true);
    const name = sources.length > 1 ? `${p.id}-${String(i + 1).padStart(2, '0')}.webp` : `${p.id}.webp`;
    // sharp no copia metadatos (EXIF/GPS) salvo que se pida con withMetadata()
    const img = sharp(src).rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true });
    const info = await img.webp({ quality: 80 }).toFile(join(OUT_IMG, name));
    images.push({ src: `/portfolio/${name}`, width: info.width, height: info.height });
    console.log(`✓ ${name} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
  }
  items.push({
    id: p.id,
    client: String(p.client),
    title: String(p.title),
    category: String(p.category),
    image: images[0].src,
    width: images[0].width,
    height: images[0].height,
    images,
    ...(safeUrl(p.url) ? { url: safeUrl(p.url) } : {}),
  });
}

await writeFile(OUT_JSON, JSON.stringify({ source: data.repository, items }, null, 2) + '\n');
console.log(`\n${items.length} proyectos → src/data/portfolio.json`);

// Relación de las tarjetas de "Nuestro trabajo" con el portafolio (src/data/portfolio-cards.json).
// Los trabajos nuevos se asignan solos por categoría; aquí solo se avisa de lo que quedó sin tarjeta.
try {
  const { cards } = JSON.parse(await readFile(resolve('src/data/portfolio-cards.json'), 'utf8'));
  const mapped = (it) => Object.values(cards).some((c) => c.categories.includes(it.category) || c.ids.includes(it.id));
  console.log('\nTarjetas de "Nuestro trabajo":');
  for (const [key, rule] of Object.entries(cards)) {
    const n = items.filter((it) => rule.categories.includes(it.category) || rule.ids.includes(it.id)).length;
    console.log(`  ${key}: ${n} trabajo(s)${n === 0 ? '  ⚠ sin trabajos, revisa sus categorías' : ''}`);
  }
  const orphans = items.filter((it) => !mapped(it));
  if (orphans.length) {
    console.warn('\n⚠ Trabajos sin tarjeta (agrega su categoría o id en src/data/portfolio-cards.json):');
    for (const it of orphans) console.warn(`  - ${it.id} (${it.category})`);
  }
} catch (err) {
  console.warn('\nNo se pudo revisar portfolio-cards.json:', err.message);
}
