ext<template>
    <div :class="{'modal':true , 'is-active': true, }" >
        <div class="modal-background has-background-white" style="opacity:0.3">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:85%;">
 
<!---------Composant entête carte----------------------->      
            <div id="card-header-comp">
                <ship-to-address-card-Header :soNo="shipToAddressCardId2" :soDesc="shipToAddressCardHeader['Name']" pageTitle="Fiche adresse de livraison" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban carte adresse destinataire----------------------->      
            <ship-to-address-card-ribbon
            routeForNewCard="../../NewShipToAddress"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            :editCardBtnIsDisabled="false"
            :cancelEditCardBtnIsDisabled="false"
            :newCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            ></ship-to-address-card-ribbon>

<!---------Composant message d'enregistrement en cours ou d'erreur ou de success----------------------->      
            <article v-if="submitting_message" class="" >
                <span class="icon">
                    <i class="fas fa-spinner fa-pulse"></i>
                </span>
                <span class="subtitle is-7"> {{ submitting_message }} </span>
            </article>

            <article v-if="error_message" class="message is-danger shadow" >
                <div class="message-header">
                    <p class="is-size-7">
                        <span class="icon has-text-danger">
                        <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        Error Message
                    </p>
                    <button class="delete" aria-label="delete" @click="error_message='';error_message_code=''"></button>
                </div>
                <div class="message-body is-size-7">
                    <span> {{ error_message }}</span><br>
                    <span v-if="error_message_code"> Code erreur: {{ error_message_code }}</span>
                </div>
            </article>

            <article v-if="success_message" class="message is-primary shadow">
                <div class="message-header">
                        <span class="subtitle is-7 m-0 has-text-white"> 
                            <span class="icon ">
                                <i class="fas fa-check"></i>
                            </span>
                            {{ success_message }}
                        </span>
                    <button class="delete" aria-label="delete" @click="success_message=''"></button>
                </div>
            </article>

