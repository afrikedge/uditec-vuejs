<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="groupbuyCardHeader['No_']" :soDesc="groupbuyCardHeader['Name']" pageTitle="Fiche contrat achat groupé" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban fiche activité recouvrement----------------------->      
            <Customer-card-ribbon
            routeForNewCard="../NewGoupBuyContract"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            componentWithCompInfo="newdebtRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="true"
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



<!---------Section formulaire fiche activité recouvrement----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche contrat achat groupé----------------------->                         
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
                                <input-text labelInputText="N° contrat" :valueInputText="groupbuyCardHeader['No_']" :is_disabled="true" ></input-text>
                                
                                <input-text labelInputText="Type de compte" :valueInputText="groupbuyCardHeader['Account Type']" :is_disabled="true" ></input-text>

                                <input-text labelInputText="N° Client" :valueInputText="groupbuyCardHeader['Customer No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="N° Client" v-model="groupbuyCardHeader['Customer No_']"  @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select>

                                <input-text labelInputText="Nom client" :valueInputText="groupbuyCardHeader['Name']" :is_disabled="true"></input-text> 

                                <input-text labelInputText="Date de début opération" :valueInputText="formatDate(groupbuyCardHeader['OP Starting Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-date labelInputText="Date de début opération" v-model="OpStartingDate" v-else :is_disabled="false"></input-date>

                               
                            </div>
                            <div class="column">
                                
                                <input-number labelInputText="Durée de l'opération (mois)" :valueInputText="groupbuyCardHeader['OP Duration (Month)']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-number>
                                <input-number labelInputText="Durée de l'opération (mois)" :valueInputText="groupbuyCardHeader['OP Duration (Month)']" v-else></input-number>

                                <input-date labelInputText="Date de fin opération" :valueInputText="formatDate(groupbuyCardHeader['OP Starting Date'])" :is_disabled="true"></input-date> 

                                <input-number labelInputText="Durée (mois)" :valueInputText="groupbuyCardHeader['Duration (Month)']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-number>
                                <input-number labelInputText="Durée (mois)" :valueInputText="groupbuyCardHeader['Duration (Month)']" v-else></input-number>

                                <input-text labelInputText="Type engagement" :valueInputText="groupbuyCardHeader['Commitment Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 v-model="repossessionRequestSource" labelInputText="Type engagement" :option-list="optionLabelListForCommitment" v-else></input-select-basic-1> 

                                <input-text labelInputText="Mode de règlement" :valueInputText="groupbuyCardHeader['Payment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de règlement" v-model="groupbuyCardHeader['Payment Method Code']" @openModal="activeModalForSelectableElementList='paymentMethodList'" v-else></input-select>

                                <input-text labelInputText="Statut" inputTextColor="has-text-primary" inputTextWeight="has-text-weight-bold" :valueInputText="groupbuyCardHeader['Status']==0?'Ouvert':groupbuyCardHeader['Status']==1?'Lancé':'Approbation en attente'" :is_disabled="true"></input-text>
                            
                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section ongle 2 formulaire fiche contrat achat groupé----------------------->  
                    <div id="employed">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('employed_content');onglet2_expanded = !onglet2_expanded;" v-if="onglet2_expanded">
                                    <span>Salariés</span>
                                </a>
                                <a @click="expand('employed_content');onglet2_expanded = !onglet2_expanded;" v-if="!onglet2_expanded">
                                    <span>Salariés</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="employed_content" class="columns mt-5">
                            <div v-if="buyEmployedInfo.length>=0">
                                <table class="table  is-narrow  is-fullwidth box">
                                    <thead class=" my-2">
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>N° client</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Nom Client</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Limite de crédit</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Encours</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Encours échue</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Statut actuel</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Pire Statut</b></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of buyEmployedInfo" :key="index"  >
                                            <td class="has-text-left">{{ elt['Customer No_'] }}</td>
                                            <td class="has-text-left">{{ elt['Customer Name'] }}</td>
                                            <td class="has-text-left">{{ elt['Credit limit (LCY)'] }}</td>
                                            <td class="has-text-left">{{ elt['Balance Amount (LCY)'] }}</td>
                                            <td class="has-text-left">{{ elt['Balance Due (LCY)'] }}</td>
                                            <td class="has-text-left">{{ elt['Current Status'] }}</td>
                                            <td class="has-text-left">{{ elt['Worst Status'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>
<!---------sous-Section ongle 3 formulaire fiche contrat achat groupé----------------------->  
                    <div id="historical">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('historical_content');onglet3_expanded = !onglet3_expanded;" v-if="onglet3_expanded">
                                    <span>Historique contrat</span>
                                </a>
                                <a @click="expand('historical_content');onglet3_expanded = !onglet3_expanded;" v-if="!onglet3_expanded">
                                    <span>Historique contrat</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="historical_content" class="columns mt-5">
                            <div v-if="buyHistoricalInfo.length>=0">
                                <table class="table  is-narrow  is-fullwidth box">
                                    <thead class=" my-2">
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>N° client</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Nom Client</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Mode vente</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>N° Document</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Date comptabilisation</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Date document</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Montant</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Paiement</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Date paiement</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Jour(s) retard</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Statut échéance</b></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of buyHistoricalInfo" :key="index"  >
                                            <td class="has-text-left">{{ elt['Customer No_'] }}</td>
                                            <td class="has-text-left">{{ elt['Customer Name'] }}</td>
                                            <td class="has-text-left">{{ elt['Sales Mode'] }}</td>
                                            <td class="has-text-left">{{ elt['Document No_'] }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Posting Date']) }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Due Date']) }}</td>
                                            <td class="has-text-left">{{ elt['Amount (LCY)'] }}</td>
                                            <td class="has-text-left">{{ elt['Payment (LCY)'] }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Payment Date']) }}</td>
                                            <td class="has-text-left">{{ elt['Days late'] }}</td>
                                            <td class="has-text-left">{{ elt['Debt Status'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>
<!---------sous-Section ongle 4 formulaire fiche contrat achat groupé----------------------->  
                    <div id="history">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('history_content');onglet4_expanded = !onglet4_expanded;" v-if="onglet4_expanded">
                                    <span>Historique client</span>
                                </a>
                                <a @click="expand('history_content');onglet4_expanded = !onglet4_expanded;" v-if="!onglet4_expanded">
                                    <span>Historique client</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="history_content" class="columns mt-5">
                            <div v-if="buyHistoryInfo.length>=0">
                                <table class="table  is-narrow  is-fullwidth box">
                                    <thead class=" my-2">
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Mode vente</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>N° Document</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Date comptabilisation</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Date document</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Montant</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Paiement</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Date paiement</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Jour(s) retard</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;"><b>Statut échéance</b></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of buyHistoryInfo" :key="index"  >
                                            <td class="has-text-left">{{ elt['Sales Mode'] }}</td>
                                            <td class="has-text-left">{{ elt['Document No_'] }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Posting Date']) }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Due Date']) }}</td>
                                            <td class="has-text-left">{{ elt['Amount (LCY)'] }}</td>
                                            <td class="has-text-left">{{ elt['Payment (LCY)'] }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Payment Date']) }}</td>
                                            <td class="has-text-left">{{ elt['Days late'] }}</td>
                                            <td class="has-text-left">{{ elt['Debt Status'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>

                </div>
<!---------composant info client----------------------->
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
        <modal-for-selectable-payment-method-list 
            v-if="activeModalForSelectableElementList=='paymentMethodList'" 
            :isActive="activeModalForSelectableElementList=='paymentMethodList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectablePaymentMethodListModal="(elt)=>fillPaymentMethodInfoField(elt)">
        </modal-for-selectable-payment-method-list>

    </div>    

</template>
<script>
import CustomerCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import CustomerCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputDate from './input/input-date.vue'
import inputNumber from './input/input-number.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import axios from 'axios'
import { onMounted,ref,onBeforeMount } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRoute} from 'vue-router'

export default {
    name:'groupbuycontract-card',
    components:{
        CustomerCardHeader,CustomerInfo,
        inputText,inputSelectBasic1,
        CustomerCardRibbon,inputSelect,
        inputDate,inputNumber,
        ModalForSelectablePaymentMethodList,
        ModalForSelectableCustomerList
    },
    setup(){
        const route = useRoute()
        const CreditContractNo = ref('')
        const groupbuyCardHeader = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        
        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')

        const buyEmployedInfo = ref([])
        const buyHistoricalInfo = ref([])
        const buyHistoryInfo = ref([])
        

        
        const optionLabelListForCommitment = ref([])
    


        const dateInfo = {
            OpStartingDate: ref(''),
            shipRequestedDate:ref(''),
            promisedDeliveryDate:ref('')
        }

        function getOptionLabelList(field){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Commitment Type]')
                optionLabelListForCommitment.value=result.data.recordset
    
                    console.log(result.data.recordset[0])
    
            }).catch(err=>console.log(err))
        }

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }
       
        // //indique la route active
        // let CreditCardContractNo = this.$route.query.contractNo

        function getcontractCardInfo(){
            axios.get(`http://${hostname}:3000/app/getCreditContractCard?contractNo=${CreditContractNo.value}`)
            .then(result => {
                groupbuyCardHeader.value = result.data[0]
                dateInfo.OpStartingDate.value = getISODate(groupbuyCardHeader.value["OP Starting Date"])
                getCustomerHistoryInfo()
            }).catch(err=>console.log(err))
        }

        
      function getCustomerHistoryInfo(){
          axios.get(`http://localhost:3000/app/getCustomerHistory?customerNo=UDT00001`)
          .then(res =>{
              if (new Array(res.data[0]).length>=0){
                buyHistoryInfo.value =  res.data
                buyHistoricalInfo.value =  res.data
                buyEmployedInfo.value =  res.data
                
                  
              }
          })
          .catch((err) => {
              console.log(err)
          })
      }

        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }

        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }
        function fillPaymentMethodInfoField(paymentMethod){
                groupbuyCardHeader.value["Payment Method Code"]=paymentMethod["Code"]
            }

        
            function fillCustomerInfoField(customer){
                groupbuyCardHeader.value["Sell-to Customer No_"]=customer["No_"]
                groupbuyCardHeader.value["Sell-to Customer Name"]=customer["Name"]
                groupbuyCardHeader.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
                groupbuyCardHeader.value["Payment Method Code"]=customer['Payment Method Code']
                groupbuyCardHeader.value["Payment Terms Code"]=customer['Payment Terms Code']
                groupbuyCardHeader.value["Prepayment _"]=customer['Prepayment _']
                groupbuyCardHeader.value["Shipment Method Code"]=customer['Shipment Method Code']
                groupbuyCardHeader.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
                groupbuyCardHeader.value["Customer Price Group"]=customer['Customer Price Group']
                groupbuyCardHeader.value["Ship-to Code"]=customer['Ship-to Code']
                groupbuyCardHeader.value["Sales Mode"]=customer['Sales Mode']
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

        function updateDebtCollection(rrData){
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
            return {data:JSONDataToSend}
        }

        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'debtcollection_modify',
                webUserName:webUserInfo.name.value,
                'No_':groupbuyCardHeader.value['No_'],
                'Customer No_':groupbuyCardHeader.value['Customer No_'],
                'Name':groupbuyCardHeader.value['Name'],
                'Subject':groupbuyCardHeader.value['Subject'],
                'Description':groupbuyCardHeader.value['Description'],
                'Created on':groupbuyCardHeader.value['Created on'],
                'Created by':groupbuyCardHeader.value['Created by'],
                'Scheduled Start Date':groupbuyCardHeader.value['Scheduled Start Date'],
                'Scheduled End Date':groupbuyCardHeader.value['Scheduled End Date'],
                'Actual Start Date':groupbuyCardHeader.value['Actual Start Date'], 
                'Actual End Date':groupbuyCardHeader.value['Actual End Date'],
                'Reminder Date':groupbuyCardHeader.value['Reminder Date'],
                'Linked Activity':groupbuyCardHeader.value['Linked Activity'],
                'Comment':groupbuyCardHeader.value['Comment'],
            }
            updateDebtCollection(formatToBCJsonData(JSData))
        }

        onMounted(() => {
            if (webUserInfo.name.value){
                getcontractCardInfo()
                getOptionLabelList('[Commitment Type]')
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getcontractCardInfo()
                    getOptionLabelList('[Commitment Type]')

                })
                .catch(err=>console.log(err))
            }
        })


        onBeforeMount(()=>{
            if(route.query.contractNo){
                CreditContractNo.value = route.query.contractNo
            }
        })
        // expose to template and other options API hooks
        return {
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            submitForm,
            fillPaymentMethodInfoField,
            readOnlyModeIsDisabled,
            groupbuyCardHeader,
            submitting_message,
            error_message,
            error_message_code,
            success_message,
            buyEmployedInfo,
            buyHistoricalInfo,
            buyHistoryInfo,
            fillCustomerInfoField,
            optionLabelListForCommitment,

            
            dateInfo,
            getISODate,
            getCustomerHistoryInfo,
            
        }
    },
    data(){
        return{
            //indique la route active
            CreditCardContractNo:this.$route.query.contractNo,
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded: true,
            onglet3_expanded: true,
            onglet4_expanded: true,

            
            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('recovery')
            useNavigationTabStore().setActiveTab('debtCollection')
            this.$router.push('/')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
     hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('newdebtRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newdebtRightInfoMaxWidth','0px')
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

#general_content,#employed_content,
#historical_content,#history_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>