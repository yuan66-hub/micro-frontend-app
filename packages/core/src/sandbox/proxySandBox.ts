

export const isFunction = (value: any) => typeof value === 'function';

export type IProxySandBox = typeof ProxySandBox; // MyClass类名类型


// 代理沙箱
export class ProxySandBox {
  public proxy: Window
  constructor() {
    this.proxy = window;
    this.active();
  }
  public active() {
    const proxy: Window = window;
    // 获取window 所有属性创建一个新的假window对象
    const draftValue: Window = Object.create(Object.getPrototypeOf(proxy))

    this.proxy = new Proxy(proxy, {
      get(target, propKey) {
        // 函数做特殊处理
        if (isFunction(draftValue[propKey])) {
          return draftValue[propKey].bind(proxy)
        }
        if (isFunction(target[propKey])) {
          return target[propKey].bind(proxy)
        }

        return draftValue[propKey] || target[propKey]
      },
      set(target, propKey, value) {
        draftValue[propKey] = value
        return true
      }
    })
  }
  inactive() {
    console.log('关闭沙箱');
  }
}
