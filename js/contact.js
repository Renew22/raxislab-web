/* ============================================================
   RAXISLAB — contact.js
   Multi-step form, validation, budget selector, submission
   ► Envío dual: Table API (leads) + Formspree (email a René)
   
   CONFIGURACIÓN:
   - Reemplaza FORMSPREE_ID con tu ID de https://formspree.io
     (gratis, 50 envíos/mes — crear cuenta con hola@raxislab.com)
   ============================================================ */

const FORMSPREE_ID = 'xaqdzdge'; // ✅ ID de Formspree configurado

document.addEventListener('DOMContentLoaded', () => {

  let currentStep = 1;
  let selectedBudget = '';

  // ── PROGRESS BAR (inject) ──────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const progressBar = document.createElement('div');
    progressBar.className = 'form-progress';
    progressBar.innerHTML = '<div class="form-progress-fill" id="formProgressFill" style="width:33%"></div>';
    contactForm.insertBefore(progressBar, contactForm.firstChild);
  }

  function setProgress(pct) {
    const fill = document.getElementById('formProgressFill');
    if (fill) fill.style.width = pct + '%';
  }

  // ── STEP NAVIGATION ───────────────────────────────────────
  function goToStep(step) {
    const pages = [
      document.getElementById('formPage1'),
      document.getElementById('formPage2'),
      document.getElementById('formPage3'),
    ];
    pages.forEach((p, i) => {
      if (!p) return;
      p.style.display = i + 1 === step ? 'block' : 'none';
    });

    document.querySelectorAll('.form-step').forEach(s => {
      const sNum = parseInt(s.dataset.step);
      s.classList.toggle('active', sNum === step);
    });

    const progressMap = { 1: 33, 2: 66, 3: 100 };
    setProgress(progressMap[step] || 33);

    currentStep = step;
    window.scrollTo({ top: document.querySelector('.contact-form-header')?.offsetTop - 100 || 0, behavior: 'smooth' });
  }

  // ── VALIDATORS ────────────────────────────────────────────
  function showErr(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  function clearErr(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  }

  function markError(input) {
    if (input) { input.classList.add('error'); input.addEventListener('input', () => input.classList.remove('error'), { once: true }); }
  }

  function validateStep1() {
    let valid = true;

    const fname   = document.getElementById('fname');
    const email   = document.getElementById('email');
    const company = document.getElementById('company');

    clearErr('errFname'); clearErr('errEmail'); clearErr('errCompany');

    if (!fname?.value.trim()) { showErr('errFname', '→ Nombre requerido'); markError(fname); valid = false; }
    if (!email?.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
      showErr('errEmail', '→ Email válido requerido'); markError(email); valid = false;
    }
    if (!company?.value.trim()) { showErr('errCompany', '→ Empresa requerida'); markError(company); valid = false; }

    return valid;
  }

  function validateStep2() {
    let valid = true;

    const objective = document.getElementById('objective');
    const checked   = document.querySelectorAll('input[name="services"]:checked');

    clearErr('errServices'); clearErr('errObjective');

    if (checked.length === 0) { showErr('errServices', '→ Selecciona al menos un servicio'); valid = false; }
    if (!objective?.value) { showErr('errObjective', '→ Selecciona un objetivo'); markError(objective); valid = false; }

    return valid;
  }

  function validateStep3() {
    let valid = true;
    const privacy = document.getElementById('privacy');

    clearErr('errBudget'); clearErr('errPrivacy');

    if (!selectedBudget) { showErr('errBudget', '→ Selecciona un rango de presupuesto'); valid = false; }
    if (!privacy?.checked) { showErr('errPrivacy', '→ Debes aceptar la política de privacidad'); valid = false; }

    return valid;
  }

  // ── STEP BUTTONS ──────────────────────────────────────────
  document.getElementById('toStep2')?.addEventListener('click', () => {
    if (validateStep1()) goToStep(2);
  });

  document.getElementById('toStep1Back')?.addEventListener('click', () => goToStep(1));

  document.getElementById('toStep3')?.addEventListener('click', () => {
    if (validateStep2()) goToStep(3);
  });

  document.getElementById('toStep2Back')?.addEventListener('click', () => goToStep(2));

  // ── BUDGET SELECTOR ───────────────────────────────────────
  document.querySelectorAll('.budget-opt').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.budget-opt').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      selectedBudget = this.dataset.val;
      const hidden = document.getElementById('budget');
      if (hidden) hidden.value = selectedBudget;
      clearErr('errBudget');
    });
  });

  // ── FORM SUBMISSION ───────────────────────────────────────
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateStep3()) return;

    // UI: loading state
    const submitBtn    = document.getElementById('submitBtn');
    const submitText   = document.getElementById('submitText');
    const submitArrow  = document.getElementById('submitArrow');
    const submitLoader = document.getElementById('submitLoader');

    submitBtn.disabled = true;
    submitText.textContent = 'Procesando...';
    submitArrow.style.display = 'none';
    submitLoader.style.display = 'block';

    // Collect form data
    const formData = {
      name:         (document.getElementById('fname')?.value || '') + ' ' + (document.getElementById('lname')?.value || ''),
      email:        document.getElementById('email')?.value || '',
      phone:        document.getElementById('phone')?.value || '',
      company:      document.getElementById('company')?.value || '',
      services:     Array.from(document.querySelectorAll('input[name="services"]:checked')).map(el => el.value).join(', '),
      website:      document.getElementById('website')?.value || '',
      objective:    document.getElementById('objective')?.value || '',
      message:      document.getElementById('message')?.value || '',
      budget:       selectedBudget,
      timeline:     document.querySelector('input[name="timeline"]:checked')?.value || '',
      submitted_at: new Date().toISOString(),
      status:       'nuevo',
    };

    let refId = 'RL-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    let savedOk = false;

    // ── 1. Guardar en Table API (siempre) ────────────────────
    try {
      const tableRes = await fetch('tables/contact_leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (tableRes.ok) {
        const saved = await tableRes.json();
        refId = 'RL-' + (saved.id || refId).toString().substr(-8).toUpperCase();
        savedOk = true;
      }
    } catch (err) {
      console.warn('Table API unavailable, using local ref:', err);
    }

    // ── 2. Enviar email a René vía Formspree ─────────────────
    try {
      const emailPayload = {
        _subject: `🚀 Nuevo Lead RaxisLab — ${formData.company} (${formData.budget})`,
        _replyto: formData.email,
        nombre:    formData.name,
        email:     formData.email,
        telefono:  formData.phone || 'No indicado',
        empresa:   formData.company,
        servicios: formData.services,
        web:       formData.website || 'No indicada',
        objetivo:  formData.objective,
        presupuesto: formData.budget,
        timeline:  formData.timeline || 'No indicado',
        mensaje:   formData.message || 'Sin mensaje adicional',
        referencia: refId,
        fecha:     new Date().toLocaleString('es-ES'),
      };

      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });
    } catch (err) {
      console.warn('Formspree unavailable:', err);
    }

    // ── 3. Mostrar éxito siempre ─────────────────────────────
    showSuccess(refId);
  });

  function showSuccess(refId) {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    const refEl   = document.getElementById('successRef');

    if (form)    form.style.display    = 'none';
    if (success) success.style.display = 'flex';
    if (refEl)   refEl.textContent     = refId || 'REF: RL-SENT';

    // Scroll to success
    success?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ── REAL-TIME INPUT FEEDBACK ──────────────────────────────
  document.getElementById('email')?.addEventListener('blur', function() {
    if (this.value && !/\S+@\S+\.\S+/.test(this.value)) {
      showErr('errEmail', '→ Introduce un email válido');
      markError(this);
    } else if (this.value) {
      clearErr('errEmail');
    }
  });

});
