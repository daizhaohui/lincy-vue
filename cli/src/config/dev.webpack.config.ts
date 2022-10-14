import ConfigUtil from './util';
import { WebpackConfigEntryName } from '../lib/consts';
const path = require('path');


export default function getDevWebPackConfig(options:any):any{
  const {rootPath,cliConfig} = options;
  const { cssRule,lessRule, plugins} = ConfigUtil.createDevCssLessConfig(options);
  const config:any =   {
    module:{
      rules:[
        cssRule,
        lessRule
      ]
    },
    devtool: "inline-source-map",
    devServer:{
      compress: true,
      contentBase: path.join(rootPath, 'dist'),
      open: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      index: 'index.html'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles:ConfigUtil.getOptimizationSplitChunksOfCss(WebpackConfigEntryName.app),
        },
      },
    },
    plugins
  }

  cliConfig.plugins.forEach((p:any)=>config.plugins.push(p));
  cliConfig.rules.forEach((r:any)=>config.module.rules.push(r));
  const names = ['compress','contentBase'];
  const devServer:any = cliConfig.devServer;
  let keys;
  if(devServer){
    keys = Object.keys(cliConfig.devServer);
    keys.forEach(k=>{
      if(!names.includes(k)){
        devServer[k] = cliConfig.devServer[k];
      }
    });
    config.devServer = devServer;
  }
  config.devServer.port =  config.devServer.port || 8000;
  return config;

}