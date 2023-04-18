const weather = {
	temperature: 16,
	temperatureType: {
		celcius: 'C\u00b0',
		fahrenheit: 'F\u00b0'
	},
};
console.log(weather.temperatureType.celcius);
const {T, temperatureType: {...typesT}} = weather; 
console.log(typesT);



// * Создайте метод showAgeAndLangs внутри объекта personalPlanPeter. При его вызове метод будет принимать в себя объект и возвращать строку в нужном виде.
// * Пример:
// * personalPlanPeter.showAgeAndLangs(personalPlanPeter)
// * => 'Мне 29 и я владею языками: RU ENG'
// * Заметьте, что возраст и языки подставляются автоматически из объекта, а языки всегда в верхнем регистре (большими буквами). Если данные в объекте поменяются, то и сообщение тоже изменится.

const personalPlanPeter = {
	name: 'Peter',
	age: '29',
	skills: {
		languages: ['ru', 'eng'],
		programmingLangs: {
			js: '20%',
			php: '10%'
		},
		exp: '1 month'
	},
	// showAgeandLangs: function (obj) {
	// 	const {age, skills:{languages: langs}} = obj;
	// 	let upperrValues = '';
	// 	let result = `Мне ${age} и я владею языками: ${upperrValues} `;
	// 	for (const key in langs) {
	// 		upperrValues += langs[key].toUpperCase() + ' ';
	// 	}
	// 	return result;
	// }
	showAgeAndLangs: function(plan) {
		const {age} = plan;
		const {languages} = plan.skills;
		let str = `Мне ${age} и я владею языками: `;

		languages.forEach(function(lang) {
			str += `${lang.toUpperCase()} `;
		});

		return str;
	}

// function showProgrammingLangs(plan) {
// 	const {skills: {programmingLangs: langs}} = plan;
// 	if (!langs) {return '';}
// 	let result = '';
// 	for (const item in langs) {
// 		result += `Язык ${item} изучен на ${langs[item]}\n`;//*Запомни эту конструкцию for in получает ключи а значит можно поулчить доступ к значению свойства через[key]
// 	}
// 	return result;
// }
// const result = showProgrammingLangs(personalPlanPeter);
// console.log(result)
};