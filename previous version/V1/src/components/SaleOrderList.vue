<template>
    <div class="my-5 mx-5">
        
        <s-o-list-ribbon 
        pageTitle="Commandes vente"
        routeForNewCard="NewSaleOrder"
        componentwithPresentationView="orderListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Donneur d'ordre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom donneur d'ordre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Contact donneur d'ordre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code magasin</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date de fin de validité devis</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date livraison demandée</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="" v-for="saleOrder of saleOrderList" :key="saleOrder['No_']">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/SaleOrderCard/${ saleOrder['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ saleOrder['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light"> {{ saleOrder['Sell-to Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Sell-to Customer Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Ship-to Contact'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleOrder['Document Date']) }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder[''] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder[''] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Location Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleOrder['Quote Valid Until Date']) }}</td>                               
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleOrder['Requested Delivery Date']) }}</td>                               
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="saleOrder of saleOrderList" :key="saleOrder['No_']">
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
                                        <span class="is-size-7">{{ saleOrder['Ship-to Contact'] }}</span>
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
import { ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'



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

    // expose to template and other options API hooks
        return {
            saleOrderList
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
            if (date.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        }

    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getSOList`)
        .then(result => {
            this.saleOrderList=result.data.recordset
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

