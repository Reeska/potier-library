/**
 * Init main app
 */
angular
	.module('main', [])
	.constant('config', {
		serviceDomain: 'http://henri-potier.xebia.fr',
		services : {
			books : 'books',
			offers : 'commercialOffers'
		}
	})
;