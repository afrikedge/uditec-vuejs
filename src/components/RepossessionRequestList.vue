<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <repossession-request-list-ribbon 
        pageTitle="Demandes de repossession"
        componentwithPresentationView="repossRequestListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="repossRequestRightInfoMaxWidth"
        routeForNewCard="NewRepossessionRequest"
        :newCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        ></repossession-request-list-ribbon>


        <div class="has-background-light columns mb-1 is-gapless" style="overflow-y: hidden;height:auto;position: fixed;bottom:0px;top:200px; width:auto;right:6%;left:6%">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° Demande</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Contatc</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Ref Document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Article</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Numéro Série</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Motif</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Orignie</th>
                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7" style="min-width: 100px;">Statut d'acceptation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut Article</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée le</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée par</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="repossession['No_']" v-for="repossession of dividedRepossRequestList" :key="repossession['No_']" @mouseover="setLineShadow(repossession['No_'])" @mouseout="removeLineShadow(repossession['No_'])" @click.prevent="selectLine(repossession['No_'],repossession['Customer No_'])">
                            <td class="has-text-left has-background-light"> 
                                <router-link  :to="`/RepossessionRequestCard/${repossession['No_']}`">
                                    <a href="#"  class="has-text-orange">
                                        {{ repossession['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ repossession['Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ repossession['Contact No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ repossession['Document No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ repossession['Document Ref.'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ repossession['Item No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ repossession['Serial No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ repossession['Motivation'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForRepossSource',repossession['Reposs Source']) }}</td>
                            <td class="has-text-centered has-background-light is-narrow has-text-weight-semibold">
                                <span class="tag is-white box py-0 px-2" v-if="repossession['Reposs Status']==0">
                                    {{ displayLabel('optionLabelListForRepossStatus',repossession['Reposs Status']) }}
                                </span>
                                <span class="tag is-success box py-0 px-2" v-else-if="repossession['Reposs Status']==1">
                                    {{ displayLabel('optionLabelListForRepossStatus',repossession['Reposs Status']) }}
                                </span>
                                <span class="tag is-link is-light box py-0 px-2" v-else-if="repossession['Reposs Status']==3">
                                    {{ displayLabel('optionLabelListForRepossStatus',repossession['Reposs Status']) }}
                                </span>
                                <span class="tag is-danger is-light box py-0 px-2" v-else>
                                    {{ displayLabel('optionLabelListForRepossStatus',repossession['Reposs Status']) }}
                                </span>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForRepossType',repossession['Reposs Type']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForItemStatus',repossession['Reposs Item Status']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(repossession['Created on']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ repossession['Created by'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-2':customerInfoCompMaxWidth=='0px', 'is-3':customerInfoCompMaxWidth=='800px'}" v-for="repossession of dividedRepossRequestList" :key="repossession['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        <router-link :to="`/RepossessionRequestCard/${ repossession['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ repossession['No_'] }} 
                                            </a>
                                        </router-link>
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ repossession['Customer No_'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ repossession['Item No_'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ formatDateHour(repossession['Created on']) }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{ 'par ' +repossession['Created by'] }}</span>
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
            <customer-info class="customer-info" v-if="selectedCustomer" :customerNo="selectedCustomer"></customer-info>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredRepossRequestList.length) && (currentPage !== Math.ceil(filteredRepossRequestList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredRepossRequestList.length">
        <a href="#" @click="nextPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
            <span class="icon">
                <i class="fas fa-chevron-right"></i>
            </span>                
        </a>
    </div>
</template>

<script scoped>
import CustomerInfo from './CustomerInfo.vue'
import RepossessionRequestListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'


export default {

    name:'repossession-request-list',
    components:{
        CustomerInfo,RepossessionRequestListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['repossRequestListPresentation']
        }
    },
    setup() {
        const repossessionList = ref([])
        const hostname = window.location.hostname  
        const router = useRouter()     

        //sac de label de notre liste
        const labelBag = {
            optionLabelListForRepossSource:ref([]),
            optionLabelListForRepossStatus:ref([]),
            optionLabelListForRepossType:ref([]),
            optionLabelListForItemStatus:ref([])
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
        const filteredRepossRequestList = computed(()=>
            repossessionList.value
            .filter((row) => (new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Contact No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Document No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Item No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Serial No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Motivation']).toLowerCase().includes(eltToSearch.value.toLowerCase()))
                    && new String(row['Created by']).toLowerCase() ==useWebUserInfoStore().name.toLowerCase()
            ),
        )


//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(40)
        const dividedRepossRequestList = computed(()=>{
            if(eltToSearch.value){
                return filteredRepossRequestList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredRepossRequestList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredRepossRequestList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }


        //fonction pour obtenir la liste à afficher
        function getRepossessionRequestList(){
            axios.get(`http://${hostname}:5000/app/getRepossessionRequestList`)
            .then((result) => {
                repossessionList.value = result.data;
                setTimeout(()=>selectLine(repossessionList.value[0]['No_'],repossessionList.value[0]['Customer No_']),1000)
                getOptionLabelList('[Reposs Source]','optionLabelListForRepossSource')
                getOptionLabelList('[Reposs Status]','optionLabelListForRepossStatus')
                getOptionLabelList('[Reposs Type]','optionLabelListForRepossType')
                getOptionLabelList('[Reposs Item Status]','optionLabelListForItemStatus')
            })
            .catch(err=>console.log(err));
        }


//Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        const selectedCustomer = ref('')
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`repossessionRequestCard/${selectedLine.value}`)
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


//gestion des events et triggers
        onBeforeMount(() => {
            getRepossessionRequestList()
        })



        // expose to template and other options API hooks
        return {
            repossessionList,eltToSearch,filteredRepossRequestList,
            dividedRepossRequestList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectedCustomer,selectLine,displaySelectedLineCard,
            displayLabel,getOptionLabelList,
            
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.repossRequestRightInfoMaxWidth,
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('repossRequestRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('repossRequestRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753')||dateString.includes('1900-') || date=='') return ''
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
    z-index : 15000
}

 .is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}

</style>
