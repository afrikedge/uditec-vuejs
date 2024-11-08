<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <lead-card-Header soNo="Nouveau prospect" :soDesc="leadName"
                @onGoingBackToList='goBackToList'/>
            </div>
            
<!---------Composant rubban fiche nouveau prospect----------------------->      
            <lead-card-ribbon
            @onSubmittingForm="submitForm"
            :readOnlyModeIsDisabled="true"
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
                                <i class="fas fa-spinner fa-pulse"></i>
                            </span>
                            {{ success_message }}
                        </span>
                    <button class="delete" aria-label="delete" @click="success_message=''"></button>
                </div>
            </article>

<!---------Section formulaire fiche nouveau prospect----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche nouveau prospect----------------------->                         
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
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ leadName }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ leadAddress }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadLegalStatusLabel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadTypeLabel }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">                                
                                <input-text labelInputText="Nom du prospect" v-model="leadName"></input-text>
                                
                                <input-text labelInputText="Nom de recherche" :valueInputText="leadSearchName" :is_disabled="true"></input-text>
                                                                
                                <input-select-basic-1 labelInputText="Type prospect" v-model="leadType" :option-list="optionLabelListForLeadType"></input-select-basic-1> 

                                <input-select-basic-1 labelInputText="Forme juridique" v-model="leadLegalStatus" :option-list="optionLabelListForLegalStatus"></input-select-basic-1> 

                                <input-select-basic-1 labelInputText="Mode d'identifiaction" v-model="leadIdentificationMode" :option-list="optionLabelListForIdentificationMode"></input-select-basic-1>                                
                            </div>
                            <div class="column">
                                <input-select labelInputText="Code client parent" v-model="leadParentAccountNo"  @openModal="activeModalForSelectableElementList='customerList'"></input-select>
                                
                                <input-select labelInputText="Catégorie article autorisée" v-model="leadItemCategory"  @openModal="activeModalForSelectableElementList='itemCategoryList'"></input-select>
                                
                                <input-select-basic-1 labelInputText="Catégorie professionnelle" v-model="leadProfessionalCategory" :option-list="optionLabelListForProfessionalCategory"></input-select-basic-1>                                
                                
                                <input-text labelInputText="Nom de l'employeur / Type d'activité" v-model="leadActivityName"></input-text>
                                <input-text labelInputText="Adresse de l'employeur / activité" v-model="leadProfessionalAddress"></input-text>
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
                        </div>
                        <div id="communication_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Adresse:Ligne 1" v-model="leadAddress"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" v-model="leadAddress2" ></input-text> 
                                <input-text labelInputText="Code postal" v-model="leadPostCode" ></input-text> 
                                <input-text labelInputText="Ville" v-model="leadCity" ></input-text>                                 
                                <input-text labelInputText="Téléphone" v-model="leadPhoneNo" ></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Téléphone Mobile" v-model="leadMobilePhoneNo"></input-text> 
                                <input-text labelInputText="Adresse E-mail" v-model="leadEMail"></input-text> 
                                <input-text labelInputText="Site Web" v-model="leadHomePage"></input-text> 
                                <input-select labelInputText="Contact principal" v-model="leadPrimaryContactNo"  @openModal="activeModalForSelectableElementList='contactList'"></input-select>
                                <input-select-basic-1 labelInputText="Mode relance préféré" v-model="leadActivityType" :option-list="optionLabelListForActivityType"></input-select-basic-1> 
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'SM : '+leadSalesMode }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ 'CP : '+ leadPaymentTermsCode }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ 'MP : '+leadPaymentMethodCode }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ leadVATBusPostingGroup }}</span>
                            </div>
                        </div>
                        <div id="risk_content" class="columns">

                            
                            <div class="column">
                                <input-select labelInputText="Mode de vente" v-model="leadSalesMode"  @openModal="activeModalForSelectableElementList='salesModeList'"></input-select>

                                <input-select labelInputText="Conditions de paiement" v-model="leadPaymentTermsCode"  @openModal="activeModalForSelectableElementList='paymentTermList'"></input-select>

                                <input-number labelInputText="Limite de crédit" v-model="leadCreditLimit" ></input-number>  
                                
                                <input-select labelInputText="Mode de paiement" v-model="leadPaymentMethodCode"  @openModal="activeModalForSelectableElementList='paymentMethodList'"></input-select>
                                
                                <input-text labelInputText="Groupe tarifaire" v-model="customerPriceGroup" :valueInputText="customerPriceGroup" :is_disabled="true"></input-text>

                            </div>
                            <div class="column">
                                <input-select labelInputText="Régime TVA" v-model="leadVATBusPostingGroup" @openModal="activeModalForSelectableElementList='vatGroupList'"></input-select>
                                
                                <input-text labelInputText="% Acompte exigé" :valueInputText="leadPrepayment" :is_disabled="true"></input-text> 
                                <input-text labelInputText="Niveau de risque" :valueInputText="leadRiskLevel" :is_disabled="true"></input-text> 
                                
                                <input-select labelInputText="Numéro contrat" v-model="leadContractNo"  @openModal="activeModalForSelectableElementList='contractList'"></input-select>

                                <!---input-text labelInputText="Note" :valueInputText="leadCardHeader['Score']" :is_disabled="true"></input-text----> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 3 formulaire fiche prospect en lecture/ecriture----------------------->                         
                    <div id="exigences" >
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
                                                <td  class="has-text-left"> {{ elt['Value Length'] }}</td>
                                                <td class="has-text-left" >
                                                    <input v-model="leadCardRequirements[index]['Alpha Value']" class="input is-small" :class="{'has-background-light':elt['Value Type']==2}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==2">
                                                </td>
                                                <td class="has-text-left">
                                                    <input v-model="leadCardRequirements[index]['Numeric Value']" class="input is-small" :class="{'has-background-light':elt['Value Type']==1}" type="text " style="border:none" :maxlength="elt['Value Length']" :disabled="elt['Value Type']!==1">
                                                </td>
                                                <td  class="has-text-left"> {{ displayValidityTypeLabel(elt['Validity']) }}</td>
                                                <td class="has-text-left is-narrow" >
                                                    <input v-model="leadCardRequirements[index]['Validity Date']" class="input is-small" :class="{'has-background-light':elt['Validity']==0}" type="date" style="border:none" :disabled="elt['Validity']!==0">
                                                </td>
                                                <td  class="has-text-centered">
                                                    <div class="field">
                                                        <input type="checkbox" name="switchThinColorDanger" class="switch is-thin is-danger" :checked="elt['Document required']">
                                                        <label></label>
                                                    </div>
                                                </td>
                                                <td class="has-text-left is-narrow" >
                                                    
                                                </td>
                                                <td  class="has-text-centered">
                                                    <div class="field">
                                                        <input :id="index+'switchColorSuccess'" type="checkbox" :name="index+'switchColorSuccess'" class="switch is-thin is-success" v-model="leadCardRequirements[index]['Valid']" :disabled="true">
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
                                <div v-if="leadCardRequirements.length==0 && onglet3_expanded">Il n'y'a rien à afficher</div>
                            </div>
                        </div>
                    </div>              
                    <br><br>

