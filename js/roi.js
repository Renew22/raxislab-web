/* ============================================================
   RAXISLAB — ROI Calculator Engine
   js/roi.js
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────────
   SERVICE PROFILES
   Each service has multipliers that affect the base calculation.
   ────────────────────────────────────────────────────────────── */
const SERVICE_PROFILES = {
  ads:  { label: 'Meta & Google Ads', cvrBoost: 2.4, budgetMultiplier: 3.8, roas: 4.7, paybackDays: 60  },
  seo:  { label: 'SEO Técnico',       cvrBoost: 1.8, budgetMultiplier: 5.2, roas: 6.1, paybackDays: 120 },
  crm:  { label: 'CRM & Automatización', cvrBoost: 2.1, budgetMultiplier: 4.4, roas: 5.0, paybackDays: 75 },
  web:  { label: 'Diseño Web',        cvrBoost: 1.6, budgetMultiplier: 3.2, roas: 3.8, paybackDays: 90  },
  film: { label: 'Film & Brand',      cvrBoost: 1.5, budgetMultiplier: 2.9, roas: 3.4, paybackDays: 100 },
  full: { label: 'Full Stack',        cvrBoost: 3.1, budgetMultiplier: 6.5, roas: 7.2, paybackDays: 45  },
};

/* Scenario Presets */
const PRESETS = {
  startup:    { budget: 1000,  ticket: 350,   cvr: 1.2, traffic: 2000,  ltv: 4  },
  pyme:       { budget: 3000,  ticket: 1200,  cvr: 1.8, traffic: 8000,  ltv: 8  },
  ecommerce:  { budget: 8000,  ticket: 95,    cvr: 2.5, traffic: 40000, ltv: 3  },
  corporate:  { budget: 15000, ticket: 8000,  cvr: 0.8, traffic: 12000, ltv: 18 },
  saas:       { budget: 6000,  ticket: 490,   cvr: 3.2, traffic: 25000, ltv: 24 },
};

/* ──────────────────────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────────────────────── */
let state = {
  budget:   2000,
  ticket:   800,
  cvr:      1.8,
  traffic:  5000,
  ltv:      6,
  service:  'ads',
  chartMode: 'monthly',
};

let roiChart = null;
let lastResults = {};

/* ──────────────────────────────────────────────────────────────
   CORE CALCULATION ENGINE
   ────────────────────────────────────────────────────────────── */
function calcROI(s) {
  const prof = SERVICE_PROFILES[s.service];

  /* CVR after RaxisLab optimization */
  const cvrNew = Math.min(s.cvr * prof.cvrBoost, 15);

  /* Monthly leads (paid + organic) */
  const leadsPerMonth = Math.round((s.traffic * cvrNew) / 100);

  /* Effective ROAS for Ads budget */
  const roas = prof.roas * (1 + (s.budget / 50000) * 0.4); // larger budgets slightly better

  /* Monthly revenue from Ads */
  const adsRevMonth = s.budget * roas;

  /* Monthly revenue from organic / other channels (25% of leads × ticket) */
  const orgRevMonth = leadsPerMonth * s.ticket * 0.25;

  /* Total monthly revenue */
  const revMonth = adsRevMonth + orgRevMonth;
  const revYear  = revMonth * 12;

  /* Current baseline (no optimization) */
  const currentLeads = Math.round((s.traffic * s.cvr) / 100);
  const currentRevMonth = currentLeads * s.ticket;
  const currentRevYear  = currentRevMonth * 12;

  /* ROI % = (Revenue - Cost) / Cost × 100 */
  const annualCost = (s.budget + 2500) * 12; // ads budget + avg agency fee
  const netGain    = revYear - currentRevYear;
  const roi        = ((netGain - annualCost) / annualCost * 100);

  /* LTV & CAC */
  const ltvValue = s.ticket * s.ltv;
  const cacEst   = s.budget / Math.max(leadsPerMonth, 1);

  /* Payback in days */
  const payback = Math.round(prof.paybackDays * (2000 / Math.max(s.budget, 500)));

  /* Annual leads */
  const leadsYear = leadsPerMonth * 12;

  /* Industry ROI comparison (sector avg ~130%) */
  const vsIndustry = (roi / 130).toFixed(1);

  return {
    roi:          Math.round(roi),
    roiPositive:  roi > 0,
    revMonth:     Math.round(revMonth),
    revYear:      Math.round(revYear),
    currentRevYear: Math.round(currentRevYear),
    leadsYear,
    leadsPerMonth,
    currentLeads,
    roas:         roas.toFixed(1),
    ltvValue,
    cacEst:       Math.round(cacEst),
    payback:      Math.max(payback, 15),
    cvrNew:       cvrNew.toFixed(1),
    cvrGain:      Math.round(((cvrNew - s.cvr) / s.cvr) * 100),
    vsIndustry,
    leadsYear,
    annualCost,
  };
}

