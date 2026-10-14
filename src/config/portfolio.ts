// De dónde sale el portafolio que muestra el sitio.
//   'local'  -> la copia incluida en el sitio (src/data/portfolio.json, generada con npm run sync:portfolio)
//   'portal' -> la API pública del portal (se lee al abrir la galería); si falla, se usa la copia local
// Se cambia aquí, o para probar sin tocar el código: npm run dev:portal (modo "portal", ver .env.portal).
export type PortfolioSource = 'local' | 'portal';

export const PORTFOLIO_SOURCE: PortfolioSource =
  import.meta.env.VITE_PORTFOLIO_SOURCE === 'portal' ? 'portal' : 'local';

// Lectura pública del catálogo publicado del portal (sin login ni claves).
export const PORTAL_PORTFOLIO_URL = 'https://bm360.netlify.app/api/c/boxesmedia360/portfolio';

// Tiempo máximo de espera antes de usar la copia local.
export const PORTAL_TIMEOUT_MS = 8000;
