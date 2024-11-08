<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <contact-list-ribbon 
        pageTitle="Contacts"
        componentwithPresentationView="contactListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onDeleteSearchData="()=>this.eltToSearch=''"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="contactListRightInfoMaxWidth"
        routeForNewCard="NewContact"
        :newCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        ></contact-list-ribbon>
  
  
      <div class="has-background-light columns is-gapless" style="overflow-y: hidden;height:auto;position: fixed;bottom:0px;top:200px; width:auto;right:6%;left:6%">
          <div class="loading_container" style="width:100%;" v-if="!res_fetching_data_occur && !error_fetching_data_occur">
              <progress class="progress is-large is-light my-1" max="100" v-for="i of 100" :key="i" style="border-radius: 0px;">15%</progress>
          </div>
          <div class="column is-narrow " style="margin: auto;" v-if="error_fetching_data_occur">
              <article class="message is-danger">
                  <div class="message-header">
                      <p>Error</p>
                      <button class="delete" aria-label="delete"></button>
                  </div>
                  <div class="message-body">
                      L'application n'a pas pu obtenir de résultat 
                  </div>
              </article>
          </div>
          <div class="column is-narrow " style="margin-left: auto;margin-right: auto;" v-if="filteredContactList.length == 0 && res_fetching_data_occur">
              Aucun enregistrement n'a été trouvé
          </div>
          <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="res_fetching_data_occur && filteredContactList.length > 0 && presentationView=='list' && !error_fetching_data_occur">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="">Code</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Titre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Nom complet</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Ville</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Téléphone</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Téléphone Mobile</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">E-mail</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Fonction</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="contact['No_']" v-for="contact of dividedContactList" :key="contact['No_']" @mouseover="setLineShadow(contact['No_'])" @mouseout="removeLineShadow(contact['No_'])" @click="selectLine(contact['No_'])">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/ContactCard/${ contact['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ contact['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ contact['Salutation Code'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ contact['Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ contact['City'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ contact['Phone No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ contact['Mobile Phone No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ contact['E-Mail'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ contact['Job Title'] }}</td>
                           
                        </tr>
                    </tbody>
                </table>
          </div>
          <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && filteredContactList.length > 0 && presentationView=='mosaique' && !error_fetching_data_occur">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="contact of dividedContactList" :key="contact['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                          <router-link :to="`/ContactCard/${ contact['No_'] }`">
                                              <a href="#" class="has-text-orange">
                                                  {{ contact['No_'] }} 
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
          <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && filteredContactList.length > 0 && presentationView=='mosaique haute' && !error_fetching_data_occur">
                <div class="columns is-multiline is-gapless">
                    <div :class="{'column':true, 'is-2':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="contact of dividedContactList" :key="contact['No_']">
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
                                        
                                                  <router-link :to="`/ContactCard/${ contact['No_'] }`">
                                                      <a href="#" class="has-text-orange">
                                                          {{ contact['No_'] }} 
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
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredContactList.length) && (currentPage !== Math.ceil(filteredContactList.length/pageSize))">
          <a href="#" class="button is-small has-text-white has-background-orange"
              @click="pageSize = pageSize + 20">
              Charger plus
          </a>
      </div>
      <div style="position: absolute; top: 50%; bottom: 50%; left:10px" v-if="currentPage > 1"> 
          <a href="#" @click="prevPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
              <span class="icon">
                  <i class="fas fa-chevron-left"></i>
              </span>                
          </a>
      </div>
      <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredContactList.length">
          <a href="#" @click="nextPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
              <span class="icon">
                  <i class="fas fa-chevron-right"></i>
              </span>                
          </a>
      </div>
    
  </template>
  
  <script scoped>
  import CustomerInfo from './CustomerInfo.vue'
  import ContactListRibbon from './RibbonForLists.vue'
  import axios from 'axios'
  import {computed ,onBeforeMount,ref } from 'vue'
  import { useNavigationTabStore } from '@/Stores/NavigationTab'
  import { useRouter } from 'vue-router'
  
  
  export default {
  
    name:'contact-list',
    components:{
        CustomerInfo,ContactListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['contactListPresentation']
        }
    },
    setup() {
          const hostname = window.location.hostname
          const router = useRouter()
          const contactList = ref([])
  
  
  //Gestion de la recherche
          const eltToSearch = ref('')
          const filteredContactList = computed(()=>
          contactList.value
              .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value)
                      || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value)
                      || new String(row['Name']).toLowerCase().includes(eltToSearch.value)
              ),
          )
  
  
  //Gestion de la pagination
          const currentPage = ref(1)
          const pageSize = ref(40)
          const dividedContactList = computed(()=>{
              if(eltToSearch.value){
                  return filteredContactList.value
                  .filter((row, index) => {
                      let start = (0)*pageSize.value;
                      let end = currentPage.value*pageSize.value;
                      if(index >= start && index < end) return true;
                  })
              }else {
                  return filteredContactList.value
                      .filter((row, index) => {
                          let start = (currentPage.value-1)*pageSize.value;
                          let end = currentPage.value*pageSize.value;
                          if(index >= start && index < end) return true;
                      })
              }
          })
          function nextPage(){
              if((currentPage.value*pageSize.value) < filteredContactList.value.length) currentPage.value++;
          }
          function prevPage(){
              if(currentPage.value > 1) currentPage.value--
          }
  
  
  
  //Gestion de la récupération de la liste des contrats à afficher
          const res_fetching_data_occur = ref(false)
          const error_fetching_data_occur = ref(false)
          function getContactList(){
              axios.get(`http://${hostname}:5000/app/getContactList`)
              .then((result) => {
                  contactList.value = result.data.recordset;
                  res_fetching_data_occur.value = true
                  if(contactList.value.length > 0)
                      setTimeout(()=>selectLine(contactList.value[0]['No_']),1000)
              })
              .catch(()=>{
                  error_fetching_data_occur.value = true
              });
          }
  
  
  //Gestion de la sélection d'une ligne
          const selectedLine = ref('')
          function displaySelectedLineCard(){
              if(selectedLine.value)
                  router.push(`contactCard/${selectedLine.value}`)
          }
          function selectLine(id){
              if(selectedLine.value){
                  const myElt=document.getElementById(selectedLine.value)
                  if(myElt){
                      const children =  myElt.childNodes
                      children.forEach(element => {
                          if(element.classList){
                              element.classList.add('has-background-light')
                              element.classList.remove('has-background-orange-light')
                          }
                      })
                  }
              }
              selectedLine.value=id
              const myElt=document.getElementById(id)
              if(myElt){
                  const  children =  myElt.childNodes
                  children.forEach(element => {
                      if(element.classList){
                          element.classList.remove('has-background-light')
                          element.classList.add('has-background-orange-light')
                      }
                  })
              }
          }
  
  
  
  //Gestion des évènements, erreurs et trigger
          onBeforeMount(() => {
              getContactList()
          })
  
  
          // expose to template and other options API hooks
          return {
              contactList,eltToSearch,filteredContactList,
              dividedContactList,pageSize,currentPage,nextPage,prevPage,
              selectedLine,selectLine,displaySelectedLineCard,
              res_fetching_data_occur,error_fetching_data_occur
          }
    },
    data(){
        return {
          contactId: this.$route.params.id,
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerListRightInfoMaxWidth,      
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
    },
    
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
  .has-background-orange-light{
      background-color: rgba(255, 155, 118, 0.332);
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
    top: 0px; /* table head will be placed from the top of the table and sticks to it */
      z-index: 15000;
  }
  .is-hovered-td{
      position: relative;
      top:1px;
      z-index: 1000;
  }
  </style>
  