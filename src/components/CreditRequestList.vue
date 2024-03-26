<template>
    <div class="my-5 mx-5">
        
        <s-q-list-ribbon 
        pageTitle="Demande de crédit"
        routeForNewCard="NewSaleQuote"
        componentwithPresentationView="creditrequestListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        componentWithCompInfo="creditrequestListRightInfoMaxWidth"
        :newCardBtnDisabled="true"
        :editCardBtnDisabled="true"
        :readOnlyModeDisabled="true"
        :printCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        :convertQuoteBtnDisabled="false"
        ></s-q-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Numéro du devis</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom du client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code contact</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code vendeur</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Magasin par défaut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date du devis</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant TTC</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut validation</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr id="" v-for="creditrequest of creditRequestList" :key="creditrequest['No_']">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/CreditRequestCard/${ creditrequest['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ creditrequest['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light"> {{ creditrequest['Sell-to Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditrequest['Sell-to Customer Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditrequest['Sell-to Contact No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(creditrequest['Salesperson Code']) }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ creditrequest['Location Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ creditrequest['Document Date'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ creditrequest['Total Amount'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(creditrequest['Total Amount Including VAT']) }}</td>                               
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(creditrequest['Approval Status']) }}</td>                                                 
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':creditrequestInfoCompMaxWidth=='0px', 'is-one-third':creditrequestInfoCompMaxWidth=='800px'}" v-for="creditrequest of  creditRequestList" :key="creditrequest['No_']">
                        <div class=" columns p-1  card-is-hoverable">
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey">{{ creditrequest['No_'] }}</span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <router-link :to="`/SaleQuoteCard/${ creditrequest['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                <span class="is-size-7 is-underlined">{{ creditrequest['Sell-to Customer Name'] }}</span>
                                            </a>
                                        </router-link>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ creditrequest['Total Amount Including VAT'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ creditrequest['Ship-to Code'] }}</span>
                                    </div>
                                </div>
                            </div>
                            <a class="column is-narrow has-background-orange is-flex ">
                                <span class="is-align-self-center has-text-white">...</span>

                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <customer-info class="customer-info" v-if="true"></customer-info>
            <prospect-info class="prospect-info" v-else></prospect-info>
        </div>
    </div>
    
</template>

<script>
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import SQListRibbon from './RibbonForLists.vue'
// import axios from 'axios'
import { ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'



export default {
    name:'credit-request-list',
    components:{
        CustomerInfo,ProspectInfo,SQListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['creditrequestListPresentation']
        }
    },
    setup() {
    const creditRequestList = ref([])

    // expose to template and other options API hooks
        return {
            creditRequestList
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            creditrequestInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.creditrequestListRightInfoMaxWidth,
            hostname:window.location.hostname
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.creditrequestInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('creditrequestListRightInfoMaxWidth','800px')
                this.creditrequestInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('creditrequestListRightInfoMaxWidth','0px')
                this.creditrequestInfoCompMaxWidth='0px'
            }
        },


        formatDate(date){
            if (date.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        }

    },
    // mounted(){
    //     axios.get(`http://${this.hostname}:3000/app/getSQList`)
    //     .then(result => {
    //         this. creditRequestList=result.data.recordset
    //     }).catch(err=>console.log(err))
    // }
}

</script>
<style scoped>
.customer-info,prospect-info{
    max-width: v-bind(creditrequestInfoCompMaxWidth);
    transition: max-width 0.5s;
}
.has-background-orange{
    background-color: rgb(255, 155, 118);
}
.has-background-orange:hover {
    background-color: rgb(255, 68, 0);
}
.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
 }
</style>

