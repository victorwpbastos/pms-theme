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

	// esconde a scrollbar nas transições de views
	router.beforeEach((to, from, next) => {
		document.body.style.overflowY = 'hidden';

		next();
	});

	router.afterEach((to, from, next) => {
		setTimeout(() => {
			document.body.style.overflowY = 'auto';
		}, 300);

		next();
	});

	// registra os components de form
	registerFormComponents('v');
}