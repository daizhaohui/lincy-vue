import {IAuthService,IResourceAuthority,AuthConfig} from "../types/auth";
import isNumber  from '../typeValidator/isNumber';
import Register from '../global/register';
import LocalStorage from '../state/localStorage';

const emitter = Register.emitter();
export default class AuthService implements IAuthService{

  #data:any;
  #defaultType:string;
  #config:AuthConfig;

  constructor(authConfig:AuthConfig){
    this.#config = authConfig;
    this.#defaultType = authConfig.defaultResourceType || 'func';
    this.#data = {};
    emitter.on('app_mount',()=>{
      // 从localstorage 恢复数据
      if(this.#config.autoSave){
        const data = LocalStorage.getJSON(this.#config.storageKey);
        if(data){
          this.#data = data;
        }
      }
    });
  }

  has(resourceID: string, authority?: number,resourceType?: string): boolean {
    const resType = resourceType ? resourceType : this.#defaultType;
    const auth =  isNumber(authority) ? authority : 1;
    const rt = this.#data[resType];
    return rt && rt[resourceID] && rt[resourceID].includes(auth) ? true : false;
  }
  get(resourceType?: string, authority?: number): string[] {
    const resType = resourceType ? resourceType : this.#defaultType;
    const auth =  isNumber(authority) ? authority : 1;
    const rt = this.#data[resType];
    const ret:string[] = [];
    let k:string;
    for(k in rt){
      if(rt[k].includes(auth)) ret.push(k);
    }
    return ret;
  }

  add(data: IResourceAuthority[]):void{
    let i;
    let len;
    let rauth;
    let auth;
    let resType;
    len = data.length;
    for(i=0;i<len;i++){
      rauth = data[i];
      resType = rauth.resourceType || this.#defaultType;
      if(!this.#data[resType]){
        this.#data[resType] = {};
      }
      if(!this.#data[resType][rauth.resourceID]){
        this.#data[resType][rauth.resourceID] = [];
      }
      auth = isNumber(rauth.authority) ? rauth.authority : 1;
      this.#data[resType][rauth.resourceID].push(auth);
    }
    // 自动保存
    if(this.#config.autoSave && Object.keys(this.#data).length>0){
      LocalStorage.set(this.#config.storageKey,JSON.stringify(this.#data));
    }
  }

  create(resourceID:string,authority?:number,resourceType?:string):IResourceAuthority{
    return {
      resourceID,
      resourceType: resourceType || this.#defaultType,
      authority: isNumber(authority)? authority :  1
    };
  }

  clear(){
    this.#data = {};
    // 清除本地缓存
    LocalStorage.removeItem(this.#config.storageKey);
  }
}