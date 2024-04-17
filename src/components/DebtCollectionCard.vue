<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="collectionCardHeader['No_']" :soDesc="collectionCardHeader['Name']" pageTitle="Fiche activité recouvrement" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban fiche activité recouvrement----------------------->      
            <Customer-card-ribbon
            routeForNewCard="../NewDebtcollection"
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            componentWithCompInfo="newdebtRightInfoMaxWidth"
            :newCardBtnIsDisabled="false"
            :editCardBtnIsDisabled="false"
            :readOnlyModeIsDisabled="readOnlyModeIsDisabled"
            :cancelEditCardBtnIsDisabled="true"
            ></Customer-card-ribbon>


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

<!---------sous-Section ongle 1 formulaire fiche activité recouvrement----------------------->                         
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
                                <input-text labelInputText="N°" :valueInputText="collectionCardHeader['No_']" :is_disabled="true" ></input-text>

                                <input-text labelInputText="N° Client" :valueInputText="collectionCardHeader['Customer No_']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="N° Client" v-model="collectionCardHeader['Customer No_']" v-else></input-select>

                                <input-text labelInputText="Nom client" :valueInputText="collectionCardHeader['Name']" :is_disabled="true"></input-text> 

                                
                                <input-text labelInputText="Type" :valueInputText="collectionCardHeader['Activity Type']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Type" v-model="collectionCardHeader['Activity Type']" :option-list="optionLabelListForActivityType"  v-else></input-select-basic-1> 



                                <input-text labelInputText="Objet" :valueInputText="collectionCardHeader['Subject']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select labelInputText="Objet" v-model="collectionCardHeader['Subject']" v-else></input-select>

                                <input-text labelInputText="Description" v-model="collectionCardHeader['Description']" :valueInputText="collectionCardHeader['Description']" :is_disabled="!readOnlyModeIsDisabled" :is_readOnly="true"></input-text>
                                <input-text labelInputText="Crée le" :valueInputText="formatDate(collectionCardHeader['Created on'])" :is_disabled="true"></input-text>
                                <input-text labelInputText="Crée par" :valueInputText="collectionCardHeader['Created by']" :is_disabled="true"></input-text> 
                            </div>
                            <div class="column">

                                <input-text labelInputText="Date et heure début prévue" :valueInputText="formatDate(collectionCardHeader['Scheduled Start Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-date labelInputText="Date et heure début prévue" v-model="scheduledStartDate" v-else :is_disabled="false"></input-date>

                                <input-text labelInputText="Date et heure fin prévue" :valueInputText="formatDate(collectionCardHeader['Scheduled End Date'])" :is_disabled="!readOnlyModeIsDisabled" v-if="!readOnlyModeIsDisabled"></input-text> 
                                <input-date labelInputText="Date et heure fin prévue" v-model="scheduledEndDate" v-else :is_disabled="false"></input-date>

                                <input-text labelInputText="Date et heure début réelle" :valueInputText="formatDate(collectionCardHeader['Actual Start Date'])" :is_disabled="true"></input-text> 

                                <input-text labelInputText="Date et heure fin réelle" :valueInputText="formatDate(collectionCardHeader['Actual End Date'])" :is_disabled="true"></input-text> 

                                <input-text labelInputText="Date et heure relance" :valueInputText="formatDate(collectionCardHeader['Reminder Date'])" :is_disabled="true"></input-text> 

                                <input-text labelInputText="Activité connexe" v-model="collectionCardHeader['Linked Activity']" :valueInputText="collectionCardHeader['Linked Activity']" :is_disabled="!readOnlyModeIsDisabled" :is_readOnly="true"></input-text> 


                                <input-text labelInputText="Statut" :valueInputText="collectionCardHeader['Activity Status']" :is_disabled="true" v-if="!readOnlyModeIsDisabled"></input-text>
                                <input-select-basic-1 labelInputText="Statut" v-model="collectionCardHeader['Activity Status']" :option-list="optionLabelListForActivityStatus" v-else></input-select-basic-1> 

                                <input-text labelInputText="Observation" v-model="collectionCardHeader['Comment']" :valueInputText="collectionCardHeader['Comment']" :is_disabled="!readOnlyModeIsDisabled" :is_readOnly="true"></input-text>
                            
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                    
                    <div id="deadline" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('deadline_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Échéances</span>
                                    </a>
                                    <a @click="expand('deadline_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
                                        <span>Échéances</span>
                                        <span class="icon">
                                            <i class="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div id="deadline_content" class="columns px-5 mt-5" style="max-height: 250px; overflow:scroll;">
                                <table class="table  is-narrow  is-fullwidth">
                                    <thead class=" my-2">
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° ligne</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Document </th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date document</th>

                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                           
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ouvert</th>

                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut échéance</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of debtCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
                                            <td class="has-text-left">{{ elt['Line No_'] }}</td>
                                            <td class="has-text-left">{{ elt['Document No_']  }}</td>
                                            <td class="has-text-left">{{ elt['Posting Date'] }}</td>
                                            <td class="has-text-left">{{ elt['Document Date'] }}</td>
                                            <td class="has-text-left">{{ elt['Description']  }}</td>
                                            <td class="has-text-left">{{ elt['Original Amount'] }}</td>
                                            <td class="has-text-left">{{ elt['Remaining Amount]'] }}</td>
                                            <td class="has-text-left">{{ elt['[Debt Status]'] }}</td>
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
import inputSelect from './input/input-select.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import inputDate from './input/input-date.vue'
import axios from 'axios'
import { onMounted,ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'


export default {
    name:'debtcollection-card',
    components:{
        CustomerCardHeader,CustomerInfo,
        inputText,inputSelectBasic1,
        CustomerCardRibbon,inputSelect,
        inputDate
    },
    setup(){
        const collectionCardHeader = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const collectionCardId = useRoute().params.id

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')

        
        
        const optionLabelListForActivityType = ref([])
        const optionLabelListForActivityStatus = ref([])

        

       

        const dateInfo = {
            scheduledStartDate: ref(''),
            scheduledEndDate:ref(''),
            shipRequestedDate:ref(''),
            promisedDeliveryDate:ref('')
        }

        function getOptionLabelList(field){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                
                if (field=='[Activity Type]')
                optionLabelListForActivityType.value=result.data.recordset

                 if (field=='[Activity Status]')
                 optionLabelListForActivityStatus.value=result.data.recordset
    
                    console.log(result.data.recordset[0])
    
            }).catch(err=>console.log(err))
        }


        

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }

        function getRACardInfo(){
            axios.get(`http://${hostname}:3000/app/getRACard/${collectionCardId}`)
            .then(result => {
                console.log(result)
                collectionCardHeader.value = result.data[0]
                dateInfo.scheduledStartDate.value = getISODate(collectionCardHeader.value["Scheduled Start Date"])
                dateInfo.scheduledEndDate.value = getISODate(collectionCardHeader.value["Scheduled End Date"])
            }).catch(err=>console.log(err))
        }

        function getISODate(date){
            if(new String(date).includes('1753')||new String(date).includes('1900'))
                return ''
            else
                return new Date(date).toISOString().split('T')[0]
        }

        function setReadOnlyModeIsDisabled(){
            readOnlyModeIsDisabled.value=true
        }

        function setReadWriteModeIsDisabled(){
            readOnlyModeIsDisabled.value=false
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

        function updateDebtCollection(rrData){
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
                Parameter:'debtcollection_modify',
                webUserName:webUserInfo.name.value,
                'No_':collectionCardHeader.value['No_'],
                'Customer No_':collectionCardHeader.value['Customer No_'],
                'Name':collectionCardHeader.value['Name'],
                'Activity Type':collectionCardHeader.value[ 'Activity Type'],
                'Subject':collectionCardHeader.value['Subject'],
                'Description':collectionCardHeader.value['Description'],
                'Created on':collectionCardHeader.value['Created on'],
                'Created by':collectionCardHeader.value['Created by'],
                'Scheduled Start Date':collectionCardHeader.value['Scheduled Start Date'],
                'Scheduled End Date':collectionCardHeader.value['Scheduled End Date'],
                'Actual Start Date':collectionCardHeader.value['Actual Start Date'], 
                'Actual End Date':collectionCardHeader.value['Actual End Date'],
                'Reminder Date':collectionCardHeader.value['Reminder Date'],
                'Linked Activity':collectionCardHeader.value['Linked Activity'],
                'Comment':collectionCardHeader.value['Comment'],
            }
            updateDebtCollection(formatToBCJsonData(JSData))
        }
        onMounted(() => {
            if (webUserInfo.name.value){
                getRACardInfo()
                getOptionLabelList('[Activity Type]')
                getOptionLabelList('[Activity Status]')
                
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getRACardInfo()
                    getOptionLabelList('[Activity Type]')
                    getOptionLabelList('[Activity Status]')
                   
                })
                .catch(err=>console.log(err))
            }
        })


      
        // expose to template and other options API hooks
        return {
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            submitForm,
            readOnlyModeIsDisabled,
            collectionCardHeader,
            submitting_message,
            error_message,
            error_message_code,
            success_message,
            
        
            optionLabelListForActivityType,

            optionLabelListForActivityStatus,
            dateInfo,
            getISODate
        }
    },
    data(){
        return{
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerCardRightInfoMaxWidth,

            //indique si les onglets sont réduits ou non
            onglet1_expanded:true,
            onglet2_expanded:true,
            
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('recovery')
            useNavigationTabStore().setActiveTab('debtCollection')
            this.$router.push('/')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
     hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('newdebtRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newdebtRightInfoMaxWidth','0px')
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

#general_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>