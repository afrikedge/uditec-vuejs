<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <prospect-card-Header :soNo="leadCardId" :soDesc="LeadCard['Search Name']" pageTitle="Fiche prospect" />
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <prospect-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="leadCardRightInfoMaxWidth"
            :newCardBtnDisabled="false"
            :editCardBtnDisabled="true"
            :readOnlyModeDisabled="true"
            ></prospect-card-ribbon>

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
                                <input-text labelInputText="Nom" :valueInputText="LeadCard['Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Adresse" :valueInputText="LeadCard['Address']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Adresse (2ème ligne)" :valueInputText="LeadCard['Address 2']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Ville" :valueInputText="LeadCard['City']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="N° téléphone" :valueInputText="LeadCard['Phone No_']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Code vendeur" :valueInputText="LeadCard['Salesperson Code']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Adresse e-mail" :valueInputText="LeadCard['E-Mail']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Page d'accueil" :valueInputText="LeadCard['Home Page']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Pays/région" :valueInputText="LeadCard['County']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Code postal" :valueInputText="LeadCard['Post Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Type prospect" :valueInputText="LeadCard['Type']==0 ? 'valide' : 'Non valide'" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="N° téléphone mobile" :valueInputText="LeadCard['Mobile Phone No_']" :is_disabled="readOnlyMode"></input-text>

                            </div>
                        </div>                    
                    </div>
                    <br><br>

                </div>

<!---------composant info client----------------------->
                <prospect-info class="prospect-info"></prospect-info>

            </div>
        </div>

    </div>    
</template>
<script>
import ProspectCardHeader from './HeaderForCard.vue'
import ProspectInfo from './ProspectInfo.vue'
import ProspectCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
export default {
    name:'lead-card',
    components:{
        ProspectCardHeader,ProspectInfo,inputText,ProspectCardRibbon
    },
    setup(){
        const LeadCard = ref({})
        const readOnlyMode = ref(true)
        // expose to template and other options API hooks
        return {
            LeadCard,readOnlyMode
        }
    },
    data(){
        return{
             //taille (largeur) initiale du composant customerInfo
             leadInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.leadCardRightInfoMaxWidth,

             //indique la route active
             leadCardId:this.$route.params.id,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,

            hostname:window.location.hostname
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.leadInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('leadCardRightInfoMaxWidth','800px')
                this.leadInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('leadCardRightInfoMaxWidth','0px')
                this.leadInfoCompMaxWidth='0px'
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
        }
    },
    mounted(){
        axios.get(`http://${this.hostname}/app/getLeadCard/${this.leadCardId}`)
        .then(result => {
            this.LeadCard = result.data.recordset[0]
        }).catch(err=>console.log(err))

    }
}

</script>
<style scoped>
.prospect-info{
    max-width: v-bind(leadInfoCompMaxWidth);
    transition: max-width 0.5s;
}


#general_content,#address_content,#invoicing_content,#cash_content,#delivery_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>