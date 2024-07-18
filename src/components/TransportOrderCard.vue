<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Transport-Card-Header   :soNo="transportCard['No_']" :soDesc="transportCard['Driver No_']"
                @onGoingBackToList='goBackToList'
                pageTitle="Fiche Bon de Transport" />
            </div>
            
<!---------Composant rubban fiche demande révision----------------------->      
            <Transport-card-ribbon
            routeForNewCard="../NewTransportOrder"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="orderCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
          
            ></Transport-card-ribbon>

<!---------Section formulaire fiche Bon de transport----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche Bon de transport----------------------->                         
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
                                <input-text labelInputText="Numéro" :valueInputText="transportCard['No_']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Statut" :valueInputText="transportCard['TransportOrder Status']" :is_disabled="true"></input-text>
                                

                                <input-text labelInputText="Transporteur" :valueInputText="transportCard['Carrier No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Transporteur" v-model="transportCard['Carrier No_']" @openModal="activeModalForSelectableElementList='carrierList';" v-else></input-select>
                                
                                <input-text labelInputText="Véhicule" :valueInputText="transportCard['Vehicle No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Véhicule" v-model="transportCard['Vehicle No_']" @openModal="activeModalForSelectableElementList='vehicleList';" v-else></input-select>
                                
                                <input-text labelInputText="Chauffeur" :valueInputText="transportCard[' Driver No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-select labelInputText="Chauffeur" v-model="transportCard[' Driver No_']" @openModal="activeModalForSelectableElementList='driverList';" v-else></input-select>

                                <input-text labelInputText="Trajet" :valueInputText="transportCard['Route No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Trajet" v-model="transportCard['Route No_']" @openModal="activeModalForSelectableElementList='routeList';" v-else></input-select>

                                <input-text labelInputText="Date départ prévue" :valueInputText="formatDate(transportCard['Departure Date (Planned)'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date départ prévue " v-model="DepartureDatePlanned" v-else></input-date>

                                <input-text labelInputText="Heure de départ prévue" :valueInputText="formatDateHour(transportCard['Departure Time (Planned)'])" :is_disabled="!readOnlyModeIsDisabled"></input-text>

                                <input-text labelInputText="Durée prévue" :valueInputText="transportCard['Duration (Planned)']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                
                            </div>
                            <div class="column">
                                
                                <input-text labelInputText="Date retour prévue" :valueInputText="formatDate(transportCard['Return Date (Planned)'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date retour prévue " v-model="PlannedReturnDate" v-else></input-date>

                                <input-text labelInputText="Heure retour prévue" :valueInputText="formatDateHour(transportCard['Return Time (Planned)'])" :is_disabled="!readOnlyModeIsDisabled"></input-text>  

                                <input-text labelInputText="Date départ réelle" :valueInputText="formatDate(transportCard['Departure Date (Actual)'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date départ réelle" v-model="actualDepartureDate" v-else></input-date>

                                <input-text labelInputText="Heure de départ réelle" :valueInputText="formatDateHour(transportCard['Departure Time (Actual)'])" :is_disabled="!readOnlyModeIsDisabled"></input-text>

                                <input-text labelInputText="Date retour réelle" :valueInputText="formatDate(transportCard['Return Date (Actual)'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-date labelInputText="Date retour réelle" v-model="actualReturnDate" v-else></input-date>

                                <input-text labelInputText="Heure retour réelle" :valueInputText="formatDateHour(transportCard['Return Time (Actual)'])" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Durée réelle" :valueInputText="transportCard['Duration (Actual)']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Volume utile" :valueInputText="transportCard['Useful volume (cbm)']" :is_disabled="true"></input-text> 
                                <input-text labelInputText="Charge utile" :valueInputText="transportCard['Payload (kg)']" :is_disabled="true"></input-text> 
                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section ongle 2 formulaire fiche  Bon de transport----------------------->
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
<!---------sous-Section ongle 3 formulaire fiche Bon de transport----------------------->
                    <div id="outgoing">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('outgoing_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                    <span>totaux sortants</span>
                                </a>
                                <a @click="expand('outgoing_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                    <span>totaux sortants</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="outgoing_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Nombre total de colis" :valueInputText="transportCard['Outbound Package Count']" :is_disabled="!readOnlyModeIsDisabled"  :is_readOnly="true"></input-text>
                                <input-text labelInputText="Volume total chargé" :valueInputText="transportCard['Outbound Volume Loaded (cbm)']" :is_disabled="!readOnlyModeIsDisabled"  :is_readOnly="true"></input-text>
                            </div>

                            <div class="column">
                                <input-text labelInputText="Poids total chargé" :valueInputText="transportCard['Outbound Weight Load (Kg)']" :is_disabled="!readOnlyModeIsDisabled"  :is_readOnly="true"></input-text>
                                <input-text labelInputText="Temps déchargement total prévu" :valueInputText="transportCard['Outbound Unloading Dura (Plan)']" :is_disabled="!readOnlyModeIsDisabled"  :is_readOnly="true"></input-text>
                               
                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section ongle 4 formulaire fiche Bon de transport----------------------->
                   
                    <div id="incoming">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('incoming_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                    <span>totaux entrants</span>
                                </a>
                                <a @click="expand('incoming_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                    <span>totaux entrants</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7">Afficher plus</div>
                        </div>
                        <div id="incoming_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="Nombre total de colis" :valueInputText="transportCard['Inbound Package Count']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Volume total chargé" :valueInputText="transportCard['Inbound Volume Loaded (cbm)']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                            </div>
                            <div class="column">
                                <input-text labelInputText="Poids total chargé" :valueInputText="transportCard['Inbound Weight Load (Kg)']" :is_disabled="!readOnlyModeIsDisabled"></input-text> 
                                <input-text labelInputText="Temps déchargement total prévu" :valueInputText="transportCard['Inbound Unloading Dura (Plan)']" :is_disabled="!readOnlyModeIsDisabled" ></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

   
                </div>
<!---------composant info Bon de transport----------------------->
                <transport-info class="transport-info"></transport-info>

            </div>
        </div>

<!----------------------------------------------------------->       

        <modal-for-selectable-carrier-list 
            v-if="activeModalForSelectableElementList=='carrierList'" 
            :isActive="activeModalForSelectableElementList=='carrierList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCarrierListModal="(elt)=>fillCarrierInfoField(elt)">
        </modal-for-selectable-carrier-list>
        
        <modal-for-selectable-route-list 
            v-if="activeModalForSelectableElementList=='routeList'" 
            :isActive="activeModalForSelectableElementList=='routeList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableRouteListModal="(elt)=>fillRouteInfoField(elt)">
        </modal-for-selectable-route-list>

        <modal-for-selectable-driver-list 
            v-if="activeModalForSelectableElementList=='driverList'" 
            :isActive="activeModalForSelectableElementList=='driverList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableDriverListModal="(elt)=>fillDriverInfoField(elt)">
        </modal-for-selectable-driver-list>

        <modal-for-selectable-vehicle-list 
            v-if="activeModalForSelectableElementList=='vehicleList'" 
            :isActive="activeModalForSelectableElementList=='vehicleList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableVehicleListModal="(elt)=>fillVehicleInfoField(elt)">
        </modal-for-selectable-vehicle-list>
       

    </div>    

</template>
<script>
import TransportCardHeader from './HeaderForCard.vue'
import TransportInfo from './CustomerInfo.vue'
import TransportCardRibbon from './RibbonForCard.vue'
import ModalForSelectableCarrierList from './ModalForSelectableCarrierList.vue'
import ModalForSelectableRouteList from './ModalForSelectableRouteList.vue'
import ModalForSelectableDriverList from './ModalForSelectableDriverList.vue'
import ModalForSelectableVehicleList from './ModalForSelectableVehicleList.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputDate from './input/input-date.vue'
import axios from 'axios'
import { onMounted,onBeforeMount,ref,watch } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRoute } from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'

export default {
    name:'transport-order-card',
    components:{
        TransportCardHeader,TransportInfo,
        inputText,
        TransportCardRibbon,
        inputSelect,
        inputDate,
        ModalForSelectableCarrierList,
        ModalForSelectableRouteList,
        ModalForSelectableDriverList,
        ModalForSelectableVehicleList,
        

    },
    setup(){
        const transportCard = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const transportOrderInfo = ref([])
        
        
        //nom de l'hote dans l'url 
        const hostname = window.location.hostname
        const route = useRoute()

        //indique la route active
        const transportorderNo = ref('')

        const dateInfo = {
            DepartureDatePlanned: ref(''),
            PlannedReturnDate: ref(''),
            actualDepartureDate: ref(''),
            actualReturnDate: ref(''),
        
        }
        
        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }
        
        //variable de success serveur
        let success_message=ref('')
        let is_convertSQ_success = ref(false)

     
          
        function getTransportCardInfo(){
         
            axios.get(`http://${hostname}:3000/app/getTransportOrderCard?orderNo=${transportorderNo.value}`)
            .then(result => {
                console.log(result.data)
                transportCard.value = result.data.result[0];
                getOrderInfo();
                dateInfo.DepartureDatePlanned.value = getISODate(transportCard.value["Departure Date (Planned)"])
                dateInfo.PlannedReturnDate.value = getISODate(transportCard.value["Return Date (Planned)"])
                dateInfo.actualDepartureDate.value = getISODate(transportCard.value["Departure Date (Actual)"])
                dateInfo.actualReturnDate.value = getISODate(transportCard.value["Return Date (Actual)"])
            }).catch(err=>console.log(err))
        }

        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }

      function getOrderInfo(){
        axios.get(`http://localhost:3000/app/getApprovalFlow?documentNo==0001`)
        .then(res =>{
            console.log(res);
            if(new Array(res.data[0].length>=0)){
                transportOrderInfo.value = res.data
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
      watch(success_message, () => {
            if (is_convertSQ_success.value==false){
                readOnlyModeIsDisabled.value=false
            }
        })

        function fillCarrierInfoField(carrier){
            transportCard.value["Carrier"]=carrier["Carrier"]
        }

        function fillRouteInfoField(route){
            transportCard.value["Route"]=route["Route"]
        }

        function fillDriverInfoField(driver){
            transportCard.value["Driver"]=driver["Driver"]
        }

        function fillVehicleInfoField(vehicle){
            transportCard.value["Vehicle"]=vehicle["Vehicle"]
        }

        onMounted(() => {
            if (webUserInfo.name.value){
                getTransportCardInfo()
                
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getTransportCardInfo()
                    
                    
                })
                .catch(err=>console.log(err))
            }
        })

        onBeforeMount(()=>{
            if(route.query.orderNo){
                transportorderNo.value = route.query.orderNo
                
            }
        })

        // expose to template and other options API hooks
        return {
            transportCard,
            readOnlyModeIsDisabled,
            transportOrderInfo,
            setReadWriteModeIsDisabled,
            setReadOnlyModeIsDisabled,
            success_message,
            getOrderInfo,
            ...dateInfo,
            getISODate,
            fillCarrierInfoField,
            fillRouteInfoField,
            fillDriverInfoField,
            fillVehicleInfoField,

        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.orderCardRightInfoMaxWidth,

           
           

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            


            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:''
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveTab('customers')
            this.$router.push('/TransportOrderList')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
     hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('orderCardRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('orderCardRightInfoMaxWidth','0px')
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
        },
       
    },
   
}

</script>
<style scoped>
.transport-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#outgoing_content,#incoming_content,#order_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}

</style>