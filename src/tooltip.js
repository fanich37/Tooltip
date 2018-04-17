;(function ( global ) {
	
	/**
	 * The polyfill for Element.closest() method
	 */
	(function(ELEMENT) {
		ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
		ELEMENT.closest = ELEMENT.closest || function closest(selector) {
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
			property: 'opacity'
		};
		let tooltipInstance = null;
		
		function init() {
			const body = document.getElementsByTagName('body')[0];
			let tooltip;
			
			function build() {
				tooltip = document.createElement('div');
				tooltip.className = 'tooltip';
				mount();
			}

			function setStyles() {
				tooltip.style.transitionDuration = tooltipOptions.duration;
				tooltip.style.transitionProperty = tooltipOptions.property;
			}

			function mount() {
				body.appendChild(tooltip);
				setStyles();
			}

			function unmount() {
				body.removeChild(tooltip);
			}

			function showTooltip(event) {
				if (event.target.closest('*[title]')) {
					const elToTooltip = event.target.closest('*[title]');
					const wWidth = window.innerWidth;
					const rect = elToTooltip.getBoundingClientRect();
					console.log(rect);
					const pos = rect.right + elToTooltip.scrollWidth > wWidth ? 'right' : 'left';
					tooltip.textContent = elToTooltip.title;
					switch (tooltipOptions.whereToShow) {
						case 'bottom': {
							tooltip.style.top = `${rect.top + rect.height + 4}px`;
							break;
						}
						case 'top': {
							tooltip.style.top = `${rect.top - tooltip.scrollHeight - 4}px`;
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
				if (event.target.closest('*[title]')) {
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
				reinit: () => {
					if (!tooltipInstance) {
						return tooltipInstance = init();
					}else {
						return tooltipInstance;
					}
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
			return tooltipInstance = init();
		}else {
			return tooltipInstance;
		}
	
	}());
}( window ));