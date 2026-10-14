# PROJECT LOG — BoxesMedia360 Website

> Este archivo registra todas las decisiones, cambios y eventos importantes del proyecto.
> **Regla:** Cada deploy, cambio relevante o decisión de arquitectura debe quedar aquí.
> Formato de entrada: `## [FECHA] — Título`, de más reciente a más antiguo.

---

## [2026-10-14] — Un solo portafolio: el sitio puede leer el portal (interruptor `local`/`portal`)

**Por:** Calvin (con Claude)

**Contexto:** el portal (bm360.netlify.app, tarjeta digital) es el maestro editorial del portafolio; `boxesmedia360-portfolio` en GitHub queda como importación y respaldo. El portal importa desde GitHub `main`, que tenía la versión anterior a las correcciones.

**Hecho:**
- Portafolio público (repo `boxesmedia360-portfolio`): PR #1 fusionado a `main` (commit `0904c06`): tanda 3 con 32 proyectos, galerías ampliadas, 30 fotos corregidas y `clinic84-banner`. El otro agente reimporta desde ese commit leyendo `portfolio-publico.json` → `files` (el portal ya admite 16 imágenes por proyecto) y conserva lo editado en el portal (p. ej. «NFC tags»).
- Sitio: PR #1 fusionado a `master` (commit `498a945`) y desplegado a Firebase; el sitio en vivo ya tiene el video del Hero, las vistas previas de "Nuestro trabajo", la bandera de México y el resto de cambios.
- Conexión sitio ↔ portal preparada, **apagada por defecto** (`PORTFOLIO_SOURCE = 'local'` en `src/config/portfolio.ts`): lectura de la API pública `https://bm360.netlify.app/api/c/boxesmedia360/portfolio` con `credentials: 'omit'`, validación y normalización de la respuesta (solo URLs https), miniaturas en las cuadrículas e imagen completa al ampliar, estados de carga (esqueleto), `activo: false` (mensaje de portafolio en actualización) y respaldo automático a la copia local si el portal falla (con aviso y "Reintentar"). Lógica en `src/lib/portfolio.ts` (`usePortfolio`); usada por la home y por `/portafolio`.
- CSP de `firebase.json`: se permite `https://bm360.netlify.app` en `img-src` y `connect-src`.
- La categoría `General` (p. ej. «NFC tags») se suma a la tarjeta de "Branding Comercial para PYMEs" en `src/data/portfolio-cards.json`; en desarrollo la consola avisa de trabajos sin tarjeta.
- Probar sin tocar código: `npm run dev:portal` (modo `portal`, `.env.portal`). Verificado: 17 proyectos del portal con sus imágenes, filtros y `General`; tarjetas de la home; fallo del portal → 32 trabajos locales con aviso.

**Para activar la conexión (cuando el portal tenga los 32 proyectos y las galerías):**
1. Comprobar en `npm run dev:portal` mismos IDs, textos, orden e imágenes que la tarjeta.
2. Cambiar el valor por defecto de `PORTFOLIO_SOURCE` a `'portal'` en `src/config/portfolio.ts`, abrir PR y fusionar (publica a producción).
3. `npm run sync:portfolio` queda como copia de respaldo local (se puede refrescar de vez en cuando).

**Pendientes:**
- [ ] Terminar la importación en el portal (15 IDs nuevos + galerías) y revisar/publicar allí.
- [ ] Activar `PORTFOLIO_SOURCE = 'portal'` tras la comprobación.
- [ ] Decidir si la tarjeta «Rotulación Comercial Iluminada» recoge además otras categorías cuando el portal tenga los trabajos de rotulación.

---

## [2026-10-13] — Hero, idioma y vistas previas del portafolio

**Por:** Calvin (con Claude)

