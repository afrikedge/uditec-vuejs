<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="customerCardId" :soDesc="customerCardHeader['Name']" pageTitle="Fiche client" 
                @onGoingBackToList='goBackToList'/>
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @oncalculatingCreditLimit="submitCreditLimitCalculation"
            @onGettingRevisionRequestList="activeModalForSelectableElementList='revisionRequestList'"
            @onCreatingRevisionRequest="showNewRevisionRequestModal"
            @onGettingContactList="activeModalForSelectableElementList='contactList1'"
            @onGettingShipToAddressList="activeModalForSelectableElementList='addressList1'"
            @onGettingCustomerHistory="showCustomerHistoryModal"

            componentWithCompInfo="customerCardRightInfoMaxWidth"
            :editCardBtnIsDisabled="false"
            :cancelEditCardBtnIsDisabled="false"
            :calculateCreditLimitBtnIsDisabled="false || customerCardHeader['Sales Mode']!=='AGP'"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :revisionRequestBtnIsDisabled="true"
            :contactListBtnIsDisabled="false"
            :shipToAddressListBtnIsDisabled="false"
            :assignedDebtBtnIsDisabled="true"
            :createRevisionRequestBtnIsDisabled="false"
            :customerHistoryBtnIsDisabled="false"
            ></Customer-card-ribbon>

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

            <article v-if="success_calculation" class="message is-primary shadow">
                <div class="message-header">
                        <span class="subtitle is-7 m-0 has-text-white"> 
                            <span class="icon ">
                                <i class="fas fa-check"></i>
                            </span>
                            {{ success_calculation }}
                        </span>
                    <button class="delete" aria-label="delete" @click="success_calculation=''"></button>
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
                            <div class="column is-narrow py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3">{{ customerCardHeader['No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;">{{ customerCardHeader['Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ customerLegalStatusLabel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ customerTypeLabel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ customerIDModeLabel }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° client" :valueInputText="customerCardHeader['No_']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Nom du client" :valueInputText="customerCardHeader['Name']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Nom de recherche" :valueInputText="customerCardHeader['Search Name']" :is_disabled="true"></input-text>  
                                
                                <input-text labelInputText="Type client" :valueInputText="customerTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type client" v-model="customerType" :option-list="optionLabelListForCustomerType" v-else></input-select-basic-1> 

                                <input-text labelInputText="Forme juridique" :valueInputText="customerLegalStatusLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Forme juridique" v-model="legalStatus" :option-list="optionLabelListForLegalStatus" v-else></input-select-basic-1> 

                                <input-text labelInputText="Mode d'identifiaction" :valueInputText="customerIDModeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Mode d'identifiaction" v-model="identificationMode" :option-list="optionLabelListForIdentificationMode" v-else></input-select-basic-1> 

                                <input-text labelInputText="Catégorie professionnelle" :valueInputText="customerProfessionalCategoryLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Catégorie professionnelle" v-model="customerCardHeader['Professional Category']" :option-list="optionLabelListForProfessionalCategory" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Nom de l'employeur / Type d'activité" v-model="customerCardHeader['Activity Name']" :valueInputText="customerCardHeader['Activity Name']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Adresse de l'employeur / activité" v-model="customerCardHeader['Professional Address']" :valueInputText="customerCardHeader['Professional Address']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            </div>
                            <div class="column">
                                
                                <input-text labelInputText="Code client parent" :valueInputText="customerCardHeader['Parent Account No_']" :is_disabled="true"></input-text> 
                                <input-text labelInputText="Catégorie article autorisée" :valueInputText="customerCardHeader['Item Category']" :is_disabled="true"></input-text> 

                                <input-text labelInputText="NIF" :valueInputText="customerCardHeader['NIF']" :is_disabled="true"></input-text> 
                                <input-text labelInputText="STAT" :valueInputText="customerCardHeader['STAT']"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="RCS" :valueInputText="customerCardHeader['RCS']"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="CIF" :valueInputText="customerCardHeader['CIF']"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="N° identification" :valueInputText="customerCardHeader['ID Number']" :is_disabled="true"></input-text> 
                                <input-text labelInputText="Solde" :valueInputText="customerCardHeader['Balance Amount']" :is_disabled="true" inputTextColor="has-text-info"></input-text>
                                <input-text labelInputText="Solde dû" :valueInputText="customerCardHeader['Amount Due']" :is_disabled="true" inputTextColor="has-text-info"></input-text>
                                <input-text labelInputText="Statut actuel" :valueInputText="customerCardHeader['Current Status']" :is_disabled="true" inputTextColor="has-text-info"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 56formulaire fiche prospect----------------------->                         
                    <div id="Communication">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('communication_content');onglet6_expanded=!onglet6_expanded" v-if="onglet6_expanded">
                                    <span>Adresses & communication</span>
                                </a>
                                <a @click="expand('communication_content');onglet6_expanded=!onglet6_expanded" v-else>
                                    <span>Adresses & communication</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet6_expanded">Afficher plus</div>
                            <div class="column is-narrow py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ customerCardHeader['Address'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ customerCardHeader['City'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ customerCardHeader['Phone No_'] }}</span>
                            </div>
                        </div>
                        <div id="communication_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Adresse:Ligne 1" v-model="customerCardHeader['Address']" :valueInputText="customerCardHeader['Address']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" v-model="customerCardHeader['Address 2']" :valueInputText="customerCardHeader['Address 2']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Code postal" v-model="customerCardHeader['Post Code']" :valueInputText="customerCardHeader['Post Code']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Ville" v-model="customerCardHeader['City']" :valueInputText="customerCardHeader['City']" :is_disabled="!readOnlyModeIsDisabled"></input-text>                                 
                                <input-text labelInputText="Téléphone" v-model="customerCardHeader['Phone No_']" :valueInputText="customerCardHeader['Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Téléphone Mobile" v-model="customerCardHeader['Mobile Phone No_']" :valueInputText="customerCardHeader['Mobile Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Adresse E-mail" v-model="customerCardHeader['E-Mail']" :valueInputText="customerCardHeader['E-Mail']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Site Web" v-model="customerCardHeader['Home Page']" :valueInputText="customerCardHeader['Home Page']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                
                                <input-text labelInputText="Contact principal" :valueInputText="customerCardHeader['Primary Contact No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Contact principal" v-model="customerCardHeader['Primary Contact No_']"  @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>

                                <input-text labelInputText="Mode relance préféré" :valueInputText="customerActivityType"  :is_disabled="true"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche client----------------------->                         
                    <div id="risque">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('risk_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                    <span>Risque</span>
                                </a>
                                <a @click="expand('risk_content');onglet2_expanded=!onglet2_expanded" v-else>
                                    <span>Risque</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet2_expanded">Afficher plus</div>
                            <div class="column is-narrow py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'SM : '+customerCardHeader['Sales Mode'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ 'CP : '+ customerCardHeader['Payment Terms Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'MP : '+customerCardHeader['Payment Method Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ customerCardHeader['VAT Bus_ Posting Group']}}</span>
                            </div>
                        </div>
                        <div id="risk_content" class="columns">

                            
                            <div class="column">
                                <input-text labelInputText="Mode de vente" :valueInputText="customerCardHeader['Sales Mode']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Conditions de paiement" :valueInputText="customerCardHeader['Payment Terms Code']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Limite de crédit proposée" :valueInputText="formatAmount(customerCardHeader['Proposed Credit Limit'])" :is_disabled="true"></input-text>  
                                <input-text labelInputText="Limite de crédit" :valueInputText="formatAmount(customerCardHeader['Credit limit (LCY)'])" :is_disabled="true"></input-text>  
                                <input-text labelInputText="Mode de paiement" :valueInputText="customerCardHeader['Payment Method Code']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Régime TVA" :valueInputText="customerCardHeader['VAT Bus_ Posting Group']" :is_disabled="true"></input-text>
                                <input-textarea labelInputText="Observations générales" :valueInputText="customerCardHeader['General comment']" v-model="customerCardHeader['General comment']" :is_disabled="!readOnlyModeIsDisabled"></input-textarea>
                            </div>
                            <div class="column">
                                <input-text labelInputText="% Acompte exigé" :valueInputText="formatAmount(customerCardHeader['Prepayment _'])" :is_disabled="true"></input-text> 
                                <input-text labelInputText="Niveau de risque" :valueInputText="customerCardHeader['Risk Level']" :is_disabled="true"></input-text> 
                                
                                <input-text labelInputText="N° contrat AGP" :valueInputText="customerCardHeader['Contract No_']" :is_disabled="true"></input-text> 
                                <!---input-select labelInputText="N° contrat AGP" v-model="customerCardHeader['Contract No_']"  @openModal="activeModalForSelectableElementList='contractList'" v-else></input-select--->

                                <input-text labelInputText="Note" :valueInputText="formatAmount(customerCardHeader['Score'])" :is_disabled="true"></input-text> 
                                <input-text labelInputText="Statut actuel" :valueInputText="customerCardHeader['Current Status']" :is_disabled="true"></input-text> 
                                <input-text labelInputText="Pire statut" :valueInputText="customerCardHeader['Worst Status']" :is_disabled="true"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 3 formulaire fiche client en lecture seule----------------------->                         
                    <div id="exigences" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet3_expanded}">
                            <div :class="{'columns':!onglet3_expanded,'p-3':onglet3_expanded,'has-border-bottom-grey':onglet3_expanded,'has-border-bottom':!onglet3_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('requirements_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                        <span>Exigences</span>
                                    </a>
                                    <a @click="expand('requirements_content');onglet3_expanded=!onglet3_expanded" v-else>
                                        <span>Exigences</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="requirements_content" class="px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth tableFixHead">
                                    <thead class=" my-2">
                                        <tr > 
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
                                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7" style="min-width: 100px;z-index:5000">Document requis ?</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
                                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7" style="min-width: 100px;z-index:5000">Valide ?</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        <tr :id="'onglet3-L'+index" v-for="(elt,index) of customerCardRequirements" :key="'onglet3-L'+index" @mouseover="setLineShadow('onglet3-L'+index)" @mouseout="removeLineShadow('onglet3-L'+index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Criteria'] }}</td>
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
                            <div v-if="customerCardRequirements.length==0 && onglet3_expanded">Il n'y'a rien à afficher</div>
                        </div>             
                    </div>          

<!---------sous-Section onglet 3 formulaire fiche client en lecture/ecriture----------------------->                         
                    <div id="exigences" v-else>
                        <div :class="{'has-background-white':onglet3_expanded}">
                            <div :class="{'columns':!onglet3_expanded,'p-3':onglet3_expanded,'has-border-bottom-grey':onglet3_expanded,'has-border-bottom':!onglet3_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('requirements_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                        <span>Exigences</span>
                                    </a>
                                    <a @click="expand('requirements_content');onglet3_expanded=!onglet3_expanded" v-else>
                                        <span>Exigences</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet3_expanded">|</span>
                                </div>
                            </div>
                            <div id="requirements_content" class=" px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <div>
                                    <table class="table  is-narrow  is-fullwidth is-bordered">
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
                                                <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7">Document requis ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Lien document</th>
                                                <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7">Valide ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Niveau d'exigence</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="'onglet3-L'+index" v-for="(elt,index) of customerCardRequirements" :key="'onglet3-L'+index" @mouseover="setLineShadow('onglet3-L'+index)" @mouseout="removeLineShadow('onglet3-L'+index)" >
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
                                                    <input v-model="customerCardRequirements[index]['Alpha Value']" class="input is-small" :class="{'has-background-white':elt['Value Type']==2}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==2">
                                                </td>
                                                <td class="has-text-left">
                                                    <input v-model="customerCardRequirements[index]['Numeric Value']" class="input is-small" :class="{'has-background-white':elt['Value Type']==1}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==1">
                                                </td>
                                                <td  class="has-text-left"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td class="has-text-left is-narrow" >
                                                    <input v-model="customerCardRequirements[index]['Validity Date']" class="input is-small" :class="{'has-background-white':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
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
                                                            <input v-model="customerCardRequirements[index]['Document Link']" class="input is-small has-background-white" type="text" style="border:none" :disabled="true">
                                                            <input v-show="false" class="input is-small" :id="'fileUpload1-'+index" type="file" @change="(e)=> uploadFile(e,elt['Criteria'],'requirement',index)" >
                                                        </div>
                                                        <div class="control" v-if="customerCardRequirements[index]['Document Link']==''">
                                                            <button class="button is-small" @click.prevent="getFile('fileUpload1-'+index)">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="customerCardRequirements[index]['Document Link']">
                                                            <button class="button is-small is-danger" @click.prevent="()=>deleteFileFromLine(index,'requirement',customerCardRequirements[index]['Document Link'])">
                                                                <span class="icon">
                                                                    <i class="fas fa-trash"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="customerCardRequirements[index]['Document Link']">
                                                            <!--------pour la version prod-->
                                                            <a class="button  is-small"
                                                            :href="`../public/${customerCardRequirements[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a>
                                                            <!--------pour la version dev-->
                                                            <!----a class="button  is-small"
                                                            :href="`../${customerCardRequirements[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a---->
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="has-text-centred">
                                                    <div class="field">
                                                        <input :id="index+'switchColorSuccess'" type="checkbox" :name="index+'switchColorSuccess'" class="switch is-thin is-success" v-model="customerCardRequirements[index]['Valid']" :disabled="true">
                                                        <label :for="index+'switchColorSuccess'"></label>
                                                    </div>
                                                </td>
                                                <td  class="has-text-left"> {{ displayRequirementLevelLabel(elt['Requirement']) }}</td>
                                                <td  class="has-text-left is-narrow"> {{ formatDate(elt['Updated on']) }}</td>
                                                <td  class="has-text-left"> {{ elt['Updated by'] }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="customerCardRequirements.length==0 && onglet3_expanded">Il n'y'a rien à afficher</div>
                            </div>
                        </div>
                    </div>              
                    <br><br>


<!---------sous-Section onglet 4 formulaire fiche client en lecture seule----------------------->                         
                    <div id="scoring" v-if="false">
                        <div :class="{'has-background-light':onglet4_expanded}">
                            <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet4_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('scoring_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                        <span>Scoring</span>
                                    </a>
                                    <a @click="expand('scoring_content');onglet4_expanded=!onglet4_expanded" v-else>
                                        <span>Scoring</span>
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
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code critère</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Description de la valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Précision</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7" style="min-width: 100px;z-index:5000">Document requis</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
                                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7" style="min-width: 100px;z-index:5000">Valide ?</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Point</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Coefficient</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Point pondéré</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="'onglet4-L'+index" v-for="(elt,index) of customerCardScoring" :key="'onglet4-L'+index" @mouseover="setLineShadow('onglet4-L'+index)" @mouseout="removeLineShadow('onglet4-L'+index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Criteria'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Criteria Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Criteria Value'] }}</td>
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
                                            <td  class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Point']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Coefficient']) }}</td>
                                            <td  class="has-text-right has-background-light"> {{ formatAmount(elt['Weighed Point']) }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDateHour(elt['Updated on']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Updated by'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-if="customerCardScoring.length==0 && onglet4_expanded">Il n'y'a rien à afficher</div>
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="customerCardScoring.length>0 && onglet4_expanded">
                            <div class="column">
                            </div>
                            <div class="column">
                                <input-text1 :is_disabled="true" :valueInputText="customerCardHeader['Weighed Point Total']?customerCardHeader['Weighed Point Total']:weighedPointTotal" labelInputText="Total points"></input-text1>
                            </div>
                        </div>                
                    </div>          

<!---------sous-Section onglet 4 formulaire fiche client en lecture/ecriture----------------------->                         
                    <div id="scoring" v-if="false">
                        <div :class="{'has-background-white':onglet4_expanded}">
                            <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet4_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('scoring_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                        <span>Scoring</span>
                                    </a>
                                    <a @click="expand('scoring_content');onglet4_expanded=!onglet4_expanded" v-else>
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
                                    <table class="table  is-narrow  is-fullwidth is-bordered">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 150px;">Valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Description de la valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Type validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                                <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7">Document requis ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Lien document</th>
                                                <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7">Valide ?</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7">Point</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7">Coefficient</th>
                                                <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7">Point pondéré</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="'onglet4-L'+index" v-for="(elt,index) of customerCardScoring" :key="'onglet4-L'+index" @mouseover="setLineShadow('onglet4-L'+index)" @mouseout="removeLineShadow('onglet4-L'+index)" >
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
                                                            <input v-model="elt['List Value']" class="input is-small has-background-light" type="text" style="border:none">
                                                        </div>
                                                        <div class="control">
                                                            <button class="button has-background-orange is-small" v-if="activeCriteriaValueDropdown!==index" @click.prevent="displayCriteriaValueDropdown(index,elt['Criteria'])">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus" ></i>
                                                                </span>
                                                            </button>
                                                            <button class="button has-background-orange is-small" v-if="criteriaValueDropdownIsActive==true && activeCriteriaValueDropdown==index" @click.prevent="closeCriteriaValueDropdown">
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
                                                                        <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-narrow" style="min-width: 100px;">Point</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="(criteria,index1) of scoringCriteriaValueList" :key="'criteria-'+index1" @click="fillCriteriaValue(index,criteria)" >
                                                                        <td class="has-text-left is-narrow"> {{ criteria["Value"] }}</td>
                                                                        <td class="has-text-left is-narrow">{{ criteria["Description"] }}</td>
                                                                        <td class="has-text-right is-narrow">{{ criteria["Point"] }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                          </div>
                                                        </div>
                                                      </div>
                                                </td>
                                                <td  class="has-text-left is-narrow">{{ elt['Value Description'] }}</td>
                                                <td  class="has-text-left">{{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td  class="has-text-left is-narrow">
                                                    <input v-model="customerCardScoring[index]['Validity Date']" class="input is-small" :class="{'has-background-white':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
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
                                                            <input v-model="customerCardScoring[index]['Document Link']" class="input is-small has-background-white"  type="text" style="border:none" :disabled="true">
                                                            <input v-show="false" class="input is-small" :id="'fileUpload-'+index" type="file" @change="(e)=> uploadFile(e,elt['Criteria'],'scoring',index)" >
                                                        </div>
                                                        <div class="control" v-if="customerCardScoring[index]['Document Link']==''">
                                                            <button class="button is-small" @click.prevent="getFile('fileUpload-'+index)">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="customerCardScoring[index]['Document Link']">
                                                        <!--------pour la version prod-->
                                                            <a class="button  is-small"
                                                            :href="`../public/${customerCardScoring[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a>
                                                        <!--------pour la version dev-->
                                                            <!----a class="button  is-small"
                                                            :href="`../${customerCardScoring[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a---->
                                                        </div>
                                                    </div>
                                                </td>
                                                <td  class="has-text-centered">
                                                    <div class="field">
                                                        <input :id="index+'switchColorSuccess1'" type="checkbox" :name="index+'switchColorSuccess1'" class="switch is-thin is-success" v-model="customerCardScoring[index]['Valid']" @click="getScoringPoint(index)" :disabled="true">
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
                                <div v-if="customerCardScoring.length==0 && onglet4_expanded">Il n'y'a rien à afficher</div>
                            </div>
                            <div class="columns mt-3" id="line_total" v-if="customerCardScoring.length>0 && onglet4_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="weighedPointTotal" labelInputText="Total points"></input-text1>
                                </div>
                            </div>        
                        </div>
                    </div>              
                    <br><br>

<!---------sous-Section onglet 5 formulaire fiche client en lecture seule----------------------->                         
                    <div id="historique" v-if="false">
                        <div :class="{'has-background-light':onglet5_expanded}">
                            <div :class="{'columns':!onglet5_expanded,'p-3':onglet5_expanded,'has-border-bottom-grey':onglet5_expanded,'has-border-bottom':!onglet5_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('history_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                        <span>Historique</span>
                                    </a>
                                    <a @click="expand('history_content');onglet5_expanded=!onglet5_expanded" v-else>
                                        <span>Historique</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="history_content" class="px-5 mt-5" style="max-height: 400px; overflow:scroll;">
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
                                        <tr :id="'onglet5-L'+index" v-for="(elt,index) of customerCardHistory" :key="'onglet5-L'+index" @mouseover="setLineShadow('onglet5-L'+index)" @mouseout="removeLineShadow('onglet5-L'+index)" >
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
                            <div v-if="customerCardHistory.length==0 && onglet5_expanded">Il n'y'a rien à afficher</div>
                        </div>            
                    </div>          



                </div>
<!---------composant info client----------------------->
                <customer-info v-if="customerCardHeader['No_']" class="customer-info" :documentNo="customerCardHeader['No_']" documentType="Customer"></customer-info>

            </div>

<!-----------Historique client-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="customerHistoyModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.4" @click="customerHistoyModalShowned=false"></div>
                <div class=" w-100 h-100 shadow" style="border-radius:0px">
                    <customer-history :customerNo="customerCardHeader['No_']"></customer-history>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="customerHistoyModalShowned=false"></button>
            </div>

<!-----------Modal pour la création d'une demande de revision -------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newRevisionRequestModalShowned==true">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newRevisionRequestModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-revision-request :customerNo="customerCardId" :salesMode="customerCardHeader['Sales Mode']"  @submit="(elt) => {saleOrderCustomerContactCode = elt;newRevisionRequestModalShowned=false} "></new-revision-request>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newRevisionRequestModalShowned=false }"></button>
            </div>

<!-----------Modal pour la création d'un contact-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newContactModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newContactModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-contact :customerNo="customerCardId" :redirectionIsDisabled="true" @submit="(elt) => {contactToDisplay= elt['code'];newContactModalShowned=false} "></new-contact>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newContactModalShowned=false }"></button>
            </div>

<!-----------Modal pour l'affichage  d'un contact -------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="contactToDisplay" style="z-index:1000">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => contactToDisplay=''"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <contact-card :contactNo="contactToDisplay"></contact-card>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { contactToDisplay='' }"></button>
            </div>

<!-----------Modal pour la création d'une adresse-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newAddressModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newAddressModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-ship-to-address :customerNo="customerCardId" :redirectionIsDisabled="true" @submit="(elt) => {addressToDisplay = elt;newAddressModalShowned=false} "></new-ship-to-address>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newAddressModalShowned=false }"></button>
            </div>
            
<!-----------Modal pour l'affichage  d'une addresse destinataire -------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="addressToDisplay" style="z-index:1000">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => addressToDisplay=''"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <ship-to-address-card :customerNo="customerCardId" :addressNo="addressToDisplay"></ship-to-address-card>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { addressToDisplay='' }"></button>
            </div>

        </div>

        <modal-for-selectable-contact-list 
            v-if="activeModalForSelectableElementList=='contactList'" 
            :isActive="activeModalForSelectableElementList=='contactList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="customerCardHeader['No_']" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-contact-list 
            v-if="activeModalForSelectableElementList=='contactList1'" 
            :isActive="activeModalForSelectableElementList=='contactList1'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="customerCardHeader['No_']"
            @onDisplayingContactCreationModal="()=>showContactCreationModal()"
            @onDisplayingContactCard="(elt)=>{contactToDisplay=elt}">
        </modal-for-contact-list>

        <modal-for-address-list 
            v-if="activeModalForSelectableElementList=='addressList1'" 
            :isActive="activeModalForSelectableElementList=='addressList1'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="customerCardHeader['No_']"
            @onDisplayingShipToAddressCreationModal="()=>showAddressCreationModal()"
            @onDisplayingAddressCard="(elt)=>{addressToDisplay=elt}">
        </modal-for-address-list>

        <modal-for-selectable-revision-request-list 
            v-if="activeModalForSelectableElementList=='revisionRequestList'" 
            :isActive="activeModalForSelectableElementList=='revisionRequestList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="customerCardHeader['No_']" 
            >
        </modal-for-selectable-revision-request-list>

        <modal-for-selectable-contract-list 
            v-if="activeModalForSelectableElementList=='contractList'" 
            :isActive="activeModalForSelectableElementList=='contractList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="customerCardHeader['No_']" 
            @onGettingLineFromSelectableContractListModal="(elt)=>fillContractInfoField(elt)">
        </modal-for-selectable-contract-list>

    </div>    
</template>
<script>

import CustomerCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import CustomerCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputTextarea from './input/input-textarea.vue'
import inputText1 from './input/input-text1.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref, watch, watchEffect } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRoute, useRouter } from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import ModalForSelectableContactList from './ModalForSelectableContactList.vue'
import ModalForContactList from './ModalForContactList.vue'
import ModalForAddressList from './ModalForAddressList.vue'
import ModalForSelectableContractList from './ModalForSelectableContractList.vue'
import ModalForSelectableRevisionRequestList from './ModalForSelectableRevisionRequestList.vue'
import NewRevisionRequest from './NewRevisionRequest.vue'
import NewContact from './NewContact.vue'
import ContactCard from './ContactCard.vue'
import ShipToAddressCard from './ShipToAddressCard.vue'
import NewShipToAddress from './NewShipToAddress.vue'

import CustomerHistory from './CustomerHistory.vue'

export default {
    name:'customer-card',
    components:{
        CustomerCardHeader,CustomerInfo,CustomerCardRibbon,
        inputText,inputTextarea,inputSelect,inputSelectBasic1,inputText1,
        ModalForSelectableContactList,ModalForSelectableContractList,ModalForSelectableRevisionRequestList,
        NewRevisionRequest,NewContact,ContactCard,ShipToAddressCard,NewShipToAddress,
        ModalForContactList,ModalForAddressList,
        CustomerHistory,
    },
    setup(){
        const router = useRouter()
        const hostname = window.location.hostname
        const customerCardId = useRoute().params.id
        const customerCardHeader = ref({})
        const customerCardRequirements = ref([])
        const customerCardScoring = ref([])
        const customerCardHistory = ref([])
        const scoringCriteriaValueList = ref([])
        const readOnlyModeIsDisabled = ref(false)
        const criteriaValueDropdownIsActive = ref(false)
        const activeCriteriaValueDropdown = ref(-1)

        const customerHistoyModalShowned = ref(false)

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')
        const success_calculation=ref('')

        const newContactModalShowned = ref(false)
        const newAddressModalShowned = ref(false)
        const contactToDisplay = ref('')
        const addressToDisplay = ref('')


        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return date
            else
                return new Date(date).toISOString().split('T')[0]
        }
        
        //fonctions pour définir la fiche sur lecture et/modification
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
            // if(scoringCriteriaValueList.value.length==0){
            //     getCriteriaValueList()
            // }
        }
        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        //sac des labels de la fiche
        const labelBag = {
            customerTypeLabel:ref(''),
            customerLegalStatusLabel:ref(''),
            customerIDModeLabel:ref(''),
            customerProfessionalCategoryLabel:ref(''),
            customerActivityType:ref(''),
            requirementValueTypeLabelList:ref([]),
            requirementLevelLabelList:ref([]),
            validityLabelList:ref([]),
            historyDebtStatusLabel:ref(''),

            //nouveaux
            optionLabelListForCustomerType : ref([]),
            optionLabelListForLegalStatus : ref([]),
            optionLabelListForIdentificationMode : ref([]),
            optionLabelListForProfessionalCategory : ref([]),
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


        //fonctions pour récupérer le label des champs
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
        function getOptionLabelList(fieldToGetLabelList){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                if (fieldToGetLabelList=='[Value Type]')
                    labelBag.requirementValueTypeLabelList.value=result.data.recordset
                    //getOptionLabel(optionLabelListForRepossSource.value,repossessionCardHeader.value['Reposs Source'],'repossSourceLabel')
                    
                if (fieldToGetLabelList=='[Requirement]')
                    labelBag.requirementLevelLabelList.value=result.data.recordset

                if (fieldToGetLabelList=='[Validity]')
                    labelBag.validityLabelList.value=result.data.recordset

                if(fieldToGetLabelList=='[Customer Type]')
                    labelBag.optionLabelListForCustomerType.value=result.data.recordset
                    
                if (fieldToGetLabelList=='[Legal Status]')
                    labelBag.optionLabelListForLegalStatus.value=result.data.recordset

                if (fieldToGetLabelList=='[Identification Mode]')
                    labelBag.optionLabelListForIdentificationMode.value=result.data.recordset

                if (fieldToGetLabelList=='[Professional Category]')
                    labelBag.optionLabelListForProfessionalCategory.value=result.data.recordset

            }).catch(err=>console.log(err))
        }


        //fonction de récupération des données de la fiche client
        const customerType = ref(-1)
        const legalStatus = ref(-1)
        const identificationMode = ref(-1)
        function getCustomerCardHeaderInfo(){
            axios.get(`http://${hostname}:5000/app/getCustomerCard/${customerCardId}`)
            .then(result => {
                customerCardHeader.value = result.data.recordset[0]
                getSingleOptionLabel('Customer Type','customerTypeLabel',customerCardHeader.value["Customer Type"])
                getSingleOptionLabel('Legal Status','customerLegalStatusLabel',customerCardHeader.value["Legal Status"])
                getSingleOptionLabel('Identification Mode','customerIDModeLabel',customerCardHeader.value["Identification Mode"])
                getSingleOptionLabel('Professional Category','customerProfessionalCategoryLabel',customerCardHeader.value["Professional Category"])
                getSingleOptionLabel('Activity Type','customerActivityType',customerCardHeader.value["Activity Type"])

                getOptionLabelList('[Customer Type]')
                getOptionLabelList('[Identification Mode]')
                getOptionLabelList('[Legal Status]')
                getOptionLabelList('[Professional Category]')

                customerType.value = customerCardHeader.value['Customer Type']
                legalStatus.value = customerCardHeader.value['Legal Status']
                identificationMode.value = customerCardHeader.value['Identification Mode']



                //getCustomerCardRequirementInfo()
                getCustomerCardScoringInfo()

            }).catch(err=>console.log(err))
        }

        function getCustomerCardRequirementInfo(){
            axios.get(`http://${hostname}:5000/app/getCURList?customerId=${customerCardId}&accountType=1&customerType=${customerType.value}&legalStatus=${legalStatus.value}&identificationMode=${identificationMode.value}`)
            .then(result => {
                customerCardRequirements.value = result.data
                customerCardRequirements.value.map(line => {
                    line['Validity Date'] = getISODate(line['Validity Date']) 
                    line['Valid'] = line['Valid']==1?true:false
                })
                getOptionLabelList('[Value Type]')
                getOptionLabelList('[Requirement]')
            }).catch(()=>{
                if(customerCardRequirements.value.length>0){
                    customerCardRequirements.value = []
                }
            })
        }
        function getCustomerCardScoringInfo(){
            axios.get(`http://${hostname}:5000/app/getCUSList?customerId=${customerCardId}&accountType=1&salesMode=${customerCardHeader.value['Sales Mode']}`)
            .then(result => {
                customerCardScoring.value = result.data
                customerCardScoring.value.map(line => {
                    line['Validity Date'] = getISODate(line['Validity Date']) 
                    line['Valid'] = line['Valid']==1?true:false
                })
            }).catch((error)=>{
                console.log(error)
            })
        }
        function getCriteriaValueList(criteria){
            axios.get(`http://${hostname}:5000/app/getSCVList?criteria=${criteria}`)
            .then(result => {
                scoringCriteriaValueList.value = result.data
            }).catch(err=>console.log(err))
        }
        // function getCustomerCardHistoryInfo(){
        //     axios.get(`http://${hostname}:5000/app/getCUHList?customerId=${customerCardId}`)
        //     .then(result => {
        //         customerCardHistory.value = result.data

        //     }).catch(err=>console.log(err))
        // }

//Autres appels de fonctions liés auX exigences et scoring
        const weighedPointTotal = computed(()=>{
            let sum = 0
            customerCardScoring.value.forEach(elt =>{
                sum = sum + elt['Weighed Point']
            })
            return sum
        })
        function getScoringPoint(index){
            if(!customerCardScoring.value[index]['Valid'])
                customerCardScoring.value[index]['Weighed Point'] = customerCardScoring.value[index]['Point'] * customerCardScoring.value[index]['Coefficient']
            else
                customerCardScoring.value[index]['Weighed Point'] = 0
        }


        function fillContactInfoField(contact){
            customerCardHeader.value['Primary Contact No_']= contact['No_']
        }
        function fillContractInfoField(contract){
            customerCardHeader.value['Contract No_']= contract['No_']
        }
        function fillCriteriaValue(index,criteria){
            customerCardScoring.value[index]['Criteria Value']= criteria.Value;
            customerCardScoring.value[index]['Value Description']= criteria.Description;
            customerCardScoring.value[index]['Point']= criteria.Point;
            criteriaValueDropdownIsActive.value=false
            activeCriteriaValueDropdown.value = -1
        }

        //fonction pour gérer les erreurs lors de l'appel d'un service de BC
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
        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits: 2 }).format(number)
            }else{
                return 0
            }
        }


        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }

        function calculateCreditLimit(){
            axios.get(`http://${hostname}:5000/app/getGetCriditLimit?customerId=${customerCardId}`)
            .then(res => {
                submitting_message.value=''
                customerCardHeader.value['Credit limit (LCY)']= res.data[0][""]
                success_calculation.value= "Le plafond du crédit du client s'élève à "+ res.data[0][""]+ ", veuillez svp enregistrer la page"
                setTimeout(()=>success_calculation.value='',3000)
                }
            )
            .catch((err) => {
                displayErrorMessage(err)
            })
        }

        function submitCreditLimitCalculation(){
            submitting_message.value = 'Calcul du plafond de crédit en cours'
            calculateCreditLimit()
        }

        

        //fonction qui envoie les données aux service de bc et réceptionne et affiche la réponse ou l'erreur
        function updateCustomerCard(formattedCustomerData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedCustomerData)
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

        //fonction pour soumettre la modifiaction de la fiche
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            customerCardRequirements.value.map( elt => elt['Valid']=elt['Valid']==true?1:0)
            const JSData = {
                Parameter:'customers_modify',
                webUserName:useWebUserInfoStore().name,
                'No_':customerCardHeader.value['No_'],
                'Name':customerCardHeader.value['Name'],
                'Search Name':customerCardHeader.value['Search Name'],
                'Credit limit (LCY)':customerCardHeader.value['Credit limit (LCY)'],
                'Customer Type':customerType.value,
                'Legal Status':legalStatus.value,
                'Identification Mode':identificationMode.value,
                'Address':customerCardHeader.value['Address'],
                'Address 2':customerCardHeader.value['Address 2'],
                'Post Code':customerCardHeader.value['Post Code'], 
                'City':customerCardHeader.value['City'],
                'Phone No_':customerCardHeader.value['Phone No_'],
                'Mobile Phone No_':customerCardHeader.value['Mobile Phone No_'],
                'E-Mail':customerCardHeader.value['E-Mail'],
                'Home Page':customerCardHeader.value['Home Page'],
                'Parent Account No_':customerCardHeader.value['Parent Account No_'],
                'Item Category':customerCardHeader.value['Item Category'],
                'Primary Contact No_':customerCardHeader.value['Primary Contact No_'],
                'Activity Type':customerCardHeader.value['Activity Type'],
                'NIF':customerCardHeader.value['NIF']?customerCardHeader.value['NIF']:'',
                'STAT':customerCardHeader.value['STAT']?customerCardHeader.value['STAT']:'',
                'RCS':customerCardHeader.value['RCS']?customerCardHeader.value['RCS']:'',
                'CIF':customerCardHeader.value['CIF']?customerCardHeader.value['CIF']:'',
                'ID Number':customerCardHeader.value['ID Number']?customerCardHeader.value['ID Number']:'',
                // 'Sales Mode':customerCardHeader.value['Sales Mode'],
                // 'Payment Terms Code':customerCardHeader.value['Payment Terms Code'],
                // 'Credit limit (LCY)':customerCardHeader.value['Credit limit (LCY)'],
                // 'Payment Method Code':customerCardHeader.value['Payment Method Code'],
                // 'VAT Bus_ Posting Group':customerCardHeader.value['VAT Bus_ Posting Group'],
                // 'Prepayment _':customerCardHeader.value['Prepayment _'],
                // 'Risk Level':customerCardHeader.value['Risk Level'],
                'Contract No_':customerCardHeader.value['Contract No_'],
                'Professional Category':customerCardHeader.value['Professional Category'],
                'Activity Name':customerCardHeader.value['Activity Name'],
                'Professional Address':customerCardHeader.value['Professional Address'],
                'General Comment':customerCardHeader.value['General comment'],
                //'Score':customerCardHeader.value['Score'],
                CustomerRequirement:[
                    ...customerCardRequirements.value
                ],
                CustomerScoring:[
                    ...customerCardScoring.value
                ]
            }
        updateCustomerCard(formatToBCJsonData(JSData))
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
        onMounted(() => {
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }
            getCustomerCardHeaderInfo()
            //getCustomerCardHistoryInfo()
            getOptionLabelList('[Validity]')
        })

    watch(success_message, () => {
        if(success_message.value){
            readOnlyModeIsDisabled.value=false
            getCustomerCardHeaderInfo()
            //getCustomerCardHistoryInfo()
        }
    })

    watch(success_calculation,() => {
        if(success_calculation.value){
            readOnlyModeIsDisabled.value=true
        }
    })

    // watchEffect(() => {
    //     getCustomerCardScoringInfo()
    // })

    watchEffect(() => {
        console.log('salut')
        getCustomerCardRequirementInfo()
    })




        // expose to template and other options API hooks
        return {
            customerCardId,customerType,legalStatus,identificationMode,
            setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,
            ...labelBag,displayValueTypeLabel,displayRequirementLevelLabel,displayValidityTypeLabel,getCriteriaValueList,
            customerCardHeader,customerCardRequirements,customerCardScoring,customerCardHistory,
            scoringCriteriaValueList,
            readOnlyModeIsDisabled,criteriaValueDropdownIsActive,activeCriteriaValueDropdown,
            fillContactInfoField,fillContractInfoField,fillCriteriaValue,
            submitForm,submitCreditLimitCalculation,
            error_message,error_message_code,success_message,submitting_message,
            success_calculation,
            weighedPointTotal,getScoringPoint,
            formatAmount,
            contactToDisplay,addressToDisplay,
            newContactModalShowned,newAddressModalShowned,
            customerHistoyModalShowned,
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,
            onglet6_expanded:true,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            //fenêtre de création contact, adresse
            newRevisionRequestModalShowned:false,
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
        showCustomerHistoryModal(){
            this.customerHistoyModalShowned = true
        },
        goBackToList(){
            useNavigationTabStore().setActiveGroup('sales')
            useNavigationTabStore().setActiveTab('customers')
            this.$router.push('/')
        },
        showNewRevisionRequestModal(){
            this.newRevisionRequestModalShowned = true
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
     hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('customerCardRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('customerCardRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        formatDateHour(date){
            const dateString = new String(date)
            if (dateString.includes('1753')||dateString.includes('1900-')) return ''
            else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
        },
        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753')||dateString.includes('1900-')) return ''
            else return new Date(date).toLocaleDateString()
        },
        expand(id){
            const myElt=document.getElementById(id);
            if ( id=='scoring_content' || id=='requirements_content') myElt.style.maxHeight='400px'
            else myElt.style.maxHeight='700px'
        },
        collapse(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight="0px"
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
                accountType:'Customer',
                accountNo:this.customerCardHeader['No_'],
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
                        this.customerCardScoring[index]['Document Link']=resp.data

                    if(tab=='requirement')
                        this.customerCardRequirements[index]['Document Link']=resp.data
            })
            .catch(
                ()=>console.log('non ok')
            )
        },
        deleteFileFromLine(index,tab,link){
            axios.get(`http://${this.hostname}:5000/app/deleteFile?link=${link}`)
            .then(()=>{
                if(tab=='scoring')
                    this.customerCardScoring[index]['Document Link']=''
                if(tab=='requirement')
                    this.customerCardRequirements[index]['Document Link']=''
            })
            .catch(err => {
                this.error_message = err + ".  L'action s'est terminé par un échec. peutêtre le fichier a été supprimé ou déplacé. Veuillez contacter votre administrateur si celà est bloquant"
                if(tab=='scoring')
                    this.customerCardScoring[index]['Document Link']=''
                if(tab=='requirement')
                    this.customerCardRequirements[index]['Document Link']=''
            })
        }
    },
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#risk_content,#history_content,#communication_content{
    max-height: 700px;
    overflow: hidden;
    transition: max-height 0.5s
}

#scoring_content,#requirements_content{
    overflow: hidden;
    transition: max-height 0.5s
}

.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}


.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: 0px; /* table head will be placed from the top of the table and sticks to it */
    z-index: 5000;
}



</style>