import { createWebHistory, createRouter } from "vue-router"

//1-----composants primaire
import SalesHome from './components/SalesHome'
import Login from './components/LoginPage'

//2-----compsants de fichiers maitres 
import CustomerList from './components/CustomerList.vue'
import CustomerCard from './components/CustomerCard.vue'
import ItemList from './components/ItemList.vue'
import ItemCard from './components/ItemCard.vue'
import LeadList from './components/LeadList.vue'
import LeadCard from './components/LeadCard.vue'
import ContactList from './components/ContactList.vue'
import ContactCard from './components/ContactCard.vue'
import ShipToAddressList from './components/ShipToAddressList.vue'
import ShipToAddressCard from './components/ShipToAddressCard.vue'

//3-----composants annexes fichiers maitres
import ItemAvailibilityPerStore from './components/ItemAvailabilityPerStore.vue'

//4-----composant de document vente
import SaleOrderCard from './components/SaleOrderCard.vue'
import SaleQuoteCard from './components/SaleQuoteCard.vue'
import SaleOrderCard1 from './components/SaleOrderCard1.vue'
import SaleOrderList from './components/SaleOrderList.vue'
import SaleQuoteList from './components/SaleQuoteList.vue'
import PrintableOrderLayout from './components/PrintableOrderLayout.vue'
import PrintableOrderLayout1 from './components/PrintableOrderLayout1.vue'
import POOrderCreation from './components/POOrderCreation.vue'

//5-----composants de formulaire de création fichiers maitres
//import NewCustomer from './components/NewCustomer.vue'
import NewLead from './components/NewLead.vue'
import NewContact from './components/NewContact.vue'
import NewShipToAddress from './components/NewShipToAddress.vue'

//6-----composants de formulaire de création documents vente
import NewSaleQuote from './components/NewSaleQuote.vue'
import NewSaleOrder from './components/NewSaleOrder.vue'




//7-----Autres
import RevisionRequestList from './components/RevisionRequestList.vue'
import RevisionRequestCard from './components/RevisionRequestCard.vue'
import DiscountRequestList from './components/DiscountRequestList.vue'
import DiscountRequestCard from './components/DiscountRequestCard.vue'
import NewDiscountResquest from './components/NewDiscountRequest.vue'
import ReleaseRequestList from './components/ReleaseRequestList.vue'
import ReleaseRequestCard from './components/ReleaseRequestCard.vue'


//8-----Sport2000
import SPT2_SalesContainer from "./components/SPT2_SalesContainer.vue"


//9-----Mirindra
import CreditRequestCard from "./components/CreditRequestCard.vue"
import CreditRequestList from "./components/CreditRequestList.vue"
import NewCreditRequest from "./components/NewCreditRequest.vue"

//10-----Recouvrement
import RepossessionRequestCard from "./components/RepossessionRequestCard.vue"
import RepossessionRequestList from "./components/RepossessionRequestList.vue"

import AssignedDebtCard from "./components/AssignedDebtCard.vue"
import AssignedDebtList from "./components/AssignedDebtList.vue"

import PaymentPromiseCard from "./components/PaymentPromiseCard.vue"
import PaymentPromiseList from "./components/PaymentPromiseList.vue"

import RecoveryActivityCard from "./components/RecoveryActivityCard.vue"
import RecoveryActivityList from "./components/RecoveryActivityList.vue"

import DebtCollectionList from './components/DebtCollectionList.vue'
import DebtCollectionCard from './components/DebtCollectionCard.vue'



import ReceivablesList from './components/ReceivablesList.vue'
import ReceivablesCard from './components/ReceivablesCard.vue'

import PaymentValidationRequestList from './components/PaymentValidationRequestList.vue'
import PaymentValidationRequestCard from './components/PaymentValidationRequestCard.vue'
import NewPaymentValidationRequest from './components/NewPaymentValidationRequest.vue'


//11-----Formulaire création recouvrement
import NewRepossessionRequest from "./components/NewRepossessionRequest.vue"
import NewDebtCollection from "./components/NewDebtCollection.vue"

//11-----contrat d'achat groupé
import CreditContractList from "./components/CreditContractList.vue"
import CreditContractCard from "./components/CreditContractCard.vue"
import NewGoupBuyContract from "./components/NewGroupBuyContract.vue"

