import { handleInputs } from './handlers/handleInput.js';

const plotButton = document.getElementById('button-plot');
plotButton.addEventListener('click', handleInputs);

const navbarSwitchButton = document.getElementById('switcher-mobile');
navbarSwitchButton.addEventListener('click', () => {
	const nav = document.querySelector('nav');
	nav.classList.toggle('collapsed');
});
