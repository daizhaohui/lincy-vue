import {IAppContext,IApp} from '../../types/app';
import AppContext from '../../app/appContext';
import {App} from '../../app';
import {IHttpService} from '../../types/http';
import HttpService from '../../http/httpService';
import {IRouterService,IRouteLocationNormalized,IRouteFailure} from '../../types/router';
import RouterService from '../../router/routerService';
import RouteLocationNormalized from '../../router/routeLocationNormalized';
import {IComponentContext} from '../../types/component';
import ComponentContext from '../../component/componentContext';
import RouteFailure from '../../router/routeFailure';
import {IPlugin} from '../../types/plugin';
import Plugin from '../../plugin/plugin';
import {IRouteMatcher,IRouteMapItem} from '../../types/router';
import RouteMatcher from '../../router/routeMatcher';
import RouteMapItem from '../../router/routeMapItem';

export function createInstance<T>(K:new(...args: any[])=>T,...rest: any[]):T{
    return new K(...rest);
}

export function createAppContext(...args: any[]):IAppContext{
  return createInstance<IAppContext>(AppContext,...args);
}

export function createApp(...args: any[]):IApp{
  return createInstance<IApp>(App,...args);
}

export function createHttpService(...args: any[]):IHttpService{
  return createInstance<IHttpService>(HttpService,...args);
}

export function createRouterService(...args:any[]):IRouterService{
  return createInstance<IRouterService>(RouterService,...args);
}

export function createRouteLocationNormalized(...args: any[]):IRouteLocationNormalized{
  return createInstance<IRouteLocationNormalized>(RouteLocationNormalized,...args);
}

export function createComponentContext(...args: any[]):IComponentContext{
  return createInstance<IComponentContext>(ComponentContext,...args);
}

export function createRouteFailure(...args: any[]):IRouteFailure{
  return createInstance<IRouteFailure>(RouteFailure,...args);
}

export function createPlugin(...args: any[]):IPlugin{
  return createInstance<IPlugin>(Plugin,...args);
}

export function createRouteMatcher(...args: any[]):IRouteMatcher{
  return createInstance<IRouteMatcher>(RouteMatcher,...args);
}

export function createRouteMapItem(...args: any[]):IRouteMapItem{
  return createInstance<IRouteMapItem>(RouteMapItem,...args);
}






