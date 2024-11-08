<template>
    <div :class="{ modal: true, 'is-active': true }">
        <div class="modal-background has-background-white" style="opacity: 0.7"></div>
        <div id="scrollBlock" class="modal-card box shadow is-rounded h-100" style="width: 90%">
<!---------Composant entête fiche----------------------->
            <div id="card-header-comp">
                <revision-request-card-Header soDesc="Nouvelle demande revision" pageTitle="Fiche demande revision" @onGoingBackToList="goBackToCustomer" />
            </div>
  
<!---------Composant rubban fiche client----------------------->
            <revision-request-card-ribbon
            @onSubmittingForm="submitForm"
            :readOnlyModeIsDisabled="true"            
            ></revision-request-card-ribbon>

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
  
<!---------Section formulaire fiche demande révision----------------------->
            <div id="content-comp" class="columns mt-2" >
                <div class="column" >

    <!---------sous-Section onglet 1 formulaire fiche demande révision----------------------->
                    <div id="general">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a>
                                    <span>Général</span>
                                </a>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                
                                <input-text :valueInputText="revisionRequestCustomerNo" labelInputText="Code Client" :is_disabled="true"></input-text>
                               
                                <input-select v-model="revisionRequestNewPaymentTermsCode" labelInputText="Conditions de paiement (Proposé)" @openModal="activeModalForSelectableElementList='paymentTermList'"></input-select>
                             
                                <input-number labelInputText="Limite de crédit (Proposé)" v-model="revisionRequestNewCreditLimit"></input-number>
                                
                                
                            </div>
                            <div class="column">
                                <input-select v-model="revisionRequestNewPaymentMethodCode" labelInputText="Mode de paiement (Proposé)"  @openModal="activeModalForSelectableElementList='paymentMethodList'"></input-select>
                                
                                <input-select v-model="revisionRequestNewVATBusPostingGroup" labelInputText="Régime TVA (Proposé)"  @openModal="activeModalForSelectableElementList='vatGroupList'"></input-select>
                                
                                <input-number labelInputText="% Acompte exigé (Proposé)" v-model="revisionRequestNewPrepayment"></input-number>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                </div>
                
                <!---------composant info demande révision----------------------->
                <revision-info class="customer-info"></revision-info>

            </div>
        </div>

        <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'"  
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-customer-list>

        <modal-for-selectable-payment-method-list 
            v-if="activeModalForSelectableElementList=='paymentMethodList'" 
            :isActive="activeModalForSelectableElementList=='paymentMethodList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectablePaymentMethodListModal="(elt)=>fillPaymentMethodInfoField(elt)">
        </modal-for-selectable-payment-method-list>

        <modal-for-selectable-payment-term-list 
            v-if="activeModalForSelectableElementList=='paymentTermList'" 
            :isActive="activeModalForSelectableElementList=='paymentTermList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :salesMode="salesMode"
            @onGettingLineFromSelectablePaymentTermListModal="(elt)=>fillPaymentTermInfoField(elt)">
        </modal-for-selectable-payment-term-list>

        <modal-for-selectable-vat-bus-posting-group-list 
            v-if="activeModalForSelectableElementList=='vatGroupList'" 
            :isActive="activeModalForSelectableElementList=='vatGroupList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableVATGroupListModal="(elt)=>fillVATGroupInfoField(elt)">
        </modal-for-selectable-vat-bus-posting-group-list>

    </div>
</template>
<script>
    import  revisionRequestCardHeader from "./HeaderForCard.vue";
    import  revisionRequestCardRibbon from "./RibbonForCard.vue";
    import revisionInfo from './CustomerInfo.vue'
    import inputNumber from "./input/input-number.vue";
    import inputSelect from './input/input-select.vue'
    import inputText from "./input/input-text.vue";
    import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
    import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
    import ModalForSelectablePaymentTermList from './ModalForSelectablePaymentTermList.vue'
    import ModalForSelectableVatBusPostingGroupList from './ModalForSelectableVATBUSPostingGroupList.vue'
    import { onBeforeMount, onMounted, ref } from 'vue'
    import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
    import { useRouter } from 'vue-router'
    import  axios  from 'axios'



  
  
  export default {
    name: "new-revision-request",
    props:['customerNo','salesMode'],
    components: {
      revisionRequestCardHeader,
      revisionInfo,
      inputSelect,inputNumber,inputText,
      revisionRequestCardRibbon,
      ModalForSelectableCustomerList,
      ModalForSelectablePaymentMethodList,ModalForSelectablePaymentTermList,ModalForSelectableVatBusPostingGroupList,
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
        goBackToCustomer(){
            this.$router.push(`/CustomerCard/${this.customerNo}`)
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
    setup(props){

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

        const  revisionRequestCardInfo = {
          revisionRequestCustomerNo : ref(webUserInfo.customerNo),
          revisionRequestNewPaymentMethodCode : ref(''),
          revisionRequestNewVATBusPostingGroup : ref(''),
          revisionRequestNewPaymentTermsCode : ref(''),
          revisionRequestNewCreditLimit: ref(''),
          revisionRequestNewPrepayment: ref('')

          }
          

            function fillCustomerInfoField(customer){
                revisionRequestCardInfo.revisionRequestCustomerNo.value=customer['No_']                
            }

            function fillPaymentMethodInfoField(paymentMethod){
                revisionRequestCardInfo.revisionRequestNewPaymentMethodCode.value=paymentMethod["Code"]
            }

            function fillVATGroupInfoField(VATGroup){
                revisionRequestCardInfo.revisionRequestNewVATBusPostingGroup.value= VATGroup['Code']
            }

            function fillPaymentTermInfoField(paymentTerm){
                revisionRequestCardInfo.revisionRequestNewPaymentTermsCode.value= paymentTerm['Code']
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

            revisionRequestCardInfo.revisionRequestCustomerNo.value = props.customerNo

        })

          function createRevisionRequest(sqData){
              axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
              .then(res => {
                  submitting_message.value=''
                  success_message.value='La demande a de révision n° '+res.data.documentNo+' été créée'
                  error_message.value=''
                  setTimeout(()=> success_message.value+'',5000)
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
                    Parameter:' revisionRequests_insert',
                    webUserName:useWebUserInfoStore().name,
                    'Customer No_': props.customerNo,
                    'New Payment Terms Code': revisionRequestCardInfo.revisionRequestNewPaymentTermsCode.value,
                    'New Credit limit (LCY)': revisionRequestCardInfo.revisionRequestNewCreditLimit.value,
                    'New Payment Method Code': revisionRequestCardInfo.revisionRequestNewPaymentMethodCode.value,
                    'New VAT Bus_ Posting Group': revisionRequestCardInfo.revisionRequestNewVATBusPostingGroup.value,
                    'New Prepayment _': revisionRequestCardInfo.revisionRequestNewPrepayment.value,
                    
                }
                createRevisionRequest(formatToBCJsonData(JSData))
            }

          return{
              ... revisionRequestCardInfo,
              submitting_message,error_message,error_message_code,success_message,
              fillCustomerInfoField,fillPaymentMethodInfoField,fillVATGroupInfoField,fillPaymentTermInfoField,
              submitForm
          }
    }
   
  };
</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}
  #general_content {
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s;
  }
  
  .has-border-bottom-grey {
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
  }
</style>
  