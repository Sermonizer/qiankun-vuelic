import { createApp, watch } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import { registerMicroApps, start } from 'qiankun';
import HelloWorld from '@/components/HelloWorld.vue';
// import { initGlobalState } from 'qiankun';
// import type { MicroAppStateActions } from 'qiankun';
import actions from '@/hooks/useActions';

import {
  microApps,
  routesConfig,
  setMicroApps,
  setRoutesConfig,
} from '@/hooks/useConfig';

interface IRoute {
  path: string;
  name: string;
  component: string;
}

const getMicroAppConfig: () => void = async () => {
  const res = await axios.get('http://localhost:3000/api/microapps');
  setMicroApps(res.data);
};

const getRoutesConfig: () => void = async () => {
  const res = await axios.get('http://localhost:3000/api/routes');
  setRoutesConfig(res.data);
};

const generateRoutes = (routesConfig: IRoute[]) => {
  return routesConfig.map((route) => ({
    path: route.path,
    name: route.name,
    component: () => import(`@/components/${route.component}.vue`),
  }));
};

const initializeApp = async () => {
  console.log('initializeApp');

  await getRoutesConfig();
  await getMicroAppConfig();

  const originRoutes = [
    {
      path: '/mainApp',
      name: 'home',
      component: HelloWorld,
    },
    {
      path: '/mainApp/login',
      name: 'login',
      component: () => import('./components/LoginPage.vue'),
    },
    {
      path: '/mainApp/edit',
      name: 'edit',
      component: () => import('./components/EditConfig.vue'),
    },
  ];

  const routes = [...generateRoutes(routesConfig.value), ...originRoutes];

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  const apps = microApps.value.map((app) => ({
    ...app,
    container: '#container',
    props: { actions },
  }));

  registerMicroApps(apps);

  start();

  createApp(App).use(router).use(Antd).mount('#main-app');

  watch([microApps, routesConfig], () => {
    const newRoutes = [...generateRoutes(routesConfig.value), ...originRoutes];
    newRoutes.forEach((route) => {
      router.addRoute(route);
    });
    // 取消注册所有微应用

    const newApps = microApps.value.map((app) => ({
      ...app,
      container: '#container',
      props: { actions },
    }));

    registerMicroApps(newApps);
    start();
  });
};

initializeApp();
