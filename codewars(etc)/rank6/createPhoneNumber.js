// Write a function that accepts an array of 10 integers(between 0 and 9), 
// that returns a string of those numbers in the form of a phone number.

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function createPhoneNumber(numbers) {
	let string = numbers.join('');
	return `(${string.slice(0, 3)}) ${string.slice(3, 6)}-${string.slice(6)}`;

	console.log(res);

}
createPhoneNumber(numbers)

function createPhoneNumberCodeWarsSolution(numbers) {
	var format = "(xxx) xxx-xxxx";

	for (let i = 0; i < numbers.length; i++) {
		format = format.replace('x', numbers[i]);
	}

	return format;
}