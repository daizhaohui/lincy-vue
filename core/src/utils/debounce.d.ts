declare type DebounceFunc = (...args:any[])=>void;

/**
 * 防止连续点击
 * @param func 要执行的函数
 * @param wait 等待的毫秒数
 * @param [immediate=true] 是否立即执行函数,如果不是，等待wait时间后执行。
 * @returns 返回一个包装传入的执行函数func后的新执行函数
 */
declare function debounce(this: any, func:DebounceFunc, wait:number, immediate:boolean):DebounceFunc;

export default  debounce;