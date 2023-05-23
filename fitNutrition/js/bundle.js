/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./firNutriotion/js/modules/calc.js":
/*!******************************************!*\
  !*** ./firNutriotion/js/modules/calc.js ***!
  \******************************************/
/***/ ((module) => {

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

module.exports = calc;

/***/ }),

/***/ "./firNutriotion/js/modules/cards.js":
/*!*******************************************!*\
  !*** ./firNutriotion/js/modules/cards.js ***!
  \*******************************************/
/***/ ((module) => {

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

	//? A separate function to get data for future creating of card HTML elements
	//  const getResource = async (url) => {

	// 	const promise = await fetch(url);

	// 	if(!promise.ok) {
	// 		throw new Error(`Couldn't fetch data from ${url}, status: ${promise.status}`);
	// 	}

	// 	return await promise.json();
	// };

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price}) => {
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});

	// eslint-disable-next-line no-undef
	//*axios library read docs!
	// eslint-disable-next-line no-undef
	axios.get('http://localhost:3000/menu')
		.then(respond => {
			respond.data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
};

module.exports = cards;

/***/ }),

/***/ "./firNutriotion/js/modules/forms.js":
/*!*******************************************!*\
  !*** ./firNutriotion/js/modules/forms.js ***!
  \*******************************************/
/***/ ((module) => {

function forms() {

	const forms = document.querySelectorAll('form');

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

			//?FormData variant of POST method
			//const request = new XMLHttpRequest();
			// request.open('POST', 'server.php');//opening request with POST method and URI of server
			// request.setRequestHeader('Content-type', 'multipart/form-data');//*headers for FormData object not needed !!
			// request.send(formData); //formData are object with users data from inputs!

			//parsing formData format to object wich later will be parsed to JSON old way
			// const obj = {};
			// formData.forEach((value, key) => {
			// 	obj[key] = value;
			// });

			//We can asign JSON obj or invoke JSON>stringify in function args
			// const json = JSON.stringify(obj);
			// request.open('POST', 'server.php');
			// Header info with value of format of request method are necessary for server to understan if it is JSON format file
			// request.setRequestHeader('Content-type', 'application/json');
			// request.send(json);

			//formData a new object wich saves data from form
			const formData = new FormData(form),

				//Parsing formData to array of keys and values, parsing this array to usual JS obj, and then parsing this obj to JSON
				json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
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
		showModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');

		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&#215;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		modalOverlay.append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			modalContainer.classList.add('show');
			modalContainer.classList.remove('hide');
			closeModal();
		}, 4000);
	}
};

module.exports = forms;

/***/ }),

/***/ "./firNutriotion/js/modules/modals.js":
/*!********************************************!*\
  !*** ./firNutriotion/js/modules/modals.js ***!
  \********************************************/
/***/ ((module) => {

function modals() {

	const modalBtns = document.querySelectorAll('[data-modal]'),
		modalOverlay = document.querySelector('.modal');

	function showModal() {

		modalOverlay.classList.add('show');
		modalOverlay.classList.remove('hide');
		modalOverlay.classList.add('fade');
		document.body.style.overflow = 'hidden';

		clearInterval(modalTimerId);// if modal was open remove timer for showing modal
	}


	const modalTimerId = setTimeout(showModal, 60000);

	//Modal at the end of page 
	function showModalByScroll() {
		//if listed height and screen height >= all height of all doc showModal
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showModal();

			//removing handler after modal was showing once
			removeEventListener('scroll', showModalByScroll);
			//removing timer modal if user fastscrolling to the end of page
			clearInterval(modalTimerId);
		}
	}

	window.addEventListener('scroll', showModalByScroll);


	modalBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			showModal();
		});

	});

	function closeModal() {
		modalOverlay.classList.remove('show');
		document.body.style.overflow = ''; //?браузер сам подставит нужное свойство в пустую строку!
	}

	modalOverlay.addEventListener('click', (e) => {
		// If user clicked on overlay or clicked on  an element wich have attribute data close => closemodal will invoke!
		if (e.target === modalOverlay || e.target.getAttribute('data-close') === '') {
			closeModal();
		}

	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalOverlay.classList.contains('show')) {
			closeModal();
		}
	});

	//* modalBlock = modalOverlay.querySelector('.modal__dialog');
	//* btns = document.querySelectorAll('button[data-modal]'),
	// const closeModal = function (x) {
	// 	x.addEventListener('click', () => {
	// 		if (window.getComputedStyle(modalOverlay).display === 'flex') {
	// 			modalOverlay.style.display = 'none';
	// 		}
	// 	});
	// };


	// function centerModal(mOverlay) {
	// 	mOverlay.style.alignItems = 'center';
	// }


	// btns.forEach(btn => {
	// 	btn.addEventListener('click', (e) => {
	// 		e.preventDefault();
	// 		if (window.getComputedStyle(modalOverlay).display === 'none') {
	// 			centerModal(modalOverlay);
	// 			modalOverlay.style.display = 'flex';
	// 		}
	// 		closeModal(close);

	// 	});
	// });
};

