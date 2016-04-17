angular.module('main')

/**
 * Cart manager service
 */
.service('cartService', function($rootScope, saleService) {
	var self = this;
	
	/*
	 * Properties
	 */
	self.items = [];
	self.orders = [];
	self.total = 0;
	self.realTotal = 0;
	
	/*
	 * API
	 */
	self.findItem = findItem;
	self.findOrder = findOrder;
	self.addItem = addItem;
	self.removeItem = removeItem;
	self.increaseItem = increaseItem;
	self.decreaseItem = decreaseItem;
	self.empty = empty;
	self.calculation = calculation;
	
	/*
	 * Watchers
	 */
	$rootScope.$watch(function() {
		return self.orders;
	}, function() {
		self.calculation();
	}, true);
	
	/*
	 * Implementation
	 */
	function findItem(item) {
		var index = self.items.indexOf(item);
		return index >= 0 ? index : undefined;
	};
	
	function findOrder(item) {
		var index = self.findItem(item);
		
		if (index !== undefined) {
			return self.orders[index];
		}
	};
	
	function addItem(item) {
		var order = self.findOrder(item);
		
		if (!order) {
			var index = self.items.length;
			
			self.items.push(item);
			self.orders.push({
				index : index,
				item : item,
				quantity : 1
			});
		} else {
			order.quantity++;
		}
	};
	
	function removeItem(item) {
		var order = self.findOrder(item);
		if (order) {
			self.items.splice(order.index, 1);
			self.orders.splice(order.index, 1);
		}
	};	
	
	function increaseItem(item) {
		var order = self.findOrder(item);
		if (!order) {
			return;
		}
		
		order.quantity++;
	};
	
	function decreaseItem(item) {
		var order = self.findOrder(item);
		if (!order) {
			return;
		}
		
		if (order.quantity == 1) {
			self.removeItem(item);
		} else {
			order.quantity--;
		}
	};
	
	function empty() {
		return !self.items.length;
	};
	
	function calculation() {
		var _total = 0;
		
		self.orders.forEach(function(value, idx) {
			_total += value.quantity * value.item.price; 
		});
		
		self.realTotal = _total;
		
		saleService.getAndApplyOffers(self.items, _total, function(offeredTotal) {
			self.total = offeredTotal;
		});
	};
	
	return self;
})