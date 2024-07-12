<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <c-r-card-Header :soNo="creditRequestCardHeader['No_']" :soDesc="creditRequestCardHeader['Sell-to Customer Name']" pageTitle="Demande de crédit"
                @onGoingBackToList='goBackToList'
                ></c-r-card-Header>
            </div>
            
<!---------Composant rubban fiche demande de credit----------------------->      
            <c-r-card-ribbon
            routeForNewCard="../NewCreditRequest"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @onConvertingcreditRequest="showConvertSQConfirmationModal"
            @onPrintingCard="showPrintcreditRequestLayout"
            @onPrintingVisitCard="showPrintVisitLayout"
            @onPrintingComityCard="showPrintComityLayout"
            @onPrintingSaleContract="showPrintSaleContractLayout"
            @onPrintingNantContract="showPrintNantContractLayout"
            @onRequestingForApproval="submitSQrequestForApproval"
            @onReopeningDocument="sendReopeningDocRequest"
            @onCreatingCustomerContactCard="this.$router.push('/newContact')"
            @onCreatingCustomerAddressCard="showAddressCreationModal"
            @onCheckingItemAvailability="showItemAvaibilityInfoModal"
            @onSimulatingCredit="simulateCredit"
            componentWithCompInfo="creditRequestCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :printCardBtnIsDisabled="creditRequestCardHeader['Status']!==1"
            :convertQuoteBtnIsDisabled="creditRequestCardHeader['Status']!==0"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="false"
            :reopenBtnIsDisabled="false"
            :documentStatus="creditRequestCardHeader['Status']"
            :newContactBtnIsDisabled="true"
            :newShipToAddressBtnIsDisabled="true"
            :checkItemAvailabilityBtnIsDisabled="false"
            :transmitBtnIsDisabled="false"
            :refreshBtnIsDisabled="false"
            :simulateCreditBtnIsDisabled="false"
            :archiveBtnIsDisabled="false"
            :closeBtnIsDisabled="false"
            :printComityCardBtnIsDisabled="false"
            :printVisitCardBtnIsDisabled="false"
            :saleContractBtnIsDisabled="false"
            :nantContractBtnIsDisabled="false"
            ></c-r-card-ribbon>

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