<!---------Section formulaire carte adresse destinataire----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire carte adresse destinataire----------------------->                         
                    <div id="general">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('general_content');onglet1_expanded=!onglet1_expanded" v-if="onglet1_expanded">
                                    <span>Général</span>
                                </a>
                                <a @click="expand('general_content');onglet1_expanded=!onglet1_expanded" v-else>
                                    <span>Général</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet1_expanded">Afficher plus</div>
                            <div class="column is-narrow py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3">{{ shipToAddressCardHeader['Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ shipToAddressCardHeader['Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ shipToAddressCardHeader['Customer No_'] }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Code client" :valueInputText="shipToAddressCardHeader['Customer No_']" :is_disabled="true"></input-text>
                                <!-----input-select labelInputText="Code client"  v-model="shipToAddressCardHeader['Customer No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select---->
                                
                                <input-text labelInputText="Code contact" :valueInputText="shipToAddressCardHeader['Contact No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code contact" v-model="shipToAddressCardHeader['Contact No_']" @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>
                                
                                <input-text labelInputText="Code Adresse" :valueInputText="shipToAddressCardHeader['Code']" :is_disabled="true" ></input-text>
                               
                                <input-text labelInputText="Nom de l’adresse" v-model="shipToAddressCardHeader['Name']" :valueInputText="shipToAddressCardHeader['Name']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Adresse:Ligne 1" v-model="shipToAddressCardHeader['Address']" :valueInputText="shipToAddressCardHeader['Address']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                               
                                <input-text labelInputText="Adresse:Ligne 2" v-model="shipToAddressCardHeader['Address 2']" :valueInputText="shipToAddressCardHeader['Address 2']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Ville" v-model="shipToAddressCardHeader['City']" :valueInputText="shipToAddressCardHeader['City']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                               
                                <input-text labelInputText="Téléphone" v-model="shipToAddressCardHeader['Phone No_']" :valueInputText="shipToAddressCardHeader['Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                               
                                <input-text labelInputText="Téléphone Mobile" v-model="shipToAddressCardHeader['Mobile Phone No_']" :valueInputText="shipToAddressCardHeader['Mobile Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                
                                <input-text labelInputText="Lieu" v-model="shipToAddressCardHeader['Place']" :valueInputText="shipToAddressCardHeader['Place']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Quartier" v-model="shipToAddressCardHeader['Neighborhood']" :valueInputText="shipToAddressCardHeader['Neighborhood']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
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
                                <a @click="expand('details_content');onglet2_expanded=!onglet2_expanded" v-else>
                                    <span>Détails</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet2_expanded">Afficher plus</div>
                            <!----div class="column is-narrow py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'SM : '+shipToAddressCardHeader['Sales Mode'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ 'CP : '+ shipToAddressCardHeader['Payment Terms Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'MP : '+shipToAddressCardHeader['Payment Method Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ shipToAddressCardHeader['VAT Bus_ Posting Group']}}</span>
                            </div---->
                        </div>
                        <div id="details_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Zone" :valueInputText="shipToAddressCardHeader['Service Zone Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Zone" v-model="shipToAddressCardHeader['Service Zone Code']" :option-list="optionLabelListForServiceZoneCode" v-else></input-select-basic-1> 
                               
                                <input-text labelInputText="Créneau de préférence" :valueInputText="timePreferenceLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Créneau de préférence" v-model="shipToAddressCardHeader['Time preference']" :option-list="optionLabelListForTimePreference" v-else></input-select-basic-1> 
                               
                                <input-text labelInputText="Type de route" :valueInputText="roadTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type de route" v-model="shipToAddressCardHeader['Road Type']" :option-list="optionLabelListForRoadType" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Type de route - Autre préciser" v-model="shipToAddressCardHeader['Road Type (Others)']" :valueInputText="shipToAddressCardHeader['Road Type (Others)']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Distance de transport à pied" :valueInputText="walkingDistanceLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Distance de transport à pied" v-model="shipToAddressCardHeader['Walking distance']" :option-list="optionLabelListForWalkingDistance" v-else></input-select-basic-1> 
                                 
                                <input-text labelInputText="Distance de transport à pied - Autre préciser" v-model="shipToAddressCardHeader['Walking distance (Others)']" :valueInputText="shipToAddressCardHeader['Walking distance (Others)']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                               
                                <input-text labelInputText="Emplacement de livraison" :valueInputText="deliveryLocationLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Emplacement de livraison" v-model="shipToAddressCardHeader['Delivery Location']" :option-list="optionLabelListForDeliveryLocation" v-else></input-select-basic-1> 
                            </div>
                            <div class="column">
                                <input-number labelInputText="Accès moto" v-model="shipToAddressCardHeader['Motorcycle Access']" :valueInputText="shipToAddressCardHeader['Motorcycle Access']" :is_disabled="!readOnlyModeIsDisabled"></input-number>
                                
                                <input-text labelInputText="Plan d'accès" :valueInputText="accessPlanLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Plan d'accès" v-model="shipToAddressCardHeader['Access Plan']" :option-list="optionLabelListForAccessPlan" v-else></input-select-basic-1> 
                             
                                <input-text labelInputText="Type d'accès" :valueInputText="accessTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type d'accès" v-model="shipToAddressCardHeader['Access Type']" :option-list="optionLabelListForAccessType" v-else></input-select-basic-1>   
                                
                                <input-text labelInputText="Type de camion" :valueInputText="truckTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type de camion" v-model="shipToAddressCardHeader['Truck Type']" :option-list="optionLabelListForTruckType" v-else></input-select-basic-1> 
                                
                                <input-number labelInputText="Parking Publique" v-model="shipToAddressCardHeader['Public parking presence']" :valueInputText="shipToAddressCardHeader['Public parking presence']" :is_disabled="!readOnlyModeIsDisabled"></input-number>

                                <input-text labelInputText="Remarques" v-model="shipToAddressCardHeader['Remarks']" :valueInputText="shipToAddressCardHeader['Remarks']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Plan de masse" v-model="shipToAddressCardHeader['Ground plan']" :valueInputText="shipToAddressCardHeader['Ground plan']" :is_disabled="!readOnlyModeIsDisabled"></input-text>                                
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                </div>
               
            </div>
        </div>
 <!----------------------------------------------------------->

    <modal-for-selectable-contact-list 
    v-if="activeModalForSelectableElementList=='contactList'" 
    :isActive="activeModalForSelectableElementList=='contactList'" 
    @closeModal="activeModalForSelectableElementList=''"
    :customerNo="shipToAddressCardHeader['Customer No_']" 
    @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
    </modal-for-selectable-contact-list>
    </div> 
</template>
<script>
import inputSelect from './input/input-select.vue'
import shipToAddressCardHeader from './HeaderForCard.vue'
import shipToAddressCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputNumber from './input/input-number.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { useRoute,useRouter } from 'vue-router'
import { onBeforeMount, onMounted, ref, watch} from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
//import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
export default {
    name:'ship-to-address-card',
    components:{
        shipToAddressCardHeader,inputText,inputNumber,
        shipToAddressCardRibbon,
        //ModalForSelectableCustomerList,
        inputSelect,inputSelectBasic1,
        ModalForSelectableContactList 
    },
    props:['addressNo','customerNo'],
    setup(props){
        const hostname = window.location.hostname
        const shipToAddressCardId1 = useRoute().params.id1
        const shipToAddressCardId2 = useRoute().params.id2
        const router = useRouter()

        const shipToAddressCardHeader = ref({})
        const readOnlyModeIsDisabled = ref(false)        

         //variable de soumission forme
         const submitting_message=ref('') 
         
         //variable d'erreur serveur
         const error_message=ref('')
         const error_message_code =ref('')
         
         //variable de success serveur
         const success_message=ref('')
         
         //fonctions pour définir la fiche sur lecture et/modification
         function setReadOnlyModeIsDisabled(){
             readOnlyModeIsDisabled.value=true
         }
         function setReadWriteModeIsDisabled(){
             readOnlyModeIsDisabled.value=false
         }

         //sac des labels de la fiche
        const labelBag = {
            serviceZoneCodeLabel:ref(''),
            timePreferenceLabel:ref(''),
            roadTypeLabel:ref(''),
            walkingDistanceLabel:ref(''),
            deliveryLocationLabel:ref(''),
            accessPlanLabel:ref([]),
            accessTypeLabel:ref([]),
            truckTypeLabel:ref(''),
            publicParkingPresenceLabel:ref(''),

            optionLabelListForServiceZoneCode : ref([]),
            optionLabelListForTimePreference : ref([]),
            optionLabelListForRoadType : ref([]),
            optionLabelListForWalkingDistance : ref([]),
            optionLabelListForDeliveryLocation : ref([]),
            optionLabelListForAccessPlan : ref([]),
            optionLabelListForAccessType : ref([]),
            optionLabelListForTruckType : ref([]),
            optionLabelListForPublicParkingPresence : ref([]),
        }

//fonctions pour récupérer le label des champs
        function getSingleOptionLabel(fieldToGetLabel,fieldToDisplayLabel,value){
            if(!isNaN(Number(value))){
                axios.get(`http://${hostname}:5000/app/getSingleOptionLabel?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabel}&vl=${value}`)
                .then(result => {
                    labelBag[fieldToDisplayLabel].value = result.data.recordset[0][""]
                }).catch(err=>console.log(err))
            }else{
                labelBag[fieldToDisplayLabel].value ='champ inexistant!'
            }
        }

        function getOptionLabelList(fieldToGetLabelList,fieldToSetLabelList){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                labelBag[fieldToSetLabelList].value=result.data.recordset
            }).catch(err=>console.log(err))
        }

        //fonction de récupération des données de la fiche prospect
        function getCreditContractCardInfo(){
            axios.get(`http://${hostname}:5000/app/getShipToAddressCard/${props.customerNo}/${props.addressNo}`)
            .then(result => {
                shipToAddressCardHeader.value = result.data.recordset[0]
                getSingleOptionLabel('Service Zone Code','serviceZoneCodeLabel',shipToAddressCardHeader.value["Service Zone Code"])
                getSingleOptionLabel('Time preference','timePreferenceLabel',shipToAddressCardHeader.value["Time preference"])
                getSingleOptionLabel('Road Type','roadTypeLabel',shipToAddressCardHeader.value["Road Type"])
                getSingleOptionLabel('Walking distance','walkingDistanceLabel',shipToAddressCardHeader.value["Walking distance"])
                getSingleOptionLabel('Delivery Location','deliveryLocationLabel',shipToAddressCardHeader.value["Delivery Location"])
                getSingleOptionLabel('Access Plan','accessPlanLabel',shipToAddressCardHeader.value["Access Plan"])
                getSingleOptionLabel('Access Type','accessTypeLabel',shipToAddressCardHeader.value["Access Type"])
                getSingleOptionLabel('Truck Type','truckTypeLabel',shipToAddressCardHeader.value["Truck Type"])
                getSingleOptionLabel('Public parking presence','publicParkingPresenceLabel',shipToAddressCardHeader.value["Public parking presence"])

                getOptionLabelList('[Service Zone Code]','optionLabelListForServiceZoneCode')
                getOptionLabelList('[Time preference]','optionLabelListForTimePreference')
                getOptionLabelList('[Road Type]','optionLabelListForRoadType')
                getOptionLabelList('[Walking distance]','optionLabelListForWalkingDistance')
                getOptionLabelList('[Delivery Location]','optionLabelListForDeliveryLocation')
                getOptionLabelList('[Access Plan]','optionLabelListForAccessPlan')
                getOptionLabelList('[Access Type]','optionLabelListForAccessType')
                getOptionLabelList('[Truck Type]','optionLabelListForTruckType')
                getOptionLabelList('[Public parking presence]','optionLabelListForPublicParkingPresence')

            }).catch(err=>console.log(err))
        }

//fonction pour remplir les champs avec des listes sélectionnables
        function fillCustomerInfoField(customer){
            shipToAddressCardHeader.value["Customer No_"]=customer['No_']
        }
        function fillContactInfoField(contact){
            shipToAddressCardHeader.value["Contact No_"]= contact['No_']
        }
        
        //fonction pour gérer les erreurs lors de l'appel d'un service de BC
        function displayErrorMessage(errorObject){
            if(errorObject.response && errorObject.response.status){
                switch (errorObject.response.status){
                    case 401: 
                        submitting_message.value=''
                        error_message.value= errorObject.response.data.message;break;
                    case 400:
                        submitting_message.value='' 
                        error_message.value= errorObject.response.data.error.message
                        error_message_code.value= errorObject.response.data.error.code;break;
                    case 404:
                        submitting_message.value=''
                        error_message.value=errorObject.response.data.error.message
                        error_message_code.value= errorObject.response.data.error.code;break;
                    default:
                        submitting_message.value=''
                        error_message.value=errorObject.response
                }
            }
            else{
                error_message.value = errorObject.message
                error_message_code.value = errorObject.code
                console.log(errorObject)
            }
        }

        //fonction pour formater les données à envoyer aux service de BC
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }

        //fonction qui envoie les données aux service de bc et réceptionne et affiche la réponse ou l'erreur
        function updateShipToAddressCard(formattedShipToAddressData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedShipToAddressData)
            .then(() => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi'
                error_message.value=''
                setTimeout(()=>success_message.value='',3000)
                readOnlyModeIsDisabled.value=false
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }

        //fonction pour soumettre la modifiaction de la fiche
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'shipToAddress_modify',
                webUserName:useWebUserInfoStore().name,
                'No_':shipToAddressCardHeader.value['Code'],
                'Customer No_':shipToAddressCardHeader.value['Customer No_'],
                'Contact No_':shipToAddressCardHeader.value['Contact No_'],
                'Name':shipToAddressCardHeader.value['Name'],
                'Address':shipToAddressCardHeader.value['Address'],
                'Address 2':shipToAddressCardHeader.value['Address 2'],
                'City':shipToAddressCardHeader.value['City'],
                'Phone No_':shipToAddressCardHeader.value['Phone No_'],
                'Mobile Phone No_':shipToAddressCardHeader.value['Mobile Phone No_'],
                'Place':shipToAddressCardHeader.value['Place'], 
                'Neighborhood':shipToAddressCardHeader.value['Neighborhood'],
                //'Service Zone Code':shipToAddressCardHeader.value['Service Zone Code'],
                'Service Zone Code':'A2',
                'Time preference':shipToAddressCardHeader.value['Time preference'],
                'Road Type':shipToAddressCardHeader.value['Road Type'],
                'Road Type (Others)':shipToAddressCardHeader.value['Road Type (Others)'],
                'Walking distance':shipToAddressCardHeader.value['Walking distance'],
                'Walking distance (Others)':shipToAddressCardHeader.value['Walking distance (Others)'],
                'Delivery Location':shipToAddressCardHeader.value['Delivery Location'],
                'Motorcycle Access':shipToAddressCardHeader.value['Motorcycle Access'],
                'Access Plan':shipToAddressCardHeader.value['Access Plan'],
                'Access Type':shipToAddressCardHeader.value['Access Type'],
                'Truck Type':shipToAddressCardHeader.value['Truck Type'],
                'Public parking presence':shipToAddressCardHeader.value['Public parking presence'],
                'Remarks':shipToAddressCardHeader.value['Remarks'],
                'Ground plan':shipToAddressCardHeader.value['Ground plan'],
            }
            updateShipToAddressCard(formatToBCJsonData(JSData))
        }

