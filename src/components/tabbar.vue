<template>
    <div class="bottom">
        <div class="bottom-wrap">
        <router-link to="/" class="bottom-left" style="display:block" :class="index===1?'active':''"><i class="iconfont icon-shouye" ></i><div>首恶</div></router-link>
        <router-link  to="/details?sid=11" class="bottom-center" style="display:block" :class="index===2?'active':''"><i class="iconfont icon-yanjing" ></i><div>视界</div></router-link>
        <router-link to="/index" class="bottom-right" style="display:block" :class="index===3?'active':''"><i class="iconfont icon-wode" ></i><div>我的</div></router-link>
    </div>
    </div>
</template>

<script>
export default {
name:"tabbar",
props:{
    index:{
        type:Number,
        default:1,

    }
}
}
</script>

<style>
@import "../style/firstpage.css";
@import "http://at.alicdn.com/t/font_2113910_mwxt4s52y0d.css";
</style>