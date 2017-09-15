export default [
	{
		path: '/',
		component: () => import('views/commons/home')
	},
	{
		path: '/login',
		component: () => import('views/permisys/login')
	},
	{
		path: '*',
		component: () => import('views/commons/page404')
	}
];