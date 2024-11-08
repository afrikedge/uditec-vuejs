<template>
    <div style="">
        <div class="has-background-white">
            <sales-home-header style="padding-left: 5%;padding-right: 5%;" />
        </div>
        <div style="padding-left: 5%;padding-right: 5%;">
            <component v-bind:is="tabStore.activeTab"></component>
        </div>
    </div>
</template>
<script>
    import SalesHomeHeader from './SalesHomeHeader.vue'
    import {useNavigationTabStore} from '@/Stores/NavigationTab'
    import { useWebUserInfoStore } from '@/Stores/WebUserInfo'

    import prospects from './LeadList.vue'
    import customers from './CustomerList.vue'
    import contacts from './ContactList.vue'
    import items from './ItemList.vue'
    import dashboard from './SalesDasboard.vue'
    import saleQuotes from './SaleQuoteList.vue'
    import saleOrders from './SaleOrderList.vue'
    //import revisionRequests from './RevisionRequestList.vue'
    //import discountRequests from './DiscoundRequestList.vue'
    //import releaseRequests from './ReleaseRequestList.vue'
    import creditRequests from './CreditRequestList.vue'
    import creditContracts from './CreditContractList.vue'
    import repossessionRequests from "./RepossessionRequestList.vue"
    //import assignedDebts from './AssignedDebtList.vue'
    import assignedCustomers from './AssignedCustomerList.vue'
    import paymentPromises from "./PaymentPromiseList.vue"
    import recoveryActivities from "./RecoveryActivityList.vue"
    import inventoryAvailability from './InventoryAvailability.vue'
    import campaignAvailability from './InventoryAvailabilityPerCampaign.vue'

    import discounts from './DiscountRequestList.vue'
    import soUnlocking from './ReleaseRequestList.vue'
    import payments from './PaymentValidationRequestList.vue'
    import revisionRequests from './RevisionRequestList.vue'

    // axios from 'axios'
    import { onBeforeMount, onMounted } from 'vue'
    import { useRouter } from 'vue-router'




    export default {
        name:'sales-home',
        components:{
            SalesHomeHeader,
            dashboard,
            customers,
            prospects,
            contacts,
            items,inventoryAvailability,campaignAvailability,
            saleQuotes,
            saleOrders,
            repossessionRequests,
            //assignedDebts,
            assignedCustomers,
            paymentPromises,
            recoveryActivities,
            creditRequests,
            creditContracts,
            revisionRequests,
            discounts,soUnlocking,payments
        },
        setup(){
            const tabStore = useNavigationTabStore()
            //const userStore = useWebUserInfoStore()
            //const hostname = window.location.hostname
            const router = useRouter()


            onBeforeMount(()=> {
                if(useWebUserInfoStore().name==''){
                    let userData = window.localStorage.getItem("userData");
                    if(!userData){
                        router.push('/login')
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