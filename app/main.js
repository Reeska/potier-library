import angular from 'angular';
import commonModule from './common/common.module';
import libraryModule from './library/library.module';
import cartModule from './cart/cart.module';
import catalogModule from './catalog/catalog.module';
import 'babel-polyfill'; 

/**
 * Init main app
 */
angular
	.module('potier.library', [commonModule, libraryModule, cartModule, catalogModule])
	.constant('config', {
		serviceDomain: 'http://henri-potier.xebia.fr',
		services : {
			books : 'books',
			offers : 'commercialOffers'
		}
	})
;