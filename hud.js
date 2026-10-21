(function () {
  if (!document.getElementById('porta-hud-css')) {
    var st = document.createElement('style'); st.id = 'porta-hud-css';
    st.textContent =
      '.ph{--t:var(--text-primary,#1a1a1a);--d:var(--text-secondary,#707070);--bg:var(--surface-1,#f4f3ef);--tr:rgba(128,128,128,.2);' +
      '--ok:#3B9A7A;--mid:#C8962E;--hot:#D2553F;font-family:var(--font-sans,system-ui,sans-serif);color:var(--t)}' +
      '@media (prefers-color-scheme:dark){.ph{--t:var(--text-primary,#ececec);--d:var(--text-secondary,#a3a3a3);--bg:var(--surface-1,#30302e);--ok:#6FC3A4;--mid:#E3B45A;--hot:#EE7A66}}' +
      '.ph button{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent}.ph button:focus-visible{outline:2px solid var(--d);outline-offset:2px;border-radius:6px}.ph button:active{opacity:.6}' +
      '.ph .g{flex:1;min-width:0;display:block}.ph .gl{display:flex;justify-content:space-between;font-size:11px;line-height:14px;color:var(--d)}' +
      '.ph .gv{font-weight:600;font-variant-numeric:tabular-nums}.ph .gt{position:relative;display:block;height:4px;border-radius:2px;background:var(--tr);margin-top:4px}' +
      '.ph .gf{display:block;height:100%;border-radius:2px}';
    document.head.appendChild(st);
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  function gauge(label, v, warn, hot, cmd, tick) {
    var ok = !isNaN(v), p = ok ? Math.max(0, Math.min(100, v)) : 0;
    var col = !ok ? 'var(--d)' : p >= hot ? 'var(--hot)' : p >= warn ? 'var(--mid)' : 'var(--ok)';
    return '<button class="g" data-cmd="' + cmd + '" aria-label="' + esc(label) + ' ' + (ok ? p + '%' : 'unknown') + '">' +
      '<span class="gl"><span>' + esc(label) + '</span><span class="gv" style="color:' + col + '">' + (ok ? p + '%' : '—') + '</span></span>' +
      '<span class="gt"><span class="gf" style="width:' + p + '%;background:' + col + '"></span>' +
      (tick ? '<span style="position:absolute;left:' + tick + '%;top:-2px;width:1.5px;height:8px;background:var(--d)"></span>' : '') + '</span></button>';
  }
  var ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
  document.querySelectorAll('[data-hud]').forEach(function (el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    var d = el.dataset, c = parseInt(d.c, 10), w = parseInt(d.w, 10), due = c >= 65, wHot = w >= 90;
    var meta = [(d.m || '').split('|').filter(Boolean).join(' + '), d.t ? d.t + ' tokens' : '', d.time || ''].filter(Boolean).map(esc).join('  ·  ');
    var jobs = (d.j || '').split('|').filter(Boolean).map(function (x) {
      var i = x.lastIndexOf(':'), n = i > 0 ? x.slice(0, i) : x, v = i > 0 ? x.slice(i + 1) : '', p = parseInt(v, 10);
      return '<button data-cmd="status of ' + esc(n) + '" style="font-size:11px;line-height:14px;color:var(--d)">' + esc(n) + ' <b style="font-weight:600;color:var(--t)">' + esc(v ? (isNaN(p) ? v : p + '%') : '') + '</b></button>';
    }).join('<span style="color:var(--d);opacity:.5">  ·  </span>');
    el.innerHTML =
      '<div class="ph" style="box-sizing:border-box;width:100%;background:var(--bg);border-radius:12px;padding:10px 12px">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
          '<div style="flex:1;min-width:0;font-size:13px;font-weight:600;line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(d.p || 'This chat') + '</div>' +
          '<button data-cmd="handoff" aria-label="Handoff to a new chat" style="display:flex;align-items:center;gap:5px;height:26px;padding:0 9px;border-radius:13px;font-size:11px;font-weight:600;flex:none;' +
            (due ? 'background:var(--mid);color:#fff' : 'color:var(--d);box-shadow:inset 0 0 0 1px var(--tr)') + '">' + (due ? 'New chat' : 'Handoff') + ICON + '</button>' +
        '</div>' +
        '<div style="display:flex;gap:14px;margin-top:8px">' +
          gauge('Chat', c, 50, 65, 'explain usage', 65) +
          (isNaN(w) ? '' : gauge((d.a ? d.a + ' ' : '') + 'week', w, 75, 90, wHot ? 'switch to the account with most room' : 'explain usage', 0)) +
        '</div>' +
        (meta ? '<div style="margin-top:8px;font-size:11px;line-height:14px;color:var(--d);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + meta + '</div>' : '') +
        (jobs ? '<div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:0 4px">' + jobs + '</div>' : '') +
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
