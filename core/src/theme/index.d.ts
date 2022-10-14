
  /**
   * 设置皮肤
   * @param  name 皮肤名称
   */
  export declare function setTheme(name:string):void;
  /**
   * 恢复默认皮肤(配置文件设置的默认皮肤)
   */
   export declare function resetTheme():void;
  /**
   * 获取配置中设置的默认皮肤
   */
   export declare function getDefaultTheme():string|null;
  /**
   * 清除皮肤（不使用皮肤样式）
   */
   export declare function clearTheme():void;
   /**
    * 是否有可用的皮肤
    */
  export function hasTheme():boolean;