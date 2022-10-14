import {Locales}from '../consts';
import { IBuildContext } from '../typedefines';
import fs from 'fs';
import path from 'path';
import Writer from  '../fileWriter/localesIndexJSWriter';
export default class LocalesUtil{

  static build(context:IBuildContext){
    const fileName = path.join(context.path,'/src/locales/index.js');
    Writer(null,{
      fileName,
      items:LocalesUtil.getMultiLang(context)
    })
  }

  static getMultiLang(context:IBuildContext):string[]{
    const files = fs.readdirSync(path.join(context.path,'/src/locales'));
    let name;
    let ext;
    const compileLanguage = context.inputOptions.language;
    const ret:string[] = [];
    const keys = Object.keys(Locales);
    if(!compileLanguage){
      files.forEach(f=>{
        name = path.basename(f).split('.')[0];
        ext = path.basename(f).split('.')[1];
        if(ext === 'json' && keys.includes(name)){
          ret.push(name);
        }
      });
    } else {
      files.forEach(f=>{
        name = path.basename(f).split('.')[0];
        ext = path.basename(f).split('.')[1];
        if(name.indexOf(compileLanguage)!==-1 && ext === 'json' && keys.includes(name)){
          ret.push(name);
        }
      });
    }
    return ret;
  }

}