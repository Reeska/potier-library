export default function cartService($rootScope, saleService, storageService) {
	var self = this;
	
	/*
	 * Properties
	 */
	self.products = storageService.get('products', []);
	self.total = 0;
	self.realTotal = 0;
	
	/*
	 * API
	 */
	self.findProduct = findProduct;
	self.addItem = addItem;
	self.removeItem = removeItem;
	self.increaseItem = increaseItem;
	self.decreaseItem = decreaseItem;
	self.empty = empty;
	self.clear = clear;
	self.calculation = calculation;

	/*
	 * Init
	 */
	self.$onInit = self.calculation;

	/*
	 * Watchers
	 */

	/**
	 * When product list changed recalcule total price.
	 */
	$rootScope.$watch(() => {
		return self.products;
	}, () => {
		self.calculation();
	}, true);
	
	/*
	 * Implementation
	 */

	/**
	 * Find product element in product list which matches param item.
	 * @param item
	 * @returns object
	 */
	function findProduct(item) {
		return self.products.find(product => item.isbn == product.item.isbn);
	}

	/**
	 * Add item to the cart.
	 * If the cart already contains this item, product's quantity is increased by 1.
	 * @param item
	 */
	function addItem(item) {
		var product = self.findProduct(item);
		
		if (!product) {
			self.products.push({
				index : self.products.length,
				item : item,
				quantity : 1
			});
		} else {
			product.quantity++;
		}
	}

	/**
	 * Remove this item.
	 * @param item
	 */
	function removeItem(item) {
		var product = self.findProduct(item);
		if (product) {
			self.products.splice(product.index, 1);
		}
	}

	/**
	 * Increase item quantity in the cart.
	 * @param item
	 */
	function increaseItem(item) {
		var product = self.findProduct(item);
		if (!product) {
			return;
		}

		product.quantity++;
	}

	/**
	 * Decrease item quantity in the cart.
	 * After, if quantity is 0, the item is removed.
	 * @param item
	 */
	function decreaseItem(item) {
		var product = self.findProduct(item);
		if (!product) {
			return;
		}
		
		if (product.quantity == 1) {
			self.removeItem(item);
		} else {
			product.quantity--;
		}
	}

	/**
	 * Checks if cart is empty.
	 * @returns boolean
	 */
	function empty() {
		return !self.products.length;
	}

	/**
	 * Clear the cart.
	 */
	function clear() {
		self.products.splice(0, self.products.length);
	}

	/**
	 * Calculating the real total price, and the sale total price
	 * by getting current offers for this cart.
	 */
	function calculation() {
		var _total = 0;
		
		self.products
			.forEach(value => _total += value.quantity * value.item.price);
		
		self.realTotal = _total;
		
		saleService.getAndApplyOffers(
			self.products,
			_total,
			offeredTotal => self.total = offeredTotal
		);
	}
	
	return self;
}