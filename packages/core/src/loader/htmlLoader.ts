
import { sandbox } from '../sandbox/index';
import { IAppInfo, IInternalAppInfo } from '../types/index';
import { findAppByName, fetchUrl } from '../utils/index';
import LRUCache from '../utils/cache';

interface ILRUCache<K, V> {
  get: (key: K) => V | number
  put: (key: K, value: V) => void
}
// 缓存子应用
const cache: ILRUCache<string, any[]> = new LRUCache(10);

// 解析html
export const parseHtml = async (url: string, appName: string): Promise<any[]> => {
  if (cache.get(appName) !== -1) {
    return cache.get(appName) as any[];
  }
  const div: Element = document.createElement('div');
  let scriptsArray: string[] = [];

  div.innerHTML = await fetchUrl(url);
  const [scriptUrls, scripts, elements] = getResources(div, findAppByName(appName) as IAppInfo);
  const fetchedScript: string[] = await Promise.all(scriptUrls.map(url => fetchUrl(url)));
  scriptsArray = scripts.concat(fetchedScript);

  cache.put(appName, [elements, scriptsArray])

  return [elements, scriptsArray];
}

// 解析 js 内容
export const getResources = (root: Element, app: IAppInfo): any[] => {
  const scriptUrls: string[] = [];
  const scripts: string[] = [];

  function deepParse(element: Element) {
    const children = element.children;

    // 处理位于 script 标签中的 js 文件
    if (element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src');
      if (!src) {
        // 直接在 script 标签中书写的内容
        let script = element.outerHTML;
        scripts.push(script);
      } else {
        // 引入外链
        if (src.startsWith('http')) {
          scriptUrls.push(src);
        } else {
          // fetch 时 添加 publicPath
          scriptUrls.push(`http:${app.entry}/${src}`);
        }
      }
    }
    // 处理位于 link 标签中的 js 文件
    if (element.nodeName.toLowerCase() === 'link') {
      const href: string | null = element.getAttribute('href');
      if (href && href.endsWith('.js')) {
        if (href.startsWith('http')) {
          scriptUrls.push(href);
        } else {
          // fetch 时 添加 publicPath
          scriptUrls.push(`http:${app.entry}/${href}`);
        }
      }
    }
    for (let i = 0; i < children.length; i++) {
      deepParse(children[i]);
    }
  }
  deepParse(root);

  return [scriptUrls, scripts, root.outerHTML];
}

// 加载和渲染html
export const htmlLoader = async (app: IInternalAppInfo): Promise<void> => {
  const {
    container: cantainerName, entry, name
  } = app

  let [dom, scriptsArray] = await parseHtml(entry, name);

  let container = document.querySelector(cantainerName);
  if (!container) {
    throw Error(` ${name} 的容器不存在，请查看是否正确指定`);
  }
  container.innerHTML = dom;
  scriptsArray.map((item) => {
    sandbox(item, name);
  });
}