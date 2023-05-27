'use strict';
import tabs from './modules/tabs';
import modals from './modules/modals';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import { showModal } from './modules/modals';

//this event handle a function which spans all code inside her body
//And wouldn't allow scripts to run before a HTMLcontent is loaded
document.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 5000);

	tabs(
		'.tabheader__item',
		'.tabcontent', '.tabheader__items',
		'tabheader__item_active'
	);
	modals('[data-modal]', '.modal', modalTimerId);
	timer('.timer', '2024-06-04');
	cards();
	forms('form', modalTimerId);
	slider({
		container: '.offer__slider',
		prevArrow: '.offer__slider-prev',
		nextArrow: '.offer__slider-next',
		slide: '.offer__slide',
		totalCounter: 'total',
		currentCounter: 'current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	calc();
});

