<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <credit-contract-Card-Header   :soNo="creditContractCardHeader['No_']" :soDesc="creditContractCardHeader['Customer Name']" pageTitle="Fiche contrat achat groupé" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban fiche activité recouvrement----------------------->      
            <credit-contract-card-ribbon
            routeForNewCard="../NewCreditContract"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @ontransmittingStatusCard="submitStatusUpdate(1)"
            @onValidatingCard="submitStatusUpdate(2)"
            @onValidatingWithCondCard="submitStatusUpdate(3)"
            @onRejectingCard="submitStatusUpdate(4)"
            @onExtendingOperationEndDate="extendOPEndDateConfirmationModalShowned=true"
            @onGettingCustomerHistory="showCustomerHistoryModal"

            componentWithCompInfo="creditContractCardRightInfoMaxWidth"
            :editCardBtnIsDisabled="docHasBeenValidated==true"
            :cancelEditCardBtnIsDisabled="false"
            :newCardBtnIsDisabled="false"
            :transmitBtnIsDisabled="transmitBtnIsDisabled || docHasBeenValidated==true"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"

            :rejectBtnIsDisabled="docCanBeValidatedOrRejected==false || docHasBeenValidated==true"
            :validateWithCondBtnIsDisabled="docCanBeValidatedOrRejected==false || docHasBeenValidated==true"
            :validateBtnIsDisabled="docCanBeValidatedOrRejected==false || docHasBeenValidated==true"
            :extendOperationEndDateBtnIsDisabled="docEndDateCanBeExtended==false"
            :customerHistoryBtnIsDisabled="creditContractCardHeader['Account Type']==0"
            ></credit-contract-card-ribbon>


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


