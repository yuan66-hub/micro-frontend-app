import type { IProxySandBox } from './proxySandBox'
import { IInternalAppInfo } from '../types/index';
// 执行应用的 js 内容 new Function 篇
export const performScript = (script: string, appName: string, global: IProxySandBox): IInternalAppInfo => {

  const scriptText =
    `try {
       ${script}
       return window['${appName}']
      } catch (err) {
          console.error('runScript error:' + err);
      }`;
  const performer = new Function(scriptText);

  return performer.call(global, global);
}

// 执行应用中的 js 内容 eval篇
export const performScriptForEval = (script, appName, global: IProxySandBox) => {
  const scriptText = `
    (() => () => {
      try {
        ${script}
        return window['${appName}']
      } catch (err) {
        console.error('runScript error:' + err);
      }
    })()
  `
  return (() => eval(scriptText))().call(global, global)
}
