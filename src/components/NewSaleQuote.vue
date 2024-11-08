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
            @onCheckingItemAvailability="showItemAvaibilityInfoModal"
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
                                <span class="has-background-grey-lighter py-2 px-3" v-if="saleQuoteCustomerName"> {{ 'client '+ saleQuoteCustomerName }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" v-if="documentDate" style="border-left:1px solid black;border-right:1px solid black;">{{ documentDate }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" v-if="saleQuoteCustomerContactCode"> {{ saleQuoteCustomerContactCode }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-select-basic-1 labelInputText="Type de compte" v-model="saleQuoteAccountType" :option-list="optionLabelListForAccountType"></input-select-basic-1>

                                <input-select v-model="saleQuoteCustomerNo" labelInputText="Code client" :is_disabled="false"  @openModal="activeModalForSelectableElementList='customerList';" v-if="saleQuoteAccountType==1"></input-select>
                                
                                <input-text v-model="saleQuoteCustomerName" labelInputText="Nom du client" :is_disabled="false" :is_readOnly="true" v-if="saleQuoteAccountType==1"></input-text>
                                
                                <input-select v-model="saleQuoteCustomerContactCode" labelInputText="N° Contact" :is_disabled="false" @openModal="activeModalForSelectableElementList='contactList'" v-if="saleQuoteAccountType==1"></input-select>
                                <input-select v-model="saleQuoteCustomerContactCode" labelInputText="N° Prospect" :is_disabled="false" @openModal="activeModalForSelectableElementList='leadList'" v-else></input-select>
                                
                                <input-text v-model="saleQuoteCustomerContactName" labelInputText="Nom prospect" :is_disabled="false" v-if="saleQuoteAccountType==0"></input-text>
                                
                                <input-select v-model="saleQuoteCampaignNo" labelInputText="Code promo" :is_disabled="false" @openModal="activeModalForSelectableElementList='campaignList'"></input-select>
                                
                                <input-select v-model="saleQuoteLocationCode" labelInputText="Code magasin" :is_disabled="false" @openModal="activeModalForSelectableElementList='locationList'"></input-select>
                                
                                <input-select v-model="saleQuoteShipmentMethodCode" labelInputText="Mode de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='shipmentMethodList'"></input-select>
                                
                            </div>
                            <div class="column">
                                <input-select v-model="saleQuoteCustomerShipToCode" labelInputText="Adresse de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='addressList'"></input-select>
                                
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
                    <div id="line" v-if="false">
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="showaddRowByFormModal">
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click.prevent="deleteLine(selectedLine)">
                                        <span class="icon">
                                            <i class="fas fa-eraser has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7">
                                            Supprimer la ligne
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="line_content" class=" px-5 mt-5" style="height: 400px; overflow:scroll;">
                                <div style="margin-bottom: 300px;">
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
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of saleQuoteCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" @click="selectLine(index)">
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
                                                    <!-------div :id="index+'-'+elt['No_']+'-No_'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['No_']" @blur="onEdit" @keydown.enter="endEdit"></div--------->
                                                </td>
                                                <td class="has-text-left p-0 is-narrow" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['Description']+'-Description'" class="editme p-1 " :contenteditable="true" v-text="elt['Description']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0">
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
                                                    <!--div :id="index+'-'+elt['Location Code']+'-Location Code'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Location Code']" @blur="onEdit" @keydown.enter="endEdit"></div--->
                                                </td>
                                                <td class="has-text-left p-1 has-text-right" >
                                                    {{ elt['Bin Code'] }}
                                                </td>
                                                <td class="has-text-left p-1 has-text-right" >
                                                    {{ elt['Unit of Measure'] }}
                                                </td>
                                                <td class="has-text-left p-0" >
                                                    <div :id="index+'-'+elt['Quantity']+'-Quantity'" class="editme p-1 has-text-right" :contenteditable="elt['Type']==2"  v-text="elt['Quantity']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
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
                                                    <!----div :id="index+'-'+elt['Shipment Method Code']+'-Shipment Method Code'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Shipment Method Code']" @blur="onEdit" @keydown.enter="endEdit"></div----->
                                                </td>
                                                <td class="has-text-left p-1 has-text-right" >
                                                    {{ elt['Unit Price'] }}
                                                </td>
                                                <td class="has-text-left p-1 has-text-right" >
                                                    {{ elt['VAT _'] }}
                                                </td>
                                                <td class="has-text-left p-1 has-text-right" >
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
                                    <input-text1 :is_disabled="true" :valueInputText="totalVAT" labelInputText="Montant TVA"></input-text1>
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="totalAmountExclVAT" labelInputText="Montant HT"></input-text1>
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
                                                    <input-select v-show="itemType==2" v-model="itemLocation" labelInputText="magasin de livraison" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='locationList',isItemInfoToFill=true}"></input-select>
                                                    <input-select  v-show="itemType==2" v-model="itemBinCode" labelInputText="Emplacement" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='binCodeList',isItemInfoToFill=true}"></input-select>
                                                    <!----input-text :valueInputText="itemUnitOfMeasure" labelInputText="Unité de mesure"  :is_disabled="true"></input-text---->
                                                    <input-text  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                    <input-select  v-show="itemType==2" v-model="itemShipmentMethod" labelInputText="Mode de livraison"  :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='shipmentMethodList',isItemInfoToFill=true}"></input-select>
                                                    <input-text  v-show="itemType==2" v-model="itemUnitPrice" :valueInputText="itemUnitPrice" labelInputText="Prix unitaire" :is_disabled="false" :is_readOnly="itemType==0"></input-text>
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

