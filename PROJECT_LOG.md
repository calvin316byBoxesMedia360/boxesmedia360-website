# PROJECT LOG — BoxesMedia360 Website

> Este archivo registra todas las decisiones, cambios y eventos importantes del proyecto.
> **Regla:** Cada deploy, cambio relevante o decisión de arquitectura debe quedar aquí.
> Formato de entrada: `## [FECHA] — Título`, de más reciente a más antiguo.

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
