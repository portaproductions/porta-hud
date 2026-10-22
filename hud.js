(function () {
  var S = document.currentScript, BASE = S && S.src ? S.src.replace(/[^\/]*$/, '') : 'https://cdn.jsdelivr.net/gh/portaproductions/porta-hud@main/';
  if (!document.getElementById('porta-hud-css')) {
    var F = document.createElement('link'); F.rel = 'stylesheet';
    F.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap';
    document.head.appendChild(F);
    var st = document.createElement('style'); st.id = 'porta-hud-css';
    st.textContent =
      '.ph{--t:#F2F5F9;--d:#A9BED2;--tr:rgba(169,190,210,.14);--ok:#7FB6A2;--mid:#D9B26A;--hot:#D9776A;--gold:#D9B26A;' +
      'position:relative;overflow:hidden;box-sizing:border-box;width:100%;border-radius:14px;color:var(--t);font-family:Inter,system-ui,sans-serif;' +
      'border:1.5px solid transparent;background:linear-gradient(160deg,#0D1522,#0A1019) padding-box,linear-gradient(90deg,#D9B26A,#A9BED2,#5E7790,#D9B26A) border-box;background-size:100% 100%,300% 300%;background-repeat:no-repeat;' +
      'animation:phBreathe 4s ease-in-out infinite,phFlow 8s ease-in-out infinite alternate}' +
      '.ph:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.03) 0 1px,transparent 1px 3px);pointer-events:none}' +
      '.ph>*{position:relative;z-index:1}' +
      '.ph button{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent}.ph button:focus-visible{outline:2px solid var(--gold);outline-offset:2px;border-radius:6px}.ph button:active{opacity:.7}' +
      '.ph .top{display:flex;align-items:center;gap:9px;width:100%;box-sizing:border-box;padding:9px 12px}' +
      '.ph .pm{width:34px;height:13px;margin:0 -6px;flex:none;background:var(--gold);-webkit-mask:var(--logo) top center/100% auto no-repeat;mask:var(--logo) top center/100% auto no-repeat;filter:drop-shadow(0 0 4px rgba(217,178,106,.6))}' +
      '.ph .ttl{flex:1;min-width:0;font-size:13px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:linear-gradient(90deg,#E8C98A,#D9B26A,#A9BED2,#D9B26A);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:phFlow 6s ease-in-out infinite alternate}' +
      '.ph .mini{flex:none;font-size:12px;font-weight:700;font-variant-numeric:tabular-nums}' +
      '.ph .chev{flex:none;width:14px;height:14px;color:var(--d);transition:transform .25s}.ph.open .chev{transform:rotate(180deg)}' +
      '.ph .nx{padding:0 12px 9px;margin-top:-3px;font-size:11.5px;line-height:15px;color:var(--d);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ph .nx b{color:var(--t);font-weight:600}' +
      '.ph .more{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}.ph.open .more{grid-template-rows:1fr}.ph .more>div{overflow:hidden}' +
      '.ph .in{padding:2px 12px 11px}' +
      '.ph .g{flex:1;min-width:0;display:block}.ph .gl{display:flex;justify-content:space-between;font-size:11px;line-height:14px;color:var(--d)}' +
      '.ph .gv{font-weight:700;font-variant-numeric:tabular-nums}' +
      '.ph .gt{position:relative;display:block;height:5px;border-radius:3px;background:var(--tr);margin-top:5px}' +
      '.ph .gf{position:relative;display:block;height:100%;border-radius:3px;width:0;transition:width 1.1s cubic-bezier(.2,.8,.2,1);overflow:hidden}' +
      '.ph .gf:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:translateX(-100%);animation:phShine 2.8s ease-in-out 1.2s infinite}' +
      '.ph .meta{font-size:11px;line-height:15px;color:var(--d)}.ph .meta b{color:var(--t);font-weight:600}' +
      '.ph .hb{display:flex;align-items:center;gap:5px;height:26px;padding:0 10px;border-radius:13px;font-size:11px;font-weight:700;flex:none;color:var(--d);box-shadow:inset 0 0 0 1px rgba(169,190,210,.35)}' +
      '.ph .hb.due{color:#0A1019;background:linear-gradient(90deg,#E8C98A,#D9B26A);box-shadow:0 0 14px rgba(217,178,106,.75);animation:phPulse 1.8s ease-in-out infinite}' +
      '@keyframes phFlow{from{background-position:0% 50%,0% 50%}to{background-position:100% 50%,100% 50%}}' +
      '@keyframes phShine{0%{transform:translateX(-100%)}60%,100%{transform:translateX(100%)}}' +
      '@keyframes phPulse{0%,100%{box-shadow:0 0 8px rgba(217,178,106,.55)}50%{box-shadow:0 0 20px rgba(217,178,106,.95)}}' +
      '@keyframes phBreathe{0%,100%{box-shadow:0 0 8px rgba(217,178,106,.30)}50%{box-shadow:0 0 18px rgba(217,178,106,.55)}}' +
      '@media (prefers-reduced-motion:reduce){.ph,.ph *{animation:none!important;transition:none!important}}';
    document.head.appendChild(st);
  }
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  function col(v, warn, hot) { return isNaN(v) ? 'var(--d)' : v >= hot ? 'var(--hot)' : v >= warn ? 'var(--mid)' : 'var(--ok)'; }
  function gauge(label, v, warn, hot, cmd, tick) {
    var ok = !isNaN(v), p = ok ? Math.max(0, Math.min(100, v)) : 0, c = col(v, warn, hot);
    return '<button class="g" data-cmd="' + cmd + '" aria-label="' + esc(label) + ' ' + (ok ? p + '%' : 'unknown') + '">' +
      '<span class="gl"><span>' + esc(label) + '</span><span class="gv" style="color:' + c + ';text-shadow:0 0 8px ' + c + '">' +
      (ok ? '<span class="cu" data-n="' + p + '">' + (still ? p : 0) + '</span>%' : '—') + '</span></span>' +
      '<span class="gt"><span class="gf" data-w="' + p + '" style="background:linear-gradient(90deg,#A9BED2,' + c + ');box-shadow:0 0 10px ' + c + '"></span>' +
      (tick ? '<span style="position:absolute;left:' + tick + '%;top:-3px;width:2px;height:11px;border-radius:1px;background:var(--t);opacity:.6"></span>' : '') + '</span></button>';
  }
  var ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  document.querySelectorAll('[data-hud]').forEach(function (el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    var d = el.dataset, c = parseInt(d.c, 10), w = parseInt(d.w, 10), sv = parseInt(d.s, 10), due = c >= 65, wHot = w >= 90;
    var meta = [(d.m || '').split('|').filter(Boolean).join(' + '), d.t ? d.t + ' tokens' : '', d.time || ''].filter(Boolean).map(esc).join('  ·  ');
    var jobs = (d.j || '').split('|').filter(Boolean).map(function (x) {
      var i = x.lastIndexOf(':'), n = i > 0 ? x.slice(0, i) : x, v = i > 0 ? x.slice(i + 1) : '', p = parseInt(v, 10);
      return '<button class="meta" data-cmd="status of ' + esc(n) + '">' + esc(n) + ' <b>' + esc(v ? (isNaN(p) ? v : p + '%') : '') + '</b></button>';
    }).join('<span class="meta" style="opacity:.5">  ·  </span>');
    var cc = col(c, 50, 65);
    el.innerHTML =
      '<div class="ph" style="--logo:url(' + BASE + 'logo.png)">' +
        '<button class="top" data-tog aria-expanded="false" aria-label="Show details">' +
          '<span class="pm" aria-hidden="true"></span>' +
          '<span class="ttl">' + esc(d.p || 'This chat') + '</span>' +
          '<span class="mini" style="color:' + cc + ';text-shadow:0 0 8px ' + cc + '">' + (isNaN(c) ? '—' : c + '%') + '</span>' +
          (isNaN(w) ? '' : '<span class="mini" style="color:' + col(w, 75, 90) + ';font-weight:600;font-size:11px">' + (d.a ? esc(d.a) + ' ' : '') + w + '%wk</span>') +
          (due ? '<span class="hb due" data-cmd="handoff" role="button" aria-label="Handoff to a new chat">New chat' + ARROW + '</span>' : CHEV) +
        '</button>' +
        (d.n ? '<div class="nx">Next: <b>' + esc(d.n) + '</b></div>' : '') +
        '<div class="more"><div><div class="in">' +
          '<div style="display:flex;gap:14px">' +
            gauge('Chat', c, 50, 65, 'explain usage', 65) +
            (isNaN(w) ? '' : gauge((d.a ? d.a + ' ' : '') + 'week', w, 75, 90, wHot ? 'switch to the account with most room' : 'explain usage', 0)) +
          '</div>' +
          (meta ? '<div class="meta" style="margin-top:9px">' + meta + '</div>' : '') +
          (isNaN(sv) ? '' : '<div class="meta" style="margin-top:3px">Saved by GPT/Ollama: <b style="color:var(--ok)">' + sv + '%</b> of the work</div>') +
          (jobs ? '<div style="margin-top:3px;display:flex;flex-wrap:wrap;gap:0 4px">' + jobs + '</div>' : '') +
          '<div style="display:flex;justify-content:flex-end;margin-top:9px"><button class="hb' + (due ? ' due' : '') + '" data-cmd="handoff" aria-label="Handoff to a new chat">' + (due ? 'New chat' : 'Handoff') + ARROW + '</button></div>' +
        '</div></div></div>' +
      '</div>';
    var ph = el.querySelector('.ph'), fills = el.querySelectorAll('.gf'), nums = el.querySelectorAll('.cu'), ran = false;
    function play() {
      if (ran) return; ran = true;
      if (still) { fills.forEach(function (f) { f.style.width = f.dataset.w + '%'; }); return; }
      setTimeout(function () { fills.forEach(function (f) { f.style.width = f.dataset.w + '%'; }); }, 80);
      var t0 = null;
      (function tick(ts) {
        if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 1100), e = 1 - Math.pow(1 - k, 3);
        nums.forEach(function (n) { n.textContent = Math.round(e * +n.dataset.n); });
        if (k < 1) requestAnimationFrame(tick);
      })(performance.now());
    }
    var tog = el.querySelector('[data-tog]');
    tog.onclick = function (ev) {
      if (ev.target.closest('[data-cmd]')) return;
      var open = ph.classList.toggle('open'); tog.setAttribute('aria-expanded', open); if (open) play();
    };
    el.querySelectorAll('[data-cmd]').forEach(function (b) {
      b.onclick = function (ev) {
        ev.stopPropagation();
        if (b.dataset.busy || !window.sendPrompt) return; b.dataset.busy = 1;
        try { sendPrompt(b.dataset.cmd); } catch (e) {}
        setTimeout(function () { delete b.dataset.busy; }, 4000);
      };
    });
  });
})();
