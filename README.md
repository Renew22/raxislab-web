# RaxisLab — Sitio Web Estratégico Digital

**Versión:** 5.0 · **Fecha:** Marzo 2026  
**Objetivo:** Plataforma de marketing digital y estrategia empresarial para negocios de todos los sectores.

---

## 🗺️ Mapa completo del sitio

| Archivo | Título | Estado |
|---------|--------|--------|
| `index.html` | Home | ✅ Completo |
| `services.html` | Servicios | ✅ Completo |
| `cases.html` | Casos de Éxito | ✅ Completo (6 casos reales) |
| `about.html` | Sobre mí | ✅ Completo |
| `blog.html` | Blog | ✅ Completo (10 artículos reales) |
| `pricing.html` | Precios | ✅ Completo |
| `roi.html` | Calculadora ROI | ✅ Completo |
| `lab.html` | The Lab (Admin CRM) | ✅ Completo (PIN: 2024) |
| `contact.html` | Contacto | ✅ Completo |
| `ai.html` | IA Studio | ✅ Completo |
| `resources.html` | Recursos Gratuitos | ✅ Completo (8 guías descargables) |
| `client-portal.html` | Portal de Cliente | ✅ Completo |
| `privacy.html` | Política de Privacidad | ✅ Completo |
| `terms.html` | Términos de Servicio | ✅ Completo |
| `cookies.html` | Política de Cookies | ✅ Completo |
| `faq.html` | Preguntas Frecuentes | ✅ Completo (16 FAQs) |
| `help.html` | Centro de Ayuda | ✅ Completo |

### 📥 Guías descargables (PDFs generados en el navegador)

| Archivo | Guía | Páginas | Nivel |
|---------|------|---------|-------|
| `guia-camara.html` | Cómo desenvolverte ante la cámara sin bloquearte | 12 | Principiante |
| `guia-reels.html` | Estructura de Reels que retienen y convierten | 18 | Intermedio |
| `guia-slack.html` | Slack para negocios: estructura y flujos de trabajo | 22 | Avanzado |
| `guia-calendario.html` | Calendario de contenido de 30 días | 30 | Principiante |
| `guia-ventas.html` | Vender sin vender: el sistema de contenido | 16 | Intermedio |
| `guia-scripts-dms.html` | Scripts de DMs para Instagram y WhatsApp | 14 | Principiante |
| `guia-prompts-ia.html` | 100 Prompts de IA para marketing y contenido | 28 | Todos |
| `guia-metodo-raxisla.html` | El Método Raxisla: sistema completo de crecimiento | 35 | Todos |

---

## ✅ Funcionalidades implementadas

### 🔐 Portal de Cliente (`client-portal.html`)
- **Login con código de acceso** por cliente (demo: `DEMO-2025`)
- **Sesión en sessionStorage** (se cierra al cerrar la pestaña)
- **Sidebar** con información del cliente y estado del plan
- **5 vistas de cliente:**
  - 📊 **Resumen** — KPIs, progreso del proyecto, fases, últimos mensajes y tareas recientes
  - ✅ **Trabajos** — Tablero Kanban (En progreso / Pendientes / Completados) con filtros
  - 🎬 **Contenidos** — Grid de contenidos del mes con sistema de aprobación
  - 📈 **Métricas** — SEO Score ring, Ads, Redes Sociales, Web Analytics
  - 💬 **Mensajes** — Chat persistente en localStorage + sincronizado con Table API
- **⚙️ Panel Admin para René** (PIN: `RAXIS2025`):
  - Accesible desde cualquier cuenta (botón "⚙️ Panel Admin" en el sidebar)
  - Estadísticas globales de todos los clientes
  - Editor de progreso, fase, plan y período de métricas por cliente
  - Gestión de tareas: cambiar estado/prioridad, añadir tareas nuevas
  - Gestión de contenidos: cambiar estado, añadir ítems
  - Chat como René: responde mensajes directamente a cada cliente
  - Cambios persistidos en la **Table API** (`portal_messages`, `portal_client_updates`)
- **3 clientes demo precargados:**
  - `DEMO-2025` → Salón Elegance (Peluquería)
  - `BUILD-001` → Constructora Vértice
  - `HORECA-2025` → Restaurante El Origen
- **Modal de contenidos** con botones Aprobar / Solicitar cambios
- **Toast notifications** para confirmaciones
- **Responsive** (sidebar colapsable en móvil)

