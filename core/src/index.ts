import * as lincyVue from './app/index';
import {IApp,ICreateAppOptions} from './types/app';
import Register from './global/register';
import { Emitter } from './types/emitter';

export * from  'vue';
export * from './router';
export * from './http';
export * from './theme';
export * from './layout';

export function createApp(arg:ICreateAppOptions):IApp{
  return lincyVue.App.createApp(arg);
}

export function useApp():IApp{
  return lincyVue.useApp();
}

export function useEmitter():Emitter{
  return Register.emitter();
}

export function useService(name:string):any{
  const app = lincyVue.useApp();
  return app?.useGlobalService(name);
}

export function useDirective(diretive:any){
  try{
    const app = lincyVue.useApp();
    app?.directive(diretive.name,diretive.implement);
  }catch(ex){
    // tslint:disable-next-line: no-console
    console.error(ex);
  }
}




