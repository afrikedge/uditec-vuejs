<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <payment-promise-Card-Header   :soNo="paymentPromiseCardHeader['No_']" :soDesc="paymentPromiseCardHeader['Subject']" pageTitle="Fiche promesse règlement" 
                @onGoingBackToList='goBackToList'/>
            </div>
            
<!---------Composant rubban fiche promesse----------------------->      
            <payment-promise-card-ribbon
            routeForNewCard="../NewPaymentPromise"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="controlForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            componentWithCompInfo="paymentPromiseRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="paymentPromiseCardHeader['Promise Status']>0"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="false"
            ></payment-promise-card-ribbon>


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



<!---------Section formulaire fiche demande repossession----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche client----------------------->                         
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ paymentPromiseCardHeader['Customer No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ paymentPromiseCardHeader['Contact No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ formatDate(paymentPromiseCardHeader['Promise Date']) }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ promiseStatusLabel }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Objet" :valueInputText="paymentPromiseCardHeader['Subject']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="N° Client" :valueInputText="paymentPromiseCardHeader['Customer No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select v-model="paymentPromiseCardHeader['Customer No_']" labelInputText="N° Client" @openModal="activeModalForSelectableElementList='customerList'" v-else></input-select>
                                
                                <input-text labelInputText="N° Contact" :valueInputText="paymentPromiseCardHeader['Contact No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>  
                                <input-select v-model="paymentPromiseCardHeader['Contact No_']" labelInputText="N° Contact" @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>

                                <input-text labelInputText="Description" v-model="paymentPromiseCardHeader['Description']" :valueInputText="paymentPromiseCardHeader['Description']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                 
                                <input-text labelInputText="Activité d'origine" :valueInputText="paymentPromiseCardHeader['Originated activity']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>  
                                <input-select v-model="paymentPromiseCardHeader['Originated activity']" labelInputText="Activité d'origine" @openModal="activeModalForSelectableElementList='activityList'" v-else></input-select>
                                
                                <input-text labelInputText="Suivi par" :valueInputText="paymentPromiseCardHeader['Assigned to']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>  
                                <input-select v-model="paymentPromiseCardHeader['Assigned to']" labelInputText="Suivi par" @openModal="activeModalForSelectableElementList='userList'" v-else></input-select>
                                
                                <input-text labelInputText="Créé le" :valueInputText="formatDateHour(paymentPromiseCardHeader['Created on'])" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Créé par" :valueInputText="paymentPromiseCardHeader['Created by']" :is_disabled="true"></input-text> 
                            </div>
                            <div class="column">
                                <input-date labelInputText="Date de la promesse" v-model="paymentPromiseDate" :valueInputText="formatDate(paymentPromiseCardHeader['Promise Date'])"  :is_disabled="!readOnlyModeIsDisabled"></input-date>
                                
                                <input-number labelInputText="Montant promis" v-model="paymentPromiseCardHeader['Promised amount']" :valueInputText="paymentPromiseCardHeader['Promised amount']" :is_disabled="!readOnlyModeIsDisabled"></input-number>
                                
                                <input-number labelInputText="Montant honoré" v-model="paymentPromiseCardHeader['Honored amount']" :valueInputText="paymentPromiseCardHeader['Honored amount']" :is_disabled="!readOnlyModeIsDisabled || actualPromiseStatus!==2"></input-number>
                                
                                <input-date labelInputText="Date honoration"  :valueInputText="formatDate(paymentPromiseHonorationDate)"  :is_disabled="true"></input-date>
   
                                <input-text labelInputText="Type d'activité de rappel" :valueInputText="activityTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type d'activité de rappel" v-model="paymentPromiseCardHeader['Activity Type']" :option-list="optionLabelListForActivityType" v-else></input-select-basic-1> 
                                
                                <input-date labelInputText="Date rappel" v-model="paymentPromiseRemindingDate" :valueInputText="formatDate(paymentPromiseCardHeader['Riminding Date'])"  :is_disabled="!readOnlyModeIsDisabled"></input-date>
                                
                                <input-date labelInputText="Echéance rappel" v-model="paymentPromiseRemindingDueDate" :valueInputText="formatDate(paymentPromiseCardHeader['Reminding Due Date'])"  :is_disabled="!readOnlyModeIsDisabled"></input-date>
                            
                                <input-text labelInputText="Statut" :valueInputText="promiseStatusLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="statut" v-model="actualPromiseStatus" :option-list="optionLabelListForPromiseStatus" v-else></input-select-basic-1> 
                            
                                <input-text labelInputText="Observations" v-model="paymentPromiseCardHeader['Observations']" :valueInputText="paymentPromiseCardHeader['Observations']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
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
            :customerNo="paymentPromiseCardHeader['Customer No_']"
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
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

