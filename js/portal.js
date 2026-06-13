/* ============================================================
   RAXISLAB — js/portal.js — Client Portal v2.0
   ============================================================
   Features:
   · Login con código de acceso por cliente
   · Sesión en sessionStorage (expira al cerrar pestaña)
   · Vistas: Overview, Tareas, Contenidos, Métricas, Mensajes
   · Datos demo precargados
   · Mensajería (chat local con localStorage)
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════
   CLIENTS DATABASE (en producción esto vendría de la API)
══════════════════════════════════════════════════════ */
const PORTAL_CLIENTS = {

  'DEMO-2025': {
    id: 'demo',
    name: 'Salón Elegance',
    contact: 'María García',
    avatar: '💇‍♀️',
    sector: 'Peluquería & Estilismo',
    planName: 'Plan Estándar',
    planColor: '#00C8FF',
    startDate: '2025-01-15',
    endDate: '2025-07-15',
    projectTitle: 'Estrategia Digital Integral',
    projectPhase: 'Ejecución',
    projectProgress: 68,
    phases: [
      { name: 'Auditoría & Estrategia', status: 'done', date: 'Ene 2025' },
      { name: 'Diseño Web & Branding', status: 'done', date: 'Feb 2025' },
      { name: 'SEO & Google Ads',       status: 'active', date: 'Mar 2025' },
      { name: 'Meta Ads & Contenidos',  status: 'pending', date: 'Abr 2025' },
      { name: 'Automatización & CRM',   status: 'pending', date: 'May 2025' },
      { name: 'Revisión & Entrega',     status: 'pending', date: 'Jun 2025' },
    ],
    kpis: [
      { icon: '👁️', label: 'Impresiones',     value: '12.4K', delta: '+34%', up: true },
      { icon: '🖱️', label: 'Clics web',       value: '847',   delta: '+21%', up: true },
      { icon: '📱', label: 'Seguidores IG',   value: '+312',  delta: '+18%', up: true },
      { icon: '💰', label: 'Leads captados',  value: '38',    delta: '+52%', up: true },
    ],
    tasks: [
      { id: 't1', title: 'Auditoría SEO completa del sitio',    status: 'completada',   priority: 'alta',  date: 'Ene 20' },
      { id: 't2', title: 'Diseño y maquetación web (5 páginas)', status: 'completada',  priority: 'alta',  date: 'Feb 10' },
      { id: 't3', title: 'Configuración Google Business Profile', status: 'completada', priority: 'media', date: 'Feb 18' },
      { id: 't4', title: 'Campaña Google Ads — Búsqueda local',  status: 'en_progreso', priority: 'alta',  date: 'Mar 01' },
      { id: 't5', title: 'Optimización On-page (15 páginas)',    status: 'en_progreso',  priority: 'alta',  date: 'Mar 05' },
      { id: 't6', title: 'Creación de 12 Reels mensuales',       status: 'en_progreso', priority: 'media', date: 'Mar 08' },
      { id: 't7', title: 'Configurar Meta Ads — Awareness',      status: 'pendiente',   priority: 'alta',  date: 'Abr 01' },
      { id: 't8', title: 'Automatización reservas con n8n',      status: 'pendiente',   priority: 'media', date: 'May 01' },
      { id: 't9', title: 'Dashboard Looker Studio personalizado', status: 'pendiente',  priority: 'baja',  date: 'May 15' },
    ],
    content: [
      { id: 'c1', type: 'Reel', title: 'Balayage antes/después', platform: 'Instagram', status: 'pendiente_aprobacion', thumb: '🎬', caption: 'Transformación completa con técnica balayage. ¿Lista para el cambio? 💫 #peluqueria #balayage' },
      { id: 'c2', type: 'Post', title: 'Oferta Primavera 2025',  platform: 'Instagram', status: 'pendiente_aprobacion', thumb: '📸', caption: '🌸 Primavera es sinónimo de cambio. Pide cita esta semana y disfruta de un 15% en coloración.' },
      { id: 'c3', type: 'Story', title: 'Encuesta: ¿Qué servicio prefieres?', platform: 'Instagram', status: 'aprobado', thumb: '📊', caption: 'Stories con encuesta interactiva para conocer a tu audiencia.' },
      { id: 'c4', type: 'Reel', title: 'Tutorial: ondas perfectas', platform: 'TikTok', status: 'publicado', thumb: '🎵', caption: 'Tutorial paso a paso para conseguir esas ondas que todos quieren. ¡Guárdalo! 💫' },
      { id: 'c5', type: 'Post', title: 'Presentación equipo',    platform: 'Instagram', status: 'borrador',  thumb: '👥', caption: 'Conoce a nuestro equipo de profesionales. ¡Somos tu equipo!' },
    ],
    metrics: {
      period: 'Febrero 2025',
      seo: { score: 78, keywords: 24, position1_5: 8, position6_10: 11 },
      ads: { spend: 320, clicks: 412, ctr: 3.8, conversions: 28, cpa: 11.4 },
      social: { reach: 8400, impressions: 14200, engagement: 4.2, followers: 312 },
      web: { sessions: 1840, bounce: 42, avgTime: '2:18', goals: 38 },
    },
    messages: [
      { id: 'm1', from: 'rene', text: '¡Hola María! Esta semana arrancamos con la campaña de Google Ads. He configurado 3 grupos de anuncios enfocados en búsqueda local. Te comparto el acceso cuando lo necesites.', ts: Date.now() - 86400000 * 2 },
      { id: 'm2', from: 'client', text: '¡Perfecto René! ¿Cuándo podré ver los primeros resultados?', ts: Date.now() - 86400000 * 1.5 },
      { id: 'm3', from: 'rene', text: 'En unos 7-10 días tendrás datos significativos. Google necesita ese tiempo para optimizar la puja. Mientras tanto, ya el SEO está generando impresiones 🚀', ts: Date.now() - 86400000 * 1 },
    ],
  },

  'BUILD-001': {
    id: 'build',
    name: 'Constructora Vértice',
    contact: 'Carlos Méndez',
    avatar: '🏗️',
    sector: 'Construcción & Obra',
    planName: 'Plan Premium',
    planColor: '#FF6B35',
    startDate: '2025-02-01',
    endDate: '2025-08-01',
    projectTitle: 'ERP Digital + Presencia Online',
    projectPhase: 'Desarrollo',
    projectProgress: 45,
    phases: [
      { name: 'Auditoría de procesos',     status: 'done',   date: 'Feb 2025' },
      { name: 'Arquitectura del sistema',  status: 'done',   date: 'Feb 2025' },
      { name: 'ERP en Google Sheets',      status: 'active', date: 'Mar 2025' },
      { name: 'Dashboard Looker Studio',   status: 'active', date: 'Mar 2025' },
      { name: 'Web corporativa + SEO',     status: 'pending', date: 'Abr 2025' },
      { name: 'Google Ads — Proyectos',    status: 'pending', date: 'May 2025' },
    ],
    kpis: [
      { icon: '📋', label: 'Módulos ERP',      value: '7/12',  delta: 'En curso', up: true },
      { icon: '⚡', label: 'Horas ahorradas',  value: '23h',   delta: '/semana',  up: true },
      { icon: '📊', label: 'Dashboards',        value: '4',     delta: 'activos',  up: true },
      { icon: '💼', label: 'Proyectos activos', value: '3',     delta: 'en sistema', up: true },
    ],
    tasks: [
      { id: 't1', title: 'Mapeo de procesos internos',              status: 'completada',   priority: 'alta',  date: 'Feb 05' },
      { id: 't2', title: 'ERP: módulo de presupuestos',             status: 'completada',   priority: 'alta',  date: 'Feb 20' },
      { id: 't3', title: 'ERP: módulo de seguimiento de obras',     status: 'en_progreso',  priority: 'alta',  date: 'Mar 10' },
      { id: 't4', title: 'Dashboard KPIs financieros',              status: 'en_progreso',  priority: 'alta',  date: 'Mar 15' },
      { id: 't5', title: 'ERP: gestión de materiales',              status: 'pendiente',    priority: 'media', date: 'Mar 25' },
      { id: 't6', title: 'Web corporativa (6 páginas)',             status: 'pendiente',    priority: 'alta',  date: 'Abr 01' },
    ],
    content: [
      { id: 'c1', type: 'Post', title: 'Proyecto Residencial Vista Norte',  platform: 'LinkedIn', status: 'pendiente_aprobacion', thumb: '🏠', caption: 'Nos enorgullece presentar nuestro último proyecto: 24 unidades residenciales en Vista Norte.' },
      { id: 'c2', type: 'Video', title: 'Timelapse: obra en 60 segundos',  platform: 'LinkedIn', status: 'borrador', thumb: '📹', caption: 'De cimientos a tejado en 60 segundos. Así trabajamos en Constructora Vértice.' },
    ],
    metrics: {
      period: 'Febrero 2025',
      seo: { score: 0, keywords: 0, position1_5: 0, position6_10: 0 },
      ads: { spend: 0, clicks: 0, ctr: 0, conversions: 0, cpa: 0 },
      social: { reach: 0, impressions: 0, engagement: 0, followers: 0 },
      web: { sessions: 0, bounce: 0, avgTime: '—', goals: 0 },
    },
    messages: [
      { id: 'm1', from: 'rene', text: '¡Hola Carlos! El módulo de presupuestos está casi listo. Esta semana lo terminamos y pasamos a seguimiento de obras.', ts: Date.now() - 86400000 * 1 },
    ],
  },

  'HORECA-2025': {
    id: 'horeca',
    name: 'Restaurante El Origen',
    contact: 'Ana López',
    avatar: '🍽️',
    sector: 'Hostelería & Restauración',
    planName: 'Plan Básico',
    planColor: '#7C3AED',
    startDate: '2025-03-01',
    endDate: '2025-06-01',
    projectTitle: 'Presencia Digital & Reservas',
    projectPhase: 'Inicio',
    projectProgress: 15,
    phases: [
      { name: 'Auditoría Google Business',  status: 'active', date: 'Mar 2025' },
      { name: 'Web + Menú digital',          status: 'pending', date: 'Mar 2025' },
      { name: 'SEO Local',                   status: 'pending', date: 'Abr 2025' },
      { name: 'Google Ads — Local',          status: 'pending', date: 'Abr 2025' },
      { name: 'Sistema de reservas',         status: 'pending', date: 'May 2025' },
    ],
    kpis: [
      { icon: '⭐', label: 'Valoración Google', value: '4.1',  delta: '→ 4.7', up: true },
      { icon: '📍', label: 'Reseñas',           value: '23',   delta: '+18 pendientes', up: false },
      { icon: '🔍', label: 'Búsquedas locales', value: '—',    delta: 'Sin datos aún', up: false },
      { icon: '📅', label: 'Reservas online',   value: '—',    delta: 'Sistema pendiente', up: false },
    ],
    tasks: [
      { id: 't1', title: 'Auditoría Google Business Profile', status: 'en_progreso',  priority: 'alta', date: 'Mar 03' },
      { id: 't2', title: 'Responder reseñas negativas',       status: 'pendiente',    priority: 'alta', date: 'Mar 05' },
      { id: 't3', title: 'Diseño web con menú digital',       status: 'pendiente',    priority: 'alta', date: 'Mar 15' },
    ],
    content: [],
    metrics: {
      period: 'Marzo 2025',
      seo: { score: 32, keywords: 4, position1_5: 0, position6_10: 2 },
      ads: { spend: 0, clicks: 0, ctr: 0, conversions: 0, cpa: 0 },
      social: { reach: 340, impressions: 890, engagement: 2.1, followers: 0 },
      web: { sessions: 0, bounce: 0, avgTime: '—', goals: 0 },
    },
    messages: [
      { id: 'm1', from: 'rene', text: '¡Bienvenida Ana! Empezamos esta semana con la auditoría de tu Google Business Profile. El potencial local es enorme 🍽️', ts: Date.now() - 3600000 * 3 },
    ],
  },

};

