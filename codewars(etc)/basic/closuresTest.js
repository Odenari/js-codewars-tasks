function createCounter() {
	let counter = 0;
	const myFunction = function () {
		return ++counter;
	};
	return myFunction;
}

const increment = createCounter();

let c1 = increment();
let c2 = increment();
let c3 = increment();
increment();

console.log(increment()) // => 5