**Cambios (en el código, sin commit ni deploy aún):**
- Hero: el botón principal ahora dice "Ver Servicios" / "View Services" (antes "Empezar Ahora") y hace scroll a `#servicios` en lugar de `#contact`.
- Selector de idioma: la bandera de España se reemplazó por la de México (nuevo componente `src/components/FlagMX.tsx`, usado en el botón y en el menú desplegable).
- "Nuestro trabajo": las 6 tarjetas ahora abren una mini ventana (`PortfolioPreview.tsx`) con las fotos reales del portafolio que les corresponden, con navegación (flechas, miniaturas, teclado, Esc), enlace "Visitar sitio" cuando la ficha tiene URL y "Ver portafolio completo". Cada tarjeta muestra un contador de fotos.
- Relación tarjeta ↔ portafolio: `src/data/portfolio-cards.json` (por `categories` e `ids`). Hoy: Identidad (2), Web (4), Imagen de producto + 4 ids (6), Rotulación vehicular/vitrinas (3), Impresos/Textil + 2 ids (10), Menús digitales/Gran formato (7); los 32 trabajos quedan asignados.
- `scripts/sync-portfolio.mjs`: al sincronizar muestra cuántos trabajos tiene cada tarjeta y avisa de trabajos sin tarjeta (categorías nuevas) para añadirlos al JSON.
- Hero en móvil: el video horizontal casi no se apreciaba (franja central de ~27 %, capa muy oscura). Ahora hay un recorte vertical 9:16 (`public/videos/hero-loop-vertical.mp4`, ~0.35 MB, reemplaza a `hero-loop-mobile.mp4`) centrado en el monitor con la lata en pantalla, las latas del set y el diseñador; con poster vertical, capa más ligera y vertical (más oscura arriba, donde va el título), `object-position` a la izquierda y el video desplazado hacia abajo con degradado para que el monitor quede libre bajo los botones. Escritorio sin cambios. En móvil el strobe queda fuera del encuadre: el flash se nota como destello de luz en el fondo.
- Hero, arranque del video más robusto: se fuerza `muted`/`playsinline` en el DOM (React no escribe `muted` y algunos navegadores bloquean el autoplay), se reintenta `play()` al volver a la pestaña o en el primer gesto, y el video aparece con fade-in (1.5 s) sobre la imagen cuando empieza a reproducir; si no arranca, queda la imagen del estudio.
- Hero, más fade: el video entra con fade-in de 3 s; el contenido (etiqueta, título, texto, botones y estadísticas) aparece escalonado con fade-in-up (clase `.hero-reveal`, respeta `prefers-reduced-motion`); el borde inferior se funde con la sección de servicios (claro y oscuro) y el indicador de scroll cambia de color para leerse sobre el fundido. En móvil, sombras más fuertes en las estadísticas para leerse sobre el fondo blanco del estudio.
- Modal de "¿Por qué BoxesMedia360?": el botón "Entendido" / "Got it" pasa a "Seguir explorando" / "Keep exploring" (`gotIt` en i18n).
- Portafolio, tanda 3 de fotos: 13 nuevas, 28 reemplazadas y 4 retiradas; proyecto nuevo `clinic84-banner` (32 trabajos en total). Revisadas una por una: sin rostros visibles, sin EXIF/GPS, máx 1400 px, 92 archivos / 14.6 MB. Los teléfonos y direcciones que aparecen son los de los negocios en sus propios impresos. Fotos flojas (desenfocadas) que se podrían sustituir: `loscuates-banner-03/05/08`.
- Verificado en preview: scroll a servicios, bandera en botón y menú, ventana de cada tarjeta (imagen, navegación, enlaces, cierre con Esc); `npm run build` OK.

**Pendientes:**
- [ ] Revisar a Calvin si las asignaciones por categoría le parecen bien (p. ej., "Campaña Audiovisual" usa fotos de producto y piezas gastronómicas porque aún no hay videos en el portafolio).
- [ ] Commit y push a `master`: solo con orden de Calvin.

---

## [2026-10-13] — Video de fondo animado en el Hero (integrado)

**Por:** Calvin (con Claude)

**Resultado final (integrado en el código, sin commit ni deploy aún):**
- Video: un diseñador de espaldas editando una página de producto en el monitor, con la misma lata (bebida energética ficticia) en pantalla y en el set (3 latas frente al fondo blanco) y un strobe con softbox nuevo que dispara un solo flash por ciclo. Fotograma base creado en local (Flux 2 Klein 9B en Wan2GP/Pinokio) y animado con Gemini; la animación local con Wan 2.2 se descartó por deriva de cámara.
- Loop: ping-pong centrado en el flash (18 s), sin audio, para evitar el salto por la deriva de cámara del clip original.
- Archivos: `public/videos/hero-loop.webm` (~1.0 MB), `hero-loop.mp4` (~0.8 MB), `hero-loop-mobile.mp4` (~0.35 MB, ≤767 px) y `public/images/stock/hero-poster.jpg`.
- Código: `src/pages/home/components/Hero.tsx` — `<video autoPlay muted loop playsInline>` detrás de la capa de desenfoque/degradado existente; no se carga con `prefers-reduced-motion` ni `saveData` (queda la imagen `hero-studio.webp`). La CSP (`default-src 'self'`) ya permite el video.
- Botón "Ver portafolio" del Hero: ahora es un `<Link to="/portafolio">` que abre la página completa del portafolio (antes hacía scroll a la sección `#portafolio` de la home). Verificado en preview.
- Verificado: `npm run build` OK, reproducción en preview (WebM en escritorio, MP4 ligero en móvil), sin errores de consola.
- Materiales de trabajo: carpeta `hero-video/` (`agente.md`, `skill.md`, `memoria.md`, fotogramas y clips) y `reports/2026-10-13-hero-video.html`.

