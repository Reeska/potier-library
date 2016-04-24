import angular from 'angular';
import library from './components/library';

import '../../css/library.scss';

export default angular
	.module('potier.library.library', [])
		.component('library', library)
	.name
;