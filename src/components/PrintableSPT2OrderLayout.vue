<template>
    <div  class="printable-document" style="width:330px;background-color:white;">
        <header class="mx-5">
            <div class="columns is-mobile mt-2 mb-0">
                <div class="column has-text-left">
                    <img src="@/assets/images/sport_2000.jpg" alt="" style="max-width: 75px;">
                </div>
                <div class="column has-text-right mt-3 is-narrow">
                    <span style="color: black;">{{ userData.defaultStoreCode }} - Sport 2000 Zoom</span>
                </div>
            </div>

            <div class="columns">
                <div class="column has-text-left">
                    <span style="color: black;font-size: 14px;"><b>Slip : </b></span> 
                    <span style="color: black;font-size: 14px;">{{ props.documentNo }}</span>
                    <br>
                    <span style="color: black;font-size: 14px;"><b>Staff : </b> </span> 
                    <span style="color: black;font-size: 14px;">{{ userData.name }}</span>
                    <br>
                    <span style="color: black;font-size: 14px;"><b>Client : </b> </span> 
                    <span style="color: black;font-size: 14px;">{{ props.customerName }}</span>
                    <br>
                    <span style="color: black;font-size: 14px;"><b>Date : </b> </span> 
                    <span style="color: black;font-size: 14px;">{{ new Date().toLocaleString() }}</span> 
                    <br>
                </div>
            </div>
        </header>

        <main class="mx-5 mt-3">
            <div class="table-container my-0">
                <table class="table is-striped is-fullwidth" >
                    <thead class="">
                        <tr style="border-bottom: 3px solid black;" class=""> 
                            <th class="has-text-left has-background-light is-size-6 px-0" style="color: black;">Description</th>
                            <th class="has-text-right has-background-light is-size-6 pr-2" style="color: black;">Qty</th>
                            <th class="has-text-right has-background-light is-size-6 px-0" style="color: black;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(elt,index) of filteredItemList" :key="'item'+index">
                            <td class="has-text-left p-0"> 
                                <div>
                                    <span class="is-size-7">{{ elt['No_'] }} - {{ elt['Variant Code'] }}</span>
                                </div>
                                <div>
                                    <span class="is-size-7">{{ elt['Description'] }}</span>
                                </div>
                            </td>
                            <td class="has-text-right py-0 px-3">
                                <span class="is-size-7">{{ elt['Quantity'] }}</span>
                            </td>
                            <td class="has-text-right p-0 is-narrow">
                                <span class="is-size-7">{{ elt['Line Amount'] }}</span>
                            </td>                
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="columns has-text-right" style="border-bottom: 1px solid gainsboro;">
                <div class="column py-0">
                    <span style="color: black;font-size: 13px;"><b>VAT Amount (20%)</b></span>
                </div>
                <div class="column is-narrow py-0 " style="min-width: 100px;">
                    <span style="color: black;font-size: 13px;">{{ VATAmount }}</span><br>
                </div> 
            </div>            
            <div class="columns has-text-right" style="border-bottom: 1px solid gainsboro;">
                <div class="column py-0 ">
                    <span style="color: black;font-size: 13px;"><b>Amount Incl VAT</b> </span>
                </div>
                <div class="column is-narrow py-0 " style="min-width: 100px;">
                    <span style="color: black;font-size: 13px;">{{ amountIncVAT }}</span><br>
                </div> 
            </div>




            <div class="columns has-text-right" style="border-bottom: 1px solid gainsboro;" v-for="(elt1,index1) of filteredPaymentList" :key="'payment'+index1">
                <div class="column py-0 ">
                    <span style="color: black;font-size: 13px;" class="py-2">{{ elt1['Payment Method Code'] }}</span>
                </div>
                <div class="column is-narrow py-0 " style="min-width: 100px;">
                    <span style="color: black;font-size: 13px;" class="py-2">{{ elt1['Accepted Amount (LCY)-1'] }}</span><br>
                </div> 
            </div>            
            



            <div class="columns has-text-right mt-1" style="border-bottom: 1px solid gainsboro;">
                <div class="column py-0 ">
                    <span style="color: black;font-size: 13px;"><b>Received Amount</b> </span>
                </div>
                <div class="column is-narrow py-0 " style="min-width: 100px;">
                    <span style="color: black;font-size: 13px;">{{ receivedAmount }}</span><br>
                </div> 
            </div>            
            <div class="columns has-text-right" style="border-bottom: 1px solid gainsboro;">
                <div class="column py-0 ">
                    <span style="color: black;font-size: 13px;"><b>Returned Amount</b> </span>
                </div>
                <div class="column is-narrow py-0 " style="min-width: 100px;">
                    <span style="color: black;font-size: 13px;">{{ returnedAmount }}</span><br>
                </div> 
            </div>            
                   
        </main>
        <footer class="has-text-centered my-5">
            <p style="color: black;font-size: 11px;">Thank you, please visit again</p> 
        </footer>
    </div>
