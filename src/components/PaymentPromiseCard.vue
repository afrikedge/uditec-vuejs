<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête Fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="PromiseCard['No_']" :soDesc="PromiseCard['Description']" pageTitle="Fiche Promesse de règlement" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban Fiche Promesse de règlement----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :cancelEditCardBtnIsDisabled="true"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            ></Customer-card-ribbon>

<!---------Section formulaire Fiche Promesse de règlement----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

                    <!---------sous-Section ongle 1 formulaire Fiche Promesse de règlement----------------------->                         
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
                                <input-text labelInputText="N°" :valueInputText="PromiseCard['No_']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Objet" :valueInputText="PromiseCard['Subject']" :is_disabled="true"></input-text>
                                <input-text labelInputText="N° Client" :valueInputText="PromiseCard['Customer No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>  
                                <input-select labelInputText="N° Client" v-model="PromiseCard['Customer No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select>  
                                <input-text labelInputText="N° Contact" :valueInputText="PromiseCard['Contact No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled" ></input-text>
                                <input-select labelInputText="N° Contact" v-model="PromiseCard['Contact No_']" @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>
                                <input-text labelInputText="Description" v-model="PromiseCard['Description']" :valueInputText="PromiseCard['Description']" :is_disabled="!readOnlyModeIsDisabled" :is_readOnly="true"></input-text>
                                <input-text labelInputText="Crée le" :valueInputText="PromiseCard['Description']" :is_disabled="true"></input-text>
                                <input-select labelInputText="Crée le" :valueInputText="formatDate(PromiseCard['Created on'])" :is_disabled="readOnlyMode"></input-select>
                                <input-text labelInputText="Crée par" :valueInputText="PromiseCard['Created by']" :is_disabled="readOnlyModeIsDisabled" v-if="readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Crée par" :valueInputText="PromiseCard['Created by']" :is_disabled="readOnlyMode"></input-select>
                                <input-text labelInputText="Date promesse" :valueInputText="formatDate(PromiseCard['Promise Date'])" ></input-text>  
                                <input-select labelInputText="Date promesse" :valueInputText="formatDate(PromiseCard['Promise Date'])" :is_disabled="readOnlyMode"></input-select>   
                                <input-text labelInputText="Suivi par" :valueInputText="PromiseCard['Assigned to']" :is_disabled="readOnlyMode"></input-text> 
                                <input-select labelInputText="Suivi par" :valueInputText="PromiseCard['Assigned to']" :is_disabled="readOnlyMode"></input-select> 
                                <input-text labelInputText="Montant promis" :valueInputText="PromiseCard['Promised amount']" :is_disabled="readOnlyMode"></input-text> 
                                <input-select labelInputText="Montant promis" :valueInputText="PromiseCard['Promised amount']" :is_disabled="readOnlyMode"></input-select> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Montant honoré" :valueInputText="PromiseCard['Honored amount']" :is_disabled="readOnlyMode"></input-text> 
                                <input-select labelInputText="Montant honoré" :valueInputText="PromiseCard['Honored amount']" :is_disabled="readOnlyMode"></input-select> 
                                <input-text labelInputText="Activité d'origine" :valueInputText="PromiseCard['Originated activity']" :is_disabled="readOnlyMode"></input-text>
                                <input-select labelInputText="Activité d'origine" :valueInputText="PromiseCard['Originated activity']" :is_disabled="readOnlyMode"></input-select>

                                <input-text labelInputText="Type Activité de rappel" :valueInputText="PromiseCard['Reminding Activity']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type Activité de rappel"  :option-list="optionLabelListForActivityType" v-else></input-select-basic-1>
                               
                                <input-text labelInputText="Date rappel" :valueInputText="formatDate(PromiseCard['Riminding Date'])" :is_disabled="readOnlyMode" ></input-text>
                                <input-select labelInputText="Date rappel" :valueInputText="formatDate(PromiseCard['Riminding Date'])" :is_disabled="readOnlyMode" ></input-select>
                                <input-text labelInputText="Échéance rappel" :valueInputText="formatDate(PromiseCard['Reminding Due Date'])" :is_disabled="readOnlyMode"></input-text>
                                <input-select labelInputText="Échéance rappel" :valueInputText="formatDate(PromiseCard['Reminding Due Date'])" :is_disabled="readOnlyMode"></input-select>
                               
                                <input-text labelInputText="Statut" :valueInputText="PromiseCard['Status']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select-basic-1 labelInputText="Statut"  :option-list="optionLabelListForPromiseStatus" v-else></input-select-basic-1>  
                            </div>
                        </div>                    
                    </div>
                    <br><br>     
                    

                </div>
