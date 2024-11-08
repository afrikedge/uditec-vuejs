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
    import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
    import { useSPT2NavigationTabStore } from '@/Stores/SPT2_NavigationTab'
    import { onBeforeMount, onMounted } from 'vue'
    import { useRouter } from 'vue-router'


    export default {
        name:'sales-home',
        components:{
            SPT2SalesHeader,saleOrder,saleOrderPayment
        },
        setup(){
            const tabStore = useSPT2NavigationTabStore()
            //const userStore = useWebUserInfoStore()
            //const hostname = window.location.hostname
            const router = useRouter()


            onBeforeMount(()=> {
                if(useWebUserInfoStore().name==''){
                    let userData = window.localStorage.getItem("userData");
                    if(!userData){
                        router.push('/SP2000/login')
                    }else{
                        let userDataObjet = JSON.parse(userData)
                        useWebUserInfoStore().fillWebUserInfo(userDataObjet)
                    }
                }
            })
            onMounted(()=> {
                let userCustomerData = window.localStorage.getItem("userCustomerData");
                if(userCustomerData){
                    let userCustomerDataObjet = JSON.parse(userCustomerData)
                    useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
                }
            })

            return {
                tabStore
            }
        },

    }

</script>