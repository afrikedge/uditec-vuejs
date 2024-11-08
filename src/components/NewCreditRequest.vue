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
            @onSubmittingForm="controlBeforeSubmit"
            @onPrintingVisitCard="printVisitCard"
            @onPrintingComityCard="printComityCard"
            @onSimulatingCredit="simulateCredit"
            componentWithCompInfo="newquoteRightInfoMaxWidth"
            :readOnlyModeIsDisabled="true"
            :checkItemAvailabilityBtnIsDisabled="true"
            :simulateCreditBtnIsDisabled="true"
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
                                <a @click="expand('general_content');onglet1_expanded=!onglet1_expanded" v-else>
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
                                <input-select-basic-1 labelInputText="Type de compte" v-model="creditRequestAccountType" :option-list="optionLabelListForAccountType"></input-select-basic-1>
                                
                                <input-select v-model="creditRequestCustomerNo" labelInputText="Code client" :is_disabled="false"  @openModal="()=>{activeModalForSelectableElementList='customerList';isJoinCodeToFill=false}" v-if="creditRequestAccountType==1"></input-select>
                                
                                <input-text v-model="creditRequestCustomerName" labelInputText="Nom du client" :is_disabled="false" is_read-only="true" v-if="creditRequestAccountType==1"></input-text>
                                
                                <!---input-select v-model="creditRequestCustomerContactCode" labelInputText="N° Contact" :is_disabled="false" @openModal="{activeModalForSelectableElementList='contactList' ;isJoinCodeToFill=false}" v-if="creditRequestAccountType==1"></input-select--->
                                <input-select v-model="creditRequestCustomerContactCode" labelInputText="N° Prospect" :is_disabled="false" @openModal="activeModalForSelectableElementList='leadList'" v-if="creditRequestAccountType==0"></input-select>
                                
                                <input-text v-model="creditRequestCustomerContactName" labelInputText="Nom prospect" :is_disabled="false" v-if="creditRequestAccountType==0"></input-text>

                                <!---input-select v-model="creditRequestCampaignNo" labelInputText="Code promo" :is_disabled="false" @openModal="activeModalForSelectableElementList='campaignList'"></input-select---->
                                
                                <input-select v-model="creditRequestLocationCode" labelInputText="Code magasin" :is_disabled="false" @openModal="activeModalForSelectableElementList='locationList'"></input-select>
                                
                                <input-select v-model="creditRequestShipmentMethodCode" labelInputText="Mode de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='shipmentMethodList'"></input-select>
                                
                                <input-select v-model="creditRequestCustomerShipToCode" labelInputText="Adresse de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='addressList'"></input-select>
                                
                                <input-select-basic-1 labelInputText="Type joint" v-model="creditRequestJoinType" :option-list="optionLabelListForJoinType"></input-select-basic-1>
                                
                            </div>
                            <div class="column">
                                <input-date v-model="documentDate" labelInputText="Date du devis"  :is_disabled="false"></input-date>
                                
                                <input-date v-model="validityDate" labelInputText="Date fin validité" :is_disabled="false"></input-date>
                                
                                <input-date v-model="shipRequestedDate" labelInputText="Date livraison demandée"  :is_disabled="false"></input-date>
                                
                                <input-date v-model="promisedDeliveryDate" labelInputText="Date livraison promise" :is_disabled="false" ></input-date>
                                
                                <input-select v-model="creditRequestPaymentMethodCode" labelInputText="Mode de règlement" :is_disabled="false" @openModal="activeModalForSelectableElementList='paymentMethodList'"></input-select>
                                
                                <input-number v-model="creditRequestPrepayment" labelInputText="% Acompte" ></input-number>
                                
                                <input-select v-model="creditRequestJoinCode" labelInputText="Code joint" :is_disabled="false"  @openModal="()=>{activeModalForSelectableElementList='customerList';isJoinCodeToFill=true}" v-if="creditRequestJoinType==0"></input-select>
                                <input-select v-model="creditRequestJoinCode" labelInputText="Code joint" :is_disabled="false" @openModal="()=>{activeModalForSelectableElementList='contactList';isJoinCodeToFill=true}" v-else></input-select>
                                
                                <!---input-number v-model="creditRequestMonthlyCapacity" labelInputText="Disponibilité mensuelle" ></input-number--->
                                
                                <!---input-number v-model="creditRequestMaxApprovedRate" labelInputText="Coef. Max Approbation (%)" ></input-number--->
                                
                                <!---input-number v-model="creditRequestMaxReferredRate" labelInputText="Coef. Max Arbitrage (%)" ></input-number---->
 
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestSalesMode }}</span>
                            </div>
                        </div>
                        <div id="credit_details_content" class="columns">
                            <div class="column">                                                                                                
                                <input-text labelInputText="Centre de gestion" :valueInputText="creditRequestResponsibilityCenter" :is_disabled="true"></input-text>
                                <input-text labelInputText="Code vendeur" :valueInputText="creditRequestSalesperson" :is_disabled="true" ></input-text>
                                <input-text labelInputText="Canal de vente" :valueInputText="creditRequestSalesChannel" :is_disabled="true"  ></input-text>
                                <input-text labelInputText="Mode de vente" :valueInputText="creditRequestSalesMode" :is_disabled="true" ></input-text>
                            </div>
                            <div class="column">
                                <!---input-text labelInputText="Groupe tarifaire" :valueInputText="creditRequestCustomerPriceGroup" :is_disabled="true" v-if="!userCanChangePriceGroup"></input-text--->
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="creditRequestCustomerPriceGroup" :is_disabled="true" v-if="true"></input-text>
                                <input-select labelInputText="Groupe tarifaire" v-model="creditRequestCustomerPriceGroup" @openModal="activeModalForSelectableElementList='priceGroupList'" v-else></input-select>

                                <input-text labelInputText="Catégorie TVA" :valueInputText="creditRequestVATBusPostingGroup" :is_disabled="true"></input-text>
                                <input-text labelInputText="Condition de paiement" :valueInputText="creditRequestPaymentTermsCode" :is_disabled="true"></input-text>
                                <!--input-text labelInputText="Décision système" :valueInputText="creditRequestSystemDecision" :is_disabled="true"></input-text--->
                                <!---input-select-basic-1 labelInputText="Avis enquêteur" v-model="creditRequestInvestigatorOpinion" :option-list="optionLabelListForInvestigatorOpinion"></input-select-basic-1---->
                                <!---input-select-basic-1 labelInputText="Avis analyste" v-model="creditRequestAnalystOpinion" :option-list="optionLabelListForAnalystOpinion"></input-select-basic-1---->
                                <!---input-text labelInputText="Commentaires analyste" v-model="creditRequestAnalystComment"></input-text--->
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche demande de credit----------------------->                         
                    <div id="line" v-if="false">
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
                                                    <!--input-text v-show="itemType==2" v-model="itemVariant" labelInputText="Code variant" :is_disabled="false" :is_readOnly="itemType==0"></input-text--->
                                                    <input-select v-show="itemType==2" v-model="itemLocation" labelInputText="magasin de livraison" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationList',isItemInfoToFill=true}"></input-select>
                                                    <!----input-text  :valueInputText="itemBinCode" labelInputText="Emplacement" :is_disabled="true"></input-text---->
                                                    <!----input-text :valueInputText="itemUnitOfMeasure" labelInputText="Unité de mesure"  :is_disabled="true"></input-text---->
                                                    <input-text  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                    <input-select  v-show="itemType==2" v-model="itemShipmentMethod" labelInputText="Mode de livraison"  :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='shipmentMethodList',isItemInfoToFill=true}"></input-select>
                                                    <input-text  v-show="itemType==2" v-model="itemUnitPrice" :valueInputText="itemUnitPrice" labelInputText="Prix unitaire" :is_disabled="true" :is_readOnly="itemType==0"></input-text>
                                                </div>
                                                <p class="title has-text-left is-6 mt-3">Disponibilité article : </p>
                                                <div class="columns is-mobile">
                                                    <div class="column has-background-orange1 mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                                                        <div class="has-text-right ">
                                                            <span class="has-text-light subtitle is-2">{{ Math.round(itemInStockLocation) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            En stock magasin
                                                        </h6>
                                                    </div>
                                                    <div class="column has-background-orange1 mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                                                        <div class="has-text-right ">
                                                            <span class="has-text-light subtitle is-2">{{ Math.round(itemOnSalesLocation) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            Sur vente magasin
                                                        </h6>
                                                    </div>
                                                    <div class="column has-background-orange1 mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                                                        <div class="has-text-right ">
                                                            <span class="has-text-light subtitle is-2">{{ Math.round(itemInStockGlobal) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            En Stock global
                                                        </h6>
                                                    </div>
                                                    <div class="column has-background-orange1 mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                                                        <div class="has-text-right ">
                                                            <span class="has-text-light subtitle is-2">{{ Math.round(itemOnSalesGlobal) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            Sur vente global
                                                        </h6>
                                                    </div>
                                                    <div class="column has-background-orange1 mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                                                        <div class="has-text-right ">
                                                            <span class="has-text-light subtitle is-2">{{ Math.round(itemOnSalesGlobal) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            Sur achat global
                                                        </h6>
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
                    <!--br><br-->

<!---------sous-Section onglet 4 formulaire fiche demande de credit----------------------->                         
                    <div id="credit" v-if="false">
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
                    <!---br><br-->

<!---------sous-Section onglet 5 formulaire fiche demande de credit----------------------->                         
                    <div id="exigences" v-if="false">
                        <div :class="{'has-background-white':onglet5_expanded}">
                            <div :class="{'columns':!onglet5_expanded,'p-3':onglet5_expanded,'has-border-bottom-grey':onglet5_expanded,'has-border-bottom':!onglet5_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('requirements_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                        <span>Exigences</span>
                                    </a>
                                    <a @click="expand('requirements_content');onglet5_expanded=!onglet5_expanded" v-else>
                                        <span>Exigences</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet5_expanded">|</span>
                                    
                                </div>
                            </div>
                            <div id="requirements_content" class=" px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <div>
                                    <table class="table  is-narrow  is-fullwidth is-bordered">
                                        <thead class=" my-2">
                                            <tr> 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type Valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Niveau d’exigence</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Longueur valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Valeur Alphanumérique</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Valeur Numérique</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document requis ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valide ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="'onglet5-L'+index" v-for="(elt,index) of creditRequestCustomerRequirement" :key="'onglet5-L'+index" @mouseover="setLineShadow('onglet5-L'+index)" @mouseout="removeLineShadow('onglet5-L'+index)" >
                                                <td class="has-text-left">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
                                                <td class="has-text-left">{{ elt['Criteria'] }}</td>
                                                <td  class="has-text-left is-narrow"> {{ elt['Criteria Description'] }}</td>
                                                <td  class="has-text-left"> {{ displayValueTypeLabel(elt['Value Type']) }}</td>
                                                <td  class="has-text-left"> {{ displayRequirementLevelLabel(elt['Requirement']) }}</td>
                                                <td  class="has-text-left"> {{ elt['Value Length'] }}</td>
                                                <td class="has-text-left" >
                                                    <input v-model="creditRequestCustomerRequirement[index]['Alpha Value']" class="input is-small" :class="{'has-background-light':elt['Value Type']==2}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==2">
                                                    <!---------div :id="index+'-'+elt['Alpha Value']+'-Alpha Value'" class="editme p-1" :class="{'has-background-light':elt['Value Type']==2}" :contenteditable="elt['Value Type']==2" v-text="elt['Alpha Value']" @blur="onEdit" @keydown.enter="endEdit"></div------->
                                                </td>
                                                <td class="has-text-left">
                                                    <input v-model="creditRequestCustomerRequirement[index]['Numeric Value']" class="input is-small" :class="{'has-background-light':elt['Value Type']==1}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==1">
                                                    <!---------div :id="index+'-'+elt['Numeric Value']+'-Numeric Value'" class="editme p-1" :class="{'has-background-light':elt['Value Type']==1}" :contenteditable="elt['Value Type']==1" v-text="elt['Numeric Value']" @blur="onEdit" @keydown.enter="endEdit"></div------>
                                                </td>
                                                <td  class="has-text-left"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td class="has-text-left is-narrow" >
                                                    <input v-model="creditRequestCustomerRequirement[index]['Validity Date']" class="input is-small" :class="{'has-background-light':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
                                                    <!---------div :id="index+'-'+elt['Validity Date']+'-Validity Date'" class="editme p-1" :contenteditable="true" v-text="elt['Validity Date']" @blur="onEdit" @keydown.enter="endEdit"></div---->
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="form-check form-switch">
                                                    <input class="form-check-input primary" type="checkbox" disabled role="switch" id="flexSwitchCheckDefault"
                                                    :checked="elt['Document required']==1?true:elt['Document required']==0?false:'valeur absente'">
                                                </div>
                                                </td>
                                                <td class="has-text-left is-narrow" >
                                                    <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="creditRequestCustomerRequirement[index]['Document Link']" class="input is-small" :class="{'has-background-light':elt['Document required']==1}" type="text" style="border:none" :disabled="elt['Document required']!==1">
                                                        </div>
                                                        <div class="control">
                                                            <button class="button  is-small">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="form-check form-switch">
                                                    <input class="form-check-input primary" type="checkbox"  role="switch" id="flexSwitchCheckDefault"
                                                    v-model="creditRequestCustomerRequirement[index]['Valid']">
                                                </div>
                                                </td>
                                                <td  class="has-text-left is-narrow"> {{ formatDateHour(elt['Updated on']) }}</td>
                                                <td  class="has-text-left"> {{ elt['Updated by'] }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="creditRequestCustomerRequirement.length==0 && onglet5_expanded">Il n'y'a rien à afficher</div>
                            </div>
                        </div>
                    </div>              
                    <br><br>

<!---------sous-Section onglet 6 formulaire fiche demande de credit----------------------->                         
                    <div id="scoring" v-if="false">
                        <div :class="{'has-background-white':onglet6_expanded}">
                            <div :class="{'columns':!onglet6_expanded,'p-3':onglet6_expanded,'has-border-bottom-grey':onglet6_expanded,'has-border-bottom':!onglet6_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('scoring_content');onglet6_expanded=!onglet6_expanded" v-if="onglet6_expanded">
                                        <span>Scoring</span>
                                    </a>
                                    <a @click="expand('scoring_content');onglet6_expanded=!onglet6_expanded" v-else>
                                        <span>Scoring</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet4_expanded">|</span>
                                    
                                </div>
                            </div>
                            <div id="scoring_content" class=" px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <div style="margin-bottom: 300px;">
                                    <table class="table  is-narrow  is-fullwidth ">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Description de la valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document requis</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valide ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Coefficient</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point pondéré</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="'onglet6-L'+index" v-for="(elt,index) of creditRequestCustomerScoring" :key="'onglet6-L'+index" @mouseover="setLineShadow('onglet6-L'+index)" @mouseout="removeLineShadow('onglet6-L'+index)" >
                                                <td class="has-text-left">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
    
                                                <td class="has-text-left py-1 px-2" >{{ elt['Criteria'] }}</td>
                                                <td  class="has-text-left is-narrow"> {{ elt['Criteria Description'] }}</td>
                                                <td  class="has-text-left">
                                                    <div class="dropdown is-small" :class="{'is-active':criteriaValueDropdownIsActive && activeCriteriaValueDropdown==index}">
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="elt['Criteria Value']" class="input is-small has-background-light" type="text" style="border:none">
                                                        </div>
                                                        <div class="control">
                                                            <button class="button  is-small" v-if="activeCriteriaValueDropdown!==index" @click.prevent="displayCriteriaValueDropdown(index,elt['Criteria'])">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus" ></i>
                                                                </span>
                                                            </button>
                                                            <button class="button  is-small" v-if="criteriaValueDropdownIsActive==true && activeCriteriaValueDropdown==index" @click.prevent="closeCriteriaValueDropdown">
                                                                <span class="icon">
                                                                    <i class="fas fa-close" ></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                        </div>
                                                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                                          <div class="dropdown-content">
                                                            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                                                <thead class="my-2">
                                                                    <tr > 
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Valeur du critère</th>
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Description</th>
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Point</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="(criteria,index1) of scoringCriteriaValueList" :key="'criteria-'+index1" @click="fillCriteriaValue(index,criteria)" >
                                                                        <td class="has-text-left is-narrow"> {{ criteria["Value"] }}</td>
                                                                        <td class="has-text-left is-narrow">{{ criteria["Description"] }}</td>
                                                                        <td class="has-text-left is-narrow">{{ criteria["Point"] }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    <!--------div :id="index+'-'+elt['List Value']+'-List Value'" class="editme p-1" :contenteditable="true" v-text="elt['List Value']" @blur="onEdit" @keydown.enter="endEdit"></div--------->
                                                </td>
                                                <td  class="has-text-left is-narrow">{{ elt['Value Description'] }}</td>
                                                <td  class="has-text-left">{{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td  class="has-text-left is-narrow">
                                                    <input v-model="creditRequestCustomerScoring[index]['Validity Date']" class="input is-small" :class="{'has-background-light':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
                                                    <!-----div :id="index+'-'+elt['Validity Date']+'-Validity Date'" class="editme p-1" :contenteditable="true" v-text="formatDateHour(elt['Validity Date'])" @blur="onEdit" @keydown.enter="endEdit"></div----->
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="form-check form-switch">
                                                    <input class="form-check-input primary" type="checkbox" disabled role="switch" id="flexSwitchCheckDefault"
                                                    :checked="elt['Document required']==1?true:elt['Document required']==0?false:'valeur absente'">
                                                </div>
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="creditRequestCustomerScoring[index]['Document Link']" class="input is-small" :class="{'has-background-light':elt['Document required']==1}" type="text" style="border:none" :disabled="elt['Document required']!==1">
                                                        </div>
                                                        <div class="control">
                                                            <button class="button  is-small">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <!-------div :id="index+'-'+elt['Document Link']+'-Document Link'" class="editme p-1" :contenteditable="true" v-text="elt['Document Link']" @blur="onEdit" @keydown.enter="endEdit"></div----->
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input primary" type="checkbox" disabled role="switch" id="flexSwitchCheckDefault"
                                                        :checked="elt['Valid']==1?true:elt['Valid']==0?false:'valeur absente'">
                                                    </div>
                                                </td>
                                                <td  class="has-text-left is-narrow">{{ elt['Point'] }}</td>
                                                <td  class="has-text-left">{{ elt['Coefficient'] }}</td>
                                                <td  class="has-text-left">{{ elt['Weighed Point'] }}</td>
                                                <td  class="has-text-left is-narrow">{{ formatDateHour(elt['Updated on']) }}</td>
                                                <td  class="has-text-left">{{ elt['Updated by'] }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="creditRequestCustomerScoring.length==0 && onglet6_expanded">Il n'y'a rien à afficher</div>
                            </div>
                            <div class="columns mt-3" id="line_total" v-if="creditRequestCustomerScoring.length>0 && onglet6_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="weighedPointTotal" labelInputText="Total points"></input-text1>
                                </div>
                            </div>        
                        </div>
                    </div>              
                    <br><br>

<!---------sous-Section onglet 7 formulaire fiche demande de credit----------------------->                         
                    <div id="amortissement" v-if="false">
                        <div :class="{'has-background-light':onglet7_expanded}">
                            <div :class="{'columns':!onglet7_expanded,'p-3':onglet7_expanded,'has-border-bottom-grey':onglet7_expanded,'has-border-bottom':!onglet7_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('amortization_content');onglet7_expanded=!onglet7_expanded" v-if="onglet7_expanded">
                                        <span>Amortissement</span>
                                    </a>
                                    <a @click="expand('amortization_content');onglet7_expanded=!onglet7_expanded" v-else>
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
                            <div v-if="creditRequestAmortization.length==0 && onglet7_expanded">Il n'y'a rien à afficher</div>     
                        </div>              
                    </div>                         
                    <br><br>

                </div>

<!---------composant info client----------------------->
                <customer-info class="customer-info" v-if="true"></customer-info>
                <prospect-info class="prospect-info" v-else></prospect-info>

            </div>

<!-----------Disponibilité article-------------------->
            <!----div :class="{'modal':true , 'is-active':true }" v-if="inventoryAvailabilityModalShowned && false">
                <div class="modal-background has-background-white" style="opacity:0.7" @click="inventoryAvailabilityModalShowned=false"></div>
                <div class="modal-content w-75 shadow has-background-light">
                    <inventory-availability></inventory-availability>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="inventoryAvailabilityModalShowned=false"></button>
            </div---->

<!-----------Modal pour la création d'une adresse-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newAddressModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newAddressModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-ship-to-address :customerNo="creditRequestCustomerNo" :contactNo="creditRequestCustomerContactCode" :redirectionIsDisabled="true" @submit="(elt) => {creditRequestCustomerShipToCode = elt;newAddressModalShowned=false} "></new-ship-to-address>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newAddressModalShowned=false }"></button>
            </div>

        </div>

<!---------------------------------------------->
        <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'"  
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-customer-list>

        <modal-for-selectable-lead-list 
            v-if="activeModalForSelectableElementList=='leadList'" 
            :isActive="activeModalForSelectableElementList=='leadList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableLeadListModal="(elt)=>fillLeadInfoField(elt)">
        </modal-for-selectable-lead-list>

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
            @onGettingLineFromSelectableAddressListModal="(elt)=>fillAddressInfoField(elt)"
            @onDisplayingShipToAddressCreationModal="()=>showAddressCreationModal()">
        </modal-for-selectable-address-list>

        <modal-for-selectable-campaign-list 
            v-if="activeModalForSelectableElementList=='campaignList'" 
            :isActive="activeModalForSelectableElementList=='campaignList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCampaignListModal="(elt)=>fillCampaignInfoField(elt)">
        </modal-for-selectable-campaign-list>

        <modal-for-selectable-price-group-list 
            v-if="activeModalForSelectableElementList=='priceGroupList'" 
            :isActive="activeModalForSelectableElementList=='priceGroupList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectablePriceGroupListModal="(elt)=>fillPriceGroupInfoField(elt)">
        </modal-for-selectable-price-group-list>

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
import inputSelectBasic1 from './input/input-select-basic1.vue'
import inputDate from './input/input-date.vue'
import inputNumber from './input/input-number.vue'
//import InventoryAvailability from './InventoryAvailability.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableCampaignList from './ModalForSelectableCampaignList.vue'
import ModalForSelectableShipmentMethodList from './ModalForSelectableShipmentMethodList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectablePriceGroupList from './ModalForSelectablePriceGroupList.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import ModalForSelectableLeadList from './ModalForSelectableLeadList.vue'
import ModalForSelectableLocationList from './ModalForSelectableLocationList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import NewShipToAddress from './NewShipToAddress.vue'

import SelectableItemListForSale from './SelectableItemListForSale.vue'
import { computed, onBeforeMount, onMounted, ref, watch, } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useMirindraGPInfoStore } from '@/Stores/MirindraGPInfo'
import  axios  from 'axios'
import { useRouter } from 'vue-router'

//import { Buffer } from 'buffer'



export default {
    name:'new-credit-request',
    components:{
        CRCardHeader,CustomerInfo,ProspectInfo,CRCardRibbon,
        inputText,inputText1,inputSelect,inputSelectBasic,inputSelectBasic1,inputDate,inputNumber,
        ModalForSelectableCustomerList,ModalForSelectableCampaignList,ModalForSelectablePaymentMethodList,ModalForSelectableShipmentMethodList,ModalForSelectablePriceGroupList,
        ModalForSelectableItemList,ModalForSelectableLocationList,ModalForSelectableContactList,ModalForSelectableAddressList,ModalForSelectableLeadList,
        SelectableItemListForSale, NewShipToAddress,
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
            onglet6_expanded:true,
            onglet7_expanded:true,

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

            //fenêtre de disponibilité article
            inventoryAvailabilityModalShowned:false,
        }
    },
    setup(){
        const router = useRouter()
        const currentDate = new Date(new Date()).toISOString().split('T')[0]
        const isItemInfoToFill = ref(false)
        const hostname = window.location.hostname;
        const creditRequestCardLines =  ref([])
        const creditRequestCustomerScoring = ref([])
        const creditRequestCustomerRequirement = ref([])
        const scoringCriteriaValueList = ref([])
        const criteriaValueDropdownIsActive = ref(false)
        const activeCriteriaValueDropdown = ref(-1)
        const creditRequestAmortization = ref([])
        const userCanChangePriceGroup = ref(false)


        const newAddressModalShowned = ref(false)


        //variable de soumission forme
        let submitting_message=ref('') 

        //variable d'erreur serveur
        let error_message=ref('')
        let error_message_code =ref('')

        //variable de success serveur
        let success_message=ref('')

         //sac des labels de la fiche
         const labelBag = {
            requirementValueTypeLabelList:ref([]),
            requirementLevelLabelList:ref([]),
            validityLabelList:ref([]),
            optionLabelListForInvestigatorOpinion:ref([]),
            optionLabelListForAnalystOpinion:ref([]),
            optionLabelListForAccountType:ref([]),
            optionLabelListForJoinType:ref([])

        }
        
        //function pour afficher le label des champs optionlist des listes et tableaux
        function displayValueTypeLabel(value){
           let eltToFind = labelBag.requirementValueTypeLabelList.value.find((row) => row["Value"]==value)
           if(eltToFind){
               return eltToFind["Description"]
           }
       }
       function displayRequirementLevelLabel(value){
            let eltToFind = labelBag.requirementLevelLabelList.value.find((row) => row["Value"]==value)
            if(eltToFind){
                return eltToFind["Description"]
            }
        }
        function displayValidityTypeLabel(value){
            let eltToFind = labelBag.validityLabelList.value.find((row) => row["Value"]==value)
            if(eltToFind){
                return eltToFind["Description"]
            }
        }
        function getOptionLabelList(fieldToGetLabelList){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                if (fieldToGetLabelList=='[Value Type]')
                    labelBag.requirementValueTypeLabelList.value=result.data.recordset
                    
                if (fieldToGetLabelList=='[Requirement]')
                    labelBag.requirementLevelLabelList.value=result.data.recordset

                if (fieldToGetLabelList=='[Validity]')
                    labelBag.validityLabelList.value=result.data.recordset
                
                if(fieldToGetLabelList=='[Investigator Opinion]')
                labelBag.optionLabelListForInvestigatorOpinion.value=result.data.recordset

                if(fieldToGetLabelList=='[Analyst Opinion]')
                labelBag.optionLabelListForAnalystOpinion.value=result.data.recordset

                if (fieldToGetLabelList=='[Account Type]')
                    labelBag.optionLabelListForAccountType.value=result.data.recordset

                if (fieldToGetLabelList=='[Joint Type]')
                    labelBag.optionLabelListForJoinType.value=result.data.recordset
            }).catch(err=>console.log(err))
        }

        //objet contenant nos champs de date
        const dateInfo = {
            documentDate : ref(currentDate),
            validityDate : ref(currentDate),
            shipRequestedDate : ref(currentDate),
            promisedDeliveryDate : ref(currentDate),
        }

        //objet contenant les infos sur l'utilisateur connecté
        let webUserInfo = {
        }

        //objet contenant les infos de la ligne d'article à insérer
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
            itemVATPGroup:ref(''),
            itemLineAmount:ref(0),
            itemInsterestIsAdded:ref(false),
            itemFeesIsAdded:ref(false)
        }

        //objet contenant la disponibilité sur la ligne d'article à insérer
        const itemAvailabilityInfo = {
            itemInStockLocation:ref(0),
            itemOnSalesLocation:ref(0),
            itemInStockGlobal:ref(0),
            itemOnSalesGlobal:ref(0),
            itemOnPurchaseGlobal:ref(0),
        }

//Gestion du joint
        const creditRequestJoinType = ref(0)
        const creditRequestJoinCode = ref('')
        const isJoinCodeToFill = ref(false)

//fonctions pour manipuler l'ajout des lignes de notre document
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
                    'Prepayment _':creditRequestCardHeaderInfo.creditRequestPrepayment.value,
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
                    'Prepayment _':'',
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
                    'Prepayment _':creditRequestCardHeaderInfo.creditRequestPrepayment.value,
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
                    'Prepayment _':''
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
                    'Prepayment _':creditRequestCardHeaderInfo.creditRequestPrepayment.value,
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
                    'Prepayment _':'',
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


//Fonctions spécifiques aux articles
        function getItemAvailabilityInfo(){
            axios.get(`http://${hostname}:5000/app/getItemAvailabilityInfo/${itemInfo.itemCode.value}/${itemInfo.itemLocation.value}`)
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
            .catch((err) => {console.log(err)})
        }
        function getItemLocationBinCode(itemLocation){
            axios.get(`http://${hostname}:5000/app/getLocationBinCode/${itemLocation}?respCenter=${webUserInfo.responsibilityCenter}`)
            .then(res => {
                itemInfo.itemBinCode.value = res.data.recordset[0]['Shipment Bin Code']
            })
            .catch(err => console.log(err))
        }
        function getVATonItem(VATOnCust,VATOnItem,lineNo,lineAttrib){
            axios.get(`http://${hostname}:5000/app/getItemVAT?VATOnItem=${VATOnItem}&VATOnCust=${VATOnCust}`)
            .then(result =>{
                creditRequestCardLines.value[lineNo][lineAttrib]=Number(result.data)
            })
            .catch(err => console.log(err))
        }

//Fonctions spécifiques aux articles d'intérêt
        function getInterestItemInfo(){
            axios.get(`http://${hostname}:5000/app/getItemCard/${mirindraGP.value.itemForInterest}?respCenter=${webUserInfo.responsibilityCenter}`)
            .then(result =>{
                addInterestItemLine(result.data.recordset[0])
                if(mirindraGP.value.itemForInterest && itemInfo.itemFeesIsAdded.value==false){
                    getFeesItemInfo()
                }

            })
            .catch(err => console.log(err))
        }
        function getFeesItemInfo(){
            axios.get(`http://${hostname}:5000/app/getItemCard/${mirindraGP.value.itemForApplicationFees}?respCenter=${webUserInfo.responsibilityCenter}`)
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


        //objet contenant les champs d'entête de notre document
        const creditRequestCardHeaderInfo = {
            creditRequestCustomerNo : ref(''),
            creditRequestCustomerTemplateCode : ref(''),
            creditRequestAccountType : ref(1),
            creditRequestCustomerType : ref(0),
            creditRequestCustomerLegalStatus : ref(1),
            creditRequestCustomerIdentificationMode : ref(1),
            creditRequestCustomerName : ref(''),
            creditRequestCustomerContactCode : ref(''),
            creditRequestCustomerContactName : ref(''),
            creditRequestCampaignNo : ref(''),
            creditRequestLocationCode : ref(''),
            creditRequestShipmentMethodCode : ref(''),
            creditRequestCustomerShipToCode : ref(''),
            creditRequestPaymentMethodCode : ref(''),
            creditRequestResponsibilityCenter : ref(''),
            creditRequestSalesperson : ref(''),
            creditRequestSalesChannel : ref(''),
            creditRequestSalesMode : ref(''),
            creditRequestCustomerPriceGroup : ref(''),
            creditRequestVATBusPostingGroup : ref(''),
            creditRequestPaymentTermsCode : ref(''),
            creditRequestPrepayment: ref(0),
            creditRequestInvestigatorOpinion:ref(0),
            creditRequestInvestigatorComment:ref(''),
            creditRequestAnalystOpinion:ref(0),
            creditRequestAnalystComment:ref(''),
            creditRequestRecoveryOpinion:ref(0),
            creditRequestRecoveryComment:ref(''),
            creditRequestManagerOpinion:ref(0),
            creditRequestManagerComment:ref(''),
            creditRequestMonthlyCapacity:ref(0),
            creditRequestMaxApprovedRate:ref(0),
            creditRequestMaxReferredRate:ref(0)
        }

//Propriétés caluculés pour les totaux des lignes
        const totalVAT = computed(() => {
            let sum = 0
            creditRequestCardLines.value.forEach(elt =>{
                sum = sum + elt['Line Amount'] * elt['VAT _'] /100
            })
            return sum
        })
        const totalAmountExclVAT = computed(()=> {
            let sum = 0
            creditRequestCardLines.value.forEach(elt =>{
                sum = sum + elt['Line Amount']
            })
            return sum
        })
        const totalAmountIncVAT = computed(() => {
            return totalAmountExclVAT.value + totalVAT.value
        })
        
//Propriétés caluculés pour les totaux de l'onglet crédit
        const mirindraGP = ref({})
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


//Autres appels de fonctions liés au crédit
        function simulateCredit(){
            axios.get(`http://${hostname}:5000/app/getAmortization?docNo=${''}&duration=${creditRequestCardCreditInfo.duration.value}&loanAmount=${loanAmount.value}&installment=${installment.value}&finalInstallment=${finalInstallment.value}&interestInclVAT=${interestIncVAT.value}`)
            .then(result => {
                console.log(result)
                creditRequestAmortization.value = result.data
            })
            .catch(err => console.log(err))
        }
        function getRequiredDeposit(){
            axios.get(`http://${hostname}:5000/app/getMirindraRD`)
            .then(result => {
                creditRequestCardCreditInfo.requiredDeposit.value = result.data
                creditRequestCardHeaderInfo.creditRequestPrepayment.value = result.data
            })
            .catch(err => console.log(err))
        }

//Autres appels de fonctions liés auX exigences et scoring
        // function getCreditRequestCustomerRequirementInfo(){
        //     axios.get(`http://${hostname}:5000/app/getCURList?customerId=${creditRequestCardHeaderInfo.creditRequestCustomerNo.value}&accountType=1&customerType=${creditRequestCardHeaderInfo.creditRequestCustomerType.value}&legalStatus=${creditRequestCardHeaderInfo.creditRequestCustomerLegalStatus.value}&identificationMode=${creditRequestCardHeaderInfo.creditRequestCustomerIdentificationMode.value}`)
        //     .then(result => {
        //         creditRequestCustomerRequirement.value = result.data
        //         creditRequestCustomerRequirement.value.map(line => {
        //             line['Validity Date'] = getISODate(line['Validity Date']) 
        //             line['Valid'] = line['Valid']==1?true:false
        //         })
        //         getOptionLabelList('[Value Type]')
        //         getOptionLabelList('[Requirement]')
        //     }).catch(()=>{
        //         creditRequestCustomerRequirement.value = []
        //     })
        // }
        // function getCreditRequestCustomerScoringInfo(){
        //     axios.get(`http://${hostname}:5000/app/getCUSList?customerId=${creditRequestCardHeaderInfo.creditRequestCustomerNo.value}&accountType=1&salesMode=${creditRequestCardHeaderInfo.creditRequestSalesMode.value}`)
        //     .then(result => {
        //         creditRequestCustomerScoring.value = result.data
        //         getOptionLabelList('[Validity]')
        //     }).catch(()=>{
        //         creditRequestCustomerScoring.value = []
        //     })
        // }
        // function getCreditRequestLeadRequirementInfo(){
        //     axios.get(`http://${hostname}:5000/app/getLERList?leadId=${creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value}&accountType=0&customerType=${creditRequestCardHeaderInfo.creditRequestCustomerType.value}&legalStatus=${creditRequestCardHeaderInfo.creditRequestCustomerLegalStatus.value}&identificationMode=${creditRequestCardHeaderInfo.creditRequestCustomerIdentificationMode.value}`)
        //     .then(result => {
        //         creditRequestCustomerRequirement.value = result.data
        //         creditRequestCustomerRequirement.value.map(line => {
        //             line['Validity Date'] = getISODate(line['Validity Date']) 
        //             line['Valid'] = line['Valid']==1?true:false
        //         })
        //         getOptionLabelList('[Value Type]')
        //         getOptionLabelList('[Requirement]')
        //     }).catch(()=>{
        //         creditRequestCustomerRequirement.value = []
        //     })
        // }
        // function getCreditRequestLeadScoringInfo(){
        //     axios.get(`http://${hostname}:5000/app/getLESList?leadId=${creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value}&accountType=0&salesMode=${creditRequestCardHeaderInfo.creditRequestSalesMode.value}`)
        //     .then(result => {
        //         creditRequestCustomerScoring.value = result.data
        //         getOptionLabelList('[Validity]')
        //     }).catch(()=>{
        //         creditRequestCustomerScoring.value = []
        //     })
        // }


        function getCriteriaValueList(criteria){
            axios.get(`http://${hostname}:5000/app/getSCVList?criteria=${criteria}`)
            .then(result => {
                scoringCriteriaValueList.value = result.data
            }).catch(err=>console.log(err))
        }

        //fonction pour insérer la valeur d'un critère sélectionné sur la ligne
        function fillCriteriaValue(index,criteria){
            //leadCardScoring.value[index]['List Value']= criteria.Value;
            creditRequestCustomerScoring.value[index]['Criteria Value']= criteria.Value;
            creditRequestCustomerScoring.value[index]['Value Description']= criteria.Description;
            criteriaValueDropdownIsActive.value=false
            activeCriteriaValueDropdown.value =-1
        }



//fonctions pour remplir les champs avec via des listes sélectionnables
        function fillCustomerInfoField(customer){
            if(isJoinCodeToFill.value==true)
                creditRequestJoinCode.value = customer['No_']
            else{
                creditRequestCardHeaderInfo.creditRequestAccountType.value=1
                creditRequestCardHeaderInfo.creditRequestCustomerType.value=customer['Customer Type']
                creditRequestCardHeaderInfo.creditRequestCustomerLegalStatus.value=customer['Legal Status']
                creditRequestCardHeaderInfo.creditRequestCustomerIdentificationMode.value=customer['Identification Mode']
                creditRequestCardHeaderInfo.creditRequestCustomerName.value=customer['Name']
                creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value=customer["Primary Contact No_"]
                creditRequestCardHeaderInfo.creditRequestPaymentMethodCode.value=customer['Payment Method Code']
                //creditRequestCardHeaderInfo.creditRequestPaymentTermsCode.value=customer['Payment Terms Code']
                //creditRequestCardHeaderInfo.creditRequestPrepayment.value=customer['Prepayment _']
                creditRequestCardHeaderInfo.creditRequestShipmentMethodCode.value=customer['Shipment Method Code']
                creditRequestCardHeaderInfo.creditRequestVATBusPostingGroup.value=customer['VAT Bus_ Posting Group']
                creditRequestCardHeaderInfo.creditRequestCustomerPriceGroup.value=customer['Customer Price Group']
                creditRequestCardHeaderInfo.creditRequestCustomerShipToCode.value=customer['Ship-to Code']
                //creditRequestCardHeaderInfo.creditRequestSalesMode.value=customer['Sales Mode']
                creditRequestCardHeaderInfo.creditRequestCustomerNo.value=customer['No_']
            }
        }
        function fillContactInfoField(contact){
            if(isJoinCodeToFill.value==true)
                creditRequestJoinCode.value = contact['No_']
            else{
                creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value=contact['No_']
            }
            isJoinCodeToFill.value = false
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
        function fillPriceGroupInfoField(priceGroup){
            creditRequestCardHeaderInfo.creditRequestCustomerPriceGroup.value= priceGroup['Code']
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
        function fillLeadInfoField(lead){
            creditRequestCardHeaderInfo.creditRequestAccountType.value=0
            creditRequestCardHeaderInfo.creditRequestCustomerType.value=lead['Lead Type']
            creditRequestCardHeaderInfo.creditRequestCustomerLegalStatus.value=lead['Legal Status']
            creditRequestCardHeaderInfo.creditRequestCustomerIdentificationMode.value=lead['Identification Mode']
            creditRequestCardHeaderInfo.creditRequestCustomerNo.value=''
            creditRequestCardHeaderInfo.creditRequestCustomerName.value=''
            creditRequestCardHeaderInfo.creditRequestCustomerContactName.value=lead['Name']
            creditRequestCardHeaderInfo.creditRequestCustomerTemplateCode.value=lead['Customer Template Code']
            creditRequestCardHeaderInfo.creditRequestShipmentMethodCode.value=lead['Shipment Method Code']?lead['Shipment Method Code']:''
            creditRequestCardHeaderInfo.creditRequestCustomerShipToCode.value=lead['Ship-to Code']?lead['Ship-to Code']:''
            creditRequestCardHeaderInfo.creditRequestPaymentMethodCode.value=lead['Payment Method Code']?lead['Payment Method Code']:''
            //creditRequestCardHeaderInfo.creditRequestPaymentTermsCode.value=lead['Payment Terms Code']?lead['Payment Terms Code']:''
            creditRequestCardHeaderInfo.creditRequestVATBusPostingGroup.value=lead['VAT Bus_ Posting Group']?lead['VAT Bus_ Posting Group']:''
            //creditRequestCardHeaderInfo.creditRequestCustomerPriceGroup.value=lead['Customer Price Group']
            //creditRequestCardHeaderInfo.creditRequestSalesMode.value=lead['Sales Mode']?lead['Sales Mode']:''
            creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value=lead['No_']

            //creditRequestCustomerType.value=lead['Lead Type']
        }



//fonctions de contrôle
        function controlBeforeSubmit(){
            submitting_message.value='Enregistrement en cours'
            if(creditRequestCardHeaderInfo.creditRequestAccountType.value == 1){
                axios.get(`http://${hostname}:5000/app/getCustomerType?customerId=${creditRequestCardHeaderInfo.creditRequestCustomerNo.value}`)
                .then(result => {
                    let customerType = result.data[0]['Customer Type']
                    if(customerType == 2){
                        error_message.value = 'Vous ne pouvez pas créer une demande de crédit pour un client divers'
                        error_message_code = 'ACTION_NOT_PERMITTED!'
                        submitting_message.value=''
                    }else submitForm()
    
                }).catch(()=>{
                    error_message.value = "Impossible d'évaluer le type du client"
                    error_message_code = 'NETWORK ERROR!'
                    submitting_message.value=''
                })
            }else submitForm()
        }



//fonctions pour créer le document
        function createcreditRequest(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                error_message.value=''
                setTimeout(()=> router.push(`/creditRequestCard/${res.data.documentNo}`),3000)
            })
            .catch(err => {
                displayErrorMessage(err)
            })
        }
        function submitForm(){
            //submitting_message.value='Enregistrement en cours'
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
                'Customer Template Code': creditRequestCardHeaderInfo.creditRequestCustomerTemplateCode.value?creditRequestCardHeaderInfo.creditRequestCustomerTemplateCode.value:'',
                'Approval Status':creditRequestCardCreditInfo.approvalStatus.value,
                'Eligible Amount':creditRequestCardCreditInfo.eligibleAmount.value,
                'Interest rate':useMirindraGPInfoStore().monthlyInterestRate,
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
                
                'System Decision':0,
                
                'Investigator Opinion':creditRequestCardHeaderInfo.creditRequestInvestigatorOpinion.value,
                'Investigator comments':creditRequestCardHeaderInfo.creditRequestInvestigatorComment.value,
                
                'Analyst Opinion':creditRequestCardHeaderInfo.creditRequestAnalystOpinion.value,
                'Analyst comments':creditRequestCardHeaderInfo.creditRequestAnalystComment.value,

                'Recovery Opinion':creditRequestCardHeaderInfo.creditRequestRecoveryOpinion.value,
                'Recovery comments':creditRequestCardHeaderInfo.creditRequestRecoveryComment.value,

                'Manager Opinion':creditRequestCardHeaderInfo.creditRequestManagerOpinion.value,
                'Manager comments':creditRequestCardHeaderInfo.creditRequestManagerComment.value,

                //nouveau
                'Joint Type':creditRequestJoinType.value,
                'Joint Code':creditRequestJoinCode.value,
                //nouveau

                //nouveau
                'Monthly Capacity':creditRequestCardHeaderInfo.creditRequestMonthlyCapacity.value,
                'Max Approved Rate (%)':creditRequestCardHeaderInfo.creditRequestMaxApprovedRate.value,
                'Max Referred Rate (%)':creditRequestCardHeaderInfo.creditRequestMaxReferredRate.value,
                //nouveau


                saleQuoteLines:[
                    ...creditRequestCardLines.value
                ],
                CustomerRequirement:[
                    ...creditRequestCustomerRequirement.value
                ],
                CustomerScoring:[
                    ...creditRequestCustomerScoring.value
                ],
                CreditAmortization:[
                    ...creditRequestAmortization.value
                ]
            }
            createcreditRequest(formatToBCJsonData(JSData))
        }

//fonctions de formattage
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }
        // function getISODate(date){
        //     if(new String(date).includes('1753')||new String(date).includes('1900'))
        //         return date
        //     else
        //         return new Date(date).toISOString().split('T')[0]
        // }


//Gestions des évènements et déclencheurs et erreurs
        // function displayErrorMessage(errorObject){
        //     if(errorObject.response && errorObject.response.status){
        //         switch (errorObject.response.status){
        //             case 401: 
        //                 submitting_message.value=''
        //                 error_message.value= errorObject.response.data.message;break;
        //             case 400:
        //                 submitting_message.value='' 
        //                 error_message.value= errorObject.response.data.error.message
        //                 error_message_code.value= errorObject.response.data.error.code;break;
        //             case 404:
        //                 submitting_message.value=''
        //                 error_message.value=errorObject.response.data.error.message
        //                 error_message_code.value= errorObject.response.data.error.code;break;
        //             default:
        //                 submitting_message.value=''
        //                 error_message.value=errorObject.response
        //         }
        //     }
        //     else{
        //         error_message.value = errorObject.message
        //         error_message_code.value = errorObject.code
        //         console.log(errorObject)
        //     }
        // }
        function displayErrorMessage(errorObject){
            submitting_message.value = ''
            if(errorObject.response){
                if(errorObject.response.data){
                    error_message.value = JSON.stringify(errorObject.response.data)
                }else{
                    error_message.value = JSON.stringify(errorObject.response)
                }
            }
            else{
                error_message.value = JSON.stringify(errorObject)
            }
        }
        onBeforeMount(() => {
            if(useWebUserInfoStore().name==''){
                let userData = window.localStorage.getItem("userData");
                if(!userData){
                    router.push('/login')
                }else{
                    let userDataObjet = JSON.parse(userData)
                    useWebUserInfoStore().fillWebUserInfo(userDataObjet)
                }
            }
        })
        onMounted(()=>{
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }
            if(useWebUserInfoStore().defaultLocation){
                getItemLocationBinCode(useWebUserInfoStore().defaultLocation)
                itemInfo.itemLocation.value = useWebUserInfoStore().defaultLocation
            }
            if(!useMirindraGPInfoStore().isFilled){
                axios.get(`http://${hostname}:5000/app/getMirindraGP`)
                .then(result =>{
                    useMirindraGPInfoStore().fillMirindraGPInfo(result.data)
                    mirindraGP.value = {
                        ...useMirindraGPInfoStore().getMirindraGP
                    }
                    creditRequestCardCreditInfo.duration.value = useMirindraGPInfoStore().maximumCreditDuration
                    creditRequestCardHeaderInfo.creditRequestSalesMode.value = useMirindraGPInfoStore().salesMode
                    creditRequestCardHeaderInfo.creditRequestPaymentTermsCode.value = useMirindraGPInfoStore().paymentTermsCode

                    getRequiredDeposit()
                })
                .catch((err)=>console.log(err))
            }else{
                creditRequestCardCreditInfo.duration.value = useMirindraGPInfoStore().maximumCreditDuration
                creditRequestCardHeaderInfo.creditRequestSalesMode.value = useMirindraGPInfoStore().salesMode
                creditRequestCardHeaderInfo.creditRequestPaymentTermsCode.value = useMirindraGPInfoStore().paymentTermsCode
                getRequiredDeposit()
            }

            getOptionLabelList('[Investigator Opinion]')
            getOptionLabelList('[Analyst Opinion]')
            getOptionLabelList('[Account Type]')
            getOptionLabelList('[Joint Type]')


            webUserInfo = { ...useWebUserInfoStore().getWebUser }

            creditRequestCardHeaderInfo.creditRequestCustomerNo.value =webUserInfo.defaultCustomerNo
            creditRequestCardHeaderInfo.creditRequestCustomerName.value = webUserInfo.defaultCustomerName
            creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value = webUserInfo.defaultCustomerContactCode
            creditRequestCardHeaderInfo.creditRequestLocationCode.value = webUserInfo.defaultLocation
            creditRequestCardHeaderInfo.creditRequestShipmentMethodCode.value = webUserInfo.defaultCustomerShipmentMethodCode
            creditRequestCardHeaderInfo.creditRequestCustomerShipToCode.value = webUserInfo.defaultCustomerShipToCode
            creditRequestCardHeaderInfo.creditRequestPaymentMethodCode.value = webUserInfo.defaultCustomerPaymentMethodCode
            creditRequestCardHeaderInfo.creditRequestResponsibilityCenter.value = webUserInfo.responsibilityCenter
            creditRequestCardHeaderInfo.creditRequestSalesperson.value = webUserInfo.defaultSalesPersonCode
            creditRequestCardHeaderInfo.creditRequestSalesChannel.value = webUserInfo.defaultSalesChannel
            creditRequestCardHeaderInfo.creditRequestCustomerPriceGroup.value = webUserInfo.defaultCustomerPriceGroup
            creditRequestCardHeaderInfo.creditRequestVATBusPostingGroup.value = webUserInfo.defaultCustomerVATBusPostingGroup
            creditRequestCardHeaderInfo.creditRequestPrepayment.value = webUserInfo.defaultCustomerPrepayment   
            
            userCanChangePriceGroup.value = useWebUserInfoStore().canChangePriceGroup

        })

        const creditRequestCardCreditInfo ={
            approvalStatus:ref(0),
            eligibleAmount:ref(0),
            //interestRate:ref(mirindraGP.value.monthlyInterestRate),
            duration:ref(mirindraGP.value.maximumCreditDuration),
            requiredDeposit:ref(0)
        }

        // watchEffect(() => {
        //     getCreditRequestCustomerScoringInfo()
        // })

        // watchEffect(() => {
        //     getCreditRequestCustomerRequirementInfo()
        // })

        // watch(creditRequestCardHeaderInfo.creditRequestCustomerNo,() => {
        //     if(creditRequestCardHeaderInfo.creditRequestCustomerNo.value
        //     && creditRequestCardHeaderInfo.creditRequestAccountType.value==1){
        //         getCreditRequestCustomerRequirementInfo()
        //         getCreditRequestCustomerScoringInfo()
        //     }
        // })

        // watch(creditRequestCardHeaderInfo.creditRequestCustomerContactCode,() => {
        //     if(creditRequestCardHeaderInfo.creditRequestCustomerContactCode.value 
        //     && creditRequestCardHeaderInfo.creditRequestAccountType.value==0){
        //         getCreditRequestLeadRequirementInfo()
        //         getCreditRequestLeadScoringInfo()
        //     }
        // })
        watch(creditRequestJoinType,(newValue, oldValue) =>{
            if(newValue!==oldValue){
                creditRequestJoinCode.value=''
            }
        })


        







        



        
        
        

        






        return{
            isItemInfoToFill,
            ...creditRequestCardHeaderInfo,
            ...creditRequestCardCreditInfo,
            creditRequestCardLines, creditRequestAmortization,creditRequestCustomerScoring,creditRequestCustomerRequirement,
            ...itemInfo,...itemAvailabilityInfo,
            ...dateInfo,
            ...labelBag,
            displayValueTypeLabel,displayRequirementLevelLabel,displayValidityTypeLabel,
            fillCustomerInfoField,fillContactInfoField,fillLocationInfoField,fillAddressInfoField,fillLeadInfoField,
            fillCampaignInfoField,fillPaymentMethodInfoField,fillShipmentMethodInfoField,fillItemInfoField,fillPriceGroupInfoField,
            addEmptyRow,addCommentRow,addRowByForm_andContinue,addRowByForm_andClose,resetForm,
            submitForm,controlBeforeSubmit,
            simulateCredit,
            criteriaValueDropdownIsActive,activeCriteriaValueDropdown,getCriteriaValueList,fillCriteriaValue,scoringCriteriaValueList,
            error_message,error_message_code,success_message,submitting_message,
            mirindraGP,depositAmount,chargeableAmount,interest,VATonInterest,interestIncVAT,
            loanAmount,totalAgreement,installment,finalInstallment,totalAmountExclVAT,totalVAT,totalAmountIncVAT,
            creditRequestJoinType,isJoinCodeToFill,creditRequestJoinCode,
            newAddressModalShowned,
            userCanChangePriceGroup,
        }
    },
    methods:{
        showAddressCreationModal(){
            this.activeModalForSelectableElementList = ''
            this.newAddressModalShowned = true
        },
        goBackToList(){
            useNavigationTabStore().setActiveGroup('sales')
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
        displayCriteriaValueDropdown(index,criteria){
            this.scoringCriteriaValueList=[]
            this.getCriteriaValueList(criteria)
            this.activeCriteriaValueDropdown =index
            this.criteriaValueDropdownIsActive=true
        },
        closeCriteriaValueDropdown(){
            this.activeCriteriaValueDropdown =-1
            this.criteriaValueDropdownIsActive=false
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
            myElt.classList.add('is-hovered-td')
            myElt.classList.add('shadow')
        },
        ////////////////////methode pour enlever la couleur de la ligne une fois que l'user n'est plus dessus
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.remove('is-hovered-td')
            myElt.classList.remove('shadow')
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
         },
         formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else return ''
        },
        formatDate(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString()
            }else return ''
        },
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

#general_content,#line_content,#credit_content,#amortization_content,#scoring_content,#requirements_content{
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

.has-background-orange1{
    background-color: orange
}

div[contenteditable="true"]:focus {
    outline: none; /* Remove the default focus outline */
    border: 2px solid rgba(255, 89, 0, 0.437); /* Add your desired border style */
    background-color: #f9f9f9; /* Change the background color */
    /* Add any other styles you want */
}

.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}

</style>