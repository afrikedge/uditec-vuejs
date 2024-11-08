<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <lead-Card-Header   :soNo="leadCardId" :soDesc="leadCardHeader['Name']" pageTitle="Fiche prospect" 
                @onGoingBackToList='goBackToList'/>
            </div>
            
<!---------Composant rubban fiche prospect----------------------->      
            <lead-card-ribbon
            routeForNewCard="../NewLead"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @ontransmittingStatusCard="submitStatusUpdate(1)"
            @onValidatingCard="submitStatusUpdate(2)"
            @onValidatingWithCondCard="submitStatusUpdate(3)"
            @onRejectingCard="submitStatusUpdate(4)"
            @onConvertingLead="showConvertLeadConfirmationModal"
            @onGettingContactList="activeModalForSelectableElementList='contactList1'"
            @onGettingShipToAddressList="activeModalForSelectableElementList='addressList1'"
            componentWithCompInfo="leadCardRightInfoMaxWidth"
            :editCardBtnIsDisabled="false || leadCardHeader['Approval Status']== 10"
            :cancelEditCardBtnIsDisabled="false"
            :newCardBtnIsDisabled="false"
            :contactListBtnIsDisabled="false"
            :shipToAddressListBtnIsDisabled="false"

            :transmitBtnIsDisabled="transmitBtnIsDisabled || (leadCardHeader['Approval Status'] > 7 && leadCardHeader['Approval Status'] < 12) || leadCardHeader['Approval Status'] == 6"
            :rejectBtnIsDisabled="false || leadCardHeader['Approval Status'] !== 6"
            :validateWithCondBtnIsDisabled="false || leadCardHeader['Approval Status'] !== 6"
            :validateBtnIsDisabled="false || leadCardHeader['Approval Status'] !== 6"
            
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :convertLeadBtnIsDisabled="!leadCanBeConverted"
            
            ></lead-card-ribbon>

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



<!---------Section formulaire fiche prospect----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire fiche prospect----------------------->                         
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ leadCardHeader['No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ leadCardHeader['Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadLegalStatusLabel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadTypeLabel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadApprovalStatusLabel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadIDModeLabel }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° prospect" :valueInputText="leadCardHeader['No_']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Nom du prospect" v-model="leadCardHeader['Name']" :valueInputText="leadCardHeader['Name']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Nom de recherche"  :valueInputText="leadCardHeader['Search Name']" :is_disabled="true"></input-text>  
                                <input-text labelInputText="Statut prospect" :valueInputText="leadApprovalStatusLabel" :is_disabled="true"></input-text>  
                                
                                <input-text labelInputText="Type prospect" :valueInputText="leadTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type prospect" v-model="leadCardHeader['Lead Type']" :option-list="optionLabelListForLeadType" v-else></input-select-basic-1> 

                                <input-text labelInputText="Forme juridique" :valueInputText="leadLegalStatusLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Forme juridique" v-model="leadCardHeader['Legal Status']" :option-list="optionLabelListForLegalStatus" v-else></input-select-basic-1> 

                                <input-text labelInputText="Mode d'identifiaction" :valueInputText="leadIDModeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Mode d'identifiaction" v-model="leadCardHeader['Identification Mode']" :option-list="optionLabelListForIdentificationMode" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Catégorie professionnelle" :valueInputText="leadProfessionalCategoryLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Catégorie professionnelle" v-model="leadCardHeader['Professional Category']" :option-list="optionLabelListForProfessionalCategory" v-else></input-select-basic-1> 
                                
                                <input-text labelInputText="Nom de l'employeur / Type d'activité" v-model="leadCardHeader['Activity Name']" :valueInputText="leadCardHeader['Activity Name']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            </div>
                            <div class="column">                                
                                <input-text labelInputText="Adresse de l'employeur / activité" v-model="leadCardHeader['Professional Address']" :valueInputText="leadCardHeader['Professional Address']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Code client parent" :valueInputText="leadCardHeader['Parent Account No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Code client parent" v-model="leadCardHeader['Parent Account No_']"  @openModal="activeModalForSelectableElementList='customerList'" v-else></input-select>

                                <input-text labelInputText="Catégorie article autorisée" :valueInputText="leadCardHeader['Item Category']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Catégorie article autorisée" v-model="leadCardHeader['Item Category']"  @openModal="activeModalForSelectableElementList='itemCategoryList'" v-else></input-select>

                                <input-text labelInputText="NIF" :valueInputText="leadCardHeader['NIF']" :is_disabled="true"></input-text> 
                                <input-text labelInputText="STAT" :valueInputText="leadCardHeader['STAT']"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="RCS" :valueInputText="leadCardHeader['RCS']"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="CIF" :valueInputText="leadCardHeader['CIF']"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="N° identification" :valueInputText="leadCardHeader['ID Number']" :is_disabled="true"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>


