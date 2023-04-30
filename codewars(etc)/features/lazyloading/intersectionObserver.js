//Todo infinite lazy loading example implemented with intersection observer
let cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		entry.target.classList.toggle('show', entry.isIntersecting);
	});
}, {
	threshold: 0,
});

cards.forEach(card => {
	observer.observe(card);
});