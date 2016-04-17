export default function cartService($rootScope, saleService, storageService) {
	var self = this;
	
	/*
	 * Properties
	 */
	self.orders = storageService.get('orders', []);
	self.total = 0;
	self.realTotal = 0;
	
	/*
	 * API
	 */
	self.findOrder = findOrder;
	self.addItem = addItem;
	self.removeItem = removeItem;
	self.increaseItem = increaseItem;
	self.decreaseItem = decreaseItem;
	self.empty = empty;
	self.clear = clear;
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
	function findOrder(item) {
		return self.orders.find(order => item.isbn == order.item.isbn);
	};
	
	function addItem(item) {
		var order = self.findOrder(item);
		
		if (!order) {
			self.orders.push({
				index : self.orders.length,
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
		return !self.orders.length;
	};

	function clear() {
		self.orders.splice(0, self.orders.length);
	}
	
	function calculation() {
		var _total = 0;
		
		self.orders.forEach(function(value, idx) {
			_total += value.quantity * value.item.price; 
		});
		
		self.realTotal = _total;
		
		saleService.getAndApplyOffers(self.orders, _total, function(offeredTotal) {
			self.total = offeredTotal;
		});
	};
	
	return self;
}