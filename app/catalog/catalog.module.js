import angular from 'angular';
import bookitem from './components/bookitem';
import catalog from './components/catalog';
import catalogService from './services/catalog';

require('../../css/catalog.scss');

export default angular
	.module('potier.library.catalog', [])
		.service('catalogService', catalogService)
		.component('bookItem', bookitem)
		.component('catalog', catalog)
	.name
;