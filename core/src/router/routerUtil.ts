import { Router } from 'vue-router';
import {IPlugin} from '../types/plugin';
import { IRouteConfig, IRouteLocationRaw, IRouterPlugin, IRouterService, RouterNavigationGuardReturn,RouterEachHook, RouterComponentHook} from '../types/router';
import { createRouterService,createRouteLocationNormalized, createRouteFailure} from '../utils/internal/factory';
import isPlainObject from '../typeValidator/isPlainObject';
import RouterService from './routerService';
export default class RouterUtil{

  static Service: IRouterService | null = null;

  static createRouter(vueRouter:Router,plugin:IPlugin|null, appConfig:any){
    if(RouterUtil.Service===null){
      RouterUtil.Service = createRouterService(vueRouter,plugin,appConfig);
      const routerPlugin: IRouterPlugin | null = plugin ? plugin.instance as IRouterPlugin : null;
      vueRouter.beforeEach((to,from)=>{
        const comp: any = to.matched[0] ? to.matched[0].components.default:null;
        const beTo = createRouteLocationNormalized(to);
        const beFrom = createRouteLocationNormalized(from);
        if(comp){
          if(comp.beforeRouteLeave){
            const leave = comp.beforeRouteLeave;
            comp.beforeRouteLeave = (t:any,f:any)=>{
              const nt = createRouteLocationNormalized(t);
              const nf = createRouteLocationNormalized(f);
              RouterService.Hooks.beforeRouteLeaveHooks.forEach((h:RouterComponentHook)=>{
                h(comp,nt,nf);
              });
              return RouterUtil.toRouterNavigationGuardReturn(leave.call(comp,nt,nf));
            };
          }
          if(comp.beforeRouteUpdate){
            const update = comp.beforeRouteUpdate;
            comp.beforeRouteUpdate = (t:any,f:any)=>{
              return RouterUtil.toRouterNavigationGuardReturn(update.call(comp,createRouteLocationNormalized(t),createRouteLocationNormalized(f)));
            };
          }
          if(comp.beforeRouteEnter){
            const enter = comp.beforeRouteEnter;
            comp.beforeRouteEnter = (t:any,f:any)=>{
              const nt = createRouteLocationNormalized(t);
              const nf = createRouteLocationNormalized(f);
              RouterService.Hooks.beforeRouteEnterHooks.forEach((h:RouterComponentHook)=>{
                h(comp,nt,nf);
              });
              return RouterUtil.toRouterNavigationGuardReturn(enter.call(comp,nt,nf));
            };
          }
        }
        if(routerPlugin && routerPlugin.beforeEach){
          const result =  RouterUtil.toRouterNavigationGuardReturn(routerPlugin.beforeEach(beTo, beFrom));
          if(result!==false){
            RouterService.Hooks.beforeEachHooks.forEach((h:RouterEachHook)=>{
              h(beTo,beFrom);
            });
          }
          return result;
        } else {
          RouterService.Hooks.beforeEachHooks.forEach((h:RouterEachHook)=>{
            h(beTo,beFrom);
          });
          return true;
        }
      });
      // 绑定路由事件
      if(routerPlugin && routerPlugin.beforeResolve){
        vueRouter.beforeResolve((to,from)=>{
          return RouterUtil.toRouterNavigationGuardReturn(routerPlugin.beforeResolve(createRouteLocationNormalized(to),createRouteLocationNormalized(from)));
        });
      }
      vueRouter.afterEach((to,from,failure)=>{
        const aeTo = createRouteLocationNormalized(to);
        const aeFrom = createRouteLocationNormalized(from);
        RouterService.Hooks.afterEachHooks.forEach((h:RouterEachHook)=>{
          h(aeTo,aeFrom);
        });
        if(routerPlugin && routerPlugin.afterEach){
          return routerPlugin.afterEach(aeTo,aeFrom, failure?createRouteFailure(failure):void(0));
        }
        return true;
      });
      if(routerPlugin && routerPlugin.onError){
        vueRouter.onError((error:any)=>{
          return routerPlugin.onError(error);
        });
      }

    }
    return RouterUtil.Service;
 }

  static getRoutes(appConfig:any) {
    // tslint:disable-next-line:one-variable-per-declaration
    let i,len,ret,route;
    len = appConfig.routes.length;
    ret = [];
    for(i=0;i<len;i++){
      route = (appConfig.routes[i] as IRouteConfig);
      ret.push(route);
    }
    return ret;
  }

  static toRouterNavigationGuardReturn(returnValue:RouterNavigationGuardReturn){
    if(isPlainObject(returnValue)){
      const routeLocation = returnValue as IRouteLocationRaw;
      const routeConfig = RouterUtil.Service?.getRouteConfig(routeLocation.name);
      const newReturnValue:any = {path:routeConfig?.path};
      if(routeLocation.params) {
        newReturnValue.params = routeLocation.params;
      }
      if(routeLocation.hash) {
        newReturnValue.hash = routeLocation.hash;
      }
      if(routeLocation.query) {
        newReturnValue.query = routeLocation.query;
      }
      return newReturnValue;
    }
    return returnValue;
  }

}