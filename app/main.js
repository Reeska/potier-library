import angular from 'angular';
import angularRoute from 'angular-route';
import commonModule from './common/common.module';
import libraryModule from './library/library.module';
import cartModule from './cart/cart.module';
import catalogModule from './catalog/catalog.module';
import aboutModule from './about/about.module';
import 'babel-polyfill';
import '../css/main.scss';

/**
 * Init main app
 */
angular
	.module('potier.library', [angularRoute, commonModule, libraryModule, cartModule, catalogModule, aboutModule])
	.constant('config', {
		serviceDomain: 'http://henri-potier.xebia.fr',
		services: {
			books: 'books',
			offers: 'commercialOffers'
		},
		/**
		 * Define all pages for router
		 */
		pages: [
			{
				url: '/',
				title: 'Home',
				header: true,
				route: {
					templateUrl: 'app/views/pages/index.html'
				}
			},
			{
				url: '/cart',
				title: 'Cart',
				header: true,
				route: {
					templateUrl: 'app/views/pages/cart.html'
				}
			},
			{
				url: '/about',
				title: 'About',
				header: true,
				route: {
					templateUrl: 'app/views/pages/about.html'
				}
			},
			{
				url: '/cart/order',
				title: 'Order',
				route: {
					templateUrl: 'app/views/pages/order/order.html'
				}
			},
			{
				url: '/cart/confirm',
				title: 'Confirmation',
				route: {
					templateUrl: 'app/views/pages/order/confirmation.html'
				}
			}
		]
	})
	/**
	 * Config router
	 */
	.config(($routeProvider, config) => {
		config.pages
			.forEach(p => $routeProvider
				.when(p.url, p.route)
			);
	})
	/**
	 * End loading
	 */
	.run(() => {
		angular
			.element('body')
			.removeClass('loader');
	})
;