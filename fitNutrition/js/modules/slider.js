
function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
	//Slider implementation of carousel style most common variant

	const slider = document.querySelector(container),
		mainSliderWrapper = document.querySelector(wrapper),
		slideContainer = mainSliderWrapper.querySelector(field),
		slideList = mainSliderWrapper.querySelectorAll(slide),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		currentElement = document.getElementById(currentCounter),
		totalElement = document.getElementById(totalCounter),

		//Getting all computed styles through window object, but assigning only width prop
		width = window.getComputedStyle(mainSliderWrapper).width;

	//our counter for current slide
	let slideIndex = 1,
		//offset are define how far we pushing slide (distance)
		offset = 0;

	//This block define how counter would be looking (w or w/o zero)
	if (slideList.length > 0 && slideList.length < 10) {
		currentElement.textContent = `0${slideIndex}`;
		totalElement.innerText = `0${slideList.length}`;
	} else {
		currentElement.textContent = slideIndex;
		totalElement.innerText = slideList.length;
	}

	//making our slide container as wide as many images will be pass in 
	slideContainer.style.width = 100 * slideList.length + '%';

	slideList.forEach(slide => {
		//actual slide width would be equal to the width of a mainWrapper wich showing current slide
		slide.style.width = width;
	});

	//dots for better navigation
	slider.style.position = 'relative';
	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('carousel-indicators');
	// indicators.style.cssText = '';

	slider.append(indicators);

	for (let i = 0; i < slideList.length; i++) {
		let dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i + 1);
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	mainSliderWrapper.style.overflow = 'hidden';
	slideContainer.style.display = 'flex';
	slideContainer.style.transition = '0.5s all ease';

	function counterPlus() {

		if (slideIndex === slideList.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		if (slideList.length < 10) {
			currentElement.textContent = `0${slideIndex}`;
		} else {
			currentElement.textContent = slideIndex;
		}
	}

	function counterMinus() {
		if (slideIndex === 1) {
			slideIndex = slideList.length;
		} else {
			slideIndex--;
		}
		if (slideList.length < 10) {
			currentElement.textContent = `0${slideIndex}`;
		} else {
			currentElement.textContent = slideIndex;
		}
	}

	function counterDots(list, counter, index) {
		if (list.length < 10) {
			counter.textContent = `0${index + 1}`;
		} else {
			counter.textContent = index + 1;
		}
		slideIndex = index + 1;
	}

	function changingOpacity(dots, index) {
		//so we are taking our array of dots and adding every dot equal opacity
		//Then we are taking one dot with specific index and highliting it setting opacity to 1 
		dots.forEach((dot) => dot.style.opacity = .5);
		dots[index - 1].style.opacity = 1;
	}

	const toNums = str => +str.replace(/\D/g, '');

	next.addEventListener('click', () => {

		if (offset == toNums(width) * (slideList.length - 1)) {
			offset = 0;
		} else {
			offset += toNums(width);
		}

		counterPlus();
		slideContainer.style.transform = `translateX(-${offset}px)`;

		//so we are taking our array of dots and adding every dot equal opacity 
		dots.forEach((dot) => dot.style.opacity = .5);
		//here we taking one dot with specific index and highliting it setting opacity to 1 
		dots[slideIndex - 1].style.opacity = 1;

		changingOpacity(dots, slideIndex);
	});


	prev.addEventListener('click', () => {

		if (offset == 0) {
			offset = toNums(width) * (slideList.length - 1);
		} else {
			offset -= toNums(width);
		}

		counterMinus();
		slideContainer.style.transform = `translateX(-${offset}px)`;
		changingOpacity(dots, slideIndex);
	});

	//actually a more usefull implementation of dots nav through data-attribute
	dots.forEach((dot, index, dots) => {
		const current = currentElement;

		dot.addEventListener('click', event => {

			const slideTo = event.target.getAttribute('data-slide-to');

			offset = toNums(width) * (slideTo - 1);
			slideContainer.style.transform = `translateX(-${offset}px)`;

			dots.forEach(dot => dot.style.opacity = .5);
			event.target.style.opacity = 1;

			counterDots(dots, current, index);
		});
	});
};

export default slider;