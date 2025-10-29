

class Scrollr {
  
  static _instances = new Set();
  static _ticking = false;
  static _lastTime = 0;
  static _lenisScroll = 0;
  static _hasLenis = false;

  static _startTicker() {
    if (this._ticking) return;
    this._ticking = true;

    const loop = (t) => {
      
      const dt = this._lastTime ? (t - this._lastTime) : 16.7;
      this._lastTime = t;

      
      const scrollY = this._getScrollY();

      
      for (const inst of this._instances) {
        inst._tick(scrollY, dt);
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    
    if (window.lenis && !this._hasLenis) {
      this._hasLenis = true;
      window.lenis.on('scroll', (e) => {
        
        if (typeof e?.scroll === 'number') Scrollr._lenisScroll = e.scroll;
        else if (typeof e?.animatedScroll === 'number') Scrollr._lenisScroll = e.animatedScroll;
      });
    }
  }

  static _getScrollY() {
    
    if (this._hasLenis && typeof this._lenisScroll === 'number') return this._lenisScroll;

    
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0
    );
  }

  
  constructor(opts = {}) {
    const {
      root = document,                  
      selector = '[speed]',             
      attribute = 'speed',              
      multiplier = 0.12,                
      ease = 0.12,                      
      clamp = [-3, 3],                  
      rootMargin = '35% 0px 35% 0px',   
      autoObserve = true,               
      willChange = true,                
    } = opts;

    this.opts = { root, selector, attribute, multiplier, ease, clamp, rootMargin, autoObserve, willChange };

    this._elements = [];               
    this._data = new Map();            
    this._active = new Set();          
    this._needsRender = false;         
    this._io = null;                   
    this._mo = null;                   
    this._lastScroll = -1;
    this._resizeHandler = () => this.refresh();

    Scrollr._instances.add(this);
    Scrollr._startTicker();

    this._setup();
  }

  
  refresh() {
    
    for (const el of this._elements) {
      const d = this._data.get(el);
      if (!d) continue;
      d.initialOffset = this._getElementPageTop(el);
      d.height = el.getBoundingClientRect().height;
    }
    this._needsRender = true; 
  }

  destroy() {
    
    for (const el of this._elements) {
      const d = this._data.get(el);
      if (d) el.style.transform = d.originalTransform;
      if (this._io) this._io.unobserve(el);
    }

    if (this._io) this._io.disconnect();
    if (this._mo) this._mo.disconnect();
    window.removeEventListener('resize', this._resizeHandler);
    window.removeEventListener('orientationchange', this._resizeHandler);

    this._data.clear();
    this._elements = [];
    this._active.clear();

    Scrollr._instances.delete(this);
  }

  
  _setup() {
    this._collect();
    this._observe();
    window.addEventListener('resize', this._resizeHandler, { passive: true });
    window.addEventListener('orientationchange', this._resizeHandler, { passive: true });
    this._needsRender = true;
  }

  _collect() {
    const { root, selector, attribute, clamp, willChange } = this.opts;
    const nodes = Array.from(root.querySelectorAll(selector));

    
    for (const el of this._elements) {
      if (this._io) this._io.unobserve(el);
    }
    this._elements = [];
    this._data.clear();
    this._active.clear();

    nodes.forEach((el) => {
      const raw = parseFloat(el.getAttribute(attribute));
      if (Number.isNaN(raw)) return;

      
      const speed = Math.min(Math.max(raw, clamp[0]), clamp[1]);

      const { baseX, baseY, other, originalTransform } = this._decomposeTransform(el);
      const d = {
        speed,
        currentY: baseY,          
        targetY: baseY,           
        baseX,
        baseY,
        other,                    
        originalTransform,
        initialOffset: this._getElementPageTop(el),
        height: el.getBoundingClientRect().height,
        isVisible: false,
      };

      if (willChange) el.style.willChange = 'transform';
      
      el.style.transform = this._composeTransform(d.baseX, d.baseY, d.other);

      this._elements.push(el);
      this._data.set(el, d);
    });
  }

  _observe() {
    const { rootMargin, autoObserve, root } = this.opts;

    
    this._io?.disconnect();
    this._io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target;
        const d = this._data.get(el);
        if (!d) continue;

        d.isVisible = entry.isIntersecting;
        if (entry.isIntersecting) {
          this._active.add(el);
          this._needsRender = true;
        } else {
          this._active.delete(el);
        }
      }
    }, { root: null, rootMargin, threshold: [0, 1] });

    for (const el of this._elements) this._io.observe(el);

    if (autoObserve) {
      
      this._mo?.disconnect();
      this._mo = new MutationObserver((muts) => {
        let should = false;
        for (const m of muts) {
          if (m.type !== 'childList') continue;
          m.addedNodes.forEach((n) => {
            if (n.nodeType !== 1) return;
            if (n.matches?.(this.opts.selector) || n.querySelector?.(this.opts.selector)) {
              should = true;
            }
          });
        }
        if (should) this._collect();
      });
      this._mo.observe(root, { childList: true, subtree: true });
    }
  }

  
  _tick(scrollY) {
    const { multiplier, ease } = this.opts;

    
    if (scrollY !== this._lastScroll) {
      this._needsRender = true;
      this._lastScroll = scrollY;
    }
    if (!this._needsRender) return;

    let stillAnimating = false;

    for (const el of (this._active.size ? this._active : this._elements)) {
      const d = this._data.get(el);
      if (!d) continue;

      
      const delta = (scrollY - d.initialOffset) * d.speed * multiplier;
      d.targetY = d.baseY + delta;

      
      const nextY = d.currentY + (d.targetY - d.currentY) * ease;

      
      if (Math.abs(nextY - d.targetY) < 0.05) {
        d.currentY = d.targetY;
      } else {
        d.currentY = nextY;
        stillAnimating = true;
      }

      
      el.style.transform = this._composeTransform(d.baseX, d.currentY, d.other);
    }

    this._needsRender = stillAnimating;
  }

  
  _composeTransform(x, y, other) {
    
    return `${other ? other + ' ' : ''}translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0)`;
  }

  _getElementPageTop(el) {
    
    const rect = el.getBoundingClientRect();
    return rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
  }

  _decomposeTransform(el) {
    const computed = getComputedStyle(el).transform;
    const originalTransform = el.style.transform || '';

    
    if (!computed || computed === 'none') {
      return { baseX: 0, baseY: 0, other: '', originalTransform };
    }

    
    let m;
    try {
      m = new DOMMatrixReadOnly(computed);
    } catch {
      
      const match = computed.match(/matrix\(([^)]+)\)/) || computed.match(/matrix3d\(([^)]+)\)/);
      if (match) {
        const vals = match[1].split(',').map(v => parseFloat(v.trim()));
        if (vals.length === 6) { 
          m = { a: vals[0], b: vals[1], c: vals[2], d: vals[3], e: vals[4], f: vals[5] };
          
          m.m41 = m.e; m.m42 = m.f;
        } else if (vals.length === 16) { 
          m = { m11: vals[0], m12: vals[1], m21: vals[4], m22: vals[5], m41: vals[12], m42: vals[13] };
        }
      }
    }

    
    const tx = typeof m?.m41 === 'number' ? m.m41 : (typeof m?.e === 'number' ? m.e : 0);
    const ty = typeof m?.m42 === 'number' ? m.m42 : (typeof m?.f === 'number' ? m.f : 0);

    
    
    const a = m?.a ?? m?.m11 ?? 1;
    const b = m?.b ?? m?.m12 ?? 0;
    const c = m?.c ?? m?.m21 ?? 0;
    const d = m?.d ?? m?.m22 ?? 1;

    const scaleX = Math.hypot(a, b);
    const scaleY = Math.hypot(c, d);
    const rotationRad = Math.atan2(b, a);
    const rotationDeg = rotationRad * (180 / Math.PI);

    let other = '';
    
    if (Math.abs(rotationDeg) > 0.0001) other += `rotate(${rotationDeg.toFixed(4)}deg) `;
    if (Math.abs(scaleX - 1) > 0.0001 || Math.abs(scaleY - 1) > 0.0001) {
      other += (Math.abs(scaleX - scaleY) < 0.0001)
        ? `scale(${scaleX.toFixed(4)}) `
        : `scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)}) `;
    }

    return { baseX: tx || 0, baseY: ty || 0, other: other.trim(), originalTransform };
  }
}



window.Scrollr = Scrollr;