/* ──────────────────────────────────────────────────────────────
   MONTHLY REVENUE PROJECTION (12 months ramp-up)
   ────────────────────────────────────────────────────────────── */
function buildMonthlyData(s) {
  const res = calcROI(s);
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const ramp = [0.25, 0.38, 0.52, 0.64, 0.74, 0.82, 0.88, 0.92, 0.96, 0.99, 1.0, 1.0];
  const baselineRamp = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const raxisData    = ramp.map(r => Math.round(res.revMonth * r));
  const currentData  = baselineRamp.map(() => Math.round(res.currentRevMonth || 0));

  return { months, raxisData, currentData };
}

function buildCumulativeData(s) {
  const { months, raxisData, currentData } = buildMonthlyData(s);
  let cumRaxis = 0, cumCurrent = 0;
  const cumRaxisArr = raxisData.map(v => (cumRaxis += v));
  const cumCurrentArr = currentData.map(v => (cumCurrent += v));
  return { months, raxisData: cumRaxisArr, currentData: cumCurrentArr };
}

/* ──────────────────────────────────────────────────────────────
   FORMATTERS
   ────────────────────────────────────────────────────────────── */
function fmtEur(n) {
  if (Math.abs(n) >= 1000000) return `€${(n/1000000).toFixed(1)}M`;
  if (Math.abs(n) >= 1000)    return `€${(n/1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return `€${n.toLocaleString('es-ES')}`;
}

function fmtNum(n) {
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`;
  if (n >= 1000)    return `${(n/1000).toFixed(1)}k`;
  return n.toLocaleString('es-ES');
}

/* ──────────────────────────────────────────────────────────────
   UPDATE UI
   ────────────────────────────────────────────────────────────── */
function updateUI() {
  const res = calcROI(state);
  lastResults = res;

  /* Helper: animate value change */
  const flash = el => { if (!el) return; el.classList.remove('updating'); void el.offsetWidth; el.classList.add('updating'); };

  /* ── Main ROI ── */
  const mainRoiEl = document.getElementById('mainRoi');
  if (mainRoiEl) {
    mainRoiEl.textContent = `${res.roi >= 0 ? '+' : ''}${res.roi}%`;
    flash(mainRoiEl);
  }

  const vsEl = document.getElementById('roiVsIndustry');
  if (vsEl) vsEl.textContent = res.vsIndustry + '×';

  /* ── Metric Cards ── */
  const setMetric = (id, val) => {
    const el = document.getElementById(id);
    if (el) { el.textContent = val; flash(el); }
  };

  setMetric('metricRevenue', fmtEur(res.revYear));
  setMetric('metricLeads',   fmtNum(res.leadsYear));
  setMetric('metricRoas',    res.roas + '×');
  setMetric('metricLtv',     fmtEur(res.ltvValue));
  setMetric('metricCvr',     res.cvrNew + '%');
  setMetric('metricPayback', res.payback + ' días');

  /* Delta texts */
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setText('metricRevenueDelta', `vs ${fmtEur(res.currentRevYear)} situación actual`);
  setText('metricLeadsDelta', `+${fmtNum(res.leadsYear - res.currentLeads * 12)} sobre situación actual`);
  setText('metricRoasDelta', `€${(parseFloat(res.roas)).toFixed(2)} por cada €1 invertido`);
  setText('metricLtvDelta', `CAC estimado: ${fmtEur(res.cacEst)}`);
  setText('metricCvrDelta', `+${res.cvrGain}% sobre tu CVR actual`);

  /* ── Timeline ── */
  const prof = SERVICE_PROFILES[state.service];
  const m3Rev = Math.round(res.revMonth * 0.52);
  const m8Rev = Math.round(res.revMonth * 0.88);
  setText('tlVal1', `Primeros leads · Setup completado`);
  setText('tlVal2', `CVR +60% · ROAS ${prof.roas - 0.5}×`);
  setText('tlVal3', `Revenue +${fmtEur(m3Rev - Math.round(res.currentRevMonth || 0))} vs baseline`);
  setText('tlVal4', `ROI Total: ${res.roi >= 0 ? '+' : ''}${res.roi}% alcanzado`);

  /* ── CTA ROI value ── */
  const ctaEl = document.getElementById('ctaRoiValue');
  if (ctaEl) ctaEl.textContent = `${res.roi >= 0 ? '+' : ''}${res.roi}%`;

  /* ── Chart ── */
  updateChart();
}