<!---------Section formulaire fiche contrat AGP----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire fiche contrat achat groupé----------------------->                         
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
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditContractCardHeader['No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ creditContractCardHeader['Customer No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ creditContractCardHeader['Customer Name'] }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° contrat" :valueInputText="creditContractCardHeader['No_']" :is_disabled="true" ></input-text>
                                
                                <input-text labelInputText="Type de compte" :valueInputText="creditContractAccountTypeLabel" :is_disabled="true" ></input-text>

                                <input-text labelInputText="N° Client" :valueInputText="creditContractCardHeader['Customer No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="N° Client" v-model="creditContractCardHeader['Customer No_']"  @openModal="activeModalForSelectableElementList=creditContractCardHeader['Account Type']==0?'leadList':'customerList'" v-else></input-select>

                                <input-text labelInputText="Nom client" :valueInputText="creditContractCardHeader['Customer Name']" :is_disabled="true"></input-text> 

                                <input-date labelInputText="Date de début opération" v-model="OPStartingDate" :valueInputText="formatDate(creditContractCardHeader['OP Starting Date'])" :is_disabled="!readOnlyModeIsDisabled"></input-date>                               
                                
                                <input-number labelInputText="Durée de l'opération (mois)" v-model="creditContractCardHeader['OP Duration (Month)']" :valueInputText="creditContractCardHeader['OP Duration (Month)']" :is_disabled="!readOnlyModeIsDisabled"></input-number>
                                
                                <input-date labelInputText="Date de fin opération" :valueInputText="formatDate(creditContractCardHeader['OP Ending Date'])" :is_disabled="true"></input-date> 
    
                                <input-number labelInputText="Durée du crédit" v-model="creditContractCardHeader['Duration (Month)']" :valueInputText="creditContractCardHeader['Duration (Month)']" :is_disabled="!readOnlyModeIsDisabled"></input-number>
    
                                <input-text labelInputText="Type engagement" :valueInputText="creditContractCommitmentTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type engagement" v-model="creditContractCardHeader['Commitment Type']" :option-list="optionLabelListForCommitmentType" v-else></input-select-basic-1> 
    
                                
                            </div>
                            <div class="column">
                                <input-text labelInputText="Condition de paiement" :valueInputText="creditContractCardHeader['Payment Terms Code']" :is_disabled="true"></input-text>
                                <!--input-select labelInputText="Condition de paiement" v-model="creditContractCardHeader['Payment Terms Code']" @openModal="activeModalForSelectableElementList='paymentTermList'" v-else></input-select--->
                                
                                <input-date labelInputText="Date 1ère échéance" v-model="firstTermsDate" :valueInputText="formatDate(creditContractCardHeader['First Terms Date'])" :is_disabled="!readOnlyModeIsDisabled"></input-date> 
                                
                                <input-text labelInputText="Mode de règlement" :valueInputText="creditContractCardHeader['Payment Method Code']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Mode de règlement" v-model="creditContractCardHeader['Payment Method Code']" @openModal="activeModalForSelectableElementList='paymentMethodList'" v-else></input-select>
                                
                                <input-text labelInputText="Mode de calcul plafond" :valueInputText="creditContractCreditLimitModeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Mode de calcul plafond" v-model="creditContractCardHeader['Credit Limit Mode']" :option-list="optionLabelListForCreditLimitMode" v-else></input-select-basic-1> 
                                
                                <input-number labelInputText="Montant plafond standard" v-model="creditContractCardHeader['Standard Credit Limit']" :valueInputText="formatAmount(creditContractCardHeader['Standard Credit Limit'])" :is_disabled="!readOnlyModeIsDisabled || creditContractCardHeader['Credit Limit Mode']!==1"></input-number>
                                
                                <input-number labelInputText="% Quotité cessible" v-model="creditContractCardHeader['Transferable part _']" :valueInputText="formatAmount(creditContractCardHeader['Transferable part _'])" :is_disabled="!readOnlyModeIsDisabled"></input-number>
                                
                                <input-number labelInputText="% frais dossier" v-model="creditContractCardHeader['Application fees_']" :valueInputText="formatAmount(creditContractCardHeader['Application fees_'])" :is_disabled="!readOnlyModeIsDisabled"></input-number>
                                
                                <input-number labelInputText="Nombre de salariés"  :valueInputText="totalCreditContractBeneficiaries" :is_disabled="true"></input-number>

                                <input-text labelInputText="Statut" inputTextColor="has-text-primary" inputTextWeight="has-text-weight-bold" :valueInputText="creditContractApprovalStatusLabel" :is_disabled="true"></input-text>
                            
                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section onglet 2 formulaire fiche contrat achat groupé----------------------->  
                    <div id="salarié">
                        <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('beneficiaries_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Salariés</span>
                                    </a>
                                    <a @click="expand('beneficiaries_content');onglet2_expanded=!onglet2_expanded" v-else>
                                        <span>Salariés</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="beneficiaries_content" class="px-5 mt-5" style="max-height: 400px; overflow:scroll;" @scroll="(ev)=>loadMoreCreditContractBeneficiaries(ev)">
                                <table class="table  is-narrow  is-fullwidth tableFixHead">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° client</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom client</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Limite de crédit proposée</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Limite de crédit</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Encours</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Encours échue</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut actuel</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Pire Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="'onglet2-L'+index" v-for="(elt,index) of creditContractBeneficiaries" :key="'onglet2-L'+index" @mouseover="setLineShadow('onglet2-L'+index)" @mouseout="removeLineShadow('onglet2-L'+index)" >
                                            <td class="has-text-left has-background-light is-narrow">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Customer No_'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Customer Name'] }}</td>
                                            <td  class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Proposed Credit Limit']) }}</td>
                                            <td  class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Credit Limit (LCY)']) }}</td>
                                            <td  class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Balance Amount (LCY)']) }}</td>
                                            <td  class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Balance Due (LCY)']) }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Current Status'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Worst Status'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style="width:100%;" v-if="errorLoadingMoreCreditContractBeneficiaries">
                                <span class="subtitle is-6 has-text-danger py-5">  Une erreur lors du chargement des salariés est survenue!</span>
                            </div>
                            <div v-if="creditContractBeneficiaries.length==0 && onglet2_expanded">Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>
