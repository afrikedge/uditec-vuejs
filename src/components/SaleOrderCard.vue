<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <s-o-card-Header :soNo="saleOrderCardHeader['No_']" :soDesc="saleOrderCardHeader['Sell-to Customer Name']" pageTitle="Commande vente"
                @onGoingBackToList='goBackToList'>
                </s-o-card-Header>
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <s-o-card-ribbon
            routeForNewCard="../NewSaleOrder"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="controlBeforeUpdate"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @onPrintingCard="showPrintsaleOrderLayout"
            @onReopeningDocument="sendReopeningDocRequest"
            @onCreatingCustomerContactCard="this.$router.push('/newContact')"
            @onCreatingCustomerAddressCard="showAddressCreationModal"
            @onCheckingItemAvailability="showItemAvaibilityInfoModal"
            @onProcessingCard="submitSORequestForProcess"
            @onSubmittingDiscountRequest="submitDiscountRequest"
            @onSubmittingSOUnlockingRequest="SubmitSOUnlockingRequest"
            componentWithCompInfo="orderCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :printCardBtnIsDisabled="false"
            :convertQuoteBtnIsDisabled="true"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="false"
            :requestForApprovalBtnIsDisabled="true"
            :reopenBtnIsDisabled="false"
            :processCardBtnIsDisabled="false"
            :documentStatus="saleOrderCardHeader['Status']"
            :newContactBtnIsDisabled="false"
            :newShipToAddressBtnIsDisabled="false"
            :checkItemAvailabilityBtnIsDisabled="false"
            :unlockingRequestBtnIsDisabled="saleOrderCardHeader['Processing Status']!==2"
            :paymentRequestBtnIsDisabled="true"
            :discountRequestBtnIsDisabled="saleOrderCardHeader['Processing Status']!==0 || saleOrderCardHeader['Approval Status']!==0"
            ></s-o-card-ribbon>



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
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet1_expanded">Afficher plus</div>
                            <div class="column py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3">{{ saleOrderCardHeader['Sell-to Customer Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ saleOrderCardHeader['Sell-to Contact No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ formatDate(saleOrderCardHeader['Document Date']) }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Code client" :valueInputText="saleOrderCardHeader['Sell-to Customer No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code client" v-model="saleOrderCardHeader['Sell-to Customer No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select>
                                
                                <input-text labelInputText="Nom du client" v-model="saleOrderCardHeader['Sell-to Customer Name']" :valueInputText="saleOrderCardHeader['Sell-to Customer Name']" :is_disabled="!readOnlyModeIsDisabled" :is_readOnly="true"></input-text>
                                
                                <input-text labelInputText="Code Contact"  :valueInputText="saleOrderCardHeader['Sell-to Contact No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code Contact" v-model="saleOrderCardHeader['Sell-to Contact No_']" @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>
                                                                
                                <input-text labelInputText="Code promo" :valueInputText="saleOrderCardHeader['Campaign No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code promo" v-model="saleOrderCardHeader['Campaign No_']" @openModal="activeModalForSelectableElementList='campaignList'" v-else></input-select>
                                
                                <input-text labelInputText="Code magasin" :valueInputText="saleOrderCardHeader['Location Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code magasin" v-model="saleOrderCardHeader['Location Code']" @openModal="activeModalForSelectableElementList='locationList'" v-else></input-select>
                                
                                <input-text labelInputText="Mode livraison" :valueInputText="saleOrderCardHeader['Shipment Method Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode livraison" v-model="saleOrderCardHeader['Shipment Method Code']" @openModal="activeModalForSelectableElementList='shipmentMethodList'" v-else></input-select>
                                
                                <input-text labelInputText="Adresse de livraison" :valueInputText="saleOrderCardHeader['Ship-to Code']"  :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Adresse de livraison" v-model="saleOrderCardHeader['Ship-to Code']"  @openModal="activeModalForSelectableElementList='addressList'" v-else></input-select>
                            
                                <input-text labelInputText="Mode de règlement" :valueInputText="saleOrderCardHeader['Payment Method Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de règlement" v-model="saleOrderCardHeader['Payment Method Code']" @openModal="activeModalForSelectableElementList='paymentMethodList'" v-else></input-select>
                                
                                <input-number labelInputText="% Remise demandé" v-model="saleOrderDiscount"  v-if="saleOrderCardHeader['Processing Status']==0 && saleOrderCardHeader['Approval Status']==0"></input-number>

                            </div>
                            <div class="column">
                                <input-date labelInputText="Date de la commande" v-model="documentDate" :valueInputText="formatDate(saleOrderCardHeader['Document Date'])" :is_disabled="!readOnlyModeIsDisabled"></input-date>
                                                                                                
                                <input-date labelInputText="Date livraison demandée" v-model="shipRequestedDate" :valueInputText="formatDate(saleOrderCardHeader['Requested Delivery Date'])" :is_disabled="!readOnlyModeIsDisabled" ></input-date>
                                
                                <input-date labelInputText="Date livraison promise" v-model="promisedDeliveryDate" :valueInputText="formatDate(saleOrderCardHeader['Promised Delivery Date'])" :is_disabled="!readOnlyModeIsDisabled"></input-date>
                                
                                <input-date labelInputText="Date d'échéance" v-model="DueDate" :valueInputText="formatDate(saleOrderCardHeader['Due Date'])" :is_disabled="true"></input-date>
                                
                                <input-text labelInputText="Numéro Contrat AGP" :valueInputText="saleOrderCardHeader['Contract No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Numéro Contrat AGP" v-model="saleOrderCardHeader['Contract No_']" @openModal="activeModalForSelectableElementList='contractList'" v-else></input-select>
                                
                                <!---input-text labelInputText="Statut" inputTextColor="has-text-primary" inputTextWeight="has-text-weight-bold" :valueInputText="saleOrderCardHeader['Status']==0?'Ouvert':saleOrderCardHeader['Status']==1?'Lancé':'Approbaion en attente'" :is_disabled="true"></input-text--->
                                
                                <input-number labelInputText="Durée du contrat" :valueInputText="saleOrderCardHeader['Duration (Month)']" :is_disabled="true"></input-number>
                                                                
                                <input-text labelInputText="Statut de traitement" inputTextColor="has-text-danger" inputTextWeight="has-text-weight-bold" :valueInputText="getStatusLabel" :is_disabled="true" v-if="saleOrderCardHeader['Processing Status']==2 || saleOrderCardHeader['Processing Status']==3 ||saleOrderCardHeader['Processing Status']==4"></input-text>
                                <input-text labelInputText="Statut de traitement" inputTextColor="has-text-primary" inputTextWeight="has-text-weight-bold" :valueInputText="getStatusLabel" :is_disabled="true" v-else></input-text>

                                <input-text labelInputText="Statut demande"  inputTextWeight="has-text-weight-bold" :valueInputText="getApprovalStatusLabel" :is_disabled="true"></input-text>
                                                        
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

                            <div id="line_content" class="px-5 mt-5" style="max-height: 250px; overflow:scroll;">
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
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">%Remise ligne</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant remise ligne</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">% Acompte</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Line No_'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Type']==2?'Article':'Commentaire' }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['No_'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Location Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Bin Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Unit of Measure'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ elt['Quantity'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Shipment Method Code'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Unit Price']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ elt['Line Discount _'] }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Line Discount Amount']) }}</td>
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
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(saleOrderCardHeader['Total VAT']) +' MGA'" labelInputText="Montant TVA"></input-text1>
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(saleOrderCardHeader['Total Amount']) +' MGA'" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="formatAmount(saleOrderCardHeader['Total Amount Including VAT']) +' MGA'" labelInputText="Montant TTC"></input-text1>
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
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 150px;">Code Article</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 150px;">Magasin de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Emplacement</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de vente</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 150px;">Mode de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">%Remise ligne</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant remise ligne</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">% Acompte</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" @click="selectLine(index)">
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
                                                <td class="has-text-left py-0 px-2 is-narrow">
                                                    <div class="dropdown is-small" :class="{'is-active':itemListDropdownIsActive && activeItemLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['No_']" class="input is-small" type="text" style="border:none" :disabled="elt['No_']==creditContractGP.applicationFeesItem">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeItemLineDropdown!==index && elt['No_']!==creditContractGP.applicationFeesItem" @click.prevent="displayItemListDropdown(index)">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="itemListDropdownIsActive==true && activeItemLineDropdown==index && elt['No_']!==creditContractGP.applicationFeesItem" @click.prevent="closeItemListDropdown">
                                                                        <span class="icon">
                                                                            <i class="fas fa-close" ></i>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="dropdown-menu" id="dropdown-menu" role="menu" style="max-width:500px; max-height:200px;overflow: scroll;padding:0;" >
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
                                                    <!------div :id="index+'-'+elt['No_']+'-No_'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['No_']" @blur="onEdit" @keydown.enter="endEdit"></div----->
                                                </td>
                                                <td class="has-text-left py-1 px-2 is-narrow">
                                                    <div :id="index+'-'+elt['Description']+'-Description'" class="editme p-1" :contenteditable="elt['Type']!==2" v-text="elt['Description']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2">
                                                    <div class="dropdown is-small" :class="{'is-active':locationListDropdownIsActive && activeLocationLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['Location Code']" class="input is-small" type="text" style="border:none" :disabled="elt['No_']==creditContractGP.applicationFeesItem">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeLocationLineDropdown!==index && elt['No_']!==creditContractGP.applicationFeesItem" @click.prevent="displayLocationListDropdown(index)">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="locationListDropdownIsActive==true && activeLocationLineDropdown==index && elt['No_']!==creditContractGP.applicationFeesItem" @click.prevent="closeLocationListDropdown">
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
                                                    <!------div :id="index+'-'+elt['Location Code']+'-Location Code'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Location Code']" @blur="onEdit" @keydown.enter="endEdit"></div----->
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div class="dropdown is-small" :class="{'is-active':locationBinListDropdownIsActive && activeLocationBinLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['Bin Code']" class="input is-small" type="text" style="border:none" :disabled="elt['No_']==creditContractGP.applicationFeesItem">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeLocationBinLineDropdown!==index && elt['No_']!==creditContractGP.applicationFeesItem" @click.prevent="displayLocationBinListDropdown(index,elt['Location Code'],elt['No_'])">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="locationBinListDropdownIsActive==true && activeLocationBinLineDropdown==index && elt['No_']!==creditContractGP.applicationFeesItem" @click.prevent="closeLocationBinListDropdown">
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
                                                    </div>
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['Unit of Measure'] }}
                                                </td>
                                                <td class="has-text-right py-0 px-2" >
                                                    <div :id="index+'-'+elt['Quantity']+'-Quantity'" class="editme p-1"  :contenteditable="elt['Type']==2 && elt['No_']!==creditContractGP.applicationFeesItem"  v-text="elt['Quantity']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div class="dropdown is-small" :class="{'is-active':shipmentMethodListDropdownIsActive && activeshipmentMethodLineDropdown==index}" v-if="elt['Type']==2" >
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons">
                                                                <div class="control is-expanded">
                                                                    <input v-model="elt['Shipment Method Code']" class="input is-small" type="text" style="border:none" :disabled="elt['No_']==creditContractGP.applicationFeesItem">
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button  is-small" v-if="activeshipmentMethodLineDropdown!==index && elt['No_']!==creditContractGP.applicationFeesItem" @click.prevent="displayShipmentMethodListDropdown(index)">
                                                                        <span class="icon">
                                                                            <i class="fas fa-plus" ></i>
                                                                        </span>
                                                                    </button>
                                                                    <button class="button  is-small" v-if="shipmentMethodListDropdownIsActive==true && activeshipmentMethodLineDropdown==index && elt['No_']!==creditContractGP.applicationFeesItem" @click.prevent="closeShipmentMethodListDropdown">
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
                                                    <!--------div :id="index+'-'+elt['Shipment Method Code']+'-Shipment Method Code'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Shipment Method Code']" @blur="onEdit" @keydown.enter="endEdit"></div---->
                                                </td>
                                                <td class="has-text-right py-1 px-2" >
                                                    {{ formatAmount(elt['Unit Price']) }}
                                                </td>
                                                <td class="has-text-right py-1 px-2 is-narrow" >
                                                    {{ elt['Line Discount _'] }}
                                                </td>
                                                <td class="has-text-right py-1 px-2 is-narrow" >
                                                    {{ formatAmount(elt['Line Discount Amount']) }}
                                                </td>
                                                <td class="has-text-right py-1 px-2 is-narrow" >
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
                                <div v-if="saleOrderCardLines.length==0">Il n'y'a rien à afficher</div>
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
                                                    <!----input-text :valueInputText="itemUnitOfMeasure" labelInputText="Unité de mesure"  :is_disabled="true"></input-text---->
                                                    <input-number  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité" @onChangingInputValue="submitSOLineItemPriceRequest" :is_disabled="false" ></input-number>
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
                                                <p class="title has-text-left is-6 mt-5" v-if="itemCode && itemType==2">Disponibilité article : </p>
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
                                                    <input-number  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false" @onChangingInputValue="submitSOLineItemPriceRequest"></input-number>
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
                                                        <button  class="button has-background-orangered  shadow has-text-white" @click.prevent="()=>{editRowByForm(selectedLine);editItemModalShowned=false;if(saleOrderCardHeader['Location Code']) addItemModalShowned=true}">
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
                    <div id="order-details">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('order_details_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>Détails commande</span>
                                </a>
                                <a @click="expand('order_details_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                    <span>Détails commande</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet3_expanded">Afficher plus</div>
                            <div class="column py-0 has-text-right is-size-7" v-if="!onglet3_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">{{ saleOrderCardHeader['Responsibility Center'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;"> {{ saleOrderCardHeader['Salesperson Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ saleOrderCardHeader['VAT Bus_ Posting Group'] }}</span>
                            </div>
                        </div>
                        <div id="order_details_content" class="columns">
                            <div class="column">                                                                                                
                                <input-text labelInputText="Centre de gestion" :valueInputText="saleOrderCardHeader['Responsibility Center']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Code vendeur" :valueInputText="saleOrderCardHeader['Salesperson Code']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Point de vente" :valueInputText="saleOrderCardHeader['Store Code']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Canal de vente" :valueInputText="saleOrderCardHeader['Sales Channel']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Mode de vente" :valueInputText="saleOrderCardHeader['Sales Mode']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || saleOrderCustomerType==2 || isMirindraSO"></input-text>
                                <input-select labelInputText="Mode de vente" v-model="saleOrderSalesMode"  @openModal="activeModalForSelectableElementList='salesModeList'" v-else></input-select>

                                <!---input-text labelInputText="Groupe tarifaire" :valueInputText="saleOrderCardHeader['Customer Price Group']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || !userCanChangePriceGroup"></input-text---->
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="saleOrderCardHeader['Customer Price Group']" :is_disabled="true" v-if="true"></input-text>
                                <input-select labelInputText="Groupe tarifaire" v-model="saleOrderCardHeader['Customer Price Group']" @openModal="activeModalForSelectableElementList='priceGroupList'" v-else></input-select>
                            </div>
                            <div class="column"> 
                                <input-text labelInputText="Groupe compta. client" :valueInputText="saleOrderCardHeader['Customer Posting Group']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Groupe compta. marché" :valueInputText="saleOrderCardHeader['Gen_ Bus_ Posting Group']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Conditions de paiement" :valueInputText="saleOrderCardHeader['Payment Terms Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || saleOrderCustomerType==2 || isMirindraSO"></input-text>
                                <input-select labelInputText="Conditions de paiement" v-model="saleOrderCardHeader['Payment Terms Code']"  @openModal="activeModalForSelectableElementList='paymentTermList'" v-else></input-select>

                                <input-text labelInputText="Régime TVA" :valueInputText="saleOrderCardHeader['VAT Bus_ Posting Group']" :is_disabled="true" v-if="!readOnlyModeIsDisabled || saleOrderCustomerType==2 "></input-text>
                                <input-select labelInputText="Régime TVA" v-model="saleOrderCardHeader['VAT Bus_ Posting Group']" @openModal="activeModalForSelectableElementList='vatGroupList'" v-else ></input-select>                               
                                
                                <input-number labelInputText="% Acompte" :valueInputText="formatAmount(saleOrderPrepayment)"  v-model="saleOrderPrepayment" :is_disabled="!readOnlyModeIsDisabled || saleOrderCustomerType==2 || isMirindraSO" @onChangingInputValue="getPrepaymentInfo"></input-number>

                                <input-number labelInputText="Montant Acompte TTC" v-model="saleOrderPrepaymentAmount" :valueInputText="formatAmount(saleOrderPrepaymentAmount)" :is_disabled="!readOnlyModeIsDisabled || saleOrderCustomerType==2 || isMirindraSO" @onChangingInputValue="getPrepaymentAmountInfo"></input-number>
                                
                                <input-number labelInputText="Crédit disponible" :valueInputText="formatAmount(saleOrderCardHeader['Available credit'])" :is_disabled="true"></input-number>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                </div>

<!---------composant info client----------------------->
                <customer-info class="customer-info" v-if="true"></customer-info>

            </div>


<!-----------report viewer-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-show="printsaleOrderLayoutShowned" v-if="saleOrderCardHeader['No_']">
                <div class="modal-background has-background-white" style="opacity:0.7" @click="printsaleOrderLayoutShowned=false"></div>
                <div class="modal-content container " style=" background-color: rgba(255,255,255,1);border: none;">
                    <report-viewer :src="`http://10.64.25.11:80/ReportServer/Pages/ReportViewer.aspx?/WebApp/SalesOrderPrint&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&Order=${saleOrderCardHeader['No_']}`"></report-viewer>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="printsaleOrderLayoutShowned=false"></button>
            </div>

<!-----------Disponibilité article-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="inventoryAvailabilityModalShowned">
                <div class="modal-background has-background-white" style="opacity:0.7" @click="inventoryAvailabilityModalShowned=false"></div>
                <div class="modal-content w-75 shadow has-background-light">
                    <inventory-availability></inventory-availability>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="inventoryAvailabilityModalShowned=false"></button>
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
                    <new-contact :customerNo="saleOrderCardHeader['Sell-to Customer No_']" :redirectionIsDisabled="true" @submit="(elt) => {saleOrderCardHeader['Sell-to Contact No_'] = elt['code'];newContactModalShowned=false} "></new-contact>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newContactModalShowned=false }"></button>
            </div>


<!-----------Modal pour la création d'une adresse-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newAddressModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newAddressModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-ship-to-address :customerNo="saleOrderCardHeader['Sell-to Customer No_']" :contactNo="saleOrderCardHeader['Sell-to Contact No_']" :redirectionIsDisabled="true" @submit="(elt) => {saleOrderCardHeader['Ship-to Code'] = elt;newAddressModalShowned=false} "></new-ship-to-address>
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
            :customerNo="saleOrderCardHeader['Sell-to Customer No_']" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)"
            @onDisplayingContactCreationModal="()=>showContactCreationModal()">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerNo="saleOrderCardHeader['Sell-to Customer No_']" 
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

        <modal-for-selectable-contract-list 
            v-if="activeModalForSelectableElementList=='contractList'" 
            :isActive="activeModalForSelectableElementList=='contractList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="saleOrderCardHeader['Sell-to Customer No_']" 
            @onGettingLineFromSelectableContractListModal="(elt)=>fillContractInfoField(elt)">
        </modal-for-selectable-contract-list>

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
            :salesMode="saleOrderCardHeader['Sales Mode']"
            @onGettingLineFromSelectablePaymentTermListModal="(elt)=>fillPaymentTermInfoField(elt)">
        </modal-for-selectable-payment-term-list>

    </div>    
</template>
<script>
import SOCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import SOCardRibbon from './RibbonForCard.vue'
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
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import ModalForSelectableVatBusPostingGroupList from './ModalForSelectableVATBUSPostingGroupList.vue'
import ModalForSelectablePriceGroupList from './ModalForSelectablePriceGroupList.vue'
import ModalForSelectablePaymentTermList from './ModalForSelectablePaymentTermList.vue'
import ModalForSelectableSalesModeList from './ModalForSelectableSalesModeList.vue'
import ModalForSelectableContractList from './ModalForSelectableContractList.vue'
import NewContact from './NewContact.vue'
import NewShipToAddress from './NewShipToAddress.vue'

import SelectableItemListForSale from './SelectableItemListForSale.vue'
import InventoryAvailability from './InventoryAvailability.vue'
import ReportViewer from './ReportViewer.vue'
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useCreditContractGPInfoStore } from '@/Stores/CreditContractGPInfo'
import { useMirindraGPInfoStore } from '@/Stores/MirindraGPInfo'






export default {
    name:'sale-order-card',
    components:{
        SOCardHeader,CustomerInfo,SOCardRibbon,ReportViewer,
        inputText,inputText1,inputSelect,inputSelectBasic,inputDate,inputNumber,
        ModalForSelectableCustomerList,ModalForSelectableCampaignList,ModalForSelectablePaymentMethodList,
        ModalForSelectableShipmentMethodList,ModalForSelectableItemList,ModalForSelectableLocationList,ModalForSelectableLocationBinList,ModalForSelectableContractList,
        ModalForSelectableContactList,ModalForSelectableAddressList,ModalForSelectableVatBusPostingGroupList,
        ModalForSelectablePaymentTermList,ModalForSelectableSalesModeList,SelectableItemListForSale,ModalForSelectablePriceGroupList,
        InventoryAvailability, NewContact,NewShipToAddress,
    },
    computed:{
        getStatusLabel(){
            return this.labelHeader['Processing Status'].value
        },
        getApprovalStatusLabel(){
            return this.labelHeader['Approval Status'].value
        }
    },
    setup(){
        const router = useRouter()
        const saleOrderCardHeader = ref({})
        const saleOrderLocationBinCode = ref('')
        const saleOrderCardLines = ref([])
        const saleOrderCustomerType = ref(2)
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const saleOrderCardId = useRoute().params.id
        const isItemInfoToFill = ref(false)
        const userCanChangePriceGroup = ref(false)
        //const success_transmission = ref('')

        const newContactModalShowned = ref(false)
        const newAddressModalShowned = ref(false)

        //element pour déclencher le recalcul des lignes
        const lineHasBeenDeleted = ref(false)

        //variable de soumission forme
        let submitting_message=ref('') 

        //variable d'erreur serveur
        let error_message=ref('')
        let error_message_code =ref('')

        //variable de success serveur
        let success_message=ref('')

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
            shipRequestedDate:ref(''),
            promisedDeliveryDate:ref(''),
            DueDate:ref('')
        }

        //objet contenant les infos sur l'utilisateur connecté
        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
            respCenter:ref(useWebUserInfoStore().responsibilityCenter),
            language:ref(useWebUserInfoStore().defaultLanguage)
        }

        //sac de label de la fiche
        const labelHeader = {
            'Processing Status' : ref(''),
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
            saleOrderCardLines.value[index]['No_'] = item['No_']
            saleOrderCardLines.value[index]['Description'] = item['Description']
            saleOrderCardLines.value[index]['Description 2'] = item['Description 2']
            saleOrderCardLines.value[index]['Location Code'] = saleOrderCardHeader.value['Location Code']
            saleOrderCardLines.value[index]['Bin Code'] = saleOrderLocationBinCode.value
            saleOrderCardLines.value[index]['Unit of Measure'] = item['Sales Unit of Measure']
            saleOrderCardLines.value[index]['Shipment Method Code'] = item["Shipment Method"]?item["Shipment Method"]:saleOrderCardHeader.value['Shipment Method Code']
            saleOrderCardLines.value[index]['Prepayment _'] = saleOrderPrepayment.value
            getVATonItem(saleOrderCardHeader.value['VAT Bus_ Posting Group'],item['VAT Prod_ Posting Group'],index,'VAT _')
            itemListDropdownIsActive.value=false
            activeItemLineDropdown.value =-1
            submitSOLineItemPriceRequestOnLine(index)
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
            saleOrderCardLines.value[index]['Location Code'] = location['Code']
            saleOrderCardLines.value[index]['Bin Code'] = location['Default Bin Code']
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
            saleOrderCardLines.value[index]['Bin Code'] = locationBin['Bin Code']
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
            saleOrderCardLines.value[index]['Shipment Method Code'] = shipmentMethod['Code']
            shipmentMethodListDropdownIsActive.value=false
            activeshipmentMethodLineDropdown.value =-1
        }



        //objet contenant les infos de la ligne d'article à insérer
        const itemInfo = {
            itemLineNo:ref(saleOrderCardLines.value.length +1),
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
            itemLineDiscount :ref(0),
            itemLineDiscountAmount:ref(0),
            itemVAT:ref(0),
            itemLineAmount:ref(0),
            itemVATBusPosGroup:ref(''),
            itemVATProdPosGroup:ref(''),
            itemPriceIsGetting:ref(false)
        }

        //objet contenant les la disponibilité sur la ligne d'article à insérer
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
            saleOrderCardLines.value.push(
                {   
                    'Line No_':saleOrderCardLines.value.length +1,
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
                    'Line Discount _':0,
                    'Line Discount Amount':0,
                    'VAT _':0,
                    'Line Amount':0,
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':'',
                    'Prepayment _':0,
            })
            //itemInfo.itemLineNo.value=saleOrderCardLines.value.length +1
        }
        function  addCommentRow(){
            saleOrderCardLines.value.push(
                {   
                    'Line No_':saleOrderCardLines.value.length +1,
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
                    'Line Discount _':'',
                    'Line Discount Amount':'',
                    'VAT _':'',
                    'Line Amount':'',
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':'',
                    'Prepayment _':''
            })
            //itemInfo.itemLineNo.value=saleOrderCardLines.value.length +1
        }
        function addRowByForm_andContinue(){
            if (itemInfo.itemType.value==2){
                saleOrderCardLines.value.push(
                {
                    'Line No_':saleOrderCardLines.value.length +1,
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
                    'Line Discount _':itemInfo.itemLineDiscount.value,
                    'Line Discount Amount':0,
                    'VAT _':itemInfo.itemVAT.value,
                    'Line Amount':itemInfo.itemUnitPrice.value * itemInfo.itemQuantity.value,
                    'VAT Bus. Posting Group':itemInfo.itemVATBusPosGroup.value,
                    'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value,
                    'Prepayment _':saleOrderPrepayment.value
                })
                getVATonItem(saleOrderCardHeader.value['VAT Bus_ Posting Group'],itemInfo.itemVATProdPosGroup.value,saleOrderCardLines.value.length -1,'VAT _')

            }else{
                saleOrderCardLines.value.push(
                {   
                    'Line No_':saleOrderCardLines.value.length +1,
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
                    'Line Discount _':'',
                    'Line Discount Amount':'',
                    'VAT _':'',
                    'Line Amount':'',
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':'',
                    'Prepayment _':''
                })
            }
            //itemInfo.itemLineNo.value++
            resetForm()
        }
        function addRowByForm_andClose(){
            if (itemInfo.itemType.value==2){
                saleOrderCardLines.value.push(
                {   
                    'Line No_':saleOrderCardLines.value.length +1,
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
                    'Line Discount _':itemInfo.itemLineDiscount.value,
                    'Line Discount Amount':0,
                    'VAT _':itemInfo.itemVAT.value,
                    'Line Amount':itemInfo.itemUnitPrice.value * itemInfo.itemQuantity.value,
                    'VAT Bus. Posting Group':itemInfo.itemVATBusPosGroup.value,
                    'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value,
                    'Prepayment _':saleOrderPrepayment.value
                })
                getVATonItem(saleOrderCardHeader.value['VAT Bus_ Posting Group'],itemInfo.itemVATProdPosGroup.value,saleOrderCardLines.value.length -1,'VAT _')

            }else{
                saleOrderCardLines.value.push(
                {   
                    'Line No_':saleOrderCardLines.value.length +1,
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
                    'Line Discount _':'',
                    'Line Discount Amount':'',
                    'VAT _':'',
                    'Line Amount':'',
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':'',
                    'Prepayment _':''
                })
            }
            //itemInfo.itemLineNo.value++
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
            itemInfo.itemUnitPrice.value=0
            itemInfo.itemLineDiscount.value=0
            itemInfo.itemLineDiscountAmount.value=0
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
            if(saleOrderCardLines.value.length > 0){
                const lineData = ref({}) 
                lineData.value = saleOrderCardLines.value[index]
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
                itemInfo.itemLineDiscount.value= lineData.value['Line Discount _'] 
                itemInfo.itemLineDiscountAmount.value= lineData.value['Line Discount Amount']
                itemInfo.itemVATProdPosGroup.value= lineData.value['VAT Prod_ Posting Group']?lineData.value['VAT Prod_ Posting Group']:''  
            }
        }
        function editRowByForm(index){
            saleOrderCardLines.value.splice(index,1,{
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
                'Line Discount _':itemInfo.itemLineDiscount.value,
                'Line Discount Amount':itemInfo.itemLineDiscountAmount.value,
                'VAT _':itemInfo.itemVAT.value,
                'Line Amount':itemInfo.itemQuantity.value*itemInfo.itemUnitPrice.value,
                'Prepayment _':saleOrderPrepayment.value,
                'VAT Bus. Posting Group':saleOrderCardHeader.value['VAT Bus_ Posting Group'],
                'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
            })
            if(itemInfo.itemVATProdPosGroup.value){
                getVATonItem(saleOrderCardHeader.value['VAT Bus_ Posting Group'],itemInfo.itemVATProdPosGroup.value,index,'VAT _')
            }
            resetForm()
        }

