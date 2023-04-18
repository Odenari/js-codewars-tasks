'use strict';

//Todo Create a store with few properties and atleast one method

const AwakeStore = {
	open: 'close',
	budget: 10000,
	employees: ['Budda', 'Krishna', 'Vishnu'],
	products: {
		chakra: 1000,
		mana: 1000
	},
	showEmployees: function () {
		console.log(this.employees);
	},
	showProducts: function() {
		console.log(this.products);
	},
	setProductAndPrice: function(product, price) {
		this.products[product] = price;
	}

};

AwakeStore.showEmployees();
AwakeStore.setProductAndPrice('salvation', Infinity);
AwakeStore.showProducts();