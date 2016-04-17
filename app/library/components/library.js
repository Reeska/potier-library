export default {
	templateUrl: 'app/views/library.html',
	controllerAs: 'library',
	bindings : {
	},
	controller : library
}
;

function library($scope) {
	var self = this;
	
	self.$onInit = function() {
	    /*
	     * End loading
	     */
	    var $body = angular.element('body');
	    $body.removeClass('loader');			
	};
}