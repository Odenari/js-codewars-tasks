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