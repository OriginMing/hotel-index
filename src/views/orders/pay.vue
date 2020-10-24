<template>
<div class="posi">
  <van-count-down :time="time">
  <template #default="timeData">

    <span class="block">{{ timeData.minutes }}</span>
    <span class="colon">:</span>
    <span class="block">{{ timeData.seconds }}</span>
  </template>
</van-count-down>
<van-button type="primary" @click="pay">主要按钮</van-button>
</div>
</template>

<script>
import { CountDown } from 'vant';
import { Button } from 'vant';
export default {
 name:"pay",
 components:{
     "van-count-down":CountDown,
     "van-button":Button
 },
   data() {
    return {
      time: 30 * 60 * 1000,
    };
  },
  methods:{
      pay(){
          console.log(this.$route.query);
          
      }
  }
}
</script>

<style>
  body
  .posi{
    height: 8rem;
    position: relative;

}
.van-count-down{
  position: absolute;
  width:4.7rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
} 
 
  .colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
    font-size: 0.5rem;
    
  }
  .block {
    display: inline-block;
    width: 2rem;
    height: 1.5rem;
    color: #fff;
    font-size: 0.5rem;
    text-align: center;
   line-height: 1.5rem;
    background-color: #ee0a24;
  }
</style>