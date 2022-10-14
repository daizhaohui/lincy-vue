import routes from './config/routes';
import {TrackDefineType} from '../../../src/track'

export default {
  routes,
  lang:{
    locale: 'zh_CN'
  },
  track:{
    parmaMap:['c1','c2','c3'],
    saveTrackData:{
      // isDefault:true,
      maxCacheItems:3,
      timeInterval:600,
      cacheToLocalStorage:true,
      // cacheKey:'__cache_track__'
    },
    defines:[
      {
        id:1,
        eventType:TrackDefineType.Click,
      },
      {
        id:2,
        eventType:TrackDefineType.ClickExposure,
      },
      {
        id:3,
        eventType:TrackDefineType.ClickAway,
      },
      {
        id:4,
        eventType:TrackDefineType.ExposureAway,
      },
      {
        id:5,
        eventType:TrackDefineType.ClickExposureAway,
      }
    ]
  },
  extensions:{
    directives:["abc","def","hij"],
    utils:["a1","a2","a3"]
  },
  http:{
    baseUrl: '/api'
  },
  auth:{
  },
  state:{
  }
}