import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import strip from "@rollup/plugin-strip";
import pkg from './package.json' assert { type: 'json' };
import path from 'path';
import externals from 'rollup-plugin-node-externals'

export default {
  input: 'src/index.ts', // 打包入口
  output: [{ // 打包出口
    name: pkg.name,
    exports: "named",
    types: true, // 指定生成类型声明文件
    dir: path.dirname(pkg.module),
    preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
    preserveModules: true, // 保留模块结构
    format: 'esm',
  }],
  plugins: [ // 打包插件
    externals({
      devDeps: false
    }),
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript({
      tsconfig: './tsconfig.json', // 指定tsconfig.json文件路径
    }), // 解析TypeScript
    // 清楚调试代码
    strip()
  ]
};