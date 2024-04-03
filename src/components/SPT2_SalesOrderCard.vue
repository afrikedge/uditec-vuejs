<template>
    <div class="has-background-white p-5">
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

        <div class="columns mt-5">
            <div class="column"></div>
            <div class="column has-text-right is-narrow">
                <input-select-addons v-model="saleOrderCampaignNo" :valueInputText="saleOrderCampaignName" labelInputText="Promo" :is_disabled="false" @openModal="activeModalForSelectableElementList='campaignList'"></input-select-addons>
                <input-text v-if="saleOrderNo!==''" :valueInputText="saleOrderNo" labelInputText="N° Commande" :is_disabled="true"></input-text>
            </div>
        </div>
        <div class="columns">
            <div class="column is-narrow">
                <input-select-addons v-model="saleOrderCustomerNo" :valueInputText="saleOrderCustomerName" labelInputText="Client" :is_disabled="false" @openModal="activeModalForSelectableElementList='customerList'"></input-select-addons>
                <input-select-addons v-model="saleOrderCustomerContactCode" :valueInputText="saleOrderCustomerContactName" labelInputText="Contact" :is_disabled="false" @openModal="activeModalForSelectableElementList='contactList'"></input-select-addons>
                <input-select-addons v-model="saleOrderCustomerShipToCode" :valueInputText="saleOrderCustomerShipToName" labelInputText="Adresse" :is_disabled="false" @openModal="activeModalForSelectableElementList='addressList'"></input-select-addons>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-half">
                <input-search1 v-model="itemToSearch" ></input-search1>
            </div>
        </div>

        <div class="columns">
            <div class="column is-four-fifths">
                <div style="overflow-y: scroll; height: 200px;">
                    <SPT2-selectable-item-list-for-sale
                    :elementToSearch="itemToSearch"
                    @onGettingLineFromSelectableItemList="(elt)=>fillSaleOrderLine(elt)"
                    >
                    </SPT2-selectable-item-list-for-sale>
                </div>

                <div style="height: 200px; overflow-y: scroll;" class="mt-2 box">
                    <table class="table  is-narrow  is-fullwidth ">
                        <thead class=" my-2">
                            <tr > 
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Article</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Variante</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">U.V</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">P.U.</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant HT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                <td class="has-text-left">
                                    <span class="icon">
                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                    </span>
                                </td>
                                <td class="has-text-left py-1 px-2" >
                                    {{ Number.isInteger(elt['Line No_']/10000)?elt['Line No_']/10000:elt['Line No_'] }}
                                </td>
                                <td class="has-text-left py-0 px-2" >
                                    <div :id="index+'-'+elt['No_']+'-No_'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['No_']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                </td>
                                <td class="has-text-left py-0 px-2" style="min-width: 300px;">
                                    <div :id="index+'-'+elt['Description']+'-Description'" class="editme p-1" :contenteditable="true" v-text="elt['Description']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                </td>
                                <td class="has-text-left py-0 px-2">
                                    {{ elt['Variant Code'] }}
                                </td>
                                <td class="has-text-left py-1 px-2" >
                                    {{ elt['Unit of Measure'] }}
                                </td>
                                <td class="has-text-left py-0 px-2" >
                                    <div :id="index+'-'+elt['Quantity']+'-Quantity'" class="editme p-1"  :contenteditable="elt['Type']==2"  v-text="elt['Quantity']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                </td>
                                <td class="has-text-left py-1 px-2" >
                                    {{ Math.trunc(Number(elt['Unit Price'])) }}
                                </td>
                                <td class="has-text-left py-1 px-2 is-narrow" >
                                    {{ Math.trunc(Number(elt['Line Amount'])) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="columns ">
                    <div class="column is-offset-half">
                        <input-text1 :is_disabled="true" :valueInputText="saleOrderTotalAmount" labelInputText="Total"></input-text1>
                        <input-text1 :is_disabled="true" :valueInputText="saleOrderTotalDiscount" labelInputText="Remise"></input-text1>
                        <input-text1 :is_disabled="true" :valueInputText="saleOrderTotalVAT" labelInputText="TVA"></input-text1>
                        <input-text1 :is_disabled="true" :valueInputText="saleOrderTotalInclVAT" labelInputText="Net à payer"></input-text1>
                    </div>
                </div>

            </div>
            <div class="column is-one-fifth">
                <button class="button is-fullwidth is-dark py-5">
                    <span class="subtitle is-6 has-text-white">Demande remise</span>
                </button>
                <button class="button is-fullwidth is-dark py-5 mt-1" :disabled="saleOrderNo==''" @click="goToCashComponent">
                    <span class="subtitle is-6 has-text-white" >Encaissement</span>
                </button>
                <button class="button is-fullwidth is-dark py-5 mt-1">
                    <span class="subtitle is-6 has-text-white">Imprimer Proforma</span>
                </button>
                <button 
                :class="{'button':true, 'is-loading':submitting_message!=='','is-fullwidth':true,'is-dark':true,'py-5':true,'mt-1':true}"
                :disabled="submitting_message!==''"
                @click.prevent="submitForm">
                    <span class="subtitle is-6 has-text-white" v-if="submitting_message==''">Enregistrer</span>
                    <span class="subtitle is-6 has-text-white" v-else>{{ submitting_message }}</span>
                </button>
                <button class="button is-fullwidth is-dark py-5 mt-1" @click="activeModalForSelectableElementList='saleOrderList'">
                    <span class="subtitle is-6 has-text-white">Sélectionner commande</span>
                </button>
                <button class="button is-fullwidth is-dark py-5 mt-1" @click="resetForm">
                    <span class="subtitle is-6 has-text-white">Nouveau</span>
                </button>

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
            :customerNo="saleOrderCustomerNo" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-campaign-list 
            v-if="activeModalForSelectableElementList=='campaignList'" 
            :isActive="activeModalForSelectableElementList=='campaignList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCampaignListModal="(elt)=>fillCampaignInfoField(elt)">
        </modal-for-selectable-campaign-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerNo="saleOrderCustomerNo" 
            @onGettingLineFromSelectableAddressListModal="(elt)=>fillAddressInfoField(elt)">
        </modal-for-selectable-address-list>
    
        <modal-for-selectable-sale-order-list 
            v-if="activeModalForSelectableElementList=='saleOrderList'"  
            :isActive="activeModalForSelectableElementList=='saleOrderList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableSOListModal="(elt)=>fillSOHeaderInfoField(elt)">
        </modal-for-selectable-sale-order-list>
    
    </div>
</template>
<script>
import inputSelectAddons from './input/input-select-addons.vue'
import inputSearch1 from './input/input-search1.vue'
import inputText1 from './input/input-text1.vue'
import inputText from './input/input-text.vue'
import { onMounted, ref,watch} from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import  axios  from 'axios'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableCampaignList from './ModalForSelectableCampaignList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import SPT2SelectableItemListForSale from './SPT2_SelectableItemListForSale.vue';
import ModalForSelectableSaleOrderList from './ModalForSelectableSaleOrderList.vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import router from '@/Routes'

export default {
    name:'spt2-sale-order',
    components:{
        inputSelectAddons,
        inputSearch1,
        inputText1,
        inputText,
        ModalForSelectableCustomerList,
        ModalForSelectableCampaignList,
        ModalForSelectableContactList,
        ModalForSelectableAddressList,
        SPT2SelectableItemListForSale,
        ModalForSelectableSaleOrderList
    },
    setup(){
        const itemToSearch = ref('')
        const activeModalForSelectableElementList =ref('')
        const currentDate = new Date(new Date()).toISOString().split('T')[0]
        const hostname = window.location.hostname
        const submitting_message=ref('') 
        const error_message=ref('')
        const error_message_code =ref('')
        const success_message=ref('')
        let webUserInfo = {
            ...useWebUserInfoStore().getWebUser
        }

        const dateInfo = {
            documentDate : ref(currentDate),
            shipRequestedDate : ref(currentDate),
            promisedDeliveryDate : ref(currentDate),
        }

        const saleOrderCardHeaderInfo = {
            saleOrderNo:ref(''),
            saleOrderCustomerNo : ref(webUserInfo.defaultCustomerNo),
            saleOrderCustomerName : ref(webUserInfo.defaultCustomerName),
            saleOrderCustomerContactCode : ref(webUserInfo.defaultCustomerContactCode),
            saleOrderCustomerContactName : ref(''),
            saleOrderCampaignNo : ref(''),
            saleOrderCampaignName : ref(''),
            saleOrderLocationCode : ref(webUserInfo.defaultLocation),
            saleOrderShipmentMethodCode : ref(webUserInfo.defaultCustomerShipmentMethodCode),
            saleOrderCustomerShipToCode : ref(webUserInfo.defaultCustomerShipToCode),
            saleOrderCustomerShipToName : ref(''),
            saleOrderPaymentMethodCode : ref(webUserInfo.defaultCustomerPaymentMethodCode),
            saleOrderResponsibilityCenter : ref(webUserInfo.responsibilityCenter),
            saleOrderSalesperson : ref(webUserInfo.defaultSalesPersonCode),
            saleOrderSalesChannel : ref(webUserInfo.defaultSalesChannel),
            saleOrderSalesMode : ref(webUserInfo.defaultCustomerSalesMode),
            saleOrderStoreCode : ref(webUserInfo.defaultStoreCode),
            saleOrderCustomerPriceGroup : ref(webUserInfo.defaultCustomerPriceGroup),
            saleOrderCustomerPostingGroup : ref(webUserInfo.defaulCustomerPostingGroup),
            saleOrderGenBusPostingGroup : ref(webUserInfo.defaultCustomerGenBusPostingGroup),
            saleOrderVATBusPostingGroup : ref(webUserInfo.defaultCustomerVATBusPostingGroup),
            saleOrderPaymentTermsCode : ref(webUserInfo.defaultCustomerPaymentTermsCode),
            saleOrderPrepayment: ref(webUserInfo.defaultCustomerPrepayment),
            saleOrderTotalAmount:ref(0),
            saleOrderTotalVAT:ref(0),
            saleOrderTotalInclVAT:ref(0),
            saleOrderTotalDiscount:ref(0)
        }

        const itemInfo = {
            itemLineNo:ref(1),
            itemType: ref(2),
            itemCode: ref(''),
            itemDescription: ref(''),
            itemDescription2: ref(''),
            itemVariant: ref(''),
            itemLocation: ref(''),
            itemBinCode: ref(''),
            itemUnitOfMeasure: ref(''),
            itemQuantity: ref(''),
            itemShipmentMethod: ref(''),
            itemUnitPrice: ref(''),
            itemLineDiscount :ref(0),
            itemLineDiscountAmount:ref(0),
            itemVAT:ref(0),
            itemLineAmount:ref(0),
            itemGenProdPosGroup:ref(''),
            itemVATProdPosGroup:ref('')
        }
        
        const saleOrderCardLines =  ref([])

        function submitSOLineItemPriceRequest(itemLine){
            const JSData ={
                Parameter:'orders_item_getPrice',
                itemCode:itemLine['No_'],
                OrderNo:saleOrderCardHeaderInfo.saleOrderNo.value,
            }
            getSOLineItemPrice(itemLine,formatToBCJsonData(JSData))
        }

        function getSOLineItemPrice(itemLine,sqData){
            axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.activeCompanyId}`,sqData)
            .then(res =>{
                console.log('bjr',res)
                //itemInfo.itemUnitPrice.value=res.data.documentNo
                //itemInfo.itemPriceIsGetting.value = false
                saleOrderCardLines.value.push(
                {
                    'Line No_':saleOrderCardLines.value.length +1,
                    Type:2,
                    No_:itemLine['No_'],
                    Description:itemLine['Description'],
                    'Description 2':itemLine['Description 2'],
                    'Variant Code':itemLine['Variant Code'],
                    'Location Code':webUserInfo.defaultLocation,
                    'Bin Code':'',
                    'Unit of Measure':itemLine['Sales Unit of Measure'],
                    Quantity:1,
                    'Shipment Method Code':webUserInfo.defaultCustomerShipmentMethodCode,
                    'Unit Price':res.data.documentNo>0?res.data.documentNo:itemLine['Unit Price'],
                    'Line Discount _':itemInfo.itemLineDiscount.value,
                    'Line Discount Amount':1* res.data.documentNo>0?res.data.documentNo:itemLine['Unit Price'] * itemInfo.itemLineDiscount.value / 100,
                    'VAT _':itemInfo.itemVAT.value*1,
                    'Line Amount':1 * res.data.documentNo>0?res.data.documentNo:itemLine['Unit Price'],
                    'Gen_ Prod_ Posting Group':'',
                    'VAT Prod_ Posting Group':''
                })
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }

        function fillSaleOrderLine(itemLine){
            submitSOLineItemPriceRequest(itemLine)
            // saleOrderCardLines.value.push(
            //     {
            //         'Line No_':saleOrderCardLines.value.length +1,
            //         Type:2,
            //         No_:itemLine['No_'],
            //         Description:itemLine['Description'],
            //         'Description 2':itemLine['Description 2'],
            //         'Variant Code':itemLine['Variant Code'],
            //         'Location Code':webUserInfo.defaultLocation,
            //         'Bin Code':'',
            //         'Unit of Measure':itemLine['Sales Unit of Measure'],
            //         Quantity:1,
            //         'Shipment Method Code':webUserInfo.defaultCustomerShipmentMethodCode,
            //         'Unit Price':itemLine['Unit Price'],
            //         'Line Discount _':itemInfo.itemLineDiscount.value,
            //         'Line Discount Amount':1* itemLine['Unit Price'] * itemInfo.itemLineDiscount.value / 100,
            //         'VAT _':itemInfo.itemVAT.value*1,
            //         'Line Amount':1 * itemLine['Unit Price'],
            //         'Gen_ Prod_ Posting Group':'',
            //         'VAT Prod_ Posting Group':''
            // })
        }

        function fillCustomerInfoField(customer){
            saleOrderCardHeaderInfo.saleOrderCustomerNo.value=customer['No_']
            saleOrderCardHeaderInfo.saleOrderCustomerName.value=customer['Name']
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=customer['Primary Contact No_']
            saleOrderCardHeaderInfo.saleOrderPaymentMethodCode.value=customer['Payment Method Code']
            saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value=customer['Payment Terms Code']
            saleOrderCardHeaderInfo.saleOrderPrepayment.value=customer['Prepayment _']
            saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value=customer['Shipment Method Code']
            saleOrderCardHeaderInfo.saleOrderCustomerPostingGroup.value=customer['Customer Posting Group']
            saleOrderCardHeaderInfo.saleOrderGenBusPostingGroup.value=customer['Gen_ Bus_ Posting Group']
            saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value=customer['VAT Bus_ Posting Group']
            saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value=customer['Customer Price Group']
            saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value=customer['Ship-to Code']
            saleOrderCardHeaderInfo.saleOrderSalesMode.value=customer['Sales Mode']
        }

        function fillContactInfoField(contact){
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=contact['No_']
            saleOrderCardHeaderInfo.saleOrderCustomerContactName.value=contact['Name']
        }

        function fillAddressInfoField(address){
            saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value = address["Code"]
            saleOrderCardHeaderInfo.saleOrderCustomerShipToName.value = address["Name"]
        }

        function fillCampaignInfoField(campaign){
            saleOrderCardHeaderInfo.saleOrderCampaignNo.value=campaign["No_"]
            saleOrderCardHeaderInfo.saleOrderCampaignName.value=campaign["Description"]
        }

        function fillSOHeaderInfoField(so){
            saleOrderCardHeaderInfo.saleOrderNo.value=so['No_']
            saleOrderCardHeaderInfo.saleOrderCustomerNo.value=so['Sell-to Customer No_']
            saleOrderCardHeaderInfo.saleOrderCustomerName.value=so['Sell-to Customer Name']
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=so['Sell-to Contact No_']
            saleOrderCardHeaderInfo.saleOrderTotalAmount.value=so['Total Amount']
            saleOrderCardHeaderInfo.saleOrderTotalVAT.value=so['Total VAT']
            saleOrderCardHeaderInfo.saleOrderTotalInclVAT.value=so['Total Amount Including VAT']
            //getSaleOrderCardLine()
        }

        function getSaleOrderCardLine(){
            axios.get(`http://${hostname}:3000/app/getSOCardLine/${saleOrderCardHeaderInfo.saleOrderNo.value}`)
            .then(result => {
                saleOrderCardLines.value = result.data.recordset
                //console.log(result)
            }).catch(err=>console.log(err))
        }

        watch(saleOrderCardHeaderInfo.saleOrderNo, () => {
            if(saleOrderCardHeaderInfo.saleOrderNo.value!=='')
            getSaleOrderCardLine()
        })

        function displayErrorMessage(errorObject){
            if(errorObject.response && errorObject.response.status){
                switch (errorObject.response.status){
                    case 401: 
                        submitting_message.value=''
                        error_message.value= errorObject.response.data;break;
                    case 400:
                        submitting_message.value='' 
                        error_message.value= errorObject.response.data
                        error_message_code.value= errorObject.code;break;
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
            }
        }

        function formatToBCJsonData(data){
            
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }

        function saveSaleOrder(sqData){
            axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.activeCompanyId}`,sqData)
            .then(res => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi'
                error_message.value=''
                saleOrderCardHeaderInfo.saleOrderNo.value=res.data.documentNo
                setTimeout(()=> success_message.value='',5000)
            })
            .catch(err => {
                displayErrorMessage(err)
            })
        }

        function submitForm(){
            if (saleOrderCardHeaderInfo.saleOrderNo.value=='')
            {
                submitting_message.value='Création de la commande en cours'
                const JSData = {
                    Parameter:'orders_insert',
                    webUserName:webUserInfo.name,
                    OrderNo:'',
                    saleOrderCustomerNo: saleOrderCardHeaderInfo.saleOrderCustomerNo.value,
                    saleOrderCustomerContactCode: saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value,
                    saleOrderResponsibilityCenter:saleOrderCardHeaderInfo.saleOrderResponsibilityCenter.value,
                    saleOrderSalesperson:saleOrderCardHeaderInfo.saleOrderSalesperson.value,
                    saleOrderCampaignNo:saleOrderCardHeaderInfo.saleOrderCampaignNo.value,
                    saleOrderLocationCode:saleOrderCardHeaderInfo.saleOrderLocationCode.value,
                    saleOrderSalesChannel:saleOrderCardHeaderInfo.saleOrderSalesChannel.value,
                    saleOrderSalesMode:saleOrderCardHeaderInfo.saleOrderSalesMode.value,
                    saleOrderCustomerPriceGroup:saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value,
                    
                    //nouveaux
                    saleOrderCustomerStoreCode:saleOrderCardHeaderInfo.saleOrderStoreCode.value,  
                    saleOrderVATBusPostingGroup:saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,
                    saleOrderCustomerPostingGroup:saleOrderCardHeaderInfo.saleOrderCustomerPostingGroup.value, 
                    saleOrderGenBusPostingGroup:saleOrderCardHeaderInfo.saleOrderGenBusPostingGroup.value, 
    
                    saleOrderDocumentDate:dateInfo.documentDate.value,
                    saleOrderShipRequestedDate:dateInfo.shipRequestedDate.value, 
                    saleOrderPromisedDeliveryDate:dateInfo.promisedDeliveryDate.value, 
                    saleOrderPaymentMethodCode:saleOrderCardHeaderInfo.saleOrderPaymentMethodCode.value, 
                    saleOrderPaymentTermsCode:saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value,
                    saleOrderPrepayment:saleOrderCardHeaderInfo.saleOrderPrepayment.value, 
                    saleOrderCustomerShipToCode:saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value, 
                    saleOrderShipmentMethodCode:saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value, 
                    saleOrderLines:[
                        ...saleOrderCardLines.value
                    ]
                }
                saveSaleOrder(formatToBCJsonData(JSData))
            }else{
                submitting_message.value='Modification de la commande en cours'
                const JSData = {
                    Parameter:'orders_modify',
                    webUserName:webUserInfo.name,
                    OrderNo:saleOrderCardHeaderInfo.saleOrderNo.value,
                    saleOrderCustomerNo: saleOrderCardHeaderInfo.saleOrderCustomerNo.value,
                    saleOrderCustomerContactCode: saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value,
                    saleOrderResponsibilityCenter:saleOrderCardHeaderInfo.saleOrderResponsibilityCenter.value,
                    saleOrderSalesperson:saleOrderCardHeaderInfo.saleOrderSalesperson.value,
                    saleOrderCampaignNo:saleOrderCardHeaderInfo.saleOrderCampaignNo.value,
                    saleOrderLocationCode:saleOrderCardHeaderInfo.saleOrderLocationCode.value,
                    saleOrderSalesChannel:saleOrderCardHeaderInfo.saleOrderSalesChannel.value,
                    saleOrderSalesMode:saleOrderCardHeaderInfo.saleOrderSalesMode.value,
                    saleOrderCustomerPriceGroup:saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value,
                    
                    //nouveaux
                    saleOrderCustomerStoreCode:saleOrderCardHeaderInfo.saleOrderStoreCode.value,  
                    saleOrderVATBusPostingGroup:saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,
                    saleOrderCustomerPostingGroup:saleOrderCardHeaderInfo.saleOrderCustomerPostingGroup.value, 
                    saleOrderGenBusPostingGroup:saleOrderCardHeaderInfo.saleOrderGenBusPostingGroup.value, 
    
                    saleOrderDocumentDate:dateInfo.documentDate.value,
                    saleOrderShipRequestedDate:dateInfo.shipRequestedDate.value, 
                    saleOrderPromisedDeliveryDate:dateInfo.promisedDeliveryDate.value, 
                    saleOrderPaymentMethodCode:saleOrderCardHeaderInfo.saleOrderPaymentMethodCode.value, 
                    saleOrderPaymentTermsCode:saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value,
                    saleOrderPrepayment:saleOrderCardHeaderInfo.saleOrderPrepayment.value, 
                    saleOrderCustomerShipToCode:saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value, 
                    saleOrderShipmentMethodCode:saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value, 
                    saleOrderLines:[
                        ...saleOrderCardLines.value
                    ]
                }
                saveSaleOrder(formatToBCJsonData(JSData))
            }
        }

        function resetForm(){
            saleOrderCardLines.value=[]
            saleOrderCardHeaderInfo.saleOrderNo.value=''
        }

        function goToCashComponent(){
            useNavigationTabStore().setActiveTab('saleOrderPayment')
            router.push(`?order=${saleOrderCardHeaderInfo.saleOrderNo.value}`)
        }

        onMounted(()=>{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo = {
                        ...useWebUserInfoStore().getWebUser
                    }
                    saleOrderCardHeaderInfo.saleOrderCustomerNo.value=webUserInfo.defaultCustomerNo
                    saleOrderCardHeaderInfo.saleOrderCustomerName.value=webUserInfo.defaultCustomerName
                    saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=webUserInfo.defaultCustomerContactCode
                })
                .catch(err=>console.log(err))
            
        })


        return {
            goToCashComponent,
            itemToSearch,
            activeModalForSelectableElementList,
            ...saleOrderCardHeaderInfo,
            saleOrderCardLines,
            ...itemInfo,
            webUserInfo,
            fillSaleOrderLine,
            fillCustomerInfoField,
            fillContactInfoField,
            fillAddressInfoField,
            fillCampaignInfoField,
            fillSOHeaderInfoField,
            submitForm,
            resetForm,
            error_message,
            error_message_code,
            success_message,
            submitting_message

        }
    },
    methods:{
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
            const parentId= new String(id).split('-')[0]
            const parentAttri = new String(id).split('-')[2]
            if (parentAttri=="Quantity") {
                value = Number(value)
                this.saleOrderCardLines[parentId][parentAttri] = value
                this.saleOrderCardLines[parentId]["Line Amount"] = value * Math.trunc(Number(this.saleOrderCardLines[parentId]["Unit Price"]))
            }
            else{
                this.saleOrderCardLines[parentId][parentAttri] = value
            }
         },
         endEdit(){
            this.$el.querySelector('.editme').blur()
         }

    }
}

</script>
