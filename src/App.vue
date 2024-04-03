<template>
 <router-view class="has-background-light"></router-view>
 
</template>

<script>
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import axios from 'axios'
import { onBeforeMount } from 'vue'

export default {
  name: 'App',
  setup(){
            const userStore = useWebUserInfoStore()
            const hostname = window.location.hostname

            onBeforeMount(()=>

                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    userStore.fillWebUserInfo(res.data.recordset[0])

                    axios.get(`http://${hostname}:3000/app/getCustomerCard/${userStore.defaultCustomerNo}`)
                    .then(result => {
                        userStore.fillWebUserCustomerInfo(result.data.recordset[0])
                        //console.log(userStore)
                    }).catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
            )
        },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
p,span,strong{
  font-family: -apple-system, BlinkMacSystemFont, sans-serif
}
</style>
