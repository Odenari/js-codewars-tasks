// TODO Write a function that takes an array of numbers and returns the sum of the numbers.
// The numbers can be negative or non - integer.
// If the array does not contain any numbers then you should return 0.

const arr = [1, 23, 34, 123, 1211, 1, -2, 9.344],
	string = 'abcdefg';

function sum(numbers) {
	"use strict";
	let isAnyNums = false;
	let res = 0;
	for (let elem of numbers) {
		if (typeof(elem) === 'number') {
			isAnyNums = true;
		}
	}
	if(isAnyNums) {
		for (let num of numbers) {
			res += num
		}
		return res;
	} else { return 0 }
};
console.log(sum(string))

function mapSum(array) {
	return  array.reduce((x, y) => x + y) //read about reduce
}
console.log(mapSum(arr))
