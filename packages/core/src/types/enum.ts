// 子应用挂载状态
export enum AppStatus {
  NOT_LOADED = 'NOT_LOADED', //没有加载
  LOADING = 'LOADING', //加载中
  LOADED = 'LOADED', //加载完成
  BOOTSTRAPPING = 'BOOTSTRAPPING',  //安装中
  NOT_MOUNTED = 'NOT_MOUNTED', //没有挂载
  MOUNTING = 'MOUNTING', //挂载中...
  MOUNTED = 'MOUNTED', //挂载完成
  UNMOUNTING = 'UNMOUNTING', //卸载中...
}
