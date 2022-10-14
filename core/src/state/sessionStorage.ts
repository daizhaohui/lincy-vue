export default class SeesionStorage{

  static getJSON(key:string):any{
    try
    {
      const item = sessionStorage.getItem(key);
      if(item){
        return JSON.parse(item);
      }else{
        return null;
      }
    }
    catch(err){
      return null;
    }
  }

  static get(key:string):any{
    return sessionStorage.getItem(key);
  }


  static set(key:string,value:any):void{
    if(Object.prototype.toString.call(value)==='[object Object]')
    {
      sessionStorage.setItem(key,JSON.stringify(value));
    } else {
      sessionStorage.setItem(key,value);
    }
  }


  static removeItem(key:string):void{
    sessionStorage.removeItem(key);
  }

  static clear():void{
    sessionStorage.clear();
  }


}