
import merge from '../utils/merge';
import DefaultAppConfig from './app.config';
export default class ConfigUtil{
  static create(config:any):any{
    return merge({},DefaultAppConfig,config);
  }
}