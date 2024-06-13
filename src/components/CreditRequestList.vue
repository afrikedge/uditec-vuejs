<template>
    <div class="my-5 mx-5">
        
        <c-r-list-ribbon 
        pageTitle="Demandes de crédit"
        routeForNewCard="NewcreditRequest"
        componentwithPresentationView="creditRequestListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="creditRequestListRightInfoMaxWidth"
        :newCardBtnDisabled="false"
        :editCardBtnDisabled="false"
        :printCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        :convertQuoteBtnDisabled="false"
        ></c-r-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant TTC</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut validation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="" v-for="creditRequest of filteredCRList" :key="creditRequest['No_']">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/creditRequestCard/${creditRequest['No_']}`">
                                    <a href="#" class="has-text-orange">
                                        {{ creditRequest['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light"> {{ creditRequest['Sell-to Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Sell-to Customer Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Sell-to Contact No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Salesperson Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Location Code'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDate(creditRequest['Document Date']) }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Total Amount'] }}</td>                
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Total Amount Including VAT'] }}</td>                               
                            <td class="has-text-left has-background-light is-narrow"> {{ creditRequest['Approval Status'] }}</td>                                                 
                        </tr>
                    </tbody>
                </table>
                <div class="mt-5" v-if="error_fetching_crl_list">
                    <span class="subtitle is-7">{{ error_fetching_crl_list }}</span>
                </div>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="mt-5" v-if="error_fetching_crl_list">
                    <span class="subtitle is-7">{{ error_fetching_crl_list }}</span>
                </div>
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':creditRequestInfoCompMaxWidth=='0px', 'is-one-third':creditRequestInfoCompMaxWidth=='800px'}" v-for="creditRequest of  filteredCRList" :key="creditRequest['No_']">
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

            <customer-info class="customer-info" v-if="true"></customer-info>
            <prospect-info class="prospect-info" v-else></prospect-info>
        </div>
    </div>
    
</template>

<script>
import CustomerInfo from './CustomerInfo.vue'
import ProspectInfo from './ProspectInfo.vue'
import CRListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import { computed,onMounted,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'



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

        const hostname=window.location.hostname
        const respCenter=ref(useWebUserInfoStore().responsibilityCenter)
        const error_fetching_crl_list = ref('')
        const creditRequestList = ref([])
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

    function getCreditRequestList(){
        axios.get(`http://${hostname}:3000/app/getCRList?respCenter=${respCenter.value}`)
        .then(result => {
            creditRequestList.value=result.data
            error_fetching_crl_list.value=''
            console.log(result.data)
        }).catch(err=>{
            if(err.response.data){
                error_fetching_crl_list.value = err.response.data.message
            }
        })
    }

    function getWebUserInfo(){
        axios.get(`http://${hostname}:3000/app/getUserInfo?webUser=DAVID`)
        .then(res=>{
            useWebUserInfoStore().fillWebUserInfo(res.data.recordset[0])
            respCenter.value=useWebUserInfoStore().responsibilityCenter
            getCreditRequestList()
        })
        .catch(err=>console.log(err))
    }

    function formatDate(date){
        const dateString = new String(date)
        if (dateString.includes('1753-')) return ''
        else return new Date(date).toLocaleDateString()
    }

    onMounted(()=>{
        if(respCenter.value){
            getCreditRequestList()
        }else{
            getWebUserInfo()
        }
    })

    // expose to template and other options API hooks
        return {
            error_fetching_crl_list,
            eltToSearch,
            filteredCRList,
            creditRequestList,
            getCreditRequestList,
            formatDate
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
.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
 }
</style>

