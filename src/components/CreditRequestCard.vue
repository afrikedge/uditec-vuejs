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
            @onSubmittingForm="controlBeforeSubmit"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @onConvertingSaleQuote="showConvertCRConfirmationModal"
            @onPrintingVisitCard="showPrintVisitLayout"
            @onPrintingComityCard="showPrintComityLayout"
            @onPrintingSaleContract="showPrintSaleContractLayout"
            @onPrintingNantContract="showPrintNantContractLayout"
            @onPrintingProforma='showPrintcreditRequestLayout'
            @onRequestingForApproval="submitSQrequestForApproval"
            @onCreatingCustomerContactCard="this.$router.push('/newContact')"
            @onCreatingCustomerAddressCard="showAddressCreationModal"
            @onCheckingItemAvailability="showItemAvaibilityInfoModal"
            @onSimulatingCredit="simulateCredit"
            @ontransmittingStatusCard="submitStatusUpdate(1)"
            @onGettingCustomerHistory="showCustomerHistoryModal"

            @onRejectingCard="showRejectCRConfirmationModal"
            @onValidatingWithCondCard="submitStatusUpdate(3)"
            @onValidatingCard="submitStatusUpdate(2)"


            
            componentWithCompInfo="creditRequestCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="docCanBeModified==false"
            :convertQuoteBtnIsDisabled="docHasBeenValidated==false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="false"
            :documentStatus="creditRequestCardHeader['Status']"
            :newContactBtnIsDisabled="true"
            :newShipToAddressBtnIsDisabled="true"
            :checkItemAvailabilityBtnIsDisabled="false"
            :refreshBtnIsDisabled="true"
            :simulateCreditBtnIsDisabled="false"
            :archiveBtnIsDisabled="true"
            :closeBtnIsDisabled="true"

            :transmitBtnIsDisabled="false || (creditRequestCardHeader['Approval Status'] > 7 && creditRequestCardHeader['Approval Status'] < 12) || creditRequestCardHeader['Approval Status'] == 6"
            :rejectBtnIsDisabled="false || creditRequestCardHeader['Approval Status'] !== 6"
            :validateWithCondBtnIsDisabled="false || creditRequestCardHeader['Approval Status'] !== 6"
            :validateBtnIsDisabled="false || creditRequestCardHeader['Approval Status'] !== 6"
            
            :printCRCardBtnIsDisabled="creditRequestCardHeader['Approval Status'] < 2"
            :printProformaBtnIsDisabled="false"
            :printComityCardBtnIsDisabled="false"
            :printVisitCardBtnIsDisabled="false"
            :saleContractBtnIsDisabled="true"
            :nantContractBtnIsDisabled="true"
            :expandedOrCollapsedBtn="expandedOrCollapsedBtn"
            :customerHistoryBtnIsDisabled="!creditRequestCardHeader['Sell-to Customer No_']"
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

            <article v-if="success_transmission" class="message is-primary shadow">
                <div class="message-header">
                        <span class="subtitle is-7 m-0 has-text-white"> 
                            <span class="icon ">
                                <i class="fas fa-check"></i>
                            </span>
                            {{ success_transmission }}
                        </span>
                    <button class="delete" aria-label="delete" @click="success_transmission=''"></button>
                </div>
            </article>


<!---------Section formulaire fiche demande de credit----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;" @click="expandedOrCollapsedBtn=expandedOrCollapsedBtn?'':'close'">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire fiche demande de credit----------------------->                         
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
                            <div class="column is-narrow py-0 has-text-right is-size-7" v-if="!onglet1_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditRequestCardHeader['Sell-to Customer No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ creditRequestCardHeader['Sell-to Customer Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ formatDate(creditRequestCardHeader['Document Date']) }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ displayApprovalStatusLabel(creditRequestCardHeader['Approval Status']) }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Code client" :valueInputText="creditRequestCardHeader['Sell-to Customer No_']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Nom du client" :valueInputText="creditRequestCardHeader['Sell-to Customer Name']" :is_disabled="true"></input-text>                                
                                <input-text labelInputText="Code prospect" :valueInputText="creditRequestCardHeader['Sell-to Contact No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled && creditRequestCardHeader['Sell-to Customer No_']==''"></input-text>                                
                                <input-text labelInputText="Téléphone" :valueInputText="creditRequestCardHeader['Sell-to Phone No_']" :is_disabled="true"></input-text>                                <input-text labelInputText="Catégorie professionnelle" :valueInputText="professionalCategoryLabel" :is_disabled="true"></input-text>
                                <input-text labelInputText="Nom de l'employeur / Type d'activité" :valueInputText="creditRequestCardHeader['Activity Name']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Adresse de l'employeur / activité" :valueInputText="creditRequestCardHeader['Professional Address']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Code magasin" :valueInputText="creditRequestCardHeader['Location Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code magasin" v-model="creditRequestCardHeader['Location Code']" @openModal="activeModalForSelectableElementList='locationList'" v-else></input-select>
                                
                                <input-text labelInputText="Centre de gestion" :valueInputText="creditRequestCardHeader['Responsibility Center']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Code vendeur" :valueInputText="creditRequestCardHeader['Salesperson Code']" :is_disabled="true" ></input-text>
                                <input-text labelInputText="Canal de vente" :valueInputText="creditRequestCardHeader['Sales Channel']" :is_disabled="true"  ></input-text>
                                <input-text labelInputText="Mode de vente" :valueInputText="creditRequestCardHeader['Sales Mode']" :is_disabled="true" ></input-text>
                                
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="creditRequestCardHeader['Customer Price Group']" :is_disabled="true" v-if="true"></input-text>
                                <input-select labelInputText="Groupe tarifaire" v-model="creditRequestCardHeader['Customer Price Group']" @openModal="activeModalForSelectableElementList='priceGroupList'" v-else></input-select>
                                
                                <input-text labelInputText="Catégorie TVA" :valueInputText="creditRequestCardHeader['VAT Bus_ Posting Group']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Condition de paiement" :valueInputText="creditRequestCardHeader['Payment Terms Code']" :is_disabled="true"></input-text>
                                <input-textarea labelInputText="Observations générales" :valueInputText="creditRequestCardHeader['General comment']" v-model="creditRequestCardHeader['General comment']" :is_disabled="!readOnlyModeIsDisabled"></input-textarea>
                            </div>
                            <div class="column">
                                <input-date labelInputText="Date de la demande" :valueInputText="formatDate(creditRequestCardHeader['Document Date'])" v-model="documentDate" :is_disabled="!readOnlyModeIsDisabled"></input-date>
                                
                                <input-text labelInputText="Mode de règlement" :valueInputText="creditRequestCardHeader['Payment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de règlement" v-model="creditRequestCardHeader['Payment Method Code']" @openModal="activeModalForSelectableElementList='paymentMethodList'" v-else></input-select>
                                
                                <input-text labelInputText="Mode livraison" :valueInputText="creditRequestCardHeader['Shipment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode livraison" v-model="creditRequestCardHeader['Shipment Method Code']" @openModal="activeModalForSelectableElementList='shipmentMethodList'" v-else></input-select>
                                
                                <input-text labelInputText="Adresse de livraison" :valueInputText="creditRequestCardHeader['Ship-to Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Adresse de livraison" v-model="creditRequestCardHeader['Ship-to Code']"  @openModal="activeModalForSelectableElementList='addressList'" v-else></input-select>
                                
                                <input-number labelInputText="% Acompte" :valueInputText="formatAmount3Decimal(creditRequestPrepayment)" v-model="creditRequestPrepayment" :is_disabled="!readOnlyModeIsDisabled" @onChangingInputValue="getPrepaymentInfo"></input-number>
                                <input-number labelInputText="Montant Acompte" :valueInputText="formatAmount(creditRequestPrepaymentAmount)" v-model="creditRequestPrepaymentAmount" :is_disabled="!readOnlyModeIsDisabled" @onChangingInputValue="getPrepaymentAmountInfo"></input-number>
                                <input-number labelInputText="Disponibilité mensuelle" :valueInputText="formatAmount(creditRequestCardHeader['Monthly Capacity'])" v-model="creditRequestCardHeader['Monthly Capacity']" :is_disabled="true"></input-number>
                                <input-number labelInputText="Coef. Max Approbation (%)" :valueInputText="formatAmount(creditRequestCardHeader['Max Approved Rate (%)'])" v-model="creditRequestCardHeader['Max Approved Rate (%)']" :is_disabled="true"></input-number>
                                <input-number labelInputText="Mensualité Max" :valueInputText="formatAmount(creditRequestCardHeader['Max Installment'])" v-model="creditRequestCardHeader['Max Installment']" :is_disabled="true"></input-number>
                                <input-number labelInputText="Mensualité requise" :valueInputText="formatAmount(creditRequestCardHeader['Required Installment'])" v-model="creditRequestCardHeader['Required Installment']" :is_disabled="true"></input-number>
                                <input-number labelInputText="Coef. Max Arbitrage (%)" :valueInputText="formatAmount(creditRequestCardHeader['Max Referred Rate (%)'])" v-model="creditRequestCardHeader['Max Referred Rate (%)']" :is_disabled="true"></input-number>
                                <input-number labelInputText="Mensualité Arbritrage" :valueInputText="formatAmount(creditRequestCardHeader['Referred Installment'])" v-model="creditRequestCardHeader['Referred Installment']" :is_disabled="true"></input-number>
                                <input-text labelInputText="Statut document" :valueInputText="displayApprovalStatusLabel(creditRequestCardHeader['Approval Status'])" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Type joint" :valueInputText="joinTypeOpinionLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type joint" v-model="creditRequestJoinType" :option-list="optionLabelListForJoinType" v-else></input-select-basic-1>
                                
                                <input-text labelInputText="Code joint" :valueInputText="creditRequestCardHeader['Joint Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select v-model="creditRequestCardHeader['Joint Code']" labelInputText="Code joint"  @openModal="()=>{activeModalForSelectableElementList='customerList';isJoinCodeToFill=true}" v-else-if="creditRequestJoinType==0"></input-select>
                                <input-select v-model="creditRequestCardHeader['Joint Code']" labelInputText="Code joint" @openModal="()=>{activeModalForSelectableElementList='contactList';isJoinCodeToFill=true}" v-else></input-select>
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
                                        <span class="tag is-dark px-2 mx-1 is-rounded"> {{ creditRequestCardLines.length }}</span>
                                    </a>
                                    <a @click="expand('line_content');onglet3_expanded=!onglet3_expanded" v-else>
                                        <span>Lignes</span>
                                        <span class="tag is-warning px-2 mx-1 my-1 is-rounded"> {{ creditRequestCardLines.length }}</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="line_content" class="px-5 mt-5" style="max-height: 350px; overflow:scroll;">
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
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de mesure</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de livraison</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">% Acompte</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code catégorie article</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Durée max crédit</th>
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
                                            <td  class="has-text-left has-background-light"> {{ elt['Location Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Bin Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Unit of Measure'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Quantity']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Shipment Method Code'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Unit Price']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['VAT _']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Line Amount']) }}</td>                                           
                                            <td  class="has-text-right has-background-light"> {{ formatAmount3Decimal(elt['Prepayment _']) }}</td>                                           
                                            <td  class="has-text-left has-background-light"> {{ elt['Item Category Code'] }}</td>                                           
                                            <td  class="has-text-right has-background-light"> {{ elt['Credit Max Duration'] }}</td>                                           
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet3_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(creditRequestCardHeader['Total Amount']) + ' MGA'" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(creditRequestCardHeader['Total VAT']) + ' MGA'" labelInputText="Montant TVA"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(creditRequestCardHeader['Total Amount Including VAT']) + ' MGA'" labelInputText="Montant TTC"></input-text1>
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
                                        <span class="tag is-light px-2 mx-1 is-rounded"> {{ creditRequestCardLines.length }}</span>
                                    </a>
                                    <a @click="expand('line_content');onglet3_expanded=!onglet3_expanded" v-else>
                                        <span>Lignes</span>
                                        <span class="tag is-warning px-2 mx-1 my-1 is-rounded"> {{ creditRequestCardLines.length }}</span>
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet3_expanded" @click="deleteLine(selectedLine)">
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
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Description</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Magasin de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Emplacement</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de mesure</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Mode de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">% Acompte</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code catégorie article</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Durée max crédit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of creditRequestCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" @click="selectLine(index)">
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
                                                                    <input v-model="elt['No_']" class="input is-small" type="text" style="border:none" :disabled="elt['No_']==mirindraGP.itemForApplicationFees || elt['No_']==mirindraGP.itemForInterest">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeItemLineDropdown!==index && elt['No_']!==mirindraGP.itemForApplicationFees && elt['No_']!==mirindraGP.itemForInterest" @click.prevent="displayItemListDropdown(index)">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="itemListDropdownIsActive==true && activeItemLineDropdown==index && elt['No_']!==mirindraGP.itemForApplicationFees && elt['No_']!==mirindraGP.itemForInterest" @click.prevent="closeItemListDropdown">
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
                                                    <!----div :id="index+'-'+elt['No_']+'-No_'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['No_']" @blur="onEdit" @keydown.enter="endEdit"></div---->
                                                </td>
                                                <td class="has-text-left py-1 px-2 is-narrow" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['Description']+'-Description'" class="editme p-1" :contenteditable="elt['Type']!==2" v-text="elt['Description']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div class="dropdown is-small" :class="{'is-active':locationListDropdownIsActive && activeLocationLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['Location Code']" class="input is-small" type="text" style="border:none" :disabled="elt['No_']==mirindraGP.itemForApplicationFees || elt['No_']==mirindraGP.itemForInterest">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeLocationLineDropdown!==index && elt['No_']!==mirindraGP.itemForApplicationFees && elt['No_']!==mirindraGP.itemForInterest" @click.prevent="displayLocationListDropdown(index)">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="locationListDropdownIsActive==true && activeLocationLineDropdown==index  && elt['No_']!==mirindraGP.itemForApplicationFees && elt['No_']!==mirindraGP.itemForInterest" @click.prevent="closeLocationListDropdown">
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
                                                    </div>                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div class="dropdown is-small" :class="{'is-active':locationBinListDropdownIsActive && activeLocationBinLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['Bin Code']" class="input is-small" type="text" style="border:none" :disabled="elt['No_']==mirindraGP.itemForApplicationFees || elt['No_']==mirindraGP.itemForInterest">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeLocationBinLineDropdown!==index && elt['No_']!==mirindraGP.itemForApplicationFees && elt['No_']!==mirindraGP.itemForInterest" @click.prevent="displayLocationBinListDropdown(index,elt['Location Code'],elt['No_'])">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="locationBinListDropdownIsActive==true && activeLocationBinLineDropdown==index && elt['No_']!==mirindraGP.itemForApplicationFees && elt['No_']!==mirindraGP.itemForInterest" @click.prevent="closeLocationBinListDropdown">
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
                                                                    <input v-model="elt['Shipment Method Code']" class="input is-small" type="text" style="border:none" :disabled="elt['No_']==mirindraGP.itemForApplicationFees || elt['No_']==mirindraGP.itemForInterest">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeshipmentMethodLineDropdown!==index && elt['No_']!==mirindraGP.itemForApplicationFees && elt['No_']!==mirindraGP.itemForInterest" @click.prevent="displayShipmentMethodListDropdown(index)">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="shipmentMethodListDropdownIsActive==true && activeshipmentMethodLineDropdown==index && elt['No_']!==mirindraGP.itemForApplicationFees && elt['No_']!==mirindraGP.itemForInterest" @click.prevent="closeShipmentMethodListDropdown">
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
                                                    <!-----div :id="index+'-'+elt['Shipment Method Code']+'-Shipment Method Code'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Shipment Method Code']" @blur="onEdit" @keydown.enter="endEdit"></div------>
                                                </td>
                                                <td class="has-text-right py-1 px-2" >
                                                    {{ formatAmount(elt['Unit Price']) }}
                                                </td>
                                                <td class="has-text-right py-1 px-2" >
                                                    {{ formatAmount(elt['VAT _']) }}
                                                </td>
                                                <td class="has-text-right py-1 px-2 is-narrow" >
                                                    {{ formatAmount(elt['Line Amount']) }}
                                                </td>
                                                <td class="has-text-right py-1 px-2 is-narrow" >
                                                    {{ formatAmount3Decimal(elt['Prepayment _']) }}
                                                </td>
                                                <td class="has-text-left py-1 px-2 is-narrow"> {{ elt['Item Category Code'] }} </td>
                                                <td class="has-text-right py-1 px-2 is-narrow" > {{ elt['Credit Max Duration'] }} </td>
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
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalVAT) + ' MGA'" labelInputText="Montant TVA"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalAmountExclVAT) + ' MGA'" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(totalAmountIncVAT) + ' MGA'" labelInputText="Montant TTC"></input-text1>
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
                                                    <input-select v-show="itemType==2" v-model="itemLocation" labelInputText="magasin de livraison" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationList',isItemInfoToFill=true}"></input-select>
                                                    <input-select  v-show="itemType==2" v-model="itemBinCode" labelInputText="Emplacement" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationBinList'}"></input-select>
                                                    <input-number  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité" @onChangingInputValue="submitCRLineItemPriceRequest" :is_disabled="false" ></input-number>
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
                                                    <input-number  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false" @onChangingInputValue="submitCRLineItemPriceRequest"></input-number>
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
                                                        <button  class="button has-background-orangered  shadow has-text-white" @click.prevent="()=>{editRowByForm(selectedLine);editItemModalShowned=false;if(creditRequestCardHeader['Location Code']) addItemModalShowned=true}">
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
                                                <p class="title has-text-left is-6 mt-3" v-if="itemCode && itemType==2">Disponibilité article: </p>
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
                    <br  v-if="onglet3_expanded"><br>
                    

