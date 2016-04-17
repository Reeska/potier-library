angular.module('main')

/**
 * Component bookItem : item of book list
 */
.component('bookItem', {
	templateUrl: 'app/views/bookItem.html',
	controllerAs: 'item',
	bindings : {
		book: '='
	},
	controller : function(cartService) {
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
})

;