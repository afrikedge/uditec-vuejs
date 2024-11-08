<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:90%;">
 
<!---------Composant entête carte----------------------->      
            <div id="card-header-comp">
                <ship-to-address-card-Header soNo="nouvelle adresse" :soDesc="shipToAddressName" pageTitle="Fiche adresse de livraison" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban carte adresse destinataire----------------------->      
            <ship-to-address-card-ribbon
            @onSubmittingForm="submitForm"
            :readOnlyModeIsDisabled="true"
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

<!---------Section formulaire nouvelle adresse destinataire----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire nouvelle adresse destinataire----------------------->                         
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ shipToAddressLine1 }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ shipToAddressName }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ shipToAddressContactNo }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-select labelInputText="Code client" v-model="shipToAddressCustomerNo" @openModal="activeModalForSelectableElementList='customerList'"></input-select>
                                
                                <input-select labelInputText="Code contact" v-model="shipToAddressContactNo" @openModal="activeModalForSelectableElementList='contactList'" ></input-select>
                                                               
                                <input-text labelInputText="Nom de l’adresse" v-model="shipToAddressName" ></input-text>
                                
                                <input-text labelInputText="Adresse:Ligne 1" v-model="shipToAddressLine1"></input-text>
                               
                                <input-text labelInputText="Adresse:Ligne 2" v-model="shipToAddressLine2"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Ville" v-model="shipToAddressCity"></input-text> 
                               
                                <input-text labelInputText="Téléphone" v-model="shipToAddressPhoneNo"></input-text> 
                               
                                <input-text labelInputText="Téléphone Mobile" v-model="shipToAddressMobilePhoneNo"></input-text> 
                                
                                <input-text labelInputText="Lieu" v-model="shipToAddressPlace"></input-text>
                                
                                <input-text labelInputText="Quartier" v-model="shipToAddressNeighborhood"></input-text>
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
                        </div>
                        <div id="details_content" class="columns">
                            <div class="column">
                                <input-select labelInputText="Zone" v-model="shipToAddressServiceZoneCode" @openModal="activeModalForSelectableElementList='serviceZoneList'"></input-select> 
                               
                                <input-select-basic-1 labelInputText="Créneau de préférence" v-model="shipToAddressTimePreference" :option-list="optionLabelListForTimePreference"></input-select-basic-1> 
                               
                                <input-select-basic-1 labelInputText="Type de route" v-model="shipToAddressRoadType" :option-list="optionLabelListForRoadType"></input-select-basic-1> 
                                
                                <input-text labelInputText="Type de route - Autre préciser" v-model="shipToAddressRoadTypeOthers"></input-text>
                                
                                <input-select-basic-1 labelInputText="Distance de transport à pied" v-model="shipToAddressWalkingDistance" :option-list="optionLabelListForWalkingDistance"></input-select-basic-1> 
                                 
                                <input-text labelInputText="Distance de transport à pied - Autre préciser" v-model="shipToAddressWalkingDistanceOthers"></input-text>
                               
                                <input-select-basic-1 labelInputText="Emplacement de livraison" v-model="shipToAddressDeliveryLocation" :option-list="optionLabelListForDeliveryLocation"></input-select-basic-1> 
                            </div>
                            <div class="column">
                                <input-select-basic-1 labelInputText="Accès moto?" v-model="shipToAddressMotorcycleAccess" :option-list="[{Value:0,Description:'Non'},{Value:1,Description:'Oui'}]"></input-select-basic-1>
                                                            
                                <input-select-basic-1 labelInputText="Plan d'accès" v-model="shipToAddressAccessPlan" :option-list="optionLabelListForAccessPlan"></input-select-basic-1> 
                             
                                <input-select-basic-1 labelInputText="Type d'accès" v-model="shipToAddressAccessType" :option-list="optionLabelListForAccessType"></input-select-basic-1>   
                                
                                <input-select-basic-1 labelInputText="Type de camion" v-model="shipToAddressTruckType" :option-list="optionLabelListForTruckType"></input-select-basic-1> 
                                
                                <input-select-basic-1 labelInputText="Parking Publique?" v-model="shipToAddressPublicParkingPresence" :option-list="[{Value:0,Description:'Non'},{Value:1,Description:'Oui'}]"></input-select-basic-1>

                                <input-text labelInputText="Remarques" v-model="shipToAddressRemarks"></input-text>
                                
                                <input-text labelInputText="Plan de masse" v-model="shipToAddressGroundPlan" ></input-text>                                
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
    @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
    </modal-for-selectable-contact-list>

    <modal-for-selectable-customer-list 
        v-if="activeModalForSelectableElementList=='customerList'" 
        :isActive="activeModalForSelectableElementList=='customerList'" 
        @closeModal="activeModalForSelectableElementList=''"
        @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
    </modal-for-selectable-customer-list>

    <modal-for-selectable-zone-list 
        v-if="activeModalForSelectableElementList=='serviceZoneList'" 
        :isActive="activeModalForSelectableElementList=='serviceZoneList'" 
        @closeModal="activeModalForSelectableElementList=''"
        @onGettingLineFromSelectableZoneListModal="(elt)=>fillZoneInfoField(elt)">
    </modal-for-selectable-zone-list>
    </div> 

