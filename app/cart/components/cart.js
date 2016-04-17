angular.module('main')

/**
 * Component Cart
 */
.component('cart', {
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
		
		function orders() {
			return cartService.orders;
		}
		
		function increaseItem(item) {
			return cartService.increaseItem(item);
		}
		
		function decreaseItem(item) {
			return cartService.increaseItem(item);
		}
		
		function total() {
			return cartService.total;
		}
		
		function realTotal() {
			return cartService.realTotal;
		}		
	}
})

;