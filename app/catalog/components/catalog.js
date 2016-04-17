angular.module('main')

/**
 * Component bookItem : item of book list
 */
.component('catalog', {
	templateUrl: 'app/views/catalog.html',
	bindings : {
	},
	controller : function(catalogService) {
		var self = this;

		/*
		 * Init
		 */
		self.$onInit = function() {
			self.search();
		};
		
		/*
		 * Properties
		 */
		self.books = [];
		self.filter = '';
		self.loading = false;
		
		/*
		 * API
		 */
		self.search = search;

		/*
		 * Implementation
		 */
		function search() {
			self.loading = true;
			
			catalogService.search(self.filter, function(list, error) {
				self.books = list;
				self.loading = false;
			});
		};
	}
})

;