<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <customer-list-ribbon 
        pageTitle="Demandes de revision"
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Nom du client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Mode de vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Mode de paiement</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Limite de crédit</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Crée le</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Crée par</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="revision['Revision No_']" v-for="revision of dividedRevisionList" :key="revision['Revision No_']" class="is-narrow"  @mouseover="setLineShadow(revision['No_'])" @mouseout="removeLineShadow(revision['No_'])" @click="selectLine(revision['No_'])">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/RevisionRequestCard?documentNo=${ revision['Revision No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ revision['Revision No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-centered has-background-light is-narrow has-text-weight-bold">
                                <span class="tag is-white box py-0 px-2"  v-if="release['Approval Status'] == 6">
                                    {{ displayLabel('optionLabelListForApprovalStatus',revision['Approval Status']) }}
                                </span>
                                <span class="tag is-danger is-light box py-0 px-2"  v-if="revision['Approval Status'] == 10">
                                    {{ displayLabel('optionLabelListForApprovalStatus',revision['Approval Status']) }}
                                </span>
                                <span class="tag is-success box py-0 px-2"  v-if="revision['Approval Status'] == 7 || revision['Approval Status'] == 8">
                                    {{ displayLabel('optionLabelListForApprovalStatus',revision['Approval Status']) }}
                                </span>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ revision['Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ revision['Customer Name'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ revision['Sales Mode'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ revision['Payment Method Code'] }}</td>
                            <td class="has-text-right has-background-light is-narrow"> {{ revision['Credit Limit (LCY)'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(revision['Created on']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ revision['Created by'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredRevisionList.length) && (currentPage !== Math.ceil(filteredRevisionList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredRevisionList.length">
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
import {computed , onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'


export default {

    name:'revision-request-list',
    components:{
        CustomerListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['customerListPresentation']
        }
    },
    setup() {
        const revisionList = ref([])
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
        const filteredRevisionList = computed(()=>
            revisionList.value
            .filter((row) => new String(row['Revision No_']).toLowerCase().includes(eltToSearch.value)
                    || new String(row['Customer Name']).toLowerCase().includes(eltToSearch.value)
                    || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value)
                    || new String(row['Sales Mode']).toLowerCase().includes(eltToSearch.value)
            ),
        )


//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(40)
        const dividedRevisionList = computed(()=>
            filteredRevisionList.value
            .filter((row, index) => {
                let start = (currentPage.value-1)*pageSize.value;
                let end = currentPage.value*pageSize.value;
                if(index >= start && index < end) return true;
            })
        )
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredRevisionList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }



        //fonction pour obtenir la liste à afficher
        function getRevisionRequestList(){
            axios.get(`http://${hostname}:5000/app/getRevisionRequestList`)
            .then((result) => {
                revisionList.value = result.data;
                getOptionLabelList('[Approval Status]','optionLabelListForApprovalStatus')
                if(revisionList.value.length > 0)
                    setTimeout(()=>selectLine(revisionList.value[0]['No_']),1000)
            })
            .catch(err=>console.log(err));
        }


        //Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`RevisionRequestCard?documentNo=${selectedLine.value}`)
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
            getRevisionRequestList()
        })


        // expose to template and other options API hooks
        return {
            revisionList,eltToSearch,filteredRevisionList,
            dividedRevisionList,pageSize,currentPage,nextPage,prevPage,
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
