export default [
	{
		path: '/',
		component: () => import('views/commons/home' /* webpackChunkName: 'home' */)
	},
	{
		path: '/login',
		component: () => import('views/permisys/login' /* webpackChunkName: 'login' */),
		meta: { anonymous: true }
	},
	{
		path: '/recuperarsenha',
		component: () => import('views/permisys/recuperar-senha' /* webpackChunkName: 'recuperar-senha' */),
		meta: {	anonymous: true }
	},
	{
		path: '*',
		component: () => import('views/commons/page404' /* webpackChunkName: 'page404' */)
	}
];