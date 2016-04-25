import saleService from '../../app/cart/services/sale';

describe('Test saleService', function () {
	var $http = null;
	var config = {};
	var sale = new saleService($http, config);

	it('checks if all kind of offer is applied correctly', function () {
		let total = 150;
		let percentage = {"type": "percentage", "value": 5};
		let minus =  {"type": "minus", "value": 15};
		let slice = {"type": "slice", "sliceValue": 100, "value": 12};

		expect(sale.applyOffer(total, percentage)).toEqual(142.50);
		expect(sale.applyOffer(total, minus)).toEqual(135);
		expect(sale.applyOffer(total, slice)).toEqual(138);
	});

	it('checks if best offer is applied', function () {
		let total = 65;
		let offers = [
			{"type": "percentage", "value": 5},
			{"type": "minus", "value": 15},
			{"type": "slice", "sliceValue": 100, "value": 12}
		];

		let offeredTotal = sale.applyOffers(total, offers);

		expect(offeredTotal).toEqual(50);
	});
});


