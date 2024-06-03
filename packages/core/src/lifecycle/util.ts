
import { IInternalAppInfo } from '../types/index';
import { filterApp } from '../utils/index'
// 根据路由查找子应用
export const findAppByRoute = (router: string) => {
    return filterApp('activeRule', router) as IInternalAppInfo;
};


