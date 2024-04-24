<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <release-card-Header :soNo="'Demande déblocage N°'+ ReleaseCard['No_']" :soDesc="ReleaseCard['Customer No_']"
                @onGoingBackToList='goBackToList'
                pageTitle="Fiche demande déblocage" />
            </div>
            
<!---------Composant rubban fiche demande déblocage----------------------->      
            <release-card-ribbon
                @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
                @onCancellingUpdate="setReadWriteModeIsDisabled"
                :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            
            />

<!---------Section formulaire fiche demande déblocage----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

                <!---------sous-Section ongle 1 formulaire fiche  demande  déblocage----------------------->                         
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
                                <input-text labelInputText="N° Demande" :valueInputText="ReleaseCard['No_']" :is_disabled="true" ></input-text>
                                <input-text labelInputText="Objet" :valueInputText="ReleaseCard['Subject']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="N° Document" :valueInputText="ReleaseCard['Document No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="N° Document" v-model="ReleaseCard['Document No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select>
                                
                                <input-text labelInputText="N° Client" :valueInputText="ReleaseCard['Customer No_']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Gestionnaire" :valueInputText="ReleaseCard['Sales person Code']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Statut" :valueInputText="ReleaseCard['Approval Status']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Limite de crédit" :valueInputText="ReleaseCard['Credit Limit (LCY)']" :is_disabled="true"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Encours " :valueInputText="ReleaseCard['Balance Amount']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Encours échue" :valueInputText="ReleaseCard['Amount Due']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Pire Statut Actuel" :valueInputText="ReleaseCard['Current Worst Status']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Exposition brute" :valueInputText="ReleaseCard['Gross exposure']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Niveau de risque" :valueInputText="ReleaseCard['Risk Level']" :is_disabled="true" ></input-text>
                                <input-text labelInputText="Dépassement" :valueInputText="ReleaseCard['Exceeding Amount']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Crée le" :valueInputText="formatDateHour(ReleaseCard['Created on'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Crée par" :valueInputText="ReleaseCard['Created by']" :is_disabled="true"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>
                <!---------sous-Section ongle 2 formulaire fiche  demande  déblocage-----------------------> 
                    <div id="historical" v-if="!readOnlyModeIsDisabled">
                     <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('historical_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Historique</span>
                                    </a>
                                    <a @click="expand('historical_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                        <span>Historique</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="historical_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                               
                               <div v-if=" ReleaseCardLine.length>=0">
                                    <table class="table  is-narrow  is-fullwidth">
                                        <thead class=" my-2">
                                            <tr > 
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Mode de vente</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">N° Document</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Date document</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Montant</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Paiement</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Date paiement</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Jour(s) retard</th>
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Statut échéance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr :id="index" v-for="(elt,index) of  releaseHistoryInfo" :key="index"  >
                                                <td class="has-text-left">{{ elt['Sales Mode'] }}</td>
                                                <td class="has-text-left">{{ elt['Document No_']  }}</td>
                                                <td class="has-text-left">{{ formatDateHour(elt['Posting Date'])  }}</td>
                                                <td class="has-text-left">{{ formatDateHour(elt['Due Date'])  }}</td>
                                                <td class="has-text-left">{{ elt['Amount (LCY)'] }}</td>
                                                <td class="has-text-left">{{ elt['Payment (LCY)']  }}</td>
                                                <td class="has-text-left">{{ formatDateHour(elt['Payment Date'])  }}</td>
                                                <td class="has-text-left">{{ elt['Days late']  }}</td>
                                                <td class="has-text-left">{{ elt['Debt Status'] }}</td>
                                                
                                            </tr>
                                        </tbody>
                                    </table>
                               </div>
                               <div v-else>Il n'y'a rien à afficher</div>
                            </div>     
                     </div>
                                       
                    </div>  
                    <br><br>
                <!---------sous-Section ongle 3 formulaire fiche  demande  déblocage-----------------------> 
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
                                        <tr> 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">N° Séquence</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Mode validation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Validé le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Validé par</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Validé en tant que</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Statut Actuel</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Statut Suivant</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Commentaire</th>
                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of  ReleaseCardLine" :key="index"  >
                                        <td class="has-text-left">{{ elt['Approval Sequence'] }}</td>
                                        <td class="has-text-left">{{ elt['Approval Mode']  }}</td>
                                        <td class="has-text-left">{{ formatDateHour(elt['Approved On'])  }}</td>
                                        <td class="has-text-left">{{ elt['Approved by']  }}</td>
                                        <td class="has-text-left">{{ elt['Approved as']  }}</td>
                                        <td class="has-text-left">{{ elt['Current Status']  }}</td>
                                        <td class="has-text-left">{{ elt['Next Status']  }}</td>
                                        <td class="has-text-left">{{ elt['Comment']  }}</td>
                                        
                                    </tr>
                                    </tbody>
                                </table>
                               <!-- <div v-if=" ReleaseCardLine.length>=0">
                               </div>
                               <div v-else>Il n'y'a rien à afficher</div> -->
                            </div>     
                     </div>
                                       
                    </div>  
                    <br><br>


                </div>

<!---------composant info demande de déblocage----------------------->
                <customer-info id="customer-info"></customer-info>

            </div>
        </div>

        
<!----------------------------------------------------------->
        <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'"  
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-customer-list>
    </div>    
</template>
<script>
import ReleaseCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ReleaseCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import axios from 'axios'
import { onBeforeMount,ref,onMounted } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRoute } from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
export default {
    name:'release-request-card',
    components:{
        ReleaseCardHeader,
        CustomerInfo,inputText,
        ReleaseCardRibbon,
        inputSelect,ModalForSelectableCustomerList
    },
    setup(){
        const ReleaseCard = ref({})
        const ReleaseCardLine = ref([])
        const releaseHistoryInfo = ref([])
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const route = useRoute()
        const  releasedocumentNo = ref('')
        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }

        
        function getRRQCardInfo(){
            axios.get(`http://${hostname}:3000/app/getSOUnlockingCard?documentNo=${releasedocumentNo.value}`)
            .then(result => {
                console.log(result.data[0])
                ReleaseCard.value = result.data[0]
                getCUHListInfo()
            }).catch(err=>console.log(err))
        }

        function getCUHListInfo(){
          axios.get(`http://localhost:3000/app/getCUHList?customerId=UDT00001`)
          .then(res =>{
                console.log(res);
              if (new Array(res.data[0]).length>=0){
                releaseHistoryInfo.value =  res.data
                   
              }
          })
          .catch((err) => {
              console.log(err)
          })
      }
        
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        function fillCustomerInfoField(customer){
            ReleaseCard.value["Sell-to Customer No_"]=customer["No_"]
            ReleaseCard.value["Sell-to Customer Name"]=customer["Name"]
            ReleaseCard.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
            ReleaseCard.value["Payment Method Code"]=customer['Payment Method Code']
            ReleaseCard.value["Payment Terms Code"]=customer['Payment Terms Code']
            ReleaseCard.value["Prepayment _"]=customer['Prepayment _']
            ReleaseCard.value["Shipment Method Code"]=customer['Shipment Method Code']
            ReleaseCard.value["Customer Posting Group"]=customer['Customer Posting Group']
            ReleaseCard.value["Gen_ Bus_ Posting Group"]=customer['Gen_ Bus_ Posting Group']
            ReleaseCard.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
            ReleaseCard.value["Customer Price Group"]=customer['Customer Price Group']
            ReleaseCard.value["Ship-to Code"]=customer['Ship-to Code']
            ReleaseCard.value["Sales Mode"]=customer['Sales Mode']
        }

        onMounted(() => {
            if (webUserInfo.name.value){
                getRRQCardInfo()
             
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getRRQCardInfo()
                })
                .catch(err=>console.log(err))
            }
        })

        onBeforeMount(()=>{
            if(route.query.documentNo){
                releasedocumentNo.value = route.query.documentNo
                
            }
        })
        // expose to template and other options API hooks
        return {
            ReleaseCard,
            ReleaseCardLine,
            readOnlyModeIsDisabled,
            fillCustomerInfoField,
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            getCUHListInfo,
            releaseHistoryInfo
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,



            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            
        }
    },
    methods:{

        goBackToList(){
            useNavigationTabStore().setActiveTab('customers')
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
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else{ return ''}
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

#general_content,#historical_content,#tracking_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>