module.exports = modals;

/***/ }),

/***/ "./firNutriotion/js/modules/slider.js":
/*!********************************************!*\
  !*** ./firNutriotion/js/modules/slider.js ***!
  \********************************************/
/***/ ((module) => {

function slider() {
	//? Slider by my own | first ever try
	//  const slideList = document.querySelectorAll('.offer__slide'),
	// 	prev = document.querySelector('.offer__slider-prev'),
	// 	next = document.querySelector('.offer__slider-next'),
	// 	currentElement = document.getElementById('current'),
	// 	totalElement = document.getElementById('total');

	// let currentIndex = 0,
	// 	slidesNum = slideList.length;

	// currentElement.innerText = `0${currentIndex + 1}`;
	// // console.log('slidesNum:', slidesNum);
	// console.log('currentIndex > ', currentIndex);

	// //default slide 
	// hideAllSlides(slideList);
	// showSlide(slideList, currentIndex);
	// showTotal(slideList);

	// prev.addEventListener('click', event => {
	// 	event.preventDefault();

	// 	if (currentIndex > 0 && currentIndex < 9) {
	// 		currentIndex = prevSlideAndIndex(slideList, currentIndex);
	// 		currentElement.innerText = `0${currentIndex + 1}`;
	// 		console.log('currentIndex:', currentIndex);
	// 	}

	// 	if (currentIndex > 9) {
	// 		currentIndex = prevSlideAndIndex(slideList, currentIndex);
	// 		currentElement.innerText = currentIndex;
	// 	}

	// });

	// next.addEventListener('click', event => {
	// 	event.preventDefault();

	// 	if (currentIndex >= 0 && currentIndex < 9 && currentIndex < slideList.length - 1) {
	// 		currentIndex = nextSlideAndIndex(slideList, currentIndex);
	// 		currentElement.innerText = `0${currentIndex + 1}`;
	// 	}

	// 	if (currentIndex > 9 && currentIndex < slideList.length - 1) {
	// 		hideSlide(slideList, currentIndex);
	// 		currentIndex++;
	// 		showSlide(slideList, currentIndex);
	// 		currentElement.innerText = currentIndex;
	// 	}

	// });

	// function showTotal(slides) {
	// if (slides.length > 0 && slides.length < 10) {
	// 	totalElement.innerText = '0' + slidesNum;
	// } else {
	// 	totalElement.innerText = slidesNum;
	// }
	// }

	// function showSlide(slides, index) {
	// 	slides[index].classList.remove('hide');
	// 	slides[index].classList.add('show');
	// }

	// function hideSlide(slides, index) {
	// 	slides[index].classList.remove('show');
	// 	slides[index].classList.add('hide');
	// }

	// function hideAllSlides(list) {
	// 	list.forEach(elem => {
	// 		elem.classList.add('hide');
	// 	});
	// }

	// function prevSlideAndIndex(slides, index) {
	// 	hideSlide(slides, index);
	// 	index--;
	// 	showSlide(slides, index);
	// 	return index;
	// }

	// function nextSlideAndIndex(slides, index) {
	// 	hideSlide(slides, index);
	// 	index++;
	// 	showSlide(slides, index);
	// 	return index;
	// }

	//?Slider implementation of carousel style most common variant
	//This method required a one more wrapper for carousel so i added it in HTML stucture (offer__slider-inner)
	//Variables of every wrapper od slider that we'll need 
	const slider = document.querySelector('.offer__slider'),
		mainSliderWrapper = document.querySelector('.offer__slider-wrapper'),
		slideContainer = mainSliderWrapper.querySelector('.offer__slider-inner'),
		slideList = mainSliderWrapper.querySelectorAll('.offer__slide'),

		//btn-arrow elements
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),

		//counter elements
		currentElement = document.getElementById('current'),
		totalElement = document.getElementById('total'),

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

		//*It is ONLY seems hard
		//slide.length - 1 neede for right appeareance w/o white slide at the end
		//if our offset reach a border of container and we press next once more
		//show to us first slide(loop of slides yep)
		//+width.slice(0, width.length - 2) => width it is a string == {'500px'} 
		// so we slicing num part and converting it into a number 500

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

		// dots.forEach((dot) => dot.style.opacity = .5);
		// dots[slideIndex - 1].style.opacity = 1;
		changingOpacity(dots, slideIndex);
	});

	//first implementation of dots nav
	// dots.forEach((item, index, dots) => {
	// 	item.addEventListener('click', () => {
	// 		offset = +width.slice(0, width.length - 2) * index;
	// 		slideContainer.style.transform = `translateX(-${offset}px)`;
	// 		dots.forEach((dot) => dot.style.opacity = .5);
	// 		item.style.opacity = 1;
	// 		counterDots(currentElement, index);
	// 	});
	// });

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

