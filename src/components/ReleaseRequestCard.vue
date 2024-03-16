<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <release-card-Header soNo="000001" soDesc="client Gérald" pageTitle="Fiche demande déblocage" />
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <release-card-ribbon></release-card-ribbon>

<!---------Section formulaire fiche client----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche client----------------------->                         
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
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° client" valueInputText="soHeader['Code client']" ></input-text>
                                <input-text labelInputText="Nom du client" valueInputText="soHeader['Nom du client']" ></input-text>
                                <input-text labelInputText="Contact" valueInputText="soHeader['Contact client']" ></input-text>
                                <input-text labelInputText="Adresse" valueInputText="soHeader['Adresse du client']" ></input-text>
                                <input-text labelInputText="Ville" valueInputText="soHeader['Ville du client']" ></input-text>
                                <input-text labelInputText="Code postal" valueInputText="soHeader['Code postal client']" ></input-text>
                                <input-text labelInputText="Code pays/région" valueInputText="soHeader['Code région client']" ></input-text>
                                <input-text labelInputText="Code vendeur" valueInputText="soHeader['Code vendeur']" ></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date commande" valueInputText="new Date(soHeader['Date de commande']).toDateString()" ></input-text>
                                <input-text labelInputText="Date comptabilisation " valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()" ></input-text>
                                <input-text labelInputText="Date document" valueInputText="new Date(soHeader['Date document']).toDateString()" ></input-text>
                                <input-text labelInputText="Date d'échéance" valueInputText="new Date(soHeader[`Date d'échéance`]).toDateString()" ></input-text>
                                <input-text labelInputText="N° doc. externe" valueInputText="soHeader['N° doc. externe']" ></input-text>
                                <input-text labelInputText="N° devis" valueInputText="soHeader['N° devis']" ></input-text>
                                <input-text labelInputText="Utilisateur affecté" valueInputText="soHeader['Code utilisateur assigné']" ></input-text>
                                <input-text labelInputText="Statut" valueInputText="soHeader['Statut']" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section ongle 2 formulaire fiche client----------------------->                         
                    <div id="adresse">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('address_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                    <span>Adresse et contact</span>
                                </a>
                                <a @click="expand('address_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                    <span>Adresse et contact</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="address_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° client" valueInputText="soHeader['Code client']" ></input-text>
                                <input-text labelInputText="Nom du client" valueInputText="soHeader['Nom du client']" ></input-text>
                                <input-text labelInputText="Contact" valueInputText="soHeader['Contact client']" ></input-text>
                                <input-text labelInputText="Adresse" valueInputText="soHeader['Adresse du client']" ></input-text>
                                <input-text labelInputText="Ville" valueInputText="soHeader['Ville du client']" ></input-text>
                                <input-text labelInputText="Code postal" valueInputText="soHeader['Code postal client']" ></input-text>
                                <input-text labelInputText="Code pays/région" valueInputText="soHeader['Code région client']" ></input-text>
                                <input-text labelInputText="Code vendeur" valueInputText="soHeader['Code vendeur']" ></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date commande" valueInputText="new Date(soHeader['Date de commande']).toDateString()" ></input-text>
                                <input-text labelInputText="Date comptabilisation " valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()" ></input-text>
                                <input-text labelInputText="Date document" valueInputText="new Date(soHeader['Date document']).toDateString()" ></input-text>
                                <input-text labelInputText="Date d'échéance" valueInputText="new Date(soHeader[`Date d'échéance`]).toDateString()" ></input-text>
                                <input-text labelInputText="N° doc. externe" valueInputText="soHeader['N° doc. externe']" ></input-text>
                                <input-text labelInputText="N° devis" valueInputText="soHeader['N° devis']" ></input-text>
                                <input-text labelInputText="Utilisateur affecté" valueInputText="soHeader['Code utilisateur assigné']" ></input-text>
                                <input-text labelInputText="Statut" valueInputText="soHeader['Statut']" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section ongle 3 formulaire fiche client----------------------->                         
                    <div id="facturation">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('invoicing_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>Facturation</span>
                                </a>
                                <a @click="expand('invoicing_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                    <span>Facturation</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="invoicing_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° client" valueInputText="soHeader['Code client']" ></input-text>
                                <input-text labelInputText="Nom du client" valueInputText="soHeader['Nom du client']" ></input-text>
                                <input-text labelInputText="Contact" valueInputText="soHeader['Contact client']" ></input-text>
                                <input-text labelInputText="Adresse" valueInputText="soHeader['Adresse du client']" ></input-text>
                                <input-text labelInputText="Ville" valueInputText="soHeader['Ville du client']" ></input-text>
                                <input-text labelInputText="Code postal" valueInputText="soHeader['Code postal client']" ></input-text>
                                <input-text labelInputText="Code pays/région" valueInputText="soHeader['Code région client']" ></input-text>
                                <input-text labelInputText="Code vendeur" valueInputText="soHeader['Code vendeur']" ></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date commande" valueInputText="new Date(soHeader['Date de commande']).toDateString()" ></input-text>
                                <input-text labelInputText="Date comptabilisation " valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()" ></input-text>
                                <input-text labelInputText="Date document" valueInputText="new Date(soHeader['Date document']).toDateString()" ></input-text>
                                <input-text labelInputText="Date d'échéance" valueInputText="new Date(soHeader[`Date d'échéance`]).toDateString()" ></input-text>
                                <input-text labelInputText="N° doc. externe" valueInputText="soHeader['N° doc. externe']" ></input-text>
                                <input-text labelInputText="N° devis" valueInputText="soHeader['N° devis']" ></input-text>
                                <input-text labelInputText="Utilisateur affecté" valueInputText="soHeader['Code utilisateur assigné']" ></input-text>
                                <input-text labelInputText="Statut" valueInputText="soHeader['Statut']" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section ongle 4 formulaire fiche client----------------------->                         
                    <div id="paiement">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('cash_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                    <span>Paiements</span>
                                </a>
                                <a @click="expand('cash_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                    <span>Paiements</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="cash_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° client" valueInputText="soHeader['Code client']" ></input-text>
                                <input-text labelInputText="Nom du client" valueInputText="soHeader['Nom du client']" ></input-text>
                                <input-text labelInputText="Contact" valueInputText="soHeader['Contact client']" ></input-text>
                                <input-text labelInputText="Adresse" valueInputText="soHeader['Adresse du client']" ></input-text>
                                <input-text labelInputText="Ville" valueInputText="soHeader['Ville du client']" ></input-text>
                                <input-text labelInputText="Code postal" valueInputText="soHeader['Code postal client']" ></input-text>
                                <input-text labelInputText="Code pays/région" valueInputText="soHeader['Code région client']" ></input-text>
                                <input-text labelInputText="Code vendeur" valueInputText="soHeader['Code vendeur']" ></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date commande" valueInputText="new Date(soHeader['Date de commande']).toDateString()" ></input-text>
                                <input-text labelInputText="Date comptabilisation " valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()" ></input-text>
                                <input-text labelInputText="Date document" valueInputText="new Date(soHeader['Date document']).toDateString()" ></input-text>
                                <input-text labelInputText="Date d'échéance" valueInputText="new Date(soHeader[`Date d'échéance`]).toDateString()" ></input-text>
                                <input-text labelInputText="N° doc. externe" valueInputText="soHeader['N° doc. externe']" ></input-text>
                                <input-text labelInputText="N° devis" valueInputText="soHeader['N° devis']" ></input-text>
                                <input-text labelInputText="Utilisateur affecté" valueInputText="soHeader['Code utilisateur assigné']" ></input-text>
                                <input-text labelInputText="Statut" valueInputText="soHeader['Statut']" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section ongle 5 formulaire fiche client----------------------->                         
                    <div id="Livraison">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('delivery_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                    <span>Livraison</span>
                                </a>
                                <a @click="expand('delivery_content');onglet5_expanded=!onglet5_expanded" v-if="!onglet5_expanded">
                                    <span>Livraison</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="delivery_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° client" valueInputText="soHeader['Code client']" ></input-text>
                                <input-text labelInputText="Nom du client" valueInputText="soHeader['Nom du client']" ></input-text>
                                <input-text labelInputText="Contact" valueInputText="soHeader['Contact client']" ></input-text>
                                <input-text labelInputText="Adresse" valueInputText="soHeader['Adresse du client']" ></input-text>
                                <input-text labelInputText="Ville" valueInputText="soHeader['Ville du client']" ></input-text>
                                <input-text labelInputText="Code postal" valueInputText="soHeader['Code postal client']" ></input-text>
                                <input-text labelInputText="Code pays/région" valueInputText="soHeader['Code région client']" ></input-text>
                                <input-text labelInputText="Code vendeur" valueInputText="soHeader['Code vendeur']" ></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date commande" valueInputText="new Date(soHeader['Date de commande']).toDateString()" ></input-text>
                                <input-text labelInputText="Date comptabilisation " valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()" ></input-text>
                                <input-text labelInputText="Date document" valueInputText="new Date(soHeader['Date document']).toDateString()" ></input-text>
                                <input-text labelInputText="Date d'échéance" valueInputText="new Date(soHeader[`Date d'échéance`]).toDateString()" ></input-text>
                                <input-text labelInputText="N° doc. externe" valueInputText="soHeader['N° doc. externe']" ></input-text>
                                <input-text labelInputText="N° devis" valueInputText="soHeader['N° devis']" ></input-text>
                                <input-text labelInputText="Utilisateur affecté" valueInputText="soHeader['Code utilisateur assigné']" ></input-text>
                                <input-text labelInputText="Statut" valueInputText="soHeader['Statut']" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                </div>

<!---------composant info client----------------------->
                <customer-info id="customer-info"></customer-info>

            </div>
        </div>

    </div>    
</template>
<script>
import ReleaseCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ReleaseCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'

export default {
    name:'release-request-card',
    components:{
        ReleaseCardHeader,CustomerInfo,inputText,ReleaseCardRibbon
    },
    data(){
        return{

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,
        }
    },
    methods:{
        expand(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight='500px'
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
            console.log(myElt.style.maxHeight)
            myElt.style.maxHeight="0px"
        }
    }
}

</script>
<style scoped>
#general_content,#address_content,#invoicing_content,#cash_content,#delivery_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>