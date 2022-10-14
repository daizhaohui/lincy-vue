import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import { IApp,ICreateAppOptions,IAppContext } from '../types/app';
import HttpUtil from '../http/httpUtil';
import PluginUtil from '../plugin/pluginUtil';
import RouterUtil from '../router/routerUtil';
import ComponentUtil from '../component/componentUtil';
import PluginName from '../plugin/PluginNames';
import {IRouterService} from  '../types/router';
import Register from '../global/register';
import { IHttpService } from '../types/http';
import * as factory from '../utils/internal/factory';
import ConfigUtil from '../config/configUtil';
import AppComponent from './app';
import Logger from '../utils/internal/logger';
import { useRem } from '../layout';

Register.emitter();

const createRootComponent = (comp:any,appOptions:ICreateAppOptions)=>{
  return {
    extends:comp,
    mounted() {
      // 触发订阅事件
      const emitter = Register.emitter();
      emitter.emit('useI18n');
    },
  }
};


export function useApp():IApp{
  const appContext =  Register.appContext();
  return  appContext.app;
}
export class App implements IApp {

    #vueAppInstance: any = null;
    #createAppOptions:ICreateAppOptions;
    #vueRouter: any = null;
    #mountNodeName:string="app";

    static createApp(options: ICreateAppOptions):IApp{
      // 对options里的内容进行合法性检查
      let appContext:IAppContext = Register.appContext();
      if (appContext===Register.EmptyObject){
        // 初始化插件
        PluginUtil.init(options);
        options.appConfig = ConfigUtil.create(options.appConfig);
        appContext = factory.createAppContext(factory.createApp(options),options.appConfig);
        Register.appContext(appContext);
        Register.appOptions(options);
        // app创建完毕
        PluginUtil.trigAppEvent('created',appContext,options);
        const emitter = Register.emitter();
        emitter.emit("app_created");
      }
      return appContext.app;
    }

    constructor(options:ICreateAppOptions){
      this.#createAppOptions = options;
      // 创建App实例
      this.#vueAppInstance = Vue.createApp(createRootComponent(options.rootComponent||AppComponent,options));
      // 定义mixin：生命周期钩子和全局属性和方法
      const mixin:any = {};
      // 初始化路由
      this.#vueRouter = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes: RouterUtil.getRoutes(options.appConfig)
      });
      const routerService: IRouterService = RouterUtil.createRouter(this.#vueRouter,PluginUtil.findPlugin(PluginName.Router,options.plugins||[]),options.appConfig);
      Register.routerService(routerService);
      // 修改vue-router内部逻辑
      const  origin  =  Object.defineProperty;
      // tslint:disable-next-line:no-empty
      Object.defineProperty = (...args:any[]):any=>{};
      this.#vueAppInstance.use(this.#vueRouter);
      Object.defineProperty = origin;
      this.registerGlobalService('$router',routerService);
      Object.defineProperty(this.#vueAppInstance.config.globalProperties,"$route",{
        enumerable: true,
        configurable: false,
        get(){
          return routerService.getCurrentRoute();
        }
      });
      // 初始化http实例
      const httpService: IHttpService = HttpUtil.createHttp(PluginUtil.findPlugin(PluginName.Http,options.plugins||[]),options.appConfig);
      Register.httpService(httpService);
      this.registerGlobalService('$http',httpService);
      // 注册全局组件
      ComponentUtil.registerGloablComponents(options.components||[],this.#vueAppInstance);
      // 绑定component钩子
      ComponentUtil.init(mixin,PluginUtil.findPlugin(PluginName.Component,options.plugins||[]),options.appConfig);
      // 混入mixin
      if(Object.keys(mixin).length>0){
        this.#vueAppInstance.mixin(mixin);
      }
      // 注册rem转换
      this.registerGlobalService("$rem",useRem);
    }

    registerGlobalService(name: string, instance: any) {
      Object.defineProperty(this.#vueAppInstance.config.globalProperties,name.indexOf('$')!==0?'$'+name:name,{
        enumerable: true,
        writable:false,
        configurable: false,
        value:instance
      });
    }

    useGlobalService(name:string):any{
      const serviceName = name.indexOf('$')!==0?'$'+name:name;
      if(this.#vueAppInstance.config.globalProperties[serviceName]){
        return this.#vueAppInstance.config.globalProperties[serviceName];
      }
      return null;
    }

    component(name: string, component: any) {
      this.#vueAppInstance.component(name,component);
    }
    directive(name: string, directive: any) {
      this.#vueAppInstance.directive(name,directive);
    }
    use(plugin: any, options?: any) {
      this.#vueAppInstance.use(plugin,options);
    }
    provide(name: string | symbol, value: any) {
      this.#vueAppInstance.provide(name,value);
    }

    mount(mountNodeName: string) {
      if(this.#vueAppInstance){
        this.#mountNodeName = mountNodeName;
        this.#vueAppInstance.mount(mountNodeName);
        window.addEventListener('beforeunload',(e:any)=>{
            try{
              this.unmount(this.#mountNodeName)
            }catch(e){
              Logger.error(e);
            }
        },true);
        const emitter = Register.emitter();
        const appContext:IAppContext = Register.appContext();
        // app加载event
        if(appContext!== Register.EmptyObject){
          PluginUtil.trigAppEvent('mounted',appContext,this.#createAppOptions);
        }
        emitter.emit("app_mount");
      }
    }

    unmount(mountNodeName: string) {
      if(this.#vueAppInstance){
        this.#vueAppInstance.unmount(mountNodeName);
        const appContext:IAppContext = Register.appContext();
         // app卸载event
         if(appContext!==Register.EmptyObject){
          PluginUtil.trigAppEvent('unmounted',appContext,this.#createAppOptions);
         }
      }
      // 触发订阅事件
      const emitter = Register.emitter();
      emitter.emit("app_unmount");
    }

    get version():string{
      return __VERSION__;
    }
}


