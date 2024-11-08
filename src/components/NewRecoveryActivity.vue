<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <new-recovery-activity-card-header soNo="Nouvelle Activité" :soDesc="recoveryActivitySubject" pageTitle="Activité recouvrement"
                @onGoingBackToList='goBackToList'
                ></new-recovery-activity-card-header>
            </div>
<!---------Composant rubban fiche activité recouvrement----------------------->      
            <new-recovery-activity-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onSubmittingForm="submitForm"
            componentWithCompInfo="newRecoveryActivityRightInfoMaxWidth"
            :readOnlyModeIsDisabled="true"
            ></new-recovery-activity-card-ribbon>

<!---------Composant message d'enregistrement en cours ou d'erreur ou de success----------------------->      
            <article v-if="submitting_message" class="" >
                <span class="icon">
                    <i class="fas fa-spinner fa-pulse"></i>
                </span>
                <span class="subtitle is-7"> Enregistrement en cours </span>
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
                                <i class="fas fa-spinner fa-pulse"></i>
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
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-select v-model="recoveryActivityAssignmentNo" labelInputText="N° Affectation" @openModal="activeModalForSelectableElementList='assignedCustomerList'"></input-select>
                                
                                <input-text labelInputText="N° Client" :valueInputText="recoveryActivityCustomerNo" :is_disabled="true"></input-text>
                                
                                <input-text labelInputText="Nom client" :valueInputText="recoveryActivityCustomerName" :is_disabled="true"></input-text> 

                                <input-select-basic-1 v-model="recoveryActivityType" labelInputText="Type" :option-list="optionLabelListForActivityType"></input-select-basic-1 > 
                                
                                <input-text v-model="recoveryActivitySubject" labelInputText="Objet"></input-text>
                                
                                <input-text v-model="recoveryActivityDescription" labelInputText="Description"></input-text>
                                
                                <input-select v-model="recoveryActivityLinked" labelInputText="Activité connexe" @openModal="activeModalForSelectableElementList='activityList'"></input-select>
                            </div>
                            <div class="column">
                                <input-datetime v-model="scheduledStartDatetime" labelInputText="Date et heure début prévue"  :is_disabled="false"></input-datetime>
                                 
                                <input-datetime v-model="scheduledEndDatetime" labelInputText="Date et heure fin prévue"  :is_disabled="false"></input-datetime>
                                
                                <input-datetime v-model="actualStartDatetime" labelInputText="Date et heure début réelle"  :is_disabled="false"></input-datetime>
                                
                                <input-datetime v-model="actualEndDatetime" labelInputText="Date et heure fin réelle"  :is_disabled="false"></input-datetime>
                                
                                <input-datetime v-model="reminderDatetime" labelInputText="Date et heure relance"  :is_disabled="false"></input-datetime>
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
                            <div id="deadlines_content" class="columns px-5 mt-5" style="max-height: 400px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"></th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type Document</th>
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
                                            <td class="has-text-left has-background-light is-narrow">{{ elt['Line No_'] }}</td>
                                            <td class="has-text-left has-background-light">{{ getOptionLabelFromList('optionLabelListForDocumentType',elt['Document Type']) }}</td>
                                            <td class="has-text-left has-background-light is-narrow">{{ elt['Document No_']  }}</td>
                                            <td class="has-text-left has-background-light is-narrow">{{ elt['Sales code']  }}</td>
                                            <td class="has-text-left has-background-light is-narrow">{{ elt['Store Code']  }}</td>
                                            <td class="has-text-left has-background-light">{{ formatDate(elt['Posting Date']) }}</td>
                                            <td class="has-text-left has-background-light">{{ formatDate(elt['Due Date']) }}</td>
                                            <td class="has-text-left has-background-light">{{ elt['Description']  }}</td>
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

<!---------composant info activité recouvrement----------------------->
                <customer-info class="customer-info"></customer-info>

            </div>
        </div>

