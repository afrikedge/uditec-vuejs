<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:90%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <shiptoaddress-card-Header :soNo="ShiptoaddressCardId2" :soDesc="ShipToAddressCard['Name']" pageTitle="Fiche adresse de livraison" />
            </div>
            
<!---------Composant rubban fiche adresse destinataire----------------------->      
            <shiptoaddress-card-ribbon
            :newCardBtnDisabled="false"
            :editCardBtnDisabled="true"
            :readOnlyModeDisabled="true"
            ></shiptoaddress-card-ribbon>

<!---------Section formulaire fiche adresse destinataire----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche adresse destinataire----------------------->                         
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
                                <input-text labelInputText="Code client" :valueInputText="ShipToAddressCard['Customer No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code adresse" :valueInputText="ShipToAddressCard['Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Nom de l'adresse" :valueInputText="ShipToAddressCard['Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Adresse:Ligne 1" :valueInputText="ShipToAddressCard['Address']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" :valueInputText="ShipToAddressCard['Address 2']" :is_disabled="readOnlyMode"></input-text>
                                
                            </div>
                            <div class="column">
                                <input-text labelInputText="Ville" :valueInputText="ShipToAddressCard['City']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Téléphone" :valueInputText="ShipToAddressCard['Phone No_']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Téléphone Mobile" :valueInputText="ShipToAddressCard['Mobile Phone No_']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Lieu" :valueInputText="ShipToAddressCard['Place']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Quartier" :valueInputText="ShipToAddressCard['Neighborhood']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                    <!---------sous-Section ongle 2 formulaire fiche adresse destinataire----------------------->                         
                    <div id="details">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('general_content');onglet1_expanded=!onglet1_expanded" v-if="onglet1_expanded">
                                    <span>Détails</span>
                                </a>
                                <a @click="expand('general_content');onglet1_expanded=!onglet1_expanded" v-if="!onglet1_expanded">
                                    <span>Détails</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Zone" :valueInputText="ShipToAddressCard['Service Zone Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Créneau de préférence" :valueInputText="ShipToAddressCard['Time preference']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Type de route" :valueInputText="ShipToAddressCard['Road Type']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Autres préciser" :valueInputText="ShipToAddressCard['Road Type(Others)']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Distance de transport à pied" :valueInputText="ShipToAddressCard['Walking distance']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Autres préciser" :valueInputText="ShipToAddressCard['Walking distance(Others)']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Emplacement de livraison" :valueInputText="ShipToAddressCard['Delivery Location']==0 ? 'Residence Société' : 'Residence Client'" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Accès moto" :valueInputText="ShipToAddressCard['Motorcycle Access']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Plan d'accès" :valueInputText="ShipToAddressCard['Access Plan']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Type d'accès" :valueInputText="ShipToAddressCard['Access Type']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Type de camion" :valueInputText="ShipToAddressCard['Truck Type']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Plan d'accès" :valueInputText="ShipToAddressCard['']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Parking Public" :valueInputText="ShipToAddressCard['Public parking presence']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Remarques" :valueInputText="ShipToAddressCard['Remarks']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Plan de masse" :valueInputText="ShipToAddressCard['Ground plan']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                </div>
                <!---------composant info adresse destinataire----------------------->
                <shiptoaddress-info id="shiptoaddress-info"></shiptoaddress-info>
            </div>
        </div>

    </div> 
</template>
<script>
import shiptoaddressCardHeader from './HeaderForCard.vue'
import shiptoaddressCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import axios from 'axios'
import { ref } from 'vue'

export default {
    name:'ship-to-address-card',
    components:{
        shiptoaddressCardHeader,inputText,shiptoaddressCardRibbon
    },
    setup(){
        const ShipToAddressCard = ref({})
       
        const readOnlyMode = ref(true)
        // expose to template and other options API hooks
        return {
            ShipToAddressCard,readOnlyMode
        }
    },
    data(){
        return{
            //indique la route active
            ShiptoaddressCardId1:this.$route.params.id1,
            ShiptoaddressCardId2:this.$route.params.id2,
            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,

            hostname:window.location.hostname
        }
    },
    methods:{
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='history_content') myElt.style.maxHeight='250px'
            else myElt.style.maxHeight='500px'
        },
        collapse(id){
            
            const myElt=document.getElementById(id);
            console.log(myElt.style.maxHeight)
            myElt.style.maxHeight="0px"
        }
    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getShipToAddressCard/${this.ShiptoaddressCardId1}/${this.ShiptoaddressCardId2}`)
        .then(result => {
            this.ShipToAddressCard = result.data.recordset[0]
        }).catch(err=>console.log(err))

    },

}
</script>
<style scoped>
#general_content,#communication_content,#international_content,#history_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s;
}

.has-border-bottom-grey{
    border-bottom: 1px solid rgba(0, 0, 0, 0.233);
}
</style>