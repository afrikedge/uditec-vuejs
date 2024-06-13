<template>
  <div class="my-5 mx-5">
      
      <customer-list-ribbon 
      pageTitle="Contact"
      componentwithPresentationView="customerListPresentation"
      :hasAThirdPresentation="true"
      @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
      @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
      componentWithCompInfo="customerListRightInfoMaxWidth"
      routeForNewCard="NewContact"
      ></customer-list-ribbon>


      <div class="has-background-light columns" style="height: 750px;">
          <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
              <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                  <thead class=" my-2">
                      <tr> 
                          <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° Client</th>
                          <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Titre</th>
                          <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code contact</th>
                          <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Prénom</th>
                          <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Nom complet</th>
                          <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Ville</th>
                          <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Téléphone</th>
                          <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">E-mail</th>
                      </tr>   
                  </thead>
                  <tbody>
                      <tr id="" v-for="contact of filteredcontactList" :key="contact['Customer No_']" class="is-narrow">
                          <td class="has-text-left has-background-light"> 
                              <router-link :to="`/ContactCard/${ contact['Customer No_'] }`">
                                  <a href="#" class="has-text-orange">
                                      {{ contact['Customer No_'] }} 
                                  </a>
                              </router-link>
                          </td>
                          <td class="has-text-left has-background-light is-narrow"> {{ contact['Customer No_'] }}</td>
                          <td class="has-text-left has-background-light is-narrow"> {{ contact['Salutation Code'] }}</td>
                          <td class="has-text-left has-background-light is-narrow"> {{ contact['No_']}}</td>
                          <td class="has-text-left has-background-light is-narrow"> {{ contact['First Name']}}</td>
                          <td class="has-text-left has-background-light is-narrow"> {{ contact['Name'] }}</td>
                          <td class="has-text-left has-background-light is-narrow"> {{ contact['City'] }}</td>
                          <td class="has-text-left has-background-light is-narrow"> {{ contact['Phone No_'] }}</td>
                          <td class="has-text-left has-background-light is-narrow"> {{ contact['E-Mail'] }}</td>
                         
                      </tr>
                  </tbody>
              </table>
          </div>
          <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
              <div class="columns is-multiline">
                  <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="contact of filteredcontactList" :key="contact['No_']">
                      <div class=" columns p-1 card-is-hoverable">
                          <div class="column is-narrow has-background-white">
                              <figure class="image is-64x64">
                                  <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                              </figure>
                          </div>
                          <div class="column has-background-white card-is-hoverable">
                              <p class="has-text-left ">
                                  <span class="is-size-7 has-text-grey has-background-light">
                                      
                                      <router-link :to="`/ContactCard/${ contact['Customer No_'] }`">
                                          <a href="#" class="has-text-orange">
                                              {{ contact['Customer No_'] }} 
                                          </a>
                                      </router-link>
                          
                                  </span>
                              </p>
                              <div class="has-text-left columns">
                                  <div class="column has-text-left has-text-orange py-0 mt-1" >
                                      <span class="is-size-7 is-underlined">{{ contact['Name'] }}</span>
                                  </div>
                                  <div class="column has-text-right is-narrow py-0 mt-1">
                                      <span class="is-size-7">{{ contact['Phone No_'] }}</span>
                                  </div>
                              </div>
                              <div class="has-text-left columns">
                                  <div class="column has-text-left py-0" >
                                      <span class="is-size-7">{{ contact['City'] }}</span>
                                  </div>
                                  <div class="column has-text-right is-narrow py-0">
                                      <span class="is-size-7">{{ contact['Address'] }}</span>
                                  </div>
                              </div>
                          </div>
                          <a class="column is-narrow has-background-orange is-flex ">
                              <span class="is-align-self-center has-text-white">...</span>

                          </a>
                      </div>
                  </div>
              </div>
          </div>
          <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique haute'">
              <div class="columns is-multiline is-gapless">
                  <div :class="{'column':true, 'is-2':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="contact of filteredcontactList" :key="contact['No_']">
                      <div class="has-background-white m-1">
                          <div class="card-is-hoverable box">
                              <div class="">
                                  <div class="has-text-left">
                                      <a href="#">
                                          <span class="py-0">...</span>
                                      </a>
                                  </div>
                                  <div class="is-flex is-justify-content-center">
                                      <figure class="image is-128x128">
                                          <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                      </figure>
                                  </div>
                                  <hr class="rounded">
                                  <div class="">
                                      <p class="has-text-left ">
                                          <span class="is-size-7 has-text-grey has-background-light">
                                      
                                              <router-link :to="`/ContactCard/${ contact['Customer No_'] }`">
                                                  <a href="#" class="has-text-orange">
                                                      {{ contact['Customer No_'] }} 
                                                  </a>
                                              </router-link>
                          
                                          </span>
                                      </p>
                                      <div class="has-text-left columns">
                                          <div class="column has-text-left has-text-orange py-0 mt-1" >
                                              <span class="is-size-7 is-underlined">{{ contact['Name]'] }}</span>
                                          </div>
                                          <div class="column has-text-right is-narrow py-0 mt-1">
                                              <span class="is-size-7">{{ contact['Phone No_'] }}</span>
                                          </div>
                                      </div>
                                      <div class="has-text-left columns">
                                          <div class="column has-text-left py-0" >
                                              <span class="is-size-7">{{contact['City']}}</span>
                                          </div>
                                          <div class="column has-text-right is-narrow py-0">
                                              <span class="is--size-7">{{ contact['Address'] }}</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
          
                          </div>
                      </div>
                      </div>
              </div>
          </div>
          <customer-info class="customer-info"></customer-info>
      </div>
  </div>
  
