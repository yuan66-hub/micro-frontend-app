import { parseHtml } from './htmlLoader';
import { getAppList } from '../const/subApps';

export const prefetch = async () => {
  // 获取其余子应用
  const appPieces = getAppList().filter(item => !window.location.pathname.startsWith(item.activeRule));

  // 加载所有子应用
  await Promise.all(appPieces.map(async app => await parseHtml(app.entry, app.name)))
};
