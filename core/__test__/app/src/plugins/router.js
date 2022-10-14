
export default{
  
  beforeEach(to,from){
    if (to.matched.length ===0) {  //如果未匹配到路由
     return {name:'notFound'};
    } 
    return true;
  },

  beforeResolve(to,from){
    console.log('beforeResolve: common');
    return true;
  },

  afterEach(to,from,failure){
    console.log('afterEach: common');
  },

  onError(handler){
    console.log('onError: common');
  }
}