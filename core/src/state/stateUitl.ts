import { createStore } from 'vuex'
import  Register from '../global/register';
import createPersistedState from "vuex-persistedstate";
import { IStateService } from '../types/state';
import { ICreateAppOptions } from '../types/app';
import Logger from '../utils/internal/logger';
import StateService from '../state/stateService';
import assign from '../utils/assign';
export default class StateUtil {

   static init():IStateService{
    let service = StateUtil.stateService();
    const options = Register.appOptions();
    if(service===Register.EmptyObject && options){
      service= new StateService();
      StateUtil.stateService(service);
      StateUtil.createStore(options);
    }
    return service;
   }

  static stateMeta(instance?:any):any{
    const ret = Register.stateMeta();
    if(instance){
      Register.stateMeta(instance);
    }
    return ret;
  }

  static stateService(instance?:IStateService):IStateService{
    let ret = Register.stateService();
    if(instance){
      Register.stateService(instance);
      ret = instance;
    }
    return ret;
  }

  static store(instance?:any):any{
    const ret = Register.store();
    if(instance){
      Register.store(instance);
    }
    return ret;
  }

  static getInitState(targets:any[]):any{
    let state = {};
    targets.forEach(target=>{
      state = assign(state,target.prototype.__observables__);
    });
    return state;
  }

   static createStore(options:ICreateAppOptions){
      const appConfig = options.appConfig;
      const paths:string[] = [];
      const modules:any= {};
      const plugins = [];
      const stateMeta:any = StateUtil.stateMeta();
      if(stateMeta === Register.EmptyObject) return;
      const keys = Object.keys(stateMeta)
      let i;
      let len;
      let key:string;
      len = keys.length;
      for(i=0;i<len;i++){
        key = keys[i];
        modules[key] = {
          namespaced: true,
          state: ((k)=>{
            return ()=>{
              return StateUtil.getInitState(stateMeta[k].targets);
            };
          })(key),
          mutations: {
            update: (s:any, p:any) => {
              let j;
              let l;
              let k:string;
              const ks:string[] = Object.keys(p);
              l = ks.length;
              for(j=0;j<l;j++){
                k = ks[j];
                s[k] = p[k];
              }
            }
          },
        };
        // 找到需要持久化的属性
        if(appConfig.state.persisted === true){
          stateMeta[key].targets.forEach((target:any)=>{
            const persists =  target.prototype.__persists__;
            const observables = target.prototype.__observables__;
            let path;
            // 全部
            if(persists===true){
              Object.keys(observables).forEach((k:string)=>{
                path = `${key}.${k}`;
                if(paths.indexOf(path)===-1){
                  paths.push(path);
                }
              });
            }
            // 部分
            else if(persists){
              persists.forEach((n: string)=>{
                path = `${key}.${n}`;
                if(paths.indexOf(path)===-1){
                  paths.push(path);
                }
              });
            }
          });
        }
      }

      if(appConfig.state.persisted === true && paths.length ){
        const psOptions:any = {
          fetchBeforeUse: true,
          key: appConfig.state.storageKey || "__state__",
        };
        if(paths.length>0){
          psOptions.paths = paths;
        }
        if(appConfig.state.encrypted){
          psOptions.storage = {
            getItem: (k:string):string=>{
               const s = StateUtil.stateService();
               if(s===Register.EmptyObject) return k;
               try{
                return s.descrypt(s.getItem(k));
               }catch(ex){
                Logger.warn(ex);
                return '';
               }
            },
            setItem: (k:string, value:string):void => {
              const s = StateUtil.stateService();
              if(s!==Register.EmptyObject){
                s.setItem(k,s.encrypt(value));
              }
            },
            removeItem:(k:string):void=>{
              const s = StateUtil.stateService();
              if(s!==Register.EmptyObject){
                s.removeItem(k);
              }
            }
          }
        }
        plugins.push(createPersistedState(psOptions));
      }
      const store = createStore({
        modules,
        plugins,
      });
      StateUtil.store(store);
   }
}