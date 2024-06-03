// 发布订阅---全局状态管理
export const creatStore = (initData = {}) => (() => {
  let store: any = initData;
  let observers: any[] = [];
  const getStore = () => {
    return store;
  }
  // 异步更新
  const updateStore = (newValue) => new Promise((reslove) => {
    if (newValue !== store) {
      let oldValue = store;
      store = newValue;
      reslove(store);

      observers.forEach((fn: any) => fn(newValue, oldValue));
    }
  })

  const subscribeStore = (fn: any) => {
    observers.push(fn);
  }
  return { getStore, updateStore, subscribeStore }
})()