<!---------sous-Section onglet 3 formulaire fiche contrat achat groupé----------------------->  
                    <div id="historique1">
                        <div :class="{'has-background-light':onglet3_expanded}">
                            <div :class="{'columns':!onglet3_expanded,'p-3':onglet3_expanded,'has-border-bottom-grey':onglet3_expanded,'has-border-bottom':!onglet3_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('contract_history_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                        <span>Historique contrat</span>
                                    </a>
                                    <a @click="expand('contract_history_content');onglet3_expanded=!onglet3_expanded" v-else>
                                        <span>Historique contrat</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="contract_history_content" class="px-5 mt-5" style="max-height: 400px; overflow:scroll;" @scroll="(ev)=>loadMoreCreditContractHistory(ev)">
                                <table class="table  is-narrow  is-fullwidth tableFixHead">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° client</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom client</th>
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
                                        <tr :id="'onglet3-L'+index" v-for="(elt,index) of creditContractHistory" :key="'onglet3-L'+index" @mouseover="setLineShadow('onglet3-L'+index)" @mouseout="removeLineShadow('onglet3-L'+index)" >
                                            <td class="has-text-left has-background-light is-narrow">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Customer No_'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Customer Name'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Sales Mode'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Document No_'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDate(elt['Posting Date']) }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDate(elt['Due Date']) }}</td>
                                            <td  class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Amount (LCY)']) }}</td>
                                            <td  class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Payment (LCY)']) }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ formatDate(elt['Payment Date']) }}</td>
                                            <td  class="has-text-right has-background-light is-narrow"> {{ elt['Days late'] }}</td>
                                            <td  class="has-text-left has-background-light is-narrow"> {{ elt['Debt Status'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style="width:100%;" v-if="errorLoadingMoreCreditContractHistory">
                                <span class="subtitle is-6 has-text-danger py-5">  Une erreur lors du chargement de l'historique est survenue!</span>
                            </div>
                            <div v-if="creditContractHistory.length==0 && onglet3_expanded">Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>
<!---------sous-Section onglet 4 formulaire fiche contrat achat groupé----------------------->  
                    <div id="historique2" v-if="false">
                        <div :class="{'has-background-light':onglet4_expanded}">
                            <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet4_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('customer_history_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                        <span>Historique client</span>
                                    </a>
                                    <a @click="expand('customer_history_content');onglet4_expanded=!onglet4_expanded" v-else>
                                        <span>Historique client</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="customer_history_content" class="px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth tableFixHead">
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
                                        <tr :id="'onglet4-L'+index" v-for="(elt,index) of creditContractcustomerHistory" :key="'onglet4-L'+index" @mouseover="setLineShadow('onglet4-L'+index)" @mouseout="removeLineShadow('onglet4-L'+index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td  class="has-text-left has-background-light"> {{ elt['Sales Mode'] }}</td>
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
                            <div v-if="creditContractcustomerHistory.length==0 && onglet4_expanded">Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>

                </div>
<!---------composant info client----------------------->
                <customer-info class="customer-info" v-if="creditContractCardHeader['No_']" :documentNo="creditContractCardHeader['No_']" documentType="CreditContract" :customerNo="creditContractCardHeader['Customer No_']"></customer-info>

            </div>
        </div>
        

        <!----------------------------------------------------------->
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
            @onGettingLineFromSelectableLeadListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-lead-list>

        <modal-for-selectable-payment-method-list 
            v-if="activeModalForSelectableElementList=='paymentMethodList'" 
            :isActive="activeModalForSelectableElementList=='paymentMethodList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectablePaymentMethodListModal="(elt)=>fillPaymentMethodInfoField(elt)">
        </modal-for-selectable-payment-method-list>



<!-----------Historique client-------------------->
            <div :class="{'modal':true , 'is-active':true }" v-if="customerHistoyModalShowned">
                <div class="modal-background has-background-dark" style="opacity:0.4" @click="customerHistoyModalShowned=false"></div>
                <div class=" w-100 h-100 shadow" style="border-radius:0px">
                    <customer-history :customerNo="creditContractCardHeader['Customer No_']"></customer-history>
                </div>
                <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="customerHistoyModalShowned=false"></button>
            </div>


<!-----------modal de confirmation de prolongation de la date de fin opération------------------->
        <div :class="{'modal':true , 'is-active':true }" v-if="extendOPEndDateConfirmationModalShowned">
            <div class="modal-background has-background-dark" style="opacity:0.2" @click="extendOPEndDateConfirmationModalShowned=false"></div>
            <div class="modal-content has-background-white p-5 shadow" style="border: none;">
                <div class="columns mb-5">
                    <div class="column is-narrow">
                        <span class="icon is-large">
                        <i class="far fa-circle-question fa-2x"></i>
                        </span>
                    </div>
                    <div class="column has-text-left">
                        <span class="subtitle is-5 has-text-left">Veuillez indiquer la nouvelle date de fin de l'opération</span>
                    </div>
                </div>
                <div>
                    <input-date-simple v-model="OPEndDate"></input-date-simple>
                </div>
                <div class="buttons mt-5 is-right">
                    <button class="button shadow has-background-orange has-text-white" @click.prevent="extendOPEndDate">
                        Je confirme
                    </button>
                    <button class="button shadow" @click.prevent="extendOPEndDateConfirmationModalShowned=false">J'annule</button>
                </div>
            </div>
            <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent=" extendOPEndDateConfirmationModalShowned=false"></button>
        </div>



    </div>    

</template>
<script>
import CreditContractCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import CreditContractCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import inputDate from './input/input-date.vue'
import inputDateSimple from './input/input-date-simple.vue'
import inputNumber from './input/input-number.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectablePaymentMethodList from './ModalForSelectablePaymentMethodList.vue'
import ModalForSelectableLeadList from './ModalForSelectableLeadList.vue'

import axios from 'axios'
import { computed, onBeforeMount, onMounted,ref, watch } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRoute, useRouter} from 'vue-router'
import { useCreditContractGPInfoStore } from '@/Stores/CreditContractGPInfo'

import CustomerHistory from './CustomerHistory.vue'


export default {
    name:'credit-contract-card',
    components:{
        CreditContractCardHeader,CustomerInfo,
        inputText,
        CreditContractCardRibbon,inputSelect,inputSelectBasic1,
        inputDate,inputDateSimple,inputNumber,
        ModalForSelectablePaymentMethodList,ModalForSelectableLeadList,ModalForSelectableCustomerList,
        CustomerHistory,
    },
    setup(){
        const hostname = window.location.hostname
        const readOnlyModeIsDisabled = ref(false)
        const CreditContractNo = useRoute().query.contractNo
        const creditContractCardHeader = ref({})
        const creditContractBeneficiaries = ref([])
        const totalCreditContractBeneficiaries = ref(0)
        const creditContractcustomerHistory = ref([])
        const creditContractHistory = ref([])
        const router = useRouter()

        const customerHistoyModalShowned = ref(false)

        
        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')
        const success_transmission=ref('')
        const transmitBtnIsDisabled = ref(false)

        //fonctions pour définir la fiche sur lecture et/modification
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }
        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        //check if the document has been validated
        const docHasBeenValidated = computed(() => {
            if (creditContractCardHeader.value['Approval Status'] == 7 
                || creditContractCardHeader.value['Approval Status'] == 8 
                || creditContractCardHeader.value['Approval Status'] == 10){
                    return true
            }else return false
        })

        //check if the document can be validated
        const docCanBeValidatedOrRejected = computed(() => {
            if(creditContractCardHeader.value['Approval Status'] >=6){
                return true
            }else return false
        })

        //check if the document end op date can be extended
        const docEndDateCanBeExtended = computed(() => {
            if(creditContractCardHeader.value['Approval Status'] == 7 
                || creditContractCardHeader.value['Approval Status'] == 8)
            {
                return true
            }else return false
        })

        //sac des labels de la fiche
        const labelBag = {
            creditContractAccountTypeLabel:ref(''),
            creditContractApprovalStatusLabel:ref(''),
            creditContractCommitmentTypeLabel:ref(''),
            creditContractCreditLimitModeLabel:ref(''),
            optionLabelListForCommitmentType: ref([]),
            optionLabelListForCreditLimitMode: ref([])
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

        //fonction pour récupérer une liste de label pour les champs à sélection
        function getOptionLabelList(field){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Commitment Type]')
                    labelBag.optionLabelListForCommitmentType.value=result.data.recordset    
                if (field=='[Credit Limit Mode]')
                    labelBag.optionLabelListForCreditLimitMode.value=result.data.recordset    
            }).catch(err=>console.log(err))
        }

        const dateInfo = {
            OPStartingDate: ref(''),
            firstTermsDate:ref(''),
        }

        

//fonctions pour prolonger la date de fin d'opération
        const OPEndDate=ref('')
        const extendOPEndDateConfirmationModalShowned=ref(false)
        function extendOPEndDate(){
            const d1 = new Date(creditContractCardHeader.value['OP Starting Date'])
            const d2 = new Date(OPEndDate.value)

            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            creditContractCardHeader.value['OP Duration (Month)'] = months <= 0 ? 0 : months
            creditContractCardHeader.value['OP Ending Date'] = OPEndDate.value
            extendOPEndDateConfirmationModalShowned.value = true
            submitForm()
        }


       
//fonction de récupération des données de la fiche prospect
        function getCreditContractCardInfo(){
            axios.get(`http://${hostname}:5000/app/getCreditContractCard?contractNo=${CreditContractNo}`)
            .then(result => {
                creditContractCardHeader.value = result.data[0]
                getcreditContractHistory(creditContractCardHeader.value['No_'])
                getCreditContractBeneficiaries(creditContractCardHeader.value['No_'])
                getTotalCreditContractBeneficiaries(creditContractCardHeader.value['No_'])
                //getcreditContractcustomerHistoryInfo(creditContractCardHeader.value["Customer No_"])
                
                dateInfo.OPStartingDate.value = getISODate(creditContractCardHeader.value["OP Starting Date"])
                dateInfo.firstTermsDate.value = getISODate(creditContractCardHeader.value["First Terms Date"])
                
                getSingleOptionLabel('Account Type','creditContractAccountTypeLabel',creditContractCardHeader.value["Account Type"])
                getSingleOptionLabel('Approval Status','creditContractApprovalStatusLabel',creditContractCardHeader.value["Approval Status"])
                getSingleOptionLabel('Commitment Type','creditContractCommitmentTypeLabel',creditContractCardHeader.value["Commitment Type"])
                getSingleOptionLabel('Credit Limit Mode','creditContractCreditLimitModeLabel',creditContractCardHeader.value["Credit Limit Mode"])

                creditContractCardHeader.value['Standard Credit Limit'] = Math.round(creditContractCardHeader.value['Standard Credit Limit'])

                if(docHasBeenValidated.value && readOnlyModeIsDisabled.value)
                    readOnlyModeIsDisabled.value = false
            }).catch(err=>console.log(err))
        }


        function getcreditContractHistory(ContractNo){
            axios.get(`http://${hostname}:5000/app/getContractHistory?ContractNo=${ContractNo}&listLength=0`)
            .then(result =>{
                creditContractHistory.value=result.data
            }).catch((err) => {console.log(err)})
        }
        const errorLoadingMoreCreditContractHistory = ref(false)
        function getMoreCreditContractHistory(){
            axios.get(`http://${hostname}:5000/app/getContractHistory?ContractNo=${creditContractCardHeader.value['No_']}&listLength=${creditContractHistory.value.length}`)
            .then(result =>{
                creditContractHistory.value.push(...result.data)
            }).catch(() => {
                errorLoadingMoreCreditContractHistory.value = true
            })
        }
        const loadMoreCreditContractHistory = debounce((ev)=>{
            let div = document.getElementById('contract_history_content')
            if(div.offsetHeight + ev.target.scrollTop >= div.scrollHeight - 200)
                getMoreCreditContractHistory()

        },250)



        function getCreditContractBeneficiaries(ContractNo){
            axios.get(`http://${hostname}:5000/app/getContractBeneficiary?ContractNo=${ContractNo}&listLength=0`)
            .then(result =>{
                creditContractBeneficiaries.value=result.data
            }).catch((err) => {console.log(err)})
        }
        function getTotalCreditContractBeneficiaries(ContractNo){
            axios.get(`http://${hostname}:5000/app/getNbrOfContractBeneficiary?ContractNo=${ContractNo}`)
            .then(result =>{
                totalCreditContractBeneficiaries.value=result.data[0]['']
            }).catch((err) => {console.log(err)})
        }
        const errorLoadingMoreCreditContractBeneficiaries = ref(false)
        function getMoreCreditContractBeneficiaries(){
            axios.get(`http://${hostname}:5000/app/getContractBeneficiary?ContractNo=${creditContractCardHeader.value['No_']}&listLength=${creditContractBeneficiaries.value.length}`)
            .then(result =>{
                creditContractBeneficiaries.value.push(...result.data)
            }).catch(() => {
                errorLoadingMoreCreditContractBeneficiaries.value = true
            })
        }
        const loadMoreCreditContractBeneficiaries = debounce((ev)=>{
            let div = document.getElementById('beneficiaries_content')
            if(div.offsetHeight + ev.target.scrollTop >= div.scrollHeight - 200)
                getMoreCreditContractBeneficiaries()

        },250)


        function getcreditContractcustomerHistoryInfo(customer){
            axios.get(`http://${hostname}:5000/app/getCustomerHistory?customerNo=${customer}`)
            .then(result =>{
                creditContractcustomerHistory.value=result.data
            }).catch((err) => {console.log(err)})
        }

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            }
        }

        //fonction pour convertir une date en format ISO
        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }

