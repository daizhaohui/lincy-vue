export  declare type EncDesCryptFunc = (value:string)=>string;
export  declare interface IStateService{
  encrypt(value:string):string;
  descrypt(value:string):string;
  setEnDesCrypt(encrypt:EncDesCryptFunc,descrypt:EncDesCryptFunc):void;
  getItem(key:string):any;
  setItem(key:string,value:string):void;
  removeItem(key:string):void;
}