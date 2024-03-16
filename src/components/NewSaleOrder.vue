<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <s-o-card-Header :soNo="'Client N° : '+customerCode" :soDesc="customerName" pageTitle="commande vente"></s-o-card-Header>
            </div>
<!---------Composant rubban fiche client----------------------->      
            <s-o-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="neworderRightInfoMaxWidth"
            :newCardBtnDisabled="true"
            :editCardBtnDisabled="true"
            :printCardBtnDisabled="true"
            :convertQuoteBtnDisabled="true"
            :readOnlyModeDisabled="true"
            ></s-o-card-ribbon>

<!---------Section formulaire fiche client----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

                    <a class="button" href="#" @click="getTheJsonData">getJSON</a>

<!---------sous-Section onglet 1 formulaire fiche client----------------------->                         
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
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet1_expanded">
                                <a href="#">
                                    Afficher plus
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="!onglet1_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">client gérald</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">26/02/2024</span>
                                <span class="has-background-grey-lighter py-2 px-3">ouvert</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-select v-model="customerCode" labelInputText="N° client" :is_disabled="false"  @openModal="activeModalForSelectableElementList='customerList';"></input-select>
                                <input-text v-model="customerName" labelInputText="Nom du client" :is_disabled="false" ></input-text>
                                <p class="has-text-left">
                                    <span class="title is-6">
                                        Donneur d'ordre
                                    </span>
                                </p>
                                <input-select v-model="customerPrimaryContactNo" labelInputText="N° Contact" :is_disabled="false" @openModal="activeModalForSelectableElementList='contactList'"></input-select>
                                <input-text v-model="customerContactName" labelInputText="Contact" :is_disabled="false"></input-text>
                                <input-text v-model="customerAddress" labelInputText="Adresse" :is_disabled="false"></input-text>
                                <input-text v-model="customerAddress2" labelInputText="Adresse (2ème ligne)" :is_disabled="false"></input-text>
                                <input-text v-model="customerCity" labelInputText="Ville" :is_disabled="false"></input-text>
                                <input-text v-model="customerPhone" labelInputText="N° Téléphone" :is_disabled="false"></input-text>
                                <input-text labelInputText="Adresse e*mail" :is_disabled="false"></input-text>
                            </div>
                            <div class="column">
                                <input-date v-model="orderDate" labelInputText="Date commande"  :is_disabled="false" ></input-date>
                                <input-date v-model="documentDate" labelInputText="Date document"  :is_disabled="false"></input-date>
                                <input-date v-model="dueDate" labelInputText="Date d'échéance" :is_disabled="false" ></input-date>
                                <input-date v-model="validityDate" labelInputText="Fin de validité devis" :is_disabled="false"></input-date>
                                <input-date v-model="shipRequestedDate" labelInputText="Date livraison demandée"  :is_disabled="false"></input-date>
                                <input-text v-model="customerSalespersonCode" labelInputText="Code vendeur" :is_disabled="false"></input-text>
                                <input-text labelInputText="N° campagne" :is_disabled="false"></input-text>
                                <input-text labelInputText="Centre de gestion" :is_disabled="false"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche client----------------------->                         
                    <div id="line">
                        <div :class="{'has-background-white':onglet2_expanded}">

                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('line_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Lignes</span>
                                    </a>
                                    <a @click="expand('line_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                        <span>Lignes</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet2_expanded">|</span>
    
                                    <!------------a href="#" class="ml-5" v-if="onglet2_expanded" @click="selectOption('gérer')">
                                        <span class="subtitle is-7" >Gérer</span>
                                    </a>
    
                                    <a href="#" class="ml-5" v-if="onglet2_expanded" @click="selectOption('ligne')">
                                        <span class="subtitle is-7" >Ligne</span>
                                    </a>
    
                                    <a href="#" class="ml-5" v-if="onglet2_expanded && show_more_option" @click="selectOption('commande')">
                                        <span class="subtitle is-7" >commande</span>
                                    </a>
    
                                    <a href="#" class="ml-5 is-hover-orange py-4 px-2" v-if="onglet2_expanded && show_more_option" @click="show_more_option=false">
                                        <span class="subtitle is-7" >Moins d'options</span>
                                    </a>
    
                                    <a href="#" class="ml-5 is-hover-orange py-4 px-2" v-if="onglet2_expanded && !show_more_option" @click="show_more_option=true">
                                        <span class="subtitle is-7" >Plus d'options</span>
                                    </a------------------->
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="showAddRowByFormModal">
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
                                            Ajouter un commentaire
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="addEmptyRow">
                                        <span class="icon">
                                            <i class="fas fa-plus has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7">
                                            Insérer une ligne
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
                            <div class="has-background-white shadow has-text-left p-3" v-if="show_option_btn_bar">
                                <!---------------a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                    <span class="subtitle is-7" >
                                        <a href="#" @click="showAddRowByFormModal">Ajouter un article</a>
                                    </span>
                                </a>
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                    <span class="subtitle is-7" >
                                        <a href="#" @click="showEditRowByFormModal">Modifier l'article</a>
                                    </span>
                                </a>
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='ligne'">
                                    <span class="icon">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                    <span class="subtitle is-7" @click="addEmptyRow">Ajouter une ligne</span>
                                </a>
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='ligne'">
                                    <span class="icon">
                                        <i class="fas fa-eraser"></i>
                                    </span>
                                    <span class="subtitle is-7" @click="deleteRow">Supprimer la ligne</span>
                                </a--------------->
                            </div>
                            <div id="line_content" class=" px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <div>
                                    <table class="table  is-narrow  is-fullwidth">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Ligne</th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type</th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description 2</th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code magasin</th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code unité</th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                                <th class="has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">% remise ligne</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of soLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                                <td class="has-text-left">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
    
                                                <td class="has-text-left p-1" >
                                                    {{ elt['Line No_'] }}
                                                </td>
                                                <td class="has-text-left p-1" >
                                                    {{ elt['Type']==2?'Article':'Commentaire' }}
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['No_']+'-No_'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['No_']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Description']+'-Description'" class="editme p-1" :contenteditable="true" v-text="elt['Description']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Description 2']+'-Description 2'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Description 2']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Location Code']+'-Location Code'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Location Code']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Quantity']+'-Quantity'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Quantity']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Unit of Measure']+'-Unit of Measure'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Unit of Measure']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Unit Price']+'-Unit Price'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Unit Price']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Line Discount _']+'-name'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Line Discount _']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="soLines.length==0">Il n'y'a rien à afficher</div>
                            </div>     

                        </div>
                        
