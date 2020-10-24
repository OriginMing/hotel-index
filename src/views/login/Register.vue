<template>
  <div><van-form @submit="onSubmit">
  <van-field
    v-model="registerFrom.nickname"
    name="nickname"
    label="用户名"
    clearable
    left-icon="smile-o"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
    <van-field
    v-model="registerFrom.phone"
    name="phone"
    label="账号"
    placeholder="账号"
    :rules="[{ required: true, message: '请填写账号' }]"
  />
    <van-field
    v-model="registerFrom.password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <van-field

  center
  clearable
  label="短信验证码"
  placeholder="请输入短信验证码"
>
  <template #button>
    <van-button size="small" type="primary" v-show="!time" @click="getcode">发送验证码</van-button>
     <van-button size="small" type="primary" v-show="time" @click="getcode">{{time}}</van-button>
  </template>
</van-field>
<van-field name="checkbox" label="同意协议">
  <template #input>
    <van-checkbox v-model="registerFrom.isag" shape="square" />
  </template>
</van-field>

 <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
  </van-form></div>
</template>

<script>
 import { Form ,Field, Button,Checkbox} from 'vant';
 import 'vant/lib/form/style'
 import 'vant/lib/field/style'
  import 'vant/lib/button/style'
  import 'vant/lib/checkbox/style'
  import {register} from "../../http/homestay"
export default {
name:"Register",
data(){
    return {
        registerFrom:{
            nickname:"",
            code:"1314",
            password:'',
            isag:false,

        },
        time:0,
    }
},
methods:{
    getcode(){
        if(!this.time){this.time=60}
        
        let timer=  setInterval(()=>{
             if(this.time>0){
                 this.time--
             }else{
                 clearInterval(timer);
                 this.time=0;
             }
        },1000)
         let redirect=this.$route.query.redirect || 'index';
                  this.$router.push({name: redirect})
    }
    ,onSubmit(value){
      console.log(value)
     let params = {
       password:value.password,
       nickname: value.nickname,
       phone:value.phone}
       console.log(params)
       if(value.checkbox){
         register(params).then(res=>{
           console.log(res);
         })
      } 

    }
},
components:{
    "van-form":Form,
    "van-field":Field,
   "van-button": Button,
   "van-checkbox":Checkbox

}
}
</script>

<style>

</style>
