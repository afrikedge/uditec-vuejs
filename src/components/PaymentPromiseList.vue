<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <payment-promise-list-ribbon 
        pageTitle="Promesses de règlement"
        componentwithPresentationView="paymentPromiseListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="paymentPromiseRightInfoMaxWidth"
        @onClickingDisplayBtn="displaySelectedLineCard"
        routeForNewCard="newPaymentPromise"
        :newCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        ></payment-promise-list-ribbon>


        <div class="has-background-light columns mb-1 is-gapless" style="overflow-y: hidden;height:auto;position: fixed;bottom:0px;top:200px; width:auto;right:6%;left:6%">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Contact</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date promesse</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Objet</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Suivi par</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant promis</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant honoré</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date honoration</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Activité d'origine</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date rappel</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Échéance rappel</th>
                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7" style="min-width: 100px;">Statut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée le</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée par</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="promise['No_']" class="" v-for="promise of dividedPromiseList" :key="promise['No_']" @mouseover="setLineShadow(promise['No_'])" @mouseout="removeLineShadow(promise['No_'])" @click="selectLine(promise['No_'],promise['Customer No_'])">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/PaymentPromiseCard/${ promise['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ promise['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ promise['Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ promise['Contact No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ formatDate(promise['Promise Date']) }}</td>                    
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ promise['Subject'] }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ promise['Description'] }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ promise['Assigned to'] }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ Math.round(promise['Promised amount']) }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ Math.round(promise['Honored amount']) }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ formatDate(promise['Honoration Date']) }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ promise['Originated activity'] }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ formatDate(promise['Riminding Date']) }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ formatDate(promise['Reminding Due Date']) }}</td>
                            <td class="has-text-centered has-background-light is-narrow has-text-weight-semibold" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}">
                                <span class="tag is-white box py-0 px-2" v-if="promise['Promise Status']==0">
                                    {{ displayLabel('optionLabelListForPromiseStatus',promise['Promise Status']) }}
                                </span>
                                <span class="tag is-success box py-0 px-2" v-else-if="promise['Promise Status']==1 || promise['Promise Status']==2">
                                    {{ displayLabel('optionLabelListForPromiseStatus',promise['Promise Status']) }}
                                </span>
                                <span class="tag is-danger is-light box py-0 px-2" v-else>
                                    {{ displayLabel('optionLabelListForPromiseStatus',promise['Promise Status']) }}
                                </span>
                            </td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ formatDateHour(promise['Created on']) }}</td>
                            <td class="has-text-left has-background-light is-narrow" :class="{'is-line-due':DateIsDue(promise['Promise Date'],promise['Riminding Date'])}"> {{ promise['Created by'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-2':customerInfoCompMaxWidth=='0px', 'is-3':customerInfoCompMaxWidth=='800px'}" v-for="promise of dividedPromiseList" :key="promise['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        <router-link :to="`/PaymentPromiseCard/${ promise['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ promise['No_'] }} 
                                            </a>
                                        </router-link>
                            
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ promise['Customer No_'] }}</span> - 
                                        <span class="is-size-7 is-underlined">{{ promise['Contact No_'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ displayLabel('optionLabelListForPromiseStatus',promise['Promise Status']) }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ Math.round(promise['Promised amount']) }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{ promise['Subject'] }}</span>
                                    </div>
                                </div>
                            </div>
                            <a class="column is-narrow has-background-orange is-flex ">
                                <span class="is-align-self-center has-text-white">...</span>

                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <customer-info class="customer-info"  v-if="selectedCustomer" :customerNo="selectedCustomer"></customer-info>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredPromiseList.length) && (currentPage !== Math.ceil(filteredPromiseList.length/pageSize))">
        <a href="#" class="button is-small has-text-white has-background-orange"
            @click="pageSize = pageSize + 20">
            Charger plus
        </a>
    </div>
    <div style="position: absolute; top: 50%; bottom: 50%; left:10px" v-if="currentPage > 1"> 
        <a href="#" @click="prevPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
            <span class="icon">
                <i class="fas fa-chevron-left"></i>
            </span>                
        </a>
    </div>
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredPromiseList.length">
        <a href="#" @click="nextPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
            <span class="icon">
                <i class="fas fa-chevron-right"></i>
            </span>                
        </a>
    </div>
</template>

<script scoped>
import CustomerInfo from './CustomerInfo.vue'
import PaymentPromiseListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'


