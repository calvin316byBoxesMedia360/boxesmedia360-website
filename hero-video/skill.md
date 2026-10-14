# Skill — Generar el loop de video del Hero

Procedimiento repetible. Cada paso termina con la aprobación de Calvin antes de pasar al siguiente.

## 0. Preparación
- Encender Pinokio y abrir **Wan2GP** (`C:\pinokio\api\wan`). Si la UI no responde, lanzar `start.js` desde Pinokio.
- Base: `public/images/stock/hero-studio.webp` (estudio con fondo blanco, luces, silla vacía abajo a la derecha).
- Salidas de Wan2GP: `C:\pinokio\api\wan\app\outputs`. Copiar lo elegido a `hero-video/`.

## 1. Fotograma base (imagen)
- Modelo: **Flux 2 Klein 9B**, modo edición con `hero-studio.webp` como referencia.
- Prompt (en inglés, mejores resultados):
  > Same photography studio, unchanged. A male graphic designer in casual clothes (dark t-shirt, jeans) sits in the black office chair at the desk, seen from behind, facing the monitor. The monitor shows a modern website layout (abstract blocks, no readable text). Natural, realistic, same lighting and perspective.
- Negativos/vigilar: cara visible, texto legible, logos, manos deformes, cambios en el estudio.
- Salida: 3–4 variantes → Calvin elige una → `hero-video/01-fotograma-base.png`.

## 2. Escena base (video)
- Modelo: **Wan 2.2 I2V Lightning** (HIGH + LOW), cámara fija.
- Duración 5–6 s, 480p primero (rápido), subir a 720p solo la elegida.
- Prompt de movimiento:
  > Static camera. The designer breathes slowly, shoulders move slightly, head tilts a little toward the screen, right hand moves the mouse slightly. Screen content shifts subtly. Everything else stays still. Calm, minimal motion.
- Varias semillas; elegir la más estable y con movimiento natural → `hero-video/02-escena-base.mp4`.

## 3. Flash (ffmpeg, no IA)
- Curva de brillo cálido sobre el último tramo (≈ segundo 8–9): subida rápida, caída suave, 0.3–0.5 s, **un solo destello por ciclo**, sin blanco puro a máxima intensidad (máx. ~85–90 % de mezcla).
- Origen visual: el fondo blanco y las luces del estudio.

## 4. Loop
- Escena base + flash + regreso al primer cuadro; el flash tapa la costura.
- Duración total 8–10 s. Probar el empalme en bucle.

## 5. Compresión
- 720p, sin audio. MP4 (H.264) y WebM, 1–2 MB; versión móvil más ligera. Generar `poster` desde el primer cuadro.

## 6. Integración (solo con aprobación)
- En `src/pages/home/components/Hero.tsx`: `<video autoplay muted loop playsInline poster=…>` detrás de la capa de desenfoque actual; el diseñador queda a la derecha, el texto a la izquierda.
- Desactivar con `prefers-reduced-motion` y `saveData`; considerar no cargarlo en móvil.
- Verificar con `npm run build` y preview: modo claro, oscuro, móvil, contraste durante el flash.

## Comprobaciones finales
- [ ] Sin texto legible, marcas ni cara visible.
- [ ] Loop sin salto notorio.
- [ ] Un solo flash suave por ciclo.
- [ ] Peso dentro de 1–2 MB.
- [ ] Texto del Hero legible durante todo el loop.
