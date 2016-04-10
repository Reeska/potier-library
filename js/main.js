var app = angular.module('main', []);

app

.constant('config', {
	serviceDomain: 'http://henri-potier.xebia.fr',
	services : {
		books : 'books',
		offers : 'commercialOffers'
	}
})

/**
 * Main controller
 */
.controller('libraryCtrl', function($scope) {
    /*
     * End loading
     */
    var $body = angular.element('body');
    $body.removeClass('loader');
})

;