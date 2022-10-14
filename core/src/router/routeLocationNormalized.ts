import {IRouteLocationNormalized, IRouteMatcher} from '../types/router';
import * as VueRouter from 'vue-router';
import {createRouteLocationNormalized} from '../utils/internal/factory';
import {createRouteMatcher} from '../utils/internal/factory';

export default class RouteLocationNormalized implements IRouteLocationNormalized{
  #fullPath: string = '';
  #path: string = '';
  #hash: string = '';
  #name: any = '';
  #query: any = {};
  #params: any = {};
  #meta:any = {};
  #redirectedFrom:IRouteLocationNormalized | null = null;
  #matched:IRouteMatcher[] = [];

  constructor(routeLocation: VueRouter.RouteLocationNormalized,options:any){
    if(routeLocation){
      this.#fullPath = routeLocation.fullPath;
      this.#path = routeLocation.path;
      this.#hash = routeLocation.hash;
      this.#name = routeLocation.name || (options&&options.name?options.name:'');
      this.#query = routeLocation.query;
      this.#params = routeLocation.params || (options&&options.params?options.params:{});
      this.#meta = routeLocation.meta;
      this.#redirectedFrom = routeLocation.redirectedFrom? createRouteLocationNormalized(routeLocation.redirectedFrom): null;
      this.#matched = routeLocation.matched.map(item=>{
        return createRouteMatcher(item);
      })
    }
  }
  get fullPath(){
    return this.#fullPath;
  }
  get path(){
    return this.#path;
  }
  get hash(){
    return this.#hash;
  }
  get name(){
    return this.#name;
  }
  get query(){
    return this.#query;
  }
  get params(){
    return this.#params;
  }
  get meta(){
    return this.#meta;
  }
  get redirectedFrom(){
    return this.#redirectedFrom;
  }
  get matched(){
    return this.#matched;
  }

}