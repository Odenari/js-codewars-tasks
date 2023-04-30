'use strict';

document.addEventListener('DOMContentLoaded', () => {

	//Tabs
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
		tabsContentList[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
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

	//Timer
	const deadline = '2023-04-27';
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

	//Modal
	const modalBtns = document.querySelectorAll('[data-modal]'),
		close = document.querySelector('[data-close]'),
		modalOverlay = document.querySelector('.modal');

	function showModal() {
		modalOverlay.classList.toggle('show');
		modalOverlay.classList.add('fade');
		document.body.style.overflow = 'hidden';
		// clearInterval(modalTimerId);// if modal was open remove timer for showing modal
	}


	// const modalTimerId = setTimeout(showModal, 3000);

	//Modal at the end of page 
	function showModalByScroll() {
		//if listed height and screen height >= all height of all doc showModal
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showModal();

			//removing handler after modal was showing once
			removeEventListener('scroll', showModalByScroll);
			//removing timer modal if user fastscrolling to the end of page
			// clearInterval(modalTimerId);
		}
	}

	window.addEventListener('scroll', showModalByScroll);


	modalBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			// modalOverlay.classList.add('show');
			// modalOverlay.classList.remove('hide');
			showModal();

		});

	});



	function closeModal() {

		// modalOverlay.classList.remove('show');
		// modalOverlay.classList.add('hide');

		modalOverlay.classList.remove('show');
		document.body.style.overflow = ''; //?браузер сам подставит нужное свойство в пустую строку!
	}

	close.addEventListener('click', closeModal);

	modalOverlay.addEventListener('click', (e) => {
		if (e.target === modalOverlay) {
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

	//* Creating menu cards with class

	const cardContainer = document.querySelector('.menu__field .container');
	console.log(cardContainer);
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.descr = descr;
			this.title = title;
			this.price = price;
			this.classes = classes;
			this.transfer = 44; //new prop
			this.parent = document.querySelector(parentSelector);// prop of parenet elem to deploy our card on page
			this.changeToUAH(); // invoking inside constructor to parse USD into UAH and assign to prop of our exemp
		}
		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const card = document.createElement('div');
			this.classes.forEach(className => card.classList.add(className) );
			card.innerHTML = `<img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
			this.parent.append(card);
		}
	}

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих  овощей и фруктов. Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной  ценой и высоким качеством!',
		9,
		'.menu .container',
		'menu__item', 
		'big'
	).render();

	new MenuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум"',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - подлинное и полноценное ресторанное меню без похода в ресторан!',
		12,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню “Постное”',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		9,
		'.menu .container',
		'menu__item'
	).render();

});
