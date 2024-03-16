<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:90%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <contact-card-Header soNo="000001" soDesc="client Gérald" pageTitle="Fiche contact" />
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <contact-card-ribbon></contact-card-ribbon>

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
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date commande" valueInputText="new Date(soHeader['Date de commande']).toDateString()" ></input-text>
                                <input-text labelInputText="Date comptabilisation " valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()" ></input-text>
                                <input-text labelInputText="Date document" valueInputText="new Date(soHeader['Date document']).toDateString()" ></input-text>
                                <input-text labelInputText="Date d'échéance" valueInputText="new Date(soHeader[`Date d'échéance`]).toDateString()" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section ongle 2 formulaire fiche client----------------------->
                    <div id="historique" :class="{'has-background-light':onglet4_expanded}">
                        <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet4_expanded}">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('history_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                    <span>Historique</span>
                                </a>
                                <a @click="expand('history_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                    <span>Historique</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                                <span class="mx-2 subtitle" v-if="onglet4_expanded">|</span>
                                <a href="#">
                                    <span class="subtitle is-7" v-if="onglet4_expanded">Gérer</span>
                                </a>
                                <a href="#" class="mx-2">
                                    <span class="subtitle is-7" v-if="onglet4_expanded">Fonction</span>
                                </a>
                            </div>
                        </div>
                        <div id="history_content" class="columns px-5" style="max-height: 250px; overflow:scroll;">
                            <table class="table  is-narrow is-hoverable is-fullwidth">
                                <thead class=" my-2">
                                    <tr> 
                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;" > Type</th>
                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code magasin</th>
                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code unité</th>
                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                        <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">% remise ligne</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="" v-for="elt of [1,2,3,4,5,6,7,8,9,11,10,12,13,14,145,14,1,1,1,4,4,4,44,4,7]" :key="elt">
                                        <td class="has-text-left has-background-light"> salut</td>
                                        <td class="has-text-left has-background-light"> salut</td>
                                        <td class="has-text-left has-background-light"> salut</td>
                                        <td class="has-text-left has-background-light"> slaut</td>
                                        <td class="has-text-left has-background-light"> slaut</td>
                                        <td class="has-text-left has-background-light"> slaut</td>                
                                        <td class="has-text-left has-background-light"> slaut</td>                
                                        <td class="has-text-left has-background-light"> slaut</td>                
                                    </tr>
                                </tbody>
                            </table>
                        </div>                    
                    </div>                         
                    <br><br>

<!---------sous-Section ongle 3 formulaire fiche client----------------------->                         
                    <div id="communication">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('communication_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>Communication</span>
                                </a>
                                <a @click="expand('communication_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                    <span>Communication</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="communication_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° client" valueInputText="soHeader['Code client']" ></input-text>
                                <input-text labelInputText="Nom du client" valueInputText="soHeader['Nom du client']" ></input-text>
                                <input-text labelInputText="Contact" valueInputText="soHeader['Contact client']" ></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date commande" valueInputText="new Date(soHeader['Date de commande']).toDateString()" ></input-text>
                                <input-text labelInputText="Date comptabilisation " valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section ongle 4 formulaire fiche client----------------------->                         
                    <div id="international">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('international_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                    <span>International</span>
                                </a>
                                <a @click="expand('international_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                    <span>International</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                           <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="international_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° client" valueInputText="soHeader['Code client']" ></input-text>
                                <input-text labelInputText="Nom du client" valueInputText="soHeader['Nom du client']" ></input-text>
                                <input-text labelInputText="Contact" valueInputText="soHeader['Contact client']" ></input-text>
                                <input-text labelInputText="Adresse" valueInputText="soHeader['Adresse du client']" ></input-text>
                                <input-text labelInputText="Ville" valueInputText="soHeader['Ville du client']" ></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date commande" valueInputText="new Date(soHeader['Date de commande']).toDateString()" ></input-text>
                                <input-text labelInputText="Date comptabilisation " valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()" ></input-text>
                                <input-text labelInputText="Date document" valueInputText="new Date(soHeader['Date document']).toDateString()" ></input-text>
                                <input-text labelInputText="Date d'échéance" valueInputText="new Date(soHeader[`Date d'échéance`]).toDateString()" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                </div>

<!---------composant info client----------------------->
                <customer-info id="contact-info"></customer-info>

            </div>
        </div>

    </div> 
</template>
<script>
import ContactCardHeader from './HeaderForCard.vue'
import ContactCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import CustomerInfo from './CustomerInfo.vue'

export default {
    name:'sale-order-card',
    components:{
        ContactCardHeader,inputText,ContactCardRibbon,CustomerInfo
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