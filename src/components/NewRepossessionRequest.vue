<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <r-r-card-Header :soNo="'Client N° : '+repossessionRequestCustomerNo" :soDesc="repossessionRequestDocumentNo" pageTitle="Demande repossession"
                @onGoingBackToList='goBackToList'
                ></r-r-card-Header>
            </div>
<!---------Composant rubban fiche client----------------------->      
            <r-r-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onSubmittingForm="submitForm"
            componentWithCompInfo="newrepossRightInfoMaxWidth"
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
                                <input-select v-model="repossessionRequestCustomerNo" labelInputText="N° Client" @openModal="activeModalForSelectableElementList='customerList'"></input-select>
                                
                                <input-select v-model="repossessionRequestDocumentNo" labelInputText="N° Document" @openModal="activeModalForSelectableElementList='invoiceList'"></input-select>
                                
                                <input-select v-model="repossessionRequestItemNo" labelInputText="Code Article" @openModal="activeModalForSelectableElementList='itemList'"></input-select>
                                
                                <input-text v-model="repossessionRequestSerialNo" labelInputText="Numéro Série"></input-text>
                            </div>
                            <div class="column">
                                <input-select-basic-1 v-model="repossessionRequestSource" labelInputText="Origine" :option-list="optionLabelListForRepossSource"></input-select-basic-1> 

                                <input-text v-model="repossessionRequestMotivation" labelInputText="Motif"></input-text>

                                <input-select-basic-1 v-model="repossessionRequestAcceptanceStatus" labelInputText="Statut Acceptation" :option-list="optionLabelListForRepossStatus"></input-select-basic-1> 

                                <input-select-basic-1 v-model="repossessionRequestType" labelInputText="Type" :option-list="optionLabelListForRepossType"></input-select-basic-1 > 

                                <input-select-basic-1 v-model="repossessionRequestItemStatus" labelInputText="Statut Article" :option-list="optionLabelListForRepossItemStatus"></input-select-basic-1> 
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

        <modal-for-selectable-item-list 
            v-if="activeModalForSelectableElementList=='itemList'" 
            :isActive="activeModalForSelectableElementList=='itemList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableItemListModal="(elt)=>fillItemInfoField(elt)">
        </modal-for-selectable-item-list>

        <modal-for-selectable-invoice-list 
            v-if="activeModalForSelectableElementList=='invoiceList'" 
            :isActive="activeModalForSelectableElementList=='invoiceList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableLocationListModal="(elt)=>fillIDocInfoField(elt)">
        </modal-for-selectable-invoice-list>




    </div>     
</template>
<script>
import RRCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import RRCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import { onMounted, ref } from 'vue'
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
        inputSelectBasic1,
        ModalForSelectableCustomerList,
        ModalForSelectableItemList
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

            //nom de l'hote dans l'url 
            const hostname = window.location.hostname;

            //variable de soumission forme
            let submitting_message=ref('') 

            //variable d'erreur serveur
            let error_message=ref('')
            let error_message_code =ref('')

            //variable de success serveur
            let success_message=ref('')

            const optionLabelListForRepossSource = ref([])
            const optionLabelListForRepossStatus = ref([])
            const optionLabelListForRepossType = ref([])
            const optionLabelListForRepossItemStatus = ref([])

            function getOptionLabelList(field){
                axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
                .then(result => {
                    if (field=='[Reposs Source]')
                        optionLabelListForRepossSource.value=result.data.recordset
                    if (field=='[Reposs Status]')
                        optionLabelListForRepossStatus.value=result.data.recordset
                    if (field=='[Reposs Type]')
                        optionLabelListForRepossType.value=result.data.recordset
                    if (field=='[Reposs Item Status]')
                        optionLabelListForRepossItemStatus.value=result.data.recordset

                        console.log(result.data.recordset)

                }).catch(err=>console.log(err))
            }

            onMounted(() =>{
                if(useWebUserInfoStore().defaultLanguage){
                    getOptionLabelList('[Reposs Source]')
                    getOptionLabelList('[Reposs Status]')
                    getOptionLabelList('[Reposs Type]')
                    getOptionLabelList('[Reposs Item Status]')
                }else{
                    axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                    .then(res=>{
                        useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                        getOptionLabelList('[Reposs Source]')
                        getOptionLabelList('[Reposs Status]')
                        getOptionLabelList('[Reposs Type]')
                        getOptionLabelList('[Reposs Item Status]')
                    })
                    .catch(err=>console.log(err))
                }


            })


            const repossessionRequestCardHeaderInfo = {
                repossessionRequestCustomerNo : ref(''),
                repossessionRequestDocumentNo : ref(''),
                repossessionRequestItemNo : ref(''),
                repossessionRequestSerialNo : ref(''),
                repossessionRequestSource : ref(0),
                repossessionRequestMotivation : ref(''),
                repossessionRequestAcceptanceStatus : ref(0),
                repossessionRequestType : ref(0),
                repossessionRequestItemStatus : ref(0),
            }






 /////////////FUNCTIONS//////////////////////////      

            function fillCustomerInfoField(customer){
                repossessionRequestCardHeaderInfo.repossessionRequestCustomerNo.value=customer['No_']
            }

            function fillItemInfoField(item){
                repossessionRequestCardHeaderInfo.repossessionRequestItemNo.value=item['No_']
            }

            function fillDocInfoField(doc){
                repossessionRequestCardHeaderInfo.repossessionRequestDocumentNo.value=doc['No_']
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

            function createRepossessionRequest(rrData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,rrData)
                .then(res => {
                    submitting_message.value=''
                    success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                    error_message.value=''
                    setTimeout(()=> router.push(`/repossessionRequestCard/${res.data.documentNo}`),5000)
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
                    Parameter:'repossessionRequests_insert',
                    webUserName:useWebUserInfoStore().name,
                    'No_':'',
                    'Customer No_': repossessionRequestCardHeaderInfo.repossessionRequestCustomerNo.value,
                    'Document No_': repossessionRequestCardHeaderInfo.repossessionRequestDocumentNo.value,
                    'Item No_':repossessionRequestCardHeaderInfo.repossessionRequestItemNo.value,
                    'Serial No_':repossessionRequestCardHeaderInfo.repossessionRequestSerialNo.value,
                    'Created on':new Date().toISOString,
                    'Created by':useWebUserInfoStore().name,
                    'Reposs Source':repossessionRequestCardHeaderInfo.repossessionRequestSource.value,
                    'Motivation':repossessionRequestCardHeaderInfo.repossessionRequestMotivation.value,
                    'Reposs Status':repossessionRequestCardHeaderInfo.repossessionRequestAcceptanceStatus.value,
                    'Reposs Type':repossessionRequestCardHeaderInfo.repossessionRequestType.value, 
                    'Reposs Item Status':repossessionRequestCardHeaderInfo.repossessionRequestItemNo.value,
                }
                createRepossessionRequest(formatToBCJsonData(JSData))
            }



        return{
            ...repossessionRequestCardHeaderInfo,
            fillCustomerInfoField,
            fillItemInfoField,
            fillDocInfoField,
            submitForm,
            error_message,
            error_message_code,
            success_message,
            submitting_message,


            optionLabelListForRepossSource,
            optionLabelListForRepossStatus,
            optionLabelListForRepossType,
            optionLabelListForRepossItemStatus
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('recovery')
            useNavigationTabStore().setActiveTab('repossessionRequests')
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