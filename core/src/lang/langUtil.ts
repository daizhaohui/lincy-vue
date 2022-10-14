import { createI18n } from 'vue-i18n';
import assign from '../utils/assign';
import {ICreateAppOptions} from '../types/app';
import  Register from '../global/register';

const DefaultOptions = {
  legacy: true,
  locale: 'zh_CN',
  fallbackLocale: 'en_US'
};
const ConfigNodes:string[] = ['locale','fallbackLocale','datetimeFormats','numberFormats'];

// 从构建中获取语言设置：src/locales目录下的json文件
function _loadLangMessages(options:ICreateAppOptions):any{
  const ret:any = {};
  if(window.__lincy_vue__ &&  window.__lincy_vue__.lang && window.__lincy_vue__.lang.items){
    Object.keys(window.__lincy_vue__.lang.items).forEach(k=>{
      ret[k] = window.__lincy_vue__.lang.items[k];
    });
  }
  return ret;
}

function _getInitLanguage():string{
  if(window.__lincy_vue__ &&  window.__lincy_vue__.lang){
    return window.__lincy_vue__.lang.current || '';
  }
  return '';
}

function _getLangMessages(langMessages:any):any{
  const messages:any = {};
  if(langMessages){
     // tslint:disable-next-line:one-variable-per-declaration
     let i,len,key,keys;
     keys = Object.keys(langMessages);
     len = keys.length;
     for(i=0;i<len;i++){
       key = keys[i];
       messages[key] = langMessages[key];
     }
  }
  return messages;
 }

function _createOptions(appConfig:any,langBuild:any):any{
  const lang:any = appConfig.lang;
  const options:any = {};
  const initLanguage:string = _getInitLanguage();
  assign(options,DefaultOptions);
  let i;
  let len;
  let key;
  len = ConfigNodes.length;
  for(i=0;i<len;i++){
    key = ConfigNodes[i];
    if(lang[key]) {
      options[key] = lang[key];
    }
  }
  options.messages = _getLangMessages(langBuild);
  if(initLanguage){
    options.locale = initLanguage;
  }
  return options;
}

export default class LangUtil {

   // 从构建中读取语言信息:来源于src/locales目录下的json文件
   static init(){
    let i18n = Register.lang();
    const options = Register.appOptions();
    const appContext = Register.appContext();
    if(i18n===Register.EmptyObject){
      options.lang = options.lang || {};
      const lang = _loadLangMessages(options);
      if(lang){
        Object.keys(lang).forEach(k=>{
          if(!options.lang[k]){
            options.lang[k] = lang[k];
          }
        });
      }
      i18n = createI18n(_createOptions(options.appConfig,options.lang));
      Register.lang(i18n);
      appContext.app.use(i18n);
    }
    return i18n;
  }

  static setLocale(value:string):void{
    const i18n = LangUtil.init();
    i18n.global.locale = value;
  };

  static getLocale():string{
    const i18n = LangUtil.init();
    return i18n.global.locale;
  }
}