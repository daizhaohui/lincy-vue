import {IPlugin} from '../types/plugin';
import axios from 'axios';
import {IHttpPlugin} from '../types/http';
import {IHttpService} from '../types/http';
import { createHttpService } from '../utils/internal/factory';

export default class HttpUtil {

   static Service: IHttpService  | null = null;

   static createHttp(plugin:IPlugin|null, appConfig:any) : IHttpService{
     if(!HttpUtil.Service){
      const httpPlugin: IHttpPlugin|null = plugin?plugin.instance as IHttpPlugin:null;
      HttpUtil.Service = createHttpService(axios,appConfig,httpPlugin);
     }
     return HttpUtil.Service;
   }
}