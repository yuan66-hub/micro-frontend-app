import { getAppList } from "../const/subApps";
import { IInternalAppInfo } from "../types/index";
export const currentApp = () => {
    // pathname 对应子应用列表activeRule内容
    const currentRouter = window.location.pathname;
    return filterApp('activeRule', currentRouter) as IInternalAppInfo

}
type IRes = IInternalAppInfo | boolean
export const filterApp = (key: string, value: string): IRes => {
    // 根据子应用列表的key值查找子应用
    const currentSubApp: IInternalAppInfo[] = getAppList().filter(item => item[key] === value)
    return currentSubApp.length ? currentSubApp[0] : false;
}

// 根据 name 查找子应用
export const findAppByName = (name: string) => {
    return filterApp('name', name);
};

// 获取页面资源
export const fetchUrl = (url: string): Promise<string> => fetch(url).then(async res => res.text())