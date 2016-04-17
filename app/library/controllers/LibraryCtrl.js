angular
	.module('main')

	/**
	 * Main controller
	 */
	.controller('LibraryCtrl', function($scope) {
		var self = this;
		
		self.$onInit = function() {
		    /*
		     * End loading
		     */
		    var $body = angular.element('body');
		    $body.removeClass('loader');			
		};
	})
;