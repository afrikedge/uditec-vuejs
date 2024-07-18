<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <new-TO-card-Header :soNo="'Nouveau Bon de Transport : '+orderCustomerNo" :soDesc="orderDocumentNo" pageTitle="Bon de Transport"
                @onGoingBackToList='goBackToList'
                ></new-TO-card-Header>
            </div>
<!---------Composant rubban fiche Nouveau Bon de transport----------------------->      
            <new-TO-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onSubmittingForm="submitForm"
            componentWithCompInfo="neworderRightInfoMaxWidth"
            :readOnlyModeIsDisabled="true"
            ></new-TO-card-ribbon>

<!---------Composant message d'enregistrement en cours ou d'erreur ou de success----------------------->      
            <article v-if="submitting_message" class="" >
                <span class="icon">
                    <i class="fas fa-spinner fa-pulse"></i>
                </span>
                <span class="subtitle is-7"> Enregistrement en cours </span>
            </article>

            <article v-if="error_message" class="message is-danger shadow" >
                <div class="message-header">
                    <p class="is-size-7">
                        <span class="icon has-text-danger">
                        <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        Error Message
                    </p>
                    <button class="delete" aria-label="delete" @click="error_message='';error_message_code=''"></button>
                </div>
                <div class="message-body is-size-7">
                    <span> {{ error_message }}</span><br>
                    <span v-if="error_message_code"> Code erreur: {{ error_message_code }}</span>
                </div>
            </article>

            <article v-if="success_message" class="message is-primary shadow">
                <div class="message-header">
                        <span class="subtitle is-7 m-0 has-text-white"> 
                            <span class="icon ">
                                <i class="fas fa-spinner fa-pulse"></i>
                            </span>
                            {{ success_message }}
                        </span>
                    <button class="delete" aria-label="delete" @click="success_message=''"></button>
                </div>
            </article>