**Contexto (inicio de la sesión):**
Calvin propuso dar movimiento al fondo del Hero: usar la misma imagen actual pero en video, con dos diseñadores moviéndose de forma natural, siempre desenfocados (luego cambió a un solo diseñador).

**Criterios acordados / recomendados:**
- Loop corto y sin costuras (8–12 s), movimiento lento y sutil; el desenfoque disimula defectos del video generado con IA.
- Capa de desenfoque leve + overlay `navy` (modo oscuro) / `paper` (modo claro) para mantener legible el texto del hero.
- Imagen actual del hero como `poster` y respaldo para: móviles con `saveData`, `prefers-reduced-motion` y mientras carga.
- Peso objetivo 1–2 MB: 720p, sin audio, MP4 (H.264) + WebM, `autoplay muted loop playsInline`. Considerar desactivarlo o usar versión ligera en móvil.
- Alternativa sin video: siluetas PNG desenfocadas con parallax CSS.

**Cambio de enfoque (misma sesión):** Calvin reemplazó los dos diseñadores por **un solo diseñador sentado frente al monitor**, editando un website o una sesión de fotos, con movimientos mínimos en el cuerpo y en la pantalla (sutiles pero presentes). En los últimos segundos del loop hay un **flash de cámara de fondo**, como si el diseñador hiciera el disparo desde la computadora, y luego el loop vuelve a empezar.
- El flash sirve además como punto de corte del loop (tapa la costura).
- Flash accesible: destello cálido de 0.3–0.5 s con subida y bajada, sin blanco puro a máxima intensidad, un solo destello por ciclo; con `prefers-reduced-motion` solo se muestra el poster.
- Encuadre: diseñador de espaldas o en tres cuartos, a un lado, dejando libre el lado del texto; pantalla abstracta sin texto legible.
- Duración 8–10 s con el flash hacia el segundo 8–9. Generación en dos partes (escena base en loop + destello) unidas en edición.

**Reporte HTML:** `reports/2026-10-13-hero-video.html`

**Pendientes:**
- [x] Calvin aprobó el plan, el fotograma, el video y el loop.
- [x] Integrado en el Hero con fallbacks.
- [ ] Revisar el Hero a ancho de escritorio completo y en modo claro (el panel de preview era angosto); ajustar `object-position` u opacidad si hace falta.
- [ ] Commit y push a `master` (publica a producción por GitHub Actions): solo con orden de Calvin.

---

## [2026-10-13] — Sincronización con la versión en vivo, seguridad y mejoras visuales

**Por:** Calvin (con Claude)

**Contexto:**
El código en GitHub era más antiguo que lo publicado en boxesmedia360.com (build `6ffd1f`, 12 feb 2026). El sitio en vivo publicaba sus sourcemaps, lo que permitió recuperar los 26 archivos fuente exactos (verificados con SHA-256).

**Cambios:**
- Recuperado el código de la versión en vivo: páginas de servicios (`/servicios/*`), `Modal`, menú móvil, i18n ampliado, `index.html` con fuentes e íconos, animaciones en `index.css`.
- Hero y banner "Proceso probado": capa de desenfoque (blur) + degradado oscuro para legibilidad.
- Modo claro real: paleta hueso/beige (`paper`, `paper-soft`, `paper-deep`) en lugar de blanco puro; el tema se aplica al cargar (preferencia guardada o la del sistema) y se declara `color-scheme` para que el navegador no lo oscurezca a la fuerza.
- Textos con degradado ("mercado", "tu proyecto", etc.) con color sólido de respaldo (`.text-brand-gradient`).
- Tarjetas de "De la idea al mercado": las imágenes ahora son visibles (antes tenían opacidad 0 hasta hacer hover).
- Corregidas claves i18n rotas (`common.tapToSeeMore`, `common.learnMore`, `common.gotIt`, `common.close`).
- Nuevas páginas `/privacidad` y `/terminos` (ES/EN); footer enlazado; "Powered by BoxesMedia360"; año dinámico.
- Seguridad: sourcemaps desactivados en producción, cabeceras de seguridad (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy), formulario con honeypot anti-spam, validación y límites de longitud, endpoint AJAX de FormSubmit, dev server solo en localhost, `npm audit fix`.
- SEO: `sitemap.xml` y `robots.txt` con el dominio real, `lang="es"`, meta description y título.
- CI: Node 20, build en cada PR, deploy solo en push a `master`.