<!---------------------------------------------->
        <modal-for-selectable-assigned-customer-list 
            v-if="activeModalForSelectableElementList=='assignedCustomerList'"  
            :isActive="activeModalForSelectableElementList=='assignedCustomerList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableAssignedCustomerListModal="(elt)=>fillAssignedCustomerInfoField(elt)">
        </modal-for-selectable-assigned-customer-list>

        <modal-for-selectable-activity-list 
            v-if="activeModalForSelectableElementList=='activityList'" 
            :isActive="activeModalForSelectableElementList=='activityList'"
            @closeModal="activeModalForSelectableElementList=''"
            @onGettingLineFromSelectableActivityListModal="(elt)=>fillActivityInfoField(elt)">
        </modal-for-selectable-activity-list>





    </div>     
</template>
<script>
import NewRecoveryActivityCardHeader from './HeaderForCard.vue'
import NewRecoveryActivityCardRibbon from './RibbonForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import inputText from './input/input-text.vue'
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import inputDatetime from './input/input-datetime.vue'
import ModalForSelectableAssignedCustomerList from './ModalForSelectableAssignedCustomerList.vue'
import ModalForSelectableActivityList from './ModalForSelectableActivityList.vue'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import  axios  from 'axios'
import { useRouter } from 'vue-router'



