import {IAuthService} from "../types/auth";
import Register from '../global/register';
import AuthService from '../auth/authService';
import auth from '../directives/auth';
import assign from '../utils/assign';


const AuthConfig = {
  autoSave: true, // 自动保存权限数据到localStorage
  storageKey: '__auth__', // 存储key
  defaultResourceType: 'func' // 默认的资源类型
};

function _authService(instance?:IAuthService):IAuthService{
  let ret = Register.auth();
  if(instance){
    Register.auth(instance);
    ret = instance;
  }
  return ret;
}

function init():IAuthService{
  let authService =  _authService();
  const appContext = Register.appContext();
  if(authService===Register.EmptyObject){
    // 注册权限服务
    authService = new AuthService(assign({},AuthConfig,appContext.config.auth||{}));
    _authService(authService);
    appContext.app.registerGlobalService('$auth',authService);
    // 注册指令
    appContext.app.directive(auth.name,auth.implement);
  }
  return authService;
}

const emitter = Register.emitter();
emitter.on('app_created',()=>{
  init();
});

export  function useAuth():IAuthService|null{
 return init();
}