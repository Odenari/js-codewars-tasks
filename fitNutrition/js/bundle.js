/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./fitNutrition/js/modules/calc.js":
/*!*****************************************!*\
  !*** ./fitNutrition/js/modules/calc.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', sex)
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = '1.375';
		localStorage.setItem('ratio', ratio)
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(element => {
			element.classList.remove(activeClass);
			if (element.getAttribute('id') === localStorage.getItem('sex')) {
				element.classList.add(activeClass);
			}
			if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				element.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}
		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInfo(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(elem => {
			elem.addEventListener('click', e => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));

				}
				elements.forEach(el => {
					el.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);
				calcTotal();
			});
		});
	}

	getStaticInfo('#gender div', 'calculating__choose-item_active');
	getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInfo(selector) {
		const input = document.querySelector(`${selector}`);

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}
			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
			}
			calcTotal();
		});
	}
	getDynamicInfo('#height');
	getDynamicInfo('#weight');
	getDynamicInfo('#age');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./fitNutrition/js/modules/cards.js":
/*!******************************************!*\
  !*** ./fitNutrition/js/modules/cards.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./fitNutrition/js/services/services.js");


function cards() {
	//* Creating menu cards with class
	//class representing structure of our cards, args those cards are needed
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.descr = descr;
			this.title = title;
			this.price = price;
			this.classes = classes;
			this.transfer = 44; //new prop representing current exchange rate (USD => UAH)
			this.parent = document.querySelector(parentSelector);// prop of parenet elem to easy deploy our card on page
			this.changeToUAH(); // function invoked inside constructor to parse USD into UAH and assign to prop of our entity of menu card
		}
		//Creating methods here isnt the best solution | moving methods to .prototype will allow to  all cards inherit methods vs creating every method in every card instance (optimizing memory?)
		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			//creating a card element
			const card = document.createElement('div');

			//Adding every class passed by from  arguments of constructor to our card element   
			this.classes.forEach(className => card.classList.add(className));


			//actual HTML code of card with different values for each created card
			card.innerHTML = `
					<div class="menu__item">					
					<img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
                    `;

			//deploying card on page at last place of parent container from args		
			this.parent.append(card);
		}
	}



	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	// // eslint-disable-next-line no-undef
	// //*axios library read docs!
	// // eslint-disable-next-line no-undef
	// axios.get('http://localhost:3000/menu')
	// 	.then(respond => {
	// 		respond.data.forEach(({ img, altimg, title, descr, price }) => {
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./fitNutrition/js/modules/forms.js":
/*!******************************************!*\
  !*** ./fitNutrition/js/modules/forms.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./fitNutrition/js/modules/modals.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./fitNutrition/js/services/services.js");



function forms(formSelector, modalTimerId) {

	const forms = document.querySelectorAll(formSelector);

	//*POST method usually wrapped in function 
	function bindpostData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			//object for telling users about his interactions with form 
			const messages = {
				loading: 'img/form/spinner.svg',
				done: 'Спасибо, скоро мы с вами свяжемся',
				failure: 'Что-то пошло не так :('
			};

			//Creating a loading icon for request status loading (response not ready yet)	
			const statusLoading = document.createElement('img');
			statusLoading.src = messages.loading;
			statusLoading.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			//insertAdjElem more powerfull than append, allow to deploy element after smth (config where to deploy in first arg)
			form.insertAdjacentElement('afterend', statusLoading);
			const formData = new FormData(form),

				//Parsing formData to array of keys and values, parsing this array to usual JS obj, and then parsing this obj to JSON
				json = JSON.stringify(Object.fromEntries(formData.entries()));

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__["default"])('http://localhost:3000/requests', json)
				.then((data) => {
					console.log(data);
					//showing message if everything done
					showThanksModal(messages.done);
					//removing message from screen (by deleting container elem)
					statusLoading.remove();
				}).catch(() => {
					//showing error message if promise status rejected
					showThanksModal(messages.failure);
				}).finally(() => {
					//method reset() are clearing inputs in form
					form.reset();
				});
		});
	}

	//invoking function of sending data to every form on page!
	forms.forEach(form => bindpostData(form));

	//adding gratitude modals
	function showThanksModal(message) {

		const modalContainer = document.querySelector('.modal__dialog');
		modalContainer.classList.add('hide');
		(0,_modals__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');

		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&#215;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			modalContainer.classList.add('show');
			modalContainer.classList.remove('hide');
			(0,_modals__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 1500);
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./fitNutrition/js/modules/modals.js":
/*!*******************************************!*\
  !*** ./fitNutrition/js/modules/modals.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showModal: () => (/* binding */ showModal)
