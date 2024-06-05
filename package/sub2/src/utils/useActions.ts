function emptyAction() {
  // 警告：提示当前使用的是空 Action
  console.warn('Current execute action is empty!');
}

// 定义 actions 接口
interface IActions {
  onGlobalStateChange: (...args: any[]) => void;
  setGlobalState: (...args: any[]) => void;
}

export interface IGlobalState {
  [key: string]: unknown;
}

class Actions {
  // 默认值为空 Action
  private actions: IActions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
  };

  /**
   * 设置 actions
   */
  setActions(actions: IActions) {
    this.actions = actions;
  }

  /**
   * 映射
   */
  onGlobalStateChange(
    callback: (state: IGlobalState, prev: IGlobalState) => void,
    fireImmediately?: boolean,
  ) {
    this.actions.onGlobalStateChange(
      (state: IGlobalState, prev: IGlobalState) => {
        callback(state, prev);
        // 每次状态变化时持久化状态
        localStorage.setItem('globalState', JSON.stringify(state));
      },
      fireImmediately,
    );
  }

  /**
   * 映射
   */
  setGlobalState(state: IGlobalState) {
    this.actions.setGlobalState(state);
    // 设置状态时持久化状态
    localStorage.setItem('globalState', JSON.stringify(state));
  }
}

const actions = new Actions();
export default actions;