module.exports = slider;

/***/ }),

/***/ "./firNutriotion/js/modules/tabs.js":
/*!******************************************!*\
  !*** ./firNutriotion/js/modules/tabs.js ***!
  \******************************************/
/***/ ((module) => {

function tabs() {
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContentList = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

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
		tabs[i].classList.add('tabheader__item_active');
		tabsContentList[i].classList.remove('hide');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, index) => {
				if (target === tab) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});

};

module.exports = tabs;

/***/ }),

/***/ "./firNutriotion/js/modules/timer.js":
/*!*******************************************!*\
  !*** ./firNutriotion/js/modules/timer.js ***!
  \*******************************************/
/***/ ((module) => {

function timer() {
	const deadline = '2024-06-04';
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
	setClock('.timer', deadline);
};

module.exports = timer;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************************!*\
  !*** ./firNutriotion/js/script.js ***!
  \************************************/

//this event handle a function which spans all code inside her body  and do not allow  scripts to run before a HTMLcontent
document.addEventListener('DOMContentLoaded', () => {
	const tabs = __webpack_require__(/*! ./modules/tabs */ "./firNutriotion/js/modules/tabs.js"),
		modals = __webpack_require__(/*! ./modules/modals */ "./firNutriotion/js/modules/modals.js"),
		timer = __webpack_require__(/*! ./modules/timer */ "./firNutriotion/js/modules/timer.js"),
		cards = __webpack_require__(/*! ./modules/cards */ "./firNutriotion/js/modules/cards.js"),
		forms = __webpack_require__(/*! ./modules/forms */ "./firNutriotion/js/modules/forms.js"),
		slider = __webpack_require__(/*! ./modules/slider */ "./firNutriotion/js/modules/slider.js"),
		calc = __webpack_require__(/*! ./modules/calc */ "./firNutriotion/js/modules/calc.js");

	tabs();
	modals();
	timer();
	cards();
	forms();
	slider();
	calc();
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map