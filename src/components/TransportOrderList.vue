<template>
    <div class="my-5 mx-5">
        
        <transport-list-ribbon 
        pageTitle="Bon de transport"
        componentwithPresentationView="customerListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="customerListRightInfoMaxWidth"
        ></transport-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Numéro</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Statut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Transporteur</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Véhicule</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Chauffeur</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Trajet</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date départ prévue</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Durée prévue</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date retour prévue</th>
                           
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="transport of filteredtransportList" :key="transport['No_']" class="is-narrow">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/TransportOrderCard/${ transport['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ transport['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ transport['TransportOrder Status'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ transport['Carrier No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ transport['Vehicle No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ transport['Driver No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ transport['Route No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(transport['Departure Date (Planned)']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ transport['Duration (Planned)'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(transport['Return Date (Planned)']) }}</td>
                           
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <transport-info class="transport-info"></transport-info>
        </div>
    </div>
    
</template>

<script scoped>
import TransportInfo from './CustomerInfo.vue'
import transportListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'


export default {

    name:'transport-order-list',
    components:{
        TransportInfo,transportListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['customerListPresentation']
        }
    },
    setup() {
        const  transportList = ref([])
        const eltToSearch = ref('')
        const filteredtransportList = computed(()=>
        transportList.value
        .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value)
                 || new String(row['Carrier']).toLowerCase().includes(eltToSearch.value)
                 || new String(row['Vehicle']).toLowerCase().includes(eltToSearch.value)
                 || new String(row['Driver']).toLowerCase().includes(eltToSearch.value)
         ),
     )
        // expose to template and other options API hooks
        return {
            transportList,
            eltToSearch,
            filteredtransportList
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
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else{ return ''} 
        },

    

    },
    
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getRevisionRequestList`)
        .then((result) => {
          this.transportList = result.data;
         
        })
        .catch(err=>console.log(err));
      
    }
}

</script>

<style scoped>
.transport-info{
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
