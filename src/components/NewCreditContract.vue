<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <credit-contract-card-Header soNo="" :soDesc="creditContractCustomerName" pageTitle="Contrat achat groupé"
                @onGoingBackToList='goBackToList'
                ></credit-contract-card-Header>
            </div>
<!---------Composant rubban fiche client----------------------->      
            <credit-contract-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onSubmittingForm="submitForm"
            componentWithCompInfo="newCreditContractRightInfoMaxWidth"
            :readOnlyModeIsDisabled="true"
            ></credit-contract-card-ribbon>

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

<!---------sous-Section onglet 1 formulaire fiche contrat AGP ----------------------->                         
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
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-select-basic-1 labelInputText="Type de compte" v-model="creditContractAccountType" :option-list="optionLabelListForAccountType"></input-select-basic-1>
                                
                                <input-select labelInputText="N° Client" v-model="creditContractCustomerNo" @openModal="activeModalForSelectableElementList=creditContractAccountType==0?'leadList':'customerList'"></input-select>
                                
                                <input-text labelInputText="Nom client" :valueInputText="creditContractCustomerName" :is_disabled="true"></input-text> 

                                <input-date labelInputText="Date de début opération" v-model="creditContractOPStartingDate"></input-date>
                                
                                <input-number labelInputText="Durée de l'opération (mois)" v-model="creditContractOPDurationMonth" ></input-number>
                                
                                <input-date labelInputText="Date de fin opération" :valueInputText="formatDate(creditContractOPEndingDate)" :is_disabled="true"></input-date> 
    
                                <input-number labelInputText="Durée du crédit" v-model="creditContractDurationMonth" ></input-number>
    
                                <input-select-basic-1 labelInputText="Type engagement" v-model="creditContractCommitmentType" :option-list="optionLabelListForCommitmentType"></input-select-basic-1> 
                                
                            </div>
                            <div class="column">
                                <input-text labelInputText="Conditions de paiement" :valueInputText="creditContractPaymentTermsCode" :is_disabled="true"></input-text> 
                            
                                <input-date labelInputText="Date 1ère échéance" v-model="creditContractFirstTermsDate"></input-date> 
                                
                                <input-select labelInputText="Mode de règlement" v-model="creditContractPaymentMethodCode" @openModal="activeModalForSelectableElementList='paymentMethodList'"></input-select>
                            
                                <input-select-basic-1 labelInputText="Mode de calcul plafond" v-model="creditContractCreditLimitMode" :option-list="optionLabelListForCreditLimitMode"></input-select-basic-1> 
                                
                                <input-number labelInputText="Montant plafond standard" v-model="creditContractStandardCreditLimit" :is_disabled="creditContractCreditLimitMode!==1"></input-number>
                                
                                <input-number labelInputText="% Quotité cessible" v-model="creditContractTransferablePart" ></input-number>
                                
                                <input-number labelInputText="% frais dossier" v-model="creditContractApplicationFees"></input-number>

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

        <modal-for-selectable-lead-list 
            v-if="activeModalForSelectableElementList=='leadList'" 
            :isActive="activeModalForSelectableElementList=='leadList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableLeadListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-lead-list>

        <modal-for-selectable-payment-method-list 
            v-if="activeModalForSelectableElementList=='paymentMethodList'" 
            :isActive="activeModalForSelectableElementList=='paymentMethodList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectablePaymentMethodListModal="(elt)=>fillPaymentMethodInfoField(elt)">
        </modal-for-selectable-payment-method-list>


    </div>     
</template>
<script>
import CreditContractCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import CreditContractCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputNumber from './input/input-number.vue'
import inputDate from './input/input-date.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectableLeadList from './ModalForSelectableLeadList.vue'
import { onBeforeMount, onMounted, ref, watch, watchEffect } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useCreditContractGPInfoStore } from '@/Stores/CreditContractGPInfo'
import  axios  from 'axios'
import { useRouter } from 'vue-router'



