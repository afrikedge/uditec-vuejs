<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <customer-list-ribbon 
        pageTitle="Clients"
        componentwithPresentationView="customerListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onDeleteSearchData="()=>this.eltToSearch=''"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="customerListRightInfoMaxWidth"
        :displayCardBtnDisabled="false"
        ></customer-list-ribbon>

        

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
            <div class="column is-narrow " style="margin-left: auto;margin-right: auto;" v-if="customerList.length == 0 && res_fetching_data_occur">
                Aucun enregistrement n'a été trouvé
            </div>
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="res_fetching_data_occur && customerList.length > 0 && presentationView=='list' && !error_fetching_data_occur"  @scroll="(ev)=>loadMoreCustomersByScroll(ev)">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Forme juridique</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode d'identification</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Gestionnaire</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Solde</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Solde dû</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut actuel</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Ville</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;" @click="getMoreCustomers">Téléphone</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="customer['No_']" v-for="customer of customerList" :key="customer['No_']" class="is-narrow" @mouseover="setLineShadow(customer['No_'])" @mouseout="removeLineShadow(customer['No_'])" @click="selectLine(customer['No_'])">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/CustomerCard/${ customer['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ customer['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ customer['Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForCustomerType',customer['Customer Type']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForlegalStatus',customer['Legal Status']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForIDMode',customer['Identification Mode']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ customer['Sales Mode'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ customer['Salesperson Code'] }}</td>                    
                            <td class="has-text-right has-text-orange has-background-light is-narrow">{{ formatAmount(customer['Balance Amount']) }}</td>                    
                            <td class="has-text-right has-text-orange has-background-light is-narrow"> {{ formatAmount(customer['Amount Due']) }}</td>                    
                            <td class="has-text-left has-background-light is-narrow"> {{ customer['Salesperson Code'] }}</td>                    
                            <td class="has-text-left has-background-light is-narrow"> {{ customer['City'] }}</td>                    
                            <td class="has-text-left has-background-light is-narrow"> {{ customer['Phone No_'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && customerList.length > 0 && presentationView=='mosaique' && !error_fetching_data_occur">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="customer of customerList" :key="customer['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        
                                        <router-link :to="`/CustomerCard/${ customer['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ customer['No_'] }} 
                                            </a>
                                        </router-link>
                            
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ customer['Name'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ customer['Credit Limit (LCY)'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ customer['Contact'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{ customer['Amount Due'] }}</span>
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
            <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && customerList.length > 0 && presentationView=='mosaique haute' && !error_fetching_data_occur">
                <div class="columns is-multiline is-gapless">
                    <div :class="{'column':true, 'is-2':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="customer of customerList" :key="customer['No_']">
                        <div class="has-background-white m-1">
                            <div class="card-is-hoverable box">
                                <div class="">
                                    <div class="has-text-left">
                                        <a href="#">
                                            <span class="py-0">...</span>
                                        </a>
                                    </div>
                                    <div class="is-flex is-justify-content-center">
                                        <figure class="image is-128x128">
                                            <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                        </figure>
                                    </div>
                                    <hr class="rounded">
                                    <div class="">
                                        <p class="has-text-left ">
                                            <span class="is-size-7 has-text-grey has-background-light">
                                        
                                                <router-link :to="`/CustomerCard/${ customer['No_'] }`">
                                                    <a href="#" class="has-text-orange">
                                                        {{ customer['No_'] }} 
                                                    </a>
                                                </router-link>
                            
                                            </span>
                                        </p>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left has-text-orange py-0 mt-1" >
                                                <span class="is-size-7 is-underlined">{{ customer['Name'] }}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0 mt-1">
                                                <span class="is-size-7">{{ customer['Credit Limit (LCY)'] }}</span>
                                            </div>
                                        </div>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left py-0" >
                                                <span class="is-size-7">{{customer['Contact']}}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0">
                                                <span class="is-size-7">{{ customer['Amount Due'] }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <customer-info class="customer-info" v-if="selectedLine" :customerNo="selectedLine"></customer-info>
        </div>
    </div>

    <div style="position: absolute; bottom: 0px; left:0px">
        <a href="#" class="button is-small has-text-white has-background-orange"
            @click="loadMoreCustomersByButton" v-if="!moreCustomersAreLoading && customerList.length > 0">
            Charger plus
        </a>
        <span v-if="moreCustomersAreLoading">
            <span class="icon mr-1">
                <i class="fas fa-spinner fa-pulse"></i>
            </span>
            Chargement..
        </span>
    </div>
    
</template>

<script scoped>
import CustomerInfo from './CustomerInfo.vue'
import CustomerListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import { onBeforeMount, ref, watch } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'


export default {

    name:'customer-list',
    components:{
        CustomerInfo,CustomerListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['customerListPresentation']
        }
    },
    setup() {
        const hostname=window.location.hostname
        const router = useRouter()
        const customerList = ref([])
                
        
        //sac de label de notre liste
        const labelBag = {
            optionLabelListForCustomerType:ref([]),
            optionLabelListForlegalStatus:ref([]),
            optionLabelListForIDMode:ref([])
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
        const awaitingSearch =ref(false)
        function searchCustomerList(){
            res_fetching_data_occur.value = false
            error_fetching_data_occur.value = false
            axios.get(`http://${hostname}:5000/app/searchCustomerList?eltToSearch=${eltToSearch.value}&listLength=0`)
            .then((res) => {
                if(res.data.eltToSearch == eltToSearch.value){
                    customerList.value = res.data.result;
                    res_fetching_data_occur.value = true
                }
            })
            .catch(()=>{
                error_fetching_data_occur.value = true
            });
        }
        function searchMoreCustomers(){
            moreCustomersAreLoading.value = true
            axios.get(`http://${hostname}:5000/app/searchCustomerList?eltToSearch=${eltToSearch.value}&listLength=${customerList.value.length}`)
            .then((res) => {
                if(res.data.eltToSearch == eltToSearch.value){
                    customerList.value.push(...res.data.result);
                    res_fetching_data_occur.value = true
                    moreCustomersAreLoading.value = false
                    console.log('searching data loaded')
                }
            })
            .catch(()=>{
                error_fetching_data_occur.value = true
            });
        }



//Gestion de la récupération de la liste à afficher
        const res_fetching_data_occur = ref(false)
        const error_fetching_data_occur = ref(false)
        const moreCustomersAreLoading = ref(false)
        function getCustomerList(){
            res_fetching_data_occur.value = false
            error_fetching_data_occur.value = false
            axios.get(`http://${hostname}:5000/app/getCustomerList?listLength=0`)
            .then((result) => {
                if(!eltToSearch.value){
                    customerList.value = result.data;
                    res_fetching_data_occur.value = true
                    if(customerList.value.length > 0)
                        setTimeout(()=>selectLine(customerList.value[0]['No_']),1000)
                }

                getOptionLabelList('[Customer Type]','optionLabelListForCustomerType')
                getOptionLabelList('[Legal Status]','optionLabelListForlegalStatus')
                getOptionLabelList('[Identification Mode]','optionLabelListForIDMode')
            })
            .catch(()=>{
                error_fetching_data_occur.value = true
            });
        }
        function getMoreCustomers(){
            console.log('getting more data')
            moreCustomersAreLoading.value = true
            axios.get(`http://${hostname}:5000/app/getCustomerList?listLength=${customerList.value.length}`)
            .then((result) => {
                if(!eltToSearch.value){
                    customerList.value.push(...result.data);
                    res_fetching_data_occur.value = true
                    moreCustomersAreLoading.value = false
                    console.log('more data loaded')
                }
            })
            .catch(()=>{
                error_fetching_data_occur.value = true
            });
        }
        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            }
        }
        const loadMoreCustomersByScroll = debounce((ev)=>{
            let scrollDiv = document.getElementById('customer-column')
            if(scrollDiv.offsetHeight + ev.target.scrollTop >= ev.target.scrollHeight )
                if(eltToSearch.value)
                    searchMoreCustomers()
                else
                    getMoreCustomers()

        },250)

        const loadMoreCustomersByButton = ()=>{
            if(eltToSearch.value){
                searchMoreCustomers()
            }else{
                getMoreCustomers()
            }
        }

//Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`customerCard/${selectedLine.value}`)
        }
        function selectLine(id){
            if(selectedLine.value){
                const myElt=document.getElementById(selectedLine.value)
                if(myElt){
                    const children =  myElt.childNodes
                    children.forEach(element => {
                        if(element.classList){
                            element.classList.add('has-background-light')
                            element.classList.remove('has-background-orange-light')
                        }
                    })
                }
            }
            selectedLine.value=id
            const myElt=document.getElementById(id)
            if(myElt){
                const  children =  myElt.childNodes
                children.forEach(element => {
                    if(element.classList){
                        element.classList.remove('has-background-light')
                        element.classList.add('has-background-orange-light')
                    }
                })
            }
        }

        onBeforeMount(() => {
            getCustomerList()
        })
        watch(eltToSearch,()=>{
            if(!awaitingSearch.value){
                setTimeout(() => {
                    if(eltToSearch.value){
                        searchCustomerList();
                        awaitingSearch.value = false;
                    }else{
                        getCustomerList()
                        awaitingSearch.value = false;
                    }
                }, 1000)
            }
            awaitingSearch.value = true;
        })

        // expose to template and other options API hooks
        return {
            customerList,eltToSearch,
            selectedLine,selectLine,displaySelectedLineCard,
            displayLabel,
            res_fetching_data_occur,error_fetching_data_occur,
            loadMoreCustomersByScroll,loadMoreCustomersByButton,getMoreCustomers,moreCustomersAreLoading,

        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.customerListRightInfoMaxWidth, 
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('customerListRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('customerListRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
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
.has-background-orange:hover {
    background-color: rgb(255, 68, 0);
}
.has-background-orange-light{
    background-color: rgba(255, 155, 118, 0.332);
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

</style>
