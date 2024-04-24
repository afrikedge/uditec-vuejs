<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="revisionCard['Revision No_']" :soDesc="revisionCard['Customer Name']"
                @onGoingBackToList='goBackToList'
                pageTitle="Fiche Demande revision" />
            </div>
            
<!---------Composant rubban fiche demande révision----------------------->      
            <Customer-card-ribbon
            routeForNewCard="../NewRevisionRequest"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
          
            ></Customer-card-ribbon>

<!---------Section formulaire fiche demande révision----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche demande révision----------------------->                         
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
                                <input-text labelInputText="N° Demande" :valueInputText="revisionCard['Revision No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Statut" :valueInputText="revisionCard['Approval Status']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code client" :valueInputText="revisionCard['Customer No_']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Nom du client" :valueInputText="revisionCard['Customer Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Mode de vente" :valueInputText="revisionCard['Sales Mode']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Conditions de paiement" :valueInputText="revisionCard['Payment Terms Code']" :is_disabled="readOnlyMode"></input-text>
                                
                                 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Limite de crédit" :valueInputText="revisionCard['Credit Limit (LCY)']" :is_disabled="readOnlyMode"></input-text>  
                                <input-text labelInputText="Mode de paiement" :valueInputText="revisionCard['Payment Method Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Régime TVA" :valueInputText="revisionCard['VAT Bus_ Posting Group']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="% Acompte exigé" :valueInputText="revisionCard['Prepayment _']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Niveau de risque" :valueInputText="revisionCard['Risk Level']" :is_disabled="readOnlyMode"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section ongle 2 formulaire fiche demande révision----------------------->
                    <div id="revision">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('revision_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                    <span>revision</span>
                                </a>
                                <a @click="expand('revision_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                    <span>revision</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="revision_content" class="columns">
                            <div class="column">
                               
                                <input-text labelInputText="Conditions de paiement (Proposé)" :valueInputText="revisionCard['[New Payment Terms Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Conditions de paiement (Proposé)" v-model="revisionCard['[New Payment Terms Code']" @openModal="activeModalForSelectableElementList='paymentTermList';" v-else></input-select>
                                
                                <input-text labelInputText="Limite de crédit (Proposé)" :valueInputText="revisionCard['New Credit limit (LCY)']" :is_disabled="!readOnlyModeIsDisabled"  :is_readOnly="true"></input-text>
                                
                                <input-text labelInputText="Mode de paiement (Proposé)" :valueInputText="revisionCard['[New Payment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de paiement (Proposé)" v-model="revisionCard['[New Payment Method Code']" @openModal="activeModalForSelectableElementList='paymentMethodList';" v-else></input-select>

                                <input-text labelInputText="Régime TVA (Proposé)" :valueInputText="revisionCard['New VAT Bus_ Posting Group']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Régime TVA (Proposé)" v-model="revisionCard['New VAT Bus_ Posting Group']" @openModal="activeModalForSelectableElementList='vatpostingList';" v-else></input-select> 
                                
                                <input-text labelInputText="% Acompte exigé (Proposé)" :valueInputText="revisionCard['New Prepayment _']" :is_disabled="!readOnlyModeIsDisabled"  :is_readOnly="true"></input-text>
                                
                            </div>
                            <div class="column">
                                <input-text labelInputText="Conditions de paiement (Validé)" :valueInputText="revisionCard['Approved Payment Terms Code']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Limite de crédit (Validé)" :valueInputText="revisionCard['Approved Credit limit (LCY)']" :is_disabled="readOnlyMode"></input-text>  
                                <input-text labelInputText="Mode de paiement (Validé)" :valueInputText="revisionCard['Approved Payment Method Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Régime TVA (Validé)" :valueInputText="revisionCard['Approved VAT Bus_ Posting Group']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="% Acompte exigé (Validé)" :valueInputText="revisionCard['Approved Prepayment _']" :is_disabled="readOnlyMode" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section ongle 3 formulaire fiche demande révision----------------------->
                    <div id="tracking" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet3_expanded}">
                            <div :class="{'columns':!onglet3_expanded,'p-3':onglet3_expanded,'has-border-bottom-grey':onglet3_expanded,'has-border-bottom':!onglet3_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('tracking_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                        <span>Suivi</span>
                                    </a>
                                    <a @click="expand('tracking_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                        <span>Suivi</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="tracking_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"></th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Approuvé le</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Approuvé par</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Approuvé en tant que</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut actuel</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut suivant </th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Commentaires</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of revisionTrackingInfo" :key="index" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                             <td class="has-text-left">{{elt['Approved On'] }}</td>
                                             <td class="has-text-left">{{elt['[Approved by'] }}</td>
                                             <td class="has-text-left">{{elt['Approved as'] }}</td>
                                             <td class="has-text-left">{{elt['Approval Status'] }}</td>
                                             <td class="has-text-left">{{elt['Next Status'] }} </td>
                                             <td class="has-text-left">{{elt['Comment'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>
<!---------sous-Section ongle 4 formulaire fiche demande révision----------------------->
                     <div id="history" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet4_expanded}">
                            <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet4_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('history_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                        <span>Historique</span>
                                    </a>
                                    <a @click="expand('history_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                        <span>Historique</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="history_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode vente</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Document </th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Paiement</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date paiement</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Jour(s) retard</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut échéance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of revisionHistoryInfo" :key="index">
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td class="has-text-left">{{elt['Sales Mode']}}</td>
                                            <td class="has-text-left">{{elt['Document No_'] }}</td>
                                            <td class="has-text-left">{{formatDate(elt['Posting Date'])}}</td>
                                            <td class="has-text-left">{{formatDate(elt['Due Date']) }}</td>
                                            <td class="has-text-left">{{elt['Amount (LCY)']}}</td>
                                            <td class="has-text-left">{{elt['Payment (LCY)'] }}</td>
                                            <td class="has-text-left">{{formatDate(elt['Payment Date'])}}</td>
                                            <td class="has-text-left">{{ elt['Days late'] }}</td>
                                            <td class="has-text-left">{{ elt['Debt Status'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>



                    
   
                </div>
<!---------composant info demande révision----------------------->
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
        <modal-for-selectable-payment-term-list 
            v-if="activeModalForSelectableElementList=='paymentTermList'" 
            :isActive="activeModalForSelectableElementList=='paymentTermList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectablePaymentMethodListModal="(elt)=>fillPaymentTermInfoField(elt)">
        </modal-for-selectable-payment-term-list>
        <modal-for-selectable-VATBUSPostingGroup-list 
            v-if="activeModalForSelectableElementList=='vatpostingList'" 
            :isActive="activeModalForSelectableElementList=='vatpostingList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectablePaymentMethodListModal="(elt)=>fillVatBusPostingGroupInfoField(elt)">
        </modal-for-selectable-VATBUSPostingGroup-list>

    </div>    

</template>
<script>
import CustomerCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import CustomerCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectablePaymentTermList from './ModalForSelectablePaymentTermList.vue'
import ModalForSelectableVATBUSPostingGroupList from './ModalForSelectableVATBUSPostingGroupList.vue'
import axios from 'axios'
import { onMounted,onBeforeMount,ref,watch } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRoute } from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'

export default {
    name:'customer-card',
    components:{
        CustomerCardHeader,CustomerInfo,
        inputText,
        CustomerCardRibbon,
        ModalForSelectableCustomerList,
        inputSelect,
        ModalForSelectablePaymentMethodList,
        ModalForSelectablePaymentTermList,
        ModalForSelectableVATBUSPostingGroupList
    },
    setup(){
        const revisionCard = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const readOnlyMode = ref(true)
        const revisionHistoryInfo = ref([])
        const revisionTrackingInfo = ref([])
        //nom de l'hote dans l'url 
        const hostname = window.location.hostname
        const route = useRoute()

        //indique la route active
        const revisiondocumentNo = ref('')
        
        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }
        
        //variable de success serveur
        let success_message=ref('')
        let is_convertSQ_success = ref(false)

          
        function getRevisionCardInfo(){
         
            axios.get(`http://${hostname}:3000/app/getRevisionRequestCard?documentNo=${revisiondocumentNo.value}`)
            .then(result => {
                
                revisionCard.value = result.data[0];
                getHistoryInfo();
                getTrackingInfo();
            }).catch(err=>console.log(err))
        }

        function getHistoryInfo(){
          axios.get(`http://localhost:3000/app/getCUHList?customerId=UDT00001`)
          .then(res =>{
                console.log(res);
              if (new Array(res.data[0]).length>=0){
                revisionHistoryInfo.value =  res.data
                
                  
              }
          })
          .catch((err) => {
              console.log(err)
          })
      }

      function getTrackingInfo(){
        axios.get(`http://localhost:3000/app/getApprovalFlow?documentNo==0001`)
        .then(res =>{
            console.log(res);
            if(new Array(res.data[0].length>=0)){
                revisionTrackingInfo.value = res.data
            }
        })
        .catch((err) => {
            console.log(err)
        })
      }


        function fillCustomerInfoField(customer){
            revisionCard.value["Sell-to Customer No_"]=customer["No_"]
            revisionCard.value["Sell-to Customer Name"]=customer["Name"]
            revisionCard.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
            revisionCard.value["Payment Method Code"]=customer['Payment Method Code']
            revisionCard.value["Payment Terms Code"]=customer['Payment Terms Code']
            revisionCard.value["Prepayment _"]=customer['Prepayment _']
            revisionCard.value["Shipment Method Code"]=customer['Shipment Method Code']
            revisionCard.value["Customer Posting Group"]=customer['Customer Posting Group']
            revisionCard.value["Gen_ Bus_ Posting Group"]=customer['Gen_ Bus_ Posting Group']
            revisionCard.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
            revisionCard.value["Customer Price Group"]=customer['Customer Price Group']
            revisionCard.value["Ship-to Code"]=customer['Ship-to Code']
            revisionCard.value["Sales Mode"]=customer['Sales Mode']
        }

        function fillPaymentMethodInfoField(paymentMethod){
            revisionCard.value["Payment Method Code"]=paymentMethod["Code"]
        }
        function fillPaymentTermInfoField(paymentTerm){
            revisionCard.value["New Payment Terms Code"]=paymentTerm["Code"]
        }
        function fillVatBusPostingGroupInfoField(vatPosting){
            revisionCard.value["New VAT Bus_ Posting Group"]=vatPosting["Code"]
        }
        
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

      function setReadWriteModeIsDisabled(){
          readOnlyModeIsDisabled.value=false
      }
      watch(success_message, () => {
            if (is_convertSQ_success.value==false){
                readOnlyModeIsDisabled.value=false
            }
        })

        onMounted(() => {
            if (webUserInfo.name.value){
                getRevisionCardInfo()
             
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getRevisionCardInfo()
                })
                .catch(err=>console.log(err))
            }
        })

        onBeforeMount(()=>{
            if(route.query.documentNo){
                revisiondocumentNo.value = route.query.documentNo
                
            }
        })

        // expose to template and other options API hooks
        return {
            revisionCard,
            readOnlyMode,
            readOnlyModeIsDisabled,
            revisionHistoryInfo,
            revisionTrackingInfo,
            setReadWriteModeIsDisabled,
            setReadOnlyModeIsDisabled,
            success_message,
            fillCustomerInfoField,
            fillPaymentMethodInfoField,
            fillPaymentTermInfoField,
            fillVatBusPostingGroupInfoField,
            getHistoryInfo,
            getTrackingInfo
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
            


            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:''
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveTab('customers')
            this.$router.push('/RevisionRequestList')
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
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else{ return ''}
        },
        expand(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight='500px'
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
            console.log(myElt.style.maxHeight)
            myElt.style.maxHeight="0px"
        },
       
    },
   
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#revision_content,#history_content,#tracking_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>