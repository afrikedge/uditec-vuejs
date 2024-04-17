<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:90%;">
 
<!---------Composant entête carte----------------------->      
            <div id="card-header-comp">
                <shiptoaddress-card-Header :soNo="ShiptoaddressCardId2" :soDesc="ShipToAddressCard['Name']" pageTitle="Fiche adresse de livraison" 
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
                                <input-select-basic-1 labelInputText="Zone"  :option-list="optionLabelListForServiceZoneCode" v-else></input-select-basic-1> 
                               
                                <input-text labelInputText="Créneau de préférence" :valueInputText="ShipToAddressCard['Time preference']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Créneau de préférence"  :option-list="optionLabelListForTimePreference" v-else></input-select-basic-1> 
                               
                                <input-text labelInputText="Type de route" :valueInputText="ShipToAddressCard['Road Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type de route" v-model="ShipToAddressCard['Road Type']" :option-list="optionLabelListForRoadType" v-else></input-select-basic-1> 

                                
                                <input-text labelInputText="Autres préciser" :valueInputText="ShipToAddressCard['Road Type(Others)']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Autres préciser" v-model="ShipToAddressCard['Road Type(Others)']"  v-else></input-text>
                                
                                <input-text labelInputText="Distance de transport à pied" :valueInputText="ShipToAddressCard['Walking distance']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Distance de transport à pied" v-model="ShipToAddressCard['Walking distance']" :option-list="optionLabelListForWalkingDistance" v-else></input-select-basic-1> 
                               
                                 
                                <input-text labelInputText="Autres préciser" :valueInputText="ShipToAddressCard['Walking distance(Others)']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Autres préciser" v-model="ShipToAddressCard['Walking distance(Others)']"  v-else></input-text>
                               
                                <input-text labelInputText="Emplacement de livraison" :valueInputText="ShipToAddressCard['Delivery Location']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Emplacement de livraison" v-model="ShipToAddressCard['Delivery Location']" :option-list="optionLabelListForDeliveryLocation" v-else></input-select-basic-1> 
                               
                            </div>
                            <div class="column">
                                <input-text labelInputText="Accès moto" :valueInputText="ShipToAddressCard['Motorcycle Access']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Accès moto" v-model="ShipToAddressCard['Motorcycle Access']"  v-else></input-text>
                                
                                <input-text labelInputText="Plan d'accès" :valueInputText="ShipToAddressCard['Access Plan']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Plan d'accès" v-model="ShipToAddressCard['Access Plan']" :option-list="optionLabelListForAccessPlan" v-else></input-select-basic-1> 
                             
                                <input-text labelInputText="Type d'accès" :valueInputText="ShipToAddressCard['Access Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type d'accès" v-model="ShipToAddressCard['Access Type']" :option-list="optionLabelListForAccessType" v-else></input-select-basic-1>   
                                
                                <input-text labelInputText="Type de camion" :valueInputText="ShipToAddressCard['Truck Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type de camion" v-model="ShipToAddressCard['Truck Type']" :option-list="optionLabelListForTruckType" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Parking Publique" :valueInputText="ShipToAddressCard['Public parking presence']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Parking Publique" v-model="ShipToAddressCard['Public parking presence']" :option-list="optionLabelListForPublicParkingPresence" v-else></input-select-basic-1> 
                             
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
import { onMounted,onBeforeMount, ref, watch} from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRoute} from 'vue-router'
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
        const route = useRoute()
        const ShipToAddressCard = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const readOnlyMode = ref(true)
        const hostname = window.location.hostname
        const ShiptoaddressCardId1 = ref('')
        const ShiptoaddressCardId2 = ref('')

        const optionLabelListForServiceZoneCode = ref([])
        const optionLabelListForTimePreference = ref([])
        const optionLabelListForRoadType = ref([])
        const optionLabelListForWalkingDistance = ref([])
        const optionLabelListForDeliveryLocation = ref([])
        const optionLabelListForAccessPlan = ref([])
        const optionLabelListForAccessType = ref([])
        const optionLabelListForTruckType = ref([])
        const optionLabelListForPublicParkingPresence = ref([])
        //variable de success serveur
        let success_message=ref('')
        let is_convertSQ_success = ref(false)

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }


        
        function getOptionLabelList(field){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Service Zone Code]')
                optionLabelListForServiceZoneCode.value=result.data.recordset
                if (field=='[Time preference]')
                optionLabelListForTimePreference.value=result.data.recordset
                if (field=='[Road Type]')
                optionLabelListForRoadType.value=result.data.recordset
                if (field=='[Walking distance]')
                optionLabelListForWalkingDistance.value=result.data.recordset
                if (field=='[Delivery Location]')
                optionLabelListForDeliveryLocation.value=result.data.recordset
                if (field=='[Access Plan]')
                optionLabelListForAccessPlan.value=result.data.recordset
                if (field=='[Access Type]')
                optionLabelListForAccessType.value=result.data.recordset
                if (field=='[Truck Type]')
                optionLabelListForTruckType.value=result.data.recordset
                if (field=='[Public parking presence]')
                optionLabelListForPublicParkingPresence.value=result.data.recordset
    
                   console.log(result.data.recordset[0])
    
            }).catch(err=>console.log(err))
        }

        function getShipToAddressCardInfo(){
            axios.get(`http://${hostname}:3000/app/getShipToAddressCard/${ShiptoaddressCardId1.value}/${ShiptoaddressCardId2.value}`)
            .then(result => {
                ShipToAddressCard.value = result.data.recordset[0]
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

        onMounted(() => {
            if (webUserInfo.name.value){
                getShipToAddressCardInfo()
                getOptionLabelList('[Service Zone Code]')
                getOptionLabelList('[Time preference]')
                getOptionLabelList('[Road Type]')
                getOptionLabelList('[Walking distance]')
                getOptionLabelList('[Delivery Location]')
                getOptionLabelList('[Access Plan]')
                getOptionLabelList('[Access Type]')
                getOptionLabelList('[Truck Type]')
                getOptionLabelList('[Public parking presence]')
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getShipToAddressCardInfo()
                    getOptionLabelList('[Service Zone Code]')
                    getOptionLabelList('[Time preference]')
                    getOptionLabelList('[Road Type]')
                    getOptionLabelList('[Walking distance]')
                    getOptionLabelList('[Delivery Location]')
                    getOptionLabelList('[Access Plan]')
                    getOptionLabelList('[Access Type]')
                    getOptionLabelList('[Truck Type]')
                    getOptionLabelList('[Public parking presence]')
                   

                })
                .catch(err=>console.log(err))
            }
        })

        onBeforeMount(()=>{
            if(route.params.id1 || route.params.id2){
                ShiptoaddressCardId1.value = route.params.id1
                ShiptoaddressCardId2.value = route.params.id2
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
            optionLabelListForRoadType,
            optionLabelListForWalkingDistance,
            optionLabelListForDeliveryLocation,
            optionLabelListForAccessPlan,
            optionLabelListForAccessType,
            optionLabelListForTruckType,
            optionLabelListForPublicParkingPresence
        }
    },
    data(){
        return{

            //nom de l'hote dans l'url 
            hostname:window.location.hostname,
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
            this.$router.push('/ShipToAddressList/CMZCASH')
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