/* harmony export */ });
function showModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	modal.classList.add('fade');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearInterval(modalTimerId);// if modal was open remove timer for showing modal
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove('show');
	modal.classList.remove('fade');
	document.body.style.overflow = ''; //?браузер сам подставит нужное свойство в пустую строку!
}

function modals(modalBtnsSelector, modalSelector, modalTimerId) {

	const modalBtns = document.querySelectorAll(modalBtnsSelector),
		modal = document.querySelector(modalSelector);

	modalBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			showModal(modalSelector, modalTimerId);
		});

	});

	modal.addEventListener('click', (e) => {
		// If user clicked on overlay or clicked on  an element wich have attribute data close => closemodal will invoke!
		if (e.target === modal || e.target.getAttribute('data-close') === '') {
			closeModal(modalSelector);
		}

	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});


	//Modal at the end of page 
	window.addEventListener('scroll', showModalByScroll);

	function showModalByScroll() {
		//if listed height and screen height >= all height of all doc showModal
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showModal(modalSelector, modalTimerId);

			//removing handler after modal was showing once
			removeEventListener('scroll', showModalByScroll);
			//removing timer modal if user fastscrolling to the end of page
			clearInterval(modalTimerId);
		}
	}

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);


/***/ }),

/***/ "./fitNutrition/js/modules/slider.js":
/*!*******************************************!*\
  !*** ./fitNutrition/js/modules/slider.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
	//Slider implementation of carousel style most common variant

	const slider = document.querySelector(container),
		mainSliderWrapper = document.querySelector(wrapper),
		slideContainer = mainSliderWrapper.querySelector(field),
		slideList = mainSliderWrapper.querySelectorAll(slide),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		currentElement = document.getElementById(currentCounter),
		totalElement = document.getElementById(totalCounter),

		//Getting all computed styles through window object, but assigning only width prop
		width = window.getComputedStyle(mainSliderWrapper).width;

	//our counter for current slide
	let slideIndex = 1,
		//offset are define how far we pushing slide (distance)
		offset = 0;

	//This block define how counter would be looking (w or w/o zero)
	if (slideList.length > 0 && slideList.length < 10) {
		currentElement.textContent = `0${slideIndex}`;
		totalElement.innerText = `0${slideList.length}`;
	} else {
		currentElement.textContent = slideIndex;
		totalElement.innerText = slideList.length;
	}

	//making our slide container as wide as many images will be pass in 
	slideContainer.style.width = 100 * slideList.length + '%';

	slideList.forEach(slide => {
		//actual slide width would be equal to the width of a mainWrapper wich showing current slide
		slide.style.width = width;
	});

	//dots for better navigation
	slider.style.position = 'relative';
	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('carousel-indicators');
	// indicators.style.cssText = '';

	slider.append(indicators);

	for (let i = 0; i < slideList.length; i++) {
		let dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i + 1);
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	mainSliderWrapper.style.overflow = 'hidden';
	slideContainer.style.display = 'flex';
	slideContainer.style.transition = '0.5s all ease';

	function counterPlus() {

		if (slideIndex === slideList.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		if (slideList.length < 10) {
			currentElement.textContent = `0${slideIndex}`;
		} else {
			currentElement.textContent = slideIndex;
		}
	}

	function counterMinus() {
		if (slideIndex === 1) {
			slideIndex = slideList.length;
		} else {
			slideIndex--;
		}
		if (slideList.length < 10) {
			currentElement.textContent = `0${slideIndex}`;
		} else {
			currentElement.textContent = slideIndex;
		}
	}

	function counterDots(list, counter, index) {
		if (list.length < 10) {
			counter.textContent = `0${index + 1}`;
		} else {
			counter.textContent = index + 1;
		}
		slideIndex = index + 1;
	}

	function changingOpacity(dots, index) {
		//so we are taking our array of dots and adding every dot equal opacity
		//Then we are taking one dot with specific index and highliting it setting opacity to 1 
		dots.forEach((dot) => dot.style.opacity = .5);
		dots[index - 1].style.opacity = 1;
	}

	const toNums = str => +str.replace(/\D/g, '');

	next.addEventListener('click', () => {

		if (offset == toNums(width) * (slideList.length - 1)) {
			offset = 0;
		} else {
			offset += toNums(width);
		}

		counterPlus();
		slideContainer.style.transform = `translateX(-${offset}px)`;

		//so we are taking our array of dots and adding every dot equal opacity 
		dots.forEach((dot) => dot.style.opacity = .5);
		//here we taking one dot with specific index and highliting it setting opacity to 1 
		dots[slideIndex - 1].style.opacity = 1;

		changingOpacity(dots, slideIndex);
	});


	prev.addEventListener('click', () => {

		if (offset == 0) {
			offset = toNums(width) * (slideList.length - 1);
		} else {
			offset -= toNums(width);
		}

		counterMinus();
		slideContainer.style.transform = `translateX(-${offset}px)`;
		changingOpacity(dots, slideIndex);
	});

	//actually a more usefull implementation of dots nav through data-attribute
	dots.forEach((dot, index, dots) => {
		const current = currentElement;

		dot.addEventListener('click', event => {

			const slideTo = event.target.getAttribute('data-slide-to');

			offset = toNums(width) * (slideTo - 1);
			slideContainer.style.transform = `translateX(-${offset}px)`;

			dots.forEach(dot => dot.style.opacity = .5);
			event.target.style.opacity = 1;

			counterDots(dots, current, index);
		});
	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./fitNutrition/js/modules/tabs.js":
/*!*****************************************!*\
  !*** ./fitNutrition/js/modules/tabs.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	const tabs = document.querySelectorAll(tabsSelector),
		tabsContentList = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
		tabsContentList.forEach(tab => {
			tab.classList.add('hide');
			tab.classList.remove('show', 'fade');
		});
		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContentList[i].classList.add('show', 'fade');
		tabs[i].classList.add(activeClass);
		tabsContentList[i].classList.remove('hide');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((tab, index) => {
				if (target === tab) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./fitNutrition/js/modules/timer.js":
/*!******************************************!*\
  !*** ./fitNutrition/js/modules/timer.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
	function getTimeRemaining(endtime) {
		let days, hours, mins, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		if (t <= 0) {
			days = hours = mins = seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			mins = Math.floor((t / 1000 / 60) % 60);
			seconds = Math.floor(t / 1000) % 60;
		}
		return {
			total: t,
			days,
			hours,
			mins,
			seconds
		};
	}

	function getZero(value) {
		if (value >= 0 && value < 10) {
			return `0${value}`;
		} else {
			return value;
		}
	}


	function setClock(selector, endtime) {

		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			mins = timer.querySelector('#mins'),
			seconds = timer.querySelector('#seconds'),
			interval = setInterval(updateClock, 1000); //actually legit way to keep that timer running

		updateClock();

		function updateClock() {
			const timerValues = getTimeRemaining(endtime);
			days.innerHTML = getZero(timerValues.days);
			hours.innerHTML = getZero(timerValues.hours);
			mins.innerHTML = getZero(timerValues.mins);
			seconds.innerHTML = getZero(timerValues.seconds);

			if (timerValues.total <= 0) {
				clearInterval(interval);
			}
		}

	}
	setClock(id, deadline);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./fitNutrition/js/services/services.js":
/*!**********************************************!*\
  !*** ./fitNutrition/js/services/services.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getResource: () => (/* binding */ getResource)
/* harmony export */ });
//A separate function to interact with serverside (database)
const postData = async (url, data) => {
	const promise = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});
	return await promise.json();
};

//? A separate function to get data for future creating of card HTML elements

 const getResource = async (url) => {
	const promise = await fetch(url);

	if(!promise.ok) {
		throw new Error(`Couldn't fetch data from ${url}, status: ${promise.status}`);
	}

	return await promise.json();
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postData);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************!*\
  !*** ./fitNutrition/js/script.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./fitNutrition/js/modules/tabs.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modals */ "./fitNutrition/js/modules/modals.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./fitNutrition/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./fitNutrition/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./fitNutrition/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./fitNutrition/js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./fitNutrition/js/modules/calc.js");










//this event handle a function which spans all code inside her body
//And wouldn't allow scripts to run before a HTMLcontent is loaded
document.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => (0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimerId), 5000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
		'.tabheader__item',
		'.tabcontent', '.tabheader__items',
		'tabheader__item_active'
	);
	(0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2024-06-04');
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
		container: '.offer__slider',
		prevArrow: '.offer__slider-prev',
		nextArrow: '.offer__slider-next',
		slide: '.offer__slide',
		totalCounter: 'total',
		currentCounter: 'current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map