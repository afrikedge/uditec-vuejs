<template>
    <div class="my-5 mx-5">
        
        <service-list-ribbon
            pageTitle="Demande Service"
            componentwithPresentationView="customerListPresentation"
            :hasAThirdPresentation="true"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
            componentWithCompInfo="customerListRightInfoMaxWidth"
        ></service-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Numéro</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Statut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Sous garantie</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Contrat</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Article</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Référence</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Crée le</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Crée par</th>
                           
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="service of filteredserviceList" :key="service['No_']" class="is-narrow">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/ServiceRequestCard?serviceNo=${ service['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ service['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ service['Service Request Status'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ service['Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ service['Warranty Status'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ service['Contrat No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ service['Item No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ service['Reference'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(service['Created On']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ service['Created By'] }}</td>
                           
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <service-info class="service-info"></service-info>
        </div>
    </div>
    
</template>

<script scoped>
import ServiceInfo from './CustomerInfo.vue'
import serviceListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'


export default {

    name:'service-order-list',
    components:{
        ServiceInfo,serviceListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['customerListPresentation']
        }
    },
    setup() {
        const  serviceList = ref([])
        const eltToSearch = ref('')
        const filteredserviceList = computed(()=>
        serviceList.value
        .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value)
                 || new String(row['Carrier']).toLowerCase().includes(eltToSearch.value)
                 || new String(row['Vehicle']).toLowerCase().includes(eltToSearch.value)
                 || new String(row[' Driver No_']).toLowerCase().includes(eltToSearch.value)
         ),
     )
        // expose to template and other options API hooks
        return {
            serviceList,
            eltToSearch,
            filteredserviceList
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
        axios.get(`http://${this.hostname}:3000/app/getServiceRequestList`)
        .then((result) => {
            console.log(result.data.result[0])
          this.serviceList = result.data.result;
         
        })
        .catch(err=>console.log(err));
      
    }
}

</script>

<style scoped>
.service-info{
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