<!---------sous-Section onglet 4 formulaire fiche prospect en lecture/ecriture----------------------->                         
                    <div id="scoring" v-if="false">
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
                                                    <div class="dropdown is-small" :class="{'is-active':criteriaValueDropdownIsActive && activeCriteriaValueDropdown==index}">
                                                        <div class="dropdown-trigger">
                                                            <div class="field has-addons ">
                                                        <div class="control is-expanded">
                                                            <input v-model="elt['Criteria Value']" class="input is-small has-background-light" type="text" style="border:none">
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
            :salesMode="leadSalesMode"
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
            :customerNo="newLead" 
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
import leadCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputText1 from './input/input-text1.vue'
import inputNumber from './input/input-number.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRouter } from 'vue-router'
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
    name:'new-lead',
    components:{
        leadCardHeader,leadCardRibbon,
        inputText,inputText1,inputNumber,inputSelect,inputSelectBasic1,
        ModalForSelectableContactList,ModalForSelectableContractList,ModalForSelectableCustomerList,
        ModalForSelectableItemCategoryList,ModalForSelectableSalesModeList,ModalForSelectablePaymentMethodList,
        ModalForSelectablePaymentTermList, ModalForSelectableVatBusPostingGroupList
    },
    setup(){
        const router = useRouter()
        //nom de l'hote dans l'url 
        const hostname = window.location.hostname;

        //variable de soumission forme
        let submitting_message=ref('') 

        //variable d'erreur serveur
        let error_message=ref('')
        let error_message_code =ref('')

        //variable de success serveur
        let success_message=ref('')

        //sac des labels de la fiche
        const labelBag = {
            requirementValueTypeLabelList:ref([]),
            requirementLevelLabelList:ref([]),
            validityLabelList:ref([]),
            optionLabelListForLeadType : ref([]),
            optionLabelListForLegalStatus : ref([]),
            optionLabelListForIdentificationMode : ref([]),
            optionLabelListForProfessionalCategory : ref([]),
            optionLabelListForActivityType : ref([]),
        }


//fonctions pour afficher le label des champs optionlist des listes et tableaux
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

//références de nos champs en entête et en ligne
        const leadSearchName = computed(() => {
            return leadCardHeaderInfo.leadName.value.toUpperCase()
        })

        const leadCardHeaderInfo = {
            leadName : ref(''),
            leadType : ref(0),
            leadLegalStatus : ref(0),
            leadIdentificationMode : ref(0),
            leadProfessionalCategory : ref(0),
            leadActivityName : ref(''),
            leadProfessionalAddress : ref(''),
            leadAddress : ref(''),
            leadAddress2 : ref(''),
            leadPostCode : ref(''),
            leadCity : ref(''),
            leadPhoneNo : ref(''),
            leadMobilePhoneNo : ref(''),
            leadEMail : ref(''),
            leadHomePage : ref(''),
            leadParentAccountNo : ref(''),
            leadItemCategory : ref(''),
            leadPrimaryContactNo : ref(''),
            leadActivityType : ref(0),
            leadSalesMode : ref(''),
            leadPaymentTermsCode : ref(''),
            leadCreditLimit : ref(0),
            leadPaymentMethodCode : ref(''),
            leadVATBusPostingGroup : ref(''),
            customerPriceGroup : ref(''),
            leadPrepayment : ref(0),
            leadRiskLevel : ref(''),
            leadContractNo : ref(''),
        }

        const leadCardRequirements = ref([])
        const leadCardScoring = ref([])
        const criteriaValueDropdownIsActive = ref(false)
        const activeCriteriaValueDropdown = ref(-1)
        const scoringCriteriaValueList = ref([])


        function getOptionLabelList(fieldToGetLabelList){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                if (fieldToGetLabelList=='[Value Type]')
                    labelBag.requirementValueTypeLabelList.value=result.data.recordset                    
                if (fieldToGetLabelList=='[Requirement]')
                    labelBag.requirementLevelLabelList.value=result.data.recordset
                if (fieldToGetLabelList=='[Validity]')
                    labelBag.validityLabelList.value=result.data.recordset
                if(fieldToGetLabelList=='[Lead Type]')
                    labelBag.optionLabelListForLeadType.value=result.data.recordset                    
                if (fieldToGetLabelList=='[Legal Status]')
                    labelBag.optionLabelListForLegalStatus.value=result.data.recordset
                if (fieldToGetLabelList=='[Identification Mode]')
                    labelBag.optionLabelListForIdentificationMode.value=result.data.recordset
                if (fieldToGetLabelList=='[Professional Category]')
                    labelBag.optionLabelListForProfessionalCategory.value=result.data.recordset
                if (fieldToGetLabelList=='[Activity Type]')
                    labelBag.optionLabelListForActivityType.value=result.data.recordset
            }).catch(err=>console.log(err))
        }

        //propriétés calculées
        const weighedPointTotal = computed(()=> {
            let sum = 0
            leadCardScoring.value.forEach(elt =>{
                sum = sum + elt['Weighed Point']
            })
            return sum
        })

