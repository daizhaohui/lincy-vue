import { IBuildContext } from "../typedefines";
import fs from 'fs';
import path from 'path';
import {Language} from '../consts';
const Plugins = ['http','router','app','component','track'];
const webpack = require('webpack');
const GlobalPrefix = 'window.__lincy_vue_plugins__';
export default class PluginUtil{

  static updateWebpackConfig(context:IBuildContext){
    const providePluginOptions = PluginUtil.createProvidPluginConfig(context);
    context.webpackConfig.plugins.push(
      new webpack.ProvidePlugin(providePluginOptions)
    );
  }

  static createProvidPluginConfig(context:IBuildContext){
    const entryFiles:any = {};
    let files;
    let name;
    let prefix: string;
    files = fs.readdirSync(path.join(context.path,'/src/plugins'));
    files.forEach((f:any)=>{
      name = path.basename(f).split('.')[0];
      prefix = path.basename(f).split('.')[1];
      if(Plugins.includes(name)){
        if(prefix===Language.TypeScript||prefix===Language.Javascript){
          entryFiles[name] = f;
        }
      }
    })
    const ret:any = {};
    Object.keys(entryFiles).forEach(k=>{
      ret[GlobalPrefix+k] = path.join(context.path,'/src/plugins',entryFiles[k]);
    });
    return ret;
  }

}