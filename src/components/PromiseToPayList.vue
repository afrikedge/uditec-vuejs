<template>
    <div class="my-5 mx-5">
        
        <customer-list-ribbon 
        pageTitle="Promesse de règlement"
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° Contact</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant promis</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant honoré</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Activité d'origine</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Type Activité de rappel</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Statut</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="promise of filteredpromiseList" :key="promise['No_']" class="is-narrow">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/PromiseToPayCard/${ promise['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ promise['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ promise['Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ promise['Contact No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ promise['Description'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ promise['Promised amount']==0 ? '1.000.000.000 Fcfa' : '50 Fcfa'  }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ promise['Honored amount']==0 ? '1.000.000.000.000 Fcfa' : '150 Fcfa' }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ promise['Originated activity'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ promise['Reminding Activity']==0 ?  'IA developper' :'Webmaster' }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ promise['Status']==0 ? 'Actif' : 'Non actif' }}</td>
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

    name:'promisetopay-list',
    components:{
        CustomerInfo,CustomerListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['customerListPresentation']
        }
    },
    setup() {
        const promiseList = ref([])
        const eltToSearch = ref('')
        const filteredpromiseList = computed(()=>
        promiseList.value
        .filter((row) => new String(row['Reminding Activity']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Status']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Promised amount']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Honored amount']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        ),
     )
        // expose to template and other options API hooks
        return {
            promiseList,
            eltToSearch,
            filteredpromiseList
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
        axios.get(`http://${this.hostname}:3000/app/getPPList`)
        .then((result) => {
          this.promiseList = result.data;
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
