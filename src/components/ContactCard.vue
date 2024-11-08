<template>
    <div :class="{ modal: true, 'is-active': true }">
        <div class="modal-background has-background-white" style="opacity: 0.3"></div>
        <div id="scrollBlock" class="modal-card box shadow is-rounded h-100" style="width: 85%">
      
<!---------Composant entête fiche----------------------->
            <div id="card-header-comp">
                <contact-card-Header
                  :soNo="contactCardId"
                  :soDesc="contactCardHeader.Name"
                  pageTitle="Fiche contact"
                  @onGoingBackToList='goBackToList'
                />
            </div>

<!---------Composant rubban fiche contact----------------------->
            <contact-card-ribbon
              routeForNewCard="../NewContact"
              @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
              @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
              @onSubmittingForm="submitForm"
              @onCancellingUpdate="setReadWriteModeIsDisabled"
              componentWithCompInfo="contactCardRightInfoMaxWidth"
              :newCardBtnIsDisabled="false"
              :editCardBtnIsDisabled="false"
              :cancelEditCardBtnIsDisabled="false"
              :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            ></contact-card-ribbon>

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

        
<!---------Section formulaire fiche contact----------------------->
      <div id="content-comp" class="columns mt-2" style="overflow-y: scroll">
          <div class="column" style="overflow-y: scroll">

