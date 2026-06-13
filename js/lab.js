/* ============================================================
   RAXISLAB — lab.js v4.0 — Admin Auth + Read-Only Mode
   ============================================================
   ROLES:
     · visitor  → ve los clientes y sus reportes (iframes). NO puede
                  añadir, editar ni eliminar clientes ni URLs.
     · admin    → acceso total. PIN almacenado en ADMIN_PIN (cámbialo).
   
   Para cambiar el PIN: edita la constante ADMIN_PIN.
   La sesión admin dura SESSION_MINUTES minutos sin actividad.
   ============================================================ */

'use strict';

/* ── CONFIG ── */
const ADMIN_PIN       = '2024';   // ← CAMBIA ESTO por tu PIN
const SESSION_MINUTES = 30;       // minutos de inactividad antes de cerrar sesión

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════════════
     STORAGE
  ══════════════════════════════════════════════════════ */
  const STORAGE_KEY = 'raxislab_clients_v3';
  const AUTH_KEY    = 'raxislab_admin_session';

  function loadClients() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveClients(c) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  }
  function generateId() {
    return 'cl_' + Math.random().toString(36).substr(2, 9);
  }

  /* ══════════════════════════════════════════════════════
     AUTH — session stored in sessionStorage (tab-scoped)
  ══════════════════════════════════════════════════════ */
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(AUTH_KEY)) || null; }
    catch { return null; }
  }
  function setSession() {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify({ ts: Date.now() }));
    resetIdleTimer();
  }
  function clearSession() {
    sessionStorage.removeItem(AUTH_KEY);
  }
  function isAdminActive() {
    const s = getSession();
    if (!s) return false;
    const expired = (Date.now() - s.ts) > SESSION_MINUTES * 60 * 1000;
    if (expired) { clearSession(); return false; }
    return true;
  }
  function touchSession() {
    if (isAdminActive()) setSession();
  }

  /* Idle timer — auto-logout after SESSION_MINUTES */
  let idleTimer = null;
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (getSession()) {
        clearSession();
        enterVisitorMode();
        showToast('Sesión admin cerrada por inactividad.', 'warn');
      }
    }, SESSION_MINUTES * 60 * 1000);
  }
  document.addEventListener('mousemove',  touchSession, { passive: true });
  document.addEventListener('keydown',    touchSession, { passive: true });
  document.addEventListener('touchstart', touchSession, { passive: true });

  /* ══════════════════════════════════════════════════════
     STATE
  ══════════════════════════════════════════════════════ */
  let clients        = loadClients();
  let activeClientId = null;
  let activeChannel  = 'ga4';
  let editingClientId = null;

  const CHANNELS = {
    ga4:    { name: 'Google Analytics 4',      color: '#FBBC04' },
    gads:   { name: 'Google Ads',              color: '#4285F4' },
    meta:   { name: 'Meta Ads',               color: '#1877F2' },
    gsc:    { name: 'Search Console',         color: '#34A853' },
    custom: { name: 'Dashboard Personalizado', color: '#00C8FF' },
  };

  const AVATAR_COLORS = [
    '#00C8FF','#00FF82','#BF5AF2','#FFD60A',
    '#FF6B6B','#4ECDC4','#45B7D1','#96E6A1',
    '#FF8C42','#C77DFF'
  ];
  function getAvatarColor(id) {
    return AVATAR_COLORS[(id?.charCodeAt(id.length - 1) || 0) % AVATAR_COLORS.length];
  }

  /* ══════════════════════════════════════════════════════
     CLOCK
  ══════════════════════════════════════════════════════ */
  const labTimeEl = document.getElementById('labTime');
  const labDateEl = document.getElementById('labDate');
  function updateClock() {
    const now = new Date();
    if (labTimeEl) labTimeEl.textContent = now.toTimeString().split(' ')[0];
    if (labDateEl) labDateEl.textContent = now.toLocaleDateString('es-ES', {
      weekday: 'short', day: '2-digit', month: 'short'
    }).toUpperCase();
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ══════════════════════════════════════════════════════
     MODE CONTROL — admin vs visitor
  ══════════════════════════════════════════════════════ */
  const adminBadge   = document.getElementById('adminBadge');
  const visitorBadge = document.getElementById('visitorBadge');
  const adminBtn     = document.getElementById('openAddClientModal');
  const adminOnlyEls = document.querySelectorAll('[data-admin-only]');

  function applyAdminUI(isAdmin) {
    document.body.classList.toggle('admin-mode',   isAdmin);
    document.body.classList.toggle('visitor-mode', !isAdmin);

    if (adminBadge)   adminBadge.style.display   = isAdmin ? 'flex' : 'none';
    if (visitorBadge) visitorBadge.style.display  = isAdmin ? 'none' : 'flex';

    adminOnlyEls.forEach(el => {
      el.style.display = isAdmin ? '' : 'none';
    });

    // Lock / unlock topbar btn
    const topbarLogoutBtn = document.getElementById('topbarLogoutBtn');
    if (topbarLogoutBtn) topbarLogoutBtn.style.display = isAdmin ? 'flex' : 'none';

    // Update role label
    const roleLabel = document.getElementById('labRoleLabel');
    if (roleLabel) roleLabel.textContent = isAdmin ? 'Administrador' : 'Visitante';
  }

  function enterAdminMode() {
    setSession();
    applyAdminUI(true);
    renderSidebar();
    showToast('Sesión admin iniciada ✓', 'success');
  }

  function enterVisitorMode() {
    clearSession();
    applyAdminUI(false);
    renderSidebar();
    // Close any open modals
    ['clientModal','configModal','loginModal'].forEach(id => closeModal(id));
  }

  /* ══════════════════════════════════════════════════════
     LOGIN MODAL
  ══════════════════════════════════════════════════════ */
  const loginModal     = document.getElementById('loginModal');
  const loginPinInput  = document.getElementById('loginPinInput');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');
  const loginErrorMsg  = document.getElementById('loginErrorMsg');
  const loginCancelBtn = document.getElementById('loginCancelBtn');
  const loginCloseBtn  = document.getElementById('loginModalClose');

  function openLoginModal() {
    if (!loginModal) return;
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (loginPinInput) {
      loginPinInput.value = '';
      loginErrorMsg.style.display = 'none';
      setTimeout(() => loginPinInput.focus(), 100);
    }
  }

  function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = '';
    if (loginPinInput) loginPinInput.value = '';
    if (loginErrorMsg) loginErrorMsg.style.display = 'none';
  }

  function attemptLogin() {
    const pin = (loginPinInput?.value || '').trim();
    if (pin === ADMIN_PIN) {
      closeLoginModal();
      enterAdminMode();
    } else {
      if (loginErrorMsg) {
        loginErrorMsg.style.display = 'flex';
        loginErrorMsg.textContent   = '❌ PIN incorrecto';
      }
      if (loginPinInput) {
        loginPinInput.value = '';
        loginPinInput.style.borderColor = '#FF453A';
        setTimeout(() => {
          loginPinInput.style.borderColor = '';
          loginPinInput.focus();
        }, 1000);
      }
    }
  }

  loginSubmitBtn?.addEventListener('click',  attemptLogin);
  loginCancelBtn?.addEventListener('click',  closeLoginModal);
  loginCloseBtn?.addEventListener('click',   closeLoginModal);
  loginPinInput?.addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });
  loginModal?.addEventListener('click', e => {
    if (e.target === loginModal) closeLoginModal();
  });

  /* Admin login trigger — click logo 5× */
  let logoClicks = 0, logoTimer = null;
  document.querySelector('.nav-logo')?.addEventListener('click', e => {
    if (isAdminActive()) return; // already admin
    e.preventDefault();
    logoClicks++;
    clearTimeout(logoTimer);
    if (logoClicks >= 5) { logoClicks = 0; openLoginModal(); return; }
    logoTimer = setTimeout(() => { logoClicks = 0; }, 2000);
  });

  /* Topbar "Acceso Admin" button (visitor mode) */
  document.getElementById('visitorLoginBtn')?.addEventListener('click', openLoginModal);

  /* Topbar logout */
  document.getElementById('topbarLogoutBtn')?.addEventListener('click', () => {
    if (confirm('¿Cerrar sesión de administrador?')) enterVisitorMode();
  });

  /* ══════════════════════════════════════════════════════
     RENDER SIDEBAR
  ══════════════════════════════════════════════════════ */
  function renderSidebar(filter = '') {
    const list  = document.getElementById('clientList');
    const badge = document.getElementById('clientCountBadge');
    if (!list) return;

    const filtered = clients.filter(c =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      (c.service || '').toLowerCase().includes(filter.toLowerCase())
    );

    if (badge) badge.textContent = clients.length + (clients.length === 1 ? ' cliente' : ' clientes');

    if (filtered.length === 0) {
      list.innerHTML = `<li style="padding:20px 8px;text-align:center;">
        <span class="text-muted" style="font-size:12px;">${filter ? 'Sin resultados' : isAdminActive() ? 'Sin clientes aún. Añade el primero →' : 'No hay clientes configurados.'}</span>
      </li>`;
      return;
    }

    list.innerHTML = filtered.map(c => {
      const color   = getAvatarColor(c.id);
      const initial = (c.name || '?').charAt(0).toUpperCase();
      const isAct   = c.id === activeClientId;
      return `
        <li class="lab-client-item ${isAct ? 'active' : ''}" data-id="${c.id}">
          <div class="client-item-avatar" style="background:${color};">${initial}</div>
          <div class="client-item-info">
            <div class="client-item-name">${escHtml(c.name)}</div>
            <div class="client-item-service">${escHtml(c.service || 'Sin servicio')}</div>
          </div>
          <div class="client-item-right">
            <span class="status-pill ${statusClass(c.status)}" style="font-size:9px;padding:2px 7px;">${c.status || 'Activo'}</span>
            <div class="client-reports-count">${buildReportDots(c)}</div>
          </div>
        </li>`;
    }).join('');

    list.querySelectorAll('.lab-client-item').forEach(item => {
      item.addEventListener('click', () => selectClient(item.dataset.id));
    });
  }

  function buildReportDots(client) {
    return ['ga4','gads','meta','gsc','custom'].map(ch => {
      const has = !!(client.urls && client.urls[ch]);
      return `<span class="report-dot ${has ? 'active' : ''}" title="${CHANNELS[ch].name}"></span>`;
    }).join('');
  }

  /* ══════════════════════════════════════════════════════
     SELECT CLIENT
  ══════════════════════════════════════════════════════ */
  function selectClient(id) {
    activeClientId = id;
    activeChannel  = 'ga4';
    renderSidebar(document.getElementById('clientSearch')?.value || '');
    const client = clients.find(c => c.id === id);
    if (client) showClientDashboard(client);
  }

  function showClientDashboard(client) {
    document.getElementById('labEmptyState').style.display     = 'none';
    document.getElementById('labClientDashboard').style.display = 'block';

    const color   = getAvatarColor(client.id);
    const initial = (client.name || '?').charAt(0).toUpperCase();

    const avatar = document.getElementById('dashAvatar');
    if (avatar) { avatar.textContent = initial; avatar.style.background = color; }

    const setText = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
    setText('dashName',    client.name    || '—');
    setText('dashService', client.service || 'Sin servicio');
    setText('dashSince',   client.since   || '—');

    const statusEl = document.getElementById('dashStatus');
    if (statusEl) {
      statusEl.textContent = client.status || 'Activo';
      statusEl.className   = 'status-pill ' + statusClass(client.status);
    }

    // Edit button visibility (admin only)
    const editBtn = document.getElementById('editClientBtn');
    if (editBtn) editBtn.style.display = isAdminActive() ? '' : 'none';

    // Tabs
    document.querySelectorAll('.lab-report-tab').forEach(tab => {
      const ch = tab.dataset.channel;
      tab.classList.toggle('has-url', !!(client.urls && client.urls[ch]));
      if (!tab.querySelector('.tab-configured-dot')) {
        const dot = document.createElement('span');
        dot.className = 'tab-configured-dot';
        tab.appendChild(dot);
      }
    });

    renderChannelTab(client, activeChannel);
  }

  /* ══════════════════════════════════════════════════════
     CHANNEL TAB
  ══════════════════════════════════════════════════════ */
  function renderChannelTab(client, channel) {
    const area = document.getElementById('labIframeArea');
    const url  = client.urls?.[channel];
    const ch   = CHANNELS[channel];

    if (url) {
      area.innerHTML = buildIframePanel(client, channel, url, ch);
      const iframe = area.querySelector('.looker-iframe');
      const loader = area.querySelector('.iframe-loading');
      if (iframe && loader) {
        iframe.addEventListener('load', () => {
          loader.classList.add('hidden');
          setTimeout(() => loader.remove(), 600);
        });
      }
      area.querySelector('.btn-iframe-reload')?.addEventListener('click', () => {
        if (iframe) { const s = iframe.src; iframe.src = ''; iframe.src = s; }
      });
    } else {
      area.innerHTML = buildSetupPrompt(client, channel, ch);

      if (isAdminActive()) {
        area.querySelector('.btn-quick-save')?.addEventListener('click', () => {
          const input = area.querySelector('.setup-url-input');
          const val   = (input?.value || '').trim();
          if (!val) { input?.focus(); return; }
          if (!isValidLookerUrl(val)) {
            if (input) { input.style.borderColor = '#FF453A'; setTimeout(() => input.style.borderColor = '', 1500); }
            return;
          }
          setClientUrl(client.id, channel, val);
          const updated = clients.find(c => c.id === client.id);
          if (updated) { renderSidebar(); showClientDashboard(updated); renderChannelTab(updated, channel); }
        });
        area.querySelector('.setup-url-input')?.addEventListener('keydown', e => {
          if (e.key === 'Enter') area.querySelector('.btn-quick-save')?.click();
        });
        area.querySelector('.btn-open-config')?.addEventListener('click', () => openConfigModal(client));
      }
    }
  }

  function buildIframePanel(client, channel, url, chInfo) {
    const shortUrl = url.length > 55 ? url.substring(0, 52) + '...' : url;
    return `
      <div class="iframe-panel active">
        <div class="iframe-wrapper">
          <div class="iframe-toolbar">
            <div class="iframe-toolbar-left">
              <div class="iframe-source-icon looker-field-icon ${channel}">${channelSVG(channel)}</div>
              <div>
                <div class="iframe-source-name">${chInfo.name}</div>
                <div class="iframe-source-url" title="${escHtml(url)}">${escHtml(shortUrl)}</div>
              </div>
            </div>
            <div class="iframe-toolbar-right">
              <span class="badge badge-green badge-dot" style="font-size:10px;">Live</span>
              <button class="iframe-action-btn btn-iframe-reload">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
                Recargar
              </button>
              <a class="iframe-action-btn" href="${escHtml(url)}" target="_blank" rel="noopener">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                Abrir
              </a>
            </div>
          </div>
          <div class="iframe-loading" id="iframeLoading_${channel}">
            <div class="iframe-loading-ring"></div>
            <div class="iframe-loading-text">CARGANDO REPORTE...</div>
          </div>
          <iframe
            class="looker-iframe"
            src="${escHtml(url)}"
            allowfullscreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
            loading="lazy"
          ></iframe>
        </div>
      </div>`;
  }

  function buildSetupPrompt(client, channel, chInfo) {
    const hints = {
      ga4:    'Conecta Google Analytics 4 para ver tráfico, usuarios, sesiones y conversiones.',
      gads:   'Conecta Google Ads para monitorizar campañas, ROAS, CPC e impresiones.',
      meta:   'Conecta Meta Ads (Facebook + Instagram) para ver alcance, CPM y ROAS.',
      gsc:    'Conecta Search Console para analizar impresiones, clics, CTR y posición media.',
      custom: 'Añade cualquier reporte personalizado de Looker Studio.',
    };

    if (isAdminActive()) {
      // Admin: can enter URL
      return `
        <div class="iframe-panel active">
          <div class="iframe-setup-prompt">
            <div class="setup-prompt-icon">${channelSVG(channel, 24)}</div>
            <div class="setup-prompt-title">${chInfo.name}</div>
            <p class="setup-prompt-desc">${hints[channel]}</p>
            <div class="setup-inline-form">
              <input type="url" class="setup-url-input" placeholder="https://lookerstudio.google.com/embed/reporting/..."/>
              <button class="btn btn-primary btn-quick-save" style="white-space:nowrap;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Cargar reporte
              </button>
            </div>
            <div class="setup-steps">
              <div class="setup-steps-title">CÓMO OBTENER LA URL EN 4 PASOS</div>
              <ol>
                <li>Abre tu reporte en <strong>lookerstudio.google.com</strong></li>
                <li>Haz clic en <strong>Compartir → Incrustar informe</strong></li>
                <li>Activa <strong>"Habilitar incrustación"</strong></li>
                <li>Copia la URL del atributo <code>src</code> del iframe</li>
              </ol>
            </div>
            <button class="btn btn-ghost" style="margin-top:16px;font-size:12px;" class="btn-open-config">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              Configurar todos los reportes
            </button>
          </div>
        </div>`;
    } else {
      // Visitor: informational only
      return `
        <div class="iframe-panel active">
          <div class="iframe-setup-prompt visitor-setup-prompt">
            <div class="setup-prompt-icon" style="opacity:.5;">${channelSVG(channel, 24)}</div>
            <div class="setup-prompt-title">${chInfo.name}</div>
            <p class="setup-prompt-desc" style="opacity:.6;">
              Este reporte aún no ha sido configurado o no está disponible públicamente.
            </p>
            <div class="visitor-lock-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Acceso restringido
            </div>
          </div>
        </div>`;
    }
  }

  /* ══════════════════════════════════════════════════════
     TAB SWITCHING
  ══════════════════════════════════════════════════════ */
  document.getElementById('labReportTabs')?.addEventListener('click', e => {
    const tab = e.target.closest('.lab-report-tab');
    if (!tab) return;
    document.querySelectorAll('.lab-report-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeChannel = tab.dataset.channel;
    const client = clients.find(c => c.id === activeClientId);
    if (client) renderChannelTab(client, activeChannel);
  });

  /* ══════════════════════════════════════════════════════
     ADD / EDIT CLIENT MODAL (admin only)
  ══════════════════════════════════════════════════════ */
  function openAddClientModal(editId = null) {
    if (!isAdminActive()) { openLoginModal(); return; }
    editingClientId = editId;
    const modal  = document.getElementById('clientModal');
    const title  = document.getElementById('modalTitle');
    const delBtn = document.getElementById('deleteClientBtn');

    if (editId) {
      const c = clients.find(cl => cl.id === editId);
      if (!c) return;
      title.textContent = 'Editar Cliente';
      delBtn.style.display = 'flex';
      populateModal(c);
    } else {
      title.textContent = 'Nuevo Cliente';
      delBtn.style.display = 'none';
      clearModal();
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('mClientName')?.focus();
  }

  function closeModal(id = 'clientModal') {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
    document.body.style.overflow = '';
  }

  function populateModal(c) {
    const sv = (id, val) => { const e = document.getElementById(id); if (e) e.value = val; };
    sv('mClientName',    c.name    || '');
    sv('mClientService', c.service || '');
    sv('mClientStatus',  c.status  || 'Activo');
    sv('mClientSince',   c.since   || '');
    sv('mClientNotes',   c.notes   || '');
    sv('mUrlGA4',        c.urls?.ga4    || '');
    sv('mUrlGAds',       c.urls?.gads   || '');
    sv('mUrlMeta',       c.urls?.meta   || '');
    sv('mUrlGSC',        c.urls?.gsc    || '');
    sv('mUrlCustom',     c.urls?.custom || '');
    updateModalStatusDots(c);
  }

  function clearModal() {
    ['mClientName','mClientService','mClientSince','mClientNotes',
     'mUrlGA4','mUrlGAds','mUrlMeta','mUrlGSC','mUrlCustom'].forEach(id => {
      const e = document.getElementById(id); if (e) e.value = '';
    });
    const st = document.getElementById('mClientStatus'); if (st) st.value = 'Activo';
    ['statusGA4','statusGAds','statusMeta','statusGSC','statusCustom'].forEach(id => setStatusDot(id, false));
  }

  function updateModalStatusDots(c) {
    setStatusDot('statusGA4',    !!(c.urls?.ga4));
    setStatusDot('statusGAds',   !!(c.urls?.gads));
    setStatusDot('statusMeta',   !!(c.urls?.meta));
    setStatusDot('statusGSC',    !!(c.urls?.gsc));
    setStatusDot('statusCustom', !!(c.urls?.custom));
  }

  function setStatusDot(id, active) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = active
      ? `<span class="status-dot active"></span><span style="color:#00FF82;">Configurado</span>`
      : `<span class="status-dot inactive"></span><span>Sin configurar</span>`;
  }

  ['mUrlGA4','mUrlGAds','mUrlMeta','mUrlGSC','mUrlCustom'].forEach((inputId, i) => {
    const statusIds = ['statusGA4','statusGAds','statusMeta','statusGSC','statusCustom'];
    document.getElementById(inputId)?.addEventListener('input', function() {
      setStatusDot(statusIds[i], this.value.trim().length > 20);
    });
  });

  document.getElementById('saveClientBtn')?.addEventListener('click', () => {
    if (!isAdminActive()) return;
    const nameEl = document.getElementById('mClientName');
    const name   = nameEl?.value.trim();
    if (!name) {
      if (nameEl) { nameEl.style.borderColor = '#FF453A'; nameEl.focus(); setTimeout(() => nameEl.style.borderColor = '', 1500); }
      return;
    }
    const urls = {
      ga4:    document.getElementById('mUrlGA4')?.value.trim()    || '',
      gads:   document.getElementById('mUrlGAds')?.value.trim()   || '',
      meta:   document.getElementById('mUrlMeta')?.value.trim()   || '',
      gsc:    document.getElementById('mUrlGSC')?.value.trim()    || '',
      custom: document.getElementById('mUrlCustom')?.value.trim() || '',
    };

    if (editingClientId) {
      const idx = clients.findIndex(c => c.id === editingClientId);
      if (idx > -1) clients[idx] = { ...clients[idx], name,
        service: document.getElementById('mClientService')?.value.trim() || '',
        status:  document.getElementById('mClientStatus')?.value || 'Activo',
        since:   document.getElementById('mClientSince')?.value.trim() || '',
        notes:   document.getElementById('mClientNotes')?.value.trim() || '',
        urls };
    } else {
      clients.push({ id: generateId(), name,
        service: document.getElementById('mClientService')?.value.trim() || '',
        status:  document.getElementById('mClientStatus')?.value || 'Activo',
        since:   document.getElementById('mClientSince')?.value.trim() || '',
        notes:   document.getElementById('mClientNotes')?.value.trim() || '',
        urls });
    }

    saveClients(clients);
    renderSidebar();
    closeModal('clientModal');

    if (editingClientId === activeClientId) {
      const c = clients.find(c => c.id === activeClientId);
      if (c) showClientDashboard(c);
    }
    if (!editingClientId) selectClient(clients[clients.length - 1].id);
    showToast(editingClientId ? 'Cliente actualizado ✓' : 'Cliente añadido ✓', 'success');
  });

  document.getElementById('deleteClientBtn')?.addEventListener('click', () => {
    if (!isAdminActive() || !editingClientId) return;
    if (!confirm('¿Eliminar este cliente y todos sus reportes?')) return;
    clients = clients.filter(c => c.id !== editingClientId);
    saveClients(clients);
    if (activeClientId === editingClientId) {
      activeClientId = null;
      document.getElementById('labEmptyState').style.display     = 'flex';
      document.getElementById('labClientDashboard').style.display = 'none';
    }
    renderSidebar();
    closeModal('clientModal');
    showToast('Cliente eliminado.', 'warn');
  });

  document.getElementById('openAddClientModal')?.addEventListener('click', () => openAddClientModal());
  document.getElementById('emptyAddBtn')?.addEventListener('click',        () => openAddClientModal());
  document.getElementById('editClientBtn')?.addEventListener('click', () => {
    if (activeClientId) openAddClientModal(activeClientId);
  });

  document.getElementById('closeModal')?.addEventListener('click',     () => closeModal('clientModal'));
  document.getElementById('cancelModalBtn')?.addEventListener('click', () => closeModal('clientModal'));
  document.getElementById('clientModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('clientModal')) closeModal('clientModal');
  });

  /* ══════════════════════════════════════════════════════
     CONFIG REPORTS MODAL (admin only)
  ══════════════════════════════════════════════════════ */
  function openConfigModal(client) {
    if (!isAdminActive()) return;
    const modal  = document.getElementById('configModal');
    const fields = document.getElementById('configFields');
    if (!fields) return;

    fields.innerHTML = ['ga4','gads','meta','gsc','custom'].map(ch => `
      <div class="modal-looker-field">
        <div class="looker-field-header">
          <div class="looker-field-icon ${ch}">${channelSVG(ch, 14)}</div>
          <div>
            <div class="looker-field-name">${CHANNELS[ch].name}</div>
          </div>
          <div class="looker-field-status" id="cfgStatus_${ch}">
            <span class="status-dot ${client.urls?.[ch] ? 'active' : 'inactive'}"></span>
            <span>${client.urls?.[ch] ? 'Configurado' : 'Sin configurar'}</span>
          </div>
        </div>
        <input type="url" class="form-control looker-url-input" id="cfgUrl_${ch}"
          value="${escHtml(client.urls?.[ch] || '')}"
          placeholder="https://lookerstudio.google.com/embed/reporting/..."/>
      </div>`).join('');

    ['ga4','gads','meta','gsc','custom'].forEach(ch => {
      document.getElementById(`cfgUrl_${ch}`)?.addEventListener('input', function() {
        const el = document.getElementById(`cfgStatus_${ch}`);
        if (!el) return;
        el.innerHTML = this.value.trim().length > 20
          ? `<span class="status-dot active"></span><span style="color:#00FF82;">Configurado</span>`
          : `<span class="status-dot inactive"></span><span>Sin configurar</span>`;
      });
    });

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  document.getElementById('configReportsBtn')?.addEventListener('click', () => {
    if (!isAdminActive()) return;
    const client = clients.find(c => c.id === activeClientId);
    if (client) openConfigModal(client);
  });

  document.getElementById('saveConfigBtn')?.addEventListener('click', () => {
    if (!isAdminActive()) return;
    const idx = clients.findIndex(c => c.id === activeClientId);
    if (idx < 0) return;
    clients[idx].urls = {
      ga4:    document.getElementById('cfgUrl_ga4')?.value.trim()    || '',
      gads:   document.getElementById('cfgUrl_gads')?.value.trim()   || '',
      meta:   document.getElementById('cfgUrl_meta')?.value.trim()   || '',
      gsc:    document.getElementById('cfgUrl_gsc')?.value.trim()    || '',
      custom: document.getElementById('cfgUrl_custom')?.value.trim() || '',
    };
    saveClients(clients);
    closeModal('configModal');
    renderSidebar();
    showClientDashboard(clients[idx]);
    renderChannelTab(clients[idx], activeChannel);
    showToast('Reportes guardados ✓', 'success');
  });

  document.getElementById('closeConfigModal')?.addEventListener('click',  () => closeModal('configModal'));
  document.getElementById('cancelConfigBtn')?.addEventListener('click',   () => closeModal('configModal'));
  document.getElementById('configModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('configModal')) closeModal('configModal');
  });

  /* ══════════════════════════════════════════════════════
     SEARCH
  ══════════════════════════════════════════════════════ */
  document.getElementById('clientSearch')?.addEventListener('input', function() {
    renderSidebar(this.value);
  });

  /* ══════════════════════════════════════════════════════
     TOAST NOTIFICATIONS
  ══════════════════════════════════════════════════════ */
  function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `lab-toast lab-toast-${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  function createToastContainer() {
    const el = document.createElement('div');
    el.id = 'toastContainer';
    el.className = 'toast-container';
    document.body.appendChild(el);
    return el;
  }

  /* ══════════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════════ */
  function setClientUrl(clientId, channel, url) {
    const idx = clients.findIndex(c => c.id === clientId);
    if (idx < 0) return;
    if (!clients[idx].urls) clients[idx].urls = {};
    clients[idx].urls[channel] = url;
    saveClients(clients);
  }

  function isValidLookerUrl(url) {
    return url.startsWith('https://lookerstudio.google.com') ||
           url.startsWith('https://datastudio.google.com') ||
           url.startsWith('http://');
  }

  function statusClass(s) {
    if (s === 'Activo')     return 'status-active';
    if (s === 'En Pausa')   return 'status-paused';
    if (s === 'Completado') return 'status-done';
    return 'status-active';
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function channelSVG(ch, size = 14) {
    const s = size;
    const svgs = {
      ga4:    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      gads:   `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>`,
      meta:   `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`,
      gsc:    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
      custom: `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    };
    return svgs[ch] || svgs.custom;
  }

  /* ══════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════ */
  // Apply correct mode on load
  if (isAdminActive()) {
    applyAdminUI(true);
  } else {
    applyAdminUI(false);
  }

  renderSidebar();

  if (clients.length > 0) {
    selectClient(clients[0].id);
  }

});
