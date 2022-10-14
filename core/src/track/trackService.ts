import {IAppContext} from '../types/app';
import {TrackEventType,TrackDefineType} from '../track';
import { ITrackEventArgument, SaveTrackDataFuncParams } from '../types/track';
import {ITrackConfig,ITrackPlugin,ITrackService,ITrackDefine} from '../types/track';
import Logger from '../utils/internal/logger';
import isFunction from '../typeValidator/isFunction';
import isArray from '../typeValidator/isArray';
import isString from '../typeValidator/isString';
import isPlainObject from '../typeValidator/isObject';
import 'intersection-observer';

const TrackCacheKey = '__cache_track__';
const storage = window.localStorage;
const MaxRetryCount = 3;


const  hasClick = (eventType:TrackDefineType):boolean=>{
  return eventType === TrackDefineType.Click || eventType === TrackDefineType.ClickExposure || eventType === TrackDefineType.ClickAway ||
  eventType === TrackDefineType.ClickExposureAway;
};

const  hasExposure = (eventType:TrackDefineType)=>{
  return eventType === TrackDefineType.Exposure || eventType === TrackDefineType.ClickExposure || eventType === TrackDefineType.ExposureAway ||
  eventType === TrackDefineType.ClickExposureAway;
};

const  hasAway = (eventType:TrackDefineType)=>{
  return eventType === TrackDefineType.Away || eventType === TrackDefineType.ExposureAway || eventType === TrackDefineType.ClickAway ||
  eventType === TrackDefineType.ClickExposureAway;
};

const parseData = (trackDefine:ITrackDefine,data:any):any=>{
  let newData = data;
  if(newData && isFunction(newData)){
    newData = data();
  }
  if(newData && isPlainObject(newData)){
    return newData;
  }
  if(isString(newData)){
    newData = newData.split('|');
  }
  if(isArray(newData) && trackDefine.parmaMap){
    const d:any= {};
    newData.forEach((item:any,index:number)=>{
      if(trackDefine.parmaMap[index]){
        d[trackDefine.parmaMap[index]] = item;
      }else {
        d[index] = item;
      }
    });
    return d;
  }
  return null;
}

export default class TrackService implements ITrackService{

  #cache:any[] = [];
  #config:any = null;
  #plugin: any = null;
  #timer: any = null;
  #stopTimer:boolean = false;
  #defines = new Map();
  #observer:any = null;
  #retryCount = 0;
  #trackDataMap = new Map();
  #clickMap = new Map();
  #visibleMap = new Map();

  constructor(plugin:ITrackPlugin,config:ITrackConfig){
    this.#config = config;
    this.#plugin = plugin;
    config.defines.forEach((define:ITrackDefine)=>{
      this.#defines.set(define.id+'',define);
    });
  }

