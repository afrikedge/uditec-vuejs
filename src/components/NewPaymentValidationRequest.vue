<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:96%;">
 
<!---------Composant entête fiche----------------------->      
            <div id="card-header-comp">
                <r-r-card-Header :soNo="'demande No_ :'+payementvalidationDemandeNo" :soDesc="payementvalidationDemandeNo" pageTitle="Nouveau payement validation"
                @onGoingBackToList='goBackToList'
                ></r-r-card-Header>
            </div>
<!---------Composant rubban fiche de demande se validation de payment----------------------->      
            <r-r-card-ribbon
            @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
            @onSubmittingForm="submitForm"
            componentWithCompInfo="newpayRightInfoMaxWidth"
            :readOnlyModeIsDisabled="true"
            ></r-r-card-ribbon>

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

<!---------Section formulaire fiche de demande se validation de payment----------------------->      
            <div id="content-comp" class="columns mt-2" style="overflow-y: scroll;">
                <div class="column" style="overflow-y: scroll;">

<!---------sous-Section onglet 1 fde demande se validation de payment----------------------->                         
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
                        </div>
                        <div id="general_content" class="columns">
                            <div class="column">
                                
                                <input-text v-model="PaymentValRequest" labelInputText="N° Demande" :is_disabled="false"></input-text>

                                <input-text v-model="PaymentValRequest" labelInputText="Objet" :is_disabled="false"></input-text>
                                
                            </div>
                            <div class="column">
                                <input-select-basic-1 v-model="payementvalidationdocumentType" labelInputText="Type document" :option-list=" optionLabelListForDocumentsType"></input-select-basic-1 >

                                <input-text v-model="PaymentValRequest" labelInputText="N° Document" :is_disabled="false"></input-text>
                            </div>
                        </div>                    
                    </div>
                    <br><br>

                    <!---------sous-Section onglet 2 formulaire fiche client----------------------->                         
                  
                </div>

<!---------composant info de demande se validation de payment----------------------->
                <customer-info class="customer-info"></customer-info>

            </div>
        </div>

<!---------------------------------------------->
        

      
        



    </div>     
</template>
<script>
import RRCardHeader from './HeaderForCard.vue'
import CustomerInfo from './CustomerInfo.vue'
import RRCardRibbon from './RibbonForCard.vue'
import inputText from './input/input-text.vue'
import inputSelectBasic1 from './input/input-select-basic1.vue'
import { onMounted, ref } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import  axios  from 'axios'
import { useRouter } from 'vue-router'