//fonctions spécifiques aux articles
        function getSOLineItemPrice(sqData){
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
        function submitSOLineItemPriceRequest(){
            itemInfo.itemPriceIsGetting.value = true
            const JSData ={
                Parameter:'orders_item_getPrice',
                itemCode:itemInfo.itemCode.value,
                OrderNo:saleOrderCardHeader.value["No_"],
                Quantity:itemInfo.itemQuantity.value?itemInfo.itemQuantity.value:0,
                'Variant Code':''
            }
            getSOLineItemPrice(formatToBCJsonData(JSData))
        }
        function getSOLineItemPriceOnLine(index,data){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,data)
            .then(res =>{
                const unitPrice = ref('')
                unitPrice.value = res.data.documentNo
                unitPrice.value = Number(unitPrice.value.split(',').join(''))
                saleOrderCardLines.value[index]['Unit Price'] = unitPrice.value
                saleOrderCardLines.value[index]['Line Amount'] = unitPrice.value * saleOrderCardLines.value[index]['Quantity'] 
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitSOLineItemPriceRequestOnLine(index){
            const JSData ={
                Parameter:'orders_item_getPrice',
                itemCode:saleOrderCardLines.value[index]["No_"],
                OrderNo:saleOrderCardHeader.value["No_"],
                Quantity:saleOrderCardLines.value[index]["Quantity"],
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
                    itemAvailabilityInfo.itemOnTransferLocation.value = data["On transfert Location"]
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
                saleOrderLocationBinCode.value = binCode
            })
            .catch(err => console.log(err))
        }
        function getVATonItem(VATOnCust,VATOnItem,lineNo,lineAttrib){
            console.log(VATOnCust,VATOnItem,lineNo,lineAttrib)
            axios.get(`http://${hostname}:5000/app/getItemVAT?VATOnItem=${VATOnItem}&VATOnCust=${VATOnCust}`)
            .then(result =>{
                saleOrderCardLines.value[lineNo][lineAttrib]=Number(result.data)
            })
            .catch(err => console.log(err))
        }


//Propriétés calculés pour les totaux des lignes
        const totalAmountExclVAT = computed(()=> {
            let sum = 0
            saleOrderCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + elt['Line Amount']
            })
            return sum.toFixed(2)
        })
        const totalVAT = computed(() => {
            let sum = 0
            saleOrderCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + elt['Line Amount'] * elt['VAT _'] /100
            })
            return sum.toFixed(2)
        })
        const totalAmountIncVAT = computed(() => {
            const TAIV = Number(totalAmountExclVAT.value) + Number(totalVAT.value)
            return TAIV
        })



        const totalAmountExclVAT_EcxlFees = computed(()=> {
            let sum = 0
            saleOrderCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    if(elt['No_']!==useCreditContractGPInfoStore().applicationFeesItem)
                        sum = sum + elt['Line Amount']
            })
            return sum.toFixed(2)
        })
        const totalAmountExclVAT_ExclIN = computed(()=> {
            let sum = 0
            saleOrderCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    if(elt['No_']!==useMirindraGPInfoStore().itemForInterest)
                        sum = sum + elt['Line Amount']
            })
            return sum
        })
        const totalVAT_ExclIN = computed(() => {
            let sum = 0
            saleOrderCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    if(elt['No_']!==useMirindraGPInfoStore().itemForInterest)
                        sum = sum + elt['Line Amount'] * elt['VAT _'] /100
            })
            return sum.toFixed(2)
        })
        const totalAmountIncVAT_ExclIN = computed(() => {
            const TAIV = Number(totalAmountExclVAT_ExclIN.value) + Number(totalVAT_ExclIN.value)
            return TAIV
        })

        // const totalVAT_EcxlFees = computed(() => {
        //     let sum = 0
        //     saleOrderCardLines.value.forEach(elt =>{
        //         if(elt['Type']==2)
        //             if(elt['No_']!==useCreditContractGPInfoStore().applicationFeesItem)
        //                 sum = sum + elt['Line Amount'] * elt['VAT _'] /100
        //     })
        //     return sum.toFixed(2)
        // })
        // const totalAmountIncVAT_EcxlFees = computed(() => {
        //     const TAIV = Number(totalAmountExclVAT_EcxlFees.value) + Number(totalVAT_EcxlFees.value)
        //     return TAIV
        // })


