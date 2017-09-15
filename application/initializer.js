import Vue from 'vue';
import 'helpers/fetch';

export default function() {

	// injeta propriedades globais no objeto Vue
	Vue.prototype.Config = window.Config;
}