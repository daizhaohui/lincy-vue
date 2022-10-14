import { ICliConfig, IInputOptions,ICdnItem,DelExclude } from "../typedefines";
import fs from 'fs';
import path from 'path';
import { Language, HtmlTemplate } from "../consts";
import DefaultCliConfig from '../../config/cli.config';
import LoadCliConfig from './loadCliConfig';
import isFunction from '../utils/isFunction';
import merge from '../utils/merge';

export default class BuildUtil {

  static isTS(options:IInputOptions,rootPath:string):boolean{
    if (options.program===Language.TypeScript) return true;
    return fs.existsSync(path.resolve(rootPath,'src/app.ts'))
  }

  static isMobile(options:IInputOptions):boolean{
    if (options.template === HtmlTemplate.Mobile) return true;
    return  false;
  }



  static getCliConfig(options:IInputOptions,rootPath:string):ICliConfig{
    const cdnTypes = ['image','js','font','css'];
    let cliConfig;
    const cliConfigFunc:any= LoadCliConfig(rootPath);
    cliConfig = isFunction(cliConfigFunc) ?  cliConfigFunc(options.mode+'') : cliConfigFunc;
    if(cliConfig){
      cliConfig = merge(DefaultCliConfig,cliConfig);
    }else {
      cliConfig = {};
    }
    const cdn:ICdnItem[] = [];
    if(cliConfig.cdn && cliConfig.cdn.length){
      cliConfig.cdn.forEach((item:ICdnItem)=>{
        if(cdnTypes.indexOf(item.type)!==-1 && item.address){
          cdn.push(item);
        }
      });
    }
    cliConfig.cdn = cdn;
    return cliConfig;
  }

  static delAllSubDirAndFiles(dir:string,exclude?:DelExclude){
      let files:string[]= [];
      if(fs.existsSync(dir)){
        files = fs.readdirSync(dir);
        files.forEach((file, index) => {
            const curPath = path.join(dir,file);
            if(fs.statSync(curPath).isDirectory()){
              BuildUtil.delAllSubDirAndFiles(curPath,exclude);
              fs.rmdirSync(curPath);
            } else {
              if(!exclude || !exclude(curPath)){
                fs.unlinkSync(curPath);
              }
            }
        });
      }
  }


}