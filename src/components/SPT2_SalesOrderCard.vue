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
        
        <div class="columns">
            <div class="column is-half">
                <input-select-addons v-model="saleOrderCustomerNo" :valueInputText="saleOrderCustomerName" labelInputText="Client" :is_disabled="false" @openModal="activeModalForSelectableElementList='customerList'"></input-select-addons>
                <input-select-addons v-model="saleOrderCustomerContactCode" :valueInputText="saleOrderCustomerContactName" labelInputText="Contact" :is_disabled="false" @openModal="activeModalForSelectableElementList='contactList'"></input-select-addons>
            </div>
            <div class="column">
                <input-select-addons v-model="saleOrderCampaignNo" :valueInputText="saleOrderCampaignName" labelInputText="Promo" :is_disabled="false" @openModal="activeModalForSelectableElementList='campaignList'"></input-select-addons>
                <input-text v-if="saleOrderNo!==''" :valueInputText="saleOrderNo" labelInputText="N° Commande" :is_disabled="true"></input-text>
            </div>
        </div>
        
        <div class="columns">
            <div class="column is-9">
                <div class="columns is-multiline">
                    <div class="column is-narrow">
                        <input-search1 v-model="itemToSearch" ></input-search1>
                    </div>
                    <div class="column is-narrow">
                        <div class="field is-grouped">
                            <p class="control">
                                <button type="type" class="button has-background-red is-medium shadow has-text-white" @click="() =>inventoryAvailabilityModalShowned=true">
                                    Disponibilité stock
                                </button>
                            </p>
                            <p class="control">
                                <button class="button has-background-red is-medium shadow has-text-white" @click="() => inventoryAvailabilityPerCampaignModalShowned=true">
                                    Disponibilité article promo
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div style="height: 200px; overflow: scroll; padding: 0;" class="box has-background-light">
                    <SPT2-selectable-item-list-for-sale
                    :elementToSearch="itemToSearch"
                    @onGettingLineFromSelectableItemList="(elt)=>fillSaleOrderLine(elt)"
                    @onGettingItemNoFromSelectableItemList="(itemNo)=>itemNoToDisplayCard = itemNo "
                    >
                    </SPT2-selectable-item-list-for-sale>
                </div>

                <div style="height: 200px; overflow-x: scroll" class="mt-2 shadow mb-3">
                    <table class="table  is-narrow is-bordered  is-hoverable is-fullwidth tableFixHead">
                        <thead class=" my-2">
                            <tr > 
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7"></th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7">N°</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Article</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Variante</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">U.V</th>
                                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">P.U. HT</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Taux TVA</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant TVA</th>
                                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant HT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" @click="selectLine(index)" >
                                <td class="has-text-left ">
                                    <span class="icon" v-if="selectedLine!==index">
                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                    </span>
                                    <a href="#" class="button is-danger is-small shadow" @click.prevent="deleteLine(index)" v-if="selectedLine==index">
                                        <span class="icon ">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                    </a>
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
                                <td class="has-text-right py-0 px-2" >
                                    <div :id="index+'-'+elt['Quantity']+'-Quantity'" class="editme p-1"  :contenteditable="elt['Type']==2"  v-text="elt['Quantity']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                </td>
                                <td class="has-text-right py-1 px-2" >
                                    {{ formatAmount(elt['Unit Price']) }}
                                </td>
                                <td class="has-text-right py-1 px-2 is-narrow" >
                                    {{ formatAmount(elt['VAT _']) }}
                                </td>
                                <td class="has-text-right py-1 px-2 is-narrow" >
                                    {{ formatAmount(elt['VAT Amount']) }}
                                </td>
                                <td class="has-text-right py-1 px-2 is-narrow" >
                                    {{  formatAmount(elt['Line Amount']) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="columns ">
                    <div class="column is-half">
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalDiscount)" labelInputText="Remise"></input-text1>
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalAmountExclVAT)" labelInputText="Total HT"></input-text1>
                    </div>
                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalVAT)" labelInputText="Total TVA"></input-text1>
                        <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalAmountIncVAT)" labelInputText="Net à payer"></input-text1>
                    </div>
                </div>

            </div>
            <div class="column is-3">
                <button class="button is-fullwidth is-dark py-5 mt-1" @click="submitNewForm" style="min-height:90px">
                    <span class="subtitle is-5 has-text-white">Nouveau</span>
                </button>

                <button 
                :class="{'button':true,'mt-1':true, 'is-loading':submitting_message!=='','is-fullwidth':true,'is-dark':true,'py-5':true}"
                :disabled="submitting_message!==''"
                @click.prevent="submitForm" style="min-height:90px">
                    <span class="subtitle is-5 has-text-white" v-if="submitting_message==''">Enregistrer</span>
                    <span class="subtitle is-6 has-text-white" v-else>{{ submitting_message }}</span>
                </button>

                <button class="button is-fullwidth is-dark py-5 mt-1" :disabled="saleOrderNo==''" @click="goToCashComponent" style="min-height:90px">
                    <span class="subtitle is-5 has-text-white" >Encaissement</span>
                </button>

                <button class="button is-fullwidth is-dark py-5 mt-1" :disabled="saleOrderProcessingStatus!==0 || saleOrderApprovalStatus!==0" style="min-height:90px" @click.prevent="() => discountConfirmationModalShowned = true">
                    <span class="subtitle is-5 has-text-white">Demander remise</span>
                </button>

                <button class="button is-fullwidth is-dark py-5 mt-1" @click="activeModalForSelectableElementList='saleOrderList'" style="min-height:90px">
                    <span class="subtitle is-5 has-text-white">Sélectionner commande</span>
                </button>

                <button class="button is-fullwidth is-dark py-5 mt-1" :disabled="saleOrderNo==''" style="min-height:90px">
                    <span class="subtitle is-5 has-text-white">Imprimer Proforma</span>
                </button>
                
                

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
        @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)"
        @onDisplayingContactCreationModal="()=>showContactCreationModal()">
    </modal-for-selectable-contact-list>

    <modal-for-selectable-campaign-list 
        v-if="activeModalForSelectableElementList=='campaignList'" 
        :isActive="activeModalForSelectableElementList=='campaignList'" 
        @closeModal="activeModalForSelectableElementList=''" 
        @onGettingLineFromSelectableCampaignListModal="(elt)=>fillCampaignInfoField(elt)">
    </modal-for-selectable-campaign-list>

    <modal-for-selectable-sale-order-list 
        v-if="activeModalForSelectableElementList=='saleOrderList'"  
        :isActive="activeModalForSelectableElementList=='saleOrderList'" 
        @closeModal="activeModalForSelectableElementList=''" 
        @onGettingLineFromSelectableSOListModal="(elt)=>fillSOHeaderInfoField(elt)">
    </modal-for-selectable-sale-order-list>

