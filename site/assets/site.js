(function () {
  const REPO = 'https://github.com/nilbuild/stick-scene';
  const INSTALL = 'npx skills add nilbuild/stick-scene';
  const ICON = {
    play: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.8v10.4c0 .6.6.9 1.1.6l8-5.2c.5-.3.5-.9 0-1.2l-8-5.2C4.6 1.9 4 2.2 4 2.8z"/></svg>',
    pause: '<svg viewBox="0 0 16 16" fill="currentColor"><rect x="3.5" y="2.5" width="3" height="11" rx="1"/><rect x="9.5" y="2.5" width="3" height="11" rx="1"/></svg>',
    next: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l5 5-5 5"/></svg>',
    prev: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L5 8l5 5"/></svg>',
    shuffle: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h2.5c1.6 0 2.6.8 3.5 2.2l.9 1.6C9.8 9.2 10.8 10 12.4 10H14M2 12h2.5c1 0 1.8-.3 2.4-.9M12 2l2 2-2 2M12 8l2 2-2 2"/><path d="M9.5 5c.8-.7 1.7-1 2.9-1H14"/></svg>',
    github: '<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
  };

  const byId = Object.fromEntries(window.CATALOG.map((s) => [s.id, s]));
  const catName = Object.fromEntries(window.CATEGORIES.map((c) => [c.id, c.name]));

  function loadScenes(files) {
    const all = ['stick.js', ...files.filter((f) => f !== 'stick.js')];
    for (const f of all) {
      const s = document.createElement('script');
      s.src = 'scenes/' + f;
      s.async = false;
      document.head.appendChild(s);
    }
  }

  function renderChrome(current) {
    const header = document.querySelector('[data-nav]');
    if (header) {
      const link = (href, label, key) => `<a href="${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`;
      header.className = 'nav';
      header.innerHTML = `<div class="wrap nav-in">
        <a class="brand" href="index.html"><span>stick-scene</span></a>
        <nav class="nav-links" aria-label="Site">${link('index.html', 'Home', 'home')}${link('gallery.html', 'Gallery', 'gallery')}${link('uses.html', 'Examples', 'uses')}${link('start.html', 'Get started', 'start')}</nav>
        <div class="nav-right"><a class="btn ghost sm" href="${REPO}">${ICON.github}<span>GitHub</span></a><a class="btn sm" href="start.html">Install</a></div>
      </div>`;
    }
    const footer = document.querySelector('[data-foot]');
    if (footer) {
      footer.className = 'foot';
      footer.innerHTML = `<div class="wrap foot-in">
        <span>/stick-scene · MIT © <a href="https://kamran.fyi">Kamran Ahmed</a></span>
        <nav><a href="gallery.html">Gallery</a><a href="uses.html">Examples</a><a href="start.html">Get started</a><a href="${REPO}">GitHub</a></nav>
      </div>`;
    }
  }

  function wireCopy(root) {
    for (const button of (root || document).querySelectorAll('[data-copy]')) {
      if (button.dataset.wired) {
        continue;
      }
      button.dataset.wired = '1';
      button.addEventListener('click', () => {
        const target = button.dataset.copy ? document.querySelector(button.dataset.copy) : null;
        const text = button.dataset.text || (target ? target.textContent : '');
        const done = () => {
          const old = button.textContent;
          button.textContent = 'Copied';
          setTimeout(() => {
            button.textContent = old;
          }, 1400);
        };
        const fallback = () => {
          if (!target) {
            return;
          }
          const range = document.createRange();
          range.selectNodeContents(target);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        };
        if (!navigator.clipboard) {
          fallback();
          return;
        }
        navigator.clipboard.writeText(text).then(done, fallback);
      });
    }
  }

  function whenView(el, cb, n) {
    if (!el.isConnected) {
      return;
    }
    if (el.v) {
      cb(el.v);
      return;
    }
    if ((n || 0) > 600) {
      return;
    }
    requestAnimationFrame(() => whenView(el, cb, (n || 0) + 1));
  }

  class Player {
    constructor(root, opts) {
      this.root = root;
      this.opts = Object.assign({ auto: false, replay: false, hold: 1400 }, opts || {});
      this.slot = root.querySelector('[data-slot]');
      this.title = root.querySelector('[data-title]');
      this.blurb = root.querySelector('[data-blurb]');
      this.dot = root.querySelector('[data-dot]');
      this.range = root.querySelector('[data-scrub]');
      this.out = root.querySelector('[data-time]');
      this.toggleBtn = root.querySelector('[data-toggle]');
      this.list = opts.list || window.CATALOG.map((s) => s.id);
      this.idx = 0;
      this.touched = false;
      this.scrubbing = false;
      this.userPaused = false;
      this.wasOn = false;
      this.timer = 0;
      this.range.addEventListener('input', () => this.scrubTo(Number(this.range.value)));
      this.range.addEventListener('change', () => this.release());
      this.range.addEventListener('pointerdown', () => this.touch());
      this.toggleBtn.addEventListener('click', () => {
        this.touch();
        this.toggle();
      });
      const nextBtn = root.querySelector('[data-next]');
      const prevBtn = root.querySelector('[data-prev]');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          this.touch();
          this.step(1);
        });
      }
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          this.touch();
          this.step(-1);
        });
      }
      this.loop = this.loop.bind(this);
      requestAnimationFrame(this.loop);
    }
    touch() {
      this.touched = true;
      clearTimeout(this.timer);
    }
    setList(ids, startId) {
      this.list = ids;
      this.idx = Math.max(0, ids.indexOf(startId));
      this.show(ids[this.idx]);
    }
    step(d) {
      this.idx = (this.idx + d + this.list.length) % this.list.length;
      this.show(this.list[this.idx]);
    }
    shuffle() {
      if (this.list.length < 2) {
        return;
      }
      let i = this.idx;
      while (i === this.idx) {
        i = Math.floor(Math.random() * this.list.length);
      }
      this.idx = i;
      this.show(this.list[i]);
    }
    show(id) {
      clearTimeout(this.timer);
      const meta = byId[id];
      this.id = id;
      this.idx = Math.max(0, this.list.indexOf(id));
      this.userPaused = false;
      this.wasOn = false;
      const el = document.createElement('stick-scene');
      el.setAttribute('scene', id);
      el.setAttribute('play', 'idle');
      if (this.opts.noFloor) {
        el.setAttribute('no-floor', '');
      }
      el.setAttribute('label', meta.blurb);
      this.slot.replaceChildren(el);
      this.el = el;
      this.title.innerHTML = `<span class="dot ${meta.cat}"></span>${meta.title}`;
      if (this.blurb) {
        this.blurb.textContent = meta.blurb;
      }
      if (this.opts.onShow) {
        this.opts.onShow(meta);
      }
      whenView(el, () => {
        this.timer = setTimeout(() => this.playFrom(0), 500);
      });
    }
    get v() {
      return this.el && this.el.v;
    }
    playFrom(u) {
      const v = this.v;
      if (!v || v.def.loopOnly) {
        return;
      }
      v.paused = false;
      v.on = true;
      v.u = Math.min(0.999, u);
      v.dirty = true;
      window.STICK.kick();
    }
    toggle() {
      const v = this.v;
      if (!v || v.def.loopOnly) {
        return;
      }
      if (v.on && !v.paused) {
        v.paused = true;
        this.userPaused = true;
        return;
      }
      this.userPaused = false;
      if (v.on && v.paused) {
        v.paused = false;
        window.STICK.kick();
        return;
      }
      this.playFrom(0);
    }
    scrubTo(u) {
      const v = this.v;
      if (!v || v.def.loopOnly) {
        return;
      }
      this.scrubbing = true;
      this.touch();
      window.STICK.at(this.el, { u: Math.min(0.999, u), t: v.t });
    }
    release() {
      const v = this.v;
      this.scrubbing = false;
      if (!v || v.def.loopOnly) {
        return;
      }
      if (this.userPaused) {
        return;
      }
      this.playFrom(Number(this.range.value));
    }
    ended() {
      if (this.opts.replay) {
        this.timer = setTimeout(() => this.playFrom(0), this.opts.hold);
        return;
      }
      if (this.opts.auto && !this.touched) {
        this.timer = setTimeout(() => this.step(1), this.opts.hold);
      }
    }
    loop() {
      requestAnimationFrame(this.loop);
      const v = this.v;
      if (!v) {
        return;
      }
      const loopOnly = !!v.def.loopOnly;
      this.range.disabled = loopOnly;
      if (loopOnly) {
        this.out.textContent = 'loops';
        this.range.value = 0;
        this.toggleBtn.innerHTML = ICON.pause;
        return;
      }
      if (!this.scrubbing) {
        this.range.value = v.on ? v.u : (this.wasOn ? 1 : 0);
      }
      const u = Number(this.range.value);
      this.out.textContent = `${(u * v.def.dur).toFixed(1)}s / ${v.def.dur.toFixed(1)}s`;
      this.toggleBtn.innerHTML = v.on && !v.paused ? ICON.pause : ICON.play;
      this.toggleBtn.setAttribute('aria-label', v.on && !v.paused ? 'Pause' : 'Play');
      if (this.wasOn && !v.on && !this.scrubbing) {
        this.wasOn = false;
        this.range.value = 1;
        this.ended();
        return;
      }
      if (v.on) {
        this.wasOn = true;
      }
    }
  }

  function playerHTML(opts) {
    const o = opts || {};
    return `<div class="player-scene" data-slot></div>
      <div class="player-bar">
        <div class="player-title"><b data-title></b><span data-blurb></span></div>
        <div class="scrub">
          ${o.prev ? `<button type="button" class="icon-btn" data-prev aria-label="Previous scene">${ICON.prev}</button>` : ''}
          <button type="button" class="icon-btn" data-toggle aria-label="Play">${ICON.play}</button>
          <input type="range" min="0" max="1" step="0.001" value="0" data-scrub aria-label="Scrub through the scene">
          <output data-time>0.0s</output>
          ${o.next ? `<button type="button" class="icon-btn" data-next aria-label="Next scene">${ICON.next}</button>` : ''}
        </div>
      </div>`;
  }

  function embedCode(id, mode, floor) {
    const meta = byId[id];
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const attrs = `<span class="a">scene</span>=<span class="s">"${esc(id)}"</span> <span class="a">play</span>=<span class="s">"${mode}"</span>${floor ? '' : ' <span class="a">no-floor</span>'}`;
    const html = `<span class="t">&lt;stick-scene</span> ${attrs}<span class="t">&gt;&lt;/stick-scene&gt;</span>

<span class="t">&lt;script</span> <span class="a">src</span>=<span class="s">"/scenes/stick.js"</span> <span class="a">defer</span><span class="t">&gt;&lt;/script&gt;</span>
<span class="t">&lt;script</span> <span class="a">src</span>=<span class="s">"/scenes/${meta.file}"</span> <span class="a">defer</span><span class="t">&gt;&lt;/script&gt;</span>`;
    const text = `<stick-scene scene="${id}" play="${mode}"${floor ? '' : ' no-floor'}></stick-scene>\n\n<script src="/scenes/stick.js" defer></script>\n<script src="/scenes/${meta.file}" defer></script>`;
    return { html, text };
  }

  function lightbox() {
    let dlg = document.querySelector('dialog.lb');
    if (dlg) {
      return dlg.api;
    }
    dlg = document.createElement('dialog');
    dlg.className = 'lb';
    dlg.setAttribute('aria-label', 'Scene viewer');
    dlg.innerHTML = `<div class="lb-top"><span class="eyebrow" data-lb-cat></span><span class="spacer"></span><button type="button" class="btn ghost sm" data-lb-close>Close</button></div>
      <div class="player" data-lb-player>${playerHTML({ prev: true, next: true })}</div>
      <div class="lb-body">
        <div><h4>Play it</h4><div class="modes" data-modes>
          <button type="button" class="chip" data-mode="view" aria-pressed="true">On view</button>
          <button type="button" class="chip" data-mode="click" aria-pressed="false">On click</button>
          <button type="button" class="chip" data-mode="hover" aria-pressed="false">On hover</button>
          <button type="button" class="chip" data-mode="loop" aria-pressed="false">Loop</button>
          <button type="button" class="chip" data-floor aria-pressed="true">Floor band</button>
        </div><p class="hint" style="margin:12px 0 0">Drag the bar above to scrub. Arrow keys switch scenes.</p></div>
        <div><h4>Ask for one like it</h4><div style="position:relative"><pre class="code" data-code></pre><button type="button" class="copy" data-code-copy>Copy</button></div><p class="hint" style="margin:12px 0 0">Your agent pitches a few ideas, draws the one you pick and adds it to your page. <a href="start.html">How it works</a></p></div>
      </div>`;
    document.body.appendChild(dlg);
    const p = new Player(dlg.querySelector('[data-lb-player]'), {
      replay: true,
      hold: 1200,
      list: [],
      onShow: (meta) => {
        dlg.querySelector('[data-lb-cat]').innerHTML = `<span class="dot ${meta.cat}"></span>${catName[meta.cat]}`;
        render();
        if (history.replaceState) {
          history.replaceState(null, '', '#' + encodeURIComponent(meta.id));
        }
      },
    });
    let mode = 'view', floor = true, code = '';
    function render() {
      const ask = (window.PROMPTS && window.PROMPTS[p.id]) || '';
      code = `/stick-scene ${ask}`;
      dlg.querySelector('[data-code]').innerHTML = `<span style="opacity:.55">/stick-scene</span> ${ask.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])}`;
    }
    for (const b of dlg.querySelectorAll('[data-mode]')) {
      b.addEventListener('click', () => {
        mode = b.dataset.mode;
        for (const o of dlg.querySelectorAll('[data-mode]')) {
          o.setAttribute('aria-pressed', String(o === b));
        }
        render();
      });
    }
    const fb = dlg.querySelector('[data-floor]');
    fb.addEventListener('click', () => {
      floor = !floor;
      fb.setAttribute('aria-pressed', String(floor));
      render();
    });
    const cb = dlg.querySelector('[data-code-copy]');
    cb.addEventListener('click', () => {
      const done = () => {
        cb.textContent = 'Copied';
        setTimeout(() => {
          cb.textContent = 'Copy';
        }, 1400);
      };
      if (!navigator.clipboard) {
        return;
      }
      navigator.clipboard.writeText(code).then(done, () => {});
    });
    dlg.querySelector('[data-lb-close]').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) {
        dlg.close();
      }
    });
    dlg.addEventListener('close', () => {
      p.slot.replaceChildren();
      p.el = null;
      if (history.replaceState) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
    dlg.addEventListener('keydown', (e) => {
      if (e.target.matches('input[type="range"]')) {
        return;
      }
      if (e.key === 'ArrowRight') {
        p.touch();
        p.step(1);
      }
      if (e.key === 'ArrowLeft') {
        p.touch();
        p.step(-1);
      }
    });
    dlg.api = {
      open(id, list) {
        if (!dlg.open) {
          dlg.showModal();
        }
        p.setList(list || window.CATALOG.map((s) => s.id), id);
      },
    };
    return dlg.api;
  }

  function tile(meta) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'tile';
    b.dataset.id = meta.id;
    b.setAttribute('aria-label', `${meta.title}: ${meta.blurb}`);
    b.innerHTML = `<stick-scene scene="${meta.id}" play="hover" no-floor></stick-scene><div class="tile-meta"><span class="dot ${meta.cat}"></span><b>${meta.title}</b><span class="cat">${catName[meta.cat]}</span></div>`;
    b.addEventListener('pointerenter', () => {
      const v = b.querySelector('stick-scene').v;
      if (v) {
        v.hover = true;
        v.play();
      }
    });
    b.addEventListener('pointerleave', () => {
      const v = b.querySelector('stick-scene').v;
      if (v) {
        v.hover = false;
      }
    });
    return b;
  }

  window.SITE = { ICON, INSTALL, REPO, byId, catName, loadScenes, renderChrome, wireCopy, Player, playerHTML, lightbox, tile, whenView, embedCode };
})();
