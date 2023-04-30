const priceType = 'oneSession';

function findFirstUpperCharIndex(string) {
	let index = -1;

	if (string.length <= 0) {
		return new Error('Empty string cannot contain any letters.');
	} else {

		for (let char in string) {

			if (string[char] === string[char].toUpperCase()) {
				return index = char;
			} 

		}

		return 'String does not contain second word, which starts from letter in uppercase registry.';
	}
}
const divideIndex = findFirstUpperCharIndex(priceType);
console.log(divideIndex);
// console.log(priceType.slice(priceType.indexOf(/[A-Z]/g)));