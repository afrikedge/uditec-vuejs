<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Service-Card-Header   :soNo="serviceCard['No_']" :soDesc="serviceCard['Customer No_']"
                @onGoingBackToList='goBackToList'
                pageTitle="Fiche Demande service" />
            </div>
            
<!---------Composant rubban fiche demande service----------------------->      
            <Service-card-ribbon
            routeForNewCard="../NewServiceRequest"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            componentWithCompInfo="orderCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
          
            ></Service-card-ribbon>

<!---------Section formulaire fiche demande service----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche demande service----------------------->                         
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
                                <input-text labelInputText="Numéro" :valueInputText="serviceCard['No_']" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Statut" :valueInputText="serviceCard['Service Request Status']" :is_disabled="true"></input-text>
                                

                                <input-text labelInputText="Client" :valueInputText="serviceCard['Customer No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Client" v-model="serviceCard['Customer No_']" @openModal="activeModalForSelectableElementList='customerList';" v-else></input-select>
                               
                                <input-text labelInputText="Sous garantie" :valueInputText="serviceCard['Warranty Status']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                                
                                <input-text labelInputText="Contrat" :valueInputText="serviceCard['Contrat No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Contrat" v-model="serviceCard['Contrat No_']" @openModal="activeModalForSelectableElementList='contractList';" v-else></input-select>
                               
                                <input-text labelInputText="Article" :valueInputText="serviceCard['Item No_']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Article" v-model="serviceCard['Item No_']" @openModal="activeModalForSelectableElementList='itemList';" v-else></input-select>
                               
                            </div>
                            <div class="column">
                                
                                <input-text labelInputText="Référence" :valueInputText="serviceCard['Reference']" :is_disabled="!readOnlyModeIsDisabled"></input-text>  
                               
                                <input-date labelInputText="Date fin garantie" v-model="WarrantyEndDate" :valueInputText="formatDateHour(serviceCard['Warranty End Date'])" :is_disabled="!readOnlyModeIsDisabled"></input-date>

                                <input-date labelInputText="Crée le" v-model="CreatedOn" :valueInputText="formatDateHour(serviceCard['Created On'])" :is_disabled="!readOnlyModeIsDisabled"></input-date>
   
                                <input-text labelInputText="Crée par" :valueInputText="serviceCard['Created By']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Crée par" v-model="serviceCard['Created By']" @openModal="activeModalForSelectableElementList='externalUserList';" v-else></input-select>

                                <input-date labelInputText="Clôturé le" v-model="ClosedOn" :valueInputText="formatDate(serviceCard['Closed On'])" :is_disabled="!readOnlyModeIsDisabled"></input-date>
                               
                                <input-text labelInputText="Clôturé par" :valueInputText="serviceCard['Closed By']" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Clôturé par" v-model="serviceCard['Closed By']" @openModal="activeModalForSelectableElementList='externalUserList';" v-else></input-select>
                               
                                
                            </div>
                        </div>                    
                    </div>
                    <br><br>