<!---------sous-Section onglet 2 formulaire fiche client -----Modal de modification d'article----------------------->                         
                        <div :class="{'modal':true , 'is-active':editItemModalShowned }" v-if="editItemModalShowned">
                            <div class="modal-background has-background-white" style="opacity:0.7" @click.prevent="closeEditItemModal"></div>
                            <div class="modal-content box w-75" style=" background-color: rgba(255,255,255,1);border: none;">
                                
                                <form @submit.prevent="() => {editRowByForm(selectedLine);editItemModalShowned=false;}">

                                    <div class="has-text-left mb-5">
                                        <span class="is-size-3 subtitle ">Modification ligne devis</span>
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
                                                    <input-select  v-show="itemType==2" v-model="itemBinCode" labelInputText="Emplacement" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='binCodeList',isItemInfoToFill=true}"></input-select>
                                                    <!----input-text :valueInputText="itemUnitOfMeasure" labelInputText="Unité de mesure"  :is_disabled="true"></input-text---->
                                                    <input-text  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                    <input-select  v-show="itemType==2" v-model="itemShipmentMethod" labelInputText="Mode de livraison"  :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='shipmentMethodList',isItemInfoToFill=true}"></input-select>
                                                    <input-text  v-show="itemType==2" v-model="itemUnitPrice" :valueInputText="itemUnitPrice" labelInputText="Prix unitaire" :is_disabled="false" :is_readOnly="itemType==0"></input-text>
                                                </div>
                                                <p class="title has-text-left is-6 mt-3">Disponibilité article: </p>
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
                                                <button type="submit" class="button has-background-orange  shadow has-text-white" >
                                                    Modifier
                                                </button>
                                            </p>
                                            <p class="control">
                                                <button  class="button has-background-orange  shadow has-text-white" @click.prevent="()=>{editRowByForm(selectedLine);editItemModalShowned=false;if(saleQuoteLocationCode) addItemModalShowned=true}">
                                                    Modifier et nouveau
                                                </button>
                                            </p>
                                            <p class="control">
                                            <button class="button" @click.prevent="getItemAvailabilityInfo">
                                                Disponibilité
                                            </button>
                                            </p>
                                        </div>   
                                    </div> 
                                </form>
                            </div>
                            <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="closeEditItemModal"></button>
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
                                <a @click="expand('quote_details_content');onglet3_expanded=!onglet3_expanded" v-else>
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
                                <!---input-select labelInputText="Mode de vente" v-model="saleQuoteSalesMode"  @openModal="activeModalForSelectableElementList='salesModeList'" v-else></input-select---->

                            </div>
                            <div class="column">
                                <!---input-text labelInputText="Groupe tarifaire" :valueInputText="saleQuoteCustomerPriceGroup" :is_disabled="true" v-if="!userCanChangePriceGroup"></input-text--->
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="saleQuoteCustomerPriceGroup" :is_disabled="true" v-if="true"></input-text>
                                <input-select labelInputText="Groupe tarifaire" v-model="saleQuoteCustomerPriceGroup" @openModal="activeModalForSelectableElementList='priceGroupList'" v-else></input-select>

                                <input-text labelInputText="Conditions de paiement" :valueInputText="saleQuotePaymentTermsCode" :is_disabled="true"></input-text>
                                <!----input-select labelInputText="Conditions de paiement" v-model="saleQuotePaymentTermsCode"  @openModal="activeModalForSelectableElementList='paymentTermList'" v-else></input-select--->
                                
                                <input-text labelInputText="Régime TVA" :valueInputText="saleQuoteVATBusPostingGroup" :is_disabled="true"></input-text>
                                <!----input-select labelInputText="Régime TVA" v-model="saleQuoteVATBusPostingGroup" @openModal="activeModalForSelectableElementList='vatGroupList'" v-else ></input-select--->                               
                                
                                <input-number labelInputText="% Acompte" v-model="saleQuotePrepayment" :valueInputText="saleQuotePrepayment" :is_disabled="saleQuoteCustomerType==2"></input-number>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                </div>

