export default{
  saveTrackData(params:any,callback:any):void{
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(params));
    // tslint:disable-next-line:no-unused-expression
    callback && callback(true);
  }
}