/* ══════════════════════════════════════════════════════
   SESSION MANAGEMENT
══════════════════════════════════════════════════════ */
const SESSION_KEY = 'raxislab_portal_session';

function getPortalSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null; }
  catch { return null; }
}
function setPortalSession(clientKey) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ clientKey, ts: Date.now() }));
}
function clearPortalSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

/* ══════════════════════════════════════════════════════
   MESSAGES STORAGE (localStorage por cliente)
══════════════════════════════════════════════════════ */
function getMsgKey(clientKey) { return `raxislab_msgs_${clientKey}`; }
function loadMessages(clientKey) {
  const base = PORTAL_CLIENTS[clientKey]?.messages || [];
  try {
    const stored = JSON.parse(localStorage.getItem(getMsgKey(clientKey))) || [];
    return [...base, ...stored];
  } catch { return base; }
}
function saveNewMessage(clientKey, text) {
  const key = getMsgKey(clientKey);
  let stored = [];
  try { stored = JSON.parse(localStorage.getItem(key)) || []; } catch {}
  stored.push({ id: 'u_' + Date.now(), from: 'client', text, ts: Date.now() });
  localStorage.setItem(key, JSON.stringify(stored));
}

/* ══════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════ */
let currentClient = null;
let currentClientKey = null;
let currentView = 'overview';

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
function formatTs(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000)    return 'Ahora';
  if (diff < 3600000)  return Math.floor(diff/60000) + 'm';
  if (diff < 86400000) return Math.floor(diff/3600000) + 'h';
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
}