export default {
    name:'new-repossession-request',
    components:{
        RRCardHeader,
        RRCardRibbon,
        CustomerInfo,
        inputText,
        inputSelectBasic1,
        
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

            //élement pour le modal ajout d'article
             addItemModalShowned:false,
             editItemModalShowned:false,

            //élement pour le modal sélection des enregistrements
            activeModalForSelectableElementList:'',

             //indique si tous les options les lignes sont affichées
             show_more_option:false,

            //indique si la barre des boutons d'option est affichée
            show_option_btn_bar:false,

            //indique l'option par défaut
            selected_option:'',

            selected_line:'',

        }
    },
    setup(){

 /////////////DATAS//////////////////////////   
            
            const router = useRouter()

            //nom de l'hote dans l'url 
            const hostname = window.location.hostname;

            //variable de soumission forme
            let submitting_message=ref('') 

            //variable d'erreur serveur
            let error_message=ref('')
            let error_message_code =ref('')

            //variable de success serveur
            let success_message=ref('')

           

            
            const webUserInfo = {
                ...useWebUserInfoStore().getWebUser
            }

            const itemInfo = {
                itemLineNo:ref(1),
                itemType: ref(2),
                itemCode: ref(''),
                itemDescription: ref(''),
                itemDescription2: ref(''),
                itemVariant: ref(''),
                itemLocation: ref(''),
                itemBinCode: ref(''),
                itemUnitOfMeasure: ref(''),
                itemQuantity: ref(''),
                itemShipmentMethod: ref(''),
                itemUnitPrice: ref(''),
                itemVAT:ref(0),
                itemLineAmount:ref(0)
            }

            const itemAvailabilityInfo = {
            itemInStockLocation:ref(0),
            itemOnSalesLocation:ref(0),
            itemInStockGlobal:ref(0),
            itemOnSalesGlobal:ref(0),
            itemOnPurchaseGlobal:ref(0),
            }

            
            const  optionLabelListForDocumentsType = ref([])
            

            function getOptionLabelList(field){
                axios.get(`http://${hostname}:3000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${field}`)
                .then(result => {
                   
                    if (field=='[Document Type]')
                        optionLabelListForDocumentsType.value=result.data.recordset


                        console.log(result.data.recordset)

                }).catch(err=>console.log(err))
            }

            onMounted(() =>{
                if(useWebUserInfoStore().defaultLanguage){
                   
                    getOptionLabelList('[Document Type]')
                    
                }else{
                    axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                    .then(res=>{
                        useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                        getOptionLabelList('[Document Type]')
                        
                    })
                    .catch(err=>console.log(err))
                }


            })


            const payementvalidationCardHeaderInfo = {
                PaymentValRequest : ref(''),
                payementvalidationdocumentType : ref(0),
               
            }

           




 /////////////FUNCTIONS//////////////////////////  
 
 
            
            
            function resetForm(){
                itemInfo.itemType.value=2
                itemInfo.itemCode.value=''
                itemInfo.itemDescription.value=''
                itemInfo.itemDescription2.value=''
                itemInfo.itemVariant.value=''
                itemInfo.itemLocation.value=''
                itemInfo.itemBinCode.value=''
                itemInfo.itemUnitOfMeasure.value=''
                itemInfo.itemQuantity.value=''
                itemInfo.itemShipmentMethod.value=''
                itemInfo.itemUnitPrice.value=''
                itemInfo.itemVAT.value=0
                itemInfo.itemLineAmount.value=0

                
                itemAvailabilityInfo.itemInStockGlobal.value=0
                itemAvailabilityInfo.itemInStockLocation.value=0
                itemAvailabilityInfo.itemOnPurchaseGlobal.value=0
                itemAvailabilityInfo.itemOnSalesGlobal.value=0
                itemAvailabilityInfo.itemOnSalesLocation.value=0

            }


            function fillCustomerInfoField(customer){
                payementvalidationCardHeaderInfo.payementvalidationDemandeNo.value=customer['No_']
            }

            function fillDocInfoField(doc){
                payementvalidationCardHeaderInfo.payementvalidationDemandeNo.value=doc['No_']
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

            function createPayementvalidationR(rrData){
                axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,rrData)
                .then(res => {
                    submitting_message.value=''
                    success_message.value='Enregistrement réussi, vous serez redirigé dans un instant'
                    error_message.value=''
                    setTimeout(()=> router.push(`/PayementValidationRequestCard/${res.data.documentNo}`),5000)
                })
                .catch(err => {
                    displayErrorMessage(err)
                })
            }

            function formatToBCJsonData(data){
                
                const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
                const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
                console.log(JSONDataToSend)
                return {data:JSONDataToSend}
            }


            function submitForm(){
                submitting_message.value='Enregistrement en cours'
                const JSData = {
                    Parameter:'PayementValidation_insert',
                    webUserName:useWebUserInfoStore().name,
                    'No_':'',
                    
                    'Document No_': payementvalidationCardHeaderInfo.payementvalidationDemandeNo.value,
                   
                }
                createPayementvalidationR(formatToBCJsonData(JSData))
            }



        return{
            ...payementvalidationCardHeaderInfo,
            fillCustomerInfoField,
           
            fillDocInfoField,
            submitForm,
            error_message,
            error_message_code,
            success_message,
            submitting_message,
            webUserInfo,
            resetForm,
            itemAvailabilityInfo,
            itemInfo,
           
            optionLabelListForDocumentsType,
          
        }
    },
    methods:{
        goBackToList(){
            useNavigationTabStore().setActiveGroup('recovery')
            useNavigationTabStore().setActiveTab('paymentvalCollection')
            this.$router.push('/')
        },
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('newpayRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('newpayRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
          ///////////////////////methode pour  afficher le formulaire d'ajout d'article
          showaddRowByForm(){
            if (this.saleQuoteLocationCode){
                this.addItemModalShowned = true
                this.error_message=''
                this.error_message_code=''
            }else{
                this.error_message = "Vous devez d'abord indiquer le code magasin"
                this.error_message_code ="ERROR_FIELD_REQUIRED"
            }
        },
         ////////////////////////methode pour ajouter le formulaire de modification d'article
         showEditRowByFormModal(){
            this.editItemModalShowned = true
        },
      
        //////////methode pour étendre un onglet de la page
        expand(id){
            const myElt=document.getElementById(id);
            if (id=='deadline_content') myElt.style.maxHeight='250px'
            else myElt.style.maxHeight='500px'
        },
        ////////////methode pour reduire un onglet de la page
        collapse(id){
            const myElt=document.getElementById(id);
            myElt.style.maxHeight="0px"
        },
         ////////////////////////methode pour afficher les bouton d'un sous onglet de l'onglet ligne 
         selectOption(currentOpt){
            if (this.selected_option ==currentOpt) { this.show_option_btn_bar=!this.show_option_btn_bar;}
            else {this.selected_option= currentOpt;this.show_option_btn_bar=this.show_option_btn_bar?true:true}
        },
        /////////////////methode pour ajouter la couleur de la ligne une fois que l'user est dessus
        setLineShadow(id){
            const myElt=document.getElementById(id)
            const children =  myElt.childNodes
            children.forEach(element => {
                element.classList.add('has-background-light')
                element.classList.add('is-hover-orange')
                element.classList.add('is-hover-orange')
            })
        },
        ////////////////////methode pour enlever la couleur de la ligne une fois que l'user n'est plus dessus
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            const children =  myElt.childNodes
            children.forEach(element => {
                element.classList.remove('is-hover-orange')
                element.classList.remove('has-background-light')
                element.classList.remove('remove')
                element.classList.add('has-background-white')
            })
            //console.log(children)

        },

       
         endEdit(){
            this.$el.querySelector('.editme').blur()
         }

    }
}


</script>
<style scoped>

.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}

#general_content,#deadline_content{
    max-height: v-bind(height);
    overflow: hidden;
    transition: max-height 0.5s
}


</style>