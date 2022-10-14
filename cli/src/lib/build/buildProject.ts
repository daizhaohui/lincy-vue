import { IBuildContext } from "../typedefines";
import PluginUtil from './plugin';
import LocalesUtil from './locales';
import MockUtil from './mock';
import {Mode} from '../consts';
import {log,error} from '../utils/logger';
import HtmlUtil from './html';
import BuildUtil from './util';
import path from 'path';
const chalk = require('chalk');
const webpack =  require('webpack');
const WebpackDevServer = require('webpack-dev-server');
export default class BuildProject{

  #context:IBuildContext;
  #htmlUtil:HtmlUtil = null;

  constructor(context:IBuildContext){
    this.#context = context;
    this.#htmlUtil = new HtmlUtil(context);
  }


  createDefinePlugin(){
    const defines = this.#context.cliConfig.defines;
    const options:any = {};
    options.__VUE_PROD_DEVTOOLS__ = JSON.stringify(this.#context.inputOptions.mode === Mode.Dev);
    if(defines && Object.keys(defines).length){
      Object.keys(defines).forEach((key:string)=>{
        options[key] = defines[key];
      });
    }
    // 固定的
    const fixed:any = {
      "__DEV__":JSON.stringify(this.#context.inputOptions.mode === Mode.Dev),
      "__TEST__":JSON.stringify(this.#context.inputOptions.mode === Mode.Dev),
      "__VERSION__":`'${this.#context.packageConfig.version}'`,
      "__VUE_OPTIONS_API__":  JSON.stringify(true)
    };
    Object.keys(fixed).forEach((key:string)=>{
      options[key] = fixed[key];
    });

    this.#context.webpackConfig.plugins.push(new webpack.DefinePlugin(options));
  }

  // 创建最终的webpaconfig
  createWebpackConfig(){
    // 构建应用插件(动态性)
    PluginUtil.updateWebpackConfig(this.#context);
    this.createDefinePlugin();
    this.#htmlUtil.createHtmlPlugin();
  }

  runDev(){
    const compiler = webpack(this.#context.webpackConfig);
    const options = this.#context.webpackConfig.devServer;
    const devServer = new WebpackDevServer(compiler,options);
    const webpackOptions = this.#context.themeConfig.themeWebpackConfigs;
    if(webpackOptions.length>0){
      log(chalk.red('修改皮肤样式需要重新启动。'));
      webpack(this.#context.themeConfig.themeWebpackConfigs,(err:any, stats:any) => {
        if (err) {
         return error(err);
        }
        else if(stats.hasErrors()){
          return log(chalk.red(stats.toString("errors-only")));
        }
        else {
          devServer.listen(this.#context.webpackConfig.devServer.port,'localhost',(e:any)=>{
            if(e){
              return error(e);
            }
            return;
          });
        }
      });
    } else {
      devServer.listen(this.#context.webpackConfig.devServer.port,'localhost',(e:any)=>{
        if(e){
          return error(e);
        }
        return;
      });
    }
  }

  runProd(){
    const configs:any[] = this.#context.themeConfig.themeWebpackConfigs.concat([this.#context.webpackConfig]);
    const webpackOptions = configs.length>1 ? configs: configs[0];
   // const progressInfo = this.createProgressMonitor();
    // 清除文件
    BuildUtil.delAllSubDirAndFiles(path.join(this.#context.path,'dist'));
    webpack(webpackOptions, (err:any, stats:any) =>  {
      if (err) {
        // 在这里处理错误
        log("\r\nFinished:"+chalk.red(' Build Failed!'));
        return  error(err);
      }
      else if(stats.hasErrors()){
        log("\r\nFinished:"+chalk.red(' Build Failed!'));
        return log(chalk.red(stats.toString("errors-only")));
      }
      else {
        return log("\r\nFinished:"+chalk.blue(' Build Success!'));
      }
    });
  }


  run(){
    this.createWebpackConfig();
    // 初始化多语言文件
    LocalesUtil.build(this.#context);
    // mock
    MockUtil.build(this.#context);

    // 直接调用webpack进行构建
    if(this.#context.inputOptions.startServer === true){
      this.runDev();
    }
    else {
      this.runProd();
    }
  }
}