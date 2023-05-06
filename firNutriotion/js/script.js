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

	//Modal's
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
			card.innerHTML = `<img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;

			//deploying card on page at last place of parent container from args		
			this.parent.append(card);
		}
	}

	//creating cards w/o variables cuz they only existing like static elements of our page and no JS operations needed in future
	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих  овощей и фруктов. Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной  ценой и высоким качеством!',
		9,
		'.menu .container',
		'menu__item',
		'big'
	).render(); // invoking method immediately

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


	//POST from forms
	const forms = document.querySelectorAll('form');

	//*POST method usually wrapped in function
	function postData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();




			//object for telling users about his interactions with form 
			const formData = new FormData(form), //объект который будет хранить данные полученные из формы
				messages = {
					loading: 'img/form/spinner.svg',
					done: 'Спасибо, скоро мы с вами свяжемся',
					failure: 'Что-то пошло не так :('
				};

			//Creating a loading icon for request status loading (response not ready yet)	
			const statusMessage = document.createElement('img');
			statusMessage.src = messages.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			//insertAdjElem more powerfull than append, allow to deploy element after smth (config where to deploy in first arg)
			form.insertAdjacentElement('afterend', statusMessage);

			//?FormData variant of POST method
			//const request = new XMLHttpRequest();
			// request.open('POST', 'server.php');//opening request with POST method and URI of server
			// request.setRequestHeader('Content-type', 'multipart/form-data');//*headers for FormData object not needed !!
			// request.send(formData); //formData are object with users data from inputs!

			//?JSON variant of POST request
			//parsing formData format to object wich later will be parsed to JSON
			const obj = {};
			formData.forEach((value, key) => {
				obj[key] = value;
			});

			const json = JSON.stringify(obj);
			// request.open('POST', 'server.php');
			// Header info with value of format of request method are necessary for server to understan if it is JSON format file
			// request.setRequestHeader('Content-type', 'application/json');
			// request.send(json);

			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: json
			})
				.then(data => data.text())
				.then(data => {

					console.log(data);

					//showing message if everything done
					showThanksModal(messages.done);

					//removing message from screen (by deleting container elem)
					statusMessage.remove();
				})
				.catch(() => {
					//showing error message if promise status rejected
					showThanksModal(messages.failure);
				})
				.finally(() => {
					//method reset() are clearing inputs in form
					form.reset();
				});



			//adding eventHandler for proccesing response from a server
			// request.addEventListener('load', () => {

			// 	if (request.status === 200) {

			// 		console.log(request.response);

			// 		//showing message if everything done
			// 		showThanksModal(messages.done);

			// 		//method reset() are clearing inputs in form
			// 		form.reset();

			// 		//removing message from screen (by deleting container elem)
			// 		statusMessage.remove();

			// 	} else {

			// 		//showing error message if response not equal 200
			// 		showThanksModal(messages.failure);

			// 	}
			// });
		});
	}

	//invoking function of sending data to every form on page!
	forms.forEach(form => postData(form));

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
});

