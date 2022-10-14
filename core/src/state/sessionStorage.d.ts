/**
 * 会话存储
 */
declare class SessionStorage {

  /**
   * 获取json对象
   * @param key 存储的键值
   */
  static getJSON(key:string):any;
  /**
   * 获取存储值
   * @param key 
   */
  static get(key:string):any;
  /**
   * 存储值
   * @param key 存储的键值
   * @param value 储存值，为对象将调用JSON.stringfy进行后再存储
   */
  static set(key:string,value:any):void;
  /**
   * 移除存储值
   * @param key 存储的键值
   */
  static removeItem(key:string):void;
  /**
   * 清空本地存储
   */
  static clear():void;
}

export default SessionStorage;