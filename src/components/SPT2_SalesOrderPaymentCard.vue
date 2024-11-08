<template>
    <div class="has-background-white p-5" style="position:fixed;top:140px;bottom: 0px; width:auto;right:5%;left:5%;overflow: scroll;height: auto;">

        <!---------Composant message d'enregistrement en cours ou d'erreur ou de success----------------------->      
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
        <article v-if="success_posting" class="message is-primary shadow">
            <div class="message-header">
                    <span class="subtitle is-7 m-0 has-text-white"> 
                        <span class="icon ">
                            <i class="fas fa-spinner fa-pulse"></i>
                        </span>
                        {{ success_posting }}
                    </span>
                <button class="delete" aria-label="delete" @click="success_posting=''"></button>
            </div>
        </article>

        <div class="columns">
            <div class="column is-half">
                <input-text-addons :valueInputText1="saleOrderCustomerNo" :valueInputText2="saleOrderCustomerName" labelInputText="Client"></input-text-addons>
                <input-text-addons :valueInputText1="saleOrderCustomerContactCode" :valueInputText2="saleOrderCustomerContactName" labelInputText="Contact"></input-text-addons>
            </div>
            <div class="column">
                <input-select v-model="saleOrderNo" labelInputText="Commande" :is_disabled="false" @openModal="activeModalForSelectableElementList='saleOrderList'"></input-select>
            </div>
        </div>

        <div class="columns">
            <div class="column is-9">
                <div style="height: 200px; overflow-x: scroll;" class="mt-2 box">
                    <table class="table">
                        <thead class=" my-2">
                            <tr > 
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7 is-narrow"></th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7 is-narrow">N°</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7 is-narrow">Article</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7 is-narrow">Description</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7 is-narrow">Variant</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7 is-narrow">U.V</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7 is-narrow">Quantité</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7 is-narrow">P.U.</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7 is-narrow">Montant remise</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7 is-narrow">Montant HT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                <td class="has-text-left">
                                    <span class="icon">
                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                    </span>
                                </td>
                                <td class="has-text-left py-1 px-2 is-narrow" >{{ Number.isInteger(elt['Line No_']/10000)?elt['Line No_']/10000:elt['Line No_'] }}</td>
                                <td class="has-text-left py-1 px-2 is-narrow" >{{ elt['No_'] }}</td>
                                <td class="has-text-left py-1 px-2 is-narrow"> {{ elt['Description'] }}</td>
                                <td class="has-text-left py-1 px-2 is-narrow"> {{ elt['Variant Code'] }}</td>
                                <td class="has-text-left py-1 px-2 is-narrow" >{{ elt['Unit of Measure'] }}</td>
                                <td class="has-text-right py-1 px-2" >{{ elt['Quantity'] }}</td>
                                <td class="has-text-right py-1 px-2" >{{ formatAmount(elt['Unit Price']) }}</td>
                                <td class="has-text-right py-1 px-2" >{{ formatAmount(elt['Line Discount Amount']) }}</td>
                                <td class="has-text-right py-1 px-2 is-narrow" >{{ formatAmount(elt['Line Amount']) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="columns ">
                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(saleOrderTotalAmount)" labelInputText="Total"></input-text1>
                    </div>
                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalDiscount)" labelInputText="Remise"></input-text1>
                    </div>
                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(saleOrderTotalVAT)" labelInputText="TVA"></input-text1>
                    </div>
                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(saleOrderTotalNetToPay)" labelInputText="Net à payer"></input-text1>
                    </div>
                </div>

                <div class="mr-1 shadow ">
                    <table class="table is-narrow  is-fullwidth is-bordered ">
                        <thead class=" my-2">
                            <tr > 
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Mode</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Approbartion requise</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Référence requise</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width:200px">Montant</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7">Référence</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7">Montant Valideé</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :id="index" v-for="(elt,index) of saleOrderPaymentLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                <td class="has-text-left py-0 px-2 "> 
                                    {{ elt['Payment Method Code'] }}
                                </td>
                                <td class="has-text-centered py-0 px-2"> 
                                    <div class="field">
                                        <input  :id="index +'switchThinColorDanger'" type="checkbox" name="switchThinColorDanger" class="switch is-thin is-danger" :checked="elt['Approval required']">
                                        <label></label>
                                    </div>
                                </td>
                                <td class="has-text-centered py-0 px-2">
                                    <div class="field">
                                        <input :id="index +'switchThinColorDanger'" type="checkbox" name="switchThinColorDanger" class="switch is-thin is-danger" :checked="elt['Reference required']" >
                                        <label ></label>
                                    </div> 
                                </td>
                                
                                <td class="has-text-right py-0 px-2">
                                    <div :id="index+'*'+elt['Amount (LCY)']+'*Amount (LCY)'" class="editme p-1" :contenteditable="true" v-text="elt['Amount (LCY)']" @blur="onEdit" @keydown.enter="endEdit"></div> 
                                </td>

                                <td class="has-text-left py-1 px-2" >
                                    <div :id="index+'*'+elt['Reference']+'*Reference'" class="editme p-1" :contenteditable="true" v-text="elt['Reference']" @blur="onEdit" @keydown.enter="endEdit"></div> 
                                </td>
                                <td class="has-text-right py-0 px-2" >
                                    {{ formatAmount(elt['Accepted Amount (LCY)']) }}    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="columns mt-2">
                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalAmountEntered)" labelInputText="Total saisi"></input-text1>
                    </div>
                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalAmountValidated)" labelInputText="Total validé"></input-text1>
                    </div>
                    <div class="column">
                        <input-text1 :is_disabled="totalAmountValidated==0 || totalAmountValidated<saleOrderTotalNetToPay" v-model="totalAmountCashed" labelInputText="Montant encaissé"></input-text1>
                    </div>
                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalAmountToReturn)" labelInputText="A rendre"></input-text1>
                    </div>
                </div>
                

            </div>
            <div class="column is-3">
                <button 
                :class="{'button':true, 'is-loading':submitting_message!=='','is-fullwidth':true,'is-dark':true,'py-5':true,'mt-1':true}"
                :disabled="submitting_message!==''"
                @click.prevent="submitForm" style="min-height:90px">
                    <span class="subtitle is-5 has-text-white" v-if="submitting_message==''">Enregistrer</span>
                    <span class="subtitle is-6 has-text-white" v-else>{{ submitting_message }}</span>
                </button>

                <button 
                :class="{'button':true, 'is-loading':posting_message!=='','is-fullwidth':true,'is-dark':true,'py-5':true,'mt-1':true}"
                :disabled="posting_message!==''" @click.prevent="controlRefBeforePostingPayment" style="min-height:90px">
                    <span class="subtitle is-5 has-text-white" v-if="posting_message==''">Valider</span>
                    <span class="subtitle is-6 has-text-white" v-else>{{ posting_message }}</span>
                </button>

                <button 
                :class="{'button':true, 'is-loading':requesting_message!=='','is-fullwidth':true,'is-dark':true,'py-5':true,'mt-1':true}"
                :disabled="requesting_message!==''" @click.prevent="controlBeforeSubmittingPaymentRequest" style="min-height:90px">
                    <span class="subtitle is-5 has-text-white" v-if="requesting_message==''">Demander validation</span>
                    <span class="subtitle is-6 has-text-white" v-else>{{ requesting_message }}</span>
                </button>

                <button class="button is-fullwidth is-dark py-5 mt-1" style="min-height:90px" @click="goToSalesOrderCard">
                    <span class="subtitle is-5 has-text-white">Nouvelle commande</span>
                </button>

                <button class="button is-fullwidth is-dark py-5 mt-1" style="min-height:90px"  @click.prevent="printReceipt">
                    <span class="subtitle is-5 has-text-white">Imprimer reçu</span>
                </button>
            </div>
        </div>

        <div ref="content"  class="" v-if="true">
            <printable-s-p-t-2-order-layout 
                id="element-to-convert" 
                :itemList="saleOrderCardLines" 
                :paymentList="saleOrderPaymentLines" 
                :VATAmount="saleOrderTotalVAT"
                :amountIncVAT="saleOrderTotalNetToPay"
                :receivedAmount="totalAmountCashed"
                :returnedAmount="totalAmountToReturn"
                :customerName="saleOrderCustomerContactName"
                :documentNo="saleOrderNo">
            </printable-s-p-t-2-order-layout>
        </div>

        
    </div>
    <modal-for-selectable-sale-order-list
        v-if="activeModalForSelectableElementList=='saleOrderList'"  
        :isActive="activeModalForSelectableElementList=='saleOrderList'" 
        @closeModal="activeModalForSelectableElementList=''" 
        @onGettingLineFromSelectableSOListModal="(elt)=>fillSOHeaderInfoField(elt)">
    </modal-for-selectable-sale-order-list>
