<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <s-o-card-Header :soNo="'Client N° : '+saleOrderCustomerNo" :soDesc="saleOrderCustomerName" pageTitle="Commande vente"
                @onGoingBackToList='goBackToList'
                ></s-o-card-Header>
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <s-o-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onSubmittingForm="controlBeforeCreate"
            @onCheckingItemAvailability="showItemAvaibilityInfoModal"
            componentWithCompInfo="newOrderRightInfoMaxWidth"
            :newCardBtnIsDisabled="true"
            :editCardBtnIsDisabled="true"
            :printCardBtnIsDisabled="true"
            :convertQuoteBtnIsDisabled="true"
            :readOnlyModeIsDisabled="true"
            :cancelEditCardBtnIsDisabled="true"
            :checkItemAvailabilityBtnIsDisabled="false"
            ></s-o-card-ribbon>

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
                                <span class="has-background-grey-lighter py-2 px-3" v-if="saleOrderCustomerName"> {{ 'client '+ saleOrderCustomerName }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" v-if="documentDate" style="border-left:1px solid black;border-right:1px solid black;">{{ documentDate }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" v-if="saleOrderCustomerContactCode"> {{ saleOrderCustomerContactCode }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-select v-model="saleOrderCustomerNo" labelInputText="Code client" :is_disabled="false"  @openModal="activeModalForSelectableElementList='customerList';"></input-select>
                                
                                <input-text v-model="saleOrderCustomerName" labelInputText="Nom du client" :is_disabled="false" :is_readOnly="true" ></input-text>
                                
                                <input-select v-model="saleOrderCustomerContactCode" labelInputText="N° Contact" :is_disabled="false" @openModal="activeModalForSelectableElementList='contactList'"></input-select>
                                
                                <input-select v-model="saleOrderCampaignNo" labelInputText="Code promo" :is_disabled="false" @openModal="activeModalForSelectableElementList='campaignList'"></input-select>
                                
                                <input-select v-model="saleOrderLocationCode" labelInputText="Code magasin" :is_disabled="false" @openModal="activeModalForSelectableElementList='locationList'"></input-select>
                                
                                <input-select v-model="saleOrderShipmentMethodCode" labelInputText="Mode de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='shipmentMethodList'"></input-select>
                                
                            </div>
                            <div class="column">
                                <input-select v-model="saleOrderCustomerShipToCode" labelInputText="Adresse de livraison" :is_disabled="false" @openModal="activeModalForSelectableElementList='addressList'"></input-select>
                                
                                <input-date v-model="documentDate" labelInputText="Date de la commande"  :is_disabled="false"></input-date>
                                                                
                                <input-date v-model="shipRequestedDate" labelInputText="Date livraison demandée"  :is_disabled="false"></input-date>
                                
                                <input-date v-model="promisedDeliveryDate" labelInputText="Date livraison promise" :is_disabled="false" ></input-date>
                                
                                <input-select v-model="saleOrderPaymentMethodCode" labelInputText="Mode de règlement" :is_disabled="false" @openModal="activeModalForSelectableElementList='paymentMethodList'"></input-select>
                                
                                <!----input-select v-model="saleOrderContractNo" labelInputText="Code Contrat AGP" :is_disabled="false" @openModal="activeModalForSelectableElementList='contractList'"></input-select---->
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded" @click="showaddRowByForm">
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
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet2_expanded"  @click="deleteLine(selectedLine)">
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
                                <div style="margin-bottom: 300px;">
                                    <table class="table  is-narrow  is-fullwidth">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° ligne</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 150px;">Code Article</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 150px;">Magasin de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Emplacement</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de vente</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 150px;">Mode de livraison</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">%Remise ligne</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant remise ligne</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">TVA</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" @click="selectLine(index)">
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
                                                    <!---div :id="index+'-'+elt['No_']+'-No_'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['No_']" @blur="onEdit" @keydown.enter="endEdit"></div---->
                                                </td>
                                                <td class="has-text-left p-0 is-narrow" style="min-width: 300px;">
                                                    <div :id="index+'-'+elt['Description']+'-Description'" class="editme p-1" :contenteditable="true" v-text="elt['Description']" @blur="onEdit" @keydown.enter="endEdit"></div>
                                                </td>
                                                <td class="has-text-left p-0" >
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
                                                    <!-------div :id="index+'-'+elt['Location Code']+'-Location Code'" class="editme p-1" :contenteditable="elt['Type']==2" v-text="elt['Location Code']" @blur="onEdit" @keydown.enter="endEdit"></div------->
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
                                                    <!-------div :id="index+'-'+elt['Shipment Method Code']+'-Shipment Method Code'" class="editme p-1" :contenteditable="elt['Type']==2"  v-text="elt['Shipment Method Code']" @blur="onEdit" @keydown.enter="endEdit"></div--->
                                                </td>
                                                <td class="has-text-left p-1 has-text-right" >
                                                    {{ elt['Unit Price'] }}
                                                </td>
                                                <td class="has-text-left p-1 has-text-right" >
                                                    {{ elt['Line Discount _'] }}
                                                </td>
                                                <td class="has-text-left p-1 has-text-right" >
                                                    {{ elt['Line Discount Amount'] }}
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
                                <div v-if="saleOrderCardLines.length==0">Il n'y'a rien à afficher</div>
                            </div>     
                            <div class="columns mt-3" id="line_total" v-if="onglet2_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="totalVAT" labelInputText="Montant TVA"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="totalAmountExclVAT" labelInputText="Montant HT"></input-text1>
                                    <input-text1 :is_disabled="true" :valueInputText="totalAmountIncVAT" labelInputText="Montant TTC"></input-text1>
                                </div>
                            </div>   
                        </div>
                        
<!---------sous-Section onglet 2 formulaire fiche client -----Modal d'ajout d'article----------------------->                         
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
                                                    <input-select  v-show="itemType==2" v-model="itemBinCode" labelInputText="Emplacement" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='binCodeList',isItemInfoToFill=true}"></input-select>
                                                    <!----input-text :valueInputText="itemUnitOfMeasure" labelInputText="Unité de mesure"  :is_disabled="true"></input-text---->
                                                    <input-number  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité" @onChangingInputValue="submitSOLineItemPriceRequest" :is_disabled="false" ></input-number>
                                                    <input-select  v-show="itemType==2" v-model="itemShipmentMethod" labelInputText="Mode de livraison"  :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='shipmentMethodList',isItemInfoToFill=true}"></input-select>
                                                    <input-text  v-show="itemType==2" v-model="itemUnitPrice" :valueInputText="itemUnitPrice" labelInputText="Prix unitaire" :is_disabled="false" :is_readOnly="true" :is_loading="itemPriceIsGetting"></input-text>
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
                                            <button type="submit" class="button has-background-orangered  shadow has-text-white">
                                                Ajouter et continuer
                                            </button>
                                            </p>
                                            <p class="control">
                                            <button class="button has-background-orangered  shadow has-text-white" @click.prevent="()=>{addRowByForm_andClose();addItemModalShowned=false}">
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
                                                    <input-select  v-show="itemType==2" v-model="itemBinCode" labelInputText="Emplacement" :is_disabled="false" :is_readOnly="itemType==0" @openModal="()=>{activeModalForSelectableElementList='binCodeList',isItemInfoToFill=true}"></input-select>
                                                    <!----input-text :valueInputText="itemUnitOfMeasure" labelInputText="Unité de mesure"  :is_disabled="true"></input-text---->
                                                    <input-number  v-show="itemType==2" v-model="itemQuantity" labelInputText="Quantité"  :is_disabled="false" @onChangingInputValue="submitSOLineItemPriceRequest"></input-number>
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
                                                <button type="submit" class="button has-background-orangered  shadow has-text-white" >
                                                    Modifier
                                                </button>
                                            </p>
                                            <p class="control">
                                                <button  class="button has-background-orangered  shadow has-text-white" @click.prevent="()=>{editRowByForm(selectedLine);editItemModalShowned=false;if(saleQuoteLocationCode) addItemModalShowned=true}">
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
                    <div id="order-details">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('order_details_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>Détails facture</span>
                                </a>
                                <a @click="expand('order_details_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                    <span>Détails facture</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7" v-if="onglet3_expanded">Afficher plus</div>
                        </div>
                        <div id="order_details_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Centre de gestion" :valueInputText="saleOrderResponsibilityCenter" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Code vendeur" :valueInputText="saleOrderSalesperson" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Point de vente" :valueInputText="saleOrderStoreCode" :is_disabled="true"></input-text>

                                <input-text labelInputText="Canal de vente" :valueInputText="saleOrderSalesChannel" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Mode de vente" :valueInputText="saleOrderSalesMode" :is_disabled="true" v-if="saleOrderCustomerType==2"></input-text>
                                <input-select labelInputText="Mode de vente" v-model="saleOrderSalesMode"  @openModal="activeModalForSelectableElementList='salesModeList'" v-else></input-select>
                                
                                <!----input-text labelInputText="Groupe tarifaire" :valueInputText="saleOrderCustomerPriceGroup" :is_disabled="true" v-if="!userCanChangePriceGroup"></input-text---->
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="saleOrderCustomerPriceGroup" :is_disabled="true" v-if="true"></input-text>
                                <input-select labelInputText="Groupe tarifaire" v-model="saleOrderCustomerPriceGroup" @openModal="activeModalForSelectableElementList='priceGroupList'" v-else></input-select>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Régime TVA" :valueInputText="saleOrderVATBusPostingGroup" :is_disabled="true" v-if="saleOrderCustomerType==2"></input-text>
                                <input-select labelInputText="Régime TVA" v-model="saleOrderVATBusPostingGroup" @openModal="activeModalForSelectableElementList='vatGroupList'" v-else ></input-select>                               

                                <input-text labelInputText="Groupe compta. client" :valueInputText="saleOrderCustomerPostingGroup" :is_disabled="true"></input-text>

                                <input-text labelInputText="Groupe compta. marché" :valueInputText="saleOrderGenBusPostingGroup" :is_disabled="true"></input-text>

                                <input-text labelInputText="Conditions de paiement" :valueInputText="saleOrderPaymentTermsCode" :is_disabled="true" v-if="saleOrderCustomerType==2"></input-text>
                                <input-select labelInputText="Conditions de paiement" v-model="saleOrderPaymentTermsCode"  @openModal="activeModalForSelectableElementList='paymentTermList'" v-else></input-select>

                                <input-number labelInputText="% Acompte" v-model="saleOrderPrepayment" :valueInputText="saleOrderPrepayment" :is_disabled="saleOrderCustomerType==2"></input-number>
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
                    <new-contact :customerNo="saleOrderCustomerNo" :redirectionIsDisabled="true" @submit="(elt) => {saleOrderCustomerContactCode = elt['code'];newContactModalShowned=false} "></new-contact>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newContactModalShowned=false }"></button>
            </div>