//Gestions des évènements et déclencheurs
        onBeforeMount(() => {
            if(useWebUserInfoStore().name==''){
                let userData = window.localStorage.getItem("userData");
                if(!userData){
                    router.push('/login')
                }else{
                    let userDataObjet = JSON.parse(userData)
                    useWebUserInfoStore().fillWebUserInfo(userDataObjet)
                }
            }
        })

        onMounted(() => {
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }
            getCreditContractCardInfo()
        })

        watch(success_message, () => {
            readOnlyModeIsDisabled.value=false
            getCreditContractCardInfo()
        })

        // expose to template and other options API hooks
        return {
            shipToAddressCardId2,shipToAddressCardId1,
            readOnlyModeIsDisabled,setReadWriteModeIsDisabled,setReadOnlyModeIsDisabled,
            ...labelBag,
            shipToAddressCardHeader,
            fillCustomerInfoField,fillContactInfoField,
            submitForm,
            error_message,error_message_code,success_message,submitting_message,

        }
    },
    data(){
        return{

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
            if(!this.addressNo){
            useNavigationTabStore().setActiveTab('customers')
            this.$router.push(`/ShipToAddressList/${this.shipToAddressCardId1}`)
            }
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
        
    },

}
</script>
<style scoped>
#general_content,#details_content{
    max-height: 3000px;
    overflow: hidden;
    transition: max-height 0.5s;
}

.has-border-bottom-grey{
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
}
</style>