// import actions from '../utils/qiankunAction';
import { onMounted } from 'vue';
import { initGlobalState } from 'qiankun';
import type { MicroAppStateActions } from 'qiankun';

export interface IGlobalState {
  [key: string]: unknown;
}

const initialState: IGlobalState = localStorage.getItem('globalState')
  ? JSON.parse(localStorage.getItem('globalState') as string)
  : {};
const actions: MicroAppStateActions = initGlobalState(initialState);

actions.onGlobalStateChange((state: IGlobalState, prevState: IGlobalState) => {
  // state: 变更后的状态; prevState: 变更前的状态
  console.log('主应用观察者：globalState 改变前的值为 ', prevState);
  console.log('主应用观察者：globalState 改变后的值为 ', state);
  localStorage.setItem('globalState', JSON.stringify(state));
});

export function useActions() {
  onMounted(() => {
    actions.onGlobalStateChange(
      (state: IGlobalState, prevState: IGlobalState) => {
        // state: 变更后的状态; prevState: 变更前的状态
        console.log('主应用观察者：globalState 改变前的值为 ', prevState);
        console.log('主应用观察者：globalState 改变后的值为 ', state);
        localStorage.setItem('globalState', JSON.stringify(state));
      }
    );
  });
  return {
    actions,
  };
}

export default actions;
