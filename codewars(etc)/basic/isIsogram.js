// TODO 
//* An isogram is a word that has no repeating letters, consecutive or non - consecutive.
//* Implement a function that determines whether a string that contains only letters is an isogram.
//* Assume the empty string is an isogram. Ignore letter case.

const iso = 'Dermatoglyphics',
	str = 'WAgH!',
	aba = 'aba';

function isIsogram(str) {

	const lowStr = str.toLowerCase();

	for (let i = 0; i < lowStr.length; i++) {
		for (let j = 1; j < lowStr.length; j++) {
			if (j == i) { continue }
			if (lowStr[i] === lowStr[j]) {
				return false;
			}
		}
	}

	return true
}
console.log(isIsogram(str));