<!-----------Modal pour la création d'une addresse-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newAddressModalShowned==true">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newAddressModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-ship-to-address :customerNo="saleOrderCustomerNo" :contactNo="saleOrderCustomerContactCode" :redirectionIsDisabled="true" @submit="(elt) => {saleOrderCustomerShipToCode = elt;newAddressModalShowned=false} "></new-ship-to-address>
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
            :customerNo="saleOrderCustomerNo" 
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

        <modal-for-selectable-contract-list 
            v-if="activeModalForSelectableElementList=='contractList'" 
            :isActive="activeModalForSelectableElementList=='contractList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="saleOrderCustomerNo" 
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
            :salesMode="saleOrderSalesMode"
            @onGettingLineFromSelectablePaymentTermListModal="(elt)=>fillPaymentTermInfoField(elt)">
        </modal-for-selectable-payment-term-list>


    </div>     
</template>
<script>
import SOCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import SOCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputText1 from './input/input-text1.vue'
import inputNumber from './input/input-number.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic from './input/input-select-basic.vue'
import inputDate from './input/input-date.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableCampaignList from './ModalForSelectableCampaignList.vue'
import ModalForSelectableShipmentMethodList from './ModalForSelectableShipmentMethodList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectablePriceGroupList from './ModalForSelectablePriceGroupList.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import ModalForSelectableLocationList from './ModalForSelectableLocationList.vue'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForSelectableAddressList from './ModalForSelectableAddressList.vue'
import ModalForSelectableVatBusPostingGroupList from './ModalForSelectableVATBUSPostingGroupList.vue'
import ModalForSelectablePaymentTermList from './ModalForSelectablePaymentTermList.vue'
import ModalForSelectableSalesModeList from './ModalForSelectableSalesModeList.vue'
import ModalForSelectableContractList from './ModalForSelectableContractList.vue'
import SelectableItemListForSale from './SelectableItemListForSale.vue'
import InventoryAvailability from './InventoryAvailability.vue'
import NewContact from './NewContact.vue'
import NewShipToAddress from './NewShipToAddress.vue'

