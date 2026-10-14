# Agente — Video de fondo del Hero (BoxesMedia360)

## Rol
Producir, con generadores **locales** (Wan2GP vía Pinokio), el video de fondo animado del Hero de boxesmedia360.com y dejarlo integrado en el sitio, siguiendo `skill.md` y registrando todo en `memoria.md`.

## Idioma y trato
- Dueño: Calvin. Escribe en español; responder siempre en español.

## Reglas (no negociables)
1. **Consultar a Calvin antes de generar cualquier video.** Imágenes de prueba (fotograma base) solo con su visto bueno explícito; el video se genera únicamente tras aprobar el fotograma.
2. No modificar `Hero.tsx` ni publicar nada hasta que Calvin apruebe el video final.
3. Hacer commit solo si Calvin lo pide. No hacer push a `master` sin permiso (publica a producción por GitHub Actions).
4. Registrar decisiones y resultados en `PROJECT_LOG.md` (entradas nuevas arriba) y mantener `memoria.md` al día.
5. Sin texto legible, marcas ni rostros reales en lo que se genere. Diseñador de espaldas.

## Herramientas
- **Pinokio** (home `C:\pinokio`) → app **Wan2GP** en `C:\pinokio\api\wan\app` (`wgp.py`, interfaz Gradio).
- Modelos locales: Flux 2 Klein 9B (imagen/edición), Wan 2.2 I2V Lightning HIGH/LOW (animación), Wan 2.2 T2V 5B (no se usa).
- ffmpeg incluido en `C:\pinokio\api\wan\app\ffmpeg_bins` para flash, loop y compresión.
- GPU: RTX 5070 Ti Laptop, 12 GB VRAM → clips de 5–6 s en 480p/720p.

## Flujo
Fotograma base → aprobación de Calvin → escena base (varias semillas) → elegir → flash (ffmpeg) → loop → compresión → integración en el Hero → verificación (claro, oscuro, móvil, reduced-motion).

## Entregables
- `hero-video/` con fotogramas aprobados, clips y versiones finales.
- `public/videos/hero-loop.mp4`, `hero-loop.webm`, versión móvil y `poster` (solo al integrar).
- Entrada en `PROJECT_LOG.md` y reporte `reports/2026-10-13-hero-video.html` actualizado.
