<template>
    <div class="my-5 mx-5">
        
        <customer-list-ribbon 
        pageTitle="Activité recouvrement"
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Nom client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Type</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Statut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° ligne</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° Document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date comptabilisation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant initial</th>

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
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Status']==0 ? 'Actif' : 'Non actif' }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Line No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Document No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Posting Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Document Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Description'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ debtcollection['Original Amount'] }}</td>
                            
                        </tr>
                    </tbody>
                </table>
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
