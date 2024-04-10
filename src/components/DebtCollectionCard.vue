<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête carte----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="debtCardId" :soDesc="debtcollectionCard.Name" pageTitle="Fiche Activité recouvrement" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban Fiche activité recouvrement----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            :newContactBtnIsDisabled="false"
            :newCardBtnIsDisabled="false"
            :newShipToAddressBtnIsDisabled="false"
            ></Customer-card-ribbon>

<!---------Section formulaire Fiche activité recouvrement----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

                    <!---------sous-Section ongle 1 formulaire Fiche activité recouvrement----------------------->                         
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
                                <input-text labelInputText="N°" :valueInputText="debtcollectionCard['No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="N° Client" :valueInputText="debtcollectionCard['Customer No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Nom client" :valueInputText="debtcollectionCard['Name']" :is_disabled="readOnlyMode"></input-text>  
                                <input-text labelInputText="Type" :valueInputText="debtcollectionCard['Activity Type']==0 ? 'Webmaster' : 'IA developer'" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Objet" :valueInputText="debtcollectionCard['Subject']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Description" :valueInputText="debtcollectionCard['Description']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Crée le" :valueInputText="formatDate(debtcollectionCard['Created on'])" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Crée par" :valueInputText="debtcollectionCard['Created by']" :is_disabled="readOnlyMode"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date et heure début prévue" :valueInputText="formatDate(debtcollectionCard['Scheduled Start Date'])" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Date et heure fin prévue" :valueInputText="formatDate(debtcollectionCard['Scheduled End Date'])" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Date et heure début réelle" :valueInputText="formatDate(debtcollectionCard['Actual Start Date'])" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Date et heure fin réelle" :valueInputText="formatDate(debtcollectionCard['Actual End Date'])" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Date et heure relance" :valueInputText="formatDate(debtcollectionCard['Reminder Date'])" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Activité connexe" :valueInputText="debtcollectionCard['Linked Activity']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Statut" :valueInputText="debtcollectionCard['Status']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Observation" :valueInputText="debtcollectionCard['Comment']" :is_disabled="readOnlyMode"></input-text>
                            
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                     <!---------sous-Section ongle 2 formulaire Fiche activité recouvrement-----------------------> 
                     <div id="deadline">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('deadline_content');onglet2_expanded = !onglet2_expanded;" v-if="onglet2_expanded">
                                    <span>Échéances</span>
                                </a>
                                <a @click="expand('deadline_content');onglet2_expanded = !onglet2_expanded;" v-if="!onglet2_expanded">
                                    <span>Échéances</span>
                                    <span class="icon">
                                      <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div id="deadline_content" class="columns mt-5">
                            <div v-if=" debtcollectionCardLine.length>=0">
                                <table class="table  is-narrow  is-fullwidth box">
                                    <thead class=" my-2">
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">N° ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">N° Document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Date comptabilisation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Date document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Description</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Montant initial</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Montant ouvert</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-5" style="min-width: 100px;">Statut échéance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of  debtcollectionCardLine" :key="index"  >
                                            <td class="has-text-left">{{ elt['Line No_'] }}</td>
                                            <td class="has-text-left">{{ elt['Document No_']  }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Posting Date'])  }}</td>
                                            <td class="has-text-left">{{ formatDate(elt['Document Date'])  }}</td>
                                            <td class="has-text-left">{{ elt['Description'] }}</td>
                                            <td class="has-text-left">{{ elt['Original Amount']  }}</td>
                                            <td class="has-text-left">{{ elt['Remaining Amount']  }}</td>
                                            <td class="has-text-left">{{ elt['Debt Status'] }}</td>    
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else>Il n'y'a rien à afficher</div>
                        </div>
                    </div>
                    <br><br>

                </div>
<!---------composant info activité recouvrement----------------------->
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
        const debtcollectionCard = ref({})
        const debtcollectionCardLine = ref([])
        const readOnlyMode = ref(true)
        // expose to template and other options API hooks
        return {
            debtcollectionCardLine,debtcollectionCard,readOnlyMode
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique la route active
            debtCardId:this.$route.params.id,

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
            this.$router.push('/CustomerList')
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
        axios.get(`http://${this.hostname}:3000/app/getRACard/${this.debtCardId}`)
        .then(result => {
            console.log(result.data)
            this.debtcollectionCard = result.data.recordset[0]
        }).catch(err=>console.log(err))

    },
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#deadline_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>