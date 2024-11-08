<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <s-q-list-ribbon 
        pageTitle="Devis vente"
        routeForNewCard="NewSaleQuote"
        componentwithPresentationView="quoteListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onDeleteSearchData="()=>this.eltToSearch=''"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="quoteListRightInfoMaxWidth"
        :newCardBtnDisabled="false"
        :editCardBtnDisabled="false"
        :printCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        :convertQuoteBtnDisabled="false" class="mb-5"
        ></s-q-list-ribbon>


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
            <div class="column is-narrow " style="margin-left: auto;margin-right: auto;" v-if="filteredSQList.length == 0 && res_fetching_data_occur">
                Aucun enregistrement n'a été trouvé
            </div>
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="res_fetching_data_occur && filteredSQList.length > 0 && presentationView=='list' && !error_fetching_data_occur">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Nom du client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code contact</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code vendeur</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code campagne</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Magasin par défaut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date du devis</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date fin validité</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant HT</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant TTC</th>
                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :id="saleQuote['No_']" v-for="saleQuote of dividedSaleQuoteList" :key="saleQuote['No_']" @mouseover="setLineShadow(saleQuote['No_'])" @mouseout="removeLineShadow(saleQuote['No_'])" @click="selectLine(saleQuote['No_'],saleQuote['Sell-to Customer No_']?saleQuote['Sell-to Customer No_']:saleQuote['Sell-to Contact No_'],saleQuote['Sell-to Customer No_']?1:0)">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/SaleQuoteCard/${ saleQuote['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ saleQuote['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Sell-to Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Sell-to Customer Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Sell-to Contact No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Salesperson Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Campaign No_'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ saleQuote['Location Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleQuote['Document Date']) }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleQuote['Quote Valid Until Date']) }}</td>                               
                            <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(saleQuote['Total Amount']) }}</td>                               
                            <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(saleQuote['Total Amount Including VAT']) }}</td>                               
                            <td class="has-text-centered has-background-light is-narrow has-text-primary has-text-weight-semibold">
                                <span class="tag is-white box py-0 px-2"  v-if="saleQuote['Status']==0">
                                    {{ displayLabel('optionLabelListForApprovalStatus',saleQuote['Status']) }}
                                </span>
                                <span class="tag is-success box py-0 px-2"  v-else-if="saleQuote['Status']==1 || saleQuote['Status']==3">
                                    {{ displayLabel('optionLabelListForApprovalStatus',saleQuote['Status']) }}
                                </span>
                                <span class="tag is-warning is-light box py-0 px-2" v-else>
                                    {{ displayLabel('optionLabelListForApprovalStatus',saleQuote['Status']) }}
                                </span>
                            </td>                               
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && filteredSQList.length > 0 && presentationView=='mosaique' && !error_fetching_data_occur">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="saleQuote of dividedSaleQuoteList" :key="saleQuote['No_']">
                        <div class=" columns p-1  card-is-hoverable">
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey">{{ saleQuote['No_'] }}</span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0 mt-1" >
                                        <router-link :to="`/SaleQuoteCard/${ saleQuote['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                <span class="is-size-7 is-underlined">{{ saleQuote['Sell-to Customer Name'] }}</span>
                                            </a>
                                        </router-link>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ saleQuote['Total Amount Including VAT'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ saleQuote['Salesperson Code'] }}</span>
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

            <customer-info class="customer-info" v-if="selectedAccountType==1" :customerNo="selectedCustomer"></customer-info>
            <prospect-info class="prospect-info" v-if="selectedAccountType==0"></prospect-info>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredSQList.length) && (currentPage !== Math.ceil(filteredSQList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredSQList.length">
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
import SQListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import { computed,onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'



export default {
    name:'sale-quote-list',
    components:{
        CustomerInfo,ProspectInfo,SQListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['quoteListPresentation']
        }
    },
    setup() {
        const hostname = window.location.hostname
        const router = useRouter() 
        const saleQuoteList = ref([])

        //sac de label de notre liste
        const labelBag = {
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
        const filteredSQList = computed(()=>
            saleQuoteList.value
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
        const dividedSaleQuoteList = computed(()=>{
            if(eltToSearch.value){
                return filteredSQList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredSQList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredSQList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }


//Gestion de la récupération de la liste des contrats à afficher
        const res_fetching_data_occur = ref(false)
        const error_fetching_data_occur = ref(false)
        function getSQList(){
            axios.get(`http://${hostname}:5000/app/getSQList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then((result) => {
                saleQuoteList.value = result.data.recordset
                res_fetching_data_occur.value = true
                if(saleQuoteList.value.length > 0){
                    let customer = saleQuoteList.value[0]['Sell-to Customer No_']?saleQuoteList.value[0]['Sell-to Customer No_']:saleQuoteList.value[0]['Sell-to Contact No_']
                    let accountType = saleQuoteList.value[0]['Sell-to Customer No_']?1:0
                    setTimeout(()=>selectLine(saleQuoteList.value[0]['No_'],customer,accountType),1000)
                }
                getOptionLabelList('[Status]','optionLabelListForApprovalStatus')
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
                router.push(`SaleQuoteCard/${selectedLine.value}`)
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
                console.log(children)
                children.forEach(element => {
                    element.classList.remove('has-background-light')
                    element.classList.add('has-background-orange-light')
                })
            }
            selectedAccountType.value = accountType
            selectedCustomer.value = customer
        }
        
        
//Gestion des évènements, erreurs et trigger
        onBeforeMount(() => {
            getSQList()
        })

    // expose to template and other options API hooks
        return {
            saleQuoteList,
            eltToSearch,filteredSQList,
            dividedSaleQuoteList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectedCustomer,selectedAccountType,selectLine,displaySelectedLineCard,
            displayLabel,
            res_fetching_data_occur,error_fetching_data_occur

        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.quoteListRightInfoMaxWidth,
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('quoteListRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('quoteListRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        formatDate(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString()
            }else{
                return ''
            }
        },
        formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
            }else{
                return 0
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
    max-width: v-bind(customerInfoCompMaxWidth);
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

