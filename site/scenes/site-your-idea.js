// Site only: a figure at an easel, the visitor's idea written on the board. Plays a quick sketch when they copy the prompt.
// Reads the idea from window.STICK_IDEA.
(function () {
  const SC = (window.SCENES = window.SCENES || {});
  const R = window.RIG;
  const { C, E, P, mix, legs, walkSeg, fig, inkFill, rr, ln, text, seg, breathe, pulse, lp, sparks, partial, FONT } = R;

  const B = { x: -60, y: -178, w: 200, h: 118 };
  const HOME = -150, AT = -18;
  const DX = 12, DY = -98;
  const head = [];
  for (let i = 0; i <= 14; i++) {
    const a = -Math.PI / 2 + (i / 14) * Math.PI * 2;
    head.push([DX + Math.cos(a) * 5, DY + 5 + Math.sin(a) * 5]);
  }
  const STROKES = [
    head,
    [[DX, DY + 10], [DX, DY + 22]],
    [[DX - 8, DY + 14], [DX, DY + 13], [DX + 8, DY + 9]],
    [[DX - 6, DY + 31], [DX, DY + 22], [DX + 6, DY + 31]],
  ];
  const LENS = STROKES.map((s) => s.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - s[i - 1][0], p[1] - s[i - 1][1]) : 0), 0));
  const TOTAL = LENS.reduce((a, b) => a + b, 0);
  function doodle(k) {
    let want = TOTAL * k;
    const out = [];
    STROKES.forEach((s, i) => {
      if (want <= 0) {
        return;
      }
      out.push(partial(s, Math.min(1, want / LENS[i])));
      want -= LENS[i];
    });
    return out;
  }

  function wrap(g, s, w, max) {
    const out = [];
    let line = '';
    for (const word of s.split(/\s+/)) {
      const next = line ? line + ' ' + word : word;
      if (g.measureText(next).width > w && line) {
        out.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) {
      out.push(line);
    }
    if (out.length > max) {
      out.length = max;
      out[max - 1] = out[max - 1].replace(/\s*\S*$/, '') + '…';
    }
    return out;
  }

  function board(g, idea, k, a) {
    ln(g, B.x + 26, B.y + B.h, B.x + 14, 0, 2.2);
    ln(g, B.x + B.w - 26, B.y + B.h, B.x + B.w - 14, 0, 2.2);
    rr(g, B.x, B.y, B.w, B.h, 6);
    inkFill(g, C.paper, 1.7);
    text(g, 'your idea', B.x + 12, B.y + 17, 9, C.umber, 'left');
    if (!idea) {
      g.setLineDash([3, 4]);
      for (let i = 0; i < 3; i++) {
        ln(g, B.x + 14, B.y + 40 + i * 16, B.x + B.w - 14 - i * 38, B.y + 40 + i * 16, 1.2, '#c9c9c9');
      }
      g.setLineDash([]);
    } else {
      g.font = FONT(11.5);
      const lines = wrap(g, idea, B.w - 26, 3);
      lines.forEach((l, i) => text(g, l, B.x + 12, B.y + 40 + i * 16, 11.5, C.ink, 'left'));
    }
    if (k > 0 && a > 0) {
      g.save();
      g.globalAlpha = a;
      g.strokeStyle = '#e07a1f';
      g.lineWidth = 2;
      g.lineCap = 'round';
      g.lineJoin = 'round';
      for (const pts of doodle(k)) {
        g.beginPath();
        g.moveTo(pts[0][0], pts[0][1]);
        for (const p of pts) {
          g.lineTo(p[0], p[1]);
        }
        g.stroke();
      }
      g.restore();
    }
  }

  SC['site-your-idea'] = {
    dur: 5.2,
    width: 380,
    label: 'A stick figure stands by an easel with your idea written on it, ready to draw it.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      const idea = String((S.st && S.st.idea != null) ? S.st.idea : (window.STICK_IDEA || '')).trim();
      let x = HOME, gait = { ph: 0, amp: 0 };
      let pose = breathe(P({ hF: [12, -60], hB: [-4, -52] }), t);
      let sketch = 0, alpha = 0, done = 0;
      if (T < 0) {
        pose = mix(pose, P({ hF: [10, -96], head: [7, -116], hB: [-4, -54] }), pulse(t, 5.5, 1.5, 2.4));
      } else {
        const fade = 1 - seg(T, this.dur - 0.5, this.dur);
        const ws = T < 2.6 ? walkSeg(T, 0, 0.8, HOME, AT) : walkSeg(T, 3.9, 4.8, AT, HOME);
        x = ws.x;
        gait = ws;
        sketch = E.soft(seg(T, 1.0, 2.3));
        const strokes = sketch > 0 ? doodle(sketch) : [STROKES[0]];
        const last = strokes[strokes.length - 1];
        const tipPt = sketch > 0 ? last[last.length - 1] : STROKES[0][0];
        const draw = E.soft(seg(T, 0.8, 1.05)) * (1 - E.soft(seg(T, 2.35, 2.6)));
        pose = mix(pose, P({ hF: lp(tipPt, x, 0, 1), hB: [-4, -54], head: [9, -114], chest: [3, -90] }), draw);
        const cheer = E.back(seg(T, 2.6, 2.9)) * (1 - E.soft(seg(T, 3.5, 3.9)));
        pose = mix(pose, P({ hF: [14, -132], hB: [-10, -130], head: [3, -118] }), cheer);
        alpha = fade;
        done = seg(T, 2.4, 3) * (1 - seg(T, 3.6, 4));
      }
      pose = legs(pose, gait.ph, gait.amp, { arms: false, stride: gait.stride });
      board(g, idea, sketch, alpha);
      fig(g, pose, x, 0, { wave: S.wave, wt: S.wt });
      sparks(g, DX, DY + 14, done, 24, 7);
    },
  };
})();
