'use strict';
//? Task #1
// const family = ['Peter', 'Ann', 'Alex', 'Linda'];

// function showFamily(arr) {
	
// 	if(!arr.length) {
// 		return 'Семья пуста';
// 	}
	
// 	let familyMembers = 'Семья состоит из: ';
// 	arr.forEach(element => {
// 		familyMembers += element + ' ';
// 	});

// 	return familyMembers;
// }

//? Task #2
// const favoriteCities = ['liSBon', 'ROME', 'miLan', 'Dublin'];

// function standartizeStrings(arr) {
// 	for (const element of arr) {
// 		let res = element.toLowerCase();
// 		console.log(res);
// 	}
// }
// standartizeStrings(favoriteCities);

//? Task #3
// const someString = 'This is some strange string';

// function reverse(str) {
// 	if(typeof(str) !== 'string') {return 'Ошибка!';}
// 	let backwardStr = '';
// 	for (let i = str.length - 1; i >= 0; i--) {
// 		backwardStr += str[i];
// 	}
// 	return backwardStr;
// }
// reverse(someString);

//? Task #4
// Представьте такую реальную ситуацию. У вас есть банкомат,
// который выдает деньги из двух разных банков в разных валютах.
// Один банк основной с базовыми валютами, второй дополнительный с прочими валютами:
// const baseCurrencies = ['USD', 'EUR'];
// const additionalCurrencies = ['UAH', 'RUB', 'CNY'];
// Вам нужно создать главную функцию банкомата availableCurr, которая принимает два аргумента:
// первый - это массив со всеми доступными валютами из двух банков сразу (сейчас представим, что они не могут повторяться),
// второй - необязательный аргумент, который указывает ту валюту, которая сейчас закончилась в банкомате.
// Если массив в первом аргументе пустой - то функция возвращает строку 'Нет доступных валют'. Функция возвращает строку в нужном виде.
// Пример:
// availableCurr(['UAH', 'RUB', 'CNY'], 'CNY')
// Вернет строку:
// Доступные валюты:
// UAH
// RUB
// Заметьте:
// - CNY (юань) исчез из списка валют, значит такая валюта закончилась
// - После валюты: стоит перенос строки \n, и после каждой валюты тоже. Это важно для тестов
// - Данные для первого аргумента должны приходить сразу из двух банков, причем сначала baseCurrencies,
//   потом additionalCurrencies по порядку

// const baseCurrencies = ['USD', 'EUR', 'RUB'];
// const additionalCurrencies = ['UAH', 'RUB', 'CNY'];

// const bothCurrencies = baseCurrencies.concat(additionalCurrencies);
// Коллбек всегда проходит по всем элементам и что-то с ними делает =)
// Метод фильтр 

// function availableCurr(bothCurrencies, missingCurr) {
// 	if (!bothCurrencies.length) {
// 		return 'Нет доступных валют';
// 	}
// 	let res = 'Доступные валюты:\n';
// 	//Цикл создают массив с уникальными элементами (если новый массив не включает элемент => добавить его)
// 	const unicCurrencies = [];
// 	bothCurrencies.forEach((element) => {
// 		if (!unicCurrencies.includes(element)) {
// 			unicCurrencies.push(element);
// 		}
// 	});
// 	//Создаем новый массив => присваиваем результат  метода filter: если элемент не тождественен аргументу => добавь его в новый массив 
// 	let filteredArr = unicCurrencies;
// 	if (missingCurr) { 
// 		filteredArr = unicCurrencies.filter(element => element !== missingCurr);
// 	}

// 	return res + filteredArr.join('\n') + '\n';
// }
// //Оператор развертывания обернутый в квадртаные скобки мсоздаст массив из распакованых им элементов
// let res = availableCurr([...baseCurrencies, ...additionalCurrencies], 'CNY');
// console.log(res);

//? Task #5
//* Структура ответа == [[3 эелемента],[3 элемента],[3 элемента],...меньше трех - просто строка]
//Для того чтобы tempArr не стиралдся внутри res надо переприсваивать массив  tempArr = [], а не обнулять его дилну - temArr.length = 0!!!
const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Chris', 'Bernard', 'Takesi', 'Sam'];

function sortStudentsByGroups(arr) {
	let tempArr = [];
	const res = [];
	const sorted = arr.sort();

	sorted.forEach((elem, index) => {
		tempArr.push(elem);
		if (tempArr.length === 3 && index !== sorted.length - 1) {
			res.push(tempArr);
			tempArr = [];
		}
		if (index === sorted.length - 1 && tempArr.length < 3) {
			res.push(`Оставшиеся студенты: ${tempArr.join(', ')}`);
		} else if (index === sorted.length - 1 && tempArr.length === 3){
			res.push('Оставшиеся студенты: -');
		}
	});

	return res;
}

const ramambaharumamburu = sortStudentsByGroups(students);
console.log(ramambaharumamburu);
