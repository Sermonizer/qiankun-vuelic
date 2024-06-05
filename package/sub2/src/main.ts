import Home from './App.vue';
import './public-path';
import { render } from '@/utils/useRender';

let instance: any = null;

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  // render();
  render(instance, Home);
}

export async function bootstrap() {
  console.log('Sub2 bootstraped');
}

export async function mount(props: any) {
  console.log('Sub2 mount', props);
  render(instance, Home, props);
}

export async function unmount() {
  console.log('Sub2 unmount', instance);
  if (instance) {
    instance.unmount();
    if (instance._container) {
      instance._container.innerHTML = '';
    }
    instance = null;
  }
}
