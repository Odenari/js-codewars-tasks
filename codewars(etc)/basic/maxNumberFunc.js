'use strict';

//* Напишите функцию, которая принимает в себя 4 числа и возвращает самое большее из них.
//* Если один из аргументов не является числом или их меньше 4 - возвращается 0. Дробные числа разрешены.

function findMaxNumber(a, b, c, d) {

	if (typeof (a) !== 'number' ||
		typeof (b) !== 'number' ||
		typeof (c) !== 'number' ||
		typeof (d) !== 'number' ||
		arguments.length < 4) {
		return 0;
	} else {
		return Math.max(a, b, c, d);
	}
}

console.log(findMaxNumber(- 90, 2343.2, 2343, 11));