<template>
    <div class="">
        <nav class="navbar p-0 is-transparent has-centered-logo-alt" role="navigation" aria-label="main navigation">
            <div class="navbar-brand is-hidden-desktop">
                <span class="navbar-item">
                    <a class="navbar-item">
                        <img src="../assets/images/cosmos_logo.jpeg" width="80">
                    </a>
                    <div class="field">
                        <p class="control has-icons-left ">
                          <input class="input is-small has-background-light is-rounded" type="text" placeholder="Rechercher">
                          <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                          </span>
                        </p>
                    </div>
                </span>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
                       
            <div class="navbar-menu " style="border-bottom: 1px solid rgba(128, 128, 128, 0.175);margin-left: 1%;margin-right: 1%;">
                <div class="navbar-start p-0">
                    <img class="navbar-item" src="../assets/images/cosmos_logo.jpeg" style="width: 270px;height: 80px;">
                </div>

                <div class="navbar-brand is-hidden-touch p-0">
                    <div class="field navbar-item">
                        <p class="control has-icons-left">
                          <input class="input has-background-light is-rounded" type="text" placeholder="Rechercher">
                          <span class="icon  is-left">
                            <i class="fas fa-search"></i>
                          </span>
                        </p>
                    </div>
                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div class="navbar-end p-0">
                    <a class="navbar-item has-text-grey">
                      <span class="subtitle">
                        David DJOUBOUI
                      </span>
                    </a>
                    <a class="navbar-item">
                      <figure class="image is-32x32">
                      <img src="../assets/images/gerald1.jpg" class="is-rounded">
                    </figure>
                    </a>
                </div>
            </div>
        </nav>

        <div class="has-text-left my-2">
            <a href="#"  @click="store.setActiveGroup('sales')" class=" m-2" :class="{'has-text-orange':store.activeGroup=='sales'}">
                <span class="subtitle is-6 mr-1">Ventes</span>
                <span class="icon is-small"><i class="fas fa-chevron-down" aria-hidden="true"></i></span>
            </a>
            <a href="#" @click="store.setActiveGroup('inventory')" class="m-2" :class="{'has-text-orange':store.activeGroup=='inventory'}">
                <span class="subtitle is-6 mr-1">Stock</span>
                <span class="icon is-small"><i class="fas fa-chevron-down" aria-hidden="true"></i></span>
            </a>
            <a href="#" @click="store.setActiveGroup('recovery')" class="m-2" :class="{'has-text-orange':store.activeGroup=='recovery'}">
                <span class="subtitle is-6 mr-1">Recouvrement</span>
                <span class="icon is-small"><i class="fas fa-chevron-down" aria-hidden="true"></i></span>
            </a>
            <a href="#" @click="store.setActiveGroup('others')" class="m-2" :class="{'has-text-orange':store.activeGroup=='others'}"> 
                <span class="subtitle is-6 mr-1">Autre</span>
                <span class="icon is-small"><i class="fas fa-chevron-down" aria-hidden="true"></i></span>
            </a>
        </div>

        <div class="has-text-left has-background-light" style="position:relative;left: 0px;right">
        </div>

        <div id="navbarBasicExample " class="navbar-menu is-active">
            <div>
                <div class="tabs is-boxed is-small">
                    <ul>
                        <li :class="{'is-active':store.activeTab=='dashboard'}">
                            <a @click="store.setActiveTab('dashboard')" :class="{'has-text-orange':store.activeTab=='dashboard'}">
                              <span class="icon is-small"><i class="fas fa-gauge" aria-hidden="true"></i></span>
                              <span>Dashboard</span>
                            </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='customers'}" v-if="store.activeGroup=='sales'">
                          <a @click="store.setActiveTab('customers')" :class="{'has-text-orange':store.activeTab=='customers'}">
                            <span class="icon is-small"><i class="fas fa-user" aria-hidden="true"></i></span>
                            <span>Clients</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='contacts'}" v-if="store.activeGroup=='sales'">
                          <a @click="store.setActiveTab('contacts')" :class="{'has-text-orange':store.activeTab=='contacts'}">
                            <span class="icon is-small"><i class="fas fa-user-plus" aria-hidden="true"></i></span>
                            <span>Contacts</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='prospects'}" v-if="store.activeGroup=='sales'">
                          <a @click="store.setActiveTab('prospects')" :class="{'has-text-orange':store.activeTab=='prospects'}">
                            <span class="icon is-small"><i class="fas fa-user-plus" aria-hidden="true"></i></span>
                            <span>Prospects</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='items'}" v-if="store.activeGroup=='sales' || store.activeGroup=='inventory' ">
                          <a @click="store.setActiveTab('items')" :class="{'has-text-orange':store.activeTab=='items'}">
                            <span class="icon is-small"><i class="fas fa-mobile-screen" aria-hidden="true"></i></span>
                            <span>Articles</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='inventoryAvailability'}" v-if="store.activeGroup=='inventory' ">
                          <a @click="store.setActiveTab('inventoryAvailability')" :class="{'has-text-orange':store.activeTab=='inventoryAvailability'}">
                            <span class="icon is-small"><i class="fas fa-mobile-screen" aria-hidden="true"></i></span>
                            <span>Disponibilité stock</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='saleOrders'}" v-if="store.activeGroup=='sales'">
                          <a @click="store.setActiveTab('saleOrders')" :class="{'has-text-orange':store.activeTab=='saleOrders'}">
                            <span class="icon is-small"><i class="fas fa-cart-shopping" aria-hidden="true"></i></span>
                            <span>Commandes vente</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='saleQuotes'}" v-if="store.activeGroup=='sales'">
                          <a @click="store.setActiveTab('saleQuotes')" :class="{'has-text-orange':store.activeTab=='saleQuotes'}">
                            <span class="icon is-small"><i class="fas fa-coins" aria-hidden="true"></i></span>
                            <span>Devis vente</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='creditRequests'}" v-if="store.activeGroup=='sales'">
                          <a @click="store.setActiveTab('creditRequests')" :class="{'has-text-orange':store.activeTab=='creditRequests'}">
                            <span class="icon is-small"><i class="fas fa-coins" aria-hidden="true"></i></span>
                            <span>Demande de crédit</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='repossessionRequests'}" v-if="store.activeGroup=='recovery'">
                          <a @click="store.setActiveTab('repossessionRequests')" :class="{'has-text-orange':store.activeTab=='repossessionRequests'}">
                            <span class="icon is-small"><i class="fas fa-tag" aria-hidden="true"></i></span>
                            <span>Demandes de repossession</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='repossessionRequests'}" v-if="store.activeGroup=='recovery'">
                          <a @click="store.setActiveTab('repossessionRequests')" :class="{'has-text-orange':store.activeTab=='repossessionRequests'}">
                            <span class="icon is-small"><i class="fas fa-tag" aria-hidden="true"></i></span>
                            <span>Demandes de repossession</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='repossessionRequests'}" v-if="store.activeGroup=='recovery'">
                          <a @click="store.setActiveTab('repossessionRequests')" :class="{'has-text-orange':store.activeTab=='repossessionRequests'}">
                            <span class="icon is-small"><i class="fas fa-tag" aria-hidden="true"></i></span>
                            <span>Demandes de repossession</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='paymentPromises'}" v-if="store.activeGroup=='recovery'">
                          <a @click="store.setActiveTab('paymentPromises')" :class="{'has-text-orange':store.activeTab=='paymentPromises'}">
                            <span class="icon is-small"><i class="fas fa-tag" aria-hidden="true"></i></span>
                            <span>Promesse de règlement</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='recoveryActivities'}" v-if="store.activeGroup=='recovery'">
                          <a @click="store.setActiveTab('recoveryActivities')" :class="{'has-text-orange':store.activeTab=='recoveryActivities'}">
                            <span class="icon is-small"><i class="fas fa-tag" aria-hidden="true"></i></span>
                            <span>Activité recouvrement</span>
                          </a>
                        </li>


                        <!---li :class="{'is-active':store.activeTab=='discountRequests'}" v-if="store.activeGroup=='others'">
                          <a @click="store.setActiveTab('discountRequests')" :class="{'has-text-orange':store.activeTab=='discountRequests'}">
                            <span class="icon is-small"><i class="fas fa-tag" aria-hidden="true"></i></span>
                            <span>Demandes de remise</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='releaseRequests'}" v-if="store.activeGroup=='others'">
                          <a @click="store.setActiveTab('releaseRequests')" :class="{'has-text-orange':store.activeTab=='releaseRequests'}">
                            <span class="icon is-small"><i class="fas fa-lock-open" aria-hidden="true"></i></span>
                            <span>Demandes de déblocage</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='revisionRequests'}" v-if="store.activeGroup=='others'">
                          <a @click="store.setActiveTab('revisionRequests')" :class="{'has-text-orange':store.activeTab=='revisionRequests'}">
                            <span class="icon is-small"><i class="fas fa-pen-to-square" aria-hidden="true"></i></span>
                            <span class="">Demandes de révision</span>
                          </a>
                        </li---->
                        <li :class="{'is-active':store.activeTab=='history'}" v-if="store.activeGroup=='others'">
                          <a @click="store.setActiveTab('history')" :class="{'has-text-orange':store.activeTab=='history'}">
                            <span class="icon is-small"><i class="fas fa-clock-rotate-left" aria-hidden="true"></i></span>
                            <span>Historique</span>
                          </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>         
    </div>
</template>
<script setup>

  import {useNavigationTabStore} from '@/Stores/NavigationTab'

  const store = useNavigationTabStore()

</script>

<style>
#navbarBasicExample{
    overflow-x: scroll;
}

#navbarBasicExample::-webkit-scrollbar{
  display: none;
}
.has-text-orangered span{
    color: orangered;

}
.has-text-orange span{
    color: orange;

}
</style>