<!---------Section formulaire fiche demande de credit----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire fiche demande de credit----------------------->                         
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
                            <div class="column is-narrow py-0 has-text-right is-size-7" v-if="!onglet1_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestCardHeader['Sell-to Customer Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ creditRequestCardHeader['Sell-to Contact No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ formatDate(creditRequestCardHeader['Document Date']) }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ creditRequestCardHeader['Status']==0?'Ouvert':creditRequestCardHeader['Status']==1?'Lancé':'Approbation en attente' }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Code client" :valueInputText="creditRequestCardHeader['Sell-to Customer No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code client" v-model="creditRequestCardHeader['Sell-to Customer No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select>

                                <input-text labelInputText="Nom du client" :valueInputText="creditRequestCardHeader['Sell-to Customer Name']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Code contact" :valueInputText="creditRequestCardHeader['Sell-to Contact No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code Contact" v-model="creditRequestCardHeader['Sell-to Contact No_']" @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>

                                <input-text labelInputText="Code magasin" :valueInputText="creditRequestCardHeader['Location Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code magasin" v-model="creditRequestCardHeader['Location Code']" @openModal="activeModalForSelectableElementList='locationList'" v-else></input-select>
                                
                                <input-text labelInputText="Date de la demande" :valueInputText="formatDate(creditRequestCardHeader['Document Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date de la demande" v-model="documentDate" v-else></input-date>
                               
                                <input-text labelInputText="Mode de règlement" :valueInputText="creditRequestCardHeader['Payment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de règlement" v-model="creditRequestCardHeader['Payment Method Code']" @openModal="activeModalForSelectableElementList='paymentMethodList'" v-else></input-select>
                                
                                
                                <input-text labelInputText="% Acompte" :valueInputText="creditRequestCardHeader['Prepayment _']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-number labelInputText="% Acompte" v-model="creditRequestCardHeader['Prepayment _']" v-else></input-number>
                                
                                <input-text labelInputText="Mode livraison" :valueInputText="creditRequestCardHeader['Shipment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode livraison" v-model="creditRequestCardHeader['Shipment Method Code']" @openModal="activeModalForSelectableElementList='shipmentMethodList'" v-else></input-select>
                                
                            </div>
                            <div class="column">
                                <input-text labelInputText="Adresse de livraison" :valueInputText="creditRequestCardHeader['Ship-to Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Adresse de livraison" v-model="creditRequestCardHeader['Ship-to Code']"  @openModal="activeModalForSelectableElementList='addressList'" v-else></input-select>
                                
                                <input-text labelInputText="Avis Recouvrement" :valueInputText="creditRequestCardHeader['Collection advice']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Avis Recouvrement" v-model="creditRequestCardHeader['Collection advice']" :option-list="`optionLabelListForCollectionAdvice`" v-else></input-select-basic-1> 


                                <input-text labelInputText="Commentaires recouvrement" v-model="creditRequestCardHeader['comment']" :valueInputText="creditRequestCardHeader['comment']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                               
                                <input-text labelInputText="Avis Responsable" :valueInputText="creditRequestCardHeader['Responsible advice']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Avis Responsable" v-model="creditRequestCardHeader['Responsible advice']" :option-list="`optionLabelListForReponsibleAdvice`" v-else></input-select-basic-1> 


                                <input-text labelInputText="Commentaires Responsable" v-model="creditRequestCardHeader['comment']" :valueInputText="creditRequestCardHeader['comment']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Commentaires enquêteur" v-model="creditRequestCardHeader['comment']" :valueInputText="creditRequestCardHeader['comment']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestCardHeader['Responsibility Center'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;"> {{ creditRequestCardHeader['Salesperson Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestCardHeader['VAT Bus_ Posting Group'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ creditRequestCardHeader['Sales Channel'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestCardHeader['Sales Mode'] }}</span>
                            </div>
                        </div>
                        <div id="credit_details_content" class="columns">
                            <div class="column">                                                                                                
                                <input-text labelInputText="Centre de gestion" :valueInputText="creditRequestCardHeader['Responsibility Center']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Code vendeur" :valueInputText="creditRequestCardHeader['Salesperson Code']" :is_disabled="true" ></input-text>
                                <input-text labelInputText="Canal de vente" :valueInputText="creditRequestCardHeader['Sales Channel']" :is_disabled="true"  ></input-text>
                                <input-text labelInputText="Mode de vente" :valueInputText="creditRequestCardHeader['Sales Mode']" :is_disabled="true" ></input-text>
                            </div>
                            <div class="column">                                
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="creditRequestCardHeader['Customer Price Group']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Catégorie TVA" :valueInputText="creditRequestCardHeader['VAT Bus_ Posting Group']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Condition de paiement" :valueInputText="creditRequestCardHeader['Payment Terms Code']" :is_disabled="true"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 3 formulaire fiche client en lecture seule----------------------->                         
                    <div id="line" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet3_expanded}">
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
                                        <tr :id="index" v-for="(elt,index) of creditRequestCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
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
                        <div class="columns mt-3" id="line_total" v-if="onglet3_expanded">
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="creditRequestCardHeader['Total Amount']" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="creditRequestCardHeader['Total VAT']" labelInputText="Montant TVA"></input-text1>
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="creditRequestCardHeader['Total Amount Including VAT']" labelInputText="Montant TTC"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="creditRequestCardHeader['']" labelInputText="Montant acompte TTC"></input-text1>
                                </div>
                        </div>                
                    </div>

<!---------sous-Section onglet 3 formulaire fiche client en lecture/ecriture----------------------->                         
                    <div id="line" v-else>
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet3_expanded" @click="showAddRowByFormModal">
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet3_expanded" @click="addEmptyRow">
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
                                <div v-if="creditRequestCardLines.length==0">Il n'y'a rien à afficher</div>
                            </div>
                            <div class="columns mt-3" id="line_total" v-if="onglet3_expanded">
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="creditRequestCardHeader['Total VAT']" labelInputText="Montant TVA"></input-text1>
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="creditRequestCardHeader['Total Amount']" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="creditRequestCardHeader['Total Amount Including VAT']" labelInputText="Montant TTC"></input-text1>
                                </div>
                            </div>         
                        </div>
                        
<!---------Modal sous-Section onglet 3 formulaire fiche client -----Modal d'ajout d'article----------------------->                         
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestCardHeader['Approval Status']==0?'Ouvert':creditRequestCardHeader['Approval Status']==1?'Lancé':'En attente approbation' }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;"> {{ creditRequestCardHeader['Eligible Amount'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestCardHeader['Duration (Month)'] }}</span>
                            </div>
                        </div>
                        <div id="credit_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Statut validation" :valueInputText="creditRequestCardHeader['Approval Status']==0?'Ouvert':creditRequestCardHeader['Approval Status']==1?'Lancé':'En attente approbation'" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Montant du plafond de crédit" :valueInputText="creditRequestCardHeader['Eligible Amount']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-number labelInputText="Montant du plafond de crédit" v-model="creditRequestCardHeader['Eligible Amount']" v-else></input-number>
                                
                                <input-text labelInputText="Taux d’intérêt" :valueInputText="creditRequestCardHeader['Interest rate']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Durée (mois)" :valueInputText="creditRequestCardHeader['Duration (Month)']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-number labelInputText="Durée (mois)" v-model="creditRequestCardHeader['Duration (Month)']" v-else></input-number>
                                
                                <input-text labelInputText="Acompte exigé" :valueInputText="creditRequestCardHeader['Required Deposit']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant de d’acompte" :valueInputText="creditRequestCardHeader['Deposit Amount']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant principal du crédit" :valueInputText="creditRequestCardHeader['Chargeable Amount']" :is_disabled="true"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Montant des intérêts hors taxe" :valueInputText="creditRequestCardHeader['Interest']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant de la TVA sur intérêt" :valueInputText="creditRequestCardHeader['VAT on Interest']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant des intérêts toutes taxes comprises" :valueInputText="creditRequestCardHeader['Interest including VAT']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant total du crédit" :valueInputText="creditRequestCardHeader['Loan Amount']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant total de l’accord" :valueInputText="creditRequestCardHeader['Total agreement']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Mensualité" :valueInputText="creditRequestCardHeader['Installment']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Dernière mensualité" :valueInputText="creditRequestCardHeader['Final installment']" :is_disabled="true"></input-text>
                            </div>
                    </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 5 formulaire fiche demande de credit en lecture seule----------------------->                         
                    <div id="scoring" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet5_expanded}">
                            <div :class="{'columns':!onglet5_expanded,'p-3':onglet5_expanded,'has-border-bottom-grey':onglet5_expanded,'has-border-bottom':!onglet5_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('scoring_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                        <span>scoring</span>
                                    </a>
                                    <a @click="expand('scoring_content');onglet5_expanded=!onglet5_expanded" v-if="!onglet5_expanded">
                                        <span>scoring</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="scoring_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description de la valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document requis</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Lien document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valide</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Coefficient</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point pondéré</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Total point</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of creditRequestCardScoring" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Criteria'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Criteria Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['List Value'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Value Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Validity'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Validity Date']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Document required']==1?'OUI':'NON' }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Document Link'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Valid'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Point'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Coefficient'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Weighed Point'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Updated on']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Updated by'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Weighed Point Total'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-if="creditRequestCardScoring.length==0">Il n'y'a rien à afficher</div>
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet5_expanded">
                            <div class="column">
                            </div>
                            <div class="column">
                                <input-text1 :is_disabled="true" :valueInputText="creditRequestCardHeader['Weighed Point Total']" labelInputText="Total points"></input-text1>
                            </div>
                    </div>                
                    </div>          

