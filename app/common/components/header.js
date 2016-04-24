export default {
	templateUrl: 'app/views/components/header.html',
	controllerAs: 'header',
	controller: Header
};

function Header($location, config) {
	var self = this;

	/*
	 * API
	 */
	self.isCurrent = isCurrent;
	self.pages = pages;

	/*
	 * Implementation
	 */

	/**
	 * Checks if page in param is the current.
	 *
	 * @param page
	 * @returns boolean
	 */
	function isCurrent(page) {
		let path = $location.path();
		return path == page.url ||
			(page.url != '/' && path.match('^' + page.url));
	}

	/**
	 * Get pages to display in the header.
	 * 
	 * @returns Array
	 */
	function pages() {
		return config.pages.filter(p => p.header);
	}
}