</template>
<script>
import inputSelect from './input/input-select.vue'
import inputText1 from './input/input-text1.vue'
import inputTextAddons from './input/input-text-addons.vue'
import {  computed, onMounted, ref, watch } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useSPT2NavigationTabStore } from '@/Stores/SPT2_NavigationTab'
import  axios  from 'axios'
import ModalForSelectableSaleOrderList from './ModalForSelectableSaleOrderList.vue'
import { useRouter } from 'vue-router'
import PrintableSPT2OrderLayout from './PrintableSPT2OrderLayout.vue'
import jsPDF from 'jspdf'; 
//import html2canvas from "html2canvas";


export default {
    name:'spt2-sale-orde-payment',
    components:{
        inputTextAddons,
        inputText1,
        inputSelect,
        ModalForSelectableSaleOrderList,
        PrintableSPT2OrderLayout
    },
    setup(){
        const activeModalForSelectableElementList =ref('')
        const hostname = window.location.hostname;
        //const route = useRoute()
        const submitting_message=ref('') 
        const posting_message=ref('') 
        const error_message=ref('')
        const error_message_code =ref('')
        const success_message=ref('')
        const success_posting=ref('')
        const requesting_message=ref('')
        const router = useRouter()
        let webUserInfo = {
            ...useWebUserInfoStore().getWebUser
        }

        //objet contenant les infos en entête de la commande(masquées/affichées)
        const saleOrderCardHeaderInfo = {
            saleOrderNo: ref(''),
            saleOrderCustomerNo : ref(''),
            saleOrderCustomerName : ref(''),
            saleOrderCustomerContactCode : ref(''),
            saleOrderCustomerContactName : ref(''),
            saleOrderTotalAmount : ref(0),
            saleOrderTotalDiscount : ref(0),
            saleOrderTotalVAT : ref(0),
            saleOrderTotalNetToPay : ref(0),
        }

        //tableaux contant les articles de la commande à payer
        const saleOrderCardLines =  ref([])

        //tableaux contant les methode de paiement et montant à payer à enregistrer
        const saleOrderPaymentLines = ref([])
        

        //tableaux contenant tous les methode de paiement et leurs infos
        const saleOrderPaymentMethodList = ref([])


        //Fonctions pour récupérer le nom du contact
        function getContactName(contactNo){
            axios.get(`http://${hostname}:5000/app/getContactCard/${contactNo}`)
            .then((result) => {
                saleOrderCardHeaderInfo.saleOrderCustomerContactName.value = result.data.recordset[0]['Name']
            })
            .catch((err) => console.error(err));
        }

//Propriétés calculés pour les totaux des lignes
        const totalDiscount = computed(() => {
            let sum = 0
            saleOrderCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + elt['Line Discount Amount']
            })
            return sum
        })

        const totalAmountEntered = computed(() => {
            let sum = 0
            saleOrderPaymentLines.value.forEach(elt =>{
                sum = sum + elt['Amount (LCY)']
            })
            return sum
        })

        const totalAmountCashed = ref(0)

        const totalAmountValidated = computed(() => {
            let sum = 0
            saleOrderPaymentLines.value.forEach(elt =>{
                sum = sum + elt['Accepted Amount (LCY)']
            })
            return sum
        })

        const totalAmountToReturn = computed(() => {
            return Math.abs(totalAmountCashed.value - totalAmountValidated.value)
        })


        //fonctions pour remplir les champs avec via des listes sélectionnables
        function fillSOHeaderInfoField(so){
            saleOrderCardHeaderInfo.saleOrderNo.value=so['No_']
            saleOrderCardHeaderInfo.saleOrderCustomerNo.value=so['Sell-to Customer No_']
            saleOrderCardHeaderInfo.saleOrderCustomerName.value=so['Sell-to Customer Name']
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=so['Sell-to Contact No_']
            saleOrderCardHeaderInfo.saleOrderTotalAmount.value=so['Total Amount']
            saleOrderCardHeaderInfo.saleOrderTotalVAT.value=so['Total VAT']
            saleOrderCardHeaderInfo.saleOrderTotalNetToPay.value=so['Total Amount Including VAT']
        }


