angular.module('main')


/**
 * Offers manager service : get and apply
 */
.service('bookService', function($http, config) {
	
	this.getAll = function(callback) {
		var fn = angular.isFunction(callback) ? callback : function() {};
		
		return $http
			.get(config.serviceDomain + '/' + config.services.books)
			.then(function(response) {
				fn(response.data);
			}, function() {
				fn([], true);
			});	
	};
	
	this.search = function(filter, callback) {
		return this.getAll(function(books, error) {
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