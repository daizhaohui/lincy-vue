import {IRouterService,IRouteLocationNormalized,RouterNavigationGuard} from '../types/router';
import Register from '../global/register';
import * as VueRouter from 'vue-router';
import { createRouteLocationNormalized } from '../utils/internal/factory';
import RouterUtil from './routerUtil';


export function useRouter(): IRouterService {
  return Register.routerService();
}

export function useRoute(): IRouteLocationNormalized{
  const router = useRouter();
  return router ? router.getCurrentRoute(): {} as IRouteLocationNormalized;
}

export function onBeforeRouteLeave(func:RouterNavigationGuard){
  VueRouter.onBeforeRouteLeave((to:VueRouter.RouteLocationNormalized,from:VueRouter.RouteLocationNormalized):any=>{
    return RouterUtil.toRouterNavigationGuardReturn(func(createRouteLocationNormalized(to),createRouteLocationNormalized(from)));
  });
}

export function onBeforeRouteUpdate(func:RouterNavigationGuard){
  VueRouter.onBeforeRouteUpdate((to:VueRouter.RouteLocationNormalized,from:VueRouter.RouteLocationNormalized)=>{
    return RouterUtil.toRouterNavigationGuardReturn(func(createRouteLocationNormalized(to),createRouteLocationNormalized(from)));
  });
}
