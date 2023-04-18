'use strict';

const user = {
	name: 'Alex',
	surname: 'Smith',
	birthday: '20/04/1993',
	showMyPublicData: function () {
		console.log(`${this.surname} ${this.name}`);
	}
}

const arr = ['b', 'a', 'c'];
const str = 'string';
console.dir(arr)

const salaries = {
	john: 500,
	ivan: 1000,
	ann: 5000,
	sayHello: () => {
		console.log('Hello')
	}
}

//добавляем в св-во итератор в объект, это метод к-ый возвр. объект описывающий то как будет работать цикл for of
// метод next() обязательно должен возвращать объект с полем done
// если итерация закончилась {done : true} , иначе {done: false, value: значение с которого начнется следующая итерация}
// в блоке if описан код который произойдет за одну итерацию если if (true)
salaries[Symbol.iterator] = function () {
	return {
		current: this.john,
		last: this.ann,
		next() {
			if(this.current < this.last) {
				this.current = this.current + 500;
				return {done: false, value: this.current}
			} else {
				return {done: true}
			}
		}
	}
}