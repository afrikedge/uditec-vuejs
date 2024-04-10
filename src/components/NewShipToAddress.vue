<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="groupbuyCardHeader['No_']" :soDesc="groupbuyCardHeader['Name']" pageTitle="Adresse de livraison" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban fiche activité recouvrement----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            componentWithCompInfo="newdebtRightInfoMaxWidth"
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
                                <input-select v-model="contactCustomerNo" labelInputText="Code client" :is_disabled="false"  @openModal="activeModalForSelectableElementList='customerList';"></input-select>
                                <input-text labelInputText="Code contact" valueInputText=""></input-text>
                                <input-text labelInputText="Nom de l’adresse" valueInputText=""></input-text>
                                <input-text labelInputText="ville" valueInputText=""></input-text> 
                                <input-text labelInputText="Téléphone Mobile" valueInputText=""></input-text>
                                <input-text labelInputText="Lieu" valueInputText=""></input-text> 
                                <input-text labelInputText="Quartier" valueInputText="" ></input-text>
                               
                                <input-select-basic-1 labelInputText="Zone" :option-list="optionLabelListForRepossSource"></input-select-basic-1> 
                               
                                <input-select-basic-1 labelInputText="Créneau de préférence" :option-list="optionLabelListForRepossSource" ></input-select-basic-1> 

                                 
                                <input-select-basic-1 labelInputText="Créneau de préférence" :option-list="optionLabelListForRepossSource" ></input-select-basic-1> 

                               
                            </div>
                            <div class="column">

                                
                                <input-select-basic-1 labelInputText="Type de route" :option-list="optionLabelListForRepossSource"></input-select-basic-1> 

                                <input-text labelInputText="Autres préciser" valueInputText=""></input-text> 

                               
                                <input-select-basic-1 labelInputText="Distance de transport à pied"  :option-list="optionLabelListForRepossSource"></input-select-basic-1> 

                                <input-text labelInputText="Autres préciser" valueInputText=""></input-text> 

                               
                                <input-select-basic-1 labelInputText="Emplacement de livraison" :option-list="optionLabelListForRepossSource" ></input-select-basic-1> 

                                <input-text labelInputText="Accès moto" valueInputText=""></input-text> 

                                
                                <input-select-basic-1 labelInputText="Plan d’accès" :option-list="optionLabelListForRepossSource"></input-select-basic-1> 

                                
                                <input-select-basic-1 labelInputText="Type d’accès" :option-list="optionLabelListForRepossSource"></input-select-basic-1> 

                                
                                <input-select-basic-1 labelInputText="Type de camion" :option-list="optionLabelListForRepossSource"></input-select-basic-1> 

                               
                                <input-select-basic-1 labelInputText="Parking Publique" :option-list="optionLabelListForRepossSource"></input-select-basic-1> 

                            
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
import inputSelectBasic1 from './input/input-select-basic1.vue'
import inputSelect from './input/input-select.vue'
import axios from 'axios'
import { onMounted,ref,computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'


export default {
    name:'debtcollection-card',
    components:{
        CustomerCardHeader,CustomerInfo,
        inputText,
        CustomerCardRibbon,
        inputSelectBasic1,inputSelect
    },
    setup(){
        const groupbuyCardHeader = ref({})
        const readOnlyModeIsDisabled = ref(false)
        const hostname = window.location.hostname
        const groupbuyCardId = useRoute().params.id
        

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')

        const optionLabelListForRepossSource = ref([])
        const optionLabelListForRepossStatus = ref([])
        const optionLabelListForRepossType = ref([])
        const optionLabelListForRepossItemStatus = ref([])

        const getLabelForRepossSource = computed(()=> {
            return optionLabelListForRepossSource.value.filter(row => row['Value']== groupbuyCardHeader.value['Source'])
        } )

        const tttt = computed(()=>{
            return getLabelForRepossSource.value
        })

        const dateInfo = {
            OpStartingDate: ref(''),
            scheduledEndDate:ref(''),
            shipRequestedDate:ref(''),
            promisedDeliveryDate:ref('')
        }

        function getOptionLabelList(field){
            axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
            .then(result => {
                if (field=='[Reposs Source]')
                    optionLabelListForRepossSource.value=result.data.recordset
                if (field=='[Reposs Status]')
                    optionLabelListForRepossStatus.value=result.data.recordset
                if (field=='[Reposs Type]')
                    optionLabelListForRepossType.value=result.data.recordset
                if (field=='[Activity Type]')
                    optionLabelListForRepossItemStatus.value=result.data.recordset
    
                    console.log(result.data.recordset)
    
            }).catch(err=>console.log(err))
        }

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }

        function getRACardInfo(){
            axios.get(`http://${hostname}:3000/app/getRACard/${groupbuyCardId}`)
            .then(result => {
                console.log(result)
                groupbuyCardHeader.value = result.data[0]
                dateInfo.scheduledEndDate.value = getISODate(groupbuyCardHeader.value["Scheduled End Date"])
                dateInfo.OpStartingDate.value = getISODate(groupbuyCardHeader.value["OP Starting Date"])
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
                'No_':groupbuyCardHeader.value['No_'],
                'Customer No_':groupbuyCardHeader.value['Customer No_'],
                'Name':groupbuyCardHeader.value['Name'],
                'Activity Type':groupbuyCardHeader.value[ 'Activity Type'],
                'Subject':groupbuyCardHeader.value['Subject'],
                'Description':groupbuyCardHeader.value['Description'],
                'Created on':groupbuyCardHeader.value['Created on'],
                'Created by':groupbuyCardHeader.value['Created by'],
                'Scheduled Start Date':groupbuyCardHeader.value['Scheduled Start Date'],
                'Scheduled End Date':groupbuyCardHeader.value['Scheduled End Date'],
                'Actual Start Date':groupbuyCardHeader.value['Actual Start Date'], 
                'Actual End Date':groupbuyCardHeader.value['Actual End Date'],
                'Reminder Date':groupbuyCardHeader.value['Reminder Date'],
                'Linked Activity':groupbuyCardHeader.value['Linked Activity'],
                'Comment':groupbuyCardHeader.value['Comment'],
            }
            updateDebtCollection(formatToBCJsonData(JSData))
        }

        onMounted(() => {
            if (webUserInfo.name.value){
                getRACardInfo()
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
                    getRACardInfo()
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
            submitForm,
            readOnlyModeIsDisabled,
            groupbuyCardHeader,
            submitting_message,
            error_message,
            error_message_code,
            success_message,

            optionLabelListForRepossSource,
            optionLabelListForRepossStatus,
            optionLabelListForRepossType,
            optionLabelListForRepossItemStatus,
            tttt,
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