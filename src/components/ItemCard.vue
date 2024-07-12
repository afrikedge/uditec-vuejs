<template>
    <div :class="{ modal: true, 'is-active': true }">
        <div class="modal-background has-background-white" style="opacity: 0.7"></div>
        <div id="scrollBlock" class="modal-card box shadow is-rounded h-100" style="width: 96%;">
<!---------Composant entête fiche----------------------->
            <div id="card-header-comp">
                <item-card-Header :soNo="itemCardId" :soDesc="itemCardHeader['Description']" pageTitle="Fiche article"
                @onGoingBackToList='goBackToList'/>
            </div>

<!---------Composant rubban fiche client----------------------->
            <item-card-ribbon
                @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
                componentWithCompInfo="itemCardRightInfoMaxWidth"
                :checkItemAvailabilityBtnIsDisabled="false"
            ></item-card-ribbon>

<!---------Section formulaire fiche article----------------------->
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll">
                <div class="column" style="overflow-y: scroll">

<!---------sous-Section onglet 1 formulaire fiche article----------------------->
                    <div id="general">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('general_content');onglet1_expanded = !onglet1_expanded;" v-if="onglet1_expanded">
                                    <span>Général</span>
                                </a>
                                <a @click="expand('general_content');onglet1_expanded = !onglet1_expanded;" v-if="!onglet1_expanded">
                                    <span>Général</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet1_expanded">
                              Afficher plus
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3">{{ itemCardHeader['Item Category Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ itemCardId }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ itemCardHeader['Sales Unit of Measure'] }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Code catégorie " :valueInputText="itemCardHeader['Item Category Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Description catégorie" :valueInputText="itemCardHeader['Item Category Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code article" :valueInputText="itemCardId" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Description de l’article" :valueInputText="itemCardHeader['Description']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Description de recherche" :valueInputText="itemCardHeader['Search Description']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Unité de base" :valueInputText="itemCardHeader['Base Unit of Measure']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Unité de vente" :valueInputText="itemCardHeader['Sales Unit of Measure']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Poids brut" :valueInputText="itemCardHeader['Gross Weight']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Poids net " :valueInputText="itemCardHeader['Net Weight']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Volume unitaire" :valueInputText="itemCardHeader['Unit Volume']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Mode de livraison par défaut" :valueInputText="itemCardHeader['Shipment Method']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code barre" :valueInputText="itemCardHeader['Bar Code']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                        </div>
                    </div>
                    <br><br>

                    <div id="availability">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('availability_content');onglet2_expanded = !onglet2_expanded;" v-if="onglet2_expanded">
                                    <span>Disponibilité article</span>
                                </a>
                                <a @click="expand('availability_content');onglet2_expanded = !onglet2_expanded;" v-if="!onglet2_expanded">
                                    <span>Disponibilité article</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>

                        </div>
                        <div id="availability_content" class="columns mt-5">
                            <div class="column is-1 box mx-2">
                                <div class="has-text-left" style="height:100px">
                                    <span class="subtitle">Stock en magasin</span>
                                </div>
                                <div class="has-text-right">
                                    <span class="subtitle is-1 has-text-orange">{{ itemInStockLocation  }}</span>
                                </div>
                            </div>
                            <div class="column is-1 box mx-2">
                                <div class="has-text-left" style="height:100px">
                                    <span class="subtitle">Sur commande en magasin</span>
                                </div>
                                <div class="has-text-right">
                                    <span class="subtitle is-1 has-text-orange">{{ itemOnSalesLocation }}</span>
                                </div>
                            </div>
                            <div class="column is-1 box mx-2">
                                <div class="has-text-left" style="height:100px">
                                    <span class="subtitle">Disponible en magasin</span>
                                </div>
                                <div class="has-text-right">
                                    <span class="subtitle is-1 has-text-orange">{{ itemAvailableInLocation }}</span>
                                </div>
                            </div>
                            <div class="column is-1 box mx-2">
                                <div class="has-text-left" style="height:100px">
                                    <span class="subtitle">Stock</span><br>
                                    <span class="subtitle">global</span>
                                </div>
                                <div class="has-text-right">
                                    <span class="subtitle is-1 has-text-orange">{{ itemInStockGlobal }}</span>
                                </div>
                            </div>
                            <div class="column is-1 box mx-2">
                                <div class="has-text-left" style="height:100px">
                                    <span class="subtitle">Sur commande global</span>
                                </div>
                                <div class="has-text-right">
                                    <span class="subtitle is-1 has-text-orange">{{ itemOnSalesGlobal }}</span>
                                </div>
                            </div>
                            <div class="column is-1 box mx-2">
                                <div class="has-text-left" style="height:100px">
                                    <span class="subtitle">Disponible global</span>
                                </div>
                                <div class="has-text-right">
                                    <span class="subtitle is-1 has-text-orange">{{ itemAvailableGlobal }}</span>
                                </div>
                            </div>
                            <div class="column is-1 box mx-2">
                                <div class="has-text-left" style="height:100px">
                                    <span class="subtitle">En cours d'achat global</span>
                                </div>
                                <div class="has-text-right">
                                    <span class="subtitle is-1 has-text-orange">{{ itemOnPurchaseGlobal }}</span>
                                </div>
                            </div>
                            <div class="column">

                            </div>

                        </div>
                    </div>
                    <br><br>

                    <div id="attribute">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('attribute_content');onglet3_expanded = !onglet3_expanded;" v-if="onglet3_expanded">
                                    <span>Caractéristiques article</span>
                                </a>
                                <a @click="expand('attribute_content');onglet3_expanded = !onglet3_expanded;" v-if="!onglet3_expanded">
                                    <span>Caractéristiques article</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="attribute_content" class="columns mt-5">
                            <div v-if="itemAttributeInfo.length>0">
                                <table class="table  is-narrow  is-fullwidth box">
                                    <thead class=" my-2">
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-2" style="min-width: 300px;">Caractéristique</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-2" style="min-width: 300px;">Valeur</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of itemAttributeInfo" :key="index"  >
                                            <td class="has-text-left">
                                               <span class="subtitle is-6 has-text-weight-bold"> <b>{{ elt['Name'] }}</b></span>
                                            </td>
                                            <td class="has-text-left">
                                                {{ elt['Value'] }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>

                    <div id="warrannty">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('warranty_content');onglet4_expanded = !onglet4_expanded;" v-if="onglet4_expanded">
                                    <span>Plan de garantie</span>
                                </a>
                                <a @click="expand('warranty_content');onglet4_expanded = !onglet4_expanded;" v-if="!onglet4_expanded">
                                    <span>Plan de garantie</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="warranty_content" class="columns mt-5">
                            <div v-if="itemWarrantyInfo.length>=0">
                                <table class="table  is-narrow  is-fullwidth box">
                                    <thead class=" my-2">
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-4" style="min-width: 300px;"><b>Plan de garantie</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-4" style="min-width: 300px;"><b>Description</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-4" style="min-width: 300px;"><b>Durée (mois)</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-4" style="min-width: 300px;"><b>Mode Tarification</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-4" style="min-width: 300px;"><b>Pourcentage</b></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-4" style="min-width: 300px;"><b>Montant</b></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of itemWarrantyInfo" :key="index"  >
                                            <td class="has-text-left">{{ elt['Warranty Plan Code'] }}</td>
                                            <td class="has-text-left">{{ elt['Name'] }}</td>
                                            <td class="has-text-left">{{ elt['Duration (months)'] }}</td>
                                            <td class="has-text-left">{{ elt['Pricing Mode'] }}</td>
                                            <td class="has-text-left">{{ elt['Percentage'] }}</td>
                                            <td class="has-text-left">{{ elt['Amount (LCY)'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>
                    

                </div>

<!---------composant info article----------------------->
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
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute} from 'vue-router'


export default {
    name: "item-card",
    components: {
      ItemCardHeader,
      ItemInfo,
      inputText,
      ItemCardRibbon 
    },
 
    setup() {
      const itemCardHeader = ref({});
      const readOnlyMode = ref(true);
      //nom de l'hote dans l'url 
      const hostname = window.location.hostname;
      const userLocation = ref(useWebUserInfoStore().defaultLocation)
      const userRespCenter = ref(useWebUserInfoStore().responsibilityCenter)
      const itemCardId = useRoute().params.id

      const itemAttributeInfo = ref([])
      const itemWarrantyInfo = ref([])
      const itemAvailabilityInfo = {
            itemInStockLocation:ref(0),
            itemOnSalesLocation:ref(0),
            itemAvailableInLocation:ref(0),
            itemInStockGlobal:ref(0),
            itemOnSalesGlobal:ref(0),
            itemAvailableGlobal:ref(0),
            itemOnPurchaseGlobal:ref(0),
        }

      function getItemAvailabilityInfo(){
          axios.get(`http://${hostname}:3000/app/getItemAvailabilityInfo/${itemCardId}/${userLocation.value}`)
          .then(res =>{
              if (res.data.recordset[0]){
                  const data =  res.data.recordset[0]
                  itemAvailabilityInfo.itemInStockLocation.value = Math.trunc(Number(data["In Stock Location"]))
                  itemAvailabilityInfo.itemOnSalesLocation.value = Math.trunc(Number(data["On Sales Location"]))
                  itemAvailabilityInfo.itemAvailableInLocation.value = Math.trunc(Number(data["In Stock Location"])) - Math.trunc(Number(data["On Sales Location"]))
                  itemAvailabilityInfo.itemInStockGlobal.value = Math.trunc(Number(data["In Stock Global"]))
                  itemAvailabilityInfo.itemOnSalesGlobal.value = Math.trunc(Number(data["On Sales Global"]))
                  itemAvailabilityInfo.itemAvailableGlobal.value = Math.trunc(Number(data["In Stock Global"])) - Math.trunc(Number(data["On Sales Global"]))
                  itemAvailabilityInfo.itemOnPurchaseGlobal.value = Math.trunc(Number(data["On Purchase Global"]))
              }
          })
          .catch((err) => {
              console.log(err)
          })
      }

      function getItemAttributeInfo(){
          axios.get(`http://${hostname}:3000/app/getItemAttrib/${itemCardId}`)
          .then(res =>{
              if (new Array(res.data.recordset).length>0){
                  itemAttributeInfo.value =  res.data.recordset
                  
              }
          })
          .catch((err) => {
              console.log(err)
          })
      }

      function getItemWarrantyInfo(){
          axios.get(`http://${hostname}:3000/app/getitemwarrantyplan/${itemCardId}`)
          .then(res =>{
              if (new Array(res.data.recordset).length>=0){
                  itemWarrantyInfo.value =  res.data.recordset
                  
              }
          })
          .catch((err) => {
              console.log(err)
          })
      }

      function getItemCardInfo(){
          axios.get(`http://${hostname}:3000/app/getItemCard/${itemCardId}?respCenter=${userRespCenter.value}`)
          .then(result => {
            console.log(result)
              itemCardHeader.value = result.data.recordset[0]
              if(userLocation.value){
                  getItemAvailabilityInfo()
              }
              getItemAttributeInfo()
              getItemWarrantyInfo()
          }).catch(err=>console.log(err))
      }

      onMounted(()=>{
          if(userRespCenter.value){
              getItemCardInfo()
          }
          else{
              axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
              .then(res=>{
                  useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                  userLocation.value = useWebUserInfoStore().defaultLocation
                  userRespCenter.value = useWebUserInfoStore().responsibilityCenter
                  getItemCardInfo()
              })
              .catch(err=>console.log(err))
          }
      })

      // expose to template and other options API hooks
      return {
          itemCardHeader,
          readOnlyMode,
          ...itemAvailabilityInfo,
          itemAttributeInfo,
          getItemAvailabilityInfo,
          itemWarrantyInfo,
          getItemWarrantyInfo
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

        //nom de l'hote dans l'url 
        hostname:window.location.hostname
      };
    },
    methods: {

        goBackToList(){
              useNavigationTabStore().setActiveTab('items')
              this.$router.push('/')
        },
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
        if (id == "caracteristique_content" || id=='garantie_content') myElt.style.maxHeight = "250px";
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

.item-info{
  max-width: v-bind(itemInfoCompMaxWidth);
  transition: max-width 0.5s;
}
#warranty_content,
#general_content,
#availability_content,
#attribute_content
{
  max-height: 5000px;
  overflow: hidden;
  transition: max-height 0.5s;
}
</style>
