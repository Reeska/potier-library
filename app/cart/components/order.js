export default {
	templateUrl: 'app/views/components/cart/order.html',
	controllerAs: 'order',
	controller: Order
}

function Order($location, storageService, cartService, orderService) {
	var self = this;

	/*
	 * Properties
	 */
	/**
	 * Save address in storage for next buy
	 */
	self.address = storageService.get('address', {});

	/*
	 * API
	 */
	self.proceed = proceed;
	self.removeAddress = removeAddress;

	/*
	 * Implementation
	 */
	
	/**
	 * Trigger order for this cart and address.
	 */
	function proceed() {
		orderService.saveOrder(cartService.products, cartService.total, self.address);

		cartService.clear();

		$location.path('/cart/confirm');
	}

	/**
	 * Forget address from browser.
	 */
	function removeAddress() {
		self.address = storageService.get('address', {}, true);
	}
}