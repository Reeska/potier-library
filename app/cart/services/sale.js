export default function saleService($http, config) {
	var self = this;
	
	/*
	 * API
	 */
	self.getAndApplyOffers = getAndApplyOffers;
	self.getOffers = getOffers;
	self.applyOffers = applyOffers;
	self.applyOffer = applyOffer;
	
	/*
	 * Implementation
	 */
	function getAndApplyOffers(books, total, fn) {
		self.getOffers(books, function(offers) {
			var offeredTotal = self.applyOffers(total, offers);
			
			angular.isFunction(fn) && fn(offeredTotal);
		});
	};
	
	function getOffers(books, fn) {
		if (!books || !books.length) {
			angular.isFunction(fn) && fn();
			return;
		}
		
		var isbns = [];
		books.forEach(function(value) {
			this.push(value.item.isbn);
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
	
	function applyOffers(total, offers) {
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
	
	function applyOffer(total, offer) {
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
	
	return self;
}