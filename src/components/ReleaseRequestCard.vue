<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <release-card-Header :soNo="ReleaseCard['No_']" :soDesc="ReleaseCard['Customer No_']"
                @onGoingBackToList='goBackToList'
                pageTitle="Fiche demande déblocage" />
            </div>
            
<!---------Composant rubban fiche demande déblocage----------------------->      
            <release-card-ribbon
                @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
                @onValidatingCard="submitValidationCard(8)"
                @onValidatingWithCondCard="submitValidationCard(7)"
                @onRejectingCard="submitValidationCard(10)"
                componentWithCompInfo="newdiscoundRightInfoMaxWidth"
                :readOnlyModeIsDisabled="false "
                :validateBtnIsDisabled="false || ReleaseCard['Approval Status']!==6"
                :validateWithCondBtnIsDisabled="false || ReleaseCard['Approval Status']!==6"
                :rejectBtnIsDisabled="false || ReleaseCard['Approval Status']!==6"
            ></release-card-ribbon>

<!---------Composant message d'enregistrement en cours ou d'erreur ou de success----------------------->      
            <article v-if="submitting_message" class="" >
                <span class="icon">
                    <i class="fas fa-spinner fa-pulse"></i>
                </span>
                <span class="subtitle is-7"> {{ submitting_message }} </span>
            </article>

            <article v-if="error_message" class="message is-danger shadow" >
                <div class="message-header">
                    <p class="is-size-7">
                        <span class="icon has-text-danger">
                        <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        Error Message
                    </p>
                    <button class="delete" aria-label="delete" @click="error_message='';error_message_code=''"></button>
                </div>
                <div class="message-body is-size-7">
                    <span> {{ error_message }}</span><br>
                    <span v-if="error_message_code"> Code erreur: {{ error_message_code }}</span>
                </div>
            </article>

            <article v-if="success_message" class="message is-primary shadow">
                <div class="message-header">
                        <span class="subtitle is-7 m-0 has-text-white"> 
                            <span class="icon ">
                                <i class="fas fa-check"></i>
                            </span>
                            {{ success_message }}
                        </span>
                    <button class="delete" aria-label="delete" @click="success_message=''"></button>
                </div>
            </article>

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
                                
                                <input-text labelInputText="N° Client" :valueInputText="ReleaseCard['Customer No_']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Gestionnaire" :valueInputText="ReleaseCard['Sales person Code']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Statut" :valueInputText="ReleaseCard['Approval Status']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Limite de crédit" :valueInputText="ReleaseCard['Credit Limit (LCY)']" :is_disabled="true"></input-text>
                                <input-text labelInputText="Encours " :valueInputText="ReleaseCard['Balance Amount']" :is_disabled="true"></input-text>
                            </div>
                            <div class="column">
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
                                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;"></th>
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
                                            <tr :id="index" v-for="(elt,index) of  releaseHistoryInfo" :key="index">
                                                <td class="has-text-left has-background-light">
                                                    <span class="icon">
                                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                                    </span>
                                                </td>
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
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;"></th>
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
                                        <tr :id="index" v-for="(elt,index) of  releaseTrackingInfo" :key="index">
                                        <td class="has-text-left has-background-light">
                                            <span class="icon">
                                                <i class="fas fa-arrow-right has-text-grey"></i>
                                            </span>
                                        </td>
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

        

    </div>    
