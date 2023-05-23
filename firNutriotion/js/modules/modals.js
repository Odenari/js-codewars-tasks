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