<!---------sous-Section ongle 2 formulaire fiche  demande service----------------------->
                    <div id="movement" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('movement_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Mouvement</span>
                                    </a>
                                    <a @click="expand('movement_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                        <span>Mouvement</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="movement_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"></th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type mouvement</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Magasin Origine</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Emplacement Origine</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Magasin destination</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Emplacement Destination</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of serviceRequestInfo" :key="index" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                             <td class="has-text-left">{{formatDate(elt['Movement Date']) }}</td>
                                             <td class="has-text-left">{{elt['Movement Type'] }}</td>
                                             <td class="has-text-left">{{elt['From Location Code'] }}</td>
                                             <td class="has-text-left">{{elt['From Bin Code'] }}</td>
                                             <td class="has-text-left">{{elt['To Location Code'] }} </td>
                                             <td class="has-text-left">{{elt['To Bin Code'] }}</td>
                                             <td class="has-text-left">{{elt['Movement Description'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>
<!---------sous-Section ongle 3 formulaire fiche demande service----------------------->
                    <div id="replacementpiece" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet3_expanded}">
                            <div :class="{'columns':!onglet3_expanded,'p-3':onglet3_expanded,'has-border-bottom-grey':onglet3_expanded,'has-border-bottom':!onglet3_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('replacementpiece_content');onglet3_expanded=!onglet3_expanded" v-if="onglet3_expanded">
                                        <span>Pièces de rechange</span>
                                    </a>
                                    <a @click="expand('replacementpiece_content');onglet3_expanded=!onglet3_expanded" v-if="!onglet3_expanded">
                                        <span>Pièces de rechange</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="replacementpiece_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"></th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Article</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Désignation</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut consommation</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Utilisation</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of serviceRequestInfo" :key="index" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                             <td class="has-text-left">{{elt['Item No_'] }}</td>
                                             <td class="has-text-left">{{elt['Description'] }}</td>
                                             <td class="has-text-left">{{elt['Unit of Measure Code'] }}</td>
                                             <td class="has-text-left">{{elt['Quantity'] }}</td>
                                             <td class="has-text-left">{{elt['Usage Status'] }} </td>
                                             <td class="has-text-left">{{elt['Usage'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>
<!---------sous-Section ongle 4 formulaire fiche demande service----------------------->
                    <div id="imperfectpiece" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet4_expanded}">
                            <div :class="{'columns':!onglet4_expanded,'p-3':onglet4_expanded,'has-border-bottom-grey':onglet4_expanded,'has-border-bottom':!onglet4_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('imperfectpiece_content');onglet4_expanded=!onglet4_expanded" v-if="onglet4_expanded">
                                        <span>Pièces défectueuses</span>
                                    </a>
                                    <a @click="expand('imperfectpiece_content');onglet4_expanded=!onglet4_expanded" v-if="!onglet4_expanded">
                                        <span>Pièces défectueuses</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="imperfectpiece_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"></th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Article</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Désignation</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut consommation</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Utilisation</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of serviceRequestInfo" :key="index" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                             <td class="has-text-left">{{elt['Item No_'] }}</td>
                                             <td class="has-text-left">{{elt['Description'] }}</td>
                                             <td class="has-text-left">{{elt['Unit of Measure Code'] }}</td>
                                             <td class="has-text-left">{{elt['Quantity'] }}</td>
                                             <td class="has-text-left">{{elt['Usage Status'] }} </td>
                                             <td class="has-text-left">{{elt['Usage'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>
<!---------sous-Section ongle 5 formulaire fiche demande service----------------------->
                    <div id="valorization" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet5_expanded}">
                            <div :class="{'columns':!onglet5_expanded,'p-3':onglet5_expanded,'has-border-bottom-grey':onglet5_expanded,'has-border-bottom':!onglet5_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('valorization_content');onglet5_expanded=!onglet5_expanded" v-if="onglet5_expanded">
                                        <span>Valorisation</span>
                                    </a>
                                    <a @click="expand('valorization_content');onglet5_expanded=!onglet5_expanded" v-if="!onglet5_expanded">
                                        <span>Valorisation</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="valorization_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"></th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document Type</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document Date</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Document Amount</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Processing Status</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of serviceRequestInfo" :key="index" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                             <td class="has-text-left">{{elt['Document Type'] }}</td>
                                             <td class="has-text-left">{{elt['Document Date'] }}</td>
                                             <td class="has-text-left">{{elt['Document Amount'] }}</td>
                                             <td class="has-text-left">{{elt['Processing Status'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>
<!---------sous-Section ongle 6 formulaire fiche demande service----------------------->
                    <div id="assignment" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet6_expanded}">
                            <div :class="{'columns':!onglet6_expanded,'p-3':onglet6_expanded,'has-border-bottom-grey':onglet6_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('assignment_content');onglet6_expanded=!onglet6_expanded" v-if="onglet6_expanded">
                                        <span>Affectation</span>
                                    </a>
                                    <a @click="expand('assignment_content');onglet6_expanded=!onglet6_expanded" v-if="!onglet6_expanded">
                                        <span>Affectation</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="assignment_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;"></th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date affectation</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Affecté par</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut avant</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Affecté à</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut Après</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Notes</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date début</th>
                                           <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Délai</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of serviceRequestInfo" :key="index" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                             <td class="has-text-left">{{elt['Assigned On'] }}</td>
                                             <td class="has-text-left">{{elt['Assigned By'] }}</td>
                                             <td class="has-text-left">{{elt['Current Status'] }}</td>
                                             <td class="has-text-left">{{elt['Assigned To'] }}</td>
                                             <td class="has-text-left">{{elt['Next Status'] }}</td>
                                             <td class="has-text-left">{{elt['Notes'] }}</td>
                                             <td class="has-text-left">{{elt['Starting Date'] }}</td>
                                             <td class="has-text-left">{{elt['Deadline'] }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>
                   

   
                </div>
<!---------composant info demande service----------------------->
                <service-info class="service-info"></service-info>

            </div>
        </div>

<!----------------------------------------------------------->       

        <modal-for-selectable-customer-list 
            v-if="activeModalForSelectableElementList=='customerList'"  
            :isActive="activeModalForSelectableElementList=='customerList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableCustomerListModal="(elt)=>fillCustomerInfoField(elt)">
        </modal-for-selectable-customer-list>

        <modal-for-selectable-warranty-contract-list 
            v-if="activeModalForSelectableElementList=='contractList'"  
            :isActive="activeModalForSelectableElementList=='contractList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableWarrantyContractListModal="(elt)=>fillContractInfoField(elt)">
        </modal-for-selectable-warranty-contract-list>

        <modal-for-selectable-external-user-list 
            v-if="activeModalForSelectableElementList=='externalUserList'"  
            :isActive="activeModalForSelectableElementList=='externalUserList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableUserListModal="(elt)=>fillExternalUserInfoField(elt)">
        </modal-for-selectable-external-user-list>

        <modal-for-selectable-item-list 
            v-if="activeModalForSelectableElementList=='itemList'" 
            :isActive="activeModalForSelectableElementList=='itemList'" 
            @closeModal="activeModalForSelectableElementList=''">
        </modal-for-selectable-item-list>
        
       

    </div>    

</template>
<script>
import ServiceCardHeader from './HeaderForCard.vue'
import ServiceInfo from './CustomerInfo.vue'
import ServiceCardRibbon from './RibbonForCard.vue'
import ModalForSelectableCustomerList from './ModalForSelectableCustomerList.vue'
import ModalForSelectableWarrantyContractList from './ModalForSelectableWarrantyContractList.vue'
import ModalForSelectableItemList from './ModalForSelectableItemList.vue'
import ModalForSelectableExternalUserList from './ModalForSelectableExternalUserList.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputDate from './input/input-date.vue'
import axios from 'axios'
import { onMounted,onBeforeMount,ref,watch } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useRoute } from 'vue-router'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'

export default {
    name:'service-request-card',
    components:{
        ServiceCardHeader,ServiceInfo,
        inputText,
        ServiceCardRibbon,
        inputSelect,
        inputDate,
        ModalForSelectableCustomerList,
        ModalForSelectableWarrantyContractList,
        ModalForSelectableItemList,
        ModalForSelectableExternalUserList
        

    },
    setup(){
        const serviceCard = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const  serviceRequestInfo = ref([])
        
        
        //nom de l'hote dans l'url 
        const hostname = window.location.hostname
        const route = useRoute()

        //indique la route active
        const serviceRequestNo = ref('')

        const dateInfo = {
            WarrantyEndDate: ref(''),
            CreatedOn: ref(''),
            ClosedOn: ref(''),
        
        }
        
        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }
        
        //variable de success serveur
        let success_message=ref('')
        let is_convertSQ_success = ref(false)

        function fillCustomerInfoField(customer){
            serviceCard.value["Sell-to Customer No_"]=customer["No_"]
            serviceCard.value["Sell-to Customer Name"]=customer["Name"]
            serviceCard.value["Sell-to Contact No_"]=customer["Primary Contact No_"]
            serviceCard.value["Payment Method Code"]=customer['Payment Method Code']
            serviceCard.value["Payment Terms Code"]=customer['Payment Terms Code']
            serviceCard.value["Prepayment _"]=customer['Prepayment _']
            serviceCard.value["Shipment Method Code"]=customer['Shipment Method Code']
            serviceCard.value["Customer Posting Group"]=customer['Customer Posting Group']
            serviceCard.value["Gen_ Bus_ Posting Group"]=customer['Gen_ Bus_ Posting Group']
            serviceCard.value["VAT Bus_ Posting Group"]=customer['VAT Bus_ Posting Group']
            serviceCard.value["Customer Price Group"]=customer['Customer Price Group']
            serviceCard.value["Ship-to Code"]=customer['Ship-to Code']
            serviceCard.value["Sales Mode"]=customer['Sales Mode']
               
        }

        function fillContractInfoField(contract){
            serviceCard.value["Contrat No_"]=contract["No_"]
        }

        function fillExternalUserInfoField(user){
            serviceCard.value["Created By"]=user["No_"]
            serviceCard.value["Closed By"]=user["No_"]
        }
     
          
        function getServiceCardInfo(){
         
            axios.get(`http://${hostname}:3000/app/getServiceRequestCard?serviceNo=${serviceRequestNo.value}`)
            .then(result => {
                // console.log(result.data)
                serviceCard.value = result.data.result[0];
                getMovementInfo();
                dateInfo.WarrantyEndDate.value = getISODate(serviceCard.value["Warranty End Date"])
                dateInfo.CreatedOn.value = getISODate(serviceCard.value["Created On"])
                dateInfo.ClosedOn.value = getISODate(serviceCard.value["Closed On"])
            }).catch(err=>console.log(err))
        }

        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }

      function getMovementInfo(){
        axios.get(`http://${hostname}:3000/app/getServiceRequestCard?serviceNo=SR24-000001`)
        .then(res =>{
            console.log(res.data.result[1]["0"]);
            if(new Array(res.data.result[0].length>=0)){
                serviceRequestInfo.value = res.data.result[1]["0"]
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


        onMounted(() => {
            if (webUserInfo.name.value){
                getServiceCardInfo()
                
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getServiceCardInfo()
                    
                    
                })
                .catch(err=>console.log(err))
            }
        })

        onBeforeMount(()=>{
            if(route.query.serviceNo){
                serviceRequestNo.value = route.query.serviceNo
                
            }
        })

        // expose to template and other options API hooks
        return {
            serviceCard,
            readOnlyModeIsDisabled,
            serviceRequestInfo,
            setReadWriteModeIsDisabled,
            setReadOnlyModeIsDisabled,
            success_message,
            getMovementInfo,
            ...dateInfo,
            getISODate,
            fillCustomerInfoField,
            fillContractInfoField,
            fillExternalUserInfoField

        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            serviceInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.orderCardRightInfoMaxWidth,

           
           

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            onglet3_expanded:true,
            onglet4_expanded:true,
            onglet5_expanded:true,
            onglet6_expanded:true,
            


            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:''
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveTab('customers')
            this.$router.push('/ServiceRequestList')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
     hideOrShowComponentInfo(){
            if(this.serviceInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('orderCardRightInfoMaxWidth','800px')
                this.serviceInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('orderCardRightInfoMaxWidth','0px')
                this.serviceInfoCompMaxWidth='0px'
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
.service-info{
    max-width: v-bind(serviceInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#movement_content,
#replacementpiece_content,#imperfectpiece_content,
#valorization_content,#assignment_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}

</style>