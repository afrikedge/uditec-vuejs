<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <s-q-card-Header :soNo="saleQuoteCardHeader['No_']" :soDesc="saleQuoteCardHeader['Sell-to Customer Name']" pageTitle="Devis vente"
                @onGoingBackToList='goBackToList'
                ></s-q-card-Header>
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <s-q-card-ribbon
            routeForNewCard="../NewSaleQuote"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @onConvertingSaleQuote="showConvertSQConfirmationModal"
            @onPrintingCard="showPrintSaleQuoteLayout"
            @onRequestingForApproval="submitSQrequestForApproval"
            @onReopeningDocument="sendReopeningDocRequest"
            @onCreatingCustomerContactCard="this.$router.push('/newContact')"
            @onCreatingCustomerAddressCard="showAddressCreationModal"
            @onCheckingItemAvailability="showItemAvaibilityInfoModal"
            @onSubmittingDiscountRequest="submitDiscountRequest"
            componentWithCompInfo="quoteCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :printCardBtnIsDisabled="saleQuoteCardHeader['Status']!==1"
            :convertQuoteBtnIsDisabled="!SQCanBeConverted"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="false"
            :requestForApprovalBtnIsDisabled="false"
            :reopenBtnIsDisabled="false"
            :documentStatus="saleQuoteCardHeader['Status']"
            :newContactBtnIsDisabled="false"
            :newShipToAddressBtnIsDisabled="false"
            :checkItemAvailabilityBtnIsDisabled="false"
            :discountRequestBtnIsDisabled="saleQuoteCardHeader['Status']!==0 || saleQuoteCardHeader['Approval Status']!==0"
            ></s-q-card-ribbon>


<!---------Composant message d'enregistrement en cours ou d'erreur ou de success----------------------->      
            <article v-if="submitting_message" class="" >
                <span class="icon">
                    <i class="fas fa-spinner fa-pulse"></i>
                </span>
                <span class="subtitle is-7"> {{ submitting_message }} </span>
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
                                <i class="fas fa-check"></i>
                            </span>
                            {{ success_message }}
                        </span>
                    <button class="delete" aria-label="delete" @click="success_message=''"></button>
                </div>
            </article>