function statusLabel(s) {
  return {
    completada:   '<span class="task-badge badge-done">✅ Completado</span>',
    en_progreso:  '<span class="task-badge badge-active">🔄 En progreso</span>',
    pendiente:    '<span class="task-badge badge-pending">⏳ Pendiente</span>',
  }[s] || s;
}
function priorityLabel(p) {
  return {
    alta:  '<span class="priority-tag prio-high">Alta</span>',
    media: '<span class="priority-tag prio-med">Media</span>',
    baja:  '<span class="priority-tag prio-low">Baja</span>',
  }[p] || p;
}
function contentStatusLabel(s) {
  return {
    pendiente_aprobacion: '<span class="content-badge cb-pending">⏳ Pendiente</span>',
    aprobado:             '<span class="content-badge cb-approved">✅ Aprobado</span>',
    publicado:            '<span class="content-badge cb-published">🚀 Publicado</span>',
    borrador:             '<span class="content-badge cb-draft">📝 Borrador</span>',
  }[s] || s;
}

/* ══════════════════════════════════════════════════════
   LOGIN
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  const loginScreen = document.getElementById('portalLogin');
  const appScreen   = document.getElementById('portalApp');

  /* Try auto-login from session */
  const sess = getPortalSession();
  if (sess && PORTAL_CLIENTS[sess.clientKey]) {
    enterPortal(sess.clientKey);
  } else {
    loginScreen.style.display = '';
    appScreen.style.display = 'none';
  }

  /* Login form */
  const loginForm  = document.getElementById('loginForm');
  const codeInput  = document.getElementById('accessCode');
  const loginError = document.getElementById('loginError');
  const loginBtn   = document.getElementById('loginBtn');

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const code = codeInput.value.trim().toUpperCase();
    if (PORTAL_CLIENTS[code]) {
      loginError.style.display = 'none';
      loginBtn.textContent = '✓ Accediendo…';
      loginBtn.disabled = true;
      setTimeout(() => enterPortal(code), 600);
    } else {
      loginError.style.display = '';
      codeInput.classList.add('shake');
      setTimeout(() => codeInput.classList.remove('shake'), 600);
    }
  });

  /* Demo button */
  document.getElementById('demoBtn').addEventListener('click', () => {
    codeInput.value = 'DEMO-2025';
    loginForm.dispatchEvent(new Event('submit'));
  });

});

function enterPortal(clientKey) {
  currentClientKey = clientKey;
  currentClient    = PORTAL_CLIENTS[clientKey];
  setPortalSession(clientKey);

  document.getElementById('portalLogin').style.display = 'none';
  document.getElementById('portalApp').style.display   = '';

  initPortal();
  showView('overview');
}

/* ══════════════════════════════════════════════════════
   PORTAL INIT
══════════════════════════════════════════════════════ */
function initPortal() {
  const c = currentClient;

  /* Sidebar client info */
  document.getElementById('sidebarClientInfo').innerHTML = `
    <div class="sidebar-client-avatar">${c.avatar}</div>
    <div class="sidebar-client-name">${c.contact}</div>
    <div class="sidebar-client-biz">${c.name}</div>
    <div class="sidebar-client-plan" style="color:${c.planColor}">${c.planName}</div>
  `;

  /* Badge tasks in progress */
  const inProg = c.tasks.filter(t => t.status === 'en_progreso').length;
  const badge  = document.getElementById('badgeTasks');
  if (inProg > 0) { badge.textContent = inProg; badge.style.display = ''; }

  /* Badge content pending */
  const pendContent = c.content.filter(ct => ct.status === 'pendiente_aprobacion').length;
  const badgeC = document.getElementById('badgeContent');
  if (pendContent > 0) { badgeC.textContent = pendContent; badgeC.style.display = ''; }

  /* Badge messages unread (client messages) */
  const msgs = loadMessages(currentClientKey);
  const unread = msgs.filter(m => m.from === 'rene').length;
  const badgeM = document.getElementById('badgeMessages');
  if (unread > 0) { badgeM.textContent = unread; badgeM.style.display = ''; }

  /* Nav */
  document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });
  document.querySelectorAll('.portal-card-action').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  /* Logout */
  document.getElementById('logoutBtn').addEventListener('click', () => {
    clearPortalSession();
    document.getElementById('portalLogin').style.display = '';
    document.getElementById('portalApp').style.display = 'none';
    document.getElementById('accessCode').value = '';
    document.getElementById('loginBtn').textContent = 'Entrar →';
    document.getElementById('loginBtn').disabled = false;
  });

  /* Mobile menu */
  document.getElementById('topbarMenu').addEventListener('click', () => {
    document.getElementById('portalSidebar').classList.toggle('mobile-open');
  });

  /* Chat send */
  document.getElementById('chatSend').addEventListener('click', sendChatMessage);
  document.getElementById('chatInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });

  /* Content filter */
  document.querySelectorAll('.content-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.content-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderContentGrid(btn.dataset.cfilter);
    });
  });

  /* Task filter */
  document.querySelectorAll('.task-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.task-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTasksBoard(btn.dataset.filter);
    });
  });

  /* Admin btn */
  initAdminEvents();

  /* Content modal */
  document.getElementById('contentOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('contentOverlay')) closeContentModal();
  });
  document.getElementById('contentModalClose').addEventListener('click', closeContentModal);
}

