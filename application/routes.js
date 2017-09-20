export default [
	{
		path: '/',
		component: () => import('views/commons/home')
	},
	{
		path: '/login',
		component: () => import('views/permisys/login'),
		meta: {
			anonymous: true
		}
	},
	{
		path: '/recuperarsenha',
		component: () => import('views/permisys/recuperar-senha'),
		meta: {
			anonymous: true
		}
	},
	{
		path: '*',
		component: () => import('views/commons/page404')
	}
];