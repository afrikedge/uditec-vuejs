<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="paymentCardId" :soDesc="paymentCard.Subject" pageTitle="Fiche Demande validation paiement" />
            </div>
            
<!---------Composant rubban fiche demande validation paiement----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            :newContactBtnIsDisabled="true"
            :newShipToAddressBtnIsDisabled="true"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="true"
            ></Customer-card-ribbon>

<!---------Section formulaire fiche demande validation paiement----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche demande validation paiement----------------------->                         
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
                                <input-text labelInputText="N° Demande" :valueInputText="paymentCard['No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Objet" :valueInputText="paymentCard['Subject']" :is_disabled="readOnlyMode"></input-text>

                                <input-text labelInputText="Type document" :valueInputText="paymentCard['Document Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type document" v-model="paymentCard['Document Type']" :option-list="optionLabelListForRepossType" v-else></input-select-basic-1> 


                                <input-text labelInputText="N° Document" :valueInputText="paymentCard['Document No_']" :is_disabled="readOnlyMode"></input-text>  
                                 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Crée le" :valueInputText="formatDate(paymentCard['Created on'])" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Crée par" :valueInputText="paymentCard['Created by']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Statut" :valueInputText="paymentCard['Status']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                  
                    <div id="details" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('details_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Détails</span>
                                    </a>
                                    <a @click="expand('details_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                        <span>Détails</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="details_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode règlement</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Référence </th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant validé</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of paymentCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td class="has-text-left">{{ elt['Payment Method Code'] }}</td>
                                            <td class="has-text-left">{{ elt['Payment Amount']  }}</td>
                                            <td class="has-text-left">{{ elt['Approved Amount'] }}</td>
                                            <td class="has-text-left">{{ elt['Refence No_'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>



                     <div id="tracking" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet3_expanded}">
                            <div :class="{'columns':!onglet3_expanded,'p-3':onglet3_expanded,'has-border-bottom-grey':onglet3_expanded,'has-border-bottom':!onglet3_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('tracking_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                        <span>Suivi</span>
                                    </a>
                                    <a @click="expand('tracking_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                        <span>Suivi</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="tracking_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Séquence </th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode validation</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Validé le</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Validé par</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Validé en tant que </th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut Actuel </th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut Suivant </th> 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Commentaire</th> 

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of paymentCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                          
                                             <td class="has-text-left">{{elt['Approval Sequence'] }}</td>
                                             <td class="has-text-left">{{elt['Approval Mode'] }}</td>
                                             <td class="has-text-left">{{formatDate(elt['Approved On']) }}</td>
                                             <td class="has-text-left">{{elt['[Approved by'] }}</td>
                                             <td class="has-text-left">{{elt['Approved as'] }}</td>
                                             <td class="has-text-left">{{elt['Current Status'] }}</td>
                                             <td class="has-text-left">{{elt['Next Status'] }} </td>
                                             <td class="has-text-left">{{elt['Comment'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'

export default {
    name:'payment-validation-request-card',
    components:{
        CustomerCardHeader,CustomerInfo,inputText,CustomerCardRibbon,inputSelectBasic1
    },
    setup(){
        const paymentCard = ref({})
        const paymentCardLines = ref([])
        const readOnlyMode = ref(true)
        const readOnlyModeIsDisabled = ref(false)
        const optionLabelListForRepossType = ref([])
        // expose to template and other options API hooks


        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        return {
            paymentCardLines,paymentCard,readOnlyMode,readOnlyModeIsDisabled,  setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            optionLabelListForRepossType,
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique la route active
            paymentCardId:this.$route.params.id,

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
        axios.get(`http://${this.hostname}:3000/app/getPVRQCard/${this.paymentCardId}`)
        .then(result => {
         this.paymentCard = result.data;
         console.log(result)
        }).catch(err=>console.log(err))

    },
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#tracking_content,#details_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>