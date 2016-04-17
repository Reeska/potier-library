export default {
	templateUrl: 'app/views/bookItem.html',
	controllerAs: 'item',
	bindings : {
		book: '='
	},
	controller : bookItem
}
;

function bookItem(cartService) {
	var self = this;
	
	/*
	 * API
	 */
	self.addToCart = addToCart;
	
	/*
	 * Implementation
	 */
	function addToCart() {
		cartService.addItem(self.book);
	}
}