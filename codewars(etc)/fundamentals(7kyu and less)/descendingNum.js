function descendingOrder(n) {
	let res = '';
	const arr = n.toString().split('').sort((a, b) => {
		return b - a;
	});
	arr.forEach(elem => {
		res += elem;
	});
	return typeof(+res);
}
