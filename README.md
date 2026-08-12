# PsicopoMPo — landing web

Landing de PsicopoMPo, la inteligencia operativa de la Proyección Armónica del Mito. Presenta la
experiencia oral y las seis capas estables que enlazan la Proyección del Mito Personal con el campo
armónico del Beacon. Sitio estático bilingüe ES/EN, pensado para facilitadores y participantes.

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
- `tecnologia/index.html` — arquitectura durable del producto: método, campo armónico,
  inteligencia especializada, voz, memoria y espejo simbólico. La evidencia de la beta de julio
  de 2026 queda fechada y separada de la voz principal del producto.
- `assets/styles.css` — sistema de marca propio de PsicopoMPo (paleta Hueso Lunar / Tinta Umbral /
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

## Criterio editorial

- La web presenta el producto y su experiencia; las versiones, proveedores, adapters, métricas y
  decisiones del prototipo viven en evidencia técnica fechada.
- PMP conserva su origen propio. Harmonic Myth Projection es la conjunción de PMP y Beacon;
  PsicopoMPo articula protocolo, voz y memoria dentro de esa experiencia.
- El contacto público es `info@altermundi.net`.
- Falta una política formal de privacidad propia de PsicopoMPo; hasta publicarla, la página expresa
  únicamente compromisos de diseño respaldados por la documentación del proyecto.
