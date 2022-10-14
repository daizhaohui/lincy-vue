import StateUtil from './stateUitl';
import {checkForError} from '../utils/internal/checkers';
import assign from '../utils/assign';
import Register from '../global/register';

const updateStateOfTargets = (name:string,target:any)=>{
  let stateMeta = StateUtil.stateMeta();
  if(stateMeta===Register.EmptyObject) {
    stateMeta = {};
  }
  if(!stateMeta[name]){
    stateMeta[name] = {
      targets:[]
    };
  }else{
    if(!stateMeta[name].targets){
      stateMeta[name].targets = [];
    }
  }
  if(stateMeta[name].targets.indexOf(target)===-1){
    stateMeta[name].targets.push(target);
  }
  StateUtil.stateMeta(stateMeta);
};

/**
 * 状态分组模块
 * @param name 分组模块名
 */
export function Module(name:string){
  checkForError(!name,"@module的参数不能为空(名称）");
  return (target:any, key:any, descriptor:any)=>{
    updateStateOfTargets(name,target);
    if(target.prototype.__module__===undefined){
      Object.defineProperty(target.prototype,'__module__',{
        enumerable: false,
        writable: false,
        configurable: false,
        value: name
      });
    }
    target.toString = ()=>{
      const store = StateUtil.store();
      const state = store && store.state[target.prototype.__module__] ? store.state[target.prototype.__module__] : assign({},target.prototype.__observables__);
      return JSON.stringify(state);
    };
    // 定义reset方法
    target.reset = (state:any)=>{
      const store = StateUtil.store();
      if(!store) return;
      const observables:any = target.prototype.__observables__;
      const newValue:any = {};
      Object.keys(observables).forEach(k=>{
        if(state && state.hasOwnProperty(k)){
          newValue[k] = state[key];
        } else {
          newValue[k] = observables[key];
        }
      });
      store.commit(`${target.prototype.__module__}/update`,newValue);
    };
    return descriptor;
  }
}

export function Observable(defaultValue:any){
  checkForError(defaultValue===undefined,"@Observable参数不能为空（默认值）");
  return (target:any, key:any, descriptor:any)=>{
    if(target.prototype.__observables__===undefined){
      Object.defineProperty(target.prototype,'__observables__',{
        enumerable: true,
        writable: false,
        configurable: false,
        value: {}
      });
    }
    target.prototype.__observables__[key] = defaultValue;
    return {
      enumerable: true,
      configurable: false,
      get():any{
        const store = StateUtil.store();
        const state = store && store.state[target.prototype.__module__] ? store.state[target.prototype.__module__] :target.prototype.__observables__;
        return state[key];
      },
      set(value:any){
        const store = StateUtil.store();
        if(!store) return;
        store.commit(`${target.prototype.__module__}/update`,{
          [key]: value
        });
      }
    }
  }
}

/**
 * 改变状态的动作
 */
export function Action(){
  return (target:any, key:string, descriptor:any)=>{
    descriptor.value = (...args:any[])=>{
      const ret = args[0];
      const observables:any = target.prototype.__observables__;
      const newValue:any = {};
      let changed:boolean = false;
      if(ret && Object.keys(ret).length){
        Object.keys(ret).forEach(k=>{
          if(observables.hasOwnProperty(k)){
            changed = true;
            newValue[k] = ret[k];
          }
        });
      }
      // 更新状态
      if(changed){
        const store = StateUtil.store();
        if(store){
          store.commit(`${target.prototype.__module__}/update`,newValue);
        }
      }
    }
    return descriptor;
  }
}

/**
 * 是否要进行持久化
 */
export function Persist(){
  return (target:any, key:any, descriptor:any)=>{
    if(target.prototype.__persists__===undefined){
      // Persist应用在类上，表示全部序列化
      if(!key && !descriptor){
        Object.defineProperty(target.prototype,'__persists__',{
          enumerable: false,
          writable: false,
          configurable: false,
          value: true
        });
      } else {
        Object.defineProperty(target.prototype,'__persists__',{
          enumerable: false,
          writable: false,
          configurable: false,
          value: [key]
        });
      }
    } else {
      if(target.prototype.__persists__!==true){
        target.prototype.__persists__.push(key);
      }
    }
    return descriptor;
  }
}