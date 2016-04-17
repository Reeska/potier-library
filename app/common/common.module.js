import angular from 'angular';
import storageService from './services/storage'

export default angular
	.module('potier.library.common', [])
		.service('storageService', storageService)
	.name
;