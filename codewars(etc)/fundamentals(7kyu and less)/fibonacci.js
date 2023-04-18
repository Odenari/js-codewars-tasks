//Todo Fibonacci
//* Wrote a function wich take number as parameter and show Fibonacci sequence in string represenation

const fibValue = num => {
	let prev = 0, next = 1, temp, res = `${prev} ${next}`;
	if (typeof (num) !== 'number' || num <= 0 || !Number.isInteger(num)) {
		return 'This isn\'t a number \=\\';
	}
	if (num === 1) {
		return res = `${prev}`;
	}
	for (let i = 2; i < num; i++) {
		temp = next;
		next = prev + next;
		prev = temp;
		res += ` ${next}`;
	}
	return res;
};
let fibonacciSequence = fibValue(40);
console.log(fibonacciSequence);

//Fibonacci length variant. There num is equal to length of desired sequence

function fibLength(num) {
	let x1 = 0;
	let x2 = 1;
	let res = `${x1} ${x2}`;
	let val;

	if (Number.isNaN(num) || !Number.isInteger(num)) {
		return '';
	} else if (num === 0) {
		return res = 'Void is the only truth';
	}

	for (let i = 2; i < num; i++) {
		val = x2;
		x2 = x1 + x2;
		x1 = val;
		res += ` ${x2}`;
	}
	return res;
}
console.log(fibLength(2));