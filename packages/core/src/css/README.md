#  css 样式隔离方案

1. css Module --- 打包自动处理css文件作用域进行隔离
2. shadow dom -- 通过js创建ShadowRoot加入自定义元素/组件（包含css样式等）
3. Minicss --- 打包单独的css文件通过link标签引入
4. css-in-js --- 通过引入js文件创建元素css样式