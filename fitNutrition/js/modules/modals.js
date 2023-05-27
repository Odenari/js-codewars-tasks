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

export default modals;
export { showModal, closeModal};