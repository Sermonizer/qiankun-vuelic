import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import LoginPage from '@/components/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/main',
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/main',
    component: HelloWorld,
  },
  {
    path: '/sub2/:pathMatch(.*)*',
    name: 'sub2App',
    component: () => import('@/components/EmptyComp.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
