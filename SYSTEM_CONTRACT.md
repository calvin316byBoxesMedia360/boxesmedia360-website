# SYSTEM CONTRACT — BoxesMedia360 Website

> Versión: 1.0
> Fecha: 24 marzo 2026
> Propietario: BoxesMedia360 (boxesmedia360@gmail.com)

Este documento define las reglas, compromisos y límites del proyecto. Todo cambio significativo que afecte estas definiciones debe ser aprobado y registrado en `PROJECT_LOG.md`.

---

## 1. Propósito del Sistema

El sitio `boxesmedia360.com` es el **punto de entrada comercial** de BoxesMedia360. Su función es:

1. **Presentar la propuesta de valor** del estudio creativo
2. **Generar leads** a través de formularios de contacto y agendamiento
3. **Mostrar el portafolio** de trabajos realizados
4. **Construir credibilidad** con estadísticas, proceso y casos de éxito

---

## 2. Identidad Visual — Reglas Inviolables

| Elemento | Valor |
|---------|-------|
| Color primario | `#4EFFEF` (turquesa claro) |
| Color secundario | `#26A3AD` (turquesa oscuro) |
| Color de texto dark | `#2D3232` |
| Tipografía principal | Syne (Google Fonts) |
| Iconografía | Remix Icon (CDN) |
| Modo oscuro | Soportado — `dark:` classes de Tailwind |

**Nunca cambiar:** colores de marca sin aprobación. Son parte de la identidad corporativa.

---

## 3. Arquitectura y Separación de Responsabilidades

```
boxesmedia360.com  →  src/pages/home/     (PÚBLICO — sitio de marketing)
/dashboard         →  src/pages/dashboard/ (PRIVADO — requiere auth)
/crm               →  src/pages/crm/       (PRIVADO — requiere auth)
/finance           →  src/pages/finance/   (PRIVADO — requiere auth)
```

**Regla:** El sitio público NO debe tener dependencias de módulos privados. Son aplicaciones separadas que comparten el mismo repo y build.

---

## 4. Secciones del Sitio Público

El orden de las secciones en `src/pages/home/page.tsx` define el flujo de conversión. No reordenar sin análisis de impacto:

```
Navigation → Hero → Services → ValueProposition → Process → Portfolio → Scheduling → Footer
```

---

## 5. Internacionalización (i18n)

- El sitio soporta **Español (ES)** e **Inglés (EN)**
- Todos los textos visibles deben pasar por `useTranslation('common')`
- Archivos de traducción: `src/i18n/local/es/common.ts` y `src/i18n/local/en/common.ts`
- **Nunca hardcodear texto en componentes** — siempre usar las claves i18n

---

## 6. Imágenes y Assets

- Las imágenes propias van en `public/images/` y se referencian como `/images/archivo.jpg`
- Las imágenes de placeholder usan `readdy.ai/api/search-image` (API externa)
- **Objetivo a mediano plazo:** reemplazar todas las imágenes de readdy.ai con fotografías reales de BoxesMedia360

---

## 7. Pipeline de Deploy

```
Desarrollo local → npm run build → out/ → firebase deploy
```

- El directorio de publicación es `out/` (configurado en `firebase.json`)
- El proyecto Firebase es `boxesmedia-web`
- El dominio custom es `boxesmedia360.com` (conectado como dominio personalizado en Firebase)
- **No hay CI/CD automático** — todos los deploys son manuales

### Regla de deploy:
Antes de hacer `firebase deploy`, siempre:
1. Hacer `npm run build` y verificar que no haya errores
2. Hacer `npm run preview` y revisar visualmente
3. Registrar el deploy en `PROJECT_LOG.md`

---

## 8. Variables de Entorno

- Nunca commitear archivos `.env` al repositorio
- El archivo `.env` debe existir localmente con las credenciales de Firebase
- Si se agrega una nueva variable de entorno, documentarla en `README.md`

---

## 9. Control de Versiones (Git)

- Branch principal: `main`
- Todo cambio significativo debe tener un commit descriptivo
- Formato de commit: `tipo: descripción breve` (ej: `feat: agregar sección de testimonios`)
- Tipos válidos: `feat`, `fix`, `style`, `content`, `deploy`, `docs`, `refactor`

---

## 10. Módulos en Desarrollo (No Públicos)

Los siguientes módulos existen en el repo pero **no están activos en producción**:

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| `/dashboard` | En desarrollo | Dashboard operativo interno |
| `/crm` | En desarrollo | Gestión de clientes |
| `/finance` | Pendiente | Módulo de finanzas |
| `/files` | Pendiente | Gestión de archivos |

---

## 11. Dependencias Críticas

| Dependencia | Versión | Propósito |
|------------|---------|-----------|
| react | ^19.1.0 | Framework UI |
| react-router-dom | ^7.6.3 | Routing |
| firebase | 12.0.0 | Auth + Firestore + Hosting |
| @supabase/supabase-js | 2.57.4 | Base de datos alternativa |
| @stripe/react-stripe-js | 4.0.2 | Pagos |
| i18next | ^25.3.2 | Internacionalización |
| tailwindcss | ^3.4.17 | Estilos |
| vite | ^7.0.3 | Build tool |

**Regla:** Actualizar dependencias de forma deliberada, no automática. Registrar cada actualización en `PROJECT_LOG.md`.

---

## 12. Métricas de Éxito del Sitio

| Métrica | Objetivo |
|---------|---------|
| Tiempo de carga | < 3 segundos |
| Score Lighthouse Performance | > 85 |
| Score Lighthouse SEO | > 90 |
| Conversión (visita → contacto) | > 3% |
| Disponibilidad | 99.9% (garantizado por Firebase) |
