import { initGlobalState } from 'qiankun';
import type { MicroAppStateActions } from 'qiankun';

export interface IGlobalState {
  [key: string]: unknown;
}

const initialState: IGlobalState = {};
const actions: MicroAppStateActions = initGlobalState(initialState);

export default actions;
