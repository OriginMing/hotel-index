<template>
  <div>
      
<van-calendar v-model="show" type="range" @confirm="onConfirm"/>
  </div>
</template>

<script>
import { Calendar } from 'vant';
import 'vant/lib/calendar/style';
import store from "@/store/store.js"
export default {
name:"cala",
data(){
    return{
        show:true
    }
},
components:{
  'van-calendar':Calendar,
},
methods:{
 onConfirm(date){
   let [startTime,endTime]=date;
   
   let start = startTime.getMonth()+1+'.'+startTime.getDate(),
   end = endTime.getMonth()+1+'.'+endTime.getDate(),
   startDay =startTime.getDay(),
   endDay = endTime.getDay();
   
   this.$store.commit('setTime',{start,end,startDay,endDay});
   this.$router.back();
 }
}
}
</script>

<style>

</style>