export default {
    name:'new-credit-contract',
    components:{
        CreditContractCardHeader,
        CreditContractCardRibbon,
        CustomerInfo,
        inputText,
        inputNumber,
        inputDate,
        inputSelect,
        inputSelectBasic1,
        ModalForSelectablePaymentMethodList,ModalForSelectableLeadList,ModalForSelectableCustomerList
    },
    setup(){            
        const router = useRouter()
        //date courante
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
            
        //sac des labels de la fiche
        const labelBag = {
            optionLabelListForCommitmentType : ref([]),
            optionLabelListForAccountType : ref([]),
            optionLabelListForCreditLimitMode : ref([])
        }

        //fonction pour récupérer une liste de label pour les champs à sélection
        function getOptionLabelList(field){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Commitment Type]')
                    labelBag.optionLabelListForCommitmentType.value=result.data.recordset
                if (field=='[Account Type]')
                    labelBag.optionLabelListForAccountType.value=result.data.recordset
                if (field=='[Credit Limit Mode]')
                    labelBag.optionLabelListForCreditLimitMode.value=result.data.recordset
            }).catch(err=>console.log(err))
        }

        //référence de nos champs en entête et en ligne
        const creditContractCardHeaderInfo = {
            creditContractAccountType : ref(1),
            creditContractCustomerNo : ref(''),
            creditContractCustomerName : ref(''),
            creditContractOPStartingDate : ref(currentDate),
            creditContractOPDurationMonth : ref(0),
            creditContractOPEndingDate : ref(currentDate),
            creditContractDurationMonth : ref(0),
            creditContractCommitmentType : ref(0),
            creditContractPaymentTermsCode : ref(''),
            creditContractFirstTermsDate : ref(currentDate),
            creditContractPaymentMethodCode : ref(''),
            creditContractCreditLimitMode : ref(0),
            creditContractStandardCreditLimit : ref(0),
            creditContractTransferablePart : ref(0),
            creditContractApplicationFees : ref(0),
        }

