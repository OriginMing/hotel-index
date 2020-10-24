<template>
  <div>
    <div class="center-picture">
      <div class="index-content" v-if="recommend">
        <div class="content-wrapp">
          <div class="content-img">
            <img style="width: 100%" :src="IMGURL + stayhome.sthumb" alt="" />
          </div>
          <div class="content-name" style="margin-top: 0.2rem">
            <span>{{ stayhome.sname }}</span>
          </div>
          <div class="content-area" style="font-size: 0.12rem; opacity: 0.6">
            <span>{{ stayhome.scity }}~{{ stayhome.sarea }}</span>
          </div>
          <div class="content-comment">
            <span
              ><van-rate
                :value="stayhome.score"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                size="0.25rem"
            /></span>
          </div>
          <div class="content-user">
            <div class="user-head">
              <span style="color: red">RMB </span
              ><span style="fontsize: 0.5rem">{{ stayhome.sprice }} </span
              ><span> 每晚</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-content" v-if="recommend">
      <div v-for="item of recommend" :key="item.sid" class="content-wrapp">
        <div class="content-img">
          <router-link :to="{ name: 'Details', query: { sid: item.sid } }"
            ><img :src="IMGURL + item.sthumb" alt=""
          /></router-link>
        </div>
        <div class="content-name" style="margin-top: 0.2rem">
          <span>{{ item.sname }}</span>
        </div>
        <div class="content-area" style="font-size: 0.12rem; opacity: 0.6">
          <span>{{ item.scity }}~{{ item.sarea }}</span>
        </div>
        <div class="content-comment">
          <span
            ><van-rate
              :value="item.score"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              size="0.25rem"
          /></span>
        </div>
        <div class="content-user">
          <div class="user-head">
            <span style="color: red">RMB </span
            ><span style="fontsize: 0.5rem">{{ item.sprice }} </span
            ><span> 每晚</span>
          </div>
        </div>
      </div>
    </div>
    <van-goods-action>
  
  <van-goods-action-icon icon="star-o" text="收藏" @click="onClickIcon" :class="{active:collection}" />
  <van-goods-action-icon icon="shop-o" text="店铺" />
  <van-goods-action-button
    type="danger"
    text="立即购买"
   @click="buy"
  />
</van-goods-action>
  </div>
</template>

<script>
import { detailAll,addCollection } from "@/http/homestay.js";
import { IMGURL } from "@/lib/base.js";
import { Rate } from "vant";

import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';

