// Map конструкция позволяющая давать ключам(именам) свойств любые значения
// A не только те к-ые м-г быть преобразованы в строку

const shops = [
	{rice: 200},
	{sugar: 500},
	{nuclearElement: NaN}
]

// const [{rice, num} , ...rest] = shops;
// console.log(rice)
const map = new Map();
const budget = [5000, 10000, 15000]

shops.forEach((shop, i) => {
	map.set(shop, budget[i]);
})

// const map2 = new Map(
// 	[
// 		[{paper: 120}, 8000],
// 		['anyvalue', null],
// 		[[1,2,3,4], 'for real?!']
// 	]
// );

// map.set(shops[0], 5000);
// map.set(shops[1], 10000);
// map.set(shops[2], 15000);



// console.log(map2)

// for (let shop of map.keys()) {
// 	console.log(shop)
// }

// const products = [];

// for (let shop of map.keys()) {
// 	products.push(Object.keys(shop)[0])
// }

// console.log(Symbol.iterator in map.keys())
// console.log(map.entries())
// console.log(map.keys())

for (let [shop, budget] of map.entries()) {

	const [product, qty] = Object.keys(shop);
	console.log(`Shop have  ${product}, quantity equal ${qty}`);
	console.log(`Shop budget equal ${budget}`);

}

// console.log(map[Symbol.iterator] in map.keys())

const user = {
	name: 'John',
	surname: 'Shokerface',
	age: NaN
}



// const newUserMap = new Map (Object.entries(user));
// console.log(newUserMap)
// // console.log(Object.entries(user))

// const userFromMap = Object.fromEntries(newUserMap);
// console.log(userFromMap)

//* Methods Map
// map.set() => добавит св-во из арг и вернет map
// map.get() => вернет св-во из арг
// map.has() => true если св-во существует в карте
// map.delete() => удалит указанное в арг св-во
// map.clear() => удалит все св-ва в карте
// map.size => свойство
// map.keys() => возв итерируемый объект с ключами из map
// map.values() => возв значения!
// map.entries() =>возв и ключи и значения можно деструктрировать и получать ключи и значения в одном цикле. 
