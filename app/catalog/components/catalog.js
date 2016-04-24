export default {
	templateUrl: 'app/views/components/catalog.html',
	controllerAs: 'catalog',
	controller : Catalog
}
;

function Catalog(catalogService) {
	var self = this;
	
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
	 * Init
	 */
	self.$onInit = self.search;

	/*
	 * Implementation
	 */

	/**
	 * Search books for this filter.
	 * Loading image is displayed during searching.
	 */
	function search() {
		self.loading = true;
		
		catalogService.search(self.filter, list => {
			self.books = list;
			self.loading = false;
		});
	}
}