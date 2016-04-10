angular.module('main')

/**
 * Component Cart
 */
.component('cart', {
	templateUrl: 'cart.html',
	bindings : {
	},
	controller : function(cartService) {
		this.cart = cartService;
		this.toggled = true;
		
		this.toggle = function() {
			this.toggled = !this.toggled;
		};
	}
})

;