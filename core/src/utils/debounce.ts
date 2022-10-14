type Func = (...args:any[])=>void;

/**
 * 防止连续点击
 * @param func 要执行的函数
 * @param wait 等待的毫秒数
 * @param [immediate=true] 是否立即执行函数,如果不是，等待wait时间后执行。
 * @returns 返回一个包装传入的执行函数func后的新执行函数
 */
export default function debounce(this: any, func:Func, wait:number, immediate:boolean = true):Func{
  // 定义一个timeout计时器
  let timeout:any;
  return (...args:any[])=>{
    // 如果每次进入函数的时候timeout有值，说明等待时间还没有过，不执行函数，清空timeout
    // 如果没有timeout，则说明过了等待期，可以执行函数
    if(timeout) clearTimeout(timeout);
    // 默认立即执行方法，延后执行的话，会让人感觉有卡顿
    if(immediate){
      // 定义现在是否能执行
      const now = !timeout;
      if(now) func.apply(this, args);
      // 不论timeout有没有值，都重新给timeout新添加一个定时器
      // 等待wait时间后，将timeout设为null，代表可以继续执行次function
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
    }else{
      // 如果不是立即执行此函数，则在等待wait时间后执行方法
      timeout = setTimeout(()=>{
        func.apply(this, args)
      }, wait)
    }
  }
}