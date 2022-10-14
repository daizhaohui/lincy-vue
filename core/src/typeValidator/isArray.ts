
export default function isArray(value:any):boolean{
  return Object.prototype.toString.call(value) === '[object Array]';
};