<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <recovery-activity-card-header   :soNo="recoveryActivityCardHeader['No_']" :soDesc="recoveryActivityCardHeader['Name']" pageTitle="Fiche activité recouvrement" 
                @onGoingBackToList='goBackToList'/>
            </div>
            
<!---------Composant rubban fiche activité recouvrement----------------------->      
            <recovery-activity-card-ribbon
            routeForNewCard="../newRecoveryActivity"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            componentWithCompInfo="recoveryActivityCardRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="false"
            ></recovery-activity-card-ribbon>


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



<!---------Section formulaire fiche activité recouvrement----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 formulaire fiche activité recouvrement----------------------->                         
                    <div id="general">
                        <div class="columns has-border-bottom">
                            <div class="column p-0 has-text-left has-text-weight-bold">
                                <a @click="collapse('general_content');onglet1_expanded=!onglet1_expanded" v-if="onglet1_expanded">
                                    <span>Général</span>
                                </a>
                                <a @click="expand('general_content');onglet1_expanded=!onglet1_expanded" v-else>
                                    <span>Général</span>
                                    <span class="icon">
                                        <i class="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                            <div class="column py-0 has-text-right is-size-7" v-if="onglet1_expanded">Afficher plus</div>
                            <div class="column is-narrow py-0 has-text-right is-size-7" v-else>
                                <span class="has-background-grey-lighter py-2 px-3">{{ recoveryActivityCardHeader['Customer No_'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black;border-right:1px solid black;">{{ recoveryActivityCardHeader['Name'] }}</span>
                                <span class="has-background-grey-lighter py-2 px-3">{{ recoveryActivityTypeLabel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ recoveryActivityStatusLabel }}</span>
                                <span class="has-background-grey-lighter py-2 px-3" style="border-left:1px solid black">{{ formatDateHour(recoveryActivityCardHeader['Reminder Date']) }}</span>
                            </div>
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N°" :valueInputText="recoveryActivityCardHeader['No_']" :is_disabled="true" ></input-text>
                                <input-text labelInputText="N° Affectation" :valueInputText="recoveryActivityCardHeader['Assignment No_']" :is_disabled="true" ></input-text>
                                <input-text labelInputText="N° Client" :valueInputText="recoveryActivityCardHeader['Customer No_']" :is_disabled="true"></input-text>
                                <!----input-select labelInputText="N° Client" v-model="recoveryActivityCardHeader['Customer No_']" v-else></input-select---->
                                <input-text labelInputText="Nom client" :valueInputText="recoveryActivityCardHeader['Name']" :is_disabled="true"></input-text> 
                                
                                <input-text labelInputText="Contact" :valueInputText="recoveryActivityCardHeader['Contact']"  :is_disabled="true"></input-text>
                                <input-text labelInputText="Téléphone" :valueInputText="recoveryActivityCardHeader['Phone No_']"  :is_disabled="true"></input-text>
                                <input-text labelInputText="Téléphone Mobile" :valueInputText="recoveryActivityCardHeader['Mobile Phone No_']"  :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Type d'activité" :valueInputText="recoveryActivityTypeLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type d'activité" v-model="recoveryActivityCardHeader['Activity Type']" :option-list="optionLabelListForActivityType"  v-else></input-select-basic-1> 

                                <input-text labelInputText="Objet" :valueInputText="recoveryActivityCardHeader['Subject']" v-model="recoveryActivityCardHeader['Subject']" :is_disabled="!readOnlyModeIsDisabled"></input-text>

                                <input-text labelInputText="Description" :valueInputText="recoveryActivityCardHeader['Description']" v-model="recoveryActivityCardHeader['Description']" :is_disabled="!readOnlyModeIsDisabled"></input-text>                                
                                
                                <input-text labelInputText="Retour d'activité" :valueInputText="recoveryActivityCardHeader['Activity Feedback']"  :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>  
                                <input-select labelInputText="Retour d'activité" v-model="recoveryActivityCardHeader['Activity Feedback']"  @openModal="activeModalForSelectableElementList='activityFeedbackList'" v-else></input-select>
                                
                                <input-text labelInputText="Description du retour" :valueInputText="recoveryActivityCardHeader['Feedback Description']" :is_disabled="true"></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Activité connexe" :valueInputText="recoveryActivityCardHeader['Linked Activity']"  :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>  
                                <input-select labelInputText="Activité connexe" v-model="recoveryActivityCardHeader['Linked Activity']"  @openModal="activeModalForSelectableElementList='activityList'" v-else></input-select>
                                
                                
                                <input-text labelInputText="Crée le" :valueInputText="formatDateHour(recoveryActivityCardHeader['Created on'])" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Crée par" :valueInputText="recoveryActivityCardHeader['Created by']" :is_disabled="true"></input-text> 
                                
                                <input-datetime labelInputText="Date et heure début prévue" :valueInputText="formatDateHour(recoveryActivityCardHeader['Scheduled Start Date'])" v-model="scheduledStartDatetime" :is_disabled="!readOnlyModeIsDisabled"></input-datetime>

                                <input-datetime labelInputText="Date et heure fin prévue" :valueInputText="formatDateHour(recoveryActivityCardHeader['Scheduled End Date'])" v-model="scheduledEndDatetime" :is_disabled="!readOnlyModeIsDisabled"></input-datetime>

                                <input-datetime labelInputText="Date et heure début réelle" :valueInputText="formatDateHour(recoveryActivityCardHeader['Actual Start Date'])" v-model="actualStartDatetime" :is_disabled="!readOnlyModeIsDisabled"></input-datetime>

                                <input-datetime labelInputText="Date et heure fin réelle" :valueInputText="formatDateHour(recoveryActivityCardHeader['Actual End Date'])" v-model="actualEndDatetime" :is_disabled="!readOnlyModeIsDisabled"></input-datetime>
                                
                                <input-datetime labelInputText="Date et heure relance" :valueInputText="formatDateHour(recoveryActivityCardHeader['Reminder Date'])" v-model="reminderDatetime" :is_disabled="!readOnlyModeIsDisabled"></input-datetime>

                                <input-text labelInputText="Statut" :valueInputText="recoveryActivityStatusLabel" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Statut" v-model="recoveryActivityCardHeader['Activity Status']" :option-list="optionLabelListForActivityStatus"  v-else></input-select-basic-1> 

                                <input-text labelInputText="Observation" v-model="recoveryActivityCardHeader['Comment']" :valueInputText="recoveryActivityCardHeader['Comment']" :is_disabled="!readOnlyModeIsDisabled"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

<!---------sous-Section onglet 2 formulaire fiche activité recouvrement en lecture seule----------------------->                         
                    <div id="échéances">
                        <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('deadlines_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Echéances</span>
                                    </a>
                                    <a @click="expand('deadlines_content');onglet2_expanded=!onglet2_expanded" v-else>
                                        <span>Echéances</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div id="deadlines_content" class="px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">N° ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Document</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de vente</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Point de vente</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date d'échéance</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 200px;">Description</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant initial</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ouvert</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant échu</th>
                                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Mensualité</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut échéance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="'onglet2-l'+index" v-for="(elt,index) of recoveryActivityDeadLines" :key="index" @mouseover="setLineShadow('onglet2-l'+index)" @mouseout="removeLineShadow('onglet2-l'+index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td class="has-text-left has-background-light">{{ elt['Line No_'] }}</td>
                                            <td class="has-text-left has-background-light">{{ getOptionLabelFromList('optionLabelListForDocumentType',elt['Document Type'])  }}</td>
                                            <td class="has-text-left has-background-light is-narrow">{{ elt['Document No_']  }}</td>
                                            <td class="has-text-left has-background-light is-narrow">{{ elt['Sales code']  }}</td>
                                            <td class="has-text-left has-background-light is-narrow">{{ elt['Store Code']  }}</td>
                                            <td class="has-text-left has-background-light">{{ formatDate(elt['Posting Date']) }}</td>
                                            <td class="has-text-left has-background-light">{{ formatDate(elt['Due Date']) }}</td>
                                            <td class="has-text-left has-background-light is-narrow">{{ elt['Description']  }}</td>
                                            <td class="has-text-right has-background-light">{{ formatAmount(elt['Original Amount']) }}</td>
                                            <td class="has-text-right has-background-light">{{ formatAmount(elt['Remaining Amount']) }}</td>
                                            <td class="has-text-right has-background-light">{{ formatAmount(elt['Amount Due']) }}</td>
                                            <td class="has-text-right has-background-light">{{ formatAmount(elt['Installment']) }}</td>
                                            <td class="has-text-left has-background-light">{{ elt['Debt Status'] }}</td>
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
<!---------------------------------------------->

        <modal-for-selectable-activity-list 
            v-if="activeModalForSelectableElementList=='activityList'" 
            :isActive="activeModalForSelectableElementList=='activityList'"
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableActivityListModal="(elt)=>fillActivityInfoField(elt)">
        </modal-for-selectable-activity-list>

        <modal-for-selectable-activity-feedback-list 
            v-if="activeModalForSelectableElementList=='activityFeedbackList'" 
            :isActive="activeModalForSelectableElementList=='activityFeedbackList'"
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableActivityFeedbackListModal="(elt)=>fillActivityFeedbackInfoField(elt)">
        </modal-for-selectable-activity-feedback-list>


    </div>    

</template>
<script>
import RecoveryActivityCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import RecoveryActivityCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import inputDatetime from './input/input-datetime.vue'
import axios from 'axios'
import { computed, onBeforeMount, onMounted,ref, watch } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import ModalForSelectableActivityList from './ModalForSelectableActivityList.vue'
import ModalForSelectableActivityFeedbackList from './ModalForSelectableActivityFeedbackList.vue'



export default {
    name:'recovery-activity-card',
    components:{
        RecoveryActivityCardHeader,RecoveryActivityCardRibbon,CustomerInfo,
        inputText,inputSelectBasic1,inputSelect,inputDatetime,
        ModalForSelectableActivityList,ModalForSelectableActivityFeedbackList,
        
    },
    setup(){
        const recoveryActivityCardHeader = ref({})
        const recoveryActivityDeadLines = ref([])
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const recoveryActivityCardId = useRoute().params.id
        const router = useRouter()
        const webUserCode =  computed(() => {return useWebUserInfoStore().name }) 

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')

//fonctions pour définir la fiche sur lecture et/modification
        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }
        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
        }


        //objet contenant nos champs de date 
        const datetimeInfo = {
            scheduledStartDatetime: ref(''),
            scheduledEndDatetime:ref(''),
            actualStartDatetime:ref(''),
            actualEndDatetime:ref(''),
            reminderDatetime:ref(''),
        }

        //sac à label de notre fiche
        const labelBag = {
            recoveryActivityTypeLabel : ref(''),
            recoveryActivityStatusLabel : ref(''),
            optionLabelListForActivityType : ref([]),
            optionLabelListForActivityStatus : ref([]),
            optionLabelListForDocumentType : ref([]),
        }

        //fonction pour afficher le label pour une valeur donnée d'une liste
        function getOptionLabelFromList(listToGetLabel,valueToGetLabel){
            if(labelBag[listToGetLabel].value[valueToGetLabel])
                return labelBag[listToGetLabel].value[valueToGetLabel].Description
            else
                return ''
        }

        //fonction pour afficher le label pour une valeur donnée d'un formulaire
        function getOptionLabelFromForm(listToGetLabel,valueToGetLabel,fieldToSetLabel){
            if(labelBag[listToGetLabel].value[valueToGetLabel])
                labelBag[fieldToSetLabel].value = labelBag[listToGetLabel].value[valueToGetLabel].Description
        }

        //fonctions pour récupérer le label des champs
        // function getSingleOptionLabel(fieldToGetLabel,fieldToDisplayLabel,value){
        //     if(!isNaN(Number(value))){
        //         axios.get(`http://${hostname}:5000/app/getSingleOptionLabel?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabel}&vl=${value}`)
        //         .then(result => {
        //             labelBag[fieldToDisplayLabel].value = result.data.recordset[0][""]
        //         }).catch(err=>console.log(err))
        //     }else{
        //         labelBag[fieldToDisplayLabel].value ='champ inexistant!'
        //     }
        // }

        //fonction pour récupérer la liste des label et valeur pour un champ donné
        function getOptionLabelList(fieldToGetLabelList,listToSetLabelList){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                labelBag[listToSetLabelList].value=result.data.recordset
                if(fieldToGetLabelList=='[Activity Type]'){
                    getOptionLabelFromForm(listToSetLabelList,recoveryActivityCardHeader.value['Activity Type'],'recoveryActivityTypeLabel')
                }
                if(fieldToGetLabelList=='[Activity Status]'){
                    getOptionLabelFromForm(listToSetLabelList,recoveryActivityCardHeader.value['Activity Status'],'recoveryActivityStatusLabel')
                }
            }).catch(err=>console.log(err))
        }


//fonction pour remplir les champs avec des listes sélectionnables
        function fillActivityInfoField(activity){
            recoveryActivityCardHeader.value['Linked Activity']=activity['No_']
        }
        function fillActivityFeedbackInfoField(activityFeedback){
            recoveryActivityCardHeader.value['Activity Feedback']=activityFeedback['Code']
            recoveryActivityCardHeader.value['Feedback Description']=activityFeedback['Description']
        }
        

        //fonction de récupération des données de la fiche activité
        function getRecoveryActivityCardInfo(){
            axios.get(`http://${hostname}:5000/app/getRecoveryActivityCard?recoveryActivityNo=${recoveryActivityCardId}`)
            .then(result => {
                 recoveryActivityCardHeader.value = result.data[0]
                 getOptionLabelList('[Activity Type]','optionLabelListForActivityType')
                 getOptionLabelList('[Activity Status]','optionLabelListForActivityStatus')
                 //getSingleOptionLabel('Activity Status','recoveryActivityStatusLabel',recoveryActivityCardHeader.value["Activity Status"])
                 recoveryActivityDeadLines.value = result.data[1]
                 datetimeInfo.actualEndDatetime.value=getISOLocaleDate(recoveryActivityCardHeader.value['Actual End Date'])
                 datetimeInfo.actualStartDatetime.value=getISOLocaleDate(recoveryActivityCardHeader.value['Actual Start Date'])
                 datetimeInfo.scheduledEndDatetime.value=getISOLocaleDate(recoveryActivityCardHeader.value['Scheduled End Date'])
                 datetimeInfo.scheduledStartDatetime.value=getISOLocaleDate(recoveryActivityCardHeader.value['Scheduled Start Date'])
                 datetimeInfo.reminderDatetime.value=getISOLocaleDate(recoveryActivityCardHeader.value['Reminder Date'])
            }).catch(err=>console.log(err))
        }
        

       //fonction pour gérer les erreurs lors de l'appel d'un service de BC
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

        
//fonctions de formattage
        // function getISODate(date){
        //     if(new String(date).includes('1753')||new String(date).includes('1900'))
        //         return ''
        //     else
        //         return new Date(date).toISOString().slice(0, 19)
        // }
        function getISOLocaleDate(paramDate){
            if(paramDate){
                let date = new Date(paramDate)
                //var timeZone = - date.getTimezoneOffset() / 60
                let year = date.getFullYear()
                let month = (date.getMonth() + 1).toString().padStart(2, '0')
                let day = date.getDate().toString().padStart(2, '0')
                let localeDate = year + '-' + month + '-' + day + 'T'          
                let time = date.toLocaleTimeString()
                
                return localeDate + time
            }else{
                return ''
            }
        }
        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }
        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
            }else{
                return 0
            }
        }




        //fonction qui envoie les données à l'API et réceptionne et affiche le nouveau statut du prospect
        function updateRecoveryActivity(formattedData){
            axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,formattedData)
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
        
        
        //fonction qui envoie les données aux service de bc et réceptionne et affiche la réponse ou l'erreur
        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData = {
                Parameter:'recoveryActivities_modify',
                webUserName:useWebUserInfoStore().name,
                'No_':recoveryActivityCardHeader.value['No_'],
                'Assignment No_':recoveryActivityCardHeader.value['Assignment No_'],
                'Customer No_':recoveryActivityCardHeader.value['Customer No_'],
                'Name':recoveryActivityCardHeader.value['Name'],
                'Activity Type':recoveryActivityCardHeader.value[ 'Activity Type'],
                'Subject':recoveryActivityCardHeader.value['Subject'],
                'Description':recoveryActivityCardHeader.value['Description'],
                'Created on':recoveryActivityCardHeader.value['Created on'],
                'Created by':recoveryActivityCardHeader.value['Created by'],
                'Scheduled Start Date':new Date(datetimeInfo.scheduledStartDatetime.value).toISOString(),
                'Scheduled End Date':new Date(datetimeInfo.scheduledEndDatetime.value).toISOString(),
                'Actual Start Date':new Date(datetimeInfo.actualStartDatetime.value).toISOString(), 
                'Actual End Date':new Date(datetimeInfo.actualEndDatetime.value).toISOString(),
                'Reminder Date':new Date(datetimeInfo.reminderDatetime.value).toISOString(),
                'Linked Activity':recoveryActivityCardHeader.value['Linked Activity'],
                'Activity Status':recoveryActivityCardHeader.value['Activity Status'],
                'Comment':recoveryActivityCardHeader.value['Comment'],
                'Activity Level':recoveryActivityCardHeader.value['Activity Level'],
                'Activity Feedback':recoveryActivityCardHeader.value['Activity Feedback'],
                'Feedback Description':recoveryActivityCardHeader.value['Feedback Description'],
                RecoveryActivityLine : [
                    ...recoveryActivityDeadLines.value
                ]
            }
            updateRecoveryActivity(formatToBCJsonData(JSData))
        }