<!-----------modal d'avertissement avant enregistrement-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="!warningModalBeforeSubmitIsDisabled">
                <div class="modal-background has-background-dark" style="opacity:0.2" @click="warningModalBeforeSubmitIsDisabled=true"></div>
                <div class="modal-content has-background-white p-5 shadow" style="border: none;">
                    <div class="columns mb-5">
                        <div class="column is-narrow">
                            <span class="icon is-large">
                            <i class="far fa-circle-question fa-2x"></i>
                            </span>
                        </div>
                        <div class="column has-text-left">
                            <span class="subtitle is-5 has-text-left">Vous avez changé le statut du document en {{ actualPromiseStatusLabel }}. Veillez notez que si vous confirmez la modification, ce document ne sera plus modifiable.</span>
                        </div>
                    </div>
                    <div class="buttons mt-5 is-right">
                        <button class="button shadow has-background-orange has-text-white" @click.prevent="submitForm">
                            Je confirme
                        </button>
                        <button class="button shadow" @click.prevent="resetStatusChange">J'annule</button>
                    </div>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" warningModalBeforeSubmitIsDisabled=true"></button>
            </div>
    </div>    

</template>
<script>
import PaymentPromiseCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import PaymentPromiseCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import inputDate from './input/input-date.vue'
import inputNumber from './input/input-number.vue'
import inputSelect from './input/input-select.vue'
import axios from 'axios'
import { onBeforeMount, onMounted,ref, watch} from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableActivityList from './ModalForSelectableActivityList.vue'
import ModalForSelectableUserList from './ModalForSelectableExternalUserList.vue'


