<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <customer-list-ribbon 
        pageTitle="Demande de déblocage"
        componentwithPresentationView="customerListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onDeleteSearchData="()=>this.eltToSearch=''"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="customerListRightInfoMaxWidth"
        :displayCardBtnDisabled="false"
        ></customer-list-ribbon>


        <div class="has-background-light columns mb-1 is-gapless" style="overflow-y: hidden;height:auto;position: fixed;bottom:0px;top:200px; width:auto;right:6%;left:6%">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° Demande</th>
                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Statut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Objet</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° Client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Gestionnaire</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Limite de crédit</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow"  style="min-width: 100px;">Encours</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow"  style="min-width: 100px;">Encours échue</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow"  style="min-width: 100px;">Crée le</th>
                            
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="release['No_']" v-for="release of  dividedReleaseList" :key="release['No_']" class="is-narrow"  @mouseover="setLineShadow(release['No_'])" @mouseout="removeLineShadow(release['No_'])" @click="selectLine(release['No_'])">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/ReleaseRequestCard?documentNo=${ release['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ release['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-centered has-background-light is-narrow has-text-weight-bold">
                                <span class="tag is-white box py-0 px-2"  v-if="release['Approval Status'] == 6">
                                    {{ displayLabel('optionLabelListForApprovalStatus',release['Approval Status']) }}
                                </span>
                                <span class="tag is-danger is-light box py-0 px-2"  v-if="release['Approval Status'] == 10">
                                    {{ displayLabel('optionLabelListForApprovalStatus',release['Approval Status']) }}
                                </span>
                                <span class="tag is-success box py-0 px-2"  v-if="release['Approval Status'] == 7 || release['Approval Status'] == 8">
                                    {{ displayLabel('optionLabelListForApprovalStatus',release['Approval Status']) }}
                                </span>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ release['Subject'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ release['Customer No_']}}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ release['Sales person Code'] }}</td>
                            <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(release['Credit Limit (LCY)']) }}</td>
                            <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(release['Balance Amount']) }}</td>
                            <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(release['Amount Due']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{formatDateHour(release['Created on'])}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredReleaseList.length) && (currentPage !== Math.ceil(filteredReleaseList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredReleaseList.length">
        <a href="#" @click="nextPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
            <span class="icon">
                <i class="fas fa-chevron-right"></i>
            </span>                
        </a>
    </div>
    
</template>

<script scoped>
import CustomerListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'


export default {

    name:'release-request-list',
    components:{
        CustomerListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['customerListPresentation']
        }
    },
    setup() {
        const releaseList = ref([])
        const hostname = window.location.hostname 
        const router = useRouter()


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
        const  filteredReleaseList = computed(()=>
            releaseList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Credit Limit (LCY)']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Balance Amount']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            ),
        )


//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(40)
        const dividedReleaseList = computed(()=>{
            if(eltToSearch.value){
                return filteredReleaseList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredReleaseList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredReleaseList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }



        //fonction pour obtenir la liste à afficher
        function getReleaseRequestList(){
            axios.get(`http://${hostname}:5000/app/getSOUnlockingList`)
            .then((result) => {
                releaseList.value = result.data;
                getOptionLabelList('[Approval Status]','optionLabelListForApprovalStatus')
                if(releaseList.value.length > 0)
                    setTimeout(()=>selectLine(releaseList.value[0]['No_']),1000)
            })
            .catch(err=>console.log(err));
        }



//Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`releaseRequestCard?documentNo=${selectedLine.value}`)
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


        onBeforeMount(()=>{
            getReleaseRequestList()
        })

        // expose to template and other options API hooks
        return {
            releaseList,eltToSearch,filteredReleaseList,
            dividedReleaseList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectLine,displaySelectedLineCard,
            displayLabel,
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
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else{ return ''} 
        },
        formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
            }else{
                return 0
            }
        },
        setLineShadow(id){
            if(id){
                const myElt=document.getElementById(id)
                myElt.classList.add('is-hovered-td')
                myElt.classList.add('shadow')
            }
        },
        removeLineShadow(id){
            if(id){
                const myElt=document.getElementById(id)
                myElt.classList.remove('is-hovered-td')
                myElt.classList.remove('shadow')
            }
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
    z-index: 15000;
}
.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}

</style>