//Fonctions spécifiques aux articles d'intérêt mirindra
        //const mirindraGP = useMirindraGPInfoStore()
        function getMirindraGP(){
            if(!useMirindraGPInfoStore().isFilled){
                axios.get(`http://${hostname}:5000/app/getMirindraGP`)
                .then(result =>{
                    useMirindraGPInfoStore().fillMirindraGPInfo(result.data)
                })
                .catch((err)=>console.log(err))
            }
        }
        const isMirindraSO = computed(()=> {
            if(saleOrderCardHeader.value['Sales Mode'] == useMirindraGPInfoStore().salesMode)
                return true
            else
                return false
        })

//Fonctions spécifique à l'acompte et à la durée
        const CRConfirmationPymtUpdateModalShowned = ref(false)
        const saleOrderPrepayment = ref(0)
        const saleOrderPrepaymentAmount = ref(0)
        const saleOrderPrepaymentTemp = ref(0)
        function getPrepaymentInfo(){
            if(saleOrderPrepaymentTemp.value !== saleOrderPrepayment.value){
                if(saleOrderPrepayment.value !== ''){
                    if(saleOrderPrepayment.value > 100 ){
                        error_message.value = 'La valeur que vous avez saisie est incorrecte'
                        error_message_code.value = 'ERROR_BAD_VALUE'
                    }else{
                        if(saleOrderCardLines.value.length > 0){
                            // if( saleOrderCardLines.value.length == 1 && saleOrderCardLines.value[0]['No_']!==useCreditContractGPInfoStore().applicationFeesItem){
                            //     saleOrderPrepayment.value = Number(saleOrderPrepayment.value).toFixed(2)
                            //     CRConfirmationPymtUpdateModalShowned.value = true
                            // }
                            // if( saleOrderCardLines.value.length > 1){
                            //     saleOrderPrepayment.value = Number(saleOrderPrepayment.value).toFixed(2)
                            //     CRConfirmationPymtUpdateModalShowned.value = true
                            // }
                            saleOrderPrepayment.value = Number(saleOrderPrepayment.value).toFixed(2)
                            CRConfirmationPymtUpdateModalShowned.value = true
                        }
                    }
                }else{
                    saleOrderPrepayment.value = saleOrderPrepaymentTemp.value
                }
            }
        }
        function getPrepaymentAmountInfo(){
            if(saleOrderPrepaymentAmount.value){
                if(saleOrderPrepaymentAmount.value > totalAmountIncVAT.value){
                    error_message.value = "Le montant d'acompte ne peut être supérieur au montant de la demande"
                    error_message_code.value = 'ERROR_BAD_VALUE'
                }else{
                    if(totalAmountIncVAT.value > 0){
                        saleOrderPrepayment.value = Number((saleOrderPrepaymentAmount.value / totalAmountIncVAT.value) * 100).toFixed(5)
                        CRConfirmationPymtUpdateModalShowned.value = true
                    }else{
                        error_message.value = 'Le montant de la demande ne doit pas être égale à Zero (0)'
                    }
                }
            }else{
                saleOrderPrepaymentAmount.value = 0
            }
        }
        function submitPrepaymentLinesUpdate(){
            saleOrderCardLines.value.map( line => {
                //if(line['No_']!==useCreditContractGPInfoStore().applicationFeesItem){
                    line['Prepayment _'] = saleOrderPrepayment.value
                //}
            })
            CRConfirmationPymtUpdateModalShowned.value = false
            saleOrderPrepaymentTemp.value = saleOrderPrepayment.value
        }
        function cancelPrepaymentLinesUpdate(){
            CRConfirmationPymtUpdateModalShowned.value = false
            saleOrderPrepayment.value = saleOrderPrepaymentTemp.value
            saleOrderPrepaymentAmount.value = 0
        }