export default {
    name:'payment-promise-card',
    components:{
        PaymentPromiseCardHeader,CustomerInfo,inputText,PaymentPromiseCardRibbon,
        inputSelectBasic1,inputDate,inputNumber,inputSelect,ModalForSelectableCustomerList,
        ModalForSelectableContactList,
        ModalForSelectableActivityList,
        ModalForSelectableUserList
    },
    setup(){
        const paymentPromiseCardHeader = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const actualPromiseStatus = ref(0)
        const initialPromiseStatus = ref(0)
        const promiseStatusHasChanged = ref(false)
        const warningModalBeforeSubmitIsDisabled = ref(true)
        const hostname = window.location.hostname
        const paymentPromiseCardId = useRoute().params.id
        const router = useRouter()

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

        //objet contenant nos champs de date
        const dateInfo= {
            paymentPromiseDate: ref(''),
            paymentPromiseHonorationDate: ref(''),
            paymentPromiseRemindingDate: ref(''),
            paymentPromiseRemindingDueDate: ref(''),
        }

        //sac de label de la fiche
        const labelBag = {
            promiseStatusLabel : ref(''),
            actualPromiseStatusLabel : ref(''),
            activityTypeLabel : ref(''),
            optionLabelListForPromiseStatus : ref([]),
            optionLabelListForActivityType : ref([]),
        }  

        //fonction pour afficher le label pour une valeur donnée
        // function getOptionLabel(list,value,attribute){
        //     list.forEach(element => {
        //         if(element['Value']==value)
        //         labelBag[attribute].value = element['Description']
        //     });
        // }

        //fonction pour afficher le label pour une valeur donnée
        function getOptionLabel(listToGetLabel,valueToGetLabel,fieldToSetLabel){
            if(labelBag[listToGetLabel].value[valueToGetLabel])
                labelBag[fieldToSetLabel].value = labelBag[listToGetLabel].value[valueToGetLabel].Description
        }

        //fonction pour récupérer la liste des label et valeur pour un champ donné
        function getOptionLabelList(fieldToGetLabelList,listToSetLabelList){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                labelBag[listToSetLabelList].value=result.data.recordset
                if(fieldToGetLabelList=='[Activity Type]'){
                    getOptionLabel(listToSetLabelList,paymentPromiseCardHeader.value['Activity Type'],'activityTypeLabel')
                }
                if(fieldToGetLabelList=='[Promise Status]'){
                    getOptionLabel(listToSetLabelList,initialPromiseStatus.value,'promiseStatusLabel')
                }
            }).catch(err=>console.log(err))
        }


        //fonction pour remplir les champs avec des listes sélectionnables
        function fillCustomerInfoField(customer){
            paymentPromiseCardHeader.value['Customer No_'] =customer['No_']
            paymentPromiseCardHeader.value['Contact No_']=customer['Primary Contact No_']
        }
        function fillContactInfoField(contact){
            paymentPromiseCardHeader.value['Contact No_']=contact['No_']
        }
        function fillActivityInfoField(activity){
            paymentPromiseCardHeader.value['Originated activity']=activity['No_']
        }
        function fillExternalUserInfoField(user){
            paymentPromiseCardHeader.value['Assigned to']=user['Code']
        }
      

        //fonction de récupération des données de la fiche promesse de règlement
        function getPPCardInfo(){
            axios.get(`http://${hostname}:5000/app/getPaymentPromiseCard?paymentPromiseNo=${paymentPromiseCardId}`)
            .then(result => {
                 paymentPromiseCardHeader.value = result.data
                 initialPromiseStatus.value = paymentPromiseCardHeader.value['Promise Status']
                 actualPromiseStatus.value = paymentPromiseCardHeader.value['Promise Status']
                 dateInfo.paymentPromiseDate.value= getISODate(paymentPromiseCardHeader.value['Promise Date'])
                 dateInfo.paymentPromiseRemindingDate.value= getISODate(paymentPromiseCardHeader.value['Riminding Date'])
                 dateInfo.paymentPromiseRemindingDueDate.value= getISODate(paymentPromiseCardHeader.value['Reminding Due Date'])
                 paymentPromiseCardHeader.value['Promised amount'] = roundAmount(paymentPromiseCardHeader.value['Promised amount'])
                 paymentPromiseCardHeader.value['Honored amount']= roundAmount(paymentPromiseCardHeader.value['Honored amount'])
                 getOptionLabelList('[Activity Type]','optionLabelListForActivityType')
                getOptionLabelList('[Promise Status]','optionLabelListForPromiseStatus')
            }).catch(err=>console.log(err))
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
        
//fonctions de formattage
        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }
        function roundAmount(number){
            const newNumber = Number(number)
            if(isNaN(newNumber)) return ''
            else return Math.round(newNumber)
        }
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }

        //fonction qui envoie les données à l'API et réceptionne et affiche le nouveau statut du prospect
        function updatepaymentPromise(rrData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,rrData)
            .then(() => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi'
                error_message.value=''
                setTimeout(()=>success_message.value='',5000)
                readOnlyModeIsDisabled.value=false
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }

        //fonction qui envoie les données aux service de bc et réceptionne et affiche la réponse ou l'erreur
        function submitForm(){
            warningModalBeforeSubmitIsDisabled.value = true
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'paymentPromises_modify',
                webUserName:useWebUserInfoStore().name,
                'No_':paymentPromiseCardHeader.value['No_'],
                'Subject':paymentPromiseCardHeader.value['Subject'],
                'Customer No_':paymentPromiseCardHeader.value['Customer No_'],
                'Contact No_':paymentPromiseCardHeader.value['Contact No_'],
                'Description':paymentPromiseCardHeader.value['Description'],
                'Created on':paymentPromiseCardHeader.value['Created on'],
                'Created by':paymentPromiseCardHeader.value['Created by'],
                'Promise Date':dateInfo.paymentPromiseDate.value,
                'Assigned to':paymentPromiseCardHeader.value['Assigned to'],
                'Promised amount':paymentPromiseCardHeader.value['Promised amount'],
                'Honored amount':paymentPromiseCardHeader.value['Honored amount'],
                'Honoration Date':dateInfo.paymentPromiseHonorationDate.value?dateInfo.paymentPromiseHonorationDate.value:'1753-01-01T00:00:00.000Z',
                'Originated activity':paymentPromiseCardHeader.value['Originated activity'], 
                'Activity Type':paymentPromiseCardHeader.value['Activity Type'],
                'Riminding Date':dateInfo.paymentPromiseRemindingDate.value,
                'Reminding Due Date':dateInfo.paymentPromiseRemindingDueDate.value,
                'Promise Status':actualPromiseStatus.value,
                'Observations':paymentPromiseCardHeader.value['Observations']
            }
            updatepaymentPromise(formatToBCJsonData(JSData))
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
            getPPCardInfo()
        })

        watch(success_message, () => {
            if(success_message.value)
            getPPCardInfo()
        })


        watch(actualPromiseStatus, () => {
            if(actualPromiseStatus.value !== initialPromiseStatus.value){
                promiseStatusHasChanged.value = true
                if(actualPromiseStatus.value == 1){
                    paymentPromiseCardHeader.value['Honored amount']=paymentPromiseCardHeader.value['Promised amount']
                    dateInfo.paymentPromiseHonorationDate.value = new Date().toISOString()
                }
                if(actualPromiseStatus.value == 2){
                    dateInfo.paymentPromiseHonorationDate.value = new Date().toISOString()
                }
            }else{
                promiseStatusHasChanged.value = false
                if(paymentPromiseCardHeader.value['Honored amount']){
                    paymentPromiseCardHeader.value['Honored amount']=0
                }
                if(dateInfo.paymentPromiseHonorationDate.value){
                    dateInfo.paymentPromiseHonorationDate.value = '1753-01-01T00:00:00.000Z'
                }
            }
        })