<!---------sous-Section onglet 2 formulaire fiche client -----Modal d'ajout d'article----------------------->                         
                        <div :class="{'modal':true , 'is-active':addItemModalShowned }" v-if="addItemModalShowned">
                            <div class="modal-background has-background-white" style="opacity:0.7" @click.prevent="addItemModalShowned=false"></div>
                            <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                                
                                <form @submit.prevent="addRowByForm">

                                    <div class="has-text-left mb-5">
                                        <span class="is-size-3 subtitle ">Fiche ligne article</span>
                                    </div>

                                    <div class="modal-content-hist container">

                                        <div class="columns" >
                                            <div class="column">
                                                <div>
                                                    <input-text  v-model="itemCode" labelInputText="N°" :is_disabled="false"></input-text>
                                                    <input-text  v-model="itemDescription" labelInputText="Description" :is_disabled="false"></input-text>
                                                    <input-text  v-model="itemDescription2" labelInputText="Description 2" :is_disabled="false"></input-text>
                                                    <input-text  v-model="itemLocation" labelInputText="Code magasin" :is_disabled="false"></input-text>
                                                    <input-text  v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false"></input-text>
                                                    <input-text  v-model="itemUnitOfMeasure" labelInputText="Code unité"  :is_disabled="false"></input-text>
                                                    <input-text  v-model="itemUnitPrice" labelInputText="Prix unitaire" :is_disabled="false" ></input-text>
                                                    <input-text  v-model="itemLineDiscount" labelInputText="% remise"  :is_disabled="false" ></input-text>
                                                </div>
                                                <p class="title has-text-left is-6 mt-3">Disponibilité article Magasin : </p>
                                                <div class="columns">
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 v-model="itemInStockLocation" labelInputText="En stock" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 v-model="itemOnSalesLocation" labelInputText="En vente" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column">
                                                    </div>
                                                </div>
                                                <p class="title has-text-left is-6 mt-3">Disponibilité article Global : </p>
                                                <div class="columns my-0">
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 v-model="itemInStockGlobal" labelInputText="En stock" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 v-model="itemOnSalesGlobal" labelInputText="En vente" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 v-model="itemOnPurchaseGlobal" labelInputText="Sur achat" :is_disabled="true"></inputText1>
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
                                        
                                    <button type="submit" class="button has-background-orange is-fullwidth shadow has-text-white"> Ajouter la ligne</button>
                                    <button class="button has-background-white mt-1 is-fullwidth " @click="getItemAvailibility"> Disponibilité </button>
                                    
                                    </div> 
                                </form>
                            </div>
                            <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="addItemModalShowned=false"></button>
                        </div>
                    </div>                         
                    <br><br>

