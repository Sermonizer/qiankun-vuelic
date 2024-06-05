import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'sub1',
    component: HelloWorld,
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

export default router;
