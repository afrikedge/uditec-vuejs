<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <r-r-card-Header :soNo="'Client N° : '+paymentPromiseCustomerNo" :soDesc="paymentPromiseSubject" pageTitle="Promesse de règlement"
                @onGoingBackToList='goBackToList'
                ></r-r-card-Header>
            </div>
<!---------Composant rubban fiche client----------------------->      
            <r-r-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onSubmittingForm="submitForm"
            componentWithCompInfo="newPayPromiseRightInfoMaxWidth"
            :readOnlyModeIsDisabled="true"
            ></r-r-card-ribbon>

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

<!---------Section formulaire fiche client----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire fiche client----------------------->                         
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
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text v-model="paymentPromiseSubject" labelInputText="Objet"></input-text>
                                
                                <input-select v-model="paymentPromiseCustomerNo" labelInputText="N° Client" @openModal="activeModalForSelectableElementList='customerList'"></input-select>
                                
                                <input-select v-model="paymentPromiseContactNo" labelInputText="N° Contact" @openModal="activeModalForSelectableElementList='contactList'"></input-select>
                                
                                <input-text v-model="paymentPromiseDescription" labelInputText="Description"></input-text>

                                <input-select v-model="paymentPromiseOriginatedActivity" labelInputText="Activité d'origine" @openModal="activeModalForSelectableElementList='activityList'"></input-select>
                                
                                <input-select v-model="paymentPromiseAssignedTo" labelInputText="Suivi par" @openModal="activeModalForSelectableElementList='userList'"></input-select>
                            </div>
                            <div class="column">
                                <input-date v-model="paymentPromiseDate" labelInputText="Date promesse"></input-date> 


                                <input-number v-model="paymentPromisePromisedAmount" labelInputText="Montant promis"></input-number> 

                                <input-number v-model="paymentPromiseHonoredAmount" labelInputText="Montant honoré"></input-number> 

                            
                                <input-select-basic-1 v-model="paymentPromiseActivityType" labelInputText="Type d'activité de rappel" :option-list="optionLabelListForActivityType"></input-select-basic-1> 
                                
                                <input-date v-model="paymentPromiseRemindingDate" labelInputText="Date rappel"></input-date> 
                                
                                <input-date v-model="paymentPromiseRemindingDueDate" labelInputText="Echéance rappel"></input-date> 
                                
                                <input-select-basic-1 v-model="paymentPromiseStatus" labelInputText="Statut" :option-list="optionLabelListForPromiseStatus"></input-select-basic-1> 

                            </div>
                        </div>                    
                    </div>
                    <br><br>
                </div>

<!---------composant info client----------------------->
                <customer-info class="customer-info"></customer-info>

            </div>
        </div>

<!---------------------------------------------->
        <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'"  
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-customer-list>


        <modal-for-selectable-contact-list 
            v-if="activeModalForSelectableElementList=='contactList'" 
            :isActive="activeModalForSelectableElementList=='contactList'" 
            :customerNo="paymentPromiseCustomerNo"
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableInvoiceListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-activity-list 
            v-if="activeModalForSelectableElementList=='activityList'" 
            :isActive="activeModalForSelectableElementList=='activityList'"
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableActivityListModal="(elt)=>fillActivityInfoField(elt)">
        </modal-for-selectable-activity-list>

        <modal-for-selectable-user-list 
            v-if="activeModalForSelectableElementList=='userList'" 
            :isActive="activeModalForSelectableElementList=='userList'"
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableUserListModal="(elt)=>fillExternalUserInfoField(elt)">
        </modal-for-selectable-user-list>




    </div>     
</template>
<script>
import RRCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import RRCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputDate from './input/input-date.vue'
import inputNumber from './input/input-number.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableActivityList from './ModalForSelectableActivityList.vue'
import ModalForSelectableUserList from './ModalForSelectableExternalUserList.vue'
import { onMounted, ref,  } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import  axios  from 'axios'
import { useRouter } from 'vue-router'



