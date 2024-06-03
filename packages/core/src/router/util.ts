
// 查看当前路由是否有变化
export const isTurnChild = () => {
  const { pathname, hash } = window.location
  const url = pathname + hash

  // 当前路有无改变。
  const currentPrefix = url.match(/(\/\w+)/g)

  if (
    currentPrefix &&
    (currentPrefix[0] === (window as any).__CURRENT_SUB_APP__) &&
    hash === (window as any).__CURRENT_HASH__
  ) {
    return false;
  }

  (window as any).__ORIGIN_APP__ = (window as any).__CURRENT_SUB_APP__;

  const currentSubApp = window.location.pathname.match(/(\/\w+)/)

  if (!currentSubApp) {
    return false
  }
  // 当前路由以改变，修改当前路由
  (window as any).__CURRENT_SUB_APP__ = currentSubApp[0];

  // 判断当前hash值是否改变
  (window as any).__CURRENT_HASH__ = hash

  return true;
};
// 打补丁
export const patchRouter = (globalEvent: Window['history']['pushState'] | Window['history']['replaceState'], eventName: string) => {
  return function (...args) {
    const e = new Event(eventName)
    //  绑定自定义事件名上下文
    globalEvent.apply(this, args)
    // 触发事件
    window.dispatchEvent(e)
  }
}