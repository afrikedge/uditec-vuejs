<template>
  <div :class="{'modal':true , 'is-active': true }" >
      <div class="modal-background has-background-white" style="opacity:0.7">
      </div>
      <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:90%;">

<!---------Composant entête carte----------------------->      
          <div id="card-header-comp">
              <contact-card-Header :soNo="ContactCardId2" :soDesc="ContactCard['Name']" pageTitle="Fiche contact" 
              @onGoingBackToList='goBackToList'
              />
          </div>
          
<!---------Composant rubban Fiche contact----------------------->      
          <contact-card-ribbon
          @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
          @onCancellingUpdate="setReadWriteModeIsDisabled"
          :newCardBtnIsDisabled="false"
          :editCardBtnIsDisabled="false"
          :cancelEditCardBtnIsDisabled="true"
          :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
          routeForNewCard="../../NewContact"
          ></contact-card-ribbon>

<!---------Section formulaire Fiche contact----------------------->      
          <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
              <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire Fiche contact----------------------->                         
                   <div id="general">
                      <div class="columns has-border-bottom">
                          <div class="column p-0 has-text-left has-text-weight-bold">
                              <a @click="collapse('general_content');onglet1_expanded=!onglet1_expanded" v-if="onglet1_expanded">
                                  <span>Général</span>
                              </a>
                              <a @click="expand('general_content');onglet1_expanded=!onglet1_expanded" v-if="!onglet1_expanded">
                                  <span>Général</span>
                                  <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                  </span>
                              </a>
                          </div>
                          <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                      </div>
                      <div id="general_content" class="columns">
                          <div class="column">
                              <input-text labelInputText="N° client" :valueInputText="ContactCard['Customer No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-select labelInputText="N° client"  v-model="ContactCard['Customer No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select>
                              
                              <input-text labelInputText="Titre" :valueInputText="ContactCard['Salutation Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-select labelInputText="Titre" v-model="ContactCard['Salutation Code']" @openModal="activeModalForSelectableElementList='customerList'" v-else></input-select>
                              
                              <input-text labelInputText="Code contact" :valueInputText="ContactCard['No_']" :is_disabled="true" ></input-text>
                              
                              <input-text labelInputText="Prénom" :valueInputText="ContactCard['First Name']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="Prénom" v-model="ContactCard['First Name']"  v-else></input-text>
                             
                              
                              
                          </div>
                          <div class="column">
                             
                              <input-text labelInputText="Autre nom" :valueInputText="ContactCard['Middle Name']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="Autre nom" v-model="ContactCard['Middle Name']"  v-else></input-text>
                              
                              <input-text labelInputText="Nom" :valueInputText="ContactCard['Surname']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="Nom" v-model="ContactCard['Surname']"  v-else></input-text>
                              
                              <input-text labelInputText="Nom complet" :valueInputText="ContactCard['Name']" :is_disabled="true" ></input-text>

                              <input-text labelInputText="Photo" :valueInputText="ContactCard['Image']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text> 
                              <input-text labelInputText="Photo" v-model="ContactCard['Image']" v-else></input-text> 
                             
                              <input-text labelInputText="Fonction" :valueInputText="ContactCard['Job Title']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text> 
                              <input-text labelInputText="Fonction" v-model="ContactCard['Job Title']" v-else></input-text> 
                             
                          </div>
                      </div>                    
                  </div>
                  <br><br>
                  <!---------sous-Section ongle 2 formulaire Fiche contact----------------------->                         
                  <div id="details">
                      <div class="columns has-border-bottom">
                          <div class="column p-0 has-text-left has-text-weight-bold">
                              <a @click="collapse('details_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                  <span>Détails</span>
                              </a>
                              <a @click="expand('details_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                  <span>Détails</span>
                                  <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                  </span>
                              </a>
                          </div>
                          <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                      </div>
                      <div id="details_content" class="columns">
                          <div class="column">
                              <input-text labelInputText="Adresse : Ligne 1" :valueInputText="ContactCard['Address']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="Adresse : Ligne 1" v-model="ContactCard['Address']"  v-else></input-text>
                              
                              <input-text labelInputText="Adresse : Ligne 2" :valueInputText="ContactCard['Address 2']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="Adresse : Ligne 2" v-model="ContactCard['Address 2']"  v-else></input-text>
                             
                              <input-text labelInputText="Code postal" :valueInputText="ContactCard['Post Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="Code postal" v-model="ContactCard['Post Code']"  v-else></input-text>
                          </div>
                          <div class="column"> 
                              <input-text labelInputText="Ville" :valueInputText="ContactCard['City']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="Ville" v-model="ContactCard['City']"  v-else></input-text>
                              
                              <input-text labelInputText="Téléphone" :valueInputText="ContactCard['Phone No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="Téléphone" v-model="ContactCard['Phone No_']"  v-else></input-text>
                              
                              <input-text labelInputText="Téléphone Mobile" :valueInputText="ContactCard['Mobile Phone No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="Téléphone Mobile" v-model="ContactCard['Mobile Phone No_']"  v-else></input-text>
                              
                              <input-text labelInputText="E-mail" :valueInputText="ContactCard['E-Mail']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                              <input-text labelInputText="E-mail" v-model="ContactCard['E-Mail']"  v-else></input-text>
                              
                          </div>
                      </div>                    
                  </div>
                  <br><br>
              </div>
             
          </div>
      </div>
<!----------------------------------------------------------->
  <modal-for-selectable-customer-list 
          v-if="activeModalForSelectableElementList=='customerList'"  
          :isActive="activeModalForSelectableElementList=='customerList'" 
          @closeModal="activeModalForSelectableElementList=''" 
          @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
  </modal-for-selectable-customer-list>

  </div> 
</template>
<script>
import inputSelect from './input/input-select.vue'
import ContactCardHeader from './HeaderForCard.vue'
import ContactCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import axios from 'axios'
import { ref, watch} from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'


export default {
  name:'contact-card',
  components:{
      ContactCardHeader,inputText,
      ContactCardRibbon,
      ModalForSelectableCustomerList,
      inputSelect,
     
  },
  setup(){
      const ContactCard = ref({})
      const readOnlyModeIsDisabled = ref(false)
      const readOnlyMode = ref(true)
      
     
      
      //variable de success serveur
      let success_message=ref('')
      let is_convertSQ_success = ref(false)



      function setReadOnlyModeIsDisabled(){
          readOnlyModeIsDisabled.value=true
      }

    function setReadWriteModeIsDisabled(){
        readOnlyModeIsDisabled.value=false
    }

    function fillCustomerInfoField(contact){
               ContactCard.value["No_"]=contact['No_']
               ContactCard.value["Name"]=contact['Name']
               ContactCard.value["Lead Status"]=contact['Lead Status']
               ContactCard.value["City"]=contact['City']
               ContactCard.value["Item Category"]=contact['Item Category']
      }

      
      watch(success_message, () => {
          if (is_convertSQ_success.value==false){
              readOnlyModeIsDisabled.value=false
          }
      })
      // expose to template and other options API hooks
      return {
          ContactCard,
          readOnlyMode,
          readOnlyModeIsDisabled,
          setReadWriteModeIsDisabled,
          fillCustomerInfoField,
          setReadOnlyModeIsDisabled,
          success_message,
          


         
      }
  },
  data(){
      return{

          //nom de l'hote dans l'url 
          hostname:window.location.hostname,
          //indique la route active
          ContactCardId1:this.$route.params.id1,
          ContactCardId2:this.$route.params.id2,
          //indique si les onglets sont réduits ou non
          onglet1_expanded:true,
          onglet2_expanded:true,
          onglet3_expanded:true,
          onglet4_expanded:true,

          //élement pour le modal sélection des enregistrements
          activeModalForSelectableElementList:'',

          
      }
  },
  methods:{
      goBackToList(){
          useNavigationTabStore().setActiveTab('customers')
          this.$router.push('/ContactList/CMZCASH')
      },
      expand(id){
          const myElt=document.getElementById(id);
          if (id=='history_content') myElt.style.maxHeight='250px'
          else myElt.style.maxHeight='500px'
      },
      collapse(id){
          
          const myElt=document.getElementById(id);
          console.log(myElt.style.maxHeight)
          myElt.style.maxHeight="0px"
      }
  },
  mounted(){
      axios.get(`http://${this.hostname}:3000/app/getContactCard/${this.ContactCardId1}/${this.ContactCardId2}`)
      .then(result => {
          console.log(result.data)
          this.ContactCard = result.data.recordset[0]
      }).catch(err=>console.log(err))

  },

}
</script>
<style scoped>
#general_content,#details_content{
  max-height: 5000px;
  overflow: hidden;
  transition: max-height 0.5s;
}

.has-border-bottom-grey{
  border-bottom: 1px solid rgba(0, 0, 0, 0.233);
}
</style>