export default {
    name:'new-repossession-request',
    components:{
        RRCardHeader,
        RRCardRibbon,
        CustomerInfo,
        inputText,
        inputSelect,
        inputDate,
        inputNumber,
        inputSelectBasic1,
        ModalForSelectableCustomerList,
        ModalForSelectableContactList,
        ModalForSelectableActivityList,
        ModalForSelectableUserList
    },
    data(){
        return{

            //list:[],
            //taille (hauteur) initiale des onglets de la page
            height:'700px',

            //taille (largeur) initiale du composant custumerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.newquoteRightInfoMaxWidth,

            //indique si les onglets de la page sont réduits ou pas
            onglet1_expanded:true,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

        }
    },
    setup(){

 /////////////DATAS//////////////////////////   
            
            const router = useRouter()
            
            const currentDate = new Date(new Date()).toISOString().split('T')[0]

            //nom de l'hote dans l'url 
            const hostname = window.location.hostname;

            //variable de soumission forme
            let submitting_message=ref('') 

            //variable d'erreur serveur
            let error_message=ref('')
            let error_message_code =ref('')

            //variable de success serveur
            let success_message=ref('')

            const optionLabelListForActivityType = ref([])
            const optionLabelListForPromiseStatus = ref([])

            function getOptionLabelList(field){
                axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
                .then(result => {
                    if (field=='[Activity Type]')
                        optionLabelListForActivityType.value=result.data.recordset
                    if (field=='[Promise Status]')
                        optionLabelListForPromiseStatus.value=result.data.recordset
                }).catch(err=>console.log(err))
            }

            onMounted(() =>{
                if(useWebUserInfoStore().defaultLanguage){
                    getOptionLabelList('[Activity Type]')
                    getOptionLabelList('[Promise Status]')
                }else{
                    axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                    .then(res=>{
                        useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                        getOptionLabelList('[Activity Type]')
                        getOptionLabelList('[Promise Status]')
                    })
                    .catch(err=>console.log(err))
                }


            })

            
            const paymentPromiseCardHeaderInfo = {
                paymentPromiseSubject : ref(''),
                paymentPromiseCustomerNo : ref(''),
                paymentPromiseContactNo : ref(''),
                paymentPromiseDescription : ref(''),
                paymentPromiseOriginatedActivity : ref(''),
                paymentPromiseAssignedTo : ref(''),
                paymentPromisePromisedAmount:ref(0),
                paymentPromiseHonoredAmount:ref(0),
                paymentPromiseActivityType:ref(0),
                paymentPromiseStatus:ref(0)
            }

            const dateInfo= {
                paymentPromiseDate: ref(currentDate),
                paymentPromiseRemindingDate: ref(currentDate),
                paymentPromiseRemindingDueDate: ref(currentDate),
            }






 /////////////FUNCTIONS//////////////////////////      

            function fillCustomerInfoField(customer){
                
                paymentPromiseCardHeaderInfo.paymentPromiseCustomerNo.value=customer['No_']
                paymentPromiseCardHeaderInfo.paymentPromiseContactNo.value=customer['Primary Contact No_']
            }

            function fillContactInfoField(contact){
                paymentPromiseCardHeaderInfo.paymentPromiseContactNo.value=contact['No_']
            }


            function fillActivityInfoField(activity){
                paymentPromiseCardHeaderInfo.paymentPromiseOriginatedActivity.value=activity['No_']
            }

            function fillExternalUserInfoField(user){
                paymentPromiseCardHeaderInfo.paymentPromiseAssignedTo.value=user['Code']
            }

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

            function createpaymentPromise(rrData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,rrData)
                .then(res => {
                    submitting_message.value=''
                    success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                    error_message.value=''
                    setTimeout(()=> router.push(`/paymentPromiseCard/${res.data.documentNo}`),5000)
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
                    Parameter:'paymentPromises_insert',
                    webUserName:useWebUserInfoStore().name,
                    'No_':'',
                    'Subject':paymentPromiseCardHeaderInfo.paymentPromiseSubject.value,
                    'Customer No_': paymentPromiseCardHeaderInfo.paymentPromiseCustomerNo.value,
                    'Contact No_': paymentPromiseCardHeaderInfo.paymentPromiseContactNo.value,
                    'Description':paymentPromiseCardHeaderInfo.paymentPromiseDescription.value,
                    'Created on':new Date().toISOString,
                    'Created by':useWebUserInfoStore().name,
                    'Promise Date':dateInfo.paymentPromiseDate.value,
                    'Assigned to':paymentPromiseCardHeaderInfo.paymentPromiseAssignedTo.value,
                    'Promised amount':paymentPromiseCardHeaderInfo.paymentPromisePromisedAmount.value,
                    'Honored amount':paymentPromiseCardHeaderInfo.paymentPromiseHonoredAmount.value,
                    'Originated activity':paymentPromiseCardHeaderInfo.paymentPromiseOriginatedActivity.value, 
                    'Activity Type':paymentPromiseCardHeaderInfo.paymentPromiseActivityType.value,
                    'Riminding Date':dateInfo.paymentPromiseRemindingDate.value,
                    'Reminding Due Date':dateInfo.paymentPromiseRemindingDueDate.value,
                    'Promise Status':paymentPromiseCardHeaderInfo.paymentPromiseStatus.value
                }
                createpaymentPromise(formatToBCJsonData(JSData))
            }



        return{
            ...paymentPromiseCardHeaderInfo,
            fillCustomerInfoField,
            fillContactInfoField,
            fillActivityInfoField,
            fillExternalUserInfoField,
            submitForm,
            error_message,
            error_message_code,
            success_message,
            submitting_message,

            ...dateInfo,


            optionLabelListForActivityType,
            optionLabelListForPromiseStatus,
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('recovery')
            useNavigationTabStore().setActiveTab('paymentPromises')
            this.$router.push('/')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('newPayPromiseRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newPayPromiseRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
      
        //////////methode pour étendre un onglet de la page
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='line_content') myElt.style.maxHeight='250px'
            else myElt.style.maxHeight='500px'
        },
        ////////////methode pour reduire un onglet de la page
        collapse(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight="0px"
        },

    }
}


</script>
<style scoped>

.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content{
    max-height: v-bind(height);
    overflow: hidden;
    transition: max-height 0.5s
}


</style>