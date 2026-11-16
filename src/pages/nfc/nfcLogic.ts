// Lógica pura del Grabador NFC (sin React ni Firebase): armar la URL y calcular
// cuántos bytes ocupa en el chip como mensaje NDEF.

export const CAP: Record<number, number> = { 213: 144, 215: 504, 216: 888 };

export const TIPOS = [
  { value: 'tarjeta-215', label: 'Tarjeta PVC · NTAG215' },
  { value: 'tarjeta-216', label: 'Tarjeta PVC · NTAG216' },
  { value: 'tarjeta-213', label: 'Tarjeta PVC · NTAG213' },
  { value: 'sticker-213', label: 'Sticker redondo · NTAG213' },
  { value: 'sticker-215', label: 'Sticker redondo · NTAG215' },
  { value: 'sticker-216', label: 'Sticker redondo · NTAG216' },
] as const;

export type Tipo = (typeof TIPOS)[number]['value'];
export type Estado = 'pendiente' | 'grabado' | 'bloqueado';

export const TIPO_LABEL: Record<string, string> = Object.fromEntries(TIPOS.map(t => [t.value, t.label]));

const PREFIXES: [string, number][] = [
  ['https://www.', 2], ['http://www.', 1], ['https://', 4], ['http://', 3], ['tel:', 5], ['mailto:', 6],
];
const enc = new TextEncoder();

export function slug(s: string) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

export function chipOf(tipo: string) {
  return Number(tipo.split('-')[1]);
}

// Solo se permiten esquemas seguros para grabar en un chip que tocarán clientes.
const ALLOWED = /^(https?:|tel:|mailto:)$/;

export function buildUrl(raw: string, opts: { utm: boolean; tipo: string; cliente: string }): { url: string; err: string | null } {
  let v = raw.trim();
  if (!v) return { url: '', err: null };
  if (!/^[a-z][a-z0-9+.-]*:/i.test(v)) v = 'https://' + v;
  let u: URL;
  try { u = new URL(v); } catch { return { url: '', err: 'La URL no es válida. Revisa que no tenga espacios.' }; }
  if (!ALLOWED.test(u.protocol)) return { url: '', err: 'Solo se permiten enlaces https://, http://, tel: o mailto:.' };
  if (!/^https?:$/.test(u.protocol)) return { url: u.href, err: null };
  if (!u.hostname.includes('.')) return { url: '', err: 'Falta el dominio completo (por ejemplo loscuates.com).' };
  if (opts.utm) {
    u.searchParams.set('utm_source', 'nfc');
    u.searchParams.set('utm_medium', opts.tipo.split('-')[0]);
    const c = slug(opts.cliente);
    if (c) u.searchParams.set('utm_campaign', c);
  }
  return { url: u.href, err: null };
}

// Tamaño exacto en el chip: TLV(03,len) + registro NDEF tipo 'U' + terminador FE
export function ndefBytes(url: string) {
  let code = 0;
  let rest = url;
  for (const [p, c] of PREFIXES) {
    if (url.toLowerCase().startsWith(p)) { code = c; rest = url.slice(p.length); break; }
  }
  void code;
  const payload = 1 + enc.encode(rest).length;
  const record = 1 + 1 + (payload > 255 ? 4 : 1) + 1 + payload;
  return 1 + (record >= 255 ? 3 : 1) + record + 1;
}
