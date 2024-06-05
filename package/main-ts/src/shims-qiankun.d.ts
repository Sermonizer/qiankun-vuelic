/* eslint-disable */
declare module 'qiankun' {
  export function registerMicroApps(apps: any[], lifeCycles?: any): void;
  export function start(opts?: any): void;
  export function initGlobalState(state: Record<string, any> = {}): MicroAppStateActions;
  export type MicroAppStateActions = {
    onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void;
    setGlobalState: (state: Record<string, any>) => boolean;
    offGlobalStateChange: () => boolean;
  };
  // 根据 qiankun 的 API 添加更多类型声明
}
