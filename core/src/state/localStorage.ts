
export default class LocalStorage{

  static getJSON(key:string):any{
    try
    {
      const item = localStorage.getItem(key);
      if(item){
        return JSON.parse(item);
      }
      return null;
    }
    catch(err){
      return null;
    }
  }

  static get(key:string):any{
    return localStorage.getItem(key);
  }


  static set(key:string,value:any):void{
    if(Object.prototype.toString.call(value)==='[object Object]')
    {
      localStorage.setItem(key,JSON.stringify(value));
    } else {
      localStorage.setItem(key,value);
    }
  }


  static removeItem(key:string):void{
    localStorage.removeItem(key);
  }

  static clear():void{
    localStorage.clear();
  }

}