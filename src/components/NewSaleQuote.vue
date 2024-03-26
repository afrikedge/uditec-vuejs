<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <s-q-card-Header :soNo="'Client N° : '+saleQuoteCustomerNo" :soDesc="saleQuoteCustomerName" pageTitle="Devis vente"
                @onGoingBackToList='goBackToList'
                ></s-q-card-Header>
            </div>
<!---------Composant rubban fiche client----------------------->      
            <s-q-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onSubmittingForm="submitForm"
            componentWithCompInfo="newquoteRightInfoMaxWidth"
            :newCardBtnIsDisabled="true"
            :editCardBtnIsDisabled="true"
            :printCardBtnIsDisabled="true"
            :convertQuoteBtnIsDisabled="true"
            :readOnlyModeIsDisabled="true"
            :cancelEditCardBtnIsDisabled="true"
            :checkItemAvailabilityBtnIsDisabled="false"
            ></s-q-card-ribbon>

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

<!---------Section formulaire fiche client----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

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
                                <span class="has-background-grey-lighter py-2 px-3" v-if="saleQuoteCustomerName"> {{ 'client '+ saleQuoteCustomerName }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" v-if="documentDate" style="border-left:1px solid black;border-right:1px solid black;">{{ documentDate }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" v-if="saleQuoteCustomerContactCode"> {{ saleQuoteCustomerContactCode }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-select v-model="saleQuoteCustomerNo" labelInputText="Code client" :is_disabled="false"  @openModal="activeModalForSelectableElementList='customerList';"></input-select>
                                
                                <input-text v-model="saleQuoteCustomerName" labelInputText="Nom du client" :is_disabled="false" ></input-text>
                                
                                <input-select v-model="saleQuoteCustomerContactCode" labelInputText="N° Contact" :is_disabled="false" @openModal="activeModalForSelectableElementList='contactList'"></input-select>
                                
                                <input-select v-model="saleQuoteCampaignNo" labelInputText="Code promo" :is_disabled="false" @openModal="activeModalForSelectableElementList='campaignList'"></input-select>
                                
                                <input-select v-model="saleQuoteLocationCode" labelInputText="Code magasin" :is_disabled="false" @openModal="activeModalForSelectableElementList='locationList'"></input-select>
                                
                                <input-select v-model="saleQuoteShipmentMethodCode" labelInputText="Mode de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='shipmentMethodList'"></input-select>
                                
                                <input-select v-model="saleQuoteCustomerShipToCode" labelInputText="Adresse de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='addressList'"></input-select>
                            </div>
                            <div class="column">
                                <input-date v-model="documentDate" labelInputText="Date du devis"  :is_disabled="false"></input-date>
                                
                                <input-date v-model="validityDate" labelInputText="Date fin validité" :is_disabled="false"></input-date>
                                
                                <input-date v-model="shipRequestedDate" labelInputText="Date livraison demandée"  :is_disabled="false"></input-date>
                                
                                <input-date v-model="promisedDeliveryDate" labelInputText="Date livraison promise" :is_disabled="false" ></input-date>
                                
                                <input-select v-model="saleQuotePaymentMethodCode" labelInputText="Mode de règlement" :is_disabled="false" @openModal="activeModalForSelectableElementList='paymentMethodList'"></input-select>
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
                            <div id="line_content" class=" px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <div>
                                    <table class="table  is-narrow  is-fullwidth">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° ligne</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code Article</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description 2</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code Variant</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Magasin de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Emplacement</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de mesure</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of saleQuoteCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
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
                                                <td class="has-text-left p-0" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['Description']+'-Description'" class="editme p-1" :contenteditable="true" v-text="elt['Description']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['Description 2']+'-Description 2'" class="editme p-1" :contenteditable="true" v-text="elt['Description 2']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Variant Code']+'-Variant Code'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Variant Code']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Location Code']+'-Location Code'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Location Code']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    {{ elt['Bin Code'] }}
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    {{ elt['Unit of Measure'] }}
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Quantity']+'-Quantity'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Quantity']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Shipment Method Code']+'-Shipment Method Code'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Shipment Method Code']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    {{ elt['Unit Price'] }}
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    {{ elt['VAT _'] }}
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    {{ elt['Line Amount'] }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="saleQuoteCardLines.length==0">Il n'y'a rien à afficher</div>
                            </div>     
                            <div class="columns mt-3" id="line_total" v-if="onglet2_expanded">
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="0" labelInputText="Montant TVA"></input-text1>
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="0" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="0" labelInputText="Montant TTC"></input-text1>
                                </div>
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

<!---------sous-Section ongle 3 formulaire fiche client----------------------->                         
                    <div id="quote-details">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('quote_details_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>Détails facture</span>
                                </a>
                                <a @click="expand('quote_details_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                    <span>Détails facture</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7" v-if="onglet3_expanded">Afficher plus</div>
                        </div>
                        <div id="quote_details_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Centre de gestion" :valueInputText="saleQuoteResponsibilityCenter" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Code vendeur" :valueInputText="saleQuoteSalesperson" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Canal de vente" :valueInputText="saleQuoteSalesChannel" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Mode de vente" :valueInputText="saleQuoteSalesMode" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="saleQuoteCustomerPriceGroup" :is_disabled="true"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Catégorie TVA" :valueInputText="saleQuoteVATBusPostingGroup" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Condition de paiement" :valueInputText="saleQuotePaymentTermsCode" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="% Acompte" :valueInputText="saleQuotePrepayment" :is_disabled="true"></input-text>
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
            :customerNo="saleQuoteCustomerNo" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerNo="saleQuoteCustomerNo" 
            @onGettingLineFromSelectableAddressListModal="(elt)=>fillAddressInfoField(elt)">
        </modal-for-selectable-address-list>

        <modal-for-selectable-campaign-list 
            v-if="activeModalForSelectableElementList=='campaignList'" 
            :isActive="activeModalForSelectableElementList=='campaignList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCampaignListModal="(elt)=>fillCampaignInfoField(elt)">
        </modal-for-selectable-campaign-list>

        <modal-for-selectable-payment-method-list 
            v-if="activeModalForSelectableElementList=='paymentMethodList'" 
            :isActive="activeModalForSelectableElementList=='paymentMethodList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectablePaymentMethodListModal="(elt)=>fillPaymentMethodInfoField(elt)">
        </modal-for-selectable-payment-method-list>

        <modal-for-selectable-shipment-method-list 
            v-if="activeModalForSelectableElementList=='shipmentMethodList'" 
            :isActive="activeModalForSelectableElementList=='shipmentMethodList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableShipmentMethodListModal="(elt)=>fillShipmentMethodInfoField(elt)">
        </modal-for-selectable-shipment-method-list>

    </div>     
</template>
<script>
import SQCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import SQCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputText1 from './input/input-text1.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic from './input/input-select-basic.vue'
import inputDate from './input/input-date.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableCampaignList from './ModalForSelectableCampaignList.vue'
import ModalForSelectableShipmentMethodList from './ModalForSelectableShipmentMethodList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import ModalForSelectableLocationList from './ModalForSelectableLocationList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import SelectableItemListForSale from './SelectableItemListForSale.vue'
import { ref } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import  axios  from 'axios'
import { useRouter } from 'vue-router'

//import { Buffer } from 'buffer'



export default {
    name:'sale-quote-card',
    components:{
        SQCardHeader,
        CustomerInfo,
        ProspectInfo,
        inputText,
        inputText1,
        SQCardRibbon,
        inputSelect,
        inputSelectBasic,
        inputDate,
        ModalForSelectableCustomerList,
        ModalForSelectableCampaignList,
        ModalForSelectablePaymentMethodList,
        ModalForSelectableShipmentMethodList,
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
            height:'700px',

            //taille (largeur) initiale du composant custumerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.newquoteRightInfoMaxWidth,

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
            activeModalForSelectableElementList:'',

        }
    },
    setup(){

 /////////////DATAS//////////////////////////   
            
            const router = useRouter()
            const currentDate = new Date(new Date()).toISOString().split('T')[0]
            const isItemInfoToFill = ref(false)

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
            
            const dateInfo = {
                documentDate : ref(currentDate),
                validityDate : ref(currentDate),
                shipRequestedDate : ref(currentDate),
                promisedDeliveryDate : ref(currentDate),
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

            const saleQuoteCardHeaderInfo = {
                saleQuoteCustomerNo : ref(webUserInfo.defaultCustomerNo),
                saleQuoteCustomerName : ref(webUserInfo.defaultCustomerName),
                saleQuoteCustomerContactCode : ref(webUserInfo.defaultCustomerContactCode),
                saleQuoteCampaignNo : ref(''),
                saleQuoteLocationCode : ref(webUserInfo.defaultLocation),
                saleQuoteShipmentMethodCode : ref(webUserInfo.defaultCustomerShipmentMethodCode),
                saleQuoteCustomerShipToCode : ref(webUserInfo.defaultCustomerShipToCode),
                saleQuotePaymentMethodCode : ref(webUserInfo.defaultCustomerPaymentMethodCode),
                saleQuoteResponsibilityCenter : ref(webUserInfo.responsibilityCenter),
                saleQuoteSalesperson : ref(webUserInfo.defaultSalesPersonCode),
                saleQuoteSalesChannel : ref(webUserInfo.defaultSalesChannel),
                saleQuoteSalesMode : ref(webUserInfo.defaultCustomerSalesMode),
                saleQuoteCustomerPriceGroup : ref(webUserInfo.defaultCustomerPriceGroup),
                saleQuoteVATBusPostingGroup : ref(webUserInfo.defaultCustomerVATBusPostingGroup),
                saleQuotePaymentTermsCode : ref(webUserInfo.defaultCustomerPaymentTermsCode),
                saleQuotePrepayment: ref(webUserInfo.defaultCustomerPrepayment),
            }



            const saleQuoteCardLines =  ref([])



 /////////////FUNCTIONS//////////////////////////      
   
            function  addEmptyRow(){
                saleQuoteCardLines.value.push(
                    {   
                        'Line No_':saleQuoteCardLines.value.length +1,
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
                    itemInfo.itemLineNo.value=saleQuoteCardLines.value.length +1
            }

            function  addCommentRow(){
                console.log(saleQuoteCardLines.value[0])
                saleQuoteCardLines.value.push(
                    {   
                        'Line No_':saleQuoteCardLines.value.length +1,
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
                    itemInfo.itemLineNo.value=saleQuoteCardLines.value.length +1
            }

            
            function addRowByForm_andContinue(){
                if (itemInfo.itemType.value==2){
                    saleQuoteCardLines.value.push({
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
                    saleQuoteCardLines.value.push({   
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

            function addRowByForm_andClose(){
                if (itemInfo.itemType.value==2){
                    saleQuoteCardLines.value.push(
                    {
                        'Line No_':itemInfo.itemLineNo.value,
                        Type:itemInfo.itemType.value,
                        No_:itemInfo.itemCode.value,
                        Description:itemInfo.itemDescription.value,
                        'Description 2':itemInfo.itemDescription2.value?itemInfo.itemDescription2.value:'',
                        'Variant Code':itemInfo.itemVariant.value,
                        'Location Code':itemInfo.itemLocation.value,
                        'Bin Code':itemInfo.itemBinCode.value,
                        'Unit of Measure':itemInfo.itemUnitOfMeasure.value,
                        Quantity:itemInfo.itemQuantity.value*1,
                        'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                        'Unit Price':itemInfo.itemUnitPrice.value*1,
                        'VAT _':itemInfo.itemVAT.value*1,
                        'Line Amount':itemInfo.itemQuantity.value*itemInfo.itemUnitPrice.value,
                    })
                }else{
                    saleQuoteCardLines.value.push(
                    {   
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
                console.log(saleQuoteCardLines.value)
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
                saleQuoteCardHeaderInfo.saleQuoteCustomerNo.value=customer['No_']
                saleQuoteCardHeaderInfo.saleQuoteCustomerName.value=customer['Name']
                saleQuoteCardHeaderInfo.saleQuoteCustomerContactCode.value=customer["Primary Contact No_"]
                saleQuoteCardHeaderInfo.saleQuotePaymentMethodCode.value=customer['Payment Method Code']
                saleQuoteCardHeaderInfo.saleQuotePaymentTermsCode.value=customer['Payment Terms Code']
                saleQuoteCardHeaderInfo.saleQuotePrepayment.value=customer['Prepayment _']
                saleQuoteCardHeaderInfo.saleQuoteShipmentMethodCode.value=customer['Shipment Method Code']
                saleQuoteCardHeaderInfo.saleQuoteVATBusPostingGroup.value=customer['VAT Bus_ Posting Group']
                saleQuoteCardHeaderInfo.saleQuoteCustomerPriceGroup.value=customer['Customer Price Group']
                saleQuoteCardHeaderInfo.saleQuoteCustomerShipToCode.value=customer['Ship-to Code']
                saleQuoteCardHeaderInfo.saleQuoteSalesMode.value=customer['Sales Mode']
            }

            function fillContactInfoField(contact){
                saleQuoteCardHeaderInfo.saleQuoteCustomerContactCode.value=contact['No_']
            }

            function fillLocationInfoField(location){
                if(isItemInfoToFill.value){
                    itemInfo.itemLocation.value=location['Code']
                    isItemInfoToFill.value=false
                }else{
                    saleQuoteCardHeaderInfo.saleQuoteLocationCode.value = location['Code']
                }
            }

            function fillAddressInfoField(address){
                saleQuoteCardHeaderInfo.saleQuoteCustomerShipToCode.value = address["Code"]
            }

            function fillCampaignInfoField(campaign){
            saleQuoteCardHeaderInfo.saleQuoteCampaignNo.value=campaign["No_"]
            }

            function fillPaymentMethodInfoField(paymentMethod){
                saleQuoteCardHeaderInfo.saleQuotePaymentMethodCode.value=paymentMethod["Code"]
            }

            function fillShipmentMethodInfoField(shipmentMethod){
                if(isItemInfoToFill.value){
                    itemInfo.itemShipmentMethod.value=shipmentMethod['Code']
                    isItemInfoToFill.value=false
                }else{
                    saleQuoteCardHeaderInfo.saleQuoteShipmentMethodCode.value=shipmentMethod["Code"]
                }
            }

            function fillItemInfoField(item){
                itemInfo.itemType.value = 2
                itemInfo.itemCode.value = item['No_']
                itemInfo.itemDescription.value = item['Description']
                itemInfo.itemDescription2.value = item['Description 2']
                itemInfo.itemLocation.value = saleQuoteCardHeaderInfo.saleQuoteLocationCode.value
                itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
                itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:saleQuoteCardHeaderInfo.saleQuoteShipmentMethodCode.value


                if (itemInfo.itemLocation.value){
                    getItemLocationBinCode(itemInfo.itemLocation.value)
                }

                if (itemInfo.itemCode.value && itemInfo.itemLocation.value){
                    getItemAvailabilityInfo()
                }
            }

            function getItemLocationBinCode(itemLocation){
                axios.get(`http://${hostname}:3000/app/getLocationBinCode/${itemLocation}?respCenter=${webUserInfo.responsibilityCenter}`)
                    .then(res => {
                        itemInfo.itemBinCode.value = res.data.recordset[0]['Shipment Bin Code']
                    })
                    .catch(err => console.log(err))
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

            function getItemAvailabilityInfo(){
                axios.get(`http://${hostname}:3000/app/getItemAvailabilityInfo/${itemInfo.itemCode.value}/${itemInfo.itemLocation.value}`)
                .then(res =>{
                    if (new Array(res.data.recordset).length>0){
                        const data =  res.data.recordset[0]
                        itemAvailabilityInfo.itemInStockLocation.value = data["In Stock Location"]
                        itemAvailabilityInfo.itemOnSalesLocation.value = data["On Sales Location"]
                        itemAvailabilityInfo.itemInStockGlobal.value = data["In Stock Global"]
                        itemAvailabilityInfo.itemOnSalesGlobal.value = data["On Sales Global"]
                        itemAvailabilityInfo.itemOnPurchaseGlobal.value = data["On Purchase Global"]
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            
            function createSaleQuote(sqData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
                .then(res => {
                    submitting_message.value=''
                    success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                    error_message.value=''
                    setTimeout(()=> router.push(`/saleQuoteCard/${res.data.documentNo}`),5000)
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
                    Parameter:'quotes_insert',
                    webUserName:webUserInfo.name,
                    QuoteNo:'',
                    saleQuoteCustomerNo: saleQuoteCardHeaderInfo.saleQuoteCustomerNo.value,
                    saleQuoteCustomerContactCode: saleQuoteCardHeaderInfo.saleQuoteCustomerContactCode.value,
                    saleQuoteResponsibilityCenter:saleQuoteCardHeaderInfo.saleQuoteResponsibilityCenter.value,
                    saleQuoteSalesperson:saleQuoteCardHeaderInfo.saleQuoteSalesperson.value,
                    saleQuoteCampaignNo:saleQuoteCardHeaderInfo.saleQuoteCampaignNo.value,
                    saleQuoteLocationCode:saleQuoteCardHeaderInfo.saleQuoteLocationCode.value,
                    saleQuoteSalesChannel:saleQuoteCardHeaderInfo.saleQuoteSalesChannel.value,
                    saleQuoteSalesMode:saleQuoteCardHeaderInfo.saleQuoteSalesMode.value?saleQuoteCardHeaderInfo.saleQuoteSalesMode.value:'',
                    saleQuoteCustomerPriceGroup:saleQuoteCardHeaderInfo.saleQuoteCustomerPriceGroup.value,
                    saleQuoteVATBusPostingGroup:saleQuoteCardHeaderInfo.saleQuoteVATBusPostingGroup.value, 
                    saleQuoteDocumentDate:dateInfo.documentDate.value?dateInfo.documentDate.value:'1753-01-01',
                    saleQuoteValidUntilDate:dateInfo.validityDate.value?dateInfo.validityDate.value:'1753-01-01',
                    saleQuoteShipRequestedDate:dateInfo.shipRequestedDate.value?dateInfo.shipRequestedDate.value:'1753-01-01', 
                    saleQuotePromisedDeliveryDate:dateInfo.promisedDeliveryDate.value?dateInfo.promisedDeliveryDate.value:'1753-01-01', 
                    saleQuotePaymentMethodCode:saleQuoteCardHeaderInfo.saleQuotePaymentMethodCode.value, 
                    saleQuotePaymentTermsCode:saleQuoteCardHeaderInfo.saleQuotePaymentTermsCode.value,
                    saleQuotePrepayment:saleQuoteCardHeaderInfo.saleQuotePrepayment.value, 
                    saleQuoteCustomerShipToCode:saleQuoteCardHeaderInfo.saleQuoteCustomerShipToCode.value, 
                    saleQuoteShipmentMethodCode:saleQuoteCardHeaderInfo.saleQuoteShipmentMethodCode.value, 
                    saleQuoteLines:[
                        ...saleQuoteCardLines.value
                    ]
                }
                createSaleQuote(formatToBCJsonData(JSData))
            }



        return{
            isItemInfoToFill,
            ...saleQuoteCardHeaderInfo,
            saleQuoteCardLines,
            ...itemInfo,
            ...itemAvailabilityInfo,
            ...dateInfo,
            fillCustomerInfoField,
            fillContactInfoField,
            fillLocationInfoField,
            fillAddressInfoField,
            fillCampaignInfoField,
            fillPaymentMethodInfoField,
            fillShipmentMethodInfoField,
            fillItemInfoField,
            addEmptyRow,
            addCommentRow,
            addRowByForm_andContinue,
            addRowByForm_andClose,
            submitForm,
            resetForm,
            error_message,
            error_message_code,
            success_message,
            submitting_message
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveTab('saleQuotes')
            this.$router.push('/')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('newquoteRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newquoteRightInfoMaxWidth','0px')
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
            let value = evt.target.innerText
            const parentId= new String(id).split('-')[0]
            const parentAttri = new String(id).split('-')[2]
            if (parentAttri=="Quantity") {
                value = value*1
                this.saleQuoteCardLines[parentId][parentAttri] = value
                this.saleQuoteCardLines[parentId]["Line Amount"] = value * this.saleQuoteCardLines[parentId]["Unit Price"]
            }
            else{
                this.saleQuoteCardLines[parentId][parentAttri] = value
            }
            //console.log(this.saleQuoteCardLines)
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

#general_content,#line_content,#quote_details_content,#international_content,#delivery_invoicing_content{
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