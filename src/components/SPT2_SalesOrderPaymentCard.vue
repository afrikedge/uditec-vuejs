<template>
    <div class="has-background-white p-5">

        <!---------Composant message d'enregistrement en cours ou d'erreur ou de success----------------------->      
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
        <article v-if="success_posting" class="message is-primary shadow">
            <div class="message-header">
                    <span class="subtitle is-7 m-0 has-text-white"> 
                        <span class="icon ">
                            <i class="fas fa-spinner fa-pulse"></i>
                        </span>
                        {{ success_posting }}
                    </span>
                <button class="delete" aria-label="delete" @click="success_posting=''"></button>
            </div>
        </article>

        <div class="columns mt-5">
            <div class="column is-narrow">
                <input-select v-model="saleOrderNo" labelInputText="Commande" :is_disabled="false" @openModal="activeModalForSelectableElementList='saleOrderList'"></input-select>
                <input-text-addons :valueInputText1="saleOrderCustomerNo" :valueInputText2="saleOrderCustomerName" labelInputText="Client"></input-text-addons>
                <input-text-addons :valueInputText1="saleOrderCustomerContactCode" :valueInputText2="saleOrderCustomerContactName" labelInputText="Contact"></input-text-addons>
            </div>
        </div>

        <div class="columns">
            <div class="column is-four-fifths">
                <div style="height: 200px;" class="mt-2 box">
                    <table class="table">
                        <thead class=" my-2">
                            <tr > 
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow"></th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">N°</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">Article</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">Description</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">Variant</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">U.V</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">Quantité</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">P.U.</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">Montant HT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :id="index" v-for="(elt,index) of saleOrderCardLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                <td class="has-text-left">
                                    <span class="icon">
                                        <i class="fas fa-arrow-right has-text-grey"></i>
                                    </span>
                                </td>
                                <td class="has-text-left py-1 px-2 is-narrow" >{{ Number.isInteger(elt['Line No_']/10000)?elt['Line No_']/10000:elt['Line No_'] }}</td>
                                <td class="has-text-left py-0 px-2 is-narrow" >{{ elt['No_'] }}</td>
                                <td class="has-text-left py-0 px-2 is-narrow"> {{ elt['Description'] }}</td>
                                <td class="has-text-left py-0 px-2 is-narrow"> {{ elt['Variant Code'] }}</td>
                                <td class="has-text-left py-1 px-2 is-narrow" >{{ elt['Unit of Measure'] }}</td>
                                <td class="has-text-left py-0 px-2" >{{ elt['Quantity'] }}</td>
                                <td class="has-text-left py-1 px-2" >{{ Math.trunc(Number(elt['Unit Price'])) }}</td>
                                <td class="has-text-left py-1 px-2 is-narrow" >{{ Math.trunc(Number(elt['Line Amount'])) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="columns ">
                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="saleOrderTotalAmount" labelInputText="Total"></input-text1>
                        <input-text1 :is_disabled="true" :valueInputText="saleOrderTotalDiscount" labelInputText="Remise"></input-text1>
                    </div>

                    <div class="column">
                        <input-text1 :is_disabled="true" :valueInputText="saleOrderTotalVAT" labelInputText="TVA"></input-text1>
                        <input-text1 :is_disabled="true" :valueInputText="saleOrderTotalNetToPay" labelInputText="Net à payer"></input-text1>
                    </div>
                </div>

                <div class="mt-2 box">
                    <table class="table  is-narrow  is-fullwidth ">
                        <thead class=" my-2">
                            <tr > 
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Mode</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Approbartion requise</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Référence requise</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width:200px">Montant</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Référence</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7">Montant Valideé</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :id="index" v-for="(elt,index) of saleOrderPaymentLines" :key="index" @mouseover="setLineShadow(index)" @mouseout="removeLineShadow(index)" >
                                <td class="has-text-left py-0 px-2 "> 
                                    {{ elt['Payment Method Code'] }}
                                </td>
                                <td class="has-text-left py-0 px-2"> 
                                    {{ elt['Approval required'] }}
                                </td>
                                <td class="has-text-left py-0 px-2"> 
                                    {{ elt['Reference required'] }}
                                </td>
                                <td class="has-text-left py-0 px-2">
                                    <div :id="index+'-'+elt['Amount (LCY)']+'-Amount (LCY)'" class="editme p-1" :contenteditable="true" v-text="elt['Amount (LCY)']" @blur="onEdit" @keydown.enter="endEdit"></div> 
                                </td>
                                <td class="has-text-left py-1 px-2" >
                                    <div :id="index+'-'+elt['Reference']+'-Reference'" class="editme p-1" :contenteditable="true" v-text="elt['Reference']" @blur="onEdit" @keydown.enter="endEdit"></div> 
                                </td>
                                <td class="has-text-left py-0 px-2" >
                                    {{ elt['Accepted Amount (LCY)'] }}
                                </td>
                                <td class="has-text-left py-0 px-2" >
                                    <button class="button is-dark" :disabled="elt['Approval required']!==1">Valider</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                

            </div>
            <div class="column is-one-fifth">
                <button class="button is-fullwidth is-dark py-5">
                    <span class="subtitle is-6 has-text-white">Nouveau</span>
                </button>
                <button class="button is-fullwidth is-dark py-5 mt-1">
                    <span class="subtitle is-6 has-text-white">Nouvelle commande</span>
                </button>
                <button 
                :class="{'button':true, 'is-loading':submitting_message!=='','is-fullwidth':true,'is-dark':true,'py-5':true,'mt-1':true}"
                :disabled="submitting_message!==''"
                @click.prevent="submitForm">
                    <span class="subtitle is-6 has-text-white" v-if="submitting_message==''">Enregistrer</span>
                    <span class="subtitle is-6 has-text-white" v-else>{{ submitting_message }}</span>
                </button>
                
                <button 
                :class="{'button':true, 'is-loading':posting_message!=='','is-fullwidth':true,'is-dark':true,'py-5':true,'mt-1':true}"
                :disabled="posting_message!==''"
                @click.prevent="postPayment">
                    <span class="subtitle is-6 has-text-white" v-if="posting_message==''">Valider</span>
                    <span class="subtitle is-6 has-text-white" v-else>{{ posting_message }}</span>
                </button>
                
                <button class="button is-fullwidth is-dark py-5 mt-1">
                    <span class="subtitle is-6 has-text-white">Valider sans contrôle</span>
                </button>
                <button class="button is-fullwidth is-dark py-5 mt-1">
                    <span class="subtitle is-6 has-text-white">Imprimer reçu</span>
                </button>
            </div>
        </div>


        <modal-for-selectable-sale-order-list 
            v-if="activeModalForSelectableElementList=='saleOrderList'"  
            :isActive="activeModalForSelectableElementList=='saleOrderList'" 
            @closeModal="activeModalForSelectableElementList=''" 
            @onGettingLineFromSelectableSOListModal="(elt)=>fillSOHeaderInfoField(elt)">
        </modal-for-selectable-sale-order-list>

    </div>
</template>
<script>
import inputSelect from './input/input-select.vue'
import inputText1 from './input/input-text1.vue'
import inputTextAddons from './input/input-text-addons.vue'
import {  onMounted, onUpdated, ref, watch } from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import  axios  from 'axios'
import ModalForSelectableSaleOrderList from './ModalForSelectableSaleOrderList.vue'
import { useRoute } from 'vue-router'


export default {
    name:'spt2-sale-orde-payment',
    components:{
        inputTextAddons,
        inputText1,
        inputSelect,
        ModalForSelectableSaleOrderList
    },
    setup(){
        const activeModalForSelectableElementList =ref('')
        const hostname = window.location.hostname;
        const route = useRoute()
        const submitting_message=ref('') 
        const posting_message=ref('') 
        const error_message=ref('')
        const error_message_code =ref('')
        const success_message=ref('')
        const success_posting=ref('')
        let webUserInfo = {
            ...useWebUserInfoStore().getWebUser
        }

        const saleOrderCardHeaderInfo = {
            saleOrderNo: ref(''),
            saleOrderCustomerNo : ref(webUserInfo.defaultCustomerNo),
            saleOrderCustomerName : ref(webUserInfo.defaultCustomerName),
            saleOrderCustomerContactCode : ref(webUserInfo.defaultCustomerContactCode),
            saleOrderCustomerContactName : ref(''),
            saleOrderTotalAmount : ref(0),
            saleOrderTotalDiscount : ref(0),
            saleOrderTotalVAT : ref(0),
            saleOrderTotalNetToPay : ref(0),
        }

        
        const saleOrderCardLines =  ref([])
        const saleOrderPaymentLines = ref([])
        const saleOrderPaymentMethodList = ref([])


        function fillSOHeaderInfoField(so){
            saleOrderCardHeaderInfo.saleOrderNo.value=so['No_']
            saleOrderCardHeaderInfo.saleOrderCustomerNo.value=so['Sell-to Customer No_']
            saleOrderCardHeaderInfo.saleOrderCustomerName.value=so['Sell-to Customer Name']
            saleOrderCardHeaderInfo.saleOrderCustomerContactCode.value=so['Sell-to Contact No_']
            saleOrderCardHeaderInfo.saleOrderTotalAmount.value=so['Total Amount']
            saleOrderCardHeaderInfo.saleOrderTotalVAT.value=so['Total VAT']
            saleOrderCardHeaderInfo.saleOrderTotalNetToPay.value=so['Total Amount Including VAT']
        }

        function getSaleOrderCardLine(){
            axios.get(`http://${hostname}:3000/app/getSOCard/${saleOrderCardHeaderInfo.saleOrderNo.value}?respCenter=${webUserInfo.responsibilityCenter}`)
            .then(result => {
                console.log(result)
                const saleOrderCardHeader = result.data[0]
                //console.log(result.data[0])
                saleOrderCardLines.value = result.data[1]

                saleOrderCardHeaderInfo.saleOrderTotalAmount.value = saleOrderCardHeader['Total Amount']
                saleOrderCardHeaderInfo.saleOrderTotalNetToPay.value = saleOrderCardHeader['Total Amount Including VAT']
                saleOrderCardHeaderInfo.saleOrderTotalVAT.value = saleOrderCardHeader['Total VAT']
                // console.log(saleOrderCardHeader)
            }).catch(err=>console.log(err))
        }

        function getSaleOrderPaymentLine(){
            axios.get(`http://${hostname}:3000/app/getSaleOrderPaymentLine/${saleOrderCardHeaderInfo.saleOrderNo.value}`)
            .then(result =>{
                console.log('salutation',result)
                    saleOrderPaymentLines.value = result.data.recordset
                    if (saleOrderPaymentLines.value.length==0){
                        getPaymentMethodList()
                    }

            }).catch(err=>console.log(err))
        }

        watch(saleOrderCardHeaderInfo.saleOrderNo, () => {
            
            getSaleOrderCardLine()
            getSaleOrderPaymentLine()
        })

        onUpdated(()=>{
            if(route.query.order){
                saleOrderCardHeaderInfo.saleOrderNo.value=route.query.order
            }
        })

        onMounted(()=>{
            if(webUserInfo.responsibilityCenter){
                getPaymentMethodList()
            }
            else{
                axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
                .then(res=>{
                    useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
                    webUserInfo = {
                        ...useWebUserInfoStore().getWebUser
                    }
                    getPaymentMethodList()
                })
                .catch(err=>console.log(err))
            }
        })
        
        function getPaymentMethodList(){
            axios.get(`http://${hostname}:3000/app/getPaymentMethodList?respCenter=${webUserInfo.responsibilityCenter}`)
            .then(result =>{
                saleOrderPaymentMethodList.value = result.data.recordset
                saleOrderPaymentMethodList.value.forEach((element)=>{
                    saleOrderPaymentLines.value.push({
                        'Document Type':1,
                        'Document No_':saleOrderCardHeaderInfo.saleOrderNo.value,
                        'Payment Method Code':element['Code'],
                        'Approval required':element['Approval required'],
                        'Reference required':element['Reference required'],
                        Reference:'',
                        'Amount (LCY)':0,
                        'Accepted Amount (LCY)':0
                    })
                })
    
            }).catch(err=>console.log(err))

        }

        function displayErrorMessage(errorObject){
            if(errorObject.response && errorObject.response.status){
                switch (errorObject.response.status){
                    case 401: 
                        submitting_message.value=''
                        posting_message.value=''
                        error_message.value= errorObject.response.data;break;
                    case 400:
                        submitting_message.value='' 
                        posting_message.value=''
                        error_message.value= errorObject.response.data
                        error_message_code.value= errorObject.code;break;
                    case 404:
                        submitting_message.value=''
                        posting_message.value=''
                        error_message.value=errorObject.response.data.error.message
                        error_message_code.value= errorObject.response.data.error.code;break;
                    default:
                        submitting_message.value=''
                        posting_message.value=''
                        error_message.value=errorObject.response
                }
            }
            else{
                error_message.value = errorObject.message
                error_message_code.value = errorObject.code
            }
        }

        function formatToBCJsonData(data){
            const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
            const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
            console.log(JSONDataToSend)
            return {data:JSONDataToSend}
        }

        function updatesaleOrderPayment(sqData){
            axios.post(`http://${hostname}:3000/app/getBCWSResponse?company=${webUserInfo.activeCompanyId}`,sqData)
            .then(() => {
                submitting_message.value=''
                posting_message.value=''
                success_message.value='Enregistrement réussi'
                error_message.value=''
                setTimeout(()=>success_message.value='',5000)
                setTimeout(()=> success_posting.value='',5000)
            })
            .catch((err) => {
                displayErrorMessage(err)
            })
    }   
                

        function submitForm(){
            submitting_message.value='Enregistrement en cours'
            const JSData ={
                Parameter:'orders_payment_save',
                OrderNo:saleOrderCardHeaderInfo.saleOrderNo.value,
                saleOrderPaymentLines:[
                    ...saleOrderPaymentLines.value
                ]
            }
            updatesaleOrderPayment(formatToBCJsonData(JSData))
        }

        function postPayment(){
            posting_message.value='Comptabilisation du paiement en cours'
            const JSData = {
                Parameter:'orders_payment_validate',
                OrderNo:saleOrderCardHeaderInfo.saleOrderNo.value
            }
            updatesaleOrderPayment(formatToBCJsonData(JSData))
        }

        return {
            activeModalForSelectableElementList,
            ...saleOrderCardHeaderInfo,
            saleOrderCardLines,
            saleOrderPaymentLines,
            saleOrderPaymentMethodList,
            webUserInfo,
            fillSOHeaderInfoField,
            submitForm,
            error_message,
            error_message_code,
            success_message,
            submitting_message,
            success_posting,
            posting_message,
            postPayment

        }
    },
    methods:{
        setLineShadow(id){
            const myElt=document.getElementById(id)
            const children =  myElt.childNodes
            children.forEach(element => {
                element.classList.add('has-background-light')
                element.classList.add('is-hover-orange')
                element.classList.add('is-hover-orange')
            })
            //console.log(children)

        },
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
        onEdit(evt){
            const id =evt.target.id
            let value = evt.target.innerText
            const parentId= new String(id).split('-')[0]
            const parentAttri = new String(id).split('-')[2]
            if (parentAttri=="Amount (LCY)") {
                value = Number(value)
                this.saleOrderPaymentLines[parentId][parentAttri] = value
                //this.saleOrderCardLines[parentId]["Line Amount"] = value * Math.trunc(Number(this.saleOrderCardLines[parentId]["Unit Price"]))
            }
            else{
                this.saleOrderPaymentLines[parentId][parentAttri] = value
            }
        },
        endEdit(){
            this.$el.querySelector('.editme').blur()
        }

    }
}

</script>
