<template>
<div>
  <div class="avatar">
    <div class="avatar-img">
      <img alt="" src="../../assets/person-canter/头像.png">
    </div>
    <span class="miss-jia">桃子味贾小姐</span>
  </div>

  <div class="vip">
    <div class="vip-left">
      <img src="../../assets/person-canter/V.png" alt="">
      <router-link :to="{name:'collection',query:{collection:collection}}"> <span class="vip-center">我的收藏</span></router-link>
    </div>
    <span class="xiaozhu">五品小主 ></span>
  </div>
    <ul class="orders" style="dispaly:flex; justify-content: space-around;height:1rem,width:100%" v-if="ordersType.length">
        <li class="orderss" :class="{tap:search.field===item.field}" v-for="(item,index) in ordersType" :key="index" @click="chageOrderType(item.field)">
            <div><span>{{item.text}}</span></div>
           
        </li>      
    </ul>
<!--  <div class="list" v-if="stayform.length">
   <div class="list-item" v-for="(item,index) in stayform" :key="index">
       <div class="picture"> <img :src="IMGURL+item.sthumb" alt=""></div>
       <div><span>{{item.sname}}</span></div>
   </div>
 </div> -->
<div>
      <van-card v-for=" (item,index) in stayform" :key="index"
  num="2"
  :price="item.price"
  
  :title="item.sname"
  :thumb="IMGURL+item.sthumb"
>
  <template #tags>
    <van-tag plain type="danger"></van-tag>
 
  </template>
  <template #footer>
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </template>
</van-card>
  </div>
  
</div>
</template>

<script>
import { Card } from 'vant';
import {uesrCeneter,apiOrdersList} from "@/http/homestay.js";
import {IMGURL} from "@/lib/base.js"
/* import { component } from 'vue/types/umd'; */

export default {
name: "index",
methods:{
  init(){
     uesrCeneter().then(res=>{
      console.log(res);
      this.collection = res.data.collection.split(',')
      console.log( this.collection)
  }).catch(error=>{
    console.log(error)
  })
  }
 ,
 chageOrderType(cuu){
     this.search.field=cuu;
     this.initOrder();
    },
  initOrder(){
    let params=Object.assign({},this.search);
    apiOrdersList(params).then(res=>{
      console.log(res)
      this.stayform=res.data
    }).catch(error=>{
      console.log(error)
    })
  }
},
mounted(){
  this.init();
  this.initOrder();
},
data(){
  return {
         collection:[],
         ordersType:[
            {field:0,text:"全部"},
            {field:3,text:"一万还曾"},
            {field:2,text:"带入住"},
            {field:1,text:"未付款"}
        ],
         orders:[],
         paginate:{
            page:1,
            limit:5
        },
         search:{
            field:1
        },
         stayform:[],IMGURL
  }
},
components:{
    'van-card':Card,
     
},
}
</script>

<style scoped >
@import "../../style/index.css";
@import "~u-reset.css";
/* @import "http://at.alicdn.com/t/font_1918186_g4gj1q8o1cl.css"; */
@import "../order-list/info.css";
.tap{
    color: red;
   
}
.list{
 margin: 0.2rem 0.5rem;
 height: 2.28rem;
}
.picture{
  float: left;
  height: 2.0rem;
  width: 2.25rem;
  margin-right: 0.5rem;

}
.picture img{
  width: 100%;
  height: 100%;
}
</style>
<style  scoped>

.avatar {
    width: 100%;
    height: 3.53rem;
    position: relative;
}

.avatar-img {
    position: absolute;
    top: 1.53rem;
    left: 3.07rem;
    width: 1.38rem;
    height: 1.38rem;
    border: 0.04rem solid #ececec;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-img img{
    width: 1.3rem;
    height: 1.3rem;
}

.miss-jia {
    width: 1.97rem;
    height: 0.5rem;
    font-size: 0.32rem;
    position: absolute;
    left: 2.76rem;
    bottom: -0.2rem;
    display: block;
}

.vip {
    display: flex;
    flex-direction: row;
    width: 6.38rem;
    height: 0.55rem;
    background-color: #3e3e3e;
    border-radius: 0.1rem 0.1rem 0rem 0rem;
    margin-left: 0.56rem;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.51rem;
    /* position: relative; */
}

.vip-left {
    display: flex;
    flex-direction: row;
}

.vip-left img {
    height: 0.25rem;
    width: 0.27rem;
    margin-left: 0.2rem;
    margin-top: 0.05rem;
}

.vip-left span {
    font-size: 0.26rem;
    letter-spacing: 0.01rem;
    color: #f9bc80;
    opacity: 0.85;
    width: 1.2rem;
    margin-left: 0.14rem;
}

.xiaozhu {
    font-size: 0.2rem;
    letter-spacing: 0.01rem;
    color: #fff;
    width: 1.25rem;
}

.my-orders {
    width: 6.38rem;
    height: 3.14rem;
    background-color: #fff;
    box-shadow: 0px 1px 30px 0px rgba(242, 242, 242, 0.75);
    border-radius: 8px;
    margin-top: 0.4rem;
    margin-left: 0.54rem;
}

.orders-top {
    height: 0.8rem;
    width: 5.98rem;
    /* background-color: royalblue; */
    margin-left: 0.2rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    border-bottom: 2px solid rgba(0, 0, 0, 0.03);
}

.orders-top span:nth-child(1) {
    font-size: 0.32rem;
    opacity: 0.85;
    letter-spacing: 0.01rem;
    color: #000000;
}

.orders-top span:nth-child(2) {
    font-size: 0.26rem;
    opacity: 0.4;
    color: #000000;
    letter-spacing: 0.01rem;
}

.orders-bottom {
    width: 5.98rem;
    height: 2.34rem;
    margin-left: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.orders-bottom-items {
    width: 1.06rem;
    height: 1.62rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.orders-bottom-items img {
    width: 1.06rem;
    height: 1.06erm;
}

.orders-bottom-items span {
    font-size: 0.26rem;
    opacity: 0.85;
    letter-spacing: 0.01rem;
    color: #000;
    text-align: center;
}
/* 
.bottom {
    width: 6.38rem;
    height: 3.55rem;
    margin-left: 0.56rem;
    margin-top: 0.85rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
} */

/* .bottom-items {
    width: 6.38rem;
    height: 0.3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.bottom-items-left {
    width: 1.02rem;
    height: 0.3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.bottom-redlight-aside {
    width: 0.15rem;
    height: 0.15rem;
    background-color: #eb666b;
    opacity: 0.2;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bottom-redlight-inner {
    width: 0.07rem;
    height: 0.07rem;
    border-radius: 50%;
    background-color: red;
}

.bottom-items-left span {
    font-size: 0.32rem;
    letter-spacing: 0.01rem;
    opacity: 0.8;
    color: #000;
}

.bottom-items-righttext {
    font-size: 0.32rem;
    color: #000000;
    opacity: 0.2;
    line-height: 0.3rem;
} */
</style>