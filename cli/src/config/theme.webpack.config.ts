import {Mode} from '../lib/consts';
import ConfigUtil from './util';
import path from 'path';
import { ThemeWebpackConfigEntryNameOfCustom } from '../lib/consts';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlPlugin = require('../plugins/html');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

export default function getThemeWebPackConfig(options:any):any{
  const {rootPath,themes,theme,mode,cliConfig,isTs} = options;
  let cssLesssConfig:any = {};
  if(mode===Mode.Dev){
    cssLesssConfig = ConfigUtil.createDevCssLessConfig(options);
  } else if(mode===Mode.Prod){
    cssLesssConfig = ConfigUtil.createProdCssLessConfig(options);
  }

  // 启动压缩算法
  const compressPlugin = ConfigUtil.createCompressConfig(options);
  let cleanAfterEveryBuildPatterns = ['**/*','!*.css'];
  if(compressPlugin && cliConfig.compress.deleteOriginalAssets){
    cleanAfterEveryBuildPatterns = ['**/*','!*.css.gz'];
  } else if(compressPlugin && cliConfig.compress.deleteOriginalAssets===false){
    cleanAfterEveryBuildPatterns = ['**/*','!*.css','!*.css.gz'];
  }

  const { lessRule,cssRule,plugins } = cssLesssConfig;
  const jsRule = ConfigUtil.createJSRule(options);
  const entry:any = {};
  entry[ThemeWebpackConfigEntryNameOfCustom(theme)] = path.join(rootPath,`/src/app.${isTs?'ts':'js'}`);
  const config:any =   {
    mode,
    entry,
    output:{
      path: path.resolve(rootPath,"dist/theme")
    },
    module:{
      rules:[
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
        },
        jsRule,
        ...(ConfigUtil.createFileRules(options)),
        cssRule,
        lessRule
      ]
    },
    plugins:[
      new WebpackBar({
        name: `皮肤:${theme}`,
        color: 'blue'
      }),
      new HtmlWebpackPlugin({
        filename: (entryName:string) => `${entryName}.html`,
        templateContent: `
          <html>
            <head>
              <title>theme</title>
            </head>
            <body>
              <div></div>
            </body>
          </html> `
      }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns:[],
        protectWebpackAssets: false,
        cleanAfterEveryBuildPatterns
      }),
      ...plugins,
    ],
    resolve: {
      extensions: [".vue",".js", ".ts",".jsx",".tsx",".json"],
      alias: ConfigUtil.createAlias(options)
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, '../node_modules'),'node_modules']
    },
  }

  config.optimization = {
    removeAvailableModules: true,
    splitChunks:{
      cacheGroups:{
        styles:ConfigUtil.getOptimizationSplitChunksOfCss(ThemeWebpackConfigEntryNameOfCustom(theme)),
      }
    },
    minimize: mode === Mode.Prod,
    minimizer: mode === Mode.Prod ?[
      new CssMinimizerPlugin()
    ]:[],
  };

  const rsRule = ConfigUtil.createTSRule(options);
  if(isTs){
    config.module.rules.push(rsRule);
  }
  config.plugins.push(new HtmlPlugin({
    cliConfig,
    themes,
    mode,
    theme,
    name: 'createTheme', // 创建theme
    path:rootPath,
    defaultTheme:cliConfig.theme && cliConfig.theme.default || ''
  }));

  if(compressPlugin){
    config.plugins.push(compressPlugin);
  }
  return  config;
}