</template>
<script>
import inputSelect from './input/input-select.vue'
import shipToAddressCardHeader from './HeaderForCard.vue'
import shipToAddressCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { onBeforeMount, onMounted, ref} from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableZoneList from './ModalForSelectableZoneList.vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
export default {
    emits: ['submit'],
    name:'ship-to-address-card',
    props:['redirectionIsDisabled','customerNo','contactNo'],
    components:{
        shipToAddressCardHeader,inputText,
        shipToAddressCardRibbon,
        ModalForSelectableCustomerList,ModalForSelectableContactList,ModalForSelectableZoneList,
        inputSelect,inputSelectBasic1,
         
    },
    setup(props,ctx){
        const router = useRouter()
        const hostname = window.location.hostname

         //variable de soumission forme
         const submitting_message=ref('') 
         
         //variable d'erreur serveur
         const error_message=ref('')
         const error_message_code =ref('')
         
         //variable de success serveur
         const success_message=ref('')
         

         //sac des labels de la fiche
        const labelBag = {
           
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


        function getOptionLabelList(fieldToGetLabelList,fieldToSetLabelList){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                labelBag[fieldToSetLabelList].value=result.data.recordset
            }).catch(err=>console.log(err))
        }


         //objet contenant les champs d'entête de notre document
         const shipToAddressCardHeaderInfo = {
            shipToAddressCustomerNo : ref(''),
            shipToAddressContactNo : ref(''),
            shipToAddressName : ref(''),
            shipToAddressLine1 : ref(''),
            shipToAddressLine2 : ref(''),
            shipToAddressCity : ref(''),
            shipToAddressPhoneNo : ref(''),
            shipToAddressMobilePhoneNo : ref(''),
            shipToAddressPlace : ref(''),
            shipToAddressNeighborhood : ref(''),
            shipToAddressServiceZoneCode : ref(''),

            shipToAddressTimePreference : ref(0),
            shipToAddressRoadType : ref(0),
            shipToAddressRoadTypeOthers : ref(''),
            shipToAddressWalkingDistance : ref(0),
            shipToAddressWalkingDistanceOthers : ref(''),
            shipToAddressDeliveryLocation : ref(0),
            shipToAddressMotorcycleAccess : ref(0),
            shipToAddressAccessPlan : ref(0),
            shipToAddressAccessType : ref(0),
            shipToAddressTruckType: ref(0),
            shipToAddressPublicParkingPresence: ref(0),
            shipToAddressRemarks: ref(''),
            shipToAddressGroundPlan: ref(''),
        }

//fonction pour remplir les champs avec des listes sélectionnables
        function fillCustomerInfoField(customer){
            shipToAddressCardHeaderInfo.shipToAddressCustomerNo.value=customer['No_']
        }
        function fillContactInfoField(contact){
            shipToAddressCardHeaderInfo.shipToAddressContactNo.value= contact['No_']
        }
        function fillZoneInfoField(zone){
            shipToAddressCardHeaderInfo.shipToAddressServiceZoneCode.value = zone['Code']
        }
        
        //fonction pour gérer les erreurs lors de l'appel d'un service de BC
        // function displayErrorMessage(errorObject){
        //     if(errorObject.response && errorObject.response.status){
        //         switch (errorObject.response.status){
        //             case 401: 
        //                 submitting_message.value=''
        //                 error_message.value= errorObject.response.data.message;break;
        //             case 400:
        //                 submitting_message.value='' 
        //                 error_message.value= errorObject.response.data.error.message
        //                 error_message_code.value= errorObject.response.data.error.code;break;
        //             case 404:
        //                 submitting_message.value=''
        //                 error_message.value=errorObject.response.data.error.message
        //                 error_message_code.value= errorObject.response.data.error.code;break;
        //             default:
        //                 submitting_message.value=''
        //                 error_message.value=errorObject.response
        //         }
        //     }
        //     else{
        //         error_message.value = errorObject.message
        //         error_message_code.value = errorObject.code
        //         console.log(errorObject)
        //     }
        // }

        function displayErrorMessage(errorObject){
            submitting_message.value = ''
            if(errorObject.response){
                if(errorObject.response.data){
                    error_message.value = JSON.stringify(errorObject.response.data)
                }else{
                    error_message.value = JSON.stringify(errorObject.response)
                }
            }
            else{
                error_message.value = JSON.stringify(errorObject)
            }
        }

        //fonction pour formater les données à envoyer aux service de BC
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }

        function getDocumentNo(documentNo){
            ctx.emit('submit',documentNo)
        }

        //fonction qui envoie les données aux service de bc et réceptionne et affiche la réponse ou l'erreur
        function updateShipToAddressCard(formattedShipToAddressData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedShipToAddressData)
            .then(res => {
                  submitting_message.value=''
                  if(!props.redirectionIsDisabled){
                      success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                      error_message.value=''
                      setTimeout(()=> router.push(`/shipToAddressCard/${shipToAddressCardHeaderInfo.shipToAddressCustomerNo.value}/${res.data.documentNo}`),3000)
                  }else{
                        success_message.value='Enregistrement réussi'
                      error_message.value=''
                      setTimeout(()=> success_message.value ='' ,3000)
                      getDocumentNo(res.data.documentNo)
                  }
              })
              .catch(err => {
                  displayErrorMessage(err)
              })
        }

        //fonction pour soumettre la modifiaction de la fiche
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'shipToAddress_insert',
                webUserName:useWebUserInfoStore().name,
                'No_':'',
                'Customer No_':shipToAddressCardHeaderInfo.shipToAddressCustomerNo.value,
                'Contact No_':shipToAddressCardHeaderInfo.shipToAddressContactNo.value,
                'Name':shipToAddressCardHeaderInfo.shipToAddressName.value,
                'Address':shipToAddressCardHeaderInfo.shipToAddressLine1.value,
                'Address 2':shipToAddressCardHeaderInfo.shipToAddressLine2.value,
                'City':shipToAddressCardHeaderInfo.shipToAddressCity.value,
                'Phone No_':shipToAddressCardHeaderInfo.shipToAddressPhoneNo.value,
                'Mobile Phone No_':shipToAddressCardHeaderInfo.shipToAddressMobilePhoneNo.value,
                'Place':shipToAddressCardHeaderInfo.shipToAddressPlace.value, 
                'Neighborhood':shipToAddressCardHeaderInfo.shipToAddressNeighborhood.value,
                'Service Zone Code':shipToAddressCardHeaderInfo.shipToAddressServiceZoneCode.value,
                'Time preference':shipToAddressCardHeaderInfo.shipToAddressTimePreference.value,
                'Road Type':shipToAddressCardHeaderInfo.shipToAddressRoadType.value,
                'Road Type (Others)':shipToAddressCardHeaderInfo.shipToAddressRoadTypeOthers.value,
                'Walking distance':shipToAddressCardHeaderInfo.shipToAddressWalkingDistance.value,
                'Walking distance (Others)':shipToAddressCardHeaderInfo.shipToAddressWalkingDistanceOthers.value,
                'Delivery Location':shipToAddressCardHeaderInfo.shipToAddressDeliveryLocation.value,
                'Motorcycle Access':shipToAddressCardHeaderInfo.shipToAddressMotorcycleAccess.value,
                'Access Plan':shipToAddressCardHeaderInfo.shipToAddressAccessPlan.value,
                'Access Type':shipToAddressCardHeaderInfo.shipToAddressAccessType.value,
                'Truck Type':shipToAddressCardHeaderInfo.shipToAddressTruckType.value,
                'Public parking presence':shipToAddressCardHeaderInfo.shipToAddressPublicParkingPresence.value,
                'Remarks':shipToAddressCardHeaderInfo.shipToAddressRemarks.value,
                'Ground plan':shipToAddressCardHeaderInfo.shipToAddressGroundPlan.value,
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
            getOptionLabelList('[Service Zone Code]','optionLabelListForServiceZoneCode')
            getOptionLabelList('[Time preference]','optionLabelListForTimePreference')
            getOptionLabelList('[Road Type]','optionLabelListForRoadType')
            getOptionLabelList('[Walking distance]','optionLabelListForWalkingDistance')
            getOptionLabelList('[Delivery Location]','optionLabelListForDeliveryLocation')
            getOptionLabelList('[Access Plan]','optionLabelListForAccessPlan')
            getOptionLabelList('[Access Type]','optionLabelListForAccessType')
            getOptionLabelList('[Truck Type]','optionLabelListForTruckType')
            getOptionLabelList('[Public parking presence]','optionLabelListForPublicParkingPresence')
        })

        onMounted(() => {
            if(props.customerNo)
                shipToAddressCardHeaderInfo.shipToAddressCustomerNo.value = props.customerNo
            
            if(props.contactNo)
                shipToAddressCardHeaderInfo.shipToAddressContactNo.value = props.contactNo
        })


        // expose to template and other options API hooks
        return {
            ...labelBag,
            ...shipToAddressCardHeaderInfo,
            fillCustomerInfoField,fillContactInfoField,fillZoneInfoField,
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
            if(!this.redirectionIsDisabled){
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