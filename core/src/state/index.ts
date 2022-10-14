import { EncDesCryptFunc } from '../types/state';
import Register from '../global/register';
import StateUtil from './stateUitl';


const emitter = Register.emitter();
emitter.on('app_created',()=>{
  StateUtil.init();
});


export * from  './decorators';
export function  setEnDesCrypt(encrypt:EncDesCryptFunc,descrypt:EncDesCryptFunc){
  const service = StateUtil.init();
  return service && service.setEnDesCrypt(encrypt,descrypt);
}

export function reset(target:any,state?:any){
  if(target && target.reset){
    target.reset(state);
  }
}

