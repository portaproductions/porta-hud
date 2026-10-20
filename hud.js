(function () {
  var el = document.getElementById('hud');
  if (!el) return;
  var c = Math.max(0, Math.min(100, parseInt(el.dataset.c || '0', 10)));
  var t = el.dataset.t || '';
  var models = (el.dataset.m || '').split('|').filter(Boolean);
  var gpt = el.dataset.g === '1';
  var tone = c > 75 ? 'danger' : c >= 50 ? 'warning' : 'success';
  var label = c > 75 ? 'new chat time' : c >= 50 ? 'getting full' : 'plenty of room';
  var segs = 20, on = Math.round(c / 100 * segs);
  var css = document.createElement('style');
  css.textContent =
    '.ph{font-family:var(--font-sans);background:var(--surface-1);border-radius:12px;padding:12px 14px}' +
    '.ph-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}' +
    '.ph-brand{font-size:11px;letter-spacing:.18em;color:var(--text-muted);font-family:var(--font-mono)}' +
    '.ph-pill{font-size:12px;padding:2px 10px;border-radius:999px;display:flex;align-items:center;gap:6px}' +
    '.ph-dot{width:7px;height:7px;border-radius:50%;animation:phb 1.6s ease-in-out infinite}' +
    '@keyframes phb{50%{opacity:.35}}' +
    '.ph-bar{display:grid;grid-template-columns:repeat(' + segs + ',1fr);gap:3px;margin-bottom:12px}' +
    '.ph-s{height:7px;border-radius:2px;background:var(--fill-disabled);transform:scaleY(.6);transition:all .35s ease}' +
    '.ph-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}' +
    '.ph-num{font-family:var(--font-mono);font-size:20px;font-weight:500;color:var(--text-primary)}' +
    '.ph-k{font-size:11px;color:var(--text-muted);margin-right:2px}' +
    '.ph-chip{font-size:12px;padding:3px 9px;border-radius:var(--radius);background:var(--surface-2);border:.5px solid var(--border);color:var(--text-secondary);display:flex;align-items:center;gap:4px}' +
    '.ph-sep{flex:1}';
  el.appendChild(css);
  var bar = '';
  for (var i = 0; i < segs; i++) bar += '<div class="ph-s"></div>';
  var chips = models.map(function (m, i) {
    return '<span class="ph-chip"><i class="ti ' + (i === 0 ? 'ti-sparkles' : 'ti-users') + '" aria-hidden="true"></i>' + m + '</span>';
  }).join('');
  chips += '<span class="ph-chip" style="' + (gpt ? 'color:var(--text-success)' : 'opacity:.55') + '"><i class="ti ' + (gpt ? 'ti-check' : 'ti-x') + '" aria-hidden="true"></i>GPT</span>';
  var box = document.createElement('div');
  box.className = 'ph';
  box.innerHTML =
    '<h2 class="sr-only">Session status: ' + c + '% context, ' + t + ' tokens.</h2>' +
    '<div class="ph-top"><span class="ph-brand">PORTA · SESSION</span>' +
    '<span class="ph-pill" style="background:var(--bg-' + tone + ');color:var(--text-' + tone + ')">' +
    '<span class="ph-dot" style="background:var(--fill-' + tone + ')"></span>' + c + '% · ' + label + '</span></div>' +
    '<div class="ph-bar">' + bar + '</div>' +
    '<div class="ph-row"><span class="ph-k">tokens</span><span class="ph-num">' + t + '</span><span class="ph-sep"></span>' + chips + '</div>';
  el.appendChild(box);
  box.querySelectorAll('.ph-s').forEach(function (n, i) {
    if (i < on) setTimeout(function () {
      n.style.background = 'var(--fill-' + tone + ')';
      n.style.transform = 'scaleY(1)';
    }, 40 * i);
  });
})();