<!-----------modal de confirmation de la demande de remise------------------->
    <div :class="{'modal':true , 'is-active':true }" v-if="discountConfirmationModalShowned">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click="discountConfirmationModalShowned=false"></div>
        <div class="modal-content has-background-white p-5 shadow" style="border: none;">
            <div class="columns mb-5">
                <div class="column is-narrow">
                    <span class="icon is-large">
                    <i class="far fa-circle-question fa-2x"></i>
                    </span>
                </div>
                <div class="column has-text-left">
                    <span class="subtitle is-5 has-text-left">Veuillez indiquer le pourcentage de remise demandé?</span>
                </div>
            </div>
            <div>
                <InputTextSimple v-model="saleOrderDiscount"></InputTextSimple>
            </div>
            <div class="buttons mt-5 is-right">
                <button class="button shadow has-background-orange has-text-white" @click.prevent="submitDiscountRequest">
                    Je confirme
                </button>
                <button class="button shadow" @click.prevent="discountConfirmationModalShowned=false">J'annule</button>
            </div>
        </div>
        <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" discountConfirmationModalShowned=false"></button>
    </div>

<!-----------Modal pour la création d'un contact-------------------->
    <div :class="{'modal':true , 'is-active': true }" v-if="newContactModalShowned">
        <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newContactModalShowned=false"></div>
        <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
            <new-contact :customerNo="saleOrderCustomerNo" :redirectionIsDisabled="true" @submit="(elt) => {saleOrderCustomerContactCode = elt['code']; saleOrderCustomerContactName = elt['name'];newContactModalShowned=false} "></new-contact>
        </div>
        <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newContactModalShowned=false }"></button>
    </div>


<!-----------Disponibilité article-------------------->     
    <div :class="{'modal':true , 'is-active':true }" v-if="inventoryAvailabilityModalShowned">
        <div class="modal-background has-background-white" style="opacity:0.7" @click="inventoryAvailabilityModalShowned=false"></div>
        <div class="modal-content w-75 has-background-light" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.28);">
            <inventory-availability :itemNo="selectedLine>=0?saleOrderCardLines[selectedLine]['No_']:''"></inventory-availability>
        </div>
        <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="inventoryAvailabilityModalShowned=false"></button>
    </div>

