import { setMainLifecycle } from "./const/mainLifecycles"
import { getAppList, setAppList } from "./const/subApps"
import { rewriteRouter } from "./router/index"
import { currentApp } from "./utils/index"
import { prefetch } from './loader/prefetch'
import { IAppInfo, IInternalAppInfo, ILifeCycle } from "./types/index"


rewriteRouter()
export const registerMicroApps = (appList: IAppInfo[], mainLifecycle: ILifeCycle) => {
    // 保存子应用列表
    setAppList(appList)
    // 保存主应用的生命周期
    setMainLifecycle(mainLifecycle)
}
// 启动微前端框架
export const start = async () => {
    const appList: IAppInfo[] = getAppList()
    if (!appList.length) {
        throw Error('子应用列表为空，请查看是否正确注册')
    }
    // 获取当前路由子应用
    const app: IInternalAppInfo = currentApp()

    if (app) {
        const { pathname, hash } = window.location
        const url = pathname + hash

        window.history.pushState(url, app.name, url || app.activeRule)
    }
    // 避免多次触发路由
    (window as any).__CURRENT_SUB_APP__ = app.activeRule;

    // 预加载
    await prefetch();

}