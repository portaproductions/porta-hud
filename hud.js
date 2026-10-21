(function () {
  var S = document.currentScript, BASE = S && S.src ? S.src.replace(/[^\/]*$/, '') : 'https://cdn.jsdelivr.net/gh/portaproductions/porta-hud@v4/';
  if (!document.getElementById('porta-hud-css')) {
    var F = document.createElement('link'); F.rel = 'stylesheet';
    F.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(F);
    var st = document.createElement('style'); st.id = 'porta-hud-css';
    st.textContent = '.phb{all:unset;box-sizing:border-box;min-height:36px;padding:0 12px;border-radius:8px;display:flex;align-items:center;justify-content:center;font:600 11px/14px Inter,system-ui,sans-serif;letter-spacing:.06em;cursor:pointer}' +
      '.phb:focus-visible{outline:2px solid #A9BED2;outline-offset:2px}.phb:active{opacity:.75}.phb[disabled]{opacity:.55;cursor:default}';
    document.head.appendChild(st);
  }
  var C = { bg: '#0A1019', line: '#354253', text: '#F2F5F9', dim: '#8C95A2', steel: '#A9BED2', ok: '#7FB6A2', mid: '#D9B26A', hot: '#D9776A', gold: '#D9B26A' };
  var sans = "'Inter',system-ui,sans-serif", mono = "'JetBrains Mono',ui-monospace,monospace";
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  document.querySelectorAll('[data-hud]').forEach(function (el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    var d = el.dataset, raw = parseInt(d.c, 10), known = !isNaN(raw), c = known ? Math.max(0, Math.min(100, raw)) : 0;
    var st = !known ? { col: C.steel, msg: '', h: 'out' }
      : c >= 75 ? { col: C.hot, msg: 'Handoff now, new chat', h: 'solid' }
      : c >= 50 ? { col: C.mid, msg: 'Switch soon', h: 'gold' }
      : { col: C.ok, msg: '', h: 'out' };
    var models = (d.m || '').split('|').filter(Boolean).map(esc).join('+') || '?';
    var gpt = d.g === '1' ? 'GPT ✓' : d.g === '0' ? 'GPT ✗' : 'GPT ?';
    var meta = [models, gpt, d.t ? esc(d.t) : '', d.time ? esc(d.time) : ''].filter(Boolean).join(' · ');
    var jobs = (d.j || '').split('|').filter(Boolean).map(function (x) {
      var i = x.lastIndexOf(':'), n = i > 0 ? x.slice(0, i) : x, v = i > 0 ? x.slice(i + 1) : 'Running', p = parseInt(v, 10);
      var lab = isNaN(p) ? esc(v) : Math.max(0, Math.min(100, p)) + '%', col = /fail/i.test(v) ? C.hot : /done/i.test(v) ? C.ok : C.steel;
      return '<div style="display:flex;justify-content:space-between;gap:8px;margin-top:6px;font:400 11px/14px ' + sans + ';color:' + C.dim + '"><span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">↳ ' + esc(n) + '</span><span style="color:' + col + '">' + lab + '</span></div>';
    }).join('');
    var hs = st.h === 'solid' ? 'background:' + C.gold + ';color:' + C.bg + ';border:1px solid ' + C.gold
      : st.h === 'gold' ? 'color:' + C.gold + ';border:1px solid ' + C.gold : 'color:' + C.steel + ';border:1px solid ' + C.line;
    el.innerHTML =
      '<div style="box-sizing:border-box;width:100%;background:' + C.bg + ';border:1px solid ' + C.line + ';border-radius:12px;padding:10px 12px;color:' + C.text + ';font-family:' + sans + '">' +
      '<div style="display:flex;align-items:center;gap:10px">' +
        '<img class="phl" src="' + BASE + 'logo.png" alt="Porta Productions" style="width:30px;height:auto;display:block;flex:none">' +
        '<span style="font:600 20px/24px ' + sans + ';font-variant-numeric:tabular-nums;color:' + st.col + ';flex:none">' + (known ? c + '<span style="font-size:12px">%</span>' : '—') + '</span>' +
        '<span role="meter" aria-label="Context used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + c + '" style="position:relative;flex:1;height:6px;border-radius:3px;background:' + C.line + '">' +
          '<span style="display:block;height:100%;width:' + c + '%;border-radius:3px;background:' + st.col + '"></span>' +
          '<span style="position:absolute;left:75%;top:-3px;width:2px;height:12px;background:' + C.steel + '"></span></span>' +
        (st.msg ? '<span style="font:600 11px/14px ' + sans + ';color:' + st.col + ';flex:none;max-width:38%;text-align:right">' + st.msg + '</span>' : '') +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;margin-top:8px">' +
        '<span style="flex:1;min-width:0;font:400 11px/14px ' + mono + ';color:' + C.steel + ';overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + meta + '</span>' +
        '<button class="phb" data-cmd="handoff" style="' + hs + '">HANDOFF</button>' +
        '<button class="phb" data-cmd="explain usage" style="color:' + C.steel + ';border:1px solid ' + C.line + '">USAGE</button>' +
      '</div>' + jobs + '</div>';
    var lg = el.querySelector('.phl');
    if (lg) lg.onerror = function () { var s = document.createElement('span'); s.textContent = 'P'; s.style.cssText = 'font:600 16px ' + sans + ';color:' + C.steel; lg.replaceWith(s); };
    el.querySelectorAll('[data-cmd]').forEach(function (b) {
      b.onclick = function () {
        if (b.disabled) return; var t = b.textContent;
        if (window.sendPrompt) {
          b.disabled = true; b.textContent = '…';
          try { sendPrompt(b.dataset.cmd); b.textContent = 'Sent'; } catch (e) { b.textContent = 'Retry'; b.disabled = false; return; }
          setTimeout(function () { b.textContent = t; b.disabled = false; }, 4000);
        } else { b.textContent = 'Type it'; }
      };
    });
  });
})();
