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

	//Timer code ahead
	const deadline = '2023-04-30';
	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			mins = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor(t / 1000) % 60;
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
});