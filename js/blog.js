/* ============================================================
   RAXISLAB — js/blog.js
   Articles data, render, filters, search, modal
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────────
   ARTICLES DATA
   Add / edit articles here. slug must be unique.
   categories: ads | seo | cro | ia | estrategia
   ────────────────────────────────────────────────────────────── */
const ARTICLES = [
  {
    slug:      'roas-4x-meta-ads-2024',
    featured:  true,
    cat:       'ads',
    catLabel:  'Meta & Google Ads',
    title:     'Cómo conseguimos ROAS 4.8× en Meta Ads con solo 3 cambios estructurales',
    excerpt:   'La mayoría de cuentas de Meta Ads mueren por los mismos errores. No es el presupuesto, no es la segmentación. Es la arquitectura. Aquí los 3 cambios que transformaron el rendimiento de 6 clientes consecutivos.',
    date:      'Feb 2026',
    readTime:  '8 min',
    tags:      ['Meta Ads', 'ROAS', 'Estructura de cuenta'],
    bgColor:   'linear-gradient(135deg, #000510 0%, #001428 40%, #000820 100%)',
    bgSvg:     `<svg width="340" height="200" viewBox="0 0 340 200" fill="none"><polyline points="0,170 60,130 120,140 180,90 240,104 300,52 340,28" stroke="#00C8FF" stroke-width="2.5" fill="none"/><polyline points="0,185 60,165 120,158 180,132 240,144 300,116 340,100" stroke="rgba(0,200,255,0.3)" stroke-width="1.5" fill="none"/><circle cx="300" cy="52" r="5" fill="#00C8FF" opacity="0.8"/><circle cx="340" cy="28" r="6" fill="#00C8FF"/></svg>`,
    content: `
      <h3>El problema real que nadie te cuenta</h3>
      <p>Cuando un cliente llega con un ROAS de 1.4× y me dice "el problema es el presupuesto", 
      sé que voy a tener que romper una creencia profunda. El presupuesto nunca es el problema. 
      La arquitectura siempre lo es.</p>
      <p>Después de analizar más de 40 cuentas publicitarias en los últimos 3 años, he 
      identificado un patrón que aparece en el <strong>87% de las cuentas que rinden mal</strong>: 
      no es que gasten poco, es que gastan mal estructuradas.</p>

      <div class="highlight-box">
        💡 <strong>Insight clave:</strong> Una cuenta mal estructurada con €10.000/mes de presupuesto 
        rinde peor que una bien construida con €2.000/mes. El algoritmo de Meta necesita coherencia 
        para aprender, no volumen.
      </div>

      <h3>Cambio #1: Colapsar campañas, no multiplicarlas</h3>
      <p>El error más común: 12 campañas activas con €200/mes cada una. El algoritmo de Meta 
      necesita <em>mínimo 50 conversiones por semana por grupo de anuncios</em> para salir de la 
      fase de aprendizaje. Con €200 y un CPA de €40, eso es imposible matemáticamente.</p>
      <p>La solución contraintuitiva: colapsar esas 12 campañas en 2-3 con mayor presupuesto individual. 
      En los 6 clientes donde aplicamos este cambio, el ROAS medio pasó de <span class="stat-inline">1.6×</span> 
      a <span class="stat-inline">3.2×</span> en las primeras 3 semanas.</p>

      <h3>Cambio #2: Advantage+ como arquitectura principal, no como experimento</h3>
      <p>Meta Advantage+ Shopping Campaigns no es "la campaña nueva que hay que probar". 
      Es el futuro de la publicidad en Meta y los resultados lo demuestran. En nuestra cartera, 
      las campañas Advantage+ superan consistentemente a las campañas manuales en un <strong>38% en ROAS</strong> 
      y un <strong>22% en CPM</strong>.</p>
      <p>La clave está en alimentarla bien: mínimo 50 creatividades en el catálogo, señales de 
      píxel sólidas (mínimo 6 meses de datos) y un set de audiencias de exclusión bien definido 
      para proteger la calidad del tráfico.</p>

      <h3>Cambio #3: Creatividades como variable principal de optimización</h3>
      <p>En 2024-2025, el targeting ya no lo decides tú. Lo decide el algoritmo basándose en 
      la creatividad. Una buena creatividad encuentra a su audiencia sola. Una mala creatividad 
      derrochará presupuesto en cualquier segmentación.</p>
      <p>El framework que usamos: <strong>3 hooks × 3 ángulos × 2 formatos = 18 variantes</strong> 
      por campaña. Los primeros 7 días son la fase de aprendizaje creativo. A partir del día 8, 
      pausamos todo excepto las 3-5 variantes con mejor CTR e IPSO.</p>

      <div class="highlight-box">
        📊 <strong>Resultado real:</strong> Con estos 3 cambios aplicados en ScaleUp Pro 
        (ecommerce Barcelona), el ROAS pasó de 1.4× a 4.4× en 90 días, con el mismo 
        presupuesto de €2.800/mes.
      </div>

      <h3>La fórmula resumida</h3>
      <ul>
        <li>Menos campañas, más presupuesto por campaña → el algoritmo aprende más rápido</li>
        <li>Advantage+ como motor principal → deja que la IA haga el trabajo</li>
        <li>Creatividades como palanca → mínimo 15 variantes activas en rotación</li>
        <li>Señales de conversión sólidas → píxel con datos, no campañas de frío</li>
      </ul>
      <p>¿Quieres que analice tu cuenta y te diga exactamente qué cambiaría? 
      La revisión es gratuita y sin compromiso.</p>
    `,
  },
  {
    slug:      'seo-tecnico-2025-checklist',
    featured:  false,
    cat:       'seo',
    catLabel:  'SEO',
    title:     'SEO técnico en 2025: el checklist que uso antes de tocar una sola keyword',
    excerpt:   'El contenido no sirve de nada si la estructura técnica está rota. Este es el proceso de auditoría que aplico en cada proyecto antes de escribir una sola línea de contenido.',
    date:      'Ene 2026',
    readTime:  '11 min',
    tags:      ['SEO Técnico', 'Auditoría', 'Core Web Vitals'],
    bgColor:   'linear-gradient(135deg, #001208 0%, #002410 40%, #001008 100%)',
    bgSvg:     `<svg width="260" height="180" viewBox="0 0 260 180" fill="none"><circle cx="130" cy="90" r="65" stroke="#00FF82" stroke-width="2" stroke-dasharray="8 4"/><circle cx="130" cy="90" r="42" stroke="#00FF82" stroke-width="1.5" opacity="0.6"/><circle cx="130" cy="90" r="20" fill="rgba(0,255,130,0.12)" stroke="#00FF82" stroke-width="1"/><line x1="130" y1="25" x2="130" y2="0" stroke="#00FF82" stroke-width="2"/><line x1="195" y1="90" x2="220" y2="90" stroke="#00FF82" stroke-width="2"/></svg>`,
    content: `
      <h3>¿Por qué el contenido sin base técnica no funciona?</h3>
      <p>He auditado más de 60 webs en los últimos 3 años. En el <strong>73% de los casos</strong>, 
      el problema no era la falta de contenido ni de backlinks. Era que la web tenía problemas 
      técnicos que impedían a Google rastrear, indexar y posicionar correctamente las páginas.</p>
      <p>Antes de tocar una sola keyword o escribir un solo artículo, hago siempre el mismo proceso. 
      Aquí te lo detallo punto por punto.</p>

      <h3>Bloque 1: Rastreo e Indexación</h3>
      <ul>
        <li>¿Está el robots.txt bloqueando recursos críticos?</li>
        <li>¿El sitemap.xml está actualizado y solo incluye páginas indexables?</li>
        <li>¿Hay páginas importantes bloqueadas con noindex accidental?</li>
        <li>¿Google Search Console reporta errores de cobertura?</li>
        <li>¿El presupuesto de rastreo se está desperdiciando en páginas sin valor (facetas, filtros, parámetros URL)?</li>
      </ul>

      <div class="highlight-box">
        🔍 <strong>Caso real:</strong> En AuraMediaGroup encontré que el 43% del presupuesto 
        de rastreo se iba a páginas de tags y categorías vacías. Después de corregirlo, 
        Google empezó a indexar las páginas importantes el doble de rápido.
      </div>

      <h3>Bloque 2: Core Web Vitals</h3>
      <p>Google lleva años diciéndote que la experiencia de usuario es un factor de ranking. 
      En 2025 ya no es opcional. Los tres indicadores clave:</p>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> debe estar bajo 2.5s. Si tu hero image 
        no está optimizada o el servidor tarda, esto falla.</li>
        <li><strong>INP (Interaction to Next Paint):</strong> sustituyó al FID. Mide la respuesta 
        a interacciones del usuario. Objetivo: bajo 200ms.</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> los elementos no deben moverse al cargar. 
        Objetivo: bajo 0.1.</li>
      </ul>

      <h3>Bloque 3: Estructura y Arquitectura</h3>
      <p>Una web bien estructurada facilita que Google entienda qué página debe posicionar para 
      cada intención de búsqueda. Los errores más comunes:</p>
      <ul>
        <li><strong>Canibalización de keywords:</strong> múltiples páginas compitiendo por los 
        mismos términos. Solución: consolidar o diferenciar claramente la intención.</li>
        <li><strong>Contenido duplicado:</strong> páginas casi idénticas sin canonical correctamente 
        configurado.</li>
        <li><strong>Silos temáticos rotos:</strong> sin enlazado interno que comunique la jerarquía 
        temática al crawler.</li>
      </ul>

      <h3>Bloque 4: Autoridad y Señales Off-Page</h3>
      <p>Una vez la base técnica está limpia, el link building tiene sentido. Antes, no. 
      Los factores que evalúo:</p>
      <ul>
        <li>Domain Rating (Ahrefs) y Domain Authority (Moz) como referencias de partida</li>
        <li>Perfil de backlinks: ratio follow/nofollow, diversidad de dominios, toxicidad</li>
        <li>Menciones de marca sin enlace (oportunidades de link building)</li>
        <li>Competidores: ¿de dónde sacan sus links? ¿cuáles son replicables?</li>
      </ul>
      <p>Este checklist completo con más de 80 puntos está disponible para mis clientes. 
      Si quieres que lo aplique a tu web, <a href="contact.html" style="color:var(--accent)">contáctame aquí</a>.</p>
    `,
  },
  {
    slug:      'cro-landing-page-9-claves',
    featured:  false,
    cat:       'cro',
    catLabel:  'CRO & Conversión',
    title:     '9 elementos que hacen que una landing page convierta al 7%+ (con ejemplos reales)',
    excerpt:   'La diferencia entre una landing al 1% y una al 7% no está en el diseño. Está en la psicología. Estos son los 9 elementos que aplico en cada rediseño CRO.',
    date:      'Ene 2026',
    readTime:  '9 min',
    tags:      ['CRO', 'Landing Page', 'Conversión'],
    bgColor:   'linear-gradient(135deg, #080002 0%, #18000a 40%, #080005 100%)',
    bgSvg:     `<svg width="260" height="180" viewBox="0 0 260 180" fill="none"><rect x="30" y="20" width="200" height="140" rx="8" stroke="#FF6B6B" stroke-width="2"/><line x1="30" y1="48" x2="230" y2="48" stroke="#FF6B6B" stroke-width="1" opacity="0.4"/><rect x="46" y="65" width="70" height="70" rx="4" fill="rgba(255,107,107,0.2)"/><rect x="130" y="65" width="88" height="22" rx="3" fill="rgba(255,107,107,0.15)"/><rect x="130" y="94" width="66" height="16" rx="3" fill="rgba(255,107,107,0.1)"/><rect x="130" y="116" width="50" height="14" rx="4" fill="#FF6B6B" opacity="0.6"/></svg>`,
    content: `
      <h3>Por qué el 93% de las landing pages convierten mal</h3>
      <p>Después de rediseñar más de 25 landing pages y analizar los datos de A/B testing de 
      cada una, he llegado a una conclusión incómoda: el problema casi nunca está en el diseño. 
      Está en no entender la psicología del visitante.</p>
      <p>El visitante que llega a tu landing tiene 3 segundos para decidir si sigue o se va. 
      En esos 3 segundos responde inconscientemente a una sola pregunta: <strong>"¿Esto es para mí?"</strong></p>

      <h3>Los 9 elementos irrenunciables</h3>
      <p><strong>1. Headline que habla del resultado, no del servicio.</strong> 
      "Aumenta tus ventas un 40% en 90 días" convierte más que "Agencia de Marketing Digital". 
      El visitante compra resultados, no servicios.</p>
      <p><strong>2. Subheadline que responde la pregunta "¿cómo?".</strong> 
      Después del headline de resultado, el cerebro pregunta "¿y eso cómo lo hacéis?". 
      La subheadline debe responderlo en una línea.</p>
      <p><strong>3. Hero visual que refuerza la propuesta.</strong> 
      No un stock photo genérico. Una imagen o vídeo que muestre el resultado o el proceso. 
      El cerebro procesa imágenes 60.000 veces más rápido que texto.</p>
      <p><strong>4. Prueba social inmediata.</strong> 
      Los testimonios no van al final. Van arriba, en el scroll inicial. 
      En nuestros tests, mover los testimonios del footer al hero aumentó el CVR un 34%.</p>
      <p><strong>5. CTA que dice qué pasa después.</strong> 
      "Enviar" o "Contactar" generan fricción mental. "Recibir mi estrategia gratuita" 
      o "Reservar mi llamada de 30 min" eliminan la incertidumbre.</p>

      <div class="highlight-box">
        📊 <strong>Caso FuturaBrands:</strong> Solo con cambiar el CTA de "Comprar ahora" 
        a "Ver mi talla + envío gratis" aumentamos el CTR del botón un 67%. El CVR pasó 
        del 2.1% al 4.8% en 2 semanas.
      </div>

      <p><strong>6. Indicadores de confianza en el momento de decisión.</strong> 
      Justo antes del formulario o botón de compra: logos de medios, certificaciones, 
      número de clientes, garantías. No después. Antes.</p>
      <p><strong>7. Formulario mínimo viable.</strong> 
      Cada campo adicional reduce el CVR un 12% de media. 
      Pregunta solo lo que necesitas para el siguiente paso del proceso.</p>
      <p><strong>8. Urgencia y escasez contextuales.</strong> 
      No el clásico "¡Oferta solo hoy!" que nadie cree. Urgencia real: plazas limitadas, 
      fecha de cierre real, stock actual. La autenticidad es la clave.</p>
      <p><strong>9. Velocidad de carga bajo 2 segundos.</strong> 
      Cada segundo adicional de carga reduce el CVR un 7%. Una landing bonita que tarda 
      6 segundos en cargar pierde más conversiones que una fea que carga en 1.5s.</p>
    `,
  },
  {
    slug:      'automatizacion-crm-errores-comunes',
    featured:  false,
    cat:       'ia',
    catLabel:  'IA & Automatización',
    title:     'Los 5 errores que destruyen tu automatización de CRM (y cómo evitarlos)',
    excerpt:   'La automatización mal implementada es peor que no tener automatización. Estos son los 5 errores que veo una y otra vez, y la solución exacta para cada uno.',
    date:      'Dic 2025',
    readTime:  '7 min',
    tags:      ['CRM', 'Automatización', 'HubSpot', 'IA'],
    bgColor:   'linear-gradient(135deg, #020008 0%, #08001a 40%, #020010 100%)',
    bgSvg:     `<svg width="260" height="180" viewBox="0 0 260 180" fill="none"><rect x="20" y="60" width="50" height="50" rx="5" stroke="#BF5AF2" stroke-width="1.5"/><rect x="105" y="30" width="50" height="50" rx="5" stroke="#BF5AF2" stroke-width="1.5"/><rect x="190" y="60" width="50" height="50" rx="5" stroke="#BF5AF2" stroke-width="1.5"/><rect x="105" y="105" width="50" height="50" rx="5" stroke="#00FF82" stroke-width="2"/><line x1="70" y1="85" x2="105" y2="55" stroke="#BF5AF2" stroke-width="1.5"/><line x1="155" y1="55" x2="190" y2="85" stroke="#BF5AF2" stroke-width="1.5"/><line x1="130" y1="80" x2="130" y2="105" stroke="#00FF82" stroke-width="2"/><circle cx="130" cy="130" r="8" fill="#00FF82"/></svg>`,
    content: `
      <h3>La automatización que nadie quiere admitir que falla</h3>
      <p>Cada mes recibo consultas de empresas que invirtieron en automatizar su CRM hace 
      6-12 meses y los resultados son peores que cuando lo hacían a mano. ¿El problema? 
      No es la herramienta. Es la implementación.</p>
      <p>Después de implementar más de 30 sistemas de automatización, estos son los 5 errores 
      que aparecen una y otra vez.</p>

      <h3>Error #1: Automatizar procesos rotos</h3>
      <p>Si tu proceso de ventas manual es caótico, automatizarlo lo hará caótico más rápido. 
      La automatización amplifica, no corrige. Antes de automatizar, documenta y optimiza el 
      proceso manualmente hasta que funcione bien. Luego automatiza.</p>

      <h3>Error #2: Lead scoring sin calibración real</h3>
      <p>El lead scoring basado en suposiciones ("visitar la página de precios vale 20 puntos") 
      sin datos reales destruye el pipeline. He visto equipos comerciales llamando a leads con 
      puntuación 90 que nunca iban a comprar, mientras ignoraban leads de 30 que estaban 
      listos para cerrar.</p>
      <div class="highlight-box">
        ⚙️ <strong>Solución:</strong> Analiza los últimos 100 clientes que compraron. 
        ¿Qué acciones hicieron antes de comprar? Esas acciones son las que deben tener 
        mayor puntuación. Datos primero, intuición después.
      </div>

      <h3>Error #3: Secuencias de email demasiado largas</h3>
      <p>Una secuencia de nurturing de 15 emails en 30 días genera fatiga y bajas masivas. 
      El benchmark que uso: máximo 7 emails en los primeros 14 días, con frecuencia decreciente. 
      Cada email debe tener un único objetivo y un único CTA.</p>

      <h3>Error #4: No cerrar el bucle con el equipo comercial</h3>
      <p>La automatización prepara al lead, pero el humano cierra. El error es cuando la 
      automatización "entrega" un lead calificado al comercial sin contexto. 
      El comercial debe recibir: qué emails abrió, qué páginas visitó, en qué etapa está y 
      cuál es el siguiente paso recomendado. Si no, la automatización pierde su valor.</p>

      <h3>Error #5: Olvidar la fase post-compra</h3>
      <p>El 80% de las automatizaciones terminan en la venta. El 80% del valor está después. 
      La automatización de onboarding, upsell, reactivación y referidos es donde están los 
      márgenes reales. En nuestros clientes, las automatizaciones post-compra generan de 
      media un <span class="stat-inline">+38%</span> de revenue adicional sin coste de adquisición.</p>
    `,
  },
  {
    slug:      'estrategia-digital-2025-framework',
    featured:  false,
    cat:       'estrategia',
    catLabel:  'Estrategia',
    title:     'El framework de estrategia digital que uso con cada nuevo cliente en 2025',
    excerpt:   'Después de 47 proyectos, he destilado el proceso estratégico que aplico siempre antes de tocar una sola herramienta. Sin este mapa, cualquier táctica es un disparo a ciegas.',
    date:      'Nov 2025',
    readTime:  '10 min',
    tags:      ['Estrategia', 'Framework', 'Planificación'],
    bgColor:   'linear-gradient(135deg, #030508 0%, #030e18 40%, #020a12 100%)',
    bgSvg:     `<svg width="260" height="180" viewBox="0 0 260 180" fill="none"><rect x="10" y="10" width="100" height="70" rx="5" stroke="#00C8FF" stroke-width="1.5" stroke-dasharray="5 3"/><rect x="150" y="10" width="100" height="70" rx="5" stroke="#00C8FF" stroke-width="1.5"/><rect x="10" y="100" width="100" height="70" rx="5" stroke="#00C8FF" stroke-width="1.5"/><rect x="150" y="100" width="100" height="70" rx="5" stroke="#00C8FF" stroke-width="2"/><line x1="110" y1="45" x2="150" y2="45" stroke="#00C8FF" stroke-width="1.5"/><line x1="60" y1="80" x2="60" y2="100" stroke="#00C8FF" stroke-width="1.5"/><line x1="200" y1="80" x2="200" y2="100" stroke="#00C8FF" stroke-width="1.5"/><line x1="110" y1="135" x2="150" y2="135" stroke="#00C8FF" stroke-width="1.5"/></svg>`,
    content: `
      <h3>El error más caro del marketing digital</h3>
      <p>La mayoría de empresas empiezan eligiendo herramientas: "necesitamos Meta Ads", 
      "vamos a hacer SEO", "hay que automatizar el CRM". El resultado es una colección de 
      tácticas desconectadas que no suman hacia ningún objetivo claro.</p>
      <p>El framework que uso antes de recomendar cualquier táctica se estructura en 4 fases:</p>

      <h3>Fase 1: Diagnóstico de la situación actual</h3>
      <p>Antes de proponer nada, necesito entender exactamente dónde está el negocio:</p>
      <ul>
        <li>¿Cuál es el buyer persona real? (no el que creemos que es)</li>
        <li>¿Cuál es el CAC actual por canal? ¿Y el LTV real?</li>
        <li>¿Dónde se pierde el tráfico en el funnel? (¿en la adquisición, en la conversión o en la retención?)</li>
        <li>¿Qué está haciendo la competencia que funciona y nosotros no?</li>
      </ul>

      <div class="highlight-box">
        🔬 <strong>Herramienta clave:</strong> El análisis de los últimos 50-100 clientes 
        reales (no los ideales). ¿Cómo nos encontraron? ¿Qué les convenció? ¿Cuánto tardaron 
        en decidir? Esta información vale más que cualquier análisis de mercado externo.
      </div>

      <h3>Fase 2: Definición del objetivo y la métrica norte</h3>
      <p>Un negocio puede tener solo un "North Star Metric" en cada etapa de crecimiento. 
      Todo lo demás son métricas de apoyo. Algunos ejemplos por etapa:</p>
      <ul>
        <li><strong>Etapa 0 a €10k/mes:</strong> Número de conversaciones con prospectos cualificados</li>
        <li><strong>Etapa €10k a €50k/mes:</strong> CAC payback period</li>
        <li><strong>Etapa €50k+ /mes:</strong> Net Revenue Retention (NRR)</li>
      </ul>

      <h3>Fase 3: Selección de canales según la etapa</h3>
      <p>No todos los canales funcionan para todos los negocios en todas las etapas. 
      Mi matriz de selección simplificada:</p>
      <ul>
        <li><strong>Resultado inmediato (0-30 días):</strong> Google Ads Search, Meta Ads Retargeting</li>
        <li><strong>Resultado medio plazo (1-3 meses):</strong> Meta Ads Prospecting, Email Marketing</li>
        <li><strong>Resultado largo plazo (3-12 meses):</strong> SEO, Brand Awareness, CRM nurturing</li>
      </ul>
      <p>La recomendación: siempre tener al menos un canal en cada horizonte temporal. 
      Solo con canales de resultado inmediato el negocio es frágil. Solo con canales 
      de largo plazo, el negocio no sobrevive a corto.</p>

      <h3>Fase 4: Sistema de medición y optimización continua</h3>
      <p>Sin un dashboard que muestre en tiempo real el rendimiento de cada canal, 
      la estrategia es ciega. Los KPIs que miro cada semana en cada cliente:</p>
      <ul>
        <li>ROAS por canal y por campaña</li>
        <li>CVR en cada etapa del funnel</li>
        <li>CAC y tendencia semana a semana</li>
        <li>Revenue total y comparativa vs período anterior</li>
        <li>Alertas automáticas cuando cualquier métrica se desvía más de un 20%</li>
      </ul>
    `,
  },
  {
    slug:      'contenido-instagram-convierte-clientes',
    featured:  false,
    cat:       'estrategia',
    catLabel:  'Estrategia',
    title:     'Por qué tu contenido de Instagram no convierte clientes (y cómo arreglarlo en 30 días)',
    excerpt:   'Miles de seguidores y cero ventas. El problema no es el algoritmo ni la hora de publicación. Es que estás creando contenido para gustar, no para vender. Aquí el sistema que lo cambia.',
    date:      'Mar 2026',
    readTime:  '9 min',
    tags:      ['Instagram', 'Contenido', 'Conversión', 'Estrategia'],
    bgColor:   'linear-gradient(135deg, #0f0005 0%, #200010 40%, #100008 100%)',
    bgSvg:     `<svg width="260" height="180" viewBox="0 0 260 180" fill="none"><rect x="70" y="20" width="120" height="140" rx="16" stroke="#FF6B9D" stroke-width="2"/><circle cx="130" cy="90" r="30" stroke="#FF6B9D" stroke-width="1.5" stroke-dasharray="6 3"/><circle cx="130" cy="90" r="12" fill="rgba(255,107,157,0.15)" stroke="#FF6B9D" stroke-width="1.5"/><line x1="130" y1="35" x2="130" y2="58" stroke="#FF6B9D" stroke-width="2"/><line x1="130" y1="122" x2="130" y2="145" stroke="#FF6B9D" stroke-width="2"/></svg>`,
    content: `
      <h3>El error que comete el 90% de los negocios en Instagram</h3>
      <p>Si tienes más de 1.000 seguidores y menos de 5 consultas mensuales desde Instagram, 
      no tienes un problema de alcance. Tienes un problema de arquitectura de contenido.</p>
      <p>La mayoría de negocios publican contenido que gusta — quotes motivacionales, fotos de 
      producto bonitas, behind the scenes random — pero que no <strong>mueve</strong>. Gustar 
      y convertir son dos cosas completamente distintas.</p>

      <div class="highlight-box">
        💡 <strong>La pregunta que debes hacerte en cada publicación:</strong> ¿Este contenido 
        lleva al espectador un paso más cerca de contratarme / comprarme? Si la respuesta es no, 
        el contenido está ocupando espacio sin trabajar para ti.
      </div>

      <h3>Los 3 tipos de contenido que sí convierten</h3>
      <p><strong>1. Contenido que resuelve un problema específico y urgente.</strong><br/>
      No "tips de marketing". Sino "Cómo conseguir tu primera reserva online sin pagar publicidad 
      (funciona para peluquerías)". La especificidad es lo que para el scroll.</p>
      <p><strong>2. Contenido de prueba social que muestra transformación.</strong><br/>
      No "mira qué bonita quedó la web de mi cliente". Sino "Esta web generó 47 reservas en 
      el primer mes. Aquí qué cambié y por qué". El antes/después con datos destroza al 
      contenido de vanidad.</p>
      <p><strong>3. Contenido que adelanta el proceso de trabajo contigo.</strong><br/>
      Explica exactamente cómo trabajas, qué incluyes, cuánto cuesta y qué resultado esperar. 
      El cliente que llega después de este contenido ya viene convertido a medias.</p>

      <h3>El plan de 30 días para pasar de visibilidad a ventas</h3>
      <p><strong>Semana 1-2: Claridad de posicionamiento</strong></p>
      <ul>
        <li>Define tu cliente ideal en una frase: [Tipo de persona] que quiere [resultado] pero 
        tiene [obstáculo específico]</li>
        <li>Reescribe tu bio con esta fórmula: Ayudo a [cliente ideal] a [resultado específico] 
        en [tiempo o condición]. → [CTA con un solo paso]</li>
        <li>Publica 5 contenidos de alta especificidad sobre el problema central de tu cliente</li>
      </ul>
      <p><strong>Semana 3: Prueba social masiva</strong></p>
      <ul>
        <li>3 posts de caso de éxito: problema → proceso → resultado con datos reales</li>
        <li>2 testimoniales en video (30 segundos, no producidos, reales)</li>
      </ul>

      <div class="highlight-box">
        📊 <strong>Dato de cliente real:</strong> Salón Elegance (peluquería) pasó de 0 
        reservas online a 38 al mes en 90 días cambiando solo la arquitectura de contenido. 
        Sin aumentar el presupuesto en ads. Sin comprar seguidores.
      </div>

      <p><strong>Semana 4: Activación de la conversión</strong></p>
      <ul>
        <li>Añade un CTA específico en el 100% de tus publicaciones (no el genérico "link en bio")</li>
        <li>Responde TODOS los comentarios con preguntas que lleven a conversación privada</li>
        <li>Envía DMs a todos los que interactúen con tus posts de prueba social con una oferta específica</li>
      </ul>

      <h3>El error del CTA que más dinero te cuesta</h3>
      <p>"Link en bio" ha dejado de funcionar. La fricción de salir de la app, buscar el link y 
      rellenar un formulario es demasiado alta para la mayoría. El CTA que más convierte en 2025: 
      <em>"Escríbeme 'RESERVA' por DM y te cuento los próximos huecos disponibles."</em></p>
      <p>Es conversacional, es inmediato, y el algoritmo de Instagram premia el inicio de 
      conversaciones privadas con más alcance orgánico.</p>
    `,
  },
  {
    slug:      'ia-marketing-local-herramientas-reales',
    featured:  false,
    cat:       'ia',
    catLabel:  'IA & Automatización',
    title:     'IA para negocios locales: 7 herramientas reales que uso cada semana (con ejemplos)',
    excerpt:   'No necesitas saber de tecnología para usar IA en tu negocio local. Necesitas saber exactamente qué herramientas usar y para qué. Aquí mis 7 favoritas con casos reales de clientes.',
    date:      'Feb 2026',
    readTime:  '10 min',
    tags:      ['IA', 'Negocios locales', 'Automatización', 'ChatGPT'],
    bgColor:   'linear-gradient(135deg, #020010 0%, #060020 40%, #030018 100%)',
    bgSvg:     `<svg width="260" height="180" viewBox="0 0 260 180" fill="none"><rect x="90" y="60" width="80" height="60" rx="10" stroke="#8B5CF6" stroke-width="2"/><circle cx="115" cy="78" r="5" fill="#8B5CF6" opacity="0.8"/><circle cx="145" cy="78" r="5" fill="#8B5CF6" opacity="0.8"/><path d="M110 98 Q130 112 150 98" stroke="#8B5CF6" stroke-width="1.5" fill="none"/><line x1="130" y1="60" x2="130" y2="40" stroke="#8B5CF6" stroke-width="2"/><circle cx="130" cy="36" r="4" fill="#8B5CF6"/><line x1="90" y1="90" x2="60" y2="90" stroke="#8B5CF6" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="170" y1="90" x2="200" y2="90" stroke="#8B5CF6" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="56" cy="90" r="5" stroke="#8B5CF6" stroke-width="1.5" fill="rgba(139,92,246,0.1)"/><circle cx="204" cy="90" r="5" stroke="#8B5CF6" stroke-width="1.5" fill="rgba(139,92,246,0.1)"/></svg>`,
    content: `
      <h3>La IA no es el futuro del marketing local. Es el presente.</h3>
      <p>El 72% de los propietarios de pequeños negocios que conozco creen que la IA "es para 
      grandes empresas" o "requiere saber programar". Los estoy viendo perder clientes frente a 
      competidores que usan 3 herramientas gratuitas y ahorran 10 horas semanales.</p>
      <p>Aquí están las 7 herramientas que uso con clientes cada semana. Ninguna requiere 
      conocimientos técnicos. Todas tienen versión gratuita.</p>

      <h3>1. ChatGPT / Claude — El asistente de contenido</h3>
      <p>No como generador automático de posts. Como asistente de ideación y primera versión. 
      El prompt que más uso con clientes:</p>
      <div class="highlight-box">
        🤖 <strong>Prompt:</strong> "Actúa como experto en marketing para [sector]. Mi cliente 
        ideal es [descripción]. Necesito 10 ideas de Reels que resuelvan el problema de 
        [problema específico] con un tono [formal/cercano/experto]. Para cada idea, dame el 
        hook de apertura (3-5 segundos) y los 3 puntos clave a cubrir."
      </div>
      <p>Con este prompt, en 2 minutos tienes la estructura de 10 Reels. El 70% se usan 
      directamente, el 30% se adaptan. Tiempo ahorrado: ~4 horas semanales.</p>

      <h3>2. n8n — El automatizador sin código</h3>
      <p>El flujo más popular que implemento: cuando alguien completa el formulario de contacto 
      → mensaje automático de WhatsApp en menos de 5 minutos → notificación al propietario → 
      seguimiento automático a las 24h si no hay respuesta. 
      Resultado típico: tasa de respuesta del lead del 23% al 67%.</p>

      <h3>3. ElevenLabs — Voiceover para vídeos sin locutar</h3>
      <p>Para clientes que crean vídeos educativos o de producto pero no quieren hablar a cámara. 
      Calidad de voz hiperrealista, 11 idiomas, voz clonada a partir de 30 segundos de audio tuyo. 
      Precio: desde €5/mes. Uso principal: reels con texto en pantalla + voz de fondo.</p>

      <h3>4. Perplexity — Investigación de mercado en minutos</h3>
      <p>Para análisis de competencia, búsqueda de tendencias locales y preparación de contenido 
      basado en lo que busca realmente tu audiencia. Más útil que Google para preguntas de negocio 
      porque cita las fuentes y da contexto.</p>

      <h3>5. Canva AI — Diseño sin diseñador</h3>
      <p>La función de texto-a-imagen de Canva permite generar imágenes para posts sin comprar 
      fotografías de stock. Más importante: el "Magic Write" genera textos para presentaciones, 
      propuestas y posts en segundos. No es la mejor IA de texto, pero está integrado en el 
      flujo de diseño.</p>

      <div class="highlight-box">
        📊 <strong>Caso real:</strong> Restaurante El Origen usó Canva AI para generar 
        todas las imágenes de su menú digital en 3 horas. Coste de fotógrafo evitado: €800. 
        Tiempo: de 2 semanas de planificación a 1 tarde.
      </div>

      <h3>6. Make (ex-Integromat) — Automatización avanzada</h3>
      <p>Para clientes con flujos más complejos: sincronizar Google Sheets con el CRM, 
      enviar reportes automáticos semanales por email, programar publicaciones en redes desde 
      una hoja de cálculo. Alternativa a n8n con interfaz más visual.</p>

      <h3>7. Google NotebookLM — Análisis de documentos propios</h3>
      <p>Sube tus presupuestos anteriores, testimoniales de clientes, análisis de competencia, 
      y conversa con ellos. Pregunta: "¿Qué objeciones repiten más mis clientes en los presupuestos 
      rechazados?" o "¿Qué servicios cierro con mayor éxito y por qué?". Conocimiento 
      accionable de tus propios datos en minutos.</p>

      <h3>Por dónde empezar</h3>
      <p>Si tuviese que recomendar solo una herramienta para empezar mañana: <strong>ChatGPT + 
      el prompt de Reels</strong> de arriba. En 30 minutos tienes el contenido de 4 semanas 
      planificado. El ROI de tiempo es inmediato y visible.</p>
    `,
  },
  {
    slug:      'precio-sin-descuentos-psicologia-venta',
    featured:  false,
    cat:       'estrategia',
    catLabel:  'Estrategia',
    title:     'Cómo vender a precio completo sin descuentos: la psicología detrás de los "sí" que pagan bien',
    excerpt:   'Si tus clientes siempre piden descuento, el problema no es el precio. Es el posicionamiento. Aquí el framework exacto para que la conversación de precio nunca sea un problema.',
    date:      'Ene 2026',
    readTime:  '8 min',
    tags:      ['Ventas', 'Pricing', 'Psicología', 'Estrategia'],
    bgColor:   'linear-gradient(135deg, #040008 0%, #0c0018 40%, #050010 100%)',
    bgSvg:     `<svg width="260" height="180" viewBox="0 0 260 180" fill="none"><circle cx="130" cy="90" r="55" stroke="#00FF82" stroke-width="2"/><path d="M130 60 L145 80 L170 83 L151 101 L156 126 L130 113 L104 126 L109 101 L90 83 L115 80 Z" fill="rgba(0,255,130,0.08)" stroke="#00FF82" stroke-width="1.5"/><circle cx="130" cy="90" r="8" fill="#00FF82" opacity="0.6"/></svg>`,
    content: `
      <h3>El problema no es tu precio. Es cómo llegas a la conversación de precio.</h3>
      <p>He tenido clientes que cobran 3 veces más que su competencia directa y no tienen 
      problema de cierre. Y clientes que son los más baratos del sector y constantemente 
      pierden propuestas. La diferencia está en el posicionamiento que construyen antes 
      de que el precio aparezca en la conversación.</p>
      <p>Si tu cliente llega a la llamada de venta sin haber construido ninguna expectativa 
      de valor, el precio siempre será "caro". Si llega habiendo consumido 4 semanas de 
      contenido que demuestra tu expertise y resultados, el precio es un detalle.</p>

      <h3>El principio del precio justificado</h3>
      <p>El cerebro humano no evalúa el precio en términos absolutos. Lo evalúa en relación 
      con el valor percibido. La fórmula mental del comprador es:</p>

      <div class="highlight-box">
        🧠 <strong>Ecuación de decisión:</strong> Si (Valor percibido) > (Precio + Riesgo percibido) → compra.<br/>
        Si no, objeta. La tarea no es bajar el precio. Es subir el valor percibido y bajar el riesgo percibido.
      </div>

      <h3>Las 4 palancas para subir el valor percibido</h3>
      <p><strong>1. Especificidad del resultado.</strong><br/>
      "Te ayudo a conseguir más clientes" vale €200. "Te ayudo a conseguir 15-20 reservas 
      mensuales nuevas con un presupuesto de €300 en ads en 90 días" vale €1.500. 
      La misma promesa, 7 veces más cara, y el cliente más predispuesto a pagar.</p>
      <p><strong>2. Prueba social relevante.</strong><br/>
      Un testimonio de alguien exactamente igual a tu cliente objetivo (mismo sector, mismo 
      tamaño, mismo problema) vale más que 100 testimonios genéricos. Si tienes un caso de 
      éxito de "Peluquería X, Madrid, +38 reservas en 60 días", todas las peluquerías de 
      Madrid que lo ven ya quieren comprarte.</p>
      <p><strong>3. El costo de la inacción.</strong><br/>
      Nunca hables solo de lo que gana si contrata. Habla también de lo que pierde si no 
      contrata. "Un cliente que entra por la puerta de tu competencia en vez de la tuya 
      vale entre €200 y €2.000 en LTV. ¿Cuántos clientes estás perdiendo cada mes por 
      no tener presencia digital?"</p>
      <p><strong>4. Autoridad técnica demostrada.</strong><br/>
      No declarada. Demostrada. No es "soy experto en SEO". Es "en el último proyecto que 
      hice, pasamos de 0 a 847 clics mensuales en 6 meses, así fue el proceso exacto…". 
      La diferencia es abismal.</p>

      <h3>Cómo responder a "¿puedes hacer un descuento?"</h3>
      <p>La respuesta que nunca da descuentos: <em>"El precio refleja el resultado que te 
      comprometí — [X leads/ventas/posicionamiento]. Si reducimos el precio, tenemos que 
      reducir el alcance. ¿Qué parte del proyecto te gustaría que quitemos para ajustar 
      el presupuesto?"</em></p>
      <p>El 80% de los clientes que preguntan por descuento no quieren descuento en realidad. 
      Quieren sentir que lo intentaron. Con esta respuesta, el 70% acepta el precio completo 
      en ese momento porque no quieren perder ninguna parte.</p>

      <div class="highlight-box">
        📊 <strong>Resultado aplicado:</strong> En los proyectos donde implementamos este 
        enfoque de venta con clientes, el ticket medio sube un 40-60% sin cambiar los 
        servicios. Solo cambia la conversación previa a la venta.
      </div>

      <h3>La estrategia de precio psicológico</h3>
      <p>Ofrece siempre tres opciones. El cerebro tiende al precio del medio cuando hay tres 
      opciones (efecto de anclaje central). Si tu precio objetivo es €850/mes, presenta: 
      €450/mes (básico), €850/mes (tu objetivo, el más completo del básico), 
      €1.450/mes (premium). El 60% elige el del medio.</p>
    `,
  },
  {
    slug:      'seo-local-dominar-google-maps-2025',
    featured:  false,
    cat:       'seo',
    catLabel:  'SEO',
    title:     'Cómo dominar Google Maps en 2025: la guía completa para negocios locales',
    excerpt:   'El SEO local en Google Maps es el canal de adquisición más subestimado por los negocios físicos. Un perfil optimizado puede generar 40-80 clientes nuevos al mes sin gastar en ads.',
    date:      'Dic 2025',
    readTime:  '12 min',
    tags:      ['SEO Local', 'Google Maps', 'Google Business', 'Negocios locales'],
    bgColor:   'linear-gradient(135deg, #000e08 0%, #001c10 40%, #000e06 100%)',
    bgSvg:     `<svg width="260" height="180" viewBox="0 0 260 180" fill="none"><path d="M130 30 C100 30 76 54 76 84 C76 120 130 160 130 160 C130 160 184 120 184 84 C184 54 160 30 130 30Z" stroke="#00C864" stroke-width="2" fill="rgba(0,200,100,0.06)"/><circle cx="130" cy="84" r="16" fill="rgba(0,200,100,0.15)" stroke="#00C864" stroke-width="1.5"/><circle cx="130" cy="84" r="6" fill="#00C864"/></svg>`,
    content: `
      <h3>Por qué Google Maps es tu mejor comercial gratuito</h3>
      <p>Cuando alguien busca "peluquería cerca de mí" o "restaurante italiano Madrid centro", 
      Google no muestra una lista de webs. Muestra el Local Pack: los 3 negocios en un mapa. 
      Esos 3 negocios se llevan el <strong>46% de todos los clics</strong> de esa búsqueda.</p>
      <p>Si no estás en esos 3, prácticamente no existes para esa búsqueda, aunque tengas 
      la mejor web del sector.</p>

      <h3>Los factores de ranking de Google Maps en 2025</h3>
      <p>Google ordena el Local Pack según 3 factores principales:</p>
      <ul>
        <li><strong>Relevancia:</strong> ¿Tu perfil responde exactamente a lo que busca el usuario?</li>
        <li><strong>Proximidad:</strong> ¿Estás cerca de donde está el usuario en ese momento?</li>
        <li><strong>Prominencia:</strong> ¿Cuántas señales de autoridad tiene tu perfil? (reseñas, menciones, backlinks locales)</li>
      </ul>
      <p>De los tres, el único que puedes controlar activamente es la prominencia y la relevancia. 
      La proximidad es geográfica y no cambia.</p>

      <h3>Optimización del perfil paso a paso</h3>
      <p><strong>1. Nombre del negocio.</strong><br/>
      Solo el nombre real. Google penaliza el keyword stuffing en el nombre (ej: "Peluquería 
      Elegance Madrid Centro Balayage"). Si tienes competidores que lo hacen, están en riesgo 
      de penalización, no en ventaja.</p>
      <p><strong>2. Categoría principal — la decisión más importante.</strong><br/>
      Esta es la keyword principal de tu perfil. Si eres peluquería, la diferencia entre 
      "Peluquería" y "Salón de belleza" puede significar 300 búsquedas/mes de diferencia. 
      Investiga con Google Keyword Planner qué categoría tiene más volumen en tu zona.</p>
      <p><strong>3. Descripción con keywords naturales.</strong><br/>
      750 caracteres. Incluye tu ciudad, zona, servicios principales y diferencial. 
      No es para el cliente — es para el algoritmo. Pero que también sea legible para personas.</p>

      <div class="highlight-box">
        🔍 <strong>Truco técnico:</strong> En la sección de "Productos" y "Servicios" del 
        perfil puedes añadir hasta 100 ítems con descripción. Cada uno es una mini-landing 
        que Google indexa. La mayoría de competidores no los usan — ventaja directa para ti.
      </div>

      <h3>El sistema de reseñas que aumenta el ranking en 60 días</h3>
      <p>Las reseñas no son solo para la reputación. Son señales de actividad reciente para 
      el algoritmo. Google favorece perfiles con reseñas nuevas constantes vs perfiles con 
      muchas reseñas antiguas.</p>
      <p><strong>El sistema en 3 pasos:</strong></p>
      <ul>
        <li><strong>Automatiza la solicitud:</strong> Después de cada servicio, mensaje automático 
        de WhatsApp con enlace directo al formulario de reseña (n8n + enlace corto de Google). 
        Tasa de conversión: 25-35%.</li>
        <li><strong>Responde TODAS las reseñas en menos de 24h,</strong> incluyendo las negativas. 
        Google lo cuenta como actividad. Y las respuestas a negativas les importan más a los 
        nuevos clientes que las propias reseñas negativas.</li>
        <li><strong>Target: mínimo 4 reseñas nuevas por mes.</strong> Con ese ritmo, en 12 meses 
        tienes un perfil con 50+ reseñas recientes que Google trata como negocio activo y popular.</li>
      </ul>

      <h3>Las publicaciones de Google Business que nadie hace</h3>
      <p>Google Business tiene una sección de "Publicaciones" que funciona como un mini-feed 
      de noticias en tu perfil. El 95% de negocios no la usa. Publicar 1-2 veces por semana 
      aquí es una señal de actividad directa para el algoritmo y aparece en los resultados 
      de búsqueda de tu perfil.</p>
      <p>El formato que mejor funciona: <em>Post de oferta con fecha límite real</em>. 
      "Reservas de abril: quedan 3 huecos esta semana para balayage. Precio especial de 
      temporada hasta el 30 de marzo." Urgencia + CTA + actualidad = señal de negocio activo.</p>

      <div class="highlight-box">
        📊 <strong>Resultado real:</strong> Restaurante El Origen pasó de la posición 8 
        a la posición 2 en el Local Pack de "restaurante madrid chueca" en 90 días con 
        solo 3 acciones: categoría optimizada, publicaciones semanales y sistema de reseñas. 
        Sin cambiar la web ni invertir en ads.
      </div>

      <h3>El truco de las fotos que multiplica impresiones por 3</h3>
      <p>Google favorece en ranking a perfiles con fotos recientes de alta calidad. 
      Protocolo que aplico con todos los clientes locales:</p>
      <ul>
        <li>Mínimo 20 fotos subidas por el propietario (no por clientes)</li>
        <li>1 foto nueva cada semana (fecha reciente = señal de actividad)</li>
        <li>Fotos geoetiquetadas con la ubicación exacta del negocio (metadatos EXIF)</li>
        <li>Nombres de archivo descriptivos: "peluqueria-elegance-balayage-madrid.jpg" 
        en vez de "IMG_1234.jpg"</li>
      </ul>
      <p>Con este protocolo, el número de impressiones en Maps aumenta entre 2× y 4× 
      en las primeras 8 semanas.</p>
    `,
  },
  {
    slug:      'google-ads-search-inteligencia-artificial',
    featured:  false,
    cat:       'ads',
    catLabel:  'Meta & Google Ads',
    title:     'Google Ads en la era de la IA: lo que cambió, lo que murió y lo que funciona',
    excerpt:   'Performance Max, Smart Bidding y Responsive Search Ads han cambiado radicalmente la forma de hacer Google Ads. Aquí qué he aprendido gestionando €400k+ en inversión.',
    date:      'Oct 2025',
    readTime:  '8 min',
    tags:      ['Google Ads', 'Performance Max', 'IA'],
    bgColor:   'linear-gradient(135deg, #050010 0%, #0a0020 40%, #050015 100%)',
    bgSvg:     `<svg width="260" height="180" viewBox="0 0 260 180" fill="none"><polyline points="10,160 50,120 90,130 130,80 170,92 210,45 250,25" stroke="#00C8FF" stroke-width="3" fill="none"/><circle cx="250" cy="25" r="6" fill="#00C8FF"/><circle cx="210" cy="45" r="4" fill="#00C8FF" opacity="0.7"/><line x1="10" y1="170" x2="250" y2="170" stroke="rgba(0,200,255,0.15)" stroke-width="1"/></svg>`,
    content: `
      <h3>Google Ads ya no se gestiona, se entrena</h3>
      <p>Si todavía gestionas Google Ads como en 2019 (estructura de campañas rígida, 
      pujas manuales, keywords exactas), estás perdiendo dinero. El paradigma cambió 
      completamente. Google ya no quiere que controles todo; quiere que le des señales 
      de calidad y deje que el algoritmo optimice.</p>
      <p>Después de gestionar más de €400k en inversión en Google Ads en los últimos 
      2 años, aquí está lo que he aprendido.</p>

      <h3>Lo que murió (o casi)</h3>
      <ul>
        <li><strong>Keywords exact match exclusivas:</strong> El 20% de las búsquedas diarias 
        en Google son nuevas. Las exact match estrictas pierden esa oportunidad.</li>
        <li><strong>Estructura de campañas tipo SKAG</strong> (Single Keyword Ad Groups): 
        fragmenta el aprendizaje del algoritmo. Hoy perjudica más que ayuda.</li>
        <li><strong>Pujas manuales en la mayoría de casos:</strong> El Smart Bidding 
        con suficientes datos supera consistentemente las pujas manuales en conversiones.</li>
      </ul>

      <h3>Lo que funciona en 2025</h3>
      <p><strong>Performance Max como campaña principal:</strong> Con señales de audiencia 
      correctas y assets creativos de calidad, PMax supera a las campañas Search 
      convencionales en el 65% de nuestros tests. Pero necesita datos: mínimo 3 meses 
      de historial de conversiones antes de lanzar.</p>
      <p><strong>Smart Bidding con tROAS o tCPA:</strong> Define el objetivo que tiene 
      sentido para tu negocio y deja que el algoritmo optimice. El error es cambiar el 
      objetivo cada semana; necesita estabilidad para aprender.</p>
      <p><strong>Campañas Search con broad match + Smart Bidding:</strong> La combinación 
      que más me ha sorprendido. Broad match con tROAS bien calibrado encuentra 
      búsquedas relevantes que las exact match nunca habrían capturado.</p>

      <div class="highlight-box">
        💡 <strong>Regla de oro:</strong> En Google Ads 2025, tu trabajo es dar al algoritmo 
        buenas señales (conversiones de calidad, assets creativos, audiencias seed), 
        no controlar cada decisión. Cuanto más control intentas tener, peor funciona.
      </div>

      <h3>El futuro inmediato: Google AI Max</h3>
      <p>Las campañas con AI Max (el nuevo layer de IA que Google está rodando progresivamente) 
      están mostrando resultados prometedores en nuestros primeros tests: 
      <span class="stat-inline">+22% conversiones</span> con 
      <span class="stat-inline">-15% CPA</span> en las cuentas donde lo hemos activado. 
      El trade-off: cedes aún más control al algoritmo.</p>
      <p>Mi posición: en Google Ads 2025, el control de detalle que importa está en 
      los assets creativos, la calidad de las señales de conversión y la estrategia 
      de negative keywords. El resto, mejor dejarlo al algoritmo.</p>
    `,
  },
];

