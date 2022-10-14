import { IAppContext } from "../../../../src/app";
import {setLocale,useI18n}  from  '../../../../src/lang';
import {useAuth} from  '../../../../src/auth';

export default{

  beforeCreate(appConfig:any):void{
    // console.log("beforeCreate:",appConfig);
    appConfig.aaa = "aaaa";
  },

  created(appContext:IAppContext){
    setLocale('en_US');
    useI18n({
      messages:{
        en_US:{
          "login":{
            "title":"login in1",
            "info":"hello world"
          }
        }
      }
    });
  },
  mounted(appContext:IAppContext):void{
  }
  // /**
  //  * app卸载
  //  * @param appContext 上下文
  //  */
  // unmounted(appContext:IAppContext):void{
  //   console.log("unmounted:");
  // }
}