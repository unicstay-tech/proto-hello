/* Landing page carte cadeau AbracadaRoom : script unique, sans dépendance.
   Configuration dans window.LP_CONFIG (en tête de index.html). */
(function () {
  'use strict';

  var CONFIG = window.LP_CONFIG;
  var OCCASIONS = window.LP_OCCASIONS || {};
  var PRESETS = [50, 100, 150, 200, 250, 300];
  var DEFAULT_VALUE = 150;
  var MIN_VALUE = 20;
  var CAMPAIGN_KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid'];
  var dataLayer = window.dataLayer = window.dataLayer || [];

  function track(event, params) {
    var payload = { event: event };
    for (var key in params) payload[key] = params[key];
    dataLayer.push(payload);
  }

  /* ----- Paramètres d'URL ----- */
  var query = new URLSearchParams(window.location.search);

  // Paramètres de campagne à conserver : utm_*, gclid, gbraid, wbraid, fbclid
  var campaign = [];
  query.forEach(function (val, key) {
    if (key.indexOf('utm_') === 0 || CAMPAIGN_KEYS.indexOf(key) !== -1) campaign.push([key, val]);
  });

  var occasionParam = query.get('occasion');
  var occasion = occasionParam && Object.prototype.hasOwnProperty.call(OCCASIONS, occasionParam) ? occasionParam : 'default';

  // Ajoute les paramètres de campagne et src à une URL absolue
  function withTracking(baseUrl, extra) {
    var url = new URL(baseUrl);
    for (var key in extra) url.searchParams.set(key, extra[key]);
    campaign.forEach(function (pair) { url.searchParams.set(pair[0], pair[1]); });
    url.searchParams.set('src', CONFIG.src);
    return url.toString();
  }

  /* ----- État du montant, partagé par tous les sélecteurs de la page ----- */
  var state = { value: DEFAULT_VALUE, custom: false, valid: true };

  (function initFromUrl() {
    var raw = query.get('value');
    if (raw === null || raw.trim() === '') return;
    var num = Number(raw.replace(',', '.'));
    if (!isFinite(num) || num < MIN_VALUE) return; // ?value=0, ?value=abc : 150 par défaut
    num = Math.round(num);
    state.value = num;
    state.custom = PRESETS.indexOf(num) === -1;
  })();

  var groups = [].slice.call(document.querySelectorAll('[data-amounts]'));
  var ctas = [].slice.call(document.querySelectorAll('[data-cta]'));

  function render(skipInputOf) {
    groups.forEach(function (group) {
      [].forEach.call(group.querySelectorAll('[data-amount]'), function (btn) {
        var v = btn.getAttribute('data-amount');
        var pressed = state.custom ? v === 'other' : Number(v) === state.value;
        btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        if (v === 'other') btn.setAttribute('aria-expanded', state.custom ? 'true' : 'false');
      });
      var box = group.querySelector('.abcd-custom');
      var input = group.querySelector('[data-custom-input]');
      var error = group.querySelector('[data-custom-error]');
      box.hidden = !state.custom;
      if (input !== skipInputOf && state.custom && state.valid) input.value = state.value;
      input.setAttribute('aria-invalid', state.custom && !state.valid ? 'true' : 'false');
      if (state.valid) error.textContent = '';
    });

    var href = withTracking(CONFIG.checkoutUrl, { value: state.valid ? state.value : '' });
    ctas.forEach(function (cta) {
      cta.href = href;
      cta.setAttribute('aria-disabled', state.valid ? 'false' : 'true');
      cta.textContent = state.valid ? 'Offrir la carte de ' + state.value + '\u00a0€' : 'Saisissez un montant';
    });
  }

  function showError(group) {
    var input = group.querySelector('[data-custom-input]');
    var error = group.querySelector('[data-custom-error]');
    error.textContent = 'Le montant minimum est de 20 €.';
    input.setAttribute('aria-invalid', 'true');
  }

  groups.forEach(function (group) {
    var input = group.querySelector('[data-custom-input]');

    group.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-amount]');
      if (!btn) return;
      var v = btn.getAttribute('data-amount');
      if (v === 'other') {
        if (!state.custom) {
          state.custom = true;
          var typed = Math.round(Number(input.value));
          state.valid = typed >= MIN_VALUE;
          if (state.valid) state.value = typed;
          render();
          if (state.valid) track('select_amount', { value: state.value });
        }
        input.focus();
        return;
      }
      state.custom = false;
      state.valid = true;
      state.value = Number(v);
      render();
      track('select_amount', { value: state.value });
    });

    // Saisie libre : mise à jour à chaque frappe, événement select_amount à la validation du champ
    input.addEventListener('input', function () {
      var num = Math.round(Number(input.value));
      state.valid = input.value !== '' && num >= MIN_VALUE;
      if (state.valid) state.value = num;
      render(input);
    });
    input.addEventListener('change', function () {
      if (state.valid) {
        input.value = state.value;
        track('select_amount', { value: state.value });
      } else {
        showError(group);
      }
    });
  });

  /* ----- Boutons d'achat ----- */
  ctas.forEach(function (cta) {
    cta.addEventListener('click', function (e) {
      if (!state.valid) {
        e.preventDefault();
        groups.forEach(showError);
        // Le bouton du rappel final renvoie à son propre champ, les autres à celui du hero
        var group = cta.closest('#rappel') ? groups[groups.length - 1] : groups[0];
        group.querySelector('[data-custom-input]').focus();
        return;
      }
      track('click_cta', { value: state.value, occasion: occasion, position: cta.getAttribute('data-position') });
    });
  });

  /* ----- Idées par occasion : remontée douce au sélecteur du hero ----- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heroAmounts = document.getElementById('montant');
  [].forEach.call(document.querySelectorAll('[data-goto-amount]'), function (btn) {
    btn.addEventListener('click', function () {
      track('click_cta', { value: state.value, occasion: occasion, position: 'occasion' });
      heroAmounts.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      var selected = heroAmounts.querySelector('[aria-pressed="true"]');
      if (selected) selected.focus({ preventScroll: true });
    });
  });

  /* ----- Aide au mot personnel : copier ----- */
  var copyStatus = document.querySelector('[data-copy-status]');
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(area);
      area.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(area);
      ok ? resolve() : reject();
    });
  }
  [].forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.parentNode.querySelector('p').textContent.trim();
      copyText(text).then(function () {
        btn.textContent = 'Copié';
        btn.classList.add('is-done');
        copyStatus.textContent = 'Message copié : ' + text;
        setTimeout(function () { btn.textContent = 'Copier'; btn.classList.remove('is-done'); }, 2000);
      });
    });
  });

  // Messages de Noël : visibles sans occasion ou avec ?occasion=noel uniquement
  [].forEach.call(document.querySelectorAll('[data-only-occasion]'), function (item) {
    var only = item.getAttribute('data-only-occasion');
    if (occasion !== 'default' && occasion !== only) item.hidden = true;
  });

  /* ----- Popup Avis Vérifiés : l'attestation s'ouvre sans quitter la page ----- */
  var modal = document.getElementById('avis-modal');
  if (modal && typeof modal.showModal === 'function') {
    var frame = modal.querySelector('iframe');
    [].forEach.call(document.querySelectorAll('[data-reviews-modal]'), function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        if (!frame.src) frame.src = frame.getAttribute('data-src');
        modal.showModal();
      });
    });
    modal.querySelector('[data-modal-close]').addEventListener('click', function () { modal.close(); });
    // Clic sur le fond : fermeture
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
  }

  /* ----- Sortie secondaire ----- */
  [].forEach.call(document.querySelectorAll('[data-secondary]'), function (link) {
    link.href = withTracking(CONFIG.secondaryUrl, {});
    link.addEventListener('click', function () { track('click_secondary', {}); });
  });

  /* ----- FAQ ----- */
  [].forEach.call(document.querySelectorAll('.abcd-faq details'), function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) track('faq_open', { question: item.querySelector('summary').textContent.trim() });
    });
  });

  /* ----- Bouton collant mobile : après le bouton du hero, avant le rappel final ----- */
  var sticky = document.querySelector('[data-sticky]');
  var heroCta = document.getElementById('hero-cta');
  var finalSection = document.getElementById('rappel');
  var ticking = false;
  function updateSticky() {
    ticking = false;
    var visible = heroCta.getBoundingClientRect().bottom < 0 &&
      finalSection.getBoundingClientRect().top > window.innerHeight;
    sticky.classList.toggle('is-visible', visible);
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(updateSticky); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateSticky();

  render();
  track('lp_view', { value: state.value, occasion: occasion });

  window.LP = { config: CONFIG, state: state, track: track, withTracking: withTracking, render: render };
})();
