import angular from 'angular';
import storageService from './services/storage'
import header from './components/header';

export default angular
	.module('potier.library.common', [])
		.service('storageService', storageService)
		.component('headerInner', header)
	.name
;