/* ══════════════════════════════════════════════════════
   VIEWS
══════════════════════════════════════════════════════ */
function showView(viewName) {
  currentView = viewName;

  /* Activate view */
  document.querySelectorAll('.portal-view').forEach(v => v.classList.remove('active'));
  const viewEl = document.getElementById('view-' + viewName);
  if (viewEl) viewEl.classList.add('active');

  /* Active nav */
  document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });

  /* Topbar title */
  const titles = { overview: 'Resumen', tasks: 'Trabajos', content: 'Contenidos', metrics: 'Métricas', messages: 'Mensajes' };
  document.getElementById('topbarTitle').textContent = titles[viewName] || viewName;

  /* Close mobile sidebar */
  document.getElementById('portalSidebar').classList.remove('mobile-open');

  /* Render view */
  if (viewName === 'overview')  renderOverview();
  if (viewName === 'tasks')     renderTasksBoard('all');
  if (viewName === 'content')   renderContentGrid('all');
  if (viewName === 'metrics')   renderMetrics();
  if (viewName === 'messages')  renderChat();
  if (viewName === 'admin')     renderAdmin();
}

/* ══════════════════════════════════════════════════════
   OVERVIEW
══════════════════════════════════════════════════════ */
function renderOverview() {
  const c = currentClient;

  /* Header */
  document.getElementById('overviewHeader').innerHTML = `
    <div class="overview-welcome">
      <div class="overview-avatar">${c.avatar}</div>
      <div>
        <h2 class="overview-title">Hola, ${c.contact.split(' ')[0]} 👋</h2>
        <p class="overview-subtitle">${c.projectTitle} · <strong style="color:${c.planColor}">${c.projectPhase}</strong></p>
      </div>
    </div>
    <div class="overview-progress-wrap">
      <div class="overview-progress-top">
        <span class="prog-label">Progreso del proyecto</span>
        <span class="prog-pct">${c.projectProgress}%</span>
      </div>
      <div class="prog-bar"><div class="prog-fill" style="width:${c.projectProgress}%;background:${c.planColor}"></div></div>
    </div>
  `;

  /* KPIs */
  document.getElementById('portalKpis').innerHTML = c.kpis.map(k => `
    <div class="portal-kpi-card">
      <div class="kpi-icon">${k.icon}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-delta ${k.up ? 'kpi-up' : 'kpi-neutral'}">${k.delta}</div>
      <div class="kpi-label">${k.label}</div>
    </div>
  `).join('');

  /* Phase card */
  document.getElementById('phaseCard').innerHTML = `
    <div class="portal-card-header">
      <h3 class="portal-card-title">🗺️ Fases del proyecto</h3>
    </div>
    <div class="phase-list">
      ${c.phases.map((p, i) => `
        <div class="phase-item phase-${p.status}">
          <div class="phase-dot">${p.status === 'done' ? '✓' : p.status === 'active' ? '●' : (i+1)}</div>
          <div class="phase-info">
            <span class="phase-name">${p.name}</span>
            <span class="phase-date">${p.date}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  /* Messages preview */
  const msgs = loadMessages(currentClientKey).slice(-3);
  document.getElementById('messagesPreview').innerHTML = msgs.length ? msgs.map(m => `
    <div class="msg-preview ${m.from === 'rene' ? 'msg-rene' : 'msg-client'}">
      <div class="msg-preview-who">${m.from === 'rene' ? '👨‍💻 René' : '👤 Tú'}</div>
      <div class="msg-preview-text">${m.text.substring(0, 80)}${m.text.length > 80 ? '…' : ''}</div>
      <div class="msg-preview-ts">${formatTs(m.ts)}</div>
    </div>
  `).join('') : '<p class="empty-state">Sin mensajes aún.</p>';

  /* Recent tasks */
  const recent = c.tasks.filter(t => t.status !== 'completada').slice(0, 4);
  document.getElementById('recentTasks').innerHTML = recent.length ? recent.map(t => `
    <div class="task-row">
      <div class="task-row-info">
        <span class="task-row-title">${t.title}</span>
        <span class="task-row-date">📅 ${t.date}</span>
      </div>
      <div class="task-row-right">
        ${priorityLabel(t.priority)}
        ${statusLabel(t.status)}
      </div>
    </div>
  `).join('') : '<p class="empty-state">Todas las tareas completadas ✅</p>';

  /* Pending content */
  const pending = c.content.filter(ct => ct.status === 'pendiente_aprobacion').slice(0, 3);
  document.getElementById('pendingContentPreview').innerHTML = pending.length ? `
    <div class="content-mini-grid">
      ${pending.map(ct => `
        <div class="content-mini-card" onclick="openContentModal('${ct.id}')">
          <div class="cmc-thumb">${ct.thumb}</div>
          <div class="cmc-info">
            <div class="cmc-type">${ct.type} · ${ct.platform}</div>
            <div class="cmc-title">${ct.title}</div>
          </div>
          <button class="cmc-review-btn">Revisar →</button>
        </div>
      `).join('')}
    </div>
  ` : '<p class="empty-state">No hay contenidos pendientes de aprobación 🎉</p>';

  /* Re-bind card actions */
  document.querySelectorAll('.portal-card-action').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });
}

