# Memoria — Video de fondo del Hero

Estado y decisiones. Actualizar al final de cada paso. Más reciente arriba.

## Decisiones de Calvin (13 oct 2026)
- Un solo **diseñador (hombre)**, **ropa casual**, **de espaldas**, sentado frente al monitor.
- El **monitor muestra un sitio web** (abstracto, sin texto legible).
- Movimiento mínimo en cuerpo y pantalla, sutil pero presente.
- En los últimos segundos del loop, **flash de cámara de fondo** (simula que el diseñador hizo el disparo desde la computadora); luego el loop vuelve a empezar.
- Generación **local** (Wan2GP en Pinokio). Empezar por el **fotograma base**.
- **Esperar** antes de actualizar `PROJECT_LOG.md` y el reporte HTML con el cambio a generación local.
- Preferencia fija: consultar a Calvin antes de generar cualquier video.

## Entorno
- Pinokio home: `C:\pinokio`. App: `C:\pinokio\api\wan` (Wan2GP, `app\wgp.py`). Pinokio no estaba corriendo al inicio de la sesión.
- Modelos en `app\ckpts`: Flux 2 Klein 9B (int8), Wan 2.2 I2V Lightning FP8 HIGH/LOW, Wan 2.2 T2V 5B, VAEs.
- GPU: RTX 5070 Ti Laptop, 12 GB VRAM.
- Imagen base: `public/images/stock/hero-studio.webp`; texto del Hero a la izquierda, diseñador a la derecha.

## Progreso
- [x] Idea evaluada y enfoque definido (un diseñador + flash).
- [x] Reporte HTML v2: `reports/2026-10-13-hero-video.html`.
- [x] Archivos `agente.md`, `skill.md`, `memoria.md` creados.
- [x] Pinokio encendido (13 oct 2026, responde en `http://127.0.0.1:42000`). Wan2GP se usa por su API Python con `C:\pinokio\api\wan\app\venv`, sin abrir la UI.
- [x] Fotograma base generado (Flux 2 Klein 9B, ref = `hero-studio.webp`, 1280x720, 4 pasos, ~19 s c/u): `01-fotograma-base-s11.jpg`, `-s22.jpg`, `-s33.jpg`.
- [x] Calvin eligió el fotograma base **s33** → copiado como `01-fotograma-base.jpg`.
- [~] Escena base (Wan 2.2 I2V Enhanced Lightning v2, 848x480, 16 fps, ~4 min por clip): ronda 1 (s101, s202, s303, 5 s) y ronda 2 con prompt "locked-off" (s404, s505, 4 s, archivos `02b-…`). Resultado: **la cámara deriva lentamente y el diseñador se mueve más de lo deseado en todas**; s101 peor, s303 proyecta el sitio sobre el fondo blanco. Prompts de cámara fija no bastan.
- [x] **Versión 2 (producto) — 13 oct 2026:** Calvin probó la v1 en Gemini (`C:\Users\no\Downloads\gemini_generated_video_77b340be.mp4`, 10 s, 24 fps, 1280x720, con audio): cámara estable, pero **no se aprecia flash** en los cuadros muestreados. Pidió una v2: monitor con producto (bebida energética en lata, ficticia, negra con rayo cian, sin texto) + 2–3 latas iguales en el set frente al fondo blanco + **flash de estudio nuevo** (strobe con softbox) del que sale el destello.
  - Archivos: `03-lata-producto-s7.jpg` (lata elegida), `04-fotograma-v2-s51/52/53.jpg` (Flux 2 Klein con 2 referencias), `04b-…` (retoque fallido: proyectó la web sobre el fondo blanco), **`04c-fotograma-v2-final.jpg`** (s52 + pantalla del monitor compuesta con OpenCV, perspectiva ajustada a mano).
  - Corrección (misma sesión): Calvin pidió latas del set más pequeñas y que se vean **igual** que la del monitor. Resultado: **`05-fotograma-v2-latas-pequenas.jpg`** (vigente): un único recorte (`03-lata-recorte.png`, grabCut sobre s7) usado en las 3 latas del set (~50 px de alto) y en la pantalla del monitor; se quitaron las latas del escritorio copiando esa zona de `01-fotograma-base.jpg`. Script de composición en el scratchpad (`comp2.py`).
  - Aprendizaje: Klein con 2 referencias coloca bien objetos nuevos, pero no controla bien el contenido de la pantalla; para eso es más fiable componer la pantalla aparte. Evitar re-editar toda la escena (contamina el fondo).
- [x] **Video elegido (13 oct 2026):** `C:\Users\no\Downloads\gemini_generated_video_2e39a0ee.mp4` (Gemini, 10 s, 24 fps, 1280x720, con audio) → copia en `06-video-elegido-gemini-v2.mp4`. El strobe con softbox se enciende hacia el cuadro ~216 (pico de brillo). Problema: la cámara se aleja un poco durante el clip y el primer/último cuadro no coinciden (no hay punto de corte limpio; diferencia media ~32/255).
  - Solución: **ping-pong centrado en el flash** (cuadros 0→216 y luego reversa), 18 s, un solo flash por ciclo, sin salto al reiniciar. Archivos en `hero-video/dist/`: `hero-loop.mp4` (~0.8 MB, 1280 px), `hero-loop.webm` (~1.0 MB), `hero-loop-mobile.mp4` (~0.35 MB, 854 px), `hero-poster.jpg`. Todos sin audio.
  - **Loop aprobado e integrado (13 oct 2026):** archivos copiados a `public/videos/` y `public/images/stock/hero-poster.jpg`; `Hero.tsx` con `<video>` + fallbacks (`prefers-reduced-motion`, `saveData`, fuente móvil ≤767 px). Build OK, preview OK sin errores. `PROJECT_LOG.md` y reporte HTML actualizados. Sin commit/deploy.
  - Pendiente: revisar a ancho de escritorio completo y modo claro; commit/push solo si Calvin lo pide.
- [ ] (Obsoleto, v1 con Wan local) Siguiente intento propuesto: (a) estabilizar con ffmpeg (vidstab) o (b) componer: foto fija del estudio + solo la zona del diseñador/monitor animada con máscara suave. Pendiente de elegir con Calvin.
- [ ] Escena base animada.
- [ ] Flash, loop y compresión.
- [ ] Integración en `Hero.tsx` y verificación.
- [ ] Actualizar `PROJECT_LOG.md` y reporte HTML (pendiente de la orden de Calvin).

## Notas / aprendizajes
- Flux 2 Klein 9B: `image_refs=[ruta]` + `video_prompt_type="I"` + `image_mode=1` funciona para editar la foto del estudio; el estudio se conserva casi idéntico.
- Prompt usado: ver `skill.md` §1 (versión adaptada: "Same photography studio from the reference image, unchanged…"). Negativo: visible face, readable text, logos, extra people, deformed hands.
- Scripts de generación en el scratchpad de la sesión (`gen_base.py`); si se repite, mover a `hero-video/scripts/`.
- Observación: el diseñador sale de espaldas/perfil; s22 trae anteojos y la pantalla con algo de texto pequeño (revisar legibilidad).
