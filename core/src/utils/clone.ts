export default function cloneObject(obj:any){
  if(!obj || 'object' !== typeof obj){
    return obj;
  }
  const o:any = obj.constructor === Array ? [] : {};
  for(const i in obj){
    if(obj.hasOwnProperty(i)){
      o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
    }
  }
  return o;
}