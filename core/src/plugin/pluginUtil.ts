import {IPlugin} from "../types/plugin";
import PluginName from './PluginNames';
import {IAppPlugin,ICreateAppOptions,IAppContext}from '../types/app';
import loadPlugins from './loadPlugins';
export default class PluginUtil {

    // 从构建中读取插件,来源于src/plugins目录下的
    static init(optoins:ICreateAppOptions){
      const plugins = loadPlugins();
      optoins.plugins = optoins.plugins || [];
      plugins.forEach((p:IPlugin)=>{
        if(!PluginUtil.findPlugin(p.name,optoins.plugins)){
          optoins.plugins.push(p);
        }
      });
    }


   static findPlugin(name:string,plugins: IPlugin[]): IPlugin | null{
     let i;
     let len;
     len = plugins.length;
     for(i=0;i<len;i++){
       if(name===plugins[i].name){
         return plugins[i];
       }
     }
     return null;
   }

   static trigAppEvent(name:string,appContext:IAppContext,options: ICreateAppOptions,){
    const plugin = PluginUtil.findPlugin(PluginName.App,options.plugins);
    const appPlugin: IAppPlugin | null = plugin && plugin.instance ? plugin.instance as IAppPlugin : null;
    if(appPlugin===null) return;
    if(name==='created' && appPlugin.created){
      appPlugin.created(appContext);
    }
    else if(name==='mounted' && appPlugin.mounted){
      appPlugin.mounted(appContext);
    }
    else if(name==='unmounted' && appPlugin.unmounted){
      appPlugin.unmounted(appContext);
    }
   }
}