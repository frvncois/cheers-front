/**
 * animate.js – viewport-based entrance animations (fade, fade-up, reveal)
 * Attributes (prefer data-*):
 *   data-animate="fade|fade-up|reveal"
 *   data-animate-duration="1200"  (ms)
 *   data-animate-delay="0"        (ms)
 *   data-animate-hold="220"       (ms after visible before starting)
 *   data-animate-trigger="0.45"   (0..1 fraction of element visible)
 *
 * Uses JS easing equivalent of CSS: cubic-bezier(0.4, 0, 0.2, 1)
 * Respects prefers-reduced-motion.
 */

class Animate {
  static _instances = new Set();
  static _ticking = false;

  // ---- JS cubic-bezier implementation (CSS equivalent) ----
  static cubicBezier(p1x, p1y, p2x, p2y) {
    const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
    const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;

    const sampleX = t => ((ax * t + bx) * t + cx) * t;
    const sampleY = t => ((ay * t + by) * t + cy) * t;
    const sampleDX = t => (3 * ax * t + 2 * bx) * t + cx;

    function solveX(x, eps = 1e-6) {
      // Newton-Raphson
      let t = x;
      for (let i = 0; i < 8; i++) {
        const x2 = sampleX(t) - x;
        const d = sampleDX(t);
        if (Math.abs(x2) < eps) return t;
        if (Math.abs(d) < 1e-6) break;
        t = t - x2 / d;
      }
      // Bisection fallback
      let t0 = 0, t1 = 1;
      t = x;
      while (t0 < t1) {
        const x2 = sampleX(t);
        if (Math.abs(x2 - x) < eps) return t;
        if (x > x2) t0 = t; else t1 = t;
        t = (t0 + t1) / 2;
        if (Math.abs(t1 - t0) < eps) break;
      }
      return t;
    }

    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      return sampleY(solveX(x));
    };
  }

  static _startTicker() {
    if (this._ticking) return;
    this._ticking = true;
    const loop = (t) => {
      for (const inst of this._instances) inst._tick(t);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  constructor(opts = {}) {
    const {
      root = document,
      selector = '[data-animate],[animate],[animte]',
      defaultDuration = 1200,
      defaultDelay = 0,
      defaultHold = 220,
      triggerRatio = 0.45,
      // 👇 Your custom easing used everywhere
      easing = Animate.cubicBezier(0.4, 0, 0.2, 1),
      autoObserve = true,
      willChange = true,
    } = opts;

    this.opts = {
      root, selector, defaultDuration, defaultDelay,
      defaultHold, triggerRatio, easing, autoObserve, willChange
    };

    this._els = [];
    this._data = new Map();
    this._mo = null;
    this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    Animate._instances.add(this);
    Animate._startTicker();

    this._collect();
    if (autoObserve) this._watchDOM();
  }

  // ---- public
  refresh() {
    for (const [el, d] of this._data) {
      d.base = this._decomposeTransform(el);
      d.em = parseFloat(getComputedStyle(el).fontSize) || 16;
    }
  }
  destroy() {
    this._mo?.disconnect();
    this._data.clear();
    this._els = [];
    Animate._instances.delete(this);
  }

  // ---- internals
  _watchDOM() {
    this._mo?.disconnect();
    this._mo = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type !== 'childList') continue;
        for (const n of m.addedNodes) {
          if (n.nodeType !== 1) continue;
          if (n.matches?.(this.opts.selector) || n.querySelector?.(this.opts.selector)) {
            this._collect();
            return;
          }
        }
      }
    });
    this._mo.observe(this.opts.root, { childList: true, subtree: true });
  }

  _readAttr(el, base) {
    return (
      el.getAttribute(`data-${base}`) ??
      el.getAttribute(base) ??
      el.getAttribute(base.replace('animate', 'animte'))
    );
  }

  _collect() {
    const { root, selector, defaultDuration, defaultDelay, defaultHold, willChange } = this.opts;
    this._els = Array.from(root.querySelectorAll(selector));
    this._data.clear();

    for (const el of this._els) {
      const type = (this._readAttr(el, 'animate') || '').trim();
      if (!type) continue;

      const durAttr  = parseInt(this._readAttr(el, 'animate-duration') || '', 10);
      const dlyAttr  = parseInt(this._readAttr(el, 'animate-delay') || '', 10);
      const holdAttr = parseInt(this._readAttr(el, 'animate-hold') || '', 10);
      const trigAttr = parseFloat(this._readAttr(el, 'animate-trigger') || '');

      const duration = Number.isFinite(durAttr)  ? durAttr  : defaultDuration;
      const delay    = Number.isFinite(dlyAttr)  ? dlyAttr  : defaultDelay;
      const hold     = Number.isFinite(holdAttr) ? holdAttr : defaultHold;
      const trigger  = Number.isFinite(trigAttr) ? Math.min(Math.max(trigAttr, 0), 1) : this.opts.triggerRatio;

      const base = this._decomposeTransform(el);
      const em = parseFloat(getComputedStyle(el).fontSize) || 16;

      const d = {
        type, base, em, duration, delay, hold, trigger,
        start: null,
        armedAt: 0,
        playing: false,
        waiting: false,
        done: false,
        _lastVis: 0,
      };

      if (this._reduced) {
        this._applyFinal(el, d);
        d.done = true;
        this._data.set(el, d);
        continue;
      }

      // Initial state
      switch (type) {
        case 'fade':
          el.style.opacity = '0';
          break;
        case 'fade-up':
          el.style.opacity = '0';
          el.style.transform = this._composeTransform(base.baseX, base.baseY + em, base.other);
          break;
        case 'reveal':
          el.style.overflow = el.style.overflow || 'hidden';
          el.style.clipPath = 'inset(0 0 100% 0)';
          break;
      }

      if (willChange) {
        el.style.willChange = (type === 'reveal') ? 'clip-path' : 'opacity, transform';
      }

      this._data.set(el, d);
    }
  }

  _tick(now) {
    if (this._reduced) return;

    const ease = this.opts.easing;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth  || document.documentElement.clientWidth;

    for (const [el, d] of this._data) {
      if (d.done) continue;

      // Compute visibility ratio robustly (ignores ancestor overflow)
      const rect = el.getBoundingClientRect();
      const w = Math.max(0, Math.min(rect.right, vw) - Math.max(rect.left, 0));
      const h = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
      const area = Math.max(1, (rect.width || 1) * (rect.height || 1));
      const vis = (w * h) / area; // 0..1
      d._lastVis = vis;

      // Arm → hold → start
      if (!d.playing && !d.done) {
        if (vis >= d.trigger) {
          if (!d.waiting) {
            d.waiting = true;
            d.armedAt = now;
          } else if ((now - d.armedAt) >= d.hold) {
            d.waiting = false;
            d.playing = true;
            d.start = now + d.delay;
          }
        } else {
          d.waiting = false;
          d.armedAt = 0;
        }
      }

      if (!d.playing || now < d.start) continue;

      const t = Math.min(1, (now - d.start) / d.duration);
      const k = ease(t);

      switch (d.type) {
        case 'fade':
          el.style.opacity = String(k);
          break;

        case 'fade-up': {
          el.style.opacity = String(k);
          const y = d.base.baseY + (1 - k) * d.em; // +1em -> 0
          el.style.transform = this._composeTransform(d.base.baseX, y, d.base.other);
          break;
        }

        case 'reveal': {
          const bottom = (1 - k) * 100;
          el.style.clipPath = `inset(0 0 ${bottom}% 0)`;
          break;
        }
      }

      if (t >= 1) {
        d.done = true;
        d.playing = false;
        this._applyFinal(el, d);
      }
    }
  }

  _applyFinal(el, d) {
    switch (d.type) {
      case 'fade':
        el.style.opacity = '1';
        break;
      case 'fade-up':
        el.style.opacity = '1';
        el.style.transform = this._composeTransform(d.base.baseX, d.base.baseY, d.base.other);
        break;
      case 'reveal':
        el.style.clipPath = 'inset(0 0 0% 0)';
        break;
    }
  }

  _decomposeTransform(el) {
    const computed = getComputedStyle(el).transform;
    if (!computed || computed === 'none') return { baseX: 0, baseY: 0, other: '' };

    let m;
    try { m = new DOMMatrixReadOnly(computed); } catch {}

    let tx = 0, ty = 0, a = 1, b = 0, c = 0, d = 1;
    if (m) {
      tx = m.m41 ?? m.e ?? 0;
      ty = m.m42 ?? m.f ?? 0;
      a = m.a ?? m.m11 ?? 1;
      b = m.b ?? m.m12 ?? 0;
      c = m.c ?? m.m21 ?? 0;
      d = m.d ?? m.m22 ?? 1;
    } else {
      const match = computed.match(/matrix\(([^)]+)\)/) || computed.match(/matrix3d\(([^)]+)\)/);
      if (match) {
        const v = match[1].split(',').map(n => parseFloat(n.trim()));
        if (v.length === 6)  { tx = v[4]; ty = v[5]; a = v[0]; b = v[1]; c = v[2]; d = v[3]; }
        if (v.length === 16) { tx = v[12]; ty = v[13]; a = v[0]; b = v[1]; c = v[4]; d = v[5]; }
      }
    }

    const scaleX = Math.hypot(a, b);
    const scaleY = Math.hypot(c, d);
    const rotDeg = Math.atan2(b, a) * 180 / Math.PI;

    let other = '';
    if (Math.abs(rotDeg) > 0.0001) other += `rotate(${rotDeg.toFixed(4)}deg) `;
    if (Math.abs(scaleX - 1) > 0.0001 || Math.abs(scaleY - 1) > 0.0001) {
      other += (Math.abs(scaleX - scaleY) < 0.0001)
        ? `scale(${scaleX.toFixed(4)}) `
        : `scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)}) `;
    }

    return { baseX: tx || 0, baseY: ty || 0, other: other.trim() };
  }

  _composeTransform(x, y, other) {
    return `${other ? other + ' ' : ''}translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0)`;
  }
}

// Expose + auto-init
window.Animate = Animate;
window.animate = window.animate || new Animate();

export default Animate;
