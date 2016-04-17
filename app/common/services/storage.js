export default function storageService($window) {
	var self = this;

	self.stamp = 'potierLibrary';
	self.data = {};

	/*
	 * Initialize service : load data from localStorage
	 */
	init();

	/*
	 * On exit save data in localStorage
	 */
    $window.addEventListener('beforeunload', destroy);		

	function init() {
		if (localStorage[self.stamp]) {
			self.data = angular.fromJson(localStorage[self.stamp]);
		}
		console.log('data loaded from localStorage');
	};

	function destroy() {
		localStorage[self.stamp] = angular.toJson(self.data);
		console.log('data saved in localStorage');
	};

	return {
		get: function(name, value, override) {
            if (override || !self.data[name])
                self.data[name] = value;
                
            return self.data[name]
        }
	};
}