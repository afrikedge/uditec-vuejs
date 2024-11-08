<template>
    <div class="my-5 mx-5">
        
        <item-availability-campaign-ribbon 
        pageTitle="Disponibilité article par campagne"
        :updateBtnIsDisabled="false"
        bgColor="has-background-light"
        has-border-bottom="false"
        ></item-availability-campaign-ribbon>

        
        <div class="has-background-light" style="height: 750px;">
            <div class="columns has-background-white">
                <div class="column is-narrow">
                    <input-select v-model="campaignToSearch" labelInputText="Code promo" @openModal="activeModalForSelectableElementList='campaignList'"></input-select>
                    <input-text v-model="itemToSearch" labelInputText="Article"></input-text>
                </div>
                <div class="column"></div>
            </div>
            <div class="columns">
                <div class="column mt-5 box shadow is-narrow" id="customer-column" style="overflow-y: scroll; height: 400px;">
                    <table class="table  is-narrow is-hoverable is-bordered tableFixHead">
                        <thead class=" my-2">
                            <tr> 
                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code Article</th>
                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Description article</th>
                                <th class="has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Unité de vente</th>
                                <th class="has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Prix unitaire</th>
                                <th class="has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Qunatité minimum</th>
                            </tr>   
                        </thead>
                        <tbody>
                            <tr :id="index" v-for="(availabilityLine,index) of filteredItemAvailabilityList" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)">
                                <td class="is-narrow has-text-left has-background-light is-narrow has-text-weight-bold" > {{ availabilityLine['Item No_'] }}</td>
                                <td class="is-narrow has-text-left has-background-light "> {{ availabilityLine['Description'] }}</td>
                                <td class="is-narrow has-text-right has-background-light "> {{ availabilityLine['Unit of Measure Code'] }}</td>
                                <td class="is-narrow has-text-right has-background-light "> {{ Math.round(availabilityLine['Unit Price']) }}</td>
                                <td class="is-narrow has-text-right has-background-light "> {{ availabilityLine['Minimum Quantity'] }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="errorFetchingData">
                        {{ errorFetchingData }}
                    </div>
                </div>
            </div>
        </div>

<!----------------------------------------------------------->

        <modal-for-selectable-campaign-list 
            v-if="activeModalForSelectableElementList=='campaignList'" 
            :isActive="activeModalForSelectableElementList=='campaignList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCampaignListModal="(elt)=>fillCampaignInfoField(elt['No_'])">
        </modal-for-selectable-campaign-list>


    </div>
    
</template>

<script scoped>
import ItemAvailabilityCampaignRibbon from './RibbonForCardFormOnly.vue'
import axios from 'axios'
import {computed ,onMounted,ref, watch } from 'vue'
import inputSelect from './input/input-select.vue'
import inputText from './input/input-text.vue'
import ModalForSelectableCampaignList from './ModalForSelectableCampaignList.vue'



export default {

    name:'item-availability-per-campaign',
    props:['itemNo','campaignNo'],
    components:{
        ItemAvailabilityCampaignRibbon,
        inputSelect,inputText,
        ModalForSelectableCampaignList
    },
    computed:{
    },
    setup(props) {
        const itemAvaibilityList = ref([])
        const hostname = window.location.hostname       
        const campaignToSearch = ref('')
        const itemToSearch = ref('')
        const errorFetchingData = ref('')

        //propriété calculée qui retourne la liste dynamique à afficher
        const filteredItemAvailabilityList = computed(()=>
            itemAvaibilityList.value
            .filter((row) => new String(row['Item No_']).toLowerCase().includes(itemToSearch.value.toLowerCase())
                    || new String(row['Description']).toLowerCase().includes(itemToSearch.value.toLowerCase()) )
        )

        //fonction pou remplir les champs du formulaire par la ligne sélectionnée dans le modal
        function fillCampaignInfoField(campaignNo){
            campaignToSearch.value=campaignNo
        }

        //fonction pour obtenir la liste à afficher
        function getItemAvaibilityPerCampaign(campaignNo){
            axios.get(`http://${hostname}:5000/app/getItemAvaibilityPerCampaign?campaignNo=${campaignNo}`)
            .then((result) => {
                if(errorFetchingData.value){
                    errorFetchingData.value =''
                }
                itemAvaibilityList.value = result.data;
            })
            .catch(err=> {
                console.log('itemAvailabilityError',err)
                if(err.response.status=='404'){
                itemAvaibilityList.value = []
                errorFetchingData.value = err.response.data.message
                }
            });
        }

//gestion des events et triggers
        onMounted(() => {
            if(props.itemNo)
                itemToSearch.value = props.itemNo

            if(props.campaignNo)
                campaignToSearch.value = props.campaignNo
        })
        watch(campaignToSearch,() => getItemAvaibilityPerCampaign(campaignToSearch.value) )





        // expose to template and other options API hooks
        return {
            itemAvaibilityList,filteredItemAvailabilityList,
            campaignToSearch,itemToSearch,
            getItemAvaibilityPerCampaign,
            fillCampaignInfoField,
            errorFetchingData,            
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
