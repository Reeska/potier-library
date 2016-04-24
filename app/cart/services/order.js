export default function orderService() {
	var self = this;

	self.lastOrder = null;

	/*
	 * API
	 */
	self.saveOrder = saveOrder;
	self.getLastOrder = getLastOrder;

	/**
	 * Save order in database.
	 *
	 * @param items
	 * @param total Sale price
	 * @param address
	 */
	function saveOrder(items, total, address) {
		self.lastOrder = {
			items: items,
			total: total,
			address: address
		}
	}

	/**
	 * Get last order.
	 * @returns {{items: *, total: *, address: *}|*|null}
	 */
	function getLastOrder() {
		return self.lastOrder;
	}
}