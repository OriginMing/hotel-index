<template>
  <div>
    <div class="content-tag">
      <ul>
        <li
          v-for="(item, index) of orderMes"
          :key="index"
          :class="{ active: item.filed == order.filed }"
          @click="handleChangePage(item.filed)"
        >
          {{ item.con }}
        </li>
      </ul>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="index-content" v-if="stayhome">
          <div v-for="item of stayhome" :key="item.sid" class="content-wrapp">
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
            <div class="content-comment" >
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
        <!--  <van-cell v-for="item in stayhome" :key="item" :title="item" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { IMGURL } from "@/lib/base.js";
import { Rate } from "vant";
import { pageAll } from "@/http/homestay";
import { List } from "vant";
import { PullRefresh } from "vant";
export default {
  name: "two",
  data() {
    return {
      IMGURL,
     
      refreshing: false,
      orderMes: [
        { con: "综合", filed: "sid" },
        { con: "价格", filed: "sprice" },
      ],
      order: {
        filed: "sid",
        type: "desc",
      },
      paginate: {
        page: 0,
        limit: 6,
      
      },
      total: 0,
      stayhome: [],
      loading: false,
      finished: false,

 
    };
  },
  components: {
    "van-rate": Rate,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
  },
  methods: {
    handleChangePage(filed) {
      this.order.filed = filed;
      this.initpageAll();
    },
    initpageAll() {
       this.paginate.page=1;
      let params = Object.assign({}, this.order, this.paginate);
      pageAll(params)
        .then((res) => {
          console.log(res);
          (this.total = res.total), (this.stayhome = res.data);
          console.log(this.stayhome);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onLoad(){
      this.paginate.page = this.paginate.page + 1;
      console.log(this.paginate.page);
      let params = Object.assign({}, this.order, this.paginate);
      pageAll(params)
        .then((res) => {
          console.log("onload");
          console.log(res);
          this.total=res.total;
          this.stayhome=this.stayhome.concat(res.data);
          console.log(this.stayhome);
          this.loading = false;
          console.log(this.stayhome.length)
          console.log(this.total)
          if (this.stayhome.length >= this.total) {
            console.log(111)
            this.finished = true;
          }
      
        })
        .catch((error) => {
          error;
        });
            
    },
    onRefresh(){
      this.stayhome = [];
      this.paginate.page=0;
         this.finished = false;
          this.loading = true;
        /*   this.onLoad(); */
          this.refreshing=false
    }
  },
  mounted() {
    this.onLoad();
   /*  this.initpageAll(); */
  },
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
.content-tag {
}
.active {
  border: 2px solid red;
  background-color: yellowgreen;
  border-radius: 5px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}
ul {
  display: flex;
  justify-content: space-between;
}
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
</style>

