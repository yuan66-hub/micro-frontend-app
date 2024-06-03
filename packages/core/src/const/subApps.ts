import { IAppInfo } from '../types/index'

// 子应用注册列表
let appList: IAppInfo[] = []

export const setAppList = (list: IAppInfo[]) => {
    appList = list
}

export const getAppList = (): IAppInfo[] => appList