<!---------sous-Section ongle 3 formulaire fiche client----------------------->                         
                    <div id="details-facture">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('invoice_details_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>Détails facture</span>
                                </a>
                                <a @click="expand('invoice_details_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                    <span>Détails facture</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7" v-if="onglet3_expanded">Afficher plus</div>
                        </div>
                        <div id="invoice_details_content" class="columns">
                            <div class="column">
                                <input-select v-model="customerGenBusPostingGroup" labelInputText="Groupe compta. marché TVA" :is_disabled="false"></input-select>
                                <input-select v-model="customerVATBusPostingGroup" labelInputText="Groupe compta. marché" :is_disabled="false"></input-select>
                                <input-select v-model="customerShipmentMethodCode" labelInputText="Code condition règlement" :is_disabled="false"></input-select>
                            </div>
                            <div class="column">
                                <input-select v-model="customerLocationCode" labelInputText="Code magasin" :is_disabled="false"   @openModal="activeModalForSelectableElementList='locationList'"></input-select>
                                <input-select v-model="customerPaymentTermCode" labelInputText="Code condition paiement" :is_disabled="false"></input-select>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section ongle 4 formulaire fiche client----------------------->                         
                    <div id="expedition-facturation">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('delivery_invoicing_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                    <span>Expedition et facturation</span>
                                </a>
                                <a @click="expand('delivery_invoicing_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                    <span>Expedition et facturation</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7" v-if="onglet4_expanded">Afficher plus</div>
                        </div>
                        <div id="delivery_invoicing_content" class="columns">
                            <div class="column">
                                <input-select v-model="customerPrimaryContactNo" labelInputText="Contact" :is_disabled="false" @openModal="activeModalForSelectableElementList='contactList'"></input-select>
                                <p class="has-text-left">
                                    <span class="title is-6">
                                        Conditions de livraison
                                    </span>
                                </p>
                                <input-select v-model="customerShipmentMethodCode" labelInputText="Condition de livraison"  :is_disabled="false"></input-select>
                                <input-select v-model="customerShipToCode" labelInputText="Adresse de livraison"  :is_disabled="false" @openModal="activeModalForSelectableElementList='addressList'"></input-select>
                            </div>
                            <div class="column">
                                <input-text v-model="customerContactName" labelInputText="Nom Contact"  :is_disabled="false"></input-text>
                                <!--input-text v-model="customer" labelInputText="Nom" valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()"  :is_disabled="false"></input-text-->
                                <input-text v-model="shipToAddress" labelInputText="Adresse" valueInputText="new Date(soHeader['Date document']).toDateString()"  :is_disabled="false"></input-text>
                                <input-text labelInputText="Adresse (2ème ligne)" valueInputText="new Date(soHeader[`Date d'échéance`]).toDateString()"  :is_disabled="false"></input-text>
                                <input-text v-model="shipToCity" labelInputText="Ville" valueInputText="soHeader['N° doc. externe']"  :is_disabled="false"></input-text>
                                <input-text v-model="customer" labelInputText="Région/Etat" valueInputText="soHeader['N° devis']"  :is_disabled="false"></input-text>
                                <input-text v-model="customer" labelInputText="Code postal" valueInputText="soHeader['Code utilisateur assigné']"  :is_disabled="false"></input-text>
                                <input-text v-model="customer" labelInputText="Pays/région" valueInputText="soHeader['Statut']"  :is_disabled="false"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                </div>

<!---------composant info client----------------------->
                <customer-info class="customer-info" v-if="true"></customer-info>
                <prospect-info class="prospect-info" v-else></prospect-info>

            </div>
        </div>

<!---------------------------------------------->
        <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'"  
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-customer-list>

        <modal-for-selectable-item-list 
            v-if="activeModalForSelectableElementList=='itemList'" 
            :isActive="activeModalForSelectableElementList=='itemList'" 
            @closeModal="activeModalForSelectableElementList=''">
        </modal-for-selectable-item-list>

        <modal-for-selectable-location-list 
            v-if="activeModalForSelectableElementList=='locationList'" 
            :isActive="activeModalForSelectableElementList=='locationList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableLocationListModal="(elt)=>fillLocationInfoField(elt)">
        </modal-for-selectable-location-list>

        <modal-for-selectable-contact-list 
            v-if="activeModalForSelectableElementList=='contactList'" 
            :isActive="activeModalForSelectableElementList=='contactList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerName="customerName" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerId="customerCode" 
            @onGettingLineFromSelectableAddressListModal="(elt)=>fillAddressInfoField(elt)">
        </modal-for-selectable-address-list>

    </div>     
</template>
<script>
import SOCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import SOCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputText1 from './input/input-text1.vue'
import inputSelect from './input/input-select.vue'
import inputDate from './input/input-date.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import ModalForSelectableLocationList from './ModalForSelectableLocationList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import SelectableItemListForSale from './SelectableItemListForSale.vue'
import { ref } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
//import { useWebServiceInfoStore } from '@/Stores/WebServiceInfo'
import  axios  from 'axios'
//import { Buffer } from 'buffer'



export default {
    name:'sale-order-card',
    components:{
        SOCardHeader,
        CustomerInfo,
        ProspectInfo,
        inputText,
        inputText1,
        SOCardRibbon,
        inputSelect,
        inputDate,
        ModalForSelectableCustomerList,
        ModalForSelectableItemList,
        ModalForSelectableLocationList,
        ModalForSelectableContactList,
        ModalForSelectableAddressList,
        SelectableItemListForSale 
    },
    data(){
        return{

            //list:[],
            //taille (hauteur) initiale des onglets de la page
            height:'5000px',

            //taille (largeur) initiale du composant custumerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.newOrderRightInfoMaxWidth,

            //indique si les onglets de la page sont réduits ou pas
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,

            //indique si tous les options les lignes sont affichées
            show_more_option:false,

            //indique si la barre des boutons d'option est affichée
            show_option_btn_bar:false,

            //indique l'option par défaut
            selected_option:'',

            selected_line:'',

            //élement pour le modal ajout d'article
            addItemModalShowned:false,
            editItemModalShowned:false,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:''

        }
    },
    setup(){

 /////////////DATAS//////////////////////////           
            const currentDate = new Date(new Date()).toISOString().split('T')[0]

            //nom de l'hote dans l'url 
            const hostname = window.location.hostname;
            
            const customerInfo = {
                customerCode : ref(''),
                customerName : ref(''),
                customerPrimaryContactNo : ref(''),
                customerContactName : ref(''),
                customerAddress : ref(''),
                customerAddress2 : ref(''),
                customerCity : ref(''),
                customerPhone : ref(''),
                customerEmailAddress : ref(''),
                customerShipToCode : ref(''),
                customerPaymentTermCode : ref(''),
                customerSalespersonCode : ref(''),
                customerShipmentMethodCode : ref(''),
                customerPaymentMethodCode : ref(''),
                customerLocationCode : ref(''),
                customerGenBusPostingGroup : ref(''),
                customerVATBusPostingGroup : ref(''),
                customerPostingGroup : ref(''),
            }

            const dateInfo = {
                documentDate : ref(currentDate),
                orderDate : ref(currentDate),
                dueDate : ref(currentDate),
                validityDate : ref(currentDate),
                shipRequestedDate : ref(currentDate),
            }

            const shipToAddressInfo = {
                shipToCode : ref(''),
                shipToName :ref(''),
                shipToAddress :ref(''),
                shipToCity :ref(''),
                shipToPhone :ref(''),
            }


            const ItemInfo = {
                itemLineNo:ref(''),
                itemType: ref(''),
                itemCode: ref(''),
                itemDescription: ref(''),
                itemDescription2: ref(''),
                itemLocation: ref(''),
                itemQuantity: ref(''),
                itemUnitOfMeasure: ref(''),
                itemUnitPrice: ref(''),
                itemLineDiscount: ref(''),
            }

            const itemAvailibilityInfo = {
                itemInStockLocation:ref(''),
                itemInStockGlobal:ref(''),
                itemOnSalesLocation:ref(''),
                itemOnSalesGlobal:ref(''),
                itemOnPurchaseGlobal:ref('')
            }

            const soLines =  ref([])



 /////////////FUNCTIONS//////////////////////////      
   
            function  addEmptyRow(){
                soLines.value.push(
                    {   
                        'Line No_':(soLines.value.length +1),
                        Type:'',
                        No_:'',
                        Description:'',
                        'Description 2':'',
                        'Location Code':'',
                        Quantity:'',
                        'Unit of Measure':'',
                        'Unit Price':'',
                        'Line Discount _':''
                    })
            }

            function  addCommentRow(){
                soLines.value.push(
                    {   
                        'Line No_':(soLines.value.length +1),
                        Type:0,
                        No_:'',
                        Description:'',
                        'Description 2':'',
                        'Location Code':'',
                        Quantity:'',
                        'Unit of Measure':'',
                        'Unit Price':'',
                        'Line Discount _':''
                    })
            }

            
            function addRowByForm(){
                soLines.value.push(
                {
                    'Line No_':(soLines.value.length +1),
                    Type:2,    
                    No_:this.itemCode,
                    Description:this.itemDescription,
                    'Description 2':this.itemDescription2,
                    'Location Code':this.itemLocation,
                    Quantity:this.itemQuantity,
                    'Unit of Measure':this.itemUnitOfMeasure,
                    'Unit Price':this.itemUnitPrice,
                    'Line Discount _':this.itemLineDiscount 
                })

                console.log(soLines.value)
            }

            function fillCustomerInfoField(customer){
                this.customerCode=customer['No_']
                this.customerName=customer['Name']
                this.customerPrimaryContactNo=customer['Primary Contact No_']
                this.customerContactName=customer['Contact']
                this.customerAddress=customer['Address']
                this.customerAddress2=customer['Address 2']
                this.customerCity=customer['City']
                this.customerPhone =customer['Phone No_']
                this.customerShipToCode=customer['Ship-to Code']
                this.customerPaymentTermCode=customer['Payment Terms Code']
                this.customerSalespersonCode=customer['Salesperson Code']
                this.customerShipmentMethodCode=customer['Shipment Method Code']
                this.customerPaymentMethodCode=customer['Payment Method Code']
                this.customerLocationCode=customer['Location Code']
                this.itemLocation=customer['Location Code']
                this.customerGenBusPostingGroup=customer['Gen_ Bus_ Posting Group']
                this.customerVATBusPostingGroup=customer['VAT Bus_ Posting Group']
                this.customerPostingGroup=customer['Customer Posting Group']
                this.customerGlobalDim1=customer['Global Dimension 1 Code']
                this.customerGlobalDim2=customer['Global Dimension 2 Code']
                this.customerPriceGroup=customer['Customer Price Group']
            }

            function fillContactInfoField(contact){
                this.customerPrimaryContactNo=contact['No_']
                this.customerContactName=contact['Name']
                this.customerAddress=contact['Address']
                this.customerAddress2=contact['Address 2']
                this.customerEmailAddress=contact['E-Mail']
                this.customerCity=contact['City']
                this.customerPhone=contact['Phone No']
                this.customerSalespersonCode=contact['Salesperson Code']
            }

            function fillLocationInfoField(location){
                this.customerLocationCode = location['Code']
            }

            function fillAddressInfoField(address){
                this.customerShipToCode = address['Code']
                this.shipToAddress = address['Address']
                this.shipToCity = address['City']
                this.shipToPhone = address['Phone No_']
                this.customerShipmentMethodCode = this.customerShipmentMethodCode? this.customerShipmentMethodCode:address['Shipment Method Code']
            }

            function fillItemInfoField(item){
                this.itemType = item['Type']
                this.itemCode = item['No_']
                this.itemDescription = item['Description']
                this.itemDescription2 = item['Description 2']
                this.itemUnitOfMeasure = item['Sales Unit of Measure']
            }

            
            function saveNewsaleQuote(sqData){
                // const url = 'http://108.175.0.116:7048/BC230/ODataV4/api_GetLengthOfStringWithConfirmation?Company=b9643631-44bc-ee11-9080-6045bdc8c195'
                // const credentials = Buffer.from('108.175.0.116\\webservices:Afrikedge@2003').toString('base64');


                // const headers ={
                //     'Content-Type': 'application/json',
                //     'Authorization': `NTLM ${credentials}`,
                //     'accept': 'application/json',
                // }
                axios.post('http://localhost:3000/app/saveSaleQuote',sqData)
                .then(res => console.log(res))
                .catch(err => console.log(err))
               
                
            }


            function getTheJsonData(){
                
                const userInfoStore = useWebUserInfoStore()
                //const serviceInfoStore = useWebServiceInfoStore()

                const JSONData = {
                        webUserName:userInfoStore.name,
                        QuoteNo:'',
                        IsDeletion:0,
                        customerNo:customerInfo.customerCode.value,
                        customerContactCode:customerInfo.customerPrimaryContactNo.value,
                        customerAddrese:customerInfo.customerAddress.value,
                        customerAddresse2:customerInfo.customerAddress2.value,
                        customerCity:customerInfo.customerCity.value,
                        customerPhoneNo:customerInfo.customerPhone.value,
                        customerEmailAddress:customerInfo.customerEmailAddress.value,
                        saleQuoteOrderDate:dateInfo.orderDate.value,
                        saleQuoteDocumentDate:dateInfo.documentDate.value,
                        saleQuoteDueDate:dateInfo.dueDate.value,
                        saleQuoteValidUntilDate:dateInfo.validityDate.value,
                        saleQuoteShipRequestedDate:dateInfo.shipRequestedDate.value, 
                        saleQuoteResponsibilityCenter:userInfoStore.responsibilityCenter, 
                        customerGenBusPostingGroup:customerInfo.customerGenBusPostingGroup.value, 
                        customerVATBusPostingGroup:customerInfo.customerVATBusPostingGroup.value, 
                        customerShipmentMethodCode:customerInfo.customerShipmentMethodCode.value, 
                        saleQuoteShipToCode:customerInfo.customerShipToCode.value, 
                        saleQuoteLocationCode:customerInfo.customerLocationCode.value, 
                        customerPaymentMethodCode:customerInfo.customerPaymentMethodCode.value, 
                        customerPaymentTermsCode:customerInfo.customerPaymentTermCode.value,
                        saleQuoteLines:[
                            ...soLines.value
                        ]

                }
                const JSONFormatedData = JSON.stringify(JSONData).split('"').join('\\"')
                const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'

                saveNewsaleQuote({data:JSONDataToSend})
                console.log(JSONDataToSend)
            }

 /////////////COMPUTED//////////////////////////           
//  const getItemAvailibility = computed(()=>{
//         if(ItemInfo.itemLocation.value && ItemInfo.itemCode.value){
//             let result
//             axios.get(`http://localhost:3000/app/ItemAvailabilityInfo/${ItemInfo.itemCode.value}/${ItemInfo.itemLocation.value}`)
//             .then(res => {
//                 result = res.data.recordset
//             })
//             return result
//             }
//         else return ''
//  }

//             )

            function getItemAvailibility(){
                if(ItemInfo.itemCode.value){
                    axios.get(`http://${hostname}:3000/app/ItemAvailabilityInfo/${ItemInfo.itemCode.value}/${ItemInfo.itemLocation.value}`)
                    .then(res => {
                        console.log(res)
                    }).catch(err=>console.log(err))
                }

            }

        return{
            ...customerInfo,
            soLines,
            addEmptyRow,
            addCommentRow,
            addRowByForm,
            ...ItemInfo,
            ...shipToAddressInfo,
            ...dateInfo,
            ...itemAvailibilityInfo,
            getItemAvailibility,
            fillCustomerInfoField,
            fillContactInfoField,
            fillLocationInfoField,
            fillAddressInfoField,
            fillItemInfoField,
            getTheJsonData,
            //saveNewsaleQuote,
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('newOrderRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newOrderRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        ///////////////////////methode pour  afficher le formulaire d'ajout d'article
        showAddRowByFormModal(){
            this.addItemModalShowned = true
        },
        ////////////////////////methode pour ajouter le formulaire de modification d'article
        showEditRowByFormModal(){
            this.editItemModalShowned = true
        },
        //////////methode pour étendre un onglet de la page
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='line_content') myElt.style.maxHeight='250px'
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
        ///////////methode pour modifier directement une ligne d'article
        onEdit(evt){
            const id =evt.target.id
            const value = evt.target.innerText
            const parentId= new String(id).split('-')[0]
            const parentAttri = new String(id).split('-')[2]
            this.soLines[parentId][parentAttri] = value
            //console.log(this.soLines)
         },
         endEdit(){
            this.$el.querySelector('.editme').blur()
         }
    },
    mounted(){

    }
}

</script>
<style scoped>

.customer-info,prospect-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#line_content,#invoice_details_content,#international_content,#delivery_invoicing_content{
    max-height: v-bind(height);
    overflow: hidden;
    transition: max-height 0.5s
}

.has-border-bottom-grey{
    border-bottom: 1px solid rgba(0, 0, 0, 0.152);
}

.is-hover-orange:hover{
    background-color: rgba(255, 68, 0, 0.068);
}

.has-background-orange{
    background-color: rgba(255, 68, 0, 0.856);

}

div[contenteditable="true"]:focus {
    outline: none; /* Remove the default focus outline */
    border: 2px solid rgba(255, 89, 0, 0.437); /* Add your desired border style */
    background-color: #f9f9f9; /* Change the background color */
    /* Add any other styles you want */
}

</style>