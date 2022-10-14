import ConfigUtil from "./util";
import { Mode, WebpackConfigEntryName }  from '../lib/consts';
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require('../plugins/html');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackBar = require('webpackbar');

export default function getCommonWebpackConfig(options:any):any{
  // isThemeBuilding 是否是在构建theme
  const {rootPath,isTs,report,themes,mode,cliConfig} = options;
  const entry:any = {
    [WebpackConfigEntryName.app]: path.join(rootPath,`/src/app.${isTs?'ts':'js'}`),
  };

  const copyPluginOptions = {
    patterns: [
      // {
      //   from: path.join(rootPath,"src/assets/images"),
      //   to: path.join(rootPath,"/dist/images"),
      //   toType: "dir",
      //   noErrorOnMissing:true
      // },
      {
        from: path.join(rootPath,"src/assets/js"),
        to: path.join(rootPath,"/dist/js"),
        toType: "dir",
        noErrorOnMissing:true
      },
      {
        from: path.join(rootPath,"src/assets/css"),
        to: path.join(rootPath,"/dist/css"),
        toType: "dir",
        noErrorOnMissing:true
      },
      {
        from: path.join(rootPath,"src/assets/fonts"),
        to: path.join(rootPath,"/dist/fonts"),
        toType: "dir",
        noErrorOnMissing:true
      }
    ],
  };

  // 皮肤创建
  if(cliConfig.theme && cliConfig.theme.enabled===true && themes){
    copyPluginOptions.patterns.push({
      from: path.join(rootPath, "/dist/theme"),
      to: path.join(rootPath, "/dist/theme"),
      toType: "dir",
      noErrorOnMissing: true
    });
  }

  const config = {
    mode: 'development',
    entry,
    output:{
      filename:mode === Mode.Dev ? '[name].js' : '[name].[chunkhash:8].js',
      path:path.resolve(rootPath,"dist")
    },
    module: {
        rules: [  // 添加解析规则
          {
            test: /\.vue$/,
            use: [
              {
                loader: 'vue-loader'
              }
            ]
          },
          ...(ConfigUtil.createFileRules(options))
        ]
    },
    plugins: [
    new WebpackBar(),
    new CopyWebpackPlugin(copyPluginOptions),
    new VueLoaderPlugin(),
    new ESLintPlugin({
      fix: true,
      // lintDirtyModulesOnly:true,
      extensions: ['js', 'jsx'],
      exclude: '/node_modules/'
    }),
    ],
    stats:'normal',
    resolve: {   // 需要打包的文件后缀
      extensions: [".vue",".js", ".ts",".jsx",".tsx",".json"],
      alias: ConfigUtil.createAlias(options)
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, '../node_modules'),'node_modules']
    },
  }

  const rsRule = ConfigUtil.createTSRule(options);
  const jsRule = ConfigUtil.createJSRule(options);
  config.module.rules.push(jsRule);
  if(report){
    // 127.0.0.1:8888 打开报告地址
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  if(isTs){
    config.module.rules.push(rsRule);
  }
  config.plugins.push(new HtmlPlugin({
    cliConfig,
    themes:themes && cliConfig.theme.enabled===true ? Object.keys(themes) : null,
    mode,
    path:rootPath,
    name: 'afterCreateTheme', // 创建theme后
    defaultTheme:cliConfig.theme && cliConfig.theme.enabled===true ? cliConfig.theme.default : null,
  }));
  // config.plugins.push( new webpack.ContextReplacementPlugin(
  //   /moment[/\\]locale$/,
  //   /zh-cn/,
  // ));
  config.plugins.push(new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }));
  return config;
}