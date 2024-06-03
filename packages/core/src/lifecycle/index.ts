import { findAppByRoute } from "./util";
import { getMainLifecycle } from "../const/mainLifecycles";
import { htmlLoader } from "../loader/htmlLoader";
import { IInternalAppInfo, ILifeCycle, LifeCycle } from "../types/index";

type ILifecycleKeys = keyof ILifeCycle

// 改变了路由，重新装载新的子应用
export const lifecycle = async () => {
  const prevApp: IInternalAppInfo = findAppByRoute((window as any).__ORIGIN_APP__); // 获取上一个子应用
  const nextApp: IInternalAppInfo = findAppByRoute((window as any).__CURRENT_SUB_APP__); // 获取跳转后的子应用

  if (!nextApp) {
    return
  }

  if (prevApp) {
    // 卸载上一个应用
    await unmount(prevApp);
  }

  // 还原 prevApp 快照。
  // prevApp.sandBox.active()

  await boostrap(nextApp);

  await mount(nextApp);
}

// 装载应用
export const boostrap = async (app: IInternalAppInfo) => {
  await runMainLifeCycle('beforeLoad', app)
  // 获取子应用的dom结构
  await htmlLoader(app);
  app && app.bootstrap && await app.bootstrap();
}

// 渲染应用
export const mount = async (app: IInternalAppInfo) => {
  app && app.mount && await app.mount(app);

  await runMainLifeCycle('mounted', app)
}

// 卸载
export const unmount = async (app: IInternalAppInfo) => {
  app && app.unmount && await app.unmount(app);

  await runMainLifeCycle('destoryed', app)
}

/**
 * 根据生命周期类型执行主应用对应生命周期
 * @param {*} type 
 * @param {*} app  子应用实例
 */
export const runMainLifeCycle = async (type: ILifecycleKeys, app: IInternalAppInfo) => {
  const mainLife: ILifeCycle = getMainLifecycle();

  // 因为主应用里配置的生命周期是一个数组，所以需要执行数组中的所有内容
  await Promise.all((mainLife[type] as LifeCycle[]).map(item => item(app)))
}

