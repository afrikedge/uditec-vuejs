<template>
    <div >
        <div class="has-background-white">
            <sales-home-header style="padding-left: 5%;padding-right: 5%;" />
        </div>
        <div style="padding-left: 5%;padding-right: 5%;">
            <component v-bind:is="store.activeTab" class=""></component>
        </div>
    </div>
</template>
<script>
    import SalesHomeHeader from './SalesHomeHeader.vue'
    import {useNavigationTabStore} from '@/Stores/NavigationTab'

    import prospects from './LeadList.vue'
    import customers from './CustomerList.vue'
    import items from './ItemList.vue'
    import dashboard from './SalesDasboard.vue'
    import saleQuotes from './SaleQuoteList.vue'
    import saleOrders from './SaleOrderList.vue'
    import revisionRequests from './RevisionRequestList.vue'
    import discountRequests from './DiscoundRequestList.vue'
    import releaseRequests from './ReleaseRequestList.vue'


    export default {
        name:'sales-home',
        components:{
            SalesHomeHeader,prospects,customers,dashboard,saleQuotes,saleOrders,revisionRequests,discountRequests,releaseRequests,items
        },
        setup(){
            const store = useNavigationTabStore()
            return {
                store
            }
        },

    }

</script>