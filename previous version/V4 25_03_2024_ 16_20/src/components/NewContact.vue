<template>
    <div :class="{ modal: true, 'is-active': true }">
      <div
        class="modal-background has-background-white"
        style="opacity: 0.7"
      ></div>
      <div
        id="scrollBlock"
        class="modal-card box shadow is-rounded h-100"
        style="width: 90%"
      >
        <!---------Composant entête fiche----------------------->
        <div id="card-header-comp">
          <contact-card-Header
            soNo="contact 1"
            soDesc="New Contact"
            pageTitle="Fiche contact"
          />
        </div>
  
        <!---------Composant rubban fiche client----------------------->
        <contact-card-ribbon></contact-card-ribbon>
  
        <!---------Section formulaire fiche client----------------------->
        <div id="content-comp" class="columns mt-2" style="overflow-y: scroll">
          <div class="column" style="overflow-y: scroll">
            <!---------sous-Section ongle 1 formulaire fiche client----------------------->
            <div id="general">
              <div class="columns has-border-bottom">
                <div class="column p-0 has-text-left has-text-weight-bold">
                  <a
                    @click="
                      collapse('general_content');
                      onglet1_expanded = !onglet1_expanded;
                    "
                    v-if="onglet1_expanded"
                  >
                    <span>Général</span>
                  </a>
                  <a
                    @click="
                      expand('general_content');
                      onglet1_expanded = !onglet1_expanded;
                    "
                    v-if="!onglet1_expanded"
                  >
                    <span>Général</span>
                    <span class="icon">
                      <i class="fas fa-angle-right"></i>
                    </span>
                  </a>
                </div>
                <div class="column py-0 has-text-right is-size-7">
                  Afficher plus
                </div>
              </div>
              <div id="general_content" class="columns">
                <div class="column">
                  <input-text
                    labelInputText="No_"
                    valueInputText="ContactCardHeader['No_']"
                    
                  ></input-text>
                  <input-text
                    labelInputText="Code client"
                    valueInputText="ContactCardHeader['Customer No_']"
                    
                  ></input-text>
                  <input-text
                    labelInputText="Titre                  "
                    valueInputText="ContactCardHeader['Salutation Code']"
                   
                  ></input-text>
  
                  <input-text
                  labelInputText="Prenom               "
                  valueInputText="ContactCardHeader['First Name']"
                  
                ></input-text>
  
                <input-text
                labelInputText=" Autre Nom"
                valueInputText="ContactCardHeader['Middle Name']"
              ></input-text>
  
              <input-text
              labelInputText="Nom"
              valueInputText="ContactCardHeader['Surname']"
            ></input-text>
  
            <input-text
            labelInputText="Nom Complet"
            valueInputText="ContactCardHeader['Name']"
          ></input-text>
  
            <input-text
              labelInputText="Adresse : Ligne 1"
              valueInputText="ContactCardHeader['Address']"
            ></input-text>
           </div>
                <div class="column">
                  <input-text
                  labelInputText="Adresse : Ligne 2"
                  valueInputText="ContactCardHeader['Address 2 ']"
                ></input-text>

                <input-text
                labelInputText="Code postal"
                valueInputText="ContactCardHeader['Post Code']"
              ></input-text>

              <input-text
              labelInputText="Ville"
              valueInputText="ContactCardHeader['City']"
            ></input-text>

            <input-text
            labelInputText="Téléphone"
            valueInputText="ContactCardHeader['Phone No_']"
          ></input-text>

          <input-text
          labelInputText="Téléphone Mobile"
          valueInputText="ContactCardHeader['Mobile Phone No_']"
        ></input-text>
        <input-text
        labelInputText="Fonction"
        valueInputText="ContactCardHeader['Job Title']"
      ></input-text>

                </div>
              </div>
            </div>
            <br /><br />
  
            <!---------sous-Section ongle 2 formulaire fiche client----------------------->
           
  
            <!---------sous-Section ongle 3 formulaire fiche client----------------------->
            
  
            <!---------sous-Section ongle 4 formulaire fiche client----------------------->
            
          </div>
  
          <!---------composant info client----------------------->
        
        </div>
      </div>
    </div>
  </template>
  <script>
  import ContactCardHeader from "./HeaderForCard.vue";
  import ContactCardRibbon from "./RibbonForCard.vue";
  import inputText from "./input/input-text.vue";
  
  
  export default {
    name: "sale-order-card",
    components: {
      ContactCardHeader,
      inputText,
      ContactCardRibbon,
      
    },
  
    data() {
      return {
       
        //indique si les onglets sont réduits ou non
        onglet1_expanded: true,
        onglet2_expanded: true,
        onglet3_expanded: true,
        onglet4_expanded: true,
      };
    },
    methods: {
      expand(id) {
        const myElt = document.getElementById(id);
        if (id == "history_content") myElt.style.maxHeight = "250px";
        else myElt.style.maxHeight = "500px";
      },
      collapse(id) {
        const myElt = document.getElementById(id);
        console.log(myElt.style.maxHeight);
        myElt.style.maxHeight = "0px";
      },
    },
   
  };
  </script>
  <style scoped>
  #general_content,
  #communication_content,
  #international_content,
  #history_content {
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s;
  }
  
  .has-border-bottom-grey {
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
  }
  </style>
  