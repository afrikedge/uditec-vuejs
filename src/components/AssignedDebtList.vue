<template>
    <div class="my-5 mx-5">
        <!--  -->
        <customer-list-ribbon 
        pageTitle="Clients"
        componentwithPresentationView="customerListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="customerListRightInfoMaxWidth"
        routeForNewCard="NewCustomer"
        ></customer-list-ribbon>

        <!--  -->
        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° Client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date d'échéance</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant initial</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ouvert</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée le</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée par</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée par</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut initial</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut actuel</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Activité requise</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Commentaire</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="receivable of filteredReceivableList" :key="receivable['Customer No_']" class="is-narrow">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/ReceivablesCard/${ receivable['Customer No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ receivable['Customer No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Sales Mode'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Document Type'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Document No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Posting Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Document Date'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Due Date'] }}</td>                    
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Description'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Original Amount'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Remaining Amount'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Assigned on'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Assigned by'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Assigned to'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Initial Status'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Current Status'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Required Activity'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ receivable['Comment'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="receivable of filteredReceivableList" :key="receivable['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        
                                        <router-link :to="`/ReceivablesCard/${ receivable['Customer No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ receivable['Customer No_'] }} 
                                            </a>
                                        </router-link>
                            
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ receivable['Description'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ receivable['Original Amount']==0 ? '1.000.000.000 Fcfa' : '50 Fcfa' }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ receivable['Sales Mode'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{ receivable['Remaining Amount']==0 ? '1.000.000.000 Fcfa' : '50 Fcfa' }}</span>
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
                    <div :class="{'column':true, 'is-2':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="receivable of filteredReceivableList" :key="receivable['No_']">
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
                                        
                                                <router-link :to="`/ReceivablesCard/${ receivable['No_'] }`">
                                                    <a href="#" class="has-text-orange">
                                                        {{ receivable['No_'] }} 
                                                    </a>
                                                </router-link>
                            
                                            </span>
                                        </p>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left has-text-orange py-0 mt-1" >
                                                <span class="is-size-7 is-underlined">{{ receivable['Description'] }}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0 mt-1">
                                                <span class="is-size-7">{{  receivable['Original Amount']==0 ? '1.000.000.000 Fcfa' : '50 Fcfa' }}</span>
                                            </div>
                                        </div>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left py-0" >
                                                <span class="is-size-7">{{receivable['Sales Mode']}}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0">
                                                <span class="is-size-7">{{  receivable['Remaining Amount']==0 ? '1.000.000.000 Fcfa' : '50 Fcfa' }}</span>
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

    name:'receivable-list',
    components:{
        CustomerInfo,CustomerListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['customerListPresentation']
        }
    },
    setup() {
        const receivableList = ref([])
        const eltToSearch = ref('')
        const filteredReceivableList = computed(()=>
        receivableList.value
        .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Address']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['City']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        ),
     )
        // expose to template and other options API hooks
        return {
            receivableList,
            eltToSearch,
            filteredReceivableList
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
        axios.get(`http://${this.hostname}:3000/app/getADList`)
        .then((result) => {
          this.receivableList = result.data;
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
