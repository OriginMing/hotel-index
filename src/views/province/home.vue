<template>
  <div>
      <router-link to="/province">{{indexSearch.province}}</router-link>
      <router-link to="/cala" tag="div">
      {{indexSearch.startTime}}{{indexSearch.startDay}}--{{indexSearch.endTime}}{{indexSearch.endDay}}
      </router-link>
  </div>
</template>

<script>
export default {
name:"home",
data(){
    return{
        
    }
},
methods:{
    setCity(){
        this.$store.commit("changeCity",{})
    }
},
computed:{
    indexSearch(){
        return this.$store.state.indexSearch;
    }
}
}
</script>

<style>

</style>