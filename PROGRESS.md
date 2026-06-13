# PROGRESS — raxislab.com

## Tecnología y framework

**Tipo:** Sitio web estático — HTML5 + CSS3 + JavaScript ES6+ vanilla  
**Sin frameworks** ni bundler. No hay `package.json` ni proceso de compilación.

**Librerías externas (vía CDN, sin instalación local):**
| Librería | Versión | Uso |
|----------|---------|-----|
| Chart.js | 4.4.0 | Gráficos en ROI y portal de cliente |
| html2pdf.js | 0.10.1 | Descarga de guías como PDF desde el navegador |
| Google Fonts | — | Space Grotesk + Space Mono |

---

## Despliegue en Cloudflare Pages

| Campo | Valor |
|-------|-------|
| **Framework preset** | None (sitio estático) |
| **Build command** | *(dejar en blanco)* |
| **Build output directory** | `/` (raíz del repositorio) |
| **Root directory** | *(dejar en blanco)* |

> Al conectar el repo en Cloudflare Pages: Framework preset → **None**, Build command → vacío, Output directory → `/`.  
> Cloudflare sirve los HTML directamente sin build step.

---

## Estructura de carpetas y páginas

```
/
├── index.html              ← Home
├── services.html           ← Servicios
├── cases.html              ← Casos de éxito (6 casos reales)
├── about.html              ← Sobre mí
├── blog.html               ← Blog (10 artículos)
├── pricing.html            ← Precios + calculadora add-ons
├── roi.html                ← Calculadora ROI interactiva
├── lab.html                ← Admin CRM (PIN: 2024)
├── contact.html            ← Contacto
├── ai.html                 ← IA Studio
├── resources.html          ← Recursos gratuitos (8 guías)
├── client-portal.html      ← Portal de cliente (demo + admin)
├── privacy.html            ← Política de privacidad (RGPD)
├── terms.html              ← Términos de servicio
├── cookies.html            ← Política de cookies
├── faq.html                ← FAQ (16 preguntas)
├── help.html               ← Centro de ayuda
│
├── guia-camara.html        ← Guía PDF: Cámara sin bloquearte
├── guia-reels.html         ← Guía PDF: Reels que convierten
├── guia-slack.html         ← Guía PDF: Slack para negocios
├── guia-calendario.html    ← Guía PDF: Calendario 30 días
├── guia-ventas.html        ← Guía PDF: Vender sin vender
├── guia-scripts-dms.html   ← Guía PDF: Scripts DMs
├── guia-prompts-ia.html    ← Guía PDF: 100 Prompts IA
├── guia-metodo-raxisla.html← Guía PDF: Método Raxisla
│
├── css/
│   ├── style.css           ← Variables globales, reset, tipografía
│   ├── nav.css             ← Navegación global
│   ├── home.css / services.css / cases.css / about.css
│   ├── blog.css / pricing.css / roi.css / lab.css
│   ├── contact.css / pages.css / ai.css / resources.css
│   ├── pdf.css             ← Estilos guías + print
│   └── portal.css
│
├── js/
│   ├── main.js             ← Scripts globales
│   ├── home.js / cases.js / blog.js / pricing.js / roi.js
│   ├── lab.js / contact.js / ai.js / pdf-download.js
│   └── portal.js
│
└── images/
    ├── logo-raxislab.png
    ├── logo-mark.svg
    ├── logo-full.svg
    └── rene-benegas.jpg
```

---

## Variables de entorno / API Keys

No hay variables de entorno en la versión actual. Todo es estático.

**Integraciones pendientes (requieren config futura):**
- `GA4 ID` — Añadir ID real de Google Analytics 4 en cada HTML
- `Formspree endpoint` — Para el formulario de contacto (`contact.html`)
- `Table API` — Portal de cliente usa mensajes en una Table API (ver `portal.js`)

---

## Accesos demo (NO subir a producción si se añaden credenciales reales)

| Acceso | Código | Descripción |
|--------|--------|-------------|
| Portal cliente — Demo | `DEMO-2025` | Salón Elegance |
| Portal cliente — Build | `BUILD-001` | Constructora Vértice |
| Portal cliente — Horeca | `HORECA-2025` | Restaurante El Origen |
| Portal admin (René) | `RAXIS2025` | Panel de administración |
| Lab CRM | `2024` | Admin CRM |

---

## Historial de versiones

| Versión | Fecha | Descripción |
|---------|-------|-------------|
| 5.0 | Marzo 2026 | Versión completa con portal, blog, guías PDF |
| — | Junio 2026 | Primera versión en control de versiones (GitHub) |

---

## Pendiente prioritario

- [ ] Integrar formulario contacto (Formspree o Netlify Forms)
- [ ] Añadir URLs reales de redes sociales (LinkedIn, Instagram)
- [ ] Configurar GA4 con ID real
- [ ] Añadir OG tags en todas las páginas
- [ ] Vincular este repo con Cloudflare Pages (CI/CD automático)
