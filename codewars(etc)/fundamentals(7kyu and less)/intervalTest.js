let box = document.querySelector('.box');
console.dir(box);
box.addEventListener('click', () => {
	move();
	// if (box)
});

function move() {
	let counter = 0;
	const action = setInterval(() => {
		counter++;
		box.style.left = counter + 'px';
		box.style.top = counter + 'px';
		if (counter >= 300) {
			clearInterval(action);
			box.style.width = 100 + '%';
			box.style.height = 100 + '%';
			box.style.position = 'static';
		}
	}, 10);

}