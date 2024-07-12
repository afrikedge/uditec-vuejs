<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="customerCardId" :soDesc="CustomerCard.Name" pageTitle="Fiche client" />
            </div>
            
<!---------Composant rubban fiche client----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="customerCardRightInfoMaxWidth"
            ></Customer-card-ribbon>

<!---------Section formulaire fiche client----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire fiche client----------------------->                         
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
                                <input-text labelInputText="Code client" :valueInputText="CustomerCard['No_']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Nom du client" :valueInputText="CustomerCard['Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Nom de recherche" :valueInputText="CustomerCard['Search Name']" :is_disabled="readOnlyMode"></input-text>  
                                <input-text labelInputText="Type client" :valueInputText="CustomerCard['Customer Type']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Libellé Type Client" :valueInputText="CustomerCard['Customer Type Name']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Adresse:Ligne 1" :valueInputText="CustomerCard['Address']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Adresse:Ligne 2" :valueInputText="CustomerCard['Address 2']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Ville" :valueInputText="CustomerCard['City']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Téléphone" :valueInputText="CustomerCard['Phone No_']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Limit de crédit" :valueInputText="CustomerCard['Credit Limit(LCY)']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Canal de vente" :valueInputText="CustomerCard['Sales channel']" :is_disabled="readOnlyMode"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Mode de vente" :valueInputText="CustomerCard['Sales Mode']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Groupe Client" :valueInputText="CustomerCard['Customer Posting Group']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Délai de paiement" :valueInputText="CustomerCard['Payment Terms Code']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Mode de paiement" :valueInputText="CustomerCard['Payment Method Code']" :is_disabled="readOnlyMode" ></input-text>
                                <input-text labelInputText="Mode de livraison" :valueInputText="CustomerCard['Shipment Method Code']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Catégorie TVA" :valueInputText="CustomerCard['VAT Bus_Posting Group']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="% Acompte exigé" :valueInputText="CustomerCard['Prepayment_']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Encours" :valueInputText="CustomerCard['Balance Amount']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Encours échue" :valueInputText="CustomerCard['Amount Due']" :is_disabled="readOnlyMode"></input-text>
                                <input-text labelInputText="Contact principal" :valueInputText="CustomerCard['Primary Contact No_']" :is_disabled="readOnlyMode"></input-text> 
                                <input-text labelInputText="Contrat AGP" :valueInputText="CustomerCard['']" :is_disabled="true"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section onglet 2 formulaire fiche client----------------------->  
                    <div id="revisionRequest" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('revision_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Demande de révision</span>
                                    </a>
                                    <a @click="expand('revision_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                        <span>Demande de révision</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="revision_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"></th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° demande</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code client</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom du client</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de vente</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Conditions de paiement</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Limite de crédit</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de paiement</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Régime TVA</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">% Acompte exigé</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Niveau de risque</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of revisionCustomerInfo" :key="index" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                             <td class="has-text-left">{{elt['Revision No_'] }}</td>
                                             <td class="has-text-left">{{elt['Approval Status'] }}</td>
                                             <td class="has-text-left">{{elt['[Customer No_'] }}</td>
                                             <td class="has-text-left">{{elt['Name'] }}</td>
                                             <td class="has-text-left">{{elt['Sales Mode'] }} </td>
                                             <td class="has-text-left">{{elt['Payment Terms Code'] }}</td>
                                             <td class="has-text-left">{{elt['Credit limit (LCY)'] }}</td>
                                             <td class="has-text-left">{{elt['Payment Method Code'] }}</td>
                                             <td class="has-text-left">{{elt['VAT Bus_ Posting Group'] }}</td>
                                             <td class="has-text-left">{{elt['Prepayment _'] }}</td>
                                             <td class="has-text-left">{{elt['Risk Level'] }}</td>
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
import axios from 'axios'
import { onMounted,onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRoute } from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
export default {
    name:'customer-card',
    components:{
        CustomerCardHeader,CustomerInfo,inputText,CustomerCardRibbon
    },
    setup(){
        const CustomerCard = ref({})
        const revisionCustomerInfo = ref([])
        const customerCardId = ref('')
        const readOnlyMode = ref(true)
        //nom de l'hote dans l'url 
        const hostname = window.location.hostname
        const route = useRoute()

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }




        function getCustomerCardInfo(){
         
         axios.get(`http://${hostname}:3000/app/getCustomerCard/${customerCardId.value}`)
         .then(result => {
             
            CustomerCard.value = result.data.recordset[0];
            getrevisionRequestInfo();
         }).catch(err=>console.log(err))
     }

        function getrevisionRequestInfo(){
        axios.get(`http://localhost:3000/app/getApprovalFlow?documentNo==0001`)
        .then(res =>{
            console.log(res);
            if(new Array(res.data[0].length>=0)){
                revisionCustomerInfo.value = res.data
            }
        })
        .catch((err) => {
            console.log(err)
        })
      }

      onMounted(() => {
            if (webUserInfo.name.value){
                getCustomerCardInfo()
             
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getCustomerCardInfo()
                })
                .catch(err=>console.log(err))
            }
        })

        onBeforeMount(()=>{
            if(route.params.id){
                customerCardId.value = route.params.id
                
            }
        })
        // expose to template and other options API hooks
        return {
            CustomerCard,
            readOnlyMode,
            revisionCustomerInfo,
            getrevisionRequestInfo
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique la route active
            customerCardId:this.$route.params.id,

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
   
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#revision_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>