<!---------sous-Section onglet 4 formulaire fiche   demande de credit----------------------->                         
                    <div id="credit">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('credit_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                    <span>Détails demande de crédit</span>
                                </a>
                                <a @click="expand('credit_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                    <span>Détails demande de crédit</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="credit_content" class="columns">
                            <div class="column">                                
                                <input-text labelInputText="Montant du plafond de crédit" :valueInputText="formatAmount(creditRequestCardHeader['Eligible Amount'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-number labelInputText="Montant du plafond de crédit" v-model="creditRequestCardHeader['Eligible Amount']" v-else></input-number>
                                
                                <input-text labelInputText="Taux d’intérêt" :valueInputText="formatAmount(creditRequestCardHeader['Interest rate'])" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Durée (mois)" :valueInputText="creditRequestDuration" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-number labelInputText="Durée (mois)" v-model="creditRequestDuration" v-else></input-number>
                                
                                <input-text labelInputText="Durée maximale (mois)" :valueInputText="creditRequestMaximumDuration" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Acompte exigé" :valueInputText="formatAmount(creditRequestRequiredDeposit)" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant de d’acompte" :valueInputText="formatAmount(creditRequestCardHeader['Deposit Amount'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant principal du crédit" :valueInputText="formatAmount(creditRequestCardHeader['Chargeable Amount'])" :is_disabled="true"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Montant des intérêts hors taxe" :valueInputText="formatAmount(creditRequestCardHeader['Interest'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant de la TVA sur intérêt" :valueInputText="formatAmount(creditRequestCardHeader['VAT on Interest'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant des intérêts toutes taxes comprises" :valueInputText="formatAmount(creditRequestCardHeader['Interest including VAT'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant total du crédit" :valueInputText="formatAmount(creditRequestCardHeader['Loan Amount'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Montant total de l’accord" :valueInputText="formatAmount(creditRequestCardHeader['Total agreement'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Mensualité" :valueInputText="formatAmount(creditRequestCardHeader['Installment'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Dernière mensualité" :valueInputText="formatAmount(creditRequestCardHeader['Final installment'])" :is_disabled="true"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 9 formulaire fiche demande de credit----------------------->                         
                    <div id="comment-details">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('comment-details_content');onglet9_expanded=!onglet9_expanded" v-if="onglet9_expanded">
                                    <span>Validation</span>
                                </a>
                                <a @click="expand('comment-details_content');onglet9_expanded=!onglet9_expanded" v-else>
                                    <span>Validation</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="comment-details_content" class="columns">
                            <div class="column">                                                                                                
                                <input-text labelInputText="Décision système" :valueInputText="systemDecisionLabel" v-model="creditRequestCardHeader['System Decision']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Avis analyste" :valueInputText="analystOpinionLabel" v-model="creditRequestCardHeader['Analyst Opinion']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || creditRequestCardHeader['Approval Status']!==2"></input-text>
                                <input-select-basic-1 labelInputText="Avis analyste" v-model="creditRequestCardHeader['Analyst Opinion']" :option-list="optionLabelListForAnalystOpinion" v-else></input-select-basic-1>
                                <input-textarea labelInputText="Commentaires analyste" :valueInputText="creditRequestCardHeader['Analyst comments']" v-model="creditRequestCardHeader['Analyst comments']" :is_disabled="!readOnlyModeIsDisabled || creditRequestCardHeader['Approval Status']!==2"></input-textarea>
                                
                                <input-text labelInputText="Avis enquêteur" :valueInputText="investigatorOpinionLabel" v-model="creditRequestCardHeader['Investigator Opinion']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || creditRequestCardHeader['Approval Status']!==3"></input-text>
                                <input-select-basic-1 labelInputText="Avis enquêteur" v-model="creditRequestCardHeader['Investigator Opinion']" :option-list="optionLabelListForInvestigatorOpinion" v-else></input-select-basic-1>
                                <input-textarea labelInputText="Commentaires enquêteur" :valueInputText="creditRequestCardHeader['Investigator comments']" v-model="creditRequestCardHeader['Investigator comments']" :is_disabled="!readOnlyModeIsDisabled || creditRequestCardHeader['Approval Status']!==3"></input-textarea>
                            </div>
                            <div class="column">                                
                                <input-text labelInputText="Avis recouvrement" :valueInputText="recoveryOpinionLabel" v-model="creditRequestCardHeader['Recovery Opinion']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || creditRequestCardHeader['Approval Status']!==4"></input-text>
                                <input-select-basic-1 labelInputText="Avis recouvrement" v-model="creditRequestCardHeader['Recovery Opinion']" :option-list="optionLabelListForRecoveryOpinion" v-else></input-select-basic-1>
                                <input-textarea labelInputText="Commentaires recouvrement" :valueInputText="creditRequestCardHeader['Recovery comments']" v-model="creditRequestCardHeader['Recovery comments']" :is_disabled="!readOnlyModeIsDisabled || creditRequestCardHeader['Approval Status']!==4"></input-textarea>
                                
                                <input-text labelInputText="Avis responsable" :valueInputText="managerOpinionLabel" v-model="creditRequestCardHeader['Manager Opinion']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || creditRequestCardHeader['Approval Status']!==5"></input-text>
                                <input-select-basic-1 labelInputText="Avis responsable" v-model="creditRequestCardHeader['Manager Opinion']" :option-list="optionLabelListForManagerOpinion" v-else></input-select-basic-1>
                                <input-textarea labelInputText="Commentaires responsable" :valueInputText="creditRequestCardHeader['Manager comments']" v-model="creditRequestCardHeader['Manager comments']" :is_disabled="!readOnlyModeIsDisabled || creditRequestCardHeader['Approval Status']!==5"></input-textarea>
                            </div>
                        </div>                    
                    </div>
                    <br  v-if="onglet9_expanded"><br>

<!---------sous-Section onglet 2 formulaire fiche demande de credit----------------------->                         
                    <div id="conditions" v-if="creditRequestCardHeader['Approval Status']>0">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('conditions_content');onglet8_expanded=!onglet8_expanded" v-if="onglet8_expanded">
                                    <span>Conditions</span>
                                </a>
                                <a @click="expand('conditions_content');onglet8_expanded=!onglet8_expanded" v-else>
                                    <span>Conditions</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="conditions_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Garant exigé ?" :valueInputText="creditRequestCardHeader['Joint Required']?'Oui':'Non'" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Garant exigé ?" v-model="creditRequestCardHeader['Joint Required']" :option-list="[{Value:0,Description:'Non'},{Value:1,Description:'Oui'}]" v-else></input-select-basic-1>                                                                                               
                                <input-number labelInputText="Montant recommandé" :valueInputText="creditRequestCardHeader['Rec. Amount']" v-model="creditRequestCardHeader['Rec. Amount']" :is_disabled="!readOnlyModeIsDisabled"></input-number>
                            </div>
                            <div class="column">                                
                                <input-number labelInputText="Durée recommandée" :valueInputText="creditRequestCardHeader['Rec. Duration']" v-model="creditRequestCardHeader['Rec. Duration']" :is_disabled="!readOnlyModeIsDisabled"  ></input-number>
                                <input-number labelInputText="Acompte recommandé" :valueInputText="creditRequestCardHeader['Rec. Deposit (%)']" v-model="creditRequestCardHeader['Rec. Deposit (%)']" :is_disabled="!readOnlyModeIsDisabled" ></input-number>
                            </div>
                        </div>                    
                    </div>
                    <br  v-if="onglet8_expanded"><br>

<!---------sous-Section onglet 5 formulaire fiche prospect en lecture seule----------------------->                         
                    <div id="exigences" v-if="!readOnlyModeIsDisabled ">
                        <div :class="{'has-background-light':onglet5_expanded}" v-if="scoring_RequirementCanBeVisible==true">
                            <div :class="{'columns':!onglet5_expanded,'p-3':onglet5_expanded,'has-border-bottom-grey':onglet5_expanded,'has-border-bottom':!onglet5_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('requirements_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                        <span>Exigences</span>
                                        <span class="tag is-dark px-2 mx-1 is-rounded"> {{ creditRequestRequirement.length }}</span>
                                    </a>
                                    <a @click="expand('requirements_content');onglet5_expanded=!onglet5_expanded" v-else>
                                        <span>Exigences</span>
                                        <span class="tag is-warning px-2 mx-1 my-1 is-rounded"> {{ creditRequestRequirement.length }}</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="requirements_content" class=" px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth tableFixHead">
                                    <thead class=" my-2">
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7  " ></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 " style="min-width: 100px;">Code critère</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type Valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Niveau d’exigence</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Longueur valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Valeur Alphanumérique</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Valeur Numérique</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;z-index:3000">Document requis ?</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;z-index:3000">Valide ?</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="'onglet3-L'+index" v-for="(elt,index) of creditRequestRequirement" :key="'onglet3-L'+index" @mouseover="setLineShadow('onglet3-L'+index)" @mouseout="removeLineShadow('onglet3-L'+index)" >
                                            <td class="has-text-left has-background-light ">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light "> {{ elt['Criteria'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Criteria Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ displayValueTypeLabel(elt['Value Type']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ displayRequirementLevelLabel(elt['Requirement']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ elt['Value Length'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Alpha Value'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Numeric Value'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDate(elt['Validity Date']) }}</td>
                                            <td  class="has-text-centered has-background-light is-narrow">
                                                <div class="field">
                                                    <input type="checkbox" name="switchThinColorDanger" class="switch is-thin is-danger" :checked="elt['Document required']">
                                                    <label></label>
                                                </div> 
                                            </td>
                                            <td  class="has-text-left has-background-light is-narrow">
                                                <!--------pour la version prod-->
                                                <a :href="`../public/${elt['Document Link']}`" target="_blank">
                                                    {{ elt['Document Link'] }}
                                                </a>

                                                <!--------pour la version dev-->
                                                <!---a :href="`../${elt['Document Link']}`" target="_blank">
                                                    {{ elt['Document Link'] }}
                                                </a--->
                                            </td>
                                            <td  class="has-text-centered has-background-light">
                                                <div class="field">
                                                    <input type="checkbox" :name="index+'switchColorSuccess'" class="switch is-thin is-success" :checked="elt['Valid']">
                                                    <label ></label>
                                                </div>
                                            </td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDateHour(elt['Updated on']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Updated by'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-if="creditRequestRequirement.length==0 && onglet5_expanded">Il n'y'a rien à afficher</div>
                        </div>             
                    </div>          

<!---------sous-Section onglet 5 formulaire fiche prospect en lecture/ecriture----------------------->                         
                    <div id="exigences" v-else>
                        <div :class="{'has-background-white':onglet5_expanded}" v-if="scoring_RequirementCanBeVisible==true">
                            <div :class="{'columns':!onglet5_expanded,'p-3':onglet5_expanded,'has-border-bottom-grey':onglet5_expanded,'has-border-bottom':!onglet5_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('requirements_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                        <span>Exigences</span>
                                        <span class="tag is-light px-2 mx-1 is-rounded"> {{ creditRequestRequirement.length }}</span>
                                    </a>
                                    <a @click="expand('requirements_content');onglet5_expanded=!onglet5_expanded" v-else>
                                        <span>Exigences</span>
                                        <span class="tag is-warning px-2 mx-1 my-1 is-rounded"> {{ creditRequestRequirement.length }}</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet5_expanded">|</span>
                                </div>
                            </div>
                            <div id="requirements_content" class=" px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <div>
                                    <table class="table  is-narrow  is-fullwidth is-bordered ">
                                        <thead class=" my-2">
                                            <tr> 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Code critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Description du critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Type Valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Longueur valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Valeur Alphanumérique</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Valeur Numérique</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Type validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Date validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Document requis ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Lien document</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Valide ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Niveau d’exigence</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="'onglet3-L'+index" v-for="(elt,index) of creditRequestRequirement" :key="'onglet3-L'+index" @mouseover="setLineShadow('onglet3-L'+index)" @mouseout="removeLineShadow('onglet3-L'+index)" >
                                                <td class="has-text-left">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
                                                <td class="has-text-left">{{ elt['Criteria'] }}</td>
                                                <td  class="has-text-left is-narrow"> {{ elt['Criteria Description'] }}</td>
                                                <td  class="has-text-left"> {{ displayValueTypeLabel(elt['Value Type']) }}</td>
                                                <td  class="has-text-right"> {{ elt['Value Length'] }}</td>
                                                <td class="has-text-left" >
                                                    <input v-model="creditRequestRequirement[index]['Alpha Value']" class="input is-small" :class="{'has-background-white':elt['Value Type']==2}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==2">
                                                </td>
                                                <td class="has-text-left">
                                                    <input v-model="creditRequestRequirement[index]['Numeric Value']" class="input is-small" :class="{'has-background-white':elt['Value Type']==1}" type="text" style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==1">
                                                </td>
                                                <td  class="has-text-left"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td class="has-text-left" >
                                                    <input v-model="creditRequestRequirement[index]['Validity Date']" class="input is-small" :class="{'has-background-white':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
                                                </td>
                                                <td  class="has-text-centered">
                                                    <div class="field">
                                                        <input type="checkbox" name="switchThinColorDanger" class="switch is-thin is-danger" :checked="elt['Document required']">
                                                        <label></label>
                                                    </div>
                                                </td>
                                                <td class="has-text-left is-narrow" >
                                                    <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="creditRequestRequirement[index]['Document Link']" class="input is-small has-background-white" type="text" style="border:none" :disabled="true">
                                                            <input v-show="false" class="input is-small" :id="'fileUpload1-'+index" type="file" @change="(e)=> uploadFile(e,elt['Criteria'],'requirement',index)" >
                                                        </div>
                                                        <div class="control" v-if="creditRequestRequirement[index]['Document Link']==''">
                                                            <button class="button is-small" @click.prevent="getFile('fileUpload1-'+index)">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="creditRequestRequirement[index]['Document Link']">
                                                            <button class="button is-small is-danger" @click.prevent="()=>deleteFileFromLine(index,'requirement',creditRequestRequirement[index]['Document Link'])">
                                                                <span class="icon">
                                                                    <i class="fas fa-trash"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="creditRequestRequirement[index]['Document Link']">
                                                            <!--------pour la version prod-->
                                                            <a class="button  is-small"
                                                            :href="`../public/${creditRequestRequirement[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a>
                                                            <!--------pour la version dev-->
                                                            <!----a class="button  is-small"
                                                            :href="`../${creditRequestRequirement[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a---->
                                                        </div>
                                                    </div>
                                                </td>
                                                <td  class="has-text-centered">
                                                    <div class="field">
                                                        <input :id="index+'switchColorSuccess'" type="checkbox" :name="index+'switchColorSuccess'" class="switch is-thin is-success" v-model="creditRequestRequirement[index]['Valid']" :disabled="creditRequestCardHeader['Approval Status']!==12">
                                                        <label :for="index+'switchColorSuccess'"></label>
                                                    </div>
                                                </td>
                                                <td  class="has-text-left"> {{ displayRequirementLevelLabel(elt['Requirement']) }}</td>
                                                <td  class="has-text-left is-narrow"> {{ formatDateHour(elt['Updated on']) }}</td>
                                                <td  class="has-text-left"> {{ elt['Updated by'] }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="creditRequestRequirement.length==0 && onglet5_expanded">Il n'y'a rien à afficher</div>
                            </div>
                        </div>
                    </div>              
                    <br v-if="scoring_RequirementCanBeVisible==true"><br v-if="scoring_RequirementCanBeVisible==true">

<!---------sous-Section onglet 6 formulaire fiche demande de credit en lecture seule----------------------->                         
                    <div id="scoring" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet6_expanded}" v-if="scoring_RequirementCanBeVisible==true">
                            <div :class="{'columns':!onglet6_expanded,'p-3':onglet6_expanded,'has-border-bottom-grey':onglet6_expanded,'has-border-bottom':!onglet6_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('scoring_content');onglet6_expanded=!onglet6_expanded" v-if="onglet6_expanded">
                                        <span>scoring</span>
                                        <span class="tag is-dark px-2 mx-1 is-rounded"> {{ creditRequestScoring.length }}</span>
                                    </a>
                                    <a @click="expand('scoring_content');onglet6_expanded=!onglet6_expanded" v-else>
                                        <span>scoring</span>
                                        <span class="tag is-warning px-2 mx-1 my-1 is-rounded"> {{ creditRequestScoring.length }}</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="scoring_content" class="px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth tableFixHead">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 " ></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 " style="min-width: 100px">Code critère</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Description de la valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Précision</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;z-index:3000">Document requis</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;z-index:3000">Valide ?</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Coefficient</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point pondéré</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="'onglet6-L'+index" v-for="(elt,index) of creditRequestScoring" :key="'onglet6-L'+index" @mouseover="setLineShadow('onglet6-L'+index)" @mouseout="removeLineShadow('onglet6-L'+index)" >
                                            <td class="has-text-left has-background-light ">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light "> {{ elt['Criteria'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Criteria Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['List Value'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Value Description'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Precision'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Validity Date']) }}</td>
                                            <td  class="has-text-centered has-background-light"> 
                                                <div class="field" style="z-index:25">
                                                    <input type="checkbox" name="switchThinColorDanger" class="switch is-thin is-danger" :checked="elt['Document required']">
                                                    <label></label>
                                                </div>                                         
                                            </td>
                                            <td  class="has-text-left has-background-light is-narrow">
                                                <!--------pour la version prod-->
                                                <a :href="`../public/${elt['Document Link']}`" target="_blank">
                                                    {{ elt['Document Link'] }}
                                                </a>

                                                <!--------pour la version dev-->
                                                <!---a :href="`../${elt['Document Link']}`" target="_blank">
                                                    {{ elt['Document Link'] }}
                                                </a--->
                                            </td>
                                            <td  class="has-text-centered has-background-light">
                                                <div class="field">
                                                    <input type="checkbox" :name="index+'switchColorSuccess'" class="switch is-thin is-success" :checked="elt['Valid']">
                                                    <label ></label>
                                                </div>
                                            </td>
                                            <td  class="has-text-right has-background-light is-narrow"> {{ elt['Point'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ elt['Coefficient'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ elt['Weighed Point'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDateHour(elt['Updated on']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Updated by'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-if="creditRequestScoring.length==0">Il n'y'a rien à afficher</div>
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet6_expanded && scoring_RequirementCanBeVisible==true">
                            <div class="column">
                            </div>
                            <div class="column is-narrow">
                                <input-text1 :is_disabled="true" :valueInputText="weighedPointTotal" labelInputText="Total points"></input-text1>
                            </div>
                        </div>                
                    </div>

<!---------sous-Section onglet 6 formulaire fiche demande de credit en lecture/ecriture----------------------->                         
                    <div id="scoring" v-else>
                        <div :class="{'has-background-white':onglet6_expanded}" v-if="scoring_RequirementCanBeVisible==true">
                            <div :class="{'columns':!onglet6_expanded,'p-3':onglet6_expanded,'has-border-bottom-grey':onglet6_expanded,'has-border-bottom':!onglet6_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('scoring_content');onglet6_expanded=!onglet6_expanded" v-if="onglet6_expanded">
                                        <span>Scoring</span>
                                        <span class="tag is-light px-2 mx-1 is-rounded"> {{ creditRequestScoring.length }}</span>
                                    </a>
                                    <a @click="expand('scoring_content');onglet6_expanded=!onglet6_expanded" v-else>
                                        <span>Scoring</span>
                                        <span class="tag is-warning px-2 mx-1 my-1 is-rounded"> {{ creditRequestScoring.length }}</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet6_expanded">|</span>
                                </div>
                            </div>
                            <div id="scoring_content" class=" px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <div>
                                    <table class="table  is-narrow  is-fullwidth is-bordered">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Description de la valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Précision</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Type validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Document requis</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Lien document</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Valide ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Point</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Coefficient</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Point pondéré</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="'onglet6-L'+index" v-for="(elt,index) of creditRequestScoring" :key="'onglet6-L'+index" @mouseover="setLineShadow('onglet6-L'+index)" @mouseout="removeLineShadow('onglet6-L'+index)" >
                                                <td class="has-text-left">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
    
                                                <td class="has-text-left py-1 px-2" >{{ elt['Criteria'] }}</td>
                                                <td  class="has-text-left is-narrow"> {{ elt['Criteria Description'] }}</td>
                                                <td  class="has-text-left is-narrow">
                                                    <span v-if="elt['List Value'] == elt['Criteria']">{{ elt['List Value'] }}</span>
                                                    <div v-else class="dropdown is-small" :class="{'is-active':criteriaValueDropdownIsActive && activeCriteriaValueDropdown==index}">
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="elt['List Value']" class="input is-small has-background-white" type="text" style="border:none">
                                                        </div>
                                                        <div class="control">
                                                            <button class="button is-small" v-if="activeCriteriaValueDropdown!==index" @click.prevent="displayCriteriaValueDropdown(index,elt['Criteria'])">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus" ></i>
                                                                </span>
                                                            </button>
                                                            <button class="button is-small" v-if="criteriaValueDropdownIsActive==true && activeCriteriaValueDropdown==index" @click.prevent="closeCriteriaValueDropdown">
                                                                <span class="icon">
                                                                    <i class="fas fa-close" ></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                        </div>
                                                        <div class="dropdown-menu" id="dropdown-menu" role="menu" style="max-width:500px; max-height:200px;overflow: scroll;padding:0;">
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
                                                </td>
                                                <td  class="has-text-left is-narrow">{{ elt['Value Description'] }}</td>
                                                <td  class="has-text-left is-narrow">
                                                    <input v-model="creditRequestScoring[index]['Precision']" class="input is-small has-background-white" style="border:none" type="text">
                                                </td>
                                                <td  class="has-text-left">{{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td  class="has-text-left is-narrow">
                                                    <input v-model="creditRequestScoring[index]['Validity Date']" class="input is-small" :class="{'has-background-white':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
                                                </td>
                                                <td  class="has-text-centered">
                                                    <div class="field">
                                                        <input type="checkbox" name="switchThinColorDanger" class="switch is-thin is-danger" :checked="elt['Document required']">
                                                        <label></label>
                                                    </div>
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="creditRequestScoring[index]['Document Link']" class="input is-small has-background-white"  type="text" style="border:none" disabled="true">
                                                            <input v-show="false" class="input is-small" :id="'fileUpload-'+index" type="file" @change="(e)=> uploadFile(e,elt['Criteria'],'scoring',index)" >
                                                        </div>
                                                        <div class="control" v-if="creditRequestScoring[index]['Document Link']==''">
                                                            <button class="button is-small" @click.prevent="getFile('fileUpload-'+index)">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="creditRequestScoring[index]['Document Link']">
                                                            <button class="button is-small is-danger" @click.prevent="()=>deleteFileFromLine(index,'scoring',creditRequestScoring[index]['Document Link'])">
                                                                <span class="icon">
                                                                    <i class="fas fa-trash"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="creditRequestScoring[index]['Document Link']">
                                                            <!--------pour la version prod-->
                                                            <a class="button  is-small"
                                                            :href="`../public/${creditRequestScoring[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a>
                                                            <!--------pour la version dev-->
                                                            <!----a class="button  is-small"
                                                            :href="`../${creditRequestScoring[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a---->
                                                        </div>
                                                    </div>
                                                </td>
                                                <td  class="has-text-centered">
                                                    <div class="field">
                                                        <input :id="index+'switchColorSuccess1'" type="checkbox" :name="index+'switchColorSuccess1'" class="switch is-thin is-success" v-model="creditRequestScoring[index]['Valid']" @click="getScoringPoint(index)" :disabled="creditRequestCardHeader['Approval Status']!==12">
                                                        <label :for="index+'switchColorSuccess1'"></label>
                                                    </div>
                                                </td>
                                                <td  class="has-text-right is-narrow">{{ elt['Point'] }}</td>
                                                <td  class="has-text-right">{{ elt['Coefficient'] }}</td>
                                                <td  class="has-text-right">{{ elt['Weighed Point'] }}</td>
                                                <td  class="has-text-left is-narrow">{{ formatDateHour(elt['Updated on']) }}</td>
                                                <td  class="has-text-left">{{ elt['Updated by'] }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="creditRequestScoring.length==0">Il n'y'a rien à afficher</div>
                            </div>
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet6_expanded && scoring_RequirementCanBeVisible==true">
                            <div class="column">
                            </div>
                            <div class="column is-narrow">
                                <input-text1 :is_disabled="true" :valueInputText="weighedPointTotal" labelInputText="Total points"></input-text1>
                            </div>
                        </div>  
                    </div>              
                    <br v-if="scoring_RequirementCanBeVisible==true"><br v-if="scoring_RequirementCanBeVisible==true">

<!---------sous-Section onglet 7 formulaire fiche demande de credit----------------------->                         
                    <div id="amortissement">
                        <div :class="{'has-background-light':onglet7_expanded}">
                            <div :class="{'columns':!onglet7_expanded,'p-3':onglet7_expanded,'has-border-bottom-grey':onglet7_expanded,'has-border-bottom':!onglet7_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('amortissement_content');onglet7_expanded=!onglet7_expanded" v-if="onglet7_expanded">
                                        <span>Amortissement</span>
                                        <span class="tag is-dark px-2 mx-1 is-rounded"> {{ creditRequestAmortization.length }}</span>
                                    </a>
                                    <a @click="expand('amortissement_content');onglet7_expanded=!onglet7_expanded" v-else>
                                        <span>Amortissement</span>
                                        <span class="tag is-warning px-2 mx-1 my-1 is-rounded"> {{ creditRequestAmortization.length }}</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            
                            <div id="amortissement_content" class="px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <table class="table  is-narrow   is-fullwidth tableFixHead">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Numéro Ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Facteur de calcul</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Mensualité</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Interest déduite</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Amortissement</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Dette restante</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Intérêts restants</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Solde règlement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="'onglet7-L'+index" v-for="(elt,index) of creditRequestAmortization" :key="'onglet7-L'+index" @mouseover="setLineShadow('onglet7-L'+index)" @mouseout="removeLineShadow('onglet7-L'+index)" >
                                            <td class="has-text-left has-background-light is-narrow">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Line No_'] }}</td>
                                            <td  class="has-text-right has-background-light is-narrow"> {{ elt['Calculation factor'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Monthly payment']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Interest']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Depreciation']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Remaining debt']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Abandoned interests']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Payment balance']) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>              
                    </div>                         
                    <br v-if="onglet7_expanded"><br> 

<!---------sous-Section onglet 11 formulaire fiche client en lecture seule----------------------->                         
                    <div id="historique" v-if="false">
                        <div :class="{'has-background-light':onglet11_expanded}">
                            <div :class="{'columns':!onglet11_expanded,'p-3':onglet11_expanded,'has-border-bottom-grey':onglet11_expanded,'has-border-bottom':!onglet11_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('history_content');onglet11_expanded=!onglet11_expanded" v-if="onglet11_expanded">
                                        <span>Historique client</span>
                                        <span class="tag is-dark px-2 mx-1 is-rounded"> {{ creditRequestCardHistory.length }}</span>
                                    </a>
                                    <a @click="expand('history_content');onglet11_expanded=!onglet11_expanded" v-else>
                                        <span>Historique client</span>
                                        <span class="tag is-warning px-2 mx-1 my-1 is-rounded"> {{ creditRequestCardHistory.length }}</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="history_content" class="px-5 mt-5" style="max-height: 0px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode vente</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date document</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Paiement</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date paiement</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Jour(s) retard</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut échéance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="'onglet11-L'+index" v-for="(elt,index) of creditRequestCardHistory" :key="'onglet11-L'+index" @mouseover="setLineShadow('onglet11-L'+index)" @mouseout="removeLineShadow('onglet11-L'+index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Sales Mode'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Document No_'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Posting Date']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Due Date']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Amount (LCY)']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Payment (LCY)']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Payment Date']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ elt['Days late'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Debt Status'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!---div v-if="creditRequestCardHistory.length==0 && onglet11_expanded">Il n'y'a rien à afficher</div--->
                        </div>            
                    </div>
                    <!--br v-if="onglet11_expanded"><br---> 

<!---------sous-Section onglet 10 formulaire fiche demande de credit----------------------->                         
                    <div id="approval-flow">
                        <div :class="{'has-background-light':onglet10_expanded}">
                            <div :class="{'columns':!onglet10_expanded,'p-3':onglet10_expanded,'has-border-bottom-grey':onglet10_expanded,'has-border-bottom':!onglet10_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('approval_flow_content');onglet10_expanded=!onglet10_expanded" v-if="onglet10_expanded">
                                        <span>Flux d'approbation</span>
                                        <span class="tag is-dark px-2 mx-1 is-rounded"> {{ creditRequestApprovalFlow.length }}</span>
                                    </a>
                                    <a @click="expand('approval_flow_content');onglet10_expanded=!onglet10_expanded" v-else>
                                        <span>Flux d'approbation</span>
                                        <span class="tag is-warning px-2 mx-1 my-1 is-rounded"> {{ creditRequestApprovalFlow.length }}</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="approval_flow_content" class="px-5 mt-5 mb-3" style="max-height: 0px; overflow:scroll;" >
                                <table class="table  is-narrow  is-fullwidth tableFixHead">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow"></th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow">Séquence</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode d'approbation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Approuvé le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Approuvé par</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Approuvé en tant que</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut actuel</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut suivant</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Commentaire</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="'onglet10-L'+index" v-for="(elt,index) of creditRequestApprovalFlow" :key="'onglet10-L'+index" @mouseover="setLineShadow('onglet10-L'+index)" @mouseout="removeLineShadow('onglet10-L'+index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-right has-background-light"> {{ elt['Approval Sequence'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ displayApprovalModeLabel(elt['Approval Mode']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ formatDateHour(elt['Approved On']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Approved by'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Approved as'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ displayApprovalStatusLabel(elt['Actual Status']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ displayApprovalStatusLabel(elt['Next Status']) }}</td>
                                            <td  class="has-text-left has-background-light"> 
                                                {{ elt['Comments'] }}
                                            </td>                                     
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>               
                    </div>
                </div>

<!---------composant info fiche demande de credit----------------------->
                <customer-info class="customer-info" v-if="creditRequestCardHeader['No_']" :documentNo="creditRequestCardHeader['No_']" documentType="CreditRequest" :customerNo="creditRequestCardHeader['Sell-to Customer No_']"></customer-info>
                <prospect-info class="prospect-info" v-else></prospect-info>

            </div>


<!-----------reoprt viewer-------------------->
            <div>
                <div :class="{'modal':true , 'is-active':true }" v-show="reportViewerShowned" v-if="creditRequestCardHeader['No_']">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://10.64.25.11:80/ReportServer/Pages/ReportViewer.aspx?/WebApp/SalesQuotePrint&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&Quote=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned=false"></button>
                </div>

                <div :class="{'modal':true , 'is-active':true }" v-if="reportViewerShowned1">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned1=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://10.64.25.11:80/ReportServer/Pages/ReportViewer.aspx?/WebApp/FicheVisiteClient&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&FicheVisit=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned1=false"></button>
                </div>

                <div :class="{'modal':true , 'is-active':true }" v-if="reportViewerShowned2">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned2=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://10.64.25.11:80/ReportServer/Pages/ReportViewer.aspx?/WebApp/FicheComiteCredit&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&fichecomite=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned2=false"></button>
                </div>

                <div :class="{'modal':true , 'is-active':true }" v-if="reportViewerShowned3">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned3=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://10.64.25.11:80/ReportServer/Pages/ReportViewer.aspx?/WebApp/ContratVenteCredit&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&ContratVenteCredit=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned3=false"></button>
                </div>

                <div :class="{'modal':true , 'is-active':true }" v-if="reportViewerShowned4">
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned4=false"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :src="`http://10.64.25.11:80/ReportServer/Pages/ReportViewer.aspx?/WebApp/ContratNantissement&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&ContratNan=${creditRequestCardHeader['No_']}`"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned4=false"></button>
                </div>

            </div>


<!-----------Disponibilité article-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="inventoryAvailabilityModalShowned">
                <div class="modal-background has-background-white" style="opacity:0.7" @click="inventoryAvailabilityModalShowned=false"></div>
                <div class="modal-content w-75 shadow has-background-light">
                    <inventory-availability></inventory-availability>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="inventoryAvailabilityModalShowned=false"></button>
            </div>

<!-----------Historique client-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="customerHistoyModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.4" @click="customerHistoyModalShowned=false"></div>
                <div class=" w-100 h-100 shadow" style="border-radius:0px">
                    <customer-history :customerNo="creditRequestCardHeader['Sell-to Customer No_']"></customer-history>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="customerHistoyModalShowned=false"></button>
            </div>


<!-----------modal de confirmation convertion de devis-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="CRConfirmationModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.2" @click="CRConfirmationModalShowned=false"></div>
                <div class="modal-content has-background-white p-5 shadow" style="border: none;border-radius: 0;">
                    <div class="columns mb-5">
                        <div class="column is-narrow">
                            <span class="icon is-large">
                            <i class="far fa-circle-question fa-2x"></i>
                            </span>
                        </div>
                        <div class="column has-text-left">
                            <span class="subtitle is-5 has-text-left">La demande sera convertie en commande et sera par la suite archivée. Souhaitez-vous continuer?</span>
                        </div>
                    </div>
                    <div class="buttons mt-5 is-right">
                        <button class="button shadow has-background-orange1 has-text-white" @click.prevent="submitConvertcreditRequest">
                            Je confirme
                        </button>
                        <button class="button shadow" @click.prevent="CRConfirmationModalShowned=false">J'annule</button>
                    </div>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" CRConfirmationModalShowned=false"></button>
            </div>


<!-----------modal de confirmation rejet-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="CRConfirmationRejectionModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.2" @click="CRConfirmationRejectionModalShowned=false"></div>
                <div class="modal-content has-background-white p-5 shadow" style="border: none;border-radius: 0;">
                    <div class="columns mb-5">
                        <div class="column is-narrow">
                            <span class="icon is-large">
                            <i class="far fa-circle-question fa-2x"></i>
                            </span>
                        </div>
                        <div class="column has-text-left">
                            <span class="subtitle is-5 has-text-left">En confirmant cette action, la demande ne pourra plus être traitée. Souhaitez-vous continuer?</span>
                        </div>
                    </div>
                    <div>
                        <input-text-simple v-model="reasonForRejection" inputPlaceHolder="Veuillez indiquer la raison du rejet"></input-text-simple>
                    </div>
                    <div class="buttons mt-5 is-right">
                        <button class="button shadow has-background-orange1 has-text-white" @click.prevent="submitRejectcreditRequest" :disabled="reasonForRejection=='' || reasonForRejection.length<=10">
                            Je confirme
                        </button>
                        <button class="button shadow" @click.prevent="CRConfirmationRejectionModalShowned=false">J'annule</button>
                    </div>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" CRConfirmationRejectionModalShowned=false"></button>
            </div>


<!-----------modal de confirmation maj % acompte-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="CRConfirmationPymtUpdateModalShowned">
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
                <!----button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" CRConfirmationPymtUpdateModalShowned=false"></button--->
            </div>


<!-----------Modal pour la création d'un contact-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newContactModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newContactModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-contact :customerNo="creditRequestCardHeader['Sell-to Customer No_']" :redirectionIsDisabled="true" @submit="(elt) => {if(isJoinCodeToFill){creditRequestCardHeader['Joint Code']=elt['code']}else{ creditRequestCardHeader['Sell-to Contact No_'] = elt['code']};newContactModalShowned=false} "></new-contact>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newContactModalShowned=false }"></button>
            </div>


<!-----------Modal pour la création d'une adresse-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newAddressModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newAddressModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-ship-to-address :customerNo="creditRequestCardHeader['Sell-to Customer No_']" :contactNo="creditRequestCardHeader['Sell-to Contact No_']" :redirectionIsDisabled="true" @submit="(elt) => {creditRequestCardHeader['Ship-to Code'] = elt;newAddressModalShowned=false} "></new-ship-to-address>
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

        <modal-for-selectable-price-group-list 
            v-if="activeModalForSelectableElementList=='priceGroupList'" 
            :isActive="activeModalForSelectableElementList=='priceGroupList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectablePriceGroupListModal="(elt)=>fillPriceGroupInfoField(elt)">
        </modal-for-selectable-price-group-list>

        <modal-for-selectable-contact-list 
            v-if="activeModalForSelectableElementList=='contactList'" 
            :isActive="activeModalForSelectableElementList=='contactList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="creditRequestCardHeader['Sell-to Customer No_']" 
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
            :customerNo="creditRequestCardHeader['Sell-to Customer No_']" 
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


    </div>    
</template>
<script>
import CRCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import CRCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputTextarea from './input/input-textarea.vue'
import inputText1 from './input/input-text1.vue'
import inputTextSimple from './input/input-text-simple.vue'
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
import ModalForSelectableLocationBinList from './ModalForSelectableLocationBinList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableLeadList from './ModalForSelectableLeadList.vue'
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import ModalForSelectablePriceGroupList from './ModalForSelectablePriceGroupList.vue'

import NewContact from './NewContact.vue'
import NewShipToAddress from './NewShipToAddress.vue'

import SelectableItemListForSale from './SelectableItemListForSale.vue'
import InventoryAvailability from './InventoryAvailability.vue'

import ReportViewer from './ReportViewer.vue'
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRoute, useRouter } from 'vue-router'
import { useMirindraGPInfoStore } from '@/Stores/MirindraGPInfo'

import CustomerHistory from './CustomerHistory.vue'





export default {
    name:'credit-request-card',
    components:{
        CRCardHeader,CustomerInfo,ProspectInfo,CRCardRibbon,ReportViewer,
        inputText,inputTextarea,inputText1,inputTextSimple,inputSelect,inputSelectBasic,inputSelectBasic1,inputDate,inputNumber,
        ModalForSelectableCustomerList,ModalForSelectableCampaignList,ModalForSelectablePaymentMethodList,
        ModalForSelectableShipmentMethodList,ModalForSelectableItemList,ModalForSelectableLocationList,ModalForSelectableLocationBinList,
        ModalForSelectableContactList,ModalForSelectableLeadList,ModalForSelectableAddressList,SelectableItemListForSale,ModalForSelectablePriceGroupList,
        InventoryAvailability, NewContact,NewShipToAddress,CustomerHistory 
    },
    setup(){
        const error_fetching_crl_list = ref('')
        const hostname = window.location.hostname
        //const currentDate = new Date(new Date()).toISOString().split('T')[0]
        const router = useRouter()

        const CRConfirmationModalShowned = ref(false)
        const CRConfirmationRejectionModalShowned = ref(false)

        const customerHistoyModalShowned = ref(false)

        const creditRequestCardId = useRoute().params.id
        const creditRequestCardHeader = ref({})
        const creditRequestLocationBinCode = ref('')
        const creditRequestCardLines = ref([])
        const creditRequestScoring = ref([])
        const creditRequestRequirement = ref([])
        const creditRequestAmortization = ref([])
        const creditRequestApprovalFlow = ref([])
        const creditRequestCardHistory = ref([])
        const criteriaValueDropdownIsActive = ref(false)
        const activeCriteriaValueDropdown = ref(-1)
        const scoringCriteriaValueList = ref([])
        const readOnlyModeIsDisabled = ref(false)
        const isItemInfoToFill = ref(false)
        const userCanChangePriceGroup = ref(false)

        
        const newContactModalShowned = ref(false)
        const newAddressModalShowned = ref(false)
        
        //element pour déclencher le recalcul des lignes
        const lineHasBeenDeleted = ref(false)


        //variable de soumission forme
        const submitting_message=ref('') 
        const success_transmission=ref('')
        const transmitBtnIsDisabled = ref(false)

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')
        const is_convertCR_success = ref(false)

//fonctions pour définir la fiche sur lecture et/modification
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }
        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }


//Controles d'activation des boutons
        const docCanBeModified = computed(()=>{
            if(creditRequestCardHeader.value['Approval Status']>7 && creditRequestCardHeader.value['Approval Status']<=11)
                return false
            else
                return true
        })
        const scoring_RequirementCanBeVisible = computed(()=>{
            if(creditRequestCardHeader.value['Approval Status']==0)
                return false
            else
                return true
        })
        const docHasBeenValidated = computed(()=>{
            if(creditRequestCardHeader.value['Approval Status']==7 || creditRequestCardHeader.value['Approval Status']==8)
                return true
            else
                return false
        })



        //objet contenant nos champs de date
        const dateInfo = {
            documentDate: ref(''),
        }

         //objet contenant les infos sur l'utilisateur connecté
        // let webUserInfo = {
        //     name:ref(useWebUserInfoStore().name),
        //     company:ref(useWebUserInfoStore().activeCompanyId),
        //     respCenter:ref(useWebUserInfoStore().responsibilityCenter)
        // }

        //sac des labels de la fiche
         const labelBag = {
            //creditRequestApprovalStatusLabel:ref(''),
            systemDecisionLabel:ref(''),
            investigatorOpinionLabel:ref(''),
            analystOpinionLabel:ref(''),
            recoveryOpinionLabel:ref(''),
            managerOpinionLabel:ref(''),
            joinTypeOpinionLabel:ref(''),
            requirementValueTypeLabelList:ref([]),
            requirementLevelLabelList:ref([]),
            validityLabelList:ref([]),
            approvalModeLabelList:ref([]),
            approvalStatusLabelList:ref([]),
            optionLabelListForInvestigatorOpinion:ref([]),
            optionLabelListForAnalystOpinion:ref([]),
            optionLabelListForRecoveryOpinion:ref([]),
            optionLabelListForManagerOpinion:ref([]),
            optionLabelListForJoinType:ref([]),
            professionalCategoryLabel:ref('')
        }

//function pour afficher le label des champs optionlist des listes et tableaux
        function displayValueTypeLabel(value){
        //    let eltToFind = labelBag.requirementValueTypeLabelList.value.find((row) => row["Value"]==value)
        //    if(eltToFind){
        //        return new String(eltToFind["Description"])[0]
        //    }
        if(value >= 0)
                return labelBag.requirementValueTypeLabelList.value[value]['Description']
            else
                return ''
        
        }
       function displayRequirementLevelLabel(value){
            // let eltToFind = labelBag.requirementLevelLabelList.value.find((row) => row["Value"]==value)
            // if(eltToFind){
            //     return eltToFind["Description"]
            // }
            if(value >= 0)
                return labelBag.requirementLevelLabelList.value[value]['Description']
            else
                return ''
        }
        function displayValidityTypeLabel(value){
            // let eltToFind = labelBag.validityLabelList.value.find((row) => row["Value"]==value)
            // if(eltToFind){
            //     return eltToFind["Description"]
            // }
            if(value >= 0)
                return labelBag.validityLabelList.value[value]['Description']
            else
                return ''
        }

        function displayApprovalModeLabel(value){ 
            if(value >= 0)
                return labelBag.approvalModeLabelList.value[value]['Description']
            else
                return ''
        }

        function displayApprovalStatusLabel(value){ 
            if(value >= 0)
                return labelBag.approvalStatusLabelList.value[value]['Description']
            else
                return ''
        }

        //fonctions pour récupérer le label des champs en lecture seule 
        function getSingleOptionLabel(fieldToGetLabel,fieldToDisplayLabel,value){
            if(!isNaN(Number(value))){
                axios.get(`http://${hostname}:5000/app/getSingleOptionLabel?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabel}&vl=${value}`)
                .then(result => {
                    labelBag[fieldToDisplayLabel].value = result.data.recordset[0][""]
                }).catch(err=>console.log(err))
            }else{
                labelBag[fieldToDisplayLabel].value ='champ inexistant!'
            }
        }

        //fonctions pour récupérer les listes de label
        function getOptionLabelList(fieldToGetLabelList){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                if (fieldToGetLabelList=='[Value Type]')
                    labelBag.requirementValueTypeLabelList.value=result.data.recordset
                    
                if (fieldToGetLabelList=='[Requirement]')
                    labelBag.requirementLevelLabelList.value=result.data.recordset

                if (fieldToGetLabelList=='[Validity]')
                    labelBag.validityLabelList.value=result.data.recordset
                
                if (fieldToGetLabelList=='[Approval Mode]')
                    labelBag.approvalModeLabelList.value=result.data.recordset

                if (fieldToGetLabelList=='[Approval Status]')
                    labelBag.approvalStatusLabelList.value=result.data.recordset
                
                if(fieldToGetLabelList=='[Investigator Opinion]')
                labelBag.optionLabelListForInvestigatorOpinion.value=result.data.recordset

                if(fieldToGetLabelList=='[Analyst Opinion]')
                labelBag.optionLabelListForAnalystOpinion.value=result.data.recordset

                if(fieldToGetLabelList=='[Recovery Opinion]')
                labelBag.optionLabelListForRecoveryOpinion.value=result.data.recordset

                if(fieldToGetLabelList=='[Manager Opinion]')
                labelBag.optionLabelListForManagerOpinion.value=result.data.recordset
                
                if(fieldToGetLabelList=='[Joint Type]')
                labelBag.optionLabelListForJoinType.value=result.data.recordset

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
            creditRequestCardLines.value[index]['No_'] = item['No_']
            creditRequestCardLines.value[index]['Description'] = item['Description']
            creditRequestCardLines.value[index]['Description 2'] = item['Description 2']
            creditRequestCardLines.value[index]['Location Code'] = creditRequestCardHeader.value['Location Code']
            creditRequestCardLines.value[index]['Bin Code'] = creditRequestLocationBinCode.value
            creditRequestCardLines.value[index]['Unit of Measure'] = item['Sales Unit of Measure']
            creditRequestCardLines.value[index]['Shipment Method Code'] = item["Shipment Method"]?item["Shipment Method"]:creditRequestCardHeader.value['Shipment Method Code']
            creditRequestCardLines.value[index]['Prepayment _'] = creditRequestPrepayment.value
            getVATonItem(creditRequestCardHeader.value['VAT Bus_ Posting Group'],item['VAT Prod_ Posting Group'],index,'VAT _')
            itemListDropdownIsActive.value=false
            activeItemLineDropdown.value =-1
            submitCRLineItemPriceRequestOnLine(index)
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
            creditRequestCardLines.value[index]['Location Code'] = location['Code']
            creditRequestCardLines.value[index]['Bin Code'] = location['Default Bin Code']
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
            creditRequestCardLines.value[index]['Bin Code'] = locationBin['Bin Code']
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
            creditRequestCardLines.value[index]['Shipment Method Code'] = shipmentMethod['Code']
            shipmentMethodListDropdownIsActive.value=false
            activeshipmentMethodLineDropdown.value =-1
        }


        //objet contenant les infos de la ligne d'article à insérer
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
            itemVATBusPosGroup:ref(''),
            itemVATProdPosGroup:ref(''),
            itemPriceIsGetting:ref(false),

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

//Gestion du joint
        const creditRequestJoinType = ref(-1)
        const joinTypeHasBeenInitialized = ref(true)
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
                    'Prepayment _':0,
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':''
            })
            //itemInfo.itemLineNo.value=creditRequestCardLines.value.length +1
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
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':''
            })
            //itemInfo.itemLineNo.value=creditRequestCardLines.value.length +1
        }
        function addRowByForm_andContinue(){
            if (itemInfo.itemType.value==2){
                creditRequestCardLines.value.push(
                {
                    'Line No_':creditRequestCardLines.value.length +1,
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
                    'Line Amount':itemInfo.itemQuantity.value * itemInfo.itemUnitPrice.value,
                    'Prepayment _':creditRequestPrepayment.value,
                    'VAT Bus. Posting Group':itemInfo.itemVATBusPosGroup.value,
                    'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
                })
                getVATonItem(creditRequestCardHeader.value['VAT Bus_ Posting Group'],itemInfo.itemVATProdPosGroup.value,creditRequestCardLines.value.length -1,'VAT _')

            }else{
                creditRequestCardLines.value.push(
                {   
                    'Line No_':creditRequestCardLines.value.length +1,
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
                //itemInfo.itemLineNo.value++
            }
            resetForm()
        }
        function addRowByForm_andClose(){
            if (itemInfo.itemType.value==2){
                creditRequestCardLines.value.push(
                {
                    'Line No_':creditRequestCardLines.value.length +1,
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
                    'Line Amount':itemInfo.itemQuantity.value * itemInfo.itemUnitPrice.value,
                    'Prepayment _':creditRequestPrepayment.value,
                    'VAT Bus. Posting Group':itemInfo.itemVATBusPosGroup.value,
                    'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
                })
                getVATonItem(creditRequestCardHeader.value['VAT Bus_ Posting Group'],itemInfo.itemVATProdPosGroup.value,creditRequestCardLines.value.length -1,'VAT _')
            }else{
                creditRequestCardLines.value.push(
                {   
                    'Line No_':creditRequestCardLines.value.length +1,
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
                //itemInfo.itemLineNo.value++
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
            if(creditRequestCardLines.value.length > 0){
                const lineData = ref({}) 
                lineData.value = creditRequestCardLines.value[index]
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
            creditRequestCardLines.value.splice(index,1,{
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
                'Prepayment _':creditRequestPrepayment.value,
                'VAT Bus. Posting Group':creditRequestCardHeader.value['VAT Bus_ Posting Group'],
                'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
            })
            if(itemInfo.itemVATProdPosGroup.value){
                getVATonItem(creditRequestCardHeader.value['VAT Bus_ Posting Group'],itemInfo.itemVATProdPosGroup.value,index,'VAT _')
            }
            resetForm()
        }

//Fonctions spécifiques aux articles
        function getCRLineItemPrice(sqData){
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
        function submitCRLineItemPriceRequest(){
            itemInfo.itemPriceIsGetting.value = true
            const JSData ={
                Parameter:'quotes_item_getPrice',
                itemCode:itemInfo.itemCode.value,
                QuoteNo:creditRequestCardHeader.value["No_"],
                Quantity:itemInfo.itemQuantity.value?itemInfo.itemQuantity.value:0,
                'Variant Code':''
            }
            getCRLineItemPrice(formatToBCJsonData(JSData))
        }
        function getCRLineItemPriceOnLine(index,data){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,data)
            .then(res =>{
                const unitPrice = ref('')
                unitPrice.value = res.data.documentNo
                unitPrice.value = Number(unitPrice.value.split(',').join(''))
                creditRequestCardLines.value[index]['Unit Price'] = unitPrice.value
                creditRequestCardLines.value[index]['Line Amount'] = unitPrice.value * creditRequestCardLines.value[index]['Quantity'] 
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitCRLineItemPriceRequestOnLine(index){
            const JSData ={
                Parameter:'quotes_item_getPrice',
                itemCode:creditRequestCardLines.value[index]["No_"],
                QuoteNo:creditRequestCardHeader.value["No_"],
                Quantity:creditRequestCardLines.value[index]["Quantity"],
                'Variant Code':''
            }
            getCRLineItemPriceOnLine(index,formatToBCJsonData(JSData))
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
                creditRequestLocationBinCode.value = binCode
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

//Propriétés calculés pour les totaux des lignes
        const totalVAT = computed(() => {
            let sum = 0
            creditRequestCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + elt['Line Amount'] * elt['VAT _'] /100
            })
            return sum
        })
        const totalAmountExclVAT = computed(()=> {
            let sum = 0
            creditRequestCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + elt['Line Amount']
            })
            return sum
        })
        
        const totalAmountIncVAT = computed(() => {
            return totalAmountExclVAT.value + totalVAT.value
        })

//Propriétés calculés pour le crédit
//totaux pour les frais de dossier
        // const totalAmountExclVAT_EcxlFees = computed(()=> {
        //     let sum = 0
        //     creditRequestCardLines.value.forEach(elt =>{
        //         if(elt['Type']==2)
        //             if(elt['No_']!==useMirindraGPInfoStore().itemForApplicationFees)
        //                 sum = sum + elt['Line Amount']
        //     })
        //     return sum.toFixed(2)
        // })

        const totalAmountExclVAT_EcxlFees_ExclIN = computed(()=> {
            let sum = 0
            creditRequestCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    if(elt['No_']!==useMirindraGPInfoStore().itemForApplicationFees && elt['No_']!==useMirindraGPInfoStore().itemForInterest)
                        sum = sum + elt['Line Amount']
            })
            return sum
        })

        const totalVAT_EcxlFees_ExclIN = computed(()=> {
            let sum = 0
            creditRequestCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    if(elt['No_']!==useMirindraGPInfoStore().itemForApplicationFees && elt['No_']!==useMirindraGPInfoStore().itemForInterest)
                        sum = sum + elt['Line Amount'] * elt['VAT _'] /100 
            })
            return sum
        })

        const totalAmountIncVAT_EcxlFees_ExclIN = computed(() => {
            return totalAmountExclVAT_EcxlFees_ExclIN.value + totalVAT_EcxlFees_ExclIN.value
        })

        

//totaux pour les frais d'intérêt
        const totalAmountExclVAT_ExclIN = computed(()=> {
            let sum = 0
            creditRequestCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    if(elt['No_']!==useMirindraGPInfoStore().itemForInterest)
                        sum = sum + elt['Line Amount']
            })
            return sum
        })

        const totalVAT_ExclIN = computed(() => {
            let sum = 0
            creditRequestCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    if(elt['No_']!==useMirindraGPInfoStore().itemForInterest)
                        sum = sum + elt['Line Amount'] * elt['VAT _'] /100
            })
            return sum
        })

        const totalAmountIncVAT_ExclIN = computed(() => {
            return totalAmountExclVAT_ExclIN.value + totalVAT_ExclIN.value
        })

        const depositAmount = computed(() =>{
            return totalAmountIncVAT_ExclIN.value * creditRequestCardHeader.value['Prepayment _'] /100
        })

        const chargeableAmount = computed(() =>{
            return totalAmountIncVAT_ExclIN.value - depositAmount.value
        })
  

        const interest = computed(() =>{
            return chargeableAmount.value * useMirindraGPInfoStore().monthlyInterestRate * creditRequestCardHeader.value['Duration (Month)']/100
        })


        


        
        

//Fonctions spécifiques aux articles d'intérêt
        const mirindraGP = useMirindraGPInfoStore()
        const itemInsterestIsAdded = ref(false)
        const itemFeesIsAdded = ref(false)
        function getMirindraGP(){
            if(!useMirindraGPInfoStore().isFilled){
                axios.get(`http://${hostname}:5000/app/getMirindraGP`)
                .then(result =>{
                    useMirindraGPInfoStore().fillMirindraGPInfo(result.data)
                })
                .catch((err)=>console.log(err))
            }
        }
        function getItemFeesInfo(){
            axios.get(`http://${hostname}:5000/app/getItemCard/${useMirindraGPInfoStore().itemForApplicationFees}?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result =>{
                addItemFeesLine(result.data.recordset[0])
            })
            .catch(err => {simulateCredit();console.log(err)})
        }
        function getInterestItemInfo(){
            axios.get(`http://${hostname}:5000/app/getItemCard/${useMirindraGPInfoStore().itemForInterest}?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result =>{
                console.log('mgp',result)
                addInterestItemLine(result.data.recordset[0])
            })
            .catch((err) => {simulateCredit();console.log(err)})
        }

        function addItemFeesLine(data){
            const fees = useMirindraGPInfoStore().applicationFees
            creditRequestCardLines.value.push({
                'Line No_':creditRequestCardLines.value.length+1,
                Type:2,
                No_:useMirindraGPInfoStore().itemForApplicationFees,
                Description:data['Description'],
                'Description 2':'',
                'Variant Code':'',
                'Location Code':'',
                'Bin Code':'',
                'Unit of Measure':data['Sales Unit of Measure'],
                Quantity:fees/100,
                'Shipment Method Code':'',
                'Unit Price':totalAmountExclVAT_EcxlFees_ExclIN.value,
                'VAT _':0,
                'Line Amount': (fees/100) * totalAmountExclVAT_EcxlFees_ExclIN.value,
                'Prepayment _':0,
                //'Prepayment _':creditRequestCardHeader.value['Prepayment _'],
                'VAT Bus. Posting Group':creditRequestCardHeader.value['VAT Bus_ Posting Group'],
                'VAT Prod_ Posting Group':data['VAT Prod_ Posting Group']
            })
            getVATonItem(creditRequestCardHeader.value['VAT Bus_ Posting Group'],data['VAT Prod_ Posting Group'],creditRequestCardLines.value.length-1,'VAT _')
            itemFeesIsAdded.value = true
            if(useMirindraGPInfoStore().itemForInterest && itemInsterestIsAdded.value==false)
                getInterestItemInfo()
            else
                simulateCredit()
        }
        
        function addInterestItemLine(data){
            creditRequestCardLines.value.push({
                'Line No_':creditRequestCardLines.value.length+1,
                Type:2,
                No_:useMirindraGPInfoStore().itemForInterest,
                Description:data['Description'],
                'Description 2':'',
                'Variant Code':'',
                'Location Code':creditRequestCardLines.value[0]['Location Code']?creditRequestCardLines.value[0]['Location Code']:creditRequestCardHeader.value['Location Code'],
                'Bin Code':'',
                'Unit of Measure':data['Sales Unit of Measure'],
                Quantity:1,
                'Shipment Method Code':'',
                'Unit Price':interest,
                'VAT _':0,
                'Line Amount': interest,
                'Prepayment _':0,
                //'Prepayment _':creditRequestCardHeader.value['Prepayment _'],
                'VAT Bus. Posting Group':creditRequestCardHeader.value['VAT Bus_ Posting Group'],
                'VAT Prod_ Posting Group':data['VAT Prod_ Posting Group']
            })
            getVATonItem(creditRequestCardHeader.value['VAT Bus_ Posting Group'],data['VAT Prod_ Posting Group'],creditRequestCardLines.value.length-1,'VAT _')                
            itemInsterestIsAdded.value = true
            simulateCredit()
        }



        function checkItemFeesLine_ItemInterestLineExist(){
            creditRequestCardLines.value.map( line => {
                if(line['No_']==useMirindraGPInfoStore().itemForApplicationFees){
                    line['Unit Price'] = totalAmountExclVAT_EcxlFees_ExclIN.value
                    line['Line Amount'] = line['Quantity'] * totalAmountExclVAT_EcxlFees_ExclIN.value
                    line['Prepayment _'] = 0
                    itemFeesIsAdded.value = true
                }
                if(line['No_']==useMirindraGPInfoStore().itemForInterest){
                    line['Unit Price'] = interest.value
                    line['Line Amount'] = interest.value
                    line['Prepayment _'] = 0
                    itemInsterestIsAdded.value = true
                }
            })
            if(itemFeesIsAdded.value == false){
                if((useMirindraGPInfoStore().applicationFees > 0) && useMirindraGPInfoStore().itemForApplicationFees){
                    getItemFeesInfo()
                }else{
                    if(itemInsterestIsAdded.value == false){
                        if(useMirindraGPInfoStore().itemForInterest){
                            getInterestItemInfo()
                        }else{
                            simulateCredit()
                        }
                    }else{
                        simulateCredit()
                    }
                }
            }else{
                if(itemInsterestIsAdded.value == false){
                    if(useMirindraGPInfoStore().itemForInterest){
                        getInterestItemInfo()
                    }else{
                        simulateCredit()
                    }
                }else{
                    simulateCredit()
                }
            }
            
        }


//Fonctions spécifique à l'acompte et à la durée
        const CRConfirmationPymtUpdateModalShowned = ref(false)
        const creditRequestMaximumDuration = ref(0)
        const creditRequestDuration = ref(0)
        const creditRequestPrepayment = ref(0)
        const creditRequestPrepaymentAmount = ref(0)
        const creditRequestPrepaymentTemp = ref(0)
        const creditRequestRequiredDeposit = ref(0)
        function getPrepaymentInfo(){
            if(creditRequestPrepaymentTemp.value !== creditRequestPrepayment.value){
                if(creditRequestPrepayment.value !== ''){
                    if(creditRequestPrepayment.value > 100){
                        error_message.value = 'La valeur que vous avez saisie est incorrecte'
                        error_message_code.value = 'ERROR_BAD_VALUE'
                    }else{
                        if(creditRequestCardLines.value.length > 0){
                            if( creditRequestCardLines.value.length == 1 && creditRequestCardLines.value[0]['No_']!==useMirindraGPInfoStore().itemForInterest){
                                creditRequestPrepayment.value = Number(creditRequestPrepayment.value).toFixed(2)
                                CRConfirmationPymtUpdateModalShowned.value = true
                            }
                            if( creditRequestCardLines.value.length > 1){
                                creditRequestPrepayment.value = Number(creditRequestPrepayment.value).toFixed(2)
                                CRConfirmationPymtUpdateModalShowned.value = true
                            }
                        }
                    }
                }else{
                    creditRequestPrepayment.value = creditRequestPrepaymentTemp.value
                }
            }
        }
        function getPrepaymentAmountInfo(){
            if(creditRequestPrepaymentAmount.value){
                if(creditRequestPrepaymentAmount.value > totalAmountIncVAT_EcxlFees_ExclIN.value){
                    error_message.value = "Le montant d'acompte ne peut être supérieur au montant de la demande"
                    error_message_code.value = 'ERROR_BAD_VALUE'
                }else{
                    if(totalAmountIncVAT_EcxlFees_ExclIN.value > 0){
                        creditRequestPrepayment.value = Number((creditRequestPrepaymentAmount.value / totalAmountIncVAT_EcxlFees_ExclIN.value) * 100).toFixed(5)
                        CRConfirmationPymtUpdateModalShowned.value = true
                    }else{
                        error_message.value = 'Le montant de la demande ne doit pas être égale à Zero (0)'
                    }
                }
            }else{
                creditRequestPrepaymentAmount.value = 0
            }
        }
        function submitPrepaymentLinesUpdate(){
            creditRequestCardLines.value.map( line => {
                if(line['No_']!==useMirindraGPInfoStore().itemForInterest){
                    line['Prepayment _'] = creditRequestPrepayment.value
                }
            })
            CRConfirmationPymtUpdateModalShowned.value = false
            creditRequestPrepaymentTemp.value = creditRequestPrepayment.value
        }
        function cancelPrepaymentLinesUpdate(){
            CRConfirmationPymtUpdateModalShowned.value = false
            creditRequestPrepayment.value = creditRequestPrepaymentTemp.value
            creditRequestPrepaymentAmount.value = 0
        }
        function getRequiredDeposit(){
            axios.get(`http://${hostname}:5000/app/getMirindraRD?docNo=${creditRequestCardHeader.value['No_']}`)
            .then(result => {
                creditRequestRequiredDeposit.value = result.data?result.data:0
                creditRequestPrepayment.value = creditRequestCardHeader.value['Prepayment _']>creditRequestRequiredDeposit.value?creditRequestCardHeader.value['Prepayment _']:creditRequestRequiredDeposit.value
                creditRequestPrepayment.value = Number(creditRequestPrepayment.value).toFixed(5)
                creditRequestPrepaymentTemp.value = creditRequestPrepayment.value


                if(creditRequestPrepayment.value > 0 &&  totalAmountIncVAT_EcxlFees_ExclIN.value > 0)
                    creditRequestPrepaymentAmount.value = Math.round((creditRequestPrepayment.value * totalAmountIncVAT_EcxlFees_ExclIN.value)/100).toFixed(2)
            })
            .catch(err => console.log(err))
        }
        function getMaximumDuration(){
            axios.get(`http://${hostname}:5000/app/getMirindraDuration?docNo=${creditRequestCardHeader.value['No_']}`)
            .then(result => {
                creditRequestMaximumDuration.value = result.data?result.data:0
            })
            .catch(err => console.log(err))
        }

        // const durationIsOk = computed(()=>{
        //     if(creditRequestDuration.value > creditRequestMaximumDuration.value)
        //         return false
        //     else
        //         return true
        // })

        const depositIsOk = computed(()=>{
            if(creditRequestPrepayment.value < creditRequestRequiredDeposit.value)
                return false
            else
                return true
        })


//Fonctions spécifiques aux décisions

        function getSystemDecision(){
            if(creditRequestCardHeader.value['Installment'] <= creditRequestCardHeader.value['Required Installment'])
                creditRequestCardHeader.value["System Decision"] = 2
            else 
                if(creditRequestCardHeader.value['Installment'] <= creditRequestCardHeader.value['Referred Installment'])
                    creditRequestCardHeader.value["System Decision"] = 3
                else
                    creditRequestCardHeader.value["System Decision"] = 1
        }



//fonctions pour remplir les champs avec via des listes sélectionnables
        function fillItemInfoField(item){
            itemInfo.itemType.value = 2
            itemInfo.itemCode.value = item['No_']
            itemInfo.itemDescription.value = item['Description']
            itemInfo.itemDescription2.value = item['Description 2']
            itemInfo.itemQuantity.value = 1
            //itemInfo.itemLocation.value = creditRequestCardHeader.value["Location Code"]
            itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
            itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:creditRequestCardHeader.value["Shipment Method Code"]
            itemInfo.itemVATProdPosGroup.value = item['VAT Prod_ Posting Group']
            itemInfo.itemVATBusPosGroup.value= creditRequestCardHeader.value['VAT Bus_ Posting Group']
            
            if (!itemInfo.itemLocation.value){
                itemInfo.itemLocation.value = creditRequestCardHeader.value["Location Code"]
                itemInfo.itemBinCode.value = creditRequestLocationBinCode.value
            }
            submitCRLineItemPriceRequest()
            getItemAvailabilityInfo()
        }
        function fillCustomerInfoField(customer){
            if(isJoinCodeToFill.value==true)
                creditRequestCardHeader.value['Joint Code'] = customer['No_']
            else{
                creditRequestCardHeader.value["Sell-to Customer No_"]=customer["No_"]
                creditRequestCardHeader.value["Sell-to Customer Name"]=customer["Name"]
                creditRequestCardHeader.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
                creditRequestCardHeader.value["Payment Method Code"]=customer['Payment Method Code']
                //creditRequestCardHeader.value["Payment Terms Code"]=customer['Payment Terms Code']
                creditRequestCardHeader.value["Prepayment _"]=customer['Prepayment _']
                creditRequestCardHeader.value["Shipment Method Code"]=customer['Shipment Method Code']
            
                //nouveau
                creditRequestCardHeader.value["Customer Posting Group"]=customer['Customer Posting Group']
                creditRequestCardHeader.value["Gen_ Bus_ Posting Group"]=customer['Gen_ Bus_ Posting Group']
                creditRequestCardHeader.value["Customer Template Code"]=''

                
                //nouveau

                creditRequestCardHeader.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
                creditRequestCardHeader.value["Customer Price Group"]=customer['Customer Price Group']
                creditRequestCardHeader.value["Ship-to Code"]=customer['Ship-to Code']
                //creditRequestCardHeader.value["Sales Mode"]=customer['Sales Mode']
                //getCreditRequestRequirementInfo(customer["No_"],1,customer['Customer Type'],customer['Legal Status'],customer['Identification Mode'])
                //getCreditRequestScoringInfo(customer["No_"],1)
            }
        }

        function fillLeadInfoField(lead){
            creditRequestCardHeader.value["Sell-to Customer No_"]=''
            creditRequestCardHeader.value["Sell-to Customer Name"]=lead["Name"]
            creditRequestCardHeader.value["Sell-to Contact No_"]=lead["No_"]
            creditRequestCardHeader.value["Payment Method Code"]=lead['Payment Method Code']?lead['Payment Method Code']:''
            //creditRequestCardHeader.value["Payment Terms Code"]=customer['Payment Terms Code']
            creditRequestCardHeader.value["Prepayment _"]=lead['Prepayment _']?lead['Prepayment _']:0
            creditRequestCardHeader.value["Shipment Method Code"]=lead['Shipment Method Code']?lead['Shipment Method Code']:''
        
            //nouveau
            creditRequestCardHeader.value["Customer Posting Group"]=lead['Customer Posting Group']?lead['Customer Posting Group']:''
            creditRequestCardHeader.value["Gen_ Bus_ Posting Group"]=lead['Gen_ Bus_ Posting Group']?lead['Gen_ Bus_ Posting Group']:''
            creditRequestCardHeader.value["Customer Template Code"]=lead['Customer Template Code']
            //nouveau
    
            creditRequestCardHeader.value["VAT Bus_ Posting Group"]=lead['VAT Bus_ Posting Group']?lead['VAT Bus_ Posting Group']:''
            creditRequestCardHeader.value["Customer Price Group"]=lead['Customer Price Group']?lead['Customer Price Group']:useWebUserInfoStore().defaultUserPriceGroup
            creditRequestCardHeader.value["Ship-to Code"]=lead['Ship-to Code']?lead['Ship-to Code']:''
            //creditRequestCardHeader.value["Sales Mode"]=customer['Sales Mode']
            //getCreditRequestLeadRequirementInfo(lead["No_"],0,lead['Lead Type'],lead['Legal Status'],lead['Identification Mode'])
            //getCreditRequestLeadScoringInfo(lead["No_"],0)
        }

        function fillContactInfoField(contact){
            if(isJoinCodeToFill.value==true)
                creditRequestCardHeader.value['Joint Code']  = contact['No_']
            else{
                creditRequestCardHeader.value["Sell-to Contact No_"]= contact['No_']
            }
        }
        function fillLocationInfoField(location){
            if(isItemInfoToFill.value){
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
                isItemInfoToFill.value=false
            }else{
                creditRequestCardHeader.value["Location Code"]=location["Code"]
                creditRequestLocationBinCode.value = location['Default Bin Code']
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
            }
        }
        function fillAddressInfoField(address){
            creditRequestCardHeader.value["Ship-to Code"]=address["Code"]
        }
        function fillLocationBinInfoField(locationBin){
            itemInfo.itemBinCode.value=locationBin
        }
        function fillCampaignInfoField(campaign){
            creditRequestCardHeader.value["Campaign No_"]=campaign["No_"]
        }
        function fillPriceGroupInfoField(priceGroup){
            creditRequestCardHeader.value['Customer Price Group']= priceGroup['Code']
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
        

//fonctions de récupération des données de la fiche 
        function getCRCardInfo(){
            axios.get(`http://${hostname}:5000/app/getCRCard/${creditRequestCardId}?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result => {
                creditRequestCardHeader.value=result.data[0]
                creditRequestCardLines.value=result.data[1]
                creditRequestCardLines.value.map(row => row['Line No_'] = Number.isInteger(row['Line No_']/10000)?row['Line No_']/10000:row['Line No_'] )
                
                creditRequestRequirement.value=result.data[2]
                creditRequestRequirement.value.map(line => {
                    line['Validity Date'] = getISODate(line['Validity Date']) 
                    line['Valid'] = line['Valid']==1?true:false
                    line['Numeric Value'] = Math.trunc(line['Numeric Value'])
                })

                creditRequestScoring.value=result.data[3]
                creditRequestScoring.value.map(line => {
                    line['Validity Date'] = getISODate(line['Validity Date']) 
                    line['Valid'] = line['Valid']==1?true:false
                })

                creditRequestAmortization.value=result.data[4]

                getApprovalFlow()
                getCreditRequestCardHistoryInfo()
                
                dateInfo.documentDate.value = getISODate(creditRequestCardHeader.value["Document Date"])
                itemInfo.itemLineNo.value = creditRequestCardLines.value.length +1

                // if(creditRequestCardHeader.value['Sell-to Customer No_']){
                //     getCustomerInfo(creditRequestCardHeader.value['Sell-to Customer No_'])
                // }else{
                //     if (creditRequestCardHeader.value['Sell-to Contact No_'])
                //     getLeadInfo(creditRequestCardHeader.value['Sell-to Contact No_'])
                // }

                creditRequestJoinType.value = creditRequestCardHeader.value['Joint Type']

                getRequiredDeposit()
                getMaximumDuration()
                //getCustomerInfo(creditRequestCardHeader.value['Sell-to Customer No_'])
                //getSingleOptionLabel('Approval Status','creditRequestApprovalStatusLabel',creditRequestCardHeader.value["Approval Status"])
                getSingleOptionLabel('System Decision','systemDecisionLabel',creditRequestCardHeader.value["System Decision"])
                getSingleOptionLabel('Investigator Opinion','investigatorOpinionLabel',creditRequestCardHeader.value["Investigator Opinion"])
                getSingleOptionLabel('Analyst Opinion','analystOpinionLabel',creditRequestCardHeader.value["Analyst Opinion"])
                getSingleOptionLabel('Recovery Opinion','recoveryOpinionLabel',creditRequestCardHeader.value["Recovery Opinion"])
                getSingleOptionLabel('Manager Opinion','managerOpinionLabel',creditRequestCardHeader.value["Manager Opinion"])
                getSingleOptionLabel('Joint Type','joinTypeOpinionLabel',creditRequestCardHeader.value["Joint Type"])
                getSingleOptionLabel('Professional Category','professionalCategoryLabel',creditRequestCardHeader.value["Professional Category"])


                
                if(creditRequestCardHeader.value['Location Code']){
                    getItemLocationBinCode(creditRequestCardHeader.value['Location Code'])
                }

                creditRequestDuration.value = creditRequestCardHeader.value['Duration (Month)']



                error_fetching_crl_list.value=''
            }).catch(err=>{
                if(err.response.data){
                    error_fetching_crl_list.value = err.response.data.message
                }
            })
        }


        function getApprovalFlow(){
            axios.get(`http://${hostname}:5000/app/getApprovalFlow?documentNo=${creditRequestCardId}`)
            .then(result => {
                creditRequestApprovalFlow.value=result.data
            })
            .catch(err => console.log(err))
        }

        //fonction de récupération des infos client
        // function getCustomerInfo(customerId){
        //     axios.get(`http://${hostname}:5000/app/getCustomerCard/${customerId}`)
        //     .then(result => {
        //         const customerInfo = result.data.recordset[0]
        //         getCreditRequestRequirementInfo(customerId,1,customerInfo['Customer Type'],customerInfo['Legal Status'],customerInfo['Identification Mode'])
        //         getCreditRequestScoringInfo(customerId,1)
        //     })
        //     .catch()
        // }

        // function getLeadInfo(leadId){
        //     axios.get(`http://${hostname}:5000/app/getLeadCard/${leadId}`)
        //     .then(result => {
        //         const leadInfo = result.data.recordset[0]
        //         getCreditRequestLeadRequirementInfo(leadId,0,leadInfo['Lead Type'],leadInfo['Legal Status'],leadInfo['Identification Mode'])
        //         getCreditRequestLeadScoringInfo(leadId,0)
        //     })
        //     .catch()
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
                QuoteNo:creditRequestCardHeader.value["No_"],
            }
            sendSQrequestForApproval(formatToBCJsonData(JSData))
        }


//Autres appels de fonctions liés auX exigences et scoring

        const weighedPointTotal = computed(()=>{
            let sum = 0
            creditRequestScoring.value.forEach(elt =>{
                sum = sum + elt['Weighed Point']
            })
            return sum
        })

        function getMirindraMaxApprovedRate(){
            axios.get(`http://${hostname}:5000/app/getMirindraMaxApprovedRate?Score=${weighedPointTotal.value}`)
            .then(result => {
                console.log('getMirindraMaxApprovedRate',result.data)
                creditRequestCardHeader.value['Max Approved Rate (%)'] = result.data
            }).catch(err=>console.log(err))
        }

        function getMirindraMaxReferredRate(){
            axios.get(`http://${hostname}:5000/app/getMirindraMaxReferredRate?Score=${weighedPointTotal.value}`)
            .then(result => {
                console.log('getMirindraMaxApprovedRate',result.data)
                creditRequestCardHeader.value['Max Referred Rate (%)'] = result.data
            }).catch(err=>console.log(err))
        }

        watch(weighedPointTotal,()=>{
            if(weighedPointTotal.value){
                getMirindraMaxApprovedRate()
                getMirindraMaxReferredRate()
            }
        })



        function getScoringPoint(index){
            if(!creditRequestScoring.value[index]['Valid'])
                creditRequestScoring.value[index]['Weighed Point'] = creditRequestScoring.value[index]['Point'] * creditRequestScoring.value[index]['Coefficient']
            else
                creditRequestScoring.value[index]['Weighed Point'] = 0
        }
        // function getCreditRequestRequirementInfo(customerId,accountType,customerType,legalStatus,identificationMode){
        //     axios.get(`http://${hostname}:5000/app/getCURList?customerId=${customerId}&accountType=${accountType}&customerType=${customerType}&legalStatus=${legalStatus}&identificationMode=${identificationMode}`)
        //     .then(result => {
        //         creditRequestRequirement.value = result.data
        //         creditRequestRequirement.value.map(line => {
        //             line['Validity Date'] = getISODate(line['Validity Date']) 
        //             line['Valid'] = line['Valid']==1?true:false
        //             line['Numeric Value'] = Math.trunc(line['Numeric Value'])
        //         })
        //         getOptionLabelList('[Value Type]')
        //         getOptionLabelList('[Requirement]')
        //     }).catch(()=>{
        //         creditRequestRequirement.value = []
        //     })
        // }
        // function getCreditRequestScoringInfo(customerId,accountType){
        //     axios.get(`http://${hostname}:5000/app/getCUSList?customerId=${customerId}&accountType=${accountType}&salesMode=${creditRequestCardHeader.value['Sales Mode']}`)
        //     .then(result => {
        //         creditRequestScoring.value = result.data
        //         creditRequestScoring.value.map(line => {
        //             line['Validity Date'] = getISODate(line['Validity Date']) 
        //             line['Valid'] = line['Valid']==1?true:false
        //         })
        //         getOptionLabelList('[Validity]')
        //     }).catch(()=>{
        //         creditRequestScoring.value = []
        //     })
        // }

        // function getCreditRequestLeadRequirementInfo(leadId,accountType,leadType,legalStatus,identificationMode){
        //     axios.get(`http://${hostname}:5000/app/getLERList?leadId=${leadId}&accountType=${accountType}&customerType=${leadType}&legalStatus=${legalStatus}&identificationMode=${identificationMode}`)
        //     .then(result => {
        //         creditRequestRequirement.value = result.data
        //         creditRequestRequirement.value.map(line => {
        //             line['Validity Date'] = getISODate(line['Validity Date']) 
        //             line['Valid'] = line['Valid']==1?true:false
        //         })
        //         getOptionLabelList('[Value Type]')
        //         getOptionLabelList('[Requirement]')
        //     }).catch(()=>{
        //         creditRequestRequirement.value = []
        //     })
        // }
        // function getCreditRequestLeadScoringInfo(leadId,accountType){
        //     axios.get(`http://${hostname}:5000/app/getLESList?leadId=${leadId}&accountType=${accountType}&salesMode=${creditRequestCardHeader.value['Sales Mode']}`)
        //     .then(result => {
        //         creditRequestScoring.value = result.data
        //         creditRequestScoring.value.map(line => {
        //             line['Validity Date'] = getISODate(line['Validity Date']) 
        //             line['Valid'] = line['Valid']==1?true:false
        //         })
        //         getOptionLabelList('[Validity]')
        //     }).catch(()=>{
        //         creditRequestScoring.value = []
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
            creditRequestScoring.value[index]['List Value']= criteria.Value;
            creditRequestScoring.value[index]['Value Description']= criteria.Description;
            creditRequestScoring.value[index]['Point']= criteria.Point;
            criteriaValueDropdownIsActive.value=false
            activeCriteriaValueDropdown.value =-1
        }

//Autres appels de fonctions 
        function simulateCredit(){
            axios.get(`http://${hostname}:5000/app/getAmortization?docNo=${creditRequestCardHeader.value['No_']}&duration=${creditRequestCardHeader.value['Duration (Month)']}&loanAmount=${creditRequestCardHeader.value['Loan Amount']}&installment=${creditRequestCardHeader.value['Installment']}&finalInstallment=${creditRequestCardHeader.value['Final installment']}&interestInclVAT=${creditRequestCardHeader.value['Interest including VAT']}`)
            .then(result => {
                creditRequestAmortization.value = result.data
                submitForm()
            })
            .catch(err => {
                console.log(err)
                submitForm()
            })
        }
        function getCreditRequestCardHistoryInfo(){
            axios.get(`http://${hostname}:5000/app/getCUHList?customerId=${creditRequestCardHeader.value['Sell-to Customer No_']}`)
            .then(result => {
                creditRequestCardHistory.value = result.data

            }).catch(err=>console.log(err))
        }

        


//fonctions pour convertir la demande en commande
        function convertcreditRequest(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res =>{
                is_convertCR_success.value=true
                submitting_message.value=''
                success_message.value='Conversion réussie, vous serez redirigé dans un instant'
                error_message.value=''
                setTimeout(()=> router.push(`/saleOrderCard/${res.data.documentNo}`),3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        // const leadCardApprovalStatus = ref('')
        // const leadCardInfo = ref({})

        // function getLeadCardInfo(){
        //     if(creditRequestCardHeader.value['Sell-to Customer No_']==''){

        //         axios.get(`http://${hostname}:5000/app/getleadCard/${creditRequestCardHeader.value['Sell-to Contact No_']}`)
        //         .then(result => {
        //             leadCardInfo.value = result.data.recordset[0]
        //             leadCardApprovalStatus.value = leadCardInfo.value['Approval Status']
        //             if(leadCardApprovalStatus.value == 8){
        //                 submitConvertcreditRequest()
        //             }else{
        //                 error_message.value = 'Conversion refusée! Vous devez valider le prospect'
        //             }
        //         })
        //         .catch(err=> {
        //             error_message.value = "Une erreur s'est produite" 
        //             console.log(err)
        //         })
        //     }else{
        //         submitConvertcreditRequest()
        //     }

        // }



        function submitConvertcreditRequest(){
            submitting_message.value='Conversion de la demande de crédit en cours'
            const JSData ={
                Parameter:'quotes_makeorder',
                webUserName:useWebUserInfoStore().name,
                QuoteNo:creditRequestCardHeader.value["No_"],
            }
            convertcreditRequest(formatToBCJsonData(JSData))
        }


//fonctions pour rejeter la demande de crédit
        const reasonForRejection = ref('')
        function rejectcreditRequest(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(() =>{
                //is_convertCR_success.value=true
                submitting_message.value=''
                success_message.value='La demande a été rejetée'
                error_message.value=''
                setTimeout(()=> {
                    useNavigationTabStore().setActiveGroup('sales')
                    useNavigationTabStore().setActiveTab('creditRequests')
                    router.push('/')
                },2000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitRejectcreditRequest(){
            submitting_message.value='Rejet de la demande de crédit en cours'
            const JSData ={
                Parameter:'creditRequests_reject',
                webUserName:useWebUserInfoStore().name,
                'No_':creditRequestCardHeader.value["No_"],
                'reason for rejection':reasonForRejection.value
            }
            rejectcreditRequest(formatToBCJsonData(JSData))
        }


        //fonction pour soumettre la modification du statut de la fiche
        function submitStatusUpdate(id){
            submitting_message.value='Transmission en cours'
            updateCreditRequestStatus(id)
        }
        //fonction qui envoie les données à l'API et réceptionne et affiche le nouveau statut du prospect
        function updateCreditRequestStatus(id){
            if(id==1){
                axios.get(`http://${hostname}:5000/app/getCreditRequestNewStatus?creditRequestId=${creditRequestCardHeader.value['No_']}&creditRequestStatus=${creditRequestCardHeader.value['Approval Status']}&languageId=${useWebUserInfoStore().defaultLanguage}`)
                .then(res => {
                    submitting_message.value=''
                    if(res.data[0].Value <= 0){
                        error_message.value=res.data[0].Label
                        error_message_code.value=res.data[0].Value
                    }else{
                        if(creditRequestCardHeader.value['Approval Status'] !== res.data[0].Value){
                            addApprovalFlowLine(creditRequestCardHeader.value['Approval Status'],res.data[0].Value)
                            creditRequestCardHeader.value['Approval Status']= res.data[0].Value
                            //labelBag.creditRequestApprovalStatusLabel.value = res.data[0].Label
                            success_transmission.value= 'Nouveau statut: '+res.data[0].Label +', veuillez svp enregistrer la page'
                            setTimeout(()=>success_transmission.value='',3000)
                        }
                    }
                })
                .catch((err) => {
                    displayErrorMessage(err)
                })
            }
            if(id==2){
                addApprovalFlowLine(creditRequestCardHeader.value['Approval Status'],8)
                creditRequestCardHeader.value['Approval Status']= 8
                //labelBag.creditRequestApprovalStatusLabel.value = "Validé"
                submitting_message.value=''
                success_transmission.value= 'Nouveau statut: Validé, veuillez svp enregistrer la page'
                setTimeout(()=>success_transmission.value='',5000)
            }
            if(id==3){
                addApprovalFlowLine(creditRequestCardHeader.value['Approval Status'],7)
                creditRequestCardHeader.value['Approval Status']= 7
                //labelBag.creditRequestApprovalStatusLabel.value = "Validé sous conditions"
                submitting_message.value=''
                success_transmission.value= 'Nouveau statut: Validé sous conditions, veuillez svp enregistrer la page'
                setTimeout(()=>success_transmission.value='',5000)
            }
        }


        //fonction pour ajouter un ligne flux approbation
        function addApprovalFlowLine(actualStatus,nextStatus){
            let comment = ''
            switch (actualStatus) {
                case 2:
                    comment = creditRequestCardHeader.value['Analyst comments']
                    break;
                case 3:
                    comment = creditRequestCardHeader.value['Investigator comments']
                    break;
                case 4:
                    comment = creditRequestCardHeader.value['Recovery comments']
                    break;
                case 5:
                    comment = creditRequestCardHeader.value['Manager comments']
                    break;
                default:
                    comment = ''
            }

            creditRequestApprovalFlow.value.push({
                'Document Type':0,
                'Document No_':creditRequestCardId,
                'Approval Sequence':creditRequestApprovalFlow.value.length+1,
                'Approval Mode':0,
                'Approved On':new Date().toISOString(),
                'Approved by':useWebUserInfoStore().name,
                'Approved as':useWebUserInfoStore().name,
                'Actual Status':actualStatus,
                'Next Status':nextStatus,
                'Comments':comment,
            })
        }


        //fonction pour mettre à jour le % acompte sur les lignes



//fonctions de contrôle
        function controlBeforeSubmit(){
            submitting_message.value='Enregistrement en cours'
            // if(!durationIsOk.value){
            //     error_message.value = 'La durée du crédit ne doit pas dépasser la durée maximale autorisée'
            //     submitting_message.value = ''
            //     return -1
            // }

            if(!depositIsOk.value){
                error_message.value = 'Le % acompte ne doit pas être inférieur au % acompte exigé'
                submitting_message.value = ''
                return -1
            }

            if(creditRequestCardHeader.value['Approval Status']!=12 && creditRequestCardHeader.value['Approval Status']>1){
                getSystemDecision()
            }

            if(totalAmountExclVAT.value > 0){
                checkItemFeesLine_ItemInterestLineExist()
            }
            else{

                simulateCredit()
            }    
        }


//fonctions pour mettre à jour le document
        function updatecreditRequest(sqData){
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
            creditRequestRequirement.value.map( elt => {
                elt['Valid']=elt['Valid']==true?1:0
                elt['Validity Date'] = elt['Validity Date']?elt['Validity Date']:'1753-01-01T00:00:00.000Z'
                elt['Numeric Value'] = elt['Numeric Value']==''?0:elt['Numeric Value']
            })

            creditRequestScoring.value.map( elt => {
                elt['Valid']=elt['Valid']==true?1:0
                elt['Validity Date'] = elt['Validity Date']?elt['Validity Date']:'1753-01-01T00:00:00.000Z'
            })

            const JSData = {
                Parameter:'creditRequests_modify',
                webUserName:useWebUserInfoStore().name,
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
                saleQuoteValidUntilDate:creditRequestCardHeader.value['Quote Valid Until Date'],
                saleQuoteShipRequestedDate:creditRequestCardHeader.value['Requested Delivery Date'], 
                saleQuotePromisedDeliveryDate:creditRequestCardHeader.value['Promised Delivery Date'], 
                saleQuotePaymentMethodCode:creditRequestCardHeader.value["Payment Method Code"], 
                saleQuotePaymentTermsCode:creditRequestCardHeader.value["Payment Terms Code"],
                saleQuotePrepayment:creditRequestPrepayment.value, 
                saleQuoteCustomerShipToCode:creditRequestCardHeader.value["Ship-to Code"]?creditRequestCardHeader.value["Ship-to Code"]:'', 
                saleQuoteShipmentMethodCode:creditRequestCardHeader.value["Shipment Method Code"],
                'Customer Template Code':creditRequestCardHeader.value["Customer Template Code"],
                'Approval Status':creditRequestCardHeader.value['Approval Status'],
                'Eligible Amount':creditRequestCardHeader.value['Eligible Amount'],
                'Interest rate':creditRequestCardHeader.value['Interest rate'],
                'Duration (Month)':creditRequestDuration.value,
                'Required Deposit':creditRequestRequiredDeposit.value,
                'Deposit Amount':creditRequestCardHeader.value['Deposit Amount'],
                'Chargeable Amount':creditRequestCardHeader.value['Chargeable Amount'],
                'Interest':creditRequestCardHeader.value['Interest'],
                'VAT on Interest':creditRequestCardHeader.value['VAT on Interest'],
                'Interest including VAT':creditRequestCardHeader.value['Interest including VAT'],
                'Loan Amount':creditRequestCardHeader.value['Loan Amount'],
                'Total agreement':creditRequestCardHeader.value['Total agreement'],
                'Installment' : creditRequestCardHeader.value['Installment'],
                'Final installment':creditRequestCardHeader.value['Final installment'],
                'System Decision':creditRequestCardHeader.value['System Decision'],
                
                'Investigator Opinion':creditRequestCardHeader.value['Investigator Opinion'],
                'Investigator comments':creditRequestCardHeader.value['Investigator comments'],
                
                'Analyst Opinion':creditRequestCardHeader.value['Analyst Opinion'],
                'Analyst comments':creditRequestCardHeader.value['Analyst comments'],

                'Recovery Opinion':creditRequestCardHeader.value['Recovery Opinion'],
                'Recovery comments':creditRequestCardHeader.value['Recovery comments'],

                'Manager Opinion':creditRequestCardHeader.value['Manager Opinion'],
                'Manager comments':creditRequestCardHeader.value['Manager comments'],

                //nouveau
                'Joint Type':creditRequestJoinType.value,
                'Joint Code':creditRequestCardHeader.value['Joint Code'],
                //nouveau

                //nouveau
                'Monthly Capacity':creditRequestCardHeader.value['Monthly Capacity'],
                'Max Approved Rate (%)':creditRequestCardHeader.value['Max Approved Rate (%)'],
                'Max Referred Rate (%)':creditRequestCardHeader.value['Max Referred Rate (%)'],
                'Joint Required':creditRequestCardHeader.value['Joint Required'],
                'Rec. Amount':creditRequestCardHeader.value['Rec. Amount'],
                'Rec. Duration':creditRequestCardHeader.value['Rec. Duration'],
                'Rec. Deposit (%)':creditRequestCardHeader.value['Rec. Deposit (%)'],

                'General Comment':creditRequestCardHeader.value['General comment'],
                //nouveau


                saleQuoteLines:[
                    ...creditRequestCardLines.value
                ],
                CustomerRequirement:[
                    ...creditRequestRequirement.value
                ],
                CustomerScoring:[
                    ...creditRequestScoring.value
                ],
                CreditAmortization:[
                    ...creditRequestAmortization.value
                ],
                saleQuoteApprovalFlow:[
                    ...creditRequestApprovalFlow.value
                ]
            }
            updatecreditRequest(formatToBCJsonData(JSData))
        }
        
        

//fonctions de formattage
        function getISODate(date){
            if(date){
                if(new String(date).includes('1753'))
                    return ''
                else
                    return new Date(date).toISOString().split('T')[0]
            }else return ''
        }
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }
        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits:2 }).format(number)
            }else{
                return 0
            }
        }
        function formatAmount3Decimal(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2 }).format(number)
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
        onMounted(()=>{
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }                
            userCanChangePriceGroup.value = useWebUserInfoStore().canChangePriceGroup

            getCRCardInfo()
            getUserItemList()
            getUserLocationList()
            getShipmentMethodList()
            getOptionLabelList('[Investigator Opinion]')
            getOptionLabelList('[Analyst Opinion]')
            getOptionLabelList('[Recovery Opinion]')
            getOptionLabelList('[Manager Opinion]')
            getOptionLabelList('[Joint Type]')

            getOptionLabelList('[Value Type]')
            getOptionLabelList('[Requirement]')
            getOptionLabelList('[Validity]')
            getOptionLabelList('[Approval Mode]')
            getOptionLabelList('[Approval Status]')
            
            getMirindraGP()

        })
        watch(success_message, () => {
            readOnlyModeIsDisabled.value=false
            getCRCardInfo()
            transmitBtnIsDisabled.value=false
        })
        watch(lineHasBeenDeleted, () => {
            if(lineHasBeenDeleted.value){
                let i = 1
                creditRequestCardLines.value.map(row => row['Line No_'] = i++)
                lineHasBeenDeleted.value =false
            }
        })
        // watch(creditRequestPrepayment, ()=> {
        //     if(creditRequestCardLines.value.length > 0){
        //         if( creditRequestCardLines.value.length == 1 && creditRequestCardLines.value[0]['No_']!==useMirindraGPInfoStore().itemForInterest){
        //             CRConfirmationPymtUpdateModalShowned.value = true
        //         }
        //         if( creditRequestCardLines.value.length > 1){
        //             CRConfirmationPymtUpdateModalShowned.value = true
        //         }

        //     }
        // })
        watch(success_transmission, () => {
            if(success_transmission.value){
                readOnlyModeIsDisabled.value=true
                transmitBtnIsDisabled.value=true
            }
        })
        watch(creditRequestJoinType,() =>{
            if(joinTypeHasBeenInitialized.value)
                joinTypeHasBeenInitialized.value = false
            else
                creditRequestCardHeader.value['Joint Code']=''
        })
        function displayErrorMessage(errorObject){
            submitting_message.value=''

            if (CRConfirmationModalShowned.value){
                CRConfirmationModalShowned.value=false
            }
            if (customerHistoyModalShowned.value){
                customerHistoyModalShowned.value=false
            }
            if (CRConfirmationRejectionModalShowned.value){
                CRConfirmationRejectionModalShowned.value=false
            }
            if (CRConfirmationPymtUpdateModalShowned.value){
                CRConfirmationPymtUpdateModalShowned.value=false
            }
            if(errorObject.response && errorObject.response.status){
                switch (errorObject.response.status){
                    case 401: 
                        error_message.value= errorObject.response.data.message;break;
                    case 400:
                        error_message.value= errorObject.response.data.error.message
                        error_message_code.value= errorObject.response.data.error.code;break;
                    case 404:
                        error_message.value=errorObject.response.data.error.message
                        error_message_code.value= errorObject.response.data.error.code;break;
                    default:
                        error_message.value=errorObject.response
                }
            }
            else{
                error_message.value = errorObject.message
                error_message_code.value = errorObject.code
            }
        }

        

        


       

        

        

  

        // expose to template and other options API hooks
        return {
            isItemInfoToFill,hostname,
            creditRequestCardHeader,creditRequestCardLines,creditRequestApprovalFlow,
            creditRequestScoring,creditRequestAmortization,creditRequestRequirement,creditRequestCardHistory,
            readOnlyModeIsDisabled,setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,
            ...labelBag,displayValueTypeLabel,displayRequirementLevelLabel,displayValidityTypeLabel,displayApprovalModeLabel,displayApprovalStatusLabel,
            ...dateInfo,
            ...itemInfo,
            ...itemAvailabilityInfo,
            fillCustomerInfoField,fillLeadInfoField,fillContactInfoField,fillLocationInfoField,fillLocationBinInfoField,fillAddressInfoField,
            fillCampaignInfoField,fillPaymentMethodInfoField,fillShipmentMethodInfoField,fillItemInfoField,fillPriceGroupInfoField,
            fillCriteriaValue,getCriteriaValueList,criteriaValueDropdownIsActive,activeCriteriaValueDropdown,scoringCriteriaValueList,
            addEmptyRow,addCommentRow,addRowByForm_andContinue,addRowByForm_andClose,resetForm,editRowByForm,
            submitForm,controlBeforeSubmit,
            submitConvertcreditRequest,CRConfirmationModalShowned,
            submitRejectcreditRequest,CRConfirmationRejectionModalShowned,reasonForRejection,
            submitSQrequestForApproval,submitCRLineItemPriceRequest,submitCRLineItemPriceRequestOnLine,
            error_message,error_message_code,success_message,submitting_message,
            lineHasBeenDeleted,getLineDataToEdit,getItemAvailabilityInfo,
            simulateCredit,
            transmitBtnIsDisabled,success_transmission,submitStatusUpdate,
            totalVAT,totalAmountExclVAT,totalAmountIncVAT,
            itemListDropdownIsActive,activeItemLineDropdown,userItemList,fillLineByItemCode,
            locationListDropdownIsActive,activeLocationLineDropdown,userLocationList,fillLineByLocationCode,
            locationBinListDropdownIsActive,activeLocationBinLineDropdown,userLocationBinList,fillLineByLocationBinCode,getUserLocationBinList,
            shipmentMethodListDropdownIsActive,activeshipmentMethodLineDropdown,shipmentMethodList,fillLineByShipmentMethodCode,
            newContactModalShowned,newAddressModalShowned,
            formatAmount,formatAmount3Decimal,
            mirindraGP,
            isJoinCodeToFill,creditRequestJoinType,
            docCanBeModified,scoring_RequirementCanBeVisible,docHasBeenValidated,
            getScoringPoint,weighedPointTotal,
            creditRequestMaximumDuration,creditRequestDuration,creditRequestRequiredDeposit,creditRequestPrepayment,creditRequestPrepaymentAmount,
            getPrepaymentInfo,getPrepaymentAmountInfo,submitPrepaymentLinesUpdate,cancelPrepaymentLinesUpdate,CRConfirmationPymtUpdateModalShowned,
            userCanChangePriceGroup,
            customerHistoyModalShowned,
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

            expandedOrCollapsedBtn:'',

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:false,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,
            onglet6_expanded:true,
            onglet7_expanded:true,
            onglet8_expanded:false,
            onglet9_expanded:false,
            onglet10_expanded:false,
            onglet11_expanded:false,

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

            fileToUpload:'',
            fileNameToUpload:'',

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
            useNavigationTabStore().setActiveTab('creditRequests')
            this.$router.push('/')
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
        showPrintcreditRequestLayout(){
            this.reportViewerShowned = true
        },
        showPrintVisitLayout(){
            if (this.creditRequestCardHeader['Approval Status'] >= 2)
                this.reportViewerShowned1 = true
        },
        showPrintComityLayout(){
            if (this.creditRequestCardHeader['Approval Status'] >= 2)
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
            if (this.creditRequestCardHeader["Location Code"]){
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
                if(this.creditRequestCardLines[this.selectedLine]['No_']!==useMirindraGPInfoStore().itemForApplicationFees 
                    && this.creditRequestCardLines[this.selectedLine]['No_']!==useMirindraGPInfoStore().itemForInterest){
                        this.getLineDataToEdit(this.selectedLine)
                        this.editItemModalShowned = true
                    }
                if(this.creditRequestCardLines[this.selectedLine]['Type']==2){
                    this.getItemAvailabilityInfo()
                }
            }  
        },
        closeEditItemModal(){
            this.editItemModalShowned=false
            this.resetForm()
        },
        showConvertCRConfirmationModal(){
            this.CRConfirmationModalShowned = true
        },
        showCustomerHistoryModal(){
            this.customerHistoyModalShowned = true
        },
        showRejectCRConfirmationModal(){
            this.CRConfirmationRejectionModalShowned = true
        },
        showPymtUpdateCRConfirmationModal(){
            this.CRConfirmationPymtUpdateModalShowned = true
        },
        expand(id){
            const myElt=document.getElementById(id);
            if ( id=='amortissement_content' || id=='scoring_content' || id=='approval_flow_content' || id=='requirements_content') myElt.style.maxHeight='400px'
            else if (id=='line_content') myElt.style.maxHeight='350px'
            else if (id=='general_content') myElt.style.maxHeight='3000px'
                else myElt.style.maxHeight='500px'
        },
        showItemAvaibilityInfoModal(){
            this.inventoryAvailabilityModalShowned = true
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
                this.creditRequestCardLines[parentId][parentAttri] = value
                this.creditRequestCardLines[parentId]["Line Amount"] = value * Math.trunc(Number(this.creditRequestCardLines[parentId]["Unit Price"]))
                this.submitCRLineItemPriceRequestOnLine(parentId)
            }
            else{
                this.creditRequestCardLines[parentId][parentAttri] = value
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
                if(this.creditRequestCardLines[this.selectedLine]['No_']!==useMirindraGPInfoStore().itemForApplicationFees
                    && this.creditRequestCardLines[this.selectedLine]['No_']!==useMirindraGPInfoStore().itemForInterest){
                        this.creditRequestCardLines.splice(this.selectedLine,1)
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

        getFile(id){
            document.getElementById(id).click()
        },
        loadFile(e){
            this.fileToUpload = e.target.files[0]
            if(this.fileToUpload.size > 0)
                this.fileNameToUpload= this.fileToUpload.name
        },
        uploadFile(e,criteriaNo,tab,index){
            this.loadFile(e)

            const DocumentDetail = {
                accountType:this.creditRequestCardHeader['Sell-to Customer No_']?'Customer':'Lead',
                accountNo:this.creditRequestCardHeader['Sell-to Customer No_']?this.creditRequestCardHeader['Sell-to Customer No_']:this.creditRequestCardHeader['Sell-to Contact No_'],
                criteriaNo:criteriaNo
            }
            let formData = new FormData();
            formData.append('file', this.fileToUpload);
            formData.append('document', JSON.stringify(DocumentDetail));

            axios.post(`http://${this.hostname}:5000/app/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                } 
            ).then(
                (resp)=> {
                    console.log(resp)
                    if(tab=='scoring')
                        this.creditRequestScoring[index]['Document Link']=resp.data

                    if(tab=='requirement')
                        this.creditRequestRequirement[index]['Document Link']=resp.data
            })
            .catch(
                ()=>console.log('non ok')
            )
        },
        deleteFileFromLine(index,tab,link){
            axios.get(`http://${this.hostname}:5000/app/deleteFile?link=${link}`)
            .then(()=>{
                if(tab=='scoring')
                    this.creditRequestScoring[index]['Document Link']=''
                if(tab=='requirement')
                    this.creditRequestRequirement[index]['Document Link']=''
            })
            .catch(err => {
                this.error_message = err + ".  L'action s'est terminé par un échec. peutêtre le fichier a été supprimé ou déplacé. Veuillez contacter votre administrateur si celà persiste"
                if(tab=='scoring')
                    this.creditRequestScoring[index]['Document Link']=''
                if(tab=='requirement')
                    this.creditRequestRequirement[index]['Document Link']=''
            })
        }
    },
   
}

</script>
<style scoped>
.customer-info,prospect-info{
    max-width: v-bind(creditRequestInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#line_content,#credit_content,#international_content,#prepayment_content,#scoring_content,#amortissement_content,#requirements_content{
    max-height: 3000px;
    overflow: hidden;
    transition: max-height 0.5s
}

#credit_details_content,#conditions_content,#comment-details_content,#approval_flow_content,#history_content{
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

.has-background-orange1{
    background-color: orange
}

.has-background-orange-light{
    background-color: rgba(255, 155, 118, 0.332);
}

.has-background-orangered{
    background-color: rgba(255, 68, 0, 0.856);
}

.hover{
    background-color: rgba(255, 68, 0, 0.856);
}
.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 9;
}

div[contenteditable="true"]:focus {
    outline: none; /* Remove the default focus outline */
    border: 2px solid rgba(255, 89, 0, 0.437); /* Add your desired border style */
    background-color: #f9f9f9; /* Change the background color */
    /* Add any other styles you want */
}

.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: 0px; /* table head will be placed from the top of the table and sticks to it */
    z-index: 3000;
}


</style>