**Pendientes:**
- [x] Imágenes de `readdy.ai` descargadas y alojadas en `public/images/stock/` (ya no hay dependencia externa).
- [ ] Activar alias aleatorio de FormSubmit para no exponer el correo en el código.
- [ ] Migrar el deploy de `FIREBASE_TOKEN` (obsoleto) a cuenta de servicio.
- [ ] Enlaces reales de Instagram/Facebook en el footer.
- [ ] Revisar los textos legales con un asesor.

---

## [2026-03-24] — Rescate y estructuración del proyecto

**Por:** Calvin (con Claude Code)

**Contexto:**
El código fuente del sitio no estaba en ningún repositorio Git. Los deploys se hacían de forma manual arrastrando la carpeta `out/` a Firebase Hosting. No había documentación ni trazabilidad.

**Acciones realizadas:**
- Localizado el código fuente en `C:\Users\boxes\Downloads\project-4278552\`
- Identificado que el origen del código fue generado con **Readdy AI** (evidenciado por el uso de `readdy.ai/api/search-image` y variables `__READDY_PROJECT_ID__` en vite.config.ts)
- Copiado el proyecto a `C:\Users\boxes\.gemini\antigravity\playground\boxesmedia360-website\`
- Creados los archivos de documentación: `README.md`, `SYSTEM_CONTRACT.md`, `PROJECT_LOG.md`
- Inicializado repositorio Git

**Estado del proyecto al momento de este registro:**

| Item | Estado |
|------|--------|
| URL pública | boxesmedia360.com ✅ |
| Firebase project | boxesmedia-web ✅ |
| Dominio custom conectado | Sí ✅ |
| Versión live | 6ffd1f (31 archivos) |
| Último deploy exitoso | 12 feb 2026 |
| Último rollback | 20 mar 2026 (revirtió deploys fallidos del 6 mar) |
| Código fuente en Git | ❌ → Iniciado hoy |
| CI/CD | ❌ Todo manual |
| Variables de entorno (.env) | ❌ No encontradas aún |

**Pendientes identificados:**
- [ ] Crear archivo `.env` con credenciales Firebase
- [ ] Conectar repo GitHub al proyecto Firebase para deploys automáticos
- [ ] Reemplazar imágenes de `readdy.ai` con fotografías reales
- [ ] Activar y completar los módulos `/dashboard`, `/crm`, `/finance`
- [ ] Configurar GitHub Actions para CI/CD
- [ ] Auditar performance con Lighthouse
- [ ] Verificar que el formulario de contacto y agendamiento funcionen en producción

---

## [2026-03-20] — Rollback de emergencia

**Por:** calvin316@boxesmedia360.com (via Firebase Console)

**Contexto:**
Los tres deploys realizados el 6 de marzo (versiones `166c79`, `3a0090`, `d787fc`) tenían solo 11 archivos vs. los 31 del build completo. Probablemente fueron builds incompletos o incorrectos.

**Acción:** Rollback manual a la versión `6ffd1f` del 12 de febrero de 2026.

**Resultado:** Sitio restaurado a la versión estable con 31 archivos.

---

## [2026-03-06] — Deploys fallidos (x3)

**Por:** boxesmedia360@gmail.com

**Versiones:** `166c79`, `3a0090`, `d787fc`
**Archivos:** 11 (incompleto — le faltan imágenes y assets)

**Causa probable:** Build incompleto o deploy de solo una parte del proyecto.
**Resolución:** Rollback el 20 de marzo.

---

## [2026-02-26] — Deploys (x2)

**Por:** boxesmedia360@gmail.com

**Versiones:** `64aeb916`, `3ab85956`
**Archivos:** 11 — misma situación que los del 6 de marzo.

---

## [2026-02-12] — Deploy estable ✅ (versión actual)

**Por:** boxesmedia360@gmail.com

**Versión:** `6ffd1f`
**Archivos:** 31 (completo)

**Contenido desplegado:**
- `index.html` + assets compilados (React/Vite)
- 15 imágenes de servicios
- `sitemap.xml`, `robots.txt`
- Firebase init files

Esta es la versión que actualmente sirve `boxesmedia360.com`.

---

## [2026-02-05] — Deploy anterior

**Por:** boxesmedia360@gmail.com
**Archivos:** 11

---

## [Antes de ene 2026] — Historial no recuperado

El sitio estuvo previamente en **Squarespace** y fue migrado a **Firebase Hosting**.
También existió un espejo en **Netlify** (`boxesmedia360.netlify.app`, último deploy: 3 ene 2026).

---

*Fin del registro. Agregar nuevas entradas al inicio de este archivo.*
