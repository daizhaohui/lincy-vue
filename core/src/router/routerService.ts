import {IPlugin} from '../types/plugin';
import { Router } from 'vue-router';
import {IRouteLocationRaw,IRouterService,IRouteConfig, IRouteLocationNormalized, IRouteMapItem, RouterEachHook, RouterComponentHook} from '../types/router';
import {createRouteLocationNormalized,createRouteMapItem} from '../utils/internal/factory';

function _checkRouterName(routeMap:any,name:string){
  if(__DEV__){
    if(!routeMap[name]) throw new Error(`名为【${name}】的路由不存在,app.config.js中routes没有配置改名称路由！`)
  }
}

function _routerNameIsExist(routeMap:any,name:string){
  if(__DEV__){
    if(routeMap[name]) throw new Error(`名为【${name}】的路由已存在,不能重复添加相同名称的路由！`)
  }
}

function _routeNameIsEmpty(route:IRouteConfig){
  if(__DEV__){
    if(!route.name) throw new Error(`${JSON.stringify(route)}路由的名称【name】不能为空！`)
  }
}


function _updateRouteMap(routeMap:any,route:IRouteConfig){
  _routerNameIsExist(routeMap,route.name);
  _routeNameIsEmpty(route);
  let mapItem:IRouteMapItem;
  // 只支持三层嵌套路由
  const path = route.path;
  mapItem = createRouteMapItem(route.name,path,route,null);
  routeMap[route.name] = mapItem;
  if(route.children){
    let firstLayerPath:string;
    route.children.forEach((firstLayerItem:IRouteConfig)=>{
        _routerNameIsExist(routeMap,firstLayerItem.name);
        _routeNameIsEmpty(firstLayerItem);
        firstLayerPath = path + '/' + firstLayerItem.path;
        mapItem = createRouteMapItem(firstLayerItem.name,firstLayerPath,firstLayerItem,route);
        routeMap[firstLayerItem.name] = mapItem;
        if(firstLayerItem.children){
          let secondLayerPath:string;
          firstLayerItem.children.forEach((secondLayerItem:IRouteConfig)=>{
            _routerNameIsExist(routeMap,secondLayerItem.name);
            _routeNameIsEmpty(secondLayerItem);
            secondLayerPath = firstLayerPath + '/' + secondLayerItem.path;
            mapItem = createRouteMapItem(secondLayerItem.name,secondLayerPath,secondLayerItem,firstLayerItem);
            routeMap[secondLayerItem.name] = mapItem;
            if(secondLayerItem.children){
              let thirdLayerPath:string;
              secondLayerItem.children.forEach((thirdLayerItem:IRouteConfig)=>{
                _routerNameIsExist(routeMap,thirdLayerItem.name);
                _routeNameIsEmpty(thirdLayerItem);
                thirdLayerPath = secondLayerPath + '/' + thirdLayerItem.path;
                mapItem = createRouteMapItem(thirdLayerItem.name,thirdLayerPath,thirdLayerItem,secondLayerItem);
                routeMap[thirdLayerItem.name] = mapItem;
              });
            }
          });
        }
    });
  }
}

export default class RouterService implements IRouterService{

  #router:any = null;
  #routeMap:any = {};
  #currentRouteParams:any = null;
  #currentRouteName:string = '';
  static HookHandler:number = 0;
  static HandlerHookMap:any = {};
  static Hooks:any = {
    beforeEachHooks:[],
    afterEachHooks: [],
    beforeRouteLeaveHooks: [],
    beforeRouteEnterHooks: []
  };

