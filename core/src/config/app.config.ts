//  默认配置
export default {
  state:{
    persisted: true,
    encrypted:true,
    storageKey:'__state__',
  },
  http:{
    // timeout:,
    // baseURL:'',
    // withCredentials:false,
    // auth:undefined,
    // headers:undefined
  },
  // 多语言配置
  lang:{
    locale: 'zh_CN', // set locale
    fallbackLocale: 'zh_CN', // set fallback locale
    datetimeFormats:{},
    numberFormats:{}
  },
  auth:{
    autoSave: true, // 自动保存权限数据到localStorage
    storageKey: '__auth__', // 存储key
    defaultResourceType: 'func' // 默认的资源类型
  },
  // 埋点
  track:{
    saveTrackData:{
      isDefault:true,
      maxCacheItems:10,
      timeInterval:1000,
      cacheToLocalStorage:false,
      cacheKey:'__cache_track__'
    },
    defines:[]
    // parmaMap:['c1','c2','c3'],
    // defines:[
    //   {
    //     id:1,
    //     eventType:1,
    //   },
    //   {
    //     id:2,
    //     eventType:1,
    //   },
    //   {
    //     id:3,
    //     eventType:1,
    //   }
    // ]
  }
}