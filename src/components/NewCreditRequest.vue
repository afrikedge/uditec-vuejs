<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <c-r-card-Header :soNo="'Client N° : '+creditRequestCustomerNo" :soDesc="creditRequestCustomerName" pageTitle="Demande de crédit"
                @onGoingBackToList='goBackToList'
                ></c-r-card-Header>
            </div>
<!---------Composant rubban fiche client----------------------->      
            <c-r-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onSubmittingForm="submitForm"
            @onPrintingVisitCard="printVisitCard"
            @onPrintingComityCard="printComityCard"
            @onSimulatingCredit="simulateCredit"
            componentWithCompInfo="newquoteRightInfoMaxWidth"
            :readOnlyModeIsDisabled="true"
            :checkItemAvailabilityBtnIsDisabled="false"
            :simulateCreditBtnIsDisabled="false"
            ></c-r-card-ribbon>

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
                                <span class="has-background-grey-lighter py-2 px-3" v-if="creditRequestCustomerName"> {{ 'client '+ creditRequestCustomerName }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" v-if="documentDate" style="border-left:1px solid black;border-right:1px solid black;">{{ documentDate }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" v-if="creditRequestCustomerContactCode"> {{ creditRequestCustomerContactCode }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-select v-model="creditRequestCustomerNo" labelInputText="Code client" :is_disabled="false"  @openModal="activeModalForSelectableElementList='customerList';"></input-select>
                                
                                <input-text v-model="creditRequestCustomerName" labelInputText="Nom du client" :is_disabled="false" is_read-only="true"></input-text>
                                
                                <input-select v-model="creditRequestCustomerContactCode" labelInputText="N° Contact" :is_disabled="false" @openModal="activeModalForSelectableElementList='contactList'"></input-select>
                                
                                <!---input-select v-model="creditRequestCampaignNo" labelInputText="Code promo" :is_disabled="false" @openModal="activeModalForSelectableElementList='campaignList'"></input-select---->
                                
                                <input-select v-model="creditRequestLocationCode" labelInputText="Code magasin" :is_disabled="false" @openModal="activeModalForSelectableElementList='locationList'"></input-select>
                                
                                <input-select v-model="creditRequestShipmentMethodCode" labelInputText="Mode de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='shipmentMethodList'"></input-select>
                                
                                <input-select v-model="creditRequestCustomerShipToCode" labelInputText="Adresse de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='addressList'"></input-select>
                            </div>
                            <div class="column">
                                <input-date v-model="documentDate" labelInputText="Date du devis"  :is_disabled="false"></input-date>
                                
                                <input-date v-model="validityDate" labelInputText="Date fin validité" :is_disabled="false"></input-date>
                                
                                <input-date v-model="shipRequestedDate" labelInputText="Date livraison demandée"  :is_disabled="false"></input-date>
                                
                                <input-date v-model="promisedDeliveryDate" labelInputText="Date livraison promise" :is_disabled="false" ></input-date>
                                
                                <input-select v-model="creditRequestPaymentMethodCode" labelInputText="Mode de règlement" :is_disabled="false" @openModal="activeModalForSelectableElementList='paymentMethodList'"></input-select>
                            
                                <input-number labelInputText="% Acompte" v-model="creditRequestPrepayment"></input-number>

                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche demande de credit----------------------->                         
                    <div id="credit-details">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('credit_details_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                    <span>Détails demande de crédit</span>
                                </a>
                                <a @click="expand('credit_details_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                    <span>Détails demande de crédit</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet2_expanded">Afficher plus</div>
                            <div class="column is-narrow  py-0 has-text-right is-size-7" v-if="!onglet2_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestResponsibilityCenter }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;"> {{ creditRequestSalesperson }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestVATBusPostingGroup }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ creditRequestSalesChannel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ mirindraGP.salesMode }}</span>
                            </div>
                        </div>
                        <div id="credit_details_content" class="columns">
                            <div class="column">                                                                                                
                                <input-text labelInputText="Centre de gestion" :valueInputText="creditRequestResponsibilityCenter" :is_disabled="true"></input-text>
                                <input-text labelInputText="Code vendeur" :valueInputText="creditRequestSalesperson" :is_disabled="true" ></input-text>
                                <input-text labelInputText="Canal de vente" :valueInputText="creditRequestSalesChannel" :is_disabled="true"  ></input-text>
                                <input-text labelInputText="Mode de vente" :valueInputText="mirindraGP.salesMode" :is_disabled="true" ></input-text>
                            </div>
                            <div class="column">                                
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="creditRequestCustomerPriceGroup" :is_disabled="true"></input-text>
                                <input-text labelInputText="Catégorie TVA" :valueInputText="creditRequestVATBusPostingGroup" :is_disabled="true"></input-text>
                                <input-text labelInputText="Condition de paiement" :valueInputText="mirindraGP.paymentTermsCode" :is_disabled="true"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche client----------------------->                         
                    <div id="line">
                        <div :class="{'has-background-white':onglet3_expanded}">
                            <div :class="{'columns':!onglet3_expanded,'p-3':onglet3_expanded,'has-border-bottom-grey':onglet3_expanded,'has-border-bottom':!onglet3_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('line_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                        <span>Lignes</span>
                                    </a>
                                    <a @click="expand('line_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                        <span>Lignes</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet3_expanded">|</span>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet3_expanded" @click="showaddRowByForm">
                                        <span class="icon">
                                            <i class="fas fa-plus has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7" >
                                            Ajouter un article
                                        </span>
                                    </a>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet3_expanded" @click="addCommentRow">
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet3_expanded" @click="showEditRowByFormModal">
                                        <span class="icon">
                                            <i class="fas fa-edit has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7" >
                                            Modifier l'article
                                        </span>
                                    </a>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet3_expanded" @click="deleteRow">
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
                                            <tr :id="index" v-for="(elt,index) of creditRequestCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
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
                                <div v-if="creditRequestCardLines.length==0">Il n'y'a rien à afficher</div>
                            </div>     
                            <div class="columns mt-3" id="line_total" v-if="onglet3_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="totalAmountExclVAT" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="totalVAT" labelInputText="Montant TVA"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="totalAmountIncVAT" labelInputText="Montant TTC"></input-text1>
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

<!---------sous-Section onglet 4 formulaire fiche   demande de credit----------------------->                         
                    <div id="credit">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('credit_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                    <span>Crédit</span>
                                </a>
                                <a @click="expand('credit_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                    <span>Crédit</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7" v-if="onglet4_expanded">Afficher plus</div>
                           <div class="column is-narrow py-0 has-text-right is-size-7" v-if="!onglet4_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">{{ approvalStatus==0?'Ouvert':approvalStatus==1?'Lancé':approvalStatus==2?'En attente approbation':'Acompte en cours' }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;"> {{ eligibleAmount }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ duration }}</span>
                            </div>
                        </div>
                        <div id="credit_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Statut validation" :valueInputText="approvalStatus==0?'Ouvert':approvalStatus==1?'Lancé':approvalStatus==2?'En attente approbation':'Acompte en cours'" :is_disabled="true"></input-text>
                                
                                <input-number labelInputText="Montant du plafond de crédit" v-model="eligibleAmount"></input-number>

                                <input-text labelInputText="Taux d’intérêt" :valueInputText="mirindraGP.monthlyInterestRate" :is_disabled="true"></input-text>
                                
                                <input-number labelInputText="Durée (mois)" v-model="duration" @click="()=>console.log(depositAmount)"></input-number>
                                
                                <input-text labelInputText="Acompte exigé" :valueInputText="requiredDeposit" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant de d’acompte" :valueInputText="depositAmount" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant principal du crédit" :valueInputText="chargeableAmount" :is_disabled="true"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Montant des intérêts hors taxe" :valueInputText="interest" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant de la TVA sur intérêt" :valueInputText="VATonInterest" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant des intérêts toutes taxes comprises" :valueInputText="interestIncVAT" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant total du crédit" :valueInputText="loanAmount" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant total de l’accord" :valueInputText="totalAgreement" :is_disabled="true"></input-text>
                                <input-text labelInputText="Mensualité" :valueInputText="installment" :is_disabled="true"></input-text>
                                <input-text labelInputText="Dernière mensualité" :valueInputText="finalInstallment" :is_disabled="true"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 6 formulaire fiche demande de credit----------------------->                         
                    <div id="amortissement">
                        <div :class="{'has-background-light':onglet5_expanded}">
                            <div :class="{'columns':!onglet5_expanded,'p-3':onglet5_expanded,'has-border-bottom-grey':onglet5_expanded,'has-border-bottom':!onglet5_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('amortization_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                        <span>Amortissement</span>
                                    </a>
                                    <a @click="expand('amortization_content');onglet5_expanded=!onglet5_expanded" v-if="!onglet5_expanded">
                                        <span>Amortissement</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            
                            <div id="amortization_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Numéro Ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Facteur de calcul</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mensualité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Interest déduite</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Amortissement</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Dette restante</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Intérêts restants</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Solde règlement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of creditRequestAmortization" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Line No_'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Calculation factor'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Monthly payment'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Interest'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Depreciation'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Remaining debt'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Abandoned interests'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Payment balance'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-if="creditRequestAmortization.length==0 && onglet5_expanded">Il n'y'a rien à afficher</div>     
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
            :customerNo="creditRequestCustomerNo" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerNo="creditRequestCustomerNo" 
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
import CRCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import CRCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputText1 from './input/input-text1.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic from './input/input-select-basic.vue'
import inputDate from './input/input-date.vue'
import inputNumber from './input/input-number.vue'

import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableCampaignList from './ModalForSelectableCampaignList.vue'
import ModalForSelectableShipmentMethodList from './ModalForSelectableShipmentMethodList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import ModalForSelectableLocationList from './ModalForSelectableLocationList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import SelectableItemListForSale from './SelectableItemListForSale.vue'
import { computed, onMounted, ref } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useMirindraGPInfoStore } from '@/Stores/MirindraGPInfo'
import  axios  from 'axios'
import { useRouter } from 'vue-router'

//import { Buffer } from 'buffer'



export default {
    name:'sale-quote-card',
    components:{
        CRCardHeader,
        CustomerInfo,
        ProspectInfo,
        inputText,
        inputText1,
        CRCardRibbon,
        inputSelect,
        inputSelectBasic,
        inputDate,
        inputNumber,
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
            onglet2_expanded:false,
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

            const mirindraGP = ref({})

            const totalAmountExclVAT = computed(()=> {
                let sum = 0
                creditRequestCardLines.value.forEach(elt =>{
                    sum = sum + elt['Line Amount']
                })
                return sum
            })
            
            const totalVAT = computed(() => {
                let sum = 0
                creditRequestCardLines.value.forEach(elt =>{
                    sum = sum + elt['Line Amount'] * elt['VAT _'] /100
                })
                return sum
            })

            const totalAmountIncVAT = computed(() => {
                return totalAmountExclVAT.value + totalVAT.value
            })

            const depositAmount = computed(() =>{
                return totalAmountIncVAT.value * creditRequestCardHeaderInfo.creditRequestPrepayment.value /100
            })
            
            const chargeableAmount = computed(() =>{
                return totalAmountIncVAT.value - depositAmount.value
            })

            const interest = computed(() =>{
                return chargeableAmount.value * mirindraGP.value.monthlyInterestRate * creditRequestCardCreditInfo.duration.value/100
            })

            const VATonInterest1 = computed(() =>{
                let found = false
                let vat
                creditRequestCardLines.value.forEach(elt =>{
                    if (elt['No_']==mirindraGP.value.itemForInterest){
                        found = true
                        vat = elt['VAT _']
                    } 
                })
                if(found){
                    return interest.value * vat/100
                }else{
                    return 0
                }
            })

            const VATonInterest =  computed(() =>{
                return VATonInterest1.value
            })

            const interestIncVAT = computed(() =>{
                return interest.value + VATonInterest.value
            })

            const loanAmount = computed(() =>{
                return chargeableAmount.value + interestIncVAT.value
            })

            const totalAgreement = computed(() =>{
                return loanAmount.value + depositAmount.value
            })

            const installment = computed(() =>{
                let amount = 0
                switch(mirindraGP.value.roundingRule) {
                    case 1:
                        amount = Math.round((loanAmount.value / creditRequestCardCreditInfo.duration.value)/100) *100
                        break;
                    case 2:
                        amount = Math.round((loanAmount.value / creditRequestCardCreditInfo.duration.value)/1000) *1000
                        break;
                    default:
                        amount = loanAmount.value / creditRequestCardCreditInfo.duration.value
                }
                return amount
            })

            const finalInstallment = computed(() =>{
                return loanAmount.value - (installment.value*(creditRequestCardCreditInfo.duration.value-1))
            })

            function simulateCredit(){
                axios.get(`http://${hostname}:3000/app/getAmortization?docNo=${''}&duration=${creditRequestCardCreditInfo.duration.value}&loanAmount=${loanAmount.value}&installment=${installment.value}&finalInstallment=${finalInstallment.value}&interestInclVAT=${interestIncVAT.value}`)
                .then(result => {
                    console.log(result)
                    creditRequestAmortization.value = result.data
                })
                .catch(err => console.log(err))
            }

            function getVATonItem(VATOnCust,VATOnItem,lineNo,lineAttrib){
                axios.get(`http://${hostname}:3000/app/getItemVAT?VATOnItem=${VATOnItem}&VATOnCust=${VATOnCust}`)
                .then(result =>{
                    console.log('salut',result)
                    creditRequestCardLines.value[lineNo][lineAttrib]=Number(result.data)
                })
                .catch(err => console.log(err))
            }

            function getUserInfo(){
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo = {
                        ...useWebUserInfoStore().getWebUser
                    }
                })
                .catch(err=>console.log(err))

            }

            function getRequiredDeposit(){
                axios.get(`http://${hostname}:3000/app/getMirindraRD`)
                .then(result => {
                    creditRequestCardCreditInfo.requiredDeposit.value = result.data
                    creditRequestCardHeaderInfo.creditRequestPrepayment.value = result.data
                })
                .catch(err => console.log(err))
            }

            function getInterestItemInfo(){
                axios.get(`http://${hostname}:3000/app/getItemCard/${mirindraGP.value.itemForInterest}?respCenter=${webUserInfo.responsibilityCenter}`)
                .then(result =>{
                    addInterestItemLine(result.data.recordset[0])
                    if(mirindraGP.value.itemForInterest && itemInfo.itemFeesIsAdded.value==false){
                        getFeesItemInfo()
                    }

                })
                .catch(err => console.log(err))
            }

            function getFeesItemInfo(){
                axios.get(`http://${hostname}:3000/app/getItemCard/${mirindraGP.value.itemForApplicationFees}?respCenter=${webUserInfo.responsibilityCenter}`)
                .then(result =>{
                    addFeesItemLine(result.data.recordset[0])
                })
                .catch(err => console.log(err))
            }

            function addInterestItemLine(data){
                itemInfo.itemLineNo.value=itemInfo.itemLineNo.value+1
                creditRequestCardLines.value.push({
                    'Line No_':itemInfo.itemLineNo.value,
                    Type:2,
                    No_:mirindraGP.value.itemForInterest,
                    Description:data['Description'],
                    'Description 2':data['Description 2']?data['Description 2']:'',
                    'Variant Code':'',
                    'Location Code':'',
                    'Bin Code':'',
                    'Unit of Measure':data['Sales Unit of Measure'],
                    Quantity:mirindraGP.value.monthlyInterestRate,
                    'Shipment Method Code':'',
                    'Unit Price':0,
                    'VAT _':0,
                    'Line Amount': mirindraGP.value.monthlyInterestRate * data['Unit Price'],
                })
                getVATonItem(creditRequestCardHeaderInfo.creditRequestVATBusPostingGroup.value,data['VAT Prod_ Posting Group'],itemInfo.itemLineNo.value-1,'VAT _')                
                itemInfo.itemInsterestIsAdded.value = true
            }

            function addFeesItemLine(data){
                itemInfo.itemLineNo.value=itemInfo.itemLineNo.value+1
                creditRequestCardLines.value.push({
                    'Line No_':itemInfo.itemLineNo.value,
                    Type:2,
                    No_:mirindraGP.value.itemForApplicationFees,
                    Description:data['Description'],
                    'Description 2':data['Description 2']?data['Description 2']:'',
                    'Variant Code':'',
                    'Location Code':'',
                    'Bin Code':'',
                    'Unit of Measure':data['Sales Unit of Measure'],
                    Quantity:mirindraGP.value.applicationFees,
                    'Shipment Method Code':'',
                    'Unit Price':0,
                    'VAT _':0,
                    'Line Amount': mirindraGP.value.monthlyInterestRate * data['Unit Price'],
                })
                getVATonItem(creditRequestCardHeaderInfo.creditRequestVATBusPostingGroup.value,data['VAT Prod_ Posting Group'],itemInfo.itemLineNo.value-1,'VAT _')
                
                itemInfo.itemLineNo.value=itemInfo.itemLineNo.value+1
                itemInfo.itemFeesIsAdded.value = true
            }

            onMounted(()=>{
                if(!webUserInfo.responsibilityCenter){
                    getUserInfo()
                }
                if(!useMirindraGPInfoStore().isFilled){
                    axios.get(`http://${hostname}:3000/app/getMirindraGP`)
                    .then(result =>{
                        useMirindraGPInfoStore().fillMirindraGPInfo(result.data)
                        mirindraGP.value={
                            ...useMirindraGPInfoStore().getMirindraGP
                        }
                        console.log('MGPMCD',mirindraGP.value)
                        creditRequestCardCreditInfo.duration.value = mirindraGP.value.maximumCreditDuration
                        getRequiredDeposit()
                    })
                    .catch((err)=>console.log(err))
                }
            })

            let webUserInfo = {
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
                itemLineAmount:ref(0),
                itemInsterestIsAdded:ref(false),
                itemFeesIsAdded:ref(false)
            }

            const itemAvailabilityInfo = {
            itemInStockLocation:ref(0),
            itemOnSalesLocation:ref(0),
            itemInStockGlobal:ref(0),
            itemOnSalesGlobal:ref(0),
            itemOnPurchaseGlobal:ref(0),
        }

            const creditRequestCardHeaderInfo = {
                creditRequestCustomerNo : ref(webUserInfo.defaultCustomerNo),
                creditRequestCustomerName : ref(webUserInfo.defaultCustomerName),
                creditRequestCustomerContactCode : ref(webUserInfo.defaultCustomerContactCode),
                creditRequestCampaignNo : ref(''),
                creditRequestLocationCode : ref(webUserInfo.defaultLocation),
                creditRequestShipmentMethodCode : ref(webUserInfo.defaultCustomerShipmentMethodCode),
                creditRequestCustomerShipToCode : ref(webUserInfo.defaultCustomerShipToCode),
                creditRequestPaymentMethodCode : ref(webUserInfo.defaultCustomerPaymentMethodCode),
                creditRequestResponsibilityCenter : ref(webUserInfo.responsibilityCenter),
                creditRequestSalesperson : ref(webUserInfo.defaultSalesPersonCode),
                creditRequestSalesChannel : ref(webUserInfo.defaultSalesChannel),
                creditRequestSalesMode : ref(webUserInfo.defaultCustomerSalesMode),
                creditRequestCustomerPriceGroup : ref(webUserInfo.defaultCustomerPriceGroup),
                creditRequestVATBusPostingGroup : ref(webUserInfo.defaultCustomerVATBusPostingGroup),
                creditRequestPaymentTermsCode : ref(webUserInfo.defaultCustomerPaymentTermsCode),
                creditRequestPrepayment: ref(0),
            }

            const creditRequestCardCreditInfo ={
                approvalStatus:ref(0),
                eligibleAmount:ref(0),
                //interestRate:ref(mirindraGP.value.monthlyInterestRate),
                duration:ref(mirindraGP.value.maximumCreditDuration),
                requiredDeposit:ref(0)
            }



            const creditRequestCardLines =  ref([])

            const creditRequestAmortization = ref([])



 /////////////FUNCTIONS//////////////////////////      
   
            function  addEmptyRow(){
                creditRequestCardLines.value.push(
                    {   
                        'Line No_':creditRequestCardLines.value.length +1,
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
                    itemInfo.itemLineNo.value=creditRequestCardLines.value.length +1
            }

            function  addCommentRow(){
                creditRequestCardLines.value.push(
                    {   
                        'Line No_':creditRequestCardLines.value.length +1,
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
                    itemInfo.itemLineNo.value=creditRequestCardLines.value.length +1
            }

            
            function addRowByForm_andContinue(){
                if (itemInfo.itemType.value==2){
                    creditRequestCardLines.value.push({
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

                    getVATonItem(creditRequestCardHeaderInfo.creditRequestVATBusPostingGroup.value,itemInfo.itemVAT.value,itemInfo.itemLineNo.value-1,'VAT _')
                    
                    if(mirindraGP.value.itemForInterest && itemInfo.itemInsterestIsAdded.value==false){
                        getInterestItemInfo()
                    }else{
                        itemInfo.itemLineNo.value=itemInfo.itemLineNo.value +1
                    }

                }else{
                    creditRequestCardLines.value.push({   
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
                    itemInfo.itemLineNo.value=itemInfo.itemLineNo.value +1
                }
                resetForm()
            }

            function addRowByForm_andClose(){
                if (itemInfo.itemType.value==2){
                    creditRequestCardLines.value.push(
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
                    getVATonItem(creditRequestCardHeaderInfo.creditRequestVATBusPostingGroup.value,itemInfo.itemVAT.value,itemInfo.itemLineNo.value-1,'VAT _')
                     
                    
                    if(mirindraGP.value.itemForInterest && itemInfo.itemInsterestIsAdded.value==false){
                        getInterestItemInfo()
                    }else{
                        itemInfo.itemLineNo.value= itemInfo.itemLineNo.value + 1
                    }
                }else{
                    creditRequestCardLines.value.push(
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
                    itemInfo.itemLineNo.value=itemInfo.itemLineNo.value + 1
                }
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
                creditRequestCardHeaderInfo.creditRequestCustomerNo.value=customer['No_']
                creditRequestCardHeaderInfo.creditRequestCustomerName.value=customer['Name']
                creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value=customer["Primary Contact No_"]
                creditRequestCardHeaderInfo.creditRequestPaymentMethodCode.value=customer['Payment Method Code']
                creditRequestCardHeaderInfo.creditRequestPaymentTermsCode.value=customer['Payment Terms Code']
                //creditRequestCardHeaderInfo.creditRequestPrepayment.value=customer['Prepayment _']
                creditRequestCardHeaderInfo.creditRequestShipmentMethodCode.value=customer['Shipment Method Code']
                creditRequestCardHeaderInfo.creditRequestVATBusPostingGroup.value=customer['VAT Bus_ Posting Group']
                creditRequestCardHeaderInfo.creditRequestCustomerPriceGroup.value=customer['Customer Price Group']
                creditRequestCardHeaderInfo.creditRequestCustomerShipToCode.value=customer['Ship-to Code']
                creditRequestCardHeaderInfo.creditRequestSalesMode.value=customer['Sales Mode']
            }

            function fillContactInfoField(contact){
                creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value=contact['No_']
            }

            function fillLocationInfoField(location){
                if(isItemInfoToFill.value){
                    itemInfo.itemLocation.value=location['Code']
                    isItemInfoToFill.value=false
                }else{
                    creditRequestCardHeaderInfo.creditRequestLocationCode.value = location['Code']
                }
            }

            function fillAddressInfoField(address){
                creditRequestCardHeaderInfo.creditRequestCustomerShipToCode.value = address["Code"]
            }

            function fillCampaignInfoField(campaign){
            creditRequestCardHeaderInfo.creditRequestCampaignNo.value=campaign["No_"]
            }

            function fillPaymentMethodInfoField(paymentMethod){
                creditRequestCardHeaderInfo.creditRequestPaymentMethodCode.value=paymentMethod["Code"]
            }

            function fillShipmentMethodInfoField(shipmentMethod){
                if(isItemInfoToFill.value){
                    itemInfo.itemShipmentMethod.value=shipmentMethod['Code']
                    isItemInfoToFill.value=false
                }else{
                    creditRequestCardHeaderInfo.creditRequestShipmentMethodCode.value=shipmentMethod["Code"]
                }
            }

            function fillItemInfoField(item){
                itemInfo.itemType.value = 2
                itemInfo.itemCode.value = item['No_']
                itemInfo.itemDescription.value = item['Description']
                itemInfo.itemDescription2.value = item['Description 2']
                itemInfo.itemLocation.value = creditRequestCardHeaderInfo.creditRequestLocationCode.value
                itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
                itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:creditRequestCardHeaderInfo.creditRequestShipmentMethodCode.value
                itemInfo.itemVAT.value = item['VAT Prod_ Posting Group']

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
            
            function createcreditRequest(sqData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
                .then(res => {
                    submitting_message.value=''
                    success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                    error_message.value=''
                    setTimeout(()=> router.push(`/creditRequestCard/${res.data.documentNo}`),5000)
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
                    Parameter:'creditRequests_insert',
                    webUserName:webUserInfo.name,
                    QuoteNo:'',
                    saleQuoteCustomerNo: creditRequestCardHeaderInfo.creditRequestCustomerNo.value,
                    saleQuoteCustomerContactCode: creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value,
                    saleQuoteResponsibilityCenter:webUserInfo.responsibilityCenter,
                    saleQuoteSalesperson:creditRequestCardHeaderInfo.creditRequestSalesperson.value,
                    saleQuoteCampaignNo:'',
                    saleQuoteLocationCode:creditRequestCardHeaderInfo.creditRequestLocationCode.value,
                    saleQuoteSalesChannel:creditRequestCardHeaderInfo.creditRequestSalesChannel.value,
                    saleQuoteSalesMode:creditRequestCardHeaderInfo.creditRequestSalesMode.value?creditRequestCardHeaderInfo.creditRequestSalesMode.value:'',
                    saleQuoteCustomerPriceGroup:creditRequestCardHeaderInfo.creditRequestCustomerPriceGroup.value,
                    saleQuoteVATBusPostingGroup:creditRequestCardHeaderInfo.creditRequestVATBusPostingGroup.value, 
                    saleQuoteDocumentDate:dateInfo.documentDate.value?dateInfo.documentDate.value:'1753-01-01',
                    saleQuoteValidUntilDate:dateInfo.validityDate.value?dateInfo.validityDate.value:'1753-01-01',
                    saleQuoteShipRequestedDate:dateInfo.shipRequestedDate.value?dateInfo.shipRequestedDate.value:'1753-01-01', 
                    saleQuotePromisedDeliveryDate:dateInfo.promisedDeliveryDate.value?dateInfo.promisedDeliveryDate.value:'1753-01-01', 
                    saleQuotePaymentMethodCode:creditRequestCardHeaderInfo.creditRequestPaymentMethodCode.value, 
                    saleQuotePaymentTermsCode:creditRequestCardHeaderInfo.creditRequestPaymentTermsCode.value,
                    saleQuotePrepayment:creditRequestCardHeaderInfo.creditRequestPrepayment.value, 
                    saleQuoteCustomerShipToCode:creditRequestCardHeaderInfo.creditRequestCustomerShipToCode.value, 
                    saleQuoteShipmentMethodCode:creditRequestCardHeaderInfo.creditRequestShipmentMethodCode.value,
                    'Approval Status':creditRequestCardCreditInfo.approvalStatus.value,
                    'Eligible Amount':creditRequestCardCreditInfo.eligibleAmount.value,
                    'Interest rate':mirindraGP.value.monthlyInterestRate,
                    'Duration (Month)':creditRequestCardCreditInfo.duration.value,
                    'Required Deposit':creditRequestCardCreditInfo.requiredDeposit.value ,
                    'Deposit Amount':depositAmount.value,
                    'Chargeable Amount':chargeableAmount.value,
                    'Interest':interest.value,
                    'VAT on Interest':VATonInterest.value,
                    'Interest including VAT':interestIncVAT.value,
                    'Loan Amount':loanAmount.value,
                    'Total agreement':totalAgreement.value,
                    'Installment' : installment.value,
                    'Final installment':finalInstallment.value,
                    saleQuoteLines:[
                        ...creditRequestCardLines.value
                    ],
                    MirindraRequestCriteria:[],
                    CreditAmortization:[
                        ...creditRequestAmortization.value
                    ]
                }
                createcreditRequest(formatToBCJsonData(JSData))
            }



        return{
            isItemInfoToFill,
            ...creditRequestCardHeaderInfo,
            ...creditRequestCardCreditInfo,
            creditRequestCardLines,
            creditRequestAmortization,
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
            simulateCredit,
            error_message,
            error_message_code,
            success_message,
            submitting_message,
            mirindraGP,
            depositAmount,
            chargeableAmount,
            interest,
            VATonInterest,
            interestIncVAT,
            loanAmount,
            totalAgreement,
            installment,
            finalInstallment,
            totalAmountExclVAT,totalVAT,totalAmountIncVAT
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveTab('creditRequests')
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
            if (this.creditRequestLocationCode){
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
                this.creditRequestCardLines[parentId][parentAttri] = value
                this.creditRequestCardLines[parentId]["Line Amount"] = value * this.creditRequestCardLines[parentId]["Unit Price"]
            }
            else{
                this.creditRequestCardLines[parentId][parentAttri] = value
            }
            //console.log(this.creditRequestCardLines)
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

#general_content,#line_content,#credit_content,#amortization_content{
    max-height: v-bind(height);
    overflow: hidden;
    transition: max-height 0.5s
}

#credit_details_content{
    max-height: 0px;
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