import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import  axios  from 'axios'
import { useRouter } from 'vue-router'

//import { Buffer } from 'buffer'



export default {
    name:'sale-order-card',
    components:{
        SOCardHeader,CustomerInfo,ProspectInfo,SOCardRibbon,
        inputText,inputText1,inputSelect,inputSelectBasic,inputDate,inputNumber,
        ModalForSelectableCustomerList,ModalForSelectableCampaignList,ModalForSelectablePaymentMethodList,
        ModalForSelectableShipmentMethodList,ModalForSelectableItemList,ModalForSelectableLocationList,ModalForSelectablePriceGroupList,
        ModalForSelectableContactList,ModalForSelectableAddressList,SelectableItemListForSale, ModalForSelectableContractList,
        ModalForSelectableVatBusPostingGroupList,ModalForSelectablePaymentTermList,ModalForSelectableSalesModeList,
        InventoryAvailability,
        NewContact,NewShipToAddress,
    },
    data(){
        return{

            //list:[],
            //taille (hauteur) initiale des onglets de la page
            height:'700px',

            //taille (largeur) initiale du composant custumerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.newOrderRightInfoMaxWidth,

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
        const saleOrderCardLines =  ref([])
        const saleOrderLocationBinCode = ref('')
        const userCanChangePriceGroup = ref(false)

        const saleOrderCustomerType = ref(2)

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

        //objet contenant nos champs de date
        const dateInfo = {
            documentDate : ref(currentDate),
            shipRequestedDate : ref(currentDate),
            promisedDeliveryDate : ref(currentDate),
        }

        //objet contenant les infos sur l'utilisateur connecté
        let webUserInfo = {}

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
            saleOrderCardLines.value[index]['Location Code'] = saleOrderCardHeaderInfo.saleOrderLocationCode
            saleOrderCardLines.value[index]['Bin Code'] = saleOrderLocationBinCode.value
            saleOrderCardLines.value[index]['Unit of Measure'] = item['Sales Unit of Measure']
            saleOrderCardLines.value[index]['Shipment Method Code'] = item["Shipment Method"]?item["Shipment Method"]:saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value
            saleOrderCardLines.value[index]['VAT Bus. Posting Group'] = saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value

            getVATonItem(saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,item['VAT Prod_ Posting Group'],index,'VAT _')
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
            saleOrderCardLines.value[index]['Location Code'] = location['Code']
            saleOrderCardLines.value[index]['Bin Code'] = location['Default Bin Code']
            locationListDropdownIsActive.value=false
            activeLocationLineDropdown.value =-1
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
            itemUnitPrice: ref(0),
            itemLineDiscount :ref(0),
            itemLineDiscountAmount:ref(0),
            itemVAT:ref(0),
            itemLineAmount:ref(0),
            itemGenProdPosGroup:ref(''),
            itemVATProdPosGroup:ref('')
        }

        //objet contenant la disponibilité sur la ligne d'article à insérer
        const itemAvailabilityInfo = {
            itemInStockLocation:ref(0),
            itemOnSalesLocation:ref(0),
            itemInStockGlobal:ref(0),
            itemOnSalesGlobal:ref(0),
            itemOnPurchaseGlobal:ref(0),
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
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':''
                })
                itemInfo.itemLineNo.value=saleOrderCardLines.value.length +1
        }
        function addRowByForm_andContinue(){
            if (itemInfo.itemType.value==2){
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
                    Quantity:itemInfo.itemQuantity.value,
                    'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                    'Unit Price':itemInfo.itemUnitPrice.value,
                    'Line Discount _':itemInfo.itemLineDiscount.value,
                    'Line Discount Amount':0,
                    'VAT _':itemInfo.itemVAT.value,
                    'Line Amount':itemInfo.itemQuantity.value*itemInfo.itemUnitPrice.value,
                    'VAT Bus. Posting Group':itemInfo.itemGenProdPosGroup.value,
                    'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
                })
                getVATonItem(saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,itemInfo.itemVATProdPosGroup.value,itemInfo.itemLineNo.value-1,'VAT _')

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
                    'VAT Bus. Posting Group':'',
                    'VAT Prod_ Posting Group':''
                })
            }
            itemInfo.itemLineNo.value++
            resetForm()
        }
        function addRowByForm_andClose(){
            if (itemInfo.itemType.value==2){
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
                    Quantity:itemInfo.itemQuantity.value,
                    'Shipment Method Code':itemInfo.itemShipmentMethod.value,
                    'Unit Price':itemInfo.itemUnitPrice.value,
                    'Line Discount _':itemInfo.itemLineDiscount.value,
                    'Line Discount Amount':0,
                    'VAT _':itemInfo.itemVAT.value,
                    'Line Amount':itemInfo.itemQuantity.value*itemInfo.itemUnitPrice.value,
                    'VAT Bus. Posting Group':itemInfo.itemGenProdPosGroup.value,
                    'VAT Prod_ Posting Group':itemInfo.itemVATProdPosGroup.value
                })

                getVATonItem(saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,itemInfo.itemVATProdPosGroup.value,itemInfo.itemLineNo.value-1,'VAT _')

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
                'Unit Price':itemInfo.itemUnitPrice.value?itemInfo.itemUnitPrice.value:0,
                'Line Discount _':itemInfo.itemLineDiscount.value,  
                'Line Discount Amount':itemInfo.itemLineDiscountAmount.value,
                'VAT _':itemInfo.itemVAT.value,
                'Line Amount':itemInfo.itemQuantity.value*itemInfo.itemUnitPrice.value,
            })
            if(itemInfo.itemVATProdPosGroup.value){
                getVATonItem(saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,itemInfo.itemVATProdPosGroup.value,index,'VAT _')
            }
            resetForm()
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
            .catch((err) => {
                console.log(err)
            })
        }
        function getItemLocationBinCode(itemLocation){
            axios.get(`http://${hostname}:5000/app/getLocationBinCode/${itemLocation}?respCenter=${webUserInfo.responsibilityCenter}`)
            .then(res => {
                const binCode = res.data.recordset[0]['Shipment Bin Code']?res.data.recordset[0]['Shipment Bin Code']:''
                itemInfo.itemBinCode.value = binCode
                itemInfo.itemLocation.value = itemLocation
                saleOrderLocationBinCode.value = binCode            })
            .catch(err => console.log(err))
        }
        function getVATonItem(VATOnCust,VATOnItem,lineNo,lineAttrib){
            axios.get(`http://${hostname}:5000/app/getItemVAT?VATOnItem=${VATOnItem}&VATOnCust=${VATOnCust}`)
            .then(result =>{
                saleOrderCardLines.value[lineNo][lineAttrib]=Number(result.data)
            })
            .catch(err => console.log(err))
        }

