import angular from 'angular';

export default function storageService($window) {
	var self = this;

	self.stamp = 'potierLibrary';
	self.data = {};

	/*
	 * Initialize service : load data from localStorage
	 */
	load();

	/*
	 * On exit save data in localStorage
	 */
    $window.addEventListener('beforeunload', save);

	/**
	 * Load data from localStorage.
	 */
	function load() {
		if (localStorage[self.stamp]) {
			self.data = angular.fromJson(localStorage[self.stamp]);
		}
	}

	/**
	 * Save data to localStorage.
	 */
	function save() {
		localStorage[self.stamp] = angular.toJson(self.data);
	}

	return {
		get: (name, value, override) => {
            if (override || !self.data[name])
                self.data[name] = value;
                
            return self.data[name]
        }
	};
}