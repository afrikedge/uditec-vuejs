<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <repossession-request-card-header   :soNo="repossessionCardHeader['No_']" :soDesc="repossessionCardHeader['Motivation']" pageTitle="Fiche demande repossession" 
                @onGoingBackToList='goBackToList'/>
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <repossession-request-card-ribbon
            routeForNewCard="../NewRepossessionRequest"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="true"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="true"
            ></repossession-request-card-ribbon>


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
                                <span class="has-background-grey-lighter py-2 px-3">{{ repossessionCardHeader['Customer No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ repossessionCardHeader['Document No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ repossessionCardHeader['Item No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ repossessionCardHeader['Motivation'] }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° Client" :valueInputText="repossessionCardHeader['Customer No_']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Nom Client" :valueInputText="repossessionCardHeader['Customer Name']" :is_disabled="true"></input-text>
                                <!---input-text labelInputText="N° Contact" :valueInputText="repossessionCardHeader['Contact No_']" :is_disabled="true"></input-text---->
                                <input-text labelInputText="N° Document" :valueInputText="repossessionCardHeader['Document No_']" :is_disabled="true"></input-text>  
                                <input-text labelInputText="Référence Document" :valueInputText="repossessionCardHeader['Document Ref.']" :is_disabled="true"></input-text>  
                                <input-text labelInputText="Code Article" :valueInputText="repossessionCardHeader['Item No_']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Valeur Article" :valueInputText="repossessionCardHeader['Value']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Description Article" :valueInputText="repossessionCardHeader['Item Name']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Numéro Série" v-model="repossessionCardHeader['Serial No_']" :valueInputText="repossessionCardHeader['Serial No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Origine" :valueInputText="repossSourceLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select-basic-1 labelInputText="Origine" v-model="repossessionCardHeader['Reposs Source']" :option-list="optionLabelListForRepossSource" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Motif" v-model="repossessionCardHeader['Motivation']" :valueInputText="repossessionCardHeader['Motivation']"  :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Statut Acceptation" :valueInputText="repossStatusLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Statut Acceptation" v-model="repossessionCardHeader['Reposs Status']" :option-list="optionLabelListForRepossStatus" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Type" :valueInputText="repossTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type" v-model="repossessionCardHeader['Reposs Type']" :option-list="optionLabelListForRepossType" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Statut Article" :valueInputText="repossItemStatusLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Statut Article" v-model="repossessionCardHeader['Reposs Item Status']" :option-list="optionLabelListForRepossItemStatus" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Créé le" :valueInputText="formatDateHour(repossessionCardHeader['Created on'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Créé par" :valueInputText="repossessionCardHeader['Created by']" :is_disabled="true"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                </div>
<!---------composant info client----------------------->
                <customer-info class="customer-info"></customer-info>

            </div>
        </div>

    </div>    

</template>
<script>
import RepossessionRequestCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import RepossessionRequestCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { onBeforeMount, onMounted,ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'


export default {
    name:'repossession-request-card',
    components:{
        RepossessionRequestCardHeader,RepossessionRequestCardRibbon,CustomerInfo,
        inputText,inputSelectBasic1
    },
    setup(){
        const repossessionCardHeader = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const repossessionCardId = useRoute().params.id
        const router = useRouter()

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')

        //sac à label de notre fiche
        const labelBag = {
            repossSourceLabel:ref(''),
            repossStatusLabel:ref(''),
            repossTypeLabel:ref(''),
            repossItemStatusLabel:ref(''),
            optionLabelListForRepossSource : ref([]),
            optionLabelListForRepossStatus : ref([]),
            optionLabelListForRepossType : ref([]),
            optionLabelListForRepossItemStatus : ref([]),
        }

        function getOptionLabel(list,value,attribute){
            list.forEach(element => {
                if(element['Value']==value)
                labelBag[attribute].value = element['Description']
            });
        }

        function getOptionLabelList(field){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Reposs Source]')
                labelBag.optionLabelListForRepossSource.value=result.data.recordset
                    getOptionLabel(labelBag.optionLabelListForRepossSource.value,repossessionCardHeader.value['Reposs Source'],'repossSourceLabel')
                    
                if (field=='[Reposs Status]')
                labelBag.optionLabelListForRepossStatus.value=result.data.recordset
                    getOptionLabel(labelBag.optionLabelListForRepossStatus.value,repossessionCardHeader.value['Reposs Status'],'repossStatusLabel')

                if (field=='[Reposs Type]')
                labelBag.optionLabelListForRepossType.value=result.data.recordset
                    getOptionLabel(labelBag.optionLabelListForRepossType.value,repossessionCardHeader.value['Reposs Type'],'repossTypeLabel')

                if (field=='[Reposs Item Status]')
                labelBag.optionLabelListForRepossItemStatus.value=result.data.recordset
                    getOptionLabel(labelBag.optionLabelListForRepossItemStatus.value,repossessionCardHeader.value['Reposs Item Status'],'repossItemStatusLabel')
    
            }).catch(err=>console.log(err))
        }

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }

        function getRRCardInfo(){
            axios.get(`http://${hostname}:5000/app/getRepossessionRequestCard?repossessionRequestNo=${repossessionCardId}`)
            .then(result => {
                console.log(result)
                 repossessionCardHeader.value = result.data
                 getOptionLabelList('[Reposs Source]')
                getOptionLabelList('[Reposs Status]')
                getOptionLabelList('[Reposs Type]')
                getOptionLabelList('[Reposs Item Status]')
            }).catch(err=>console.log(err))
        }

        watch(success_message, () => {
            readOnlyModeIsDisabled.value=false
            getRRCardInfo()
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

        function updateRepossessionRequest(rrData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${webUserInfo.company.value}`,rrData)
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
                Parameter:'repossessionRequests_modify',
                webUserName:webUserInfo.name.value,
                'No_':repossessionCardHeader.value['No_'],
                'Customer No_':repossessionCardHeader.value['Customer No_'],
                'Document No_':repossessionCardHeader.value['Document No_'],
                'Item No_':repossessionCardHeader.value[ 'Item No_'],
                'Serial No_':repossessionCardHeader.value['Serial No_'],
                'Created on':repossessionCardHeader.value['Created on'],
                'Created by':repossessionCardHeader.value['Created by'],
                'Reposs Source':repossessionCardHeader.value['Reposs Source'],
                'Motivation':repossessionCardHeader.value['Motivation'],
                'Reposs Status':repossessionCardHeader.value['Reposs Status'], 
                'Reposs Type':repossessionCardHeader.value['Reposs Type'],
                'Reposs Item Status':repossessionCardHeader.value['Reposs Item Status'],
            }
            updateRepossessionRequest(formatToBCJsonData(JSData))
        }

        onBeforeMount(()=> {
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
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
                webUserInfo.name.value=useWebUserInfoStore().name
                webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
            }
            getRRCardInfo()
                
        })



        // expose to template and other options API hooks
        return {
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            submitForm,
            readOnlyModeIsDisabled,
            repossessionCardHeader,
            submitting_message,
            error_message,
            error_message_code,
            success_message,
            ...labelBag
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
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
        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        },
        formatDateHour(date){
            const dateString = new String(date)
            if (dateString.includes('1753')||dateString.includes('1900-') || date=='') return ''
            else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
        },
        expand(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight='1000px'
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
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
    max-height: 1000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>