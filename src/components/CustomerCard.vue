<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="customerCardId" :soDesc="CustomerCard.Name" pageTitle="Fiche client" />
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <Customer-card-ribbon></Customer-card-ribbon>

<!---------Section formulaire fiche client----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche client----------------------->                         
                    <div id="general">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('general_content');onglet1_expanded=!onglet1_expanded" v-if="!onglet1_expanded">
                                    <span>Général</span>
                                </a>
                                <a @click="expand('general_content');onglet1_expanded=!onglet1_expanded" v-if="onglet1_expanded">
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
                                <input-text labelInputText="N°" :valueInputText="CustomerCard['No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Nom" :valueInputText="CustomerCard['Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Solde DS" :valueInputText="CustomerCard['Balance Amount']" :is_disabled="readOnlyMode"></input-text>  
                            </div>
                            <div class="column">
                                <input-text labelInputText="Solde dû DS" :valueInputText="CustomerCard['Amount Due']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code vendeur" :valueInputText="CustomerCard['Salesperson Code']" :is_disabled="readOnlyMode"></input-text>

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
                                <input-text labelInputText="Adresse" :valueInputText="CustomerCard['Address']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Adresse (2ième ligne)" :valueInputText="CustomerCard['Address 2']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Ville" :valueInputText="CustomerCard['City']" :is_disabled="readOnlyMode"></input-text>
                                
                                
                            </div>
                            <div class="column">
                                <input-text labelInputText="N° téléphone" :valueInputText="CustomerCard['Phone No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code langue " :valueInputText="CustomerCard['Language Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Nom contact" :valueInputText="CustomerCard['Contact']" :is_disabled="readOnlyMode"></input-text>
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
                                <input-text labelInputText="Code devise" :valueInputText="CustomerCard['Currency Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code remise facture" :valueInputText="CustomerCard['No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Groupe compta. marché" :valueInputText="CustomerCard['Gen_ Bus_ Posting Group']" :is_disabled="readOnlyMode"></input-text>
                                
                                
                               
                            </div>
                            <div class="column">
                                <input-text labelInputText="Groupe compta. marché TVA" :valueInputText="CustomerCard['VAT Bus_ Posting Group']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Groupe compta. client" :valueInputText="CustomerCard['Customer Posting Group']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Groupe prix client" :valueInputText="CustomerCard['Customer Price Group']" :is_disabled="readOnlyMode"></input-text>
                                
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
                                <input-text labelInputText="Type partenaire" :valueInputText="CustomerCard['Partner Type']==0 ? 'Societe':'Personne'" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code conditions paiement" :valueInputText="CustomerCard['Payment Terms Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code mode de règlement" :valueInputText="CustomerCard['Payment Method Code']" :is_disabled="readOnlyMode"></input-text>
                               
                            </div>
                            <div class="column">
                                <input-text labelInputText="Solde DS" :valueInputText="CustomerCard['Balance Amount']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Montant net DS" :valueInputText="CustomerCard['Balance Amount']" :is_disabled="readOnlyMode"></input-text>
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
                                <input-text labelInputText="Code magasin" :valueInputText="CustomerCard['Location Code']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Code" :valueInputText="CustomerCard['Shipment Method Code']" :is_disabled="readOnlyMode"></input-text>
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
import CustomerCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import CustomerCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import axios from 'axios'
import { ref } from 'vue'

export default {
    name:'customer-card',
    components:{
        CustomerCardHeader,CustomerInfo,inputText,CustomerCardRibbon
    },
    setup(){
        const CustomerCard = ref({})
        const readOnlyMode = ref(true)
        // expose to template and other options API hooks
        return {
            CustomerCard,readOnlyMode
        }
    },
    data(){
        return{
            //indique la route active
            customerCardId:this.$route.params.id,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,

            //nom de l'hote dans l'url 
            hostname:window.location.hostname
        }
    },
    methods:{
        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        },
        expand(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight='500px'
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
            console.log(myElt.style.maxHeight)
            myElt.style.maxHeight="0px"
        }
    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getCustomerCard/${this.customerCardId}`)
        .then(result => {
            this.CustomerCard = result.data.recordset[0]

        }).catch(err=>console.log(err))

    },
}

</script>
<style scoped>
#general_content,#address_content,#invoicing_content,#cash_content,#delivery_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>