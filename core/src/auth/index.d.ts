declare interface IAuthService{
  /**
   * 是否有指定的操作权限
   * @param resourceID  资源唯一标识
   * @param authority  操作权限，默认为1
   * @param resourceType  资源类型，默认为init方法指定的defaultType
   */
  has(resourceID:string,authority?:number,resourceType?:string):boolean;
  /**
   * 获取有指定操作权限权限的某种资源
   * @param resourceType 资源类型，默认为init方法指定的defaultType
   * @param authority  操作权限，默认为1
   */
  get(resourceType?:string,authority?:number):string[];
  /**
   * 添加资源权限
   * @param data  资源权限集合
   */
  add(data:IResourceAuthority[]):void;
  /**
   * 创建一个资源权限
   * @param resourceID 资源唯一标识
   * @param authority 操作权限，默认为1
   * @param resourceType 资源类型，默认为init方法指定的defaultType
   */
  create(resourceID:string,authority?:number,resourceType?:string):IResourceAuthority;
  /**
   * 清除权限数据
   */
  clear();

}

/**
 * 对某种资源类型下的某个资源具有什么样的权限
 */
 declare interface IResourceAuthority {
  /**
   * 资源类型
   */
  resourceType:string;
  /**
   * 资源唯一标识
   */
  resourceID:string;
  /**
   * 资源访问的权限，通常1表示有权限,0表示没有权限
   */
  authority?:number;
}

 /**
  * 获取权限服务
  */
declare function useAuth():IAuthService|null;

export default useAuth;