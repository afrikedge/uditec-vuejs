<template>
    <div class="my-5 mx-5">
        
        <prospect-list-ribbon 
        pageTitle="Prospects"
        componentwithPresentationView="leadListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        componentWithCompInfo="leadListRightInfoMaxWidth"
        routeForNewCard="NewLead"
        ></prospect-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;" > Type</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code magasin</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code unité</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">% remise ligne</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr id="" v-for="elt of [1,2,3,4,5,6,7,8,9,11,10,12,13,14,145,14,1,1,1,4,4,4,44,4,7]" :key="elt">
                            <td class="has-text-left has-background-light"> salut</td>
                            <td class="has-text-left has-background-light"> salut</td>
                            <td class="has-text-left has-background-light"> salut</td>
                            <td class="has-text-left has-background-light"> slaut</td>
                            <td class="has-text-left has-background-light"> slaut</td>
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            <td class="has-text-left has-background-light"> slaut</td>                
                            </tr>
                    </tbody>
                </table>
            </div>

            <prospect-info></prospect-info>
        </div>
    </div>
    
</template>

<script>
import ProspectInfo from './ProspectInfo.vue'
import ProspectListRibbon from './RibbonForLists.vue'

export default {
    name:'prospect-list',
    components:{
        ProspectInfo,ProspectListRibbon
    },
    data(){
        return {
            id1:this.$route.params.id1,
            id2:this.$route.params.id2
        }
    },
    mounted(){
        console.log('id1',this.id1)
        console.log('id2',this.id2)
    }
}

</script>
<style scoped>
.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
 }
</style>
