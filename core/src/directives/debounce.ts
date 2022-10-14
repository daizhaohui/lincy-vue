import debounce from '../utils/debounce';


export default {
  name: 'debounce',
  implement:{
    created(el:any,binding:any) {
      let execFunc
      if(binding.value && Object.prototype.toString.call(binding.value) === '[object Array]'){
        // 函数传参
        const [func , time = 1000] = binding.value
        execFunc = debounce(func, time)
      }else{
        // 函数不传参
        execFunc = debounce(binding.value, 600)
      }
      el.addEventListener('click', execFunc)
    },
  }
}