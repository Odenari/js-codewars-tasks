//TODO Numbers always higher than 0, no need to validate type etc;

const unsortedString = '3 2 2 5 6 7 1 32';
function highAndLowString(stringNumbers) {
	const nums = stringNumbers.split(' ');
	sortedArr = Array.from(nums).sort((x, y) => {
		// this will change alghoritm inside sort() cuz sort by default sorting at unicode letter sequence
		return x - y //? if x - y greater than zero change swap them
	});

	return sortedArr;
}
console.log(highAndLowString(unsortedString));