<!---------composant info client----------------------->
                <customer-info class="customer-info" v-if="true"></customer-info>
                <prospect-info class="prospect-info" v-else></prospect-info>

            </div>

            <!-----------Disponibilité article-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="inventoryAvailabilityModalShowned">
                <div class="modal-background has-background-white" style="opacity:0.7" @click="inventoryAvailabilityModalShowned=false"></div>
                <div class="modal-content w-75 shadow has-background-light">
                    <inventory-availability></inventory-availability>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="inventoryAvailabilityModalShowned=false"></button>
            </div>

<!-----------Modal pour la création d'un contact-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newContactModalShowned==true">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newContactModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-contact :customerNo="saleQuoteCustomerNo" :redirectionIsDisabled="true" @submit="(elt) => {saleQuoteCustomerContactCode = elt['code'];newContactModalShowned=false} "></new-contact>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newContactModalShowned=false }"></button>
            </div>

<!-----------Modal pour la création d'une addresse-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newAddressModalShowned==true">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newAddressModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-ship-to-address :customerNo="saleQuoteCustomerNo" :contactNo="saleQuoteCustomerContactCode" :redirectionIsDisabled="true" @submit="(elt) => {saleQuoteCustomerShipToCode = elt;newAddressModalShowned=false} "></new-ship-to-address>
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
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)"
            @onDisplayingContactCreationModal="()=>showContactCreationModal()">
        </modal-for-selectable-contact-list>

        <modal-for-selectable-address-list 
            v-if="activeModalForSelectableElementList=='addressList'" 
            :isActive="activeModalForSelectableElementList=='addressList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            :customerNo="saleQuoteCustomerNo" 
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
import SQCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import SQCardRibbon from './RibbonForCard.vue'
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
import ModalForSelectablePriceGroupList from './ModalForSelectablePriceGroupList.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import ModalForSelectableLeadList from './ModalForSelectableLeadList.vue'
import ModalForSelectableLocationList from './ModalForSelectableLocationList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import SelectableItemListForSale from './SelectableItemListForSale.vue'
import InventoryAvailability from './InventoryAvailability.vue'
import NewContact from './NewContact.vue'
import NewShipToAddress from './NewShipToAddress.vue'

import { computed, onBeforeMount, onMounted, ref,watch } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import  axios  from 'axios'
import { useRouter } from 'vue-router'

//import { Buffer } from 'buffer'