<!---------Section formulaire fiche devis----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire fiche devis----------------------->                         
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
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet1_expanded">Afficher plus</div>
                            <div class="column py-0 has-text-right is-size-7" v-if="!onglet1_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">{{ saleQuoteCardHeader['Sell-to Customer Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ saleQuoteCardHeader['Sell-to Contact No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ formatDate(saleQuoteCardHeader['Document Date']) }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ saleQuoteCardHeader['Status']==0?'Ouvert':saleQuoteCardHeader['Status']==1?'Lancé':'Approbation en attente' }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Code client" :valueInputText="saleQuoteCardHeader['Sell-to Customer No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code client" v-model="saleQuoteCardHeader['Sell-to Customer No_']" @openModal="activeModalForSelectableElementList='customerList'" v-else></input-select>
                                
                                <input-text labelInputText="Nom du client" v-model="saleQuoteCardHeader['Sell-to Customer Name']" :valueInputText="saleQuoteCardHeader['Sell-to Customer Name']" :is_disabled="!readOnlyModeIsDisabled" :is_readOnly="true"></input-text>
                                
                                <input-text labelInputText="Code Contact"  :valueInputText="saleQuoteCardHeader['Sell-to Contact No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled && saleQuoteCardHeader['Sell-to Customer No_']!==''"></input-text>
                                <input-select labelInputText="Code Contact" v-model="saleQuoteCardHeader['Sell-to Contact No_']" @openModal="activeModalForSelectableElementList='contactList'" v-if="readOnlyModeIsDisabled && saleQuoteCardHeader['Sell-to Customer No_']!==''"></input-select>
                                
                                <input-text labelInputText="Code prospect" :valueInputText="saleQuoteCardHeader['Sell-to Contact No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled && saleQuoteCardHeader['Sell-to Customer No_']==''"></input-text>
                                <input-select labelInputText="Code prospect" v-model="saleQuoteCardHeader['Sell-to Contact No_']" @openModal="()=>{activeModalForSelectableElementList='leadList';}" v-if="readOnlyModeIsDisabled && saleQuoteCardHeader['Sell-to Customer No_']==''"></input-select>                   
                                
                                <input-text labelInputText="Code promo" :valueInputText="saleQuoteCardHeader['Campaign No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code promo" v-model="saleQuoteCardHeader['Campaign No_']" @openModal="activeModalForSelectableElementList='campaignList'" v-else></input-select>
                                
                                <input-text labelInputText="Code magasin" :valueInputText="saleQuoteCardHeader['Location Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code magasin" v-model="saleQuoteCardHeader['Location Code']" @openModal="activeModalForSelectableElementList='locationList'" v-else></input-select>
                                
                                <input-text labelInputText="Mode livraison" :valueInputText="saleQuoteCardHeader['Shipment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode livraison" v-model="saleQuoteCardHeader['Shipment Method Code']" @openModal="activeModalForSelectableElementList='shipmentMethodList'" v-else></input-select>
                                
                                <input-text labelInputText="Adresse de livraison" :valueInputText="saleQuoteCardHeader['Ship-to Code']"  :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Adresse de livraison" v-model="saleQuoteCardHeader['Ship-to Code']"  @openModal="activeModalForSelectableElementList='addressList'" v-else></input-select>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date du devis" :valueInputText="formatDate(saleQuoteCardHeader['Document Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date du devis" v-model="documentDate" v-else></input-date>
                                                                
                                <input-text labelInputText="Date fin validité" :valueInputText="formatDate(saleQuoteCardHeader['Quote Valid Until Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date fin validité" v-model="validityDate" v-else></input-date>
                                
                                <input-text labelInputText="Date livraison demandée" :valueInputText="formatDate(saleQuoteCardHeader['Requested Delivery Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date livraison demandée" v-model="shipRequestedDate" v-else></input-date>
                                
                                <input-text labelInputText="Date livraison promise" :valueInputText="formatDate(saleQuoteCardHeader['Promised Delivery Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date livraison promise" v-model="promisedDeliveryDate" v-else></input-date>
                                
                                <input-text labelInputText="Mode de règlement" :valueInputText="saleQuoteCardHeader['Payment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de règlement" v-model="saleQuoteCardHeader['Payment Method Code']" @openModal="activeModalForSelectableElementList='paymentMethodList'" v-else></input-select>
                                                                                                
                                <input-text labelInputText="Statut" inputTextColor="has-text-primary" inputTextWeight="has-text-weight-bold" :valueInputText="getStatusLabel" :is_disabled="true"></input-text>
                                <input-text labelInputText="Statut remise" inputTextWeight="has-text-weight-bold" :valueInputText="getApprovalStatusLabel" :is_disabled="true"></input-text>
                                
                                <input-number labelInputText="% Remise demandé" v-model="saleQuoteDiscount" :valueInputText="saleQuoteDiscount" :is_disabled="!readOnlyModeIsDisabled || saleQuoteCardHeader['Status']!==0" v-if="saleQuoteCardHeader['Status']==0 && saleQuoteCardHeader['Approval Status']==0"></input-number>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche client en lecture seule----------------------->                         
                    <div id="line" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('line_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Lignes</span>
                                    </a>
                                    <a @click="expand('line_content');onglet2_expanded=!onglet2_expanded" v-else>
                                        <span>Lignes</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="line_content" class=" px-5 mt-5" style="max-height: 350px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code Article</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Magasin de livraison</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Emplacement</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de vente</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de livraison</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">% Acompte</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of saleQuoteCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ Number.isInteger(elt['Line No_']/10000)?elt['Line No_']/10000:elt['Line No_'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Type']==2?'Article':'Commentaire' }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['No_'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Location Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Bin Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Unit of Measure'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ elt['Quantity'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Shipment Method Code'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Unit Price']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ elt['VAT _'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Line Amount']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Prepayment _']) }}</td>                                                                                      
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet2_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(saleQuoteCardHeader['Total Amount']) + ' MGA'" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(saleQuoteCardHeader['Total VAT']) + ' MGA'" labelInputText="Montant TVA"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(saleQuoteCardHeader['Total Amount Including VAT']) + ' MGA'" labelInputText="Montant TTC"></input-text1>
                                </div>
                        </div>                
                    </div>
                    

<!---------sous-Section onglet 2 formulaire fiche client en lecture/ecriture----------------------->                         
                    <div id="line" v-else>
                        <div :class="{'has-background-white':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('line_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Lignes</span>
                                    </a>
                                    <a @click="expand('line_content');onglet2_expanded=!onglet2_expanded" v-else>
                                        <span>Lignes</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet2_expanded">|</span>
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="deleteLine(selectedLine)">
                                        <span class="icon">
                                            <i class="fas fa-eraser has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7">
                                            Supprimer la ligne
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="line_content" class=" px-5 mt-5" style="max-height: 350px; overflow:scroll;">
                                <div style="margin-bottom: 400px;">
                                    <table class="table  is-narrow  is-fullwidth">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° ligne</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Code Article</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Magasin de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Emplacement</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de vente</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">% Acompte</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of saleQuoteCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" @click="selectLine(index)">
                                                <td class="has-text-left">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
    
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['Line No_'] }}
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['Type']==2?'Article':'Commentaire' }}
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div class="dropdown is-small" :class="{'is-active':itemListDropdownIsActive && activeItemLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['No_']" class="input is-small has-background-light" type="text" style="border:none">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeItemLineDropdown!==index" @click.prevent="displayItemListDropdown(index)">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="itemListDropdownIsActive==true && activeItemLineDropdown==index" @click.prevent="closeItemListDropdown">
                                                                        <span class="icon">
                                                                            <i class="fas fa-close" ></i>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="dropdown-menu" id="dropdown-menu" role="menu" style="max-width:500px; max-height:200px;overflow: scroll;padding:0" >
                                                        <div class="dropdown-content" style="margin:0">
                                                            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                                                <thead class="my-2">
                                                                    <tr > 
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">N°</th>
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Description</th>
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Code catégorie article</th>
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Unité de vente</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="(item,index1) of userItemList" :key="'item-'+index1" @click="fillLineByItemCode(index,item)" >
                                                                        <td class="has-text-left is-narrow"> {{ item['No_'] }}</td>
                                                                        <td class="has-text-left is-narrow">{{ item["Description"] }}</td>
                                                                        <td class="has-text-left is-narrow">{{ item["Item Category Code"] }}</td>
                                                                        <td class="has-text-left is-narrow">{{ item["Sales Unit of Measure"] }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                          </div>
                                                        </div>
                                                    </div>
                                                    <!--------div :id="index+'-'+elt['No_']+'-No_'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['No_']" @blur="onEdit" @keydown.enter="endEdit"></div---------->
                                                </td>
                                                <td class="has-text-left py-1 px-2 is-narrow">
                                                    {{ elt['Description'] }}
                                                </td>
                                                <td class="has-text-left py-0 px-2">
                                                    <div class="dropdown is-small" :class="{'is-active':locationListDropdownIsActive && activeLocationLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['Location Code']" class="input is-small has-background-light" type="text" style="border:none">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeLocationLineDropdown!==index" @click.prevent="displayLocationListDropdown(index)">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="locationListDropdownIsActive==true && activeLocationLineDropdown==index" @click.prevent="closeLocationListDropdown">
                                                                        <span class="icon">
                                                                            <i class="fas fa-close" ></i>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="dropdown-menu" id="dropdown-menu" role="menu" style="max-width:500px; max-height:200px;overflow: scroll;padding:0" >
                                                        <div class="dropdown-content" style="margin:0">
                                                            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                                                <thead class="my-2">
                                                                    <tr > 
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Code</th>
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Nom</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="(location,index2) of userLocationList" :key="'location-'+index2" @click="fillLineByLocationCode(index,location)" >
                                                                        <td class="has-text-left is-narrow"> {{ location['Code'] }}</td>
                                                                        <td class="has-text-left is-narrow">{{ location["Name"] }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                          </div>
                                                        </div>
                                                    </div>
                                                    <!--------div :id="index+'-'+elt['Location Code']+'-Location Code'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Location Code']" @blur="onEdit" @keydown.enter="endEdit"></div---------->
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div class="dropdown is-small" :class="{'is-active':locationBinListDropdownIsActive && activeLocationBinLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['Bin Code']" class="input is-small has-background-light" type="text" style="border:none">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeLocationBinLineDropdown!==index" @click.prevent="displayLocationBinListDropdown(index,elt['Location Code'],elt['No_'])">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="locationBinListDropdownIsActive==true && activeLocationBinLineDropdown==index" @click.prevent="closeLocationBinListDropdown">
                                                                        <span class="icon">
                                                                            <i class="fas fa-close" ></i>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="dropdown-menu" id="dropdown-menu" role="menu" style="max-width:500px; max-height:200px;overflow: scroll;padding:0" >
                                                        <div class="dropdown-content" style="margin:0">
                                                            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                                                <thead class="my-2">
                                                                    <tr > 
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Code</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="(locationBin,index4) of userLocationBinList" :key="'locationBin-'+index4" @click="fillLineByLocationBinCode(index,locationBin)" >
                                                                        <td class="has-text-left is-narrow"> {{ locationBin['Bin Code'] }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                          </div>
                                                        </div>
                                                    </div>                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['Unit of Measure'] }}
                                                </td>
                                                <td class="has-text-right py-0 px-2" >
                                                    <div :id="index+'-'+elt['Quantity']+'-Quantity'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Quantity']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div class="dropdown is-small" :class="{'is-active':shipmentMethodListDropdownIsActive && activeshipmentMethodLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['Shipment Method Code']" class="input is-small has-background-light" type="text" style="border:none">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeshipmentMethodLineDropdown!==index" @click.prevent="displayShipmentMethodListDropdown(index)">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="shipmentMethodListDropdownIsActive==true && activeshipmentMethodLineDropdown==index" @click.prevent="closeShipmentMethodListDropdown">
                                                                        <span class="icon">
                                                                            <i class="fas fa-close" ></i>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="dropdown-menu" id="dropdown-menu" role="menu" style="max-width:500px; max-height:200px;overflow: scroll;padding:0" >
                                                        <div class="dropdown-content" style="margin:0">
                                                            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                                                <thead class="my-2">
                                                                    <tr > 
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Code</th>
                                                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-narrow" style="min-width: 100px;">Description</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="(shipmentMethod,index3) of shipmentMethodList" :key="'location-'+index3" @click="fillLineByShipmentMethodCode(index,shipmentMethod)" >
                                                                        <td class="has-text-left is-narrow"> {{ shipmentMethod['Code'] }}</td>
                                                                        <td class="has-text-left is-narrow">{{ shipmentMethod["Description"] }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                          </div>
                                                        </div>
                                                    </div>
                                                    <!---------div :id="index+'-'+elt['Shipment Method Code']+'-Shipment Method Code'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Shipment Method Code']" @blur="onEdit" @keydown.enter="endEdit"></div------>
                                                </td>
                                                <td class="has-text-right py-1 px-2" >
                                                    {{ formatAmount(elt['Unit Price']) }}
                                                </td>
                                                <td class="has-text-right py-1 px-2" >
                                                    {{ elt['VAT _'] }}
                                                </td>
                                                <td class="has-text-right py-1 px-2 is-narrow" >
                                                    {{ formatAmount(elt['Line Amount']) }}
                                                </td>
                                                <td class="has-text-right py-1 px-2 is-narrow" >
                                                    {{ formatAmount(elt['Prepayment _']) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="saleQuoteCardLines.length==0">Il n'y'a rien à afficher</div>
                            </div>
                            <div class="columns mt-3" id="line_total" v-if="onglet2_expanded">
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalDiscount) + ' MGA'" labelInputText="Montant Remise"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalVAT) + ' MGA'" labelInputText="Montant TVA"></input-text1>
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalAmountExclVAT) + ' MGA'" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalAmountIncVAT) + ' MGA'" labelInputText="Montant TTC"></input-text1>
                                </div>
                            </div>         
                        </div>
                        
<!---------Modal sous-Section onglet 2 formulaire fiche client -----Modal d'ajout d'article----------------------->                         
                        <div :class="{'modal':true , 'is-active':addItemModalShowned }" v-if="addItemModalShowned">
                            <div class="modal-background has-background-white" style="opacity:0.7" @click.prevent="addItemModalShowned=false"></div>
                            <div class="modal-content box w-75 h-100" style=" background-color: rgba(255,255,255,1);border: none;">
                                
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
                                                    <input-select v-show="itemType==2" v-model="itemLocation" labelInputText="magasin de livraison" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationList',isItemInfoToFill=true}"></input-select>
                                                    <input-select  v-show="itemType==2" v-model="itemBinCode" labelInputText="Emplacement" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationBinList'}"></input-select>
                                                    <input-number  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité" @onChangingInputValue="submitSQLineItemPriceRequest" :is_disabled="false" ></input-number>
                                                    <input-select  v-show="itemType==2" v-model="itemShipmentMethod" labelInputText="Mode de livraison"  :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='shipmentMethodList',isItemInfoToFill=true}"></input-select>
                                                    <input-number  v-show="itemType==2" :valueInputText="formatAmount(itemUnitPrice)" labelInputText="Prix unitaire" :is_disabled="true" :is_loading="itemPriceIsGetting"></input-number>
                                                </div>
                                                <div class="field is-grouped mt-5">
                                                    <p class="control">
                                                        <button type="submit" class="button has-background-orangered  shadow has-text-white">
                                                            <span class="icon">
                                                                <i class="fas fa-plus"></i>
                                                            </span>
                                                            <span class="subtitle is-6 has-text-white">Ajouter et continuer</span>
                                                        </button>
                                                    </p>
                                                    <p class="control">
                                                        <button class="button has-background-orangered  shadow has-text-white" @click.prevent="()=>{addRowByForm_andClose();addItemModalShowned=false}">
                                                            <span class="icon">
                                                                <i class="fas fa-close"></i>
                                                            </span>
                                                            <span class="subtitle is-6 has-text-white">Ajouter et fermer</span>
                                                        </button>
                                                    </p>
                                                    <p class="control">
                                                        <button class="button" @click.prevent="resetForm">
                                                            <span class="icon">
                                                                <i class="fas fa-refresh"></i>
                                                            </span>
                                                            <span class="subtitle is-6 has-text-orange">Réinitialiser</span>
                                                        </button>
                                                    </p>
                                                </div>     
                                                <p class="title has-text-left is-6 mt-5" v-if="itemCode && itemType==2">Disponibilité article Magasin : </p>
                                                <div class="columns is-mobile is-multiline" v-if="itemCode && itemType==2">
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
                                                            <span class="has-text-light subtitle is-2">{{ Math.round(itemOnTransferLocation) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            Sur ordre de transfert magasin
                                                        </h6>
                                                    </div>
                                                    <div class="column has-background-orangered mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                                                        <div class="has-text-right ">
                                                            <span class="has-text-light subtitle is-2">{{Math.round(itemInStockLocation) - Math.round(itemOnTransferLocation) - Math.round(itemOnSalesLocation) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            Disponible sur magasin
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
                                                    <div class="column has-background-orangered mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                                                        <div class="has-text-right ">
                                                            <span class="has-text-light subtitle is-2">{{ Math.round(itemInStockGlobal) - Math.round(itemOnSalesGlobal) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            Disponible globalement
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
                                    </div> 
                                </form>
                            </div>
                            <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="addItemModalShowned=false"></button>
                        </div>

<!---------sous-Section onglet 2 formulaire fiche client -----Modal de modification d'article----------------------->                         
                        <div :class="{'modal':true , 'is-active':editItemModalShowned }" v-if="editItemModalShowned">
                            <div class="modal-background has-background-white" style="opacity:0.7" @click.prevent="closeEditItemModal"></div>
                            <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                                
                                <form @submit.prevent="() => {editRowByForm(selectedLine);editItemModalShowned=false;}">

                                    <div class="has-text-left mb-5">
                                        <span class="is-size-3 subtitle ">Modification ligne commande</span>
                                    </div>

                                    <div class="modal-content-hist container">

                                        <div class="columns" >
                                            <div class="column">
                                                <div>
                                                     <!---input-text  :valueInputText="itemLineNo" labelInputText="N° ligne" :is_disabled="true " ></input-text--->
                                                     <input-select-basic  v-model="itemType" labelInputText="Type ligne"></input-select-basic>
                                                    <input-text v-show="itemType==2" v-model="itemCode" labelInputText="Code article" :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                    <input-text v-model="itemDescription" labelInputText="Description" :is_disabled="false"></input-text>
                                                    <input-select v-show="itemType==2" v-model="itemLocation" labelInputText="magasin de livraison" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationList',isItemInfoToFill=true}"></input-select>
                                                    <input-select  v-show="itemType==2" v-model="itemBinCode" labelInputText="Emplacement" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationBinList'}"></input-select>
                                                    <!----input-text :valueInputText="itemUnitOfMeasure" labelInputText="Unité de mesure"  :is_disabled="true"></input-text---->
                                                    <input-number  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false" @onChangingInputValue="submitSQLineItemPriceRequest"></input-number>
                                                    <input-select  v-show="itemType==2" v-model="itemShipmentMethod" labelInputText="Mode de livraison"  :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='shipmentMethodList',isItemInfoToFill=true}"></input-select>
                                                    <input-number    v-show="itemType==2" :valueInputText="formatAmount(itemUnitPrice)" labelInputText="Prix unitaire" :is_disabled="true" :is_loading="itemPriceIsGetting"></input-number>
                                                </div>
                                                <div class="field is-grouped mt-5">
                                                    <p class="control">
                                                        <button type="submit" class="button has-background-orangered  shadow has-text-white" >
                                                            <span class="icon">
                                                                <i class="fas fa-edit"></i>
                                                            </span>
                                                            <span class="subtitle is-6 has-text-white">Modifier</span>
                                                        </button>
                                                    </p>
                                                    <p class="control">
                                                        <button  class="button has-background-orangered  shadow has-text-white" @click.prevent="()=>{editRowByForm(selectedLine);editItemModalShowned=false;if(saleQuoteCardHeader['Location Code']) addItemModalShowned=true}">
                                                            <span class="icon">
                                                                <i class="fas fa-plus"></i>
                                                            </span>
                                                            <span class="subtitle is-6 has-text-white">Modifier et nouveau</span>
                                                        </button>
                                                    </p>
                                                    <p class="control" v-if="itemCode && itemType==2">
                                                    <button class="button" @click.prevent="getItemAvailabilityInfo">
                                                        <span class="icon">
                                                            <i class="fas fa-refresh"></i>
                                                        </span>
                                                        <span class="subtitle is-6 has-text-orange">Rafraichir stock</span>
                                                    </button>
                                                    </p>
                                                </div>   
                                                <p class="title has-text-left is-6 mt-5" v-if="itemCode && itemType==2">Disponibilité article: </p>
                                                <div class="columns is-mobile is-multiline" v-if="itemCode && itemType==2">
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
                                                            <span class="has-text-light subtitle is-2">{{ Math.round(itemOnTransferLocation) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            Sur ordre de transfert magasin
                                                        </h6>
                                                    </div>
                                                    <div class="column has-background-orangered mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                                                        <div class="has-text-right ">
                                                            <span class="has-text-light subtitle is-2">{{Math.round(itemInStockLocation) - Math.round(itemOnTransferLocation) - Math.round(itemOnSalesLocation) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            Disponible sur magasin
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
                                                    <div class="column has-background-orangered mr-1 mb-1 is-2 " style="width: 120px; height: 120px;">
                                                        <div class="has-text-right ">
                                                            <span class="has-text-light subtitle is-2">{{ Math.round(itemInStockGlobal) - Math.round(itemOnSalesGlobal) }}</span>
                                                        </div>
                                                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                                                            Disponible globalement
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
                                    </div> 
                                </form>
                            </div>
                            <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="closeEditItemModal"></button>
                        </div>
                    </div>              
                    <br><br>


<!---------sous-Section onglet 3 formulaire fiche client----------------------->                         
                    <div id="quote-details">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('quote_details_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>Détails devis</span>
                                </a>
                                <a @click="expand('quote_details_content');onglet3_expanded=!onglet3_expanded" v-else>
                                    <span>Détails devis</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet3_expanded">Afficher plus</div>
                            <div class="column py-0 has-text-right is-size-7" v-if="!onglet3_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">{{ saleQuoteCardHeader['Responsibility Center'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;"> {{ saleQuoteCardHeader['Salesperson Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ saleQuoteCardHeader['VAT Bus_ Posting Group'] }}</span>
                            </div>
                        </div>
                        <div id="quote_details_content" class="columns">
                            <div class="column">                                                                                                
                                <input-text labelInputText="Centre de gestion" :valueInputText="saleQuoteCardHeader['Responsibility Center']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Code vendeur" :valueInputText="saleQuoteCardHeader['Salesperson Code']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Canal de vente" :valueInputText="saleQuoteCardHeader['Sales Channel']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Mode de vente" :valueInputText="saleQuoteCardHeader['Sales Mode']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || saleQuoteCustomerType==2"></input-text>
                                <input-select labelInputText="Mode de vente" v-model="saleQuoteCardHeader['Sales Mode']"  @openModal="activeModalForSelectableElementList='salesModeList'" v-else></input-select>

                            </div>
                            <div class="column">                                
                                <!---input-text labelInputText="Groupe tarifaire" :valueInputText="saleQuoteCardHeader['Customer Price Group']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || !userCanChangePriceGroup"></input-text--->
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="saleQuoteCardHeader['Customer Price Group']" :is_disabled="true" v-if="true"></input-text>
                                <input-select labelInputText="Groupe tarifaire" v-model="saleQuoteCardHeader['Customer Price Group']" @openModal="activeModalForSelectableElementList='priceGroupList'" v-else></input-select>

                                <input-text labelInputText="Conditions de paiement" :valueInputText="saleQuoteCardHeader['Payment Terms Code']" :is_disabled="true"></input-text>

                                <input-text labelInputText="Régime TVA" :valueInputText="saleQuoteCardHeader['VAT Bus_ Posting Group']" :is_disabled="true"></input-text>
                                
                                <input-number labelInputText="% Acompte" v-model="saleQuotePrepayment" :valueInputText="formatAmount(saleQuotePrepayment)" :is_disabled="!readOnlyModeIsDisabled || saleQuoteCustomerType==2" @onChangingInputValue="getPrepaymentInfo"></input-number>
                                
                                <input-number labelInputText="Montant acompte" v-model="saleQuotePrepaymentAmount" :valueInputText="formatAmount(saleQuotePrepaymentAmount)" :is_disabled="!readOnlyModeIsDisabled || saleQuoteCustomerType==2" @onChangingInputValue="getPrepaymentAmountInfo"></input-number>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                </div>

<!---------composant info client----------------------->
                <customer-info class="customer-info" v-if="true"></customer-info>
                <prospect-info class="prospect-info" v-else></prospect-info>

            </div>


<!-----------report viewer-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-show="printSaleQuoteLayoutShowned" v-if="saleQuoteCardHeader['No_']">
                <div class="modal-background has-background-white" style="opacity:0.7" @click="printSaleQuoteLayoutShowned=false"></div>
                <div class="modal-content container w-100" style=" background-color: rgba(255,255,255,1);border: none;">
                    <report-viewer :src="`http://10.64.25.11:80/ReportServer/Pages/ReportViewer.aspx?/WebApp/SalesQuotePrint&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&Quote=${saleQuoteCardHeader['No_']}`"></report-viewer>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="printSaleQuoteLayoutShowned=false"></button>
            </div>

<!-----------Disponibilité article-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="inventoryAvailabilityModalShowned">
                <div class="modal-background has-background-white" style="opacity:0.7" @click="inventoryAvailabilityModalShowned=false"></div>
                <div class="modal-content w-75 shadow has-background-light">
                    <inventory-availability></inventory-availability>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="inventoryAvailabilityModalShowned=false"></button>
            </div>

    
<!-----------modal de confirmation convertion de devis-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="SQConfirmationModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.2" @click="SQConfirmationModalShowned=false"></div>
                <div class="modal-content has-background-white p-5 shadow" style="border: none;">
                    <div class="columns mb-5">
                        <div class="column is-narrow">
                            <span class="icon is-large">
                            <i class="far fa-circle-question fa-2x"></i>
                            </span>
                        </div>
                        <div class="column has-text-left">
                            <span class="subtitle is-5 has-text-left">Le devis sera converti en commande et sera par la suite archivé. Souhaitez-vous continuer?</span>
                        </div>
                    </div>
                    <div class="buttons mt-5 is-right">
                        <button class="button shadow has-background-orange has-text-white" @click.prevent="getLeadCardInfo">
                            Je confirme
                        </button>
                        <button class="button shadow" @click.prevent="SQConfirmationModalShowned=false">J'annule</button>
                    </div>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" SQConfirmationModalShowned=false"></button>
            </div>


<!-----------modal de confirmation maj % acompte-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="SQConfirmationPymtUpdateModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.2" ></div>
                <div class="modal-content has-background-white p-5 shadow" style="border: none;border-radius: 0;">
                    <div class="columns mb-5">
                        <div class="column is-narrow">
                            <span class="icon is-large">
                            <i class="far fa-circle-question fa-2x"></i>
                            </span>
                        </div>
                        <div class="column has-text-left">
                            <span class="subtitle is-5 has-text-left">Vous avez mis à jour le % d'acompte sur la demande; les lignes d'article seront mises à jour en conséquence!</span>
                        </div>
                    </div>
                    <div class="buttons mt-5 is-right">
                        <button class="button shadow has-background-orange1 has-text-white" @click.prevent="submitPrepaymentLinesUpdate">
                            Continuer
                        </button>
                        <button class="button shadow" @click.prevent="cancelPrepaymentLinesUpdate">Annuler</button>
                    </div>
                </div>
                <!----button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" SQConfirmationPymtUpdateModalShowned=false"></button--->
            </div>



<!-----------Modal pour la création d'un contact-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newContactModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newContactModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-contact :customerNo="saleQuoteCardHeader['Sell-to Customer No_']" :redirectionIsDisabled="true" @submit="(elt) => {saleQuoteCardHeader['Sell-to Contact No_'] = elt['code'];newContactModalShowned=false} "></new-contact>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newContactModalShowned=false }"></button>
            </div>


<!-----------Modal pour la création d'une adresse-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newAddressModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newAddressModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-ship-to-address :customerNo="saleQuoteCardHeader['Sell-to Customer No_']" :contactNo="saleQuoteCardHeader['Sell-to Contact No_']" :redirectionIsDisabled="true" @submit="(elt) => {saleQuoteCardHeader['Ship-to Code'] = elt;newAddressModalShowned=false} "></new-ship-to-address>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newAddressModalShowned=false }"></button>
            </div>



        </div>

<!----------------------------------------------------------->
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

        <modal-for-selectable-location-bin-list 
            v-if="activeModalForSelectableElementList=='locationBinList'" 
            :isActive="activeModalForSelectableElementList=='locationBinList'" 
            :locationCode="itemLocation"
            :itemCode="itemCode"
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableLocationBinListModal="(elt)=>fillLocationBinInfoField(elt)">
        </modal-for-selectable-location-bin-list>

        <modal-for-selectable-contact-list 
            v-if="activeModalForSelectableElementList=='contactList'" 
            :isActive="activeModalForSelectableElementList=='contactList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="saleQuoteCardHeader['Sell-to Customer No_']" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)"
            @onDisplayingContactCreationModal="()=>showContactCreationModal()">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-lead-list 
            v-if="activeModalForSelectableElementList=='leadList'" 
            :isActive="activeModalForSelectableElementList=='leadList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableLeadListModal="(elt)=>fillLeadInfoField(elt)">
        </modal-for-selectable-lead-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerNo="saleQuoteCardHeader['Sell-to Customer No_']" 
            @onGettingLineFromSelectableAddressListModal="(elt)=>fillAddressInfoField(elt)"
            @onDisplayingShipToAddressCreationModal="()=>showAddressCreationModal()">
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

        <modal-for-selectable-vat-bus-posting-group-list 
            v-if="activeModalForSelectableElementList=='vatGroupList'" 
            :isActive="activeModalForSelectableElementList=='vatGroupList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableVATGroupListModal="(elt)=>fillVATGroupInfoField(elt)">
        </modal-for-selectable-vat-bus-posting-group-list>

        <modal-for-selectable-price-group-list 
            v-if="activeModalForSelectableElementList=='priceGroupList'" 
            :isActive="activeModalForSelectableElementList=='priceGroupList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectablePriceGroupListModal="(elt)=>fillPriceGroupInfoField(elt)">
        </modal-for-selectable-price-group-list>

        <modal-for-selectable-sales-mode-list 
            v-if="activeModalForSelectableElementList=='salesModeList'" 
            :isActive="activeModalForSelectableElementList=='salesModeList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableSalesModeListModal="(elt)=>fillSalesModeInfoField(elt)">
        </modal-for-selectable-sales-mode-list>

        <modal-for-selectable-payment-term-list 
            v-if="activeModalForSelectableElementList=='paymentTermList'" 
            :isActive="activeModalForSelectableElementList=='paymentTermList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :salesMode="saleQuoteCardHeader['Sales Mode']"
            @onGettingLineFromSelectablePaymentTermListModal="(elt)=>fillPaymentTermInfoField(elt)">
        </modal-for-selectable-payment-term-list>


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
import inputNumber from './input/input-number.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableCampaignList from './ModalForSelectableCampaignList.vue'
import ModalForSelectableShipmentMethodList from './ModalForSelectableShipmentMethodList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import ModalForSelectableLocationList from './ModalForSelectableLocationList.vue'
import ModalForSelectableLocationBinList from './ModalForSelectableLocationBinList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableLeadList from './ModalForSelectableLeadList.vue'
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import ModalForSelectableVatBusPostingGroupList from './ModalForSelectableVATBUSPostingGroupList.vue'
import ModalForSelectablePriceGroupList from './ModalForSelectablePriceGroupList.vue'
import ModalForSelectablePaymentTermList from './ModalForSelectablePaymentTermList.vue'
import ModalForSelectableSalesModeList from './ModalForSelectableSalesModeList.vue'
import NewContact from './NewContact.vue'
import NewShipToAddress from './NewShipToAddress.vue'

import SelectableItemListForSale from './SelectableItemListForSale.vue'
import InventoryAvailability from './InventoryAvailability.vue'
import ReportViewer from './ReportViewer.vue'
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'





export default {
    name:'sale-quote-card',
    components:{
        SQCardHeader,CustomerInfo,ProspectInfo,SQCardRibbon,ReportViewer,
        inputText,inputText1,inputSelect,inputSelectBasic,inputDate,inputNumber,
        ModalForSelectableCustomerList,ModalForSelectableCampaignList,ModalForSelectablePaymentMethodList,
        ModalForSelectableShipmentMethodList,ModalForSelectableItemList,ModalForSelectableLocationList,ModalForSelectableLocationBinList,
        ModalForSelectableContactList,ModalForSelectableLeadList,ModalForSelectableAddressList,ModalForSelectableVatBusPostingGroupList,
        ModalForSelectablePaymentTermList,ModalForSelectableSalesModeList,SelectableItemListForSale,ModalForSelectablePriceGroupList,
        InventoryAvailability, NewContact,NewShipToAddress,
    },
    computed:{
        getStatusLabel(){
            return this.labelHeader['Status'].value
        },
        getApprovalStatusLabel(){
            return this.labelHeader['Approval Status'].value
        }
    },
    setup(){
        const router = useRouter()
        const saleQuoteCardHeader = ref({})
        const saleQuoteLocationBinCode = ref('')
        const saleQuoteCardLines = ref([])
        const saleQuoteCustomerType = ref(2)
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const saleQuoteCardId = useRoute().params.id
        const currentDate = new Date(new Date()).toISOString().split('T')[0]
        const isItemInfoToFill = ref(false)
        const userCanChangePriceGroup = ref(false)

        const newContactModalShowned = ref(false)
        const newAddressModalShowned = ref(false)

        //element pour déclencher le recalcul des lignes
        const lineHasBeenDeleted = ref(false)

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')
        const is_convertSQ_success = ref(false)

//Fonctions d'activation des boutons
        const SQCanBeConverted = computed(()=>{
            if(saleQuoteCardHeader.value['Sell-to Customer No_']!==''){
                return true
            }else{
                if(saleQuoteCardHeader.value['Sell-to Contact No_']!==''){
                    if(saleQuoteCardHeader.value['Approval Status'] == 7 || saleQuoteCardHeader.value['Approval Status'] == 8 )
                        return true
                    else 
                        return false
                }else{
                    return false
                }
            }
        })

//fonctions pour définir la fiche sur lecture et/modification
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }
        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        //objet contenant nos champs de date
        const dateInfo = {
            documentDate: ref(''),
            validityDate:ref(''),
            shipRequestedDate:ref(''),
            promisedDeliveryDate:ref('')
        }

        //objet contenant les infos sur l'utilisateur connecté
        // let webUserInfo = {
        //     name:ref(useWebUserInfoStore().name),
        //     company:ref(useWebUserInfoStore().activeCompanyId),
        //     respCenter:ref(useWebUserInfoStore().responsibilityCenter)
        // }

        //sac de label de la fiche
        const labelHeader = {
            'Status' : ref(''),
            'Approval Status' : ref('')
        }

        //fonction pour récupérer le label pour un champ donné
        function getSingleOptionLabel(language,field,value){
            axios.get(`http://${hostname}:5000/app/getSingleOptionLabel?lg=${language}&fd=${field}&vl=${value}`)
            .then(result => {
                labelHeader[field].value = result.data.recordset[0][""]
            }).catch(err=>console.log(err))
        }

//Gestion des dropdown pour code article
        const itemListDropdownIsActive = ref(false)
        const activeItemLineDropdown = ref(-1)
        const userItemList = ref([])

        function getUserItemList(){
            axios.get(`http://${hostname}:5000/app/getItemList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result => {
                userItemList.value = result.data.recordset
            }).catch(err=>console.log(err))
        }
        function fillLineByItemCode(index,item){
            saleQuoteCardLines.value[index]['No_'] = item['No_']
            saleQuoteCardLines.value[index]['Description'] = item['Description']
            saleQuoteCardLines.value[index]['Description 2'] = item['Description 2']
            saleQuoteCardLines.value[index]['Location Code'] = saleQuoteCardHeader.value['Location Code']
            saleQuoteCardLines.value[index]['Bin Code'] = saleQuoteLocationBinCode.value
            saleQuoteCardLines.value[index]['Unit of Measure'] = item['Sales Unit of Measure']
            saleQuoteCardLines.value[index]['Shipment Method Code'] = item["Shipment Method"]?item["Shipment Method"]:saleQuoteCardHeader.value['Shipment Method Code']
            saleQuoteCardLines.value[index]['Prepayment _'] = saleQuotePrepayment.value
            getVATonItem(saleQuoteCardHeader.value['VAT Bus_ Posting Group'],item['VAT Prod_ Posting Group'],index,'VAT _')
            itemListDropdownIsActive.value=false
            activeItemLineDropdown.value =-1
            submitSQLineItemPriceRequestOnLine(index)
        }

//Gestion des dropdown pour code magasin
        const locationListDropdownIsActive = ref(false)
        const activeLocationLineDropdown = ref(-1)
        const userLocationList = ref([])

        function getUserLocationList(){
            axios.get(`http://${hostname}:5000/app/getLocationList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result => {
                userLocationList.value=result.data.recordset
            }).catch(err=>console.log(err))
        }
        function fillLineByLocationCode(index,location){
            saleQuoteCardLines.value[index]['Location Code'] = location['Code']
            saleQuoteCardLines.value[index]['Bin Code'] = location['Default Bin Code']
            locationListDropdownIsActive.value=false
            activeLocationLineDropdown.value =-1
        }


//Gestion des dropdown pour code emplacement
        const locationBinListDropdownIsActive = ref(false)
        const activeLocationBinLineDropdown = ref(-1)
        const userLocationBinList = ref([])

        function getUserLocationBinList(locationCode,itemCode){
            axios.get(`http://${hostname}:5000/app/getLocationBinList?locationCode=${locationCode}&itemCode=${itemCode}`)
            .then(result => {
                userLocationBinList.value=result.data
            }).catch(err=>console.log(err))
        }
        function fillLineByLocationBinCode(index,locationBin){
            saleQuoteCardLines.value[index]['Bin Code'] = locationBin['Bin Code']
            locationBinListDropdownIsActive.value=false
            activeLocationBinLineDropdown.value =-1
        }
        
//Gestion des dropdown pour mode de livraison
        const shipmentMethodListDropdownIsActive = ref(false)
        const activeshipmentMethodLineDropdown = ref(-1)
        const shipmentMethodList = ref([])

        function getShipmentMethodList(){
            axios.get(`http://${hostname}:5000/app/getShipmentMethodList`)
            .then(result => {
                shipmentMethodList.value=result.data.recordset
            }).catch(err=>console.log(err))
        }
        function fillLineByShipmentMethodCode(index,shipmentMethod){
            saleQuoteCardLines.value[index]['Shipment Method Code'] = shipmentMethod['Code']
            shipmentMethodListDropdownIsActive.value=false
            activeshipmentMethodLineDropdown.value =-1
        }


        //objet contenant les infos de la ligne d'article à insérer
        const itemInfo = {
            itemLineNo:ref(saleQuoteCardLines.value.length +1),
            itemType: ref(2),
            itemCode: ref(''),
            itemDescription: ref(''),
            itemDescription2: ref(''),
            itemVariant: ref(''),
            itemLocation: ref(''),
            itemBinCode: ref(''),
            itemUnitOfMeasure: ref(''),
            itemQuantity: ref(0),
            itemShipmentMethod: ref(''),
            itemUnitPrice: ref(0),
            itemVAT:ref(0),
            itemLineAmount:ref(0),
            itemVATBusPosGroup:ref(''),
            itemVATProdPosGroup:ref(''),
            itemPriceIsGetting:ref(false)
        }

        //objet contenant la disponibilité sur la ligne d'article à insérer
        const itemAvailabilityInfo = {
            itemInStockLocation:ref(0),
            itemOnSalesLocation:ref(0),
            itemInStockGlobal:ref(0),
            itemOnSalesGlobal:ref(0),
            itemOnPurchaseGlobal:ref(0),
            itemOnTransferLocation:ref(0),
        }

//fonctions pour manipuler les lignes de notre document
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
                    'Prepayment _':0,
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':''
            })
            itemInfo.itemLineNo.value=saleQuoteCardLines.value.length +1
        }
        function  addCommentRow(){
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
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':'',
                    'Prepayment _':'',

            })
            itemInfo.itemLineNo.value=saleQuoteCardLines.value.length +1
        }
        function addRowByForm_andContinue(){
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
                    Quantity:itemInfo.itemQuantity.value,
                    'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                    'Unit Price':itemInfo.itemUnitPrice.value,
                    'VAT _':itemInfo.itemVAT.value,
                    'Line Amount':itemInfo.itemUnitPrice.value * itemInfo.itemQuantity.value,
                    'Prepayment _':saleQuotePrepayment.value,
                    'VAT Bus. Posting Group':itemInfo.itemVATBusPosGroup.value,
                    'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
                })
                getVATonItem(saleQuoteCardHeader.value['VAT Bus_ Posting Group'],itemInfo.itemVATProdPosGroup.value,itemInfo.itemLineNo.value-1,'VAT _')

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
                    'Prepayment _':'',
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':''
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
                    Quantity:itemInfo.itemQuantity.value,
                    'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                    'Unit Price':itemInfo.itemUnitPrice.value,
                    'VAT _':itemInfo.itemVAT.value,
                    'Line Amount':itemInfo.itemUnitPrice.value * itemInfo.itemQuantity.value,
                    'Prepayment _':saleQuotePrepayment.value,
                    'VAT Bus. Posting Group':itemInfo.itemVATBusPosGroup.value,
                    'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
                })
                getVATonItem(saleQuoteCardHeader.value['VAT Bus_ Posting Group'],itemInfo.itemVATProdPosGroup.value,itemInfo.itemLineNo.value-1,'VAT _')

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
                    'Prepayment _':'',
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':''
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
            itemInfo.itemVATBusPosGroup.value=''
            itemInfo.itemVATProdPosGroup.value=''

            itemAvailabilityInfo.itemInStockGlobal.value=0
            itemAvailabilityInfo.itemInStockLocation.value=0
            itemAvailabilityInfo.itemOnPurchaseGlobal.value=0
            itemAvailabilityInfo.itemOnSalesGlobal.value=0
            itemAvailabilityInfo.itemOnSalesLocation.value=0
            itemAvailabilityInfo.itemOnTransferLocation.value=0
        }

//fonctions pour manipuler la modification des lignes de notre document
        function getLineDataToEdit(index){
            if(saleQuoteCardLines.value.length > 0){
                const lineData = ref({}) 
                lineData.value = saleQuoteCardLines.value[index]
                itemInfo.itemType.value= lineData.value['Type']
                itemInfo.itemCode.value= lineData.value['No_']
                itemInfo.itemDescription.value= lineData.value['Description']
                itemInfo.itemDescription2.value= lineData.value['Description 2']
                itemInfo.itemLocation.value= lineData.value['Location Code']
                itemInfo.itemBinCode.value= lineData.value['Bin Code']
                itemInfo.itemUnitOfMeasure.value= lineData.value['Unit of Measure']
                itemInfo.itemQuantity.value= lineData.value['Quantity']
                itemInfo.itemShipmentMethod.value= lineData.value['Shipment Method Code']
                itemInfo.itemUnitPrice.value= lineData.value['Unit Price']
                itemInfo.itemVAT.value= lineData.value['VAT _']
                itemInfo.itemLineAmount.value= lineData.value['Line Amount'] 
                itemInfo.itemVATProdPosGroup.value= lineData.value['VAT Prod_ Posting Group']?lineData.value['VAT Prod_ Posting Group']:'' 
            }
        }
        function editRowByForm(index){
            saleQuoteCardLines.value.splice(index,1,{
                'Line No_':index+1,
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
                'Unit Price':itemInfo.itemUnitPrice.value,
                'VAT _':itemInfo.itemVAT.value,
                'Line Amount':itemInfo.itemQuantity.value*itemInfo.itemUnitPrice.value,
                'Prepayment _':saleQuotePrepayment.value,
                'VAT Bus. Posting Group':saleQuoteCardHeader.value['VAT Bus_ Posting Group'],
                'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
            })
            if(itemInfo.itemVATProdPosGroup.value){
                getVATonItem(saleQuoteCardHeader.value['VAT Bus_ Posting Group'],itemInfo.itemVATProdPosGroup.value,index,'VAT _')
            }
            resetForm()
        }

        
//Fonctions spécifiques aux articles
        function getSQLineItemPrice(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res =>{
                itemInfo.itemUnitPrice.value=res.data.documentNo
                itemInfo.itemUnitPrice.value=Number(itemInfo.itemUnitPrice.value.split(',').join(''))
                itemInfo.itemPriceIsGetting.value = false
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitSQLineItemPriceRequest(){
            itemInfo.itemPriceIsGetting.value = true
            const JSData ={
                Parameter:'quotes_item_getPrice',
                itemCode:itemInfo.itemCode.value,
                QuoteNo:saleQuoteCardHeader.value["No_"],
                Quantity:itemInfo.itemQuantity.value?itemInfo.itemQuantity.value:0,
                'Variant Code':''
            }
            getSQLineItemPrice(formatToBCJsonData(JSData))
        }
        function getSOLineItemPriceOnLine(index,data){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,data)
            .then(res =>{
                const unitPrice = ref('')
                unitPrice.value = res.data.documentNo
                unitPrice.value = Number(unitPrice.value.split(',').join(''))
                saleQuoteCardLines.value[index]['Unit Price'] = unitPrice.value
                saleQuoteCardLines.value[index]['Line Amount'] = unitPrice.value * saleQuoteCardLines.value[index]['Quantity'] 
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitSQLineItemPriceRequestOnLine(index){
            const JSData ={
                Parameter:'quotes_item_getPrice',
                itemCode:saleQuoteCardLines.value[index]["No_"],
                QuoteNo:saleQuoteCardHeader.value["No_"],
                Quantity:saleQuoteCardLines.value[index]["Quantity"],
                'Variant Code':''
            }
            getSOLineItemPriceOnLine(index,formatToBCJsonData(JSData))
        }
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
            .catch((err) => {
                console.log(err)
            })
        }
        function getItemLocationBinCode(itemLocation){
            axios.get(`http://${hostname}:5000/app/getLocationBinCode/${itemLocation}?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(res => {
                const binCode = res.data.recordset[0]['Shipment Bin Code']?res.data.recordset[0]['Shipment Bin Code']:''
                itemInfo.itemBinCode.value = binCode
                itemInfo.itemLocation.value = itemLocation
                saleQuoteLocationBinCode.value = binCode
            })
            .catch(err => console.log(err))
        }
        function getVATonItem(VATOnCust,VATOnItem,lineNo,lineAttrib){
            axios.get(`http://${hostname}:5000/app/getItemVAT?VATOnItem=${VATOnItem}&VATOnCust=${VATOnCust}`)
            .then(result =>{
                saleQuoteCardLines.value[lineNo][lineAttrib]=Number(result.data)
            })
            .catch(err => console.log(err))
        }

//Propriétés calculés pour les totaux des lignes
        const totalVAT = computed(() => {
            let sum = 0
            saleQuoteCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + elt['Line Amount'] * elt['VAT _'] /100
            })
            return sum
        })
        const totalAmountExclVAT = computed(()=> {
            let sum = 0
            saleQuoteCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + elt['Line Amount']
            })
            return sum
        })
        const totalAmountIncVAT = computed(() => {
            return totalAmountExclVAT.value + totalVAT.value
        })


//Fonctions spécifique à l'acompte
        const SQConfirmationPymtUpdateModalShowned = ref(false)
        const saleQuotePrepayment = ref(0)
        const saleQuotePrepaymentAmount = ref(0)
        const saleQuotePrepaymentTemp = ref(0)
        function getPrepaymentInfo(){
            if(saleQuotePrepaymentTemp.value !== saleQuotePrepayment.value){
                if(saleQuotePrepayment.value !== ''){
                    if(saleQuotePrepayment.value > 100){
                        error_message.value = 'La valeur que vous avez saisie est incorrecte'
                        error_message_code.value = 'ERROR_BAD_VALUE'
                    }else{
                        if(saleQuoteCardLines.value.length > 0){
                            saleQuotePrepayment.value = Number(saleQuotePrepayment.value).toFixed(2)
                            SQConfirmationPymtUpdateModalShowned.value = true
                        }
                    }
                }else{
                    saleQuotePrepayment.value = saleQuotePrepaymentTemp.value
                }
            }
        }
        function getPrepaymentAmountInfo(){
            if(saleQuotePrepaymentAmount.value){
                if(saleQuotePrepaymentAmount.value > totalAmountIncVAT.value){
                    error_message.value = "Le montant d'acompte ne peut être supérieur au montant de la demande"
                    error_message_code.value = 'ERROR_BAD_VALUE'
                }else{
                    if(totalAmountIncVAT.value > 0){
                        saleQuotePrepayment.value = Number((saleQuotePrepaymentAmount.value / totalAmountIncVAT.value) * 100).toFixed(5)
                        SQConfirmationPymtUpdateModalShowned.value = true
                    }else{
                        error_message.value = 'Le montant de la demande ne doit pas être égale à Zero (0)'
                    }
                }
            }else{
                saleQuotePrepaymentAmount.value = 0
            }
        }
        function submitPrepaymentLinesUpdate(){
            saleQuoteCardLines.value.map( line => {
                    line['Prepayment _'] = saleQuotePrepayment.value
            })
            SQConfirmationPymtUpdateModalShowned.value = false
            saleQuotePrepaymentTemp.value = saleQuotePrepayment.value
        }
        function cancelPrepaymentLinesUpdate(){
            SQConfirmationPymtUpdateModalShowned.value = false
            saleQuotePrepayment.value = saleQuotePrepaymentTemp.value
            saleQuotePrepaymentAmount.value = 0
        }




//fonctions pour remplir les champs avec via des listes sélectionnables
        function fillItemInfoField(item){
            itemInfo.itemType.value = 2
            itemInfo.itemCode.value = item['No_']
            itemInfo.itemDescription.value = item['Description']
            itemInfo.itemDescription2.value = item['Description 2']
            itemInfo.itemQuantity.value = 1
            //itemInfo.itemPriceIsGetting.value = true
            //itemInfo.itemLocation.value = saleQuoteCardHeader.value["Location Code"]
            itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
            itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:saleQuoteCardHeader.value["Shipment Method Code"]
            itemInfo.itemVATProdPosGroup.value = item['VAT Prod_ Posting Group']
            itemInfo.itemVATBusPosGroup.value= saleQuoteCardHeader.value['VAT Bus_ Posting Group']

            if (!itemInfo.itemLocation.value){
                itemInfo.itemLocation.value = saleQuoteCardHeader.value["Location Code"]
                itemInfo.itemBinCode.value = saleQuoteLocationBinCode.value
            }
            submitSQLineItemPriceRequest()
            getItemAvailabilityInfo()

        }
        function fillCustomerInfoField(customer){
            saleQuoteCardHeader.value["Sell-to Customer No_"]=customer["No_"]
            saleQuoteCardHeader.value["Sell-to Customer Name"]=customer["Name"]
            saleQuoteCardHeader.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
            saleQuoteCardHeader.value["Payment Method Code"]=customer['Payment Method Code']
            saleQuoteCardHeader.value["Payment Terms Code"]=customer['Payment Terms Code']
            saleQuoteCardHeader.value["Prepayment _"]=customer['Prepayment _']
            saleQuoteCardHeader.value["Shipment Method Code"]=customer['Shipment Method Code']
            
            //nouveau
            saleQuoteCardHeader.value["Customer Posting Group"]=customer['Customer Posting Group']
            saleQuoteCardHeader.value["Gen_ Bus_ Posting Group"]=customer['Gen_ Bus_ Posting Group']
            //nouveau

            saleQuoteCardHeader.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
            saleQuoteCardHeader.value["Customer Price Group"]=customer['Customer Price Group']?customer['Customer Price Group']:useWebUserInfoStore().defaultUserPriceGroup
            saleQuoteCardHeader.value["Ship-to Code"]=customer['Ship-to Code']
            saleQuoteCardHeader.value["Sales Mode"]=customer['Sales Mode']
        }

        function fillLeadInfoField(lead){
            saleQuoteCardHeader.value["Sell-to Contact No_"]=lead["No_"]
            saleQuoteCardHeader.value["Sell-to Customer Name"]=lead['Name']
            saleQuoteCardHeader.value['Customer Template Code']=lead['Customer Template Code']
            saleQuoteCardHeader.value['Customer Type']=lead['Lead Type']
            saleQuoteCardHeader.value["Prepayment _"]=lead['Prepayment _']
            saleQuoteCardHeader.value["Payment Method Code"]=lead['Payment Method Code']
            saleQuoteCardHeader.value["Payment Terms Code"]=lead['Payment Terms Code']
            saleQuoteCardHeader.value["VAT Bus_ Posting Group"]=lead['VAT Bus_ Posting Group']
            saleQuoteCardHeader.value["Customer Price Group"]=lead['Customer Price Group']?lead['Customer Price Group']:useWebUserInfoStore().defaultUserPriceGroup
            saleQuoteCardHeader.value["Sales Mode"]=lead['Sales Mode']
            
            saleQuoteCardHeader.value["Sell-to Customer No_"]=''
            saleQuoteCardHeader.value["Shipment Method Code"]=''
            saleQuoteCardHeader.value["Ship-to Code"]=''
        }
        function fillContactInfoField(contact){
            saleQuoteCardHeader.value["Sell-to Contact No_"]= contact['No_']
        }
        function fillLocationInfoField(location){
            if(isItemInfoToFill.value){
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
                isItemInfoToFill.value=false
            }else{
                saleQuoteCardHeader.value["Location Code"]=location["Code"]
                saleQuoteLocationBinCode.value = location['Default Bin Code']
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
            }
        }
        function fillAddressInfoField(address){
            saleQuoteCardHeader.value["Ship-to Code"]=address["Code"]
        }
        function fillLocationBinInfoField(locationBin){
            itemInfo.itemBinCode.value=locationBin
        }
        function fillCampaignInfoField(campaign){
            saleQuoteCardHeader.value["Campaign No_"]=campaign["No_"]
        }
        function fillPaymentMethodInfoField(paymentMethod){
            saleQuoteCardHeader.value["Payment Method Code"]=paymentMethod["Code"]
        }
        function fillShipmentMethodInfoField(shipmentMethod){
            if(isItemInfoToFill.value){
                itemInfo.itemShipmentMethod.value=shipmentMethod['Code']
                isItemInfoToFill.value=false
            }else{
                saleQuoteCardHeader.value["Shipment Method Code"]=shipmentMethod["Code"]
            }
        }
        function fillVATGroupInfoField(VATGroup){
            saleQuoteCardHeader.value['VAT Bus_ Posting Group']= VATGroup['Code']
        }
        function fillPriceGroupInfoField(priceGroup){
            saleQuoteCardHeader.value['Customer Price Group']= priceGroup['Code']
        }
        function fillSalesModeInfoField(salesMode){
            saleQuoteCardHeader.value['Sales Mode']= salesMode['Code']
        }
        function fillPaymentTermInfoField(paymentTerm){
            saleQuoteCardHeader.value['Payment Terms Code']= paymentTerm['Code']
            saleQuoteCardHeader.value['Prepayment _']= paymentTerm['Prepayment']
            saleQuotePrepayment.value= paymentTerm['Prepayment']
            saleQuotePrepaymentTemp.value= paymentTerm['Prepayment']
        }


        //fonction de récupération des données de la fiche 
        function getSQCardInfo(){
            axios.get(`http://${hostname}:5000/app/getSQCard/${saleQuoteCardId}?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result => {
                saleQuoteCardHeader.value = result.data[0],
                saleQuoteCardLines.value = result.data[1]
                saleQuotePrepayment.value = Number(saleQuoteCardHeader.value['Prepayment _']).toFixed(5)
                saleQuotePrepaymentTemp.value = saleQuotePrepayment.value
                if(saleQuotePrepayment.value > 0 &&  totalAmountIncVAT.value > 0)
                    saleQuotePrepaymentAmount.value = Math.round((saleQuotePrepayment.value * totalAmountIncVAT.value)/100).toFixed(2)

                saleQuoteCustomerType.value = saleQuoteCardHeader.value['Customer Type']
                saleQuoteCardLines.value.map(row => row['Line No_'] = Number.isInteger(row['Line No_']/10000)?row['Line No_']/10000:row['Line No_'] )

                dateInfo.documentDate.value = getISODate(saleQuoteCardHeader.value["Document Date"])
                dateInfo.validityDate.value = getISODate(saleQuoteCardHeader.value["Quote Valid Until Date"])
                dateInfo.shipRequestedDate.value = getISODate(saleQuoteCardHeader.value["Requested Delivery Date"])
                dateInfo.promisedDeliveryDate.value = getISODate(saleQuoteCardHeader.value["Promised Delivery Date"])
                
                itemInfo.itemLineNo.value = saleQuoteCardLines.value.length +1
                getSingleOptionLabel(useWebUserInfoStore().defaultLanguage,'Status',saleQuoteCardHeader.value["Status"])
                getSingleOptionLabel(useWebUserInfoStore().defaultLanguage,'Approval Status',saleQuoteCardHeader.value["Approval Status"])
                //getCustomerType(saleQuoteCardHeader.value["Sell-to Customer No_"])
                
                if(saleQuoteCardHeader.value['Location Code']){
                    getItemLocationBinCode(saleQuoteCardHeader.value['Location Code'])
                }


            }).catch(err=>displayErrorMessage(err))
        }

        //fonction de récupération du type de client associé au document
        // function getCustomerType(customerNo){
        //     axios.get(`http://${hostname}:5000/app/getCustomerType?customerId=${customerNo}`)
        //     .then(result => {
        //         saleQuoteCustomerType.value= result.data[0]['Customer Type']
        //     }).catch(err => console.log(err))
        // }


//fonctions pour envoyer le document en approbation
        function sendSQrequestForApproval(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res =>{
                console.log(res)
                submitting_message.value=''
                success_message.value="demnde d'approbation envoyée"
                error_message.value=''
                setTimeout(()=>success_message.value='',3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitSQrequestForApproval(){
            submitting_message.value="Envoie de la demande d'approbation en cours"
            const JSData ={
                Parameter:'quotes_requestApproval',
                //webUserName:webUserInfo.name.value,
                QuoteNo:saleQuoteCardHeader.value["No_"],
            }
            sendSQrequestForApproval(formatToBCJsonData(JSData))
        }

//fonctions pour soumettre une demande de remise
        const saleQuoteDiscount = ref(0)
        function sendDiscountRequest(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(() =>{
                submitting_message.value=''
                success_message.value="demnde de remise envoyée"
                error_message.value=''
                setTimeout(()=>success_message.value='',3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitDiscountRequest(){
            if(saleQuoteCardHeader.value['Status']==0){
                if(saleQuoteDiscount.value>0 && saleQuoteDiscount.value<=100){
                    submitting_message.value="Envoie de la demande en cours"
                    const JSData ={
                        Parameter:'discountRequest_insert',
                        webUserName:useWebUserInfoStore().name,
                        QuoteNo:saleQuoteCardHeader.value["No_"],
                        'No_':saleQuoteCardHeader.value['No_'],
                        'Approval Status':6,
                        'Request Type':0,
                        'Discount %':saleQuoteDiscount.value
                    }
                    sendDiscountRequest(formatToBCJsonData(JSData))
                }else{
                    error_message.value='Veillez compléter le champ % Remise demandé'
                    error_message_code.value='FIELD_REQUIRED'
                }
            }else{
                error_message.value='Vous ne pouvez faire cette action!'
                error_message_code.value='UNAUTHORIZED'
            }
        }




//fonctions pour mettre à jour le document
        function updateSaleQuote(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(() => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi'
                error_message.value=''
                setTimeout(()=>success_message.value='',3000)
                readOnlyModeIsDisabled.value=false
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'quotes_modify',
                webUserName:useWebUserInfoStore().name,
                QuoteNo:saleQuoteCardHeader.value["No_"],
                saleQuoteCustomerNo:saleQuoteCardHeader.value["Sell-to Customer No_"],
                saleQuoteCustomerContactCode:saleQuoteCardHeader.value["Sell-to Contact No_"],
                saleQuoteResponsibilityCenter:saleQuoteCardHeader.value['Responsibility Center'],
                saleQuoteSalesperson:saleQuoteCardHeader.value['Salesperson Code'],
                saleQuoteCampaignNo:saleQuoteCardHeader.value['Campaign No_'],
                saleQuoteLocationCode:saleQuoteCardHeader.value["Location Code"],
                saleQuoteSalesChannel:saleQuoteCardHeader.value["Sales Channel"],
                saleQuoteSalesMode:saleQuoteCardHeader.value["Sales Mode"]?saleQuoteCardHeader.value["Sales Mode"]:'',
                saleQuoteCustomerPriceGroup:saleQuoteCardHeader.value["Customer Price Group"],
                saleQuoteVATBusPostingGroup:saleQuoteCardHeader.value["VAT Bus_ Posting Group"], 
                saleQuoteDocumentDate:dateInfo.documentDate.value?dateInfo.documentDate.value:currentDate,
                saleQuoteValidUntilDate:dateInfo.validityDate.value?dateInfo.validityDate.value:currentDate,
                saleQuoteShipRequestedDate:dateInfo.shipRequestedDate.value?dateInfo.shipRequestedDate.value:currentDate, 
                saleQuotePromisedDeliveryDate:dateInfo.promisedDeliveryDate.value?dateInfo.promisedDeliveryDate.value:currentDate, 
                saleQuotePaymentMethodCode:saleQuoteCardHeader.value["Payment Method Code"], 
                saleQuotePaymentTermsCode:saleQuoteCardHeader.value["Payment Terms Code"],
                saleQuotePrepayment:saleQuotePrepayment.value, 
                saleQuoteCustomerShipToCode:saleQuoteCardHeader.value["Ship-to Code"]?saleQuoteCardHeader.value["Ship-to Code"]:'', 
                saleQuoteShipmentMethodCode:saleQuoteCardHeader.value["Shipment Method Code"],
                'Customer Template Code':saleQuoteCardHeader.value["Customer Template Code"],
                'System Decision':0,
                'Investigator Opinion':0,
                'Analyst Opinion':0,
                'Analyst comments':'', 
                saleQuoteLines:[
                    ...saleQuoteCardLines.value
                ]
            }
            updateSaleQuote(formatToBCJsonData(JSData))
        }


//fonctions pour convertir le devis en commande
        function convertSaleQuote(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res =>{
                //console.log(res)
                is_convertSQ_success.value=true
                submitting_message.value=''
                success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                error_message.value=''
                setTimeout(()=> router.push(`/saleOrderCard/${res.data.documentNo}`),3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }

        const leadCardApprovalStatus = ref('')
        const leadCardInfo = ref({})

        function getLeadCardInfo(){
            if(saleQuoteCardHeader.value['Sell-to Customer No_']==''){
                axios.get(`http://${hostname}:5000/app/getleadCard/${saleQuoteCardHeader.value['Sell-to Contact No_']}`)
                .then(result => {
                    leadCardInfo.value = result.data.recordset[0]
                    leadCardApprovalStatus.value = leadCardInfo.value['Approval Status']
                    if(leadCardApprovalStatus.value == 8){
                        submitConvertSaleQuote()
                    }else{
                        error_message.value = 'Conversion refusée! Vous devez valider le prospect'
                    }
                })
                .catch(()=> {
                    error_message.value = "Une erreur empêchant l'obtention des informations liées au prospect s'est produite! Réessayez ultérieurement." 
                })
            }else{
                submitConvertSaleQuote()
            }

        }


        function submitConvertSaleQuote(){
            submitting_message.value='Conversion du devis en cours'
            const JSData ={
                Parameter:'quotes_makeorder',
                webUserName:useWebUserInfoStore().name,
                QuoteNo:saleQuoteCardHeader.value["No_"],
            }
            convertSaleQuote(formatToBCJsonData(JSData))
        }


//fonctions de formattage
        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }
        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
            }else{
                return 0
            }
        }
        
//Gestions des évènements et déclencheurs et erreurs
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
        onMounted(()=>
        {
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }             
            userCanChangePriceGroup.value = useWebUserInfoStore().canChangePriceGroup
            getSQCardInfo()
            getUserItemList()
            getUserLocationList()
            getShipmentMethodList()
        })
        watch(success_message, () => {
            if (is_convertSQ_success.value==false){
                readOnlyModeIsDisabled.value=false
                getSQCardInfo()
            }
        })
        watch(lineHasBeenDeleted, () => {
            if(lineHasBeenDeleted.value){
                let i = 1
                saleQuoteCardLines.value.map(row => row['Line No_'] = i++)
                lineHasBeenDeleted.value =false
            }
        })
        // watch(saleQuotePrepaymentAmount, () => {
        //     if(saleQuotePrepaymentAmount.value>0){
        //         if(totalAmountIncVAT.value>0)
        //             saleQuoteCardHeader.value['Prepayment _'] = Number(saleQuotePrepaymentAmount.value / totalAmountIncVAT.value *100).toFixed(3)
        //     }else
        //         saleQuoteCardHeader.value['Prepayment _'] = 0
        // })
        // watch(saleQuotePrepaymentAmount,() => {
        //     if(saleQuotePrepaymentAmount.value)
        //         console.log(saleQuoteCardHeader.value['Total Amount Including VAT'])
        //         saleQuoteCardHeader.value['Prepayment _'] = Number((saleQuotePrepaymentAmount.value/180000)*100).toFixed(3)
        // })



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

        // expose to template and other options API hooks
        return {
            isItemInfoToFill,
            saleQuoteCardHeader,saleQuoteCardLines,saleQuoteCustomerType,
            readOnlyModeIsDisabled,setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,
            ...dateInfo,
            ...itemInfo,...itemAvailabilityInfo,
            labelHeader,
            fillCustomerInfoField,fillLeadInfoField,fillContactInfoField,fillLocationInfoField,fillLocationBinInfoField,fillAddressInfoField,
            fillCampaignInfoField,fillPaymentMethodInfoField,fillShipmentMethodInfoField,fillVATGroupInfoField,fillPriceGroupInfoField,
            fillSalesModeInfoField,fillPaymentTermInfoField,fillItemInfoField,
            addEmptyRow,addCommentRow,addRowByForm_andContinue,addRowByForm_andClose,resetForm,
            editRowByForm,
            error_message,error_message_code,success_message,submitting_message,
            lineHasBeenDeleted,getLineDataToEdit,getItemAvailabilityInfo,
            totalVAT,totalAmountExclVAT,totalAmountIncVAT,
            itemListDropdownIsActive,activeItemLineDropdown,userItemList,fillLineByItemCode,
            locationListDropdownIsActive,activeLocationLineDropdown,userLocationList,fillLineByLocationCode,
            locationBinListDropdownIsActive,activeLocationBinLineDropdown,userLocationBinList,fillLineByLocationBinCode,getUserLocationBinList,
            shipmentMethodListDropdownIsActive,activeshipmentMethodLineDropdown,shipmentMethodList,fillLineByShipmentMethodCode,

            submitForm,submitConvertSaleQuote,getLeadCardInfo,submitSQrequestForApproval,
            submitSQLineItemPriceRequest,submitSQLineItemPriceRequestOnLine,

            submitDiscountRequest,saleQuoteDiscount,
            newContactModalShowned,newAddressModalShowned,
            formatAmount,
            SQCanBeConverted,
            saleQuotePrepaymentAmount,saleQuotePrepayment,SQConfirmationPymtUpdateModalShowned,
            getPrepaymentInfo,getPrepaymentAmountInfo,submitPrepaymentLinesUpdate,cancelPrepaymentLinesUpdate,
            userCanChangePriceGroup,

        }
    },
    data(){
        return{

            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.quoteCardRightInfoMaxWidth,

            //indique la route active
            saleQuoteCardId:this.$route.params.id,

            //indique si les onglets sont réduits ou non
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

            selectedLine:-1,

            //élement pour le modal ajout d'article
            addItemModalShowned:false,
            editItemModalShowned:false,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            //modal de confirmation convertion devis
            SQConfirmationModalShowned:false,

            //fenêtre d'impression de devis
            printSaleQuoteLayoutShowned:false,

            //fenêtre de disponibilité article
            inventoryAvailabilityModalShowned:false,
        }
    },
    methods:{
        showContactCreationModal(){
            this.activeModalForSelectableElementList = ''
            this.newContactModalShowned = true
        },
        showAddressCreationModal(){
            this.activeModalForSelectableElementList = ''
            this.newAddressModalShowned = true
        },
        goBackToList(){
            useNavigationTabStore().setActiveGroup('sales')
            useNavigationTabStore().setActiveTab('saleQuotes')
            this.$router.push('/')
        },
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('quoteCardRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('quoteCardRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        showAddRowByFormModal(){
            if (this.saleQuoteCardHeader["Location Code"]){
                this.addItemModalShowned = true
                this.error_message=''
                this.error_message_code=''
            }else{
                this.error_message = "Vous devez d'abord indiquer le code magasin"
                this.error_message_code ="ERROR_FIELD_REQUIRED"
            }
        },
        showEditRowByFormModal(){
            if(this.selectedLine>=0){
                this.getLineDataToEdit(this.selectedLine)
                this.editItemModalShowned = true

                if(this.saleQuoteCardLines[this.selectedLine]['Type']==2){
                    this.getItemAvailabilityInfo()
                }
            }  
        },
        closeEditItemModal(){
            this.editItemModalShowned=false
            this.resetForm()
        },
        showConvertSQConfirmationModal(){
            this.SQConfirmationModalShowned = true
        },
        showPrintSaleQuoteLayout(){
            this.printSaleQuoteLayoutShowned = true
        },
        showItemAvaibilityInfoModal(){
            this.inventoryAvailabilityModalShowned = true
        },
        formatDate(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString()
            }else{
                return ''
            }
        },
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='line_content') myElt.style.maxHeight='250px'
            else myElt.style.maxHeight='700px'
        },
        collapse(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight="0px"
        },
        selectOption(currentOpt){
            if (this.selected_option ==currentOpt) { this.show_option_btn_bar=!this.show_option_btn_bar;}
            else {this.selected_option= currentOpt;this.show_option_btn_bar=this.show_option_btn_bar?true:true}
        },
        setLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.add('is-hovered-td')
            myElt.classList.add('shadow')
        },
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.remove('is-hovered-td')
            myElt.classList.remove('shadow')
        },
        onEdit(evt){
            const id =evt.target.id
            let value = evt.target.innerText
            const parentId= new String(id).split('-')[0]
            const parentAttri = new String(id).split('-')[2]
            if (parentAttri=="Quantity") {
                value =  Number(value)
                this.saleQuoteCardLines[parentId][parentAttri] = value
                this.saleQuoteCardLines[parentId]["Line Amount"] = value * Math.trunc(Number(this.saleQuoteCardLines[parentId]["Unit Price"]))
                this.submitSQLineItemPriceRequestOnLine(parentId)
            }
            else{
                this.saleQuoteCardLines[parentId][parentAttri] = value
            }
        },
        endEdit(){
            this.$el.querySelector('.editme').blur()
        },
        selectLine(id){
            if(this.selectedLine>=0){
                const myElt=document.getElementById(this.selectedLine)
                if(myElt){
                    const children =  myElt.childNodes
                    children.forEach(element => {
                        element.classList.add('has-background-white')
                        element.classList.remove('has-background-orange-light')
                    })
                }
            }
            this.selectedLine=id
            const myElt=document.getElementById(id)
            if(myElt){
                const children =  myElt.childNodes
                children.forEach(element => {
                    element.classList.remove('has-background-white')
                    element.classList.add('has-background-orange-light')
                })
            }
        },
        deleteLine(){
            if(this.selectedLine>=0){
                this.saleQuoteCardLines.splice(this.selectedLine,1)
                const myElt=document.getElementById(this.selectedLine)
                if(myElt){
                    const children =  myElt.childNodes
                    children.forEach(element => {
                        element.classList.add('has-background-white')
                        element.classList.remove('has-background-orange-light')
                    })
                }
                this.lineHasBeenDeleted = true
                this.selectedLine = -1
            }
        },
        displayItemListDropdown(index){
            this.activeItemLineDropdown =index
            this.itemListDropdownIsActive=true
        },
        closeItemListDropdown(){
            this.activeItemLineDropdown =-1
            this.itemListDropdownIsActive=false
        },
        displayLocationListDropdown(index){
            this.activeLocationLineDropdown =index
            this.locationListDropdownIsActive=true
        },
        closeLocationListDropdown(){
            this.activeLocationLineDropdown =-1
            this.locationListDropdownIsActive=false
        },
        displayLocationBinListDropdown(index,locationCode,itemCode){
            this.getUserLocationBinList(locationCode,itemCode)
            this.activeLocationBinLineDropdown =index
            this.locationBinListDropdownIsActive=true
        },
        closeLocationBinListDropdown(){
            this.activeLocationBinLineDropdown =-1
            this.locationBinListDropdownIsActive=false
        },
        displayShipmentMethodListDropdown(index){
            this.activeshipmentMethodLineDropdown =index
            this.shipmentMethodListDropdownIsActive=true
        },
        closeShipmentMethodListDropdown(){
            this.activeshipmentMethodLineDropdown =-1
            this.shipmentMethodListDropdownIsActive=false
        },
    },
}

</script>
<style scoped>
.customer-info,prospect-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#line_content,#quote_details_content,#international_content,#prepayment_content,#delivery_invoicing_content{
    max-height: 700px;
    overflow: hidden;
    transition: max-height 0.5s
}

.has-border-bottom-grey{
    border-bottom: 1px solid rgba(0, 0, 0, 0.152);
}

.is-hover-orange:hover{
    background-color: rgba(255, 68, 0, 0.068);
}


.has-background-orange1{
    background-color: orange
}

.has-background-orange-light{
    background-color: rgba(255, 155, 118, 0.332);
}

.has-background-orangered{
    background-color: rgba(255, 68, 0, 0.856);
}

.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}

.hover{
    background-color: rgba(255, 68, 0, 0.856);
}

div[contenteditable="true"]:focus {
    outline: none; /* Remove the default focus outline */
    border: 2px solid rgba(255, 89, 0, 0.437); /* Add your desired border style */
    background-color: #f9f9f9; /* Change the background color */
    /* Add any other styles you want */
}

</style>