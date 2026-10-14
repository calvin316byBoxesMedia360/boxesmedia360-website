# BoxesMedia360 — sitio web (boxesmedia360.com)

Contexto para Claude Code. Dueño: Calvin (escribe en español; responde en español).

## Stack
React 19 + Vite 7 + Tailwind 3 (darkMode `class`) + i18next (ES/EN, namespace `common`) + react-router-dom 7.
Hosting: Firebase (proyecto `boxesmedia-web`). GitHub Actions publica al hacer push a `master`.

## Estado
- Rama de trabajo: `live-sync` (sincronizada con el sitio en vivo + todas las mejoras de oct 2026). Falta pushear y fusionar a `master`.
- Ver `PROJECT_LOG.md` y `SYSTEM_CONTRACT.md` para el historial completo.

## Puntos clave
- Formulario de contacto: `src/config/contact.ts` (`CONTACT_INBOX`). FormSubmit pide activar la casilla tras el primer envío desde el sitio publicado.
- Portafolio: `npm run sync:portfolio [ruta-local]` lee `portfolio-publico.json` del repo `boxesmedia360-portfolio` (carpeta hermana `../boxesmedia360-portfolio`) y genera `public/portfolio/*.webp` + `src/data/portfolio.json`.
- Portafolio único: el maestro es el portal (bm360.netlify.app); GitHub `boxesmedia360-portfolio` es importación/respaldo. El sitio lee el portal con `PORTFOLIO_SOURCE` en `src/config/portfolio.ts` (`'local'` = copia incluida, `'portal'` = API pública con respaldo local); probar con `npm run dev:portal`. Las fotos nuevas se preparan en el repo del portafolio, se suben por PR a `main` y el portal las importa; no editar el portal sin tu sesión de dueño.
- Tarjetas de "Nuestro trabajo" (home): cada una abre una mini ventana con las fotos del portafolio que le corresponden. La relación está en `src/data/portfolio-cards.json` (por `categories` e `ids` de `portfolio.json`); los trabajos nuevos se asignan solos por categoría, y `npm run sync:portfolio` avisa si una categoría nueva quedó sin tarjeta.
- Colores: `navy` (#111827) para modo oscuro, `paper` (#E6DFD2) para modo claro.
- Imágenes de stock en `public/images/stock/` (originales de Readdy, ya no dependemos de readdy.ai).
- Fotos de clientes: sin EXIF/GPS, máx 2000 px, rostros difuminados.
- Preferencia: consultar a Calvin antes de generar cualquier video.