<!-----------Disponibilité article promo-------------------->     
    <div class="modal is-active" v-if="inventoryAvailabilityPerCampaignModalShowned">
        <div class="modal-background has-background-white" style="opacity:0.7" @click="inventoryAvailabilityPerCampaignModalShowned=false"></div>
        <div class="modal-content w-75 has-background-light" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.28);">
            <inventory-availability-per-campaign :itemNo="selectedLine>=0?saleOrderCardLines[selectedLine]['No_']:''" :campaignNo="saleOrderCampaignNo"></inventory-availability-per-campaign>
        </div>
        <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="inventoryAvailabilityPerCampaignModalShowned=false"></button>
    </div>
</template>

<script>
import inputSelectAddons from './input/input-select-addons.vue'
import inputSearch1 from './input/input-search1.vue'
import inputText1 from './input/input-text1.vue'
import inputText from './input/input-text.vue'
import InputTextSimple from './input/input-text-simple.vue'
import { computed, onBeforeMount, onMounted, ref,watch} from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import  axios  from 'axios'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableCampaignList from './ModalForSelectableCampaignList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import SPT2SelectableItemListForSale from './SPT2_SelectableItemListForSale.vue';
import ModalForSelectableSaleOrderList from './ModalForSelectableSaleOrderList.vue'
import NewContact from './NewContact.vue'
import { useSPT2NavigationTabStore } from '@/Stores/SPT2_NavigationTab'
import router from '@/Routes'
import InventoryAvailability from './InventoryAvailability.vue'
import InventoryAvailabilityPerCampaign from './InventoryAvailabilityPerCampaign.vue'
//import ItemCard from './ItemCard.vue'