const routes = [
  ///////////////////1
  {path:'/login',component:Login,name:'login'},
  {path:'/',component:SalesHome,name:'SalesHome'},

  ///////////////////2
  {path:'/CustomerList',component:CustomerList,name:'CustomerListPage'},
  {path:'/CustomerCard/:id',component:CustomerCard,name:'CustomerCardPage'},
  {path:'/ItemList',component:ItemList,name:'itemListPage'},
  {path:'/ItemCard/:id',component:ItemCard,name:'ItemCardPage'},
  {path:'/LeadList',component:LeadList,name:'LeadListPage'},
  {path:'/LeadCard/:id',component:LeadCard,name:'LeadCardPage'},
  {path:'/ContactList/:id',component:ContactList,name:'ContactListPage'},
  {path:'/ContactCard/:id1/:id2',component:ContactCard,name:'ContactCardPage'},
  {path:'/ShipToAddressList/:id',component:ShipToAddressList,name:'ShipToAddressListPage'},
  {path:'/ShipToAddressCard/:id1/:id2',component:ShipToAddressCard,name:'ShipToAddressCardPage'},

  ///////////////////3
  {path:'/ItemAvailibilityPerStore/:id',component:ItemAvailibilityPerStore,name:'ItemAvailibilityPerStorePage'},

  ///////////////////4
  {path:'/saleOrderCard/:id',component:SaleOrderCard,name:'SaleOrderCard'},
  {path:'/saleOrderCard1/:id',component:SaleOrderCard1,name:'SaleOrderCard1'},
  {path:'/saleOrderList',component:SaleOrderList,name:'SaleOrderList'},
  {path:'/saleOrderOverview/:id',component:PrintableOrderLayout,name:'PrintableOrderLayout'},
  {path:'/saleOrderOverview1/:id',component:PrintableOrderLayout1,name:'PrintableOrderLayout1'},
  {path:'/SaleQuoteCard/:id',component:SaleQuoteCard,name:'SaleQuoteCardPage'},
  {path:'/SaleQuoteList',component:SaleQuoteList,name:'SaleQuoteListPage'},
  {path:'/PONewOrder',component:POOrderCreation,name:'POOrderCreation'},

  ///////////////////5
  //{path:'/NewCustomer',component:NewCustomer,name:'NewCustomerPage'},
  {path:'/NewContact',component:NewContact,name:'NewContactPage'},
  {path:'/NewLead',component:NewLead,name:'NewLeadPage'},
  {path:'/NewShipToAddress',component:NewShipToAddress,name:'NewShipToAddressPage'},

  ///////////////////6
  {path:'/NewSaleQuote',component:NewSaleQuote,name:'NewSaleQuotePage'},
  {path:'/NewSaleOrder',component:NewSaleOrder,name:'NewSaleOrderPage'},
  

  ///////////////////7
  {path:'/RevisionRequestCard/:id',component:RevisionRequestCard,name:'RevisionRequestCardPage'},
  {path:'/RevisionRequestList',component:RevisionRequestList,name:'RevisionRequestListPage'},
  {path:'/DiscountRequestCard/:id',component:DiscountRequestCard,name:'DiscountRequestCardPage'},
  {path:'/NewDiscountRequest',component:NewDiscountResquest,name:'NewDiscountRequestrPage'},
  {path:'/DiscountRequestList',component:DiscountRequestList,name:'DiscountRequestListPage'},
  {path:'/ReleaseRequestCard/:id',component:ReleaseRequestCard,name:'ReleaseRequestCardPage'},
  {path:'/',component:ReleaseRequestList,name:'ReleaseRequestListPage'},

  ///////////////////8ReleaseRequestList
  {path:'/STP2_Sales',component:SPT2_SalesContainer,name:'SPT2_SalesContainerPage'},
  
  ///////////////////9
  {path:'/CreditRequestCard/:id',component:CreditRequestCard,name:'CreditRequestCardPage'},
  {path:'/CreditRequestList',component:CreditRequestList,name:'CreditRequestListPage'},
  {path:'/NewCreditRequest',component:NewCreditRequest,name:'NewCreditRequestPage'},
 

  ///////////////////10
  {path:'/RepossessionRequestCard/:id',component:RepossessionRequestCard,name:'RepossessionRequestCardPage'},
  {path:'/RepossessionRequestList',component:RepossessionRequestList,name:'RepossessionRequestListPage'},
  {path:'/AssignedDebtCard/:id',component:AssignedDebtCard,name:'AssignedDebtCardPage'},
  {path:'/AssignedDebtList',component:AssignedDebtList,name:'AssignedDebtListPage'},
  {path:'/PaymentPromiseCard/:id',component:PaymentPromiseCard,name:'PaymentPromiseCardPage'},
  {path:'/PaymentPromiseList',component:PaymentPromiseList,name:'PaymentPromiseListPage'},
  {path:'/RecoveryActivityCard/:id',component:RecoveryActivityCard,name:'RecoveryActivityCardPage'},
  {path:'/RecoveryActivityList',component:RecoveryActivityList,name:'RecoveryActivityListPage'},

  ///////////////////11
  {path:'/NewRepossessionRequest',component:NewRepossessionRequest,name:'NewRepossessionRequestPage'},
  {path:'/NewDebtCollection',component:NewDebtCollection,name:'NewDebtCollectionPage'},
  
  {path:'/DebtCollectionList',component:DebtCollectionList,name:'DebtCollectionListPage'},
  {path:'/DebtCollectionCard/:id',component:DebtCollectionCard,name:'DebtCollectionCardPage'},
  {path:'/ReceivablesList',component:ReceivablesList,name:'ReceivablesListPage'},
  {path:'/ReceivablesCard/:id',component:ReceivablesCard,name:'ReceivablesCardPage'},
  {path:'/PaymentValidationRequestList',component:PaymentValidationRequestList,name:'PaymentValidationRequestListPage'},
  {path:'/PaymentValidationRequestCard/:id',component:PaymentValidationRequestCard,name:'PaymentValidationRequestCardPage'},
  {path:'/NewPaymentValidationRequest',component:NewPaymentValidationRequest,name:'NewPaymentValidationRequestPage'},
  

   ///////////////////12
  {path:'/CreditContractList',component:CreditContractList,name:'CreditContractListListPage'},
  {path:'/CreditContractCard',component:CreditContractCard,name:'CreditContractCardCardPage'},
  {path:'/NewGoupBuyContract',component:NewGoupBuyContract,name:'NewGoupBuyContractPage'},
  



];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;