<!---------sous-Section onglet 6 formulaire fiche demande de credit en lecture/ecriture----------------------->                         
                    <div id="scoring" v-else>
                        <div :class="{'has-background-white':onglet5_expanded}">
                            <div :class="{'columns':!onglet5_expanded,'p-3':onglet5_expanded,'has-border-bottom-grey':onglet5_expanded,'has-border-bottom':!onglet5_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('line_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                        <span>Lignes</span>
                                    </a>
                                    <a @click="expand('line_content');onglet5_expanded=!onglet5_expanded" v-if="!onglet5_expanded">
                                        <span>Lignes</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet5_expanded">|</span>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet5_expanded" @click="showAddRowByFormModal">
                                        <span class="icon">
                                            <i class="fas fa-plus has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7" >
                                            Ajouter une ligne
                                        </span>
                                    </a>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet5_expanded" @click="showEditRowByFormModal">
                                        <span class="icon">
                                            <i class="fas fa-edit has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7" >
                                            Modifier la ligne
                                        </span>
                                    </a>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet5_expanded" @click="deleteRow">
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
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Ligne</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description de la valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document requis</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Lien document</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valide</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Coefficient</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point pondéré</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Total point</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of creditRequestCardScoring" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                                <td class="has-text-left">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
    
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['Criteria'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light is-narrow"> {{ elt['Criteria Description'] }}</td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['List Value'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['Value Description'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['Validity'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ formatDate(elt['Validity Date']) }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['Document required']==1?'OUI':'NON' }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['Document Link'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['Valid'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light is-narrow">
                                                    {{ elt['Point'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['Coefficient'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['Weighed Point'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ formatDate(elt['Updated on']) }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['Updated by'] }}
                                                </td>
                                                <td  class="has-text-left has-background-light">
                                                    {{ elt['Weighed Point Total'] }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="creditRequestCardScoring.length==0">Il n'y'a rien à afficher</div>
                            </div>
                            <div class="columns mt-3" id="line_total" v-if="onglet5_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="creditRequestCardHeader['Weighed Point Total']" labelInputText="Total points"></input-text1>
                                </div>
                            </div>        
                        </div>
                        
<!---------Modal sous-Section onglet 3 formulaire fiche client -----Modal d'ajout d'article----------------------->                         
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

<!---------sous-Section onglet 7 formulaire fiche demande de credit----------------------->                         
                    <div id="amortissement">
                        <div :class="{'has-background-light':onglet6_expanded}">
                            <div :class="{'columns':!onglet6_expanded,'p-3':onglet6_expanded,'has-border-bottom-grey':onglet6_expanded,'has-border-bottom':!onglet6_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('amortissement_content');onglet6_expanded=!onglet6_expanded" v-if="onglet6_expanded">
                                        <span>Amortissement</span>
                                    </a>
                                    <a @click="expand('amortissement_content');onglet6_expanded=!onglet6_expanded" v-if="!onglet6_expanded">
                                        <span>Amortissement</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            
                            <div id="amortissement_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
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
                            <div v-if="creditRequestAmortization.length==0">Il n'y'a rien à afficher</div>     
                    </div>              
                    </div>                         
                    <br><br>
                </div>

<!---------composant info fiche demande de credit----------------------->
                <customer-info class="customer-info" v-if="true"></customer-info>
                <prospect-info class="prospect-info" v-else></prospect-info>

            </div>


<!-----------reoprt viewer-------------------->

            <div>
                <div :class="{'modal':true , 'is-active':true }" v-if="reportViewerShowned">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://108.175.0.116:8083/ReportServer/Pages/ReportViewer.aspx?/WebApp/SalesQuotePrint&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&Quote=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned=false"></button>
                </div>

                <div :class="{'modal':true , 'is-active':true }" v-if="reportViewerShowned1">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned1=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://108.175.0.116:8083/ReportServer/Pages/ReportViewer.aspx?/WebApp/FicheVisiteClient&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&FicheVisit=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned1=false"></button>
                </div>

                <div :class="{'modal':true , 'is-active':true }" v-if="reportViewerShowned2">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned2=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://108.175.0.116:8083/ReportServer/Pages/ReportViewer.aspx?/WebApp/FicheComiteCredit&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&FicheComite=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned2=false"></button>
                </div>

                <div :class="{'modal':true , 'is-active':true }" v-if="reportViewerShowned3">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned3=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://108.175.0.116:8083/ReportServer/Pages/ReportViewer.aspx?/WebApp/ContratVenteCredit&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&ContratVenteCredit=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned3=false"></button>
                </div>

                <div :class="{'modal':true , 'is-active':true }" v-if="reportViewerShowned4">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned4=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://108.175.0.116:8083/ReportServer/Pages/ReportViewer.aspx?/WebApp/ContratNantissement&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&ContratNan=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned4=false"></button>
                </div>

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
            :customerNo="creditRequestCardHeader['Sell-to Customer No_']" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerNo="creditRequestCardHeader['Sell-to Customer No_']" 
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
import inputNumber from './input/input-number.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic from './input/input-select-basic.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
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
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRoute, useRouter } from 'vue-router'





export default {
    name:'credit-request-card',
    components:{
        CRCardHeader,
        CustomerInfo,
        ProspectInfo,
        inputText,
        inputText1,
        inputNumber,
        inputDate,
        inputSelect,
        inputSelectBasic,
        inputSelectBasic1,
        CRCardRibbon,
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
        const error_fetching_crl_list = ref('')
        const hostname = window.location.hostname
        const currentDate = new Date(new Date()).toISOString().split('T')[0]
        const router = useRouter()

        const creditRequestCardId = useRoute().params.id
        const creditRequestCardHeader = ref({})
        const creditRequestCardLines = ref([])
        const creditRequestCardScoring = ref([])
        const creditRequestAmortization = ref([])
        
        const optionLabelListForCollectionAdvice = ref([])
        const optionLabelListForReponsibleAdvice = ref([])


        const readOnlyModeIsDisabled = ref(false)
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
            // validityDate:ref(''),
            // shipRequestedDate:ref(''),
            // promisedDeliveryDate:ref('')
        }


        const itemInfo = {
            itemLineNo:ref(creditRequestCardLines.value.length +1),
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


        onMounted(()=>{
            if(webUserInfo.respCenter.value){
                getCRCardInfo()
                getOptionLabelList('[Collection advice]')
                getOptionLabelList('[Responsible advice]')
                
            }else{
                getWebUserInfo()
                getOptionLabelList('[Collection advice]')
                getOptionLabelList('[Responsible advice]')
            }
        })



        function simulateCredit(){
            axios.get(`http://${hostname}:3000/app/getAmortization?docNo=${creditRequestCardHeader.value['No_']}&duration=${creditRequestCardHeader.value['Duration (Month)']}&loanAmount=${creditRequestCardHeader.value['Loan Amount']}&installment=${creditRequestCardHeader.value['Installment']}&finalInstallment=${creditRequestCardHeader.value['Final installment']}&interestInclVAT=${creditRequestCardHeader.value['Interest including VAT']}`)
            .then(result => {
                creditRequestAmortization.value = result.data
            })
            .catch(err => console.log(err))
        }

        function getWebUserInfo(){
            axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
            .then(res=>{
                useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                webUserInfo.name.value=useWebUserInfoStore().name
                webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                webUserInfo.respCenter.value=useWebUserInfoStore().responsibilityCenter
                getCRCardInfo()
            })
            .catch(err=>console.log(err))
        }

        function getCRCardInfo(){
            axios.get(`http://${hostname}:3000/app/getCRCard/${creditRequestCardId}?respCenter=${webUserInfo.respCenter.value}`)
            .then(result => {
                creditRequestCardHeader.value=result.data[0]
                creditRequestCardLines.value=result.data[1]
                creditRequestCardScoring.value=result.data[2]
                creditRequestAmortization.value=result.data[3]
                dateInfo.documentDate.value = getISODate(creditRequestCardHeader.value["Document Date"])
                itemInfo.itemLineNo.value = creditRequestCardLines.value.length +1

                error_fetching_crl_list.value=''
                console.log(result.data)
            }).catch(err=>{
                if(err.response.data){
                    error_fetching_crl_list.value = err.response.data.message
                }
            })
        }

        function getOptionLabelList(field){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Collection advice]')
                optionLabelListForCollectionAdvice.value=result.data.recordset
                if (field=='[Responsible advice]')
                optionLabelListForReponsibleAdvice.value=result.data.recordset
                

                    console.log(result.data.recordset)
    
            }).catch(err=>console.log(err))
        }


        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
            console.log(readOnlyModeIsDisabled.value)
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        function getISODate(date){
            if(new String(date).includes('1753'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }

        watch(success_message, () => {
            readOnlyModeIsDisabled.value=false
            getCRCardInfo()
        })

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
                    Quantity:'',
                    'Shipment Method Code':'',
                    'Unit Price':'',
                    'VAT _':'',
                    'Line Amount':'',
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
                const unitPrice = Number(itemInfo.itemUnitPrice.value.split(',').join(''))
                const quantity = Number(itemInfo.itemQuantity.value)
                //const VAT = Number(itemInfo.itemVAT.value)
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
                    Quantity:quantity,
                    'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                    'Unit Price':unitPrice,
                    'VAT _':0,
                    'Line Amount':quantity * unitPrice,
                })
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
            }
            itemInfo.itemLineNo.value++
            resetForm()
        }

        function addRowByForm_andClose(){
            if (itemInfo.itemType.value==2){
                const unitPrice = Number(itemInfo.itemUnitPrice.value.split(',').join(''))
                const quantity = Number(itemInfo.itemQuantity.value)
                //const VAT = Number(itemInfo.itemVAT.value)
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
                    Quantity:quantity,
                    'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                    'Unit Price':unitPrice,
                    'VAT _':0,
                    'Line Amount':quantity * unitPrice,
                })
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
            creditRequestCardHeader.value["Sell-to Customer No_"]=customer["No_"]
            creditRequestCardHeader.value["Sell-to Customer Name"]=customer["Name"]
            creditRequestCardHeader.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
            creditRequestCardHeader.value["Payment Method Code"]=customer['Payment Method Code']
            creditRequestCardHeader.value["Payment Terms Code"]=customer['Payment Terms Code']
            creditRequestCardHeader.value["Prepayment _"]=customer['Prepayment _']
            creditRequestCardHeader.value["Shipment Method Code"]=customer['Shipment Method Code']
            creditRequestCardHeader.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
            creditRequestCardHeader.value["Customer Price Group"]=customer['Customer Price Group']
            creditRequestCardHeader.value["Ship-to Code"]=customer['Ship-to Code']
            creditRequestCardHeader.value["Sales Mode"]=customer['Sales Mode']
        }

        function fillContactInfoField(contact){
            creditRequestCardHeader.value["Sell-to Contact No_"]= contact['No_']
        }
            
        function fillLocationInfoField(location){
            if(isItemInfoToFill.value){
                itemInfo.itemLocation.value=location['Code']
                isItemInfoToFill.value=false
            }else{
                creditRequestCardHeader.value["Location Code"]=location["Code"]
            }
        }

        function fillAddressInfoField(address){
            creditRequestCardHeader.value["Ship-to Code"]=address["Code"]
        }
        
        function fillCampaignInfoField(campaign){
            creditRequestCardHeader.value["Campaign No_"]=campaign["No_"]
        }

        function fillPaymentMethodInfoField(paymentMethod){
            creditRequestCardHeader.value["Payment Method Code"]=paymentMethod["Code"]
        }

        function fillShipmentMethodInfoField(shipmentMethod){
            if(isItemInfoToFill.value){
                itemInfo.itemShipmentMethod.value=shipmentMethod['Code']
                isItemInfoToFill.value=false
            }else{
                creditRequestCardHeader.value["Shipment Method Code"]=shipmentMethod["Code"]
            }
        }

        function fillItemInfoField(item){
            itemInfo.itemPriceIsGetting.value = true
            itemInfo.itemType.value = 2
            itemInfo.itemCode.value = item['No_']
            itemInfo.itemDescription.value = item['Description']
            itemInfo.itemDescription2.value = item['Description 2']
            itemInfo.itemLocation.value = creditRequestCardHeader.value["Location Code"]
            itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
            itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:creditRequestCardHeader.value["Shipment Method Code"]
            itemInfo.itemVAT.value = item["VAT Prod_ Posting Group"]
    
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

        function convertcreditRequest(sqData){
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

        function updatecreditRequest(sqData){
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
                QuoteNo:creditRequestCardHeader.value["No_"],
            }
            getSQLineItemPrice(formatToBCJsonData(JSData))
        }

        function submitConvertcreditRequest(){
            submitting_message.value='Conversion du devis en cours'
            const JSData ={
                Parameter:'quotes_makeorder',
                webUserName:webUserInfo.name.value,
                QuoteNo:creditRequestCardHeader.value["No_"],
            }
            convertcreditRequest(formatToBCJsonData(JSData))
        }
        
        function submitSQrequestForApproval(){
            submitting_message.value="Envoie de la demande d'approbation en cours"
            const JSData ={
                Parameter:'quotes_requestApproval',
                //webUserName:webUserInfo.name.value,
                QuoteNo:creditRequestCardHeader.value["No_"],
            }
            sendSQrequestForApproval(formatToBCJsonData(JSData))
        }

        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'creditRequests_modify',
                webUserName:webUserInfo.name.value,
                QuoteNo:creditRequestCardHeader.value["No_"],
                saleQuoteCustomerNo:creditRequestCardHeader.value["Sell-to Customer No_"],
                saleQuoteCustomerContactCode:creditRequestCardHeader.value["Sell-to Contact No_"],
                saleQuoteResponsibilityCenter:creditRequestCardHeader.value['Responsibility Center'],
                saleQuoteSalesperson:creditRequestCardHeader.value['Salesperson Code'],
                saleQuoteCampaignNo:creditRequestCardHeader.value['Campaign No_'],
                saleQuoteLocationCode:creditRequestCardHeader.value["Location Code"],
                saleQuoteSalesChannel:creditRequestCardHeader.value["Sales Channel"],
                saleQuoteSalesMode:creditRequestCardHeader.value["Sales Mode"]?creditRequestCardHeader.value["Sales Mode"]:'',
                saleQuoteCustomerPriceGroup:creditRequestCardHeader.value["Customer Price Group"],
                saleQuoteVATBusPostingGroup:creditRequestCardHeader.value["VAT Bus_ Posting Group"], 
                saleQuoteDocumentDate:dateInfo.documentDate.value,
                saleQuoteValidUntilDate:getISODate(currentDate),
                saleQuoteShipRequestedDate:getISODate(currentDate), 
                saleQuotePromisedDeliveryDate:getISODate(currentDate), 
                saleQuotePaymentMethodCode:creditRequestCardHeader.value["Payment Method Code"], 
                saleQuotePaymentTermsCode:creditRequestCardHeader.value["Payment Terms Code"],
                saleQuotePrepayment:creditRequestCardHeader.value["Prepayment _"], 
                saleQuoteCustomerShipToCode:creditRequestCardHeader.value["Ship-to Code"]?creditRequestCardHeader.value["Ship-to Code"]:'', 
                saleQuoteShipmentMethodCode:creditRequestCardHeader.value["Shipment Method Code"], 
                'Approval Status':creditRequestCardHeader.value['Approval Status'],
                'Eligible Amount':creditRequestCardHeader.value['Eligible Amount'],
                'Interest rate':creditRequestCardHeader.value['Interest rate'],
                'Duration (Month)':creditRequestCardHeader.value['Duration (Month)'],
                'Required Deposit':creditRequestCardHeader.value['Required Deposit'],
                'Deposit Amount':creditRequestCardHeader.value['Deposit Amount'],
                'Chargeable Amount':creditRequestCardHeader.value['Chargeable Amount'],
                'Interest':creditRequestCardHeader.value['Interest'],
                'VAT on Interest':creditRequestCardHeader.value['VAT on Interest'],
                'Interest including VAT':creditRequestCardHeader.value['Interest including VAT'],
                'Loan Amount':creditRequestCardHeader.value['Loan Amount'],
                'Total agreement':creditRequestCardHeader.value['Total agreement'],
                'Installment' : creditRequestCardHeader.value['Installment'],
                'Final installment':creditRequestCardHeader.value['Final installment'],
                saleQuoteLines:[
                    ...creditRequestCardLines.value
                ],
                MirindraRequestCriteria:[
                    ...creditRequestCardScoring.value
                ],
                CreditAmortization:[
                    ...creditRequestAmortization.value
                ]
            }
            updatecreditRequest(formatToBCJsonData(JSData))
        }



        // expose to template and other options API hooks
        return {
            isItemInfoToFill,
            creditRequestCardHeader,
            creditRequestCardLines,
            creditRequestCardScoring,
            creditRequestAmortization,
            readOnlyModeIsDisabled,

            optionLabelListForCollectionAdvice,
            optionLabelListForReponsibleAdvice,
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
            submitConvertcreditRequest,
            submitSQrequestForApproval,
            submitSQLineItemPriceRequest,
            error_message,
            error_message_code,
            success_message,
            submitting_message,

            simulateCredit,
        }
    },
    data(){
        return{

            reportViewerShowned:false,
            reportViewerShowned1:false,
            reportViewerShowned2:false,
            reportViewerShowned3:false,
            reportViewerShowned4:false,

            

            //taille (largeur) initiale du composant customerInfo
            creditRequestInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.creditRequestCardRightInfoMaxWidth,

            //indique la route active
            creditRequestCardId:this.$route.params.id,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:false,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,
            onglet6_expanded:true,

            //indique si tous les options les lignes sont affichées
            show_more_option:false,

            //indique si la barre des boutons d'option est affichée
            show_option_btn_bar:false,

            //indique l'option par défaut
            selected_option:'',

            selected_line:'',

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveTab('creditRequests')
            this.$router.push('/')
        },
        showPrintcreditRequestLayout(){

            this.reportViewerShowned = true
        },
        showPrintVisitLayout(){

            this.reportViewerShowned1 = true
        },
        showPrintComityLayout(){

            this.reportViewerShowned2 = true
        },
        showPrintSaleContractLayout(){

            this.reportViewerShowned3 = true
        },
        showPrintNantContractLayout(){

            this.reportViewerShowned4 = true
        },
         /////////////////////////methode pour masquer ou afficher le composant info à droite
         hideOrShowComponentInfo(){
            if(this.creditRequestInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('creditRequestCardRightInfoMaxWidth','800px')
                this.creditRequestInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('creditRequestCardRightInfoMaxWidth','0px')
                this.creditRequestInfoCompMaxWidth='0px'
            }
        },
         ///////////////////////methode pour  afficher le formulaire d'ajout d'article
         showAddRowByFormModal(){
            this.addItemModalShowned = true
        },

        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        },
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='line_content' || id=='amortissement_content' || id=='scoring_content') myElt.style.maxHeight='250px'
            else myElt.style.maxHeight='500px'
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
            console.log(myElt.style.maxHeight)
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
                element.classList.remove('has-background-light')
                element.classList.add('is-hover-orange')
            })
            //console.log(children)

        },
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            const children =  myElt.childNodes
            children.forEach(element => {
                element.classList.remove('is-hover-orange')
                element.classList.add('has-background-light')
            })
            //console.log(children)

        },
        onEdit(evt){
             var src = evt.target.innerText
             this.txt = src
         },
         endEdit(){
            this.$el.querySelector('.editme').blur()
         }

    },
   
}

</script>
<style scoped>
.customer-info,prospect-info{
    max-width: v-bind(creditRequestInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#line_content,#credit_content,#international_content,#prepayment_content,#scoring_content,#amortissement_content{
    max-height: 5000px;
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


