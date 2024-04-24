<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <Customer-Card-Header   :soNo="discountCard['No_']" :soDesc="discountCard['Subject']" pageTitle="Fiche demande remise" 
                @onGoingBackToList='goBackToList'
                />
            </div>
            
<!---------Composant rubban fiche demande remise----------------------->      
            <Customer-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onDisablingReadOnlyMode="setReadOnlyModeIsDisabled"
            @onSubmittingForm="submitForm"
            @onCancellingUpdate="setReadWriteModeIsDisabled"
            componentWithCompInfo="newdiscoundRightInfoMaxWidth"
            :newCardBtnIsDisabled="true"
            :editCardBtnIsDisabled="true"
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



<!---------Section formulaire fiche demande remise----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section ongle 1 formulaire fiche demande remise----------------------->                         
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
                                    <input-text labelInputText="N° Demande" :valueInputText="discountCard['No_']" :is_disabled="true" ></input-text>
                                    <input-text labelInputText="Objet" :valueInputText="discountCard['Subject']" :is_disabled="true"></input-text>
                                  
                                    <input-text labelInputText="Crée le" :valueInputText="formatDateHour(discountCard['Created on'])" :is_disabled="true"></input-text>

                                    <input-text labelInputText="Crée par" :valueInputText="discountCard['Created by']" :is_disabled="true"></input-text>
                                </div>
                                <div class="column">

                                   
                                    <input-text labelInputText="Remise demandée (%)" v-model="discountCard['Description']" :valueInputText="discountCard['Requested Discount']" :is_disabled="!readOnlyModeIsDisabled" :is_readOnly="true"></input-text>
                                    <input-text labelInputText="Remise accordé  (%)" :valueInputText="discountCard['Approuved Discount']" :is_disabled="true"></input-text>
                                    <input-text labelInputText="Statut" :valueInputText="discountCard['Approval Status']" :is_disabled="true"></input-text>
                                </div>
                            </div>                    
                        </div>
                        <br><br>

<!---------sous-Section ongle 2 formulaire fiche demande remise----------------------->   
                    <div id="tracking" v-if="!readOnlyModeIsDisabled">
                        <div :class="{'has-background-light':onglet2_expanded}">
                            <div :class="{'columns':!onglet2_expanded,'p-3':onglet2_expanded,'has-border-bottom-grey':onglet2_expanded,'has-border-bottom':!onglet2_expanded}">
                                <div class="column p-0 has-text-left has-text-weight-bold">
                                    <a @click="collapse('tracking_content');onglet2_expanded=!onglet2_expanded" v-if="onglet2_expanded">
                                        <span>Suivi</span>
                                    </a>
                                    <a @click="expand('tracking_content');onglet2_expanded=!onglet2_expanded" v-if="!onglet2_expanded">
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
                                        <tr > 
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">N° Séquence</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Mode validation</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-Width: 100px;">Validé le</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Validé par</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Validé en tant que</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Statut Actuel</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Statut Suivant</th>
                                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal has-text-weight-bold is-size-7" style="min-width: 100px;">Commentaire</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr :id="index" v-for="(elt,index) of  approvalfow" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                            <td class="has-text-left has-background-light">
                                                <span class="icon">
                                                    <i class="fas fa-arrow-right has-text-grey"></i>
                                                </span>
                                            </td>
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
                            </div>     
                        </div>
                                       
                    </div>  
                    <br><br>




                </div>
<!---------composant info demande remise----------------------->
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
import { onBeforeMount,onMounted,ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'


export default {
    name:'discount-request-card',
    components:{
        CustomerCardHeader,CustomerInfo,
        inputText,
        CustomerCardRibbon,
    },
    setup(){
        const discountCard = ref({})
        const discountCardLine = ref([])
        const readOnlyModeIsDisabled = ref(false)
        const route = useRoute()

        const approvalfow = ref([])

        //nom de l'hote dans l'url 
        const hostname = window.location.hostname

        //indique la route active
        const discoundDocumentNo = ref('')

        //variable de soumission forme
        const submitting_message=ref('') 

        //variable d'erreur serveur
        const error_message=ref('')
        const error_message_code =ref('')

        //variable de success serveur
        const success_message=ref('')

    

        let webUserInfo = {
            name:ref(useWebUserInfoStore().name),
            company:ref(useWebUserInfoStore().activeCompanyId),
        }

        function getDiscountCardInfo(){
            axios.get(`http://${hostname}:3000/app/getDiscountRequestCard?documentNo=${discoundDocumentNo.value}`)
            .then(result => {
                console.log(result)
                discountCard.value = result.data[0]
                getDiscoundapprovalfowInfo()
            }).catch(err=>console.log(err))
        }
        function getDiscoundapprovalfowInfo(){
          axios.get(`http://localhost:3000/app/getApprovalFlow?documentNo=SO24-00002`)
          .then(res =>{
            
           approvalfow.value =  res.data
                 
          })
          .catch((err) => {
              console.log(err)
          })
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
                'No_':discountCard.value['No_'],
                'Customer No_':discountCard.value['Customer No_'],
                'Name':discountCard.value['Name'],
                'Activity Type':discountCard.value[ 'Activity Type'],
                'Subject':discountCard.value['Subject'],
                'Description':discountCard.value['Description'],
                'Created on':discountCard.value['Created on'],
                'Created by':discountCard.value['Created by'],
                'Scheduled Start Date':discountCard.value['Scheduled Start Date'],
                'Scheduled End Date':discountCard.value['Scheduled End Date'],
                'Actual Start Date':discountCard.value['Actual Start Date'], 
                'Actual End Date':discountCard.value['Actual End Date'],
                'Reminder Date':discountCard.value['Reminder Date'],
                'Linked Activity':discountCard.value['Linked Activity'],
                
            }
            updateDebtCollection(formatToBCJsonData(JSData))
        }
        onMounted(() => {
            if (webUserInfo.name.value){
                getDiscountCardInfo()
                
                
            }else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo.name.value=useWebUserInfoStore().name
                    webUserInfo.company.value=useWebUserInfoStore().activeCompanyId
                    getDiscountCardInfo()
                    
                   
                })
                .catch(err=>console.log(err))
            }
        })

        onBeforeMount(()=>{
            if(route.query.documentNo){
                discoundDocumentNo.value = route.query.documentNo
                
            }
        })
      
        // expose to template and other options API hooks
        return {
            setReadOnlyModeIsDisabled,
            setReadWriteModeIsDisabled,
            submitForm,
            readOnlyModeIsDisabled,
            discountCard,
            discountCardLine,
            submitting_message,
            error_message,
            error_message_code,
            success_message,
            approvalfow,

            

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
            useNavigationTabStore().setActiveTab('customers')
            this.$router.push('/DiscountRequestList')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
     hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('newdiscoundRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newdiscoundRightInfoMaxWidth','0px')
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

#general_content,#tracking_content{
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.5s
}



</style>