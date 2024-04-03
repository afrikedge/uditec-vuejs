<template>
    <div class="">
        <nav class="navbar p-0 is-transparent has-centered-logo-alt" role="navigation" aria-label="main navigation">
            <div class="navbar-brand is-hidden-desktop">
                <span class="navbar-item">
                    <a class="navbar-item">
                        <img src="../assets/images/sport_2000.jpeg" width="80">
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
                    <figure class="image is-96x96">
                    <img class="navbar-item" src="../assets/images/sport_2000.jpeg">
                    </figure>
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
                        DAVID Djouboui
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
                        <li :class="{'is-active':store.activeTab=='saleOrder'}">
                            <a @click="store.setActiveTab('saleOrder')" :class="{'has-text-orange':store.activeTab=='saleOrder'}">
                              <span class="icon is-small"><i class="fas fa-cart-shopping" aria-hidden="true"></i></span>
                              <span>Commande vente</span>
                            </a>
                        </li>
                        <li :class="{'is-active':store.activeTab=='saleOrderPayment'}">
                          <a @click="store.setActiveTab('saleOrderPayment')" :class="{'has-text-orange':store.activeTab=='saleOrderPayment'}">
                            <span class="icon is-small"><i class="fas fa-money-bill-1-wave" aria-hidden="true"></i></span>
                            <span>Encaissement</span>
                          </a>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>         
    </div>
</template>
<script setup>

  import {useNavigationTabStore} from '@/Stores/SPT2_NavigationTab'

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
