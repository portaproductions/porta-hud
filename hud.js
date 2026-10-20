(function () {
  var F = document.createElement('link');
  F.rel = 'stylesheet';
  F.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Cinzel:wght@500&display=swap';
  document.head.appendChild(F);
  var T = {
    brand: { bg: '#0A1019', line: 'rgba(169,190,210,.16)', text: '#F2F5F9', dim: '#8C95A2', acc: '#D9B26A', steel: '#A9BED2',
      ok: '#7FB6A2', mid: '#D9B26A', hot: '#D9776A', off: 'rgba(169,190,210,.14)', eyebrow: "'Cinzel',serif" },
    hud: { bg: '#05080D', line: 'rgba(80,200,255,.22)', text: '#E8F6FF', dim: '#6E8AA0', acc: '#4FD8FF', steel: '#4FD8FF',
      ok: '#38F2B0', mid: '#FFC24D', hot: '#FF4D6D', off: 'rgba(79,216,255,.10)', eyebrow: "'JetBrains Mono',monospace" }
  };
  document.querySelectorAll('[data-hud]').forEach(function (el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    var th = T[el.dataset.theme] || T.brand;
    var c = Math.max(0, Math.min(100, parseInt(el.dataset.c || '0', 10)));
    var tone = c > 75 ? th.hot : c >= 50 ? th.mid : th.ok;
    var label = c > 75 ? 'NEW CHAT TIME' : c >= 50 ? 'GETTING FULL' : 'PLENTY OF ROOM';
    var models = (el.dataset.m || '').split('|').filter(Boolean);
    var jobs = (el.dataset.j || '').split('|').filter(Boolean).map(function (x) { var p = x.split(':'); return { n: p[0], p: +(p[1] || 0) }; });
    var gpt = el.dataset.g === '1', segs = 24, on = Math.round(c / 100 * segs);
    var mono = "'JetBrains Mono',ui-monospace,monospace", sans = "'Inter',system-ui,sans-serif";
    var chip = function (txt, col) { return '<span style="font:500 11px ' + mono + ';letter-spacing:.04em;padding:4px 9px;border-radius:999px;border:1px solid ' + th.line + ';color:' + (col || th.dim) + ';white-space:nowrap">' + txt + '</span>'; };
    var bar = ''; for (var i = 0; i < segs; i++) bar += '<i class="hs" style="display:block;height:10px;border-radius:2px;background:' + th.off + ';transition:background .3s,transform .3s;transform:scaleY(.55)"></i>';
    var jobHtml = jobs.map(function (j) {
      return '<div style="display:flex;align-items:center;gap:8px;margin-top:6px"><span style="font:400 12px ' + sans + ';color:' + th.text + ';flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + j.n + '</span>' +
        '<span style="width:70px;height:4px;border-radius:2px;background:' + th.off + ';overflow:hidden"><span style="display:block;height:100%;width:' + j.p + '%;background:' + th.steel + '"></span></span>' +
        '<span style="font:500 11px ' + mono + ';color:' + th.dim + ';width:32px;text-align:right">' + j.p + '%</span></div>';
    }).join('');
    var btn = function (txt, cmd) { return '<button data-cmd="' + cmd + '" style="all:unset;cursor:pointer;font:500 11px ' + mono + ';letter-spacing:.06em;color:' + th.acc + ';border:1px solid ' + th.line + ';padding:6px 10px;border-radius:999px">' + txt + ' ↗</button>'; };
    el.innerHTML =
      '<div style="background:' + th.bg + ';border:1px solid ' + th.line + ';border-radius:16px;padding:14px 16px;color:' + th.text + '">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
      '<span style="font:500 11px ' + th.eyebrow + ';letter-spacing:.28em;color:' + th.acc + '">PORTA · SESSION</span>' +
      '<span style="display:flex;align-items:center;gap:6px;font:500 10px ' + mono + ';letter-spacing:.12em;color:' + tone + '"><span class="hd" style="width:7px;height:7px;border-radius:50%;background:' + tone + '"></span>' + label + '</span></div>' +
      '<div style="display:flex;align-items:baseline;gap:10px;margin-bottom:8px"><span style="font:600 34px ' + sans + ';letter-spacing:-.02em;color:' + th.text + '">' + c + '<span style="font-size:18px;color:' + th.dim + '">%</span></span>' +
      '<span style="font:400 12px ' + sans + ';color:' + th.dim + '">context used</span><span style="flex:1"></span>' +
      '<span style="font:500 13px ' + mono + ';color:' + th.steel + '">' + (el.dataset.t || '') + '</span></div>' +
      '<div style="display:grid;grid-template-columns:repeat(' + segs + ',1fr);gap:3px;margin-bottom:12px">' + bar + '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:' + (jobs.length ? 4 : 10) + 'px">' +
      models.map(function (m) { return chip(m, th.text); }).join('') + chip('GPT ' + (gpt ? '✓' : '—'), gpt ? th.ok : th.dim) +
      (el.dataset.time ? chip('⏱ ' + el.dataset.time, th.dim) : '') + '</div>' +
      (jobs.length ? '<div style="border-top:1px solid ' + th.line + ';margin:8px 0 10px;padding-top:4px">' + jobHtml + '</div>' : '') +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' + btn('HANDOFF', 'handoff') + btn('EXPLAIN USAGE', 'explain usage') + '</div></div>';
    el.querySelectorAll('.hs').forEach(function (n, i) {
      if (i < on) setTimeout(function () { n.style.background = tone; n.style.transform = 'scaleY(1)'; }, 30 * i);
    });
    var d = el.querySelector('.hd'); if (d && d.animate) d.animate([{ opacity: 1 }, { opacity: .3 }, { opacity: 1 }], { duration: 1600, iterations: Infinity });
    el.querySelectorAll('[data-cmd]').forEach(function (b) { b.onclick = function () { if (window.sendPrompt) sendPrompt(b.dataset.cmd); }; });
  });
})();
