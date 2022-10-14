function isObject(obj:any):boolean{
  return Object.prototype.toString.call(obj) === '[object Object]'
}

//  对象深层次合并
export default function merge(target:any,...args:any[]):any{
  return args.reduce((acc:any, cur:any) => {
    return Object.keys(cur).reduce((subAcc:any, key:any) => {
      const srcVal = cur[key]
      if (isObject(srcVal)) {
        subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
      } else if (Array.isArray(srcVal)) {
        // series: []，下层数组直接赋值
        subAcc[key] = srcVal.map((item:any, idx:number) => {
          if (isObject(item)) {
            const curAccVal = subAcc[key] ? subAcc[key] : []
            return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
          } else {
            return item
          }
        })
      } else {
        subAcc[key] = srcVal
      }
      return subAcc
    }, acc)
  }, target);
}