<!---------composant info Promesse de règlement----------------------->
                <customer-info class="customer-info"></customer-info>

            </div>
        </div>
        <!----------------------------------------------------------->
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
    :customerNo="PromiseCard['Customer No_']" 
    @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
    </modal-for-selectable-contact-list>

    </div>    

</template>
<script>
import CustomerCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import CustomerCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { onMounted,onBeforeMount,ref,watch } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRoute} from 'vue-router'

export default {
    name:'customer-card',
    components:{
        CustomerCardHeader,inputSelect,CustomerInfo,
        inputText,CustomerCardRibbon,ModalForSelectableCustomerList,
        ModalForSelectableContactList,inputSelectBasic1
    },
    setup(){
        const route = useRoute()
        const PromiseCard = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const readOnlyMode = ref(true)
        const hostname = window.location.hostname
        const promiseCardI = ref('')

        const optionLabelListForActivityType = ref([])
        const optionLabelListForPromiseStatus = ref([])
        
        //variable de success serveur
        let success_message=ref('')
        let is_convertSQ_success = ref(false)

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }

        function getPaymentPromiseCardInfo(){
            axios.get(`http://${hostname}:3000/app/getPPCard/${promiseCardI.value}`)
            .then(result => {
                console.log(result)
                PromiseCard.value = result.data
            }).catch(err=>console.log(err))
        }
        
        function getOptionLabelList(field){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Activity Type]')
                optionLabelListForActivityType.value=result.data.recordset
                if (field=='[Promise Status]')
                optionLabelListForPromiseStatus.value=result.data.recordset
    
                    console.log(result.data.recordset[0])
    
            }).catch(err=>console.log(err))
        }

        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

      function setReadWriteModeIsDisabled(){
          readOnlyModeIsDisabled.value=false
      }
      
      function fillCustomerInfoField(promise){
                 PromiseCard.value["No_"]=promise['No_']
                 PromiseCard.value["Name"]=promise['Name']
                 PromiseCard.value["Lead Status"]=promise['Lead Status']
                 PromiseCard.value["City"]=promise['City']
                 PromiseCard.value["Item Category"]=promise['Item Category']
        }

        function fillContactInfoField(promise){
            PromiseCard.value["Customer No_"]= promise['No_']
            }
        
        watch(success_message, () => {
            if (is_convertSQ_success.value==false){
                readOnlyModeIsDisabled.value=false
            }
        })

        
        onMounted(() => {
            if (webUserInfo.name.value){
                getPaymentPromiseCardInfo()
                getOptionLabelList('[Activity Type]')
                getOptionLabelList('[Promise Status]')
                
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getPaymentPromiseCardInfo()
                    getOptionLabelList('[Activity Type]')
                    getOptionLabelList('[Promise Status]')
                })
                .catch(err=>console.log(err))
            }
        })


        onBeforeMount(()=>{
            if(route.params.id){
                promiseCardI.value = route.params.id
              
            }
        })

        // expose to template and other options API hooks
        return {
            PromiseCard,
            readOnlyMode,
            readOnlyModeIsDisabled,
            success_message,
            is_convertSQ_success,
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            fillContactInfoField,
            fillCustomerInfoField,

            optionLabelListForActivityType,
            optionLabelListForPromiseStatus
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,


            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,

            
            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            //nom de l'hote dans l'url 
            hostname:window.location.hostname
        }
    },
    methods:{

        goBackToList(){
            useNavigationTabStore().setActiveTab('customer')
            this.$router.push('/CustomerList')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
     hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('customerCardRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('customerCardRightInfoMaxWidth','0px')
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
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getPPCard/${this.promiseCardId}`)
        .then(result => {
            
            this.PromiseCard = result.data.recordset[0]
        }).catch(err=>console.log(err))

    },
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#address_content,#invoicing_content,
#cash_content,#delivery_content,#risk_content,#requirement_content,#scoring_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>