export default {

    name:'payment-promise-list',
    components:{
        CustomerInfo,PaymentPromiseListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['paymentPromiseListPresentation']
        }
    },
    setup() {
        const promiseList = ref([])
        const hostname = window.location.hostname  
        const router = useRouter()     

        //sac de label de notre liste
        const labelBag = {
            optionLabelListForPromiseStatus:ref([]),
        }

        //fonction pour afficher le label pour une valeur donnée
        function displayLabel(listToGetLabel,valueToGetLabel){
            if(labelBag[listToGetLabel].value[valueToGetLabel])
                return labelBag[listToGetLabel].value[valueToGetLabel].Description
            else
                return ''
            // let eltToFind = labelBag[listToGetLabel].value.find((row) => row["Value"]==valueToGetLabel)
            // if(eltToFind){
            //     return eltToFind["Description"]
            // }
        }

        //fonction pour récupérer la liste des label et valeur pour un champ donné
        function getOptionLabelList(fieldToGetLabelList,listToSetLabelList){
            axios.get(`http://${hostname}:5000/app/getOptionLabelList?lg=${useWebUserInfoStore().defaultLanguage}&fd=${fieldToGetLabelList}`)
            .then(result => {
                    labelBag[listToSetLabelList].value=result.data.recordset
            }).catch(err=>console.log(err))
        }


//Gestion de la recherche
        const eltToSearch = ref('')
        const filteredPromiseList = computed(()=>
            promiseList.value
            .filter((row) => ( new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Subject']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Description']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Assigned to']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Promised amount']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Honored amount']).toLowerCase().includes(eltToSearch.value.toLowerCase()))
                    && new String(row['Created by']).toLowerCase() ==useWebUserInfoStore().name.toLowerCase()
            ),
        )


//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(40)
        const dividedPromiseList = computed(()=>{
            if(eltToSearch.value){
                return filteredPromiseList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredPromiseList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredPromiseList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }


        //fonction pour obtenir la liste à afficher
        function getPaymentPromiseList(){
            axios.get(`http://${hostname}:5000/app/getPaymentPromiseList`)
            .then((result) => {
                promiseList.value = result.data;
                setTimeout(()=>selectLine(promiseList.value[0]['No_'],promiseList.value[0]['Customer No_']),1000)
                getOptionLabelList('[Promise Status]','optionLabelListForPromiseStatus')
            })
            .catch(err=>console.log(err));
        }


    
//Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        const selectedCustomer = ref('')
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`PaymentPromiseCard/${selectedLine.value}`)
        }
        function selectLine(id,customer){
            if(selectedLine.value){
                const myElt=document.getElementById(selectedLine.value)
                if(myElt){
                    const children =  myElt.childNodes
                    children.forEach(element => {
                        element.classList.add('has-background-light')
                        element.classList.remove('has-background-orange-light')
                    })
                }
                selectedCustomer.value = ''
            }
            selectedLine.value=id
            const myElt=document.getElementById(id)
            if(myElt){
                const children =  myElt.childNodes
                console.log(children)
                children.forEach(element => {
                    element.classList.remove('has-background-light')
                    element.classList.add('has-background-orange-light')
                })
            }
            selectedCustomer.value = customer
        }



//Gestion des évèments et trigger
        onBeforeMount(() => {
            getPaymentPromiseList()
        })




        // expose to template and other options API hooks
        return {
            promiseList,filteredPromiseList,eltToSearch,
            dividedPromiseList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectedCustomer,selectLine,displaySelectedLineCard,
            displayLabel,getOptionLabelList,
            
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.paymentPromiseRightInfoMaxWidth,
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('paymentPromiseRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('paymentPromiseRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        DateIsDue(promiseDate,reminderDate){
            if(promiseDate && reminderDate){
                let pd = new Date(promiseDate)
                let rd = new Date(reminderDate)
                let currentDate = new Date()
                return ((pd <= currentDate) || (rd <= currentDate))
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
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else{
                return ''
            }
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
.has-text-orange{
    color: orange;
}
.has-text-orangered{
    color: orangered;
}
.has-background-orange{
    background-color: rgb(255, 155, 118);
}

.has-background-orange-light{
    background-color: rgba(255, 155, 118, 0.332);
}

.has-background-orange:hover {
    background-color: rgb(255, 68, 0);
}
.card-is-hoverable:hover{
    background-color: rgba(255, 68, 0, 0.068)
}
hr.rounded {
  border-top: 8px solid #bbb;
  border-radius: 5px;
}
.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: 0px; /* table head will be placed from the top of the table and sticks to it */
    z-index:15000
}

 .is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}

.is-line-due{
    font-style: italic;
    color: red;
    font-weight: bold;
}

</style>
