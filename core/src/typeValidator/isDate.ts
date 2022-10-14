import getTag from './internal/getTag';
import isObjectLike from './internal/isObjectLike';

export default function isDate(value:any):boolean{
  return isObjectLike(value) && getTag(value) === '[object Date]';
}