const names = ['Vasya', 'John', 'Panteleon', 'Lucius', 'Tamaya'];

//filter 
const longNames = names.filter((name) => name.length > 5);
console.log(longNames);

//map
const answers = ['AFAvar', 'GUtinAHK', 'SutiR'];
const lowerNames = answers.map(string => string.toLowerCase());
console.log(lowerNames);

//some
const someArray = [1, 2, 3, 4, 5, 6];
const ifSome = someArray.some(el => typeof(el) === 'string');
console.log(ifSome);

//every
const areEvery = someArray.every(item => typeof(item) === 'number');
console.log(areEvery);

//REDUCE
const letters = ['h', 'e', 'l', 'l', 'o', '!'];
const nums = [10, 2, 20, 4];
const hello = letters.reduce((result, item) => result += item);
//10 is first acc value can be passed anything
const reduced = nums.reduce((acc, current) => acc = acc * current, 10);
console.log(hello, reduced);

const o = {
	ivan: 'person',
	ann: 'person',
	cat: 'animal',
	beaver: 'animal'
};

const entriesObj = Object.entries(o);

const namesArr = entriesObj.filter(name => name[1] === 'person').map(item => item[0]);
console.log(namesArr);