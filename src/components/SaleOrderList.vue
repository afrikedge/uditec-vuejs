<template>
    <div class="my-5 mx-5">
        
        <s-o-list-ribbon 
        pageTitle="Commandes vente"
        routeForNewCard="NewSaleOrder"
        componentwithPresentationView="orderListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="orderListRightInfoMaxWidth"
        :newCardBtnDisabled="false"
        :editCardBtnDisabled="false"
        :printCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        :convertQuoteBtnDisabled="true"
        ></s-o-list-ribbon>


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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code magasin</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date commande</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant TTC</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Statut traitement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="" v-for="saleOrder of filteredSOList" :key="saleOrder['No_']">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/SaleOrderCard/${ saleOrder['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ saleOrder['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Sell-to Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Sell-to Customer Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Sell-to Contact No_]'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Salesperson Code'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Campaign No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Location Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleOrder['Document Date']) }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Total Amount'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Total Amount Including VAT'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow has-text-danger" v-if="saleOrder['Processing Status']==3 ||saleOrder['Processing Status']==4"> {{ getLabel(saleOrder['Processing Status']) }}</td>                
                            <td class="has-text-left has-background-light is-narrow has-text-primary" v-else> {{ getLabel(saleOrder['Processing Status']) }}</td>                
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="saleOrder of filteredSOList" :key="saleOrder['No_']">
                        <div class=" columns p-1  card-is-hoverable">
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey">{{ saleOrder['No_'] }}</span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <router-link :to="`/SaleOrderCard/${ saleOrder['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                <span class="is-size-7 is-underlined">{{ saleOrder['Sell-to Customer Name'] }}</span>
                                            </a>
                                        </router-link>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ saleOrder['Total Amount Including VAT'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ saleOrder['Sell-to Contact No_'] }}</span>
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
import SOListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import { computed,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'



export default {
    name:'sale-quote-list',
    components:{
        CustomerInfo,ProspectInfo,SOListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['orderListPresentation']
        }
    },
    setup() {
    const saleOrderList = ref([])
    const optionLabelList = ref([])
    const eltToSearch = ref('')
    const filteredSOList = computed(()=>
        saleOrderList.value
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
            filteredSOList,
            saleOrderList,
            optionLabelList,
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.orderListRightInfoMaxWidth,
            hostname:window.location.hostname        
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('orderListRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('orderListRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },


        formatDate(date){
            if (new String(date).includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        },

        getLabel(fieldValue){
            if (this.optionLabelList[Number(fieldValue)]){
                return this.optionLabelList[Number(fieldValue)]['Description']
            }
        }

    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getSOList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
        .then(result => {
            this.saleOrderList=result.data.recordset
        }).catch(err=>console.log(err))

        const language = useWebUserInfoStore().defaultLanguage
        const field = '[Type]'
        if(this.saleOrderList.length==0){
            axios.get(`http://${this.hostname}:3000/app/getOptionLabelList?lg=${language}&fd=${field}`)
            .then(result => {
                this.optionLabelList = result.data.recordset
            }).catch(err=>console.log(err))
        }
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

