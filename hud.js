(function () {
  if (!document.getElementById('porta-hud-css')) {
    var st = document.createElement('style'); st.id = 'porta-hud-css';
    st.textContent =
      '.ph{--ph-t:var(--text-primary,#1a1a1a);--ph-d:var(--text-secondary,#6b6b6b);--ph-l:var(--border,rgba(0,0,0,.12));--ph-tr:rgba(128,128,128,.22);' +
      '--ph-ok:#3B9A7A;--ph-mid:#C8962E;--ph-hot:#D2553F;font-family:var(--font-sans,system-ui,sans-serif);color:var(--ph-t)}' +
      '@media (prefers-color-scheme:dark){.ph{--ph-t:var(--text-primary,#eee);--ph-d:var(--text-secondary,#a3a3a3);--ph-l:var(--border,rgba(255,255,255,.14));--ph-ok:#6FC3A4;--ph-mid:#E3B45A;--ph-hot:#EE7A66}}' +
      '.ph button{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent}.ph button:focus-visible{outline:2px solid var(--ph-d);outline-offset:2px;border-radius:4px}.ph button:active{opacity:.6}' +
      '.ph .nw{white-space:nowrap}.ph .mono{font-family:var(--font-mono,ui-monospace,monospace)}';
    document.head.appendChild(st);
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  function tone(v, warn, hot) { return v >= hot ? 'var(--ph-hot)' : v >= warn ? 'var(--ph-mid)' : 'var(--ph-ok)'; }
  var ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
  document.querySelectorAll('[data-hud]').forEach(function (el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    var d = el.dataset, raw = parseInt(d.c, 10), known = !isNaN(raw), c = known ? Math.max(0, Math.min(100, raw)) : 0;
    var col = known ? tone(c, 50, 65) : 'var(--ph-d)', due = known && c >= 65;
    var w = parseInt(d.w, 10), hasW = !isNaN(w), wHot = hasW && w >= 90;
    var models = (d.m || '').split('|').filter(Boolean).map(esc).join('+');
    var meta = [models, d.t ? esc(d.t) : '', d.time ? esc(d.time) : ''].filter(Boolean).join(' · ');
    var jobs = (d.j || '').split('|').filter(Boolean).map(function (x) {
      var i = x.lastIndexOf(':'), n = i > 0 ? x.slice(0, i) : x, v = i > 0 ? x.slice(i + 1) : '', p = parseInt(v, 10);
      var lab = v ? (isNaN(p) ? v : p + '%') : '';
      return '<button class="nw" data-cmd="status of ' + esc(n) + '" style="color:var(--ph-d);text-decoration:underline dotted;text-underline-offset:2px">↳ ' + esc(n) + (lab ? ' ' + esc(lab) : '') + '</button>';
    }).join('<span style="opacity:.5"> · </span>');
    el.innerHTML =
      '<div class="ph" style="box-sizing:border-box;width:100%;border-top:0.5px solid var(--ph-l);padding:7px 2px 2px">' +
      '<div style="display:flex;align-items:center;gap:8px;font-size:12px;line-height:16px">' +
        (d.p ? '<span class="nw" style="max-width:28%;overflow:hidden;text-overflow:ellipsis;color:var(--ph-d);font-size:11px">' + esc(d.p) + '</span>' : '') +
        '<button data-cmd="explain usage" class="nw mono" aria-label="Context ' + c + '%, explain usage" style="font-size:13px;font-weight:600;color:' + col + '">' + (known ? c + '%' : '—') + '</button>' +
        '<span role="meter" aria-label="Context used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + c + '" style="position:relative;flex:1;min-width:30px;height:4px;border-radius:2px;background:var(--ph-tr)">' +
          '<span style="display:block;height:100%;width:' + c + '%;border-radius:2px;background:' + col + '"></span>' +
          '<span style="position:absolute;left:65%;top:-2px;width:1.5px;height:8px;background:var(--ph-d)"></span></span>' +
        (hasW ? '<button data-cmd="' + (wHot ? 'switch to the account with most room' : 'explain usage') + '" class="nw mono" style="font-size:11px;color:' + (wHot ? 'var(--ph-hot);font-weight:600' : 'var(--ph-d)') + '">' + (d.a ? esc(d.a) + ' ' : '') + w + '%wk</button>' : '') +
        '<button data-cmd="handoff" aria-label="Handoff" title="Handoff" style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:7px;flex:none;' +
          (due ? 'background:var(--ph-mid);color:#fff' : 'color:var(--ph-d);box-shadow:inset 0 0 0 0.5px var(--ph-l)') + '">' + ICON + '</button>' +
      '</div>' +
      ((meta || jobs) ? '<div class="mono" style="margin-top:2px;font-size:10.5px;line-height:15px;color:var(--ph-d);display:flex;flex-wrap:wrap;column-gap:6px">' +
        (meta ? '<span class="nw">' + meta + '</span>' : '') + (jobs ? (meta ? '<span style="opacity:.5">·</span>' : '') + jobs : '') + '</div>' : '') +
      (due ? '<div style="margin-top:2px;font-size:11px;color:var(--ph-hot);font-weight:500">Tap ↗ to hand off and start a new chat</div>' : '') +
      '</div>';
    el.querySelectorAll('[data-cmd]').forEach(function (b) {
      b.onclick = function () {
        if (b.dataset.busy || !window.sendPrompt) return; b.dataset.busy = 1;
        try { sendPrompt(b.dataset.cmd); } catch (e) {}
        setTimeout(function () { delete b.dataset.busy; }, 4000);
      };
    });
  });
})();
