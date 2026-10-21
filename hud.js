(function () {
  if (!document.getElementById('porta-hud-css')) {
    var F = document.createElement('link'); F.rel = 'stylesheet';
    F.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap';
    document.head.appendChild(F);
    var st = document.createElement('style'); st.id = 'porta-hud-css';
    st.textContent =
      /* shared */
      '.ph{position:relative;overflow:hidden;box-sizing:border-box;width:100%;border-radius:14px;padding:11px 13px;color:var(--t);font-family:Inter,system-ui,sans-serif;background:var(--bg);border:1px solid var(--edge);animation:phBreathe 4s ease-in-out infinite}' +
      '.ph:before{content:"";position:absolute;inset:-40% -10%;background:var(--aura);animation:phDrift 9s ease-in-out infinite alternate;pointer-events:none}' +
      '.ph:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,var(--scan) 0 1px,transparent 1px 3px);animation:phScan 7s linear infinite;pointer-events:none;mix-blend-mode:overlay}' +
      '.ph>*{position:relative;z-index:1}' +
      '.ph button{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent}.ph button:focus-visible{outline:2px solid var(--ok);outline-offset:2px;border-radius:6px}.ph button:active{opacity:.7}' +
      '.ph .ttl{font-size:13.5px;font-weight:800;letter-spacing:.02em}' +
      '.ph .g{flex:1;min-width:0;display:block}.ph .gl{display:flex;justify-content:space-between;font-size:11px;line-height:14px;color:var(--d)}' +
      '.ph .gv{font-weight:700;font-variant-numeric:tabular-nums}' +
      '.ph .gt{position:relative;display:block;height:5px;border-radius:3px;background:var(--tr);margin-top:5px}' +
      '.ph .gf{position:relative;display:block;height:100%;border-radius:3px;width:0;transition:width 1.1s cubic-bezier(.2,.8,.2,1);overflow:hidden}' +
      '.ph .gf:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:translateX(-100%);animation:phShine 2.8s ease-in-out 1.2s infinite}' +
      '.ph .hb{display:flex;align-items:center;gap:5px;height:26px;padding:0 10px;border-radius:13px;font-size:11px;font-weight:700;flex:none;color:var(--d);box-shadow:inset 0 0 0 1px var(--hbl)}' +
      '.ph .hb.due{color:var(--hbt);background:var(--hbg);box-shadow:0 0 14px var(--hglow);animation:phPulse 1.8s ease-in-out infinite}' +
      '.ph .meta{font-size:11px;line-height:14px;color:var(--d)}.ph .meta b{color:var(--t);font-weight:600}' +
      /* synthwave chrome */
      '.ph.chrome{--t:#F4ECFF;--d:#B9A6D9;--tr:rgba(255,255,255,.09);--ok:#3EF2E0;--mid:#FFB86B;--hot:#FF4FB4;--pu:#B26BFF;--scan:rgba(255,255,255,.05);' +
      '--bg:linear-gradient(135deg,#1A0B33 0%,#120A2A 45%,#071B33 100%);--edge:rgba(178,107,255,.45);--glow:rgba(178,107,255,.35);' +
      '--aura:radial-gradient(40% 50% at 15% 0%,rgba(255,79,180,.22),transparent 70%),radial-gradient(40% 50% at 90% 100%,rgba(62,242,224,.18),transparent 70%);' +
      '--hbl:rgba(185,166,217,.35);--hbt:#1A0B33;--hbg:linear-gradient(90deg,#FF4FB4,#B26BFF);--hglow:rgba(255,79,180,.7)}' +
      '.ph.chrome .ttl{background:linear-gradient(180deg,#FFFFFF 0%,#E6E9FF 38%,#8C7BB8 52%,#F2D9FF 70%,#FFFFFF 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 6px rgba(178,107,255,.75))}' +
      /* soft pastel */
      '.ph.pastel{--t:#4A3B66;--d:#7D6E9C;--tr:rgba(110,90,160,.14);--ok:#239189;--mid:#D47A26;--hot:#D9468A;--pu:#B59CF0;--scan:rgba(255,255,255,.25);' +
      '--bg:linear-gradient(135deg,#FCE7F3 0%,#EDE4FF 50%,#DDF4FF 100%);--edge:rgba(181,156,240,.55);--glow:rgba(238,122,174,.30);' +
      '--aura:radial-gradient(40% 50% at 15% 0%,rgba(255,182,219,.55),transparent 70%),radial-gradient(40% 50% at 90% 100%,rgba(160,226,255,.55),transparent 70%);' +
      '--hbl:rgba(125,110,156,.35);--hbt:#fff;--hbg:linear-gradient(90deg,#EE7AAE,#B59CF0);--hglow:rgba(238,122,174,.55)}' +
      '.ph.pastel .ttl{color:#5B3F8C;text-shadow:0 0 10px rgba(255,255,255,.9)}' +
      /* motion */
      '@keyframes phShine{0%{transform:translateX(-100%)}60%,100%{transform:translateX(100%)}}' +
      '@keyframes phPulse{0%,100%{box-shadow:0 0 8px var(--hglow)}50%{box-shadow:0 0 20px var(--hglow)}}' +
      '@keyframes phDrift{from{transform:translate(-4%,-3%)}to{transform:translate(4%,3%)}}' +
      '@keyframes phScan{from{background-position:0 0}to{background-position:0 60px}}' +
      '@keyframes phBreathe{0%,100%{box-shadow:0 0 10px var(--glow)}50%{box-shadow:0 0 22px var(--glow)}}' +
      '@media (prefers-reduced-motion:reduce){.ph,.ph *,.ph:before,.ph:after{animation:none!important;transition:none!important}}';
    document.head.appendChild(st);
  }
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  function gauge(label, v, warn, hot, cmd, tick) {
    var ok = !isNaN(v), p = ok ? Math.max(0, Math.min(100, v)) : 0;
    var col = !ok ? 'var(--d)' : p >= hot ? 'var(--hot)' : p >= warn ? 'var(--mid)' : 'var(--ok)';
    return '<button class="g" data-cmd="' + cmd + '" aria-label="' + esc(label) + ' ' + (ok ? p + '%' : 'unknown') + '">' +
      '<span class="gl"><span>' + esc(label) + '</span><span class="gv" style="color:' + col + ';text-shadow:0 0 8px ' + col + '">' +
      (ok ? '<span class="cu" data-n="' + p + '">' + (still ? p : 0) + '</span>%' : '—') + '</span></span>' +
      '<span class="gt"><span class="gf" data-w="' + p + '" style="background:linear-gradient(90deg,var(--pu),' + col + ');box-shadow:0 0 10px ' + col + '"></span>' +
      (tick ? '<span style="position:absolute;left:' + tick + '%;top:-3px;width:2px;height:11px;border-radius:1px;background:var(--t);opacity:.6"></span>' : '') + '</span></button>';
  }
  var ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
  document.querySelectorAll('[data-hud]').forEach(function (el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    var d = el.dataset, theme = d.theme === 'pastel' ? 'pastel' : 'chrome';
    var c = parseInt(d.c, 10), w = parseInt(d.w, 10), due = c >= 65, wHot = w >= 90;
    var meta = [(d.m || '').split('|').filter(Boolean).join(' + '), d.t ? d.t + ' tokens' : '', d.time || ''].filter(Boolean).map(esc).join('  ·  ');
    var jobs = (d.j || '').split('|').filter(Boolean).map(function (x) {
      var i = x.lastIndexOf(':'), n = i > 0 ? x.slice(0, i) : x, v = i > 0 ? x.slice(i + 1) : '', p = parseInt(v, 10);
      return '<button class="meta" data-cmd="status of ' + esc(n) + '">' + esc(n) + ' <b>' + esc(v ? (isNaN(p) ? v : p + '%') : '') + '</b></button>';
    }).join('<span class="meta" style="opacity:.5">  ·  </span>');
    el.innerHTML =
      '<div class="ph ' + theme + '">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
          '<div class="ttl" style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(d.p || 'This chat') + '</div>' +
          '<button class="hb' + (due ? ' due' : '') + '" data-cmd="handoff" aria-label="Handoff to a new chat">' + (due ? 'New chat' : 'Handoff') + ICON + '</button>' +
        '</div>' +
        '<div style="display:flex;gap:14px;margin-top:9px">' +
          gauge('Chat', c, 50, 65, 'explain usage', 65) +
          (isNaN(w) ? '' : gauge((d.a ? d.a + ' ' : '') + 'week', w, 75, 90, wHot ? 'switch to the account with most room' : 'explain usage', 0)) +
        '</div>' +
        (meta ? '<div class="meta" style="margin-top:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + meta + '</div>' : '') +
        (jobs ? '<div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:0 4px">' + jobs + '</div>' : '') +
      '</div>';
    var fills = el.querySelectorAll('.gf'), nums = el.querySelectorAll('.cu');
    if (still) { fills.forEach(function (f) { f.style.width = f.dataset.w + '%'; }); }
    else {
      setTimeout(function () { fills.forEach(function (f) { f.style.width = f.dataset.w + '%'; }); }, 60);
      var t0 = null;
      (function tick(ts) {
        if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 1100), e = 1 - Math.pow(1 - k, 3);
        nums.forEach(function (n) { n.textContent = Math.round(e * +n.dataset.n); });
        if (k < 1) requestAnimationFrame(tick);
      })(performance.now());
    }
    el.querySelectorAll('[data-cmd]').forEach(function (b) {
      b.onclick = function () {
        if (b.dataset.busy || !window.sendPrompt) return; b.dataset.busy = 1;
        try { sendPrompt(b.dataset.cmd); } catch (e) {}
        setTimeout(function () { delete b.dataset.busy; }, 4000);
      };
    });
  });
})();
