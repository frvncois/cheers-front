/**
 * scrollr.js - Custom Scroll Speed Controller
 * Copyright (c) Frvncois 2025
 *
 * A reusable script that controls scroll speed of elements using translateY
 * Usage: <div class="my-element" speed="3">Content</div>
 * This will move the element with 3x scroll speed using translateY
 */
class Scrollr {
  constructor() {
    this.elements = [];
    this.elementData = new Map();
    this.isReady = false;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setup();
      });
    } else {
      this.setup();
    }

    // Auto-refresh on route changes (for SPAs)
    this.setupRouteDetection();
  }

  setupRouteDetection() {
    // Detect route changes by watching for URL changes
    let currentPath = window.location.pathname;
    
    // Use MutationObserver to detect when DOM changes significantly
    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false;
      
      mutations.forEach((mutation) => {
        // Check if elements with speed attribute were added
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              if (node.hasAttribute && node.hasAttribute('speed')) {
                shouldRefresh = true;
              }
              // Check children for speed attributes
              if (node.querySelector && node.querySelector('[speed]')) {
                shouldRefresh = true;
              }
            }
          });
        }
      });
      
      if (shouldRefresh) {
        setTimeout(() => this.refresh(), 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also watch for popstate events (back/forward navigation)
    window.addEventListener('popstate', () => {
      setTimeout(() => this.refresh(), 100);
    });
  }

  setup() {
    // Find all elements with speed attribute
    this.findElements();
    
    if (this.elements.length === 0) {
      // Try again after a short delay for dynamic content
      setTimeout(() => {
        this.findElements();
        if (this.elements.length > 0) {
          this.bindEvents();
        }
      }, 100);
      return;
    }

    this.bindEvents();
    this.isReady = true;
  }

  findElements() {
    this.elements = Array.from(document.querySelectorAll('[speed]'));
    
    // Store initial data for each element
    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const speed = parseFloat(element.getAttribute('speed')) || 1;
      
      this.elementData.set(element, {
        speed: speed,
        initialOffset: rect.top + window.pageYOffset,
        initialTransform: this.getInitialTransform(element),
        originalTransform: element.style.transform || ''
      });
    });
    
    console.log(`Scrollr found ${this.elements.length} elements with speed attribute`);
  }

  getInitialTransform(element) {
    const computedTransform = window.getComputedStyle(element).transform;
    
    if (computedTransform === 'none') {
      return { x: 0, y: 0, other: '' };
    }
    
    // Parse the matrix to get current translate values
    const matrix = computedTransform.match(/matrix.*\((.+)\)/);
    let currentX = 0, currentY = 0;
    
    if (matrix) {
      const values = matrix[1].split(', ');
      currentX = parseFloat(values[4]) || 0;
      currentY = parseFloat(values[5]) || 0;
    }
    
    // Get non-translate transforms from CSS
    const nonTranslateTransforms = this.extractNonTranslateTransforms(element);
    
    return {
      x: currentX,
      y: currentY,
      other: nonTranslateTransforms
    };
  }

  extractNonTranslateTransforms(element) {
    // Create a temporary element to test what transforms are applied from CSS
    const temp = element.cloneNode(false);
    temp.style.transform = 'none'; // Remove any inline transforms
    document.body.appendChild(temp);
    temp.offsetHeight; // Force reflow
    
    const originalTransform = window.getComputedStyle(element).transform;
    const withoutTransform = window.getComputedStyle(temp).transform;
    
    document.body.removeChild(temp);
    
    // If they're the same, there are no CSS transforms
    if (originalTransform === withoutTransform || originalTransform === 'none') {
      return '';
    }
    
    // Parse the matrix to extract non-translate transforms
    const matrix = originalTransform.match(/matrix.*\((.+)\)/);
    if (matrix) {
      const values = matrix[1].split(', ').map(v => parseFloat(v));
      
      // Extract rotation, scale, skew from matrix
      const a = values[0], b = values[1], c = values[2], d = values[3];
      
      let transforms = [];
      
      // Calculate scale
      const scaleX = Math.sqrt(a * a + b * b);
      const scaleY = Math.sqrt(c * c + d * d);
      
      // Calculate rotation (in radians, convert to degrees)
      const rotation = Math.atan2(b, a) * (180 / Math.PI);
      
      // Add transforms if they're not default values
      if (Math.abs(scaleX - 1) > 0.001 || Math.abs(scaleY - 1) > 0.001) {
        if (Math.abs(scaleX - scaleY) < 0.001) {
          transforms.push(`scale(${scaleX.toFixed(3)})`);
        } else {
          transforms.push(`scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`);
        }
      }
      
      if (Math.abs(rotation) > 0.1) {
        transforms.push(`rotate(${rotation.toFixed(2)}deg)`);
      }
      
      return transforms.join(' ');
    }
    
    return '';
  }

  bindEvents() {
    // Listen to scroll events
    window.addEventListener('scroll', () => this.updateElements(), { passive: true });
    
    // Also try to hook into Lenis if available
    if (window.lenis) {
      window.lenis.on('scroll', () => this.updateElements());
    }
  }

  updateElements() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    this.elements.forEach(element => {
      const data = this.elementData.get(element);
      if (!data) return;
      
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      
      // Check if element is in viewport (with some buffer)
      const isInViewport = (rect.top < windowHeight + 200) && (rect.bottom > -200);
      
      if (isInViewport) {
        // Calculate translateY based on scroll progress relative to element position
        const scrollProgress = (scrollY - data.initialOffset) * data.speed * 0.1;
        const finalY = data.initialTransform.y + scrollProgress;
        
        // Build transform string preserving other transforms
        let transformString = '';
        
        // Add non-translate transforms first (rotate, scale, etc.)
        if (data.initialTransform.other) {
          transformString += data.initialTransform.other + ' ';
        }
        
        // Add the translate transform
        transformString += `translate(${data.initialTransform.x}px, ${finalY}px)`;
        
        element.style.transform = transformString.trim();
      }
    });
  }

  // Method to refresh elements
  refresh() {
    this.elementData.clear();
    this.elements = [];
    this.findElements();
    
    if (!this.isReady && this.elements.length > 0) {
      this.bindEvents();
      this.isReady = true;
    }
  }

  // Method to completely reset and reinitialize
  reset() {
    this.elementData.clear();
    this.elements = [];
    this.isReady = false;
    this.setup();
  }

  // Method to add new elements dynamically
  addElement(element) {
    if (!element.hasAttribute('speed')) return;
    
    const rect = element.getBoundingClientRect();
    const speed = parseFloat(element.getAttribute('speed')) || 1;
    
    this.elementData.set(element, {
      speed: speed,
      initialOffset: rect.top + window.pageYOffset,
      initialTransform: this.getInitialTransform(element),
      originalTransform: element.style.transform || ''
    });
    
    if (!this.elements.includes(element)) {
      this.elements.push(element);
    }
  }

  // Method to remove elements
  removeElement(element) {
    this.elementData.delete(element);
    const index = this.elements.indexOf(element);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
  }
}

// Create global instance
window.scrollr = new Scrollr();