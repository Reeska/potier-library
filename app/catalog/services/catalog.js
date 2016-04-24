export default function catalogService($http, config) {
	var self = this;
	
	/*
	 * API
	 */
	self.all = all;
	self.search = search;
	
	/*
	 * Implementation
	 */

	/**
	 * Get all books from database.
	 *
	 * @param fn
	 * @returns {Promise.<*>|*}
	 */
	function all(fn) {
		return $http
			.get(config.serviceDomain + '/' + config.services.books)
			.then(
				response => fn(response.data),
				() => fn([], true)
			);
	}

	/**
	 * Search books for this filter.
	 *
	 * @param filter
	 * @param callback
	 * @returns {Promise.<*>|*|*}
	 */
	function search(filter, callback) {
		return self.all((books, error) => {
			if (error) {
				callback([], true);
				return;
			}
			
			var result = books.filter(value => !!value.title.match(filter));

			callback(result);
		});
	}
	
	return this;
}
;