export default {
  name: "Details",
  data() {
    return {
      IMGURL,
      stayhome: null,
      recommend: [],
    };
  },
  components: {
    "van-rate": Rate,
    VanGoodsAction:GoodsAction, VanGoodsActionIcon:GoodsActionIcon, VanGoodsActionButton:GoodsActionButton,
    
  },
  methods: {
    init(sid) {
      detailAll(sid)
        .then((res) => {
          console.log(res);
          this.stayhome = res.data.stayhome;
          this.recommend = res.data.recommend;
          console.log(this.recommend);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buy(){
      
     let token = this.$store.state.token;
      if(!token){
        this.$router.push({name:"login",query:{redirect:this.$route.name,sid:this.stayhome.sid}})
      }else{
        this.$router.push({name:"orders",query:{sid:this.stayhome.sid}})
      }
     },
  
  onClickIcon(){
     let id = this.$route.query.sid;
     if(this.$store.state.token&&!this.$store.state.collection.some(item=>id==item)){
     let arrList = this.$store.state.collection;
     arrList.push(id);
     console.log(arrList)
     let uid = sessionStorage.getItem('uid');
     addCollection(uid,arrList).then(res=>{
       console.log(res)
   }).catch(error=>{
    console.log(error)
   })
   }
   else{
     this.$router.push({name:"login"})
   }
  }
  },
  watch: {
    $route() {
      let sid = this.$route.query.sid;
      this.init(sid);
    },
  },
  mounted() {
    let sid = this.$route.query.sid;
    this.init(sid);
  },
  computed: {
    collection() {
     let id = this.$route.query.sid;
      return this.$store.getters.iscollection(id); 
      
    },
  },
};
</script>
<style>
html {
  font-size: 13.333vw;
  /*background: #B3C0D1;*/
}
</style>
<style scoped>
/* .back {
        width: 90%;
        height: 0.64rem;
        border-radius: 0.32rem;


    }
    span{
        letter-spacing: 0.01rem;
    } */
</style>
<style scoped>
/*  .banner1-ju1 {
        position: relative;
        width: 0.98rem;
        height: 0.98rem;
        margin-top: 0.1rem;
        float: right;
        top: 0.1rem;
        text-align: center;
        box-shadow: 0px 0px 5px #888888;
        border-radius: 0.1rem;
    }

    .baner1-ju1-1 {
        position: absolute;
        right: 0;
        width: 0.58rem;
        height: 0.22rem;
        background: #eb666b;
        top: -0.1rem;
        border-radius: 0.1rem 0.1rem 0 0.1rem;
        text-align: center;

    } */

/*   .baner1-ju1-1-title {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffffff;
        font-family: "FZCTHJW--GB1-0" !important;
        font-size: 0.18rem !important;
        line-height: 0.1rem;
        letter-spacing: 0.01rem !important;
        text-align: center;

    }

    .circle {
        width: 0.06rem;
        height: 0.06rem;
        border-radius: 0.03rem;
        background-color: #eb666b;
        float: left;
        margin-left: 0.01rem;

    }
 */
/*.circle:after {*/
/*    width: 0.06rem;*/
/*    height: 0.06rem;*/
/*    border-radius: 0.03rem;*/
/*    background-color: red;*/
/*    float: left;*/
/*    margin-left: 0.02rem;*/
/*}*/

/*  .banner1-ju1-span {
        width: 0.56rem;
        height: 0.29rem;
        margin-top: 0.20rem;
        margin-left: 0.21rem;
        text-align: center;

    }

    .spans {
        font-size: 0.4rem;
        line-height: 0.29rem;
        letter-spacing: 0rem !important;
    }

    .baner1-ju1-1 span {
        font-size: 0.4rem;

    }

    .header {
        position: relative;
        height: 4.58rem; */

/*background:url("../../img/header/header-img2.png") no-repeat;*/
/*background-size:100% ;*/
/*background-attachment:fixed;*/
/* }

    .header-swiper {
        z-index: -1;
        position: absolute;
        background: url("../../img/header/header-img2.png") no-repeat;
        background-size: 100%;
        /*background-attachment:fixed;*/
/*     width: 100%;
        height: 100%;
    } */

/*
    .header .header-img1 {
        margin-top: 0.36rem;
        width: 6.56rem;
        height: 0.22rem;
        margin-left: 0.66rem;
    }

    .header .header-biao {
        margin-top: 0.58rem;
        height: 0.4rem;
        width: 100%;
        /*background: aqua;*/
/*
    }

    .header .header-img3 {
        width: 0.12rem;
        height: 0.24rem;
        float: left;
        margin-left: 0.56rem;
        margin-top: 0.12rem;
    }

    .header .header-img4 {

        width: 0.42rem;
        height: 0.40rem;
        float: right;
        margin-right: 0.32rem;
    }

    .header .header-img5 {

        width: 0.42rem;
        height: 0.40rem;
        float: right;
        margin-right: 0.56rem;


    }

    .banner1 {
        overflow: hidden;
        width: 100%;
        border-radius: 0.08rem 0.08rem 0 0;

        height: 5.4rem;

    }

    .banner1-container {

        margin: auto;

        padding: 0.5rem 0.56rem 0.7rem 0.56rem;
    }

    .banner1-container span {
        font-family: " PingFang-SC-Bold";
        font-size: 0.4rem;
        letter-spacing: 0.02rem;
    } */

.index-content {
  overflow: hidden;
  margin: 0 0.56rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.content-wrapp {
  margin-bottom: 0.5rem;
}
.content-img {
  width: 3rem;
  height: 2.28rem;
  background-color: black;
}

.content-name {
  height: 0.31rem;
  font-size: 0.32rem;
  margin-bottom: 0.22rem;
}
.user-head {
}

.content-comment {
  margin-top: 0.15rem;
  width: 2.87rem;
  height: 0.3rem;
  font-size: 0.26rem;
  opacity: 0.5;
  color: #000000;
}

.content-user {
  height: 0.4rem;
  display: flex;
}

.user-name {
  font-size: 0.26rem;
  opacity: 0.6;
  color: #000000;
}

.content-comment {
  overflow: hidden;
  text-overflow: ellipsis;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 10px;
}
.van-goods-action-icon.active{
  color: red !important;
}

.van-goods-action-icon.active .van-icon-star-o:before{
   color: red;
}

</style>


