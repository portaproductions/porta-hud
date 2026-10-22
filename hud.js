(function () {
  var S = document.currentScript, BASE = S && S.src ? S.src.replace(/[^\/]*$/, '') : 'https://cdn.jsdelivr.net/gh/portaproductions/porta-hud@main/';
  if (!document.getElementById('porta-hud-css')) {
    var F = document.createElement('link'); F.rel = 'stylesheet';
    F.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap';
    document.head.appendChild(F);
    var st = document.createElement('style'); st.id = 'porta-hud-css';
    st.textContent =
      /* shared */
      '.ph{position:relative;overflow:hidden;box-sizing:border-box;width:100%;border-radius:14px;padding:11px 13px;color:var(--t);font-family:Inter,system-ui,sans-serif;border:1.5px solid transparent;background:var(--bg) padding-box,var(--ring,linear-gradient(var(--edge),var(--edge))) border-box;background-size:var(--bgs,100% 100%),300% 300%;animation:phBreathe 4s ease-in-out infinite,phFlow 8s ease-in-out infinite alternate;background-repeat:no-repeat}' +
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
      /* sunset */
      '.ph.sunset{--t:#FFFFFF;--d:rgba(255,255,255,.82);--tr:rgba(255,255,255,.25);--ok:#FFFFFF;--mid:#FFF1A8;--hot:#FFFFFF;--pu:rgba(255,255,255,.55);--scan:rgba(255,255,255,.06);' +
      '--bg:linear-gradient(120deg,#FF7A45,#FF3D7F,#9B4DFF,#FF7A45);--bgs:300% 300%;--ring:linear-gradient(90deg,#FFD166,#FF3D7F,#9B4DFF,#FFD166);--glow:rgba(255,61,127,.5);' +
      '--aura:radial-gradient(50% 60% at 80% 0%,rgba(255,230,120,.35),transparent 70%);--hbl:rgba(255,255,255,.55);--hbt:#FF3D7F;--hbg:#FFFFFF;--hglow:rgba(255,255,255,.8)}' +
      '.ph.sunset .ttl{text-shadow:0 1px 8px rgba(120,0,60,.35)}.ph.sunset .gv{text-shadow:0 1px 6px rgba(120,0,60,.4)!important}' +
      /* aurora */
      '.ph.aurora{--t:#EFFFFB;--d:#A8D8E0;--tr:rgba(255,255,255,.12);--ok:#5BFFB0;--mid:#FFE36E;--hot:#FF6B9A;--pu:#6EA8FF;--scan:rgba(255,255,255,.04);' +
      '--bg:linear-gradient(120deg,#062A3A,#0B1F4D,#2A0F4D,#063A35,#062A3A);--bgs:300% 300%;--ring:linear-gradient(90deg,#5BFFB0,#6EA8FF,#C77DFF,#5BFFB0);--glow:rgba(91,255,176,.35);' +
      '--aura:radial-gradient(60% 40% at 30% 0%,rgba(91,255,176,.28),transparent 70%),radial-gradient(50% 50% at 90% 100%,rgba(199,125,255,.28),transparent 70%);--hbl:rgba(168,216,224,.4);--hbt:#062A3A;--hbg:linear-gradient(90deg,#5BFFB0,#6EA8FF);--hglow:rgba(91,255,176,.7)}' +
      '.ph.aurora .ttl{text-shadow:0 0 10px rgba(91,255,176,.6)}' +
      /* candy */
      '.ph.candy{--t:#FFFFFF;--d:#C9C2E6;--tr:rgba(255,255,255,.1);--ok:#3DF5A6;--mid:#FFD23F;--hot:#FF3E8A;--pu:#3BC7FF;--scan:rgba(255,255,255,.03);' +
      '--bg:linear-gradient(160deg,#17112B,#100C1F);--ring:linear-gradient(90deg,#FF3E8A,#FFD23F,#3DF5A6,#3BC7FF,#B65CFF,#FF3E8A);--glow:rgba(182,92,255,.45);' +
      '--aura:radial-gradient(40% 50% at 10% 0%,rgba(255,62,138,.2),transparent 70%),radial-gradient(40% 50% at 95% 100%,rgba(59,199,255,.2),transparent 70%);--hbl:rgba(201,194,230,.35);--hbt:#17112B;--hbg:linear-gradient(90deg,#FFD23F,#FF3E8A,#B65CFF);--hglow:rgba(255,62,138,.7)}' +
      '.ph.candy .ttl{background:linear-gradient(90deg,#FF3E8A,#FFD23F,#3DF5A6,#3BC7FF,#B65CFF);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:phFlow 6s ease-in-out infinite alternate}' +
      /* holo */
      '.ph.holo{--t:#2B2350;--d:#5C5480;--tr:rgba(43,35,80,.14);--ok:#00A889;--mid:#E07A00;--hot:#E0287A;--pu:#7A5CFF;--scan:rgba(255,255,255,.3);' +
      '--bg:linear-gradient(115deg,#FFD6F0,#D6E4FF,#D6FFF1,#FFF4C8,#F0D6FF,#FFD6F0);--bgs:400% 400%;--ring:linear-gradient(90deg,#FF8AD8,#8AB4FF,#7AF2C8,#FFE07A,#C98AFF,#FF8AD8);--glow:rgba(201,138,255,.45);' +
      '--aura:radial-gradient(50% 60% at 20% 0%,rgba(255,255,255,.7),transparent 70%);--hbl:rgba(43,35,80,.25);--hbt:#fff;--hbg:linear-gradient(90deg,#FF5FB8,#7A5CFF);--hglow:rgba(255,95,184,.55)}' +
      '.ph.holo .ttl{color:#2B2350}' +
      /* candy backgrounds */
      '.ph.bg-galaxy{--bg:linear-gradient(160deg,#0B0820,#05040F)}' +
      '.ph.bg-galaxy:before{inset:-20%;background:radial-gradient(circle,rgba(255,255,255,.95) .9px,transparent 1.4px) 0 0/37px 41px,radial-gradient(circle,rgba(190,220,255,.7) .7px,transparent 1.2px) 11px 17px/53px 47px,radial-gradient(circle,rgba(255,200,240,.8) .8px,transparent 1.3px) 23px 5px/71px 63px,radial-gradient(1.2px 1.2px at 12% 22%,#fff 60%,transparent),radial-gradient(1px 1px at 33% 68%,#fff 60%,transparent),radial-gradient(1.4px 1.4px at 58% 18%,#fff 60%,transparent),radial-gradient(1px 1px at 72% 74%,#fff 60%,transparent),radial-gradient(1.2px 1.2px at 88% 36%,#fff 60%,transparent),radial-gradient(1px 1px at 45% 45%,#fff 60%,transparent),radial-gradient(1px 1px at 22% 88%,#fff 60%,transparent),radial-gradient(1.3px 1.3px at 94% 86%,#fff 60%,transparent),' +
      'radial-gradient(45% 55% at 20% 20%,rgba(255,62,138,.30),transparent 70%),radial-gradient(45% 55% at 85% 80%,rgba(59,199,255,.28),transparent 70%),radial-gradient(35% 45% at 60% 40%,rgba(182,92,255,.22),transparent 70%);animation:phTwinkle 6s ease-in-out infinite alternate}' +
      '.ph.bg-grid{--bg:linear-gradient(180deg,#150B2E 0%,#2A0B3D 55%,#3D0B3A 100%)}' +
      '.ph.bg-grid:before{inset:50% -60% -70% -60%;background:linear-gradient(rgba(255,62,138,.6) 1.5px,transparent 1.5px) 0 0/100% 16px,linear-gradient(90deg,rgba(59,199,255,.5) 1.5px,transparent 1.5px) 0 0/22px 100%;-webkit-mask-image:linear-gradient(to bottom,transparent 0%,#000 45%);mask-image:linear-gradient(to bottom,transparent 0%,#000 45%);transform-origin:50% 0;animation:phGrid 1.6s linear infinite}' +
      '.ph.bg-grid .meta,.ph.bg-grid .gl{text-shadow:0 1px 4px #150B2E}' +
      '.ph.bg-lava{--bg:linear-gradient(#0E0A1C,#0E0A1C)}' +
      '.ph.bg-lava:before{inset:-30%;filter:blur(18px);background:radial-gradient(28% 34% at 20% 30%,rgba(255,62,138,.75),transparent 70%),radial-gradient(26% 32% at 75% 25%,rgba(255,210,63,.55),transparent 70%),radial-gradient(30% 36% at 60% 80%,rgba(59,199,255,.65),transparent 70%),radial-gradient(24% 30% at 30% 85%,rgba(182,92,255,.7),transparent 70%);animation:phLava 12s ease-in-out infinite alternate}' +
      '.ph.bg-lava:after{background:linear-gradient(rgba(14,10,28,.35),rgba(14,10,28,.35));mix-blend-mode:normal;animation:none}' +
      '.ph.bg-swirl{--bg:linear-gradient(#0B0818,#0B0818)}' +
      '.ph.bg-swirl:before{inset:-60%;filter:blur(26px);opacity:.75;background:conic-gradient(from 0deg,#FF3E8A,#FFD23F,#3DF5A6,#3BC7FF,#B65CFF,#FF3E8A);animation:phSpin 14s linear infinite}' +
      '.ph.bg-swirl:after{background:linear-gradient(rgba(11,8,24,.55),rgba(11,8,24,.55));mix-blend-mode:normal;animation:none}' +
      '@keyframes phTwinkle{from{opacity:.75;transform:translate(-2%,-1%)}to{opacity:1;transform:translate(2%,1%)}}' +
      '@keyframes phGrid{from{transform:perspective(120px) rotateX(58deg) translateY(0)}to{transform:perspective(120px) rotateX(58deg) translateY(16px)}}' +
      '@keyframes phLava{0%{transform:translate(-6%,-4%) rotate(0deg) scale(1)}50%{transform:translate(5%,3%) rotate(25deg) scale(1.12)}100%{transform:translate(-3%,5%) rotate(-15deg) scale(.95)}}' +
      '@keyframes phSpin{to{transform:rotate(360deg)}}' +
      /* porta brand */
      '.ph.porta{--t:#F2F5F9;--d:#A9BED2;--tr:rgba(169,190,210,.14);--ok:#7FB6A2;--mid:#D9B26A;--hot:#D9776A;--pu:#A9BED2;--scan:rgba(255,255,255,.03);' +
      '--bg:linear-gradient(160deg,#0D1522,#0A1019);--ring:linear-gradient(90deg,#D9B26A,#A9BED2,#5E7790,#D9B26A);--glow:rgba(217,178,106,.55);' +
      '--hbl:rgba(169,190,210,.35);--hbt:#0A1019;--hbg:linear-gradient(90deg,#E8C98A,#D9B26A);--hglow:rgba(217,178,106,.75)}' +
      '.ph.porta .gl,.ph.porta .meta{text-shadow:0 1px 3px rgba(10,16,25,.8)}' +
      '.ph.porta .ttl{background:linear-gradient(90deg,#E8C98A,#D9B26A,#A9BED2,#D9B26A);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:phFlow 6s ease-in-out infinite alternate;filter:drop-shadow(0 0 6px rgba(217,178,106,.45))}' +
      '.ph.porta.bg-lava{--bg:linear-gradient(#0A1019,#0A1019)}' +
      '.ph.porta.bg-lava:before{background:radial-gradient(22% 26% at 30% 38%,rgba(232,190,110,.85),transparent 72%),radial-gradient(20% 24% at 72% 36%,rgba(169,190,210,.70),transparent 72%),radial-gradient(24% 28% at 58% 66%,rgba(94,140,190,.90),transparent 72%),radial-gradient(18% 22% at 36% 64%,rgba(217,178,106,.60),transparent 72%)}' +
      '.ph.porta.bg-lava:after{background:linear-gradient(rgba(10,16,25,.18),rgba(10,16,25,.18))}' +
      /* photo background */
      '.ph.bg-photo{--bg:linear-gradient(#0A1019,#0A1019)}' +
      '.ph.bg-photo:before{inset:0;background:linear-gradient(115deg,rgba(217,178,106,.30) 0%,rgba(10,16,25,0) 45%,rgba(94,140,190,.35) 100%),linear-gradient(180deg,rgba(10,16,25,.45) 0%,rgba(10,16,25,.62) 55%,rgba(10,16,25,.85) 100%),var(--photo,none) center 22% / cover no-repeat;animation:phKen 24s ease-in-out infinite alternate}' +
      '.ph.bg-photo:after{background:url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%27.9%27 numOctaves=%272%27 stitchTiles=%27stitch%27/><feColorMatrix values=%270 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/></svg>") 0 0/160px 160px,repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 3px);opacity:.35;mix-blend-mode:overlay;animation:phGrain .6s steps(3) infinite}' +
      '.ph.bg-photo .gl,.ph.bg-photo .meta{text-shadow:0 1px 4px rgba(10,16,25,.95)}' +
      '@keyframes phGrain{0%{background-position:0 0,0 0}33%{background-position:-40px 25px,0 0}66%{background-position:30px -35px,0 0}}' +
      '@keyframes phKen{from{transform:scale(1)}to{transform:scale(1.06) translateX(-2%)}}' +
      /* motion */
      '@keyframes phFlow{from{background-position:0% 50%,0% 50%}to{background-position:100% 50%,100% 50%}}' +
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
    var d = el.dataset, theme = /^(porta|chrome|pastel|sunset|aurora|candy|holo)$/.test(d.theme || '') ? d.theme : 'porta';
    var c = parseInt(d.c, 10), w = parseInt(d.w, 10), due = c >= 65, wHot = w >= 90;
    var meta = [(d.m || '').split('|').filter(Boolean).join(' + '), d.t ? d.t + ' tokens' : '', d.time || ''].filter(Boolean).map(esc).join('  ·  ');
    var jobs = (d.j || '').split('|').filter(Boolean).map(function (x) {
      var i = x.lastIndexOf(':'), n = i > 0 ? x.slice(0, i) : x, v = i > 0 ? x.slice(i + 1) : '', p = parseInt(v, 10);
      return '<button class="meta" data-cmd="status of ' + esc(n) + '">' + esc(n) + ' <b>' + esc(v ? (isNaN(p) ? v : p + '%') : '') + '</b></button>';
    }).join('<span class="meta" style="opacity:.5">  ·  </span>');
    el.innerHTML =
      '<div class="ph ' + theme + (/^(galaxy|grid|lava|swirl|photo|none)$/.test(d.bg || '') ? (d.bg === 'none' ? '' : ' bg-' + d.bg) : ' bg-photo') + '" style="--photo:url(' + BASE + 'IMG_0421.JPG)">' +
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
