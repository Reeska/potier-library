export default {
	templateUrl: 'app/views/components/bookItem.html',
	controllerAs: 'item',
	bindings : {
		book: '='
	},
	controller : BookItem
}
;

function BookItem(cartService) {
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