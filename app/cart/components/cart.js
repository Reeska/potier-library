export default {
	templateUrl: 'app/views/cart.html',
	controllerAs: 'cart',
	bindings : {
	},
	controller : function(cartService) {
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
		self.orders = orders;
		self.increaseItem = increaseItem;
		self.decreaseItem = decreaseItem;
		self.total = total;
		self.realTotal = realTotal;
		
		/*
		 * Implementation
		 */
		function toggle() {
			self.toggled = !self.toggled;
		}
		
		function empty() {
			return cartService.empty();
		}

		function clear() {
			cartService.clear();
		}
		
		function orders() {
			return cartService.orders;
		}
		
		function increaseItem(item) {
			return cartService.increaseItem(item);
		}
		
		function decreaseItem(item) {
			return cartService.decreaseItem(item);
		}
		
		function total() {
			return cartService.total;
		}
		
		function realTotal() {
			return cartService.realTotal;
		}		
	}
}
;