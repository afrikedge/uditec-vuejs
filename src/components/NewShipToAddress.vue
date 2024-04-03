<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:90%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <contact-card-Header soNo="Shiptoaddress 1" soDesc="New ShipToAddress" pageTitle="Fiche adresse de livraison" />
            </div>
            
<!---------Composant rubban fiche nouvelle addresse de livraison----------------------->      
            <contact-card-ribbon
            :newCardBtnDisabled="false"
            :editCardBtnDisabled="true"
            :readOnlyModeDisabled="true"
            ></contact-card-ribbon>

<!---------Section formulaire fiche nouvelle addresse de livraison----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche nouvelle addresse de livraison----------------------->                         
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
                                <input-text labelInputText="Code client" valueInputText="ShipToAddressCard['Customer No_']"></input-text>
                                <input-text labelInputText="Code adresse" valueInputText="ShipToAddressCard['Code']"></input-text>
                                <input-text labelInputText="Nom de l'adresse" valueInputText="ShipToAddressCard['Name']"></input-text>
                                <input-text labelInputText="Adresse:Ligne 1" valueInputText="ShipToAddressCard['Address']"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" valueInputText="ShipToAddressCard['Address 2']"></input-text>
                               
                               
                            </div>
                            <div class="column">
                                <input-text labelInputText="Ville" valueInputText="ShipToAddressCard['City']"></input-text> 
                                <input-text labelInputText="Téléphone" valueInputText="ShipToAddressCard['Phone No_']"></input-text> 
                                <input-text labelInputText="Téléphone Mobile" valueInputText="ShipToAddressCard['Mobile Phone No_']"></input-text> 
                                <input-text labelInputText="Lieu" valueInputText="ShipToAddressCard['Place']"></input-text>
                                <input-text labelInputText="Quartier" valueInputText="ShipToAddressCard['Neighborhood']"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                    <!---------sous-Section ongle 2 formulaire fiche nouvelle addresse de livraison----------------------->                         
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
                              
                                <input-text labelInputText="Zone" valueInputText="ShipToAddressCard['Service Zone Code']"></input-text>
                                <input-text labelInputText="Créneau de préférence" valueInputText="ShipToAddressCard['Time preference']"></input-text>
                                <input-text labelInputText="Type de route" valueInputText="ShipToAddressCard['Road Type']"></input-text>
                                <input-text labelInputText="Autres préciser" valueInputText="ShipToAddressCard['Road Type(Others)']"></input-text>
                                <input-text labelInputText="Distance de transport à pied" valueInputText="ShipToAddressCard['Walking distance']"></input-text>
                                <input-text labelInputText="Autres préciser" valueInputText="ShipToAddressCard['Walking distance(Others)']"></input-text>
                                <input-text labelInputText="Emplacement de livraison" valueInputText="ShipToAddressCard['Delivery Location']==0 ? 'Residence Société' : 'Residence Client'" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                               
                                <input-text labelInputText="Accès moto" valueInputText="ShipToAddressCard['Motorcycle Access']"></input-text>
                                <input-text labelInputText="Plan d'accès" valueInputText="ShipToAddressCard['Access Plan']"></input-text>
                                <input-text labelInputText="Type d'accès" valueInputText="ShipToAddressCard['Access Type']"></input-text>
                                <input-text labelInputText="Type de camion" valueInputText="ShipToAddressCard['Truck Type']"></input-text>
                                <input-text labelInputText="Plan d'accès" valueInputText="ShipToAddressCard['']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Parking Public" valueInputText="ShipToAddressCard['Public parking presence']"></input-text>
                                <input-text labelInputText="Remarques" valueInputText="ShipToAddressCard['Remarks']"></input-text>
                                <input-text labelInputText="Plan de masse" valueInputText="ShipToAddressCard['Ground plan']"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                </div>
               
            </div>
            
        </div>

    </div> 
</template>
<script>
// import ShipToAddressInfo from './ShipToAddressInfo.vue'
import ContactCardHeader from './HeaderForCard.vue'
import ContactCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'


export default {
    name:'new-ship-to-address',
    components:{
        ContactCardHeader,inputText,ContactCardRibbon,
    },
   
    data(){
        return{
           
            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
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
    }

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