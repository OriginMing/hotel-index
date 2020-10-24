import Vue from 'vue';
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import router from '../router';
//import instance from "../../http/http"
import {login} from "@/http/homestay"


Vue.use(Vuex)
const store = new Vuex.Store({
    plugins:[createPersistedState()],
   state:{
     indexSearch:{
         province:"山西",
         address:"",
         startTime:"",
         endTime:"",
         startDay:"",
         endDay:"",
       

     },
     token:"",
     collection:[],
   },
   getters:{
    iscollection(state){
      return function(sid){
        let flag = false;
        if(state.collection.length>0){
          flag = state.collection.some(ele=>ele==sid);
        }
    
        return flag
      }
    }
   },
   mutations:{
     setTime(state,payload){
         let arr = ["SUN","MON","TUE","WED","THU","FRI","STA"]
         let date =new Date();
         let {start,end,startDay,endDay} = payload;
         console.log(start);
         let startTime = start?start:date.getMonth()+1+"."+date.getDate();
         console.log(startTime)
         let   endTime=end?end:date.getMonth()+1+"."+date.getDate()+2;
         console.log(endTime)
         state.indexSearch.startTime=startTime;
         state.indexSearch.endTime = endTime;
         startDay=startDay===undefined ?date.getDay():startDay;
         endDay=endDay===undefined ?startDay+2:endDay;
         state.indexSearch.startDay=arr[startDay];
         state.indexSearch.endDay=arr[endDay];
     },
     setProvince(state,payload){
         state.indexSearch.province=payload;
         

     },
     setToken(state,payload){
       state.token =payload;
     },
     setCollection(state,payload){
       if(payload){
        state.collection =payload;
       }else{
      state.collection=[];
       }
      
     
     }
   },
   actions:{
    handleLogin(context,payload){
      let redirect = payload.redirect;
      delete payload.redirect
      let query = payload.query;
      console.log(payload.query)
      delete payload.query
      console.log("--------------")
     
console.log(query)
      login(payload).then(res=>{
        context.commit('setToken',res.token)
        console.log(res);
        sessionStorage.setItem('uid', res.data.uid)
       if(res.data.collection){context.commit('setCollection',res.data.collection.split(','))}else{
         context.commit('setCollection',res.data.collection)
       }
       console.log(query)
      router.replace({name:redirect,query:{sid:query}})
      }).catch(error=>{
        error
      })
    }
   },
   modules:{
   }
})
export default store