export default {
    name:'sale-quote-card',
    components:{
        SQCardHeader,CustomerInfo,ProspectInfo,SQCardRibbon,
        inputText,inputText1,inputSelectBasic1,inputSelect,inputSelectBasic,inputDate,inputNumber,
        ModalForSelectableCustomerList,ModalForSelectableCampaignList,ModalForSelectablePaymentMethodList,
        ModalForSelectableShipmentMethodList,ModalForSelectableItemList,ModalForSelectableLocationList,
        ModalForSelectableContactList,ModalForSelectableAddressList,SelectableItemListForSale,ModalForSelectablePriceGroupList,
        ModalForSelectableLeadList, 
        InventoryAvailability,
        NewContact,NewShipToAddress,

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

            selectedLine:-1,

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
        const saleQuoteCardLines =  ref([])
        const saleQuoteCustomerType = ref(2)
        const userCanChangePriceGroup = ref(false)

        const newContactModalShowned= ref(false)
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

        //sac des labels de la fiche
        const labelBag = {
            optionLabelListForAccountType : ref([])
        }

        //fonction pour récupérer une liste de label pour les champs à sélection
        function getOptionLabelList(field){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Account Type]')
                    labelBag.optionLabelListForAccountType.value=result.data.recordset
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
            saleQuoteCardLines.value[index]['Location Code'] = saleQuoteCardHeaderInfo.saleQuoteLocationCode.value
            saleQuoteCardLines.value[index]['Bin Code'] = saleQuoteCardHeaderInfo.saleQuoteLocationBinCode.value
            saleQuoteCardLines.value[index]['Unit of Measure'] = item['Sales Unit of Measure']
            saleQuoteCardLines.value[index]['Shipment Method Code'] = item["Shipment Method"]?item["Shipment Method"]:saleQuoteCardHeaderInfo.saleQuoteShipmentMethodCode.value
            getVATonItem(saleQuoteCardHeaderInfo.saleQuoteVATBusPostingGroup.value,item['VAT Prod_ Posting Group'],index,'VAT _')
            itemListDropdownIsActive.value=false
            activeItemLineDropdown.value =-1
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

//Gestion des dropdown pour code magasin
//         const locationBinListDropdownIsActive = ref(false)
//         const activeLocationBinLineDropdown = ref(-1)
//         const LocationBinList = ref([])

//         function getLocationBinList(){
//             axios.get(`http://${hostname}:5000/app/getLocationList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
//             .then(result => {
//                 userLocationList=result.data.recordset
//             }).catch(err=>console.log(err))
//         }

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
            itemLineAmount:ref(0)
        }

        //objet contenant la disponibilité sur la ligne d'article à insérer
        const itemAvailabilityInfo = {
            itemInStockLocation:ref(0),
            itemOnSalesLocation:ref(0),
            itemInStockGlobal:ref(0),
            itemOnSalesGlobal:ref(0),
            itemOnPurchaseGlobal:ref(0),
        }

//fonctions pour manipuler l'ajout des lignes de notre document
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
                    'Prepayment _':saleQuoteCardHeaderInfo.saleQuotePrepayment.value,

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
                    'Prepayment _':'',

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
                    'Prepayment _':saleQuoteCardHeaderInfo.saleQuotePrepayment.value,
                })
                getVATonItem(saleQuoteCardHeaderInfo.saleQuoteVATBusPostingGroup.value,itemInfo.itemVATPGroup.value,itemInfo.itemLineNo.value-1,'VAT _')

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
                    'Prepayment _':'',
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
                    'Prepayment _':saleQuoteCardHeaderInfo.saleQuotePrepayment.value,
                })
                getVATonItem(saleQuoteCardHeaderInfo.saleQuoteVATBusPostingGroup.value,itemInfo.itemVATPGroup.value,itemInfo.itemLineNo.value-1,'VAT _')
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
            itemInfo.itemLocation.value=saleQuoteCardHeaderInfo.saleQuoteLocationCode.value
            itemInfo.itemBinCode.value=saleQuoteCardHeaderInfo.saleQuoteLocationBinCode.value
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
                'Unit Price':+itemInfo.itemUnitPrice.value*1,
                'VAT _':+itemInfo.itemVAT.value*1,
                'Line Amount':itemInfo.itemQuantity.value*itemInfo.itemUnitPrice.value,
            })
            resetForm()
        }

