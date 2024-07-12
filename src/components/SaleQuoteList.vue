<template>
    <div class="my-5 mx-5">
        
        <s-q-list-ribbon 
        pageTitle="Devis vente"
        routeForNewCard="NewSaleQuote"
        componentwithPresentationView="quoteListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="quoteListRightInfoMaxWidth"
        :newCardBtnDisabled="false"
        :editCardBtnDisabled="false"
        :printCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        :convertQuoteBtnDisabled="false"
        ></s-q-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Nom du client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code contact</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code vendeur</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code campagne</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Magasin par défaut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date du devis</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date fin validité</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant acompte TTC</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant TTC</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="" v-for="saleQuote of filteredSQList" :key="saleQuote['No_']">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/SaleQuoteCard/${ saleQuote['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ saleQuote['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Sell-to Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Sell-to Customer Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Sell-to Contact No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Salesperson Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Campaign No_'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Location Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleQuote['Document Date']) }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleQuote['Quote Valid Until Date']) }}</td>                               
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote[''] }}</td>                               
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Total Amount'] }}</td>                               
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Total Amount Including VAT'] }}</td>                               
                            <td class="has-text-left has-background-light is-narrow has-text-primary has-text-weight-bold"> {{ saleQuote['Status']==0?'Ouvert':saleQuote['Status']==1?'Lancé':'En attente appprobation' }}</td>                               
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="saleQuote of filteredSQList" :key="saleQuote['No_']">
                        <div class=" columns p-1  card-is-hoverable">
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey">{{ saleQuote['No_'] }}</span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0 mt-1" >
                                        <router-link :to="`/SaleQuoteCard/${ saleQuote['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                <span class="is-size-7 is-underlined">{{ saleQuote['Sell-to Customer Name'] }}</span>
                                            </a>
                                        </router-link>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ saleQuote['Total Amount Including VAT'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ saleQuote['Salesperson Code'] }}</span>
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
import axios from 'axios'
import { computed,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'



export default {
    name:'sale-quote-list',
    components:{
        CustomerInfo,ProspectInfo,SQListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['quoteListPresentation']
        }
    },
    setup() {
    const saleQuoteList = ref([])
    const eltToSearch = ref('')
    const filteredSQList = computed(()=>
        saleQuoteList.value
        .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Sell-to Customer Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Sell-to Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Salesperson Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Location Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Total Amount']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Total Amount Including VAT']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        )
    )
    // expose to template and other options API hooks
        return {
            eltToSearch,
            filteredSQList,
            saleQuoteList
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.quoteListRightInfoMaxWidth,
            hostname:window.location.hostname
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('quoteListRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('quoteListRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },


        formatDate(date){
            if (new String(date).includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        }

    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getSQList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
        .then(result => {
            this.saleQuoteList=result.data.recordset
        }).catch(err=>console.log(err))
    },
}

</script>
<style scoped>
.customer-info,prospect-info{
    max-width: v-bind(customerInfoCompMaxWidth);
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

