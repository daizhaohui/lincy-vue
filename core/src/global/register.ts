import { Emitter } from '../types/emitter';
import Mitt from '../utils/internal/emitter';
import { IAppContext, ICreateAppOptions } from '../types/app';
import { IRouterService } from '../types/router';
import { IHttpService } from '../types/http';
import { ITrackService } from '../types/track';
import { IAuthService } from '../types/auth';
import { IStateService } from '../types/state';


function _init(){
  const win: any = window;
  let reg = win.__lincy_register__;
  if(!reg){
    win.__lincy_register__ = {};
    reg = win.__lincy_register__;
  }
  return reg;
}

 const  RegisterType = {
  Emitter:Symbol("Emitter"),
  Router: Symbol("Router"),
  AppContext: Symbol("AppContext"),
  AppOptions:Symbol("AppOptions"),
  Http:Symbol("Http"),
  Lang:Symbol("Lang"),
  Track:Symbol("Track"),
  Auth:Symbol("Auth"),
  Store:Symbol("Store"),
  State:Symbol("State"),
  StateMeta: Symbol("StateMeta"),
}

export default class Register {

  static EmptyObject = {};

  static set<T>(type:symbol,value:T){
    const reg = _init();
    Object.defineProperty(reg,type,{
      enumerable: false,
      writable: false,
      configurable: true,
      value
    })
  }

  static get<T>(type:symbol):T {
    const reg = _init();
    return reg[type] ? reg[type] as T : Register.EmptyObject as T;
  }

 static emitter():Emitter{
    let emitter = Register.get<Emitter>(RegisterType.Emitter);
    if(emitter===Register.EmptyObject){
      emitter = Mitt();
      Register.set<Emitter>(RegisterType.Emitter,emitter);
    }
    return emitter;
  }

  static appContext(instance?:IAppContext):IAppContext{
    let appContext = Register.get<IAppContext>(RegisterType.AppContext);
    if(instance){
      Register.set<IAppContext>(RegisterType.AppContext,instance);
      appContext = instance;
    }
    return appContext;
  }

  static appOptions(instance?:ICreateAppOptions):ICreateAppOptions{
    let ret = Register.get<ICreateAppOptions>(RegisterType.AppOptions);
    if(instance){
      Register.set<ICreateAppOptions>(RegisterType.AppOptions,instance);
      ret = instance;
    }
    return ret;
  }


  static routerService(instance?:IRouterService):IRouterService{
    let ret = Register.get<IRouterService>(RegisterType.Router);
    if(instance){
      Register.set<IRouterService>(RegisterType.Router,instance);
      ret = instance;
    }
    return ret;
  }

  static httpService(instance?:IHttpService):IHttpService{
    let ret = Register.get<IHttpService>(RegisterType.Http);
    if(instance){
      Register.set<IHttpService>(RegisterType.Http,instance);
      ret = instance;
    }
    return ret;
  }

  static lang(instance?:any):any{
    let ret = Register.get<any>(RegisterType.Lang);
    if(instance){
      Register.set<any>(RegisterType.Lang,instance);
      ret = instance;
    }
    return ret;
  }

  static track(instance?:ITrackService):ITrackService{
    let ret = Register.get<ITrackService>(RegisterType.Track);
    if(instance){
      Register.set<ITrackService>(RegisterType.Track,instance);
      ret = instance;
    }
    return ret;
  }

  static auth(instance?:IAuthService):IAuthService{
    let ret = Register.get<IAuthService>(RegisterType.Auth);
    if(instance){
      Register.set<IAuthService>(RegisterType.Auth,instance);
      ret = instance;
    }
    return ret;
  }


  static store(instance?:any):any{
    let ret = Register.get<any>(RegisterType.Store);
    if(instance){
      Register.set<any>(RegisterType.Store,instance);
      ret = instance;
    }
    return ret;
  }

  static stateService(instance?:IStateService):IStateService{
    let ret = Register.get<IStateService>(RegisterType.State);
    if(instance){
      Register.set<IStateService>(RegisterType.State,instance);
      ret = instance;
    }
    return ret;
  }

  static stateMeta(instance?:any):any{
    let ret = Register.get<any>(RegisterType.StateMeta);
    if(instance){
      Register.set<any>(RegisterType.StateMeta,instance);
      ret = instance;
    }
    return ret;
  }

}