/* ══════════════════════════════════════════════════════
   TASKS BOARD
══════════════════════════════════════════════════════ */
function renderTasksBoard(filter = 'all') {
  const c = currentClient;
  const tasks = filter === 'all' ? c.tasks : c.tasks.filter(t => t.status === filter);

  const completed = tasks.filter(t => t.status === 'completada');
  const active    = tasks.filter(t => t.status === 'en_progreso');
  const pending   = tasks.filter(t => t.status === 'pendiente');

  const col = (title, items, colorClass) => `
    <div class="tasks-col">
      <div class="tasks-col-header ${colorClass}">
        <span>${title}</span>
        <span class="tcol-count">${items.length}</span>
      </div>
      ${items.length ? items.map(t => `
        <div class="task-card">
          <div class="task-card-title">${t.title}</div>
          <div class="task-card-meta">
            ${priorityLabel(t.priority)}
            <span class="task-date">📅 ${t.date}</span>
          </div>
        </div>
      `).join('') : '<p class="empty-col">Sin tareas</p>'}
    </div>
  `;

  if (filter === 'all') {
    document.getElementById('tasksBoard').innerHTML = `
      ${col('🔄 En progreso', active, 'tcol-active')}
      ${col('⏳ Pendientes', pending, 'tcol-pending')}
      ${col('✅ Completados', completed, 'tcol-done')}
    `;
  } else {
    document.getElementById('tasksBoard').innerHTML = `
      <div class="tasks-col tasks-col-single">
        ${tasks.length ? tasks.map(t => `
          <div class="task-card">
            <div class="task-card-title">${t.title}</div>
            <div class="task-card-meta">
              ${priorityLabel(t.priority)}
              ${statusLabel(t.status)}
              <span class="task-date">📅 ${t.date}</span>
            </div>
          </div>
        `).join('') : '<p class="empty-state">Sin tareas en esta categoría.</p>'}
      </div>
    `;
  }
}

/* ══════════════════════════════════════════════════════
   CONTENT GRID
══════════════════════════════════════════════════════ */
function renderContentGrid(filter = 'all') {
  const c = currentClient;
  const items = filter === 'all' ? c.content : c.content.filter(ct => ct.status === filter);

  document.getElementById('contentGrid').innerHTML = items.length ? items.map(ct => `
    <div class="content-item" onclick="openContentModal('${ct.id}')">
      <div class="content-item-thumb">${ct.thumb}</div>
      <div class="content-item-body">
        <div class="content-item-meta">
          <span class="content-type-tag">${ct.type}</span>
          <span class="content-platform">${ct.platform}</span>
        </div>
        <div class="content-item-title">${ct.title}</div>
        <div class="content-item-caption">${ct.caption.substring(0, 70)}…</div>
        ${contentStatusLabel(ct.status)}
      </div>
    </div>
  `).join('') : '<div class="empty-state-full"><p>No hay contenidos en esta categoría.</p></div>';
}