<!---------Section formulaire fiche Nouveau Bon de transport----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire fiche Nouveau Bon de transport----------------------->                         
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
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                
                                <input-text v-model="transportOrderNumber" labelInputText="Numéro"></input-text>
                                <input-select v-model="transportOrderCarrier" labelInputText="Transporteur" @openModal="activeModalForSelectableElementList='carrierList'"></input-select>
                                <input-select v-model="transportOrderVehicle" labelInputText="Véhicule" @openModal="activeModalForSelectableElementList='vehicleList'"></input-select>
                                <input-select v-model="transportOrderDriver" labelInputText="Chauffeur " @openModal="activeModalForSelectableElementList='driverList'"></input-select>
                                <input-select v-model="transportOrderJourney" labelInputText="Trajet" @openModal="activeModalForSelectableElementList='routeList'"></input-select>
                                <input-date v-model="transportOrderStartDate" labelInputText="Date départ prévue"  :is_disabled="false"></input-date>
                                
                                <input-text v-model="transportOrderStartHours" labelInputText="Heure de départ prévue"></input-text>
                                <input-text v-model="transportOrderPlannedDuration" labelInputText="Durée prévue"></input-text>
                                
                            </div>
                            <div class="column">
                                <input-date v-model="transportOrderReturnDate" labelInputText="Date retour prévue"  :is_disabled="false"></input-date>
                                
                                <input-text v-model="transportOrderReturnHours" labelInputText="Heure retour prévue"></input-text>
                                
                                <input-date v-model="transportOrderActualDate" labelInputText="Date départ réelle"  :is_disabled="false"></input-date>
                                
                                <input-text v-model="transportOrderActualHours" labelInputText="Heure de départ réelle"></input-text>
                                
                                <input-date v-model="transportOrderActualReturnDate" labelInputText="Date retour réelle"  :is_disabled="false"></input-date>
                                
                                <input-text v-model="transportOrderActualReturnHours" labelInputText="Heure retour réelle"></input-text>
                                
                                <input-text v-model="transportOrderActualDuration" labelInputText="Durée réelle"></input-text>
                               
                               
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche Nouveau Bon de transport----------------------->                         
                    <div id="order">
                        <div :class="{'has-background-white':onglet2_expanded}">

                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('order_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Ordre à transporter</span>
                                    </a>
                                    <a @click="expand('order_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                        <span>Ordre à transporter</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet2_expanded">|</span>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="showaddRowByForm">
                                        <span class="icon">
                                            <i class="fas fa-plus has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7" >
                                            Ajouter un article
                                        </span>
                                    </a>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="addCommentRow">
                                        <span class="icon">
                                            <i class="fas fa-pen has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7" >
                                            Ajouter une ligne commentaire
                                        </span>
                                    </a>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="addEmptyRow">
                                        <span class="icon">
                                            <i class="fas fa-plus has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7">
                                            Insérer une ligne article
                                        </span>
                                    </a>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="showEditRowByFormModal">
                                        <span class="icon">
                                            <i class="fas fa-edit has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7" >
                                            Modifier l'article
                                        </span>
                                    </a>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="deleteRow">
                                        <span class="icon">
                                            <i class="fas fa-eraser has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7">
                                            Supprimer la ligne
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="order_content" class=" px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <div>
                                    <table class="table  is-narrow  is-fullwidth">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Numéro Ordre</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité prévue</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité réalisé</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Ecart </th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Motif écart</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type anomalie</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description anomalie</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of orderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                                <td class="has-text-left">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
    
                                                <td class="has-text-left p-1" >
                                                    {{ elt[''] }}
                                                </td>
                                                <td class="has-text-left p-1" >
                                                    {{ elt[''] }}
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['']+'-Posting Date'" class="editme p-1" :contenteditable="true" v-text="elt['']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['']+'-Document Date'" class="editme p-1" :contenteditable="true" v-text="elt['']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['']+'-Description'" class="editme p-1" :contenteditable="true" v-text="elt['']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['']+'-Original Amount'" class="editme p-1" :contenteditable="true" v-text="elt['']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['']+'-Remaining Amount'" class="editme p-1" :contenteditable="true" v-text="elt['']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['']+'-Debt Status'" class="editme p-1" :contenteditable="true" v-text="elt['']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    {{ elt['Bin Code'] }}
                                                </td>
                                              
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="orderCardLines.length==0">Il n'y'a rien à afficher</div>
                            </div>     
                              
                        </div>
                        
<!---------sous-Section onglet 2 formulaire fiche client -----Modal d'ajout d'article----------------------->                         
                        <div :class="{'modal':true , 'is-active':addItemModalShowned }" v-if="addItemModalShowned">
                            <div class="modal-background has-background-white" style="opacity:0.7" @click.prevent="addItemModalShowned=false"></div>
                            <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                                
                                <form @submit.prevent="addRowByForm_andContinue">

                                    <div class="has-text-left mb-5">
                                        <span class="is-size-3 subtitle ">Fiche ligne article</span>
                                    </div>

                                    <div class="modal-content-hist container">

                                        <div class="columns" >
                                            <div class="column">
                                                <div>
                                                     <!---input-text  :valueInputText="itemLineNo" labelInputText="N° ligne" :is_disabled="true " ></input-text--->
                                                    <input-select-basic  v-model="itemType" labelInputText="Type ligne"></input-select-basic>
                                                    <input-text v-show="itemType==2" v-model="itemCode" labelInputText="Code article" :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                    <input-text v-model="itemDescription" labelInputText="Description" :is_disabled="false"></input-text>
                                                    <input-text v-show="itemType==0" v-model="itemDescription2" labelInputText="Description 2" :is_disabled="false"></input-text>
                                                    <input-text v-show="itemType==2" v-model="itemVariant" labelInputText="Code variant" :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                    <input-select v-show="itemType==2" v-model="itemLocation" labelInputText="magasin de livraison" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationList',isItemInfoToFill=true}"></input-select>
                                                    <!----input-text  :valueInputText="itemBinCode" labelInputText="Emplacement" :is_disabled="true"></input-text---->
                                                    <!----input-text :valueInputText="itemUnitOfMeasure" labelInputText="Unité de mesure"  :is_disabled="true"></input-text---->
                                                    <input-text  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                    <input-select  v-show="itemType==2" v-model="itemShipmentMethod" labelInputText="Mode de livraison"  :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='shipmentMethodList',isItemInfoToFill=true}"></input-select>
                                                    <input-text  v-show="itemType==2" v-model="itemUnitPrice" :valueInputText="itemUnitPrice" labelInputText="Prix unitaire" :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                </div>
                                                <p class="title has-text-left is-6 mt-3">Disponibilité article Magasin : </p>
                                                <div class="columns">
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 :valueInputText="itemInStockLocation" labelInputText="En stock" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1  :valueInputText="itemOnSalesLocation" labelInputText="En vente" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column">
                                                    </div>
                                                </div>
                                                <p class="title has-text-left is-6 mt-3">Disponibilité article Global : </p>
                                                <div class="columns my-0 is-multiline">
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 :valueInputText="itemInStockGlobal"  labelInputText="En stock" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 :valueInputText="itemOnSalesGlobal"  labelInputText="En vente" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 :valueInputText="itemOnPurchaseGlobal" labelInputText="Sur achat" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="column is-6" style="overflow-y:scroll;overflow-x:hidden;height: 650px;">
                                                <selectable-item-list-for-sale
                                                    :itemCode="itemCode" 
                                                    :itemDescription ="itemDescription"
                                                    @onGettingLineFromSelectableItemList="(elt)=>fillItemInfoField(elt)">
                                                </selectable-item-list-for-sale> 
                                            </div>
                                        </div>
                                        <div class="field is-grouped">
                                            <p class="control">
                                            <button type="submit" class="button has-background-orange  shadow has-text-white">
                                                Ajouter et continuer
                                            </button>
                                            </p>
                                            <p class="control">
                                            <button class="button has-background-orange  shadow has-text-white" @click.prevent="()=>{addRowByForm_andClose();addItemModalShowned=false}">
                                                Ajouter et fermer
                                            </button>
                                            </p>
                                            <p class="control">
                                            <button class="button" @click.prevent="resetForm">
                                                Réinitialiser
                                            </button>
                                            </p>
                                        </div>   
                                    </div> 
                                </form>
                            </div>
                            <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="addItemModalShowned=false"></button>
                        </div>
                    </div>                         
                    <br><br>