//Propriétés caluculés pour les totaux des lignes
        const totalVAT = computed(() => {
            let sum = 0
            saleOrderCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + elt['Line Amount'] * elt['VAT _'] /100
            })
            return sum
        })
        const totalAmountExclVAT = computed(()=> {
            let sum = 0
            saleOrderCardLines.value.forEach(elt =>{
                if(elt['Type']==2)
                    sum = sum + elt['Line Amount']
            })
            return sum
        })
        const totalAmountIncVAT = computed(() => {
            return totalAmountExclVAT.value + totalVAT.value
        })

        //objet contenant les champs d'entête de notre document
        const saleOrderCardHeaderInfo = {
            saleOrderCustomerNo : ref(''),
            saleOrderCustomerName : ref(''),
            saleOrderCustomerContactCode : ref(''),
            saleOrderCampaignNo : ref(''),
            saleOrderLocationCode : ref(''),
            saleOrderLocationBinCode : ref(''),
            saleOrderShipmentMethodCode : ref(''),
            saleOrderCustomerShipToCode : ref(''),
            saleOrderPaymentMethodCode : ref(''),
            saleOrderResponsibilityCenter : ref(''),
            saleOrderSalesperson : ref(''),
            saleOrderSalesChannel : ref(''),
            saleOrderSalesMode : ref(''),
            saleOrderStoreCode : ref(''),
            saleOrderCustomerPriceGroup : ref(''),
            saleOrderCustomerPostingGroup : ref(''),
            saleOrderGenBusPostingGroup : ref(''),
            saleOrderVATBusPostingGroup : ref(''),
            saleOrderPaymentTermsCode : ref(''),
            saleOrderPrepayment: ref(0),
            saleOrderContractNo:ref('')
        }

