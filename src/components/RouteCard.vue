<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <route-Card-Header   :soNo="routeCardHeader['No_']" :soDesc="routeCardHeader['Motivation']" pageTitle="Fiche Trajet" 
                />
            </div>
            
<!---------Composant rubban fiche trajet----------------------->      
            <route-card-ribbon
            routeForNewCard="../NewRoute"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            componentWithCompInfo="routeCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="true"
            ></route-card-ribbon>


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



<!---------Section formulaire fiche trajet----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche trajet----------------------->                         
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
                                <input-text labelInputText="Code" :valueInputText="routeCardHeader['Code']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                <input-text labelInputText="Description" :valueInputText="routeCardHeader['Description']" :is_disabled="!readOnlyModeIsDisabled"></input-text>  

                                <input-text labelInputText="Type" :valueInputText="routeCardHeader['Route Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type" v-model="routeCardHeader['Route Type']" :option-list="optionLabelListForRouteType" v-else></input-select-basic-1> 

                                                                   
                                <input-text labelInputText="Statut" :valueInputText="routeCardHeader['Route Status']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Statut" v-model="routeCardHeader['Route Status']" :option-list="optionLabelListForRouteStatus" v-else></input-select-basic-1> 
                            </div>
                            <div class="column">

                                <input-text labelInputText="Zone départ" :valueInputText="routeCardHeader['Departure Zone']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Zone départ" v-model="routeCardHeader['Departure Zone']" @openModal="activeModalForSelectableElementList='carrierList';" v-else></input-select>
                                
                                <input-text labelInputText="Zone arrivée" :valueInputText="routeCardHeader['Arrival Zone']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Zone arrivée" v-model="routeCardHeader['Arrival Zone']" @openModal="activeModalForSelectableElementList='carrierList';" v-else></input-select>
                                
                                <input-text labelInputText="Kilométrage total" v-model="routeCardHeader['Total Distance(Km)']" :valueInputText="routeCardHeader['Total Distance(Km)']"  :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Durée moyenne" v-model="routeCardHeader['Average Duration']" :valueInputText="routeCardHeader['Average Duration']"  :is_disabled="!readOnlyModeIsDisabled"></input-text>

                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section ongle 2 formulaire fiche trajet----------------------->
                    <div id="order" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('order_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Ordre à transporter</span>
                                    </a>
                                    <a @click="expand('order_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                        <span>Ordre à transporter</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="order_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"></th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Numéro Ordre</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Client</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Adresse</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Préférence horaire</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Sens</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Numéro Ligne</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Article</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Conditionnement</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité prévue</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Temps déchargement</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Volume totale</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Poids total</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité réalisé</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Ecart </th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Motif écart</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type anomalie</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description anomalie</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of transportOrderInfo" :key="index" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                             <td class="has-text-left">{{elt['Order No_'] }}</td>
                                             <td class="has-text-left">{{elt['Customer No_'] }}</td>
                                             <td class="has-text-left">{{elt['Address Code'] }}</td>
                                             <td class="has-text-left">{{elt['Time preference'] }}</td>
                                             <td class="has-text-left">{{elt['Transport Direction'] }} </td>
                                             <td class="has-text-left">{{elt['Line No_'] }}</td>
                                             <td class="has-text-left">{{elt['Item No_'] }}</td>
                                             <td class="has-text-left">{{elt['Unit of Mesure Code'] }}</td>
                                             <td class="has-text-left">{{elt['Quantity (Planned)'] }}</td>
                                             <td class="has-text-left">{{elt['Unloading Duration'] }}</td>
                                             <td class="has-text-left">{{elt['Total Volume (cbm)'] }}</td>
                                             <td class="has-text-left">{{elt['Total Weight (Kg)'] }}</td>
                                             <td class="has-text-left">{{elt['Quantity (Actual)'] }}</td>
                                             <td class="has-text-left">{{elt['Quantity (Gap)'] }}</td>
                                             <td class="has-text-left">{{elt['Gap Reason Code'] }}</td>
                                             <td class="has-text-left">{{elt['Anomaly Type'] }}</td>
                                             <td class="has-text-left">{{elt['Anomaly Description'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>

                </div>
<!---------composant info trajet----------------------->
                <route-info class="route-info"></route-info>

            </div>
        </div>

<!----------------------------------------------------------->       

        <modal-for-selectable-carrier-list 
            v-if="activeModalForSelectableElementList=='carrierList'" 
            :isActive="activeModalForSelectableElementList=='carrierList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCarrierListModal="(elt)=>fillCarrierInfoField(elt)">
        </modal-for-selectable-carrier-list>

    </div>    

</template>
<script>
import RouteCardHeader from './HeaderForCard.vue'
import RouteInfo from './CustomerInfo.vue'
import RouteCardRibbon from './RibbonForCard.vue'
import ModalForSelectableCarrierList from './ModalForSelectableCarrierList.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import axios from 'axios'
import { onMounted,ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'


export default {
    name:'route-card',
    components:{
        RouteCardHeader,
        RouteInfo,
        inputText,
        RouteCardRibbon,
        inputSelect,
        inputSelectBasic1,
        ModalForSelectableCarrierList
    },
    setup(){
        const routeCardHeader = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const routeCardId = useRoute().params.id

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')


        const optionLabelListForRouteStatus = ref([])
        const optionLabelListForRouteType = ref([])
      

        function getOptionLabelList(field){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Route Status]')
                    optionLabelListForRouteStatus.value=result.data.recordset
                if (field=='[Route Type]')
                    optionLabelListForRouteType.value=result.data.recordset
              
                   
    
                    console.log(result.data.recordset)
    
            }).catch(err=>console.log(err))
        }

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }

        function getRRCardInfo(){
            axios.get(`http://${hostname}:3000/app/getRPRQCard/${routeCardId}`)
            .then(result => {
                console.log(result)
                 routeCardHeader.value = result.data
            }).catch(err=>console.log(err))
        }

        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }

        function fillCarrierInfoField(carrier){
            routeCardHeader.value["Carrier"]=carrier["Carrier"]
        }

        function displayErrorMessage(errorObject){
            if(errorObject.response && errorObject.response.status){
                switch (errorObject.response.status){
                    case 401: 
                        submitting_message.value=''
                        error_message.value= errorObject.response.data.message;break;
                    case 400:
                        submitting_message.value='' 
                        error_message.value= errorObject.response.data.error.message
                        error_message_code.value= errorObject.response.data.error.code;break;
                    case 404:
                        submitting_message.value=''
                        error_message.value=errorObject.response.data.error.message
                        error_message_code.value= errorObject.response.data.error.code;break;
                    default:
                        submitting_message.value=''
                        error_message.value=errorObject.response
                }
            }
            else{
                error_message.value = errorObject.message
                error_message_code.value = errorObject.code
                console.log(errorObject)
            }
        }

        function updateRoute(rrData){
            axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.company.value}`,rrData)
            .then(() => {
                submitting_message.value=''
                success_message.value='Enregistrement réussi'
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

        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'route_modify',
                webUserName:webUserInfo.name.value,
                'No_':routeCardHeader.value['No_'],
                'Customer No_':routeCardHeader.value['Customer No_'],
                'Document No_':routeCardHeader.value['Document No_'],
                'Item No_':routeCardHeader.value[ 'Item No_'],
                'Serial No_':routeCardHeader.value['Serial No_'],
                'Created on':routeCardHeader.value['Created on'],
                'Created by':routeCardHeader.value['Created by'],
                'Reposs Source':routeCardHeader.value['Reposs Source'],
                'Motivation':routeCardHeader.value['Motivation'],
                'Reposs Status':routeCardHeader.value['Reposs Status'], 
                'Reposs Type':routeCardHeader.value['Reposs Type'],
                'Reposs Item Status':routeCardHeader.value['Reposs Item Status'],
            }
            updateRoute(formatToBCJsonData(JSData))
        }

        onMounted(() => {
            if (webUserInfo.name.value){
                getRRCardInfo()
                getOptionLabelList('[Reposs Source]')
                getOptionLabelList('[Reposs Status]')
                getOptionLabelList('[Reposs Type]')
                getOptionLabelList('[Reposs Item Status]')
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getRRCardInfo()
                    getOptionLabelList('[Reposs Source]')
                    getOptionLabelList('[Reposs Status]')
                    getOptionLabelList('[Reposs Type]')
                    getOptionLabelList('[Reposs Item Status]')
                })
                .catch(err=>console.log(err))
            }
        })



        // expose to template and other options API hooks
        return {
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            fillCarrierInfoField,
            submitForm,
            readOnlyModeIsDisabled,
            routeCardHeader,
            submitting_message,
            error_message,
            error_message_code,
            success_message,

            optionLabelListForRouteStatus,
            optionLabelListForRouteType,
        
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            routeInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.routeCardRightInfoMaxWidth,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,

            routeCardId2: this.$route.params.id2,

             //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:''
            
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('recovery')
            useNavigationTabStore().setActiveTab('customers')
            this.$router.push('/TransportOrdercard/${routeCardId2}')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
     hideOrShowComponentInfo(){
            if(this.routeInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('routeCardRightInfoMaxWidth','800px')
                this.routeInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('routeCardRightInfoMaxWidth','0px')
                this.routeInfoCompMaxWidth='0px'
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
.route-info{
    max-width: v-bind(routeInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>