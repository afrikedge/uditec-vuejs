<template>
    <div >
        <div class="has-background-white">
            <SPT2SalesHeader style="padding-left: 5%;padding-right: 5%;">
            </SPT2SalesHeader>
        </div>
        <div style="padding-left: 5%;padding-right: 5%;">
            <component v-bind:is="tabStore.activeTab" class=""></component>
        </div>
    </div>
</template>
<script>
    import SPT2SalesHeader from './SPT2_SalesHeader.vue'
    import saleOrder from './SPT2_SalesOrderCard.vue'
    import saleOrderPayment from './SPT2_SalesOrderPaymentCard.vue'
    import {useNavigationTabStore} from '@/Stores/SPT2_NavigationTab'
    import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
    import axios from 'axios'
    import { onMounted } from 'vue'



    export default {
        name:'sales-home',
        components:{
            SPT2SalesHeader,saleOrder,saleOrderPayment
        },
        setup(){
            const tabStore = useNavigationTabStore()
            const userStore = useWebUserInfoStore()
            const hostname = window.location.hostname

            onMounted(()=>

                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    userStore.fillWebUserInfo(res.data.recordset[0])
                }
                )
                .catch(err=>console.log(err))
            )

            return {
                tabStore
            }
        },

    }

</script>