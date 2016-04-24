import angular from 'angular';import angularRoute from 'angular-route';
import cart from './components/cart';
import address from './components/address';
import order from './components/order';
import orderConfirmation from './components/orderConfirmation';
import cartService from './services/cart';
import saleService from './services/sale';
import orderService from './services/order';
import tooltip from 'angular-ui-bootstrap/src/tooltip/index-nocss';

import '../../css/cart.scss';

export default angular
	.module('potier.library.cart', [angularRoute, tooltip])
		.component('cart', cart)
		.component('address', address)
		.component('order', order)
		.component('orderConfirmation', orderConfirmation)
		.service('cartService', cartService)
		.service('saleService', saleService)
		.service('orderService', orderService)
	.name
;