export default {
    name:'spt2-sale-order',
    components:{
        inputSelectAddons,
        inputSearch1,
        inputText1,inputText,
        InputTextSimple,
        ModalForSelectableCustomerList,
        ModalForSelectableCampaignList,
        ModalForSelectableContactList,
        SPT2SelectableItemListForSale,
        ModalForSelectableSaleOrderList,
        NewContact,
        InventoryAvailability,
        InventoryAvailabilityPerCampaign,
        //ItemCard
    },
    data(){
        return {
            inventoryAvailabilityPerCampaignModalShowned:false,
            inventoryAvailabilityModalShowned:false,
            itemNoToDisplayCard:''

        }
    },
    setup(){
        const itemToSearch = ref('')
        const activeModalForSelectableElementList =ref('')
        const currentDate = new Date().toISOString()
        const hostname = window.location.hostname
        const submitting_message=ref('') 
        const error_message=ref('')
        const error_message_code =ref('')
        const success_message=ref('')



        const selectedLine = ref(-1)
        const newContactModalShowned = ref(false)

        //element pour déclencher le recalcul des lignes
        const lineHasBeenDeleted = ref(false)

        //element pour rapidement créer une commande vierge
        const quickCreationIsEnabled = ref(false)


        //objet contenant nos champs de date
        const dateInfo = {
            documentDate : ref(currentDate),
            shipRequestedDate : ref(currentDate),
            promisedDeliveryDate : ref(currentDate),
        }

        //sac de label de la fiche
        const labelBag = {
            'Processing Status' : ref(''),
            'Approval Status' : ref('')
        }

        //fonction pour récupérer le label pour un champ donné
        function getSingleOptionLabel(language,field,value){
            axios.get(`http://${hostname}:5000/app/getSingleOptionLabel?lg=${language}&fd=${field}&vl=${value}`)
            .then(result => {
                labelBag[field].value = result.data.recordset[0][""]
            }).catch(err=>console.log(err))
        }

        //Fonctions pour récupérer le nom du contact
        function getContactName(contactNo){
            axios.get(`http://${hostname}:5000/app/getContactCard/${contactNo}`)
            .then((result) => {
                saleOrderCardHeaderInfo.saleOrderCustomerContactName.value = result.data.recordset[0]['Name']
            })
            .catch((err) => console.error(err));
        }


//fonctions spécifiques aux articles
        function submitSOLineItemPriceRequest(itemLine){
            const JSData ={
                Parameter:'orders_item_getPrice',
                itemCode:itemLine['No_'],
                OrderNo:saleOrderCardHeaderInfo.saleOrderNo.value,
                Quantity:1,
                'Variant Code':itemLine["Variant Code"]?itemLine["Variant Code"]:''
            }
            getSOLineItemPrice(itemLine,formatToBCJsonData(JSData))
        }
        function getSOLineItemPrice(itemLine,sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res =>{
                const unitPrice = ref('')
                unitPrice.value = res.data.documentNo
                unitPrice.value = Number(unitPrice.value.split(',').join(''))
                saleOrderCardLines.value.push(
                {
                    'Line No_':saleOrderCardLines.value.length +1,
                    Type:2,
                    No_:itemLine['No_'],
                    Description:itemLine['Description'],
                    'Description 2':itemLine['Description 2'],
                    'Variant Code':itemLine['Variant Code'],
                    'Location Code':useWebUserInfoStore().defaultLocation,
                    'Bin Code':'',
                    'Unit of Measure':itemLine['Sales Unit of Measure'],
                    Quantity:1,
                    'Shipment Method Code':useWebUserInfoStore().defaultCustomerShipmentMethodCode,
                    'Unit Price':unitPrice.value>0?unitPrice.value:itemLine['Unit Price'],
                    'Line Discount _':0,
                    'Line Discount Amount':0,
                    'VAT _':0,
                    'Line Amount':unitPrice.value>0?unitPrice.value:itemLine['Unit Price'],
                    'Gen_ Prod_ Posting Group':saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,
                    'VAT Prod_ Posting Group':itemLine['VAT Prod_ Posting Group']
                })
                getVATonItemFromBCPrice(saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,itemLine['VAT Prod_ Posting Group'],saleOrderCardLines.value.length-1,'VAT Amount')
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }

        function submitSOLineItemPriceRequestOnLine(index){
            const JSData ={
                Parameter:'orders_item_getPrice',
                itemCode:saleOrderCardLines.value[index]["No_"],
                OrderNo:saleOrderCardHeaderInfo.saleOrderNo.value,
                Quantity:saleOrderCardLines.value[index]["Quantity"],
                'Variant Code':saleOrderCardLines.value[index]["Variant Code"]?saleOrderCardLines.value[index]["Variant Code"]:''
            }
            getSOLineItemPriceOnLine(index,formatToBCJsonData(JSData))
        }
        function getSOLineItemPriceOnLine(index,data){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,data)
            .then(res =>{
                const unitPrice = ref('')
                unitPrice.value = res.data.documentNo
                unitPrice.value = Number(unitPrice.value.split(',').join(''))
                saleOrderCardLines.value[index]['Unit Price'] = unitPrice.value
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function getVATonItemFromBCPrice(VATOnCust,VATOnItem,lineNo,lineAttrib){
            axios.get(`http://${hostname}:5000/app/getItemVAT?VATOnItem=${VATOnItem}&VATOnCust=${VATOnCust}`)
            .then(result =>{
                saleOrderCardLines.value[lineNo]['VAT _'] =  result.data
                const VATAmount = Number(saleOrderCardLines.value[lineNo]['Unit Price'] * result.data /100 ).toFixed(3)
                saleOrderCardLines.value[lineNo][lineAttrib]= Number(VATAmount).toFixed(3)
            })
            .catch(err => console.log(err))
        }
        function getVATonItemFromSQLPrice(VATOnCust,VATOnItem,lineNo,TTCUnitPrice){
            axios.get(`http://${hostname}:5000/app/getItemVAT?VATOnItem=${VATOnItem}&VATOnCust=${VATOnCust}`)
            .then(result =>{
                saleOrderCardLines.value[lineNo]['VAT _'] =  result.data
                saleOrderCardLines.value[lineNo]['Unit Price'] = Number(TTCUnitPrice / (1 + result.data/100)).toFixed(3)
                saleOrderCardLines.value[lineNo]['VAT Amount'] = Number(TTCUnitPrice - saleOrderCardLines.value[lineNo]['Unit Price']).toFixed(3)
                saleOrderCardLines.value[lineNo]['Line Amount'] = Number(saleOrderCardLines.value[lineNo]['Unit Price']).toFixed(3)
            })
            .catch(err => console.log(err))
        }


//Propriétés calculés pour les totaux des lignes
        const totalDiscount = computed(() => {
            let sum = 0
            saleOrderCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + Number(elt['Line Discount Amount'])
            })
            return sum.toFixed(2)
        })
        
        const totalVAT = computed(() => {
            let sum = 0
            saleOrderCardLines.value.map(elt =>{
                if(elt['VAT Amount'])
                    sum = sum + Number(elt['VAT Amount'])
            })
            return sum.toFixed(2)
        })
        
        const totalAmountExclVAT = computed(() => {
            let sum = 0
            saleOrderCardLines.value.map(elt =>{
                if(elt['Line Amount'])
                    sum = sum + Number(elt['Line Amount'])
            })
            return sum.toFixed(2)
        })

        const totalAmountIncVAT = computed(()=> {
            const TAIV = Number(totalAmountExclVAT.value) + Number(totalVAT.value)
            return TAIV
        })



        //objet contenant les infos en entête de la commande(masquées/affichées)
        const saleOrderCardHeaderInfo = {
            saleOrderNo:ref(''),
            saleOrderCustomerNo : ref(useWebUserInfoStore().defaultCustomerNo),
            saleOrderCustomerName : ref(useWebUserInfoStore().defaultCustomerName),
            saleOrderCustomerContactCode : ref(useWebUserInfoStore().defaultCustomerContactCode),
            saleOrderCustomerContactName : ref(''),
            saleOrderCampaignNo : ref(''),
            saleOrderCampaignName : ref(''),
            saleOrderLocationCode : ref(useWebUserInfoStore().defaultLocation),
            saleOrderShipmentMethodCode : ref(useWebUserInfoStore().defaultCustomerShipmentMethodCode),
            saleOrderCustomerShipToCode : ref(useWebUserInfoStore().defaultCustomerShipToCode),
            saleOrderCustomerShipToName : ref(''),
            saleOrderPaymentMethodCode : ref(useWebUserInfoStore().defaultCustomerPaymentMethodCode),
            saleOrderResponsibilityCenter : ref(useWebUserInfoStore().responsibilityCenter),
            saleOrderSalesperson : ref(useWebUserInfoStore().defaultSalesPersonCode),
            saleOrderSalesChannel : ref(useWebUserInfoStore().defaultSalesChannel),
            saleOrderSalesMode : ref(useWebUserInfoStore().defaultCustomerSalesMode),
            saleOrderStoreCode : ref(useWebUserInfoStore().defaultStoreCode),
            saleOrderCustomerPriceGroup : ref(useWebUserInfoStore().defaultCustomerPriceGroup),
            saleOrderCustomerPostingGroup : ref(useWebUserInfoStore().defaulCustomerPostingGroup),
            saleOrderGenBusPostingGroup : ref(useWebUserInfoStore().defaultCustomerGenBusPostingGroup),
            saleOrderVATBusPostingGroup : ref(useWebUserInfoStore().defaultCustomerVATBusPostingGroup),
            saleOrderPaymentTermsCode : ref(useWebUserInfoStore().defaultCustomerPaymentTermsCode),
            saleOrderPrepayment: ref(useWebUserInfoStore().defaultCustomerPrepayment),
            
            saleOrderApprovalStatus: ref(-1),
            saleOrderProcessingStatus: ref(-1),

            saleOrderDocumentDate:ref(''),
            saleOrderShipRequestedDate:ref(''),
            saleOrderPromisedDeliveryDate:ref(''),
        }
        //tableaux contant les articles de la commande à créer ou modifier
        const saleOrderCardLines =  ref([])


//fonctions pour remplir les champs avec via des listes sélectionnables
        function fillSaleOrderLine(itemLine){
            selectedLine.value = -1
            if(saleOrderCardHeaderInfo.saleOrderNo.value)
                submitSOLineItemPriceRequest(itemLine)
            else{
                saleOrderCardLines.value.push(
                    {
                        'Line No_':saleOrderCardLines.value.length +1,
                        Type:2,
                        No_:itemLine['No_'],
                        Description:itemLine['Description'],
                        'Description 2':itemLine['Description 2'],
                        'Variant Code':itemLine['Variant Code'],
                        'Location Code':useWebUserInfoStore().defaultLocation,
                        'Bin Code':'',
                        'Unit of Measure':itemLine['Sales Unit of Measure'],
                        Quantity:1,
                        'Shipment Method Code':useWebUserInfoStore().defaultCustomerShipmentMethodCode,
                        'Unit Price':0,
                        'Line Discount _':0,
                        'Line Discount Amount':0,
                        'VAT _':0,
                        'Line Amount':0,
                        'Gen_ Prod_ Posting Group':saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,
                        'VAT Prod_ Posting Group':itemLine['VAT Prod_ Posting Group']
                    })
                    getVATonItemFromSQLPrice(saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,itemLine['VAT Prod_ Posting Group'],saleOrderCardLines.value.length-1,itemLine['Unit Price'])
            }
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
        function fillCampaignInfoField(campaign){
            saleOrderCardHeaderInfo.saleOrderCampaignNo.value=campaign["No_"]
            saleOrderCardHeaderInfo.saleOrderCampaignName.value=campaign["Description"]
        }
        function fillSOHeaderInfoField(so){
            saleOrderCardHeaderInfo.saleOrderNo.value=so['No_']
            saleOrderCardHeaderInfo.saleOrderCustomerNo.value=so['Sell-to Customer No_']
            saleOrderCardHeaderInfo.saleOrderCustomerName.value=so['Sell-to Customer Name']
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=so['Sell-to Contact No_']
            saleOrderCardHeaderInfo.saleOrderApprovalStatus.value=so['Approval Status']
            saleOrderCardHeaderInfo.saleOrderProcessingStatus.value=so['Processing Status']
            saleOrderCardHeaderInfo.saleOrderCampaignNo.value=so['Campaign No_']
            dateInfo.documentDate.value=so['Document Date']
            dateInfo.shipRequestedDate.value=so['Requested Delivery Date']
            dateInfo.promisedDeliveryDate.value=so['Promised Delivery Date']
        }


//fonctions pour soumettre une demande de remise
        const saleOrderDiscount = ref(0)
        const discountConfirmationModalShowned = ref(false)

        function sendDiscountRequest(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res =>{
                console.log(res)
                submitting_message.value=''
                success_message.value="demnde de remise envoyée"
                error_message.value=''
                setTimeout(()=>success_message.value='',3000)
                saleOrderCardHeaderInfo.saleOrderProcessingStatus.value = 5
                saleOrderCardHeaderInfo.saleOrderApprovalStatus.value = 6
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitDiscountRequest(){
            discountConfirmationModalShowned.value=false
            if(saleOrderCardHeaderInfo.saleOrderApprovalStatus.value==0 && saleOrderCardHeaderInfo.saleOrderProcessingStatus.value==0){
                if(saleOrderDiscount.value>0 && saleOrderDiscount.value<=100){
                    submitting_message.value="Envoie de la demande en cours"
                    const JSData ={
                        Parameter:'discountRequest_insert',
                        webUserName:useWebUserInfoStore().name,
                        'No_':saleOrderCardHeaderInfo.saleOrderNo.value,
                        'Approval Status':6,
                        'Request Type':1,
                        'Discount %':saleOrderDiscount.value
                    }
                    sendDiscountRequest(formatToBCJsonData(JSData))
                }else{
                    error_message.value='Veillez compléter le champ % Remise demandé'
                    error_message_code.value='FIELD_REQUIRED'
                }
            }else{
                if(saleOrderCardHeaderInfo.saleOrderProcessingStatus.value==5){
                    error_message.value='Une demande de remise existe déjà pour cette commande!'
                    error_message_code.value='UNAUTHORIZED'
                }else{
                    error_message.value='Vous ne pouvez faire cette action!'
                    error_message_code.value='UNAUTHORIZED'
                }
            }
        }


        //fonction de récupération des données de la fiche
        function getSaleOrderCardLine(){
            axios.get(`http://${hostname}:5000/app/getSOCardLine/${saleOrderCardHeaderInfo.saleOrderNo.value}`)
            .then(result => {
                saleOrderCardLines.value = result.data.recordset
            }).catch(err=>console.log(err))
        }


//fonctions pour mettre à jour le document
        function submitNewForm(){
            quickCreationIsEnabled.value = true
            if(saleOrderCardHeaderInfo.saleOrderNo.value){
                saleOrderCardHeaderInfo.saleOrderNo.value=''
                saleOrderCardHeaderInfo.saleOrderCustomerNo.value = useWebUserInfoStore().defaultCustomerNo
                saleOrderCardHeaderInfo.saleOrderCustomerName.value = useWebUserInfoStore().defaultCustomerName
                saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value = useWebUserInfoStore().defaultCustomerContactCode
                saleOrderCardHeaderInfo.saleOrderApprovalStatus.value = 0
                saleOrderCardHeaderInfo.saleOrderProcessingStatus.value = 0
                saleOrderCardHeaderInfo.saleOrderCampaignNo.value = ''
                saleOrderCardHeaderInfo.saleOrderCampaignName.value = ''
                saleOrderCardHeaderInfo.saleOrderPaymentMethodCode.value=useWebUserInfoStore().defaultCustomerPaymentMethodCode
                saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value=useWebUserInfoStore().defaultCustomerPaymentTermsCode
                saleOrderCardHeaderInfo.saleOrderPrepayment.value=useWebUserInfoStore().defaultCustomerPrepayment
                saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value=useWebUserInfoStore().defaultCustomerShipmentMethodCode
                saleOrderCardHeaderInfo.saleOrderCustomerPostingGroup.value=useWebUserInfoStore().defaulCustomerPostingGroup
                saleOrderCardHeaderInfo.saleOrderGenBusPostingGroup.value=useWebUserInfoStore().defaultCustomerGenBusPostingGroup
                saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value=useWebUserInfoStore().defaultCustomerVATBusPostingGroup
                saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value=useWebUserInfoStore().defaultCustomerPriceGroup
                saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value=useWebUserInfoStore().defaultCustomerShipToCode
                saleOrderCardHeaderInfo.saleOrderSalesMode.value=useWebUserInfoStore().defaultCustomerSalesMode
                dateInfo.documentDate.value=currentDate
                dateInfo.shipRequestedDate.value= currentDate
                dateInfo.promisedDeliveryDate.value= currentDate

                if(saleOrderCardLines.value.length>0){
                    saleOrderCardLines.value = []
                }
            }else{
                if(saleOrderCardLines.value.length>0){
                    saleOrderCardLines.value = []
                }else{
                    submitForm()
                }
            }
        }

        function saveSaleOrder(sqData,actionType){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi'
                error_message.value=''
                saleOrderCardHeaderInfo.saleOrderNo.value=res.data.documentNo
                if(!quickCreationIsEnabled.value){
                    getSaleOrderCardLine()
                    setTimeout(()=> success_message.value='',3000)
                }
                quickCreationIsEnabled.value = false
                if(actionType==0){
                    saleOrderCardHeaderInfo.saleOrderProcessingStatus.value = 0
                    saleOrderCardHeaderInfo.saleOrderApprovalStatus.value = 0
                }
            })
            .catch(err => {
                displayErrorMessage(err)
            })
        }
        function submitForm(){
            submitting_message.value=saleOrderCardHeaderInfo.saleOrderNo.value?'Modification de la commande en cours':'Création de la commande en cours'
            const JSData = {
                Parameter:saleOrderCardHeaderInfo.saleOrderNo.value?'orders_modify':'orders_insert',
                webUserName:useWebUserInfoStore().name,
                OrderNo:saleOrderCardHeaderInfo.saleOrderNo.value?saleOrderCardHeaderInfo.saleOrderNo.value:'',
                saleOrderCustomerNo: saleOrderCardHeaderInfo.saleOrderCustomerNo.value,
                saleOrderCustomerContactCode: saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value,
                saleOrderResponsibilityCenter:useWebUserInfoStore().responsibilityCenter,
                saleOrderSalesperson:useWebUserInfoStore().defaultSalesPersonCode,
                saleOrderCampaignNo:saleOrderCardHeaderInfo.saleOrderCampaignNo.value,
                saleOrderLocationCode:useWebUserInfoStore().defaultLocation,
                saleOrderSalesChannel:useWebUserInfoStore().defaultSalesChannel,
                saleOrderSalesMode:saleOrderCardHeaderInfo.saleOrderSalesMode.value,
                saleOrderCustomerPriceGroup:saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value,
                
                //nouveaux
                saleOrderCustomerStoreCode:useWebUserInfoStore().defaultStoreCode,  
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
            saveSaleOrder(formatToBCJsonData(JSData),saleOrderCardHeaderInfo.saleOrderNo.value?1:0)
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
        onBeforeMount(()=> {
            if(useWebUserInfoStore().name==''){
                let userData = window.localStorage.getItem("userData");
                if(!userData){
                    router.push('/SP2000/login')
                }else{
                    let userDataObjet = JSON.parse(userData)
                    useWebUserInfoStore().fillWebUserInfo(userDataObjet)
                }
            }
        })
        onMounted(()=>{
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }
            saleOrderCardHeaderInfo.saleOrderCustomerNo.value=useWebUserInfoStore().defaultCustomerNo
            saleOrderCardHeaderInfo.saleOrderCustomerName.value=useWebUserInfoStore().defaultCustomerName
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=useWebUserInfoStore().defaultCustomerContactCode
            saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value=useWebUserInfoStore().defaultCustomerVATBusPostingGroup
            saleOrderCardHeaderInfo.saleOrderSalesMode.value =useWebUserInfoStore().defaultCustomerSalesMode
            saleOrderCardHeaderInfo.saleOrderPaymentMethodCode.value=useWebUserInfoStore().defaultCustomerPaymentMethodCode
            saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value=useWebUserInfoStore().defaultCustomerPaymentTermsCode
            saleOrderCardHeaderInfo.saleOrderPrepayment.value=useWebUserInfoStore().defaultCustomerPrepayment
            saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value=useWebUserInfoStore().defaultCustomerShipmentMethodCode
            saleOrderCardHeaderInfo.saleOrderCustomerPostingGroup.value=useWebUserInfoStore().defaulCustomerPostingGroup
            saleOrderCardHeaderInfo.saleOrderGenBusPostingGroup.value=useWebUserInfoStore().defaultCustomerGenBusPostingGroup
            saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value=useWebUserInfoStore().defaultCustomerPriceGroup
            saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value=useWebUserInfoStore().defaultCustomerShipToCode
            saleOrderCardHeaderInfo.saleOrderCampaignNo.value=useWebUserInfoStore().defaultUserPromotion
        })
        watch(saleOrderCardHeaderInfo.saleOrderNo, () => {
            if(saleOrderCardHeaderInfo.saleOrderNo.value!=='')
            getSaleOrderCardLine()
        })
        watch(lineHasBeenDeleted, () => {
            if(lineHasBeenDeleted.value){
                let i = 1
                saleOrderCardLines.value.map(row => row['Line No_'] = i++)
                lineHasBeenDeleted.value =false
            }
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


        function resetForm(){
            saleOrderCardLines.value=[]
            saleOrderCardHeaderInfo.saleOrderNo.value=''
        }
        function goToCashComponent(){
            if(totalAmountIncVAT.value>0){
                useSPT2NavigationTabStore().setActiveSalesOrder(saleOrderCardHeaderInfo.saleOrderNo.value)
                useSPT2NavigationTabStore().setActiveContact(saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value,saleOrderCardHeaderInfo.saleOrderCustomerContactName.value)
                useSPT2NavigationTabStore().setActiveCustomer(saleOrderCardHeaderInfo.saleOrderCustomerNo.value,saleOrderCardHeaderInfo.saleOrderCustomerName.value)

                useSPT2NavigationTabStore().setActiveTab('saleOrderPayment')


                //router.push(`?order=${saleOrderCardHeaderInfo.saleOrderNo.value}`)
            }else{
                error_message.value='La commande ne contient pas de montant à encaisser!'
                error_message_code.value='UNAUTHORIZED'
            }
        }

       

        return {
            goToCashComponent,
            itemToSearch,
            activeModalForSelectableElementList,
            ...saleOrderCardHeaderInfo,
            saleOrderCardLines,
            fillSaleOrderLine,
            fillCustomerInfoField,
            fillContactInfoField,
            fillCampaignInfoField,
            fillSOHeaderInfoField,
            submitForm,
            submitSOLineItemPriceRequestOnLine,
            resetForm,
            error_message,
            error_message_code,
            success_message,
            submitting_message,
            totalVAT,totalAmountExclVAT,totalAmountIncVAT,totalDiscount,
            selectedLine,
            newContactModalShowned,
            submitDiscountRequest,discountConfirmationModalShowned,saleOrderDiscount,
            getSingleOptionLabel,
            lineHasBeenDeleted,submitNewForm,
            formatAmount,


        }
    },
    methods:{
        showContactCreationModal(){
            this.activeModalForSelectableElementList = ''
            this.newContactModalShowned = true
        },
        setLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.add('is-hovered-td')
            myElt.classList.add('shadow')
        },
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.remove('is-hovered-td')
            myElt.classList.remove('shadow')           
        },
        onEdit(evt){
            const id =evt.target.id
            let value = evt.target.innerText
            const parentId= new String(id).split('-')[0]
            const parentAttri = new String(id).split('-')[2]
            if (parentAttri=="Quantity") {
                value = Number(value)
                this.saleOrderCardLines[parentId][parentAttri] = value
                this.saleOrderCardLines[parentId]["Line Amount"] = Number(value * this.saleOrderCardLines[parentId]["Unit Price"]).toFixed(3)
                this.saleOrderCardLines[parentId]["VAT Amount"] = Number(this.saleOrderCardLines[parentId]["Line Amount"] * this.saleOrderCardLines[parentId]["VAT _"] / 100 ).toFixed(3)
            
            }
            else{
                this.saleOrderCardLines[parentId][parentAttri] = value
            }
         },
         endEdit(){
            this.$el.querySelector('.editme').blur()
         },
         selectLine(id){
            if(this.selectedLine>=0){
                if(this.selectedLine==id){
                    const myElt=document.getElementById(this.selectedLine)
                    if(myElt){
                        const children =  myElt.childNodes
                        children.forEach(element => {
                            element.classList.add('has-background-white')
                            element.classList.remove('has-background-orange-light')
                        })
                    }
                    this.selectedLine = -1
                    return -1
                }
                const myElt=document.getElementById(this.selectedLine)
                if(myElt){
                    const children =  myElt.childNodes
                    children.forEach(element => {
                        element.classList.add('has-background-white')
                        element.classList.remove('has-background-orange-light')
                    })
                }
            }
            this.selectedLine=id
            const myElt=document.getElementById(id)
            if(myElt){
                const children =  myElt.childNodes
                children.forEach(element => {
                    element.classList.remove('has-background-white')
                    element.classList.add('has-background-orange-light')
                })
            }
        },
        deleteLine(index){
            this.saleOrderCardLines.splice(index,1)
            this.lineHasBeenDeleted = true
        },

    }
}

</script>

<style scoped>

.tableFixHead thead tr th {
    position: sticky; /* make the table heads sticky */
    top: -20px; /* table head will be placed from the top of the table and sticks to it */
}

.has-background-orange-light{
    background-color: rgba(255, 155, 118, 0.332);
}

.has-background-orange{
    background-color: orange
}

.has-background-red{
    background-color:#a20d01
}

.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
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