//fonctions pour remplir les champs avec via des listes sélectionnables
        function fillCustomerInfoField(customer){
            saleOrderCardHeaderInfo.saleOrderCustomerNo.value=customer['No_']
            saleOrderCardHeaderInfo.saleOrderCustomerName.value=customer['Name']
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=customer['Primary Contact No_']
            saleOrderCardHeaderInfo.saleOrderPaymentMethodCode.value=customer['Payment Method Code']
            saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value=customer['Payment Terms Code']
            saleOrderCardHeaderInfo.saleOrderPrepayment.value=customer['Prepayment _']
            saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value=customer['Shipment Method Code']
            saleOrderCardHeaderInfo.saleOrderCustomerPostingGroup.value=customer['Customer Posting Group']
            saleOrderCardHeaderInfo.saleOrderGenBusPostingGroup.value=customer['Gen_ Bus_ Posting Group']
            saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value=customer['VAT Bus_ Posting Group']
            saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value=customer['Customer Price Group']?customer['Customer Price Group']:useWebUserInfoStore().defaultUserPriceGroup
            saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value=customer['Ship-to Code']
            saleModeHasBeenInitialized.value = true
            saleOrderCardHeaderInfo.saleOrderSalesMode.value=customer['Sales Mode']
            saleOrderCustomerType.value=customer['Customer Type']
        }
        function fillContactInfoField(contact){
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=contact['No_']
        }
        function fillContractInfoField(contract){
            saleOrderCardHeaderInfo.saleOrderContractNo.value= contract['No_']
        }
        function fillLocationInfoField(location){
            if(isItemInfoToFill.value){
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
                isItemInfoToFill.value=false
            }else{
                saleOrderCardHeaderInfo.saleOrderLocationCode.value = location['Code']
                saleOrderLocationBinCode.value = location['Default Bin Code']
                itemInfo.itemLocation.value=location['Code']
                itemInfo.itemBinCode.value=location['Default Bin Code']
            }
        }
        function fillAddressInfoField(address){
            saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value = address["Code"]
        }
        function fillCampaignInfoField(campaign){
            saleOrderCardHeaderInfo.saleOrderCampaignNo.value=campaign["No_"]
        }
        function fillPriceGroupInfoField(priceGroup){
            saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value= priceGroup['Code']
        }
        function fillPaymentMethodInfoField(paymentMethod){
            saleOrderCardHeaderInfo.saleOrderPaymentMethodCode.value=paymentMethod["Code"]
        }
        function fillShipmentMethodInfoField(shipmentMethod){
            if(isItemInfoToFill.value){
                itemInfo.itemShipmentMethod.value=shipmentMethod['Code']
                isItemInfoToFill.value=false
            }else{
                saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value=shipmentMethod["Code"]
            }
        }
        function fillItemInfoField(item){
            itemInfo.itemType.value = 2
            itemInfo.itemCode.value = item['No_']
            itemInfo.itemDescription.value = item['Description']
            itemInfo.itemDescription2.value = item['Description 2']
            //itemInfo.itemLocation.value = saleOrderCardHeaderInfo.saleOrderLocationCode.value
            itemInfo.itemUnitOfMeasure.value = item['Sales Unit of Measure']
            itemInfo.itemShipmentMethod.value = item["Shipment Method"]?item["Shipment Method"]:saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value
            itemInfo.itemVATProdPosGroup.value = item['VAT Prod_ Posting Group']
            itemInfo.itemGenProdPosGroup.value= saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value
            
            if (!itemInfo.itemLocation.value){
                itemInfo.itemLocation.value = saleOrderCardHeaderInfo.saleOrderLocationCode.value
                itemInfo.itemBinCode.value = saleOrderLocationBinCode.value
            }
            getItemAvailabilityInfo()
        }
        function fillVATGroupInfoField(VATGroup){
            saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value= VATGroup['Code']
        }
        function fillSalesModeInfoField(salesMode){
            saleModeHasBeenInitialized.value=false
            saleOrderCardHeaderInfo.saleOrderSalesMode.value= salesMode['Code']
        }
        function fillPaymentTermInfoField(paymentTerm){
            saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value= paymentTerm['Code']
            saleOrderCardHeaderInfo.saleOrderPrepayment.value= paymentTerm['Prepayment']
        }

