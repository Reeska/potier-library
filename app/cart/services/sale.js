import angular from 'angular';

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

	/**
	 * Get offers for this books and apply best offer.
	 *
	 * @param books Book list to get offers for.
	 * @param total Real total price for these books.
	 * @param fn Callback called when calculation is over.
	 */
	function getAndApplyOffers(books, total, fn) {
		self.getOffers(books, offers => {
			var offeredTotal = self.applyOffers(total, offers);
			
			angular.isFunction(fn) && fn(offeredTotal);
		});
	}

	/**
	 * Get all offers for these books.
	 *
	 * @param books
	 * @param fn Callback called when offers will be retrieved.
	 */
	function getOffers(books, fn) {
		if (!books || !books.length) {
			angular.isFunction(fn) && fn();
			return;
		}
		
		let isbns = books.map(value => value.item.isbn);
		
		let uri = config.serviceDomain + '/' +
			config.services.books + '/' +
			isbns.join(',') + '/' +
			config.services.offers; 
		
		$http
		.get(uri)
		.then(
			response => fn(response.data.offers),
			fn
		);
	}

	/**
	 * Apply best offer to this total.
	 *
	 * @param total Cart total
	 * @param offers Offers for cart's books.
	 * @returns number
	 */
	function applyOffers(total, offers) {
		if (!offers || !offers.length) {
			return total;
		}
		
		var minus = undefined;

		/**
		 * Test all offers
		 */
		offers.forEach(value => {
			let value = self.applyOffer(total, value);
			
			if (minus === undefined || value < minus) {
				minus = value;
			}
		});
		
		return minus;
	}

	/**
	 * Apply offer to this total.
	 *
	 * @param total Cart total
	 * @param offer Offer to apply
	 * @returns number
	 */
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
	}
	
	return self;
}