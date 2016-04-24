export default {
	templateUrl: 'app/views/components/cart/address.html',
	controllerAs: 'item',
	bindings: {
		'address' : '=',
		'readonly' : '='
	},
	controller: Address
};

function Address() {
	
}