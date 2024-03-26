<template>
  <div :class="{ modal: true, 'is-active': true }">
    <div
      class="modal-background has-background-white"
      style="opacity: 0.7"
    ></div>
    <div
      id="scrollBlock"
      class="modal-card box shadow is-rounded h-100"
      style="width: 96%"
    >
      <!---------Composant entête fiche----------------------->
      <div id="card-header-comp">
        <item-card-Header
          :soNo="itemCardId"
          :soDesc="itemCardHeader.Description"
          pageTitle="Fiche article"
        />
      </div>

      <!---------Composant rubban fiche client----------------------->
      <item-card-ribbon
      
      @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
      componentWithCompInfo="itemCardRightInfoMaxWidth"
      ></item-card-ribbon>

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
                  <span>Article</span>
                </a>
                <a
                  @click="
                    expand('general_content');
                    onglet1_expanded = !onglet1_expanded;
                  "
                  v-if="!onglet1_expanded"
                >
                  <span>Article</span>
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
                  labelInputText="N°"
                  :valueInputText="itemCardId"
                  :is_disabled="readOnlyMode"
                ></input-text>

                <input-text
                  labelInputText="Code catégorie "
                  :valueInputText="itemCardHeader['Item Category Code']"
                  :is_disabled="readOnlyMode"
                ></input-text>

                <input-text
                  labelInputText="Description catégorie"
                  :valueInputText="itemCardHeader['Item Category Name']"
                  :is_disabled="readOnlyMode"
                ></input-text>

                <input-text
                  labelInputText="Description de l’article"
                  :valueInputText="itemCardHeader['Description']"
                  :is_disabled="readOnlyMode"
                ></input-text>

                <input-text
                  labelInputText="Description de 
                  recherche"
                  :valueInputText="itemCardHeader['Search Description']"
                  :is_disabled="readOnlyMode"
                ></input-text>

                <input-text
                  labelInputText="Unité de base"
                  :valueInputText="itemCardHeader['Base Unit of Measure']"
                  :is_disabled="readOnlyMode"
                ></input-text>

              </div>

              <div class="column">
                <input-text
                  labelInputText="Unité de vente"
                  :valueInputText="itemCardHeader['Sales Unit of Measure']"
                  :is_disabled="readOnlyMode"
                ></input-text>

                <input-text
                labelInputText="Poids brut"
                :valueInputText="itemCardHeader['Gross Weight']"
                :is_disabled="readOnlyMode"
              ></input-text>

              <input-text
              labelInputText="Poids net "
              :valueInputText="itemCardHeader['Net Weight']"
              :is_disabled="readOnlyMode"
            ></input-text>

            <input-text
            labelInputText="Volume unitaire
            "
            :valueInputText="itemCardHeader['Unit Volume']"
            :is_disabled="readOnlyMode"
          ></input-text>

          <input-text
          labelInputText="Mode de livraison par défaut"
          :valueInputText="itemCardHeader['Shipment Method']"
          :is_disabled="readOnlyMode"
        ></input-text>

        <input-text
        labelInputText="Bar Code"
        :valueInputText="itemCardHeader['Bar Code']"
        :is_disabled="readOnlyMode"
      ></input-text>

              </div>
            </div>
          </div>
          <br /><br />

          <!---------sous-Section ongle 2 formulaire fiche client----------------------->
          

          <!---------sous-Section ongle 3 formulaire fiche client----------------------->
         

        
       
      </div>
      <!---------composant info client----------------------->
      <item-info class="item-info"></item-info>
    </div>
    </div>
  </div>
</template>

<script>
import ItemCardHeader from "./HeaderForCard.vue";
import ItemInfo from "./ItemInfo.vue";
import ItemCardRibbon from "./RibbonForCard.vue";
import inputText from "./input/input-text.vue";
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import axios from "axios";
import { ref } from "vue";
export default {
  name: "item-card",
  components: {
    ItemCardHeader,
    ItemInfo,
    inputText,
    ItemCardRibbon,
  },
 
  setup() {
    const itemCardHeader = ref({});

    const readOnlyMode = ref(true);

    // expose to template and other options API hooks
    return {
      itemCardHeader,
      readOnlyMode,
    };
  },

  data() {
    return {
      itemCardId: this.$route.params.id,
      //indique si les onglets sont réduits ou non
      onglet1_expanded: true,
      onglet2_expanded: true,
      onglet3_expanded: true,
      onglet4_expanded: true,
      onglet5_expanded: true,

      itemInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.itemCardRightInfoMaxWidth,
      //indique si tous les options les lignes sont affichées
      show_more_option: false,

      //indique si la barre des boutons d'option est affichée
      show_option_btn_bar: false,

      //indique l'option par défaut
      selected_option: "",

      selected_line: "",

      txt: "Edit me",

      //nom de l'hote dans l'url 
      hostname:window.location.hostname
    };
  },
  methods: {
  /////////////////////////methode pour masquer ou afficher le composant info à droit
    hideOrShowComponentInfo(){
            if(this.itemInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('itemCardRightInfoMaxWidth','800px')
                this.itemInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('itemCardRightInfoMaxWidth','0px')
                this.itemInfoCompMaxWidth='0px'
            }
        },





    formatDate(date) {
      const dateString = new String(date);
      if (dateString.includes("1753-")) return "";
      else return new Date(date).toLocaleDateString();
    },
    expand(id) {
      const myElt = document.getElementById(id);
      if (id == "line_content") myElt.style.maxHeight = "250px";
      else myElt.style.maxHeight = "500px";
    },
    collapse(id) {
      const myElt = document.getElementById(id);
      console.log(myElt.style.maxHeight);
      myElt.style.maxHeight = "0px";
    },
    selectOption(currentOpt) {
      if (this.selected_option == currentOpt) {
        this.show_option_btn_bar = !this.show_option_btn_bar;
      } else {
        this.selected_option = currentOpt;
        this.show_option_btn_bar = this.show_option_btn_bar ? true : true;
      }
    },

    setLineShadow(id) {
      const myElt = document.getElementById(id);
      const children = myElt.childNodes;
      children.forEach((element) => {
        element.classList.remove("has-background-light");
        element.classList.add("is-hover-orange");
      });
      //console.log(children)
    },
    removeLineShadow(id) {
      const myElt = document.getElementById(id);
      const children = myElt.childNodes;
      children.forEach((element) => {
        element.classList.remove("is-hover-orange");
        element.classList.add("has-background-light");
      });
      //console.log(children)
    },
    onEdit(evt) {
      var src = evt.target.innerText;
      this.txt = src;
    },
    endEdit() {
      this.$el.querySelector(".editme").blur();
    },

   
  },
   /////////////////////////methode pour masquer ou afficher le composant info à droite
  


  mounted() {
    axios
      .get(`http://${this.hostname}:3000/app/getItemCard/${this.itemCardId}`)
      .then((result) => {
        this.itemCardHeader = result.data.recordset[0];

      })
      .catch((err) => console.error(err));
  },
};
</script>
<style scoped>

.item-info{
  max-width: v-bind(itemInfoCompMaxWidth);
  transition: max-width 0.5s;
}
#general_content,
#address_content,
#invoicing_content,
#cash_content,
#delivery_content {
  max-height: 5000px;
  overflow: hidden;
  transition: max-height 0.5s;
}
</style>
