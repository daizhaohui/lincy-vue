<template>
    <div class="title">{{title}}</div>
</template>

<script lang="ts">

import { reactive,toRefs,defineComponent} from '../../../../../src';


  export default defineComponent({
    setup() {
      const state = reactive({
        title:'hello'
      });

      return { 
        ...toRefs(state)
      }
    }
  })
</script>

<style lang="less" scoped>
.title{
  color:blue;
  font-size: 10px;
}

</style>
