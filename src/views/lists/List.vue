<template>
<div  class="list-box">
   <ul class="nav">
     <li :class="{active:order.field === 'sid'}">综合<i class="iconfont icon-xiajiantou"></i></li>
     <li :class="{active:order.field === 'score'}">位置<i class="iconfont icon-xiajiantou"></i></li>
     <li :class="{active:order.field === 'ctime'}">时间<i class="iconfont icon-xiajiantou"></i></li>
     <li :class="{active:order.field === 'sprice'}">价格<i class="iconfont icon-xiajiantou"></i></li>
   </ul>
   <div class="list">
        <van-pull-refresh v-model="isPullrefresh" @refresh="handlerPullrefresh">
           <van-list v-model="isUpper" :finished="upperFinished" :immediate-check="false"	  @load="handlerUpper">
             <div class="mustsee-item">
               <img src="../../assets/logo.png" alt="" class="mustsee-img">
               <span class="hotelName">Jefferson Inn</span>
               <br>
               <span style="color: #999999">北京·朝阳区</span>
               <span style="color: #f8606a">RMB</span>
               <span style="" class="price">158.00</span>
               <span>每晚</span>
             </div>
           </van-list>
        </van-pull-refresh>
   </div>
</div>
</template>

<script>
import { PullRefresh , List } from 'vant';
import 'vant/lib/pull-refresh/style'
import 'vant/lib/list/style'
export default {
name: "List",
  components:{
     VanPullRefresh:PullRefresh,
     VanList:List
  },
  data(){
    return {
      isPullrefresh:false,
      isUpper:false,
      upperFinished:false,
      paginate:{
         page:0,
         limit:8
      },
      // 综合 sid , 位置score  时间 ctime 价格 sprice
      order:{
         field:'sid',
         type:'desc'
      },
      stayhome:[],
      total:0
    }
  },
  methods:{
     handlerPullrefresh(){

     },
     handlerUpper(){
       let
       apiList().then(res=>{

       })
     }
  },
  mounted() {
    this.handlerUpper()
  }
}
</script>

<style scoped>

</style>