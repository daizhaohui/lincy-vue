
export default function isObjectLike(value:any):boolean{
  return typeof value === 'object' && value !== null
}
