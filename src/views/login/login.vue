<template>
   <div><van-form @submit="onSubmit" >
  <van-field
    v-model="registerFrom.phone"
    name="phone"
    label="用户名"
    clearable
    autocomplete="off"
    left-icon="smile-o"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
    <van-field
    v-model="registerFrom.password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <template #button>
    <van-button size="small" type="primary" v-show="!time" @click="getcode">发送验证码</van-button>
     <van-button size="small" type="primary" v-show="time" @click="getcode">{{time}}</van-button>
  </template>
<van-field name="checkbox" label="同意协议">
  <template #input>
    <van-checkbox v-model="registerFrom.isag" shape="square" />
  </template>
</van-field>

 <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      登录
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
 /*  import {login} from "../../http/homestay" */
export default {
name:"login",
data(){
    return{
        registerFrom:{
            phone:"",
            password:"",
            isag:false,
        }
    }
},
methods:{
  onSubmit(value){
    console.log(value);
     
     let redirect=this.$route.query.redirect || 'firstpage';
     let query = this.$route.query.sid||{};
     let params={phone: value.phone,password:value.password,redirect,query};
      
     this.$store.dispatch('handleLogin',params) 
     
      


  
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