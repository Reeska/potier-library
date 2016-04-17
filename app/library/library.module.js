import angular from 'angular';
import library from './components/library';

export default angular
	.module('potier.library.library', [])
		.component('library', library)
	.name
;