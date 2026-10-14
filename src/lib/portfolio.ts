import { useCallback, useEffect, useState } from 'react';
import localData from '../data/portfolio.json';
import { PORTAL_PORTFOLIO_URL, PORTAL_TIMEOUT_MS, PORTFOLIO_SOURCE } from '../config/portfolio';

export type PortfolioImage = { src: string; thumb: string; width?: number; height?: number };

export type PortfolioItem = {
  id: string;
  client: string;
  title: string;
  description?: string;
  category: string;
  url?: string;
  image: string;
  thumb: string;
  width?: number;
  height?: number;
  images: PortfolioImage[];
};

// loading: esperando al portal | ready: datos listos | fallback: el portal falló y se muestra la copia local
// disabled: el portal tiene el portafolio desactivado (activo: false)
export type PortfolioStatus = 'loading' | 'ready' | 'fallback' | 'disabled';

type LocalItem = {
  id: string; client: string; title: string; category: string; image: string; width: number; height: number;
  url?: string; images?: { src: string; width: number; height: number }[];
};

export const localPortfolio: PortfolioItem[] = (localData.items as LocalItem[]).map((it) => ({
  id: it.id,
  client: it.client,
  title: it.title,
  category: it.category,
  url: it.url,
  image: it.image,
  thumb: it.image,
  width: it.width,
  height: it.height,
  images: (it.images?.length ? it.images : [{ src: it.image, width: it.width, height: it.height }]).map((i) => ({
    src: i.src, thumb: i.src, width: i.width, height: i.height,
  })),
}));

const isHttps = (u: unknown): u is string => typeof u === 'string' && /^https:\/\//i.test(u);
const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// La respuesta del portal es datos externos: se valida y se normaliza antes de usarla.
function normalizePortalProject(raw: unknown): PortfolioItem | null {
  if (!raw || typeof raw !== 'object') return null;
  const p = raw as Record<string, unknown>;
  const id = text(p.id, 80);
  const title = text(p.title, 200);
  if (!id || !title) return null;

  const rawImages = Array.isArray(p.images) ? p.images : [];
  const images: PortfolioImage[] = [];
  for (const entry of rawImages) {
    const e = (entry ?? {}) as Record<string, unknown>;
    if (isHttps(e.image)) images.push({ src: e.image, thumb: isHttps(e.thumbnail) ? e.thumbnail : e.image });
  }
  const image = isHttps(p.image) ? p.image : images[0]?.src;
  if (!image) return null;
  if (!images.length) images.push({ src: image, thumb: isHttps(p.thumbnail) ? p.thumbnail : image });

  return {
    id,
    client: text(p.client, 120),
    title,
    description: text(p.description, 600) || undefined,
    category: text(p.category, 60) || 'General',
    url: isHttps(p.url) ? p.url : undefined,
    image,
    thumb: images[0].thumb,
    images,
  };
}

type PortalResult = { items: PortfolioItem[]; disabled: boolean };
let portalRequest: Promise<PortalResult> | null = null;
let portalCache: PortalResult | null = null;

function fetchPortal(force = false): Promise<PortalResult> {
  if (force) { portalRequest = null; portalCache = null; }
  if (portalCache) return Promise.resolve(portalCache);
  if (!portalRequest) {
    portalRequest = (async () => {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), PORTAL_TIMEOUT_MS);
      try {
        const res = await fetch(PORTAL_PORTFOLIO_URL, { credentials: 'omit', headers: { Accept: 'application/json' }, signal: controller.signal });
        if (!res.ok) throw new Error(`Portal ${res.status}`);
        const data = (await res.json()) as { activo?: unknown; projects?: unknown };
        if (data.activo === false) return (portalCache = { items: [], disabled: true });
        const items = (Array.isArray(data.projects) ? data.projects : [])
          .map(normalizePortalProject)
          .filter((x): x is PortfolioItem => x !== null);
        if (!items.length) throw new Error('El portal no devolvió proyectos válidos');
        return (portalCache = { items, disabled: false });
      } finally {
        window.clearTimeout(timer);
      }
    })().catch((err) => { portalRequest = null; throw err; });
  }
  return portalRequest;
}

type State = { items: PortfolioItem[]; status: PortfolioStatus };

function initialState(): State {
  if (PORTFOLIO_SOURCE !== 'portal') return { items: localPortfolio, status: 'ready' };
  if (portalCache) return { items: portalCache.items, status: portalCache.disabled ? 'disabled' : 'ready' };
  return { items: [], status: 'loading' };
}

// Portafolio para toda la web: de la copia local o del portal según config/portfolio.ts.
export function usePortfolio() {
  const [state, setState] = useState<State>(initialState);

  const load = useCallback((force = false) => {
    if (PORTFOLIO_SOURCE !== 'portal') return;
    setState((s) => (s.status === 'loading' ? s : { ...s, status: 'loading' }));
    fetchPortal(force)
      .then((r) => setState({ items: r.items, status: r.disabled ? 'disabled' : 'ready' }))
      .catch((err) => {
        if (import.meta.env.DEV) console.warn('[portafolio] No se pudo leer el portal, se usa la copia local:', err);
        setState({ items: localPortfolio, status: 'fallback' });
      });
  }, []);

  useEffect(() => {
    if (PORTFOLIO_SOURCE === 'portal' && state.status === 'loading') load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items: state.items, status: state.status, retry: () => load(true) };
}
