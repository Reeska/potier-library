angular.module('main')

/**
 * Cart manager service
 */
.service('cartService', function($rootScope, saleService) {
	var self = this;
	
	this.items = [];
	this.orders = [];
	this.total = 0;
	this.realTotal = 0;
	
	$rootScope.$watch(function() {
		return self.orders;
	}, function() {
		self.calculation();
	}, true);
	
	this.findItem = function(item) {
		var index = this.items.indexOf(item);
		return index >= 0 ? index : undefined;
	};
	
	this.findOrder = function(item) {
		var index = this.findItem(item);
		
		if (index !== undefined) {
			return this.orders[index];
		}
	};
	
	this.addItem = function(item) {
		var order = this.findOrder(item);
		
		if (!order) {
			var index = this.items.length;
			
			this.items.push(item);
			this.orders.push({
				index : index,
				item : item,
				quantity : 1
			});
		} else {
			order.quantity++;
		}
	};
	
	this.removeItem = function(item) {
		var order = this.findOrder(item);
		if (order) {
			this.items.splice(order.index, 1);
			this.orders.splice(order.index, 1);
		}
	};	
	
	this.increaseItem = function(item) {
		var order = this.findOrder(item);
		if (!order) {
			return;
		}
		
		order.quantity++;
	};
	
	this.decreaseItem = function(item) {
		var order = this.findOrder(item);
		if (!order) {
			return;
		}
		
		if (order.quantity == 1) {
			this.removeItem(item);
		} else {
			order.quantity--;
		}
	};
	
	this.empty = function() {
		return !this.items.length;
	};
	
	this.calculation = function() {
		var _total = 0;
		
		self.orders.forEach(function(value, idx) {
			_total += value.quantity * value.item.price; 
		});
		
		self.realTotal = _total;
		
		saleService.getAndApplyOffers(this.items, _total, function(offeredTotal) {
			self.total = offeredTotal;
		});
	};
	
	return this;
})