//Fonctions pour récupérer les éléments à référencer sur les lignes
        function getleadCardRequirementInfo(){
            axios.get(`http://${hostname}:5000/app/getLERList?leadId=''&accountType=0&customerType=${leadCardHeaderInfo.leadType.value}&legalStatus=${leadCardHeaderInfo.leadLegalStatus.value}&identificationMode=${leadCardHeaderInfo.leadIdentificationMode.value}`)
            .then(result => {
                leadCardRequirements.value = result.data
                getOptionLabelList('[Value Type]')
                getOptionLabelList('[Requirement]')
            }).catch(()=>{
                leadCardRequirements.value = []
                //console.log(err)
            })
        }

        function getleadCardScoringInfo(){
            axios.get(`http://${hostname}:5000/app/getLESList?leadId=''&accountType=0&salesMode=${leadCardHeaderInfo.leadSalesMode.value}`)
            .then(result => {
                leadCardScoring.value = result.data
                getOptionLabelList('[Validity]')
            }).catch(()=>{
                leadCardScoring.value = []
                //console.log(err)
            })
        }

        function getCriteriaValueList(criteria){
            axios.get(`http://${hostname}:5000/app/getSCVList?criteria=${criteria}`)
            .then(result => {
                scoringCriteriaValueList.value = result.data
            }).catch(err=>console.log(err))
        }


