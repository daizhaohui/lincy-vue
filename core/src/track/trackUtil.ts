import {ITrackService,ITrackConfig, ITrackPlugin} from '../types/track';
import PluginUtil from '../plugin/pluginUtil';
import PluginNames from '../plugin/PluginNames';
import Register from '../global/register';
import trackDirective from '../directives/track';
import TrackService from '../track/trackService';

const UperLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];


function  _createTrackConfig(appConfig:any):ITrackConfig{
  if(appConfig.track.parmaMap){
    appConfig.track.defines.forEach((item:any)=>{
      if(!item.parmaMap){
        item.parmaMap = appConfig.track.parmaMap;
      }
    });
  }
  return appConfig.track;
}

export default class TrackUtil {

  static trackService(instance?:ITrackService):ITrackService{
    let ret = Register.track();
    if(instance===Register.EmptyObject){
      Register.track(instance);
      ret = instance;
    }
    return ret;
  }

  static createTrackService(trackPlugin:ITrackPlugin,config:ITrackConfig):ITrackService{
    return new TrackService(trackPlugin,config);
  }

  static createID(){
    let idvalue ='';
    for(let i=0;i<6;i++){
       idvalue+=UperLetters[Math.floor(Math.random()*26)];
    }
    return idvalue + Date.now().toString();
  }


  static init():ITrackService{
    let service = TrackUtil.trackService();
    const options = Register.appOptions();
    const appContext = Register.appContext();
     // 埋点:定义了保存埋点的接口才会启动埋点服务
    if(service===Register.EmptyObject) {
      const trackPlugin = PluginUtil.findPlugin(PluginNames.Track,options.plugins);
      if(trackPlugin && trackPlugin.instance.saveTrackData){
        service  =   TrackUtil.createTrackService(trackPlugin.instance,_createTrackConfig(options.appConfig));
        TrackUtil.trackService(service);
        // 注册track方法
        appContext.app.registerGlobalService('$track',service.track);
        // 注册指令
        appContext.app.directive(trackDirective.name,trackDirective.implement);
        if(service && service.onEnterTrack){
          service.onEnterTrack(appContext);
        }
        const emitter = Register.emitter();
        emitter.on('app_unmount',()=>{
          // 停止埋点上报
          if(service && service.onLeaveTrack){
            service.onLeaveTrack(appContext);
          }
        })
      }
    }
    return service;
  }
}