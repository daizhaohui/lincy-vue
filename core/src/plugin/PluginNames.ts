

export default class PluginNames {

  static readonly Http : string = 'http';
  static readonly Router : string = 'router';
  static readonly App: string = 'app';
  static readonly Component: string = 'component'
  static readonly Track: string = 'track'

  static getNames():string[]{
    return [PluginNames.Http,PluginNames.Router,PluginNames.App,PluginNames.Component,PluginNames.Track];
  }

}