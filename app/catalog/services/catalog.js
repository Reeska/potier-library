angular.module('main')

/**
 * Offers manager service : get and apply
 */
.service('catalogService', function($http, config) {
	var self = this;
	
	/*
	 * API
	 */
	self.all = all;
	self.search = search;
	
	/*
	 * Implementation
	 */
	function all(callback) {
		var fn = angular.isFunction(callback) ? callback : function() {};
		
		return $http
			.get(config.serviceDomain + '/' + config.services.books)
			.then(function(response) {
				fn(response.data);
			}, function() {
				fn([], true);
			});	
	};
	
	function search(filter, callback) {
		return self.all(function(books, error) {
			if (error) {
				callback([], true);
				return;
			}
			
			var result = books.filter(function(value) {
				return !!value.title.match(filter);
			});
			
			callback(result);
		});
	};
	
	return this;
})

;