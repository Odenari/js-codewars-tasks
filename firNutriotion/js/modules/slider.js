function slider() {
	//? Slider by my own | first ever try
	//  const slideList = document.querySelectorAll('.offer__slide'),
	// 	prev = document.querySelector('.offer__slider-prev'),
	// 	next = document.querySelector('.offer__slider-next'),
	// 	currentElement = document.getElementById('current'),
	// 	totalElement = document.getElementById('total');

	// let currentIndex = 0,
	// 	slidesNum = slideList.length;

	// currentElement.innerText = `0${currentIndex + 1}`;
	// // console.log('slidesNum:', slidesNum);
	// console.log('currentIndex > ', currentIndex);

	// //default slide 
	// hideAllSlides(slideList);
	// showSlide(slideList, currentIndex);
	// showTotal(slideList);

	// prev.addEventListener('click', event => {
	// 	event.preventDefault();

	// 	if (currentIndex > 0 && currentIndex < 9) {
	// 		currentIndex = prevSlideAndIndex(slideList, currentIndex);
	// 		currentElement.innerText = `0${currentIndex + 1}`;
	// 		console.log('currentIndex:', currentIndex);
	// 	}

	// 	if (currentIndex > 9) {
	// 		currentIndex = prevSlideAndIndex(slideList, currentIndex);
	// 		currentElement.innerText = currentIndex;
	// 	}

	// });

	// next.addEventListener('click', event => {
	// 	event.preventDefault();

	// 	if (currentIndex >= 0 && currentIndex < 9 && currentIndex < slideList.length - 1) {
	// 		currentIndex = nextSlideAndIndex(slideList, currentIndex);
	// 		currentElement.innerText = `0${currentIndex + 1}`;
	// 	}

	// 	if (currentIndex > 9 && currentIndex < slideList.length - 1) {
	// 		hideSlide(slideList, currentIndex);
	// 		currentIndex++;
	// 		showSlide(slideList, currentIndex);
	// 		currentElement.innerText = currentIndex;
	// 	}

	// });

	// function showTotal(slides) {
	// if (slides.length > 0 && slides.length < 10) {
	// 	totalElement.innerText = '0' + slidesNum;
	// } else {
	// 	totalElement.innerText = slidesNum;
	// }
	// }

	// function showSlide(slides, index) {
	// 	slides[index].classList.remove('hide');
	// 	slides[index].classList.add('show');
	// }

	// function hideSlide(slides, index) {
	// 	slides[index].classList.remove('show');
	// 	slides[index].classList.add('hide');
	// }

	// function hideAllSlides(list) {
	// 	list.forEach(elem => {
	// 		elem.classList.add('hide');
	// 	});
	// }

	// function prevSlideAndIndex(slides, index) {
	// 	hideSlide(slides, index);
	// 	index--;
	// 	showSlide(slides, index);
	// 	return index;
	// }

	// function nextSlideAndIndex(slides, index) {
	// 	hideSlide(slides, index);
	// 	index++;
	// 	showSlide(slides, index);
	// 	return index;
	// }

	//?Slider implementation of carousel style most common variant
	//This method required a one more wrapper for carousel so i added it in HTML stucture (offer__slider-inner)
	//Variables of every wrapper od slider that we'll need 
	const slider = document.querySelector('.offer__slider'),
		mainSliderWrapper = document.querySelector('.offer__slider-wrapper'),
		slideContainer = mainSliderWrapper.querySelector('.offer__slider-inner'),
		slideList = mainSliderWrapper.querySelectorAll('.offer__slide'),

		//btn-arrow elements
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),

		//counter elements
		currentElement = document.getElementById('current'),
		totalElement = document.getElementById('total'),

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

		//*It is ONLY seems hard
		//slide.length - 1 neede for right appeareance w/o white slide at the end
		//if our offset reach a border of container and we press next once more
		//show to us first slide(loop of slides yep)
		//+width.slice(0, width.length - 2) => width it is a string == {'500px'} 
		// so we slicing num part and converting it into a number 500

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

		// dots.forEach((dot) => dot.style.opacity = .5);
		// dots[slideIndex - 1].style.opacity = 1;
		changingOpacity(dots, slideIndex);
	});

	//first implementation of dots nav
	// dots.forEach((item, index, dots) => {
	// 	item.addEventListener('click', () => {
	// 		offset = +width.slice(0, width.length - 2) * index;
	// 		slideContainer.style.transform = `translateX(-${offset}px)`;
	// 		dots.forEach((dot) => dot.style.opacity = .5);
	// 		item.style.opacity = 1;
	// 		counterDots(currentElement, index);
	// 	});
	// });

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

module.exports = slider;