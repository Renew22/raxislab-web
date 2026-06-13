/* ============================================================
   RAXISLAB — home.js
   Real-Time Data Panel, Chart, Live Feed, Terminal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── KPI LIVE VALUES ────────────────────────────────────────
  const kpiDefs = [
    { id: 'kpiLeads',   base: 47,  variance: 5,  suffix: '' },
    { id: 'kpiRoas',    base: 4.8, variance: 0.3, suffix: 'x', isFloat: true },
    { id: 'kpiTraffic', base: 8420, variance: 200, suffix: '' },
    { id: 'kpiAuto',    base: 12,  variance: 2,  suffix: '' },
  ];

  function updateKPIs() {
    kpiDefs.forEach(def => {
      const el = document.getElementById(def.id);
      if (!el) return;
      const val = def.base + (Math.random() - 0.5) * def.variance;
      if (def.isFloat) {
        el.textContent = val.toFixed(1) + def.suffix;
      } else {
        el.textContent = Math.round(val).toLocaleString() + def.suffix;
      }
    });
  }

  // Initial load with animation
  setTimeout(() => {
    updateKPIs();
    setInterval(updateKPIs, 7000);
  }, 800);

  // ── CHART.JS CAMPAIGN CHART ───────────────────────────────
  const chartEl = document.getElementById('campaignChart');
  if (chartEl && window.Chart) {

    const labels7  = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
    const labels30 = Array.from({length:30}, (_,i) => `D${i+1}`);
    const labels90 = Array.from({length:12}, (_,i) => `S${i+1}`);

    const chartData = {
      '7d':  { labels: labels7,  spend: [820,940,1100,980,1250,870,990],    roas: [4.2,4.6,5.1,4.8,5.4,4.1,4.9] },
      '30d': { labels: labels30, spend: Array.from({length:30}, () => 700 + Math.random()*600),  roas: Array.from({length:30}, () => 3.8 + Math.random()*1.8) },
      '90d': { labels: labels90, spend: Array.from({length:12}, () => 5000 + Math.random()*4000),roas: Array.from({length:12}, () => 4.0 + Math.random()*1.5) },
    };

    const chartCfg = {
      type: 'bar',
      data: {
        labels: chartData['7d'].labels,
        datasets: [
          {
            label: 'Inversión (€)',
            data: chartData['7d'].spend,
            backgroundColor: 'rgba(0,200,255,0.15)',
            borderColor: 'rgba(0,200,255,0.6)',
            borderWidth: 1,
            borderRadius: 3,
            yAxisID: 'y',
          },
          {
            label: 'ROAS',
            data: chartData['7d'].roas,
            type: 'line',
            borderColor: '#00FF82',
            backgroundColor: 'rgba(0,255,130,0.08)',
            borderWidth: 2,
            pointBackgroundColor: '#00FF82',
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: true,
            yAxisID: 'y1',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            labels: {
              color: '#5A6470',
              font: { family: "'Space Mono', monospace", size: 10 },
              boxWidth: 12, boxHeight: 2,
            }
          },
          tooltip: {
            backgroundColor: '#0a0a0a',
            borderColor: 'rgba(0,200,255,0.3)',
            borderWidth: 1,
            titleColor: '#00C8FF',
            bodyColor: '#A0ACBA',
            titleFont: { family: "'Space Mono', monospace", size: 11 },
            bodyFont:  { family: "'Space Mono', monospace", size: 11 },
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
            ticks: { color: '#5A6470', font: { family: "'Space Mono', monospace", size: 9 } }
          },
          y: {
            position: 'left',
            grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
            ticks: {
              color: '#5A6470',
              font: { family: "'Space Mono', monospace", size: 9 },
              callback: v => '€' + v.toLocaleString()
            }
          },
          y1: {
            position: 'right',
            grid: { display: false },
            ticks: {
              color: '#5A6470',
              font: { family: "'Space Mono', monospace", size: 9 },
              callback: v => v.toFixed(1) + 'x'
            }
          }
        }
      }
    };

    const myChart = new Chart(chartEl, chartCfg);

    // Period tabs
    document.querySelectorAll('.rtd-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.rtd-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const period = this.dataset.period;
        const d = chartData[period];
        myChart.data.labels = d.labels;
        myChart.data.datasets[0].data = d.spend;
        myChart.data.datasets[1].data = d.roas;
        myChart.update('active');
      });
    });
  }

  // ── LIVE FEED ──────────────────────────────────────────────
  const feedList = document.getElementById('feedList');
  const feedTime = document.getElementById('feedTime');

  const feedEvents = [
    { type: 'lead',  text: 'Nuevo lead calificado — Sector Ecommerce (Madrid)' },
    { type: 'ad',    text: 'Campaña Meta optimizada — CTR +0.4% en último ciclo' },
    { type: 'seo',   text: 'Keyword "agencia digital premium" subió a posición #3' },
    { type: 'auto',  text: 'Pipeline CRM ejecutado — 12 emails enviados automáticamente' },
    { type: 'lead',  text: 'Lead de LinkedIn convertido — Presupuesto: €5k-10k' },
    { type: 'seo',   text: 'Backlink de autoridad DA78 obtenido' },
    { type: 'ad',    text: 'Google Ads — ROAS actual: 5.2x (+0.4 vs baseline)' },
    { type: 'auto',  text: 'Webhook disparado — CRM sincronizado con Notion' },
    { type: 'lead',  text: 'Formulario de contacto — Startup FinTech (Barcelona)' },
    { type: 'ad',    text: 'Audience lookalike expandida — +34k nuevos usuarios' },
    { type: 'seo',   text: 'Core Web Vitals mejorados — LCP: 1.2s' },
    { type: 'auto',  text: 'Scoring de lead actualizado — Lead #847 → Hot' },
  ];

  let feedIndex = 0;

  function formatTime(date) {
    return date.toTimeString().split(' ')[0];
  }

  function addFeedItem() {
    if (!feedList) return;
    const event = feedEvents[feedIndex % feedEvents.length];
    feedIndex++;

    const now = new Date();
    const li = document.createElement('li');
    li.className = 'rtd-feed-item';
    li.innerHTML = `
      <span class="feed-icon ${event.type}"></span>
      <span class="feed-text">${event.text}</span>
      <span class="feed-time">${formatTime(now)}</span>
    `;

    feedList.prepend(li);

    // Keep max 7 items
    const items = feedList.querySelectorAll('.rtd-feed-item');
    if (items.length > 7) {
      items[items.length - 1].remove();
    }
  }

  // Clock
  function updateClock() {
    if (feedTime) feedTime.textContent = formatTime(new Date());
  }

  // Init feed
  for (let i = 0; i < 5; i++) addFeedItem();
  updateClock();

  setInterval(() => {
    addFeedItem();
    updateClock();
  }, 3500);

  setInterval(updateClock, 1000);

  // ── TERMINAL LIVE LINES ────────────────────────────────────
  const terminalBody = document.getElementById('terminalBody');

  const liveTerminalLines = [
    { type: 'prompt', text: 'monitor conversion_rate' },
    { type: 'info',   text: '→ Scanning active landing pages...' },
    { type: 'success',text: '✓ LP #01: CVR 8.4% | LP #02: CVR 6.1%' },
    { type: 'prompt', text: 'fetch lead_score --top 5' },
    { type: 'success',text: '✓ Lead #847: 94pts | Lead #831: 88pts | Lead #819: 82pts' },
    { type: 'prompt', text: 'run ai_optimization --target roas' },
    { type: 'warn',   text: '⚡ AI adjusting 8 bid strategies in real-time...' },
    { type: 'success',text: '✓ Predicted ROAS uplift: +0.6x over next 48h' },
    { type: 'prompt', text: 'status all_systems' },
    { type: 'success',text: '✓ All 7 systems operational — No anomalies detected' },
  ];

  let termIdx = 0;

  function addTerminalLine() {
    if (!terminalBody) return;
    const cursor = terminalBody.querySelector('.terminal-cursor');
    const line = liveTerminalLines[termIdx % liveTerminalLines.length];
    termIdx++;

    const div = document.createElement('div');
    div.className = 'terminal-line';

    if (line.type === 'prompt') {
      div.innerHTML = `<span class="t-prompt">RL $</span> <span class="t-cmd">${line.text}</span>`;
    } else if (line.type === 'success') {
      div.className += ' t-success';
      div.textContent = line.text;
    } else if (line.type === 'info') {
      div.className += ' t-info';
      div.textContent = line.text;
    } else if (line.type === 'warn') {
      div.className += ' t-warn';
      div.textContent = line.text;
    }

    if (cursor) {
      terminalBody.insertBefore(div, cursor);
    } else {
      terminalBody.appendChild(div);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;

    // Max 16 lines (excluding cursor)
    const allLines = terminalBody.querySelectorAll('.terminal-line:not(.terminal-cursor)');
    if (allLines.length > 16) allLines[0].remove();
  }

  setInterval(addTerminalLine, 2800);

});
