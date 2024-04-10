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

                <!---------sous-Section ongle 1 formulaire carte de demande de déblocage----------------------->                         
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
                                <input-text labelInputText="N° Demande" :valueInputText="ReleaseCard['No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Objet" :valueInputText="ReleaseCard['Subject']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="N° Document" :valueInputText="ReleaseCard['Document No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Crée le" :valueInputText="formatDate(ReleaseCard['Created on'])" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Crée par" :valueInputText="ReleaseCard['Created by']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="N° Client" :valueInputText="ReleaseCard['Customer No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Gestionnaire" :valueInputText="ReleaseCard['Sales person Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Statut" :valueInputText="ReleaseCard['Status']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Limite de crédit" :valueInputText="ReleaseCard['Credit Limit (LCY)']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Encours " :valueInputText="ReleaseCard['Balance Amount']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Encours échue" :valueInputText="ReleaseCard['Amount Due']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Pire Statut Actuel" :valueInputText="ReleaseCard['Current Worst Status']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Exposition brute" :valueInputText="ReleaseCard['Gross exposure']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Niveau de risque" :valueInputText="ReleaseCard['Risk Level']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Dépassement" :valueInputText="ReleaseCard['Exceeding Amount']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                <!---------sous-Section ongle 2 formulaire carte de demande de déblocage-----------------------> 
                    <div id="historical">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('historical_content');onglet2_expanded = !onglet2_expanded;" v-if="onglet2_expanded">
                                    <span>Historique</span>
                                </a>
                                <a @click="expand('historical_content');onglet2_expanded = !onglet2_expanded;" v-if="!onglet2_expanded">
                                    <span>Historique</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="historical_content" class="columns mt-5">
                            <div v-if=" ReleaseCardLine.length>=0">
                                <table class="table  is-narrow  is-fullwidth box">
                                    <thead class=" my-2">
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Mode de vente</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">N° Document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Date comptabilisation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Date document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Montant</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Paiement</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Date paiement</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Jour(s) retard</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Statut échéance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of  ReleaseCardLine" :key="index"  >
                                            <td class="has-text-left">{{ elt['Sales Mode'] }}</td>
                                            <td class="has-text-left">{{ elt['Document No_']  }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Posting Date'])  }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Due Date'])  }}</td>
                                            <td class="has-text-left">{{ elt['Amount (LCY)'] }}</td>
                                            <td class="has-text-left">{{ elt['Payment (LCY)']  }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Payment Date'])  }}</td>
                                            <td class="has-text-left">{{ elt['Days late']  }}</td>
                                            <td class="has-text-left">{{ elt['Debt Status'] }}</td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>
                <!---------sous-Section ongle 3 formulaire carte de demande de déblocage-----------------------> 
                    <div id="tracking">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('tracking_content');onglet3_expanded = !onglet3_expanded;" v-if="onglet3_expanded">
                                    <span>Suivi</span>
                                </a>
                                <a @click="expand('tracking_content');onglet3_expanded = !onglet3_expanded;" v-if="!onglet3_expanded">
                                    <span>Suivi</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="tracking_content" class="columns mt-5">
                            <div v-if=" ReleaseCardLine.length>=0">
                                <table class="table  is-narrow  is-fullwidth box">
                                    <thead class=" my-2">
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">N° Séquence</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Mode validation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Validé le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Validé par</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Validé en tant que</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Statut Actuel</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Statut Suivant</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Commentaire</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of  ReleaseCardLine" :key="index"  >
                                            <td class="has-text-left">{{ elt['Approval Sequence'] }}</td>
                                            <td class="has-text-left">{{ elt['Approval Mode']  }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Approved On'])  }}</td>
                                            <td class="has-text-left">{{ elt['Approved by']  }}</td>
                                            <td class="has-text-left">{{ elt['Approved as']  }}</td>
                                            <td class="has-text-left">{{ elt['Current Status']  }}</td>
                                            <td class="has-text-left">{{ elt['Next Status']  }}</td>
                                            <td class="has-text-left">{{ elt['Comment']  }}</td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>


                </div>

<!---------composant info demande de déblocage----------------------->
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
import axios from 'axios'
import { ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'

export default {
    name:'release-request-card',
    components:{
        ReleaseCardHeader,CustomerInfo,inputText,ReleaseCardRibbon
    },
    setup(){
        const ReleaseCard = ref({})
        const ReleaseCardLine = ref([])
        const readOnlyMode = ref(true)
        // expose to template and other options API hooks
        return {
            ReleaseCard,ReleaseCardLine,readOnlyMode
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique la route active
            releaseCardId:this.$route.params.id,

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

        goBackToList(){
            useNavigationTabStore().setActiveTab('customer')
            this.$router.push('/ReleaseRequestList')
        },
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
            if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
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
    axios.get(`http://${this.hostname}:3000/app/getRRQCard/${this.releaseCardId}`)
    .then(result => {
        console.log(result.data)
        this.ReleaseCard = result.data.recordset[0]
        this.ReleaseCardLine = result.data.recordset[1]
    }).catch(err=>console.log(err))

    },
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#historical_content,#tracking_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>