  addObserver(el:any){
    if(!this.#observer){
      this.#observer = new IntersectionObserver((entries, observer)=> {
        entries.forEach((entry) => {
          const e:any = entry.target as any;
          const exposure =  e.dataset.__exposure__ || '';
          const trackId = e.dataset.__trackId__;
          const dataId = e.dataset.__dataId__;
          const trackDefine = this.getTrackDefine(trackId);
          let trackItemData:SaveTrackDataFuncParams;
          // 出现在视窗中
          if (trackDefine && entry.isIntersecting) {
            this.#visibleMap.set(dataId,true);
            // 获取参数
            if(exposure!=="1"){
              e.dataset.__exposure__ = "1";
              if(hasExposure(trackDefine.eventType)){
                trackItemData = this.createTrackItemData(e,TrackEventType.Exposure);
                this.saveTrackData([trackItemData]);
                this.onExposure({
                  id:trackItemData.trackData,
                  data:trackItemData.trackData,
                  define:trackItemData.trackDefine,
                  eventType:trackItemData.trackEventType
                });
              }
            }
          } else {
            this.#visibleMap.set(dataId,false);
            if(trackDefine && exposure==="1"){
              e.dataset.__exposure__ = "0";
              if(hasAway(trackDefine.eventType)){
                trackItemData = this.createTrackItemData(e,TrackEventType.Away);
                this.saveTrackData([trackItemData]);
                this.onAway({
                  id:trackItemData.trackData,
                  data:trackItemData.trackData,
                  define:trackItemData.trackDefine,
                  eventType:trackItemData.trackEventType
                });
              }
            }
          }
        });
      });
    }
    this.#observer.observe(el);
  }

  track(trackId:string,trackEventType:TrackEventType,trackData:any):void{
    const trackDefine = this.getTrackDefine(trackId);
    if(trackDefine){
      const d = parseData(trackDefine,trackData);
      if(d){
        this.saveTrackData([{
          trackEventType,
          trackId,
          trackDefine,
          trackData
        }]);
      }
    }
  }

  trigAway(el:any){
    const trackId = el.dataset.__trackId__;
    const trackDefine = this.getTrackDefine(trackId);
    if(trackDefine && hasAway(trackDefine.eventType)){
      const dataId = el.dataset.__dataId__;
      const  isTrackable = dataId ? this.#visibleMap.get(dataId) : true;
      if(isTrackable){
        const trackItemData = this.createTrackItemData(el,TrackEventType.Away);
        this.saveTrackData([trackItemData]);
        this.onAway({
          id:trackItemData.trackData,
          data:trackItemData.trackData,
          define:trackItemData.trackDefine,
          eventType:trackItemData.trackEventType
        });
      }
    }
  }

  createTrackItemData(el:any,trackEventType:TrackEventType):SaveTrackDataFuncParams{
    const trackId = el.dataset.__trackId__;
    const dataId = el.dataset.__dataId__;
    const trackDefine = this.getTrackDefine(trackId);
    const trackData = this.#trackDataMap.get(dataId);
    if(trackDefine){
      return {
        trackId,
        trackData,
        trackDefine,
        trackEventType
      }
    }
    throw new Error(`trackId:${trackId}配置不存在`)
  }

  addClick(el:any):void{
    const handleClick = ()=>{
      const trackItemData = this.createTrackItemData(el,TrackEventType.Click);
      this.saveTrackData([trackItemData]);
      this.onClick({
        id:trackItemData.trackData,
        data:trackItemData.trackData,
        define:trackItemData.trackDefine,
        eventType:trackItemData.trackEventType
      });
    };
    const dataId = el.dataset.__dataId__;
    this.#clickMap.set(dataId,handleClick);
    el.addEventListener('click', handleClick);
  }

  unObserve(el:any){
    const define = this.getTrackDefine(el.dataset.__trackId__);
    const dataId = el.dataset.__dataId__;
    if(!define) return;
    if(hasClick(define.eventType)){
      this.#trackDataMap.delete(dataId);
      this.#visibleMap.delete(dataId);
      el.removeEventListener('click',this.#clickMap.get(dataId));
    }
    if(hasExposure(define.eventType)||hasAway(define.eventType)){
      this.#trackDataMap.delete(dataId);
      this.#visibleMap.delete(dataId);
      this.#observer.unobserve(el);
    }
  }

  observe(el:any,trackId:string,dataId:string,data:any): void {
    const trackDefine = this.getTrackDefine(trackId);
    if(!trackDefine) return;
    const trackData = parseData(trackDefine,data);
    if(hasClick(trackDefine.eventType)){
     this.#trackDataMap.set(dataId,trackData);
     this.addClick(el);
    }
    if(hasExposure(trackDefine.eventType)||hasAway(trackDefine.eventType)){
      this.#trackDataMap.set(dataId,trackData);
      this.addObserver(el);
    }

  }

  getTrackDefine(id: string): ITrackDefine | null {
    return this.#defines.get(id) as ITrackDefine;
  }

  addItemsToCache(items:SaveTrackDataFuncParams[]):void{
    this.#stopTimer = true;
    items.forEach(item=>{
      this.#cache.push(item);
    });
    this.#stopTimer = false;
  }

  saveDataByPlugin(items:SaveTrackDataFuncParams[],callback?:any):void{
    this.#plugin.saveTrackData(items,(res:any)=>{
      // 数据上报失败处理:三次保存失败，将不保存数据
      if(!res){
        this.#retryCount += 1;
        if(this.#retryCount<=MaxRetryCount){
          this.addItemsToCache(items);
        }
      }
      if(callback) callback(res);
    });
  }

  saveTrackData(items:SaveTrackDataFuncParams[],callback?:any):void{
    if(this.#config.saveTrackData.isDefault===true){
      if(this.#config.saveTrackData.timeInterval<=0){
        this.saveDataByPlugin(items,callback);
      }
      // 放入缓存
      else {
        this.addItemsToCache(items);
      }
    }
  }
  onClick(e:ITrackEventArgument):void{
    if(this.#plugin && this.#plugin.onClick){
      this.#plugin.onClick(e);
    }
  }

  onExposure(e:ITrackEventArgument):void{
    if(this.#plugin && this.#plugin.onExposure){
      this.#plugin.onExposure(e);
    }
  }

  onAway(e:ITrackEventArgument):void{
    if(this.#plugin && this.#plugin.onAway){
      this.#plugin.onAway(e);
    }
  }

  onEnterTrack(context:IAppContext):void{
    if(this.#plugin && this.#plugin.onEnterTrack){
      this.#plugin.onEnterTrack(context);
    }
    // 框架默认上报机制
    if(this.#config.saveTrackData.isDefault){
      // 上报保存到本地的未上报的数据
      if(this.#config.saveTrackData.cacheToLocalStorage){
        const str = storage.getItem(this.#config.saveTrackData.cacheKey || TrackCacheKey);
        if(str){
          try{
            const items:any[] = JSON.parse(str);
            if(items && items.length>0){
              this.saveTrackData(items);
              storage.removeItem(this.#config.saveTrackData.cacheKey || TrackCacheKey);
            }
          }catch(e){
            Logger.warn(e);
          }
        }
      }
      // 使用框架上报数据，且定时上报时间不为0，为0表示立即上报不缓存
      if(this.#config.saveTrackData.timeInterval > 0){
        this.#timer = setInterval(()=>{
          if(this.#stopTimer===false){
            const items:any[] = this.#cache.splice(0,this.#config.saveTrackData.maxCacheItems);
            if(items.length>0){
              this.saveDataByPlugin(items);
            }
          }
        },this.#config.saveTrackData.timeInterval);
      }
    }
  }

  onLeaveTrack(context:IAppContext):void{
    if(this.#plugin && this.#plugin.onLeaveTrack){
      this.#plugin.onLeaveTrack(context);
    }
    if(this.#observer){
      this.#observer.disconnect();
    }
    if(this.#timer){
      clearInterval(this.#timer);
    }
     // 如果cache中还有数据，是否保存，以便下次启动的时候再恢复
     if(this.#config.saveTrackData.cacheToLocalStorage && this.#config.saveTrackData.isDefault && this.#cache.length>0){
       storage.setItem(this.#config.saveTrackData.cacheKey || TrackCacheKey,JSON.stringify(this.#cache));
     }
  }
}