/* Content modal */
function openContentModal(contentId) {
  const ct = currentClient.content.find(c => c.id === contentId);
  if (!ct) return;

  const overlay = document.getElementById('contentOverlay');
  document.getElementById('contentModalBody').innerHTML = `
    <div class="cmodal-thumb">${ct.thumb}</div>
    <div class="cmodal-type">${ct.type} · ${ct.platform}</div>
    <h3 class="cmodal-title">${ct.title}</h3>
    <div class="cmodal-status">${contentStatusLabel(ct.status)}</div>
    <div class="cmodal-caption-box">
      <div class="cmodal-caption-label">Caption / descripción:</div>
      <p class="cmodal-caption">${ct.caption}</p>
    </div>
    ${ct.status === 'pendiente_aprobacion' ? `
      <div class="cmodal-actions">
        <button class="cmodal-approve" onclick="approveContent('${ct.id}')">✅ Aprobar contenido</button>
        <button class="cmodal-reject"  onclick="requestChanges('${ct.id}')">✏️ Solicitar cambios</button>
      </div>
    ` : ''}
  `;
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
window.openContentModal = openContentModal;

function closeContentModal() {
  document.getElementById('contentOverlay').style.display = 'none';
  document.body.style.overflow = '';
}

window.approveContent = function(id) {
  const ct = currentClient.content.find(c => c.id === id);
  if (ct) { ct.status = 'aprobado'; }
  closeContentModal();
  renderContentGrid('all');
  renderOverview();
  showNotification('✅ Contenido aprobado. René ha sido notificado.');
};
window.requestChanges = function(id) {
  closeContentModal();
  showNotification('✏️ Solicitud de cambios enviada a René.');
};

/* ══════════════════════════════════════════════════════
   METRICS
══════════════════════════════════════════════════════ */
function renderMetrics() {
  const m = currentClient.metrics;

  const hasAds  = m.ads.spend > 0;
  const hasSEO  = m.seo.score > 0;
  const hasSoc  = m.social.reach > 0;
  const hasWeb  = m.web.sessions > 0;

  document.getElementById('metricsContent').innerHTML = `
    <div class="metrics-grid">

      ${hasSEO ? `
      <div class="metric-card">
        <div class="metric-card-icon">🔍</div>
        <h4 class="metric-card-title">SEO Orgánico</h4>
        <div class="metric-score-ring">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="8"/>
            <circle cx="40" cy="40" r="34" fill="none" stroke="#00C8FF" stroke-width="8"
              stroke-dasharray="${2*Math.PI*34}" stroke-dashoffset="${2*Math.PI*34*(1-m.seo.score/100)}"
              stroke-linecap="round" transform="rotate(-90 40 40)"/>
          </svg>
          <span class="ring-value">${m.seo.score}</span>
        </div>
        <div class="metric-rows">
          <div class="metric-row"><span>Keywords posicionadas</span><strong>${m.seo.keywords}</strong></div>
          <div class="metric-row"><span>Top 1-5</span><strong>${m.seo.position1_5}</strong></div>
          <div class="metric-row"><span>Top 6-10</span><strong>${m.seo.position6_10}</strong></div>
        </div>
      </div>
      ` : ''}

      ${hasAds ? `
      <div class="metric-card">
        <div class="metric-card-icon">📢</div>
        <h4 class="metric-card-title">Google & Meta Ads</h4>
        <div class="metric-stat-big">€${m.ads.spend}<span class="stat-sub">/mes invertido</span></div>
        <div class="metric-rows">
          <div class="metric-row"><span>Clics totales</span><strong>${m.ads.clicks}</strong></div>
          <div class="metric-row"><span>CTR</span><strong>${m.ads.ctr}%</strong></div>
          <div class="metric-row"><span>Conversiones</span><strong>${m.ads.conversions}</strong></div>
          <div class="metric-row"><span>CPA</span><strong>€${m.ads.cpa}</strong></div>
        </div>
      </div>
      ` : ''}

      ${hasSoc ? `
      <div class="metric-card">
        <div class="metric-card-icon">📱</div>
        <h4 class="metric-card-title">Redes Sociales</h4>
        <div class="metric-stat-big">${m.social.reach.toLocaleString()}<span class="stat-sub">alcance</span></div>
        <div class="metric-rows">
          <div class="metric-row"><span>Impresiones</span><strong>${m.social.impressions.toLocaleString()}</strong></div>
          <div class="metric-row"><span>Engagement</span><strong>${m.social.engagement}%</strong></div>
          <div class="metric-row"><span>Nuevos seguidores</span><strong>+${m.social.followers}</strong></div>
        </div>
      </div>
      ` : ''}

      ${hasWeb ? `
      <div class="metric-card">
        <div class="metric-card-icon">🌐</div>
        <h4 class="metric-card-title">Web Analytics</h4>
        <div class="metric-stat-big">${m.web.sessions.toLocaleString()}<span class="stat-sub">sesiones</span></div>
        <div class="metric-rows">
          <div class="metric-row"><span>Tasa de rebote</span><strong>${m.web.bounce}%</strong></div>
          <div class="metric-row"><span>Tiempo medio</span><strong>${m.web.avgTime}</strong></div>
          <div class="metric-row"><span>Objetivos cumplidos</span><strong>${m.web.goals}</strong></div>
        </div>
      </div>
      ` : ''}

    </div>

    ${!hasAds && !hasSEO && !hasSoc && !hasWeb ? `
      <div class="metrics-empty">
        <div class="metrics-empty-icon">📊</div>
        <h3>Métricas en camino</h3>
        <p>Estamos en las primeras fases del proyecto. Las métricas aparecerán aquí a medida que avancen las campañas y el SEO empiece a generar datos.</p>
        <p style="color:var(--accent);margin-top:12px">Periodo activo: <strong>${m.period}</strong></p>
      </div>
    ` : `<p class="metrics-period">📅 Datos del periodo: <strong>${m.period}</strong></p>`}
  `;
}

/* ══════════════════════════════════════════════════════
   CHAT / MESSAGES
══════════════════════════════════════════════════════ */
function renderChat() {
  const msgs = loadMessages(currentClientKey);
  const chat = document.getElementById('chatMessages');

  chat.innerHTML = msgs.map(m => `
    <div class="chat-msg ${m.from === 'rene' ? 'chat-msg-rene' : 'chat-msg-client'}">
      <div class="chat-msg-who">${m.from === 'rene' ? '👨‍💻 René' : '👤 Tú'}</div>
      <div class="chat-msg-bubble">${m.text}</div>
      <div class="chat-msg-ts">${formatTs(m.ts)}</div>
    </div>
  `).join('');

  chat.scrollTop = chat.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;
  saveNewMessage(currentClientKey, text);
  input.value = '';
  renderChat();
  showNotification('💬 Mensaje enviado. René responderá en menos de 24h.');
}

/* ══════════════════════════════════════════════════════
   NOTIFICATION TOAST
══════════════════════════════════════════════════════ */
function showNotification(text) {
  let toast = document.getElementById('portalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portalToast';
    toast.className = 'portal-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ══════════════════════════════════════════════════════
   ADMIN PANEL — René only
   PIN: RAXIS-ADMIN (stored hashed concept; demo uses plain)
══════════════════════════════════════════════════════ */
const ADMIN_PIN   = 'RAXIS2025';
const ADMIN_KEY   = 'raxislab_admin_session';
let adminUnlocked = false;
let adminCurrentClient = Object.keys(PORTAL_CLIENTS)[0];

/* Check admin session */
function isAdminUnlocked() {
  try { return sessionStorage.getItem(ADMIN_KEY) === '1'; }
  catch { return false; }
}
function setAdminSession() {
  sessionStorage.setItem(ADMIN_KEY, '1');
  adminUnlocked = true;
}

/* Show admin PIN overlay */
function showAdminLogin() {
  document.getElementById('adminLoginOverlay').style.display = 'flex';
  document.getElementById('adminPinInput').value = '';
  document.getElementById('adminPinError').style.display = 'none';
  setTimeout(() => document.getElementById('adminPinInput').focus(), 100);
}

function hideAdminLogin() {
  document.getElementById('adminLoginOverlay').style.display = 'none';
}

/* Init admin events */
function initAdminEvents() {
  const adminBtn = document.getElementById('adminBtn');
  if (!adminBtn) return;

  /* Show admin button always (René sees it, clients see it too but need PIN) */
  adminBtn.style.display = '';

  adminBtn.addEventListener('click', () => {
    if (isAdminUnlocked()) {
      showView('admin');
    } else {
      showAdminLogin();
    }
  });

  document.getElementById('adminPinConfirm').addEventListener('click', checkAdminPin);
  document.getElementById('adminPinInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkAdminPin();
  });
  document.getElementById('adminPinCancel').addEventListener('click', hideAdminLogin);
}

function checkAdminPin() {
  const pin = document.getElementById('adminPinInput').value.trim().toUpperCase();
  if (pin === ADMIN_PIN.toUpperCase()) {
    setAdminSession();
    hideAdminLogin();
    showView('admin');
    document.getElementById('adminBtn').classList.add('active');
  } else {
    document.getElementById('adminPinError').style.display = '';
    document.getElementById('adminPinInput').value = '';
    document.getElementById('adminPinInput').classList.add('shake');
    setTimeout(() => document.getElementById('adminPinInput').classList.remove('shake'), 500);
  }
}

/* ── Render Admin Panel ── */
function renderAdmin() {
  const allClients = Object.entries(PORTAL_CLIENTS);

  /* Stats overview */
  const totalTasks     = allClients.reduce((s, [, c]) => s + c.tasks.length, 0);
  const pendingContent = allClients.reduce((s, [, c]) => s + c.content.filter(ct => ct.status === 'pendiente_aprobacion').length, 0);
  const totalMsgs      = allClients.reduce((s, [k]) => s + loadMessages(k).length, 0);
  const activeProjects = allClients.length;

  /* Build tabs HTML */
  const tabsHtml = allClients.map(([key, c]) => `
    <button class="admin-client-tab${key === adminCurrentClient ? ' active' : ''}"
            onclick="adminSelectClient('${key}')">
      ${c.avatar} ${c.name}
    </button>
  `).join('');

  const c = PORTAL_CLIENTS[adminCurrentClient];
  const msgs = loadMessages(adminCurrentClient);

  document.getElementById('adminContent').innerHTML = `
    <!-- Header -->
    <div class="admin-header-bar">
      <div>
        <div class="admin-badge">⚙️ PANEL ADMIN · RAXISLAB</div>
        <div style="margin-top:8px;font-size:13px;color:var(--text-muted);">
          Gestión interna de clientes y proyectos. Solo accesible para René.
        </div>
      </div>
      <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">
        ${new Date().toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long'})}
      </div>
    </div>

    <!-- Global stats -->
    <div class="admin-stats-bar">
      <div class="admin-stat-card">
        <div class="admin-stat-num">${activeProjects}</div>
        <div class="admin-stat-lbl">Clientes activos</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-num">${totalTasks}</div>
        <div class="admin-stat-lbl">Tareas totales</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-num" style="color:#FFA000;">${pendingContent}</div>
        <div class="admin-stat-lbl">Contenidos pendientes</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-num">${totalMsgs}</div>
        <div class="admin-stat-lbl">Mensajes totales</div>
      </div>
    </div>

    <!-- Client selector -->
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:10px;">Seleccionar cliente</div>
      <div class="admin-client-tabs">${tabsHtml}</div>
    </div>

    <!-- Client info editor -->
    <div class="admin-section">
      <div class="admin-section-title">👤 Datos del cliente — ${c.name}</div>
      <div class="admin-field-grid">
        <div class="admin-field">
          <label>Progreso del proyecto (%)</label>
          <input type="number" min="0" max="100" class="admin-input" id="adm-progress"
                 value="${c.projectProgress}" onchange="adminSaveProgress()"/>
        </div>
        <div class="admin-field">
          <label>Fase actual</label>
          <input type="text" class="admin-input" id="adm-phase"
                 value="${c.projectPhase}" onchange="adminSavePhase()"/>
        </div>
        <div class="admin-field">
          <label>Plan activo</label>
          <select class="admin-select" id="adm-plan" onchange="adminSavePlan()">
            <option value="Plan Básico"${c.planName==='Plan Básico'?' selected':''}>Plan Básico</option>
            <option value="Plan Estándar"${c.planName==='Plan Estándar'?' selected':''}>Plan Estándar</option>
            <option value="Plan Premium"${c.planName==='Plan Premium'?' selected':''}>Plan Premium</option>
          </select>
        </div>
        <div class="admin-field">
          <label>Periodo de métricas</label>
          <input type="text" class="admin-input" id="adm-period"
                 value="${c.metrics.period}" onchange="adminSavePeriod()"/>
        </div>
      </div>
      <div style="margin-top:16px;">
        <button class="admin-save-btn" onclick="adminSaveAll()">💾 Guardar cambios del cliente</button>
      </div>
    </div>

    <!-- Tasks manager -->
    <div class="admin-section">
      <div class="admin-section-title">✅ Gestión de tareas — ${c.name}</div>
      <div id="adminTaskList">
        ${c.tasks.map(t => `
          <div class="admin-task-row" id="adm-task-${t.id}">
            <div class="admin-task-title">${t.title}</div>
            <select class="admin-status-select" onchange="adminUpdateTaskStatus('${t.id}', this.value)">
              <option value="pendiente"${t.status==='pendiente'?' selected':''}>⏳ Pendiente</option>
              <option value="en_progreso"${t.status==='en_progreso'?' selected':''}>🔄 En progreso</option>
              <option value="completada"${t.status==='completada'?' selected':''}>✅ Completada</option>
            </select>
            <select class="admin-status-select" onchange="adminUpdateTaskPriority('${t.id}', this.value)">
              <option value="alta"${t.priority==='alta'?' selected':''}>🔴 Alta</option>
              <option value="media"${t.priority==='media'?' selected':''}>🟡 Media</option>
              <option value="baja"${t.priority==='baja'?' selected':''}>🟢 Baja</option>
            </select>
          </div>
        `).join('')}
      </div>
      <div class="admin-add-task-row">
        <input type="text" class="admin-input" id="newTaskTitle" placeholder="Nueva tarea…"/>
        <select class="admin-status-select" id="newTaskStatus">
          <option value="pendiente">⏳ Pendiente</option>
          <option value="en_progreso">🔄 En progreso</option>
        </select>
        <button class="admin-add-btn" onclick="adminAddTask()">+ Añadir tarea</button>
      </div>
    </div>

    <!-- Content status manager -->
    <div class="admin-section">
      <div class="admin-section-title">🎬 Gestión de contenidos — ${c.name}</div>
      ${c.content.length ? c.content.map(ct => `
        <div class="admin-task-row">
          <div style="font-size:18px;">${ct.thumb}</div>
          <div class="admin-task-title">${ct.title} <span style="font-size:11px;color:var(--text-muted);">(${ct.type} · ${ct.platform})</span></div>
          <select class="admin-status-select" onchange="adminUpdateContentStatus('${ct.id}', this.value)">
            <option value="borrador"${ct.status==='borrador'?' selected':''}>📝 Borrador</option>
            <option value="pendiente_aprobacion"${ct.status==='pendiente_aprobacion'?' selected':''}>⏳ Pendiente aprobación</option>
            <option value="aprobado"${ct.status==='aprobado'?' selected':''}>✅ Aprobado</option>
            <option value="publicado"${ct.status==='publicado'?' selected':''}>🚀 Publicado</option>
          </select>
        </div>
      `).join('') : '<p style="color:var(--text-muted);font-size:13px;padding:12px 0;">No hay contenidos para este cliente.</p>'}
      <!-- Add content -->
      <div class="admin-add-task-row" style="margin-top:16px;">
        <input type="text" class="admin-input" id="newContentTitle" placeholder="Título del contenido…"/>
        <select class="admin-status-select" id="newContentType">
          <option value="Reel">🎬 Reel</option>
          <option value="Post">📸 Post</option>
          <option value="Story">📊 Story</option>
          <option value="Video">📹 Vídeo</option>
        </select>
        <select class="admin-status-select" id="newContentPlatform">
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
          <option value="LinkedIn">LinkedIn</option>
        </select>
        <button class="admin-add-btn" onclick="adminAddContent()">+ Añadir</button>
      </div>
    </div>

    <!-- Chat as René -->
    <div class="admin-section">
      <div class="admin-section-title">💬 Mensajes con ${c.contact} (${c.name})</div>
      <div class="admin-chat-wrap">
        <div class="admin-chat-header">
          <span>👨‍💻 Respondiendo como René</span>
          <span style="margin-left:auto;font-size:11px;">${msgs.length} mensaje${msgs.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="admin-chat-messages" id="adminChatMessages">
          ${msgs.map(m => `
            <div class="chat-msg ${m.from === 'rene' ? 'chat-msg-rene' : 'chat-msg-client'}">
              <div class="chat-msg-who">${m.from === 'rene' ? '👨‍💻 René' : '👤 ' + c.contact.split(' ')[0]}</div>
              <div class="chat-msg-bubble">${m.text}</div>
              <div class="chat-msg-ts">${formatTs(m.ts)}</div>
            </div>
          `).join('')}
        </div>
        <div class="admin-chat-input-row">
          <textarea class="admin-chat-input" id="adminChatInput" rows="2"
                    placeholder="Escribe un mensaje como René…"></textarea>
          <button class="admin-send-btn" onclick="adminSendMessage()">Enviar →</button>
        </div>
      </div>
    </div>
  `;

  /* Scroll admin chat */
  setTimeout(() => {
    const ch = document.getElementById('adminChatMessages');
    if (ch) ch.scrollTop = ch.scrollHeight;
  }, 50);
}
window.renderAdmin = renderAdmin;

/* Select client in admin */
window.adminSelectClient = function(key) {
  adminCurrentClient = key;
  renderAdmin();
};

/* Save project progress */
window.adminSaveProgress = function() {
  const val = parseInt(document.getElementById('adm-progress').value, 10);
  if (!isNaN(val) && val >= 0 && val <= 100) {
    PORTAL_CLIENTS[adminCurrentClient].projectProgress = val;
  }
};
window.adminSavePhase = function() {
  PORTAL_CLIENTS[adminCurrentClient].projectPhase = document.getElementById('adm-phase').value;
};
window.adminSavePlan = function() {
  PORTAL_CLIENTS[adminCurrentClient].planName = document.getElementById('adm-plan').value;
};
window.adminSavePeriod = function() {
  PORTAL_CLIENTS[adminCurrentClient].metrics.period = document.getElementById('adm-period').value;
};

/* Save all client changes + persist via API */
window.adminSaveAll = async function() {
  adminSaveProgress();
  adminSavePhase();
  adminSavePlan();
  adminSavePeriod();

  const c = PORTAL_CLIENTS[adminCurrentClient];

  /* Persist to Table API */
  try {
    await fetch('tables/portal_client_updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: `upd_${adminCurrentClient}_${Date.now()}`,
        client_key: adminCurrentClient,
        field: 'bulk_update',
        value: JSON.stringify({
          progress: c.projectProgress,
          phase: c.projectPhase,
          plan: c.planName,
          period: c.metrics.period
        }),
        updated_by: 'rene',
        ts: Date.now()
      })
    });
  } catch(e) { console.warn('API no disponible, cambios solo en memoria:', e); }

  showNotification('✅ Cambios guardados para ' + c.name);
};

