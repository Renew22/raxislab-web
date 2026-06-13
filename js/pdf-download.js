/* ============================================================
   RAXISLAB — js/pdf-download.js
   Sistema de descarga PDF usando html2pdf.js
   ============================================================ */

/**
 * Genera y descarga el contenido de la guía como PDF.
 * @param {string} filename  — nombre del archivo sin extensión, e.g. "guia-camara"
 * @param {string} title     — título para el overlay de carga
 */
function downloadGuiaAsPDF(filename, title) {

  // Mostrar overlay de carga
  const overlay = document.createElement('div');
  overlay.className = 'pdf-loading-overlay';
  overlay.innerHTML = `
    <div class="pdf-loading-spinner"></div>
    <div class="pdf-loading-text">Generando PDF…</div>
    <div class="pdf-loading-sub">${title}<br/>Esto puede tardar unos segundos</div>
  `;
  document.body.appendChild(overlay);

  // Elemento a convertir (todo el contenido menos la topbar)
  const element = document.querySelector('.pdf-wrap');

  const opt = {
    margin:       [10, 10, 12, 10],  // top, left, bottom, right (mm)
    filename:     filename + '.pdf',
    image:        { type: 'jpeg', quality: 0.95 },
    html2canvas:  {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#020206'
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      document.body.removeChild(overlay);
    })
    .catch((err) => {
      document.body.removeChild(overlay);
      console.error('Error generando PDF:', err);
      // Fallback: usar print del navegador
      window.print();
    });
}
