<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:90%;">
 
<!---------Composant entête carte----------------------->      
            <div id="card-header-comp">
                <shiptoaddress-card-Header :soNo="ShiptoaddressCardId2" soDesc="ShipToAddressCard['Name']" pageTitle="Fiche adresse de livraison" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban carte adresse destinataire----------------------->      
            <shiptoaddress-card-ribbon
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :cancelEditCardBtnIsDisabled="true"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            routeForNewCard="../../NewShipToAddress"
            ></shiptoaddress-card-ribbon>

<!---------Section formulaire carte adresse destinataire----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire carte adresse destinataire----------------------->                         
                    <div id="general">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('general_content');onglet1_expanded=!onglet1_expanded" v-if="onglet1_expanded">
                                    <span>Général</span>
                                </a>
                                <a @click="expand('general_content');onglet1_expanded=!onglet1_expanded" v-if="!onglet1_expanded">
                                    <span>Général</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Code client" :valueInputText="ShipToAddressCard['Customer No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code client"  v-model="ShipToAddressCard['Customer No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select>
                                
                                <input-text labelInputText="Code contact" :valueInputText="ShipToAddressCard['Contact No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code contact" v-model="ShipToAddressCard['Contact No_']" @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>
                                
                                <input-text labelInputText="Code Adresse" :valueInputText="ShipToAddressCard['Code']" :is_disabled="true" ></input-text>
                               
                                <input-text labelInputText="Nom de l’adresse" :valueInputText="ShipToAddressCard['Name']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Nom de l’adresse" v-model="ShipToAddressCard['Name']"  v-else></input-text>
                                
                                <input-text labelInputText="Adresse:Ligne 1" :valueInputText="ShipToAddressCard['Address']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Adresse:Ligne 1" v-model="ShipToAddressCard['Address']"  v-else></input-text>
                               
                                <input-text labelInputText="Adresse:Ligne 2" :valueInputText="ShipToAddressCard['Address 2']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" v-model="ShipToAddressCard['Address 2']"  v-else></input-text>
                                
                                
                            </div>
                            <div class="column">
                                <input-text labelInputText="Ville" :valueInputText="ShipToAddressCard['City']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Ville" v-model="ShipToAddressCard['City']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-text> 
                               
                                <input-text labelInputText="Téléphone" :valueInputText="ShipToAddressCard['Phone No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Téléphone" v-model="ShipToAddressCard['Phone No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-text> 
                               
                                <input-text labelInputText="Téléphone Mobile" :valueInputText="ShipToAddressCard['Mobile Phone No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Téléphone Mobile" v-model="ShipToAddressCard['Mobile Phone No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-text> 
                                
                                <input-text labelInputText="Lieu" :valueInputText="ShipToAddressCard['Place']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Lieu" v-model="ShipToAddressCard['Place']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-text>
                                
                                <input-text labelInputText="Quartier" :valueInputText="ShipToAddressCard['Neighborhood']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Quartier" v-model="ShipToAddressCard['Neighborhood']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                    <!---------sous-Section ongle 2 formulaire carte adresse destinataire----------------------->                         
                    <div id="details">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('details_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                    <span>Détails</span>
                                </a>
                                <a @click="expand('details_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                    <span>Détails</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="details_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Zone" :valueInputText="ShipToAddressCard['Service Zone Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Zone" v-model="ShipToAddressCard['Service Zone Code']" :option-list="`optionLabelListForServiceZoneCode`" v-else></input-select-basic-1> 
                               
                                <input-text labelInputText="Créneau de préférence" :valueInputText="ShipToAddressCard['Time preference']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Créneau de préférence" v-model="ShipToAddressCard['Time preference']" :option-list="`optionLabelListForTimePreference`" v-else></input-select-basic-1> 
                               
                                <input-text labelInputText="Type de route" :valueInputText="ShipToAddressCard['Road Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type de route" v-model="ShipToAddressCard['Road Type']" :option-list="`optionLabelListForServiceRoadType`" v-else></input-select-basic-1> 

                                
                                <input-text labelInputText="Autres préciser" :valueInputText="ShipToAddressCard['Road Type(Others)']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Autres préciser" v-model="ShipToAddressCard['Road Type(Others)']"  v-else></input-text>
                                
                                <input-text labelInputText="Distance de transport à pied" :valueInputText="ShipToAddressCard['Walking distance']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Distance de transport à pied" v-model="ShipToAddressCard['Walking distance']" :option-list="`optionLabelListForServiceWalkingDistance`" v-else></input-select-basic-1> 
                               
                                 
                                <input-text labelInputText="Autres préciser" :valueInputText="ShipToAddressCard['Walking distance(Others)']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Autres préciser" v-model="ShipToAddressCard['Walking distance(Others)']"  v-else></input-text>
                               
                                <input-text labelInputText="Emplacement de livraison" :valueInputText="ShipToAddressCard['Delivery Location']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Emplacement de livraison" v-model="ShipToAddressCard['Delivery Location']" :option-list="`optionLabelListForServiceDeliveryLocation`" v-else></input-select-basic-1> 
                               
                            </div>
                            <div class="column">
                                <input-text labelInputText="Accès moto" :valueInputText="ShipToAddressCard['Motorcycle Access']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Accès moto" v-model="ShipToAddressCard['Motorcycle Access']"  v-else></input-text>
                                
                                <input-text labelInputText="Plan d'accès" :valueInputText="ShipToAddressCard['Access Plan']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Plan d'accès" v-model="ShipToAddressCard['Access Plan']" :option-list="`optionLabelListForServiceAccessPlan`" v-else></input-select-basic-1> 
                             
                                <input-text labelInputText="Type d'accès" :valueInputText="ShipToAddressCard['Access Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type d'accès" v-model="ShipToAddressCard['Access Type']" :option-list="`optionLabelListForServiceAccessType`" v-else></input-select-basic-1>   
                                
                                <input-text labelInputText="Type de camion" :valueInputText="ShipToAddressCard['Truck Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type de camion" v-model="ShipToAddressCard['Truck Type']" :option-list="`optionLabelListForServiceAccessTruckType`" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Parking Publique" :valueInputText="ShipToAddressCard['Public parking presence']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Parking Publique" v-model="ShipToAddressCard['Public parking presence']" :option-list="`optionLabelListForServicePublicParkingPresence`" v-else></input-select-basic-1> 
                             
                                <input-text labelInputText="Remarques" :valueInputText="ShipToAddressCard['Remarks']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Remarques" v-model="ShipToAddressCard['Remarks']"  v-else></input-text>
                                
                                <input-text labelInputText="Plan de masse" :valueInputText="ShipToAddressCard['Ground plan']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Plan de masse" v-model="ShipToAddressCard['Ground plan']"  v-else></input-text>
                                
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                </div>
               
            </div>
        </div>
 <!----------------------------------------------------------->
    <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'"  
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
    </modal-for-selectable-customer-list>

    <modal-for-selectable-contact-list 
    v-if="activeModalForSelectableElementList=='contactList'" 
    :isActive="activeModalForSelectableElementList=='contactList'" 
    @closeModal="activeModalForSelectableElementList=''"
    :customerNo="ShipToAddressCard['Customer No_']" 
    @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
    </modal-for-selectable-contact-list>
    </div> 
</template>
<script>
import inputSelect from './input/input-select.vue'
import shiptoaddressCardHeader from './HeaderForCard.vue'
import shiptoaddressCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { ref, watch} from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
export default {
    name:'ship-to-address-card',
    components:{
        shiptoaddressCardHeader,inputText,
        shiptoaddressCardRibbon,
        ModalForSelectableCustomerList,
        inputSelect,inputSelectBasic1,
        ModalForSelectableContactList 
    },
    setup(){
        const ShipToAddressCard = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const readOnlyMode = ref(true)
        const hostname = window.location.hostname
        const optionLabelListForServiceZoneCode = ref([])
        const optionLabelListForTimePreference = ref([])
        const optionLabelListForServiceRoadType = ref([])
        const optionLabelListForServiceWalkingDistance = ref([])
        const optionLabelListForServiceDeliveryLocation = ref([])
        const optionLabelListForServiceAccessPlan = ref([])
        const optionLabelListForServiceAccessType = ref([])
        const optionLabelListForServiceAccessTruckType = ref([])
        const optionLabelListForServicePublicParkingPresence = ref([])
        //variable de success serveur
        let success_message=ref('')
        let is_convertSQ_success = ref(false)




        
        function getOptionLabelList(field){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='Service Zone Code')
                optionLabelListForServiceZoneCode.value=result.data.recordset
                if (field=='Time preference')
                optionLabelListForTimePreference.value=result.data.recordset
                if (field=='Road Type')
                optionLabelListForServiceRoadType.value=result.data.recordset
                if (field=='Walking distance')
                optionLabelListForServiceWalkingDistance.value=result.data.recordset
                if (field=='Delivery Location')
                optionLabelListForServiceDeliveryLocation.value=result.data.recordset
                if (field=='Access Plan')
                optionLabelListForServiceAccessPlan.value=result.data.recordset
                if (field=='Access Type')
                optionLabelListForServiceAccessType.value=result.data.recordset
                if (field=='Truck Type')
                optionLabelListForServiceAccessTruckType.value=result.data.recordset
                if (field=='Public parking presence')
                optionLabelListForServicePublicParkingPresence.value=result.data.recordset
    
                    console.log(result.data.recordset)
    
            }).catch(err=>console.log(err))
        }
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

      function setReadWriteModeIsDisabled(){
          readOnlyModeIsDisabled.value=false
      }

      function fillCustomerInfoField(shipto){
                 ShipToAddressCard.value["No_"]=shipto['No_']
                 ShipToAddressCard.value["Name"]=shipto['Name']
                 ShipToAddressCard.value["Lead Status"]=shipto['Lead Status']
                 ShipToAddressCard.value["City"]=shipto['City']
                 ShipToAddressCard.value["Item Category"]=shipto['Item Category']
        }

        function fillContactInfoField(shipto){
            ShipToAddressCard.value["Customer No_"]= shipto['No_']
            }
        
        watch(success_message, () => {
            if (is_convertSQ_success.value==false){
                readOnlyModeIsDisabled.value=false
            }
        })
        // expose to template and other options API hooks
        return {
            ShipToAddressCard,
            readOnlyMode,
            readOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            fillCustomerInfoField,
            fillContactInfoField,
            setReadOnlyModeIsDisabled,
            success_message,
            getOptionLabelList,


            optionLabelListForServiceZoneCode,
            optionLabelListForTimePreference,
            optionLabelListForServiceRoadType,
            optionLabelListForServiceWalkingDistance,
            optionLabelListForServiceDeliveryLocation,
            optionLabelListForServiceAccessPlan,
            optionLabelListForServiceAccessType,
            optionLabelListForServiceAccessTruckType,
            optionLabelListForServicePublicParkingPresence
        }
    },
    data(){
        return{
            //indique la route active
            ShiptoaddressCardId1:this.$route.params.id1,
            ShiptoaddressCardId2:this.$route.params.id2,
            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveTab('customers')
            this.$router.push('/ShipToAddressList/:id')
        },
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='history_content') myElt.style.maxHeight='250px'
            else myElt.style.maxHeight='500px'
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
            console.log(myElt.style.maxHeight)
            myElt.style.maxHeight="0px"
        }
    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getShipToAddressCard/${this.ShiptoaddressCardId1}/${this.ShiptoaddressCardId2}`)
        .then(result => {
            this.ShipToAddressCard = result.data.recordset[0]
        }).catch(err=>console.log(err))

    },

}
</script>
<style scoped>
#general_content,#details_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s;
}

.has-border-bottom-grey{
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
}
</style>