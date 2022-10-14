import { VueComponent } from './global';
import {IPlugin} from "./plugin";

export declare interface IApp {
  /**
   * 加载App
   * @param mountNodeName 挂载App的节点名
   */
  mount(mountNodeName:string):void;
  /**
   * 卸载App
   * @param mountNodeName 卸载App的节点名
   */
  unmount(mountNodeName:string):void;
  /**
   * 注册全局组件
   * @param name 组件名称
   * @param comp {Function | Object} [definition]
   */
  component(name:string,component:any):void;
  /**
   * 注册全局指令
   * @param name
   * @param directive
   */
  directive(name:string,directive:any):void;
  /**
   * 安装 Vue.js 插件。如果插件是一个对象，它必须暴露一个 install 方法。如果它本身是一个函数，它将被视为安装方法。
   * @param plugin  {Object | Function}
   * @param options 可选配置
   */
  use(plugin:any,options?:any):void;
  /**
   * 设置一个可以被注入到应用范围内所有组件中的值。组件应该使用 inject 来接收 provide 的值。
   * @param name 名称
   * @param value 值
   */
  provide(name:string|symbol,value:any):void;
  /**
   * 注册全局服务
   * @param name 名称
   * @param instance 服务实例
   */
  registerGlobalService(name:string,instance:any):void;
  /**
   * 获取全局服务
   * @param name 注册的服务名称
   */
  useGlobalService(name:string):any;
  /**
   * 版本
   */
  readonly version:string;
}


export declare interface IAppContext{
  readonly app: IApp;
  readonly config:any;
}

export declare interface ICreateAppOptions {
  /**
   * 插件
   */
  plugins: IPlugin[];
  /**
   * app.config.js内容
   */
  appConfig: any;
  /**
   * lang:语言相关
   */
  lang?:any;
  /**
   * 注册的全局组件
   */
  components?:VueComponent[];
  /**
   * app的根组件
   */
  rootComponent?:any;

}

/**
 * 应用插件
 */
export declare interface IAppPlugin {

  /**
   * app创建前
   * @param appConfig app.config.js配置
   */
  beforeCreate(appConfig:any):void;
  /**
   * app创建完毕
   * @param appContext 上下文
   */
  created(appContext:IAppContext):void;

  /**
   * app加载完毕
   * @param appContext 上下文
   */
  mounted(appContext:IAppContext):void;

  /**
   * app卸载
   * @param appContext 上下文
   */
  unmounted(appContext:IAppContext):void;
}