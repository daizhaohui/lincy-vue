<template>
    <div class="track">
      <div class="title">{{title}}</div>
          <div>
             <a-button class="btn" @click="goBack"
                type="primary"
              >
                回退
              </a-button>
              <a-button class="btn" v-track:1="'w1|1|w1_1'"
                type="primary"
              >
                Waiting  
              </a-button>
              <a-button class="btn" v-track:2="'f1|2|f1_1'"
                type="primary"
              >
                For  
              </a-button>
              <a-button class="btn" v-track:3="'m1|3|m1_1'"
                type="primary"
              >
                Me  
              </a-button>
              <a-button class="btn" v-track:4="testTrack"
                type="primary" @click="test"
              >
                test
              </a-button>
          </div>
          <div class="scroll">
            <div  class="sbtn" 
                type="primary" 
            >
                s1
             </div>
            <div  class="sbtn" 
                type="primary" 
            >
               s2
             </div>
             <div  class="sbtn" 
                type="primary" 
            >
                s3
             </div>
             <div  class="sbtn" 
                type="primary" 
            >
                s4
             </div>
             <div  class="sbtn" 
                type="primary" 
            >
                s5
             </div>
             <div  class="sbtn" 
                type="primary"  v-track:5="'exposure5_6|4|exp_6'"
            >
                s6
             </div>

          </div>
    </div>
   
    
</template>

<script lang="ts">

import { reactive,toRefs,defineComponent,useRoute} from '../../../../../src';


  export default defineComponent({
    setup() {
      const state = reactive({
        title:'not found',
        visible: true
      });

      const testTrack = {
        a1: 'a1_1',
        b1: 'b1_1'
      }

      const route = useRoute();
      console.log('parmas:',route.params);

      return { 
        ...toRefs(state),
        testTrack
      }
    },
    methods:{
      goBack(){
        this.$router.push('home');
      },
      test(){
        this.visible = false;
      }
    }
  })
</script>

<style lang="less" scoped>
.track{
  .title{
    color:red;
    font-size: 10px;
  }
  .btn{
    margin-left: 20px;
  }
  .sbtn{
    margin-top: 30px;
    height: 60px;
    width: 120px;
    background: blue;
    color: white;
    text-align: center;
    margin-left: 20px;
  }
  .scroll{
    margin-top: 60px;
    width: 300px;
    height:400px;
    overflow: auto;
  }

}



</style>