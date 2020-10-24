<template>
  <div>
      <van-card v-for=" (item,index) in stayform" :key="index"
  num="2"
  :price="item.sprice"
  :desc="item.sdesc"
  :title="item.sname"
  :thumb="IMGURL+item.sthumb"
>
  <template #tags>
    <van-tag plain type="danger"></van-tag>
    <van-tag plain type="danger">{{item.stag}}</van-tag>
  </template>
  <template #footer>
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </template>
</van-card>
  </div>
</template>

<script>
import {userCollection} from '@/http/homestay.js'
import { Card } from 'vant';
import {IMGURL} from "@/lib/base.js"

export default {
name:"collection",
components:{
    'van-card':Card,
},
methods:{
    initCollection(){
    let collection= this.$route.query.collection;
     console.log(collection);
     if(collection.length>0){
           let collection1 = collection.map(item=>{
        return +item;
    })
      console.log(collection1)
      userCollection({collection1}).then(res=>{
          console.log(res);
           this.stayform = res.data
          
      }).catch(error=>{
          console.log(error)
      })
     }    
   
    },
},
data(){
 return{
     collection:[],
     stayform:[],
     IMGURL
 }
},
mounted(){
    this.initCollection()
}
}
</script>

<style>

</style>