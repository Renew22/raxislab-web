/* ============================================================
   RAXISLAB — js/cases.js  v2.0 — René Benegas · Casos Reales
   ============================================================ */
'use strict';

const CASES = {

  /* ─────────────────────────────────────────────────────────
     1. DISTRIBUIDORA B2B — Sector horeca
  ───────────────────────────────────────────────────────── */
  vinos: {
    name:      'Distribuidora B2B · Horeca',
    sector:    'Sector alimentación · B2B · Latinoamérica',
    color:     '#BF5AF2',
    initial:   'V',
    duration:  '8 semanas',
    year:      '2024',
    tags:      ['Diseño Web', 'SEO Técnico', 'SEO Local', 'Copywriting B2B'],
    bannerBg:  'linear-gradient(135deg,#0d0015 0%,#18002a 50%,#0a0010 100%)',
    bannerSvg: `<svg width="300" height="160" viewBox="0 0 300 160" fill="none">
      <ellipse cx="150" cy="140" rx="120" ry="20" fill="rgba(191,90,242,0.08)"/>
      <path d="M130 20 Q150 10 170 20 L180 90 Q150 110 120 90 Z" stroke="rgba(191,90,242,0.6)" stroke-width="1.5" fill="rgba(191,90,242,0.06)"/>
      <line x1="150" y1="90" x2="150" y2="130" stroke="rgba(191,90,242,0.5)" stroke-width="2"/>
      <ellipse cx="150" cy="130" rx="20" ry="6" stroke="rgba(191,90,242,0.4)" stroke-width="1.5" fill="none"/>
      <circle cx="80" cy="60" r="18" stroke="rgba(191,90,242,0.3)" stroke-width="1" stroke-dasharray="4 3" fill="none"/>
      <circle cx="220" cy="70" r="14" stroke="rgba(191,90,242,0.3)" stroke-width="1" stroke-dasharray="4 3" fill="none"/>
    </svg>`,
    headline:   'Lanzamiento y posicionamiento web para distribuidora de producto premium en mercado B2B',
    problem:    'Distribuidora especializada en producto gourmet con denominación de origen orientada al canal horeca en Latinoamérica. Sin presencia digital, sin catálogo online y sin estrategia SEO. El objetivo no era solo "crear una web": era construir la base completa para posicionarse en Google, generar confianza en restaurantes y hoteles, y preparar el terreno para escalar con Ads.',
    solution:   'Desarrollé la estrategia digital completa desde cero: definición del público objetivo B2B (restaurantes, hoteles, comercios), propuesta de valor orientada al canal profesional, arquitectura web pensada para SEO y conversión, fichas de producto estructuradas para el canal horeca, y optimización técnica completa con geolocalización local.',
    objectives: [
      'Construir presencia digital profesional desde cero',
      'Posicionar en Google con SEO técnico y local',
      'Generar confianza en el canal horeca (B2B)',
      'Crear base escalable para Google Ads y contenido futuro',
    ],
    services: [
      'Estrategia digital B2B',
      'Diseño y desarrollo web completo',
      'Catálogo profesional con fichas de producto por categoría',
      'Copywriting orientado a canal horeca',
      'SEO técnico (Search Console, sitemap, robots.txt)',
      'SEO local geolocalizado (mercado latinoamericano)',
      'Optimización de metadatos y estructura H1-H2',
      'Preparación para Google Ads y escalado futuro',
    ],
    metrics: [
      { icon: '🌐', val: '0→1',    label: 'Web profesional lanzada',   before: 'antes: sin presencia digital',  color: 'green' },
      { icon: '🔍', val: 'GSC',    label: 'Indexación configurada',    before: 'Search Console + Sitemap',      color: '' },
      { icon: '📄', val: '6',      label: 'Secciones clave',           before: 'Home · Catálogo · Fichas · Contacto', color: '' },
      { icon: '🍷', val: '4',      label: 'D.O. en catálogo',          before: 'Rioja · Ribera · Rueda · Navarra',  color: '' },
      { icon: '📍', val: 'Local',  label: 'SEO local activado',        before: 'Geolocalización estratégica',   color: 'green' },
      { icon: '🚀', val: 'Listo',  label: 'Base para Google Ads',      before: 'Arquitectura preparada',        color: '' },
    ],
    timeline: [
      { month: 'Sem 1–2', phase: 'Estrategia y arquitectura',    desc: 'Definición de público B2B, propuesta de valor, estructura de secciones web y keywords para SEO local en el mercado objetivo.',    result: 'Brief y arquitectura aprobados' },
      { month: 'Sem 3–4', phase: 'Desarrollo web y catálogo',    desc: 'Diseño y desarrollo completo del sitio. Fichas por producto con D.O., variedad, perfil organoléptico y temperatura recomendada.', result: 'Web y catálogo completos' },
      { month: 'Sem 5–6', phase: 'Copywriting y SEO on-page',    desc: 'Redacción profesional orientada al canal horeca, optimización de H1-H2, meta títulos, descripciones y ALT de imágenes.',          result: 'SEO on-page 100% optimizado' },
      { month: 'Sem 7–8', phase: 'SEO técnico y lanzamiento',    desc: 'Configuración en Google Search Console, verificación de sitemap.xml, revisión de robots.txt, indexación inicial y geolocalización local.', result: 'Web publicada e indexada' },
    ],
    quote:     'El resultado fue una web que comunica exactamente lo que somos: una empresa profesional con respaldo real. Pasamos de no existir en internet a tener una base sólida para competir.',
    author:    { name: 'Director Comercial', role: 'Distribuidora de producto premium · Sector horeca', initial: 'D', color: '#BF5AF2' },
    rating:    5,
  },

  /* ─────────────────────────────────────────────────────────
     2. SALÓN DE BELLEZA A — Transformación digital integral
  ───────────────────────────────────────────────────────── */
  identity: {
    name:      'Salón de Belleza · Cliente A',
    sector:    'Peluquería · Negocio local',
    color:     '#00C8FF',
    initial:   'I',
    duration:  'En curso',
    year:      '2025',
    tags:      ['GA4', 'Google Ads', 'Meta Ads', 'Producción Contenido', 'SEO Local'],
    bannerBg:  'linear-gradient(135deg,#000a10 0%,#001520 50%,#000810 100%)',
    bannerSvg: `<svg width="300" height="160" viewBox="0 0 300 160" fill="none">
      <circle cx="150" cy="80" r="55" stroke="rgba(0,200,255,0.15)" stroke-width="1" stroke-dasharray="6 4"/>
      <circle cx="150" cy="80" r="35" stroke="rgba(0,200,255,0.25)" stroke-width="1.5"/>
      <circle cx="150" cy="80" r="14" fill="rgba(0,200,255,0.12)" stroke="#00C8FF" stroke-width="1.5"/>
      <line x1="150" y1="25" x2="150" y2="45" stroke="#00C8FF" stroke-width="2"/>
      <line x1="195" y1="80" x2="215" y2="80" stroke="#00C8FF" stroke-width="2"/>
      <line x1="150" y1="115" x2="150" y2="135" stroke="#00C8FF" stroke-width="2"/>
      <line x1="85" y1="80" x2="105" y2="80" stroke="#00C8FF" stroke-width="2"/>
    </svg>`,
    headline:   'De publicar sin estructura a construir un sistema de captación medible',
    problem:    'Salón con buena actividad local y clientes recurrentes, pero con dependencia total de Booksy para reservas, bajo tráfico orgánico, sistema de medición desordenado, ausencia de estrategia digital y contenido sin planificación. El negocio tenía movimiento, pero no había datos claros sobre el origen real de los clientes ni un sistema para escalarlo.',
    solution:   'Construí la base técnica completa: configuración correcta de GA4, Tag Manager y Search Console, documentación del punto cero real (clics, impresiones, posición media, interacciones GMB), auditoría de todos los eventos de conversión. Visita presencial para captación de contenido profesional, diseño del calendario editorial y preparación completa para Google Ads sin tocar la web.',
    objectives: [
      'Establecer base técnica de medición correcta desde cero',
      'Documentar punto inicial real (clics, impresiones, GMB)',
      'Producir contenido propio reutilizable para redes y Ads',
      'Preparar campañas Google Ads de intención local',
    ],
    services: [
      'Auditoría GA4 + Google Tag Manager',
      'Configuración Google Search Console',
      'Optimización Google My Business',
      'Documentación de métricas base (punto cero)',
      'Grabación presencial en salón',
      'Edición de Reels estratégicos',
      'Calendario de contenido semanal',
      'Preparación campañas Google Ads locales',
    ],
    metrics: [
      { icon: '📊', val: 'GTM',     label: 'Tracking configurado',      before: 'eventos: teléfono, reserva, Booksy', color: 'green' },
      { icon: '📍', val: 'GMB',     label: 'Google My Business activo', before: 'llamadas + solicitudes de ruta',     color: '' },
      { icon: '🎥', val: 'Reels',   label: 'Contenido propio creado',   before: 'antes: sin material propio',         color: 'green' },
      { icon: '📅', val: 'Semanal', label: 'Calendario estructurado',   before: 'antes: publicación sin estructura',  color: '' },
      { icon: '🎯', val: 'Ready',   label: 'Google Ads preparado',      before: 'búsquedas: peluquería + zona',       color: '' },
      { icon: '📈', val: 'Día 0',   label: 'Punto cero documentado',    before: '30-60-90 días medibles',            color: 'green' },
    ],
    timeline: [
      { month: 'Fase 1', phase: 'Auditoría técnica completa',  desc: 'Revisión de GA4, GTM, GSC y GMB. Verificación de eventos clave: clic en teléfono, reserva y Booksy. Limpieza de etiquetas duplicadas.',             result: 'Entorno de medición limpio' },
      { month: 'Fase 2', phase: 'Documentación punto cero',    desc: 'Registro del estado inicial de clics orgánicos, impresiones, posición media y todas las interacciones en Google My Business.',                        result: 'Datos base para medir evolución' },
      { month: 'Fase 3', phase: 'Producción de contenido',     desc: 'Visita presencial al salón. Grabación de procesos reales: color, corte, ambiente, equipo. Edición de primeros Reels verticales y fotografías.',        result: 'Banco de contenido propio' },
      { month: 'Fase 4', phase: 'Sistema y Google Ads',        desc: 'Calendario editorial semanal, sistema híbrido de producción y preparación técnica completa de campañas Google Ads para búsquedas locales.',             result: 'Sistema escalable listo' },
    ],
    quote:     'Antes publicábamos cuando teníamos tiempo. Ahora tenemos un sistema: sabemos de dónde vienen los clientes, qué contenido funciona y qué campañas lanzar. El cambio es total.',
    author:    { name: 'Dirección del Salón', role: 'Salón de belleza · Negocio local', initial: 'S', color: '#00C8FF' },
    rating:    5,
  },

  /* ─────────────────────────────────────────────────────────
     3. EMPRESA REFORMAS — Sistema ERP obras en Google Sheets
  ───────────────────────────────────────────────────────── */
  reformas: {
    name:      'Empresa de Reformas',
    sector:    'Construcción · Gestión operativa',
    color:     '#FFD60A',
    initial:   'R',
    duration:  '3 semanas',
    year:      '2024',
    tags:      ['Google Sheets', 'Automatización', 'Dashboard', 'Power BI Ready'],
    bannerBg:  'linear-gradient(135deg,#100d00 0%,#1e1800 50%,#0d0a00 100%)',
    bannerSvg: `<svg width="300" height="160" viewBox="0 0 300 160" fill="none">
      <rect x="20"  y="40" width="60" height="80" rx="4" fill="rgba(255,214,10,0.08)" stroke="rgba(255,214,10,0.3)" stroke-width="1.5"/>
      <rect x="95"  y="20" width="60" height="100" rx="4" fill="rgba(255,214,10,0.12)" stroke="rgba(255,214,10,0.4)" stroke-width="1.5"/>
      <rect x="170" y="55" width="60" height="65" rx="4" fill="rgba(255,214,10,0.08)" stroke="rgba(255,214,10,0.3)" stroke-width="1.5"/>
      <rect x="245" y="30" width="40" height="90" rx="4" fill="rgba(255,214,10,0.15)" stroke="#FFD60A" stroke-width="1.5"/>
      <line x1="20" y1="135" x2="285" y2="135" stroke="rgba(255,214,10,0.2)" stroke-width="1"/>
      <polyline points="50,40 125,20 200,55 265,30" stroke="#FFD60A" stroke-width="1.5" stroke-dasharray="5 3" fill="none"/>
    </svg>`,
    headline:   'Sistema integral de control de obras y rentabilidad en tiempo real',
    problem:    'Empresa de reformas con múltiples obras simultáneas y control manual mediante hojas básicas sin análisis real de rentabilidad. Sin visión clara de márgenes reales por obra, sin separación entre mano de obra / materiales / extras, sin control de anticipos ni impagos, y sin productividad por trabajador. Trabajaban mucho, pero no sabían con precisión cuánto ganaban por cada obra.',
    solution:   'Desarrollé un sistema completo de gestión operativa y financiera en Google Sheets estructurado como ERP ligero: módulos de servicios (márgenes y costes), control de obras (presupuesto, anticipo, estado de pago automático), parte diario por trabajador, asignaciones, compras/materiales y gastos fijos. Sistema de rentabilidad por obra en tiempo real con margen, colchón y estado visual.',
    objectives: [
      'Visibilidad total del margen real por cada obra',
      'Control de costes de mano de obra diario y mensual',
      'Automatizar alertas de impago (7 y 14 días)',
      'Preparar base para conexión Power BI',
    ],
    services: [
      'Google Sheets ERP personalizado',
      'Módulo obras con estado automático de pago',
      'Parte diario por trabajador (horas, extras, coste)',
      'Sistema de rentabilidad por obra (margen real + colchón 5%)',
      'Control de compras y materiales por obra',
      'Dashboard ejecutivo visual',
      'Análisis de productividad por trabajador',
      'Preparación para Power BI (conexión directa)',
    ],
    metrics: [
      { icon: '📊', val: '100%',  label: 'Margen real visible',        before: 'antes: cálculo manual aproximado', color: 'green' },
      { icon: '🏗️', val: '5',     label: 'Módulos integrados',         before: 'Obras · Partes · Compras · Gastos', color: '' },
      { icon: '⚠️',  val: 'Auto', label: 'Alertas impago automatizadas', before: 'aviso 7 días / bloqueo 14 días', color: 'green' },
      { icon: '👷', val: 'Real',  label: 'Productividad por trabajador', before: 'antes: sin datos individuales',  color: '' },
      { icon: '💰', val: '5%',    label: 'Colchón seguridad por obra',  before: 'consumo visible en tiempo real',  color: '' },
      { icon: '📈', val: 'BI',    label: 'Power BI ready',              before: 'conexión directa preparada',      color: 'green' },
    ],
    timeline: [
      { month: 'Sem 1',   phase: 'Análisis y arquitectura',    desc: 'Levantamiento del proceso actual, identificación de necesidades por módulo y diseño de la arquitectura del sistema.',                           result: 'Mapa de módulos aprobado' },
      { month: 'Sem 1–2', phase: 'Desarrollo módulos core',    desc: 'Construcción de módulos: Servicios, Obras, Parte Diario, Asignaciones. Fórmulas automáticas de coste y rentabilidad.',                            result: 'Core del sistema operativo' },
      { month: 'Sem 2–3', phase: 'Rentabilidad y dashboard',   desc: 'Sistema de margen real por obra, colchón del 5%, estados de rentabilidad (Óptimo/Colchón/Pérdida) y dashboard ejecutivo visual.',                 result: 'Control financiero por obra' },
      { month: 'Sem 3',   phase: 'Flujo de caja y Power BI',   desc: 'Automatización de alertas de impago (7 y 14 días), control de anticipos y estructura final para conexión directa a Power BI Desktop.',           result: 'Sistema completo entregado' },
    ],
    quote:     'Por primera vez sé exactamente cuánto estoy ganando en cada obra antes de terminarla. El sistema me avisa si estoy consumiendo el colchón de seguridad. Es lo que necesitaba desde hace años.',
    author:    { name: 'Dirección · Cliente', role: 'Empresa de construcción y reformas', initial: 'R', color: '#FFD60A' },
    rating:    5,
  },

  /* ─────────────────────────────────────────────────────────
     4. SALÓN DE BELLEZA B — Transformación digital 360°
  ───────────────────────────────────────────────────────── */
  desancho: {
    name:      'Salón de Belleza · Cliente B',
    sector:    'Peluquería premium · Zona centro',
    color:     '#00FF82',
    initial:   'D',
    duration:  'En curso',
    year:      '2024–25',
    tags:      ['Meta Ads', 'Google Ads', 'SEO', 'Contenido', 'Automatización', 'Reservas'],
    bannerBg:  'linear-gradient(135deg,#000e06 0%,#001a0c 50%,#000a04 100%)',
    bannerSvg: `<svg width="300" height="160" viewBox="0 0 300 160" fill="none">
      <circle cx="150" cy="80" r="60" stroke="rgba(0,255,130,0.1)" stroke-width="40" fill="none"/>
      <circle cx="150" cy="80" r="35" stroke="rgba(0,255,130,0.2)" stroke-width="1.5" fill="none"/>
      <circle cx="150" cy="80" r="12" fill="rgba(0,255,130,0.15)" stroke="#00FF82" stroke-width="1.5"/>
      <path d="M90 80 Q120 50 150 80 Q180 110 210 80" stroke="#00FF82" stroke-width="2" fill="none"/>
      <circle cx="90"  cy="80" r="4" fill="#00FF82" opacity="0.7"/>
      <circle cx="210" cy="80" r="4" fill="#00FF82"/>
    </svg>`,
    headline:   'Transformación digital 360° de peluquería premium: de 0 sistema a estructura completa',
    problem:    'El salón tenía talento y clientes, pero no tenía sistema. Sin presencia digital estructurada, sin medición real del tráfico, sin automatización de reservas ni contenido estratégico. La web existía pero no estaba optimizada. Las redes funcionaban por inercia, no por estrategia. Cada mes era empezar de cero.',
    solution:   'Diseñé una estrategia 360º completa: optimización técnica web (SEO + GA4 + GSC + GTM + Stripe), sistema de reservas con pago anticipado de 10€ automatizado, Google Ads para búsquedas locales en la zona, campañas de Meta Ads para captación y reconocimiento de marca, producción de contenido presencial, calendario editorial mensual y automatizaciones de Slack + Sheets.',
    objectives: [
      'Posicionamiento SEO local en la zona (palabras clave de intención local)',
      'Activar captación con Google Ads y Meta Ads',
      'Implementar sistema de reservas con cobro anticipado',
      'Crear sistema interno de producción de contenido',
    ],
    services: [
      'Optimización SEO técnica (desancho.com)',
      'Google Ads búsqueda local zona objetivo',
      'Meta Ads: campañas captación y reconocimiento',
      'Sistema reservas con pago anticipado (Stripe)',
      'GA4 + Search Console + Tag Manager',
      'Producción de contenido presencial (Reels, fotos)',
      'Calendario editorial mensual',
      'Automatizaciones Slack + Google Sheets',
    ],
    metrics: [
      { icon: '💳', val: '10€',    label: 'Pago anticipado reservas',   before: 'antes: cancelaciones sin coste',   color: 'green' },
      { icon: '🎯', val: '3',      label: 'Campañas Meta Ads activas',  before: 'Cambio de Look · Tratamiento · Agosto', color: '' },
      { icon: '🔍', val: 'Local',  label: 'SEO local activado',         before: 'palabras clave de intención local',  color: 'green' },
      { icon: '🎥', val: 'Reels',  label: 'Contenido estratégico',      before: 'sistema híbrido propio + profesional', color: '' },
      { icon: '⚙️', val: 'Auto',   label: 'Flujo reservas automatizado', before: 'Stripe + seguimiento incluido',    color: 'green' },
      { icon: '📊', val: '360°',   label: 'Ecosistema completo activo', before: 'Web · Ads · SEO · Contenido · CRM', color: '' },
    ],
    timeline: [
      { month: 'Mes 1', phase: 'Base técnica y SEO',          desc: 'Optimización web, instalación GA4 + GTM + GSC, metadatos, arquitectura SEO local, integración Stripe para reservas con pago anticipado.',           result: 'Base técnica y medición activa' },
      { month: 'Mes 2', phase: 'Ads y producción',            desc: 'Lanzamiento Google Ads local, campaña Meta Ads "Cambio de Look", visita presencial para grabación de contenido (procesos, equipo, transformaciones).', result: 'Campañas activas + banco de contenido' },
      { month: 'Mes 3', phase: 'Optimización y campaña',      desc: 'Campaña "Tratamiento + Producto 75€", campaña "Agosto de Cambios", optimización de audiencias y creatividades, integración Meta Pixel.',               result: 'Sistema de captación estable' },
      { month: 'Ongoing', phase: 'Escala y automatización',   desc: 'Calendario mensual, automatizaciones Slack, plantillas Canva, sesión de fotos de colección y preparación de flujo IA para llamadas entrantes.',       result: 'Crecimiento sostenido' },
    ],
    quote:     'El salón no solo publica contenido. Tiene sistema, estructura, automatización, medición y estrategia de crecimiento. El cambio de mentalidad y de resultados ha sido total.',
    author:    { name: 'Dirección del Salón', role: 'Peluquería premium · Zona centro', initial: 'S', color: '#00FF82' },
    rating:    5,
  },

  /* ─────────────────────────────────────────────────────────
     5. ARTISTA TATUAJE — Posicionamiento internacional + LA Guest Spot
  ───────────────────────────────────────────────────────── */
  tatuaje: {
    name:      'Artista de Tatuaje',
    sector:    'Marca personal · Internacional',
    color:     '#FF6B6B',
    initial:   'A',
    duration:  '8 semanas',
    year:      '2025',
    tags:      ['Marca Personal', 'Meta Ads', 'Storytelling', 'Guest Spot LA'],
    bannerBg:  'linear-gradient(135deg,#100505 0%,#1e0a0a 50%,#0d0303 100%)',
    bannerSvg: `<svg width="300" height="160" viewBox="0 0 300 160" fill="none">
      <circle cx="80"  cy="80" r="30" stroke="rgba(255,107,107,0.3)" stroke-width="1.5" fill="none"/>
      <circle cx="150" cy="80" r="45" stroke="rgba(255,107,107,0.5)" stroke-width="2"   fill="none"/>
      <circle cx="220" cy="80" r="30" stroke="rgba(255,107,107,0.3)" stroke-width="1.5" fill="none"/>
      <path d="M50 80 L250 80" stroke="rgba(255,107,107,0.2)" stroke-width="1" stroke-dasharray="4 4"/>
      <circle cx="150" cy="80" r="8" fill="rgba(255,107,107,0.2)" stroke="#FF6B6B" stroke-width="1.5"/>
      <text x="140" y="130" font-family="monospace" font-size="10" fill="rgba(255,107,107,0.4)">LA 2025</text>
    </svg>`,
    headline:   'Reposicionamiento internacional y activación de Guest Spot en Los Ángeles con Meta Ads',
    problem:    'Artista con más de 13 años de experiencia internacional en realismo a color y gran formato. Perfil de Instagram funcionando como portfolio pasivo, alto nivel técnico pero baja narrativa de marca, sin posicionamiento diferenciador ni sistema de captación para clientes internacionales. El talento era excepcional. La estrategia no existía.',
    solution:   'Redefiní el posicionamiento como "artista visual que trabaja sobre piel, no solo tatuador". Desarrollé 30+ guiones de storytelling, un plan editorial de 8 semanas por pilares (mentalidad, trayectoria, proceso creativo, criterio, rechazos estratégicos) y activé una campaña Meta Ads en dos fases para generar DMs cualificados para el Guest Spot en Los Ángeles (2–13 de marzo).',
    objectives: [
      'Reposicionar marca personal a nivel internacional',
      'Activar demanda cualificada para Guest Spot en LA',
      'Construir narrativa de autoridad y exclusividad real',
      'Crear sistema replicable para futuros eventos y estudio propio',
    ],
    services: [
      'Estrategia de marca personal internacional',
      'Rediseño de bio y narrativa de posicionamiento',
      '30+ guiones de storytelling profesional',
      'Plan editorial 8 semanas (pilares de contenido)',
      'Sistema diario de grabación eficiente',
      'Campaña Meta Ads Fase 1: Video Views (público caliente)',
      'Campaña Meta Ads Fase 2: Mensajes (remarketing + intereses)',
      'Estructura de filtro de clientes y proyectos',
    ],
    metrics: [
      { icon: '📝', val: '30+',    label: 'Guiones storytelling',       before: 'antes: sin narrativa estructurada',  color: '' },
      { icon: '📅', val: '8 sem',  label: 'Plan editorial estructurado', before: 'pilares: mentalidad · proceso · criterio', color: 'green' },
      { icon: '🎯', val: '2 fases', label: 'Campaña Meta Ads LA',       before: 'Video Views → Mensajes cualificados', color: '' },
      { icon: '🌎', val: 'LA',     label: 'Guest Spot activado',         before: 'Los Ángeles 2–13 marzo 2025',        color: 'green' },
      { icon: '🔒', val: 'Filtro', label: 'Sistema selección proyectos', before: 'medium to large scale only',         color: '' },
      { icon: '⭐', val: 'Premium', label: 'Percepción de marca',        before: 'sin descuentos · sin urgencia artificial', color: 'green' },
    ],
    timeline: [
      { month: 'Sem 1–2', phase: 'Estrategia de marca',        desc: 'Redefinición del posicionamiento, optimización de bio, eliminación de enfoque genérico y construcción de narrativa basada en criterio y exclusividad.',  result: 'Nueva identidad de marca' },
      { month: 'Sem 3–5', phase: 'Sistema de contenido',       desc: 'Desarrollo de 30+ guiones por pilares, sistema diario de grabación de 2-3 min, calendario de 8 semanas y validación de mensajes con mayor impacto.',     result: '8 semanas de contenido preparado' },
      { month: 'Sem 6',   phase: 'Validación orgánica',        desc: 'Análisis de interacción real: guardados, DMs, comentarios de calidad. No se activó publicidad hasta validar el discurso y crear público caliente.',        result: 'Audiencia cualificada construida' },
      { month: 'Sem 7–8', phase: 'Campaña Meta Ads LA',        desc: 'Fase 1: Video Views para crear público caliente. Fase 2: campañas de mensajes a intereses tattoo realism + vieron +50% del video + interacciones previas.', result: 'DMs cualificados para Guest Spot' },
    ],
    quote:     'El talento no necesitaba más visibilidad. Necesitaba mejor estructura. Cuando la autoridad se comunica correctamente, la publicidad solo amplifica lo que ya funciona.',
    author:    { name: 'Artista · Confidencial', role: 'Artista visual · Realismo · Internacional', initial: 'A', color: '#FF6B6B' },
    rating:    5,
  },

  /* ─────────────────────────────────────────────────────────
     6. ECOMMERCE + CONTENIDO IA — Tienda online + animación producto
  ───────────────────────────────────────────────────────── */
  ecommerce: {
    name:      'Ecommerce + Contenido IA',
    sector:    'Tienda online · Producto físico',
    color:     '#4ECDC4',
    initial:   'E',
    duration:  '6 semanas',
    year:      '2024',
    tags:      ['Ecommerce', 'Imágenes IA', 'Animación', 'CRO', 'Contenido Visual'],
    bannerBg:  'linear-gradient(135deg,#000d0d 0%,#001818 50%,#000909 100%)',
    bannerSvg: `<svg width="300" height="160" viewBox="0 0 300 160" fill="none">
      <rect x="40" y="30" width="100" height="100" rx="8" stroke="rgba(78,205,196,0.3)" stroke-width="1.5" fill="rgba(78,205,196,0.04)"/>
      <rect x="55" y="45" width="70"  height="70"  rx="4" stroke="rgba(78,205,196,0.5)" stroke-width="1"   fill="rgba(78,205,196,0.06)"/>
      <circle cx="90" cy="80" r="22" stroke="#4ECDC4" stroke-width="1.5" stroke-dasharray="5 3" fill="none"/>
      <path d="M180 60 L240 60 L240 120 L180 120 Z" stroke="rgba(78,205,196,0.4)" stroke-width="1.5" fill="rgba(78,205,196,0.04)"/>
      <path d="M190 90 Q210 70 230 90 Q210 110 190 90 Z" stroke="#4ECDC4" stroke-width="1" fill="rgba(78,205,196,0.1)"/>
      <path d="M180 40 L250 40" stroke="rgba(78,205,196,0.3)" stroke-width="1" stroke-dasharray="3 3"/>
    </svg>`,
    headline:   'Tienda online completa + imágenes lifestyle IA + animación de producto profesional',
    problem:    'Cliente que necesitaba lanzar su tienda online desde cero, sin ecommerce previo ni contenido visual propio. Sin imagen de producto, sin material para campañas y sin identidad visual coherente. La competencia usaba bancos de imágenes genéricos. Necesitaban diferenciarse desde el primer día.',
    solution:   'Desarrollé la tienda online completa (arquitectura, responsive, pasarela de pago, SEO básico, analítica). Creé desde cero todo el contenido visual: imágenes lifestyle realistas del producto con IA (composición, iluminación golden hour, integración de marca) y animación imagen-a-vídeo con efectos físicos reales (fuego, movimiento humano, interacción con el producto). Todo listo para campañas desde el día 1.',
    objectives: [
      'Lanzar tienda online funcional y optimizada desde cero',
      'Crear identidad visual diferenciadora con IA',
      'Generar contenido animado para aumentar conversión',
      'Preparar material completo para campañas y redes',
    ],
    services: [
      'Desarrollo ecommerce completo (responsive + pago)',
      'SEO básico y configuración de analítica',
      'Generación imágenes producto lifestyle con IA',
      'Composición y dirección creativa visual',
      'Animación imagen-a-vídeo con efectos físicos',
      'Adaptación de contenido para anuncios',
      'Optimización de ficha de producto y UX',
      'Entrega de activos digitales reutilizables',
    ],
    metrics: [
      { icon: '🛒', val: 'Día 1',  label: 'Tienda online operativa',    before: 'antes: sin ecommerce ni web',       color: 'green' },
      { icon: '🎨', val: '100%',   label: 'Contenido visual propio',    before: 'antes: sin imágenes de producto',   color: 'green' },
      { icon: '🎬', val: 'IA',     label: 'Imágenes lifestyle creadas', before: 'golden hour · composición real',    color: '' },
      { icon: '🔥', val: 'Vídeo',  label: 'Animaciones de producto',    before: 'fuego · movimiento · interacción',  color: 'green' },
      { icon: '📱', val: 'Ready',  label: 'Material para Ads y redes',  before: 'activos listos para campañas',      color: '' },
      { icon: '⚡', val: 'UX',     label: 'Experiencia optimizada',     before: 'mobile-first · velocidad · CRO',    color: 'green' },
    ],
    timeline: [
      { month: 'Sem 1–2', phase: 'Desarrollo tienda online',    desc: 'Arquitectura ecommerce, diseño responsive, configuración pasarela de pago, SEO básico, analítica GA4 y optimización de velocidad y rendimiento.',    result: 'Tienda funcional y operativa' },
      { month: 'Sem 3–4', phase: 'Creación contenido visual IA', desc: 'Dirección creativa, generación de imágenes lifestyle realistas del producto con IA, composición escénica, iluminación golden hour e integración de marca.', result: 'Banco de imágenes propio y diferenciador' },
      { month: 'Sem 5',   phase: 'Animación imagen-a-vídeo',    desc: 'Transformación de imágenes estáticas en vídeos dinámicos: animación realista de producto, simulación de fuego y ambiente, movimiento humano orgánico y efectos físicos.', result: 'Contenido vídeo premium para campañas' },
      { month: 'Sem 6',   phase: 'Entrega y optimización UX',   desc: 'Integración del contenido en la tienda, optimización de fichas de producto, preparación de activos para anuncios y entrega del ecosistema digital completo.', result: 'Ecosistema listo para vender desde día 1' },
    ],
    quote:     'No entregó solo una web. Entregó un ecosistema digital completo: tienda, imágenes propias y vídeos de producto que parecen de marca internacional. La diferencia con la competencia es visible desde el primer segundo.',
    author:    { name: 'Cliente Ecommerce', role: 'Fundador · Tienda online producto físico', initial: 'E', color: '#4ECDC4' },
    rating:    5,
  },

};

