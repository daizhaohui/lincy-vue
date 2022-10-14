import {IPlugin} from "../types/plugin";
import {IComponentContext,IComponentPlugin} from '../types/component';
import {createComponentContext} from '../utils/internal/factory';
import {getCurrentInstance} from 'vue';
import {useRoute} from '../router';
import {IRouteLocationRaw} from '../types/router';
import {VueComponent} from '../types/global';


const _isRouteComponent = (instance:any):boolean=>{
  const c = instance.attrs.class + '';
  return c.toLocaleLowerCase() === 'router-view';
};

const _createContext = (appConfig:any)=>{
  const instance = getCurrentInstance();
  const currentRoute:IRouteLocationRaw | null = useRoute();
  const isRouteComponent = _isRouteComponent(instance);
  return createComponentContext({
    appConfig,
    instance,
    currentRoute,
    isRouteComponent
  });
};


export default class ComponentUtil {

  static registerGloablComponents(components:VueComponent[],vueAppInstance:any){
    if(components){
      // tslint:disable-next-line:one-variable-per-declaration
      let i,len,comp:VueComponent;
      len = components.length;
      for(i=0;i<len;i++){
        comp = components[i];
        vueAppInstance.component(comp.name,comp.component);
      }
    }
  }

  static init(mixin:any,plugin:IPlugin|null, appConfig:any){
    const compPlugin: IComponentPlugin | null =  plugin ? plugin.instance as IComponentPlugin : null;
    let compContext: IComponentContext | null = null;
    if(compPlugin){
      if(compPlugin.created){
        mixin.created = ()=>{
          compContext = _createContext(appConfig);
          compPlugin.created(compContext);
        }
      }
      if(compPlugin.beforeMount){
        mixin.beforeMount = ()=>{
          compContext = _createContext(appConfig);
          compPlugin.beforeMount(compContext);
        }
      }
      if(compPlugin.mounted){
        mixin.mounted = ()=>{
          compContext = _createContext(appConfig);
          compPlugin.mounted(compContext);
        }
      }
      if(compPlugin.beforeUpdate){
        mixin.beforeUpdate = ()=>{
          compContext = _createContext(appConfig);
          compPlugin.beforeUpdate(compContext);
        }
      }
      if(compPlugin.updated){
        mixin.updated = ()=>{
          compContext = _createContext(appConfig);
          compPlugin.updated(compContext);
        }
      }
      if(compPlugin.beforeUnmount){
        mixin.beforeUnmount = ()=>{
          compContext = _createContext(appConfig);
          compPlugin.beforeUnmount(compContext);
        }
      }
      if(compPlugin.unmounted){
        mixin.unmounted = ()=>{
          compContext = _createContext(appConfig);
          compPlugin.unmounted(compContext);
        }
      }
    }
  }
}