export default {
	templateUrl: 'app/views/components/cart/cart.html',
	controllerAs: 'cart',
	bindings : {
	},
	controller : Cart
}
;

function Cart(cartService) {
	var self = this;

	/*
	 * Properties
	 */
	self.toggled = true;

	/*
	 * API
	 */
	self.toggle = toggle;
	self.empty = empty;
	self.clear = clear;
	self.products = products;
	self.increaseItem = increaseItem;
	self.decreaseItem = decreaseItem;
	self.total = total;
	self.realTotal = realTotal;

	/*
	 * Implementation
	 */

	/**
	 * Change cart info visibility.
	 */
	function toggle() {
		self.toggled = !self.toggled;
	}

	/**
	 * Checks if cart is empty.
	 * @returns boolean
	 */
	function empty() {
		return cartService.empty();
	}

	/**
	 * Clear the cart.
	 */
	function clear() {
		cartService.clear();
	}

	/**
	 * Get product list.
	 * @returns Array
	 */
	function products() {
		return cartService.products;
	}

	/**
	 * Increase item quantity in the cart.
	 * @param item
	 */
	function increaseItem(item) {
		cartService.increaseItem(item);
	}

	/**
	 * Decrease item quantity in the cart.
	 * After, if quantity is 0, the item is removed.
	 * @param item
	 */
	function decreaseItem(item) {
		cartService.decreaseItem(item);
	}

	/**
	 * Total price of this cart, special offer included.
	 * @returns float
	 */
	function total() {
		return cartService.total;
	}

	/**
	 * Total price of this cart, special offer excluded.
	 * @returns float
	 */
	function realTotal() {
		return cartService.realTotal;
	}
}