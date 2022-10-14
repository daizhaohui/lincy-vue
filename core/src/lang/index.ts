import * as VueI18n from 'vue-i18n';
import assign from '../utils/assign';
import Register from '../global/register';
import LangUtil from './langUtil';
import {getCurrentInstance} from 'vue';

const emitter = Register.emitter();
emitter.on('app_created',()=>{
  LangUtil.init();
});

const useI18n = (options?:any):any=>{
  options = options || {};
  assign(options,{
    useScope: 'global'
  });
  const instance = getCurrentInstance();
  if(instance){
    return VueI18n.useI18n(options);
  }else{
    emitter.on("useI18n",()=>{
      VueI18n.useI18n(options);
    });
  }
};

const setLocale = (value:string):void=>{
  LangUtil.setLocale(value);
};

const getLocale = ():string=>{
  return LangUtil.getLocale();
};

export {
  useI18n,
  setLocale,
  getLocale
}
