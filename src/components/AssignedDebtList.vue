<template>
    <div class="my-5 mx-5">
        
        <assigned-debt-list-ribbon 
        pageTitle="Créances"
        componentwithPresentationView="assignedDebtListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="assignedDebtRightInfoMaxWidth"
        :displayCardBtnDisabled="false"
        ></assigned-debt-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date d'échéance</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant initial</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ouvert</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut initial</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut actuel</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="assignedDebt of filteredAssignedDebtList" :key="assignedDebt['Document No_']" class="is-narrow">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/AssignedDebtCard/${assignedDebt['Document No_']}`">
                                    <a href="#" class="has-text-orange">
                                        {{ assignedDebt['Document No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ assignedDebt['Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ assignedDebt['Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ assignedDebt['Sales Mode'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(assignedDebt['Posting Date']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(assignedDebt['Document Date']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(assignedDebt['Due Date']) }}</td>                    
                            <td class="has-text-left has-background-light is-narrow"> {{ assignedDebt['Description'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ assignedDebt['Original Amount'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ assignedDebt['Remaining Amount'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ assignedDebt['Initial Status'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ assignedDebt['Current Status'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-2':assignedDebtRightInfoMaxWidth=='0px', 'is-3':assignedDebtRightInfoMaxWidth=='800px'}" v-for="assignedDebt of filteredAssignedDebtList" :key="assignedDebt['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        <router-link :to="`/AssignedDebtCard/${ assignedDebt['Document No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ assignedDebt['Document No_'] }} 
                                            </a>
                                        </router-link>
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ assignedDebt['Description'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ assignedDebt['Original Amount'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ assignedDebt['Sales Mode'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{ assignedDebt['Remaining Amount'] }}</span>
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
            <customer-info class="customer-info"></customer-info>
        </div>
    </div>
    
</template>

<script scoped>
import CustomerInfo from './CustomerInfo.vue'
import AssignedDebtListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'


export default {

    name:'assigned-debt-list',
    components:{
        CustomerInfo,AssignedDebtListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['assignedDebtListPresentation']
        }
    },
    setup() {
        const assignedDebtList = ref([])
        const eltToSearch = ref('')
        const filteredAssignedDebtList = computed(()=>
        assignedDebtList.value
        .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Description']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        ),
     )
        // expose to template and other options API hooks
        return {
            assignedDebtList,
            eltToSearch,
            filteredAssignedDebtList
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            assignedDebtRightInfoMaxWidth:useNavigationTabStore().tabRightInfo.assignedDebtRightInfoMaxWidth,
            
            //nom de l'hote dans l'url 
            hostname:window.location.hostname       
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.assignedDebtRightInfoMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('assignedDebtRightInfoMaxWidth','800px')
                this.assignedDebtRightInfoMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('assignedDebtRightInfoMaxWidth','0px')
                this.assignedDebtRightInfoMaxWidth='0px'
            }
        },
        formatDateHour(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
            else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
        },
        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
            else return new Date(date).toLocaleDateString()
        },

    },
    
    mounted(){
        axios.get(`http://${this.hostname}:5000/app/getAssignedDebtList`)
        .then((result) => {
          this.assignedDebtList = result.data;
        })
        .catch(err=>console.log(err));
      
    }
}

</script>

<style scoped>
.customer-info{
    max-width: v-bind(assignedDebtRightInfoMaxWidth);
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
