'use strict';

//first list of tasks
const films = [
	{
		name: 'Titanic',
		rating: 9
	},
	{
		name: 'Die hard 5',
		rating: 5
	},
	{
		name: 'Matrix',
		rating: 8
	},
	{
		name: 'Some bad film',
		rating: 4
	}
];

function showGoodFilms(arr) {
	return arr.filter(filmObj => filmObj.rating >= 8);
}

function showListOfFilms(arr) {
	return arr.reduce((acc, curr, i) => acc + curr.name + (i === arr.length - 1 ? '' : ', '), '');
}

console.log(showListOfFilms(films));

function showListOfFilmsMap(arr) {
	return arr.map(film => film.name).join(', ');
}

const filmsNamesOnly = showListOfFilmsMap(films);
// console.log(filmsNamesOnly);

function setFilmsIds(arr) {
	return arr.map((filmObj, index) => ({ ...filmObj, id: index }));
}

function setFilmsIdsNormally(arr) {
	return arr.map((filmObj, index) => {
		filmObj.id = index;
		return filmObj;
	});
}

const tranformedArray = setFilmsIds(films);

function checkFilms(arr) {
	return arr.every(filmObj => 'id' in filmObj);
}

//second list of tasks
const funds = [
	{ amount: -1400 },
	{ amount: 2400 },
	{ amount: -1000 },
	{ amount: 500 },
	{ amount: 10400 },
	{ amount: -11400 }
];

const getPositiveIncomeAmount = (data) => {
	return data.reduce((acc, value) => {
		const x = value.amount;
		return acc += x > 0 ? x : 0;
	}, 0);
};

const getTotalIncomeAmount = (data) => {
	if (data.some(x => x.amount < 0)) {
		return data.reduce((x, y) => x += y.amount, 0);
	} else {
		return getPositiveIncomeAmount(data);
	}
};

console.log(getTotalIncomeAmount(funds));