<!---------sous-Section onglet 3 formulaire fiche Nouveau Bon de transport-----------------------> 
                    <div id="outgoing">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('outgoing_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                    <span>totaux sortants</span>
                                </a>
                                <a @click="expand('outgoing_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>totaux sortants</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="outgoing_content" class="columns">
                            <div class="column">
                                <input-text v-model="transportOrderNumber" labelInputText="Nombre total de colis"></input-text>
                                <input-text v-model="transportOrderVolume" labelInputText="Volume total chargé"></input-text>
                                
                            </div>
                            <div class="column">
                                <input-text v-model="transportOrderWeight" labelInputText="Poids total chargé"></input-text> 
                                <input-text v-model="transportOrderTime" labelInputText="Temps déchargement total prévu"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section onglet 4 formulaire fiche Nouveau Bon de transport-----------------------> 
                    <div id="incoming">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('incoming_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                    <span>totaux entrants</span>
                                </a>
                                <a @click="expand('incoming_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                    <span>totaux entrants</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="incoming_content" class="columns">
                            <div class="column">
                                <input-text v-model="transportOrderNumber" labelInputText="Nombre total de colis"></input-text>
                                <input-text v-model="transportOrderVolume" labelInputText="Volume total chargé"></input-text>
                                
                            </div>
                            <div class="column">
                                <input-text v-model="transportOrderWeight" labelInputText="Poids total chargé"></input-text> 
                                <input-text v-model="transportOrderTime" labelInputText="Temps déchargement total prévu"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>


                </div>

<!---------composant info Nouveau Bon de transport----------------------->
                <order-info class="customer-info"></order-info>

            </div>
        </div>

<!---------------------------------------------->

        <modal-for-selectable-carrier-list 
            v-if="activeModalForSelectableElementList=='carrierList'" 
            :isActive="activeModalForSelectableElementList=='carrierList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCarrierListModal="(elt)=>fillCarrierInfoField(elt)">
        </modal-for-selectable-carrier-list>
        
        <modal-for-selectable-route-list 
            v-if="activeModalForSelectableElementList=='routeList'" 
            :isActive="activeModalForSelectableElementList=='routeList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableRouteListModal="(elt)=>fillRouteInfoField(elt)">
        </modal-for-selectable-route-list>

        <modal-for-selectable-driver-list 
            v-if="activeModalForSelectableElementList=='driverList'" 
            :isActive="activeModalForSelectableElementList=='driverList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableDriverListModal="(elt)=>fillDriverInfoField(elt)">
        </modal-for-selectable-driver-list>

        <modal-for-selectable-vehicle-list 
            v-if="activeModalForSelectableElementList=='vehicleList'" 
            :isActive="activeModalForSelectableElementList=='vehicleList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableVehicleListModal="(elt)=>fillVehicleInfoField(elt)">
        </modal-for-selectable-vehicle-list>

       




    </div>     
</template>
<script>
import NewTOCardHeader from './HeaderForCard.vue'
import orderInfo from './CustomerInfo.vue'
import NewTOCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputDate from './input/input-date.vue'
import ModalForSelectableCarrierList from './ModalForSelectableCarrierList.vue'
import ModalForSelectableRouteList from './ModalForSelectableRouteList.vue'
import ModalForSelectableDriverList from './ModalForSelectableDriverList.vue'
import ModalForSelectableVehicleList from './ModalForSelectableVehicleList.vue'
import { onMounted, ref } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import  axios  from 'axios'
import { useRouter } from 'vue-router'



export default {
    name:'new-transport-order',
    components:{
        NewTOCardHeader,
        NewTOCardRibbon,
        orderInfo,
        inputText,
        inputSelect,
        ModalForSelectableCarrierList,
        ModalForSelectableRouteList,
        ModalForSelectableDriverList,
        ModalForSelectableVehicleList,
        inputDate
    },
    data(){
        return{

            //list:[],
            //taille (hauteur) initiale des onglets de la page
            height:'700px',

            //taille (largeur) initiale du composant custumerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.newquoteRightInfoMaxWidth,

            //indique si les onglets de la page sont réduits ou pas
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,

            //élement pour le modal ajout d'article
             addItemModalShowned:false,
             editItemModalShowned:false,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

             //indique si tous les options les lignes sont affichées
             show_more_option:false,

            //indique si la barre des boutons d'option est affichée
            show_option_btn_bar:false,

            //indique l'option par défaut
            selected_option:'',

            selected_line:'',

        }
    },
    setup(){

 /////////////DATAS//////////////////////////   
            
            const router = useRouter()

            //nom de l'hote dans l'url 
            const hostname = window.location.hostname;

            //variable de soumission forme
            let submitting_message=ref('') 

            //variable d'erreur serveur
            let error_message=ref('')
            let error_message_code =ref('')

            //variable de success serveur
            let success_message=ref('')

           

            
            const webUserInfo = {
                ...useWebUserInfoStore().getWebUser
            }

            const itemInfo = {
                itemLineNo:ref(1),
                itemType: ref(2),
                itemCode: ref(''),
                itemDescription: ref(''),
                itemDescription2: ref(''),
                itemVariant: ref(''),
                itemLocation: ref(''),
                itemBinCode: ref(''),
                itemUnitOfMeasure: ref(''),
                itemQuantity: ref(''),
                itemShipmentMethod: ref(''),
                itemUnitPrice: ref(''),
                itemVAT:ref(0),
                itemLineAmount:ref(0)
            }

            const itemAvailabilityInfo = {
            itemInStockLocation:ref(0),
            itemOnSalesLocation:ref(0),
            itemInStockGlobal:ref(0),
            itemOnSalesGlobal:ref(0),
            itemOnPurchaseGlobal:ref(0),
            }


            const orderCardHeaderInfo = {
                orderCustomerNo : ref(''),
                orderDocumentNo : ref(''),
                orderItemNo : ref(''),
                orderSubject : ref(''),
                orderDescription : ref(''),
                orderStartDate : ref(''),
                orderEndDate : ref(''),
                orderType : ref(0),

            }

            const orderCardLines =  ref([])
   




 /////////////FUNCTIONS//////////////////////////  

            function  addEmptyRow(){
                orderCardLines.value.push(
                    {   
                        'Line No_':orderCardLines.value.length +1,
                        Type:2,
                        No_:'',
                        Description:'',
                        'Description 2':'',
                        'Variant Code':'',
                        'Location Code':'',
                        'Bin Code':'',
                        'Unit of Measure':'',
                        Quantity:0,
                        'Shipment Method Code':'',
                        'Unit Price':0,
                        'VAT _':0,
                        'Line Amount':0,
                    })
                    itemInfo.itemLineNo.value=orderCardLines.value.length +1
            }

            function  addCommentRow(){
                console.log( orderCardLines.value[0])
                orderCardLines.value.push(
                    {   
                        'Line No_': orderCardLines.value.length +1,
                        Type:0,
                        No_:'',
                        Description:'',
                        'Description 2':'',
                        'Variant Code':'',
                        'Location Code':'',
                        'Bin Code':'',
                        'Unit of Measure':'',
                        Quantity:'',
                        'Shipment Method Code':'',
                        'Unit Price':'',
                        'VAT _':'',
                        'Line Amount':'',
                    })
                    itemInfo.itemLineNo.value= orderCardLines.value.length +1
            }  
            
            
            function addRowByForm_andContinue(){
                if (itemInfo.itemType.value==2){
                    orderCardLines.value.push({
                        'Line No_':itemInfo.itemLineNo.value,
                        Type:itemInfo.itemType.value,
                        No_:itemInfo.itemCode.value,
                        Description:itemInfo.itemDescription.value,
                        'Description 2':itemInfo.itemDescription2.value?itemInfo.itemDescription2.value:'',
                        'Variant Code':itemInfo.itemVariant.value,
                        'Location Code':itemInfo.itemLocation.value,
                        'Bin Code':itemInfo.itemBinCode.value,
                        'Unit of Measure':itemInfo.itemUnitOfMeasure.value,
                        Quantity:+itemInfo.itemQuantity.value*1,
                        'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                        'Unit Price':+itemInfo.itemUnitPrice.value*1,
                        'VAT _':+itemInfo.itemVAT.value*1,
                        'Line Amount':itemInfo.itemQuantity.value*itemInfo.itemUnitPrice.value,
                    })
                }else{
                    orderCardLines.value.push({   
                        'Line No_':itemInfo.itemLineNo.value,
                        Type:0,
                        No_:'',
                        Description:itemInfo.itemDescription.value,
                        'Description 2':itemInfo.itemDescription2.value,
                        'Variant Code':'',
                        'Location Code':'',
                        'Bin Code':'',
                        'Unit of Measure':'',
                        Quantity:'',
                        'Shipment Method Code':'',
                        'Unit Price':'',
                        'VAT _':'',
                        'Line Amount':'',
                    })
                }
                itemInfo.itemLineNo.value++
                resetForm()
            }

            function resetForm(){
                itemInfo.itemType.value=2
                itemInfo.itemCode.value=''
                itemInfo.itemDescription.value=''
                itemInfo.itemDescription2.value=''
                itemInfo.itemVariant.value=''
                itemInfo.itemLocation.value=''
                itemInfo.itemBinCode.value=''
                itemInfo.itemUnitOfMeasure.value=''
                itemInfo.itemQuantity.value=''
                itemInfo.itemShipmentMethod.value=''
                itemInfo.itemUnitPrice.value=''
                itemInfo.itemVAT.value=0
                itemInfo.itemLineAmount.value=0

                
                itemAvailabilityInfo.itemInStockGlobal.value=0
                itemAvailabilityInfo.itemInStockLocation.value=0
                itemAvailabilityInfo.itemOnPurchaseGlobal.value=0
                itemAvailabilityInfo.itemOnSalesGlobal.value=0
                itemAvailabilityInfo.itemOnSalesLocation.value=0

            }


            function fillCustomerInfoField(customer){
                orderCardHeaderInfo.orderCustomerNo.value=customer['No_']
            }

            function fillItemInfoField(item){
                orderCardHeaderInfo.orderItemNo.value=item['No_']
            }

            function fillDocInfoField(doc){
                orderCardHeaderInfo.orderDocumentNo.value=doc['No_']
            }

            function displayErrorMessage(errorObject){
                if(errorObject.response && errorObject.response.status){
                    switch (errorObject.response.status){
                        case 401: 
                            submitting_message.value=''
                            error_message.value= errorObject.response.data.message;break;
                        case 400:
                            submitting_message.value='' 
                            error_message.value= errorObject.response.data.error.message
                            error_message_code.value= errorObject.response.data.error.code;break;
                        case 404:
                            submitting_message.value=''
                            error_message.value=errorObject.response.data.error.message
                            error_message_code.value= errorObject.response.data.error.code;break;
                        default:
                            submitting_message.value=''
                            error_message.value=errorObject.response
                    }
                }
                else{
                    error_message.value = errorObject.message
                    error_message_code.value = errorObject.code
                    console.log(errorObject)
                }
            }

            function createOrder(rrData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,rrData)
                .then(res => {
                    submitting_message.value=''
                    success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                    error_message.value=''
                    setTimeout(()=> router.push(`/DebtCollectionCard/${res.data.documentNo}`),5000)
                })
                .catch(err => {
                    displayErrorMessage(err)
                })
            }

            function formatToBCJsonData(data){
                
                const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
                const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
                console.log(JSONDataToSend)
                return {data:JSONDataToSend}
            }


            function submitForm(){
                submitting_message.value='Enregistrement en cours'
                const JSData = {
                    Parameter:'order_insert',
                    webUserName:useWebUserInfoStore().name,
                    'No_':'',
                    'Customer No_': orderCardHeaderInfo.orderCustomerNo.value,
                    'Document No_': orderCardHeaderInfo.orderDocumentNo.value,
                    'Item No_':orderCardHeaderInfo.orderItemNo.value,
                    'Subject':orderCardHeaderInfo.orderSubject.value,
                    'Description':orderCardHeaderInfo.orderDescription.value,
                    'Scheduled Start Date':orderCardHeaderInfo.orderStartDate,
                    'Scheduled End Date':orderCardHeaderInfo.orderEndDate,
                    'Created on':new Date().toISOString,
                    'Created by':useWebUserInfoStore().name,
                    'Reposs Type':orderCardHeaderInfo.orderType.value, 
                    'Reposs Item Status':orderCardHeaderInfo.orderItemNo.value,
                }
                createOrder(formatToBCJsonData(JSData))
            }

            
            onMounted(() =>{
                if(useWebUserInfoStore().defaultLanguage){
                    console.log()
                  
                }else{
                    axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                    .then(res=>{
                        useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                           console.log()
              
                    })
                    .catch(err=>console.log(err))
                }


            })


        return{
            ...orderCardHeaderInfo,
            fillCustomerInfoField,
            fillItemInfoField,
            fillDocInfoField,
            submitForm,
            error_message,
            error_message_code,
            success_message,
            submitting_message,
            webUserInfo,
            orderCardLines,
            addCommentRow,
            addEmptyRow,
            resetForm,
            itemAvailabilityInfo,
            addRowByForm_andContinue,
            itemInfo,
           
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('recovery')
            useNavigationTabStore().setActiveTab('transportOrder')
            this.$router.push('/TransportOrderCard/:id')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('neworderRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('neworderRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
          ///////////////////////methode pour  afficher le formulaire d'ajout d'article
          showaddRowByForm(){
            if (this.saleQuoteLocationCode){
                this.addItemModalShowned = true
                this.error_message=''
                this.error_message_code=''
            }else{
                this.error_message = "Vous devez d'abord indiquer le code magasin"
                this.error_message_code ="ERROR_FIELD_REQUIRED"
            }
        },
         ////////////////////////methode pour ajouter le formulaire de modification d'article
         showEditRowByFormModal(){
            this.editItemModalShowned = true
        },
      
        //////////methode pour étendre un onglet de la page
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='order_content') myElt.style.maxHeight='250px'
            else myElt.style.maxHeight='500px'
        },
        ////////////methode pour reduire un onglet de la page
        collapse(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight="0px"
        },
         ////////////////////////methode pour afficher les bouton d'un sous onglet de l'onglet ligne 
         selectOption(currentOpt){
            if (this.selected_option ==currentOpt) { this.show_option_btn_bar=!this.show_option_btn_bar;}
            else {this.selected_option= currentOpt;this.show_option_btn_bar=this.show_option_btn_bar?true:true}
        },
        /////////////////methode pour ajouter la couleur de la ligne une fois que l'user est dessus
        setLineShadow(id){
            const myElt=document.getElementById(id)
            const children =  myElt.childNodes
            children.forEach(element => {
                element.classList.add('has-background-light')
                element.classList.add('is-hover-orange')
                element.classList.add('is-hover-orange')
            })
        },
        ////////////////////methode pour enlever la couleur de la ligne une fois que l'user n'est plus dessus
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            const children =  myElt.childNodes
            children.forEach(element => {
                element.classList.remove('is-hover-orange')
                element.classList.remove('has-background-light')
                element.classList.remove('remove')
                element.classList.add('has-background-white')
            })
            //console.log(children)

        },

        onEdit(evt){
            const id =evt.target.id
            let value = evt.target.innerText
            const parentId= new String(id).split('-')[0]
            const parentAttri = new String(id).split('-')[2]
            if (parentAttri=="Quantity") {
                value =  Number(value)
                this.orderCardLines[parentId][parentAttri] = value
                this.orderCardLines[parentId]["Line Amount"] = value * Math.trunc(Number(this.orderCardLines[parentId]["Unit Price"]))
            }
            else{
                this.orderCardLines[parentId][parentAttri] = value
            }
         },
         endEdit(){
            this.$el.querySelector('.editme').blur()
         }

    }
}


</script>
<style scoped>

.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#order_content,#outgoing_content,#incoming_content{
    max-height: v-bind(height);
    overflow: hidden;
    transition: max-height 0.5s
}

</style>