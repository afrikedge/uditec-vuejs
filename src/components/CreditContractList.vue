<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <customer-list-ribbon 
        pageTitle="Contrats Achat Groupé"
        componentwithPresentationView="creditContractListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onDeleteSearchData="()=>this.eltToSearch=''"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="creditContractListRightInfoMaxWidth"
        routeForNewCard="NewCreditContract"
        :newCardBtnDisabled="false"
        :editCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        ></customer-list-ribbon>


        <div class="has-background-light columns mb-1 is-gapless" style="overflow-y: hidden;height:auto;position: fixed;bottom:0px;top:200px; width:auto;right:6%;left:6%">
                <!--div class="loader"></div-->
            <div class="loading_container" style="width:100%;" v-if="!res_fetching_data_occur && !error_fetching_data_occur">
                <progress class="progress is-large is-light my-1" max="100" v-for="i of 100" :key="i" style="border-radius: 0px;">15%</progress>
            </div>
            <div class="column is-narrow " style="margin: auto;" v-if="error_fetching_data_occur">
                <article class="message is-danger">
                    <div class="message-header">
                        <p>Error</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        L'application n'a pas pu obtenir de résultat 
                    </div>
                </article>
            </div>
            <div class="column is-narrow " style="margin-left: auto;margin-right: auto;" v-if="filteredCreditContractList.length == 0 && res_fetching_data_occur">
                Aucun enregistrement n'a été trouvé
            </div>
            <div class="column mt-5" id="customer-column"   v-if="res_fetching_data_occur && filteredCreditContractList.length > 0 && presentationView=='list' && !error_fetching_data_occur" style="overflow: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow pt-2" style="min-width: 100px;">N° contrat</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow pt-2" style="min-width: 100px;">N° client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow pt-2" style="min-width: 100px;">Nom client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow pt-2" style="min-width: 100px;">Date début opération</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow pt-2" style="min-width: 100px;">Durée de l'opération (mois)</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow pt-2" style="min-width: 100px;">Date fin opération</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow pt-2" style="min-width: 100px;">Mode de règlement</th>
                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7 is-narrow pt-2" style="min-width: 100px;">Statut</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="creditContract['No_']" v-for="creditContract of dividedCreditContractList" :key="creditContract['No_']" @mouseover="setLineShadow(creditContract['No_'])" @mouseout="removeLineShadow(creditContract['No_'])" @click="selectLine(creditContract['No_'],creditContract['Customer No_'],creditContract['Account Type'])" class="is-narrow">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/CreditContractCard?contractNo=${creditContract['No_']}`">
                                    <a href="#" class="has-text-orange ">
                                        {{ creditContract['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditContract['Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditContract['Customer Name']}}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(creditContract['OP Starting Date'])}}</td>
                            <td class="has-text-right has-background-light is-narrow"> {{ creditContract['OP Duration (Month)'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(creditContract['OP Ending Date'])}}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditContract['Payment Method Code'] }}</td>
                            <td class="has-text-centered has-background-light is-narrow has-text-weight-bold">
                                <span class="tag is-white box py-0 px-2"  v-if="creditContract['Approval Status'] == 0 || creditContract['Approval Status'] == 1">
                                    {{ displayLabel('optionLabelListForApprovalStatus',creditContract['Approval Status']) }}
                                </span>
                                <span class="tag is-warning is-light box py-0 px-2"  v-else-if="(creditContract['Approval Status'] >1 && creditContract['Approval Status'] <=6) || creditContract['Approval Status'] == 12">
                                    {{ displayLabel('optionLabelListForApprovalStatus',creditContract['Approval Status']) }}
                                </span>
                                <span class="tag is-danger is-light box py-0 px-2" v-else-if="creditContract['Approval Status']==9 || creditContract['Approval Status']==10">
                                    {{ displayLabel('optionLabelListForApprovalStatus',creditContract['Approval Status']) }}
                                </span>
                                <span class="tag is-success box py-0 px-2" v-else>
                                    {{ displayLabel('optionLabelListForApprovalStatus',creditContract['Approval Status']) }}
                                </span>
                            </td>                                                 
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && filteredCreditContractList.length > 0 && presentationView=='mosaique' && !error_fetching_data_occur">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="creditContract of dividedCreditContractList" :key="creditContract['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        
                                        <router-link :to="`/CreditContractCard/${ creditContract['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ creditContract['No_'] }} 
                                            </a>
                                        </router-link>
                            
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ creditContract['Customer No_'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ creditContract['Customer Name'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ formatDate(creditContract['OP Starting Date']) }}</span>
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
            <customer-info class="customer-info" v-if="selectedAccountType==1" :documentNo="selectedLine" :customerNo="selectedCustomer" documentType="CreditContract"></customer-info>
            <lead-info class="lead-info" v-if="selectedAccountType==0"></lead-info>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredCreditContractList.length) && (currentPage !== Math.ceil(filteredCreditContractList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredCreditContractList.length">
        <a href="#" @click="nextPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
            <span class="icon">
                <i class="fas fa-chevron-right"></i>
            </span>                
        </a>
    </div>
    
</template>

<script scoped>
import CustomerInfo from './CustomerInfo.vue'
import LeadInfo from './ProspectInfo.vue'
import CustomerListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'


export default {

    name:'creditContract-contract-list',
    components:{
        CustomerInfo,LeadInfo,CustomerListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['creditContractListPresentation']
        }
    },
    setup() {
        const hostname=window.location.hostname
        const router = useRouter()
        const  creditContractList = ref([])

        //sac des labels de la fiche
        const labelBag ={
            optionLabelListForApprovalStatus:ref([]),
        }

        //fonction pour afficher le label pour une valeur donnée
        function displayLabel(listToGetLabel,valueToGetLabel){
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


//Gestion de la recherche
        const eltToSearch = ref('')
        const filteredCreditContractList = computed(()=>
            creditContractList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Customer Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
        )

//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(40)
        const dividedCreditContractList = computed(()=>{
            if(eltToSearch.value){
                return filteredCreditContractList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredCreditContractList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredCreditContractList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }


//Gestion de la récupération de la liste des contrats à afficher
        const res_fetching_data_occur = ref(false)
        const error_fetching_data_occur = ref(false)
        function getCreditContractList(){
            axios.get(`http://${hostname}:5000/app/getCreditContractList`)
            .then((result) => {
                creditContractList.value = result.data;
                res_fetching_data_occur.value = true
                if(creditContractList.value.length > 0)
                    setTimeout(()=>selectLine(creditContractList.value[0]['No_'],creditContractList.value[0]['Customer No_'],creditContractList.value[0]['Account Type']),1000)
                getOptionLabelList('[Approval Status]','optionLabelListForApprovalStatus')
            })
            .catch(()=>{
                error_fetching_data_occur.value = true
            });
        }


//Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        const selectedCustomer = ref('')
        const selectedAccountType = ref(-1)
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`CreditContractCard?contractNo=${selectedLine.value}`)
        }
        function selectLine(id,customer,accountType){
            if(selectedLine.value){
                const myElt=document.getElementById(selectedLine.value)
                if(myElt){
                    const children =  myElt.childNodes
                    children.forEach(element => {
                        element.classList.add('has-background-light')
                        element.classList.remove('has-background-orange-light')
                    })
                }
                selectedAccountType.value = -1
                selectedCustomer.value = ''
            }
            selectedLine.value=id
            const myElt=document.getElementById(id)
            console.log(id)
            console.log(myElt)
            if(myElt){
                const children =  myElt.childNodes
                children.forEach(element => {
                    element.classList.remove('has-background-light')
                    element.classList.add('has-background-orange-light')
                })
            }
            selectedAccountType.value = accountType
            selectedCustomer.value = customer
        }

//Gestion des évènements, erreurs et trigger
        onBeforeMount(()=>{
            getCreditContractList()
        })





        // expose to template and other options API hooks
        return {
            creditContractList,
            eltToSearch,filteredCreditContractList,
            dividedCreditContractList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectedCustomer,selectedAccountType,selectLine,displaySelectedLineCard,
            displayLabel,
            res_fetching_data_occur,error_fetching_data_occur
        }
    },
    data(){
        return {


            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.creditContractListRightInfoMaxWidth,
            
            //nom de l'hote dans l'url 
            hostname:window.location.hostname       
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('creditContractListRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('creditContractListRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },

        formatDate(date){
            if (new String(date).includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
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
    
    mounted(){
        
      
    }
}

</script>

<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}
.lead-info{
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
.has-background-orange-light{
    background-color: rgba(255, 155, 118, 0.332);
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
.loader {
  margin: auto;
  border: 20px solid #EAF0F6;
  border-radius: 50%;
  border-top: 20px solid #FF7A59;
  width: 200px;
  height: 200px;
  animation: spinner 4s linear infinite;
}
@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
