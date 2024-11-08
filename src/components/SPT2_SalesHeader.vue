<template>
  <div class="">
      <nav class="navbar p-0 is-transparent has-centered-logo-alt" role="navigation" aria-label="main navigation">
          <div class="navbar-brand is-hidden-desktop">
              <span class="navbar-item">
                  <a class="navbar-item">
                      <img src="../assets/images/sport_2000.jpg" width="80">
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
                      <img class="navbar-item" src="../assets/images/sport_2000.jpg">
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
                  <a class="navbar-item has-text-grey mt-5 p-0" >
                      <div class="has-text-right">
                          <span class="subtitle is-6 mx-1 px-2 mt-1 has-background-red-dark has-text-white" style="position: relative;top:3px;border-radius: 10px;"> {{ userData.name }}</span>
                          <span class="">
                              <img src="../assets/images/gerald1.jpg"  style="width:6%;border-radius: 100%;"> 
                          </span> 
                          <br>
                          <span class="mt-3 subtitle is-7" style="position: relative;top:10px">Point de vente : </span>
                          <span class="my-3 has-text-red-dark" style="position: relative;top:10px">{{ userData.defaultStoreCode }} - </span>
                          <span class="mt-3 has-text-red-dark" style="position: relative;top:10px">{{ userData.responsibilityCenterName }}</span>
                      </div>                       
                  </a>

                  <a class="navbar-item  has-text-grey ml-1" @click.prevent="logout">
                      <span class="icon is-small has-text-white has-background-danger shadow p-3" style="border-radius: 5px;">
                          <i class="fas fa-right-from-bracket"></i>
                      </span>
                  </a>

              </div>
          </div>
      </nav>
      <div id="navbarBasicExample" class="navbar-menu is-active">
          <div>
              <div class="tabs is-boxed">
                  <ul>
                      <li :class="{'is-active':store.activeTab=='saleOrder'}">
                          <a @click="store.setActiveTab('saleOrder')" :class="{'has-text-red-dark':store.activeTab=='saleOrder'}">
                            <span class="icon is-small"><i class="fas fa-cart-shopping" aria-hidden="true"></i></span>
                            <span>Commande vente</span>
                          </a>
                      </li>
                      <li :class="{'is-active':store.activeTab=='saleOrderPayment'}">
                        <a @click="store.setActiveTab('saleOrderPayment')" :class="{'has-text-red-dark':store.activeTab=='saleOrderPayment'}">
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

import {useSPT2NavigationTabStore} from '@/Stores/SPT2_NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo';
import { useRouter } from 'vue-router';


  const store = useSPT2NavigationTabStore()
  const userData = useWebUserInfoStore()
  const router = useRouter()

  function logout(){
    window.localStorage.removeItem("userData")
    router.push('/sp2000/login')
  }
</script>

<style>
#navbarBasicExample{
  overflow-x: scroll;
}

#navbarBasicExample::-webkit-scrollbar{
display: none;
}
.has-text-red-darkred span{
  color: orangered;

}
.has-text-red-dark span{
  color: #a20d01;
}
.has-text-red-dark{
  color: #a20d01;
}
.has-background-red-dark{
  background-color: #a20d01;
}
</style>