/* Update task status */
window.adminUpdateTaskStatus = function(taskId, newStatus) {
  const c = PORTAL_CLIENTS[adminCurrentClient];
  const t = c.tasks.find(t => t.id === taskId);
  if (t) t.status = newStatus;
  showNotification('✅ Estado actualizado');
};
window.adminUpdateTaskPriority = function(taskId, newPriority) {
  const c = PORTAL_CLIENTS[adminCurrentClient];
  const t = c.tasks.find(t => t.id === taskId);
  if (t) t.priority = newPriority;
};

/* Add new task */
window.adminAddTask = function() {
  const title = document.getElementById('newTaskTitle').value.trim();
  const status = document.getElementById('newTaskStatus').value;
  if (!title) return;
  const c = PORTAL_CLIENTS[adminCurrentClient];
  const newTask = {
    id: 't_' + Date.now(),
    title,
    status,
    priority: 'media',
    date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
  };
  c.tasks.push(newTask);
  document.getElementById('newTaskTitle').value = '';
  renderAdmin();
  showNotification('✅ Tarea añadida a ' + c.name);
};

/* Update content status */
window.adminUpdateContentStatus = function(contentId, newStatus) {
  const c = PORTAL_CLIENTS[adminCurrentClient];
  const ct = c.content.find(ct => ct.id === contentId);
  if (ct) ct.status = newStatus;
  showNotification('✅ Estado de contenido actualizado');
};

