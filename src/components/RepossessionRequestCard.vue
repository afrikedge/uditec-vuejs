<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="repossessionCardId" :soDesc="repossessionCard.Motif" pageTitle="Fiche client" />
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            :newContactBtnIsDisabled="false"
            :newShipToAddressBtnIsDisabled="false"
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
                                <input-text labelInputText="N° Demande" :valueInputText="repossessionCard['No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="N° Client" :valueInputText="repossessionCard['Customer No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="N° Document " :valueInputText="repossessionCard['Document No_']" :is_disabled="readOnlyMode"></input-text>  
                                <input-text labelInputText="Article" :valueInputText="repossessionCard['Item No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Numéro Série" :valueInputText="repossessionCard['Serial No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Crée le" :valueInputText="formatDate(repossessionCard['Created on'])" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Crée par" :valueInputText="repossessionCard['Created by']" :is_disabled="readOnlyMode"></input-text> 
                                
                            </div>
                            <div class="column">
                                <input-text labelInputText="Origine" :valueInputText="repossessionCard['Source']" ></input-text> 
                                <input-text labelInputText="Motif" :valueInputText="repossessionCard['Motivation']"></input-text>
                                <input-text labelInputText="Statut Acceptation" :valueInputText="repossessionCard['Acceptance Statusl']" ></input-text>
                                <input-text labelInputText="Type" :valueInputText="repossessionCard['Type']" ></input-text>
                                <input-text labelInputText="Statut Article" :valueInputText="repossessionCard['Item Status']" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                    <!-- <div id="risque">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('Risque_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                    <span>Risque</span>
                                </a>
                                <a @click="expand('Risque_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                    <span>Risque</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="Risque_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Mode de vente" :valueInputText="CustomerCard['Sales Mode']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Conditions de paiement " :valueInputText="CustomerCard['Payment Terms Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Limite de crédit" :valueInputText="CustomerCard['Credit limit (LCY)']" :is_disabled="readOnlyMode"></input-text>  
                                <input-text labelInputText="Mode de paiement" :valueInputText="CustomerCard['Payment Method Code']" :is_disabled="readOnlyMode" ></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Régime TVA" :valueInputText="CustomerCard['VAT Bus_ Posting Group']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="% Acompte exigé" :valueInputText="CustomerCard['[Prepayment _']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Niveau de risque" :valueInputText="CustomerCard['Risk Level']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Note" 
                                :valueInputText="CustomerCard['Score']" :is_disabled="readOnlyMode"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br> -->

                    <!-- <div id="requirement" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet3_expanded}">
                            <div :class="{'columns':!onglet3_expanded,'p-3':onglet3_expanded,'has-border-bottom-grey':onglet3_expanded,'has-border-bottom':!onglet3_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('requirement_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                        <span>suivi</span>
                                    </a>
                                    <a @click="expand('requirement_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                        <span>suivi</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="requirement_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code critère </th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère </th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">ype Valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Longueur valeur</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valeur Alphanumérique</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valeur Numérique</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité </th> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité  </th> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document requis ?  </th> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Lien document </th> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le  </th> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td class="has-text-left">{{ elt['Value Type'] }}</td>
                                            <td class="has-text-left">{{ elt['Value Length']  }}</td>
                                            <td class="has-text-left">{{ elt['Alpha Value'] }}</td>
                                            <td class="has-text-left">{{ elt['Numeric Value'] }}</td>
                                            <td class="has-text-left">{{ elt['Validity'] }}</td>
                                            <td class="has-text-left">{{ elt['Validity Date'] }}</td>
                                            <td class="has-text-left"> {{ elt['Document required'] }} </td>
                                            <td class="has-text-left">{{ elt['Document Link'] }}</td>
                                            <td class="has-text-left">{{ elt['Updated on'] }} </td>
                                            <td class="has-text-left">  {{ elt['Updated by'] }}</td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br> -->

                    <!-- <div id="Scoring" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet4_expanded}">
                            <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet4_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('Scoring_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                        <span>Scoring</span>
                                    </a>
                                    <a @click="expand('Scoring_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                        <span>Scoring</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="Scoring_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Ligne  </th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description du critère </th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"> Valeur</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description de la valeur</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type validité </th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date validité </th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document requis ? </th> 


                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Lien document  </th> 

                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Valide ?  </th> 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point  </th> 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Coefficient</th> 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point pondéré </th> 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié le</th> 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modifié par</th> 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Total point </th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td class="has-text-left">
                                                <span class="subtitle is-6 has-text-weight-bold"> <b>{{ elt['Criteria'] }}</b></span>
                                             </td>
                                             <td class="has-text-left">
                                                <span class="subtitle is-6 has-text-weight-bold"> <b>{{ elt['Criteria Description'] }}</b></span>
                                             </td>
                                             <td class="has-text-left">
                                                 {{ elt['List Value'] }}
                                             </td>
                                             <td class="has-text-left">
                                                 {{ elt['Value Description'] }}
                                             </td>
                                             <td class="has-text-left">
                                                 {{ elt['Validity'] }}
                                             </td>
                                             <td class="has-text-left">
                                                 {{ elt['Validity Date'] }}
                                             </td>
 
 
                                             <td class="has-text-left">
                                                 {{ elt['Document required'] }}
                                             </td>
                                             <td class="has-text-left">
                                                 {{ elt['Document Link'] }}
                                             </td>
                                             <td class="has-text-left">
                                                 {{ elt['Valid'] }}
                                             </td>
                                             <td class="has-text-left">
                                                 {{ elt['Point'] }}
                                             </td>
                                             <td class="has-text-left">
                                                 {{ elt['Coefficient'] }}
                                             </td>
                                             <td class="has-text-left">
                                                 {{ elt['Weighed Point'] }}
                                             </td> 
                                         
                                          <td class="has-text-left">
                                                 {{ elt['Updated on'] }}
                                             </td>
                                              <td class="has-text-left">
                                                 {{ elt['Updated by'] }}
                                             </td>
                                              <td class="has-text-left">
                                                 {{ elt['Weighed Point Total'] }}
                                             </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br> -->
   
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
        const repossessionCard = ref({})
        const customerCardLine = ref([])
        const readOnlyMode = ref(true)
        // expose to template and other options API hooks
        return {
            repossessionCard,readOnlyMode,customerCardLine
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique la route active
            repossessionCardId:this.$route.params.id,

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
        axios.get(`http://${this.hostname}:3000/app/getRPRQCard/${this.repossessionCardId}`)
        .then(result => {
             this.repossessionCard = result.data[0]
            console.log(result.data)
        }).catch(err=>console.log(err))

    },
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#address_content,#invoicing_content,#cash_content,#delivery_content,#Risque_content,#requirement_content ,#Scoringt_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>