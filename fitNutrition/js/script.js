'use strict';
//this event handle a function which spans all code inside her body  and do not allow  scripts to run before a HTMLcontent
document.addEventListener('DOMContentLoaded', () => {
	const tabs = require('./modules/tabs'),
		modals = require('./modules/modals'),
		timer = require('./modules/timer'),
		cards = require('./modules/cards'),
		forms = require('./modules/forms'),
		slider = require('./modules/slider'),
		calc = require('./modules/calc');

	tabs();
	modals();
	timer();
	cards();
	forms();
	slider();
	calc();
});