  constructor(vueRouter:Router,plugin:IPlugin,appConfig:any){
    this.#router = vueRouter;
    let i;
    let len;
    let route;
    len = appConfig.routes.length;
    for(i=0;i<len;i++){
      route = (appConfig.routes[i] as IRouteConfig);
      _updateRouteMap(this.#routeMap,route);
    }
  }

  private _toOptions(name:string,options?:IRouteLocationRaw):any{
    const route: IRouteMapItem = this.#routeMap[name] as IRouteMapItem;
    let path = route.path;
    const ops: any = {};
    ops.params = options && options.params ?  options.params : {};
    this.#currentRouteParams = ops.params;
    this.#currentRouteName = name;
    if(options && options.params){
      const keys = Object.keys(options.params);
      let key;
      let i;
      let len;
      len = keys.length;
      for(i=0;i<len;i++ ){
        key = keys[i];
        path = path.replace(`:${key}`,options.params[key])
      }
    }
    ops.path = path;
    ops.hash = options&&options.hash ? options.hash : '';
    ops.query = options&&options.query ? options.query : {};
    return ops;
  }

  private _createHookHandler(hook:RouterEachHook|RouterComponentHook):number{
    const handler = RouterService.HookHandler + 1;
    RouterService.HookHandler = handler;
    RouterService.HandlerHookMap[handler] = hook;
    return handler;
  }

  beforeEachHook(hook:RouterEachHook):number{
    RouterService.Hooks.beforeEachHooks.push(hook);
    return this._createHookHandler(hook);
  }
  afterEachHook(hook:RouterEachHook):number{
    RouterService.Hooks.afterEachHooks.push(hook);
    return this._createHookHandler(hook);
  }
  beforeRouteLeaveHook(hook:RouterComponentHook):number{
    RouterService.Hooks.beforeRouteLeaveHooks.push(hook);
    return this._createHookHandler(hook);
  }
  beforeRouteEnterHook(hook:RouterComponentHook):number{
    RouterService.Hooks.beforeRouteEnterHooks.push(hook);
    return this._createHookHandler(hook);
  }
  offHook(handler:number):void{
    const hook = RouterService.HandlerHookMap[handler];
    if(!hook) return;
    const off = (hookArray:any[]):void=>{
      const index = hookArray.indexOf(hook);
      if(index!==-1){
        hookArray.splice(index,1);
      }
    };
    off(RouterService.Hooks.beforeEachHooks);
    off(RouterService.Hooks.afterEachHooks);
    off(RouterService.Hooks.beforeRouteLeaveHooks);
    off(RouterService.Hooks.beforeRouteEnterHooks);
  }

  push(options: IRouteLocationRaw | string ) {
    const isName =  typeof(options) === "string";
    const name:string= isName ? options as string: (options as IRouteLocationRaw).name;
    _checkRouterName(this.#routeMap,name);
    if(isName){
      this.#router.push(this._toOptions(name));
    }else {
      this.#router.push(this._toOptions(name,options as IRouteLocationRaw));
    }
  }

  replace(options: IRouteLocationRaw  | string) {
    const isName =  typeof(options) === "string";
    const name:string= isName ? options as string: (options as IRouteLocationRaw).name;
    _checkRouterName(this.#routeMap,name);
    if(isName){
      this.#router.replace(this._toOptions(name));
    }else {
      this.#router.replace(this._toOptions(name,options as IRouteLocationRaw));
    }
  }
  back() {
    this.#router.back();
  }
  forward() {
    this.#router.forward();
  }
  go(delta: number) {
    this.#router.go(delta);
  }
  getCurrentRoute(): IRouteLocationNormalized {
    const ret:IRouteLocationNormalized = createRouteLocationNormalized(this.#router.currentRoute.value,{
      params: this.#currentRouteParams,
      name: this.#currentRouteName
    });
    return ret;
  }
  getRouteConfig(name:string):IRouteConfig | null{
    const item = this.#routeMap[name] as IRouteMapItem;
    return item ? item.routeConfig : null;
  }
  addRouteMeta(name:string,meta:any):void{
    const item = this.#routeMap[name] as IRouteMapItem;
    if(item && meta){
      if(!item.routeConfig.meta) {
        item.routeConfig.meta = {
          ...meta
        };
      } else {
        item.routeConfig.meta = {
          ...item.routeConfig.meta,
          ...meta
        }
      }
    }
  }
  getRouteMeta(name:string):any{
    const item:any= this.#routeMap[name] as IRouteMapItem;
    if(item && item.meta){
      return {
        ...item.meta
      }
    }
    return null;
  }
  getParentRouteConfig(name:string):IRouteConfig|null{
    const mapItem:IRouteMapItem = this.#routeMap[name];
    return mapItem ? mapItem.parent : null;
  }
}