//Fonctions spécifiques aux articles
        function getItemAvailabilityInfo(){
            if(itemInfo.itemCode.value && itemInfo.itemLocation.value){
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
        }
        function getItemLocationBinCode(itemLocation){
            axios.get(`http://${hostname}:5000/app/getLocationBinCode/${itemLocation}?respCenter=${webUserInfo.responsibilityCenter}`)
            .then(res => {
                itemInfo.itemBinCode.value = res.data.recordset[0]['Default Bin Code']
                saleQuoteCardHeaderInfo.saleQuoteLocationBinCode.value = res.data.recordset[0]['Default Bin Code']
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


        //objet contenant les champs d'entête de notre document
        const saleQuoteCardHeaderInfo = {
            saleQuoteAccountType : ref(1),
            saleQuoteCustomerNo : ref(''),
            saleQuoteCustomerName : ref(''),
            saleQuoteCustomerContactCode : ref(''),
            saleQuoteCustomerContactName : ref(''),
            saleQuoteLeadCustomerTemplateCode : ref(''),
            saleQuoteCampaignNo : ref(''),
            saleQuoteLocationCode : ref(''),
            saleQuoteLocationBinCode : ref(''),
            saleQuoteShipmentMethodCode : ref(''),
            saleQuoteCustomerShipToCode : ref(''),
            saleQuotePaymentMethodCode : ref(''),
            saleQuoteResponsibilityCenter : ref(''),
            saleQuoteSalesperson : ref(''),
            saleQuoteSalesChannel : ref(''),
            saleQuoteSalesMode : ref(''),
            saleQuoteCustomerPriceGroup : ref(''),
            saleQuoteVATBusPostingGroup : ref(''),
            saleQuotePaymentTermsCode : ref(''),
            saleQuotePrepayment: ref(0),
        }

//Propriétés caluculés pour les totaux des lignes
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


//fonctions pour remplir les champs avec via des listes sélectionnables
        function fillCustomerInfoField(customer){
            saleQuoteCardHeaderInfo.saleQuoteCustomerNo.value=customer['No_']
            saleQuoteCardHeaderInfo.saleQuoteCustomerName.value=customer['Name']
            saleQuoteCardHeaderInfo.saleQuoteCustomerContactCode.value=customer["Primary Contact No_"]
            saleQuoteCardHeaderInfo.saleQuotePaymentMethodCode.value=customer['Payment Method Code']
            saleQuoteCardHeaderInfo.saleQuotePaymentTermsCode.value=customer['Payment Terms Code']
            saleQuoteCardHeaderInfo.saleQuotePrepayment.value=customer['Prepayment _']
            saleQuoteCardHeaderInfo.saleQuoteShipmentMethodCode.value=customer['Shipment Method Code']
            saleQuoteCardHeaderInfo.saleQuoteVATBusPostingGroup.value=customer['VAT Bus_ Posting Group']
            saleQuoteCardHeaderInfo.saleQuoteCustomerPriceGroup.value=customer['Customer Price Group']?customer['Customer Price Group']:useWebUserInfoStore().defaultUserPriceGroup
            saleQuoteCardHeaderInfo.saleQuoteCustomerShipToCode.value=customer['Ship-to Code']
            saleQuoteCardHeaderInfo.saleQuoteSalesMode.value=customer['Sales Mode']
            saleQuoteCustomerType.value=customer['Customer Type']
            saleQuoteCardHeaderInfo.saleQuoteLeadCustomerTemplateCode.value=''

        }
        function fillContactInfoField(contact){
            saleQuoteCardHeaderInfo.saleQuoteCustomerContactCode.value=contact['No_']
        }
        function fillLeadInfoField(lead){
            saleQuoteCardHeaderInfo.saleQuoteCustomerContactCode.value=lead['No_']
            saleQuoteCardHeaderInfo.saleQuoteCustomerContactName.value=lead['Name']
            saleQuoteCardHeaderInfo.saleQuoteLeadCustomerTemplateCode.value=lead['Customer Template Code']
            saleQuoteCustomerType.value=lead['Lead Type']
            saleQuoteCardHeaderInfo.saleQuotePrepayment.value=lead['Prepayment _']
            saleQuoteCardHeaderInfo.saleQuotePaymentMethodCode.value=lead['Payment Method Code']
            saleQuoteCardHeaderInfo.saleQuotePaymentTermsCode.value=lead['Payment Terms Code']
            saleQuoteCardHeaderInfo.saleQuoteVATBusPostingGroup.value=lead['VAT Bus_ Posting Group']
            saleQuoteCardHeaderInfo.saleQuoteCustomerPriceGroup.value=lead['Customer Price Group']?lead['Customer Price Group']:useWebUserInfoStore().defaultUserPriceGroup
            saleQuoteCardHeaderInfo.saleQuoteSalesMode.value=lead['Sales Mode']
            
            //champs lié au client mais pas au prospect
            saleQuoteCardHeaderInfo.saleQuoteCustomerNo.value=''
            saleQuoteCardHeaderInfo.saleQuoteCustomerName.value=''
            saleQuoteCardHeaderInfo.saleQuoteShipmentMethodCode.value=''
            saleQuoteCardHeaderInfo.saleQuoteCustomerShipToCode.value=''
        }
        function fillLocationInfoField(location){
            if(isItemInfoToFill.value){
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
                isItemInfoToFill.value=false
            }else{
                saleQuoteCardHeaderInfo.saleQuoteLocationCode.value = location['Code']
                saleQuoteCardHeaderInfo.saleQuoteLocationBinCode.value = location['Default Bin Code']
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
            }
        }
        function fillAddressInfoField(address){
            saleQuoteCardHeaderInfo.saleQuoteCustomerShipToCode.value = address["Code"]
        }
        function fillCampaignInfoField(campaign){
            saleQuoteCardHeaderInfo.saleQuoteCampaignNo.value=campaign["No_"]
        }
        function fillPriceGroupInfoField(priceGroup){
            saleQuoteCardHeaderInfo.saleQuoteCustomerPriceGroup.value= priceGroup['Code']
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
            //itemInfo.itemLocation.value = saleQuoteCardHeaderInfo.saleQuoteLocationCode.value
            itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
            itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:saleQuoteCardHeaderInfo.saleQuoteShipmentMethodCode.value
            itemInfo.itemVATPGroup.value = item['VAT Prod_ Posting Group']

            // if (itemInfo.itemLocation.value && ){
            //     getItemLocationBinCode(itemInfo.itemLocation.value)
            // }

                getItemAvailabilityInfo()
        }
  
//fonctions pour créer le document
        function createSaleQuote(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                error_message.value=''
                setTimeout(()=> router.push(`/saleQuoteCard/${res.data.documentNo}`),3000)
            })
            .catch(err => {
                displayErrorMessage(err)
            })
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
                'Customer Template Code': saleQuoteCardHeaderInfo.saleQuoteLeadCustomerTemplateCode.value?saleQuoteCardHeaderInfo.saleQuoteLeadCustomerTemplateCode.value:'',
                'System Decision':0,
                'Investigator Opinion':0,
                'Analyst Opinion':0,
                'Analyst comments':'',
                saleQuoteLines:[
                    ...saleQuoteCardLines.value
                ]
            }
            createSaleQuote(formatToBCJsonData(JSData))
        }
    
//fonctions de formattage
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }
    
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


        const saleModeHasBeenInitialized = ref(false)
        watch(saleQuoteCardHeaderInfo.saleQuoteSalesMode, (newValue, oldValue) => {
            if(newValue !== oldValue && saleModeHasBeenInitialized.value==false)
                if(saleQuoteCardHeaderInfo.saleQuotePaymentTermsCode.value)
                    saleQuoteCardHeaderInfo.saleQuotePaymentTermsCode.value=''
        })
        watch(lineHasBeenDeleted, () => {
            if(lineHasBeenDeleted.value){
                let i = 1
                saleQuoteCardLines.value.map(row => row['Line No_'] = i++)
                lineHasBeenDeleted.value =false
            }
        })
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
            getOptionLabelList('[Account Type]')

        })
        onMounted(() => {
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }
            if(useWebUserInfoStore().defaultLocation){
                getItemLocationBinCode(useWebUserInfoStore().defaultLocation)
                itemInfo.itemLocation.value = useWebUserInfoStore().defaultLocation
            }
            webUserInfo = { ...useWebUserInfoStore().getWebUser }
            
            saleQuoteCardHeaderInfo.saleQuoteCustomerNo.value =webUserInfo.defaultCustomerNo
            saleQuoteCardHeaderInfo.saleQuoteCustomerName.value = webUserInfo.defaultCustomerName
            saleQuoteCardHeaderInfo.saleQuoteCustomerContactCode.value = webUserInfo.defaultCustomerContactCode
            saleQuoteCardHeaderInfo.saleQuoteLocationCode.value = webUserInfo.defaultLocation
            saleQuoteCardHeaderInfo.saleQuoteShipmentMethodCode.value = webUserInfo.defaultCustomerShipmentMethodCode
            saleQuoteCardHeaderInfo.saleQuoteCustomerShipToCode.value = webUserInfo.defaultCustomerShipToCode
            saleQuoteCardHeaderInfo.saleQuotePaymentMethodCode.value = webUserInfo.defaultCustomerPaymentMethodCode
            saleQuoteCardHeaderInfo.saleQuoteResponsibilityCenter.value = webUserInfo.responsibilityCenter
            saleQuoteCardHeaderInfo.saleQuoteSalesperson.value = webUserInfo.defaultSalesPersonCode
            saleQuoteCardHeaderInfo.saleQuoteSalesChannel.value = webUserInfo.defaultSalesChannel
            saleModeHasBeenInitialized.value = true
            saleQuoteCardHeaderInfo.saleQuoteSalesMode.value = webUserInfo.defaultCustomerSalesMode
            saleQuoteCardHeaderInfo.saleQuoteCustomerPriceGroup.value = webUserInfo.defaultCustomerPriceGroup?webUserInfo.defaultCustomerPriceGroup:useWebUserInfoStore().defaultUserPriceGroup
            saleQuoteCardHeaderInfo.saleQuoteVATBusPostingGroup.value = webUserInfo.defaultCustomerVATBusPostingGroup
            saleQuoteCardHeaderInfo.saleQuotePaymentTermsCode.value = useWebUserInfoStore().defaultCustomerPaymentTermsCode
            saleQuoteCardHeaderInfo.saleQuotePrepayment.value = webUserInfo.defaultCustomerPrepayment

            userCanChangePriceGroup.value = useWebUserInfoStore().canChangePriceGroup

            getUserItemList()
            getUserLocationList()
            getShipmentMethodList()
        })
       
    
    
        
        
        
        
    
    
        



        return{
            isItemInfoToFill,
            ...saleQuoteCardHeaderInfo,saleQuoteCardLines,saleQuoteCustomerType,
            ...dateInfo,
            ...itemInfo,...itemAvailabilityInfo,
            fillCustomerInfoField,fillContactInfoField,fillLocationInfoField,fillAddressInfoField,fillPriceGroupInfoField,
            fillCampaignInfoField,fillPaymentMethodInfoField,fillShipmentMethodInfoField,fillItemInfoField,fillLeadInfoField,
            addEmptyRow,addCommentRow,addRowByForm_andContinue,addRowByForm_andClose,resetForm,
            editRowByForm,
            submitForm,
            error_message,error_message_code,success_message,submitting_message,
            lineHasBeenDeleted,getLineDataToEdit,getItemAvailabilityInfo,
            totalVAT,totalAmountExclVAT,totalAmountIncVAT,
            itemListDropdownIsActive,activeItemLineDropdown,userItemList,fillLineByItemCode,
            locationListDropdownIsActive,activeLocationLineDropdown,userLocationList,fillLineByLocationCode,
            shipmentMethodListDropdownIsActive,activeshipmentMethodLineDropdown,shipmentMethodList,fillLineByShipmentMethodCode,
            ...labelBag,
            newContactModalShowned,newAddressModalShowned,
            userCanChangePriceGroup,

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
        showaddRowByFormModal(){
            if (this.saleQuoteLocationCode){
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
                this.getLineDataToEdit(this.selectedLine)
                this.editItemModalShowned = true
            }
        },
        ////////////////////////methode pour fermer le formulaire de modification d'article
        closeEditItemModal(){
            this.editItemModalShowned=false
            this.resetForm()
        },
        //////////////////////////methode pour afficher le modal de disponibilité article
        showItemAvaibilityInfoModal(){
            this.inventoryAvailabilityModalShowned = true
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
            //console.log(id)
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
        displayShipmentMethodListDropdown(index){
            this.activeshipmentMethodLineDropdown =index
            this.shipmentMethodListDropdownIsActive=true
        },
        closeShipmentMethodListDropdown(){
            this.activeshipmentMethodLineDropdown =-1
            this.shipmentMethodListDropdownIsActive=false
        },
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

.has-background-orange1{
    background-color: orange
}

.has-background-orange-light{
    background-color: rgba(255, 155, 118, 0.332);
}
.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}

div[contenteditable="true"]:focus {
    outline: none; /* Remove the default focus outline */
    border: 2px solid rgba(255, 89, 0, 0.437); /* Add your desired border style */
    background-color: #f9f9f9; /* Change the background color */
    /* Add any other styles you want */
}

</style>