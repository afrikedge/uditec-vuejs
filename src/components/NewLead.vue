<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <lead-card-Header soNo="Nouveau prospect" :soDesc="leadName"
                @onGoingBackToList='goBackToList'/>
            </div>
            
<!---------Composant rubban fiche nouveau prospect----------------------->      
            <lead-card-ribbon
            @onSubmittingForm="submitForm"
            :readOnlyModeIsDisabled="true"
            ></lead-card-ribbon>

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

<!---------Section formulaire fiche nouveau prospect----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche nouveau prospect----------------------->                         
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
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ leadName }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ leadAddress }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadLegalStatusLabel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadTypeLabel }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">                                
                                <input-text labelInputText="Nom du prospect" v-model="leadName"></input-text>
                                
                                <input-text labelInputText="Nom de recherche" :valueInputText="leadSearchName" :is_disabled="true"></input-text>
                                                                
                                <input-select-basic-1 labelInputText="Type prospect" v-model="leadType" :option-list="optionLabelListForLeadType"></input-select-basic-1> 

                                <input-select-basic-1 labelInputText="Forme juridique" v-model="leadLegalStatus" :option-list="optionLabelListForLegalStatus"></input-select-basic-1> 

                                <input-select-basic-1 labelInputText="Mode d'identifiaction" v-model="leadIdentificationMode" :option-list="optionLabelListForIdentificationMode"></input-select-basic-1> 

                                <input-text labelInputText="Adresse:Ligne 1" v-model="leadAddress"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" v-model="leadAddress2"></input-text> 
                                <input-text labelInputText="Code postal" v-model="leadPostCode"></input-text> 
                                <input-text labelInputText="Ville" v-model="leadCity" ></input-text>                                 
                                <input-text labelInputText="Téléphone" v-model="leadPhoneNo" ></input-text> 
                                <input-text labelInputText="Téléphone Mobile" v-model="leadMobilePhoneNo"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Adresse E-mail" v-model="leadEMail" ></input-text> 
                                <input-text labelInputText="Site Web" v-model="leadHomePage"></input-text> 
                                
                                <input-select labelInputText="Code client parent" v-model="leadParentAccountNo"  @openModal="activeModalForSelectableElementList='customerList'"></input-select>

                                <input-select labelInputText="Catégorie article autorisée" v-model="leadItemCategory"  @openModal="activeModalForSelectableElementList='itemCategoryList'"></input-select>

                                <input-select labelInputText="Contact principal" v-model="leadPrimaryContactNo"  @openModal="activeModalForSelectableElementList='contactList'"></input-select>

                                <input-select-basic-1 labelInputText="Mode relance préféré" v-model="leadActivityType" :option-list="optionLabelListForActivityType"></input-select-basic-1> 

                                <!---input-text labelInputText="NIF" :valueInputText="leadNIF" :is_disabled="true"></input-text> 
                                <input-text labelInputText="STAT" :valueInputText="leadSTAT"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="RCS" :valueInputText="leadRCS"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="CIF" :valueInputText="leadCIF"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="N° identification" :valueInputText="leadIDNumber" :is_disabled="true"></input-text---> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche prospect----------------------->                         
                    <div id="risque">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('risk_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                    <span>Risque</span>
                                </a>
                                <a @click="expand('risk_content');onglet2_expanded=!onglet2_expanded" v-else>
                                    <span>Risque</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet2_expanded">Afficher plus</div>
                            <div class="column is-narrow py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'SM : '+leadSalesMode }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ 'CP : '+ leadPaymentTermsCode }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'MP : '+leadPaymentMethodCode }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadVATBusPostingGroup }}</span>
                            </div>
                        </div>
                        <div id="risk_content" class="columns">

                            
                            <div class="column">
                                <input-select labelInputText="Mode de vente" v-model="leadSalesMode"  @openModal="activeModalForSelectableElementList='salesModeList'"></input-select>

                                <input-select labelInputText="Conditions de paiement" v-model="leadPaymentTermsCode"  @openModal="activeModalForSelectableElementList='paymentTermList'"></input-select>

                                <input-number labelInputText="Limite de crédit" v-model="leadCreditLimit" ></input-number>  
                                
                                <input-select labelInputText="Mode de paiement" v-model="leadPaymentMethodCode"  @openModal="activeModalForSelectableElementList='paymentMethodList'"></input-select>
                                
                                <input-select labelInputText="Régime TVA" v-model="leadVATBusPostingGroup" @openModal="activeModalForSelectableElementList='vatGroupList'"></input-select>
                                
                                <input-text labelInputText="% Acompte exigé" :valueInputText="leadPrepayment" :is_disabled="true"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Niveau de risque" :valueInputText="leadRiskLevel" :is_disabled="true"></input-text> 
                                
                                <input-select labelInputText="Numéro contrat" v-model="leadContractNo"  @openModal="activeModalForSelectableElementList='contractList'"></input-select>

                                <!---input-text labelInputText="Note" :valueInputText="leadCardHeader['Score']" :is_disabled="true"></input-text----> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                </div>

            </div>
           
        </div>

        <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'" 
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-customer-list>

        <modal-for-selectable-contact-list 
            v-if="activeModalForSelectableElementList=='contactList'" 
            :isActive="activeModalForSelectableElementList=='contactList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-item-category-list 
            v-if="activeModalForSelectableElementList=='itemCategoryList'" 
            :isActive="activeModalForSelectableElementList=='itemCategoryList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableItemCategoryListModal="(elt)=>fillItemCategoryInfoField(elt)">
        </modal-for-selectable-item-category-list>

        <modal-for-selectable-sales-mode-list 
            v-if="activeModalForSelectableElementList=='salesModeList'" 
            :isActive="activeModalForSelectableElementList=='salesModeList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableSalesModeListModal="(elt)=>fillSalesModeInfoField(elt)">
        </modal-for-selectable-sales-mode-list>

        <modal-for-selectable-payment-term-list 
            v-if="activeModalForSelectableElementList=='paymentTermList'" 
            :isActive="activeModalForSelectableElementList=='paymentTermList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :salesMode="leadSalesMode"
            @onGettingLineFromSelectablePaymentTermListModal="(elt)=>fillPaymentTermInfoField(elt)">
        </modal-for-selectable-payment-term-list>

        <modal-for-selectable-payment-method-list 
            v-if="activeModalForSelectableElementList=='paymentMethodList'" 
            :isActive="activeModalForSelectableElementList=='paymentMethodList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectablePaymentMethodListModal="(elt)=>fillPaymentMethodInfoField(elt)">
        </modal-for-selectable-payment-method-list>

        <modal-for-selectable-contract-list 
            v-if="activeModalForSelectableElementList=='contractList'" 
            :isActive="activeModalForSelectableElementList=='contractList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="newLead" 
            @onGettingLineFromSelectableContractListModal="(elt)=>fillContractInfoField(elt)">
        </modal-for-selectable-contract-list>

        <modal-for-selectable-vat-bus-posting-group-list 
            v-if="activeModalForSelectableElementList=='vatGroupList'" 
            :isActive="activeModalForSelectableElementList=='vatGroupList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableVATGroupListModal="(elt)=>fillVATGroupInfoField(elt)">
        </modal-for-selectable-vat-bus-posting-group-list>

    </div>    
</template>
<script>
import leadCardHeader from './HeaderForCard.vue'
import leadCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputNumber from './input/input-number.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRouter } from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import ModalForSelectableContactList from './ModalForSelectableGlobalContactList.vue'
import ModalForSelectableContractList from './ModalForSelectableContractList.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableItemCategoryList from './ModalForSelectableItemCategoryList.vue'
import ModalForSelectableSalesModeList from './ModalForSelectableSalesModeList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectablePaymentTermList from './ModalForSelectablePaymentTermList.vue'
import ModalForSelectableVatBusPostingGroupList from './ModalForSelectableVATBUSPostingGroupList.vue'

export default {
    name:'new-lead',
    components:{
        leadCardHeader,leadCardRibbon,
        inputText,inputNumber,inputSelect,inputSelectBasic1,
        ModalForSelectableContactList,ModalForSelectableContractList,ModalForSelectableCustomerList,
        ModalForSelectableItemCategoryList,ModalForSelectableSalesModeList,ModalForSelectablePaymentMethodList,
        ModalForSelectablePaymentTermList, ModalForSelectableVatBusPostingGroupList
    },
    setup(){
        const router = useRouter()
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
            optionLabelListForLeadType : ref([]),
            optionLabelListForLegalStatus : ref([]),
            optionLabelListForIdentificationMode : ref([]),
            optionLabelListForActivityType : ref([]),
        }

        const leadSearchName = computed(() => {
            return leadCardHeaderInfo.leadName.value.toUpperCase()
        })

        const leadCardHeaderInfo = {
            leadName : ref(''),
            leadType : ref(0),
            leadLegalStatus : ref(0),
            leadIdentificationMode : ref(0),
            leadAddress : ref(''),
            leadAddress2 : ref(''),
            leadPostCode : ref(''),
            leadCity : ref(''),
            leadPhoneNo : ref(''),
            leadMobilePhoneNo : ref(''),
            leadEMail : ref(''),
            leadHomePage : ref(''),
            leadParentAccountNo : ref(''),
            leadItemCategory : ref(''),
            leadPrimaryContactNo : ref(''),
            leadActivityType : ref(0),
            leadSalesMode : ref(''),
            leadPaymentTermsCode : ref(''),
            leadCreditLimit : ref(0),
            leadPaymentMethodCode : ref(''),
            leadVATBusPostingGroup : ref(''),
            leadPrepayment : ref(0),
            leadRiskLevel : ref(''),
            leadContractNo : ref(''),
        }

        const leadCardRequirements = ref([])


        function getOptionLabelList(fieldToGetLabelList){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                if(fieldToGetLabelList=='[Lead Type]')
                    labelBag.optionLabelListForLeadType.value=result.data.recordset                    
                if (fieldToGetLabelList=='[Legal Status]')
                    labelBag.optionLabelListForLegalStatus.value=result.data.recordset
                if (fieldToGetLabelList=='[Identification Mode]')
                    labelBag.optionLabelListForIdentificationMode.value=result.data.recordset
                if (fieldToGetLabelList=='[Activity Type]')
                    labelBag.optionLabelListForActivityType.value=result.data.recordset
            }).catch(err=>console.log(err))
        }

        function getleadCardRequirementInfo(){
            axios.get(`http://${hostname}:3000/app/getLERList?leadId=''&accountType=0&customerType=${leadCardHeaderInfo.leadType.value}&legalStatus=${leadCardHeaderInfo.leadLegalStatus.value}&identificationMode=${leadCardHeaderInfo.leadIdentificationMode.value}`)
            .then(result => {
                leadCardRequirements.value = result.data
                getOptionLabelList('[Value Type]')
                getOptionLabelList('[Requirement]')
            }).catch(err=>console.log(err))
        }

        function getleadCardScoringInfo(){
            axios.get(`http://${hostname}:3000/app/getLESList?leadId=''&accountType=0&salesMode=${leadCardHeaderInfo.leadSalesMode.value}`)
            .then(result => {
                leadCardScoring.value = result.data
                getOptionLabelList('[Validity]')
            }).catch(err=>console.log(err))
        }


        //fonction pour remplir les champs avec des listes sélectionnables
        function fillContactInfoField(contact){
            leadCardHeaderInfo.leadPrimaryContactNo.value= contact['No_']
        }
        function fillCustomerInfoField(customer){
            leadCardHeaderInfo.leadParentAccountNo.value= customer['No_']
        }
        function fillItemCategoryInfoField(itemCategory){
            leadCardHeaderInfo.value['Item Category']= itemCategory['Code']
        }
        function fillSalesModeInfoField(salesMode){
            leadCardHeaderInfo.leadItemCategory.value= salesMode['Code']
        }
        function fillPaymentTermInfoField(paymentTerm){
            leadCardHeaderInfo.leadPaymentTermsCode.value= paymentTerm['Code']
            leadCardHeaderInfo.leadPrepayment.value= paymentTerm['Prepayment']
        }
        function fillPaymentMethodInfoField(paymentMethod){
            leadCardHeaderInfo.leadPaymentMethodCode.value= paymentMethod['Code']
        }
        function fillContractInfoField(contract){
            leadCardHeaderInfo.leadContractNo.value= contract['No_']
        }
        function fillVATGroupInfoField(VATGroup){
            leadCardHeaderInfo.leadVATBusPostingGroup.value= VATGroup['Code']
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
        function createLead(formattedleadData){
            axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedleadData)
            .then(res => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                error_message.value=''
                setTimeout(()=> router.push(`/LeadCard/${res.data.documentNo}`),5000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }

        //fonction pour soumettre la modifiaction de la fiche
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'leads_insert',
                webUserName:useWebUserInfoStore().name,
                'No_':'',
                'Name':leadCardHeaderInfo.leadName.value,
                'Search Name':leadSearchName.value,
                'Approval Status':0,
                'Lead Type':leadCardHeaderInfo.leadType.value,
                'Legal Status':leadCardHeaderInfo.leadLegalStatus.value,
                'Identification Mode':leadCardHeaderInfo.leadIdentificationMode.value,
                'Address':leadCardHeaderInfo.leadAddress.value,
                'Address 2':leadCardHeaderInfo.leadAddress2.value,
                'Post Code':leadCardHeaderInfo.leadPostCode.value, 
                'City':leadCardHeaderInfo.leadCity.value,
                'Phone No_':leadCardHeaderInfo.leadPhoneNo.value,
                'Mobile Phone No_':leadCardHeaderInfo.leadMobilePhoneNo.value,
                'E-Mail':leadCardHeaderInfo.leadEMail.value,
                'Home Page':leadCardHeaderInfo.leadHomePage.value,
                'Parent Account No_':leadCardHeaderInfo.leadParentAccountNo.value,
                'Item Category':leadCardHeaderInfo.leadItemCategory.value,
                'Primary Contact No_':leadCardHeaderInfo.leadPrimaryContactNo.value,
                'Activity Type':leadCardHeaderInfo.leadActivityType.value,
                'NIF':'',
                'STAT':'',
                'RCS':'',
                'CIF':'',
                'ID Number':'',
                'Sales Mode':leadCardHeaderInfo.leadSalesMode.value,
                'Payment Terms Code':leadCardHeaderInfo.leadPaymentTermsCode.value,
                'Credit limit (LCY)':leadCardHeaderInfo.leadCreditLimit.value,
                'Payment Method Code':leadCardHeaderInfo.leadPaymentMethodCode.value,
                'VAT Bus_ Posting Group':leadCardHeaderInfo.leadVATBusPostingGroup.value,
                'Prepayment _':leadCardHeaderInfo.leadPrepayment.value,
                'Risk Level':leadCardHeaderInfo.leadRiskLevel.value,
                'Contract No_':leadCardHeaderInfo.leadContractNo.value,
                'Score':0,
                CustomerRequirement:[],
                CustomerScoring:[]
            }
            createLead(formatToBCJsonData(JSData))
        }


        onBeforeMount(() => {
            if(useWebUserInfoStore().name==''){
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                })
                .catch(err=>console.log(err))
            }
        })

        onMounted(() => {
            getOptionLabelList('[Lead Type]')
            getOptionLabelList('[Legal Status]')
            getOptionLabelList('[Identification Mode]')
            getOptionLabelList('[Activity Type]')
        })





        return {
            ...leadCardHeaderInfo,...labelBag,leadSearchName,
            fillContactInfoField,fillContractInfoField,fillCustomerInfoField,fillItemCategoryInfoField,
            fillSalesModeInfoField,fillPaymentTermInfoField,fillPaymentMethodInfoField,fillVATGroupInfoField,
            submitForm,
            error_message,error_message_code,success_message,submitting_message,

        }

    },
    data(){
        return{
            //taille (hauteur) initiale des onglets de la page
            height:'700px',

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('sales')
            useNavigationTabStore().setActiveTab('prospects')
            this.$router.push('/')
        },
        expand(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight='700px'
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
            console.log(myElt.style.maxHeight)
            myElt.style.maxHeight="0px"
        }
    }

}

</script>
<style scoped>
#general_content,#risk_content{
    max-height: 700px;
    overflow: hidden;
    transition: max-height 0.5s
}


</style>