//Gestions des évènements et déclencheurs
     
        onBeforeMount(() => {
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

        onMounted(() => {
            getOptionLabelList('[Document Type]','optionLabelListForDocumentType')
            getRecoveryActivityCardInfo()
        })

        watch(success_message, () => {
            if(success_message.value)
            getRecoveryActivityCardInfo()
        })

      
        // expose to template and other options API hooks
        return {
            readOnlyModeIsDisabled,setReadOnlyModeIsDisabled,setReadWriteModeIsDisabled,
            recoveryActivityCardHeader,recoveryActivityDeadLines,
            submitting_message,error_message,error_message_code,success_message,
            ...datetimeInfo,
            ...labelBag,getOptionLabelFromList,
            fillActivityInfoField,fillActivityFeedbackInfoField,
            formatAmount,
            submitForm,useWebUserInfoStore,
            webUserCode,
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('recovery')
            useNavigationTabStore().setActiveTab('recoveryActivities')
            this.$router.push('/')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('recoveryActivityCardRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('recoveryActivityCardRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else{
                return ''
            }
        },
        formatDate(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')) return ''
                else return new Date(date).toLocaleDateString()
            }else{
                return ''
            }
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
        setLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.add('is-hovered-td')
            myElt.classList.add('shadow')
        },
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.remove('is-hovered-td')
            myElt.classList.remove('shadow')
        },
    },
}

</script>
<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content{
    max-height: 1000px;
    overflow: hidden;
    transition: max-height 0.5s
}

#deadlines_content{
    max-height: 400px;
    overflow: hidden;
    transition: max-height 0.5s
}

.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}


</style>