//fonction pour remplir les champs avec des listes sélectionnables
        function fillContactInfoField(contact){
            leadCardHeaderInfo.leadPrimaryContactNo.value= contact['No_']
        }
        function fillCustomerInfoField(customer){
            leadCardHeaderInfo.leadParentAccountNo.value= customer['No_']
        }
        function fillItemCategoryInfoField(itemCategory){
            leadCardHeaderInfo.leadItemCategory.value= itemCategory['Code']
        }
        function fillSalesModeInfoField(salesMode){
            leadCardHeaderInfo.leadSalesMode.value= salesMode['Code']
        }
        function fillPaymentTermInfoField(paymentTerm){
            leadCardHeaderInfo.leadPaymentTermsCode.value= paymentTerm['Code']
            leadCardHeaderInfo.leadPrepayment.value= paymentTerm['Prepayment']
        }
        function fillPaymentMethodInfoField(paymentMethod){
            leadCardHeaderInfo.leadPaymentMethodCode.value= paymentMethod['Code']
        }
        function fillContractInfoField(contract){
            leadCardHeaderInfo.leadContractNo.value= contract['No_']
        }
        function fillVATGroupInfoField(VATGroup){
            leadCardHeaderInfo.leadVATBusPostingGroup.value= VATGroup['Code']
        }

        //fonction pour insérer la valeur d'un critère sélectionné sur la ligne
        function fillCriteriaValue(index,criteria){
            //leadCardScoring.value[index]['List Value']= criteria.Value;
            leadCardScoring.value[index]['Criteria Value']= criteria.Value;
            leadCardScoring.value[index]['Value Description']= criteria.Description;
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
        function createLead(formattedleadData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedleadData)
            .then(res => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                error_message.value=''
                setTimeout(()=> router.push(`/LeadCard/${res.data.documentNo}`),3000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }

        //fonction pour soumettre la modifiaction de la fiche
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'leads_insert',
                webUserName:useWebUserInfoStore().name,
                'No_':'',
                'Name':leadCardHeaderInfo.leadName.value,
                'Search Name':leadSearchName.value,
                'Approval Status':1,
                'Customer Type':leadCardHeaderInfo.leadType.value,
                'Legal Status':leadCardHeaderInfo.leadLegalStatus.value,
                'Identification Mode':leadCardHeaderInfo.leadIdentificationMode.value,
                'Address':leadCardHeaderInfo.leadAddress.value,
                'Address 2':leadCardHeaderInfo.leadAddress2.value,
                'Post Code':leadCardHeaderInfo.leadPostCode.value, 
                'City':leadCardHeaderInfo.leadCity.value,
                'Phone No_':leadCardHeaderInfo.leadPhoneNo.value,
                'Mobile Phone No_':leadCardHeaderInfo.leadMobilePhoneNo.value,
                'E-Mail':leadCardHeaderInfo.leadEMail.value,
                'Home Page':leadCardHeaderInfo.leadHomePage.value,
                'Parent Account No_':leadCardHeaderInfo.leadParentAccountNo.value,
                'Item Category':leadCardHeaderInfo.leadItemCategory.value,
                'Primary Contact No_':leadCardHeaderInfo.leadPrimaryContactNo.value,
                'Activity Type':leadCardHeaderInfo.leadActivityType.value,
                'NIF':'',
                'STAT':'',
                'RCS':'',
                'CIF':'',
                'ID Number':'',
                'Sales Mode':leadCardHeaderInfo.leadSalesMode.value,
                'Payment Terms Code':leadCardHeaderInfo.leadPaymentTermsCode.value,
                'Credit limit (LCY)':leadCardHeaderInfo.leadCreditLimit.value,
                'Payment Method Code':leadCardHeaderInfo.leadPaymentMethodCode.value,
                'VAT Bus_ Posting Group':leadCardHeaderInfo.leadVATBusPostingGroup.value,
                'Customer Price Group':leadCardHeaderInfo.customerPriceGroup.value,
                'Prepayment _':leadCardHeaderInfo.leadPrepayment.value,
                'Risk Level':leadCardHeaderInfo.leadRiskLevel.value,
                'Contract No_':leadCardHeaderInfo.leadContractNo.value,
                'Score':0,
                'Professional Category':leadCardHeaderInfo.leadProfessionalCategory.value,
                'Activity Name':leadCardHeaderInfo.leadActivityName.value,
                'Professional Address':leadCardHeaderInfo.leadProfessionalAddress.value,
                CustomerRequirement:[
                    ...leadCardRequirements.value
                ],
                CustomerScoring:[
                    ...leadCardScoring.value
                ]
            }
            createLead(formatToBCJsonData(JSData))
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

            if(useWebUserInfoStore().defaultUserPriceGroup)
                leadCardHeaderInfo.customerPriceGroup.value = useWebUserInfoStore().defaultUserPriceGroup


            getOptionLabelList('[Lead Type]')
            getOptionLabelList('[Legal Status]')
            getOptionLabelList('[Identification Mode]')
            getOptionLabelList('[Professional Category]')
            getOptionLabelList('[Activity Type]')
            getOptionLabelList('[Validity]')
            getleadCardRequirementInfo()
            getleadCardScoringInfo()
            
        })

        watchEffect(() => {
            getleadCardScoringInfo()
        })

        watchEffect(() => {
            getleadCardRequirementInfo()
        })





        return {
            ...leadCardHeaderInfo,leadCardRequirements,leadCardScoring,scoringCriteriaValueList,
            ...labelBag,
            displayValueTypeLabel,displayRequirementLevelLabel,displayValidityTypeLabel,
            leadSearchName,weighedPointTotal,
            criteriaValueDropdownIsActive,activeCriteriaValueDropdown,getCriteriaValueList,fillCriteriaValue,
            fillContactInfoField,fillContractInfoField,fillCustomerInfoField,fillItemCategoryInfoField,
            fillSalesModeInfoField,fillPaymentTermInfoField,fillPaymentMethodInfoField,fillVATGroupInfoField,
            submitForm,
            error_message,error_message_code,success_message,submitting_message,

        }

    },
    data(){
        return{
            //taille (hauteur) initiale des onglets de la page
            height:'700px',

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
        expand(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight='700px'
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
            // const children =  myElt.childNodes
            // children.forEach(element => {
            //     element.classList.remove('is-hover-orange')
            //     element.classList.add('has-background-light')
            // })
            //console.log(children)
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
            console.log(myElt.style.maxHeight)
            myElt.style.maxHeight="0px"
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
    }

}

</script>
<style scoped>
#general_content,#risk_content,#requirements_content,#scoring_content{
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