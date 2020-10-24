import instance from "./http"
function homestayAll(){
   return new Promise((resolve,reject)=>{
       instance.get("/api/index").then(res=>{
           resolve(res)
       }).catch(error=>{
           reject(error)
       })

       
   })
}
function detailAll(sid){
    return new Promise((resolve,reject)=>{
        instance.get("/api/index/"+sid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
 
        
    })
 }
 function pageAll(params){
    return new Promise((resolve,reject)=>{
        instance.get("/index/index",{params}).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
 
        
    })
 }
 function login(params){
    return new Promise((resolve,reject)=>{
        instance.post("/index/login",params).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
 
        
    })
 }
 function register(params){
    return new Promise((resolve,reject)=>{
        instance.post("/index/user",params).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
 
        
    })
 }
 function uesrCeneter(){
    return new Promise((resolve,reject)=>{
        instance.get("/index/user/1").then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
 
        
    })
 }
 function userCollection(collection){
    return new Promise((resolve,reject)=>{
        instance.get("/index/collection",{params:collection}).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
 
        
    })
 }
 function addCollection(id,params){
    return new Promise((resolve,reject)=>{
        instance.put("/index/collection/"+id,{params}).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
 
        
    })
 }
 function apiOrders(data) {
    return new Promise(function (resolve,reject) {
        instance.post('/index/orders',{
            data
        }).then(res=>{
            resolve(res);
        }).catch(error=>{
            reject(error);
        });
    })
}
function apiOrdersList(params) {
    return new Promise(function (resolve,reject) {
        instance.get('/index/orders',
        {params}
        ).then(res=>{
            resolve(res);
        }).catch(error=>{
            reject(error);
        });
    })
}

export {homestayAll,detailAll,pageAll,login,register,uesrCeneter,userCollection,addCollection,apiOrders,apiOrdersList}    