//fonctions de controle avant soumission de forme
        function resetStatusChange(){
            actualPromiseStatus.value = initialPromiseStatus.value
            warningModalBeforeSubmitIsDisabled.value =true
        }

        function controlForm(){
            // if(actualPromiseStatus.value<initialPromiseStatus.value){
            //     error_message_code.value = 'USER_OPERATION_NOT_ACCEPTED'
            //     return error_message.value = 'the status cannnot be changed to the lower level!'
            // }
            // else{
                if(initialPromiseStatus.value>0){
                    error_message_code.value = 'USER_OPERATION_NOT_ACCEPTED!'
                    return error_message.value = 'Cannot modify the document!'
                }
                if(promiseStatusHasChanged.value){
                    switch (actualPromiseStatus.value) {
                        case 1 :
                            getOptionLabel('optionLabelListForPromiseStatus',actualPromiseStatus.value,'actualPromiseStatusLabel')
                            warningModalBeforeSubmitIsDisabled.value = false;
                            break;
                        case 2 :
                            if((paymentPromiseCardHeader.value['Honored amount'] <=0) || (paymentPromiseCardHeader.value['Honored amount'] >= paymentPromiseCardHeader.value['Promised amount'])){
                                error_message_code.value = 'USER_OPERATION_NOT_ACCEPTED!'
                                return error_message.value = 'Incorrect honored amount!'
                            }
                            getOptionLabel('optionLabelListForPromiseStatus',actualPromiseStatus.value,'actualPromiseStatusLabel')
                            warningModalBeforeSubmitIsDisabled.value = false;
                            break;
                        case 3 :
                            warningModalBeforeSubmitIsDisabled.value = false;
                            getOptionLabel('optionLabelListForPromiseStatus',actualPromiseStatus.value,'actualPromiseStatusLabel')
                            break;
                    }
                }else{
                    submitForm()
                }
           // }
        }


        // expose to template and other options API hooks
        return {
            roundAmount,
            readOnlyModeIsDisabled,setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,
            paymentPromiseCardHeader,
            submitting_message,error_message,error_message_code,success_message,
            ...labelBag,...dateInfo,actualPromiseStatus,
            warningModalBeforeSubmitIsDisabled,resetStatusChange,
            fillCustomerInfoField,fillContactInfoField,fillActivityInfoField,fillExternalUserInfoField,
            submitForm,controlForm,
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.paymentPromiseRightInfoMaxWidth,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            
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
                useNavigationTabStore().setMaxWidth('newrepossRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newrepossRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else{
                return ''
            }
        },
        formatDate(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')) return ''
                else return new Date(date).toLocaleDateString()
            }else{
                return ''
            }
        },
        expand(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight='500px'
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
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}

.has-background-orange{
    background-color: orange;
}


</style>