import { HttpMethod } from '../types/http';
import Register from '../global/register';
import {IHttpMeta,IHttpService} from '../types/http';
import isArray from '../typeValidator/isArray';

function _getRequest(meta:IHttpMeta,options:any,httpService:IHttpService){
  meta.method = meta.method || HttpMethod.Get;
  const args = [meta.url];
  if(options){
    args.push(options);
  }
  return  (httpService as any)[meta.method].apply(httpService,args);
}


export function Http(url:string,method?:string){
  return (target:any, key:any, descriptor:any)=>{
    if(!target.prototype.__http__){
      target.prototype.__http__ = {};
    }
    if(!target.prototype.__http__[key]){
      target.prototype.__http__[key] = [];
    }
    target.prototype.__http__[key].push({
      url,
      method: method ? method : HttpMethod.Get
    });
    // _checkMeta(requests);
    descriptor.value = (...args:any[])=>{
      let meta;
      let len;
      let reqs;
      let params;
      const httpService = Register.httpService();
      if(!httpService) throw new Error('http服务尚未初始化');
      reqs = target.prototype.__http__[key].reverse();
      len = reqs.length;
      // 一个参数，支持传递数组
      if(args.length===1){
        params = isArray(args[0]) ? args[0] : [args[0]];
      } else {
        params = args;
      }
      if(len===1){
        meta = reqs[0] as IHttpMeta;
        return _getRequest(meta,params && params.length>0 ? params[0]:undefined,httpService);
      } else if(len>1){
        let i;
        let arr;
        arr = [];
        for(i=0;i<len;i++){
          meta = reqs[i] as IHttpMeta;
          arr.push(_getRequest(meta,params && params.length>i ? params[i]:undefined,httpService));
        }
        return httpService.all(arr);
      }
    }
    return descriptor;
  }
}