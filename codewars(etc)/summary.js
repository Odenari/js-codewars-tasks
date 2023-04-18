//* summary accept a number
//todo write a function wich return amount of numbers in summary range

function amountOfPages(summary) {

	let numberOfDigits = 0;
	let counter = 0;
	let depth = 1;
	
	while (numberOfDigits < summary) {
		counter++;
		if (counter >= 10 ** depth) {
			depth++;
		}
		numberOfDigits += depth;
	};

	return counter;
	
}

let x = amountOfPages(1095)
console.log(x);