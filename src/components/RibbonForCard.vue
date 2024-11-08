<template>
    <div class="columns" style="border-bottom:1px solid rgba(0, 0, 0, 0.284) ;border-top:1px solid rgba(0, 0, 0, 0.284) ;">
     <div class="column  has-text-left px-0" >
        <div class="columns is-multiline is-mobile is-gapless">
            
            <div class="column is-narrow" v-if="newCardBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="this.$router.push(routeForNewCard)">
                    <span class="icon">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span class="subtitle is-6">Nouveau</span>
                </a>
            </div>

            <div class="column is-narrow" v-if="readOnlyModeIsDisabled==true">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onSubmittingForm')">
                    <span class="icon">
                        <i class="fas fa-save"></i>
                    </span>
                    <span class="subtitle is-6">Enregistrer</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="editCardBtnIsDisabled==false && readOnlyModeIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onDisablingReadOnlyMode')">
                    <span class="icon">
                        <i class="fas fa-edit"></i>
                    </span>
                    <span class="subtitle is-6">Modifier</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="cancelEditCardBtnIsDisabled==false && readOnlyModeIsDisabled==true">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCancellingUpdate')">
                    <span class="icon">
                        <i class="fas fa-rotate-left"></i>
                    </span>
                    <span class="subtitle is-6">Annuler modification</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="requestForApprovalBtnIsDisabled==false && documentStatus==0 && readOnlyModeIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onRequestingForApproval')">
                    <span class="icon">
                        <i class="fas fa-thumbs-up"></i>
                    </span>
                    <span class="subtitle is-6">Demander approbation</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="reopenBtnIsDisabled==false && documentStatus==1">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onReopeningDocument')">
                    <span class="icon">
                        <i class="fas fa-lock-open"></i>
                    </span>
                    <span class="subtitle is-6">Rouvrir</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="printCardBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onPrintingCard')">
                    <span class="icon">
                        <i class="fas fa-print"></i>
                    </span>
                    <span class="subtitle is-6">Imprimer</span>
                </a>
            </div>
            <div class="column  is-narrow" v-if="printProformaBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onPrintingProforma')">
                    <span class="icon">
                        <i class="fas fa-print"></i>
                    </span>
                    <span class="subtitle is-6">Proforma</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="processCardBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onProcessingCard')">
                    <span class="icon">
                        <i class="fas fa-thumbs-up"></i>
                    </span>
                    <span class="subtitle is-6">Traiter</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="transmitBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('ontransmittingStatusCard')">
                    <span class="icon">
                        <i class="fas fa-thumbs-up"></i>
                    </span>
                    <span class="subtitle is-6">Transmettre</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="convertQuoteBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onConvertingSaleQuote')">
                    <span class="icon">
                        <i class="fas fa-check"></i>
                    </span>
                    <span class="subtitle is-6">Convertir</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="convertLeadBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onConvertingLead')">
                    <span class="icon">
                        <i class="fas fa-check"></i>
                    </span>
                    <span class="subtitle is-6">Convertir</span>
                </a>
            </div>

            <!------div class="column is-narrow" v-if="newContactBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCreatingCustomerContactCard')">
                    <span class="icon">
                        <i class="fas fa-address-book"></i>
                    </span>
                    <span class="subtitle is-6">Créer contact</span>
                </a>
            </div>

            <div class="column is-narrow" v-if="newLeadBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCreatingCustomerContactCard')">
                    <span class="icon">
                        <i class="fas fa-address-book"></i>
                    </span>
                    <span class="subtitle is-6">Créer prospect</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="newShipToAddressBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCreatingCustomerAddressCard')">
                    <span class="icon">
                        <i class="fas fa-location-dot"></i>
                    </span>
                    <span class="subtitle is-6">Créer adresse de livraison</span>
                </a>
            </div----->

            <div class="column is-narrow" v-if="contactListBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onGettingContactList')">
                    <span class="icon">
                        <i class="fas fa-address-book"></i>
                    </span>
                    <span class="subtitle is-6">Contacts</span>
                </a>
            </div>

            <div class="column is-narrow" v-if="shipToAddressListBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onGettingShipToAddressList')">
                    <span class="icon">
                        <i class="fas fa-address-book"></i>
                    </span>
                    <span class="subtitle is-6">Adresses de livraison</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="checkItemAvailabilityBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCheckingItemAvailability')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Disponibilité article</span>
                </a>
            </div>



            <!---div class="column  is-narrow" v-if="transmitBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCheckingItemAvailability')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Transmettre</span>
                </a>
            </div---->

            <div class="column  is-narrow" v-if="refreshBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCheckingItemAvailability')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Actualiser</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="calculateDurationBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCalculatingDuration')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Calculer Durée AGDP</span>
                </a>
            </div>

            <!----div class="column  is-narrow" v-if="printVisitCardBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onPrintingVisitCard')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Imprimer fiche de visite</span>
                </a>
            </div>
            <div class="column  is-narrow" v-if="printComityCardBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onPrintingComityCard')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Imprimer fiche comité</span>
                </a>
            </div>
            <div class="column  is-narrow" v-if="saleContractBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onPrintingSaleContract')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Imprimer contrat vente credit</span>
                </a>
            </div>
            <div class="column  is-narrow" v-if="nantContractBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onPrintingNantContract')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Imprimer Contrat NAN</span>
                </a>
            </div---->
            <div class="column  is-narrow" v-if="simulateCreditBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onSimulatingCredit')">
                    <span class="icon">
                        <i class="fas fa-calculator"></i>
                    </span>
                    <span class="subtitle is-6">Simuler crédit</span>
                </a>
            </div>


            <div class="column  is-narrow" v-if="validateBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onValidatingCard')">
                    <span class="icon">
                        <i class="fas fa-check"></i>
                    </span>
                    <span class="subtitle is-6">Valider</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="validateWithCondBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onValidatingWithCondCard')">
                    <span class="icon">
                        <i class="fas fa-check"></i>
                    </span>
                    <span class="subtitle is-6">Valider sous conditions</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="rejectBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onRejectingCard')">
                    <span class="icon">
                        <i class="fas fa-xmark"></i>
                    </span>
                    <span class="subtitle is-6">Rejeter</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="calculateCreditLimitBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('oncalculatingCreditLimit')">
                    <span class="icon">
                        <i class="fas fa-calculator"></i>
                    </span>
                    <span class="subtitle is-6">Calculer plafond</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="closeBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCheckingItemAvailability')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Clôturer</span>
                </a>
            </div>
            <div class="column  is-narrow" v-if="archiveBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCheckingItemAvailability')">
                    <span class="icon">
                        <i class="fas fa-question"></i>
                    </span>
                    <span class="subtitle is-6">Archiver</span>
                </a>
            </div>
            <div class="column  is-narrow" v-if="extendOperationEndDateBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onExtendingOperationEndDate')">
                    <span class="icon">
                        <i class="fas fa-calendar-days"></i>
                    </span>
                    <span class="subtitle is-6">Prolonger date fin opération</span>
                </a>
            </div>










            <div class="column  is-narrow" v-if="revisionRequestBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onGettingRevisionRequestList')">
                    <span class="icon">
                        <i class="fas fa-edit"></i>
                    </span>
                    <span class="subtitle is-6">Demandes révisions</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="createRevisionRequestBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onCreatingRevisionRequest')">
                    <span class="icon">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span class="subtitle is-6">Demande révision</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="unlockingRequestBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onSubmittingSOUnlockingRequest')">
                    <span class="icon">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span class="subtitle is-6">Demande déblocage</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="paymentRequestBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onGettingPaymentRequestList')">
                    <span class="icon">
                        <i class="fas fa-check"></i>
                    </span>
                    <span class="subtitle is-6">Demandes validation paiement</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="assignedDebtBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onGettingAssignedDebtList')">
                    <span class="icon">
                        <i class="fas fa-coins"></i>
                    </span>
                    <span class="subtitle is-6">Créances</span>
                </a>
            </div>

            <div class="column  is-narrow" v-if="discountRequestBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onSubmittingDiscountRequest')">
                    <span class="icon">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span class="subtitle is-6">Demande remise</span>
                </a>
            </div>

            
    
            <!--------------------div class="column is-narrow">
                <a href="#" class="px-3 py-3">
                    <span class="icon">
                        <i class="far fa-eye"></i>
                    </span>
                    <span class="subtitle is-6">Afficher</span>
                </a>
            </div----------------------->

            <!------------------------------------------div class="column is-narrow">
                <a href="#" class="px-3 py-3">
                    <span class="icon">
                        <i class="far fa-address-book"></i>
                    </span>
                    <span class="subtitle is-6">Contact</span>
                </a>
            </div------------------------------------------------------->

            <div class="column is-narrow" v-if="printCRCardBtnIsDisabled==false" >
                <div :class="{'dropdown':true,'is-active':expandedOrCollapsedBtnRef=='actionBtn'}" style="border-radius: 0">
                    <div class="dropdown-trigger">
                        <a href="#" class="px-3 py-3"  aria-haspopup="true" aria-controls="dropdown-menu" @click="expand_collapse_ReportBtn('actionBtn')">
                        <span class="subtitle is-6">Imprimer</span>
                        <span class="icon" >
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </a>
                    </div>
                    <div class="dropdown-menu mt-2 shadow" id="dropdown-menu" role="menu" style="padding: 0;border: 0;">
                        <div class="dropdown-content"  style="padding: 0;">
                            <a href="#" class="dropdown-item" v-if="printVisitCardBtnIsDisabled==false" @click.prevent="()=>{$emit('onPrintingVisitCard');expandedOrCollapsedBtnRef=''}">
                                <span class="icon">
                                    <i class="fas fa-print"></i>
                                </span>
                                <span class="subtitle is-6">Imprimer fiche de visite</span>
                            </a>
                            <a href="#" class="dropdown-item" v-if="printComityCardBtnIsDisabled==false" @click.prevent="()=>{$emit('onPrintingComityCard');expandedOrCollapsedBtnRef=''}">
                                <span class="icon">
                                    <i class="fas fa-print"></i>
                                </span>
                                <span class="subtitle is-6">Imprimer fiche comité</span>                        
                            </a>
                            <a href="#" class="dropdown-item" v-if="saleContractBtnIsDisabled==false" @click.prevent="()=>{$emit('onPrintingSaleContract');expandedOrCollapsedBtnRef=''}">
                                <span class="icon">
                                    <i class="fas fa-print"></i>
                                </span>
                                <span class="subtitle is-6">Imprimer contrat vente credit</span>
                            </a>
                            <a href="#" class="dropdown-item" v-if="nantContractBtnIsDisabled==false" @click.prevent="()=>{$emit('onPrintingNantContract');expandedOrCollapsedBtnRef=''}">
                                <span class="icon">
                                    <i class="fas fa-print"></i>
                                </span>
                                <span class="subtitle is-6">Imprimer Contrat NAN</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column  is-narrow" v-if="customerHistoryBtnIsDisabled==false">
                <a href="#" class="px-3 py-3" @click.prevent="$emit('onGettingCustomerHistory')">
                    <span class="icon">
                        <i class="fas fa-clock-rotate-left"></i>
                    </span>
                    <span class="subtitle is-6">Historique client</span>
                </a>
            </div>

            <!-------------------------div class="column is-narrow">
                <div :class="{'dropdown':true, 'is-active':expandedOrCollapsedBtn=='navigateBtn'}" style="border-radius: 0">
                    <div class="dropdown-trigger">
                        <a href="#" class="px-3 py-3"  aria-haspopup="true" aria-controls="dropdown-menu1" @click="expand_collapse_ReportBtn('navigateBtn')">
                        <span class="subtitle is-6">Naviguer</span>
                        <span class="icon" style="padding:;">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </a>
                    </div>
                    <div class="dropdown-menu mt-2 shadow" id="dropdown-menu1" role="menu" style="padding: 0;border: 0;">
                        <div class="dropdown-content"  style="padding: 0;">
                        <a href="#" class="dropdown-item">
                            Dropdown item
                        </a>
                        <a href="#" class="dropdown-item ">
                            Active dropdown item
                        </a>
                        </div>
                    </div>
                </div>
            </div-------------------------->

            <!-----------------------div class="column is-narrow">
                <div :class="{'dropdown':true, 'is-right':true,  'is-active':expandedOrCollapsedBtn=='reportBtn'}" style="border-radius: 0">
                    <div class="dropdown-trigger">
                        <a href="#" class="px-3 py-3"  aria-haspopup="true" aria-controls="dropdown-menu2" @click="expand_collapse_ReportBtn('reportBtn')">
                        <span class="subtitle is-6">Etat</span>
                        <span class="icon" >
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </a>
                    </div>
                    <div class="dropdown-menu mt-2 shadow" id="dropdown-menu2" role="menu" style="padding: 0;border: 0;">
                        <div class="dropdown-content" style="padding: 0;">
                        <a href="#" class="dropdown-item">
                            Dropdown item
                        </a>
                        <a href="#" class="dropdown-item">
                            Active dropdown item
                        </a>
                        </div>
                    </div>
                </div>
            </div---------------------->
    
        </div>
    


     </div>



     <div class="column is-2 has-text-right">
         <a href="#" class="mx-2">
             <span class="icon">
                 <i class="fas fa-share"></i>
             </span>
         </a>
         <a href="#" class="mx-2">
             <span class="icon">
                 <i class="fas fa-trash"></i>
             </span>
         </a>
         <a href="#" class="mx-2" @click.prevent="$emit('onHidingOrShowingComponentInfo')">
             <span class="icon">
                 <i :class="{'fas':true, 'fa-info-circle':componentInfoIsExpanded==true,'fa-info':componentInfoIsExpanded==false}"></i>
             </span>
         </a>

     </div>
 </div>
