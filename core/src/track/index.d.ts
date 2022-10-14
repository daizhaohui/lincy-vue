export enum TrackEventType{
  // 点击
  Click = 1,
  // 曝光
  Exposure =2,
  // 离开（退出）
  Away=3,
}
/**
 * 记录埋点函数
 * @param trackId 埋点唯一标识
 * @param eventType 触发埋点事件类型
 * @param data 
 */
export declare function track(trackId:string,eventType:TrackEventType,data:any):void;