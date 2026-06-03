/* Shared flight-flow step indicator.
   Usage: <div id="stepper" data-step="2"></div><script src="stepper.js"></script>
   data-step is 1-based: 1 Flight Search, 2 Traveller Info, 3 Travel Essentials, 4 Payment. */
(function () {
  var STEPS = ['Flight Search', 'Traveller Info', 'Travel Essentials', 'Payment'];
  var el = document.getElementById('stepper');
  if (!el) return;
  var current = Math.max(1, Math.min(STEPS.length, parseInt(el.dataset.step, 10) || 1));

  var html = '<div class="container step-wrap"><ol class="step-list">';
  STEPS.forEach(function (label, i) {
    var n = i + 1;
    var state = n < current ? 'done' : (n === current ? 'current' : 'upcoming');
    if (i > 0) {
      html += '<li class="step-line ' + (n <= current ? 'filled' : '') + '" aria-hidden="true"></li>';
    }
    html += '<li class="step ' + state + '" aria-current="' + (state === 'current' ? 'step' : 'false') + '">' +
              '<span class="step-dot">' + (state === 'done' ? '<i class="ph ph-check"></i>' : n) + '</span>' +
              '<span class="step-label">' + label + '</span>' +
            '</li>';
  });
  html += '</ol>';
  html += '<p class="step-caption">Step ' + current + ' of ' + STEPS.length + ' · <b>' + STEPS[current - 1] + '</b></p>';
  html += '</div>';
  el.innerHTML = html;
  el.classList.add('stepper');
})();
