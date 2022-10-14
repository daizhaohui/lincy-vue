const toString = Object.prototype.toString
export default function getTag(value:any):string {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}