</template>

<script scoped>
import CustomerInfo from './CustomerInfo.vue'
import CustomerListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'


export default {

  name:'contact-list',
  components:{
      CustomerInfo,CustomerListRibbon
  },
  computed:{
      presentationView(){
          return useNavigationTabStore().presentationForPageList['customerListPresentation']
      }
  },
  setup() {
      const contactList = ref([])
      const eltToSearch = ref('')
      const filteredcontactList = computed(()=>
      contactList.value
      .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value)
              || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value)
              || new String(row['Name']).toLowerCase().includes(eltToSearch.value)
              || new String(row['Activity Type']).toLowerCase().includes(eltToSearch.value)
      ),
   )
      // expose to template and other options API hooks
      return {
          contactList,
          eltToSearch,
          filteredcontactList
      }
  },
  data(){
      return {
        contactId: this.$route.params.id,
          //taille (largeur) initiale du composant customerInfo
          customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerListRightInfoMaxWidth,
          
          //nom de l'hote dans l'url 
          hostname:window.location.hostname       
      }
  },
  methods:{
      /////////////////////////methode pour masquer ou afficher le composant info à droite
      hideOrShowComponentInfo(){
          if(this.customerInfoCompMaxWidth=='0px') {
              useNavigationTabStore().setMaxWidth('customerListRightInfoMaxWidth','800px')
              this.customerInfoCompMaxWidth='800px'
          }
          else {
              useNavigationTabStore().setMaxWidth('customerListRightInfoMaxWidth','0px')
              this.customerInfoCompMaxWidth='0px'
          }
      },

  },
  
  mounted(){
      axios.get(`http://${this.hostname}:3000/app/getContactList`)
      .then((result) => {
        this.contactList = result.data.recordset;
        console.log(result.data)
      })
      .catch(err=>console.log(err));
    
  }
}

</script>

<style scoped>
.customer-info{
  max-width: v-bind(customerInfoCompMaxWidth);
  transition: max-width 0.5s;
}
.has-text-orange{
  color: orange;
}
.has-text-orangered{
  color: orangered;
}
.has-background-orange{
  background-color: rgb(255, 155, 118);
}
.has-background-orange:hover {
  background-color: rgb(255, 68, 0);
}
.card-is-hoverable:hover{
  background-color: rgba(255, 68, 0, 0.068)
}
hr.rounded {
border-top: 8px solid #bbb;
border-radius: 5px;
}
.tableFixHead thead th {
  position: sticky; /* make the table heads sticky */
  top: -15px; /* table head will be placed from the top of the table and sticks to it */
}

</style>
