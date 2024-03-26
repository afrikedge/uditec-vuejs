<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <s-q-card-Header :soNo="creditrequestCardHeader['No_']" :soDesc="creditrequestCardHeader['Sell-to Customer Name']" pageTitle="Demande de crédit"></s-q-card-Header>
            </div>
            
<!---------Composant rubban fiche demande de credit----------------------->      
            <s-q-card-ribbon
            routeForNewCard="../NewSaleQuote"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="creditrequestCardRightInfoMaxWidth"
            :newCardBtnDisabled="false"
            :editCardBtnDisabled="true"
            :printCardBtnDisabled="false"
            :convertQuoteBtnDisabled="false"
            :readOnlyModeDisabled="true"
            ></s-q-card-ribbon>

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
                            <div class="column py-0 has-text-right is-size-7" v-if="!onglet1_expanded">
                                <span class="has-background-grey-lighter py-2 px-3">client gérald</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">26/02/2024</span>
                                <span class="has-background-grey-lighter py-2 px-3">ouvert</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Code client" :valueInputText="creditrequestCardHeader['Sell-to Customer No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Nom du client" :valueInputText="creditrequestCardHeader['Sell-to Customer Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code contact" :valueInputText="creditrequestCardHeader['Sell-to Contact No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Centre de gestion" :valueInputText="creditrequestCardHeader['Responsibility Center']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code vendeur" :valueInputText="creditrequestCardHeader['Salesperson Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Magasin par défaut" :valueInputText="creditrequestCardHeader['Location Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Date du devis" :valueInputText="creditrequestCardHeader['Document Date']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Mode de règlement" :valueInputText="creditrequestCardHeader['Payment Method Code']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="% Acompte" :valueInputText="creditrequestCardHeader['Prepayment _']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Mode livraison" :valueInputText="creditrequestCardHeader['Shipment Method Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Catégorie TVA" :valueInputText="creditrequestCardHeader['VAT Bus_ Posting Group']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="creditrequestCardHeader['Customer Price Group']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Adresse de livraison" :valueInputText="creditrequestCardHeader['Ship-to Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Canal de vente" :valueInputText="creditrequestCardHeader['Sales Channel']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Mode de vente" :valueInputText="formatDate(creditrequestCardHeader['Sales Mode'])" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Condition de paiement" :valueInputText="creditrequestCardHeader['Payment Terms Code']" :is_disabled="readOnlyMode" ></input-text>
                      
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                    
                     <!---------sous-Section ongle 2 formulaire fiche demande de credit----------------------->                         
                     <div id="credit">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('credit_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                    <span>Crédit</span>
                                </a>
                                <a @click="expand('credit_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                    <span>Crédit</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7" v-if="onglet2_expanded">Afficher plus</div>
                        </div>
                        <div id="credit_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Statut validation" :valueInputText="creditrequestCardHeader['Approval Status']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Montant du plafond de crédit" :valueInputText="creditrequestCardHeader['Eligible Amount']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Taux d’intérêt" :valueInputText="creditrequestCardHeader['Interest rate']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Durée (mois)" :valueInputText="creditrequestCardHeader['Duration (Month)']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Acompte exigé" :valueInputText="creditrequestCardHeader['Required Deposit']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Montant de d’acompte" :valueInputText="creditrequestCardHeader['Deposit Amount']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Montant principal du crédit" :valueInputText="creditrequestCardHeader['Chargeable Amount']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Montant des intérêts hors taxe" :valueInputText="creditrequestCardHeader['Interest']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Montant de la TVA sur intérêt" :valueInputText="creditrequestCardHeader['VAT on Interest']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Montant des intérêts toutes taxes comprises" :valueInputText="creditrequestCardHeader['Interest including VAT']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Montant total du crédit" :valueInputText="creditrequestCardHeader['Loan Amount']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Montant total de l’accord" :valueInputText="creditrequestCardHeader['Total agreement']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Mensualité" :valueInputText="creditrequestCardHeader['Installment']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Dernière mensualité" :valueInputText="formatDate(creditrequestCardHeader['Final installment'])" :is_disabled="readOnlyMode"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                    <!---------sous-Section onglet 3 formulaire fiche demande de credit----------------------->                         
                    <div id="line">
                        <div :class="{'has-background-light':onglet3_expanded}">

                            <div :class="{'columns':!onglet3_expanded,'p-3':onglet3_expanded,'has-border-bottom-grey':onglet3_expanded,'has-border-bottom':!onglet2_expanded}">
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
    
                                    <a href="#" class="ml-5" v-if="onglet3_expanded" @click="selectOption('gérer')">
                                        <span class="subtitle is-7" >Gérer</span>
                                    </a>
    
                                    <a href="#" class="ml-5" v-if="onglet3_expanded && show_more_option" @click="selectOption('ligne')">
                                        <span class="subtitle is-7" >Ligne</span>
                                    </a>
    
                                    <a href="#" class="ml-5" v-if="onglet3_expanded && show_more_option" @click="selectOption('commande')">
                                        <span class="subtitle is-7" >commande</span>
                                    </a>
    
                                    <a href="#" class="ml-5 is-hover-orange py-4 px-2" v-if="onglet3_expanded && show_more_option" @click="show_more_option=false">
                                        <span class="subtitle is-7" >Moins d'options</span>
                                    </a>
    
                                    <a href="#" class="ml-5 is-hover-orange py-4 px-2" v-if="onglet3_expanded && !show_more_option" @click="show_more_option=true">
                                        <span class="subtitle is-7" >Plus d'options</span>
                                    </a>
                                </div>
                            </div>
                            <div class="has-background-white shadow has-text-left p-3" v-if="show_option_btn_bar">
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                    <span class="subtitle is-7" >Nouvelle ligne</span>
                                </a>
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-eraser"></i>
                                    </span>
                                    <span class="subtitle is-7" >Supprimer la ligne</span>
                                </a>
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-check"></i>
                                    </span>
                                    <span class="subtitle is-7" >Sélectionner des articles</span>
                                </a>
                            </div>
                            <div id="line_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code article</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Magasin de livraison</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Emplacement</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de mesure</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode livraison</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Taux TVA</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code variant</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant HT</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant TVA</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant TTC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of creditrequestCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Line No_'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Type'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['No_'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Location Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Bin Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Quantity'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Shipment Method Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Unit Price'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['VAT _'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Line Amount'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Variant Code'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Total Amount'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Total VAT'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Total Amount Including VAT'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>     
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet3_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="creditrequestCardHeader['Total Amount']" labelInputText="Total HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="creditrequestCardHeader['Total Amount Including VAT']" labelInputText="Total TTC"></input-text1>
                                </div>
                        </div>                
                    </div>                         
                    <br><br>

                     <!---------sous-Section onglet 4 formulaire fiche demande de credit----------------------->                         
                     <div id="notation">
                        <div :class="{'has-background-light':onglet4_expanded}">

                            <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('notation_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                        <span>Notation</span>
                                    </a>
                                    <a @click="expand('notation_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                        <span>Notation</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet4_expanded">|</span>
    
                                    <a href="#" class="ml-5" v-if="onglet4_expanded" @click="selectOption('gérer')">
                                        <span class="subtitle is-7" >Gérer</span>
                                    </a>
    
                                    <a href="#" class="ml-5" v-if="onglet4_expanded && show_more_option" @click="selectOption('notation')">
                                        <span class="subtitle is-7" >Notation</span>
                                    </a>
    
                                    <a href="#" class="ml-5" v-if="onglet4_expanded && show_more_option" @click="selectOption('commande')">
                                        <span class="subtitle is-7" >commande</span>
                                    </a>
    
                                    <a href="#" class="ml-5 is-hover-orange py-4 px-2" v-if="onglet4_expanded && show_more_option" @click="show_more_option=false">
                                        <span class="subtitle is-7" >Moins d'options</span>
                                    </a>
    
                                    <a href="#" class="ml-5 is-hover-orange py-4 px-2" v-if="onglet4_expanded && !show_more_option" @click="show_more_option=true">
                                        <span class="subtitle is-7" >Plus d'options</span>
                                    </a>
                                </div>
                            </div>
                            <div class="has-background-white shadow has-text-left p-3" v-if="show_option_btn_bar">
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                    <span class="subtitle is-7" >Nouvelle notation</span>
                                </a>
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-eraser"></i>
                                    </span>
                                    <span class="subtitle is-7" >Supprimer la notation</span>
                                </a>
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-check"></i>
                                    </span>
                                    <span class="subtitle is-7" >Sélectionner des articles</span>
                                </a>
                            </div>
                            <div id="notation_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
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
                                        <tr :id="index" v-for="(elt,index) of creditrequestCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
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
                                            <td  class="has-text-left has-background-light"> {{ elt['Validity Date'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Document required'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Document Link'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Valid'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Point'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Coefficient'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Weighed Point'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Updated on'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Updated by'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Weighed Point Total'] }}</td>
            
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>     
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet4_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="creditrequestCardHeader['Total Amount']" labelInputText="Total HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="creditrequestCardHeader['Total Amount Including VAT']" labelInputText="Total TTC"></input-text1>
                                </div>
                        </div>                
                    </div>                         
                    <br><br>

                    <!---------sous-Section onglet 5 formulaire fiche demande de credit----------------------->                         
                    <div id="amortissement">
                        <div :class="{'has-background-light':onglet5_expanded}">

                            <div :class="{'columns':!onglet5_expanded,'p-3':onglet5_expanded,'has-border-bottom-grey':onglet5_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('amortissement_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                        <span>Amortissement</span>
                                    </a>
                                    <a @click="expand('amortissement_content');onglet5_expanded=!onglet5_expanded" v-if="!onglet5_expanded">
                                        <span>Amortissement</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet5_expanded">|</span>
    
                                    <a href="#" class="ml-5" v-if="onglet5_expanded" @click="selectOption('gérer')">
                                        <span class="subtitle is-7" >Gérer</span>
                                    </a>
    
                                    <a href="#" class="ml-5" v-if="onglet5_expanded && show_more_option" @click="selectOption('amortissement')">
                                        <span class="subtitle is-7" >Amortissement</span>
                                    </a>
    
                                    <a href="#" class="ml-5" v-if="onglet5_expanded && show_more_option" @click="selectOption('commande')">
                                        <span class="subtitle is-7" >commande</span>
                                    </a>
    
                                    <a href="#" class="ml-5 is-hover-orange py-4 px-2" v-if="onglet5_expanded && show_more_option" @click="show_more_option=false">
                                        <span class="subtitle is-7" >Moins d'options</span>
                                    </a>
    
                                    <a href="#" class="ml-5 is-hover-orange py-4 px-2" v-if="onglet5_expanded && !show_more_option" @click="show_more_option=true">
                                        <span class="subtitle is-7" >Plus d'options</span>
                                    </a>
                                </div>
                            </div>
                            <div class="has-background-white shadow has-text-left p-3" v-if="show_option_btn_bar">
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                    <span class="subtitle is-7" >Nouvelle amortissement</span>
                                </a>
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-eraser"></i>
                                    </span>
                                    <span class="subtitle is-7" >Supprimer l'amortissement</span>
                                </a>
                                <a href="#" class="is-hover-orange py-3 px-3" v-if="selected_option=='gérer'">
                                    <span class="icon">
                                        <i class="fas fa-check"></i>
                                    </span>
                                    <span class="subtitle is-7" >Sélectionner des articles</span>
                                </a>
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
                                        <tr :id="index" v-for="(elt,index) of creditrequestCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
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
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="onglet5_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="creditrequestCardHeader['Total Amount']" labelInputText="Total HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="creditrequestCardHeader['Total Amount Including VAT']" labelInputText="Total TTC"></input-text1>
                                </div>
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
                    <div class="modal-background has-background-white" style="opacity:0.7" @click="reportViewerShowned=true"></div>
                    <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                        <report-viewer :documentNo="creditrequestCardHeader['No_']"></report-viewer>
                    </div>
                    <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="reportViewerShowned=false"></button>
                </div>

            </div>



        </div>

    </div>    
</template>
<script>
import SQCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import SQCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputText1 from './input/input-text1.vue'
import ReportViewer from './ReportViewer.vue'
//import axios from 'axios'
import { ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'




export default {
    name:'credit-request-card',
    components:{
        SQCardHeader,CustomerInfo,ProspectInfo,inputText,inputText1,SQCardRibbon,ReportViewer
    },
    setup(){
        const creditrequestCardHeader = ref({})
        const creditrequestCardLines = ref([])
        const readOnlyMode = ref(true)
        // expose to template and other options API hooks
        return {
            creditrequestCardHeader,creditrequestCardLines,readOnlyMode
        }
    },
    data(){
        return{

            //taille (largeur) initiale du composant customerInfo
            creditrequestInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.creditrequestCardRightInfoMaxWidth,

            //indique la route active
            creditrequestCardId:this.$route.params.id,

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

            hostname:window.location.hostname

        }
    },
    methods:{
         /////////////////////////methode pour masquer ou afficher le composant info à droite
         hideOrShowComponentInfo(){
            if(this.creditrequestInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('creditrequestCardRightInfoMaxWidth','800px')
                this.creditrequestInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('creditrequestCardRightInfoMaxWidth','0px')
                this.creditrequestInfoCompMaxWidth='0px'
            }
        },

        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        },
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='line_content' || id=='amortissement_content' || id=='notation_content') myElt.style.maxHeight='250px'
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
    // mounted(){
    //     axios.get(`http://${this.hostname}:3000/app/getSQCard/${this.creditrequestCardId}`)
    //     .then(result => {
    //         this.creditrequestCardHeader = result.data[0],
    //         this.creditrequestCardLines = result.data[1]
    //         console.log(this.saleQuoteCardId)

    //     }).catch(err=>console.log(err))

    // },
}

</script>
<style scoped>
.customer-info,prospect-info{
    max-width: v-bind(creditrequestInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#line_content,#credit_content,#international_content,#prepayment_content,#notation_content,#amortissement_content{
    max-height: 5000px;
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