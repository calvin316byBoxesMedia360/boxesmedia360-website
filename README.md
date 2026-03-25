# BoxesMedia360 — Sitio Web Corporativo

> **URL en producción:** [boxesmedia360.com](https://boxesmedia360.com)
> **Firebase Hosting:** [boxesmedia-web.web.app](https://boxesmedia-web.web.app)
> **Firebase Project:** `boxesmedia-web` (Plan Blaze)

Sitio web público de **BoxesMedia360**, estudio creativo 360° especializado en branding, diseño gráfico, producción audiovisual, soluciones digitales, pre-prensa y pantallas LED.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Estilos | Tailwind CSS 3 |
| i18n | i18next (ES / EN) |
| Hosting | Firebase Hosting (`boxesmedia-web`) |
| Auth | Firebase Auth |
| Base de datos | Firestore + Supabase |
| Pagos | Stripe |
| Charts | Recharts |
| Icons | Remix Icon (CDN) |

---

## Estructura del Proyecto

```
boxesmedia360-website/
├── src/
│   ├── pages/
│   │   ├── home/               ← Sitio público (boxesmedia360.com)
│   │   │   ├── page.tsx        ← Página principal
│   │   │   └── components/
│   │   │       ├── Navigation.tsx
│   │   │       ├── Hero.tsx
│   │   │       ├── Services.tsx
│   │   │       ├── ValueProposition.tsx
│   │   │       ├── Process.tsx
│   │   │       ├── Portfolio.tsx
│   │   │       ├── Scheduling.tsx
│   │   │       └── Footer.tsx
│   │   ├── dashboard/          ← Dashboard interno
│   │   ├── crm/                ← CRM de clientes
│   │   ├── auth/               ← Login
│   │   └── finance/            ← Módulo de finanzas
│   ├── components/
│   │   ├── ProtectedRoute.tsx
│   │   └── SEOHead.tsx
│   ├── config/
│   │   └── firebase.ts         ← Config Firebase (usa .env)
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useClients.ts
│   ├── i18n/
│   │   ├── local/es/common.ts  ← Textos en español
│   │   └── local/en/common.ts  ← Textos en inglés
│   ├── router/
│   │   └── config.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── images/                 ← Imágenes del sitio
├── out/                        ← Build de producción (generado, no versionar)
├── firebase.json
├── .firebaserc
├── vite.config.ts
├── tailwind.config.ts
├── README.md                   ← Este archivo
├── SYSTEM_CONTRACT.md          ← Contrato del sistema
└── PROJECT_LOG.md              ← Registro de cambios
```

---

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo local (http://localhost:3000)
npm run dev

# Compilar para producción
npm run build

# Preview del build
npm run preview

# Desplegar a Firebase (producción)
firebase deploy --project boxesmedia-web

# Desplegar solo hosting
firebase deploy --only hosting --project boxesmedia-web
```

---

## Variables de Entorno

Crear archivo `.env` en la raíz con:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> Las credenciales se obtienen en Firebase Console → Configuración del proyecto → Tus apps.

---

## Secciones del Sitio

| Sección | Componente | Descripción |
|---------|-----------|-------------|
| Hero | `Hero.tsx` | Portada con stats interactivos (75% más rápido, 100+ marcas, 5.0 satisfacción) |
| Servicios | `Services.tsx` | 6 servicios: Branding, Diseño Gráfico, Digital, Audiovisual, Pre-prensa, LED |
| Propuesta de Valor | `ValueProposition.tsx` | Diferenciador "Time-to-Market Revolucionario" |
| Proceso | `Process.tsx` | 5 pasos: Descubrimiento → Estrategia → Diseño → Producción → Lanzamiento |
| Portafolio | `Portfolio.tsx` | Proyectos filtrados por categoría |
| Agendar | `Scheduling.tsx` | Formulario de agendamiento de llamadas |
| Footer | `Footer.tsx` | Links, contacto y redes sociales |

---

## Historial de Deploys Firebase

| Fecha | Tipo | Usuario | Version | Archivos |
|-------|------|---------|---------|----------|
| 20 mar 2026, 1:20 AM | ROLLBACK | calvin316@boxesmedia360.com | 6ffd1f | 31 |
| 6 mar 2026, 11:20 AM | DEPLOY | boxesmedia360@gmail.com | 166c79 | 11 |
| 6 mar 2026, 10:58 AM | DEPLOY | boxesmedia360@gmail.com | d787fc | 11 |
| 12 feb 2026, 11:37 AM | **DEPLOY** ✅ | boxesmedia360@gmail.com | **6ffd1f** | **31** |

> La versión live actual es el rollback a `6ffd1f` (build del 12 feb 2026 con 31 archivos).

---

## Cuentas y Accesos

| Servicio | Cuenta |
|---------|--------|
| Firebase (proyecto principal) | boxesmedia360@gmail.com |
| Firebase CLI (alternativa) | calvin316@boxesmedia360.com |
| Netlify (espejo antiguo) | skynetnewsbyboxesmedia360@gmail.com |
| GitHub | calvin316byBoxesMedia360 |
