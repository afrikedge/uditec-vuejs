<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="paymentPromiseCardHeader['No_']" :soDesc="paymentPromiseCardHeader['Subject']" pageTitle="Fiche promesse règlement" 
                @onGoingBackToList='goBackToList'/>
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <Customer-card-ribbon
            routeForNewCard="../NewPaymentPromise"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            componentWithCompInfo="payPromiseRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="false"
            ></Customer-card-ribbon>


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
                                <a @click="collapse('general_content');onglet1_expanded=!onglet1_expanded" v-if="!onglet1_expanded">
                                    <span>Général</span>
                                </a>
                                <a @click="expand('general_content');onglet1_expanded=!onglet1_expanded" v-if="onglet1_expanded">
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
                                
                                <input-text labelInputText="Créé le" :valueInputText="formatDate(paymentPromiseCardHeader['Created on'])" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Créé par" :valueInputText="paymentPromiseCardHeader['Created by']" :is_disabled="true"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date de la promesse" :valueInputText="formatDate(paymentPromiseCardHeader['Promise Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date de la promesse" v-model="paymentPromiseDate" v-else></input-date>
                                
                                <input-text labelInputText="Montant promis" :valueInputText="paymentPromiseCardHeader['Promised amount']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-number labelInputText="Montant promis" v-model="paymentPromiseCardHeader['Promised amount']" v-else></input-number>
                                
                                <input-text labelInputText="Montant honoré" :valueInputText="paymentPromiseCardHeader['Honored amount']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-number labelInputText="Montant honoré" v-model="paymentPromiseCardHeader['Honored amount']" v-else></input-number>
                                                                
                                <input-text labelInputText="Type d'activité de rappel" :valueInputText="activityTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type d'activité de rappel" v-model="paymentPromiseCardHeader['Activity Type']" :option-list="optionLabelListForActivityType" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Date rappel" :valueInputText="formatDate(paymentPromiseCardHeader['Riminding Date'])" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date rappel" v-model="paymentPromiseRemindingDate" v-else></input-date>
                                
                                <input-text labelInputText="Echéance rappel" :valueInputText="formatDate(paymentPromiseCardHeader['Riminding Date'])" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Echéance rappel" v-model="paymentPromiseRemindingDueDate" v-else></input-date>
                            
                                <input-text labelInputText="Statut" :valueInputText="promiseStatusLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="statut" v-model="paymentPromiseCardHeader['Promise Status']" :option-list="optionLabelListForPromiseStatus" v-else></input-select-basic-1> 
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
            :customerNo="paymentPromiseCardHeader.value['Customer No_']"
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
import CustomerCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import CustomerCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import inputDate from './input/input-date.vue'
import inputNumber from './input/input-number.vue'
import inputSelect from './input/input-select.vue'
import axios from 'axios'
import { onMounted,ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableActivityList from './ModalForSelectableActivityList.vue'
import ModalForSelectableUserList from './ModalForSelectableExternalUserList.vue'


export default {
    name:'repossession-request-card',
    components:{
        CustomerCardHeader,CustomerInfo,inputText,CustomerCardRibbon,
        inputSelectBasic1,inputDate,inputNumber,inputSelect,ModalForSelectableCustomerList,
        ModalForSelectableContactList,
        ModalForSelectableActivityList,
        ModalForSelectableUserList
    },
    setup(){
        const paymentPromiseCardHeader = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const paymentPromiseCardId = useRoute().params.id

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')

        const optionLabelListForPromiseStatus = ref([])
        const optionLabelListForActivityType = ref([])


        const currentOptionLabel = {
            promiseStatusLabel:ref(''),
            activityTypeLabel:ref(''),
        }

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

        function getOptionLabel(list,value,attribute){
            list.forEach(element => {
                if(element['Value']==value)
                currentOptionLabel[attribute].value = element['Description']
            });
        }

        const dateInfo= {
                paymentPromiseDate: ref(''),
                paymentPromiseRemindingDate: ref(''),
                paymentPromiseRemindingDueDate: ref(''),
            }

        

        function getOptionLabelList(field){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Activity Type]')
                    optionLabelListForActivityType.value=result.data.recordset
                    getOptionLabel(optionLabelListForActivityType.value,paymentPromiseCardHeader.value['Activity Type'],'activityTypeLabel')
                    
                if (field=='[Promise Status]')
                    optionLabelListForPromiseStatus.value=result.data.recordset
                    getOptionLabel(optionLabelListForPromiseStatus.value,paymentPromiseCardHeader.value['Promise Status'],'promiseStatusLabel')

    
            }).catch(err=>console.log(err))
        }

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }

        function getPPCardInfo(){
            axios.get(`http://${hostname}:3000/app/getPPCard/${paymentPromiseCardId}`)
            .then(result => {
                 paymentPromiseCardHeader.value = result.data
                 dateInfo.paymentPromiseDate.value= getISODate(paymentPromiseCardHeader.value['Promise Date'])
                 dateInfo.paymentPromiseRemindingDate.value= getISODate(paymentPromiseCardHeader.value['Riminding Date'])
                 dateInfo.paymentPromiseRemindingDueDate.value= getISODate(paymentPromiseCardHeader.value['Riminding Date'])
                 getOptionLabelList('[Activity Type]')
                getOptionLabelList('[Promise Status]')
            }).catch(err=>console.log(err))
        }

        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }

        watch(success_message, () => {
            readOnlyModeIsDisabled.value=false
            getPPCardInfo()
        })

        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
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

        function updatepaymentPromise(rrData){
            axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company.value}`,rrData)
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
        
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }

        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'paymentPromises_modify',
                webUserName:webUserInfo.name.value,
                'No_':paymentPromiseCardHeader.value['No_'],
                'Subject':paymentPromiseCardHeader.value['Subject'],
                'Customer No_':paymentPromiseCardHeader.value['Customer No_'],
                'Contact No_':paymentPromiseCardHeader.value['Contact No_'],
                'Description':paymentPromiseCardHeader.value['Description'],
                    'Created on':new Date().toISOString,
                    'Created by':useWebUserInfoStore().name,
                    'Promise Date':dateInfo.paymentPromiseDate.value,
                    'Assigned to':paymentPromiseCardHeader.value['Assigned to'],
                    'Promised amount':paymentPromiseCardHeader.value['Promised amount'],
                    'Honored amount':paymentPromiseCardHeader.value['Honored amount'],
                    'Originated activity':paymentPromiseCardHeader.value['Originated activity'], 
                    'Activity Type':paymentPromiseCardHeader.value['Activity Type'],
                    'Riminding Date':dateInfo.paymentPromiseRemindingDate.value,
                    'Reminding Due Date':dateInfo.paymentPromiseRemindingDueDate.value,
                    'Promise Status':paymentPromiseCardHeader.value['Promise Status']
            }
            updatepaymentPromise(formatToBCJsonData(JSData))
        }

        onMounted(() => {
            if (webUserInfo.name.value){
                getPPCardInfo()
                
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getPPCardInfo()
                   
                })
                .catch(err=>console.log(err))
            }
        })



        // expose to template and other options API hooks
        return {
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            submitForm,
            readOnlyModeIsDisabled,
            paymentPromiseCardHeader,
            submitting_message,
            error_message,
            error_message_code,
            success_message,

            optionLabelListForActivityType,
            optionLabelListForPromiseStatus,
            ...currentOptionLabel,
            ...dateInfo,

            fillCustomerInfoField,
            fillContactInfoField,
            fillActivityInfoField,
            fillExternalUserInfoField

        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.payPromiseRightInfoMaxWidth,

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
        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
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



</style>