//Gestion des control avant soumission
        function contactFieldIsrequired(){
            if (saleOrderCustomerType.value==null){
                error_message.value='La valeur du customer est null!'
                error_message_code.value = 'BAD_REQUEST'
            }
            if(saleOrderCustomerType.value==2)
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

        function controlBeforeCreate(){
            submitting_message.value='Enregistrement en cours'

            if(contactFieldIsrequired() && !saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value){
                submitting_message.value=''
                error_message.value ='Le code contact est obligatoire pour les clients divers'
                error_message_code.value ='FIELD_REQUIRED'
                return -1
            }
            if(shipToAddressIsRequired() && !saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value){
                submitting_message.value=''
                error_message.value ="L'addrese de livraison doit être renseignée"
                error_message_code.value ='FIELD_REQUIRED'
                return -1
            }
            submitForm()

        }
        
//fonctions pour créer le document
        function createsaleOrder(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${webUserInfo.activeCompanyId}`,sqData)
            .then(res => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                error_message.value=''
                setTimeout(()=> router.push(`/saleOrderCard/${res.data.documentNo}`),3000)
            })
            .catch(err => {
                displayErrorMessage(err)
            })
        }
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'orders_insert',
                webUserName:webUserInfo.name,
                OrderNo:'',
                saleOrderCustomerNo: saleOrderCardHeaderInfo.saleOrderCustomerNo.value,
                saleOrderCustomerContactCode: saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value,
                saleOrderResponsibilityCenter:saleOrderCardHeaderInfo.saleOrderResponsibilityCenter.value,
                saleOrderSalesperson:saleOrderCardHeaderInfo.saleOrderSalesperson.value,
                saleOrderCampaignNo:saleOrderCardHeaderInfo.saleOrderCampaignNo.value,
                saleOrderLocationCode:saleOrderCardHeaderInfo.saleOrderLocationCode.value,
                saleOrderSalesChannel:saleOrderCardHeaderInfo.saleOrderSalesChannel.value,
                saleOrderSalesMode:saleOrderCardHeaderInfo.saleOrderSalesMode.value,
                saleOrderCustomerPriceGroup:saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value,
                
                //nouveaux
                saleOrderCustomerStoreCode:saleOrderCardHeaderInfo.saleOrderStoreCode.value,  
                saleOrderVATBusPostingGroup:saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value,
                saleOrderCustomerPostingGroup:saleOrderCardHeaderInfo.saleOrderCustomerPostingGroup.value, 
                saleOrderGenBusPostingGroup:saleOrderCardHeaderInfo.saleOrderGenBusPostingGroup.value, 

                saleOrderDocumentDate:dateInfo.documentDate.value?dateInfo.documentDate.value:'1753-01-01',
                saleOrderShipRequestedDate:dateInfo.shipRequestedDate.value?dateInfo.shipRequestedDate.value:'1753-01-01', 
                saleOrderPromisedDeliveryDate:dateInfo.promisedDeliveryDate.value?dateInfo.promisedDeliveryDate.value:'1753-01-01', 
                saleOrderPaymentMethodCode:saleOrderCardHeaderInfo.saleOrderPaymentMethodCode.value, 
                saleOrderPaymentTermsCode:saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value,
                saleOrderPrepayment:saleOrderCardHeaderInfo.saleOrderPrepayment.value, 
                saleOrderCustomerShipToCode:saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value, 
                saleOrderShipmentMethodCode:saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value,
                'Contract No_':saleOrderCardHeaderInfo.saleOrderContractNo.value, 
                'Duration (Month)':0,
                saleOrderLines:[
                    ...saleOrderCardLines.value
                ]
            }
            createsaleOrder(formatToBCJsonData(JSData))
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
        //                 error_message.value= errorObject.response.data;break;
        //             case 400:
        //                 submitting_message.value='' 
        //                 error_message.value= errorObject.response.data
        //                 error_message_code.value= errorObject.code;break;
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
        //     }
        // }

        function displayErrorMessage(errorObject){
            console.log(errorObject)
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
        watch(saleOrderCardHeaderInfo.saleOrderSalesMode, (newValue, oldValue) => {
            if(newValue !== oldValue && saleModeHasBeenInitialized.value==false)
                if(saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value)
                    saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value=''
        })
        watch(lineHasBeenDeleted, () => {
            if(lineHasBeenDeleted.value){
                let i = 1
                saleOrderCardLines.value.map(row => row['Line No_'] = i++)
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
            saleOrderCardHeaderInfo.saleOrderCustomerNo.value =webUserInfo.defaultCustomerNo
            saleOrderCardHeaderInfo.saleOrderCustomerName.value = webUserInfo.defaultCustomerName
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value = webUserInfo.defaultCustomerContactCode
            saleOrderCardHeaderInfo.saleOrderLocationCode.value = webUserInfo.defaultLocation
            saleOrderCardHeaderInfo.saleOrderShipmentMethodCode.value = webUserInfo.defaultCustomerShipmentMethodCode
            saleOrderCardHeaderInfo.saleOrderCustomerShipToCode.value = webUserInfo.defaultCustomerShipToCode
            saleOrderCardHeaderInfo.saleOrderPaymentMethodCode.value = webUserInfo.defaultCustomerPaymentMethodCode
            saleOrderCardHeaderInfo.saleOrderResponsibilityCenter.value = webUserInfo.responsibilityCenter
            saleOrderCardHeaderInfo.saleOrderSalesperson.value = webUserInfo.defaultSalesPersonCode
            saleOrderCardHeaderInfo.saleOrderSalesChannel.value = webUserInfo.defaultSalesChannel
            saleModeHasBeenInitialized.value = true
            saleOrderCardHeaderInfo.saleOrderSalesMode.value = webUserInfo.defaultCustomerSalesMode
            saleOrderCardHeaderInfo.saleOrderStoreCode.value = webUserInfo.defaultStoreCode
            saleOrderCardHeaderInfo.saleOrderCustomerPriceGroup.value = webUserInfo.defaultCustomerPriceGroup?webUserInfo.defaultCustomerPriceGroup:useWebUserInfoStore().defaultUserPriceGroup
            saleOrderCardHeaderInfo.saleOrderVATBusPostingGroup.value = webUserInfo.defaultCustomerVATBusPostingGroup
            saleOrderCardHeaderInfo.saleOrderGenBusPostingGroup.value = webUserInfo.defaultCustomerGenBusPostingGroup
            saleOrderCardHeaderInfo.saleOrderCustomerPostingGroup.value = webUserInfo.defaulCustomerPostingGroup
            saleOrderCardHeaderInfo.saleOrderPaymentTermsCode.value = webUserInfo.defaultCustomerPaymentTermsCode
            saleOrderCardHeaderInfo.saleOrderPrepayment.value = webUserInfo.defaultCustomerPrepayment

            userCanChangePriceGroup.value = useWebUserInfoStore().canChangePriceGroup

            getUserItemList()
            getUserLocationList()
            getShipmentMethodList()
        })
        
        
        

        






        return{
            isItemInfoToFill,
            ...saleOrderCardHeaderInfo,saleOrderCardLines,saleOrderCustomerType,
            ...dateInfo,
            ...itemInfo,...itemAvailabilityInfo,
            webUserInfo,
            fillCustomerInfoField,fillContactInfoField,fillLocationInfoField,fillAddressInfoField,fillPriceGroupInfoField,
            fillCampaignInfoField,fillPaymentMethodInfoField,fillShipmentMethodInfoField,fillVATGroupInfoField,
            fillSalesModeInfoField,fillPaymentTermInfoField,fillItemInfoField,fillContractInfoField,
            addEmptyRow,addCommentRow,addRowByForm_andContinue,addRowByForm_andClose,resetForm,
            editRowByForm,
            submitForm,controlBeforeCreate,
            error_message,error_message_code,success_message,submitting_message,
            lineHasBeenDeleted,getLineDataToEdit,getItemAvailabilityInfo,
            totalVAT,totalAmountExclVAT,totalAmountIncVAT,
            itemListDropdownIsActive,activeItemLineDropdown,userItemList,fillLineByItemCode,
            locationListDropdownIsActive,activeLocationLineDropdown,userLocationList,fillLineByLocationCode,
            shipmentMethodListDropdownIsActive,activeshipmentMethodLineDropdown,shipmentMethodList,fillLineByShipmentMethodCode,
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
            useNavigationTabStore().setActiveTab('saleOrders')
            this.$router.push('/')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('newOrderRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newOrderRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
       
        ///////////////////////methode pour  afficher le formulaire d'ajout d'article
        showaddRowByForm(){
            if (this.saleOrderLocationCode){
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
                this.saleOrderCardLines[parentId][parentAttri] = value
                this.saleOrderCardLines[parentId]["Line Amount"] = value * this.saleOrderCardLines[parentId]["Unit Price"]
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
            //console.log(id)
            if(this.selectedLine>=0){
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

#general_content,#line_content,#order_details_content,#international_content,#delivery_invoicing_content{
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
.has-background-orangered{
    background-color: rgba(255, 68, 0, 0.856);
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