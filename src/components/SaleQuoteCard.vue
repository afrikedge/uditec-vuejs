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
            componentWithCompInfo="quoteCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :printCardBtnIsDisabled="saleQuoteCardHeader['Status']!==1"
            :convertQuoteBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="true"
            :requestForApprovalBtnIsDisabled="false"
            :reopenBtnIsDisabled="false"
            :documentStatus="saleQuoteCardHeader['Status']"
            :newContactBtnIsDisabled="false"
            :newShipToAddressBtnIsDisabled="false"
            :checkItemAvailabilityBtnIsDisabled="false"
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
                                <a @click="expand('general_content');onglet1_expanded=!onglet1_expanded" v-if="!onglet1_expanded">
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
                                <input-select labelInputText="Code client" v-model="saleQuoteCardHeader['Sell-to Customer No_']" @openModal="activeModalForSelectableElementList='';" v-else></input-select>
                                
                                <input-text labelInputText="Nom du client" v-model="saleQuoteCardHeader['Sell-to Customer Name']" :valueInputText="saleQuoteCardHeader['Sell-to Customer Name']" :is_disabled="!readOnlyModeIsDisabled" :is_readOnly="true"></input-text>

                                <input-text labelInputText="Code prospect"  :valueInputText="saleQuoteCardHeader['Lead No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code prospect" v-model="saleQuoteCardHeader['Lead No_']" @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>


                                
                                <input-text labelInputText="Code Contact"  :valueInputText="saleQuoteCardHeader['Sell-to Contact No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code Contact" v-model="saleQuoteCardHeader['Sell-to Contact No_']" @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>
                                                                
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
                                                                                                
                            
                                <input-text labelInputText="Statut" inputTextColor="has-text-primary" inputTextWeight="has-text-weight-bold" :valueInputText="saleQuoteCardHeader['Status']==0?'Ouvert':saleQuoteCardHeader['Status']==1?'Lancé':'Approbation en attente'" :is_disabled="true"></input-text>
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
                                    <a @click="expand('line_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                        <span>Lignes</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="line_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
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
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ Number.isInteger(elt['Line No_']/10000)?elt['Line No_']/10000:elt['Line No_'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Type']==2?'Article':'Commentaire' }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['No_'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Description 2'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Variant Code]'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Location Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Bin Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Unit of Measure'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Quantity'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Shipment Method Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ Math.trunc(Number(elt['Unit Price'])) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['VAT _'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ Math.trunc(Number(elt['Line Amount'])) }}</td>                                           
            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet2_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="saleQuoteCardHeader['Total Amount']" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="saleQuoteCardHeader['Total VAT']" labelInputText="Montant TVA"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="saleQuoteCardHeader['Total Amount Including VAT']" labelInputText="Montant TTC"></input-text1>
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
                                    <a @click="expand('line_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
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
    
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ Number.isInteger(elt['Line No_']/10000)?elt['Line No_']/10000:elt['Line No_'] }}
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['Type']==2?'Article':'Commentaire' }}
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div :id="index+'-'+elt['No_']+'-No_'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['No_']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['Description']+'-Description'" class="editme p-1" :contenteditable="true" v-text="elt['Description']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['Description 2']+'-Description 2'" class="editme p-1" :contenteditable="true" v-text="elt['Description 2']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div :id="index+'-'+elt['Variant Code']+'-Variant Code'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Variant Code']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div :id="index+'-'+elt['Location Code']+'-Location Code'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Location Code']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['Bin Code'] }}
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['Unit of Measure'] }}
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div :id="index+'-'+elt['Quantity']+'-Quantity'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Quantity']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div :id="index+'-'+elt['Shipment Method Code']+'-Shipment Method Code'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Shipment Method Code']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ Math.trunc(Number(elt['Unit Price'])) }}
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['VAT _'] }}
                                                </td>
                                                <td class="has-text-left py-1 px-2 is-narrow" >
                                                    {{ Math.trunc(Number(elt['Line Amount'])) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="saleQuoteCardLines.length==0">Il n'y'a rien à afficher</div>
                            </div>
                            <div class="columns mt-3" id="line_total" v-if="onglet2_expanded">
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="saleQuoteCardHeader['Total VAT']" labelInputText="Montant TVA"></input-text1>
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="saleQuoteCardHeader['Total Amount']" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="saleQuoteCardHeader['Total Amount Including VAT']" labelInputText="Montant TTC"></input-text1>
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
                                                    <input-text v-show="itemType==0" v-model="itemDescription2" labelInputText="Description 2" :is_disabled="false"></input-text>
                                                    <input-text v-show="itemType==2" v-model="itemVariant" labelInputText="Code variant" :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                    <input-select v-show="itemType==2" v-model="itemLocation" labelInputText="magasin de livraison" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationList',isItemInfoToFill=true}"></input-select>
                                                    <!----input-text  :valueInputText="itemBinCode" labelInputText="Emplacement" :is_disabled="true"></input-text---->
                                                    <!----input-text :valueInputText="itemUnitOfMeasure" labelInputText="Unité de mesure"  :is_disabled="true"></input-text---->
                                                    <input-text  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                    <input-select  v-show="itemType==2" v-model="itemShipmentMethod" labelInputText="Mode de livraison"  :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='shipmentMethodList',isItemInfoToFill=true}"></input-select>
                                                    <input-text  v-show="itemType==2" v-model="itemUnitPrice" :valueInputText="itemUnitPrice" labelInputText="Prix unitaire" :is_disabled="false" :is_readOnly="true" :is_loading="itemPriceIsGetting"></input-text>
                                                </div>
                                                <p class="title has-text-left is-6 mt-3">Disponibilité article Magasin : </p>
                                                <div class="columns">
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1  :valueInputText="itemInStockLocation" labelInputText="En stock" :is_disabled="true"></inputText1>
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
                                                        <inputText1  :valueInputText="itemInStockGlobal" labelInputText="En stock" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1  :valueInputText="itemOnSalesGlobal" labelInputText="En vente" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1  :valueInputText="itemOnPurchaseGlobal" labelInputText="Sur achat" :is_disabled="true"></inputText1>
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


<!---------sous-Section onglet 3 formulaire fiche client----------------------->                         
                    <div id="quote-details">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('quote_details_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>Détails devis</span>
                                </a>
                                <a @click="expand('quote_details_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
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
                                
                                <input-text labelInputText="Mode de vente" :valueInputText="saleQuoteCardHeader['Sales Mode']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="saleQuoteCardHeader['Customer Price Group']" :is_disabled="true"></input-text>
                            </div>
                            <div class="column">                                
                                <input-text labelInputText="Catégorie TVA" :valueInputText="saleQuoteCardHeader['VAT Bus_ Posting Group']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Condition de paiement" :valueInputText="saleQuoteCardHeader['Payment Terms Code']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="% Acompte" :valueInputText="saleQuoteCardHeader['Prepayment _']" :is_disabled="true"></input-text>
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
                    <report-viewer :documentNo="saleQuoteCardHeader['No_']" documentRdl="SalesQuotePrint" rdlParameter="Quote"></report-viewer>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="printSaleQuoteLayoutShowned=false"></button>
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
                        <button class="button shadow has-background-orange has-text-white" @click.prevent="submitConvertSaleQuote">
                            Je confirme
                        </button>
                        <button class="button shadow" @click.prevent="SQConfirmationModalShowned=false">J'annule</button>
                    </div>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" SQConfirmationModalShowned=false"></button>
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

        <modal-for-selectable-contact-list 
            v-if="activeModalForSelectableElementList=='contactList'" 
            :isActive="activeModalForSelectableElementList=='contactList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="saleQuoteCardHeader['Sell-to Customer No_']" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerNo="saleQuoteCardHeader['Sell-to Customer No_']" 
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
import ReportViewer from './ReportViewer.vue'
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'





export default {
    name:'sale-quote-card',
    components:{
        SQCardHeader,
        CustomerInfo,
        ProspectInfo,
        inputText,
        inputText1,
        inputSelect,
        inputSelectBasic,
        inputDate,
        SQCardRibbon,
        ReportViewer,
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
    setup(){
        const router = useRouter()
        const saleQuoteCardHeader = ref({})
        const saleQuoteCardLines = ref([])
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const saleQuoteCardId = useRoute().params.id
        const currentDate = new Date(new Date()).toISOString().split('T')[0]
        const isItemInfoToFill = ref(false)

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')
        const is_convertSQ_success = ref(false)

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
            respCenter:ref(useWebUserInfoStore().responsibilityCenter)
        }

        const dateInfo = {
            documentDate: ref(''),
            validityDate:ref(''),
            shipRequestedDate:ref(''),
            promisedDeliveryDate:ref('')
        }

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
            itemPriceIsGetting:ref(false)
        }

        const itemAvailabilityInfo = {
            itemInStockLocation:ref(0),
            itemOnSalesLocation:ref(0),
            itemInStockGlobal:ref(0),
            itemOnSalesGlobal:ref(0),
            itemOnPurchaseGlobal:ref(0),
        }

        onMounted(()=>
        {
            if (webUserInfo.respCenter.value){
                getSQCardInfo()
            }
            else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    webUserInfo.respCenter.value=useWebUserInfoStore().responsibilityCenter
                    getSQCardInfo()
                })
                .catch(err=>console.log(err))
            }
        })

        function getSQCardInfo(){
            axios.get(`http://${hostname}:3000/app/getSQCard/${saleQuoteCardId}?respCenter=${webUserInfo.respCenter.value}`)
            .then(result => {
                saleQuoteCardHeader.value = result.data[0],
                saleQuoteCardLines.value = result.data[1]
                dateInfo.documentDate.value = getISODate(saleQuoteCardHeader.value["Document Date"])
                dateInfo.validityDate.value = getISODate(saleQuoteCardHeader.value["Quote Valid Until Date"])
                dateInfo.shipRequestedDate.value = getISODate(saleQuoteCardHeader.value["Requested Delivery Date"])
                dateInfo.promisedDeliveryDate.value = getISODate(saleQuoteCardHeader.value["Promised Delivery Date"])
                itemInfo.itemLineNo.value = saleQuoteCardLines.value.length +1
            }).catch(err=>displayErrorMessage(err))
        }

        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        watch(success_message, () => {
            if (is_convertSQ_success.value==false){
                readOnlyModeIsDisabled.value=false
                getSQCardInfo()
            }
        })

        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }

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
                        Quantity:'',
                        'Shipment Method Code':'',
                        'Unit Price':'',
                        'VAT _':'',
                        'Line Amount':'',
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
                })
                itemInfo.itemLineNo.value=saleQuoteCardLines.value.length +1
            }

            function addRowByForm_andContinue(){
                if (itemInfo.itemType.value==2){
                    const unitPrice = Number(itemInfo.itemUnitPrice.value.split(',').join(''))
                    const quantity = Number(itemInfo.itemQuantity.value)
                    const VAT = Number(itemInfo.itemVAT.value)
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
                        Quantity:quantity,
                        'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                        'Unit Price':unitPrice,
                        'VAT _':VAT,
                        'Line Amount':quantity * unitPrice,
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
                itemInfo.itemLineNo.value++
                resetForm()
            }

            function addRowByForm_andClose(){
                if (itemInfo.itemType.value==2){
                    const unitPrice = Number(itemInfo.itemUnitPrice.value.split(',').join(''))
                    const quantity = Number(itemInfo.itemQuantity.value)
                    const VAT = Number(itemInfo.itemVAT.value)
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
                        Quantity:quantity,
                        'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                        'Unit Price':unitPrice,
                        'VAT _':VAT,
                        'Line Amount':quantity * unitPrice,
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
                itemInfo.itemLineNo.value++
                resetForm()
                console.log(saleQuoteCardLines.value)

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
                saleQuoteCardHeader.value["Sell-to Customer No_"]=customer["No_"]
                saleQuoteCardHeader.value["Sell-to Customer Name"]=customer["Name"]
                saleQuoteCardHeader.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
                saleQuoteCardHeader.value["Payment Method Code"]=customer['Payment Method Code']
                saleQuoteCardHeader.value["Payment Terms Code"]=customer['Payment Terms Code']
                saleQuoteCardHeader.value["Prepayment _"]=customer['Prepayment _']
                saleQuoteCardHeader.value["Shipment Method Code"]=customer['Shipment Method Code']
                saleQuoteCardHeader.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
                saleQuoteCardHeader.value["Customer Price Group"]=customer['Customer Price Group']
                saleQuoteCardHeader.value["Ship-to Code"]=customer['Ship-to Code']
                saleQuoteCardHeader.value["Sales Mode"]=customer['Sales Mode']
            }

            function fillContactInfoField(contact){
                saleQuoteCardHeader.value["Sell-to Contact No_"]= contact['No_']
            }

            function fillLocationInfoField(location){
                if(isItemInfoToFill.value){
                    itemInfo.itemLocation.value=location['Code']
                    isItemInfoToFill.value=false
                }else{
                    saleQuoteCardHeader.value["Location Code"]=location["Code"]
                }
            }
            function fillAddressInfoField(address){
                saleQuoteCardHeader.value["Ship-to Code"]=address["Code"]
            }
            function fillCampaignInfoField(campaign){
                console.log(campaign)
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

            function fillItemInfoField(item){
                itemInfo.itemPriceIsGetting.value = true
                itemInfo.itemType.value = 2
                itemInfo.itemCode.value = item['No_']
                itemInfo.itemDescription.value = item['Description']
                itemInfo.itemDescription2.value = item['Description 2']
                itemInfo.itemLocation.value = saleQuoteCardHeader.value["Location Code"]
                itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
                itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:saleQuoteCardHeader.value["Shipment Method Code"]


                if (itemInfo.itemLocation.value){
                    axios.get(`http://${hostname}:3000/app/getLocationBinCode/${itemInfo.itemLocation.value}?respCenter=${webUserInfo.respCenter.value}`)
                    .then(res => {
                        itemInfo.itemBinCode.value = res.data.recordset[0]['Shipment Bin Code']
                    })
                    .catch(err => console.log(err))
                }

                submitSQLineItemPriceRequest()
                getItemAvailabilityInfo()

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

            function sendSQrequestForApproval(sqData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company.value}`,sqData)
                .then(res =>{
                    console.log(res)
                    submitting_message.value=''
                    success_message.value="demnde d'approbation envoyée"
                    error_message.value=''
                    setTimeout(()=>success_message.value='',5000)
                })
                .catch((err) => {
                    displayErrorMessage(err)
                })
            }

            function getSQLineItemPrice(sqData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company.value}`,sqData)
                .then(res =>{
                    console.log(res)
                    itemInfo.itemUnitPrice.value=res.data.documentNo
                    itemInfo.itemPriceIsGetting.value = false
                })
                .catch((err) => {
                    displayErrorMessage(err)
                })
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
        
            function convertSaleQuote(sqData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company.value}`,sqData)
                .then(res =>{
                    //console.log(res)
                    is_convertSQ_success.value=true
                    submitting_message.value=''
                    success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                    error_message.value=''
                    setTimeout(()=> router.push(`/saleOrderCard/${res.data.documentNo}`),5000)
                })
                .catch((err) => {
                    displayErrorMessage(err)
                })

            }

            function updateSaleQuote(sqData){
                    axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company.value}`,sqData)
                    .then(() => {
                        submitting_message.value=''
                        success_message.value='Enregistrement réussi'
                        error_message.value=''
                        setTimeout(()=>success_message.value='',5000)
                        readOnlyModeIsDisabled.value=false
                    })
                    .catch((err) => {
                        displayErrorMessage(err)
                    })
            }   
            
            function formatToBCJsonData(data){
                const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
                const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
                console.log(JSONDataToSend)
                return {data:JSONDataToSend}
            }

            function submitSQLineItemPriceRequest(){
                const JSData ={
                    Parameter:'quotes_item_getPrice',
                    itemCode:itemInfo.itemCode.value,
                    QuoteNo:saleQuoteCardHeader.value["No_"],
                }
                getSQLineItemPrice(formatToBCJsonData(JSData))
            }

            function submitConvertSaleQuote(){
                submitting_message.value='Conversion du devis en cours'
                const JSData ={
                    Parameter:'quotes_makeorder',
                    webUserName:webUserInfo.name.value,
                    QuoteNo:saleQuoteCardHeader.value["No_"],
                }
                convertSaleQuote(formatToBCJsonData(JSData))
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

            function submitForm(){
                submitting_message.value='Enregistrement en cours'
                const JSData = {
                    Parameter:'quotes_modify',
                    webUserName:webUserInfo.name.value,
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
                    saleQuotePrepayment:saleQuoteCardHeader.value["Prepayment _"], 
                    saleQuoteCustomerShipToCode:saleQuoteCardHeader.value["Ship-to Code"]?saleQuoteCardHeader.value["Ship-to Code"]:'', 
                    saleQuoteShipmentMethodCode:saleQuoteCardHeader.value["Shipment Method Code"], 
                    saleQuoteLines:[
                        ...saleQuoteCardLines.value
                    ]
                }
                updateSaleQuote(formatToBCJsonData(JSData))
            }


        // expose to template and other options API hooks
        return {
            isItemInfoToFill,
            saleQuoteCardHeader,
            saleQuoteCardLines,
            readOnlyModeIsDisabled,
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            ...dateInfo,
            ...itemInfo,
            ...itemAvailabilityInfo,
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
            submitConvertSaleQuote,
            submitSQrequestForApproval,
            submitSQLineItemPriceRequest,
            error_message,
            error_message_code,
            success_message,
            submitting_message

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

            selected_line:'',

            //élement pour le modal ajout d'article
            addItemModalShowned:false,
            editItemModalShowned:false,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            //modal de confirmation convertion devis
            SQConfirmationModalShowned:false,

            //fenêtre d'impression de devis
            printSaleQuoteLayoutShowned:false,
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
                useNavigationTabStore().setMaxWidth('quoteCardRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('quoteCardRightInfoMaxWidth','0px')
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

        ////////////////////////////////methode pour afficher le modal de confirmation de conversion devis
        showConvertSQConfirmationModal(){
            this.SQConfirmationModalShowned = true
        },

        //////////////////////////methode pour afficher report viewer
        showPrintSaleQuoteLayout(){
            this.printSaleQuoteLayoutShowned = true
        },

        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
            else return new Date(date).toLocaleDateString()
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
            const children =  myElt.childNodes
            children.forEach(element => {
                element.classList.add('has-background-light')
                element.classList.add('is-hover-orange')
                element.classList.add('is-hover-orange')
            })
            //console.log(children)

        },
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
                this.saleQuoteCardLines[parentId][parentAttri] = value
                this.saleQuoteCardLines[parentId]["Line Amount"] = value * Math.trunc(Number(this.saleQuoteCardLines[parentId]["Unit Price"]))
            }
            else{
                this.saleQuoteCardLines[parentId][parentAttri] = value
            }
         },
         endEdit(){
            this.$el.querySelector('.editme').blur()
         }

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