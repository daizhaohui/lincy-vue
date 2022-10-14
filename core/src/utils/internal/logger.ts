 export default class Logger {
  static error(...args:any[]) {
    if(__DEV__)
    {
      // tslint:disable-next-line:no-console
      console.error(args);
    }
  }
  static  warn(...args:any[]) {
    if(__DEV__){
      // tslint:disable-next-line:no-console
      console.warn(args);
    }
  }
  static  info(...args:any[]) {
    if(__DEV__){
      // tslint:disable-next-line:no-console
      console.info(args);
    }
  }
}
