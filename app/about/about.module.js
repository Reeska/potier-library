import angular from 'angular';
import about from './components/about';

export default angular
	.module('potier.library.about', [])
		.component('about', about)
	.name
;