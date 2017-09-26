import Vue from 'vue';
import $ from 'jquery';
// import PermisysModel from 'models/permisys';

export default function(router) {
	// cria uma fake store
	Vue.prototype.$store = new Vue({
		data: {
			config: window.Config,
			usuario: { nome: 'Chunda Lover' }
		}
	});

	// redireciona para o login quando a sessão cair
	$(document).ajaxError((e, xhr, req) => {
		if (xhr.status === 401 && req.url !== 'api/permisys') {
			Vue.prototype.$store.usuario = null;
			router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } });
		}
	});

	// verifica e protege as rotas
	// router.beforeEach(async (to, from, next) => {
	// 	if (Vue.prototype.$store.usuario) {
	// 		if (to.meta.anonymous) {
	// 			next(false);
	// 		} else {
	// 			next();
	// 		}
	// 	} else {
	// 		try {
	// 			Vue.prototype.$store.usuario = await PermisysModel.find();

	// 			if (to.meta.anonymous) {
	// 				next(false);
	// 			} else {
	// 				next();
	// 			}
	// 		} catch (error) {
	// 			Vue.prototype.$store.usuario = null;

	// 			if (to.meta.anonymous) {
	// 				next();
	// 			} else {
	// 				next({
	// 					path: '/login',
	// 					query: {
	// 						redirect: to.fullPath
	// 					}
	// 				});
	// 			}
	// 		}
	// 	}
	// });
}