export default {
    name:'new-recovery-activity-request',
    components:{
        NewRecoveryActivityCardHeader,NewRecoveryActivityCardRibbon,CustomerInfo,
        inputText,inputSelect,inputSelectBasic1,inputDatetime,
        ModalForSelectableAssignedCustomerList,ModalForSelectableActivityList,
        
    },
    data(){
        return{

            //list:[],
            //taille (hauteur) initiale des onglets de la page
            height:'700px',

            //taille (largeur) initiale du composant custumerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.newquoteRightInfoMaxWidth,

            //indique si les onglets de la page sont réduits ou pas
            onglet1_expanded:true,
            onglet2_expanded:true,
            
            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

            selected_line:'',

        }
    },
    setup(){

 /////////////DATAS//////////////////////////   
            
            const router = useRouter()
            const currentDate = getISOLocaleDate(new Date().toISOString())

            //nom de l'hote dans l'url 
            const hostname = window.location.hostname;

            //variable de soumission forme
            let submitting_message=ref('') 

            //variable d'erreur serveur
            let error_message=ref('')
            let error_message_code =ref('')

            //variable de success serveur
            let success_message=ref('')

            //sac à label de notre fiche
            const labelBag = {
                optionLabelListForActivityType : ref([]),
                optionLabelListForDocumentType : ref([]),
            }

             //fonction pour afficher le label pour une valeur donnée d'une liste
            function getOptionLabelFromList(listToGetLabel,valueToGetLabel){
                if(labelBag[listToGetLabel].value[valueToGetLabel])
                    return labelBag[listToGetLabel].value[valueToGetLabel].Description
                else
                    return ''
            }

            //fonction pour récupérer la liste des label et valeur pour un champ donné
            function getOptionLabelList(fieldToGetLabelList,listToSetLabelList){
                axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
                .then(result => {
                    labelBag[listToSetLabelList].value=result.data.recordset
                }).catch(err=>console.log(err))
            }
            
            //objet contenant nos champs d'entête
            const recoveryActivityCardHeaderInfo = {
                recoveryActivityAssignmentNo : ref(''),
                recoveryActivityCustomerNo : ref(''),
                recoveryActivityCustomerName : ref(''),
                recoveryActivityType : ref(0),
                recoveryActivitySubject : ref(''),
                recoveryActivityDescription : ref(''),
                recoveryActivityLinked : ref(''),
            }

            //liste contenant les échéances
            const recoveryActivityDeadLines = ref([])

            //objet contenant nos champs de date 
            const datetimeInfo = {
                scheduledStartDatetime: ref(currentDate),
                scheduledEndDatetime:ref(currentDate),
                actualStartDatetime:ref(currentDate),
                actualEndDatetime:ref(currentDate),
                reminderDatetime:ref(currentDate),
            }


//fonction pour remplir les champs avec des listes sélectionnables
            function fillAssignedCustomerInfoField(assignedCustomer){
                recoveryActivityCardHeaderInfo.recoveryActivityAssignmentNo.value = assignedCustomer['No_']
                recoveryActivityCardHeaderInfo.recoveryActivityCustomerNo.value = assignedCustomer['Customer No_']
                recoveryActivityCardHeaderInfo.recoveryActivityCustomerName.value = assignedCustomer['Name']
            }

            function fillActivityInfoField(activity){
                recoveryActivityCardHeaderInfo.recoveryActivityLinked.value = activity['No_']
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

            //fonction pour soumettre la création d'une activité de recouvrement
            function createRecoveryActivity(rrData){
                axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,rrData)
                .then(res => {
                    submitting_message.value=''
                    success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                    error_message.value=''
                    setTimeout(()=> router.push(`/recoveryActivityCard/${res.data.documentNo}`),3000)
                })
                .catch(err => {
                    displayErrorMessage(err)
                })
            }

            //fonction qui envoie les données aux service de bc et réceptionne et affiche la réponse ou l'erreur
            function submitForm(){
                submitting_message.value='Enregistrement en cours'
                const JSData = {
                    Parameter:'recoveryActivities_insert',
                    webUserName:useWebUserInfoStore().name,
                    'No_':'',
                    'Assignment No_':recoveryActivityCardHeaderInfo.recoveryActivityAssignmentNo.value,
                    'Customer No_':recoveryActivityCardHeaderInfo.recoveryActivityCustomerNo.value,
                    'Name':recoveryActivityCardHeaderInfo.recoveryActivityCustomerName.value,
                    'Activity Type':recoveryActivityCardHeaderInfo.recoveryActivityType.value,
                    'Subject':recoveryActivityCardHeaderInfo.recoveryActivitySubject.value,
                    'Description':recoveryActivityCardHeaderInfo.recoveryActivityDescription.value,
                    'Created on':new Date().toISOString(),
                    'Created by':useWebUserInfoStore().name,
                    'Scheduled Start Date':new Date(datetimeInfo.scheduledStartDatetime.value),
                    'Scheduled End Date':new Date(datetimeInfo.scheduledEndDatetime.value),
                    'Actual Start Date':new Date(datetimeInfo.actualStartDatetime.value), 
                    'Actual End Date':new Date(datetimeInfo.actualEndDatetime.value),
                    'Reminder Date':new Date(datetimeInfo.reminderDatetime.value),
                    'Linked Activity':recoveryActivityCardHeaderInfo.recoveryActivityLinked.value,
                    'Activity Status':0,
                    'Comment':'',
                    'Activity Level':0,
                    'Activity Feedback':'',
                    'Feedback Description':'',
                    RecoveryActivityLine : [
                        ...recoveryActivityDeadLines.value
                    ]
                }
                createRecoveryActivity(formatToBCJsonData(JSData))
            }

            //fonctions pour obtnnir les lignes de l'activité
            function getRecoveryActivityDeadLines(assignementNo){
                axios.get(`http://${hostname}:5000/app/getActivityDetails?customerId=${assignementNo}`)
                .then(result => {
                    const list = ref([])
                    let i = 0
                    list.value = result.data
                    list.value.map(x => x['Line No_'] = ++i)
                    recoveryActivityDeadLines.value=list.value
                    list.value=[]
                }).catch(err=>console.log(err))

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
                getOptionLabelList('[Activity Type]','optionLabelListForActivityType')
                getOptionLabelList('[Document Type]','optionLabelListForDocumentType')
            })

            watch(recoveryActivityCardHeaderInfo.recoveryActivityAssignmentNo, (newValue,oldValue) => {
                if(newValue && newValue!==oldValue){
                    getRecoveryActivityDeadLines(newValue)
                }
            }) 



        return{
            ...recoveryActivityCardHeaderInfo,recoveryActivityDeadLines,
            submitForm,
            error_message,error_message_code,success_message,submitting_message,
            ...labelBag,getOptionLabelFromList,
            ...datetimeInfo,
            fillActivityInfoField,fillAssignedCustomerInfoField,
            formatAmount,

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
                useNavigationTabStore().setMaxWidth('newRecoveryActivityRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newRecoveryActivityRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
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
        //////////methode pour étendre un onglet de la page
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='deadlines_content') myElt.style.maxHeight='400px'
            else myElt.style.maxHeight='700px'
        },
        ////////////methode pour reduire un onglet de la page
        collapse(id){
            const myElt=document.getElementById(id);
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
       
    }
}


</script>
<style scoped>

.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#deadlines_content{
    max-height: v-bind(height);
    overflow: hidden;
    transition: max-height 0.5s
}

.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}


</style>