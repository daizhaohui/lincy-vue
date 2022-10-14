
// https://github.com/js-cookie/js-cookie
import * as JSCookies from 'js-cookie';

 export interface KeyValues{ [key:string]:any };

export type CookieConverterFunc = (value:string,name:string)=>any;
export interface CookieConverter {
  read:CookieConverterFunc;
  write:CookieConverterFunc;
};

export  interface ICookieOptions{
  /**
   * 表示此cookie对哪个地址可见。默认为”/”。
   */
  path?:string;
  /**
   * string，表示此cookie对哪个域名可见。设置后cookie会对所有子域名可见。默认为对创建此cookie的域名和子域名可见。
   */
  domain?:string;
  /**
   * 定义有效期。如果传入Number，那么单位为天，你也可以传入一个Date对象，表示有效期至Date指定时间。默认情况下cookie有效期截止至用户退出浏览器。
   */
  expires?:number;
  /**
   * true或false，表示cookie传输是否仅支持https。默认为不要求协议必须为https。
   */
  secure?:boolean;
}

interface ICookie{

  /**
   * 创建cookie
   */
  set(name:string,value?:string|KeyValues,options?:ICookieOptions):void;

  /**
   * 获取cookie
   * @param name 名称，如果不传，返回所有
   */
   get(name?:string):string;

  /**
   * 获取cookie
   * @param name 名称，如果不传，返回所有（返回JSON对象）
   */
  getJSON(name?:string):KeyValues;


  /**
   * 如果值设置了路径，那么不能用简单的delete方法删除值，需要在delete时指定路径
   * 注意，删除不存在的cookie不会报错也不会有返回
   * @param name 名称
   * @param options
   */
   remove(name?:string,options?:ICookieOptions):void;

}

class CookiesImp implements ICookie{

  #jsCookies: any = null;

  constructor(jsCookies:any){
    this.#jsCookies = jsCookies;
  }

  set(name: string, value?: string | KeyValues, options?: ICookieOptions): void {
    this.#jsCookies.set(name,value,options);
  }
  get(name?: string): string {
    return this.#jsCookies.get(name);
  }
  getJSON(name?: string): KeyValues {
    return this.#jsCookies.get(name);
  }
  remove(name?: string, options?: ICookieOptions): string {
    return this.#jsCookies.remove(name);
  }

}

export function  set(name:string,value:string|KeyValues,options?:ICookieOptions):void{
  JSCookies.set(name,value,options);
}

export function  get(name?:string):string|undefined|{[key:string]:string}{
  if(name){
    return JSCookies.get(name);
  }
  return JSCookies.get();
}

export function getJSON(name?:string):any{
  if(name){
    return JSCookies.getJSON(name);
  }
  return JSCookies.getJSON();
}

export function remove(name:string,options?:ICookieOptions):void{
  if(options){
    return JSCookies.remove(name,options);
  }
  return JSCookies.remove(name);
}

export function withConverter(options:CookieConverter):ICookie{
  const ops:any = {};
  if(options.read){
    ops.read = (value:any,name:string)=>{
      return options.read(value,name);
    };
  }
  if(options.write){
    ops.write = (value:any,name:string)=>{
      return options.write(value,name);
    };
  }
  return new CookiesImp(JSCookies.withConverter(ops))
}