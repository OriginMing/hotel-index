<template>
  <div>
    <div v-for="item in provinceKeys" :key="item">
        <h2>{{item}}</h2>
        <ul>
            <li v-for="(city,index) in province[item]" :key="index" @click="handleProvince(city.city)" >{{city.city}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import city from "@/style/city(1).json"
export default {
   name:"province",
   data(){
  return{
      province:{}
  }
   },
   computed:{
     provinceKeys(){
         let arr = [];
         if(JSON.stringify(this.province)!='{}'){
                arr = Object.keys(this.province).sort();
         }
      
         return arr
     }
   },
   methods:{
       initProvice(){
           city.province.forEach(ele=>{
     let first =ele.en.charAt(0).toUpperCase();
     if(!this.province[first]){
         this.$set(this.province,first,[])
         //this.province[first] = [];
     }
     this.province[first].push(ele);
           })
       },
       handleProvince(province){
           this.$store.commit('setProvince',province);
           this.$router.back();
       }
   },
  mounted(){
  console.log(city.province);
  this.initProvice();
  }
}
</script>

<style>

</style>