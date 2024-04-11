<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <prospect-card-Header soNo="lead 1" soDesc="New Lead" pageTitle=" prospect" />
            </div>
            
<!---------Composant rubban fiche nouveau prospect----------------------->      
            <prospect-card-ribbon
            :newCardBtnDisabled="false"
            :editCardBtnDisabled="true"
            :readOnlyModeDisabled="true"
            ></prospect-card-ribbon>

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
                                <input-text labelInputText="N° prospect" valueInputText=""></input-text>
                                <input-text labelInputText="Nom" valueInputText="]"></input-text>
                                <input-text labelInputText="Adresse" valueInputText=""></input-text>
                                <input-text labelInputText="Adresse (2ème ligne)" valueInputText=""></input-text>
                                <input-text labelInputText="Ville" valueInputText=""></input-text> 
                                <input-text labelInputText="N° téléphone" valueInputText=""></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Code vendeur" valueInputText=""></input-text>
                                <input-text labelInputText="Adresse e-mail" valueInputText=""></input-text>
                                <input-text labelInputText="Page d'accueil" valueInputText=""></input-text>
                                <input-text labelInputText="Pays/région" valueInputText=""></input-text>
                                <input-text labelInputText="Code postal" valueInputText=""></input-text>
                                <input-text labelInputText="Type prospect" valueInputText=""></input-text>
                                <input-text labelInputText="N° téléphone mobile" valueInputText=""></input-text>

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
import ProspectCardHeader from './HeaderForCard.vue'
import ProspectCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
export default {
    name:'lead-card',
    components:{
        ProspectCardHeader,inputText,ProspectCardRibbon
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