import { AppStatus } from './enum'




// 子应用基本信息
export interface IAppInfo {
  name: string
  entry: string
  container: string
  activeRule: string
}

// 子应用生命周期
export interface IInternalAppInfo extends IAppInfo {
  bootstrap?: LifeCycle
  mount?: LifeCycle
  unmount?: LifeCycle
  sandBox?: any
}

// 主应用生命周期
export interface ILifeCycle {
  beforeLoad?: LifeCycle | LifeCycle[]
  mounted?: LifeCycle | LifeCycle[]
  destoryed?: LifeCycle | LifeCycle[]
}

export type LifeCycle = (app?: IAppInfo) => Promise<any>

// 路径地址监听事件
export type EventType = 'hashchange' | 'popstate'
