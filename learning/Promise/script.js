'use strict';
// fetch('https://api.sampleapis.com/beers/ale').then(data => JSON.stringify(data)).then(data => console.dir(data));

// fetch('https://api.sampleapis.com/beers/ale').then(data => console.log(data));

fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => response.json())
	.then(json => console.log(json));

//jsonplaceholder.com
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify({
		name: 'Anton',
		buidType: 'Different in many ways',
		determinationLvl: 'HIGH',
		resolut: true,
		done() {
			console.log('Get those things DONE!!!');
		},
		appliactions: {
			gym: true,
			learning: ['WEB', 'JS', 'English'],
			'selfImprovement': true,
			'selfImprovementRate': 'HIGH'
		}
	}),
	headers: {
		'Content-type': 'application/json'
	}
})
	.then((response) => response.json())
	.then((json) => console.log(json));
