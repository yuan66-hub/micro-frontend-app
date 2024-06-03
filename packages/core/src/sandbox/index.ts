import { ProxySandBox } from './proxySandBox';
import { findAppByName } from '../utils/index';
import { performScript } from './performScript';
import { IInternalAppInfo } from '../types/index';

// 检测是否漏掉了生命周期方法
export const lackOfLifecycle = (lifecycles: IInternalAppInfo) => !lifecycles ||
    !lifecycles.bootstrap ||
    !lifecycles.mount ||
    !lifecycles.unmount;

// 创建沙箱环境
export const sandbox = (script: string, appName: string) => {
    // 获取当前子应用
    const app = findAppByName(appName) as IInternalAppInfo;

    // 创建沙箱环境
    const global: any = new ProxySandBox();

    // 设置微前端环境
    (window as any).__MICRO_WEB__ = true;

    // 获取子应用生命周期 执行js 脚本
    const lifeCycles: IInternalAppInfo = performScript(script, appName, global.proxy);

    app.sandBox = global;
    // 检查子应用是否包含必须的方法
    const isLack = lackOfLifecycle(lifeCycles)
    if (isLack) {
        return;
    }

    app.bootstrap = lifeCycles.bootstrap;
    app.mount = lifeCycles.mount;
    app.unmount = lifeCycles.unmount;
}
