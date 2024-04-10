<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête Fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="receivableCardId" :soDesc="ReceivedCard.Name" pageTitle="Fiche Créances" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban Fiche créance----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            :newContactBtnIsDisabled="false"
            :newShipToAddressBtnIsDisabled="false"
            ></Customer-card-ribbon>

<!---------Section formulaire Fiche créance----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

                    <!---------sous-Section ongle 1 formulaire Fiche créance----------------------->                         
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
                                <input-text labelInputText="N° Client" :valueInputText="ReceivedCard['Customer No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Nom client" :valueInputText="ReceivedCard['Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Mode vente" :valueInputText="ReceivedCard['Sales Mode']" :is_disabled="readOnlyMode"></input-text>  
                                <input-text labelInputText="Type document" :valueInputText="ReceivedCard['Document Type']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="N° Document" :valueInputText="ReceivedCard['Document No_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Date comptabilisation" :valueInputText="formatDate(ReceivedCard['Posting Date'])" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Date document" :valueInputText="formatDate(ReceivedCard['Document Date'])" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Date d'échéance" :valueInputText="formatDate(ReceivedCard['Due Date'])" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Description" :valueInputText="ReceivedCard['Description']" :is_disabled="readOnlyMode"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Montant initial" :valueInputText="ReceivedCard['Original Amount']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Montant ouvert" :valueInputText="ReceivedCard['Remaining Amount']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Crée le" :valueInputText="formatDate(ReceivedCard['Assigned on'])" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Crée par" :valueInputText="ReceivedCard['Assigned by']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Crée par" :valueInputText="ReceivedCard['Assigned to']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Statut initial" :valueInputText="ReceivedCard['Initial Status']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Statut actuel" :valueInputText="ReceivedCard['Current Status']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Activité requise" :valueInputText="ReceivedCard['Required Activity']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Commentaire" :valueInputText="ReceivedCard['Comment']" :is_disabled="readOnlyMode" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>


                </div>
<!---------composant info créance----------------------->
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
        const ReceivedCard = ref({})
        const readOnlyMode = ref(true)
        // expose to template and other options API hooks
        return {
            ReceivedCard,readOnlyMode
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique la route active
            receivableCardId:this.$route.params.id,

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
        axios.get(`http://${this.hostname}:3000/app/getADCard/${this.receivableCardId}`)
        .then(result => {
            this.ReceivedCard = result.data.recordset[0]
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
#cash_content,#delivery_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>