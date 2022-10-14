import isLength from './isLength';

export default function isArrayLike(value:any):boolean {
  return value != null && typeof value !== 'function' && isLength(value.length)
}
