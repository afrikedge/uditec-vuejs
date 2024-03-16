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
                       
            <div class="navbar-menu " style="border-bottom: 1px solid rgba(128, 128, 128, 0.175);margin-left: 5%;margin-right: 5%;">
                <div class="navbar-start p-0">
                    <a class="navbar-item">
                        <img src="../assets/images/cosmos_logo.jpeg">
                    </a>
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
                    <a class="navbar-item has-text-orangered">
                      <span class="icon">
                        <i class="far fa-comment fa-2x"></i>
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
        <div id="navbarBasicExample" class="navbar-menu is-active">
            <div>
                <div class="tabs is-boxed">
                    <ul>
                        <li :class="{'is-active':store.activeTab=='dashboard'}">
                            <a @click="store.setActiveTab('dashboard')" :class="{'has-text-orange':store.activeTab=='dashboard'}">
                              <span class="icon is-small"><i class="fas fa-gauge" aria-hidden="true"></i></span>
                              <span>Dashboard</span>
                            </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='customers'}">
                          <a @click="store.setActiveTab('customers')" :class="{'has-text-orange':store.activeTab=='customers'}">
                            <span class="icon is-small"><i class="fas fa-user" aria-hidden="true"></i></span>
                            <span>Clients</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='prospects'}">
                          <a @click="store.setActiveTab('prospects')" :class="{'has-text-orange':store.activeTab=='prospects'}">
                            <span class="icon is-small"><i class="fas fa-user-plus" aria-hidden="true"></i></span>
                            <span>Prospects</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='saleOrders'}">
                          <a @click="store.setActiveTab('saleOrders')" :class="{'has-text-orange':store.activeTab=='saleOrders'}">
                            <span class="icon is-small"><i class="fas fa-coins" aria-hidden="true"></i></span>
                            <span>Commandes vente</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='saleQuotes'}">
                          <a @click="store.setActiveTab('saleQuotes')" :class="{'has-text-orange':store.activeTab=='saleQuotes'}">
                            <span class="icon is-small"><i class="fas fa-coins" aria-hidden="true"></i></span>
                            <span>Devis vente</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='items'}">
                          <a @click="store.setActiveTab('items')" :class="{'has-text-orange':store.activeTab=='items'}">
                            <span class="icon is-small"><i class="fas fa-mobile-screen" aria-hidden="true"></i></span>
                            <span>Articles</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='discountRequests'}">
                          <a @click="store.setActiveTab('discountRequests')" :class="{'has-text-orange':store.activeTab=='discountRequests'}">
                            <span class="icon is-small"><i class="fas fa-tag" aria-hidden="true"></i></span>
                            <span>Demandes de remise</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='releaseRequests'}">
                          <a @click="store.setActiveTab('releaseRequests')" :class="{'has-text-orange':store.activeTab=='releaseRequests'}">
                            <span class="icon is-small"><i class="fas fa-lock-open" aria-hidden="true"></i></span>
                            <span>Demandes de déblocage</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='revisionRequests'}">
                          <a @click="store.setActiveTab('revisionRequests')" :class="{'has-text-orange':store.activeTab=='revisionRequests'}">
                            <span class="icon is-small"><i class="fas fa-pen-to-square" aria-hidden="true"></i></span>
                            <span class="">Demandes de révision</span>
                          </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='history'}">
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