/* ============================================================
   DRAWER RENDER + FILTER + MODAL LOGIC
   (código de interfaz — no tocar salvo que cambies la estructura HTML)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards  = document.querySelectorAll('.case-card[data-cat]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      caseCards.forEach(card => {
        const cats = (card.dataset.cat || '').split(' ');
        card.style.display = (cat === 'all' || cats.includes(cat)) ? '' : 'none';
      });
    });
  });

  /* ── Reveal ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));

  /* ── Drawer open ── */
  document.querySelectorAll('.case-card-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const key = btn.closest('[data-case]')?.dataset.case;
      if (key && CASES[key]) openDrawer(CASES[key]);
    });
  });

  /* ── Drawer close ── */
  document.getElementById('drawerOverlay')?.addEventListener('click', closeDrawer);
  document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  /* ── Open ── */
  function openDrawer(c) {
    const drawer  = document.getElementById('caseDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const content = document.getElementById('drawerContent');
    if (!drawer || !content) return;

    content.innerHTML = buildDrawer(c);
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    /* Re-bind close button inside the freshly rendered content */
    drawer.querySelector('.drawer-close-btn')?.addEventListener('click', closeDrawer);
  }

  function closeDrawer() {
    document.getElementById('caseDrawer')?.classList.remove('open');
    document.getElementById('drawerOverlay')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Build drawer HTML ── */
  function buildDrawer(c) {
    const stars = '★'.repeat(c.rating || 5);

    const metricsHtml = (c.metrics || []).map(m => `
      <div class="drawer-metric ${m.color === 'green' ? 'metric-green' : ''}">
        <div class="drawer-metric-icon">${m.icon}</div>
        <div class="drawer-metric-val">${m.val}</div>
        <div class="drawer-metric-lbl">${m.label}</div>
        <div class="drawer-metric-before">${m.before}</div>
      </div>`).join('');

    const servicesHtml = (c.services || []).map(s =>
      `<span class="drawer-service-tag">${s}</span>`).join('');

    const objectivesHtml = (c.objectives || []).map(o =>
      `<li>${o}</li>`).join('');

    const timelineHtml = (c.timeline || []).map(t => `
      <div class="drawer-timeline-item">
        <div class="drawer-timeline-month">${t.month}</div>
        <div class="drawer-timeline-content">
          <div class="drawer-timeline-phase">${t.phase}</div>
          <div class="drawer-timeline-desc">${t.desc}</div>
          <div class="drawer-timeline-result">→ ${t.result}</div>
        </div>
      </div>`).join('');

    return `
      <!-- Header -->
      <div class="drawer-header" style="background:${c.bannerBg};">
        <div class="drawer-header-overlay"></div>
        <div class="drawer-header-svg" aria-hidden="true">${c.bannerSvg}</div>
        <div class="drawer-header-content">
          <div class="drawer-avatar" style="background:${c.color};">${c.initial}</div>
          <div>
            <div class="drawer-name">${c.name}</div>
            <div class="drawer-sector">${c.sector}</div>
            <div class="drawer-tags">${(c.tags||[]).map(t=>`<span class="drawer-tag">${t}</span>`).join('')}</div>
          </div>
        </div>
        <div class="drawer-meta">
          <span class="drawer-meta-item">📅 ${c.year}</span>
          <span class="drawer-meta-item">⏱ ${c.duration}</span>
        </div>
      </div>

      <!-- Body -->
      <div class="drawer-body">

        <h2 class="drawer-headline">${c.headline}</h2>

        <!-- Problema -->
        <div class="drawer-section">
          <div class="drawer-section-label">El Problema</div>
          <p class="drawer-text">${c.problem}</p>
        </div>

        <!-- Solución -->
        <div class="drawer-section">
          <div class="drawer-section-label">La Solución</div>
          <p class="drawer-text">${c.solution}</p>
        </div>

        <!-- Objetivos -->
        <div class="drawer-section">
          <div class="drawer-section-label">Objetivos</div>
          <ul class="drawer-objectives">${objectivesHtml}</ul>
        </div>

        <!-- Métricas -->
        <div class="drawer-section">
          <div class="drawer-section-label">Resultados Clave</div>
          <div class="drawer-metrics-grid">${metricsHtml}</div>
        </div>

        <!-- Servicios -->
        <div class="drawer-section">
          <div class="drawer-section-label">Servicios Implementados</div>
          <div class="drawer-services">${servicesHtml}</div>
        </div>

        <!-- Timeline -->
        <div class="drawer-section">
          <div class="drawer-section-label">Fases del Proyecto</div>
          <div class="drawer-timeline">${timelineHtml}</div>
        </div>

        <!-- Testimonial -->
        <div class="drawer-quote-block">
          <div class="drawer-quote-text">"${c.quote}"</div>
          <div class="drawer-quote-author">
            <div class="drawer-quote-avatar" style="background:${c.author.color};">${c.author.initial}</div>
            <div>
              <div class="drawer-quote-name">${c.author.name}</div>
              <div class="drawer-quote-role">${c.author.role}</div>
              <div class="drawer-quote-stars">${stars}</div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="drawer-cta">
          <p style="font-size:14px;color:var(--text-muted);margin-bottom:16px;">
            ¿Tu negocio necesita algo similar? Cuéntame tu situación.
          </p>
          <a href="contact.html" class="btn btn-primary">Solicitar estrategia →</a>
          <a href="roi.html"     class="btn btn-ghost"    style="margin-left:10px;">Calcular mi ROI</a>
        </div>

      </div>`;
  }
});
