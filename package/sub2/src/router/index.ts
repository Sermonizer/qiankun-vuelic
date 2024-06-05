import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import TomCop from '../components/TomCop.vue';
import BillCop from '../components/BillCop.vue';
import AlexCop from '../components/AlexCop.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HelloWorld,
  },
  {
    path: '/sub2/tom',
    name: 'tom',
    component: TomCop,
  },
  {
    path: '/sub2/bill',
    name: 'bill',
    component: BillCop,
  },
  {
    path: '/sub2/alex',
    name: 'alex',
    component: AlexCop,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes,
});

export default router;
