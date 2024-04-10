<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête Fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="promiseCardId" :soDesc="PromiseCard.Name" pageTitle="Fiche Promesse de règlement" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban Fiche Promesse de règlement----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            :newContactBtnIsDisabled="false"
            :newShipToAddressBtnIsDisabled="false"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="true"
            ></Customer-card-ribbon>

<!---------Section formulaire Fiche Promesse de règlement----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

                    <!---------sous-Section ongle 1 formulaire Fiche Promesse de règlement----------------------->                         
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
                                
                                <input-text labelInputText="N°" v-model="PromiseCard['No_']" :valueInputText="PromiseCard['No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                 
                                  <input-text labelInputText="Objct" v-model="PromiseCard['Subject']" :valueInputText="PromiseCard['Subject']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                
                                <input-text labelInputText="N° Client" v-model="PromiseCard['Customer No_']" :valueInputText="PromiseCard[' Customer No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                 <input-text labelInputText="N° Contact" v-model="PromiseCard[ 'Contact No_']" :valueInputText="PromiseCard['Contact No_']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                               
                                <input-text labelInputText="Description" v-model="PromiseCard['Description']" :valueInputText="PromiseCard['Description']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Crée le" :valueInputText="formatDate(PromiseCard['Created on'])" :is_disabled="readOnlyMode"></input-text>

                                <input-text labelInputText="Crée par" v-model="PromiseCard['Created by']" :valueInputText="PromiseCard['Created by']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            
                                <input-text labelInputText="Date promesse" 
                                :valueInputText="formatDate(PromiseCard['Promise Date'])" :is_disabled="readOnlyMode"></input-text>  
                            </div>
                            <div class="column">
                               
                                <input-text labelInputText="Suivi par" v-model="PromiseCard['Created to']" :valueInputText="PromiseCard['Created to']" :is_disabled="!readOnlyModeIsDisabled"></input-text>

                                <input-text labelInputText="Montant promis" v-model="PromiseCard['Promised amount']" :valueInputText="PromiseCard['Promised amount']" :is_disabled="!readOnlyModeIsDisabled"></input-text>

                                <input-text labelInputText="Montant honoré" v-model="PromiseCard['Honored amount']" :valueInputText="PromiseCard['Honored amount']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                               
                                <input-text labelInputText="Activité d'origine" v-model="PromiseCard['Originated activity']" :valueInputText="PromiseCard['Originated activity']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Date rappel" :valueInputText="formatDate(PromiseCard['Riminding Date'])" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Échéance rappel" :valueInputText="formatDate(PromiseCard['Reminding Due Date'])" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Statut" :valueInputText="PromiseCard['Status']==0 ? 'Actif' : 'Non actif'" :is_disabled="readOnlyMode"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>     
                    

                </div>
<!---------composant info Promesse de règlement----------------------->
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
        const PromiseCard = ref({})
        const readOnlyMode = ref(true)
        const readOnlyModeIsDisabled = ref(false)



        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        // expose to template and other options API hooks
        return {
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            PromiseCard,readOnlyMode, readOnlyModeIsDisabled,
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique la route active
            promiseCardId:this.$route.params.id,

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
        axios.get(`http://${this.hostname}:3000/app/getPPCard/${this.promiseCardId}`)
        .then(result => {
            this.PromiseCard = result.data.recordset[0]
        }).catch(err=>console.log(err))

    },
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#address_content,#invoicing_content,
#cash_content,#delivery_content,#risk_content,#requirement_content,#scoring_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>