//fonction pour remplir les champs avec des listes sélectionnables
        function fillCustomerInfoField(customer){
            creditContractCardHeader.value["Customer No_"]=customer["No_"]
            creditContractCardHeader.value["Customer Name"]=customer["Name"]
        }
        function fillPaymentMethodInfoField(paymentMethod){
            creditContractCardHeader.value["Payment Method Code"]=paymentMethod["Code"]
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
            return {data:JSONDataToSend}
        }

        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
            }else{
                return 0
            }
        }

        //fonction qui envoie les données à l'API et réceptionne et affiche le nouveau statut du prospect
        function updateCreditContractStatus(id){
            if(id==1){
                axios.get(`http://${hostname}:5000/app/getCreditContractNewStatus?creditContractNo=${CreditContractNo}&creditContractStatus=${creditContractCardHeader.value['Approval Status']}&languageId=${useWebUserInfoStore().defaultLanguage}`)
                .then(res => {
                    submitting_message.value=''
                    if(res.data[0].Value <= 0){
                        error_message.value=res.data[0].Label
                        error_message_code.value=res.data[0].Value
                    }else{
                        creditContractCardHeader.value['Approval Status']= res.data[0].Value
                        labelBag.creditContractApprovalStatusLabel.value = res.data[0].Label
                        success_transmission.value= 'Nouveau statut: '+res.data[0].Label +', veuillez svp enregistrer la page'
                        setTimeout(()=>success_transmission.value='',3000)
                    }
                })
                .catch((err) => {
                    displayErrorMessage(err)
                })
            }
            if(id==2){
                creditContractCardHeader.value['Approval Status']= 8
                labelBag.creditContractApprovalStatusLabel.value = "Validé"
                submitting_message.value=''
                success_transmission.value= 'Nouveau statut: Validé, veuillez svp enregistrer la page'
                setTimeout(()=>success_transmission.value='',3000)
            }
            if(id==3){
                creditContractCardHeader.value['Approval Status']= 7
                labelBag.creditContractApprovalStatusLabel.value = "Validé sous conditions"
                submitting_message.value=''
                success_transmission.value= 'Nouveau statut: Validé sous conditions, veuillez svp enregistrer la page'
                setTimeout(()=>success_transmission.value='',3000)
            }
            if(id==4){
                creditContractCardHeader.value['Approval Status']= 10
                labelBag.creditContractApprovalStatusLabel.value = "Rejeté"
                submitting_message.value=''
                success_transmission.value= 'Nouveau statut: Rejeté, veuillez svp enregistrer la page'
                setTimeout(()=>success_transmission.value='',3000)
            }
        }

        //fonction pour soumettre la modifiaction du statut de la fiche
        function submitStatusUpdate(id){
            submitting_message.value='Transmission en cours'
            updateCreditContractStatus(id)
        }


        //fonction qui envoie les données aux service de bc et réceptionne et affiche la réponse ou l'erreur
        function updateCreditContractCard(formattedCreditContractData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedCreditContractData)
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

