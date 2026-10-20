(function () {
  var F = document.createElement('link');
  F.rel = 'stylesheet';
  F.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Cinzel:wght@500&display=swap';
  document.head.appendChild(F);
  var T = {
    brand: { bg: '#0A1019', line: 'rgba(169,190,210,.14)', text: '#F2F5F9', dim: '#8C95A2', acc: '#D9B26A', steel: '#A9BED2',
      ok: '#7FB6A2', mid: '#D9B26A', hot: '#D9776A', off: 'rgba(169,190,210,.13)', eyebrow: "'Cinzel',serif" },
    hud: { bg: '#05080D', line: 'rgba(80,200,255,.22)', text: '#E8F6FF', dim: '#6E8AA0', acc: '#4FD8FF', steel: '#4FD8FF',
      ok: '#38F2B0', mid: '#FFC24D', hot: '#FF4D6D', off: 'rgba(79,216,255,.10)', eyebrow: "'JetBrains Mono',monospace" }
  };
  var mono = "'JetBrains Mono',ui-monospace,monospace", sans = "'Inter',system-ui,sans-serif";
  document.querySelectorAll('[data-hud]').forEach(function (el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    var th = T[el.dataset.theme] || T.brand;
    var c = Math.max(0, Math.min(100, parseInt(el.dataset.c || '0', 10)));
    var tone = c > 75 ? th.hot : c >= 50 ? th.mid : th.ok;
    var label = c > 75 ? 'NEW CHAT' : c >= 50 ? 'FILLING' : 'ROOMY';
    var models = (el.dataset.m || '').split('|').filter(Boolean);
    var jobs = (el.dataset.j || '').split('|').filter(Boolean).map(function (x) { var p = x.split(':'); return { n: p[0], p: +(p[1] || 0) }; });
    var gpt = el.dataset.g === '1', segs = 30, on = Math.round(c / 100 * segs);
    var dot = '<span style="color:' + th.line + ';margin:0 6px">·</span>';
    var meta = models.map(function (m, i) { return '<span style="color:' + (i ? th.dim : th.text) + '">' + m + '</span>'; }).join(dot) +
      dot + '<span style="color:' + (gpt ? th.ok : th.dim) + '">GPT ' + (gpt ? '✓' : '—') + '</span>' +
      (el.dataset.time ? dot + '<span style="color:' + th.dim + '">' + el.dataset.time + '</span>' : '');
    var bar = ''; for (var i = 0; i < segs; i++) bar += '<i class="hs" style="display:block;height:6px;border-radius:1px;background:' + th.off + ';transition:background .25s"></i>';
    var jobHtml = jobs.map(function (j) {
      return '<div style="display:flex;align-items:center;gap:8px;margin-top:6px;font:400 11px ' + mono + ';color:' + th.dim + '">' +
        '<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">↳ ' + j.n + '</span>' +
        '<span style="width:56px;height:3px;border-radius:2px;background:' + th.off + ';overflow:hidden"><span style="display:block;height:100%;width:' + j.p + '%;background:' + th.steel + '"></span></span>' +
        '<span style="width:28px;text-align:right">' + j.p + '%</span></div>';
    }).join('');
    var btn = function (txt, cmd) { return '<button data-cmd="' + cmd + '" style="all:unset;cursor:pointer;font:500 10px ' + mono + ';letter-spacing:.08em;color:' + th.acc + '">' + txt + ' ↗</button>'; };
    el.innerHTML =
      '<div style="background:' + th.bg + ';border:1px solid ' + th.line + ';border-radius:14px;padding:10px 14px 11px;color:' + th.text + '">' +
      '<div style="display:flex;align-items:center;gap:10px">' +
      '<span style="font:500 10px ' + th.eyebrow + ';letter-spacing:.26em;color:' + th.acc + '">PORTA</span>' +
      '<span style="font:600 18px ' + sans + ';letter-spacing:-.01em">' + c + '<span style="font-size:11px;color:' + th.dim + '">%</span></span>' +
      '<span style="flex:1;display:grid;grid-template-columns:repeat(' + segs + ',1fr);gap:2px">' + bar + '</span>' +
      '<span style="font:500 11px ' + mono + ';color:' + th.steel + '">' + (el.dataset.t || '') + '</span>' +
      '<span class="hd" title="' + label + '" style="width:6px;height:6px;border-radius:50%;background:' + tone + '"></span></div>' +
      '<div style="display:flex;align-items:center;gap:10px;margin-top:8px;font:400 11px ' + mono + '">' +
      '<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + meta + '</span>' +
      btn('HANDOFF', 'handoff') + btn('USAGE', 'explain usage') + '</div>' +
      jobHtml + '</div>';
    el.querySelectorAll('.hs').forEach(function (n, i) {
      if (i < on) setTimeout(function () { n.style.background = tone; }, 20 * i);
    });
    var d = el.querySelector('.hd'); if (d && d.animate) d.animate([{ opacity: 1 }, { opacity: .3 }, { opacity: 1 }], { duration: 1600, iterations: Infinity });
    el.querySelectorAll('[data-cmd]').forEach(function (b) { b.onclick = function () { if (window.sendPrompt) sendPrompt(b.dataset.cmd); }; });
  });
})();