</template>
<script>
import { useNavigationTabStore } from '@/Stores/NavigationTab'

export default {
name:'customer-card-ribbon',
components:{
},
props:['routeForNewCard','expandedOrCollapsedBtn',
'componentWithCompInfo',
'newCardBtnIsDisabled',
'editCardBtnIsDisabled',
'printCardBtnIsDisabled',
'printCRCardBtnIsDisabled',
'convertQuoteBtnIsDisabled',
'convertLeadBtnIsDisabled',
'processCardBtnIsDisabled',
'readOnlyModeIsDisabled',
'requestForApprovalBtnIsDisabled',
'reopenBtnIsDisabled',
'documentStatus',
'checkItemAvailabilityBtnIsDisabled',
'newShipToAddressBtnIsDisabled',
'newContactBtnIsDisabled',
'newLeadBtnIsDisabled',
'cancelEditCardBtnIsDisabled',

'extendOperationEndDateBtnIsDisabled',
'archiveBtnIsDisabled',
'closeBtnIsDisabled',
'refreshBtnIsDisabled',
'transmitBtnIsDisabled',
'simulateCreditBtnIsDisabled',
'printComityCardBtnIsDisabled',
'printVisitCardBtnIsDisabled',
'saleContractBtnIsDisabled',
'nantContractBtnIsDisabled',
'printProformaBtnIsDisabled',


'calculateCreditLimitBtnIsDisabled',
'rejectBtnIsDisabled',
'validateWithCondBtnIsDisabled',
'validateBtnIsDisabled',

'revisionRequestBtnIsDisabled',
'createRevisionRequestBtnIsDisabled',
'unlockingRequestBtnIsDisabled',
'discountRequestBtnIsDisabled',
'paymentRequestBtnIsDisabled',

'assignedDebtBtnIsDisabled',

'contactListBtnIsDisabled',
'shipToAddressListBtnIsDisabled',

'calculateDurationBtnIsDisabled',
'customerHistoryBtnIsDisabled',
]
,
data(){
    return {
        //permet de manipuler l'affichage des boutons dropdown
        expandedOrCollapsedBtnRef:this.expandedOrCollapsedBtn,

    }
},
watch:{
    expandedOrCollapsedBtn(){
        this.expandedOrCollapsedBtnRef = ''
    }
},
computed:{
    /////////////////////////propriété calculé pour changer l'icone info s'il est cliqué dessus
    componentInfoIsExpanded(){
        if (useNavigationTabStore().tabRightInfo)
            return useNavigationTabStore().tabRightInfo[this.componentWithCompInfo]=='0px'?false:true
        else return false
    }
},
methods:{
    expand_collapse_ReportBtn(currentBtn){
        if (this.expandedOrCollapsedBtnRef ==currentBtn) this.expandedOrCollapsedBtnRef= ''
        else this.expandedOrCollapsedBtnRef= currentBtn
    }

}

}
</script>
<style scoped>
a:hover, th:hover {
background-color: rgba(255, 68, 0, 0.068);
}
span i{
color: orange;
}
.dropdown-content a:hover{
background-color: rgba(255, 68, 0, 0.068)
}

.has-border-bottom-orange{
border-bottom:3px solid orange;
}

.has-background-orange{
background-color: orangered;
}


</style>