//Fonctions de controle
        function controlBeforeSubmittingPaymentRequest(){
            let documentNeedToBeValidated = false
            requesting_message.value="Envoie de la demande en cours"
            saleOrderPaymentLines.value.forEach(x => {
                if(x['Approval required']==true && x['Amount (LCY)'] >0){
                    if( x['Accepted Amount (LCY)']!==x['Amount (LCY)']){
                        return documentNeedToBeValidated= true
                    }else{
                        return -1
                    }
                }else{
                    return -1
                }
            })
            if(documentNeedToBeValidated)
                submitPaymentRequest()
            else
                error_message.value = "Il n'y-a rien à valider"
                requesting_message.value=''
        }
        function controlRefBeforePostingPayment(){
            let referenceNeedToBeInserted = false
            posting_message.value='Comptabilisation du paiement en cours'
            saleOrderPaymentLines.value.forEach(x => {
                if(x['Amount (LCY)'] > 0 && x['Reference required']==true && x['Reference'] ==''){
                        return referenceNeedToBeInserted= true
                }else{
                    return -1
                }
            })
            if(referenceNeedToBeInserted==false)
                controlVoucherBeforePostingPayment()
            else
                error_message.value = "Une référence de paiement est requise!"
                posting_message.value=''
        }
        function controlVoucherBeforePostingPayment(){
            let voucherLine
            saleOrderPaymentLines.value.forEach(row => {
                if(row['Payment Method Code']=='VOUCHER')
                    voucherLine = row
            })
            if(voucherLine['Amount (LCY)'] > 0){
                axios.get(`http://${hostname}:5000/app/controlVoucher?voucherRef=${voucherLine['Reference']}&amount=${Number(voucherLine['Amount (LCY)'])}&languageId=${useWebUserInfoStore().defaultLanguage}`)
                .then(res => {
                    if(res.data[0].Value < 0){
                        error_message.value=res.data[0].Label
                        error_message_code.value=res.data[0].Value
                        posting_message.value=''
                    }else{
                        controlAmountBeforePostingPayment()
                    }
                })
                .catch((err) => {
                    displayErrorMessage(err)
                })
            }else{
                controlAmountBeforePostingPayment()
            }
        }
        function controlAmountBeforePostingPayment(){
            if(saleOrderCardHeaderInfo.saleOrderTotalNetToPay.value <= totalAmountValidated.value){
                if(totalAmountCashed.value>0 && totalAmountCashed.value >= totalAmountValidated.value){
                    postPayment()
                }else{
                    error_message.value = "Le montant total encaissé doit être renseigné!"
                    posting_message.value=''
                }
            }else{
                error_message.value = "Le montant validé doit être supérieur ou égale au montant de la commande!"
                posting_message.value=''
            }
        }





