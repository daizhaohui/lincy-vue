import {IRouteMapItem,IRouteConfig} from '../types/router';

export default class RouteMapItem implements IRouteMapItem{

  path: string;
  name: string;
  routeConfig: IRouteConfig;
  parent: IRouteConfig;

  constructor(name:string,path:string,routeConfig:IRouteConfig,parent:IRouteConfig){
    this.path = path;
    this.name = name;
    this.routeConfig = routeConfig;
    this.parent = parent;
  }

}