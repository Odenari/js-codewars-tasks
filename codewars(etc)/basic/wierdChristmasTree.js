'use strict';

// Todo create this "three" structure in console (nnnnnnnnnnyeeeeeeah)

//      *
//     ***
//    *****
//   *******
//  *********
// ***********

// ? Мог ли я решить это сам? Не знаю, но условие второго цикла пришлось подсмотреть =\

let result = '';
let rows = 6;
let spaces = 5;
for (let i = 0; i <= rows; i++) {
	for (let k = 0; k <= spaces; k++) {
		result += ' ';
	}
	for (let j = 0; j < 2 * i + 1; j++) {
		result += '*';
	}
	spaces--;
	result += '\n';
}
console.log(result);
