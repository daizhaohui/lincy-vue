import getTag from './internal/getTag';

export default function isString(value:any):boolean{
  const type = typeof value
  return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getTag(value) === '[object String]')
}