### 📝 Blog (`blog.html`)
- **10 artículos reales** con contenido accionable y extenso
- Filtros por categoría (Meta & Google Ads, SEO, CRO, IA & Automatización, Estrategia)
- Buscador en tiempo real
- Modal de lectura con diseño editorial completo
- **Artículos disponibles:**
  1. Cómo conseguimos ROAS 4.8× en Meta Ads con 3 cambios estructurales
  2. SEO técnico en 2025: el checklist que uso antes de tocar una keyword
  3. 9 elementos que hacen que una landing page convierta al 7%+
  4. Los 5 errores que destruyen tu automatización de CRM
  5. El framework de estrategia digital que uso con cada nuevo cliente
  6. Google Ads en la era de la IA: lo que cambió, lo que murió y lo que funciona
  7. Por qué tu contenido de Instagram no convierte clientes *(nuevo)*
  8. IA para negocios locales: 7 herramientas reales que uso cada semana *(nuevo)*
  9. Cómo vender a precio completo sin descuentos *(nuevo)*
  10. Cómo dominar Google Maps en 2025 *(nuevo)*
- 5 herramientas sin API externa: Extractor de ideas, Writing & Copies, Análisis de imagen, Scripts para vídeo, Estrategia de contenido
- 7+ sectores cubiertos (peluquería, restaurante, constructora, e-commerce, clínica, tatuador, logística, consultor)

### 📚 Recursos Gratuitos (`resources.html`)
- 8 guías descargables con filtros por categoría
- **Botones de descarga directa** → cada botón abre la guía HTML correspondiente
- **Sección de Acceso Rápido** → tabla con los 8 enlaces directos (ideal para enviar por email)
- Newsletter integrada
- **Sistema de descarga PDF real** usando `html2pdf.js` (CDN jsdelivr)
  - El usuario abre la guía → clic en "⬇ Descargar PDF" → se genera y descarga el PDF al instante
  - Overlay de carga con spinner durante la generación
  - Fallback automático a `window.print()` si falla html2pdf

### 📊 The Lab - Admin CRM (`lab.html`)
- PIN de acceso: `2024`
- Gestión de clientes en localStorage
- Modo visitante / admin
- Sesión expira a los 30 min de inactividad

### 💰 Calculadora de Precios (`pricing.html`)
- Toggle mensual / anual (−15% anual)
- 3 planes: Básico €450, Estándar €850, Premium €1.450/mes
- 9 add-ons disponibles
- Calculadora interactiva con recomendación automática de plan
- Tabla comparativa completa

### 📈 Calculadora ROI (`roi.html`)
- Inputs: inversión, ticket medio, CVR, visitas, duración del cliente
- Outputs: ROI %, ingresos proyectados, leads, ROAS, LTV vs CAC

### 🏆 Casos de Éxito (`cases.html`)
- 6 casos reales con datos reales
- Drawer/modal con timeline, métricas, servicios y objetivos
- Filtros por sector y tecnología

### 📄 Páginas legales y soporte
- Privacidad (RGPD completo)
- Términos de servicio
- Cookies (tipos, GA4, Meta Pixel)
- FAQ (16 preguntas con acordeón animado)
- Centro de ayuda (canales, estado del sistema)

---

## 🔗 Navegación principal

```
Home → Servicios → Casos → Sobre mí → Blog → Precios → ROI → The Lab → Contacto
```

**Herramientas adicionales** (en nav secundaria o footer):
- IA Studio → `ai.html`
- Recursos Gratis → `resources.html`
- Portal de Cliente → `client-portal.html`
- Calculadora ROI → `roi.html`

---

## 🏗️ Estructura de archivos

```
/
├── index.html
├── services.html
├── cases.html
├── about.html
├── blog.html
├── pricing.html
├── roi.html
├── lab.html
├── contact.html
├── ai.html
├── resources.html
├── client-portal.html
├── privacy.html
├── terms.html
├── cookies.html
├── faq.html
├── help.html
├── guia-camara.html           ← Guía PDF #1
├── guia-reels.html            ← Guía PDF #2
├── guia-slack.html            ← Guía PDF #3
├── guia-calendario.html       ← Guía PDF #4
├── guia-ventas.html           ← Guía PDF #5
├── guia-scripts-dms.html      ← Guía PDF #6
├── guia-prompts-ia.html       ← Guía PDF #7
├── guia-metodo-raxisla.html   ← Guía PDF #8
├── css/
│   ├── style.css            (variables, reset, tipografía)
│   ├── nav.css              (navegación global)
│   ├── home.css
│   ├── services.css
│   ├── cases.css
│   ├── about.css
│   ├── blog.css
│   ├── pricing.css
│   ├── roi.css
│   ├── lab.css
│   ├── contact.css
│   ├── pages.css            (páginas legales)
│   ├── ai.css
│   ├── resources.css
│   ├── pdf.css              ← Estilos para guías + estilos de impresión
│   └── portal.css
├── js/
│   ├── main.js
│   ├── home.js
│   ├── cases.js             (6 casos reales)
│   ├── blog.js
│   ├── pricing.js
│   ├── roi.js
│   ├── lab.js
│   ├── contact.js
│   ├── ai.js
│   ├── pdf-download.js      ← Sistema de descarga html2pdf.js
│   └── portal.js
└── images/
    ├── logo-raxislab.png
    ├── logo-mark.svg
    ├── logo-full.svg
    └── rene-benegas.jpg
```

