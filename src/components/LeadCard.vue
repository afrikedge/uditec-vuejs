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
            componentWithCompInfo="leadCardRightInfoMaxWidth"
            :editCardBtnIsDisabled="false"
            :cancelEditCardBtnIsDisabled="false"
            :newCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ leadCardHeader['No'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ leadCardHeader['Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ leadCardHeader['Address'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadCardHeader['Legal Status'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadTypeLabel }}</span>
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

                                <input-text labelInputText="Adresse:Ligne 1" v-model="leadCardHeader['Address']" :valueInputText="leadCardHeader['Address']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" v-model="leadCardHeader['Address 2']" :valueInputText="leadCardHeader['Address 2']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Code postal" v-model="leadCardHeader['Post Code']" :valueInputText="leadCardHeader['Post Code']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Ville" v-model="leadCardHeader['City']" :valueInputText="leadCardHeader['City']" :is_disabled="!readOnlyModeIsDisabled"></input-text>                                 
                                <input-text labelInputText="Téléphone" v-model="leadCardHeader['Phone No_']" :valueInputText="leadCardHeader['Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Téléphone Mobile" v-model="leadCardHeader['Mobile Phone No_']" :valueInputText="leadCardHeader['Mobile Phone No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Adresse E-mail" v-model="leadCardHeader['E-Mail']" :valueInputText="leadCardHeader['E-Mail']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Site Web" v-model="leadCardHeader['Home Page']" :valueInputText="leadCardHeader['Home Page']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                
                                <input-text labelInputText="Code client parent" :valueInputText="leadCardHeader['Parent Account No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Code client parent" v-model="leadCardHeader['Parent Account No_']"  @openModal="activeModalForSelectableElementList='customerList'" v-else></input-select>

                                <input-text labelInputText="Catégorie article autorisée" :valueInputText="leadCardHeader['Item Category']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Catégorie article autorisée" v-model="leadCardHeader['Item Category']"  @openModal="activeModalForSelectableElementList='itemCategoryList'" v-else></input-select>

                                <input-text labelInputText="Contact principal" :valueInputText="leadCardHeader['Primary Contact No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Contact principal" v-model="leadCardHeader['Primary Contact No_']"  @openModal="activeModalForSelectableElementList='contactList'" v-else></input-select>

                                <input-text labelInputText="Mode relance préféré" :valueInputText="leadActivityType"  :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select-basic-1 labelInputText="Mode relance préféré" v-model="leadCardHeader['Activity Type']" :option-list="optionLabelListForActivityType" v-else></input-select-basic-1> 

                                <input-text labelInputText="NIF" :valueInputText="leadCardHeader['NIF']" :is_disabled="true"></input-text> 
                                <input-text labelInputText="STAT" :valueInputText="leadCardHeader['STAT']"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="RCS" :valueInputText="leadCardHeader['RCS']"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="CIF" :valueInputText="leadCardHeader['CIF']"  :is_disabled="true"></input-text> 
                                <input-text labelInputText="N° identification" :valueInputText="leadCardHeader['ID Number']" :is_disabled="true"></input-text> 
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

                                <input-text labelInputText="Limite de crédit" :valueInputText="leadCardHeader['Credit limit (LCY)']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>  
                                <input-number labelInputText="Limite de crédit" v-model="leadCardHeader['Credit limit (LCY)']" v-else></input-number>  
                                
                                
                                <input-text labelInputText="Mode de paiement" :valueInputText="leadCardHeader['Payment Method Code']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de paiement" v-model="leadCardHeader['Payment Method Code']"  @openModal="activeModalForSelectableElementList='paymentMethodList'" v-else></input-select>
                                
                                <input-select labelInputText="Régime TVA" v-model="leadCardHeader['VAT Bus_ Posting Group']" @openModal="activeModalForSelectableElementList='vatGroupList'" ></input-select>
                                
                                <input-text labelInputText="% Acompte exigé" :valueInputText="leadCardHeader['Prepayment _']" :is_disabled="true"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Niveau de risque" :valueInputText="leadCardHeader['Risk Level']" :is_disabled="true"></input-text> 
                                
                                <input-text labelInputText="Numéro contrat" :valueInputText="leadCardHeader['Contract No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Numéro contrat" v-model="leadCardHeader['Contract No_']"  @openModal="activeModalForSelectableElementList='contractList'" v-else></input-select>

                                <input-text labelInputText="Note" :valueInputText="leadCardHeader['Score']" :is_disabled="true"></input-text> 
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
                            <div id="requirements_content" class="columns px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
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
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document requis ?</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
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
                                            <td  class="has-text-left has-background-light"> {{ elt['Value Length'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Alpha Value'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Numeric Value'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDate(elt['Validity Date']) }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> 
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input primary" type="checkbox" disabled role="switch" id="flexSwitchCheckDefault"
                                                    :checked="elt['Document required']==1?true:elt['Document required']==0?false:'valeur absente'">
                                                </div>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Document Link'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDate(elt['Updated on']) }}</td>
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
                                    <a @click="expand('requirements_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                        <span>Exigences</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet3_expanded">|</span>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet3_expanded" @click="showEditRowByFormModal">
                                        <span class="icon">
                                            <i class="fas fa-edit has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7" >
                                            Modifier la ligne
                                        </span>
                                    </a>
                                    
                                </div>
                            </div>
                            <div id="requirements_content" class=" px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <div>
                                    <table class="table  is-narrow  is-fullwidth is-bordered">
                                        <thead class=" my-2">
                                            <tr> 
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
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document requis ?</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
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
                                                <td  class="has-text-left"> {{ displayRequirementLevelLabel(elt['Requirement']) }}</td>
                                                <td  class="has-text-left"> {{ elt['Value Length'] }}</td>
                                                <td class="has-text-left" >
                                                    <input v-model="leadCardRequirements[index]['Alpha Value']" class="input is-small" :class="{'has-background-light':elt['Value Type']==2}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==2">
                                                    <!---------div :id="index+'-'+elt['Alpha Value']+'-Alpha Value'" class="editme p-1" :class="{'has-background-light':elt['Value Type']==2}" :contenteditable="elt['Value Type']==2" v-text="elt['Alpha Value']" @blur="onEdit" @keydown.enter="endEdit"></div------->
                                                </td>
                                                <td class="has-text-left">
                                                    <input v-model="leadCardRequirements[index]['Numeric Value']" class="input is-small" :class="{'has-background-light':elt['Value Type']==1}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==1">
                                                    <!---------div :id="index+'-'+elt['Numeric Value']+'-Numeric Value'" class="editme p-1" :class="{'has-background-light':elt['Value Type']==1}" :contenteditable="elt['Value Type']==1" v-text="elt['Numeric Value']" @blur="onEdit" @keydown.enter="endEdit"></div------>
                                                </td>
                                                <td  class="has-text-left"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td class="has-text-left is-narrow" >
                                                    <input v-model="leadCardRequirements[index]['Validity Date']" class="input is-small" :class="{'has-background-light':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
                                                    <!---------div :id="index+'-'+elt['Validity Date']+'-Validity Date'" class="editme p-1" :contenteditable="true" v-text="elt['Validity Date']" @blur="onEdit" @keydown.enter="endEdit"></div---->
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="form-check form-switch">
                                                    <input class="form-check-input primary" type="checkbox" disabled role="switch" id="flexSwitchCheckDefault"
                                                    :checked="elt['Document required']==1?true:elt['Document required']==0?false:'valeur absente'">
                                                </div>
                                                </td>
                                                <td class="has-text-left is-narrow" >
                                                    <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="leadCardRequirements[index]['Document Link']" class="input is-small" :class="{'has-background-light':elt['Document required']==1}" type="text" style="border:none" :disabled="elt['Document required']!==1">
                                                        </div>
                                                        <div class="control">
                                                            <button class="button has-background-orange is-small">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <!---------div :id="index+'-'+elt['Document Link']+'-Document Link'" class="editme p-1" :contenteditable="true" v-text="elt['Document Link']" @blur="onEdit" @keydown.enter="endEdit"></div---->
                                                </td>
                                                <td  class="has-text-left is-narrow"> {{ formatDate(elt['Updated on']) }}</td>
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
                    <div id="scoring" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet4_expanded}">
                            <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet4_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('scoring_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                        <span>Scoring</span>
                                    </a>
                                    <a @click="expand('scoring_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                        <span>Scoring</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="scoring_content" class="columns px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code critère</th>
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
                                        <tr :id="'onglet4-L'+index" v-for="(elt,index) of leadCardScoring" :key="'onglet4-L'+index" @mouseover="setLineShadow('onglet4-L'+index)" @mouseout="removeLineShadow('onglet4-L'+index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Criteria'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Criteria Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['List Value'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Value Description'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ formatDate(elt['Validity Date']) }}</td>
                                            <td  class="has-text-left has-background-light">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" disabled role="switch" id="flexSwitchCheckDefault"
                                                    :checked="elt['Document required']==1?true:elt['Document required']==0?false:'valeur absente'">
                                                </div>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Document Link'] }}</td>
                                            <td  class="has-text-left has-background-light">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" disabled role="switch" id="flexSwitchCheckDefault"
                                                    :checked="elt['Valid']==1?true:elt['Valid']==0?false:'valeur absente'">
                                                </div>
                                            </td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Point'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Coefficient'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Weighed Point'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDateHour(elt['Updated on']) }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Updated by'] }}</td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Weighed Point Total'] }}</td>
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
                    <div id="scoring" v-else>
                        <div :class="{'has-background-white':onglet4_expanded}">
                            <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet4_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('scoring_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                        <span>Scoring</span>
                                    </a>
                                    <a @click="expand('scoring_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                        <span>Scoring</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    <span class="ml-5 subtitle" v-if="onglet4_expanded">|</span>
                                    <a href="#" class="is-hover-orange py-3 px-3" v-if="onglet5_expanded" @click="showEditRowByFormModal">
                                        <span class="icon">
                                            <i class="fas fa-edit has-text-orange"></i>
                                        </span>
                                        <span class="subtitle is-7" >
                                            Modifier la ligne
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="scoring_content" class=" px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <div style="margin-bottom: 300px;">
                                    <table class="table  is-narrow  is-fullwidth ">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Description de la valeur</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document requis</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 300px;">Lien document</th>
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
                                            <tr :id="'onglet4-L'+index" v-for="(elt,index) of leadCardScoring" :key="'onglet4-L'+index" @mouseover="setLineShadow('onglet4-L'+index)" @mouseout="removeLineShadow('onglet4-L'+index)" >
                                                <td class="has-text-left">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
    
                                                <td class="has-text-left py-1 px-2" >{{ elt['Criteria'] }}</td>
                                                <td  class="has-text-left is-narrow"> {{ elt['Criteria Description'] }}</td>
                                                <td  class="has-text-left">
                                                    <div class="dropdown is-small" :class="{'is-active':criteriaValueDropdownIsActive}">
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="elt['List Value']" class="input is-small has-background-light" type="text" style="border:none">
                                                        </div>
                                                        <div class="control">
                                                            <button class="button has-background-orange is-small" @click.prevent="criteriaValueDropdownIsActive=!criteriaValueDropdownIsActive">
                                                                <span class="icon">
                                                                    <i class="fas fa-plus" v-if="criteriaValueDropdownIsActive==false"></i>
                                                                    <i class="fas fa-close" v-else></i>
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
                                                    <!--------div :id="index+'-'+elt['List Value']+'-List Value'" class="editme p-1" :contenteditable="true" v-text="elt['List Value']" @blur="onEdit" @keydown.enter="endEdit"></div--------->
                                                </td>
                                                <td  class="has-text-left is-narrow">{{ elt['Value Description'] }}</td>
                                                <td  class="has-text-left">{{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td  class="has-text-left is-narrow">
                                                    <input v-model="leadCardScoring[index]['Validity Date']" class="input is-small" :class="{'has-background-light':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
                                                    <!-----div :id="index+'-'+elt['Validity Date']+'-Validity Date'" class="editme p-1" :contenteditable="true" v-text="formatDateHour(elt['Validity Date'])" @blur="onEdit" @keydown.enter="endEdit"></div----->
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="form-check form-switch">
                                                    <input class="form-check-input primary" type="checkbox" disabled role="switch" id="flexSwitchCheckDefault"
                                                    :checked="elt['Document required']==1?true:elt['Document required']==0?false:'valeur absente'">
                                                </div>
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="leadCardScoring[index]['Document Link']" class="input is-small" :class="{'has-background-light':elt['Document required']==1}" type="text" style="border:none" :disabled="elt['Document required']!==1">
                                                        </div>
                                                        <div class="control">
                                                            <button class="button has-background-orange is-small">
                                                                <span class="icon">
                                                                    <i class="fas fa-share"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <!-------div :id="index+'-'+elt['Document Link']+'-Document Link'" class="editme p-1" :contenteditable="true" v-text="elt['Document Link']" @blur="onEdit" @keydown.enter="endEdit"></div----->
                                                </td>
                                                <td  class="has-text-left">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input primary" type="checkbox" disabled role="switch" id="flexSwitchCheckDefault"
                                                        :checked="elt['Valid']==1?true:elt['Valid']==0?false:'valeur absente'">
                                                    </div>
                                                </td>
                                                <td  class="has-text-left is-narrow">{{ elt['Point'] }}</td>
                                                <td  class="has-text-left">{{ elt['Coefficient'] }}</td>
                                                <td  class="has-text-left">{{ elt['Weighed Point'] }}</td>
                                                <td  class="has-text-left is-narrow">{{ formatDateHour(elt['Updated on']) }}</td>
                                                <td  class="has-text-left">{{ elt['Updated by'] }}</td>
                                                <td  class="has-text-left">{{ elt['Weighed Point Total'] }}</td>
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
                    </div>              
                    <br><br>

                </div>
<!---------composant info prospect----------------------->
                <lead-info class="lead-info"></lead-info>

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
import leadInfo from './ProspectInfo.vue'
import leadCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputText1 from './input/input-text1.vue'
import inputNumber from './input/input-number.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRoute } from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import ModalForSelectableContactList from './ModalForSelectableGlobalContactList.vue'
import ModalForSelectableContractList from './ModalForSelectableContractList.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableItemCategoryList from './ModalForSelectableItemCategoryList.vue'
import ModalForSelectableSalesModeList from './ModalForSelectableSalesModeList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectablePaymentTermList from './ModalForSelectablePaymentTermList.vue'
import ModalForSelectableVatBusPostingGroupList from './ModalForSelectableVATBUSPostingGroupList.vue'



export default {
    name:'lead-card',
    components:{
        leadCardHeader,leadInfo,leadCardRibbon,
        inputText,inputText1,inputNumber,inputSelect,inputSelectBasic1,
        ModalForSelectableContactList,ModalForSelectableContractList,ModalForSelectableCustomerList,
        ModalForSelectableItemCategoryList,ModalForSelectableSalesModeList,ModalForSelectablePaymentMethodList,
        ModalForSelectablePaymentTermList,ModalForSelectableVatBusPostingGroupList
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

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')
        
        //fonctions pour définir la fiche sur lecture et/modification
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
            if(scoringCriteriaValueList.value.length==0){
                getCriteriaValueList()
            }
        }
        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        //sac des labels de la fiche
        const labelBag = {
            leadTypeLabel:ref(''),
            leadLegalStatusLabel:ref(''),
            leadApprovalStatusLabel:ref(''),
            leadIDModeLabel:ref(''),
            leadActivityType:ref(''),
            requirementValueTypeLabelList:ref([]),
            requirementLevelLabelList:ref([]),
            validityLabelList:ref([]),
            historyDebtStatusLabel:ref(''),

            optionLabelListForLeadType : ref([]),
            optionLabelListForLegalStatus : ref([]),
            optionLabelListForIdentificationMode : ref([]),
            optionLabelListForActivityType : ref([]),
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
                axios.get(`http://${hostname}:3000/app/getSingleOptionLabel?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabel}&vl=${value}`)
                .then(result => {
                    labelBag[fieldToDisplayLabel].value = result.data.recordset[0][""]
                }).catch(err=>console.log(err))
            }else{
                labelBag[fieldToDisplayLabel].value ='champ inexistant!'
            }
        }
        function getOptionLabelList(fieldToGetLabelList){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
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

                if (fieldToGetLabelList=='[Activity Type]')
                    labelBag.optionLabelListForActivityType.value=result.data.recordset
                    //getOptionLabel(optionLabelListForRepossItemStatus.value,leadCardHeader.value['Reposs Item Status'],'repossItemStatusLabel')
            }).catch(err=>console.log(err))
        }


        //fonction de récupération des données de la fiche prospect
        function getleadCardHeaderInfo(){
            axios.get(`http://${hostname}:3000/app/getleadCard/${leadCardId}`)
            .then(result => {
                leadCardHeader.value = result.data.recordset[0]
                console.log(result.data.recordset[0])
                getSingleOptionLabel('Lead Type','leadTypeLabel',leadCardHeader.value["Lead Type"])
                getSingleOptionLabel('Approval Status','leadApprovalStatusLabel',leadCardHeader.value["Approval Status"])
                getSingleOptionLabel('Legal Status','leadLegalStatusLabel',leadCardHeader.value["Legal Status"])
                getSingleOptionLabel('Identification Mode','leadIDModeLabel',leadCardHeader.value["Identification Mode"])
                getSingleOptionLabel('Activity Type','leadActivityType',leadCardHeader.value["Activity Type"])

                getOptionLabelList('[Lead Type]')
                getOptionLabelList('[Identification Mode]')
                getOptionLabelList('[Legal Status]')
                getOptionLabelList('[Activity Type]')

                getleadCardRequirementInfo()
                getleadCardScoringInfo()
            }).catch(err=>console.log(err))
        }
        function getleadCardRequirementInfo(){
            axios.get(`http://${hostname}:3000/app/getLERList?leadId=${leadCardId}&accountType=0&customerType=${leadCardHeader.value['Lead Type']}&legalStatus=${leadCardHeader.value['Legal Status']}&identificationMode=${leadCardHeader.value['Identification Mode']}`)
            .then(result => {
                leadCardRequirements.value = result.data
                getOptionLabelList('[Value Type]')
                getOptionLabelList('[Requirement]')
            }).catch(err=>console.log(err))
        }
        function getleadCardScoringInfo(){
            axios.get(`http://${hostname}:3000/app/getLESList?leadId=${leadCardId}&accountType=0&salesMode=${leadCardHeader.value['Sales Mode']?leadCardHeader.value['Sales Mode']:''}`)
            .then(result => {
                leadCardScoring.value = result.data
                getOptionLabelList('[Validity]')
            }).catch(err=>console.log(err))
        }
        function getCriteriaValueList(){
            axios.get(`http://${hostname}:3000/app/getSCVList?criteria=SC06`)
            .then(result => {
                scoringCriteriaValueList.value = result.data
            }).catch(err=>console.log(err))
        }

        onBeforeMount(() => {
            if(useWebUserInfoStore().name==''){
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                })
                .catch(err=>console.log(err))
            }
        })

        onMounted(() => {
            getleadCardHeaderInfo()

        })

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
            leadCardScoring.value[index]['List Value']= criteria.Value;
            leadCardScoring.value[index]['Value Description']= criteria.Description;
            criteriaValueDropdownIsActive.value=!criteriaValueDropdownIsActive.value
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

        //fonction pour formater les données à envoyer aux service de BC
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }

        //fonction qui envoie les données aux service de bc et réceptionne et affiche la réponse ou l'erreur
        function updateLeadCard(formattedleadData){
            axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedleadData)
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

        //fonction pour soumettre la modifiaction de la fiche
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'leads_modify',
                webUserName:useWebUserInfoStore().name,
                'No_':leadCardHeader.value['No_'],
                'Name':leadCardHeader.value['Name'],
                'Search Name':leadCardHeader.value['Search Name'],
                'Approval Status':leadCardHeader.value['Approval Status'],
                'Lead Type':leadCardHeader.value['Lead Type'],
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
                'NIF':leadCardHeader.value['NIF'],
                'STAT':leadCardHeader.value['STAT'],
                'RCS':leadCardHeader.value['RCS'],
                'CIF':leadCardHeader.value['CIF'],
                'ID Number':leadCardHeader.value['ID Number'],
                'Sales Mode':leadCardHeader.value['Sales Mode'],
                'Payment Terms Code':leadCardHeader.value['Payment Terms Code'],
                'Credit limit (LCY)':leadCardHeader.value['Credit limit (LCY)'],
                'Payment Method Code':leadCardHeader.value['Payment Method Code'],
                'VAT Bus_ Posting Group':leadCardHeader.value['VAT Bus_ Posting Group'],
                'Prepayment _':leadCardHeader.value['Prepayment _'],
                'Risk Level':leadCardHeader.value['Risk Level'],
                'Contract No_':leadCardHeader.value['Contract No_'],
                'Score':leadCardHeader.value['Score'],
                CustomerRequirement:[
                    ...leadCardRequirements.value
                ],
                CustomerScoring:[
                    ...leadCardScoring.value
                ]
            }
            updateLeadCard(formatToBCJsonData(JSData))
        }




        // expose to template and other options API hooks
        return {
            leadCardId,
            setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,
            ...labelBag,displayValueTypeLabel,displayRequirementLevelLabel,displayValidityTypeLabel,
            leadCardHeader,leadCardRequirements,leadCardScoring,
            scoringCriteriaValueList,
            readOnlyModeIsDisabled,criteriaValueDropdownIsActive,
            fillContactInfoField,fillContractInfoField,fillCustomerInfoField,fillItemCategoryInfoField,
            fillSalesModeInfoField,fillPaymentTermInfoField,fillPaymentMethodInfoField,fillVATGroupInfoField,
            fillCriteriaValue,
            submitForm,
            error_message,error_message_code,success_message,submitting_message,
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
        }
    },
    methods:{
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
            myElt.style.maxHeight='700px'
        },
        collapse(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight="0px"
        },
        setLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.add('is-hovered-td')
            myElt.classList.add('shadow')
            //const children =  myElt.childNodes
            // children.forEach(element => {
            //     element.classList.remove('has-background-light')
            //     element.classList.add('box')
            // })
        },
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.remove('is-hovered-td')
            myElt.classList.remove('shadow')
            // const children =  myElt.childNodes
            // children.forEach(element => {
            //     element.classList.remove('is-hover-orange')
            //     element.classList.add('has-background-light')
            // })
            //console.log(children)

        },
    },
}

</script>
<style scoped>
.lead-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#risk_content,#requirements_content,#scoring_content,#history_content{
    max-height: 700px;
    overflow: hidden;
    transition: max-height 0.5s
}

.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}



</style>