<!---------sous-Section onglet 5 formulaire fiche prospect----------------------->                         
                    <div id="Communication">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('communication_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                    <span>Adresses & communication</span>
                                </a>
                                <a @click="expand('communication_content');onglet5_expanded=!onglet5_expanded" v-else>
                                    <span>Adresses & communication</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet5_expanded">Afficher plus</div>
                            <div class="column is-narrow py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadCardHeader['Address'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadCardHeader['City'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadCardHeader['Phone No_'] }}</span>
                            </div>
                        </div>
                        <div id="communication_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Adresse:Ligne 1" v-model="leadCardHeader['Address']" :valueInputText="leadCardHeader['Address']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" v-model="leadCardHeader['Address 2']" :valueInputText="leadCardHeader['Address 2']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Code postal" v-model="leadCardHeader['Post Code']" :valueInputText="leadCardHeader['Post Code']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Ville" v-model="leadCardHeader['City']" :valueInputText="leadCardHeader['City']" :is_disabled="!readOnlyModeIsDisabled"></input-text>                                 
                                <input-text labelInputText="Téléphone" v-model="leadCardHeader['Phone No_']" :valueInputText="leadCardHeader['Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Téléphone Mobile" v-model="leadCardHeader['Mobile Phone No_']" :valueInputText="leadCardHeader['Mobile Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Adresse E-mail" v-model="leadCardHeader['E-Mail']" :valueInputText="leadCardHeader['E-Mail']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Site Web" v-model="leadCardHeader['Home Page']" :valueInputText="leadCardHeader['Home Page']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Contact principal" :valueInputText="leadCardHeader['Primary Contact No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Contact principal" v-model="leadCardHeader['Primary Contact No_']"  @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>

                                <input-text labelInputText="Mode relance préféré" :valueInputText="leadActivityType"  :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select-basic-1 labelInputText="Mode relance préféré" v-model="leadCardHeader['Activity Type']" :option-list="optionLabelListForActivityType" v-else></input-select-basic-1> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche prospect----------------------->                         
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'SM : '+leadCardHeader['Sales Mode'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ 'CP : '+ leadCardHeader['Payment Terms Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'MP : '+leadCardHeader['Payment Method Code'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadCardHeader['VAT Bus_ Posting Group']}}</span>
                            </div>
                        </div>
                        <div id="risk_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Mode de vente" :valueInputText="leadCardHeader['Sales Mode']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de vente" v-model="leadCardHeader['Sales Mode']"  @openModal="activeModalForSelectableElementList='salesModeList'" v-else></input-select>

                                <input-text labelInputText="Conditions de paiement" :valueInputText="leadCardHeader['Payment Terms Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Conditions de paiement" v-model="leadCardHeader['Payment Terms Code']"  @openModal="activeModalForSelectableElementList='paymentTermList'" v-else></input-select>

                                <input-text labelInputText="Limite de crédit" :valueInputText="formatAmount(leadCardHeader['Credit limit (LCY)'])" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>  
                                <input-number labelInputText="Limite de crédit" v-model="leadCardHeader['Credit limit (LCY)']" v-else></input-number>  
                                
                                
                                <input-text labelInputText="Mode de paiement" :valueInputText="leadCardHeader['Payment Method Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de paiement" v-model="leadCardHeader['Payment Method Code']"  @openModal="activeModalForSelectableElementList='paymentMethodList'" v-else></input-select>
                                
                                <input-text labelInputText="Groupe tarifaire" :valueInputText="leadCardHeader['Customer Price Group']" :is_disabled="true"></input-text>
                                <input-textarea labelInputText="Observations générales" :valueInputText="leadCardHeader['General comment']" v-model="leadCardHeader['General comment']" :is_disabled="!readOnlyModeIsDisabled"></input-textarea>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Régime TVA" :valueInputText="leadCardHeader['VAT Bus_ Posting Group']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Régime TVA" v-model="leadCardHeader['VAT Bus_ Posting Group']" @openModal="activeModalForSelectableElementList='vatGroupList'" v-else ></input-select>
                                
                                <input-text labelInputText="% Acompte exigé" :valueInputText="formatAmount(leadCardHeader['Prepayment _'])" :is_disabled="true"></input-text> 
                                <input-text labelInputText="Niveau de risque" :valueInputText="leadCardHeader['Risk Level']" :is_disabled="true"></input-text> 
                                
                                <input-text labelInputText="Numéro contrat" :valueInputText="leadCardHeader['Contract No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Numéro contrat" v-model="leadCardHeader['Contract No_']"  @openModal="activeModalForSelectableElementList='contractList'" v-else></input-select>

                                <input-text labelInputText="Note" :valueInputText="formatAmount(leadCardHeader['Score'])" :is_disabled="true"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>


<!---------sous-Section onglet 3 formulaire fiche prospect en lecture seule----------------------->                         
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
                                        <tr :id="'onglet3-L'+index" v-for="(elt,index) of leadCardRequirements" :key="'onglet3-L'+index" @mouseover="setLineShadow('onglet3-L'+index)" @mouseout="removeLineShadow('onglet3-L'+index)" >
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
                            <div v-if="leadCardRequirements.length==0 && onglet3_expanded">Il n'y'a rien à afficher</div>
                        </div>             
                    </div>          

<!---------sous-Section onglet 3 formulaire fiche prospect en lecture/ecriture----------------------->                         
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
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Niveau d’exigence</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="'onglet3-L'+index" v-for="(elt,index) of leadCardRequirements" :key="'onglet3-L'+index" @mouseover="setLineShadow('onglet3-L'+index)" @mouseout="removeLineShadow('onglet3-L'+index)" >
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
                                                    <input v-model="leadCardRequirements[index]['Alpha Value']" class="input is-small" :class="{'has-background-white':elt['Value Type']==2}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==2">
                                                </td>
                                                <td class="has-text-left">
                                                    <input v-model="leadCardRequirements[index]['Numeric Value']" class="input is-small" :class="{'has-background-white':elt['Value Type']==1}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==1">
                                                </td>
                                                <td  class="has-text-left"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td class="has-text-left is-narrow" >
                                                    <input v-model="leadCardRequirements[index]['Validity Date']" class="input is-small" :class="{'has-background-white':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
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
                                                            <input v-model="leadCardRequirements[index]['Document Link']" class="input is-small has-background-white" type="text" style="border:none" :disabled="true">
                                                            <input v-show="false" class="input is-small" :id="'fileUpload1-'+index" type="file" @change="(e)=> uploadFile(e,elt['Criteria'],'requirement',index)" >
                                                        </div>
                                                        <div class="control" v-if="leadCardRequirements[index]['Document Link']==''">
                                                            <button class="button is-small" @click.prevent="getFile('fileUpload1-'+index)">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="leadCardRequirements[index]['Document Link']">
                                                            <button class="button is-small is-danger" @click.prevent="()=>deleteFileFromLine(index,'requirement',leadCardRequirements[index]['Document Link'])">
                                                                <span class="icon">
                                                                    <i class="fas fa-trash"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="leadCardRequirements[index]['Document Link']">
                                                            <!--------pour la version prod-->
                                                            <a class="button  is-small"
                                                            :href="`../public/${leadCardRequirements[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a>
                                                            <!--------pour la version dev-->
                                                            <!----a class="button  is-small"
                                                            :href="`../${leadCardRequirements[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a---->
                                                        </div>
                                                    </div>
                                                </td>
                                                <td  class="has-text-centered">
                                                    <div class="field">
                                                        <input :id="index+'switchColorSuccess'" type="checkbox" :name="index+'switchColorSuccess'" class="switch is-thin is-success" v-model="leadCardRequirements[index]['Valid']">
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
                                <div v-if="leadCardRequirements.length==0 && onglet3_expanded">Il n'y'a rien à afficher</div>
                            </div>
                        </div>
                    </div>              
                    <br><br>


<!---------sous-Section onglet 4 formulaire fiche prospect en lecture seule----------------------->                         
                    <div id="scoring">
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
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Précision</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;z-index:5000">Document requis</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;z-index:5000">Valide</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Point</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Coefficient</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Point pondéré</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="'onglet4-L'+index" v-for="(elt,index) of leadCardScoring" :key="'onglet4-L'+index" @mouseover="setLineShadow('onglet4-L'+index)" @mouseout="removeLineShadow('onglet4-L'+index)" >
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
                            <div v-if="leadCardScoring.length==0 && onglet4_expanded">Il n'y'a rien à afficher</div>
                        </div>
                        <div class="columns mt-3" id="line_total" v-if="leadCardScoring.length>0 && onglet4_expanded">
                            <div class="column">
                            </div>
                            <div class="column">
                                <input-text1 :is_disabled="true" :valueInputText="leadCardHeader['Weighed Point Total']" labelInputText="Total points"></input-text1>
                            </div>
                        </div>                
                    </div>          

<!---------sous-Section onglet 4 formulaire fiche prospect en lecture/ecriture----------------------->                         
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
                                                <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7">Document requis</th>
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
                                            <tr :id="'onglet4-L'+index" v-for="(elt,index) of leadCardScoring" :key="'onglet4-L'+index" @mouseover="setLineShadow('onglet4-L'+index)" @mouseout="removeLineShadow('onglet4-L'+index)" >
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
                                                            <input v-model="elt['Criteria Value']" class="input is-small has-background-white" type="text" style="border:none">
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
                                                                        <td class="has-text-right is-narrow">{{ formatAmount(criteria["Point"]) }}</td>
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
                                                    <input v-model="leadCardScoring[index]['Validity Date']" class="input is-small" :class="{'has-background-white':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
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
                                                            <input v-model="leadCardScoring[index]['Document Link']" class="input is-small has-background-white"  type="text" style="border:none" disabled="true">
                                                            <input v-show="false" class="input is-small" :id="'fileUpload-'+index" type="file" @change="(e)=> uploadFile(e,elt['Criteria'],'scoring',index)" >
                                                        </div>
                                                        <div class="control" v-if="leadCardScoring[index]['Document Link']==''">
                                                            <button class="button is-small" @click.prevent="getFile('fileUpload-'+index)">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="leadCardScoring[index]['Document Link']">
                                                            <button class="button is-small is-danger" @click.prevent="()=>deleteFileFromLine(index,'scoring',leadCardScoring[index]['Document Link'])">
                                                                <span class="icon">
                                                                    <i class="fas fa-trash"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div class="control" v-if="leadCardScoring[index]['Document Link']">
                                                        <!--------pour la version prod-->
                                                            <a class="button  is-small"
                                                            :href="`../public/${leadCardScoring[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a>
                                                        <!--------pour la version dev-->
                                                            <!----a class="button  is-small"
                                                            :href="`../${leadCardScoring[index]['Document Link']}`" target="_blank">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </a---->
                                                        </div>
                                                    </div>
                                                </td>
                                                <td  class="has-text-centered">
                                                    <div class="field">
                                                        <input :id="index+'switchColorSuccess1'" type="checkbox" :name="index+'switchColorSuccess1'" class="switch is-thin is-success" v-model="leadCardScoring[index]['Valid']" @click="getScoringPoint(index)" :disabled="leadCardScoring['Approval Status']!==12">
                                                        <label :for="index+'switchColorSuccess1'"></label>
                                                    </div>
                                                </td>
                                                <td  class="has-text-right is-narrow">{{ formatAmount(elt['Point']) }}</td>
                                                <td  class="has-text-right">{{ formatAmount(elt['Coefficient']) }}</td>
                                                <td  class="has-text-right">{{ formatAmount(elt['Weighed Point']) }}</td>
                                                <td  class="has-text-left is-narrow">{{ formatDateHour(elt['Updated on']) }}</td>
                                                <td  class="has-text-left">{{ elt['Updated by'] }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="leadCardScoring.length==0 && onglet4_expanded">Il n'y'a rien à afficher</div>
                            </div>
                            <div class="columns mt-3" id="line_total" v-if="leadCardScoring.length>0 && onglet4_expanded">
                                <div class="column">
                                </div>
                                <div class="column">
                                    <input-text1 :is_disabled="true" :valueInputText="weighedPointTotal" labelInputText="Total points"></input-text1>
                                </div>
                            </div>        
                        </div>
                    </div>              
                    <br><br>

                </div>
<!---------composant info prospect----------------------->
                <lead-info class="lead-info" v-if="leadCardHeader['No_']" :documentNo="leadCardHeader['No_']" documentType="Lead" :leadNo="leadCardHeader['No_']"></lead-info>

            </div>


<!-----------modal de confirmation convertion de devis-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="leadConfirmationModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.2" @click="leadConfirmationModalShowned=false"></div>
                <div class="modal-content has-background-white p-5 shadow" style="border: none;">
                    <div class="columns mb-5">
                        <div class="column is-narrow">
                            <span class="icon is-large">
                            <i class="far fa-circle-question fa-2x"></i>
                            </span>
                        </div>
                        <div class="column has-text-left">
                            <span class="subtitle is-5 has-text-left">Le propect sera converti en client. Souhaitez-vous continuer?</span>
                        </div>
                    </div>
                    <div class="buttons mt-5 is-right">
                        <button class="button shadow has-background-orange has-text-white" @click.prevent="submitConvertLead">
                            Je confirme
                        </button>
                        <button class="button shadow" @click.prevent="leadConfirmationModalShowned=false">J'annule</button>
                    </div>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" leadConfirmationModalShowned=false"></button>
            </div>

<!-----------Modal pour la création d'un contact-------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="newContactModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => newContactModalShowned=false"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <new-contact :customerNo="leadCardId" :redirectionIsDisabled="true" @submit="(elt) => {contactToDisplay= elt['code'];newContactModalShowned=false} "></new-contact>
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
                    <new-ship-to-address :contactNo="leadCardId" :redirectionIsDisabled="true" @submit="(elt) => {addressToDisplay = elt;newAddressModalShowned=false} "></new-ship-to-address>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { newAddressModalShowned=false }"></button>
            </div>
            
<!-----------Modal pour l'affichage  d'une addresse destinataire -------------------->
            <div :class="{'modal':true , 'is-active': true }" v-if="addressToDisplay" style="z-index:1000">
                <div class="modal-background has-background-dark" style="opacity:0.3;" @click.prevent="() => addressToDisplay=''"></div>
                <div class="modal-content box w-auto h-auto shadow has-background-light" style="border: none;">
                    <ship-to-address-card :customerNo="leadCardId" :addressNo="addressToDisplay"></ship-to-address-card>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" style="z-index:1000" aria-label="close" @click.prevent="() => { addressToDisplay='' }"></button>
            </div>


        </div>

        <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'" 
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-customer-list>

        <modal-for-selectable-contact-list 
            v-if="activeModalForSelectableElementList=='contactList'" 
            :isActive="activeModalForSelectableElementList=='contactList'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="leadCardHeader['No_']" 
            @onGettingLineFromSelectableContactListModal="(elt)=>fillContactInfoField(elt)">
        </modal-for-selectable-contact-list>

        <modal-for-contact-list 
            v-if="activeModalForSelectableElementList=='contactList1'" 
            :isActive="activeModalForSelectableElementList=='contactList1'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="leadCardHeader['No_']"
            @onDisplayingContactCreationModal="()=>showContactCreationModal()"
            @onDisplayingContactCard="(elt)=>{contactToDisplay=elt}">
        </modal-for-contact-list>

        <modal-for-address-list 
            v-if="activeModalForSelectableElementList=='addressList1'" 
            :isActive="activeModalForSelectableElementList=='addressList1'" 
            @closeModal="activeModalForSelectableElementList=''"
            :customerNo="leadCardHeader['No_']"
            @onDisplayingShipToAddressCreationModal="()=>showAddressCreationModal()"
            @onDisplayingAddressCard="(elt)=>{addressToDisplay=elt}">
        </modal-for-address-list>

        <modal-for-selectable-item-category-list 
            v-if="activeModalForSelectableElementList=='itemCategoryList'" 
            :isActive="activeModalForSelectableElementList=='itemCategoryList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableItemCategoryListModal="(elt)=>fillItemCategoryInfoField(elt)">
        </modal-for-selectable-item-category-list>

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
            :salesMode="leadCardHeader['Sales Mode']"
            @onGettingLineFromSelectablePaymentTermListModal="(elt)=>fillPaymentTermInfoField(elt)">
        </modal-for-selectable-payment-term-list>

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
            :customerNo="leadCardHeader['No_']" 
            @onGettingLineFromSelectableContractListModal="(elt)=>fillContractInfoField(elt)">
        </modal-for-selectable-contract-list>

        <modal-for-selectable-vat-bus-posting-group-list 
            v-if="activeModalForSelectableElementList=='vatGroupList'" 
            :isActive="activeModalForSelectableElementList=='vatGroupList'" 
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableVATGroupListModal="(elt)=>fillVATGroupInfoField(elt)">
        </modal-for-selectable-vat-bus-posting-group-list>

    </div>    
</template>
<script>
import leadCardHeader from './HeaderForCard.vue'
import leadInfo from './LeadInfo.vue'
import leadCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputTextarea from './input/input-textarea.vue'
import inputText1 from './input/input-text1.vue'
import inputNumber from './input/input-number.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref, watch, watchEffect } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRoute , useRouter} from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import ModalForSelectableContactList from './ModalForSelectableGlobalContactList.vue'
import ModalForSelectableContractList from './ModalForSelectableContractList.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableItemCategoryList from './ModalForSelectableItemCategoryList.vue'
import ModalForSelectableSalesModeList from './ModalForSelectableSalesModeList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectablePaymentTermList from './ModalForSelectablePaymentTermList.vue'
import ModalForSelectableVatBusPostingGroupList from './ModalForSelectableVATBUSPostingGroupList.vue'

import ModalForContactList from './ModalForContactList.vue'
import ModalForAddressList from './ModalForAddressList.vue'
import NewContact from './NewContact.vue'
import ContactCard from './ContactCard.vue'
import ShipToAddressCard from './ShipToAddressCard.vue'
import NewShipToAddress from './NewShipToAddress.vue'

export default {
    name:'lead-card',
    components:{
        leadCardHeader,leadInfo,leadCardRibbon,
        inputText,inputTextarea,inputText1,inputNumber,inputSelect,inputSelectBasic1,
        ModalForSelectableContactList,ModalForSelectableContractList,ModalForSelectableCustomerList,
        ModalForSelectableItemCategoryList,ModalForSelectableSalesModeList,ModalForSelectablePaymentMethodList,
        ModalForSelectablePaymentTermList,ModalForSelectableVatBusPostingGroupList,
        NewContact,ContactCard,ShipToAddressCard,NewShipToAddress,
        ModalForContactList,ModalForAddressList,
    },
    setup(){
        const hostname = window.location.hostname
        const leadCardId = useRoute().params.id
        const leadCardHeader = ref({})
        const leadCardRequirements = ref([])
        const leadCardScoring = ref([])
        const scoringCriteriaValueList = ref([])
        const readOnlyModeIsDisabled = ref(false)
        const criteriaValueDropdownIsActive = ref(false)
        const activeCriteriaValueDropdown = ref(-1)
        const router = useRouter()


        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')
        const success_transmission=ref('')
        const transmitBtnIsDisabled = ref(false)

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


//Controle d'activation des boutons
        const leadCanBeConverted = computed(()=>{
            if(leadCardHeader.value['Approval Status'] == 7 || leadCardHeader.value['Approval Status'] == 8 )
                return true
            else 
                return false
        })

//fonctions pour définir la fiche sur lecture et/modification
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }
        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        function submitConvertLead(){
            submitting_message.value='Conversion du prospect en cours'
            const JSData ={
                Parameter:'leads_createcustomer',
                webUserName:useWebUserInfoStore().name,
                'Cust Template No_':leadCardHeader.value["Customer Template Code"],
                'Lead No_':leadCardId,
            }
            convertLead(formatToBCJsonData(JSData))
        }

        const leadConfirmationModalShowned = ref(false)

        function convertLead(sqData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,sqData)
            .then(res =>{
                //console.log(res)
                leadConfirmationModalShowned.value = false
                submitting_message.value=''
                success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                error_message.value=''
                setTimeout(()=> router.push(`/customerCard/${res.data.documentNo}`),5000)
            })
            .catch((err) => {
                leadConfirmationModalShowned.value = false
                displayErrorMessage(err)
            })
        }

        //sac des labels de la fiche
        const labelBag = {
            leadTypeLabel:ref(''),
            leadLegalStatusLabel:ref(''),
            leadApprovalStatusLabel:ref(''),
            leadIDModeLabel:ref(''),
            leadProfessionalCategoryLabel:ref(''),
            leadActivityType:ref(''),
            requirementValueTypeLabelList:ref([]),
            requirementLevelLabelList:ref([]),
            validityLabelList:ref([]),
            historyDebtStatusLabel:ref(''),

            optionLabelListForLeadType : ref([]),
            optionLabelListForLegalStatus : ref([]),
            optionLabelListForIdentificationMode : ref([]),
            optionLabelListForProfessionalCategory : ref([]),
            optionLabelListForActivityType : ref([]),
        }


        //function pour afficher le label des champs optionlist des listes et tableaux
        function displayValueTypeLabel(value){
            let eltToFind = labelBag.requirementValueTypeLabelList.value.find((row) => row["Value"]==value)
            if(eltToFind){
                return new String(eltToFind["Description"])[0]
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
                    //getOptionLabel(optionLabelListForRepossSource.value,leadCardHeader.value['Reposs Source'],'repossSourceLabel')
                    
                if (fieldToGetLabelList=='[Requirement]')
                    labelBag.requirementLevelLabelList.value=result.data.recordset

                if (fieldToGetLabelList=='[Validity]')
                    labelBag.validityLabelList.value=result.data.recordset
                    
                if(fieldToGetLabelList=='[Lead Type]')
                    labelBag.optionLabelListForLeadType.value=result.data.recordset
                    //getOptionLabel(optionLabelListForRepossSource.value,leadCardHeader.value['Reposs Source'],'repossSourceLabel')
                    
                if (fieldToGetLabelList=='[Legal Status]')
                    labelBag.optionLabelListForLegalStatus.value=result.data.recordset
                    //getOptionLabel(optionLabelListForRepossStatus.value,leadCardHeader.value['Reposs Status'],'repossStatusLabel')

                if (fieldToGetLabelList=='[Identification Mode]')
                    labelBag.optionLabelListForIdentificationMode.value=result.data.recordset
                    //getOptionLabel(optionLabelListForRepossType.value,leadCardHeader.value['Reposs Type'],'repossTypeLabel')

                if (fieldToGetLabelList=='[Professional Category]')
                    labelBag.optionLabelListForProfessionalCategory.value=result.data.recordset
                    //getOptionLabel(optionLabelListForRepossType.value,leadCardHeader.value['Reposs Type'],'repossTypeLabel')

                if (fieldToGetLabelList=='[Activity Type]')
                    labelBag.optionLabelListForActivityType.value=result.data.recordset
                    //getOptionLabel(optionLabelListForRepossItemStatus.value,leadCardHeader.value['Reposs Item Status'],'repossItemStatusLabel')
            }).catch(err=>console.log(err))
        }


//fonction de récupération des données de la fiche prospect
        function getleadCardHeaderInfo(){
            axios.get(`http://${hostname}:5000/app/getleadCard/${leadCardId}`)
            .then(result => {
                leadCardHeader.value = result.data.recordset[0]
                leadCardHeader.value['Credit limit (LCY)'] = Math.round(leadCardHeader.value['Credit limit (LCY)'])
                
                getSingleOptionLabel('Lead Type','leadTypeLabel',leadCardHeader.value["Lead Type"])
                getSingleOptionLabel('Approval Status','leadApprovalStatusLabel',leadCardHeader.value["Approval Status"])
                getSingleOptionLabel('Legal Status','leadLegalStatusLabel',leadCardHeader.value["Legal Status"])
                getSingleOptionLabel('Identification Mode','leadIDModeLabel',leadCardHeader.value["Identification Mode"])
                getSingleOptionLabel('Professional Category','leadProfessionalCategoryLabel',leadCardHeader.value["Professional Category"])
                getSingleOptionLabel('Activity Type','leadActivityType',leadCardHeader.value["Activity Type"])

                getOptionLabelList('[Lead Type]')
                getOptionLabelList('[Identification Mode]')
                getOptionLabelList('[Legal Status]')
                getOptionLabelList('[Professional Category]')
                getOptionLabelList('[Activity Type]')

                getleadCardRequirementInfo()
                getleadCardScoringInfo()
            }).catch(err=>console.log(err))
        }
        function getleadCardRequirementInfo(){
            axios.get(`http://${hostname}:5000/app/getLERList?leadId=${leadCardId}&accountType=0&customerType=${leadCardHeader.value['Lead Type']}&legalStatus=${leadCardHeader.value['Legal Status']}&identificationMode=${leadCardHeader.value['Identification Mode']}`)
            .then(result => {
                leadCardRequirements.value = result.data
                leadCardRequirements.value.map(line => {
                    line['Validity Date'] = getISODate(line['Validity Date']) 
                    line['Valid'] = line['Valid']==1?true:false
                })
                getOptionLabelList('[Value Type]')
                getOptionLabelList('[Requirement]')
            }).catch(err=>{
                console.log(err)
                if(leadCardRequirements.value.length>0){
                    leadCardRequirements.value = []
                }
            })
        }
        function getleadCardScoringInfo(){
            axios.get(`http://${hostname}:5000/app/getLESList?leadId=${leadCardId}&accountType=0&salesMode=${leadCardHeader.value['Sales Mode']?leadCardHeader.value['Sales Mode']:''}`)
            .then(result => {
                leadCardScoring.value = result.data
                leadCardScoring.value.map(line => {
                    line['Validity Date'] = getISODate(line['Validity Date']) 
                    line['Valid'] = line['Valid']==1?true:false
                })
            }).catch(err=>{
                console.log(err)
                if(leadCardScoring.value.length>0){
                    leadCardScoring.value = []
                }
            })
        }
        function getCriteriaValueList(criteria){
            axios.get(`http://${hostname}:5000/app/getSCVList?criteria=${criteria}`)
            .then(result => {
                scoringCriteriaValueList.value = result.data
            }).catch(err=>console.log(err))
        }


//Autres appels de fonctions liés auX exigences et scoring
        const weighedPointTotal = computed(()=>{
            let sum = 0
            leadCardScoring.value.forEach(elt =>{
                sum = sum + elt['Weighed Point']
            })
            return sum
        })
        function getScoringPoint(index){
            if(!leadCardScoring.value[index]['Valid'])
                leadCardScoring.value[index]['Weighed Point'] = leadCardScoring.value[index]['Point'] * leadCardScoring.value[index]['Coefficient']
            else
                leadCardScoring.value[index]['Weighed Point'] = 0
        }
        

//fonction pour remplir les champs avec des listes sélectionnables
        function fillContactInfoField(contact){
            leadCardHeader.value['Primary Contact No_']= contact['No_']
        }
        function fillCustomerInfoField(customer){
            leadCardHeader.value['Parent Account No_']= customer['No_']
        }
        function fillItemCategoryInfoField(itemCategory){
            leadCardHeader.value['Item Category']= itemCategory['Code']
        }
        function fillSalesModeInfoField(salesMode){
            leadCardHeader.value['Sales Mode']= salesMode['Code']
        }
        function fillPaymentTermInfoField(paymentTerm){
            leadCardHeader.value['Payment Terms Code']= paymentTerm['Code']
            leadCardHeader.value['Prepayment _']= paymentTerm['Prepayment']
        }
        function fillPaymentMethodInfoField(paymentMethod){
            leadCardHeader.value['Payment Method Code']= paymentMethod['Code']
        }
        function fillContractInfoField(contract){
            leadCardHeader.value['Contract No_']= contract['No_']
        }
        function fillVATGroupInfoField(VATGroup){
            leadCardHeader.value['VAT Bus_ Posting Group']= VATGroup['Code']
        }

        //fonction pour insérer la valeur d'un critère sélectionné sur la ligne
        function fillCriteriaValue(index,criteria){
            leadCardScoring.value[index]['Criteria Value']= criteria.Value;
            leadCardScoring.value[index]['Value Description']= criteria.Description;
            leadCardScoring.value[index]['Point']= criteria.Point;
            criteriaValueDropdownIsActive.value=false
            activeCriteriaValueDropdown.value =-1
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
                if(errorObject.message){
                    error_message.value = errorObject.message
                    error_message_code.value = errorObject.code
                }else{
                    error_message.value = errorObject
                    error_message_code.value = errorObject.code
                }
            }
        }

        //fonction pour formater les données à envoyer aux service de BC
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }
        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits: 2 }).format(number)
            }else{
                return 0
            }
        }
        
        //fonction qui envoie les données à l'API et réceptionne et affiche le nouveau statut du prospect
        function updateLeadStatus(id){
            if(id==1){
                axios.get(`http://${hostname}:5000/app/getLeadNewStatus?leadId=${leadCardId}&leadStatus=${leadCardHeader.value['Approval Status']}&languageId=${useWebUserInfoStore().defaultLanguage}`)
                .then(res => {
                    submitting_message.value=''
                    if(res.data[0].Value <= 0){
                        error_message.value=res.data[0].Label
                        error_message_code.value=res.data[0].Value
                    }else{
                        leadCardHeader.value['Approval Status']= res.data[0].Value
                        labelBag.leadApprovalStatusLabel.value = res.data[0].Label
                        success_transmission.value= 'Nouveau statut: '+res.data[0].Label +', veuillez svp enregistrer la page'
                        setTimeout(()=>success_transmission.value='',5000)
                    }
                })
                .catch((err) => {
                    displayErrorMessage(err)
                })
            }
            if(id==2){
                leadCardHeader.value['Approval Status']= 8
                labelBag.leadApprovalStatusLabel.value = "Validé"
                submitting_message.value=''
                success_transmission.value= 'Nouveau statut: Validé, veuillez svp enregistrer la page'
                setTimeout(()=>success_transmission.value='',5000)
            }
            if(id==3){
                leadCardHeader.value['Approval Status']= 7
                labelBag.leadApprovalStatusLabel.value = "Validé sous conditions"
                submitting_message.value=''
                success_transmission.value= 'Nouveau statut: Validé sous conditions, veuillez svp enregistrer la page'
                setTimeout(()=>success_transmission.value='',5000)
            }
            if(id==4){
                leadCardHeader.value['Approval Status']= 10
                labelBag.leadApprovalStatusLabel.value = "Rejeté"
                submitting_message.value=''
                success_transmission.value= 'Nouveau statut: Rejeté, veuillez svp enregistrer la page'
                setTimeout(()=>success_transmission.value='',5000)
            }
        }

        //fonction pour soumettre la modifiaction du statut de la fiche
        function submitStatusUpdate(id){
            submitting_message.value='Transmission en cours'
            updateLeadStatus(id)
        }

        //fonction qui envoie les données aux service de bc et réceptionne et affiche la réponse ou l'erreur
        function updateLeadCard(formattedleadData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedleadData)
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

        //fonction pour soumettre la modification de la fiche
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            leadCardRequirements.value.map( elt => {
                elt['Valid']=elt['Valid']==true?1:0
                elt['Numeric Value'] = elt['Numeric Value']==''?0:elt['Numeric Value']
                elt['Numeric Value'] = elt['Numeric Value']==''?0:elt['Numeric Value']
            }) 
            leadCardScoring.value.map( elt => elt['Valid']=elt['Valid']==true?1:0)
            const JSData = {
                Parameter:'leads_modify',
                webUserName:useWebUserInfoStore().name,
                'No_':leadCardHeader.value['No_'],
                'Name':leadCardHeader.value['Name'],
                'Search Name':leadCardHeader.value['Search Name'],
                'Approval Status':leadCardHeader.value['Approval Status'],
                'Customer Type':leadCardHeader.value['Lead Type'],
                'Legal Status':leadCardHeader.value['Legal Status'],
                'Identification Mode':leadCardHeader.value['Identification Mode'],
                'Address':leadCardHeader.value['Address'],
                'Address 2':leadCardHeader.value['Address 2'],
                'Post Code':leadCardHeader.value['Post Code'], 
                'City':leadCardHeader.value['City'],
                'Phone No_':leadCardHeader.value['Phone No_'],
                'Mobile Phone No_':leadCardHeader.value['Mobile Phone No_'],
                'E-Mail':leadCardHeader.value['E-Mail'],
                'Home Page':leadCardHeader.value['Home Page'],
                'Parent Account No_':leadCardHeader.value['Parent Account No_'],
                'Item Category':leadCardHeader.value['Item Category'],
                'Primary Contact No_':leadCardHeader.value['Primary Contact No_'],
                'Activity Type':leadCardHeader.value['Activity Type'],
                'NIF':leadCardHeader.value['NIF']?leadCardHeader.value['NIF']:'',
                'STAT':leadCardHeader.value['STAT']?leadCardHeader.value['STAT']:'',
                'RCS':leadCardHeader.value['RCS']?leadCardHeader.value['RCS']:'',
                'CIF':leadCardHeader.value['CIF']?leadCardHeader.value['CIF']:'',
                'ID Number':leadCardHeader.value['ID Number']?leadCardHeader.value['ID Number']:'',
                'Sales Mode':leadCardHeader.value['Sales Mode'],
                'Payment Terms Code':leadCardHeader.value['Payment Terms Code'],
                'Credit limit (LCY)':leadCardHeader.value['Credit limit (LCY)'],
                'Payment Method Code':leadCardHeader.value['Payment Method Code'],
                'VAT Bus_ Posting Group':leadCardHeader.value['VAT Bus_ Posting Group'],
                'Customer Price Group':leadCardHeader.value['Customer Price Group']?leadCardHeader.value['Customer Price Group']:useWebUserInfoStore().defaultUserPriceGroup?useWebUserInfoStore().defaultUserPriceGroup:'',
                'Prepayment _':leadCardHeader.value['Prepayment _'],
                'Risk Level':leadCardHeader.value['Risk Level'],
                'Contract No_':leadCardHeader.value['Contract No_'],
                'Score':leadCardHeader.value['Score'],
                'Professional Category':leadCardHeader.value['Professional Category'],
                'Activity Name':leadCardHeader.value['Activity Name'],
                'Professional Address':leadCardHeader.value['Professional Address'],
                'General Comment':leadCardHeader.value['General comment'],
                CustomerRequirement:[
                    ...leadCardRequirements.value
                ],
                CustomerScoring:[
                    ...leadCardScoring.value
                ]
            }
            updateLeadCard(formatToBCJsonData(JSData))
        }

