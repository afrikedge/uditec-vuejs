<template>
    <div >
        <div class="has-background-white">
            <sales-home-header style="padding-left: 5%;padding-right: 5%;" />
        </div>
        <div style="padding-left: 5%;padding-right: 5%;">
            <component v-bind:is="tabStore.activeTab" class=""></component>
        </div>
    </div>
</template>
<script>
    import SalesHomeHeader from './SalesHomeHeader.vue'
    import {useNavigationTabStore} from '@/Stores/NavigationTab'
    import { useWebUserInfoStore } from '@/Stores/WebUserInfo'

    import prospects from './LeadList.vue'
    import customers from './CustomerList.vue'
    import items from './ItemList.vue'
    import dashboard from './SalesDasboard.vue'
    import saleQuotes from './SaleQuoteList.vue'
    import saleOrders from './SaleOrderList.vue'
    import revisionRequests from './RevisionRequestList.vue'
    import discountRequests from './DiscoundRequestList.vue'
    import releaseRequests from './ReleaseRequestList.vue'
    import creditRequests from './CreditRequestList.vue'
    import repossessionRequests from "./RepossessionRequestList.vue"
    import assignedDebts from './AssignedDebtList.vue'
    import paymentPromises from "./PaymentPromiseList.vue"
    import recoveryActivities from "./RecoveryActivityList.vue"


    import axios from 'axios'
    import { onMounted } from 'vue'



    export default {
        name:'sales-home',
        components:{
            SalesHomeHeader,
            dashboard,
            customers,
            prospects,
            items,
            saleQuotes,
            saleOrders,
            repossessionRequests,
            assignedDebts,
            paymentPromises,
            recoveryActivities,
            creditRequests,
            revisionRequests,
            discountRequests,
            releaseRequests,
        },
        setup(){
            const tabStore = useNavigationTabStore()
            const userStore = useWebUserInfoStore()
            const hostname = window.location.hostname

            onMounted(()=>

                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{

                    console.log(res)
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