//fonction pour remplir les champs avec des listes sélectionnables
        function fillCustomerInfoField(customer){
            creditContractCardHeaderInfo.creditContractCustomerNo.value=customer["No_"]
            creditContractCardHeaderInfo.creditContractCustomerName.value=customer["Name"]
        }
        function fillPaymentMethodInfoField(paymentMethod){
            creditContractCardHeaderInfo.creditContractPaymentMethodCode.value=paymentMethod["Code"]
        }


        //Fonctions pour récupérer les paramètres globaux AGP
        function getAGPGlobalParameter(){
            axios.get(`http://${hostname}:5000/app/getCreditContractGP`)
            .then(result =>{
                useCreditContractGPInfoStore().fillCreditContractGPInfo(result.data)
                creditContractCardHeaderInfo.creditContractDurationMonth.value = useCreditContractGPInfoStore().durationMonth
                creditContractCardHeaderInfo.creditContractOPDurationMonth.value = useCreditContractGPInfoStore().OPDurationMonth
                creditContractCardHeaderInfo.creditContractApplicationFees.value = useCreditContractGPInfoStore().applicationFees
                creditContractCardHeaderInfo.creditContractTransferablePart.value = useCreditContractGPInfoStore().transferablePart
                creditContractCardHeaderInfo.creditContractPaymentTermsCode.value = useCreditContractGPInfoStore().defaultPaymentTermsCode
            })
            .catch((err)=>console.log(err))
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
        function createCreditContract(formattedCreditContractData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedCreditContractData)
            .then((res) => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                error_message.value=''
                setTimeout(()=> router.push(`/CreditContractCard?contractNo=${res.data.documentNo}`),3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }

        //fonction pour soumettre la modifiaction de la fiche
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'creditContracts_insert',
                webUserName:useWebUserInfoStore().name,
                'No_':'',
                'Account Type':creditContractCardHeaderInfo.creditContractAccountType.value,
                'Customer No_':creditContractCardHeaderInfo.creditContractCustomerNo.value,
                'Customer Name':creditContractCardHeaderInfo.creditContractCustomerName.value,
                'OP Starting Date':new Date(creditContractCardHeaderInfo.creditContractOPStartingDate.value).toISOString(),
                'OP Duration (Month)':creditContractCardHeaderInfo.creditContractOPDurationMonth.value,
                'OP Ending Date':new Date(creditContractCardHeaderInfo.creditContractOPEndingDate.value).toISOString(),
                'Duration (Month)':creditContractCardHeaderInfo.creditContractDurationMonth.value,
                'Commitment Type':creditContractCardHeaderInfo.creditContractCommitmentType.value,
                'Payment Terms Code':creditContractCardHeaderInfo.creditContractPaymentTermsCode.value,
                'First Terms Date':new Date(creditContractCardHeaderInfo.creditContractFirstTermsDate.value).toISOString(), 
                'Payment Method Code':creditContractCardHeaderInfo.creditContractPaymentMethodCode.value,
                'Approval Status':0,
                'Credit Limit Mode':creditContractCardHeaderInfo.creditContractCreditLimitMode.value,
                'Standard Credit Limit':creditContractCardHeaderInfo.creditContractStandardCreditLimit.value,
                'Transferable part _':creditContractCardHeaderInfo.creditContractTransferablePart.value,
                'Application fees_':creditContractCardHeaderInfo.creditContractApplicationFees.value
            }
            createCreditContract(formatToBCJsonData(JSData))
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

        onMounted(() =>{
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }

            if(!useCreditContractGPInfoStore().isFilled){
                getAGPGlobalParameter()
            }else{
                creditContractCardHeaderInfo.creditContractDurationMonth.value = useCreditContractGPInfoStore().durationMonth
                creditContractCardHeaderInfo.creditContractOPDurationMonth.value = useCreditContractGPInfoStore().OPDurationMonth
                creditContractCardHeaderInfo.creditContractApplicationFees.value = useCreditContractGPInfoStore().applicationFees
                creditContractCardHeaderInfo.creditContractTransferablePart.value = useCreditContractGPInfoStore().transferablePart
                creditContractCardHeaderInfo.creditContractPaymentTermsCode.value = useCreditContractGPInfoStore().defaultPaymentTermsCode
            }
            getOptionLabelList('[Commitment Type]')
            getOptionLabelList('[Account Type]')
            getOptionLabelList('[Credit Limit Mode]')
        })

        watchEffect(() => {
            let OPEndingDate = new Date(creditContractCardHeaderInfo.creditContractOPStartingDate.value)
            OPEndingDate.setDate(OPEndingDate.getDate()+ (creditContractCardHeaderInfo.creditContractOPDurationMonth.value * 30 ))
            creditContractCardHeaderInfo.creditContractOPEndingDate.value= OPEndingDate
        })
        watch(creditContractCardHeaderInfo.creditContractCreditLimitMode,()=>{
            creditContractCardHeaderInfo.creditContractStandardCreditLimit.value = 0
        })
    

    
    
        return{
            ...creditContractCardHeaderInfo,
            fillPaymentMethodInfoField,fillCustomerInfoField,
            submitForm,
            error_message,error_message_code,success_message,submitting_message,
            ...labelBag,
        }
    },
    data(){
        return{

            //list:[],
            //taille (hauteur) initiale des onglets de la page
            height:'700px',

            //taille (largeur) initiale du composant custumerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.newCreditContractRightInfoMaxWidth,

            //indique si les onglets de la page sont réduits ou pas
            onglet1_expanded:true,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('sales')
            useNavigationTabStore().setActiveTab('creditContracts')
            this.$router.push('/')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('newCreditContractRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newCreditContractRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
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