//Gestions des évènements et déclencheurs
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
            getleadCardHeaderInfo()
            getOptionLabelList('[Validity]')


        })

        watchEffect(() => {
            getleadCardScoringInfo()
        })

        watchEffect(() => {
            getleadCardRequirementInfo()
        })

        watch(success_message, () => {
            if(success_message.value){
                readOnlyModeIsDisabled.value=false
                getleadCardHeaderInfo()
                transmitBtnIsDisabled.value=false
            }
        })
        watch(success_transmission, () => {
            if(success_transmission.value){
                readOnlyModeIsDisabled.value=true
                transmitBtnIsDisabled.value=true
            }
        })




        // expose to template and other options API hooks
        return {
            leadCardId,
            setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,readOnlyModeIsDisabled,
            transmitBtnIsDisabled,
            ...labelBag,displayValueTypeLabel,displayRequirementLevelLabel,displayValidityTypeLabel,
            leadCardHeader,leadCardRequirements,leadCardScoring,
            scoringCriteriaValueList,
            criteriaValueDropdownIsActive,activeCriteriaValueDropdown,
            fillContactInfoField,fillContractInfoField,fillCustomerInfoField,fillItemCategoryInfoField,
            fillSalesModeInfoField,fillPaymentTermInfoField,fillPaymentMethodInfoField,fillVATGroupInfoField,
            fillCriteriaValue,getCriteriaValueList,
            submitForm,submitStatusUpdate,
            error_message,error_message_code,success_message,submitting_message,success_transmission,
            leadConfirmationModalShowned,submitConvertLead,
            getScoringPoint,weighedPointTotal,
            formatAmount,hostname,
            leadCanBeConverted,
            contactToDisplay,addressToDisplay,
            newContactModalShowned,newAddressModalShowned

        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.leadCardRightInfoMaxWidth,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            fileToUpload:'',
            fileNameToUpload:'',




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
        showConvertLeadConfirmationModal(){
            this.leadConfirmationModalShowned = true
        },
        goBackToList(){
            useNavigationTabStore().setActiveGroup('sales')
            useNavigationTabStore().setActiveTab('prospects')
            this.$router.push('/')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
     hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('leadCardRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('leadCardRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },

        displayCriteriaValueDropdown(index,criteria){
            this.getCriteriaValueList(criteria)
            this.activeCriteriaValueDropdown =index
            this.criteriaValueDropdownIsActive=true
        },
        closeCriteriaValueDropdown(){
            this.activeCriteriaValueDropdown =-1
            this.criteriaValueDropdownIsActive=false
        },

        formatDateHour(date){
            const dateString = new String(date)
            if (dateString.includes('1753')||dateString.includes('1900-') || date=='') return ''
            else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
        },
        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753')||dateString.includes('1900-')) return ''
            else return new Date(date).toLocaleDateString()
        },
        expand(id){
            const myElt=document.getElementById(id);
            if ( id=='amortissement_content' || id=='scoring_content' || id=='requirements_content') myElt.style.maxHeight='400px'
            else myElt.style.maxHeight='700px'
        },
        collapse(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight="0px"
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
                accountType:'Lead',
                accountNo:this.leadCardHeader['No_'],
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
                        this.leadCardScoring[index]['Document Link']=resp.data

                    if(tab=='requirement')
                        this.leadCardRequirements[index]['Document Link']=resp.data
            })
            .catch(
                ()=>console.log('non ok')
            )
        },
        deleteFileFromLine(index,tab,link){
            axios.get(`http://${this.hostname}:5000/app/deleteFile?link=${link}`)
            .then(()=>{
                if(tab=='scoring')
                    this.leadCardScoring[index]['Document Link']=''
                if(tab=='requirement')
                    this.leadCardRequirements[index]['Document Link']=''
            })
            .catch(err => {
                this.error_message = err + ".  L'action s'est terminé par un échec. peutêtre le fichier a été supprimé ou déplacé. Veuillez contacter votre administrateur si celà persiste"
                if(tab=='scoring')
                    this.leadCardScoring[index]['Document Link']=''
                if(tab=='requirement')
                    this.leadCardRequirements[index]['Document Link']=''
            })
        }
    },
}

</script>
<style scoped>
.lead-info{
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

.has-background-orange{
    background-color: orange;
}

.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: 0px; /* table head will be placed from the top of the table and sticks to it */
    z-index: 5000;
}


</style>