---

## 🛠️ Tecnologías utilizadas

- **HTML5** — Semántico, accesible
- **CSS3** — Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+** — Módulos, Intersection Observer, localStorage/sessionStorage
- **Chart.js 4.4.0** — Visualización de datos en ROI y portal
- **html2pdf.js 0.10.1** — Generación de PDFs en el navegador desde las guías
- **Google Fonts** — Space Grotesk + Space Mono
- **Sin frameworks** — Vanilla puro para máximo rendimiento

---

## 🔗 URLs de los recursos para enviar por email

Cuando publiques el sitio, usa estos enlaces directos en tus correos:

| Guía | Enlace (ejemplo producción) |
|------|-----------------------------|
| Guía #1: Cámara | `https://tu-dominio.com/guia-camara.html` |
| Guía #2: Reels | `https://tu-dominio.com/guia-reels.html` |
| Guía #3: Slack | `https://tu-dominio.com/guia-slack.html` |
| Guía #4: Calendario | `https://tu-dominio.com/guia-calendario.html` |
| Guía #5: Ventas | `https://tu-dominio.com/guia-ventas.html` |
| Guía #6: Scripts DMs | `https://tu-dominio.com/guia-scripts-dms.html` |
| Guía #7: Prompts IA | `https://tu-dominio.com/guia-prompts-ia.html` |
| Guía #8: Método Raxisla | `https://tu-dominio.com/guia-metodo-raxisla.html` |
| Todos los recursos | `https://tu-dominio.com/resources.html` |

> El usuario abre el enlace, lee la guía y descarga el PDF con un clic. No necesitas enviar archivos adjuntos.

---

### 🔑 Códigos de acceso

#### Portal de Cliente
| Código | Cliente | Sector |
|--------|---------|--------|
| `DEMO-2025` | Salón Elegance | Peluquería & Estilismo |
| `BUILD-001` | Constructora Vértice | Construcción & Obra |
| `HORECA-2025` | Restaurante El Origen | Hostelería & Restauración |

#### Panel Admin (René)
| PIN | Acceso |
|-----|--------|
| `RAXIS2025` | Panel de administración completo |

**Admin Lab PIN:** `2024`

---

## ⏳ Pendiente / Próximos pasos

### Alta prioridad
- [ ] **Blog** — ✅ 10 artículos reales completados. Añadir más según temas de actualidad
- [ ] **Contacto** — Integrar formulario con servicio real (Formspree, Netlify Forms)
- [ ] **Redes sociales** — Añadir URLs reales de LinkedIn e Instagram
- [ ] **GA4** — Añadir ID real de Google Analytics 4
- [ ] **OG Tags** — Meta tags para redes sociales en todas las páginas

### Media prioridad
- [ ] **Portal de Cliente** — Backend real para autenticación (actualmente demo en memoria)
- [ ] **Portal de Cliente** — Los mensajes del Admin ya persisten en Table API; faltan tasks/contenidos
- [ ] **Blog** — Sistema de CMS para añadir artículos sin tocar código (Google Sheets + fetch)
- [ ] **IA Studio** — Integrar API real de OpenAI/Anthropic (cuando sea viable)

### Baja prioridad
- [ ] **Cases** — Imágenes reales de los proyectos
- [ ] **About** — Verificar foto rene-benegas.jpg en producción
- [ ] **Método Raxisla** — Landing page dedicada
- [ ] **Sitemap.xml** — Para indexación SEO
- [ ] **robots.txt** — Configuración para bots

---

## 📐 Sistema de diseño

### Colores principales
- `--bg`: `#020206` (negro profundo)
- `--accent`: `#00C8FF` (cyan eléctrico)
- `--text`: `#F0F0F8` (blanco suave)
- `--text-mid`: `#A0A8B4` (gris medio)
- `--text-muted`: `#5A6470` (gris oscuro)

### Tipografía
- **Headings / UI:** Space Grotesk
- **Código / Mono:** Space Mono

### Fuente de despliegue
Sitio estático. Publicar desde la pestaña **Publish** del editor.
