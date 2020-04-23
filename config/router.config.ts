export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // authority: ['user', 'admin'],
    routes: [
      { path: '/', component: './index', title: '首页' },
      { path: '/me', component: './me', title: '个人中心' },
      { component: '404' },
    ],
  },
];
