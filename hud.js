(function () {
  var S = document.currentScript, BASE = S && S.src ? S.src.replace(/[^\/]*$/, '') : 'https://cdn.jsdelivr.net/gh/portaproductions/porta-hud@v4/';
  if (!document.getElementById('porta-hud-fonts')) {
    var F = document.createElement('link'); F.id = 'porta-hud-fonts'; F.rel = 'stylesheet';
    F.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Cinzel:wght@500&display=swap';
    document.head.appendChild(F);
    var st = document.createElement('style');
    st.textContent = '.phb{all:unset;box-sizing:border-box;min-height:48px;border-radius:8px;display:flex;align-items:center;justify-content:center;font:600 13px/18px Inter,system-ui,sans-serif;letter-spacing:.06em;cursor:pointer;transition:opacity .15s}' +
      '.phb:focus-visible{outline:2px solid #A9BED2;outline-offset:2px}.phb:active{opacity:.75}.phb[disabled]{opacity:.55;cursor:default}';
    document.head.appendChild(st);
  }
  var C = { bg: '#0A1019', line: '#354253', text: '#F2F5F9', dim: '#8C95A2', steel: '#A9BED2', ok: '#7FB6A2', mid: '#D9B26A', hot: '#D9776A', gold: '#D9B26A' };
  var sans = "'Inter',system-ui,sans-serif", mono = "'JetBrains Mono',ui-monospace,monospace", serif = "'Cinzel',Georgia,serif";
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  document.querySelectorAll('[data-hud]').forEach(function (el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    var d = el.dataset, raw = parseInt(d.c, 10), known = !isNaN(raw);
    var c = known ? Math.max(0, Math.min(100, raw)) : 0;
    var st = !known ? { col: C.steel, msg: 'Context unavailable', h: 'out' }
      : c >= 75 ? { col: C.hot, msg: 'Tap HANDOFF, then open a new chat', h: 'solid' }
      : c >= 50 ? { col: C.mid, msg: 'Prepare to switch chats', h: 'gold' }
      : { col: C.ok, msg: 'Keep going', h: 'out' };
    var models = (d.m || '').split('|').filter(Boolean).map(esc).join(' + ') || 'Model unknown';
    var gpt = d.g === '1' ? 'Yes' : d.g === '0' ? 'No' : 'Unknown';
    var l1 = [d.t ? '<span style="font-family:' + mono + '">' + esc(d.t) + '</span> tokens' : '', d.time ? '<span style="font-family:' + mono + '">' + esc(d.time) + '</span>' : ''].filter(Boolean).join(' · ');
    var l2 = models + ' · GPT: ' + gpt;
    var jobs = (d.j || '').split('|').filter(Boolean).map(function (x) {
      var i = x.lastIndexOf(':'), n = i > 0 ? x.slice(0, i) : x, v = i > 0 ? x.slice(i + 1) : 'Running', p = parseInt(v, 10), num = !isNaN(p);
      var lab = num ? Math.max(0, Math.min(100, p)) + '%' : esc(v);
      var col = /fail/i.test(v) ? C.hot : /done/i.test(v) ? C.ok : C.steel;
      return '<div style="margin-top:10px"><div style="display:flex;justify-content:space-between;gap:8px;font:400 12px/18px ' + sans + ';color:' + C.steel + '">' +
        '<span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(n) + '</span><span style="color:' + col + '">' + lab + '</span></div>' +
        (num ? '<div style="height:4px;border-radius:2px;background:' + C.line + ';margin-top:4px;overflow:hidden"><div style="height:100%;width:' + Math.max(0, Math.min(100, p)) + '%;background:' + C.steel + '"></div></div>' : '') + '</div>';
    }).join('');
    var hs = st.h === 'solid' ? 'background:' + C.gold + ';color:' + C.bg + ';border:1px solid ' + C.gold
      : st.h === 'gold' ? 'background:transparent;color:' + C.gold + ';border:1px solid ' + C.gold
      : 'background:transparent;color:' + C.steel + ';border:1px solid ' + C.line;
    el.innerHTML =
      '<div style="box-sizing:border-box;width:100%;background:' + C.bg + ';border:1px solid ' + C.line + ';border-radius:14px;padding:16px;color:' + C.text + ';font-family:' + sans + '">' +
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">' +
        '<div><div style="font:500 12px/16px ' + serif + ';letter-spacing:.18em;color:' + C.steel + '">CONTEXT</div>' +
        '<div style="font:600 32px/36px ' + sans + ';font-variant-numeric:tabular-nums;color:' + st.col + '">' + (known ? c + '<span style="font-size:16px">%</span>' : '—') + '</div></div>' +
        '<img class="phl" src="' + BASE + 'logo.png" alt="Porta Productions" style="width:72px;height:auto;object-fit:contain;display:block">' +
      '</div>' +
      '<div role="meter" aria-label="Context used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + (known ? c : 0) + '" style="position:relative;height:8px;border-radius:4px;background:' + C.line + ';margin-top:12px">' +
        '<div style="height:100%;width:' + (known ? c : 0) + '%;border-radius:4px;background:' + st.col + '"></div>' +
        '<div style="position:absolute;left:75%;top:-3px;width:2px;height:14px;background:' + C.steel + '"></div></div>' +
      '<div style="display:flex;justify-content:space-between;gap:8px;margin-top:8px;align-items:baseline;flex-wrap:wrap">' +
        '<span style="font:500 14px/20px ' + sans + ';color:' + (st.h === 'solid' ? C.hot : C.text) + '">' + st.msg + '</span>' +
        '<span style="font:400 12px/16px ' + sans + ';color:' + C.dim + ';white-space:nowrap">New chat at 75%</span></div>' +
      '<div style="margin-top:12px;font:400 12px/18px ' + sans + ';color:' + C.steel + '">' + (l1 ? '<div>' + l1 + '</div>' : '') + '<div style="margin-top:4px">' + l2 + '</div></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px">' +
        '<button class="phb" data-cmd="handoff" style="' + hs + '">HANDOFF</button>' +
        '<button class="phb" data-cmd="explain usage" style="background:transparent;color:' + C.steel + ';border:1px solid ' + C.line + '">USAGE</button></div>' +
      jobs + '</div>';
    var lg = el.querySelector('.phl');
    if (lg) lg.onerror = function () { var s = document.createElement('span'); s.textContent = 'PORTA'; s.style.cssText = 'font:500 12px/16px ' + serif + ';letter-spacing:.26em;color:' + C.steel; lg.replaceWith(s); };
    el.querySelectorAll('[data-cmd]').forEach(function (b) {
      b.onclick = function () {
        if (b.disabled) return; var t = b.textContent;
        if (window.sendPrompt) {
          b.disabled = true; b.textContent = 'Sending…';
          try { sendPrompt(b.dataset.cmd); b.textContent = 'Sent'; } catch (e) { b.textContent = 'Retry'; b.disabled = false; return; }
          setTimeout(function () { b.textContent = t; b.disabled = false; }, 4000);
        } else { b.textContent = 'Type: ' + b.dataset.cmd; }
      };
    });
  });
})();