</template>
<script>
import ReleaseCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import ReleaseCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import axios from 'axios'
import { onBeforeMount,ref,onMounted, watch } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRoute,useRouter } from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
export default {
    name:'release-request-card',
    components:{
        ReleaseCardHeader,
        CustomerInfo,inputText,
        ReleaseCardRibbon,
    },
    setup(){
        const ReleaseCard = ref({})
        const ReleaseCardLine = ref([])
        const releaseHistoryInfo = ref([])
        const releaseTrackingInfo = ref([])
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const route = useRoute()
        const router = useRouter()

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')

        
        function getRRQCardInfo(){
            axios.get(`http://${hostname}:5000/app/getSOUnlockingCard?documentNo=${route.query.documentNo}`)
            .then(result => {
                console.log(result.data[0])
                ReleaseCard.value = result.data[0]
                getHistoricalInfo(ReleaseCard.value['Customer No_']);
                getTrackingInfo();
            }).catch(err=>console.log(err))
        }

        function getHistoricalInfo(customerId){
          axios.get(`http://localhost:5000/app/getCUHList?customerId=${customerId}`)
          .then(res =>{
              if (new Array(res.data[0]).length>=0){
                releaseHistoryInfo.value =  res.data
              }
          })
          .catch((err) => {
              console.log(err)
          })
      }

      function getTrackingInfo(){
        axios.get(`http://localhost:5000/app/getApprovalFlow?documentNo=${route.query.documentNo}`)
        .then(res =>{
            console.log(res);
            if(new Array(res.data[0].length>=0)){
                releaseTrackingInfo.value = res.data
            }
        })
        .catch((err) => {
            console.log(err)
        })
      }

    //   function displayErrorMessage(errorObject){
    //         if(errorObject.response && errorObject.response.status){
    //             switch (errorObject.response.status){
    //                 case 401: 
    //                     submitting_message.value=''
    //                     error_message.value= errorObject.response.data.message;break;
    //                 case 400:
    //                     submitting_message.value='' 
    //                     error_message.value= errorObject.response.data.error.message
    //                     error_message_code.value= errorObject.response.data.error.code;break;
    //                 case 404:
    //                     submitting_message.value=''
    //                     error_message.value=errorObject.response.data.error.message
    //                     error_message_code.value= errorObject.response.data.error.code;break;
    //                 default:
    //                     submitting_message.value=''
    //                     error_message.value=errorObject.response
    //             }
    //         }
    //         else{
    //             error_message.value = errorObject.message
    //             error_message_code.value = errorObject.code
    //             console.log(errorObject)
    //         }
    //     }

    function displayErrorMessage(errorObject){
            submitting_message.value = ''
            if(errorObject.response){
                if(errorObject.response.data){
                    error_message.value = JSON.stringify(errorObject.response.data)
                }else{
                    error_message.value = JSON.stringify(errorObject.response)
                }
            }
            else{
                error_message.value = JSON.stringify(errorObject)
            }
        }

        function updateApprovalStatus(rrData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,rrData)
            .then(() => {
                submitting_message.value=''
                success_message.value='Mise à jour réussie'
                error_message.value=''
                setTimeout(()=>success_message.value='',5000)
                readOnlyModeIsDisabled.value=false
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
        }
        
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            return {data:JSONDataToSend}
        }

        function submitValidationCard(approvalStatus){
            submitting_message.value='Mise à jour du document en cours'
            const JSData = {
                Parameter:'request_validate',
                webUserName:useWebUserInfoStore().name,
                'No_':ReleaseCard.value['No_'],
                'Approval Status':approvalStatus,
                'Request Type':ReleaseCard.value['Request Type'],              
            }
            updateApprovalStatus(formatToBCJsonData(JSData))
        }       
        


        onMounted(() => {
            let userCustomerData = window.localStorage.getItem("userCustomerData");
            if(userCustomerData){
                let userCustomerDataObjet = JSON.parse(userCustomerData)
                useWebUserInfoStore().fillWebUserCustomerInfo(userCustomerDataObjet)
            }
            getRRQCardInfo()
        })

        onBeforeMount(()=>{
            if(useWebUserInfoStore().name==''){
                let userData = window.localStorage.getItem("userData");
                if(!userData){
                    router.push('/login')
                }else{
                    let userDataObjet = JSON.parse(userData)
                    useWebUserInfoStore().fillWebUserInfo(userDataObjet)
                }
            }
        })
        watch(success_message, () => {
            readOnlyModeIsDisabled.value=false
            getRRQCardInfo()
        })

        // expose to template and other options API hooks
        return {
            ReleaseCard,
            ReleaseCardLine,
            getHistoricalInfo,
            getTrackingInfo,
            releaseHistoryInfo,
            releaseTrackingInfo,
            submitValidationCard,
            submitting_message,
            error_message,
            error_message_code,
            success_message,
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
            useNavigationTabStore().setActiveGroup('validation')
            useNavigationTabStore().setActiveTab('soUnlocking')
            this.$router.push('/')
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