</template>
<script setup>
import { useWebUserInfoStore } from '@/Stores/WebUserInfo';
import { computed, defineProps, watch, ref } from "vue";


const props = defineProps(['itemList','paymentList','VATAmount','amountIncVAT','receivedAmount','returnedAmount','customerName','documentNo'])

//Gestion des lignes de paiement

const filteredPaymentList = computed(()=>{
    return props.paymentList
    .filter((row) => row['Accepted Amount (LCY)']>0)
})
watch(filteredPaymentList , ()=>{
    props.paymentList.map((row) =>{ 
        const partOfAmount = ref([])
        partOfAmount.value= new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits:2 }).formatToParts(row['Accepted Amount (LCY)'])
        const amount = ref('')
        partOfAmount.value.forEach((row)=>{
            if(row.type !== 'group')
                amount.value = amount.value + row.value
            else
                amount.value = amount.value + ' '
        })
        row['Accepted Amount (LCY)-1'] = amount.value
    })
})

//Gestion des lignes d'article
const filteredItemList = computed(()=>{
    return props.itemList
}) 
watch(filteredItemList , ()=>{
    props.itemList.map((row) =>{ 
        const partOfAmount = ref([])
        partOfAmount.value= new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits:2 }).formatToParts(row['Line Amount'])
        const amount = ref('')
        partOfAmount.value.forEach((row)=>{
            if(row.type !== 'group')
                amount.value = amount.value + row.value
            else
                amount.value = amount.value + ' '
        })
        row['Line Amount'] = amount.value

    })
})

//Gestion du montant tva
const VATAmount = ref('')
const getVATAmount = computed(()=>{
    return props.VATAmount
})
watch(getVATAmount, ()=>{
    const partOfAmount = ref([])
    partOfAmount.value= new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits:2 }).formatToParts(props.VATAmount)
    const amount = ref('')
    partOfAmount.value.forEach((row)=>{
            console.log(row)
            if(row.type !== 'group')
                amount.value = amount.value + row.value
            else
                amount.value = amount.value + ' '
        }
    )
    VATAmount.value = amount.value
})

//Gestion du montant TTC
const amountIncVAT = ref('')
const getAmountIncVAT = computed(()=>{
    return props.amountIncVAT
})
watch(getAmountIncVAT, ()=>{
    const partOfAmount = ref([])
    partOfAmount.value= new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits:2 }).formatToParts(props.amountIncVAT)
    const amount = ref('')
    partOfAmount.value.forEach((row)=>{
            console.log(row)
            if(row.type !== 'group')
                amount.value = amount.value + row.value
            else
                amount.value = amount.value + ' '
        }
    )
    amountIncVAT.value = amount.value
})


//Gestion du montant reçu
const receivedAmount = ref('')
const getReceivedAmount = computed(()=>{
    return props.receivedAmount
})
watch(getReceivedAmount, ()=>{
    const partOfAmount = ref([])
    partOfAmount.value= new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits:2 }).formatToParts(props.receivedAmount)
    const amount = ref('')
    partOfAmount.value.forEach((row)=>{
            console.log(row)
            if(row.type !== 'group')
                amount.value = amount.value + row.value
            else
                amount.value = amount.value + ' '
        }
    )
    receivedAmount.value = amount.value
})


//Gestion du montant retourné
const returnedAmount = ref('')
const getReturnedAmount = computed(()=>{
    return props.returnedAmount
})
watch(getReturnedAmount, ()=>{
    const partOfAmount = ref([])
    partOfAmount.value= new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits:2 }).formatToParts(props.returnedAmount)
    const amount = ref('')
    partOfAmount.value.forEach((row)=>{
            console.log(row)
            if(row.type !== 'group')
                amount.value = amount.value + row.value
            else
                amount.value = amount.value + ' '
        }
    )
    returnedAmount.value = amount.value
})




// function formatAmount(number){
//     if(number || number>=0){
//         return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2,maximumFractionDigits:2 }).format(number)
//     }else{
//         return 0
//     }
//     }
const userData = useWebUserInfoStore()


</script>