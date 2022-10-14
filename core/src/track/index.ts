import Register from '../global/register';
import TrackUtil from './trackUtil';
import { TrackEventType, TrackDefineType } from '../types/track';


const emitter = Register.emitter();
emitter.on('app_created',()=>{
  TrackUtil.init();
});

const track = (trackId:string,eventType:TrackEventType,data:any)=>{
  const trackService = TrackUtil.init();
  return trackService && trackService.track(trackId,eventType,data);
};

export {
  track,
  TrackDefineType,
  TrackEventType
}