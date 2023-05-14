const inputRub = document.getElementById('rub'),
	inputUSD = document.getElementById('usd');

inputRub.addEventListener('input', () => {
	const request = new XMLHttpRequest();

	request.open('GET', 'current.json'); // open(method, url, async, login, password)
	request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //configuration of request
	request.send(); //sending request to server, send(body), where body - data from server

	request.addEventListener('load', () => {
		if (request.status === 200) {
			const data = JSON.parse(request.response);
			inputUSD.value = (+inputRub.value / data.current.usd).toFixed(2);
			// console.log(request.responseText); 	
		} else {
			inputUSD.value = 'Something goes wrong';
		}
	});

});