/* ──────────────────────────────────────────────────────────────
   RENDER ARTICLES
   ────────────────────────────────────────────────────────────── */
function buildArticleCard(art, idx) {
  const featClass = art.featured ? ' featured' : '';
  const tagsHtml = art.tags.map(t => `<span class="blog-article-tag">${t}</span>`).join('');
  return `
    <article class="blog-article${featClass}" data-slug="${art.slug}" data-cat="${art.cat}"
             role="button" tabindex="0" aria-label="Leer: ${art.title}">
      <div class="blog-article-visual">
        <div class="blog-article-visual-bg" style="background:${art.bgColor};">
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0.45;">${art.bgSvg}</div>
        </div>
        <div class="blog-article-visual-overlay"></div>
        <div class="blog-article-category-badge">${art.catLabel}</div>
      </div>
      <div class="blog-article-body">
        <div class="blog-article-meta">
          <span class="blog-article-date">📅 ${art.date}</span>
          <span class="blog-article-meta-dot"></span>
          <span class="blog-article-read">⏱ ${art.readTime} lectura</span>
        </div>
        <h2 class="blog-article-title">${art.title}</h2>
        <p class="blog-article-excerpt">${art.excerpt}</p>
        <div class="blog-article-footer">
          <div class="blog-article-tags">${tagsHtml}</div>
          <div class="blog-read-more">
            Leer
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderArticles(list) {
  const grid = document.getElementById('blogGrid');
  const noRes = document.getElementById('blogNoResults');
  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';
  grid.innerHTML = list.map((a, i) => buildArticleCard(a, i)).join('');

  /* Bind click on each card */
  grid.querySelectorAll('.blog-article').forEach(el => {
    el.addEventListener('click',   () => openArticle(el.dataset.slug));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openArticle(el.dataset.slug); } });
  });
}

/* ──────────────────────────────────────────────────────────────
   SIDEBAR
   ────────────────────────────────────────────────────────────── */
function renderSidebar() {
  /* Topics count */
  const counts = {};
  ARTICLES.forEach(a => { counts[a.catLabel] = (counts[a.catLabel] || 0) + 1; });
  const topicsEl = document.getElementById('sidebarTopics');
  if (topicsEl) {
    topicsEl.innerHTML = Object.entries(counts)
      .sort((a,b) => b[1] - a[1])
      .map(([name, count]) => `
        <div class="sidebar-topic" data-topic-cat="${ARTICLES.find(a=>a.catLabel===name)?.cat}">
          <span class="sidebar-topic-name">${name}</span>
          <span class="sidebar-topic-count">${count} art.</span>
        </div>`
      ).join('');
    topicsEl.querySelectorAll('.sidebar-topic').forEach(el => {
      el.addEventListener('click', () => {
        const cat = el.dataset.topicCat;
        setFilter(cat);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* Latest 4 */
  const latestEl = document.getElementById('sidebarLatest');
  if (latestEl) {
    latestEl.innerHTML = ARTICLES.slice(0,4).map((a, i) => `
      <div class="sidebar-latest-item" data-slug="${a.slug}">
        <div class="sidebar-latest-num">0${i+1}</div>
        <div class="sidebar-latest-title">${a.title}</div>
      </div>`
    ).join('');
    latestEl.querySelectorAll('.sidebar-latest-item').forEach(el => {
      el.addEventListener('click', () => openArticle(el.dataset.slug));
    });
  }
}

/* ──────────────────────────────────────────────────────────────
   FILTER & SEARCH
   ────────────────────────────────────────────────────────────── */
let currentCat    = 'all';
let currentSearch = '';

function filterArticles() {
  return ARTICLES.filter(a => {
    const catOk    = currentCat === 'all' || a.cat === currentCat;
    const query    = currentSearch.toLowerCase();
    const searchOk = !query ||
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.tags.some(t => t.toLowerCase().includes(query)) ||
      a.catLabel.toLowerCase().includes(query);
    return catOk && searchOk;
  });
}

function setFilter(cat) {
  currentCat = cat;
  document.querySelectorAll('.blog-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  renderArticles(filterArticles());
}

function initFilters() {
  document.querySelectorAll('.blog-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.cat));
  });
}

function initSearch() {
  const input = document.getElementById('blogSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    currentSearch = input.value;
    renderArticles(filterArticles());
  });
}

/* ──────────────────────────────────────────────────────────────
   ARTICLE MODAL
   ────────────────────────────────────────────────────────────── */
function buildModalContent(art) {
  return `
    <div class="blog-modal-header">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent);">
          ${art.catLabel}
        </span>
      </div>
      <button class="blog-modal-close" id="blogModalClose" aria-label="Cerrar">✕</button>
    </div>
    <div class="blog-modal-body">
      <div class="blog-modal-visual">
        <div class="blog-modal-visual-bg" style="background:${art.bgColor};">
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0.4;">${art.bgSvg}</div>
        </div>
        <div class="blog-modal-visual-overlay"></div>
      </div>
      <div class="blog-modal-content">
        <div class="blog-modal-category">${art.catLabel}</div>
        <h1 class="blog-modal-title">${art.title}</h1>
        <div class="blog-modal-meta">
          <div class="blog-modal-meta-item">📅 ${art.date}</div>
          <div class="blog-modal-meta-item">⏱ ${art.readTime} de lectura</div>
          <div class="blog-modal-meta-item">✍️ Raxis · RaxisLab</div>
        </div>
        <div class="blog-modal-prose">${art.content}</div>
      </div>
      <div class="blog-modal-cta">
        <div>
          <div class="blog-modal-cta-text">¿Quieres aplicar esto en tu negocio?</div>
          <div class="blog-modal-cta-sub">Cuéntame tu situación y te preparo un plan de acción.</div>
        </div>
        <a href="contact.html" class="btn btn-primary" style="font-size:12px;">Hablemos →</a>
      </div>
    </div>
  `;
}

function openArticle(slug) {
  const art = ARTICLES.find(a => a.slug === slug);
  if (!art) return;
  const overlay = document.getElementById('blogOverlay');
  const modal   = document.getElementById('blogModal');
  const content = document.getElementById('blogModalContent');
  if (!overlay || !modal || !content) return;

  content.innerHTML = buildModalContent(art);
  modal.scrollTop   = 0;

  overlay.classList.add('open');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  document.getElementById('blogModalClose')?.addEventListener('click', closeModal);
}

function closeModal() {
  document.getElementById('blogOverlay')?.classList.remove('open');
  document.getElementById('blogModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ──────────────────────────────────────────────────────────────
   NEWSLETTER
   ────────────────────────────────────────────────────────────── */
function initNewsletter() {
  document.getElementById('newsletterBtn')?.addEventListener('click', () => {
    const email = document.getElementById('newsletterEmail')?.value || '';
    if (!email.includes('@')) return;
    document.querySelector('.sidebar-newsletter-form').style.display = 'none';
    document.getElementById('newsletterOk').style.display = 'block';
  });
}

/* ──────────────────────────────────────────────────────────────
   REVEAL
   ────────────────────────────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
}

/* ──────────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderArticles(ARTICLES);
  renderSidebar();
  initFilters();
  initSearch();
  initNewsletter();
  initReveal();

  /* Overlay click → close */
  document.getElementById('blogOverlay')?.addEventListener('click', closeModal);
  /* ESC → close */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