//fonctions pour remplir les champs avec via des listes sélectionnables
        function fillItemInfoField(item){
            itemInfo.itemType.value = 2
            itemInfo.itemCode.value = item['No_']
            itemInfo.itemDescription.value = item['Description']
            itemInfo.itemDescription2.value = item['Description 2']
            itemInfo.itemQuantity.value = 1
            //itemInfo.itemLocation.value = saleOrderCardHeader.value["Location Code"]
            itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
            itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:saleOrderCardHeader.value['Shipment Method Code']
            itemInfo.itemVATProdPosGroup.value = item['VAT Prod_ Posting Group']
            itemInfo.itemVATBusPosGroup.value= saleOrderCardHeader.value['VAT Bus_ Posting Group']

            if (!itemInfo.itemLocation.value){
                itemInfo.itemLocation.value = saleOrderCardHeader.value["Location Code"]
                itemInfo.itemBinCode.value = saleOrderLocationBinCode.value
            }
            submitSOLineItemPriceRequest()
            getItemAvailabilityInfo()
        }

        function fillCustomerInfoField(customer){
            saleOrderCardHeader.value["Sell-to Customer No_"]=customer["No_"]
            saleOrderCardHeader.value["Sell-to Customer Name"]=customer["Name"]
            saleOrderCardHeader.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
            saleOrderCardHeader.value["Payment Method Code"]=customer['Payment Method Code']
            saleOrderCardHeader.value["Payment Terms Code"]=customer['Payment Terms Code']
            //saleOrderCardHeader.value["Prepayment _"]=customer['Prepayment _']
            saleOrderPrepayment.value = customer['Prepayment _']
            saleOrderPrepaymentTemp.value=customer['Prepayment _']
            saleOrderCardHeader.value["Shipment Method Code"]=customer['Shipment Method Code']
            saleOrderCardHeader.value["Customer Posting Group"]=customer['Customer Posting Group']
            saleOrderCardHeader.value["Gen_ Bus_ Posting Group"]=customer['Gen_ Bus_ Posting Group']
            saleOrderCardHeader.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
            saleOrderCardHeader.value["Customer Price Group"]=customer['Customer Price Group']?customer['Customer Price Group']:useWebUserInfoStore().defaultUserPriceGroup
            saleOrderCardHeader.value["Ship-to Code"]=customer['Ship-to Code']
            saleOrderCardHeader.value["Sales Mode"]=customer['Sales Mode']
            saleOrderCustomerType.value = customer['Customer Type']
            
        }
        function fillContactInfoField(contact){
            saleOrderCardHeader.value["Sell-to Contact No_"]= contact['No_']
        }
        function fillContractInfoField(contract){
            saleOrderCardHeader.value['Contract No_']= contract['No_']
        }
        function fillLocationInfoField(location){
            if(isItemInfoToFill.value){
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
                isItemInfoToFill.value=false
            }else{
                saleOrderCardHeader.value["Location Code"]=location["Code"]
                saleOrderLocationBinCode.value = location['Default Bin Code']
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
            }
        }
        function fillLocationBinInfoField(locationBin){
            itemInfo.itemBinCode.value=locationBin
        }
        function fillAddressInfoField(address){
            saleOrderCardHeader.value["Ship-to Code"]=address["Code"]
        }
        function fillCampaignInfoField(campaign){
            saleOrderCardHeader.value["Campaign No_"]=campaign["No_"]
        }
        function fillPaymentMethodInfoField(paymentMethod){
            saleOrderCardHeader.value["Payment Method Code"]=paymentMethod["Code"]
        }
        function fillShipmentMethodInfoField(shipmentMethod){
            if(isItemInfoToFill.value){
                itemInfo.itemShipmentMethod.value=shipmentMethod['Code']
                isItemInfoToFill.value=false
            }else{
                saleOrderCardHeader.value["Shipment Method Code"]=shipmentMethod["Code"]
            }
        }
        function fillVATGroupInfoField(VATGroup){
            saleOrderCardHeader.value['VAT Bus_ Posting Group']= VATGroup['Code']
        }
        function fillPriceGroupInfoField(priceGroup){
            saleOrderCardHeader.value['Customer Price Group']= priceGroup['Code']
        }
        function fillSalesModeInfoField(salesMode){
            saleOrderCardHeader.value['Sales Mode']= salesMode['Code']
        }
        function fillPaymentTermInfoField(paymentTerm){
            saleOrderCardHeader.value['Payment Terms Code']= paymentTerm['Code']
            saleOrderCardHeader.value['Prepayment _']= paymentTerm['Prepayment']
            saleOrderPrepayment.value= paymentTerm['Prepayment']
            saleOrderPrepaymentTemp.value= paymentTerm['Prepayment']
        }


        //fonction de récupération des données de la fiche
        const saleOrderSalesMode = ref('') 
        function getSOCardInfo(){
            axios.get(`http://${hostname}:5000/app/getSOCard/${saleOrderCardId}?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result => {
                saleOrderCardHeader.value = result.data[0],
                saleOrderCardLines.value = result.data[1]
                saleOrderCustomerType.value = saleOrderCardHeader.value['Customer Type']
                saleOrderPrepayment.value = Number(saleOrderCardHeader.value['Prepayment _']).toFixed(5)
                saleOrderPrepaymentTemp.value = saleOrderPrepayment.value
                if(saleOrderPrepayment.value > 0 &&  totalAmountIncVAT_ExclIN.value > 0)
                    saleOrderPrepaymentAmount.value = Math.round((saleOrderPrepayment.value * totalAmountIncVAT_ExclIN.value)/100).toFixed(2)

                saleOrderCardLines.value.map(row => row['Line No_'] = Number.isInteger(row['Line No_']/10000)?row['Line No_']/10000:row['Line No_'] )
                
                dateInfo.documentDate.value = getISODate(saleOrderCardHeader.value["Document Date"])
                dateInfo.shipRequestedDate.value = getISODate(saleOrderCardHeader.value["Requested Delivery Date"])
                dateInfo.promisedDeliveryDate.value = getISODate(saleOrderCardHeader.value["Promised Delivery Date"])
                
                itemInfo.itemLineNo.value = saleOrderCardLines.value.length +1
                getSingleOptionLabel(webUserInfo.language.value,'Processing Status',saleOrderCardHeader.value["Processing Status"])
                getSingleOptionLabel(webUserInfo.language.value,'Approval Status',saleOrderCardHeader.value["Approval Status"])
                //getCustomerType(saleOrderCardHeader.value["Sell-to Customer No_"])
                saleOrderSalesMode.value = saleOrderCardHeader.value['Sales Mode']
                
                if(saleOrderCardHeader.value['Location Code']){
                    getItemLocationBinCode(saleOrderCardHeader.value['Location Code'])
                }

                if(saleOrderCardHeader.value['Contract No_']){
                    getCreditContractGP()
                    getCreditContractCardInfo()
                }

            }).catch(err=>{displayErrorMessage(err)})
        }

        //fonction de récupération du type de client associé au document
        // function getCustomerType(customerNo){
        //     axios.get(`http://${hostname}:5000/app/getCustomerType?customerId=${customerNo}`)
        //     .then(result => {
        //         saleOrderCustomerType.value= result.data[0]['Customer Type']
        //         console.log('type',saleOrderCustomerType.value)
        //     }).catch(err => console.log(err))
        // }


//fonctions pour envoyer le document en traitement
        function sendSORequestForProcess(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res =>{
                console.log(res)
                submitting_message.value=''
                success_message.value="Traitement effectuée"
                error_message.value=''
                setTimeout(()=>success_message.value='',3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function submitSORequestForProcess(){
            submitting_message.value="Traitement de la commande en cours"
            const JSData ={
                Parameter:'orders_requestApproval',
                //webUserName:webUserInfo.name.value,
                OrderNo:saleOrderCardHeader.value["No_"],
            }
            sendSORequestForProcess(formatToBCJsonData(JSData))
        }


//fonctions pour soumettre une demande de remise
        const saleOrderDiscount = ref(0)
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
            if(saleOrderCardHeader.value['Status']==0){
                if(saleOrderDiscount.value>0 && saleOrderDiscount.value<=100){
                    submitting_message.value="Envoie de la demande en cours"
                    const JSData ={
                        Parameter:'discountRequest_insert',
                        webUserName:webUserInfo.name.value,
                        OrderNo:saleOrderCardHeader.value["No_"],
                        'No_':saleOrderCardHeader.value['No_'],
                        'Approval Status':6,
                        'Request Type':1,
                        'Discount %':saleOrderDiscount.value
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

//fonctions pour soumettre une demande de déblocage
        function sendSOUnlockingRequest(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res =>{
                console.log(res)
                submitting_message.value=''
                success_message.value="demnde de déblocage envoyée"
                error_message.value=''
                setTimeout(()=>success_message.value='',3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        function SubmitSOUnlockingRequest(){
            if(saleOrderCardHeader.value['Processing Status']==2){
                    submitting_message.value="Envoie de la demande en cours"
                    const JSData ={
                        Parameter:'salesOrderUnclocking_insert',
                        webUserName:webUserInfo.name.value,
                        OrderNo:saleOrderCardHeader.value["No_"],
                        'No_':saleOrderCardHeader.value['No_'],
                        'Approval Status':6,
                        'Request Type':2,
                    }
                    sendSOUnlockingRequest(formatToBCJsonData(JSData))

            }else{
                error_message.value='Vous ne pouvez faire cette action!'
                error_message_code.value='UNAUTHORIZED'
            }
        }

//Gestion des control avant soumission
        function contactFieldIsrequired(){
            if (saleOrderCardHeader.value['Customer Type']==null){
                error_message.value='La valeur du customer est null!'
                error_message_code.value = 'BAD_REQUEST'
            }
            if(saleOrderCardHeader.value['Customer Type']==2)
                return true
            else 
                return false
        }
        function shipToAddressIsRequired(){
            if(saleOrderCardLines.value.find(row => row['Shipment Method Code'] =='LIVRAISON' ))
                return true
            else
                return false
        }
        function controlBeforeUpdate(){
            submitting_message.value='Enregistrement en cours'

            if(contactFieldIsrequired() && !saleOrderCardHeader.value['Sell-to Contact No_']){
                submitting_message.value=''
                error_message.value ='Le code contact est obligatoire pour les clients divers'
                error_message_code.value ='FIELD_REQUIRED'
                return -1
            }
            if(shipToAddressIsRequired() && !saleOrderCardHeader.value['Ship-to Code']){
                submitting_message.value=''
                error_message.value ="L'addrese de livraison doit être renseignée"
                error_message_code.value ='FIELD_REQUIRED'
                return -1
            }
            checkApplicationFeesItemLineExist()
            //submitForm()

        }


        //Fonctions pour calculer la durée
        // function getDuration(){
        //     submitting_message.value='Calcul en cours'
        //     axios.get(`http://${hostname}:5000/app/getAGPDuration?orderNo=${saleOrderCardHeader.value['No_']}`)
        //     .then(res =>{
        //         saleOrderCardHeader.value['Duration (Month)'] = res.data[0][""]
        //         submitting_message.value=''
        //         success_transmission.value= 'Nouveau durée: '+res.data[0][""] +', veuillez svp enregistrer la page'
        //         setTimeout(()=>success_transmission.value='',3000)
        //     })
        //     .catch((err) => {
        //         displayErrorMessage(err)
        //     })
        // }


//Gestion AGP
        const creditContractGP = useCreditContractGPInfoStore()
        const itemFeesIsAdded = ref(false)
        const creditContractCardInfo = ref({})
        function getCreditContractGP(){
            if(!useCreditContractGPInfoStore().isFilled){
                axios.get(`http://${hostname}:5000/app/getCreditContractGP`)
                .then(result =>{
                    useCreditContractGPInfoStore().fillCreditContractGPInfo(result.data)
                })
                .catch((err)=>console.log(err))
            }
        }
        function getCreditContractCardInfo(){
            axios.get(`http://${hostname}:5000/app/getCreditContractCard?contractNo=${saleOrderCardHeader.value['Contract No_']}`)
            .then(result => {
                creditContractCardInfo.value= result.data[0]
            })
            .catch(err=>console.log(err))
        }
        function getItemFeesInfo(){
            axios.get(`http://${hostname}:5000/app/getItemCard/${useCreditContractGPInfoStore().applicationFeesItem}?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result =>{
                addFeesItemLine(result.data.recordset[0])
            })
            .catch(err => {
                console.log(err)
                submitForm()
            })
        }
        function addFeesItemLine(data){
            const fees = creditContractCardInfo.value['Application fees_']
            saleOrderCardLines.value.push({
                'Line No_':saleOrderCardLines.value.length+1,
                Type:2,
                No_:useCreditContractGPInfoStore().applicationFeesItem,
                Description:data['Description'],
                'Description 2':'',
                'Variant Code':'',
                'Location Code':saleOrderCardLines.value[0]['Location Code'],
                'Bin Code':'',
                'Unit of Measure':data['Sales Unit of Measure'],
                Quantity:fees/100,
                'Shipment Method Code':'',
                'Unit Price':totalAmountExclVAT_EcxlFees.value,
                'Line Discount _':0,
                'Line Discount Amount':0,
                'VAT _':0,
                'Line Amount': (fees/100) * totalAmountExclVAT_EcxlFees.value,
                //'Prepayment _':0,
                'Prepayment _':saleOrderPrepayment.value,
                'VAT Bus. Posting Group':saleOrderCardHeader.value['VAT Bus_ Posting Group'],
                'VAT Prod_ Posting Group':data['VAT Prod_ Posting Group']
            })
            getVATonItem(saleOrderCardHeader.value['VAT Bus_ Posting Group'],data['VAT Prod_ Posting Group'],saleOrderCardLines.value.length-1,'VAT _')
            //itemFeesIsAdded.value = true
            submitForm()

            
        }
        
        function checkApplicationFeesItemLineExist(){
            saleOrderCardLines.value.every( line => {
                if(line['No_']==useCreditContractGPInfoStore().applicationFeesItem){
                    line['Unit Price'] = totalAmountExclVAT_EcxlFees.value
                    line['Line Amount'] = line['Quantity'] * totalAmountExclVAT_EcxlFees.value
                    //line['Prepayment _'] = 0
                    line['Prepayment _'] = saleOrderPrepayment.value
                    if(saleOrderCardLines.value[0]['Location Code']){
                        line['Location Code'] = saleOrderCardLines.value[0]['Location Code']
                    }
                    itemFeesIsAdded.value = true
                    return false
                }
                return true
            })
            if(itemFeesIsAdded.value == false){
                checkCreditContractBeforeUpdate()
            }else{
                submitForm()
            }
        }

        function checkCreditContractBeforeUpdate(){
            if(saleOrderCardHeader.value['Contract No_']!==''){
                if(creditContractCardInfo.value['Application fees_']>0 ){
                    getItemFeesInfo()
                }
                else{
                    submitForm()
                }   
            }else{
                submitForm()
            }
        }

//fonctions pour mettre à jour le document
        function updatesaleOrder(sqData){
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
            const JSData = {
                Parameter:'orders_modify',
                webUserName:webUserInfo.name.value,
                OrderNo:saleOrderCardHeader.value["No_"],
                saleOrderCustomerNo:saleOrderCardHeader.value["Sell-to Customer No_"],
                saleOrderCustomerContactCode:saleOrderCardHeader.value["Sell-to Contact No_"],
                saleOrderResponsibilityCenter:saleOrderCardHeader.value['Responsibility Center'],
                saleOrderSalesperson:saleOrderCardHeader.value['Salesperson Code'],
                saleOrderCampaignNo:saleOrderCardHeader.value['Campaign No_'],
                saleOrderLocationCode:saleOrderCardHeader.value["Location Code"],
                saleOrderSalesChannel:saleOrderCardHeader.value["Sales Channel"],
                saleOrderSalesMode:saleOrderCardHeader.value["Sales Mode"]?saleOrderCardHeader.value["Sales Mode"]:'',
                saleOrderCustomerPriceGroup:saleOrderCardHeader.value["Customer Price Group"],
                //nouveaux
                saleOrderCustomerStoreCode:saleOrderCardHeader.value["Store Code"], 
                saleOrderVATBusPostingGroup:saleOrderCardHeader.value["VAT Bus_ Posting Group"], 
                saleOrderCustomerPostingGroup:saleOrderCardHeader.value["Customer Posting Group"], 
                saleOrderGenBusPostingGroup:saleOrderCardHeader.value["Gen_ Bus_ Posting Group"], 
                
                saleOrderDocumentDate:dateInfo.documentDate.value?dateInfo.documentDate.value:'1753-01-01',
                saleOrderShipRequestedDate:dateInfo.shipRequestedDate.value?dateInfo.shipRequestedDate.value:'1753-01-01', 
                saleOrderPromisedDeliveryDate:dateInfo.promisedDeliveryDate.value?dateInfo.promisedDeliveryDate.value:'1753-01-01', 
                saleOrderPaymentMethodCode:saleOrderCardHeader.value["Payment Method Code"], 
                saleOrderPaymentTermsCode:saleOrderCardHeader.value["Payment Terms Code"],
                saleOrderPrepayment:saleOrderPrepayment.value, 
                saleOrderCustomerShipToCode:saleOrderCardHeader.value["Ship-to Code"],                     
                saleOrderShipmentMethodCode:saleOrderCardHeader.value["Shipment Method Code"], 
                'Contract No_':saleOrderCardHeader.value['Contract No_'],
                'Duration (Month)':saleOrderCardHeader.value['Duration (Month)'],
                saleOrderLines:[
                    ...saleOrderCardLines.value
                ]
            }
            updatesaleOrder(formatToBCJsonData(JSData))
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
        onMounted(()=> {
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }
            userCanChangePriceGroup.value = useWebUserInfoStore().canChangePriceGroup
            getSOCardInfo()
            getUserItemList()
            getUserLocationList()
            //getUserLocationBinList()
            getShipmentMethodList()
            getMirindraGP()
        })
        watch(success_message, () => {
            readOnlyModeIsDisabled.value=false
            getSOCardInfo()
        })
        watch(saleOrderSalesMode, (newValue, oldValue) => {
            if(oldValue !==''){
                if(newValue !== oldValue)
                    if(saleOrderCardHeader.value['Payment Terms Code'])
                        saleOrderCardHeader.value['Payment Terms Code']=''
            }
        })
        watch(lineHasBeenDeleted, () => {
            if(lineHasBeenDeleted.value){
                let i = 1
                saleOrderCardLines.value.map(row => row['Line No_'] = i++)
                lineHasBeenDeleted.value =false
            }
        })
        // watch(saleOrderPrepaymentAmount, () => {
        //     if(saleOrderPrepaymentAmount.value>0){
        //         if(totalAmountIncVAT.value>0)
        //             saleOrderCardHeader.value['Prepayment _'] = Number(saleOrderPrepaymentAmount.value / totalAmountIncVAT.value *100).toFixed(3)
        //     }else
        //         saleOrderCardHeader.value['Prepayment _'] = 0
        // })


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
            saleOrderCardHeader,saleOrderCardLines,saleOrderCustomerType,
            readOnlyModeIsDisabled,setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,
            ...dateInfo,
            ...itemInfo,...itemAvailabilityInfo,
            labelHeader,
            fillCustomerInfoField,fillContactInfoField,fillLocationInfoField,fillLocationBinInfoField,fillAddressInfoField,
            fillCampaignInfoField,fillPaymentMethodInfoField,fillShipmentMethodInfoField,fillVATGroupInfoField,fillPriceGroupInfoField,
            fillSalesModeInfoField,fillPaymentTermInfoField,fillItemInfoField,fillContractInfoField,
            addEmptyRow,addCommentRow,addRowByForm_andContinue,addRowByForm_andClose,resetForm,
            editRowByForm,
            error_message,error_message_code,success_message,submitting_message,
            lineHasBeenDeleted,getLineDataToEdit,getItemAvailabilityInfo,
            totalVAT,totalAmountExclVAT,totalAmountIncVAT,
            itemListDropdownIsActive,activeItemLineDropdown,userItemList,fillLineByItemCode,
            locationListDropdownIsActive,activeLocationLineDropdown,userLocationList,fillLineByLocationCode,
            locationBinListDropdownIsActive,activeLocationBinLineDropdown,userLocationBinList,fillLineByLocationBinCode,getUserLocationBinList,
            shipmentMethodListDropdownIsActive,activeshipmentMethodLineDropdown,shipmentMethodList,fillLineByShipmentMethodCode,
            submitForm,controlBeforeUpdate,submitSORequestForProcess,
            submitDiscountRequest,saleOrderDiscount,
            SubmitSOUnlockingRequest,
            submitSOLineItemPriceRequest,submitSOLineItemPriceRequestOnLine,
            saleOrderSalesMode,
            //getDuration,
            newContactModalShowned,newAddressModalShowned,
            formatAmount,
            creditContractGP,isMirindraSO,
            saleOrderPrepaymentAmount,saleOrderPrepayment,CRConfirmationPymtUpdateModalShowned,
            getPrepaymentInfo,getPrepaymentAmountInfo,submitPrepaymentLinesUpdate,cancelPrepaymentLinesUpdate,
            userCanChangePriceGroup,

        }
    },
    data(){
        return{

            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.orderCardRightInfoMaxWidth,

            //indique la route active
            saleOrderCardId:this.$route.params.id,

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
            printsaleOrderLayoutShowned:false,

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
            useNavigationTabStore().setActiveTab('saleOrders')
            this.$router.push('/')
        },
         /////////////////////////methode pour masquer ou afficher le composant info à droite
         hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('orderCardRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('orderCardRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        ///////////////////////methode pour  afficher le formulaire d'ajout d'article
        showAddRowByFormModal(){
            if (this.saleOrderCardHeader["Location Code"]){
                this.addItemModalShowned = true
                this.error_message=''
                this.error_message_code=''
            }else{
                this.error_message = "Vous devez d'abord indiquer le code magasin"
                this.error_message_code ="ERROR_FIELD_REQUIRED"
            }
        },
        ////////////////////////methode pour afficher le formulaire de modification d'article
        showEditRowByFormModal(){
            if(this.selectedLine>=0){
                if(this.saleOrderCardLines[this.selectedLine]['No_']!==useCreditContractGPInfoStore().applicationFeesItem){
                    this.getLineDataToEdit(this.selectedLine)
                    this.editItemModalShowned = true
                }
                if(this.saleOrderCardLines[this.selectedLine]['Type']==2){
                    this.getItemAvailabilityInfo()
                }
            }        
        },
        ////////////////////////methode pour fermer le formulaire de modification d'article
        closeEditItemModal(){
            this.editItemModalShowned=false
            this.resetForm()
        },
        //////////////////////////methode pour afficher report viewer
        showPrintsaleOrderLayout(){
            this.printsaleOrderLayoutShowned = true
        },
        //////////////////////////methode pour afficher le modal de disponibilité article
        showItemAvaibilityInfoModal(){
            this.inventoryAvailabilityModalShowned = true
        },
        //////////////////////////methode pour formater les dates
        formatDate(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')) return ''
                else return new Date(date).toLocaleDateString()
            }else{
                return ''
            }
        },
        //////////methode pour étendre un onglet de la page
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='line_content') myElt.style.maxHeight='250px'
            else myElt.style.maxHeight='700px'
        },
        ////////////methode pour reduire un onglet de la page
        collapse(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight="0px"
        },
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
                value = Number(value)
                this.saleOrderCardLines[parentId][parentAttri] = value
                this.saleOrderCardLines[parentId]["Line Amount"] = value * Math.trunc(Number(this.saleOrderCardLines[parentId]["Unit Price"]))
                this.submitSOLineItemPriceRequestOnLine(parentId)
            }
            else{
                this.saleOrderCardLines[parentId][parentAttri] = value
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
                if(this.saleOrderCardLines[this.selectedLine]['No_']!==useCreditContractGPInfoStore().applicationFeesItem){
                    this.saleOrderCardLines.splice(this.selectedLine,1)
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
        // formatAmount(number){
        //     if(number || number>=0){
        //         return new Intl.NumberFormat('fr-FR', { style: 'decimal' }).format(number)
        //     }else{
        //         return 0
        //     }
        // }
    },

}

</script>
<style scoped>
.customer-info,prospect-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#line_content,#order_details_content,#international_content,#prepayment_content,#delivery_invoicing_content{
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