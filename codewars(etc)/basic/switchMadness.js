//Todo  функция Находит купе по номеру места

//* Напишите функцию, которая будет определять номер купе по переданному ей номеру места. Наглядно:
//* Функция принимает только целое число от 1 до 36.
//* Если переданный аргумент не число, отрицательное или дробное - возвращается сообщение:
//* Ошибка. Проверьте правильность введенного номера места
//* Если число 0 или больше 36, то сообщение: "Таких мест в вагоне не существует"

function getCoupeNumber(num) {
	if (num < 0 || !(Number.isInteger(num) || isNaN(num))) {
		return 'Ошибка. Проверьте правильность введенного номера места';
	} else if (num === 0 || num > 36) {
		return 'Таких мест в вагоне не существует';
	} else {
		switch(num) {
		case 1: case 2: case 3: case 4:
			return 1;
		case 5: case 6: case 7: case 8:
			return 2;
		case 9: case 10: case 11: case 12:
			return 3;
		case 13: case 14: case 15: case 16:
			return 4;
		case 17: case 18: case 19: case 20:
			return 5;
		case 21: case 22: case 23: case 24:
			return 6;
		case 25: case 26: case 27: case 28:
			return 7;
		case 29: case 30: case 31: case 32:
			return 8;
		case 33: case 34: case 35: case 36:
			return 9;
		}
	}
}
console.log(getCoupeNumber(22));