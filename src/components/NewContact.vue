<template>
    <div :class="{ modal: true, 'is-active': true }">
        <div class="modal-background has-background-white" style="opacity: 0.7"></div>
        <div id="scrollBlock" class="modal-card box shadow is-rounded h-100" style="width: 90%">
<!---------Composant entête fiche----------------------->
            <div id="card-header-comp">
                <contact-card-Header :soDesc="contactName" pageTitle="Fiche contact" @onGoingBackToList="goBackToList" />
            </div>
  
<!---------Composant rubban fiche client----------------------->
            <contact-card-ribbon
            @onSubmittingForm="submitForm"
            :readOnlyModeIsDisabled="true"            
            ></contact-card-ribbon>

<!---------Composant message d'enregistrement en cours ou d'erreur ou de success----------------------->      
            <article v-if="submitting_message" class="" >
                <span class="icon">
                    <i class="fas fa-spinner fa-pulse"></i>
                </span>
                <span class="subtitle is-7"> Enregistrement en cours </span>
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
                                <i class="fas fa-spinner fa-pulse"></i>
                            </span>
                            {{ success_message }}
                        </span>
                    <button class="delete" aria-label="delete" @click="success_message=''"></button>
                </div>
            </article>
  
<!---------Section formulaire fiche contact----------------------->
            <div id="content-comp" class="columns mt-2" >
                <div class="column" >

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
                                <!----input-text labelInputText="No_" v-model="ContactCardHeader['No_']"></input-text--->
                                <input-select v-model="contactCustomerNo" labelInputText="Code client" :is_disabled="false"  @openModal="activeModalForSelectableElementList='customerList';"></input-select>
                                
                                <input-text labelInputText="Titre" v-model="contactSalutationCode"></input-text>
                                
                                <input-text labelInputText="Prenom" v-model="contactFirstName"></input-text>
                                
                                <input-text labelInputText=" Autre Nom" v-model="contactMiddleName"></input-text>
                                
                                <input-text labelInputText="Nom" v-model="contactSurname" ></input-text>
                                
                                <input-text labelInputText="Nom Complet" v-model="contactName"></input-text>
                              
                                <input-text labelInputText="Adresse : Ligne 1" v-model="contactAddress"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Adresse : Ligne 2" v-model="contactAddress2"></input-text>
                                
                                <input-text labelInputText="Code postal" v-model="contactPostCode"></input-text>
                                
                                <input-text labelInputText="Ville" v-model="contactCity"></input-text>
                                
                                <input-text labelInputText="Téléphone" v-model="contactPhoneNo"></input-text>
                                
                                <input-text labelInputText="Téléphone Mobile" v-model="contactMobilePhoneNo"></input-text>
                                
                                <input-text labelInputText="Fonction" v-model="contactJobTitle"></input-text>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                </div>
            </div>
        </div>

        <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'"  
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-customer-list>

    </div>
</template>
<script>
  import ContactCardHeader from "./HeaderForCard.vue";
  import ContactCardRibbon from "./RibbonForCard.vue";
  import inputText from "./input/input-text.vue";
  import inputSelect from './input/input-select.vue'
  import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
  import { ref } from 'vue'
  import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
  import { useRouter } from 'vue-router'
  import  axios  from 'axios'



  
  
  export default {
    name: "contact-card",
    components: {
      ContactCardHeader,
      inputText,
      inputSelect,
      ContactCardRibbon,
      ModalForSelectableCustomerList,
    },
  
    data() {
      return {
       
        //indique si les onglets sont réduits ou non
        onglet1_expanded: true,

        //élement pour le modal sélection des enregistrements
        activeModalForSelectableElementList:'',
      }
    },
    methods: {
      
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
    setup(){

        const router = useRouter()

        ////////////////////////////nom de l'hote dans l'url 
        const hostname = window.location.hostname;

        //variable de soumission forme
        let submitting_message=ref('') 

        //variable d'erreur serveur
        let error_message=ref('')
        let error_message_code =ref('')

        //variable de success serveur
        let success_message=ref('')

        const webUserInfo = {
            customerNo:useWebUserInfoStore().defaultCustomerNo,
            company:useWebUserInfoStore().activeCompanyId,
            name:useWebUserInfoStore().name
        }

        const contactCardInfo = {
          contactCustomerNo : ref(webUserInfo.customerNo),
          contactSalutationCode : ref(''),
          contactFirstName : ref(''),
          contactMiddleName : ref(''),
          contactSurname : ref(''),
          contactName : ref(''),
          contactAddress : ref(''),
          contactAddress2 : ref(''),
          contactPostCode : ref(''),
          contactCity : ref(''),
          contactPhoneNo : ref(''),
          contactMobilePhoneNo : ref(''),
          contactJobTitle : ref(''),
          }
          

          function fillCustomerInfoField(customer){
              contactCardInfo.contactCustomerNo.value=customer['No_']                
          }

          function displayErrorMessage(errorObject){
              if(errorObject.response && errorObject.response.status){
                  switch (errorObject.response.status){
                      case 401: 
                          submitting_message.value=''
                          error_message.value= errorObject.response.data;break;
                      case 400:
                          submitting_message.value='' 
                          error_message.value= errorObject.response.data
                          error_message_code.value= errorObject.code;break;
                      case 404:
                          submitting_message.value=''
                          error_message.value=errorObject.response.data.error.message
                          error_message_code.value= errorObject.response.data.error.code;break;
                      default:
                          submitting_message.value=''
                          error_message.value=errorObject.response
                  }
              }else{
                  error_message.value = errorObject.message
                  error_message_code.value = errorObject.code
              }
          }

          function createContact(sqData){
              axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company}`,sqData)
              .then(res => {
                  submitting_message.value=''
                  success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                  error_message.value=''
                  setTimeout(()=> router.push(`/contactCard/${contactCardInfo.contactCustomerNo.value}/${res.data.documentNo}`),5000)
              })
              .catch(err => {
                  displayErrorMessage(err)
              })
          }

          function formatToBCJsonData(data){
                
                const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
                const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
                console.log(JSONDataToSend)
                return {data:JSONDataToSend}
            }

            function submitForm(){
                submitting_message.value='Enregistrement en cours'
                const JSData = {
                    Parameter:'contacts_insert',
                    webUserName:webUserInfo.name,
                    ContactNo:'',
                    contactCustomerNo : ref(webUserInfo.customerNo),
                    contactSalutationCode : contactCardInfo.contactSalutationCode.value,
                    contactFirstName : contactCardInfo.contactFirstName.value,
                    contactMiddleName : contactCardInfo.contactMiddleName.value,
                    contactSurname : contactCardInfo.contactSurname.value,
                    contactName : contactCardInfo.contactName.value,
                    contactAddress : contactCardInfo.contactAddress.value,
                    contactAddress2 : contactCardInfo.contactAddress2.value,
                    contactPostCode : contactCardInfo.contactPostCode.value,
                    contactCity : contactCardInfo.contactCity.value,
                    contactPhoneNo : contactCardInfo.contactPhoneNo.value,
                    contactMobilePhoneNo : contactCardInfo.contactMobilePhoneNo.value,
                    contactJobTitle : contactCardInfo.contactJobTitle.value
                }
                createContact(formatToBCJsonData(JSData))
            }

          return{
              ...contactCardInfo,
              submitting_message,
              error_message,
              error_message_code,
              success_message,
              fillCustomerInfoField,
              submitForm
          }
    }
   
  };
</script>
<style scoped>
  #general_content,
  #communication_content,
  #international_content,
  #history_content {
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s;
  }
  
  .has-border-bottom-grey {
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
  }
</style>
  