import { createApp } from 'vue';
import router from '../router';
import useActions from '@/utils/useActions';
import type { Component } from 'vue';

interface IGlobalState {
  [key: string]: any;
}

interface IProps {
  container?: HTMLElement;
  actions?: {
    onGlobalStateChange: (
      callback: (state: IGlobalState) => void,
      fireImmediately?: boolean,
    ) => void;
    setGlobalState: (state: IGlobalState) => void;
  };
}

let isQiankun = false;
export function render(instance: any, Root: Component, props: IProps = {}) {
  if (!isQiankun) {
    router.beforeEach((to, from, next) => {
      next();
    });
  }
  isQiankun = true;
  const { container, actions } = props;
  if (actions) {
    console.log('actions', actions, useActions);
    // 注入 actions 实例
    useActions.setActions(actions);
  }
  instance = createApp(Root);
  instance
    .use(router)
    .mount(container ? container.querySelector('#app') : '#app');
}
