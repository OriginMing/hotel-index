import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'firstpage',
    component: ()=>import('@/views/index/firstpage.vue')
  },
  {
    path: '/two',
    name: 'two',
    component: ()=>import('@/views/index/two.vue'),
   /*  meta:{ auth: true} */
  },
  {
    path: '/province',
    name: 'province',
    component: ()=>import('@/views/province/province.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: ()=>import('@/views/province/home.vue')
  },
  {
    path: '/cala',
    name: 'cala',
    component: ()=>import('@/views/cala/cala.vue')
  },
  {
    path: '/details',
    name: 'Details',
    component: ()=>import('@/views/details/Details.vue')
  },{
    
      path: '/regest',
      name: 'Register',
      component: ()=>import('@/views/login/Register.vue')
    
  },{
    
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/login/login.vue')
  
},{
    
  path: '/index',
  name: 'index',
  component: ()=>import('@/views/user/index.vue')

},
{
  
  path: '/Orderscalendar',
  name: 'Orderscalendar',
  component: ()=>import('@/views/cala/Orderscalendar.vue')
},
{
    
  path: '/collection',
  name: 'collection',
  component: ()=>import('@/views/user/collection.vue')

},
{
    
  path: '/orders',
  name: 'orders',
  component: ()=>import('@/views/orders/orders.vue')

},{
    
  path: '/pay',
  name: 'pay',
  component: ()=>import('@/views/orders/pay.vue')

},/* {
    
  path: '/Olists',
  name: 'Olists',
  component: ()=>import('@/views/order-list/Olists.vue')

}, */
 
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  from
   if(to.meta.auth){
     let token  = store.state.indexSearch.token;
     token = token&&token.trim();
       if(token){
           next()
       }else{
         next({name:"Register",query:{redirect: to.name}})
       }
   } else{
     next();
   }
})

export default router
