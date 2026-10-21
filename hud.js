(function () {
  var S = document.currentScript, BASE = S && S.src ? S.src.replace(/[^\/]*$/, '') : 'https://cdn.jsdelivr.net/gh/portaproductions/porta-hud@v4/';
  if (!document.getElementById('porta-hud-css')) {
    var F = document.createElement('link'); F.rel = 'stylesheet';
    F.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=JetBrains+Mono:wght@400&display=swap';
    document.head.appendChild(F);
    var st = document.createElement('style'); st.id = 'porta-hud-css';
    st.textContent = '.phb{all:unset;box-sizing:border-box;height:30px;padding:0 10px;border-radius:7px;display:flex;align-items:center;font:600 11px Inter,system-ui,sans-serif;letter-spacing:.05em;cursor:pointer;flex:none}' +
      '.phb:focus-visible{outline:2px solid #A9BED2;outline-offset:2px}.phb:active{opacity:.75}.phb[disabled]{opacity:.55}';
    document.head.appendChild(st);
  }
  var C = { bg: '#0A1019', line: '#354253', dim: '#8C95A2', steel: '#A9BED2', ok: '#7FB6A2', mid: '#D9B26A', hot: '#D9776A', gold: '#D9B26A' };
  var sans = "'Inter',system-ui,sans-serif", mono = "'JetBrains Mono',ui-monospace,monospace";
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  document.querySelectorAll('[data-hud]').forEach(function (el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    var d = el.dataset, raw = parseInt(d.c, 10), known = !isNaN(raw), c = known ? Math.max(0, Math.min(100, raw)) : 0;
    var h = !known ? 'out' : c >= 75 ? 'solid' : c >= 50 ? 'gold' : 'out';
    var col = !known ? C.steel : c >= 75 ? C.hot : c >= 50 ? C.mid : C.ok;
    var models = (d.m || '').split('|').filter(Boolean).map(esc).join('+') || '?';
    var gpt = d.g === '1' ? 'GPT ✓' : d.g === '0' ? 'GPT ✗' : 'GPT ?';
    var jobs = (d.j || '').split('|').filter(Boolean).map(function (x) { var i = x.lastIndexOf(':'); return esc(i > 0 ? x.slice(0, i) + ' ' + x.slice(i + 1) + (isNaN(parseInt(x.slice(i + 1), 10)) ? '' : '%') : x); });
    var meta = [models, gpt, d.t ? esc(d.t) : '', d.time ? esc(d.time) : ''].concat(jobs.map(function (j) { return '↳ ' + j; })).filter(Boolean).join(' · ');
    var hs = h === 'solid' ? 'background:' + C.gold + ';color:' + C.bg + ';border:1px solid ' + C.gold
      : h === 'gold' ? 'color:' + C.gold + ';border:1px solid ' + C.gold : 'color:' + C.steel + ';border:1px solid ' + C.line;
    el.innerHTML =
      '<div style="box-sizing:border-box;width:100%;display:flex;align-items:center;gap:9px;background:' + C.bg + ';border:1px solid ' + C.line + ';border-radius:10px;padding:6px 8px 6px 10px;font-family:' + sans + '">' +
        '<img class="phl" src="' + BASE + 'logo.png" alt="Porta Productions" style="width:22px;height:auto;display:block;flex:none">' +
        '<button class="phb" data-cmd="explain usage" title="Usage" style="padding:0;font:600 16px ' + sans + ';letter-spacing:0;color:' + col + ';font-variant-numeric:tabular-nums">' + (known ? c + '<span style="font-size:11px">%</span>' : '—') + '</button>' +
        '<div style="flex:1;min-width:0">' +
          '<div role="meter" aria-label="Context used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + c + '" style="position:relative;height:5px;border-radius:3px;background:' + C.line + '">' +
            '<div style="height:100%;width:' + c + '%;border-radius:3px;background:' + col + '"></div>' +
            '<div style="position:absolute;left:75%;top:-2px;width:2px;height:9px;background:' + C.steel + '"></div></div>' +
          '<div style="margin-top:4px;font:400 10px/12px ' + mono + ';color:' + C.dim + ';overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + meta + '</div>' +
        '</div>' +
        '<button class="phb" data-cmd="handoff" style="' + hs + '">' + (h === 'solid' ? 'HANDOFF NOW' : 'HANDOFF') + '</button>' +
      '</div>';
    var lg = el.querySelector('.phl');
    if (lg) lg.onerror = function () { lg.remove(); };
    el.querySelectorAll('[data-cmd]').forEach(function (b) {
      b.onclick = function () {
        if (b.disabled) return; var t = b.innerHTML;
        if (window.sendPrompt) {
          b.disabled = true;
          try { sendPrompt(b.dataset.cmd); } catch (e) { b.disabled = false; return; }
          setTimeout(function () { b.innerHTML = t; b.disabled = false; }, 4000);
        }
      };
    });
  });
})();
