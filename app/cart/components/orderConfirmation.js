export default {
	templateUrl: 'app/views/components/cart/orderConfirmation.html',
	controllerAs: 'confirmation',
	controller: OrderConfirmation
};

function OrderConfirmation(orderService) {
	var self = this;

	self.order = orderService.getLastOrder();
}