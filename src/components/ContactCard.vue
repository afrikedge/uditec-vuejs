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
          :soNo="contactCardId2"
          :soDesc="ContactCardHeader.Name"
          pageTitle="Fiche contact"
        />
      </div>

      <!---------Composant rubban fiche contact----------------------->
      <contact-card-ribbon
      @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
      componentWithCompInfo="contactCardRightInfoMaxWidth"
      :newCardBtnDisabled="false"
      :editCardBtnDisabled="true"
      :readOnlyModeDisabled="true"
      ></contact-card-ribbon>

      <!---------Section formulaire fiche contact----------------------->
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
                  :valueInputText="ContactCardHeader['No_']"
                  :is_disabled="readOnlyMode"
                ></input-text>
                <input-text
                  labelInputText="Code client"
                  :valueInputText="ContactCardHeader['Customer No_']"
                  :is_disabled="readOnlyMode"
                ></input-text>
                <input-text
                  labelInputText="Titre                  "
                  :valueInputText="ContactCardHeader['Salutation Code']"
                  :is_disabled="readOnlyMode"
                ></input-text>

                <input-text
                labelInputText="Prenom               "
                :valueInputText="ContactCardHeader['First Name']"
                :is_disabled="readOnlyMode"
              ></input-text>

              <input-text
              labelInputText=" Autre Nom"
              :valueInputText="ContactCardHeader['Middle Name']"
              :is_disabled="readOnlyMode"
            ></input-text>

            <input-text
            labelInputText="Nom"
            :valueInputText="ContactCardHeader['Surname']"
            :is_disabled="readOnlyMode"
          ></input-text>

          <input-text
          labelInputText="Nom Complet"
          :valueInputText="ContactCardHeader['Name']"
          :is_disabled="readOnlyMode"
        ></input-text>

          <input-text
            labelInputText="Adresse : Ligne 1"
            :valueInputText="ContactCardHeader['Address']"
            :is_disabled="readOnlyMode"
          ></input-text>
         </div>
              <div class="column">
                <input-text
                  labelInputText="Adresse : Ligne 2"
                  :valueInputText="ContactCardHeader['Address 2 ']"
                  :is_disabled="readOnlyMode"
                ></input-text>

                <input-text
                labelInputText="Code postal"
                :valueInputText="ContactCardHeader['Post Code']"
                :is_disabled="readOnlyMode"
              ></input-text>

              <input-text
              labelInputText="Ville"
              :valueInputText="ContactCardHeader['City']"
              :is_disabled="readOnlyMode"
            ></input-text>

            <input-text
            labelInputText="Téléphone"
            :valueInputText="ContactCardHeader['Phone No_']"
            :is_disabled="readOnlyMode"
          ></input-text>

          <input-text
          labelInputText="Téléphone Mobile"
          :valueInputText="ContactCardHeader['Mobile Phone No_']"
          :is_disabled="readOnlyMode"
        ></input-text>

        <input-text
        labelInputText="Fonction"
        :valueInputText="ContactCardHeader['Job Title']"
        :is_disabled="readOnlyMode"
      ></input-text>
              </div>
            </div>
          </div>
          <br /><br />

          
        </div>

        <!---------composant info contact----------------------->
        <customer-info class="contact-info"></customer-info>
      </div>
    </div>
  </div>
</template>
<script>
import ContactCardHeader from "./HeaderForCard.vue";
import ContactCardRibbon from "./RibbonForCard.vue";
import inputText from "./input/input-text.vue";
import CustomerInfo from "./CustomerInfo.vue";
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import axios from "axios";
import { ref } from "vue";
export default {
  name: "sale-order-card",
  components: {
    ContactCardHeader,
    inputText,
    ContactCardRibbon,
    CustomerInfo,
  },
  setup() {
    const ContactCardHeader = ref({});
    const readOnlyMode = ref(true);

    // expose to template and other options API hooks
    return {
      ContactCardHeader,
      readOnlyMode
      
    };
  },

  data() {
    return {
      contactCardId1: this.$route.params.id1,
      contactCardId2: this.$route.params.id2,
      contactInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.contactCardRightInfoMaxWidth,
      //indique si les onglets sont réduits ou non
      onglet1_expanded: true,
      onglet2_expanded: true,
      onglet3_expanded: true,
      onglet4_expanded: true,

      hostname:window.location.hostname
    };
  },
  methods: {

    hideOrShowComponentInfo(){
            if(this.contactInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('contactCardRightInfoMaxWidth','800px')
                this.contactInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('contactCardRightInfoMaxWidth','0px')
                this.contactInfoCompMaxWidth='0px'
            }
        },







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
  mounted() {
    axios
      .get(
        `http://${this.hostname}:3000/app/getContactCard/${this.contactCardId1}/${this.contactCardId2}`
      )
      .then((result) => {
        this.ContactCardHeader = result.data.recordset[0];
      })
      .catch((err) => console.error(err));
  },
};
</script>
<style scoped>


.contact-info{
  max-width: v-bind(contactInfoCompMaxWidth);
  transition: max-width 0.5s;
}
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