<!---------sous-Section onglet 1 formulaire fiche client----------------------->
              <div id="general">
                  <div class="columns has-border-bottom">
                      <div class="column p-0 has-text-left has-text-weight-bold">
                          <a @click="collapse('general_content');onglet1_expanded = !onglet1_expanded;" v-if="onglet1_expanded">
                              <span>Général</span>
                          </a>
                          <a @click="expand('general_content');onglet1_expanded = !onglet1_expanded;" v-if="!onglet1_expanded">
                              <span>Général</span>
                              <span class="icon">
                                  <i class="fas fa-angle-right"></i>
                              </span>
                          </a>
                      </div>
                  </div>
                  <div id="general_content" class="columns">
                      <div class="column">
                            <input-text labelInputText="No_" :valueInputText="contactCardHeader['No_']" :is_disabled="true"></input-text>
                            
                            <input-text labelInputText="Code client" :valueInputText="contactCardHeader['Customer No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                            <input-select labelInputText="Code client" v-model="contactCardHeader['Customer No_']"  @openModal="activeModalForSelectableElementList='customerList'" v-else></input-select>

                            <input-text labelInputText="Titre" :valueInputText="contactCardHeader['Salutation Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                            <input-select labelInputText="Titre" v-model="contactCardHeader['Salutation Code']" @openModal="activeModalForSelectableElementList='salutationList'" v-else></input-select>

                            <input-text labelInputText="Prenom" v-model="contactCardHeader['First Name']" :valueInputText="contactCardHeader['First Name']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText=" Autre Nom" v-model="contactCardHeader['Middle Name']" :valueInputText="contactCardHeader['Middle Name']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="Nom" v-model="contactCardHeader['Surname']" :valueInputText="contactCardHeader['Surname']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="Nom Complet" :valueInputText="contactName" :is_disabled="true"></input-text>
                            <input-text labelInputText="Fonction" v-model="contactCardHeader['Job Title']" :valueInputText="contactCardHeader['Job Title']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="Adresse : Ligne 1" v-model="contactCardHeader['Address']" :valueInputText="contactCardHeader['Address']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="Adresse : Ligne 2" v-model="contactCardHeader['Address 2']" :valueInputText="contactCardHeader['Address 2']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                        </div>
                        <div class="column">
                            <input-text labelInputText="Code postal" v-model="contactCardHeader['Post Code']" :valueInputText="contactCardHeader['Post Code']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="Ville" v-model="contactCardHeader['City']" :valueInputText="contactCardHeader['City']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="Téléphone" v-model="contactCardHeader['Phone No_']" :valueInputText="contactCardHeader['Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="Téléphone Mobile" v-model="contactCardHeader['Mobile Phone No_']" :valueInputText="contactCardHeader['Mobile Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="E-mail" v-model="contactCardHeader['E-Mail']" :valueInputText="contactCardHeader['E-Mail']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                        
                            <input-text labelInputText="NIF" v-model="contactCardHeader['NIF']" :valueInputText="contactCardHeader['NIF']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="STAT" v-model="contactCardHeader['STAT']" :valueInputText="contactCardHeader['STAT']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="RCS" v-model="contactCardHeader['RCS']" :valueInputText="contactCardHeader['RCS']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="CIF" v-model="contactCardHeader['CIF']" :valueInputText="contactCardHeader['CIF']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            <input-text labelInputText="N° identification" v-model="contactCardHeader['ID Number']" :valueInputText="contactCardHeader['ID Number']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                      
                        </div>
                  </div>
              </div>
              <br /><br />

          
        </div>

        <!---------composant info contact----------------------->
        <customer-info class="contact-info"></customer-info>
      </div>
    </div>

    <modal-for-selectable-salutation-list 
            v-if="activeModalForSelectableElementList=='salutationList'"  
            :isActive="activeModalForSelectableElementList=='salutationList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableSalutationListModal="(elt)=>fillSalutationInfoField(elt)">
        </modal-for-selectable-salutation-list>
  </div>
</template>
<script>
import ContactCardHeader from "./HeaderForCard.vue";
import ContactCardRibbon from "./RibbonForCard.vue";
import inputText from "./input/input-text.vue";
import inputSelect from './input/input-select.vue'
import ModalForSelectableSalutationList from "./ModalForSelectableSalutationCodeList.vue";

import CustomerInfo from "./CustomerInfo.vue";
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import axios from "axios";
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
export default {
  name: "contact-card",
  components: {
    ContactCardHeader,ContactCardRibbon,
    inputText,
    inputSelect,
    CustomerInfo,
    //ModalForSelectableCustomerList
    ModalForSelectableSalutationList,
  },
  props:['contactNo'],
  setup(props) {
    const hostname = window.location.hostname
    const contactCardId = useRoute().params.id
    const contactCardHeader = ref({});
    const readOnlyModeIsDisabled = ref(false);
    const router = useRouter()

    //variable de soumission forme
    const submitting_message=ref('') 

    //variable d'erreur serveur
    const error_message=ref('')
    const error_message_code =ref('')

    //variable de success serveur
    const success_message=ref('')

    const contactName = computed(() => {
        return `${contactCardHeader.value['First Name']?contactCardHeader.value['First Name'] +' ':''}${contactCardHeader.value['Middle Name']} ${contactCardHeader.value['Surname']}`
    })


    function fillSalutationInfoField(salutation){
            contactCardHeader.value['Salutation Code'] = salutation['Code']
          }

          function fillCustomerInfoField(customer){
            contactCardHeader.value['Customer No_'].value=customer['No_']                
          }
        
    //fonctions pour définir la fiche sur lecture et/modification
    function setReadOnlyModeIsDisabled(){
        readOnlyModeIsDisabled.value=true
    }
    function setReadWriteModeIsDisabled(){
        readOnlyModeIsDisabled.value=false
    }

    //fonction de récupération des données de la fiche contact
    function getContactCardHeaderInfo(){
        axios.get(`http://${hostname}:5000/app/getContactCard/${props.contactNo?props.contactNo:contactCardId}`)
        .then((result) => {
              contactCardHeader.value = result.data.recordset[0];
        })
        .catch((err) => console.error(err));
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
      function updateContactCard(formattedleadData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedleadData)
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
                Parameter:'contacts_modify',
                webUserName:useWebUserInfoStore().name,
                'No_':contactCardHeader.value['No_'],
                'Customer No_':contactCardHeader.value['Customer No_'],
                'Salutation Code':contactCardHeader.value['Salutation Code'],
                'First Name':contactCardHeader.value['First Name'],
                'Middle Name':contactCardHeader.value['Middle Name'],
                'Surname':contactCardHeader.value['Surname'],
                'Name':contactName.value,
                'Image':contactCardHeader.value['Image'],
                'Job Title':contactCardHeader.value['Job Title'],
                'Address':contactCardHeader.value['Address'],
                'Address 2':contactCardHeader.value['Address 2'],
                'Post Code':contactCardHeader.value['Post Code'], 
                'City':contactCardHeader.value['City'],
                'Phone No_':contactCardHeader.value['Phone No_'],
                'Mobile Phone No_':contactCardHeader.value['Mobile Phone No_'],
                'E-Mail':contactCardHeader.value['E-Mail'],
                'NIF':contactCardHeader.value['NIF'],
                'STAT':contactCardHeader.value['STAT'],
                'RCS':contactCardHeader.value['RCS'],
                'CIF':contactCardHeader.value['CIF'],
                'ID Number':contactCardHeader.value['ID Number'],
            }
            updateContactCard(formatToBCJsonData(JSData))
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
      getContactCardHeaderInfo()
    })

    watch(success_message, () => {
        readOnlyModeIsDisabled.value=false
        getContactCardHeaderInfo()
    })

    // expose to template and other options API hooks
    return {
      contactCardId,contactName,
      contactCardHeader,
      setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,
      readOnlyModeIsDisabled,
      submitForm,
      error_message,error_message_code,success_message,submitting_message,
      fillSalutationInfoField,fillCustomerInfoField,

      
    };
  },

  data() {
    return {
      contactInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.contactCardRightInfoMaxWidth,
      //indique si les onglets sont réduits ou non
      onglet1_expanded: true,
      onglet2_expanded: true,
      onglet3_expanded: true,
      onglet4_expanded: true,

      hostname:window.location.hostname,

      //élement pour le modal sélection des enregistrements
      activeModalForSelectableElementList:'',
    };
  },
  methods: {
    goBackToList(){
            if(!this.contactNo){
                useNavigationTabStore().setActiveGroup('sales')
                useNavigationTabStore().setActiveTab('contacts')
                this.$router.push('/')
            }
        },
    hideOrShowComponentInfo(){
            if(this.contactInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('contactCardRightInfoMaxWidth','800px')
                this.contactInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('contactCardRightInfoMaxWidth','0px')
                this.contactInfoCompMaxWidth='0px'
            }
        },







    expand(id) {
      const myElt = document.getElementById(id);
      if (id == "history_content") myElt.style.maxHeight = "250px";
      else myElt.style.maxHeight = "500px";
    },
    collapse(id) {
      const myElt = document.getElementById(id);
      console.log(myElt.style.maxHeight);
      myElt.style.maxHeight = "0px";
    },
  },

};
</script>
<style scoped>


.contact-info{
  max-width: v-bind(contactInfoCompMaxWidth);
  transition: max-width 0.5s;
}
#general_content,
#communication_content,
#international_content,
#history_content {
  max-height: 3000px;
  overflow: hidden;
  transition: max-height 0.5s;
}

.has-border-bottom-grey {
  border-bottom: 1px solid rgba(0, 0, 0, 0.233);
}
</style>
