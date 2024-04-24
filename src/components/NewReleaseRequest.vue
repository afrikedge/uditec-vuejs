<template>
    <div :class="{ modal: true, 'is-active': true }">
        <div class="modal-background has-background-white" style="opacity: 0.7"></div>
        <div id="scrollBlock" class="modal-card box shadow is-rounded h-100" style="width: 90%">
<!---------Composant entête fiche----------------------->
            <div id="card-header-comp">
                <release-request-card-Header soDesc="Nouvelle demande déblocage" pageTitle="Fiche demande déblocage" @onGoingBackToList="goBackToList" />
            </div>
  
<!---------Composant rubban fiche client----------------------->
            <release-request-card-ribbon
            @onSubmittingForm="submitForm"
            :readOnlyModeIsDisabled="true"            
            ></release-request-card-ribbon>

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
  
<!---------Section formulaire fiche demande déblocage----------------------->
            <div id="content-comp" class="columns mt-2" >
                <div class="column" >

    <!---------sous-Section onglet 1 formulaire fiche demande déblocage----------------------->
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
                           
                                <input-text labelInputText="N° Demande" v-model="releaseRequestNo"></input-text>
                                <input-text labelInputText="Objet" v-model="releaseRequestSubject"></input-text>
                                
                                
                            </div>
                            <div class="column">
                                <input-select v-model="releaseRequestCustomerNo" labelInputText="N° Document" :is_disabled="false"  @openModal="activeModalForSelectableElementList='customerList';"></input-select>
                                
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
  import  releaseRequestCardHeader from "./HeaderForCard.vue";
  import  releaseRequestCardRibbon from "./RibbonForCard.vue";
  import inputText from "./input/input-text.vue";
  import inputSelect from './input/input-select.vue'
  import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
  import { ref } from 'vue'
  import { useNavigationTabStore } from '@/Stores/NavigationTab'
  import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
  import { useRouter } from 'vue-router'
  import  axios  from 'axios'



  
  
  export default {
    name: "new-release-request",
    components: {
      releaseRequestCardHeader,
      inputText,
      inputSelect,
      releaseRequestCardRibbon,
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
        goBackToList(){
            useNavigationTabStore().setActiveTab('customers')
            this.$router.push('/ReleaseRequestCard/SO24-00043')
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

        const  releaseRequestCardInfo = {
          releaseRequestCustomerNo : ref(webUserInfo.customerNo),
          releaseRequestJobTitle : ref(''),
          releaseRequestSubject: ref('')

          }
          

          function fillCustomerInfoField(customer){
            releaseRequestCardInfo.releaseRequestCustomerNo.value=customer['No_']                
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

          function createReleaseRequest(sqData){
              axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company}`,sqData)
              .then(res => {
                  submitting_message.value=''
                  success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                  error_message.value=''
                  setTimeout(()=> router.push(`/ReleaseRequestCard/${ releaseRequestCardInfo. releaseRequestCustomerNo.value}/${res.data.documentNo}`),5000)
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
                    Parameter:' releaseRequests_insert',
                    webUserName:webUserInfo.name,
                    releaseRequestNo:'',
                    releaseRequestSubject: releaseRequestCardInfo.releaseRequestSubject.value,
                    releaseRequestCustomerNo : ref(webUserInfo.customerNo),
                    releaseRequestJobTitle :  releaseRequestCardInfo.contactJobTitle.value
                }
                createReleaseRequest(formatToBCJsonData(JSData))
            }

          return{
              ... releaseRequestCardInfo,
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
  #general_content {
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s;
  }
  
  .has-border-bottom-grey {
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
  }
</style>
  