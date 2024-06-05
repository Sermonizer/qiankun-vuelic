import { ref, Ref } from 'vue';
interface IRoute {
  path: string;
  name: string;
  component: string;
}

interface IMicroApp {
  name: string;
  Entry: string;
  activeRule: string;
  container?: string;
  props?: unknown;
}

export const microApps: Ref<IMicroApp[]> = ref<IMicroApp[]>([]);
export const routesConfig: Ref<IRoute[]> = ref<IRoute[]>([]);

export const setMicroApps = (apps: IMicroApp[]) => {
  microApps.value = apps;
};

export const setRoutesConfig = (routes: IRoute[]) => {
  routesConfig.value = routes;
};
