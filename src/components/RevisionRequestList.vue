<template>
    <div class="my-5 mx-5">
        
        <revision-list-ribbon pageTitle="Demandes de révision"></revision-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth">
                    <thead class=" my-2">
                        <tr> 
                          
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="elt of [1,2,3,4,5,6,7,8,9,11,10,12,13,14,145,14,1,1,1,4,4,4,44,4,7]" :key="elt">

                        </tr>
                    </tbody>
                </table>
            </div>

            <customer-info></customer-info>
        </div>
    </div>
    
</template>

<script>
import CustomerInfo from './CustomerInfo.vue'
import RevisionListRibbon from './RibbonForLists.vue'

export default {
    name:'revision-request-list',
    components:{
        CustomerInfo,RevisionListRibbon
    },
}

</script>

