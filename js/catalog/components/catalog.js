angular.module('main')

/**
 * Component bookItem : item of book list
 */
.component('catalog', {
	templateUrl: 'catalog.html',
	bindings : {
	},
	controller : function(bookService) {
		var self = this;
		
		this.books = [];
		this.filter = '';
		this.loading = false;

		this.search = function() {
			self.loading = true;
			
			bookService.search(this.filter, function(list, error) {
				self.books = list;
				self.loading = false;
			});
		};
		
		/*
		 * Init
		 */
		this.search();
	}
})

/**
 * Component bookItem : item of book list
 */
.component('bookItem', {
	templateUrl: 'bookItem.html',
	bindings : {
		book: '='
	},
	controller : function(cartService) {
		this.cart = cartService;
	}
})

;