/* Add new content item */
window.adminAddContent = function() {
  const title = document.getElementById('newContentTitle').value.trim();
  const type  = document.getElementById('newContentType').value;
  const plat  = document.getElementById('newContentPlatform').value;
  if (!title) return;
  const thumbMap = { Reel: '🎬', Post: '📸', Story: '📊', Video: '📹' };
  const c = PORTAL_CLIENTS[adminCurrentClient];
  c.content.push({
    id: 'c_' + Date.now(),
    type, title,
    platform: plat,
    status: 'borrador',
    thumb: thumbMap[type] || '📄',
    caption: ''
  });
  document.getElementById('newContentTitle').value = '';
  renderAdmin();
  showNotification('✅ Contenido añadido');
};

/* Admin send message as René */
window.adminSendMessage = async function() {
  const input = document.getElementById('adminChatInput');
  const text  = input.value.trim();
  if (!text) return;

  const msgData = {
    id: 'rene_' + Date.now(),
    from: 'rene',
    text,
    ts: Date.now()
  };

  /* Add to in-memory client data */
  const key = getMsgKey(adminCurrentClient);
  let stored = [];
  try { stored = JSON.parse(localStorage.getItem(key)) || []; } catch {}
  stored.push(msgData);
  localStorage.setItem(key, JSON.stringify(stored));

  /* Persist to Table API */
  try {
    await fetch('tables/portal_messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: msgData.id,
        client_key: adminCurrentClient,
        from_role: 'rene',
        text: msgData.text,
        ts: msgData.ts,
        read: false
      })
    });
  } catch(e) { console.warn('API message save failed:', e); }

  input.value = '';
  renderAdmin();
  showNotification('💬 Mensaje enviado a ' + PORTAL_CLIENTS[adminCurrentClient].contact);
};
