<template>
<div>
    <router-view class="router-view">
    
    </router-view>
</div>
</template>

<script>

import { reactive, toRefs,getCurrentInstance } from '../../../src';

  export default {
    setup() {
      const state = reactive({
        title:'首页'
      })
      return { 
        ...toRefs(state),
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
html, body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.title{
  color: red;
  font-size: 20px;
}

.router-view{
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
}
</style>