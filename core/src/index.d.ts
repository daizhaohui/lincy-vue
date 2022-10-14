
import {IApp,ICreateAppOptions,IUseHttp,Emitter,IRouterService,IRouteLocationNormalized,RouterNavigationGuard,RouterNavigationGuardReturn} from './types';
declare class Rem extends Number {
  toString():string;
  constructor(px:number);
}

/** 装饰器函数
 * @param target 要在其上定义属性的对象
 * @param key 要定义或修改的属性的名称
 * @param descriptor 将被定义或修改的属性描述符
 * @returns 被传递给函数的对象
 */
 declare type DecoratorFunc = (target:any, key:any, descriptor:any)=>any;

import Vue from 'vue';
export * from 'vue';
/**
 * 创建App实例
 * @param arg 参数配置
 */
export declare function createApp(arg:ICreateAppOptions):IApp;

/**
 * 获取App实例
 */
export declare function useApp():IApp;

/**
 * 根据扩展库中的常用工具的名称获取起导出的函数或对象
 * @param name 扩展库中的常用工具的名称
 * @returns Function | Object
 */
export declare function useExtenUtil(name:string):any;
/**
 * 获取http服务实例
 */
export declare function useHttp():IUseHttp;
/**
 * 获取路由服务
 */
export declare function useRouter(): IRouterService;
/**
 * 获取当前路由信息
 */
export declare function useRoute(): IRouteLocationNormalized;
/**
 * 获取自定义的服务
 * @param name 服务名
 */
export declare function useService(name:string):any;
/**
 * 使用框架提供的指令
 * @param diretive 指令对象
 */
export function useDirective(diretive:any):void;
/**
 * px转还成rem
 * @param px px的数值
 */
 export function useRem(px:number):Rem;
/**
 * 全局事件订阅器
 */
 export function useEmitter():Emitter;
/**
 * 离开路由事件绑定
 */
export declare function onBeforeRouteLeave(func:RouterNavigationGuard):RouterNavigationGuardReturn;
/**
 * 路由变更事件绑定
 */
export declare function onBeforeRouteUpdate(func:RouterNavigationGuard):RouterNavigationGuardReturn;

export default Vue;