//fonctions pour soumettre une demande de paiement
        function sendPaymentRequest(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(() =>{
                requesting_message.value=''
                success_message.value="demande de paiement envoyée"
                error_message.value=''
                setTimeout(()=>success_message.value='',3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitPaymentRequest(){
                const JSData ={
                    Parameter:'paymentRequest_insert',
                    webUserName:useWebUserInfoStore().name,
                    //OrderNo:saleOrderNo.value,
                    'No_':saleOrderCardHeaderInfo.saleOrderNo.value,
                    'Approval Status':6,
                    'Request Type':3,
                }
                sendPaymentRequest(formatToBCJsonData(JSData))
        }



        //Fonctions pour charger les lignes d'articles de notre commande
        function getSaleOrderCardLine(){
            axios.get(`http://${hostname}:5000/app/getSOCard/${saleOrderCardHeaderInfo.saleOrderNo.value}?respCenter=${webUserInfo.responsibilityCenter}`)
            .then(result => {
                console.log(result)
                const saleOrderCardHeader = result.data[0]
                //console.log(result.data[0])
                saleOrderCardLines.value = result.data[1]

                saleOrderCardHeaderInfo.saleOrderTotalAmount.value = saleOrderCardHeader['Total Amount']
                saleOrderCardHeaderInfo.saleOrderTotalNetToPay.value = saleOrderCardHeader['Total Amount Including VAT']
                saleOrderCardHeaderInfo.saleOrderTotalVAT.value = saleOrderCardHeader['Total VAT']
                // console.log(saleOrderCardHeader)
            }).catch(err=>console.log(err))
        }

        //Fonctions pour charger les lignes de paiement de notre commande
        function getSaleOrderPaymentLine(){
            axios.get(`http://${hostname}:5000/app/getSaleOrderPaymentLine/${saleOrderCardHeaderInfo.saleOrderNo.value}`)
            .then(result =>{
                    const data = ref([])
                    data.value = result.data.recordset
                    if (data.value.length==0){
                        getPaymentMethodList()
                    }else{
                        data.value.map(elt => {
                            elt['Approval required']=elt['Approval required']==1?true:false
                            elt['Reference required']=elt['Reference required']==1?true:false
                        })
                        saleOrderPaymentLines.value = data.value
                    }

                    

            }).catch(err=>console.log(err))
        }

        //Fonctions pour charger les methodes de paiement
        function getPaymentMethodList(){
            axios.get(`http://${hostname}:5000/app/getPaymentMethodList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result =>{
                saleOrderPaymentLines.value = []
                saleOrderPaymentMethodList.value = result.data.recordset
                saleOrderPaymentMethodList.value.forEach((element)=>{
                    saleOrderPaymentLines.value.push({
                        'Document Type':1,
                        'Document No_':saleOrderCardHeaderInfo.saleOrderNo.value,
                        'Payment Method Code':element['Code'],
                        'Approval required':element['Approval required'],
                        'Reference required':element['Reference required'],
                        Reference:'',
                        'Amount (LCY)':0,
                        'Accepted Amount (LCY)':0
                    })
                })
                saleOrderPaymentLines.value.map(elt => {
                    elt['Approval required']=elt['Approval required']==1?true:false
                    elt['Reference required']=elt['Reference required']==1?true:false
                })
    
            }).catch(err=>console.log(err))
        }

//fonctions de controle avant soumission 


//fonctions pour mettre à jour le document et le valider
        function updatesaleOrderPayment(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(() => {
                submitting_message.value=''
                posting_message.value=''
                requesting_message.value=''
                success_message.value='Enregistrement réussi'
                error_message.value=''
                setTimeout(()=>success_message.value='',3000)
                setTimeout(()=> success_posting.value='',3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }   
        function updateSOPaymentAfterPosting(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(() => {
                submitting_message.value=''
                posting_message.value=''
                requesting_message.value=''
                error_message.value=''
                success_posting.value='La commande a été comptabilisée avec succès!'
                setTimeout(()=> printReceipt(),2000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }   

        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData ={
                Parameter:'orders_payment_save',
                OrderNo:saleOrderCardHeaderInfo.saleOrderNo.value,
                saleOrderPaymentLines:[
                    ...saleOrderPaymentLines.value
                ]
            }
            updatesaleOrderPayment(formatToBCJsonData(JSData))
        }
        function postPayment(){
            posting_message.value='Comptabilisation du paiement en cours'
            const JSData = {
                Parameter:'orders_payment_validate',
                OrderNo:saleOrderCardHeaderInfo.saleOrderNo.value
            }
            updateSOPaymentAfterPosting(formatToBCJsonData(JSData))
        }

        //fonction pour aller à l'onglet de création commande
        function goToSalesOrderCard(){
            useSPT2NavigationTabStore().setActiveTab('saleOrder')
        }

        //fonction pour imprimer un ticket de caisse
        function printReceipt(){
            const docPDF = new jsPDF();
            var elementHTML = document.getElementById("element-to-convert");
            docPDF.html(elementHTML, {
                callback: function(docPDF) {
                    let totalPages = docPDF.internal.getNumberOfPages()
                    for (var i = 2; i <= totalPages; i++) {
                        docPDF.setPage(i);
                        docPDF.deletePage(i);
                        i--;
                        totalPages--;
                    }
                    docPDF.autoPrint()
                    docPDF.output('dataurlnewwindow').print
                    docPDF.save(saleOrderCardHeaderInfo.saleOrderNo.value?saleOrderCardHeaderInfo.saleOrderNo.value:'NoName'+'.pdf');
                    setTimeout(()=> goToSalesOrderCard(),3000)
                },
                x:-3,
                y:0,
                orientation:'p',
                width:70,
                windowWidth:300,
            });

            // const doc = new jsPDF('p', 'px')
            // html2canvas(document.getElementById('element-to-convert'), {
            //     scale:1,
            // }).then((canvas) => {
            //     const img = canvas.toDataURL("image/jpeg");
            //     doc.addImage(img, "jpeg", -10, -10);
            //     doc.autoPrint()
            //     doc.output('dataurlnewwindow').print
            // })
        }


//fonctions de formattage
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }
        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
            }else{
                return 0
            }
        }


//Gestions des évènements et déclencheurs et erreurs
        onMounted(()=>{
            if(useSPT2NavigationTabStore().activeSalesOrder){
                saleOrderCardHeaderInfo.saleOrderNo.value = useSPT2NavigationTabStore().activeSalesOrder
            }
            if(useSPT2NavigationTabStore().activeCustomerCode){
                saleOrderCardHeaderInfo.saleOrderCustomerNo.value = useSPT2NavigationTabStore().activeCustomerCode
            }
            if(useSPT2NavigationTabStore().activeCustomerName){
                saleOrderCardHeaderInfo.saleOrderCustomerName.value = useSPT2NavigationTabStore().activeCustomerName
            }
            if(useSPT2NavigationTabStore().activeContactCode){
                saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value = useSPT2NavigationTabStore().activeContactCode
            }
            if(useSPT2NavigationTabStore().activeContactName){
                saleOrderCardHeaderInfo.saleOrderCustomerContactName.value = useSPT2NavigationTabStore().activeContactName
            }
            if(webUserInfo.responsibilityCenter){
                getPaymentMethodList()
            }
            else{
                let userData = window.localStorage.getItem("userData");
                if(!userData){
                    router.push('/SP2000/login')
                }else{
                    let userDataObjet = JSON.parse(userData)
                    useWebUserInfoStore().fillWebUserInfo(userDataObjet)
                    getPaymentMethodList()
                }
            }
        })
        watch(saleOrderCardHeaderInfo.saleOrderNo, () => {
            getSaleOrderCardLine()
            getSaleOrderPaymentLine()
        })
        watch(saleOrderCardHeaderInfo.saleOrderCustomerContactCode, () => {
            if(saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value)
                getContactName(saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value)
        })
        function displayErrorMessage(errorObject){
            if(errorObject.response && errorObject.response.status){
                switch (errorObject.response.status){
                    case 401: 
                        submitting_message.value=''
                        requesting_message.value=''
                        posting_message.value=''
                        error_message.value= errorObject.response.data;break;
                    case 400:
                        submitting_message.value='' 
                        posting_message.value=''
                        requesting_message.value=''
                        error_message.value= errorObject.response.data
                        error_message_code.value= errorObject.code;break;
                    case 404:
                        submitting_message.value=''
                        posting_message.value=''
                        requesting_message.value=''
                        error_message.value=errorObject.response.data.error.message
                        error_message_code.value= errorObject.response.data.error.code;break;
                    default:
                        submitting_message.value=''
                        posting_message.value=''
                        requesting_message.value=''
                        error_message.value=errorObject.response
                }
            }
            else{
                error_message.value = errorObject.message
                error_message_code.value = errorObject.code
                submitting_message.value=''
                requesting_message.value=''
                posting_message.value=''
            }
        }


       

        

        return {
            activeModalForSelectableElementList,
            ...saleOrderCardHeaderInfo,saleOrderCardHeaderInfo,
            saleOrderCardLines,
            saleOrderPaymentLines,
            saleOrderPaymentMethodList,
            webUserInfo,
            fillSOHeaderInfoField,
            submitForm,
            error_message,
            error_message_code,
            success_message,
            submitting_message,requesting_message,
            success_posting,
            posting_message,
            postPayment,
            submitPaymentRequest,
            totalDiscount,
            totalAmountEntered,totalAmountValidated,totalAmountToReturn,totalAmountCashed,
            controlBeforeSubmittingPaymentRequest,controlRefBeforePostingPayment,
            goToSalesOrderCard,
            controlVoucherBeforePostingPayment,
            printReceipt,
            formatAmount,

        }
    },
    methods:{
        printReceipt1() {
            // const doc = new jsPDF({
            //     orientation: 'p',
            //     unit: 'px',
            //     format: 'a6',
            //     hotfixes: ['px_scaling'],
            // });

            // html2canvas(document.getElementById('element-to-convert'), {
            //     width: 3100,
            //     height: 3000
            // }).then((canvas) => {
            //     const img = canvas.toDataURL("image/jpeg");
            //     doc.addImage(img, "jpeg", 10, 10, 3100, 3000);
            //     //doc.save("p&lstatement.pdf")
            //     doc.autoPrint();
            //     //window.open(doc.output('dataurlnewwindow')).print
            //     doc.output('dataurlnewwindow').print
            // })


        },
        setLineShadow(id){
            const myElt=document.getElementById(id)
            const children =  myElt.childNodes
            children.forEach(element => {
                element.classList.add('has-background-light')
                element.classList.add('is-hover-orange')
                element.classList.add('is-hover-orange')
            })
            //console.log(children)

        },
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            const children =  myElt.childNodes
            children.forEach(element => {
                element.classList.remove('is-hover-orange')
                element.classList.remove('has-background-light')
                element.classList.remove('remove')
                element.classList.add('has-background-white')
            })
            //console.log(children)
        },
        onEdit(evt){
            const id =evt.target.id
            let value = evt.target.innerText
            const parentId= new String(id).split('*')[0]
            const parentAttri = new String(id).split('*')[2]
            if (parentAttri=="Amount (LCY)") {
                value = Number(value)
                this.saleOrderPaymentLines[parentId][parentAttri] = value
                if(this.saleOrderPaymentLines[parentId]['Approval required']==0){
                    this.saleOrderPaymentLines[parentId]['Accepted Amount (LCY)']=value
                }
                //this.saleOrderCardLines[parentId]["Line Amount"] = value * Math.trunc(Number(this.saleOrderCardLines[parentId]["Unit Price"]))
            }
            else{
                this.saleOrderPaymentLines[parentId][parentAttri] = value
            }
        },
        endEdit(){
            this.$el.querySelector('.editme').blur()
        }

    }
}

</script>
<style scoped>
.has-background-red{
    background-color:#a20d01
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  height:10px;
}

/* Track */
::-webkit-scrollbar-track {
  background:rgb(234, 234, 234); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #a20d01; 
  border-radius: 5px;
  height: 50%;
}

::-webkit-scrollbar-corner{
  background:#a20c0163; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:rgb(35, 35, 35); 
}

</style>
