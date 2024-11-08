<template>
    <div :class="{ modal: true, 'is-active': true }">
        <div class="modal-background has-background-white" style="opacity: 0.7"></div>
        <div id="scrollBlock" class="modal-card box shadow is-rounded h-100" style="width: 90%">
<!---------Composant entête fiche----------------------->
            <div id="card-header-comp">
                <contact-card-Header :soDesc="contactName" pageTitle="Fiche contact" 
                @onGoingBackToList="goBackToList" />
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
                                <input-select v-model="contactCustomerNo" labelInputText="Code client" :is_disabled="false"  @openModal="activeModalForSelectableElementList='customerList'"></input-select>
                                
                                <input-select labelInputText="Titre" v-model="contactSalutationCode"  :is_disabled="false" @openModal="activeModalForSelectableElementList='salutationList'"></input-select>
                                
                                <input-text labelInputText="Prenom" v-model="contactFirstName"></input-text>
                                
                                <input-text labelInputText=" Autre Nom" v-model="contactMiddleName"></input-text>
                                
                                <input-text labelInputText="Nom" v-model="contactSurname" ></input-text>
                                
                                <input-text labelInputText="Nom Complet" :valueInputText="contactName" :is_disabled="true"></input-text>
                              
                                <input-text labelInputText="Adresse : Ligne 1" v-model="contactAddress"></input-text>
                                
                                <input-text labelInputText="Adresse : Ligne 2" v-model="contactAddress2"></input-text>
                                
                                <input-text labelInputText="Code postal" v-model="contactPostCode"></input-text>
                                
                                <input-text labelInputText="Ville" v-model="contactCity"></input-text>
                            </div>
                            <div class="column">
                                
                                <input-text labelInputText="Téléphone" v-model="contactPhoneNo"></input-text>
                                
                                <input-text labelInputText="Téléphone Mobile" v-model="contactMobilePhoneNo"></input-text>
                                
                                <input-text labelInputText="E-mail" v-model="contactEmail"></input-text>
                                
                                <input-text labelInputText="Fonction" v-model="contactJobTitle"></input-text>

                                <input-text labelInputText="NIF" v-model="contactNIF"></input-text>

                                <input-text labelInputText="STAT" v-model="contactSTAT"></input-text>

                                <input-text labelInputText="RCS" v-model="contactRCS"></input-text>

                                <input-text labelInputText="CIF" v-model="contactCIF"></input-text>

                                <input-text labelInputText="N° identification" v-model="contactIDNo"></input-text>
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
  import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
  import ModalForSelectableSalutationList from "./ModalForSelectableSalutationCodeList.vue";
  import { computed, onBeforeMount, onMounted, ref } from 'vue'
  import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
  import { useNavigationTabStore } from "@/Stores/NavigationTab";
  import { useRouter } from 'vue-router'
  import  axios  from 'axios'



  
  
  export default {
    emits: ['submit'],
    name: "new-contact",
    props:['redirectionIsDisabled','customerNo'],
    components: {
      ContactCardHeader,
      inputText,
      inputSelect,
      ContactCardRibbon,
      ModalForSelectableCustomerList,ModalForSelectableSalutationList,
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
            if(!this.redirectionIsDisabled){
                useNavigationTabStore().setActiveGroup('sales')
                useNavigationTabStore().setActiveTab('contacts')
                this.$router.push('/')
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
    setup(props,ctx){

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

        const contactName = computed(() => {
            return contactCardInfo.contactFirstName.value + ' ' + contactCardInfo.contactMiddleName.value + ' ' + contactCardInfo.contactSurname.value
        })


        const contactCardInfo = {
            contactCustomerNo : ref(''),
            contactSalutationCode : ref(''),
            contactFirstName : ref(''),
            contactMiddleName : ref(''),
            contactSurname : ref(''),
            //contactName : ref(''),
            contactAddress : ref(''),
            contactAddress2 : ref(''),
            contactPostCode : ref(''),
            contactCity : ref(''),
            contactPhoneNo : ref(''),
            contactMobilePhoneNo : ref(''),
            contactJobTitle : ref(''),
            contactEmail: ref(''),
    
            contactNIF: ref(''),
            contactSTAT: ref(''),
            contactRCS: ref(''),
            contactCIF: ref(''),
            contactIDNo: ref(''),
        }
          
        
        function fillCustomerInfoField(customer){
            contactCardInfo.contactCustomerNo.value=customer['No_']                
        }
        function fillSalutationInfoField(salutation){
            contactCardInfo.contactSalutationCode.value = salutation['Code']
        }
          
        //fonction pour gérer les erreurs lors de l'appel d'un service de BC
        // function displayErrorMessage(errorObject){
        //     if(errorObject.response && errorObject.response.status){
        //         switch (errorObject.response.status){
        //             case 401: 
        //                 submitting_message.value=''
        //                 error_message.value= errorObject.response.data;break;
        //             case 400:
        //                 submitting_message.value='' 
        //                 error_message.value= errorObject.response.data
        //                 error_message_code.value= errorObject.code;break;
        //             case 404:
        //                 submitting_message.value=''
        //                 error_message.value=errorObject.response.data.error.message
        //                 error_message_code.value= errorObject.response.data.error.code;break;
        //             default:
        //                 submitting_message.value=''
        //                 error_message.value=errorObject.response
        //         }
        //     }else{
        //         error_message.value = errorObject.message
        //         error_message_code.value = errorObject.code
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
            axios.get(`http://${hostname}:5000/app/getContactCard/${documentNo}`)
            .then((result) => {
                const contact = {
                    code:documentNo,
                    name:result.data.recordset[0]['Name']
                }
                ctx.emit('submit',contact)
            })
            .catch((err) => console.error(err));
        }

          function createContact(sqData){
                axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
                .then(res => {
                    submitting_message.value=''
                    if(!props.redirectionIsDisabled){
                        success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                        error_message.value=''
                        setTimeout(()=> router.push(`/contactCard/${res.data.documentNo}`),3000)
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
                    Parameter:'contacts_insert',
                    webUserName:useWebUserInfoStore().name,
                    'No_' : '',
                    'Customer No_' : contactCardInfo.contactCustomerNo.value,
                    'Salutation Code' : contactCardInfo.contactSalutationCode.value,
                    'First Name' : contactCardInfo.contactFirstName.value,
                    'Middle Name' : contactCardInfo.contactMiddleName.value,
                    'Surname' : contactCardInfo.contactSurname.value,
                    'Name' :contactName.value,
                    'Image' : '',
                    'Job Title' : contactCardInfo.contactJobTitle.value,
                    'Address' : contactCardInfo.contactAddress.value,
                    'Address 2' : contactCardInfo.contactAddress2.value,
                    'Post Code' : contactCardInfo.contactPostCode.value,
                    'City' : contactCardInfo.contactCity.value,
                    'Phone No_' : contactCardInfo.contactPhoneNo.value,
                    'Mobile Phone No_' : contactCardInfo.contactMobilePhoneNo.value,
                    'E-Mail' : contactCardInfo.contactEmail.value,
                    'NIF':contactCardInfo.contactNIF.value,
                    'STAT':contactCardInfo.contactSTAT.value,
                    'RCS':contactCardInfo.contactRCS.value,
                    'CIF':contactCardInfo.contactCIF.value,
                    'ID Number':contactCardInfo.contactIDNo.value,
                }
                createContact(formatToBCJsonData(JSData))
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
            if(props.customerNo)
            contactCardInfo.contactCustomerNo.value = props.customerNo
        })


          return{
                contactName,
              ...contactCardInfo,
              submitting_message,
              error_message,
              error_message_code,
              success_message,
              fillCustomerInfoField,fillSalutationInfoField,
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
    max-height: 3000px;
    overflow: hidden;
    transition: max-height 0.5s;
  }
  
  .has-border-bottom-grey {
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
  }
</style>
  