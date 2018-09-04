;(function ( global ) {
  
  /**
   * The polyfill for Element.closest() method
   */
  (function(el) {
    el.matches = el.matches || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector || el.webkitMatchesSelector;
    el.closest = el.closest || function closest(selector) {
      if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
    };
  }(Element.prototype));

  global.Tooltip = (function () {

    const tooltipOptions = {
      whereToShow: 'bottom',
      duration: '.3s',
      property: 'opacity',
      tooltip: '*[title]'
    };
    let tooltipInstance = null;
    
    function init() {
      const head = document.getElementsByTagName('head')[0];
      const body = document.getElementsByTagName('body')[0];
      let tooltip;
      let styles;

      function build() {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        styles = document.createElement('style');
        styles.innerHTML = '.tooltip{position:fixed;top:-9999px;left:0;padding:4px;max-width: 150px;background:#fff;box-shadow:0px 2px 4px rgba(0,0,0,.3);opacity:0;transition-property:opacity;}';
        mount();
      }

      function setStyles() {
        tooltip.style.transitionDuration = tooltipOptions.duration;
        tooltip.style.transitionProperty = tooltipOptions.property;
      }

      function mount() {
        head.appendChild(styles);
        body.appendChild(tooltip);
        setStyles();
      }

      function unmount() {
        head.removeChild(styles);
        body.removeChild(tooltip);
      }

      function showTooltip(event) {
        if (event.target.closest(tooltipOptions.tooltip)) {
          const elToTooltip = event.target.closest(tooltipOptions.tooltip);
          const wWidth = window.innerWidth;
          const rect = elToTooltip.getBoundingClientRect();
          const pos = rect.right + elToTooltip.scrollWidth > wWidth ? 'right' : 'left';
          tooltip.textContent = elToTooltip.title;
          switch (tooltipOptions.whereToShow) {
            case 'bottom': {
              tooltip.style.top = `${rect.top + rect.height + 4}px`;
              break;
            }
            case 'top': {
              tooltip.style.top = `${rect.top - tooltip.scrollHeight - 4}px`;
              break
            }
          }
          tooltip.style.opacity = 1;
          switch (pos) {
            case 'left':
              tooltip.style.left = `${rect.left}px`;
              break;
            case 'right':
              tooltip.style.left = `${rect.right - tooltip.scrollWidth}px`;
              break;
          }
        }
      }

      function hideTooltip(event) {
        if (event.target.closest(tooltipOptions.tooltip)) {
          tooltip.style.top = '-9999px';
          tooltip.style.opacity = '0';
        }
      }

      function setOptions(options) {
        for (const key in options) {
          tooltipOptions[key] = options[key];
        }
        setStyles();
      }

      build();
      body.addEventListener('mouseover', showTooltip);
      body.addEventListener('mouseout', hideTooltip);

      return {
        reInit: () => {
          if (!tooltipInstance) {
            tooltipInstance = init();
          }
          return tooltipInstance;
        },
        setOptions: setOptions,
        destroy: () => {
          body.removeEventListener('mouseover', showTooltip);
          body.removeEventListener('mouseout', hideTooltip);
          unmount();
          return tooltipInstance = null;
        }
      };
  
    };
  
    if (!tooltipInstance) {
      tooltipInstance = init();
    }
    return tooltipInstance;
  
  }());

}( window ));