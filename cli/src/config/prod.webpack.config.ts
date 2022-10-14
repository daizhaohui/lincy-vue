const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const  HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
import { WebpackConfigEntryName } from '../lib/consts';
import ConfigUtil from './util';

export default function getProdWebpackConfig(options:any):any{

const { cliConfig } = options;
const { cssRule,lessRule, plugins} = ConfigUtil.createProdCssLessConfig(options);
const config =  {
    mode: 'production',
    optimization: {
      runtimeChunk: {
        name: '_runtime_',
      },
      removeAvailableModules: true,
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin(
          {
            terserOptions:{
              compress: {
                drop_console: true, // 移除所有console相关代码；
                drop_debugger: true,// 移除自动断点功能；
                pure_funcs: ["console.log", "console.error", "console.warn", "console.assert"],// 配置移除指定的指令，如console.log,assert等
              },
              format: {
                comments: false,
              },
            },
            extractComments: false,
          }
        ),
        new CssMinimizerPlugin(),
        new HtmlMinimizerPlugin()
      ],
      splitChunks: {
        cacheGroups: {
          styles:ConfigUtil.getOptimizationSplitChunksOfCss(WebpackConfigEntryName.app),
          vue3:{
            name:"_vue3_",
            test: /[\\/]node_modules[\\/](vue|@vue\/*|core-js|core-js-pure|@intlify[\\/]*)[\\/]/,
            chunks: 'all'
          },
          vendors: {
            name:"_vendors_",
            test: /[\\/]node_modules[\\/](vue-router|vue-i18n|vuex|vuex-persistedstate|axios|intersection-observer|dayjs|js-md5)[\\/]/,
            chunks: 'all'
          },
          framework:{
            name: "_framework_",
            test: /[\\/]node_modules[\\/](@lincy-vue\/core|@lincy-js[\\/]utils)[\\/]/,
            chunks: 'all'
          }
        },
      },
    },
    plugins,
    module:{
      rules: [
        cssRule,
        lessRule,
      ]
    }
  };

  cliConfig.plugins.forEach((p:any)=>config.plugins.push(p));
  cliConfig.rules.forEach((r:any)=>config.module.rules.push(r));

  const defaultSplitChunks = ["vue3","vendors","framework"];
  if(cliConfig.splitChunks && Object.keys(cliConfig.splitChunks).length){
    const cacheGroups:any = config.optimization.splitChunks.cacheGroups;
    let regexp;
    let chunks;
    Object.keys(cliConfig.splitChunks).forEach(key=>{
      chunks = cliConfig.splitChunks[key];
      if(!defaultSplitChunks.includes(key) && chunks.length){
        chunks = chunks.map((c:string)=>c.replace('/','[\\/]'));
        regexp = new RegExp(`[\\/]node_modules[\\/](${chunks.join('|')})[\\/]`);
        cacheGroups[key] = {
          name: `_${key}_`,
          test: regexp,
          chunks: 'all'
        };
      }
    });
  }
  // 启动压缩算法
  const compressPlugin = ConfigUtil.createCompressConfig(options);
  if(compressPlugin){
    config.plugins.push(compressPlugin);
  }
  return config;
}