<template>
    <div class="my-5 mx-5">
        
        <customer-list-ribbon 
        pageTitle="Clients"
        componentwithPresentationView="customerListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="customerListRightInfoMaxWidth"
        routeForNewCard="NewCustomer"
        ></customer-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° Client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Objet</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée le</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée par</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure début prévue</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure fin prévue</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure début réelle</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure fin réelle</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure relance</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Activité connexe</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Observation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° ligne</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant initial</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ouvert</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut échéance</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="debtcollection of filteredDebtcollectionList" :key="debtcollection['No_']" class="is-narrow">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/DebtCollectionCard/${ debtcollection['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ debtcollection['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Activity Type']==0 ? 'webmaster' : 'AI developper' }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Subject'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Description'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Created on'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Created by'] }}</td>                    
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Scheduled Start Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Scheduled End Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Actual Start Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Actual End Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Reminder Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Linked Activity'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Status']==0 ? 'Actif' : 'Non actif' }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Comment'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Line No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Document No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Posting Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Document Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Description'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Original Amount'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Remaining Amount'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Debt Status'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="debtcollection of filteredDebtcollectionList" :key="debtcollection['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        
                                        <router-link :to="`/DebtCollectionCard/${ debtcollection['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ debtcollection['No_'] }} 
                                            </a>
                                        </router-link>
                            
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ debtcollection['Name'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ debtcollection['Customer No_'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ debtcollection['Activity Type']==0 ? 'webmaster' : 'AI developper' }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{ debtcollection['Status']==0 ? 'Actif' : 'Non actif' }}</span>
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
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique haute'">
                <div class="columns is-multiline is-gapless">
                    <div :class="{'column':true, 'is-2':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="debtcollection of filteredDebtcollectionList" :key="debtcollection['No_']">
                        <div class="has-background-white m-1">
                            <div class="card-is-hoverable box">
                                <div class="">
                                    <div class="has-text-left">
                                        <a href="#">
                                            <span class="py-0">...</span>
                                        </a>
                                    </div>
                                    <div class="is-flex is-justify-content-center">
                                        <figure class="image is-128x128">
                                            <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                        </figure>
                                    </div>
                                    <hr class="rounded">
                                    <div class="">
                                        <p class="has-text-left ">
                                            <span class="is-size-7 has-text-grey has-background-light">
                                        
                                                <router-link :to="`/DebtCollectionCard/${ debtcollection['No_'] }`">
                                                    <a href="#" class="has-text-orange">
                                                        {{ debtcollection['No_'] }} 
                                                    </a>
                                                </router-link>
                            
                                            </span>
                                        </p>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left has-text-orange py-0 mt-1" >
                                                <span class="is-size-7 is-underlined">{{ debtcollection['Name'] }}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0 mt-1">
                                                <span class="is-size-7">{{ debtcollection['Customer No_'] }}</span>
                                            </div>
                                        </div>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left py-0" >
                                                <span class="is-size-7">{{debtcollection['Activity Type']==0 ? 'webmaster' : 'AI developper'}}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0">
                                                <span class="is-size-7">{{ debtcollection['Status']==0 ? 'Actif' : 'Non actif' }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <customer-info class="customer-info"></customer-info>
        </div>
    </div>
    
</template>

<script scoped>
import CustomerInfo from './CustomerInfo.vue'
import CustomerListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'


export default {

    name:'debtcollection-list',
    components:{
        CustomerInfo,CustomerListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['customerListPresentation']
        }
    },
    setup() {
        const debtcollectionList = ref([])
        const eltToSearch = ref('')
        const filteredDebtcollectionList = computed(()=>
        debtcollectionList.value
        .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Activity Type']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        ),
     )
        // expose to template and other options API hooks
        return {
            debtcollectionList,
            eltToSearch,
            filteredDebtcollectionList
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerListRightInfoMaxWidth,
            
            //nom de l'hote dans l'url 
            hostname:window.location.hostname       
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('customerListRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('customerListRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },

    },
    
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getRAList`)
        .then((result) => {
          this.debtcollectionList = result.data;
        })
        .catch(err=>console.log(err));
      
    }
}

</script>

<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}
.has-text-orange{
    color: orange;
}
.has-text-orangered{
    color: orangered;
}
.has-background-orange{
    background-color: rgb(255, 155, 118);
}
.has-background-orange:hover {
    background-color: rgb(255, 68, 0);
}
.card-is-hoverable:hover{
    background-color: rgba(255, 68, 0, 0.068)
}
hr.rounded {
  border-top: 8px solid #bbb;
  border-radius: 5px;
}
.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
 }

</style>
