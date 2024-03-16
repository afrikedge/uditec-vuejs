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
import NewCustomer from './components/NewCustomer.vue'
import NewLead from './components/NewLead.vue'
import NewContact from './components/NewContact.vue'
import NewShipToAddress from './components/NewShipToAddress.vue'

//6-----composants de formulaire de création documents vente
import NewSaleQuote from './components/NewSaleQuote.vue'
import NewSaleOrder from './components/NewSaleOrder.vue'



//7-----Autres
import RevisionRequestList from './components/RevisionRequestList.vue'
import RevisionRequestCard from './components/RevisionRequestCard.vue'
import DiscountRequestList from './components/RevisionRequestList.vue'
import DiscountRequestCard from './components/RevisionRequestCard.vue'
import ReleaseRequestList from './components/RevisionRequestList.vue'
import ReleaseRequestCard from './components/RevisionRequestCard.vue'



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
  {path:'/NewCustomer',component:NewCustomer,name:'NewCustomerPage'},
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
  {path:'/DiscountRequestList',component:DiscountRequestList,name:'DiscountRequestListPage'},
  {path:'/ReleaseRequestCard/:id',component:ReleaseRequestCard,name:'ReleaseRequestCardPage'},
  {path:'/ReleaseRequestList',component:ReleaseRequestList,name:'ReleaseRequestListPage'},



];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;


