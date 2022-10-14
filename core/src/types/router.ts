import { VoidFunc } from "./global";


// 路由守卫返回的回调
export  declare type RouterNavigationGuardReturnFunc = (vm:any)=>any;
export  declare type RouterNavigationGuardReturn = boolean | IRouteLocationRaw | RouterNavigationGuardReturnFunc;
export  declare type RouterErrorHandler = (error: any) => any;
export  declare type RouterEachHook = (to:IRouteLocationNormalized,from:IRouteLocationNormalized)=>void;
export  declare type RouterComponentHook = (component:any,to:IRouteLocationNormalized,from:IRouteLocationNormalized)=>void;
/**
 * true: 验证导航
 * false: 取消导航
 * IRouteLocationRaw: 重定向到一个不同的位置
 * RouterNavigationGuardReturnFunc 仅适用于 beforeRouteEnter：导航完成后执行的回调。接收路由组件实例作为参数。
 */
export  declare type RouterNavigationGuard = (to:IRouteLocationNormalized,from:IRouteLocationNormalized) => RouterNavigationGuardReturn

export   declare interface IRouterPlugin {
  /**
   * 添加一个导航守卫，在任何导航前执行。
   * @param to
   * @param from
   */
  beforeEach(to:IRouteLocationNormalized,from:IRouteLocationNormalized):RouterNavigationGuardReturn;

  /**
   * @param to 添加一个导航守卫，在导航即将解析之前执行。在这个状态下，所有的组件都已经被获取，并且其他导航守卫也已经成功。
   * @param from
   */
  beforeResolve(to:IRouteLocationNormalized,from:IRouteLocationNormalized):RouterNavigationGuardReturn;
  /**
   * 添加一个导航钩子，在每次导航后执行。
   * @param to
   * @param from
   */
  afterEach(to:IRouteLocationNormalized,from:IRouteLocationNormalized,failure:IRouteFailure|void):void;
  /**
   * 添加一个错误处理程序，在导航期间每次发生未捕获的错误时都会调用该处理程序。
   * @param handler
   */
  onError(handler: RouterErrorHandler): VoidFunc
}

export  declare interface  IRouteConfig {
  path: string;
  component: any;
  redirect?:string;
  name: string;
  meta?:any;
  children?:IRouteConfig[];
}

export  declare interface  IRouteMapItem {
  path: string;
  name: string;
  routeConfig:IRouteConfig,
  parent:IRouteConfig
}


export  declare interface IRouteFailure{
  type:any;
  to:IRouteLocationNormalized;
  from:IRouteLocationNormalized;
}

/**
 * 路由定位信息
 */
export  declare interface IRouteLocationNormalized {
  /**
   * 标准化的路由地址
   */
  readonly fullPath:string;
  /**
   * 编码 URL 的 pathname 部分，与路由地址有关。
   */
  readonly path:string;
  /**
   * hash值：#abc
   */
  readonly hash:string;
  /**
   * 路由名称
   */
  readonly name: string;
  /**
   * 从 URL 的 search 部分提取的已解码查询参数的字典
   */
  readonly query: any;
  /**
   * 从 path 中提取的已解码参数字典
   */
  readonly params: any;
  /**
   * IRouteConfig中的meta元数据
   */
  readonly meta: any;
  readonly redirectedFrom:IRouteLocationNormalized | null;
}


/**
 * 路由定位信息
 */
export  declare interface IRouteLocationRaw {

  /**
   * 路由名称
   */
  readonly name: string;
  /**
   * hash值, #abc
   */
  readonly hash?: string;
  /**
   *  查询参数
   */
  readonly query?: any;
  /**
   * 路由动态参数
   */
  readonly params?:any;

}

export  declare interface IRouteMatcher{
  meta:any;
  name:string;
  path: string;
  components:any[];
  children:any[];
}


/**
 * 路由服务
 */
export  declare interface  IRouterService {

  /**
   * 通过在历史堆栈中推送一个 entry，以编程方式导航到一个新的 URL
   * @param options "{ name:'',query:{},hash:'',params:{}}"
   */
  push(options: IRouteLocationRaw | string):void;
  /**
   * 通过替换历史堆栈中的当前 entry，以编程方式导航到一个新的 URL。
   * @param options "{query:{},hash:'',params:{}}"
   */
  replace(options: IRouteLocationRaw | string):void;
  /**
   * 回退，等价与go(-1)
   */
  back():void;
  /**
   * 前进，相当于go(1)
   */
  forward():void;
  /**
   * 跳转到之前或之后
   * @param delta 跳转历史位置：-1,-2,1,2
   */
  go(delta:number):void;
  /**
   * 获取当前route
   */
  getCurrentRoute():IRouteLocationNormalized;
  /**
   * 获取路由配置
   * @param name 路由名
   */
  getRouteConfig(name:string):IRouteConfig | null;
  /**
   * 添加路由的meta对象值
   * @param name 路由名字
   * @param meta meta值，会覆盖配置中的meta值
   */
  addRouteMeta(name:string,meta:any):void;
  /**
   * 根据路由名称获取meta
   * @param name 路由名称
   */
  getRouteMeta(name:string):any;
  /**
   * 获取父路由
   * @param name 路由名称
   */
   getParentRouteConfig(name:string):IRouteConfig|null;
  /**
   * 每次路由执行前
   * @param to
   * @param from
   */
  beforeEachHook(hook:RouterEachHook):number;
  afterEachHook(hook:RouterEachHook):number;
  beforeRouteLeaveHook(hook:RouterComponentHook):number;
  beforeRouteEnterHook(hook:RouterComponentHook):number;
  offHook(handler:number):void;
}