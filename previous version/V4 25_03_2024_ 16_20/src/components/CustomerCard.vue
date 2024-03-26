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
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            ></Customer-card-ribbon>

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
                                <input-text labelInputText="Code client" :valueInputText="CustomerCard['No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Nom du client" :valueInputText="CustomerCard['Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Nom de recherche" :valueInputText="CustomerCard['Search Name']" :is_disabled="readOnlyMode"></input-text>  
                                <input-text labelInputText="Type client" :valueInputText="CustomerCard['Customer Type']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Libellé Type Client" :valueInputText="CustomerCard['Customer Type Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Adresse:Ligne 1" :valueInputText="CustomerCard['Address']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" :valueInputText="CustomerCard['Address 2']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Ville" :valueInputText="CustomerCard['City']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Téléphone" :valueInputText="CustomerCard['Phone No_']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Limit de crédit" :valueInputText="CustomerCard['Credit Limit(LCY)']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Canal de vente" :valueInputText="CustomerCard['Sales channel']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Mode de vente" :valueInputText="CustomerCard['Sales Mode']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Groupe Client" :valueInputText="CustomerCard['Customer Posting Group']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Délai de paiement" :valueInputText="CustomerCard['Payment Terms Code']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Mode de paiement" :valueInputText="CustomerCard['Payment Method Code']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Mode de livraison" :valueInputText="CustomerCard['Shipment Method Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Catégorie TVA" :valueInputText="CustomerCard['VAT Bus_Posting Group']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="% Acompte exigé" :valueInputText="CustomerCard['Prepayment_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Encours" :valueInputText="CustomerCard['Balance Amount']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Encours échue" :valueInputText="CustomerCard['Amount Due']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Contact principal" :valueInputText="CustomerCard['Primary Contact No_']" :is_disabled="readOnlyMode"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                </div>
<!---------composant info client----------------------->
                <customer-info class="customer-info"></customer-info>

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
import { useNavigationTabStore } from '@/Stores/NavigationTab'

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
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

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
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#address_content,#invoicing_content,#cash_content,#delivery_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>