import getTag from './internal/getTag';
import isObjectLike from './internal/isObjectLike';

export default function isBoolean(value:any):boolean {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) === '[object Boolean]')
}
