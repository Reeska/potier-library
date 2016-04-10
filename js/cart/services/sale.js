angular.module('main')

/**
 * Offers manager service : get and apply
 */
.service('saleService', function($http, config) {
	var self = this;
	
	this.getAndApplyOffers = function(books, total, fn) {
		this.getOffers(books, function(offers) {
			var offeredTotal = self.applyOffers(total, offers);
			
			angular.isFunction(fn) && fn(offeredTotal);
		});
	};
	
	this.getOffers = function(books, fn) {
		if (!books || !books.length) {
			angular.isFunction(fn) && fn();
			return;
		}
		
		var isbns = [];
		books.forEach(function(value) {
			this.push(value.isbn);
		}, isbns);
		
		var uri = config.serviceDomain + '/' +
			config.services.books + '/' +
			isbns.join(',') + '/' +
			config.services.offers; 
		
		$http
		.get(uri)
		.then(function(response) {
			angular.isFunction(fn) && fn(response.data.offers);
		}, function(response) {
			// error
			angular.isFunction(fn) && fn();
		});
	};
	
	this.applyOffers = function(total, offers) {
		if (!offers || !offers.length) {
			return total;
		}
		
		var minus;
		
		offers.forEach(function(value) {
			var value = self.applyOffer(total, value);
			
			if (minus === undefined || value < minus) {
				minus = value;
			}
		});
		
		return minus;
	};
	
	this.applyOffer = function(total, offer) {
		switch(offer.type) {
		case 'percentage':
			return total * (1 - offer.value/100);
		case 'minus':
			return total - offer.value;
		case 'slice':
			var slice = parseInt(total / offer.sliceValue);
			return total - slice * offer.value;
		}
		
		return total;
	};	
	
	return this;
})