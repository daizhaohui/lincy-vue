import {IHttpPlugin,IHttpService} from '../types/http';
import assign from '../utils/assign';

// requestConfig(config:any):any;
// requestError(err:any):Promise<HttpPromiseCallback>;
// requestSuccess(res:any):Promise<HttpResultCallback>;
// requestFail(err:any):Promise<HttpResultCallback>;

function _setAxios (axios:any,appConfig:any,plugin:IHttpPlugin|null){
  if(plugin && (plugin.requestConfig||plugin.requestError)){
    axios.interceptors.request.use((config:any)=>{
      if(plugin.requestConfig){
        return plugin.requestConfig(config);
      }
      return config;
    },(err: any)=>{
      if(plugin.requestError){
        return plugin.requestError(err);
      }
      return Promise.reject(err);
    });
  }
  if(plugin && (plugin.responseSuccess||plugin.responseFail)){
    axios.interceptors.response.use((res:any)=>{
      if(plugin.responseSuccess){
        return plugin.responseSuccess(res);
      }
      return res;
    },(err: any)=>{
      if(plugin.responseFail){
        return plugin.responseFail(err);
      }
      return Promise.reject(err);
    });
  }
}

function _getConfig(config:any,appConfig:any):any{
  const newConfig = appConfig.http  ? assign({},appConfig.http) : {};
  if(config){
    assign(newConfig,config);
  }
  return newConfig;
}

function _getUrl(url: string, options: any):string{
  const params = options && options.pathParams ? options.pathParams : null;;
  if(params){
    let key;
    let i;
    let len;
    const keys = Object.keys(params);
    len = keys.length;
    for(i=0;i<len;i++ ){
      key = keys[i];
      url = url.replace(`:${key}`,params[key])
    }
  }
  return url;
}

export default class HttpService implements IHttpService{

  #axios:any = null;
  #appConfig:any = null;
  #plugin:any = null;

  constructor(axios:any,appConfig:any,plugin:IHttpPlugin){
    this.#axios = axios;
    this.#appConfig = appConfig;
    this.#plugin = plugin;
    _setAxios(axios,appConfig,plugin);
  }
  get(url: string, options: any) {
    return this.#axios.get(_getUrl(url,options),_getConfig(options,this.#appConfig));
  }
  post(url: string,options: any) {
    return this.#axios.post(_getUrl(url,options),options.data,_getConfig(options,this.#appConfig));
  }
  put(url: string, options: any) {
    return this.#axios.put(_getUrl(url,options),options.data,_getConfig(options,this.#appConfig));
  }
  delete(url: string, options: any) {
    return this.#axios.delete(_getUrl(url,options),_getConfig(options,this.#appConfig));
  }
  head(url: string, options: any) {
    return this.#axios.head(_getUrl(url,options),_getConfig(options,this.#appConfig));
  }
  options(url: string, options: any) {
    return this.#axios.options(_getUrl(url,options),_getConfig(options,this.#appConfig));
  }
  patch(url: string, options: any) {
    return this.#axios.patch(_getUrl(url,options),options.data,_getConfig(options,this.#appConfig));
  }
  all(iterable: any) {
    return this.#axios.all(iterable);
  }
  spread(callback: any) {
    return this.#axios.spread(callback);
  }
  create(options: any): any {
    const newAxios =  this.#axios.create(_getConfig(options,this.#appConfig));
    _setAxios(newAxios,this.#appConfig,this.#plugin);
    return newAxios;
  }

}