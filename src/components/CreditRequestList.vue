<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <c-r-list-ribbon 
        pageTitle="Demandes de crédit"
        routeForNewCard="NewcreditRequest"
        componentwithPresentationView="creditRequestListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onDeleteSearchData="()=>this.eltToSearch=''"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="creditRequestListRightInfoMaxWidth"
        :newCardBtnDisabled="false"
        :editCardBtnDisabled="false"
        :printCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        :convertQuoteBtnDisabled="false"
        ></c-r-list-ribbon>


        <div class="has-background-light columns mb-1 is-gapless" style="overflow-y: hidden;height:auto;position: fixed;bottom:0px;top:200px; width:auto;right:6%;left:6%">
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
            <div class="column is-narrow " style="margin-left: auto;margin-right: auto;" v-if="filteredCRList.length == 0 && res_fetching_data_occur">
                Aucun enregistrement n'a été trouvé
            </div>
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="res_fetching_data_occur && filteredCRList.length > 0 && presentationView=='list' && !error_fetching_data_occur">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom du client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code contact</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code vendeur</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Magasin par défaut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date du devis</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant HT</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Montant TTC</th>
                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7" style="min-width: 100px;">Statut validation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :id="creditRequest['No_']" v-for="creditRequest of dividedCreditRequestList" :key="creditRequest['No_']" @mouseover="setLineShadow(creditRequest['No_'])" @mouseout="removeLineShadow(creditRequest['No_'])" @click="selectLine(creditRequest['No_'],creditRequest['Sell-to Customer No_']?creditRequest['Sell-to Customer No_']:creditRequest['Sell-to Contact No_'],creditRequest['Sell-to Customer No_']?1:0)">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/creditRequestCard/${creditRequest['No_']}`">
                                    <a href="#" class="has-text-orange">
                                        {{ creditRequest['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Sell-to Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Sell-to Customer Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Sell-to Contact No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Salesperson Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Location Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(creditRequest['Document Date']) }}</td>                
                            <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(creditRequest['Total Amount']) }}</td>                
                            <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(creditRequest['Total Amount Including VAT']) }}</td>                               
                            <td class="has-text-centered has-background-light is-narrow has-text-weight-bold">
                                <span class="tag is-white box py-0 px-2"  v-if="creditRequest['Approval Status'] == 0 || creditRequest['Approval Status'] == 1">
                                    {{ displayLabel('optionLabelListForApprovalStatus',creditRequest['Approval Status']) }}
                                </span>
                                <span class="tag is-warning is-light box py-0 px-2"  v-else-if="(creditRequest['Approval Status'] >1 && creditRequest['Approval Status'] <=6) || creditRequest['Approval Status'] == 12">
                                    {{ displayLabel('optionLabelListForApprovalStatus',creditRequest['Approval Status']) }}
                                </span>
                                <span class="tag is-danger is-light box py-0 px-2"  v-else-if="creditRequest['Approval Status']==9 || creditRequest['Approval Status']==10">
                                    {{ displayLabel('optionLabelListForApprovalStatus',creditRequest['Approval Status']) }}
                                </span>
                                <span class="tag is-success box py-0 px-2"  v-else>
                                    {{ displayLabel('optionLabelListForApprovalStatus',creditRequest['Approval Status']) }}
                                </span>
                            </td>                                                 
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && filteredCRList.length > 0 && presentationView=='mosaique' && !error_fetching_data_occur">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':creditRequestInfoCompMaxWidth=='0px', 'is-one-third':creditRequestInfoCompMaxWidth=='800px'}" v-for="creditRequest of  dividedCreditRequestList" :key="creditRequest['No_']">
                        <div class=" columns p-1  card-is-hoverable">
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey">{{ creditRequest['No_'] }}</span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <router-link :to="`/creditRequestCard/${ creditRequest['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                <span class="is-size-7 is-underlined">{{ creditRequest['Sell-to Customer Name'] }}</span>
                                            </a>
                                        </router-link>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ creditRequest['Total Amount Including VAT'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ creditRequest['Salesperson Code'] }}</span>
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

            <customer-info class="customer-info" v-if="selectedAccountType==1" :documentNo="selectedLine" :customerNo="selectedCustomer" documentType="CreditRequest"></customer-info>
            <prospect-info class="prospect-info" v-if="selectedAccountType==0 && false"></prospect-info>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredCRList.length) && (currentPage !== Math.ceil(filteredCRList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredCRList.length">
        <a href="#" @click="nextPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
            <span class="icon">
                <i class="fas fa-chevron-right"></i>
            </span>                
        </a>
    </div>
    
</template>

<script>
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import CRListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import { computed,onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'



export default {
    name:'credit-request-list',
    components:{
        CustomerInfo,ProspectInfo,CRListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['creditRequestListPresentation']
        }
    },
    setup() {
        const hostname = window.location.hostname
        const router = useRouter()
        const creditRequestList = ref([])

        //Sac de label de la fiche
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
        const filteredCRList = computed(()=>
        creditRequestList.value
        .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Sell-to Customer Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Sell-to Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Salesperson Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Location Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Total Amount']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Total Amount Including VAT']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
        )


//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(40)
        const dividedCreditRequestList = computed(()=>{
            if(eltToSearch.value){
                return filteredCRList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredCRList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredCRList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }


//Gestion de la récupération de la liste des demandes à afficher
        const res_fetching_data_occur = ref(false)
        const error_fetching_data_occur = ref(false)
        function getCreditRequestList(){
            axios.get(`http://${hostname}:5000/app/getCRList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result => {
                creditRequestList.value=result.data
                res_fetching_data_occur.value = true
                if(creditRequestList.value.length > 0){
                    let customer = creditRequestList.value[0]['Sell-to Customer No_']?creditRequestList.value[0]['Sell-to Customer No_']:creditRequestList.value[0]['Sell-to Contact No_']
                    let accountType = creditRequestList.value[0]['Sell-to Customer No_']?1:0
                    setTimeout(()=>selectLine(creditRequestList.value[0]['No_'],customer,accountType),1000)
                }
                getOptionLabelList('[Approval Status]','optionLabelListForApprovalStatus')
            }).catch(()=>{
                error_fetching_data_occur.value = true
            })
        }

//Gestion des formatages
        function formatDate(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')) return ''
                else return new Date(date).toLocaleDateString()
            }else{
                return ''
            }
        }
        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
            }else{
                return 0
            }
        }


//Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        const selectedCustomer = ref('')
        const selectedAccountType = ref(-1)
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`creditRequestCard/${selectedLine.value}`)
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
        getCreditRequestList()
    })

    // expose to template and other options API hooks
        return {
            creditRequestList,getCreditRequestList,
            eltToSearch,filteredCRList,
            dividedCreditRequestList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectedCustomer,selectedAccountType,selectLine,displaySelectedLineCard,
            formatDate,formatAmount,
            displayLabel,
            res_fetching_data_occur,error_fetching_data_occur
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            creditRequestInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.creditRequestListRightInfoMaxWidth,
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.creditRequestInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('creditRequestListRightInfoMaxWidth','800px')
                this.creditRequestInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('creditRequestListRightInfoMaxWidth','0px')
                this.creditRequestInfoCompMaxWidth='0px'
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
.customer-info,prospect-info{
    max-width: v-bind(creditRequestInfoCompMaxWidth);
    transition: max-width 0.5s;
}
.has-background-orange{
    background-color: rgb(255, 155, 118);
}
.has-background-orange:hover {
    background-color: rgb(255, 68, 0);
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


</style>

