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
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @onPrintingCard="showPrintsaleOrderLayout"
            @onReopeningDocument="sendReopeningDocRequest"
            @onCreatingCustomerContactCard="this.$router.push('/newContact')"
            @onCreatingCustomerAddressCard="showAddressCreationModal"
            @onCheckingItemAvailability="showItemAvaibilityInfoModal"
            @onProcessingCard="submitSORequestForProcess"
            componentWithCompInfo="orderCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :printCardBtnIsDisabled="false"
            :convertQuoteBtnIsDisabled="true"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="true"
            :requestForApprovalBtnIsDisabled="true"
            :reopenBtnIsDisabled="false"
            :processCardBtnIsDisabled="false"
            :documentStatus="saleOrderCardHeader['Status']"
            :newContactBtnIsDisabled="false"
            :newShipToAddressBtnIsDisabled="false"
            :checkItemAvailabilityBtnIsDisabled="false"
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
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet1_expanded">Afficher plus</div>
                            <div class="column py-0 has-text-right is-size-7" v-if="!onglet1_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">{{ saleOrderCardHeader['Sell-to Customer Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ saleOrderCardHeader['Sell-to Contact No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ formatDate(saleOrderCardHeader['Document Date']) }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Code client" :valueInputText="saleOrderCardHeader['Sell-to Customer No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code client" v-model="saleOrderCardHeader['Sell-to Customer No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select>
                                
                                <input-text labelInputText="Nom du client" v-model="saleOrderCardHeader['Sell-to Customer Name']" :valueInputText="saleOrderCardHeader['Sell-to Customer Name']" :is_disabled="!readOnlyModeIsDisabled" :is_readOnly="true"></input-text>
                                
                                <input-text labelInputText="Code Contact"  :valueInputText="saleOrderCardHeader['Sell-to Contact No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code Contact" v-model="saleOrderCardHeader['Sell-to Contact No_']" @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>
                                                                
                                <input-text labelInputText="Code promo" :valueInputText="saleOrderCardHeader['Campaign No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code promo" v-model="saleOrderCardHeader['Campaign No_']" @openModal="activeModalForSelectableElementList='campaignList'" v-else></input-select>
                                
                                <input-text labelInputText="Code magasin" :valueInputText="saleOrderCardHeader['Location Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Code magasin" v-model="saleOrderCardHeader['Location Code']" @openModal="activeModalForSelectableElementList='locationList'" v-else></input-select>
                                
                                <input-text labelInputText="Mode livraison" :valueInputText="saleOrderCardHeader['Shipment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode livraison" v-model="saleOrderCardHeader['Shipment Method Code']" @openModal="activeModalForSelectableElementList='shipmentMethodList'" v-else></input-select>
                                
                                <input-text labelInputText="Adresse de livraison" :valueInputText="saleOrderCardHeader['Ship-to Code']"  :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Adresse de livraison" v-model="saleOrderCardHeader['Ship-to Code']"  @openModal="activeModalForSelectableElementList='addressList'" v-else></input-select>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date de la commande" :valueInputText="formatDate(saleOrderCardHeader['Document Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date de la commande " v-model="documentDate" v-else></input-date>
                                                                                                
                                <input-text labelInputText="Date livraison demandée" :valueInputText="formatDate(saleOrderCardHeader['Requested Delivery Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date livraison demandée" v-model="shipRequestedDate" v-else></input-date>
                                
                                <input-text labelInputText="Date livraison promise" :valueInputText="formatDate(saleOrderCardHeader['Promised Delivery Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date livraison promise" v-model="promisedDeliveryDate" v-else></input-date>
                                
                                <input-text labelInputText="Mode de règlement" :valueInputText="saleOrderCardHeader['Payment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de règlement" v-model="saleOrderCardHeader['Payment Method Code']" @openModal="activeModalForSelectableElementList='paymentMethodList'" v-else></input-select>
                            
                                <!---input-text labelInputText="Statut" inputTextColor="has-text-primary" inputTextWeight="has-text-weight-bold" :valueInputText="saleOrderCardHeader['Status']==0?'Ouvert':saleOrderCardHeader['Status']==1?'Lancé':'Approbaion en attente'" :is_disabled="true"></input-text--->
                                
                                <input-text labelInputText="Statut de traitement" inputTextColor="has-text-danger" inputTextWeight="has-text-weight-bold" :valueInputText="getStatusLabel" :is_disabled="true" v-if="saleOrderCardHeader['Processing Status']==3 ||saleOrderCardHeader['Processing Status']==4"></input-text>
                                <input-text labelInputText="Statut de traitement" inputTextColor="has-text-primary" inputTextWeight="has-text-weight-bold" :valueInputText="getStatusLabel" :is_disabled="true" v-else></input-text>
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
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">%Remise ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant remise ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Groupe compta produit</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Groupe compta produit TVA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
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
                                            <td  class="has-text-left has-background-light"> {{ elt['Line Discount _'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Line Discount Amount'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['VAT _'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ Math.trunc(Number(elt['Line Amount'])) }}</td>                                           
                                            <td  class="has-text-left has-background-light"> {{ elt['Gen_ Prod_ Posting Group'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['VAT Prod_ Posting Group'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet2_expanded">
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="saleOrderCardHeader['Total VAT']" labelInputText="Montant TVA"></input-text1>
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="saleOrderCardHeader['Total Amount']" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="saleOrderCardHeader['Total Amount Including VAT']" labelInputText="Montant TTC"></input-text1>
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
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">%Remise ligne</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant remise ligne</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Groupe compta produit</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Groupe compta produit TVA</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
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
                                                <td class="has-text-left py-0 px-2" style="min-width: 500px;">
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
                                                    <div :id="index+'-'+elt['Quantity']+'-Quantity'" class="editme p-1"  :contenteditable="elt['Type']==2"  v-text="elt['Quantity']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-0 px-2" >
                                                    <div :id="index+'-'+elt['Shipment Method Code']+'-Shipment Method Code'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Shipment Method Code']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ Math.trunc(Number(elt['Unit Price'])) }}
                                                </td>
                                                <td class="has-text-left py-1 px-2 is-narrow" >
                                                    {{ elt['Line Discount _'] }}
                                                </td>
                                                <td class="has-text-left py-1 px-2 is-narrow" >
                                                    {{ elt['Line Discount Amount'] }}
                                                </td>
                                                <td class="has-text-left py-1 px-2 is-narrow" >
                                                    {{ elt['VAT _'] }}
                                                </td>
                                                <td class="has-text-left py-1 px-2 is-narrow" >
                                                    {{ Math.trunc(Number(elt['Line Amount'])) }}
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['Gen_ Prod_ Posting Group'] }}
                                                </td>
                                                <td class="has-text-left py-1 px-2" >
                                                    {{ elt['VAT Prod_ Posting Group'] }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="saleOrderCardLines.length==0">Il n'y'a rien à afficher</div>
                            </div>
                            <div class="columns mt-3" id="line_total" v-if="onglet2_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="saleOrderCardHeader['Total VAT']" labelInputText="Montant TVA"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="saleOrderCardHeader['Total Amount']" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="saleOrderCardHeader['Total Amount Including VAT']" labelInputText="Montant TTC"></input-text1>
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
                                                        <inputText1 :valueInputText="itemInStockLocation" labelInputText="En stock" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 :valueInputText="itemOnSalesLocation" labelInputText="En vente" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column">
                                                    </div>
                                                </div>
                                                <p class="title has-text-left is-6 mt-3">Disponibilité article Global : </p>
                                                <div class="columns my-0 is-multiline">
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 :valueInputText="itemInStockGlobal" labelInputText="En stock" :is_disabled="true"></inputText1>
                                                    </div>
                                                    <div class="column box is-narrow mx-1">
                                                        <inputText1 :valueInputText="itemOnSalesGlobal" labelInputText="En vente" :is_disabled="true"></inputText1>
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
                                
                                <input-text labelInputText="Mode de vente" :valueInputText="saleOrderCardHeader['Sales Mode']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="saleOrderCardHeader['Customer Price Group']" :is_disabled="true"></input-text>
                            </div>
                            <div class="column">                                
                                <input-text labelInputText="Catégorie TVA" :valueInputText="saleOrderCardHeader['VAT Bus_ Posting Group']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Groupe compta. client" :valueInputText="saleOrderCardHeader['Customer Posting Group']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Groupe compta. marché" :valueInputText="saleOrderCardHeader['Gen_ Bus_ Posting Group']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Condition de paiement" :valueInputText="saleOrderCardHeader['Payment Terms Code']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="% Acompte" :valueInputText="saleOrderCardHeader['Prepayment _']" :is_disabled="true"></input-text>
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
            <div :class="{'modal':true , 'is-active':true }" v-show="printsaleOrderLayoutShowned" v-if="saleOrderCardHeader['No_']">
                <div class="modal-background has-background-white" style="opacity:0.7" @click="printsaleOrderLayoutShowned=false"></div>
                <div class="modal-content container " style=" background-color: rgba(255,255,255,1);border: none;">
                    <report-viewer :documentNo="saleOrderCardHeader['No_']" documentRdl="SalesOrderPrint" rdlParameter="Order"></report-viewer>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="printsaleOrderLayoutShowned=false"></button>
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
            :customerNo="saleOrderCardHeader['Sell-to Customer No_']" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerNo="saleOrderCardHeader['Sell-to Customer No_']" 
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
import SOCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import SOCardRibbon from './RibbonForCard.vue'
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
import { useRoute } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'





export default {
    name:'sale-order-card',
    components:{
        SOCardHeader,
        CustomerInfo,
        ProspectInfo,
        inputText,
        inputText1,
        inputSelect,
        inputSelectBasic,
        inputDate,
        SOCardRibbon,
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
    computed:{
        getStatusLabel(){
            return this.labelHeader['Processing Status'].value
        }
    },
    setup(){
        const saleOrderCardHeader = ref({})
        const saleOrderCardLines = ref([])
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const saleOrderCardId = useRoute().params.id
        const isItemInfoToFill = ref(false)


        const labelHeader = {
            'Processing Status' : ref('')
        }


        //variable de soumission forme
        let submitting_message=ref('') 

        //variable d'erreur serveur
        let error_message=ref('')
        let error_message_code =ref('')

        //variable de success serveur
        let success_message=ref('')

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
            respCenter:ref(useWebUserInfoStore().responsibilityCenter),
            language:ref(useWebUserInfoStore().defaultLanguage)
        }

        const dateInfo = {
            documentDate: ref(''),
            shipRequestedDate:ref(''),
            promisedDeliveryDate:ref('')
        }

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
            itemQuantity: ref(''),
            itemShipmentMethod: ref(''),
            itemUnitPrice: ref(''),
            itemLineDiscount :ref(0),
            itemLineDiscountAmount:ref(0),
            itemVAT:ref(0),
            itemLineAmount:ref(0),
            itemGenProdPosGroup:ref(''),
            itemVATProdPosGroup:ref(''),
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
                getSOCardInfo()
            }
            else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo = {
                        name:ref(useWebUserInfoStore().name),
                        company:ref(useWebUserInfoStore().activeCompanyId),
                        respCenter:ref(useWebUserInfoStore().responsibilityCenter),
                        language:ref(useWebUserInfoStore().defaultLanguage)
                    }
                    getSOCardInfo()
                })
                .catch(err=>console.log(err))

            }
        })

        function getSOCardInfo(){
            axios.get(`http://${hostname}:3000/app/getSOCard/${saleOrderCardId}?respCenter=${webUserInfo.respCenter.value}`)
            .then(result => {
                saleOrderCardHeader.value = result.data[0],
                console.log(saleOrderCardHeader)
                saleOrderCardLines.value = result.data[1]
                dateInfo.documentDate.value = getISODate(saleOrderCardHeader.value["Document Date"])
                dateInfo.shipRequestedDate.value = getISODate(saleOrderCardHeader.value["Requested Delivery Date"])
                dateInfo.promisedDeliveryDate.value = getISODate(saleOrderCardHeader.value["Promised Delivery Date"])
                itemInfo.itemLineNo.value = saleOrderCardLines.value.length +1
                getSingleOptionLabel(webUserInfo.language.value,'Processing Status',saleOrderCardHeader.value["Processing Status"])
            }).catch(err=>displayErrorMessage(err))
        }

        function getSingleOptionLabel(language,field,value){
            axios.get(`http://${hostname}:3000/app/getSingleOptionLabel?lg=${language}&fd=${field}&vl=${value}`)
            .then(result => {
                labelHeader[field].value = result.data.recordset[0][""]
            }).catch(err=>console.log(err))
        }

        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        watch(success_message, () => {
            readOnlyModeIsDisabled.value=false
            getSOCardInfo()
        })

        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }

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
                        Quantity:'',
                        'Shipment Method Code':'',
                        'Unit Price':'',
                        'Line Discount _':'',
                        'Line Discount Amount':'',
                        'VAT _':'',
                        'Line Amount':'',
                        'Gen_ Prod_ Posting Group':'',
                        'VAT Prod_ Posting Group':''
                })
                itemInfo.itemLineNo.value=saleOrderCardLines.value.length +1
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
                        'Gen_ Prod_ Posting Group':'',
                        'VAT Prod_ Posting Group':''
                })
                itemInfo.itemLineNo.value=saleOrderCardLines.value.length +1
            }

            function addRowByForm_andContinue(){
                if (itemInfo.itemType.value==2){
                    const unitPrice = Number(itemInfo.itemUnitPrice.value.split(',').join(''))
                    const quantity = Number(itemInfo.itemQuantity.value)
                    const lineDiscount = Number(itemInfo.itemLineDiscount.value)
                    const VAT = Number(itemInfo.itemVAT.value)
                    saleOrderCardLines.value.push(
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
                        'Line Discount _':lineDiscount,
                        'Line Discount Amount':quantity * unitPrice * lineDiscount / 100,
                        'VAT _':VAT,
                        'Line Amount':unitPrice * quantity,
                        'Gen_ Prod_ Posting Group':itemInfo.itemGenProdPosGroup.value,
                        'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
                    })
                }else{
                    saleOrderCardLines.value.push(
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
                        'Line Discount _':'',
                        'Line Discount Amount':'',
                        'VAT _':'',
                        'Line Amount':'',
                        'Gen_ Prod_ Posting Group':'',
                        'VAT Prod_ Posting Group':''
                    })
                }
                itemInfo.itemLineNo.value++
                resetForm()
            }

            function addRowByForm_andClose(){
                if (itemInfo.itemType.value==2){
                    const unitPrice = Number(itemInfo.itemUnitPrice.value.split(',').join(''))
                    const quantity = Number(itemInfo.itemQuantity.value)
                    const lineDiscount = Number(itemInfo.itemLineDiscount.value)
                    const VAT = Number(itemInfo.itemVAT.value)
                    saleOrderCardLines.value.push(
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
                        'Line Discount _':lineDiscount,
                        'Line Discount Amount':quantity * unitPrice * lineDiscount / 100,
                        'VAT _':VAT,
                        'Line Amount':unitPrice * quantity,
                        'Gen_ Prod_ Posting Group':itemInfo.itemGenProdPosGroup.value,
                        'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
                    })
                }else{
                    saleOrderCardLines.value.push(
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
                        'Line Discount _':'',
                        'Line Discount Amount':'',
                        'VAT _':'',
                        'Line Amount':'',
                        'Gen_ Prod_ Posting Group':'',
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
                itemInfo.itemLineDiscount.value=0
                itemInfo.itemLineDiscountAmount.value=0
                itemInfo.itemVAT.value=0
                itemInfo.itemLineAmount.value=0
                itemInfo.itemGenProdPosGroup.value=''
                itemInfo.itemVATProdPosGroup.value=''

                itemAvailabilityInfo.itemInStockGlobal.value=0
                itemAvailabilityInfo.itemInStockLocation.value=0
                itemAvailabilityInfo.itemOnPurchaseGlobal.value=0
                itemAvailabilityInfo.itemOnSalesGlobal.value=0
                itemAvailabilityInfo.itemOnSalesLocation.value=0
            }

            


        function fillCustomerInfoField(customer){
            saleOrderCardHeader.value["Sell-to Customer No_"]=customer["No_"]
            saleOrderCardHeader.value["Sell-to Customer Name"]=customer["Name"]
            saleOrderCardHeader.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
            saleOrderCardHeader.value["Payment Method Code"]=customer['Payment Method Code']
            saleOrderCardHeader.value["Payment Terms Code"]=customer['Payment Terms Code']
            saleOrderCardHeader.value["Prepayment _"]=customer['Prepayment _']
            saleOrderCardHeader.value["Shipment Method Code"]=customer['Shipment Method Code']
            saleOrderCardHeader.value["Customer Posting Group"]=customer['Customer Posting Group']
            saleOrderCardHeader.value["Gen_ Bus_ Posting Group"]=customer['Gen_ Bus_ Posting Group']
            saleOrderCardHeader.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
            saleOrderCardHeader.value["Customer Price Group"]=customer['Customer Price Group']
            saleOrderCardHeader.value["Ship-to Code"]=customer['Ship-to Code']
            saleOrderCardHeader.value["Sales Mode"]=customer['Sales Mode']
        }

        function fillContactInfoField(contact){
            saleOrderCardHeader.value["Sell-to Contact No_"]= contact['No_']
        }
        function fillLocationInfoField(location){
            if(isItemInfoToFill.value){
                    itemInfo.itemLocation.value=location['Code']
                    isItemInfoToFill.value=false
                }else{
                    saleOrderCardHeader.value["Location Code"]=location["Code"]
                }
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

        function fillItemInfoField(item){
            itemInfo.itemPriceIsGetting.value = true
            itemInfo.itemType.value = 2
            itemInfo.itemCode.value = item['No_']
            itemInfo.itemDescription.value = item['Description']
            itemInfo.itemDescription2.value = item['Description 2']
            itemInfo.itemLocation.value = saleOrderCardHeader.value["Location Code"]
            itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
            itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:saleOrderCardHeader.value['Shipment Method Code']


            if (itemInfo.itemLocation.value){
                axios.get(`http://${hostname}:3000/app/getLocationBinCode/${itemInfo.itemLocation.value}?respCenter=${webUserInfo.respCenter.value}`)
                .then(res => {
                    itemInfo.itemBinCode.value = res.data.recordset[0]['Shipment Bin Code']
                    itemInfo.itemPriceIsGetting.value = false
                })
                .catch(err => console.log(err))
            }

            submitSOLineItemPriceRequest()
            getItemAvailabilityInfo()
        }

        function displayErrorMessage(errorObject){
            console.log(errorObject)
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
                error_message.value = errorObject
            }
        }

        function sendSORequestForProcess(sqData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company.value}`,sqData)
                .then(res =>{
                    console.log(res)
                    submitting_message.value=''
                    success_message.value="Traitement effectuée"
                    error_message.value=''
                    setTimeout(()=>success_message.value='',5000)
                })
                .catch((err) => {
                    displayErrorMessage(err)
                })
            }

            function getSOLineItemPrice(sqData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company.value}`,sqData)
                .then(res =>{
                    //console.log(res)
                    itemInfo.itemUnitPrice.value=res.data.documentNo
                    itemInfo.itemPriceIsGetting.value = false
                    // submitting_message.value=''
                    // success_message.value="demnde d'approbation envoyée"
                    // error_message.value=''
                    // setTimeout(()=>success_message.value='',5000)
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
        

            function updatesaleOrder(sqData){
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

            function submitSOLineItemPriceRequest(){
                const JSData ={
                    Parameter:'orders_item_getPrice',
                    itemCode:itemInfo.itemCode.value,
                    OrderNo:saleOrderCardHeader.value["No_"],
                }
                getSOLineItemPrice(formatToBCJsonData(JSData))
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

            function submitForm(){
                submitting_message.value='Enregistrement en cours'
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
                    saleOrderPrepayment:saleOrderCardHeader.value["Prepayment _"], 
                    saleOrderCustomerShipToCode:saleOrderCardHeader.value["Ship-to Code"],                     
                    saleOrderShipmentMethodCode:saleOrderCardHeader.value["Shipment Method Code"], 
                    
                    saleOrderLines:[
                        ...saleOrderCardLines.value
                    ]
                }
                updatesaleOrder(formatToBCJsonData(JSData))
            }


        // expose to template and other options API hooks
        return {
            isItemInfoToFill,
            saleOrderCardHeader,
            saleOrderCardLines,
            readOnlyModeIsDisabled,
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            ...dateInfo,
            ...itemInfo,
            ...itemAvailabilityInfo,
            labelHeader,
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
            submitSORequestForProcess,
            error_message,
            error_message_code,
            success_message,
            submitting_message

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

            selected_line:'',

            //élement pour le modal ajout d'article
            addItemModalShowned:false,
            editItemModalShowned:false,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            //modal de confirmation convertion devis
            SQConfirmationModalShowned:false,

            //fenêtre d'impression de devis
            printsaleOrderLayoutShowned:false,
        }
    },
    methods:{

        goBackToList(){
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
            this.addItemModalShowned = true
        },
        ////////////////////////methode pour ajouter le formulaire de modification d'article
        showEditRowByFormModal(){
            this.editItemModalShowned = true
        },

        //////////////////////////methode pour afficher report viewer
        showPrintsaleOrderLayout(){
            this.printsaleOrderLayoutShowned = true
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
                value = Number(value)
                this.saleOrderCardLines[parentId][parentAttri] = value
                this.saleOrderCardLines[parentId]["Line Amount"] = value * Math.trunc(Number(this.saleOrderCardLines[parentId]["Unit Price"]))
            }
            else{
                this.saleOrderCardLines[parentId][parentAttri] = value
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