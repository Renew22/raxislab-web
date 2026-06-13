/* ============================================================
   RAXISLAB — js/ai.js — IA Studio Interactive Demos
   All outputs are pre-built smart templates. No API needed.
   ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════
     TAB SWITCHING
  ══════════════════════════════════ */
  document.querySelectorAll('.ai-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tool = tab.dataset.tool;

      document.querySelectorAll('.ai-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.ai-panel').forEach(p => p.classList.remove('active'));
      document.getElementById(`panel-${tool}`)?.classList.add('active');
    });
  });

  /* ══════════════════════════════════
     CHIP TOGGLE (single select)
  ══════════════════════════════════ */
  document.querySelectorAll('.ai-chips').forEach(group => {
    group.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.ai-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });

  /* ══════════════════════════════════
     IMAGE OPTION TOGGLE
  ══════════════════════════════════ */
  document.querySelectorAll('.ai-image-grid').forEach(grid => {
    grid.querySelectorAll('.ai-img-option').forEach(btn => {
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.ai-img-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  /* ══════════════════════════════════
     HELPERS
  ══════════════════════════════════ */
  function showLoading(outId) {
    const el = document.getElementById(outId);
    if (!el) return;
    el.innerHTML = `
      <div class="ai-loading">
        <div class="ai-loading-dots">
          <span></span><span></span><span></span>
        </div>
        <span>Generando respuesta…</span>
      </div>`;
  }

  function showOutput(outId, html) {
    const el = document.getElementById(outId);
    if (!el) return;
    el.innerHTML = `<div class="ai-output-content">${html}</div>`;
  }

  function getChipValue(groupSelector) {
    const active = document.querySelector(`${groupSelector} .ai-chip.active`);
    return active ? (active.dataset.goal || active.dataset.fmt || active.dataset.strat || active.textContent.trim()) : '';
  }

  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  /* ══════════════════════════════════
     1. EXTRACTOR DE IDEAS
  ══════════════════════════════════ */
  const IDEAS_DB = {
    peluqueria: {
      clientes: [
        'Muestra el antes/después de una transformación de color real — sin filtros',
        'Graba "30 segundos de silencio en nuestra butaca" — para el que necesita desconectar',
        '"¿Qué tipo de cliente eres?" — Reel de humor con 5 arquetipos',
        'Tutorial rápido: cómo mantener tu color entre visitas en casa',
        'Testimonio real: "Llevo 5 años viniendo y esto es lo que me cambió"',
        '"El error que cometiste con tu pelo que todos cometen" — gancho de valor',
        'Behind the scenes: preparando el día antes de abrir el salón',
        'Responde las 3 preguntas más frecuentes en stories — formato Q&A',
        '"Cita cancelada = hueco libre HOY" — urgencia real',
        'El proceso completo de una técnica premium: de principio a fin',
      ],
      ventas: [
        '"¿Por qué cobro X€ por un corte?" — transparencia que vende',
        'Compara tu servicio vs. hacerlo en casa — visual y directo',
        'Pack regalo para fecha especial — crea el deseo antes de pedirlo',
        '"Los 3 tratamientos que más piden mis clientas en invierno"',
        'Story de slots disponibles esta semana — crea escasez real',
        '"Reserva ahora y llévate un tratamiento de regalo" — oferta limitada',
        'El valor oculto de una consulta de color profesional',
        '"Esto es lo que incluye tu cita" — desglose de valor percibido',
        'Presenta tu servicio estrella como si fuera una experiencia de lujo',
        '"Lo que diferencia un salón bueno de uno excepcional" — posicionamiento',
      ],
    },
    restaurante: {
      clientes: [
        '"El plato que más piden y nunca sale del menú" — origen de la receta',
        'Graba la cocina en acción durante el servicio — autenticidad máxima',
        'El chef habla: "¿De dónde vienen los ingredientes que usamos?"',
        '"Reserva mesa para este viernes antes de las 12h" — urgencia semanal',
        'Testimonio de cliente habitual: "Lo que me hace volver cada semana"',
        '"¿Sabes por qué nuestra paella tarda 25 minutos más?" — valor explicado',
        'El proceso de preparación de un plato especial desde el mercado',
        'Story interactiva: "¿Qué pides siempre que vienes?" — encuesta',
        '"El maridaje que nadie te cuenta para este plato" — educación + venta',
        '"Hoy cocinamos con producto local de temporada" — contenido de valor',
      ],
      ventas: [
        'Menú de temporada lanzamiento — presenta cada plato como estrella',
        '"Reserva para San Valentín antes de que se llene" — anticipación',
        '"El pack familiar perfecto para domingo" — upsell visual',
        'Email/story: "Esta semana carta nueva, ven a probarla antes que nadie"',
        '"¿Celebras algo especial? Cuéntanos y lo hacemos memorable"',
      ],
    },
    constructora: {
      clientes: [
        '"Semana 1 vs. semana 8" — seguimiento de una obra completa en 30 segundos',
        'El momento en que el cliente ve la obra terminada — reacción real',
        '"¿Qué materiales elegimos y por qué?" — educación + confianza',
        '"El error de construcción más común que vemos en reformas de casas"',
        '"Un día en una obra nuestra" — behind the scenes sin maquillaje',
        'Testimonio de cliente: "Lo que pensaba que tardaría vs lo que tardó"',
        '"Antes de reformar tu baño, lee esto" — valor gratuito + captación',
        'Series de "¿Cuánto cuesta hacer X?" — transparencia que atrae leads',
        '"El proyecto más complicado que hemos terminado este año"',
        '"Cómo elegir contratista sin que te estafen" — autoridad total',
      ],
      ventas: [
        '"Solicita tu presupuesto sin compromiso esta semana" — CTA directo',
        '"Proyectos disponibles para Q1 2025 — quedan X huecos"',
        '"Descubre qué incluye nuestro servicio llave en mano"',
        'Email: "Este es el proyecto que entregamos la semana pasada"',
        '"¿Cuánto vale tu reforma? Calcula en 2 minutos" — lead magnet',
      ],
    },
    ecommerce: {
      clientes: [
        '"Unboxing del pedido que más nos pidieron este mes"',
        '"¿Cómo usarlo? Tutorial de 30 segundos para nuestro producto estrella"',
        '"El detrás de escenas de cómo preparamos cada pedido"',
        'Review real de cliente sin filtros — pedirla y publicarla',
        '"Top 5 cosas que NO sabías sobre este producto"',
        '"Lo que incluye tu paquete cuando llega a casa" — valor percibido',
        '"¿Por qué tardamos X días en enviarlo?" — transparencia que fideliza',
        '"El producto que agotamos en 24h — vuelve esta semana"',
        '"Compara: el barato vs el nuestro" — demostración real',
        '"Diseñamos esto porque tú nos lo pediste" — comunidad',
      ],
      ventas: [
        '"Flash sale 48h — solo por newsletter"',
        '"Lanzamiento de nueva colección: lista de espera abierta"',
        '"Pack regalo perfecto — edición limitada disponible ahora"',
        '"Envío gratis hoy si compras antes de las 23:59"',
        '"El kit que más repiten nuestros clientes — y por qué"',
      ],
    },
    clinica: {
      clientes: [
        '"¿Cuándo es el momento de venir a vernos?" — educación preventiva',
        '"El antes/después de un tratamiento: lo que nadie te explica"',
        '"3 mitos sobre [tu especialidad] que siguen circulando"',
        '"Así es nuestra primera consulta — paso a paso sin sorpresas"',
        '"El testimonio de María, 6 meses de tratamiento"',
        '"¿Qué diferencia un buen especialista de uno mediocre?" — autoridad',
        '"Preguntas que debes hacer antes de cualquier tratamiento"',
        '"Lo que NO debes hacer después de tu sesión" — contenido útil',
        '"Un día en la clínica — entre bambalinas"',
        '"La pregunta más frecuente que nos hacen y la respuesta honesta"',
      ],
      ventas: [],
    },
    tatuador: {
      clientes: [
        '"El proceso completo de un proyecto custom: de la idea al resultado"',
        '"¿Cómo elegir el lugar del cuerpo para tu primer tatuaje?"',
        '"El diseño que más me costó y por qué"',
        '"Lo que pasa en una sesión de más de 6 horas" — realidad sin filtros',
        '"¿Por qué rechazo algunos diseños?" — autoridad artística',
        '"La diferencia entre un tatuador barato y un artista"',
        '"Preguntas de novatos que todo el mundo quiere hacer"',
        '"Mis referencias artísticas: de dónde viene mi estilo"',
        '"El tatuaje que más me orgullece haber hecho este año"',
        '"¿Cuánto tiempo dura un tatoo bien cuidado? La verdad"',
      ],
      ventas: [],
    },
    logistica: {
      clientes: [
        '"Cómo optimizamos una ruta de 200km en 2 horas con tecnología"',
        '"Un día con nuestros conductores — realidad de la logística"',
        '"El error de gestión logística que le cuesta miles a las empresas"',
        '"¿Cómo funciona nuestro sistema de tracking en tiempo real?"',
        '"La historia del envío urgente que llegó en tiempo récord"',
        '"Lo que diferencia logística eficiente de la improvisada"',
        '"Nuestro equipo de almacén: el equipo invisible que lo hace posible"',
        '"¿Cuánto le cuesta realmente a tu empresa una gestión logística mala?"',
        '"Partnership logístico vs. externalización total — pros y contras"',
        '"Presentamos nuestra nueva flota: por qué invertimos en esto"',
      ],
      ventas: [],
    },
    consultor: {
      clientes: [
        '"El error más caro que cometen los empresarios en marketing" — gancho',
        '"Cómo pasé de X a Y en 90 días — sin publicidad de pago"',
        '"Lo que haría si empezara desde cero hoy con 1.000€"',
        '"La estrategia que mis clientes odian al principio y luego agradecen"',
        '"¿Por qué los cursos online no funcionan para la mayoría?"',
        '"Un caso real: este cliente llegó con X problema, esto hicimos"',
        '"Las 3 preguntas que le hago a todo cliente nuevo en la primera llamada"',
        '"La verdad sobre el ROI de los anuncios en redes sociales"',
        '"Lo que cobro y por qué — transparencia radical"',
        '"El sistema que uso para generar leads sin anuncios"',
      ],
      ventas: [],
    },
  };

  document.getElementById('run-extractor')?.addEventListener('click', async () => {
    const sector = document.getElementById('ext-sector').value;
    if (!sector) {
      alert('Selecciona primero tu sector 👆');
      return;
    }
    const goal = document.querySelector('#panel-extractor .ai-chips .ai-chip.active')?.dataset.goal || 'clientes';

    showLoading('output-extractor');
    await delay(1400);

    const ideas = IDEAS_DB[sector]?.[goal]
      || IDEAS_DB[sector]?.clientes
      || IDEAS_DB.consultor.clientes;

    const items = ideas.map((idea, i) => `<li><strong>${i + 1}.</strong> ${idea}</li>`).join('');
    const sectorLabel = document.getElementById('ext-sector').options[document.getElementById('ext-sector').selectedIndex].text;

    showOutput('output-extractor', `
      <h4>💡 10 ideas para ${sectorLabel}</h4>
      <ul>${items}</ul>
      <h4 style="margin-top:20px;">✅ Consejo de implementación</h4>
      <div class="script-block">
        Publica 3–4 de estas ideas esta semana. Empieza por la que más 
        te intimide — suele ser la que más engagement genera.
      </div>
    `);
  });

  /* ══════════════════════════════════
     2. WRITING & COPIES
  ══════════════════════════════════ */
  const COPY_TEMPLATES = {
    caption: (desc) => `
      <h4>📸 Caption Instagram</h4>
      <div class="script-block">
        ¿Sabes cuál es la diferencia entre un resultado bueno y uno que te cambia la vida?<br/><br/>
        La atención al detalle.<br/><br/>
        En ${desc || 'nuestro negocio'}, cada proceso importa. Cada decisión suma.<br/><br/>
        No vendemos un servicio. Construimos una experiencia que repites.<br/><br/>
        ¿Listo para vivirla? 👇<br/>
        📩 Reserva en la bio · Plazas limitadas esta semana
      </div>
      <h4>🏷️ Hashtags sugeridos</h4>
      <div class="tag-row">
        <span class="tag-item">#transformacion</span>
        <span class="tag-item">#resultadosreales</span>
        <span class="tag-item">#sinfiltros</span>
        <span class="tag-item">#expertos</span>
        <span class="tag-item">#profesionales</span>
        <span class="tag-item">#calidad</span>
        <span class="tag-item">#reservaahora</span>
      </div>`,

    anuncio: (desc) => `
      <h4>🎯 Copy para Meta Ads — versión A</h4>
      <div class="script-block">
        ¿Sigues esperando el momento perfecto?<br/>
        Ya llegó.<br/><br/>
        ${desc || 'Nuestro servicio'} ha transformado +47 negocios como el tuyo.<br/>
        Sin humo. Sin promesas vacías.<br/><br/>
        👉 Solicita tu estrategia gratuita hoy
      </div>
      <h4>🎯 Copy para Meta Ads — versión B</h4>
      <div class="script-block">
        La competencia ya usa esto.<br/>
        Tú todavía no.<br/><br/>
        Sistema completo de captación de clientes para ${desc || 'tu negocio'}:<br/>
        📌 Sin conocimientos técnicos<br/>
        📌 Resultados en 30 días<br/>
        📌 ROI medible desde el día 1<br/><br/>
        🔗 Agenda llamada gratuita →
      </div>`,

    email: (desc) => `
      <h4>📧 Asuntos de email (tasa apertura alta)</h4>
      <ul>
        <li>Re: tu consulta sobre ${desc || 'nuestro servicio'}</li>
        <li>El error que te está costando clientes cada semana</li>
        <li>[IMPORTANTE] Quedan 2 plazas disponibles</li>
        <li>¿Sigues haciendo esto? Lee esto antes del viernes</li>
        <li>Lo que aprendí trabajando con 47 negocios como el tuyo</li>
        <li>Tengo 30 min para ti esta semana — gratis</li>
        <li>Esto debería saberlo antes de invertir un euro más</li>
      </ul>`,

    bio: (desc) => `
      <h4>👤 Bio profesional optimizada</h4>
      <div class="script-block">
        🧩 ${desc || 'Experto en tu sector'}<br/>
        📈 Sistemas que generan clientes sin depender de la suerte<br/>
        ✅ +47 negocios transformados<br/>
        🔗 Estrategia gratuita ↓
      </div>
      <h4>📱 Variante corta para Instagram</h4>
      <div class="script-block">
        Ayudo a negocios reales a crecer con sistemas digitales 🧩<br/>
        Sin humo. Con datos. Con resultados.<br/>
        👇 Solicita tu diagnóstico gratuito
      </div>`,

    servicio: (desc) => `
      <h4>🛎️ Descripción de servicio</h4>
      <div class="script-block">
        ${desc || 'Nuestro servicio'} no es solo lo que ves.<br/><br/>
        Es la suma de años de experiencia, procesos probados y una atención 
        que empieza antes de tu primera visita y no termina cuando sales.<br/><br/>
        Incluye:<br/>
        ✓ Diagnóstico personalizado sin coste<br/>
        ✓ Proceso adaptado a tus necesidades<br/>
        ✓ Seguimiento post-servicio<br/>
        ✓ Garantía de satisfacción<br/><br/>
        No vendemos tiempo. Entregamos resultados.
      </div>`,
  };

  document.getElementById('run-writing')?.addEventListener('click', async () => {
    const type = document.getElementById('copy-type').value;
    const desc = document.getElementById('copy-desc').value.trim();

    showLoading('output-writing');
    await delay(1200);

    const fn = COPY_TEMPLATES[type] || COPY_TEMPLATES.caption;
    showOutput('output-writing', fn(desc));
  });

  /* ══════════════════════════════════
     3. ANÁLISIS DE IMAGEN
  ══════════════════════════════════ */
  const IMAGE_ANALYSIS = {
    plato: `
      <h4>🍽️ Análisis: Plato / Producto</h4>
      <ul>
        <li>Usa luz natural lateral — elimina el flash directo</li>
        <li>Encuadre 45° por encima — muestra textura y profundidad</li>
        <li>Fondo neutro o madera — no compite con el plato</li>
        <li>Añade un elemento humano (mano, utensilio) — humaniza la foto</li>
      </ul>
      <h4>✍️ Copy recomendado</h4>
      <div class="script-block">
        "No es solo un plato. Es el resultado de seleccionar el mejor ingrediente 
        de temporada, prepararlo con técnica y servirlo con intención."
      </div>
      <h4>⏰ Mejor horario de publicación</h4>
      <ul>
        <li>Jueves-Viernes: 12:00-13:30 (hambre del mediodía)</li>
        <li>Domingo: 11:00 (planificación del fin de semana)</li>
      </ul>
      <h4>🏷️ Hashtags para máximo alcance</h4>
      <div class="tag-row">
        <span class="tag-item">#foodphotography</span>
        <span class="tag-item">#gastronomy</span>
        <span class="tag-item">#foodie</span>
        <span class="tag-item">#cheflife</span>
        <span class="tag-item">#foodstagram</span>
      </div>`,

    equipo: `
      <h4>👥 Análisis: Equipo / Local</h4>
      <ul>
        <li>Muestra actividad real, no poses — la autenticidad convierte</li>
        <li>Incluye el nombre de la persona en la descripción — humaniza la marca</li>
        <li>Captura el espacio de fondo — el local es parte del producto</li>
        <li>Temperatura de color cálida — genera cercanía y confianza</li>
      </ul>
      <h4>✍️ Copy recomendado</h4>
      <div class="script-block">
        "Detrás de cada resultado hay un equipo que lo hace posible.  
        Este es el nuestro. Esta es nuestra forma de trabajar."
      </div>
      <h4>⏰ Mejor horario</h4>
      <ul>
        <li>Lunes: 9:00-10:00 (motivación de semana)</li>
        <li>Viernes: 17:00-19:00 (cierre de semana)</li>
      </ul>`,

    resultado: `
      <h4>✨ Análisis: Antes / Después</h4>
      <ul>
        <li>Foto "antes" con luz normal — no la hagas peor artificialmente</li>
        <li>Foto "después" con la mejor luz que tengas disponible</li>
        <li>Mismo ángulo en ambas fotos — credibilidad total</li>
        <li>Pide permiso explícito al cliente antes de publicar</li>
      </ul>
      <h4>✍️ Copy recomendado</h4>
      <div class="script-block">
        "Esto pasa cuando confías en manos expertas.  
        No filtramos. No editamos la diferencia.  
        Solo mostramos lo que ocurre cuando el trabajo se hace bien."
      </div>
      <h4>📈 Potencial de alcance</h4>
      <ul>
        <li>Los contenidos antes/después tienen 3-5× más alcance orgánico</li>
        <li>Guardar ratio muy alto — activa el algoritmo de distribución</li>
        <li>Ideal para usar en Meta Ads como creativo de conversión</li>
      </ul>`,

    proceso: `
      <h4>⚙️ Análisis: Proceso / Servicio</h4>
      <ul>
        <li>El proceso humaniza la marca y justifica el precio</li>
        <li>Muestra herramientas, materiales, detalles — la diferencia está ahí</li>
        <li>Añade texto superpuesto con el nombre del paso</li>
        <li>Formato carrusel ideal: paso 1, paso 2, paso 3, resultado</li>
      </ul>
      <h4>✍️ Copy recomendado</h4>
      <div class="script-block">
        "Cada detalle importa. Desliza para ver el proceso completo  
        detrás de cada trabajo que hacemos."
      </div>`,

    cliente: `
      <h4>😊 Análisis: Testimonio de cliente</h4>
      <ul>
        <li>Foto real del cliente — no stock — credibilidad máxima</li>
        <li>Incluye nombre (con permiso) y resultado específico obtenido</li>
        <li>El fondo no importa si la emoción del cliente es auténtica</li>
        <li>Cita textual corta + tu respuesta — muestra relación real</li>
      </ul>
      <h4>✍️ Copy recomendado</h4>
      <div class="script-block">
        "Cuando [nombre del cliente] llegó, buscaba [problema].  
        Hoy, [resultado conseguido].  
        Estas son las historias por las que hacemos lo que hacemos."
      </div>
      <h4>💡 Usos adicionales recomendados</h4>
      <ul>
        <li>Usar como creativo en Meta Ads (testimonios convierten 40% más)</li>
        <li>Guardar en destacados "Testimonios" del perfil</li>
        <li>Enviar por email como prueba social en seguimientos</li>
      </ul>`,

    obra: `
      <h4>🏗️ Análisis: Obra / Proyecto</h4>
      <ul>
        <li>Imagen de progreso: muestra estado actual vs objetivo final</li>
        <li>Incluye elementos de escala (persona, metro) para dar contexto</li>
        <li>Luz natural cuando sea posible — las obras bien iluminadas inspiran</li>
        <li>Carrusel semanal de progreso — genera seguimiento del proyecto</li>
      </ul>
      <h4>✍️ Copy recomendado</h4>
      <div class="script-block">
        "Semana [X] de [Y]. El proyecto avanza según el plan.  
        Cada decisión tomada aquí es visible en el resultado final.  
        Así trabajamos: con precisión, sin improvisación."
      </div>`,
  };

  document.getElementById('run-image')?.addEventListener('click', async () => {
    const activeImg = document.querySelector('.ai-img-option.active');
    const imgType = activeImg?.dataset.img || 'plato';

    showLoading('output-image');
    await delay(1300);

    showOutput('output-image', IMAGE_ANALYSIS[imgType] || IMAGE_ANALYSIS.plato);
  });

  /* ══════════════════════════════════
     4. SCRIPTS PARA VÍDEO
  ══════════════════════════════════ */
  const VIDEO_SCRIPTS = {
    transformacion: {
      reel: `
        <h4>🎬 Script de Reel — Transformación (15-30s)</h4>
        <div class="script-block"><strong>[HOOK — 0-3s]</strong><br/>
          "Esto es lo que pasa cuando te pones en manos de alguien que sabe."
        </div>
        <div class="script-block"><strong>[DESARROLLO — 3-20s]</strong><br/>
          [Corte rápido: imagen antes]<br/>
          [Transición creativa al resultado]<br/>
          [Zoom in en el detalle más impactante]
        </div>
        <div class="script-block"><strong>[CTA — últimos 5s]</strong><br/>
          "Texto en pantalla: ¿El próximo eres tú?"<br/>
          "Link en bio para reservar"
        </div>
        <h4>🎵 Música recomendada</h4>
        <ul>
          <li>Trending en Reels esta semana (busca "Reels trending sound")</li>
          <li>Tempo: medio-rápido para transición, lento para resultado</li>
          <li>Duración exacta: ajusta el corte al tempo del beat</li>
        </ul>`,
      tiktok: `
        <h4>🎬 Script TikTok — Transformación (30-60s)</h4>
        <div class="script-block"><strong>[HOOK verbal — 0-3s]</strong><br/>
          "Espera al final. Esto no lo esperabas."
        </div>
        <div class="script-block"><strong>[CONTEXTO — 3-15s]</strong><br/>
          Voz en off: "Cuando llegó, llevaba X meses queriendo hacer esto..."
        </div>
        <div class="script-block"><strong>[PROCESO — 15-40s]</strong><br/>
          Clips del proceso editados a tempo. Sin pausa. Sin silencio.
        </div>
        <div class="script-block"><strong>[REVEAL + CTA — 40-55s]</strong><br/>
          "Texto: ¿Tú también lo quieres? Link en bio."
        </div>`,
    },
    proceso: {
      reel: `
        <h4>🎬 Script de Reel — Proceso (15-30s)</h4>
        <div class="script-block"><strong>[HOOK — 0-3s]</strong><br/>
          "¿Sabes lo que ocurre realmente aquí dentro?"
        </div>
        <div class="script-block"><strong>[DESARROLLO — 3-22s]</strong><br/>
          [Clip 1: preparación / materiales]<br/>
          [Clip 2: primera fase del proceso]<br/>
          [Clip 3: detalle de precisión]<br/>
          [Clip 4: resultado parcial]
        </div>
        <div class="script-block"><strong>[CTA — 22-30s]</strong><br/>
          "Texto: Cada detalle importa. ¿Vemos el resultado?"<br/>
          [Corte al resultado final]
        </div>`,
      tutorial: `
        <h4>🎬 Script Tutorial — Proceso (60-90s)</h4>
        <div class="script-block"><strong>Paso 1 — Introducción (0-10s)</strong><br/>
          Cámara a ti: "Hoy te muestro paso a paso cómo hacemos [X]"
        </div>
        <div class="script-block"><strong>Paso 2 — Pasos (10-70s)</strong><br/>
          3-4 pasos con texto en pantalla numerados<br/>
          Voz en off explicando brevemente cada uno
        </div>
        <div class="script-block"><strong>Paso 3 — Cierre (70-90s)</strong><br/>
          "¿Tienes preguntas? Escríbeme en los comentarios"
        </div>`,
    },
    secreto: {
      reel: `
        <h4>🎬 Script de Reel — El secreto (15-30s)</h4>
        <div class="script-block"><strong>[HOOK — 0-3s]</strong><br/>
          "Nadie de mi sector te va a contar esto."
        </div>
        <div class="script-block"><strong>[CONTENIDO — 3-22s]</strong><br/>
          Texto en pantalla: el secreto / dato / insight revelador<br/>
          Voz en off o subtítulos — ritmo rápido, sin pausas
        </div>
        <div class="script-block"><strong>[CTA — 22-30s]</strong><br/>
          "Guarda esto para no olvidarlo 👆"<br/>
          (El 'guardar' activa el algoritmo — pídelo explícitamente)
        </div>`,
    },
    errores: {
      reel: `
        <h4>🎬 Script de Reel — Errores comunes (15-30s)</h4>
        <div class="script-block"><strong>[HOOK — 0-3s]</strong><br/>
          "Si haces esto, estás tirando dinero."
        </div>
        <div class="script-block"><strong>[LISTA — 3-22s]</strong><br/>
          Error 1: [nombre + consecuencia rápida]<br/>
          Error 2: [nombre + consecuencia]<br/>
          Error 3: [nombre + consecuencia]<br/>
          (Texto en pantalla + voz en off)
        </div>
        <div class="script-block"><strong>[SOLUCIÓN + CTA — 22-30s]</strong><br/>
          "La solución está en la bio. Guarda este vídeo. 📌"
        </div>`,
    },
    precio: {
      reel: `
        <h4>🎬 Script de Reel — Por qué cobro lo que cobro (15-30s)</h4>
        <div class="script-block"><strong>[HOOK — 0-3s]</strong><br/>
          "¿Por qué cobro X€? Te lo explico sin filtros."
        </div>
        <div class="script-block"><strong>[DESGLOSE — 3-22s]</strong><br/>
          "Incluye: [item 1] · [item 2] · [item 3]"<br/>
          "Años de formación: [X]"<br/>
          "Materiales/herramientas: [X€]"<br/>
          "Mi tiempo y experiencia: impagables."
        </div>
        <div class="script-block"><strong>[CIERRE — 22-30s]</strong><br/>
          "No soy el más barato. Soy el que te da más por cada euro."
        </div>`,
    },
    dia: {
      tiktok: `
        <h4>🎬 Script TikTok — Un día en mi negocio (30-60s)</h4>
        <div class="script-block"><strong>[APERTURA — 0-5s]</strong><br/>
          "Son las [hora]. Así empieza nuestro día."
        </div>
        <div class="script-block"><strong>[DESARROLLO — 5-45s]</strong><br/>
          Clips de: apertura, primer cliente/tarea, pausa, momento peak, cierre<br/>
          Texto en pantalla: hora + descripción breve en cada clip
        </div>
        <div class="script-block"><strong>[CIERRE — 45-55s]</strong><br/>
          "¿Quieres que mostremos [tema específico]?<br/>
          Cuéntanos en comentarios 👇"
        </div>`,
    },
  };

  document.getElementById('run-video')?.addEventListener('click', async () => {
    const topic = document.getElementById('video-topic').value;
    const fmt = document.querySelector('#panel-video .ai-chips .ai-chip.active')?.dataset.fmt || 'reel';

    showLoading('output-video');
    await delay(1600);

    const scripts = VIDEO_SCRIPTS[topic];
    const script  = scripts?.[fmt] || scripts?.reel || scripts?.tiktok;

    if (script) {
      showOutput('output-video', script);
    } else {
      const firstKey = Object.keys(VIDEO_SCRIPTS)[0];
      showOutput('output-video', VIDEO_SCRIPTS[firstKey].reel);
    }
  });

  /* ══════════════════════════════════
     5. ESTRATEGIA DE CONTENIDO
  ══════════════════════════════════ */
  const STRATEGY_DB = {
    peluqueria: {
      captacion: buildStrategy('Peluquería', [
        { week: 'Sem 1', theme: 'Presentación del equipo', formats: 'Reel + Carrusel', slots: ['Lun: Vídeo "¿Quiénes somos?"', 'Mié: Carrusel servicios top', 'Vie: Story con encuesta de necesidades'], note: 'Objetivo: que te conozcan y confíen' },
        { week: 'Sem 2', theme: 'Antes / Después', formats: 'Reel transformación', slots: ['Mar: Transformación de color', 'Jue: Proceso de tratamiento', 'Sáb: Testimonio real de clienta'], note: 'El contenido que más captación genera' },
        { week: 'Sem 3', theme: 'Educación + valor', formats: 'Carrusel + Reel tutorial', slots: ['Lun: "3 errores con tu pelo en casa"', 'Mié: Tutorial de styling rápido', 'Vie: Q&A en stories respondiendo dudas'], note: 'Posicionamiento de autoridad' },
        { week: 'Sem 4', theme: 'Captación directa', formats: 'Story + Reel CTA', slots: ['Mar: "Quedan 3 huecos esta semana"', 'Jue: Oferta de primera visita', 'Vie: Recordatorio + CTA directo'], note: 'Convierte el interés en reservas reales' },
      ]),
    },
    restaurante: {
      captacion: buildStrategy('Restaurante', [
        { week: 'Sem 1', theme: 'Tu cocina y equipo', formats: 'Reel detrás de escenas', slots: ['Lun: Apertura de cocina', 'Mié: Presentación del chef', 'Vie: El plato más pedido esta semana'], note: 'Genera curiosidad y visitas' },
        { week: 'Sem 2', theme: 'Platos estrella', formats: 'Foto + Reel proceso', slots: ['Mar: Foto del especial del día', 'Jue: Proceso de preparación', 'Sáb: "¿Qué pediste hoy?" — Story encuesta'], note: 'Activa el apetito y la acción' },
        { week: 'Sem 3', theme: 'Experiencia cliente', formats: 'Testimonio + Carrusel', slots: ['Lun: Testimonio de mesa completa', 'Mié: "Así celebramos un cumpleaños aquí"', 'Vie: Detrás de escenas del servicio'], note: 'Genera FOMO y deseo de vivir la experiencia' },
        { week: 'Sem 4', theme: 'Urgencia y reservas', formats: 'Story + Post directo', slots: ['Mar: "Este fin de semana: mesa libre"', 'Jue: Nuevo menú lanzamiento', 'Vie: "Últimas plazas para este sábado"'], note: 'Cierra la semana con reservas reales' },
      ]),
    },
    constructora: {
      autoridad: buildStrategy('Constructora', [
        { week: 'Sem 1', theme: 'Presentación de proyectos', formats: 'Carrusel galería', slots: ['Lun: "Los 3 proyectos que más nos enorgullecen"', 'Mié: Proceso de una obra completa', 'Vie: "¿Cuánto tarda una reforma de X?"'], note: 'Establece capacidad y experiencia' },
        { week: 'Sem 2', theme: 'Educación para clientes', formats: 'Carrusel + Reel', slots: ['Mar: "Guía para reformar sin morir en el intento"', 'Jue: "Los materiales que usamos y por qué"', 'Sáb: Antes/después de proyecto reciente'], note: 'Confianza y posicionamiento experto' },
        { week: 'Sem 3', theme: 'Testimonios + resultados', formats: 'Vídeo + Texto', slots: ['Lun: Cliente habla de su reforma', 'Mié: Datos del proyecto: tiempo, coste, resultado', 'Vie: Story con encuesta sobre tu próximo proyecto'], note: 'Prueba social que cierra ventas' },
        { week: 'Sem 4', theme: 'Captación activa', formats: 'Post directo + Story', slots: ['Mar: "Presupuesto gratis para reformas en [ciudad]"', 'Jue: "Proyectos disponibles para Q2 2025"', 'Vie: CTA directo con formulario'], note: 'Generación de leads directos' },
      ]),
    },
    ecommerce: {
      ventas: buildStrategy('Ecommerce', [
        { week: 'Sem 1', theme: 'Conoce el producto', formats: 'Unboxing + Carrusel', slots: ['Lun: Presentación del producto estrella', 'Mié: "¿Qué hay dentro del paquete?"', 'Vie: Tutorial de uso — 30 segundos'], note: 'Reduce fricción de compra' },
        { week: 'Sem 2', theme: 'Confianza y reviews', formats: 'UGC + Testimonio', slots: ['Mar: Review real de cliente', 'Jue: "Lo que dicen de nosotros en Google"', 'Sáb: Respuesta a objeción frecuente'], note: 'Elimina barreras de compra' },
        { week: 'Sem 3', theme: 'Contenido de valor', formats: 'Reel educativo', slots: ['Lun: "Cómo sacar el máximo partido a X"', 'Mié: Comparativa honesta del producto', 'Vie: Behind the scenes del almacén y envíos'], note: 'Genera comunidad fiel' },
        { week: 'Sem 4', theme: 'Impulso de ventas', formats: 'Story urgente + Post', slots: ['Mar: Flash sale 24h — solo para seguidores', 'Jue: "Lanzamiento nuevo producto — lista de espera"', 'Vie: "Últimas unidades del más vendido"'], note: 'Convierte visitas en ventas reales' },
      ]),
    },
    clinica: {
      autoridad: buildStrategy('Clínica / Bienestar', [
        { week: 'Sem 1', theme: 'Presentación del equipo', formats: 'Carrusel + Reel', slots: ['Lun: "Quiénes somos y por qué hacemos esto"', 'Mié: El especialista habla de su especialidad', 'Vie: "Una sesión real, sin editar"'], note: 'Confianza desde el primer día' },
        { week: 'Sem 2', theme: 'Educación preventiva', formats: 'Carrusel educativo', slots: ['Mar: "3 señales de que necesitas venir"', 'Jue: "Mito vs realidad sobre [tratamiento]"', 'Sáb: Story Q&A respondiendo dudas frecuentes'], note: 'Atraes a quienes ya tienen el problema' },
        { week: 'Sem 3', theme: 'Resultados reales', formats: 'Testimonio + Proceso', slots: ['Lun: Testimonio de paciente (con permiso)', 'Mié: Proceso completo de una sesión', 'Vie: Datos de evolución anónimos'], note: 'La prueba más poderosa' },
        { week: 'Sem 4', theme: 'Captación directa', formats: 'CTA directo', slots: ['Mar: "Primera consulta gratuita esta semana"', 'Jue: "Plazas limitadas en [mes] — reserva ahora"', 'Vie: Historia de éxito + CTA'], note: 'Convierte interés en citas reales' },
      ]),
    },
    tatuador: {
      comunidad: buildStrategy('Artista / Tatuador', [
        { week: 'Sem 1', theme: 'Tu mundo artístico', formats: 'Reel proceso + Galería', slots: ['Lun: Vídeo proceso de diseño custom', 'Mié: Galería con tu estilo definitorio', 'Vie: "Por qué hago lo que hago" — storytelling'], note: 'Atrae a tu cliente ideal' },
        { week: 'Sem 2', theme: 'Behind the scenes', formats: 'Reel estudio', slots: ['Mar: Un día en el estudio — timelapse', 'Jue: Diseñando un custom desde cero', 'Sáb: "Flash disponible este fin de semana"'], note: 'Genera deseo y urgencia' },
        { week: 'Sem 3', theme: 'Educación artística', formats: 'Carrusel + Reel', slots: ['Lun: "Estilos de tatuaje que domino y por qué"', 'Mié: Cuidados del tatuaje — guía completa', 'Vie: "Las preguntas que más me hacen"'], note: 'Posicionamiento de experto' },
        { week: 'Sem 4', theme: 'Captación de agenda', formats: 'Post directo + Story', slots: ['Mar: "Abriendo agenda para [mes]"', 'Jue: "Flash day — plazas limitadas"', 'Vie: Portfolio reciente + CTA reserva'], note: 'Llena tu agenda antes de abrirla' },
      ]),
    },
    consultor: {
      autoridad: buildStrategy('Consultor / Coach', [
        { week: 'Sem 1', theme: 'Tu historia y posicionamiento', formats: 'Reel + Post largo', slots: ['Lun: "Por qué hago lo que hago" — storytelling', 'Mié: "Los resultados que he conseguido para clientes"', 'Vie: "Así trabajo con mis clientes"'], note: 'La historia vende más que el servicio' },
        { week: 'Sem 2', theme: 'Contenido de valor', formats: 'Carrusel educativo', slots: ['Mar: "El sistema que uso con todos mis clientes"', 'Jue: "El error que te está costando X€ cada mes"', 'Sáb: Case study breve de un cliente'], note: 'Demuestra expertise con datos' },
        { week: 'Sem 3', theme: 'Desmontando mitos', formats: 'Reel directo', slots: ['Lun: "Lo que nadie de mi sector se atreve a decir"', 'Mié: "Por qué los cursos no funcionan para la mayoría"', 'Vie: "Mis métricas reales de [mes pasado]"'], note: 'Diferenciación radical' },
        { week: 'Sem 4', theme: 'Captación directa', formats: 'Post + Story', slots: ['Mar: "Abro 2 plazas de consultoría este mes"', 'Jue: "¿Cumples estos 3 criterios? Podemos trabajar"', 'Vie: "Agenda tu llamada gratuita antes del viernes"'], note: 'Cierra con urgencia real' },
      ]),
    },
  };

  function buildStrategy(sector, weeks) {
    const weekRows = weeks.map(w => `
      <div class="week-row">
        <div class="week-label">${w.week}</div>
        <div>
          <strong style="font-size:13px;color:var(--text);">${w.theme}</strong>
          <div style="font-size:11px;color:var(--accent);margin:3px 0;font-family:var(--font-mono);">${w.formats}</div>
          <ul style="margin-top:4px;">
            ${w.slots.map(s => `<li>${s}</li>`).join('')}
          </ul>
          <div style="font-size:11px;color:var(--text-muted);margin-top:6px;font-style:italic;">💡 ${w.note}</div>
        </div>
      </div>`).join('');

    return `
      <h4>📅 Plan Editorial 4 Semanas — ${sector}</h4>
      ${weekRows}
      <h4 style="margin-top:16px;">⏰ Horarios óptimos</h4>
      <div class="tag-row">
        <span class="tag-item">Lun 9-10h</span>
        <span class="tag-item">Mar 12-13h</span>
        <span class="tag-item">Jue 18-19h</span>
        <span class="tag-item">Vie 17-18h</span>
        <span class="tag-item">Sáb 11-12h</span>
      </div>`;
  }

  document.getElementById('run-strategy')?.addEventListener('click', async () => {
    const sector = document.getElementById('strat-sector').value;
    if (!sector) {
      alert('Selecciona tu sector primero 👆');
      return;
    }
    const obj = document.querySelector('#panel-strategy .ai-chips .ai-chip.active')?.dataset.strat || 'captacion';

    showLoading('output-strategy');
    await delay(1800);

    const sData   = STRATEGY_DB[sector];
    const content = sData?.[obj] || sData?.captacion || sData?.autoridad || sData?.comunidad || sData?.ventas;

    showOutput('output-strategy', content || '<p>Generando estrategia personalizada…</p>');
  });

  /* ══════════════════════════════════
     REVEAL ON SCROLL
  ══════════════════════════════════ */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));

});
