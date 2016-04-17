import angular from 'angular';
import cart from './components/cart';
import cartService from './services/cart';
import saleService from './services/sale';
import tooltip from 'angular-ui-bootstrap/src/tooltip/index-nocss';

export default angular
	.module('potier.library.cart', [tooltip])
		.component('cart', cart)
		.service('cartService', cartService)
		.service('saleService', saleService)
	.name
;