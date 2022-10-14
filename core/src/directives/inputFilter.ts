const Types = {
  Int:'Int',
  Price: 'Price',
  Letter: 'Letter',
  LowerLetter: 'LowerLetter',
  UpperLetter: 'UpperLetter',
  IntLetter:'IntLetter',
  Custom:'Custom',
  NoSpecial:'NoSpecial',
  NoCustom:'NoCustom'
};

const keypressGenerateId = ((id) => () => '$' + id++)(1);
const keypresHandlers:any = {};


const findInputDom = (el:any):any=>{
  let result;
  if(el.tagName === "INPUT"){
    result = el;
    return result;
  }
  let i;
  let len;
  len = el.children.length;
  for(i=0;i<len;i++){
    if(el.children[i].tagName === "INPUT"){
      result = el.children[i];
      return result;
    } else if(el.children[i]&&el.children[i].length>0){
      result = findInputDom(el.children[i]);
      if(result) return result;
    }
  }
  return result;
};

const  getRe = (arg:string,value:string):any=>{
  if(arg===Types.Int){
     return /\d/;
  }
  else if(arg===Types.IntLetter){
    return /[0-9a-zA-Z]/;
  }
  else if(arg===Types.Price){
    return /[0-9.]/;
  }
  else if(arg===Types.Letter){
    return /[a-zA-Z]/;
  }
  else if(arg===Types.LowerLetter){
    return /[a-z]/;
  }
  else if(arg===Types.Custom){
    return value!==undefined ? RegExp(`[${value}]`):null;
  }
  else if(arg===Types.UpperLetter){
    return /[A-Z]/;
  } else if(arg===Types.NoSpecial){
    return new RegExp("[^`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  }
  else if(arg===Types.NoCustom){
    return value!==undefined ?  new RegExp(`[^${value}]`) : null;
  }
  return null;
};

const validate = (arg:string,e:any,inputCode:string,value:number):boolean=>{
  if(arg===Types.Price){
    if(inputCode==='.' && e.value.indexOf('.')>=0) return false;
    else if (inputCode==='.' && (e.value+inputCode).indexOf('.')===0) return false;
    else if (inputCode!=='.' && value && e.value.indexOf('.')>0 && e.value.split('.')[1].length>=value) return false;
    return true;
  } else {
    if(value && e.value.length>=value) return false;
    return true;
  }
};


const  onKeypress = (el:any,binding:any)=>{
  const { arg,value} = binding;
  const re = getRe(arg,value);
  if(!re) return null;
  return (e:any) => {
    e = e || window.event;
    const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
    const s = String.fromCharCode(charcode);
    if (!(re.test(s)&&validate(arg,el,s,value)) && charcode > 9 && !e.ctrlKey) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
  }
};

export default {
  name: 'input-filter',
  implement:{
    created(el:any,binding:any) {
      const inputDom = findInputDom(el);
      const keypress = onKeypress(inputDom,binding);
      if(inputDom && keypress){
        const id = keypressGenerateId();
        el.dataset.handleid = id;
        keypresHandlers[id]=keypress;
        inputDom.addEventListener("keypress",keypress);
      }
    },
    unmounted(el:any,binding:any){
      const inputDom = findInputDom(el);
      if(inputDom && el.dataset.handleid && keypresHandlers[el.dataset.handleid]){
        inputDom.removeEventListener("keypress",keypresHandlers[el.dataset.handleid]);
      }
    }
  }
}