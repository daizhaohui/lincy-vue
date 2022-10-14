import TrackUtil from '../track/trackUtil';

export default {
  name: 'track',
  implement:{
    mounted(el:any,binding:any) {
      const trackId = binding.arg;
      const trackService = TrackUtil.trackService();
      if(trackId&&trackService){
        const dataId = TrackUtil.createID();
        el.dataset.__trackId__ = trackId;
        el.dataset.__dataId__ = dataId
        trackService.observe(el,trackId,dataId,binding.value);
      }
    },
    unmounted(el:any) {
      const trackService = TrackUtil.trackService();
      if(trackService){
        trackService.trigAway(el);
        trackService.unObserve(el);
      }
    },
  }
}