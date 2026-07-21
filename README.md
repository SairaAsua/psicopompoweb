# Psicopompo — landing web

Landing page de Psicopompo (copiloto/espacio de trabajo con IA para la Proyección Armónica del
Mito, ecosistema AlterMundi / Harmonic Beacon). Sitio estático (HTML + CSS + JS plano, sin build
step), pensado para facilitadores y participantes.

## Ruta local

Este proyecto vive en **`/home/saira/web/psicopompo/`** en la compu de Saira. Es un sitio hermano
de otros proyectos web de AlterMundi que viven en `/home/saira/web/` (`proyecciondelmito`, `wanda`,
`mariano`, etc. — mismo patrón de repo).

Material de investigación/branding original (fotos de la polilla real, MVP, reportes de prueba,
prompts de generación IA) vive en **`/home/saira/psicopomp/`** (carpeta hermana, sin "web/", con
mp3s y docs de research — no forma parte de este repo).

## Cómo correrlo

```bash
cd /home/saira/web/psicopompo
npm run dev          # python3 -m http.server 8773
# o
npm start            # npx serve -s . -l 8773
```

Abrir `http://localhost:8773`.

## Estructura

- `index.html` — landing page, narrativa del viaje en 5 capítulos.
- `tecnologia/index.html` — página propia con la arquitectura, el dataset de entrenamiento, el stack y los límites. Se accede desde `/tecnologia/`.
- `assets/styles.css` — sistema de marca propio de Psicopompo (paleta Hueso Lunar / Tinta Umbral /
  Verdín / Cobre Vivo / Oro Antiguo, tipografía Fraunces + Manrope). Estética nocturna con texturas
  generadas (ver abajo).
- `assets/main.js` — toggle de audiencia (facilitador/participante), reveal-on-scroll, parallax
  suave del hero. Sin dependencias, JS plano.
- `assets/mascota-*.jpg`, `patron-nervaduras.jpg`, `textura-noche.jpg` — imágenes generadas con IA
  (Gemini image / Grok Imagine vía `infsh`, la skill `inference-sh` de Hermes) a partir de fotos
  reales de una escultura de polilla en un portón — ver `/home/saira/psicopomp/logoybranding/`.
- `logo-psicopompo*.png` — isotipo vectorizado real (no generado), en dos variantes de color.

## Estado actual (21/07/2026)

Página completa con:
- Hero con la polilla generada + isotipo chico como marca (no centralizado).
- Nav superior fija (Psicopompo / Tecnología / Harmonic Beacon / Contacto). Tecnología ahora tiene su propia página en `/tecnologia/`.
- Viaje narrativo en 5 capítulos (Umbral → Escalera → Guardián → Viaje libre → Regreso), con
  toggle de voz facilitador/participante en cada capítulo.
- Puerta conceptual (`#ecosistema`): HIT → Phideus → Beacon → PMP → HMP, con links oficiales.
- Puerta técnica apunta a `/tecnologia/`, con arquitectura, dataset, evidencia y horizonte de producto
  (información ampliada desde la presentación Devpost).
- Sección de equipo (`#contacto`): Julián de la Reta, Mariano Fernández Méndez, Saira Asua, equipo
  AlterMundi.
- CTA de facilitadores con teléfono real (3547 469632) + email + link a la plataforma.

## Pendiente / para quien continúe (Kimi)

- **Dominio de deploy sin definir.** `psicopompo.altermundi.net` YA está en producción sirviendo la
  app real (login de facilitador/participante — confirmado con `curl` a `/api/health`). Esta
  landing necesita un dominio/subdominio distinto — falta acordarlo con Mariano antes de armar
  GitHub Pages + CNAME. No agregar un `CNAME` sin confirmar el dominio real primero.
- El email de contacto (`hola@altermundi.net`) es un placeholder — confirmar el real.
- Rol de Saira Asua en la card de equipo ("Experiencia, pruebas y comunicación del proyecto") es
  una propuesta, no confirmado por ella todavía.
- Fuente completa de investigación/branding en `/home/saira/psicopomp/` (no está en este repo):
  `PLAN_LANDING_PSICOPOMPO.md`, `OPENAI_BUILDWEEK_SUBMISSION_EN.md`,
  `PROMPT_HERMES_GRAFICA.md`, `logoybranding/BRANDING.md` — útil como contexto antes de tocar
  contenido o branding.
- Sin bilingüe ES/EN todavía (el resto del ecosistema Harmonic Beacon sí lo tiene).
