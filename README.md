# Psicopompo — landing web

Landing page de Psicopompo (copiloto/espacio de trabajo con IA para la Proyección Armónica del
Mito, ecosistema AlterMundi / Harmonic Beacon). Sitio estático (HTML + CSS + JS plano, sin build
step), bilingüe ES/EN, pensado para facilitadores y participantes.

**En vivo:** https://psicopompo.harmonicbeacon.com — deploy vía GitHub Pages + GitHub Actions
(`.github/workflows/pages.yml`), redeploya solo en cada push a `main`.

## Ruta local

Este proyecto vive en **`/home/saira/web/psicopompo/`** en la compu de Saira. Es un sitio hermano
de otros proyectos web de AlterMundi que viven en `/home/saira/web/` (`proyecciondelmito`, `wanda`,
`mariano`, etc. — mismo patrón de repo).

Material de investigación/branding original (fotos de la polilla real, MVP, reportes de prueba,
prompts de generación IA) vive en **`/home/saira/psicopomp/`** (carpeta hermana, sin "web/", con
mp3s y docs de research — no forma parte de este repo). La historia del diseño de marca en sí
(de la foto real al logo y la mascota) tiene su propio repo: `SairaAsua/psicopompo-branding`
(https://sairaasua.github.io/psicopompo-branding/).

## Cómo correrlo

```bash
cd /home/saira/web/psicopompo
npm start   # npx serve . -l 8773 — soporta range requests, necesario para el video del hero
```

Abrir `http://localhost:8773`. **No usar `python3 -m http.server`** ni `serve -s` (modo SPA): ninguno
de los dos sirve bien `/tecnologia/` o el video (ver nota abajo).

## Estructura

- `index.html` — landing page, narrativa del viaje en 5 capítulos.
- `tecnologia/index.html` — página propia con la arquitectura, el dataset de entrenamiento, el
  stack, la evidencia (galería oficial de Devpost) y los límites. Se accede desde `/tecnologia/`.
- `assets/styles.css` — sistema de marca propio de Psicopompo (paleta Hueso Lunar / Tinta Umbral /
  Verdín / Cobre Vivo / Oro Antiguo, tipografía Fraunces + Manrope). Estética nocturna con texturas
  generadas. Compartido entre las dos páginas — **no dupliques `.btn`/`.btn-primary`/`.btn-ghost`
  en el `<style>` inline de una página nueva**, ya rompió la consistencia de color una vez.
- `assets/main.js` — sin dependencias. Toggle de audiencia (facilitador/participante) vía
  `data-voice` + `localStorage`; switch de idioma ES/EN vía `data-lang` (contenido) y `data-es`/
  `data-en` (meta tags/title) + `localStorage`; reveal-on-scroll; parallax del hero; pausa el
  video del hero bajo `prefers-reduced-motion`.
- `assets/hero-polilla.mp4` — video del hero (polilla generada, en loop). Requiere que el server
  soporte range requests (ver arriba).
- `assets/mascota-*.jpg`, `patron-nervaduras.jpg`, `textura-noche.jpg` — imágenes generadas con IA
  (Gemini image / Grok Imagine vía `infsh`, la skill `inference-sh` de Hermes, y versiones
  mejoradas de Mariano) a partir de fotos reales de una escultura de polilla en un portón — ver
  el repo `psicopompo-branding` para la historia completa.
- `assets/devpost/` — 6 imágenes de la galería oficial de la presentación en OpenAI Build Week
  (redimensionadas a 1760px de ancho; los originales 4K quedaron en
  `/home/saira/psicopomp/BrandingVioleta/stack_visual_psicopompo/`).
- `logo-psicopompo*.png`, `favicon*.png` — isotipo vectorizado real (no generado). `favicon.png`
  (512px, para apple-touch-icon) y `favicon-32.png` (para la pestaña) son un recorte cuadrado del
  isotipo — el wordmark completo es muy ancho para funcionar como ícono.

## Sistema bilingüe (cómo agregar contenido nuevo)

Todo texto visible va dos veces, envuelto en spans:
```html
<span data-lang="es">Texto en español</span><span data-lang="en">English text</span>
```
El `<html data-active-lang="es|en">` controla cuál se muestra (CSS en `styles.css`). Para
`<title>`, `<meta name="description">` y los `og:*` en el `<head>`, el patrón es distinto —
atributos `data-es`/`data-en` que `main.js` swappea en el `content`/`textContent`:
```html
<meta name="description" data-es="..." data-en="..." content="..." />
```
Si agregás una página nueva, replicá ambos patrones — si solo agregás `data-lang` en el body y te
olvidás del `<head>`, el toggle de idioma cambia el contenido pero no el `<title>` ni las meta
tags (bug ya corregido una vez, no lo repitas).

## Pendiente

- **El email de contacto (`hola@altermundi.net`)** en el CTA de participantes es un placeholder —
  confirmar el real con Mariano. El CTA de facilitadores usa WhatsApp (`wa.me/543547469632`).
- **Discrepancia de cifras sin resolver:** el texto dice "257 tests automatizados" (del README del
  repo `Mar-IA-no/PMP-GPT`), pero el mapa de evidencia visual que armó Mariano
  (`assets/devpost/05-build-week-evidence.jpg`) dice "264". No cambiar sin confirmar cuál es el
  vigente.
- **Privacidad/manejo de datos:** el sitio afirma que la sesión se exporta solo cuando el
  facilitador lo pide, pero no hay una página formal de privacidad — alguien evaluando adoptar la
  herramienta probablemente la busque.
- Repo `psicopompo-branding` es solo ES (sin toggle de idioma) — aceptable como pieza standalone,
  pero queda inconsistente si se lo linkea desde una página en inglés.


## QR registration entry

`/anotate/` is the short QR-facing entry. `/anotate/conocer/` is its separate
method, AI and research explanation tab. Both reuse the original shared brand
stylesheet, artwork and motion/language behavior. Page layout is scoped in
`anotate/portal.css`; the original button color rules are not duplicated.
The exact brand font faces are locally served with their OFL notices.

The primary CTA navigates in the same tab to the existing
`https://psicopompo.altermundi.net/invitaciones` application. That application
owns its name/email collection, contact terms, explicit acceptance and receipt.
The marketing site has no form backend and records no contact data.
The invitation app's framing and cross-origin protections remain intact.
New QR material should point to `https://psicopompo.harmonicbeacon.com/anotate/`.
Previously printed codes keep their original destination.

For local checks use a range-capable static server without SPA fallback, e.g.
`npx serve . -l tcp://127.0.0.1:8773`; do not use the legacy `dev` script for
video/route qualification. The event banner keeps explicit13–14November2026 dates.

The research section at `/anotate/conocer/#investigacion` summarizes participant
follow-up accounts and weekly integration facilitated by a psychodramatist.
Keep these accounts distinct from clinical efficacy claims and from the separate
public journey gallery. Participant records and the private research dashboard
must stay outside this public repository.