/* ──────────────────────────────────────────────────────────────
   CHART
   ────────────────────────────────────────────────────────────── */
function initChart() {
  const canvas = document.getElementById('roiChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const { months, raxisData, currentData } = buildMonthlyData(state);

  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(0,200,255,0.25)');
  gradient.addColorStop(1, 'rgba(0,200,255,0)');

  roiChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Con RaxisLab',
          data: raxisData,
          borderColor: '#00C8FF',
          backgroundColor: gradient,
          borderWidth: 2,
          pointBackgroundColor: '#00C8FF',
          pointRadius: 3,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Situación actual',
          data: currentData,
          borderColor: 'rgba(90,100,112,0.6)',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          pointRadius: 2,
          pointHoverRadius: 4,
          tension: 0.3,
          borderDash: [4, 3],
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            color: '#5A6470',
            font: { family: "'Space Mono', monospace", size: 10 },
            boxWidth: 20,
            padding: 14,
          }
        },
        tooltip: {
          backgroundColor: 'rgba(10,10,10,0.95)',
          borderColor: 'rgba(0,200,255,0.2)',
          borderWidth: 1,
          titleColor: '#A0ACBA',
          bodyColor: '#FFFFFF',
          titleFont: { family: "'Space Mono', monospace", size: 10 },
          bodyFont: { family: "'Space Mono', monospace", size: 11 },
          padding: 12,
          callbacks: {
            label: ctx => {
              const v = ctx.raw;
              if (v >= 1000000) return `  ${ctx.dataset.label}: €${(v/1000000).toFixed(2)}M`;
              if (v >= 1000)    return `  ${ctx.dataset.label}: €${(v/1000).toFixed(1)}k`;
              return `  ${ctx.dataset.label}: €${v.toLocaleString('es-ES')}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(0,200,255,0.05)', drawBorder: false },
          ticks: { color: '#5A6470', font: { family: "'Space Mono', monospace", size: 9 } }
        },
        y: {
          grid: { color: 'rgba(0,200,255,0.05)', drawBorder: false },
          ticks: {
            color: '#5A6470',
            font: { family: "'Space Mono', monospace", size: 9 },
            callback: v => {
              if (v >= 1000000) return `€${(v/1000000).toFixed(1)}M`;
              if (v >= 1000)    return `€${(v/1000).toFixed(0)}k`;
              return `€${v}`;
            }
          }
        }
      }
    }
  });
}

function updateChart() {
  if (!roiChart) return;

  const { months, raxisData, currentData } =
    state.chartMode === 'cumulative'
      ? buildCumulativeData(state)
      : buildMonthlyData(state);

  roiChart.data.labels = months;
  roiChart.data.datasets[0].data = raxisData;
  roiChart.data.datasets[1].data = currentData;
  roiChart.update('active');
}

/* ──────────────────────────────────────────────────────────────
   SLIDER SYNC
   ────────────────────────────────────────────────────────────── */
function syncSlider(sliderId, displayId, formatter) {
  const slider  = document.getElementById(sliderId);
  const display = document.getElementById(displayId);
  if (!slider || !display) return;

  const update = () => {
    const v = parseFloat(slider.value);
    display.textContent = formatter(v);
    /* Update fill bar */
    const pct = ((v - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--fill-pct', pct + '%');
    /* Inject CSS fill via background on the slider itself for Firefox compat */
    slider.style.background =
      `linear-gradient(to right, #00C8FF ${pct}%, rgba(0,200,255,0.1) ${pct}%)`;
  };

  slider.addEventListener('input', () => {
    update();
    updateState();
    updateUI();
  });

  update(); // initial render
}

function updateState() {
  state.budget  = parseFloat(document.getElementById('sliderBudget')?.value  || 2000);
  state.ticket  = parseFloat(document.getElementById('sliderTicket')?.value  || 800);
  state.cvr     = parseFloat(document.getElementById('sliderCvr')?.value     || 1.8);
  state.traffic = parseFloat(document.getElementById('sliderTraffic')?.value || 5000);
  state.ltv     = parseFloat(document.getElementById('sliderLtv')?.value     || 6);
}

/* ──────────────────────────────────────────────────────────────
   SERVICE SELECTOR
   ────────────────────────────────────────────────────────────── */
function initServiceSelector() {
  const btns = document.querySelectorAll('.roi-service-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.service = btn.dataset.svc;
      updateUI();
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   PRESET LOADER
   ────────────────────────────────────────────────────────────── */
function initPresets() {
  const btns = document.querySelectorAll('.roi-preset-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const preset = PRESETS[btn.dataset.preset];
      if (!preset) return;

      /* Update slider values */
      const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
      };
      set('sliderBudget',  preset.budget);
      set('sliderTicket',  preset.ticket);
      set('sliderCvr',     preset.cvr);
      set('sliderTraffic', preset.traffic);
      set('sliderLtv',     preset.ltv);

      /* Re-sync display values */
      initSliderDisplays();
      updateState();
      updateUI();
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   CHART TABS
   ────────────────────────────────────────────────────────────── */
function initChartTabs() {
  const tabs = document.querySelectorAll('.roi-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.chartMode = tab.dataset.chart;
      updateChart();
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   SLIDER DISPLAY INITIALIZATION
   ────────────────────────────────────────────────────────────── */
function initSliderDisplays() {
  syncSlider('sliderBudget',  'valBudget',  v => `€${v >= 1000 ? (v/1000).toFixed(v >= 10000 ? 0 : 1) + 'k' : v.toLocaleString('es-ES')}`);
  syncSlider('sliderTicket',  'valTicket',  v => `€${v >= 1000 ? (v/1000).toFixed(1) + 'k' : v.toLocaleString('es-ES')}`);
  syncSlider('sliderCvr',     'valCvr',     v => `${parseFloat(v).toFixed(1)}%`);
  syncSlider('sliderTraffic', 'valTraffic', v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v.toLocaleString('es-ES'));
  syncSlider('sliderLtv',     'valLtv',     v => `${v} ${v === 1 ? 'mes' : 'meses'}`);
}

/* ──────────────────────────────────────────────────────────────
   ANIMATED COUNTER (for hero stats on first load)
   ────────────────────────────────────────────────────────────── */
function animateCounter(el, from, to, suffix, duration = 1200) {
  if (!el) return;
  const start = performance.now();
  const step = ts => {
    const elapsed = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.round(from + (to - from) * ease);
    el.textContent = `+${current}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ──────────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Initialize sliders */
  initSliderDisplays();

  /* Initialize interactions */
  initServiceSelector();
  initPresets();
  initChartTabs();

  /* Initialize chart */
  initChart();

  /* Initial calculation & UI update */
  updateState();
  updateUI();

  /* Animate hero counter */
  const heroRoi = document.getElementById('heroAvgRoi');
  if (heroRoi) {
    setTimeout(() => animateCounter(heroRoi, 0, 312, '%', 1400), 400);
  }

  /* Observe reveal animations (reuse main.js IntersectionObserver if available,
     otherwise define inline) */
  if (!window._revealObserver) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    window._revealObserver = obs;
  }

  /* Range slider visual polish: set initial fill */
  document.querySelectorAll('.roi-range').forEach(slider => {
    const pct = ((parseFloat(slider.value) - parseFloat(slider.min)) /
                 (parseFloat(slider.max)   - parseFloat(slider.min))) * 100;
    slider.style.background =
      `linear-gradient(to right, #00C8FF ${pct}%, rgba(0,200,255,0.1) ${pct}%)`;
  });

});
