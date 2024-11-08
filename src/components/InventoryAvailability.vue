<template>
    <div class="my-5 mx-5">
        
        <inventory-availability-ribbon 
        pageTitle="Disponibilité article par magasin"
        @onUpdatingCard="resetLocation"
        :updateBtnIsDisabled="false"
        :fa-pulseIsDisabled="faPulseIsDisabled"
        bgColor="has-background-light"
        has-border-bottom="false"
        ></inventory-availability-ribbon>

        
        <div class="has-background-light" style="height: 750px;">
            <div class="columns has-background-white">
                <div class="column is-narrow">
                    <input-select v-model="itemToSearch" labelInputText="Code article" @openModal="activeModalForSelectableElementList='itemList'"></input-select>
                    <input-select v-model="locationToSearch" labelInputText="Code magasin" @openModal="activeModalForSelectableElementList='locationList'"></input-select>
                </div>
                <div class="column"></div>
            </div>
            <div class="columns">
                <div class="column mt-5 box shadow " id="customer-column" style="overflow-y: scroll; height: 400px;">
                    <table class="table  is-narrow is-hoverable is-bordered tableFixHead">
                        <thead class=" my-2">
                            <tr> 
                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code magasin</th>
                                <th class="has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Stock en magasin</th>
                                <th class="has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Stock sur commande en magasin</th>
                                <th class="has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Stock sur ordre de transfert</th>
                                <th class="has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Disponible en magasin</th>
                            </tr>   
                        </thead>
                        <tbody>
                            <tr :id="index" v-for="(availabilityLine,index) of filteredInventoryAvailabilityList" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)">
                                <td class="has-text-left has-background-light is-narrow has-text-weight-bold" > {{ availabilityLine['Location Code'] }}</td>
                                <td class="has-text-right has-background-light "> {{ Math.round(availabilityLine['In Stock Location']) }}</td>
                                <td class="has-text-right has-background-light "> {{ Math.round(availabilityLine['On Sales Location']) }}</td>
                                <td class="has-text-right has-background-light "> {{ Math.round(availabilityLine['On transfert Location']) }}</td>
                                <td class="has-text-right has-background-light "> {{ Math.round(availabilityLine['In Stock Location']) - Math.round(availabilityLine['On Sales Location']) - Math.round(availabilityLine['On transfert Location'])}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="errorFetchingData">
                        {{ errorFetchingData }}
                    </div>
                </div>
                <div class="column mt-5 is-narrow">
                    <div class="columns is-mobile is- is-centered">
                        <div class="column has-background-orange mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-3">{{ inStockGlobal }}</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light" >
                                Stock global
                            </h6>
                        </div>
                        <div class="column has-background-orange mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-3">{{ onSalesGlobal }}</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light" >
                                Stock sur commande global
                            </h6>
                        </div>
                        <div class="column has-background-orange mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-3">{{ inStockGlobal - onSalesGlobal }}</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light" >
                                Stock disponible global
                            </h6>
                        </div>
                        <div class="column has-background-orange mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-3">{{ onPurchaseGlobal }}</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light" >
                                Stock en cours d’achat global
                            </h6>
                        </div>
                    </div>                
                </div>
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
import InventoryAvailabilityRibbon from './RibbonForCardFormOnly.vue'
import axios from 'axios'
import {computed ,onMounted,ref, watch } from 'vue'
import inputSelect from './input/input-select.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import ModalForSelectableLocationList from './ModalForSelectableLocationList.vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'



export default {

    name:'inventory-availability',
    props:['itemNo'],
    components:{
        InventoryAvailabilityRibbon,
        inputSelect,
        ModalForSelectableItemList,ModalForSelectableLocationList
    },
    computed:{
    },
    setup(props) {
        const inventoryAvaibilityList = ref([])
        const hostname = window.location.hostname       
        const locationToSearch = ref('')
        const faPulseIsDisabled = ref(true)
        const itemToSearch = ref('')
        const globalAvailabilityInfo = {
            inStockGlobal: ref(0),
            onSalesGlobal: ref(0),
            onPurchaseGlobal: ref(0)
        }
        const errorFetchingData = ref('')


        //propriété calculée qui retourne la liste dynamique à afficher
        const filteredInventoryAvailabilityList = computed(()=>
            inventoryAvaibilityList.value
            .filter((row) => new String(row['Location Code']).toLowerCase().includes(locationToSearch.value.toLowerCase()))
        )

//fonctions pour charger pour remplir nos champs depuis des modal de sélection
        function fillItemInfoField(itemNo){
            itemToSearch.value=itemNo
        }

        function fillLocationInfoField(locationCode){
            locationToSearch.value=locationCode
        }

        function resetLocation(){
            locationToSearch.value=''
        }

        //fonction pour obtenir la liste à afficher
        function getInventoryAvaibilityPerItem(itemNo){
            axios.get(`http://${hostname}:5000/app/getInventoryAvaibilityPerItem?itemNo=${itemNo}`)
            .then((result) => {
                if(errorFetchingData.value){
                    errorFetchingData.value =''
                }
                inventoryAvaibilityList.value = result.data;
                globalAvailabilityInfo.inStockGlobal.value = Math.round(inventoryAvaibilityList.value[0]['In Stock Global'])
                globalAvailabilityInfo.onSalesGlobal.value = Math.round(inventoryAvaibilityList.value[0]['On Sales Global'])
                globalAvailabilityInfo.onPurchaseGlobal.value = Math.round(inventoryAvaibilityList.value[0]['On Purchase Global'])
            })
            .catch(err => {
                console.log('itemAvailabilityError',err)
                if(err.response.status=='404'){
                    inventoryAvaibilityList.value = []
                    errorFetchingData.value = err.response.data.message
                    globalAvailabilityInfo.inStockGlobal.value = 0
                    globalAvailabilityInfo.onSalesGlobal.value = 0
                    globalAvailabilityInfo.onPurchaseGlobal.value = 0
                }
                //console.log(err.response.data.message,err.response.status)
            });
        }


//gestion des events et triggers
        onMounted(() => {
            if(props.itemNo)
                itemToSearch.value = props.itemNo

                if(useWebUserInfoStore().defaultLocation)
                    locationToSearch.value = useWebUserInfoStore().defaultLocation
        })
        watch(itemToSearch,() => getInventoryAvaibilityPerItem(itemToSearch.value) )





        // expose to template and other options API hooks
        return {
            inventoryAvaibilityList,filteredInventoryAvailabilityList,
            locationToSearch,itemToSearch,
            getInventoryAvaibilityPerItem,
            faPulseIsDisabled,
            fillItemInfoField,fillLocationInfoField,
            ...globalAvailabilityInfo,
            errorFetchingData,
            resetLocation,
            
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
    },

}

</script>

<style scoped>

.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
 }

 .is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}

</style>
