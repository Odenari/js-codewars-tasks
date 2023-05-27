import { showModal, closeModal } from "./modals";
import postData from "../services/services";

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
		showModal('.modal', modalTimerId);

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
			closeModal('.modal');
		}, 1500);
	}
};

export default forms;