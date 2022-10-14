import  Register from '../global/register';
import {IHttpService} from '../types/http';
import {Http} from './decorators';
import { HttpMethod,IUseHttp } from '../types/http';

const UseHttp = {
  getHttpService:():IHttpService=>{
    return Register.httpService();
  },
  Http,
  HttpMethod
};

export function useHttp(): IUseHttp{
  return UseHttp as IUseHttp;
}
