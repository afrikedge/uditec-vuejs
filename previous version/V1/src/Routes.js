import { createWebHistory, createRouter } from "vue-router"
import SalesHome from './components/SalesHome'
import Login from './components/LoginPage'
import SaleOrderCard from './components/SaleOrderCard.vue'
import SaleQuoteCard from './components/SaleQuoteCard.vue'
import SaleOrderCard1 from './components/SaleOrderCard1.vue'
import SaleOrderList from './components/SaleOrderList.vue'
import SaleQuoteList from './components/SaleQuoteList.vue'
import NewSaleQuote from './components/NewSaleQuote.vue'
import PrintableOrderLayout from './components/PrintableOrderLayout.vue'
import PrintableOrderLayout1 from './components/PrintableOrderLayout1.vue'
import POOrderCreation from './components/POOrderCreation.vue'
import CustomerList from './components/CustomerList.vue'
import CustomerCard from './components/CustomerCard.vue'
import ItemList from './components/ItemList.vue'
import ItemCard from './components/ItemCard.vue'
import ProspectList from './components/ProspectList.vue'
import ProspectCard from './components/ProspectCard.vue'
import ContactList from './components/ContactList.vue'
import ContactCard from './components/ContactCard.vue'
import ShipToAddressList from './components/ShipToAddressList.vue'
import ShipToAddressCard from './components/ShipToAddressCard.vue'

import RevisionRequestList from './components/RevisionRequestList.vue'
import RevisionRequestCard from './components/RevisionRequestCard.vue'
import DiscountRequestList from './components/RevisionRequestList.vue'
import DiscountRequestCard from './components/RevisionRequestCard.vue'
import ReleaseRequestList from './components/RevisionRequestList.vue'
import ReleaseRequestCard from './components/RevisionRequestCard.vue'

import ItemAvailibilityPerStore from './components/ItemAvailabilityPerStore.vue'


const routes = [
    {path:'/login',component:Login,name:'login'},
    {path:'/',component:SalesHome,name:'SalesHome'},
    {path:'/saleOrderCard/:id',component:SaleOrderCard,name:'SaleOrderCard'},
    {path:'/saleOrderCard1/:id',component:SaleOrderCard1,name:'SaleOrderCard1'},
    {path:'/saleOrderList',component:SaleOrderList,name:'SaleOrderList'},
    {path:'/saleOrderOverview/:id',component:PrintableOrderLayout,name:'PrintableOrderLayout'},
    {path:'/saleOrderOverview1/:id',component:PrintableOrderLayout1,name:'PrintableOrderLayout1'},
    {path:'/SaleQuoteCard/:id',component:SaleQuoteCard,name:'SaleQuoteCardPage'},
    {path:'/SaleQuoteList',component:SaleQuoteList,name:'SaleQuoteListPage'},
    {path:'/NewSaleQuote',component:NewSaleQuote,name:'NewSaleQuotePage'},
    {path:'/PONewOrder',component:POOrderCreation,name:'POOrderCreation'},
    {path:'/CustomerList',component:CustomerList,name:'CustomerListPage'},
    {path:'/CustomerCard/:id',component:CustomerCard,name:'CustomerCardPage'},
    {path:'/ItemList',component:ItemList,name:'itemListPage'},
    {path:'/ItemCard/:id',component:ItemCard,name:'ItemCardPage'},
    {path:'/ProspectList',component:ProspectList,name:'ProspectListPage'},
    {path:'/ProspectCard/:id',component:ProspectCard,name:'ProspectCardPage'},
    {path:'/ContactList/:id',component:ContactList,name:'ContactListPage'},
    {path:'/ContactCard/:id1/:id2',component:ContactCard,name:'ContactCardPage'},
    {path:'/ShipToAddressList/:id',component:ShipToAddressList,name:'ShipToAddressListPage'},
    {path:'/ShipToAddressCard/:id1/:id2',component:ShipToAddressCard,name:'ShipToAddressCardPage'},
    {path:'/RevisionRequestCard/:id',component:RevisionRequestCard,name:'RevisionRequestCardPage'},
    {path:'/RevisionRequestList',component:RevisionRequestList,name:'RevisionRequestListPage'},
    {path:'/DiscountRequestCard/:id',component:DiscountRequestCard,name:'DiscountRequestCardPage'},
    {path:'/DiscountRequestList',component:DiscountRequestList,name:'DiscountRequestListPage'},
    {path:'/ReleaseRequestCard/:id',component:ReleaseRequestCard,name:'ReleaseRequestCardPage'},
    {path:'/ReleaseRequestList',component:ReleaseRequestList,name:'ReleaseRequestListPage'},
    {path:'/ItemAvailibilityPerStore/:id',component:ItemAvailibilityPerStore,name:'ItemAvailibilityPerStorePage'},

];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
export default router;


