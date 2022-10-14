declare type EncDesCryptFunc = (value:string)=>string;

/**
* 设置状态序列化的加密和解密函数
* @param encrypt 加密函数
* @param descrypt 解密函数
*/
export declare function setEnDesCrypt(encrypt:EncDesCryptFunc,descrypt:EncDesCryptFunc):void;
/**
 * 重置状态,
 * @param target 状态对象（类对象）
 * @param state 指定被重置后的状态值，不指定状态将被重置为初始化的状态值
 */
export declare function  reset(target:any,state?:any):void;
/**
* 类装饰器： 状态模块装饰器函数,设置状态类存储的数据节点名，@Module(name:string), name为状态模块名
*/
export declare  const Module:any;
/**
 * 方法装饰器：更新状态函数装饰器函数, 可以修改多个状态值 @Action()
*/
export declare  const Action:any;
/**
* 类和方法装饰器：数据状态持久化装饰器函数 @Persist()，应用在class上表示持久化类的所有@Observable属性, 在@Observable属性上只序列化该属性
*/
export declare  const Persist:any;
/**
 * 属性装饰器: 设定需要观察变化的属性 @Observable(默认值)
*/
export declare  const Observable:any;






