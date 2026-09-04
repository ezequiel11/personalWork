import { initNavbar } from '../../../shared/js/navbar.js';
import { initScroll } from '../../../shared/js/scroll.js';
import { initAnimations } from '../../../shared/js/animations.js';
import navbarMarkup from '../../../shared/components/navbar.html?raw';
import footerMarkup from '../../../shared/components/footer.html?raw';

function loadComponent(selector, markup) {
	const placeholder = document.querySelector(selector);
	if (placeholder) placeholder.outerHTML = markup;
}

loadComponent('[data-component="navbar"]', navbarMarkup);
loadComponent('[data-component="footer"]', footerMarkup);

initNavbar();
initScroll();
initAnimations();
