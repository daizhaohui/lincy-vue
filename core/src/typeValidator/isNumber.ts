import getTag from './internal/getTag';
import isObjectLike from './internal/isObjectLike';

export default function isNumber(value:any):boolean{
  return typeof value === 'number' ||
    (isObjectLike(value) && getTag(value) === '[object Number]')
}