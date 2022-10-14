import { IAppContext } from "./app";

export  declare enum TrackEventType{
  Click = 1,
  Exposure =2,
  Away=3,
};

export  declare enum TrackDefineType{
  Click = 1,
  Exposure =2,
  Away=3,
  ClickExposure=4,
  ClickAway=5,
  ExposureAway=6,
  ClickExposureAway=7
};

export  declare type SaveTrackDataFunc = (parmas:SaveTrackDataFuncParams[],callback:(result:any)=>void)=>void;
export  declare type OnObserveEvent = (e:ITrackEventArgument)=>void;
export  declare type TrackEvent = (context:IAppContext)=>void;

export   declare interface ITrackPlugin{
  saveTrackData?:SaveTrackDataFunc;
  onClick?:OnObserveEvent;
  onExposure?:OnObserveEvent;
  onAway?:OnObserveEvent;
  onEnterTrack?:TrackEvent;
  onLeaveTrack?:TrackEvent;
}

export  declare interface ITrackEventArgument{
  id:string,
  eventType:TrackEventType,
  define:ITrackDefine,
  data:any
}

export interface SaveTrackDataFuncParams {
  trackId:string,
  trackEventType:TrackEventType,
  trackDefine:ITrackDefine,
  trackData:any
}

export   declare interface ISaveTrackDataConfig{
  isDefault?:boolean,
  maxCacheItems?:number,
  timeInterval?:number,
  cacheToLocalStorage:boolean,
}

export   declare interface ITrackConfig{
  paramMap?:string[],
  defines:ITrackDefine[],
  saveTrackData?:ISaveTrackDataConfig
}

export  interface ITrackDefine{
  id:string,
  eventType:TrackDefineType,
  parmaMap:string[],
  [key:string]:any
}

export  declare interface ITrackService{
  saveTrackData?:SaveTrackDataFunc;
  onClick?:OnObserveEvent;
  onExposure?:OnObserveEvent;
  onAway?:OnObserveEvent;
  onEnterTrack?:TrackEvent;
  onLeaveTrack?:TrackEvent;
  getTrackDefine(id:string):ITrackDefine|null;
  observe(el:any,trackId:string,dataId:string,data:any):void;
  track(trackId:string,eventType:TrackEventType,data:any):void;
  unObserve(el:any):void;
  trigAway(el:any):void;
}