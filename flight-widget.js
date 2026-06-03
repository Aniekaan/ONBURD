(function () {
  /* ---------- Flight-form interactions ---------- */
  const closeAllFieldUI = () => {
    document.querySelectorAll('.field.is-search').forEach(f => {
      f.querySelector('.field-dropdown').setAttribute('hidden', '');
      f.classList.remove('is-active');
    });
    document.querySelectorAll('.field-popover').forEach(p => p.setAttribute('hidden', ''));
  };

  /* ---------- Airport autocomplete (From / To) ---------- */
  const AIRPORTS = [
    // Nigeria
    { city: 'Lagos', name: 'Murtala Muhammed Intl', code: 'LOS', country: 'Nigeria' },
    { city: 'Abuja', name: 'Nnamdi Azikiwe Intl', code: 'ABV', country: 'Nigeria' },
    { city: 'Port Harcourt', name: 'Port Harcourt Intl', code: 'PHC', country: 'Nigeria' },
    { city: 'Kano', name: 'Mallam Aminu Kano Intl', code: 'KAN', country: 'Nigeria' },
    { city: 'Enugu', name: 'Akanu Ibiam Intl', code: 'ENU', country: 'Nigeria' },
    { city: 'Ibadan', name: 'Ibadan Airport', code: 'IBA', country: 'Nigeria' },
    { city: 'Benin City', name: 'Benin Airport', code: 'BNI', country: 'Nigeria' },
    { city: 'Calabar', name: 'Margaret Ekpo Intl', code: 'CBQ', country: 'Nigeria' },
    { city: 'Owerri', name: 'Sam Mbakwe Airport', code: 'QOW', country: 'Nigeria' },
    { city: 'Kaduna', name: 'Kaduna Airport', code: 'KAD', country: 'Nigeria' },
    { city: 'Jos', name: 'Yakubu Gowon Airport', code: 'JOS', country: 'Nigeria' },
    { city: 'Maiduguri', name: 'Maiduguri Intl', code: 'MIU', country: 'Nigeria' },
    { city: 'Sokoto', name: 'Sadiq Abubakar III Intl', code: 'SKO', country: 'Nigeria' },
    { city: 'Ilorin', name: 'Ilorin Intl', code: 'ILR', country: 'Nigeria' },
    { city: 'Uyo', name: 'Akwa Ibom Intl', code: 'QUO', country: 'Nigeria' },
    { city: 'Asaba', name: 'Asaba Intl', code: 'ABB', country: 'Nigeria' },
    // Africa
    { city: 'Accra', name: 'Kotoka Intl', code: 'ACC', country: 'Ghana' },
    { city: 'Nairobi', name: 'Jomo Kenyatta Intl', code: 'NBO', country: 'Kenya' },
    { city: 'Johannesburg', name: 'O. R. Tambo Intl', code: 'JNB', country: 'South Africa' },
    { city: 'Cape Town', name: 'Cape Town Intl', code: 'CPT', country: 'South Africa' },
    { city: 'Cairo', name: 'Cairo Intl', code: 'CAI', country: 'Egypt' },
    { city: 'Addis Ababa', name: 'Bole Intl', code: 'ADD', country: 'Ethiopia' },
    { city: 'Casablanca', name: 'Mohammed V Intl', code: 'CMN', country: 'Morocco' },
    { city: 'Dakar', name: 'Blaise Diagne Intl', code: 'DSS', country: 'Senegal' },
    { city: 'Abidjan', name: 'Félix-Houphouët-Boigny Intl', code: 'ABJ', country: "Côte d'Ivoire" },
    { city: 'Kigali', name: 'Kigali Intl', code: 'KGL', country: 'Rwanda' },
    // Europe
    { city: 'London', name: 'Heathrow', code: 'LHR', country: 'United Kingdom' },
    { city: 'London', name: 'Gatwick', code: 'LGW', country: 'United Kingdom' },
    { city: 'Manchester', name: 'Manchester Airport', code: 'MAN', country: 'United Kingdom' },
    { city: 'Paris', name: 'Charles de Gaulle', code: 'CDG', country: 'France' },
    { city: 'Amsterdam', name: 'Schiphol', code: 'AMS', country: 'Netherlands' },
    { city: 'Frankfurt', name: 'Frankfurt Airport', code: 'FRA', country: 'Germany' },
    { city: 'Munich', name: 'Munich Airport', code: 'MUC', country: 'Germany' },
    { city: 'Madrid', name: 'Adolfo Suárez Barajas', code: 'MAD', country: 'Spain' },
    { city: 'Barcelona', name: 'El Prat', code: 'BCN', country: 'Spain' },
    { city: 'Rome', name: 'Fiumicino', code: 'FCO', country: 'Italy' },
    { city: 'Lisbon', name: 'Humberto Delgado', code: 'LIS', country: 'Portugal' },
    { city: 'Brussels', name: 'Brussels Airport', code: 'BRU', country: 'Belgium' },
    { city: 'Zurich', name: 'Zurich Airport', code: 'ZRH', country: 'Switzerland' },
    { city: 'Geneva', name: 'Geneva Airport', code: 'GVA', country: 'Switzerland' },
    { city: 'Dublin', name: 'Dublin Airport', code: 'DUB', country: 'Ireland' },
    { city: 'Istanbul', name: 'Istanbul Airport', code: 'IST', country: 'Türkiye' },
    // Middle East
    { city: 'Dubai', name: 'Dubai Intl', code: 'DXB', country: 'United Arab Emirates' },
    { city: 'Abu Dhabi', name: 'Zayed Intl', code: 'AUH', country: 'United Arab Emirates' },
    { city: 'Doha', name: 'Hamad Intl', code: 'DOH', country: 'Qatar' },
    { city: 'Jeddah', name: 'King Abdulaziz Intl', code: 'JED', country: 'Saudi Arabia' },
    { city: 'Riyadh', name: 'King Khalid Intl', code: 'RUH', country: 'Saudi Arabia' },
    // Americas
    { city: 'New York', name: 'John F. Kennedy Intl', code: 'JFK', country: 'United States' },
    { city: 'Newark', name: 'Newark Liberty Intl', code: 'EWR', country: 'United States' },
    { city: 'Atlanta', name: 'Hartsfield–Jackson Intl', code: 'ATL', country: 'United States' },
    { city: 'Chicago', name: "O'Hare Intl", code: 'ORD', country: 'United States' },
    { city: 'Los Angeles', name: 'Los Angeles Intl', code: 'LAX', country: 'United States' },
    { city: 'Washington', name: 'Dulles Intl', code: 'IAD', country: 'United States' },
    { city: 'Houston', name: 'George Bush Intercontinental', code: 'IAH', country: 'United States' },
    { city: 'Toronto', name: 'Pearson Intl', code: 'YYZ', country: 'Canada' },
    // Asia-Pacific
    { city: 'Singapore', name: 'Changi', code: 'SIN', country: 'Singapore' },
    { city: 'Hong Kong', name: 'Hong Kong Intl', code: 'HKG', country: 'Hong Kong' },
    { city: 'Mumbai', name: 'Chhatrapati Shivaji Intl', code: 'BOM', country: 'India' },
    { city: 'Delhi', name: 'Indira Gandhi Intl', code: 'DEL', country: 'India' },
    { city: 'Beijing', name: 'Beijing Capital Intl', code: 'PEK', country: 'China' },
    { city: 'Guangzhou', name: 'Baiyun Intl', code: 'CAN', country: 'China' },
    { city: 'Tokyo', name: 'Haneda', code: 'HND', country: 'Japan' },
  ];
  const RECENT_CODES = ['LHR'];
  const POPULAR_CODES = ['LOS', 'ABV', 'LHR', 'CDG', 'DXB', 'JFK', 'ACC', 'JNB'];
  const byCode = code => AIRPORTS.find(a => a.code === code);

  const airportItemHTML = a => `
    <button type="button" class="dd-item" data-code="${a.code}" data-display="${a.city} (${a.code})">
      <i class="ph ph-airplane-tilt"></i>
      <div>
        <p class="dd-name">${a.city}, (${a.code} - ${a.name})</p>
        <p class="dd-sub">${a.country}</p>
      </div>
    </button>`;
  const sectionHTML = (title, codes) =>
    `<p class="dd-section">${title}</p>` + codes.map(byCode).filter(Boolean).map(airportItemHTML).join('');

  function renderDropdown(field, query) {
    const dd = field.querySelector('.field-dropdown');
    if (!query) {
      dd.innerHTML = sectionHTML('Recent Search', RECENT_CODES) + sectionHTML('Popular Search', POPULAR_CODES);
      return;
    }
    const q = query.toLowerCase();
    const matches = AIRPORTS.filter(a =>
      a.city.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
    ).slice(0, 8);
    dd.innerHTML = matches.length
      ? matches.map(airportItemHTML).join('')
      : '<p class="dd-empty">No matching cities or airports</p>';
  }

  // Live filtering as the user types (delegated so dynamically added legs work too)
  document.addEventListener('input', e => {
    const input = e.target.closest('.field.is-search .field-input');
    if (!input) return;
    const field = input.closest('.field.is-search');
    field.dataset.code = '';
    input.value.trim() ? field.classList.add('has-value') : field.classList.remove('has-value');
    renderDropdown(field, input.value.trim());
    field.querySelector('.field-dropdown').removeAttribute('hidden');
  });

  // Helpers for the calendar
  const parseISO = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); };
  const fmtRange = s => parseISO(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  function buildMonth(year, monthIdx) {
    const firstDay = new Date(year, monthIdx, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;   // Monday = 0
    const lastDate = new Date(year, monthIdx + 1, 0).getDate();
    let html = '';
    for (let i = 0; i < startOffset; i++) html += '<button class="cal-day cal-day-blank" type="button" disabled></button>';
    for (let d = 1; d <= lastDate; d++) html += `<button class="cal-day" type="button" data-date="${year}-${monthIdx+1}-${d}">${d}</button>`;
    const total = startOffset + lastDate;
    const trail = (7 - (total % 7)) % 7;
    for (let i = 0; i < trail; i++) html += '<button class="cal-day cal-day-blank" type="button" disabled></button>';
    return { title: firstDay.toLocaleString('en-US', { month: 'long', year: 'numeric' }), html };
  }
  function renderCalendar(popover, baseDate) {
    const monthEls = popover.querySelectorAll('.cal-month');
    [0, 1].forEach((offset, i) => {
      const m = baseDate.getMonth() + offset;
      const { title, html } = buildMonth(baseDate.getFullYear() + Math.floor(m / 12), m % 12);
      monthEls[i].querySelector('.cal-title').textContent = title;
      monthEls[i].querySelector('.cal-days').innerHTML = html;
    });
    paintRange(popover);
  }
  function paintRange(popover) {
    const start = popover._start, end = popover._end;
    popover.querySelectorAll('.cal-day:not(.cal-day-blank)').forEach(d => {
      d.classList.remove('selected', 'in-range');
      const date = d.dataset.date;
      if (date === start || date === end) d.classList.add('selected');
      if (start && end) {
        const t = parseISO(date).getTime();
        if (t > parseISO(start).getTime() && t < parseISO(end).getTime()) d.classList.add('in-range');
      }
    });
    const boxes = popover.querySelectorAll('.cal-range-box');
    boxes[0].textContent = start ? fmtRange(start) : '';
    boxes[1].textContent = end ? fmtRange(end) : '';
  }
  // Initialise both calendars to "now"
  document.querySelectorAll('.field-popover-date').forEach(popover => {
    popover._baseDate = new Date();
    popover._oneWay = popover.classList.contains('cal-oneway');
    renderCalendar(popover, popover._baseDate);
  });

  /* ---------- Multi-city legs ---------- */
  const MAX_LEGS = 5;
  const monthMarkup =
    '<div class="cal-month"><div class="cal-head">' +
    '<button class="cal-nav" type="button" aria-label="Previous month"><i class="ph ph-caret-left"></i></button>' +
    '<p class="cal-title">Month Year</p>' +
    '<button class="cal-nav" type="button" aria-label="Next month"><i class="ph ph-caret-right"></i></button></div>' +
    '<div class="cal-dow"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sat</span><span>Su</span></div>' +
    '<div class="cal-days"></div></div>';
  const calMarkup =
    `<div class="cal-grid">${monthMarkup}${monthMarkup}</div>` +
    '<div class="cal-foot">' +
    '<div class="cal-range"><div class="cal-range-box">Start date</div><span class="cal-dash">–</span><div class="cal-range-box">End date</div></div>' +
    '<div class="cal-actions"><button class="cal-cancel" type="button">Cancel</button><button class="cal-apply" type="button">Apply</button></div>' +
    '</div>';
  const legHTML = () =>
    '<div class="flight-fields multi">' +
      '<div class="field is-search" data-field="from"><div class="field-ic"><i class="ph ph-airplane-tilt"></i></div>' +
        '<div class="field-body"><p class="field-label">From where</p><input class="field-input" type="text" autocomplete="off" spellcheck="false" placeholder="City or Airport" /></div>' +
        '<div class="field-dropdown" hidden></div></div>' +
      '<button class="swap" type="button" aria-label="Swap From and To">⇆</button>' +
      '<div class="field is-search" data-field="to"><div class="field-ic"><i class="ph ph-map-pin"></i></div>' +
        '<div class="field-body"><p class="field-label">To where</p><input class="field-input" type="text" autocomplete="off" spellcheck="false" placeholder="City or Airport" /></div>' +
        '<div class="field-dropdown" hidden></div></div>' +
      '<div class="field is-popover" data-field="date"><div class="field-ic"><i class="ph ph-calendar-blank"></i></div>' +
        '<div class="field-body"><p class="field-label">Leaving on</p><p class="field-value">Select date</p></div>' +
        `<div class="field-popover field-popover-date cal-oneway" hidden>${calMarkup}</div></div>` +
      '<button class="leg-remove" type="button" aria-label="Remove this flight" hidden><i class="ph ph-x"></i></button>' +
    '</div>';

  function initDatePopover(popover, oneWay) {
    popover._baseDate = new Date();
    popover._start = null;
    popover._end = null;
    popover._oneWay = !!oneWay;
    if (oneWay) popover.classList.add('cal-oneway');
    renderCalendar(popover, popover._baseDate);
  }
  function legCount() { return document.querySelectorAll('.multi-rows .flight-fields.multi').length; }
  function updateLegChrome() {
    const legs = document.querySelectorAll('.multi-rows .flight-fields.multi');
    legs.forEach(leg => { const rm = leg.querySelector('.leg-remove'); if (rm) rm.hidden = legs.length <= 2; });
    const addBtn = document.querySelector('.add-leg');
    if (addBtn) addBtn.disabled = legs.length >= MAX_LEGS;
  }
  function addLeg() {
    const rows = document.querySelector('.multi-rows');
    if (!rows || legCount() >= MAX_LEGS) return;
    const tmp = document.createElement('div');
    tmp.innerHTML = legHTML();
    const leg = tmp.firstElementChild;
    rows.appendChild(leg);
    initDatePopover(leg.querySelector('.field-popover-date'), true);
    updateLegChrome();
  }
  function ensureMinLegs() {
    const rows = document.querySelector('.multi-rows');
    if (!rows) return;
    while (legCount() < 2) addLeg();
    updateLegChrome();
  }

  // Trip type — One Way uses a single date; Multi-city shows the legs view
  function applyTripMode() {
    const selected = document.querySelector('input[name="trip"]:checked');
    const mode = selected ? selected.value : 'round';
    const oneWay = mode === 'oneway';
    const flightForm = document.querySelector('.flight-form');
    if (!flightForm) return;   // pages without the flight widget (e.g. events.html)
    flightForm.classList.toggle('is-multi', mode === 'multi');
    // Only the standard (round/one-way) date field follows the round/one-way toggle
    document.querySelectorAll('.flight-form > .flight-fields .field-popover-date').forEach(popover => {
      popover._oneWay = oneWay;
      popover.classList.toggle('cal-oneway', oneWay);
      if (oneWay) popover._end = null;
      paintRange(popover);
      const field = popover.closest('.field.is-popover');
      if (oneWay && popover._start) {
        field.querySelector('.field-value').textContent =
          parseISO(popover._start).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      }
    });
    if (mode === 'multi') ensureMinLegs();
  }
  document.querySelectorAll('input[name="trip"]').forEach(r => r.addEventListener('change', applyTripMode));
  applyTripMode();

  /* ---------- Tab switching (Flight / Event / Experiences / Hotels) ---------- */
  document.querySelectorAll('.tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.form;
      document.querySelectorAll('.tabs .tab').forEach(t => t.classList.toggle('active', t === tab));
      document.querySelectorAll('[data-form-panel]').forEach(panel => {
        panel.hidden = panel.dataset.formPanel !== target;
      });
      closeAllFieldUI();
    });
  });

  // Unified click handler
  document.addEventListener('click', e => {
    /* FLIGHT SEARCH — go to the results page with the chosen route */
    if (e.target.closest('.flight-form .flight-search')) {
      const form = document.querySelector('.flight-form');
      const isMulti = form.classList.contains('is-multi');
      const scope = isMulti
        ? form.querySelector('.multi-rows .flight-fields.multi')
        : form.querySelector('.flight-fields');
      const fromField = scope.querySelector('[data-field="from"]');
      const toField = scope.querySelector('[data-field="to"]');
      const fromInput = fromField.querySelector('.field-input');
      const toInput = toField.querySelector('.field-input');
      const dateTxt = (scope.querySelector('[data-field="date"] .field-value') || {}).textContent || '';
      const trip = (document.querySelector('input[name="trip"]:checked') || {}).value || 'round';
      const cityFromInput = el => (el.value || '').split(/[(,]/)[0].trim();
      const sp = new URLSearchParams();
      sp.set('from', cityFromInput(fromInput) || 'Lagos');
      sp.set('fromCode', fromField.dataset.code || 'LOS');
      sp.set('to', cityFromInput(toInput) || 'Abuja');
      sp.set('toCode', toField.dataset.code || 'ABV');
      sp.set('trip', trip === 'multi' ? 'oneway' : trip);
      if (dateTxt.trim()) {
        const parts = dateTxt.split('–');
        sp.set('depart', parts[0].trim());
        if (parts[1] && trip === 'round') sp.set('return', parts[1].trim());
      }
      const trav = document.querySelector('.flight-form [data-field="trav"] .field-value');
      if (trav) {
        const [paxPart, classPart] = trav.textContent.split(',');
        if (paxPart) sp.set('pax', paxPart.replace('Traveller', 'Passenger').trim());
        if (classPart) sp.set('class', classPart.trim());
      }
      window.location.href = 'flights.html?' + sp.toString();
      return;
    }

    /* ADD ANOTHER CITY */
    if (e.target.closest('.add-leg')) { addLeg(); return; }

    /* REMOVE a multi-city leg */
    if (e.target.closest('.leg-remove')) {
      const leg = e.target.closest('.flight-fields.multi');
      if (leg && legCount() > 2) { leg.remove(); updateLegChrome(); }
      return;
    }

    /* SWAP — exchange From and To within this row */
    if (e.target.closest('.swap')) {
      const row = e.target.closest('.flight-fields');
      const fields = row ? row.querySelectorAll('.field.is-search') : [];
      if (fields.length === 2) {
        const [from, to] = fields;
        const fromIn = from.querySelector('.field-input');
        const toIn = to.querySelector('.field-input');
        [fromIn.value, toIn.value] = [toIn.value, fromIn.value];
        [from.dataset.code, to.dataset.code] = [to.dataset.code || '', from.dataset.code || ''];
        [from, to].forEach(f =>
          f.querySelector('.field-input').value.trim()
            ? f.classList.add('has-value')
            : f.classList.remove('has-value'));
      }
      return;
    }

    /* SEARCH FIELDS — picking a city/airport from the dropdown */
    const ddItem = e.target.closest('.field.is-search .dd-item');
    if (ddItem) {
      const field = ddItem.closest('.field.is-search');
      const input = field.querySelector('.field-input');
      input.value = ddItem.dataset.display || ddItem.querySelector('.dd-name').textContent;
      field.dataset.code = ddItem.dataset.code || '';
      field.classList.add('has-value');
      field.classList.remove('is-active');
      field.querySelector('.field-dropdown').setAttribute('hidden', '');
      return;
    }

    /* CALENDAR — month nav */
    const navBtn = e.target.closest('.field-popover-date .cal-nav');
    if (navBtn) {
      const popover = navBtn.closest('.field-popover-date');
      const dir = navBtn.matches(':first-child') || navBtn.getAttribute('aria-label') === 'Previous month' ? -1 : 1;
      // Determine prev vs next by position within its .cal-head
      const head = navBtn.parentElement;
      const isPrev = navBtn === head.firstElementChild;
      popover._baseDate = new Date(popover._baseDate.getFullYear(), popover._baseDate.getMonth() + (isPrev ? -1 : 1), 1);
      renderCalendar(popover, popover._baseDate);
      return;
    }

    /* CALENDAR — day click */
    const day = e.target.closest('.field-popover-date .cal-day:not(.cal-day-blank)');
    if (day) {
      const popover = day.closest('.field-popover-date');
      const date = day.dataset.date;
      if (popover._oneWay) {
        popover._start = date;
        popover._end = null;
      } else if (!popover._start || (popover._start && popover._end)) {
        popover._start = date;
        popover._end = null;
      } else if (parseISO(date).getTime() < parseISO(popover._start).getTime()) {
        popover._end = popover._start;
        popover._start = date;
      } else {
        popover._end = date;
      }
      paintRange(popover);
      return;
    }

    /* CALENDAR — Cancel */
    if (e.target.closest('.cal-cancel')) {
      e.target.closest('.field-popover').setAttribute('hidden', '');
      return;
    }
    /* CALENDAR — Apply */
    if (e.target.closest('.cal-apply')) {
      const field = e.target.closest('.field.is-popover');
      const popover = field.querySelector('.field-popover-date');
      if (popover._oneWay) {
        if (popover._start) {
          const start = parseISO(popover._start).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
          field.querySelector('.field-value').textContent = start;
          field.classList.add('has-value');
        }
      } else if (popover._start && popover._end) {
        const start = parseISO(popover._start).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const end = parseISO(popover._end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        field.querySelector('.field-value').textContent = `${start} – ${end}`;
        field.classList.add('has-value');
      }
      popover.setAttribute('hidden', '');
      return;
    }

    /* TRAVELLER — counter +/- */
    const cntBtn = e.target.closest('.cnt-btn');
    if (cntBtn) {
      const popover = cntBtn.closest('.field-popover');
      const valEl = popover.querySelector(`.cnt-val[data-counter="${cntBtn.dataset.counter}"]`);
      let v = parseInt(valEl.textContent, 10) + parseInt(cntBtn.dataset.delta, 10);
      const min = cntBtn.dataset.min != null ? parseInt(cntBtn.dataset.min, 10) : (cntBtn.dataset.counter === 'adult' ? 1 : 0);
      v = Math.max(min, Math.min(9, v));
      valEl.textContent = v;
      return;
    }

    /* TRAVELLER — class option */
    const csOpt = e.target.closest('.cs-option');
    if (csOpt) {
      const popover = csOpt.closest('.field-popover');
      popover.querySelector('.cs-value').textContent = csOpt.dataset.class;
      popover.querySelectorAll('.cs-option').forEach(o => o.classList.remove('selected'));
      csOpt.classList.add('selected');
      return;
    }

    /* GUEST (hotels) — Done */
    if (e.target.closest('.guest-done')) {
      const field = e.target.closest('.field.is-popover');
      const popover = field.querySelector('.field-popover-guest');
      const get = name => parseInt(popover.querySelector(`.cnt-val[data-counter="${name}"]`).textContent, 10);
      const adults = get('adult'), child = get('child'), rooms = get('room');
      field.querySelector('.field-value').textContent =
        `${adults} adult${adults !== 1 ? 's' : ''} • ${child} child • ${rooms} Room${rooms !== 1 ? 's' : ''}`;
      field.classList.add('has-value');
      popover.setAttribute('hidden', '');
      return;
    }

    /* TRAVELLER — Done */
    if (e.target.closest('.trav-done')) {
      const field = e.target.closest('.field.is-popover');
      const popover = field.querySelector('.field-popover-trav');
      const counts = {};
      popover.querySelectorAll('.cnt-val').forEach(el => counts[el.dataset.counter] = parseInt(el.textContent, 10));
      const total = (counts.adult || 0) + (counts.child || 0) + (counts.infant || 0);
      const cls = popover.querySelector('.cs-value').textContent;
      field.querySelector('.field-value').textContent = `${total} Traveller${total !== 1 ? 's' : ''}, ${cls}`;
      field.classList.add('has-value');
      popover.setAttribute('hidden', '');
      return;
    }

    /* SELECT popover — Location / Category option */
    const selOpt = e.target.closest('.sel-option');
    if (selOpt) {
      const field = selOpt.closest('.field.is-popover');
      const popover = selOpt.closest('.field-popover-select');
      field.querySelector('.field-value').textContent = selOpt.dataset.value;
      popover.querySelectorAll('.sel-option').forEach(o => o.classList.remove('selected'));
      selOpt.classList.add('selected');
      popover.setAttribute('hidden', '');
      return;
    }

    /* Any other click inside an open popover — keep it open */
    if (e.target.closest('.field-popover')) return;

    /* OPEN handler — close everything, then open whichever field was clicked (if any) */
    closeAllFieldUI();
    const searchField = e.target.closest('.field.is-search');
    if (searchField) {
      searchField.classList.add('is-active');
      const input = searchField.querySelector('.field-input');
      renderDropdown(searchField, searchField.dataset.code ? '' : input.value.trim());
      searchField.querySelector('.field-dropdown').removeAttribute('hidden');
      input.focus();
      input.select();
      return;
    }
    const popoverField = e.target.closest('.field.is-popover');
    if (popoverField) { popoverField.querySelector('.field-popover').removeAttribute('hidden'); return; }
  });
})();
