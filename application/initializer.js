import Vue from 'vue';
import registerFormComponents from 'components/form/register';

export default function(router) {
	// cria uma fake store
	Vue.prototype.$store = new Vue({
		data: {
			config: window.Config,
			usuario: null
		}
	});

	// registra os components de form
	registerFormComponents('v');
}