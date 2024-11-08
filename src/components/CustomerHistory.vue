<template>
    <div class="has-background-light h-100" style="position:fixed;top:0px;bottom: 0px; width:auto;right:15%;left:15%">

        <div class="p-5 has-background-white" style="">
            <customer-history-ribbon
            pageTitle="Historique client"
            bgColor="has-background-white"
            has-border-bottom="false"
            ></customer-history-ribbon>
        </div>
        <div class="has-background-light has-text-left mb-5 pt-1 pb-2"  style="margin-left: 8%;margin-right: 8%;border-bottom: 1px solid lightgray;">
            <div class=" pt-1" v-if="!searchInputIsDisabled">
                <div class="field px-2 has-addons">
                    <div class="control has-icons-left">
                        <input class="input has-border-bottom-orange is-small " type="text" placeholder="Rechercher" 
                        v-model="eltToSearch">
                        <span class="icon is-small is-left">
                        <i class="fas fa-search"></i>
                        </span>
                    </div>
                    <div class="control ">
                        <a href="#" class=" button is-small has-border-bottom-orange" @click="()=>{searchInputIsDisabled=true;eltToSearch=''}">
                            <span class="icon is-small is-left">
                                <i class="fas fa-close"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div class=" pt-1" v-else>
                <a href="#" class="px-3 py-3" @click="searchInputIsDisabled=false">
                    <span class="icon">
                        <i class="fas fa-search"></i>
                    </span>
                    <span class="subtitle is-6">Rechercher</span>
                </a>
            </div>
            
        </div>
        
        <div class="has-background-light" style="overflow-y: hidden;height:auto;position: fixed;bottom:0px;top:130px; width:auto;right:15%;left:15%">
            
            <div style="overflow: scroll;height:100%;margin-left: 8%;margin-right: 8%;">
                <table class="table  is-narrow  is-fullwidth is-hoverable tableFixHead">
                    <thead class=" my-2">
                        <tr > 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date document</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Paiement</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date paiement</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Jour(s) retard</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut échéance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :id="'customerHistory-'+index" v-for="(elt,index) of filteredCustomerHistoryList" :key="'customerHistory-'+index" @mouseover="setLineShadow('customerHistory-'+index)" @mouseout="removeLineShadow('customerHistory-'+index)" >
                            <td class="has-text-left has-background-light">
                                <span class="icon">
                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                </span>
                            </td>
                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Sales Mode'] }}</td>
                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Document No_'] }}</td>
                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Posting Date']) }}</td>
                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Due Date']) }}</td>
                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Amount (LCY)']) }}</td>
                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Payment (LCY)']) }}</td>
                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Payment Date']) }}</td>
                            <td  class="has-text-right has-background-light"> {{ elt['Days late'] }}</td>
                            <td  class="has-text-left has-background-light"> {{ elt['Debt Status'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

<!----------------------------------------------------------->

        <modal-for-selectable-item-list 
            v-if="activeModalForSelectableElementList=='itemList'" 
            :isActive="activeModalForSelectableElementList=='itemList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableItemListModal="(elt)=>fillItemInfoField(elt['No_'])">
            
        </modal-for-selectable-item-list>

        <modal-for-selectable-location-list 
            v-if="activeModalForSelectableElementList=='locationList'" 
            :isActive="activeModalForSelectableElementList=='locationList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableLocationListModal="(elt)=>fillLocationInfoField(elt['Code'])">
        </modal-for-selectable-location-list>


    </div>
    
</template>

<script scoped>
import CustomerHistoryRibbon from './RibbonForCardFormOnly.vue'
import axios from 'axios'
import {computed ,onMounted,ref } from 'vue'



export default {

    name:'customer-history',
    props:['customerNo'],
    components:{
        CustomerHistoryRibbon,
    },
    computed:{
    },
    setup(props) {
        const customerHistoryList = ref([])
        const hostname = window.location.hostname       
        const eltToSearch = ref('')
        const searchInputIsDisabled = ref(true)


        //propriété calculée qui retourne la liste dynamique à afficher
        const filteredCustomerHistoryList = computed(()=>
            customerHistoryList.value
            .filter((row) => new String(row['Sales Mode']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            || new String(row['Document No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            || new String(row['Days late']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            || new String(row['Debt Status']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            || new String(row['Amount (LCY)']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            || new String(row['Payment (LCY)']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        )
        )


        //fonction pour obtenir la liste à afficher
        function getCustomerHistory(){
            axios.get(`http://${hostname}:5000/app/getCUHList?customerId=${props.customerNo}`)
            .then((result) => {
                customerHistoryList.value = result.data;
            })
            .catch(err => {
                console.log('itemAvailabilityError',err)
            });
        }


//gestion des events et triggers
        onMounted(() => {
            getCustomerHistory()
        })





        // expose to template and other options API hooks
        return {
            customerHistoryList,filteredCustomerHistoryList,
            eltToSearch,searchInputIsDisabled,
        }
    },
    data(){
        return {
            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',
        }
    },
    methods:{
        setLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.add('is-hovered-td')
            myElt.classList.add('shadow')
        },
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.remove('is-hovered-td')
            myElt.classList.remove('shadow')
        },
        formatDate(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString()
            }else return ''
        },
        formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits:2 }).format(number)
            }else{
                return 0
            }
        }
    },

}

</script>

<style scoped>

.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: 0px; /* table head will be placed from the top of the table and sticks to it */
    z-index:15000
}

 .is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}

</style>
