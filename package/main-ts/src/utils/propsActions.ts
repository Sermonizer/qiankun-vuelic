export interface IGlobalState {
  [key: string]: any;
}

// 定义 actions 接口
interface IActions {
  onGlobalStateChange: (
    callback: (state: IGlobalState, prev: IGlobalState) => void
  ) => void;
  setGlobalState: (state: IGlobalState) => void;
}

// 空操作函数
function emptyAction() {
  console.warn('Current execute action is empty!');
}

class Actions {
  private actions: IActions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
  };

  /**
   * 设置 actions
   */
  setActions(actions: IActions) {
    this.actions = actions;

    // 加载持久化的状态
    const savedState = localStorage.getItem('globalState');
    if (savedState) {
      const state: IGlobalState = JSON.parse(savedState);
      this.actions.setGlobalState(state);
    }
  }

  /**
   * 映射
   */
  onGlobalStateChange(
    callback: (state: IGlobalState, prev: IGlobalState) => void
  ) {
    this.actions.onGlobalStateChange(
      (state: IGlobalState, prev: IGlobalState) => {
        callback(state, prev);
        // 每次状态变化时持久化状态
        localStorage.setItem('globalState', JSON.stringify(state));
      }
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

const propsActions = new Actions();
export default propsActions;