//Fonction de controle avant soumission
        function checkStandardCreditLimit(){
            if(creditContractCardHeader.value['Credit Limit Mode']!==1 && creditContractCardHeader.value['Standard Credit Limit']>0)
                creditContractCardHeader.value['Standard Credit Limit'] = 0
        }        
        
        
        //fonction pour soumettre la modifiaction de la fiche
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            checkStandardCreditLimit()
            const JSData = {
                Parameter:'creditContracts_modify',
                webUserName:useWebUserInfoStore().name,
                'No_':creditContractCardHeader.value['No_'],
                'Account Type':creditContractCardHeader.value['Account Type'],
                'Customer No_':creditContractCardHeader.value['Customer No_'],
                'Customer Name':creditContractCardHeader.value['Customer Name'],
                'OP Starting Date':dateInfo.OPStartingDate.value,
                'OP Duration (Month)':creditContractCardHeader.value['OP Duration (Month)'],
                'OP Ending Date':creditContractCardHeader.value['OP Ending Date'],
                'Duration (Month)':creditContractCardHeader.value['Duration (Month)'],
                'Commitment Type':creditContractCardHeader.value['Commitment Type'],
                'Payment Terms Code':creditContractCardHeader.value['Payment Terms Code'],
                'First Terms Date':dateInfo.firstTermsDate.value, 
                'Payment Method Code':creditContractCardHeader.value['Payment Method Code'],
                'Approval Status':creditContractCardHeader.value['Approval Status'],
                'Credit Limit Mode':creditContractCardHeader.value['Credit Limit Mode'],
                'Standard Credit Limit':creditContractCardHeader.value['Standard Credit Limit'],
                'Transferable part _':creditContractCardHeader.value['Transferable part _'],
                'Application fees_':creditContractCardHeader.value['Application fees_']


            }
            updateCreditContractCard(formatToBCJsonData(JSData))
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

            getCreditContractCardInfo()
            getOptionLabelList('[Commitment Type]')
            getOptionLabelList('[Credit Limit Mode]')

            if(!useCreditContractGPInfoStore().isFilled){
                axios.get(`http://${hostname}:5000/app/getCreditContractGP`)
                .then(result =>{
                    useCreditContractGPInfoStore().fillCreditContractGPInfo(result.data)
                    console.log(result.data)
                })
                .catch((err)=>console.log(err))
            }
        })

        // watchEffect(() => {
        //     if(dateInfo.OPStartingDate ){
        //         let OPEndingDate = new Date(dateInfo.OPStartingDate.value)
        //         OPEndingDate.setDate(OPEndingDate.getDate()+ (creditContractCardHeader.value['OP Duration (Month)'] * 30 ))
        //         creditContractCardHeader.value['OP Ending Date'] = OPEndingDate
        //     }
        // })

        watch(success_message, () => {
            if(success_message.value){
                readOnlyModeIsDisabled.value=false
                getCreditContractCardInfo()
                transmitBtnIsDisabled.value=false
            }
        })
        watch(success_transmission, () => {
            if(success_transmission.value){
                readOnlyModeIsDisabled.value=true
                transmitBtnIsDisabled.value=true
            }
        })
        watch(extendOPEndDateConfirmationModalShowned, () => {
            if(extendOPEndDateConfirmationModalShowned.value){
                OPEndDate.value = getISODate(creditContractCardHeader.value['OP Ending Date'])
            }
        })



        // expose to template and other options API hooks
        return {
            setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,readOnlyModeIsDisabled,
            submitForm,submitStatusUpdate,
            transmitBtnIsDisabled,
            fillPaymentMethodInfoField,fillCustomerInfoField,
            creditContractCardHeader,
            submitting_message,error_message,error_message_code,success_message,success_transmission,
            creditContractBeneficiaries,
            creditContractcustomerHistory,
            creditContractHistory,
            ...labelBag,
            ...dateInfo,
            getISODate,
            getcreditContractcustomerHistoryInfo,
            docHasBeenValidated,docCanBeValidatedOrRejected,docEndDateCanBeExtended,
            extendOPEndDateConfirmationModalShowned,extendOPEndDate,OPEndDate,
            formatAmount,
            loadMoreCreditContractBeneficiaries,totalCreditContractBeneficiaries,errorLoadingMoreCreditContractBeneficiaries,
            loadMoreCreditContractHistory,errorLoadingMoreCreditContractHistory,
            customerHistoyModalShowned,
            
        }
    },
    data(){
        return{
            //indique la route active
            CreditCardContractNo:this.$route.query.contractNo,
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded: true,
            onglet3_expanded: true,
            onglet4_expanded: true,

            
            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('sales')
            useNavigationTabStore().setActiveTab('creditContracts')
            this.$router.push('/')
        },
        showCustomerHistoryModal(){
            this.customerHistoyModalShowned = true
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('creditContractCardRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('creditContractCardRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        formatDate(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')) return ''
                else return new Date(date).toLocaleDateString()
            }else{
                return ''
            }
        },
        expand(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight='500px'
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
            console.log(myElt.style.maxHeight)
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
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#beneficiaries_content,
#contract_history_content,#customer_history_content{
    max-height: 3000px;
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
    z-index: 3000;
}

</style>