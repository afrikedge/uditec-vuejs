<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <recovery-activity-list-ribbon 
        pageTitle="Activités de recouvrement"
        componentwithPresentationView="recoveryActivityListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="recoveryActivityListRightInfoMaxWidth"
        routeForNewCard="NewRecoveryActivity"
        :newCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        ></recovery-activity-list-ribbon>

        <div class="has-background-light columns mb-1 is-gapless" style="overflow-y: hidden;height:auto;position: fixed;bottom:0px;top:200px; width:auto;right:6%;left:6%">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N° Client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom client</th>
                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7" style="min-width: 100px;">Statut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Objet</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure début prévue</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure début réelle</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure fin prévue</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure fin réelle</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date et heure relance</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée le</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée par</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="recoveryActivity['No_']" v-for="recoveryActivity of dividedRecoveryActivityList" :key="recoveryActivity['No_']" @mouseover="setLineShadow(recoveryActivity['No_'])" @mouseout="removeLineShadow(recoveryActivity['No_'])" @click="selectLine(recoveryActivity['No_'],recoveryActivity['Customer No_'])">
                            <td class="has-text-left has-background-light is-narrow"> 
                                <router-link :to="`/recoveryActivityCard/${ recoveryActivity['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ recoveryActivity['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ recoveryActivity['Customer No_'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ recoveryActivity['Name'] }}</td>
                            <td class="has-text-centered has-background-light is-narrow has-text-weight-semibold">
                                <span class="tag is-white box py-0 px-2" v-if="recoveryActivity['Activity Status'] == 0">
                                    {{ displayLabel('optionLabelListForActivityStatus',recoveryActivity['Activity Status']) }}
                                </span>
                                <span class="tag is-success box py-0 px-2" v-else-if="recoveryActivity['Activity Status'] == 1 || recoveryActivity['Activity Status'] == 2">
                                    {{ displayLabel('optionLabelListForActivityStatus',recoveryActivity['Activity Status']) }}
                                </span>
                                <span class="tag is-link is-light box py-0 px-2" v-else-if="recoveryActivity['Activity Status'] == 3">
                                    {{ displayLabel('optionLabelListForActivityStatus',recoveryActivity['Activity Status']) }}
                                </span> 
                                <span class="tag is-danger is-light box py-0 px-2" v-else>
                                    {{ displayLabel('optionLabelListForActivityStatus',recoveryActivity['Activity Status']) }}
                                </span> 
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForActivityType',recoveryActivity['Activity Type']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ recoveryActivity['Subject'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ recoveryActivity['Description'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(recoveryActivity['Scheduled Start Date']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour( recoveryActivity['Actual Start Date']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(recoveryActivity['Scheduled End Date']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(recoveryActivity['Actual End Date']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(recoveryActivity['Reminder Date']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(recoveryActivity['Created on']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ recoveryActivity['Created by'] }}</td>                    
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-2':customerInfoCompMaxWidth=='0px', 'is-3':customerInfoCompMaxWidth=='800px'}" v-for="recoveryActivity of dividedRecoveryActivityList" :key="recoveryActivity['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        <router-link :to="`/recoveryActivityCard/${ recoveryActivity['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ recoveryActivity['No_'] }} 
                                            </a>
                                        </router-link>
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ recoveryActivity['Name'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ recoveryActivity['Customer No_'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ displayLabel('optionLabelListForActivityType',recoveryActivity['Activity Type']) }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{ displayLabel('optionLabelListForActivityStatus',recoveryActivity['Activity Status']) }}</span>
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
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredRecoveryActivityList.length) && (currentPage !== Math.ceil(filteredRecoveryActivityList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredRecoveryActivityList.length">
        <a href="#" @click="nextPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
            <span class="icon">
                <i class="fas fa-chevron-right"></i>
            </span>                
        </a>
    </div>
    
</template>

<script scoped>
import CustomerInfo from './CustomerInfo.vue'
import RecoveryActivityListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'


export default {

    name:'recovery-activity-list',
    components:{
        CustomerInfo,RecoveryActivityListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['recoveryActivityListPresentation']
        }
    },
    setup() {
        const recoveryActivityList = ref([])
        const hostname = window.location.hostname
        const router = useRouter()       

        //sac de label de notre liste
        const labelBag = {
            optionLabelListForActivityStatus:ref([]),
            optionLabelListForActivityType:ref([]),
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
        const filteredRecoveryActivityList = computed(()=>
            recoveryActivityList.value
            .filter((row) => (new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Subject']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Description']).toLowerCase().includes(eltToSearch.value.toLowerCase()))
                    && new String(row['Created by']).toLowerCase() ==useWebUserInfoStore().name.toLowerCase()
            ),
        )


//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(40)
        const dividedRecoveryActivityList = computed(()=>{
            if(eltToSearch.value){
                return filteredRecoveryActivityList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredRecoveryActivityList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredRecoveryActivityList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }

        
        //fonction pour obtenir la liste à afficher
        function getRecoveryActivityList(){
            axios.get(`http://${hostname}:5000/app/getRecoveryActivityList`)
            .then((result) => {
                recoveryActivityList.value = result.data;
                setTimeout(()=>selectLine(recoveryActivityList.value[0]['No_'],recoveryActivityList.value[0]['Customer No_']),1000)
                getOptionLabelList('[Activity Status]','optionLabelListForActivityStatus')
                getOptionLabelList('[Activity Type]','optionLabelListForActivityType')
            })
            .catch(err=>console.log(err));
        }


//Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        const selectedCustomer = ref('')
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`recoveryActivityCard/${selectedLine.value}`)
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
            getRecoveryActivityList()
        })

        // expose to template and other options API hooks
        return {
            recoveryActivityList,eltToSearch,filteredRecoveryActivityList,
            dividedRecoveryActivityList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectedCustomer,selectLine,displaySelectedLineCard,
            displayLabel,getOptionLabelList,
            
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            customerInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.recoveryActivityListRightInfoMaxWidth,  
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.customerInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('recoveryActivityListRightInfoMaxWidth','800px')
                this.customerInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('recoveryActivityListRightInfoMaxWidth','0px')
                this.customerInfoCompMaxWidth='0px'
            }
        },
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else{
                return ''
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
    z-index: 15000;
}

.is-hovered-td{
    position: relative;
    top:1px;
    z-index: 1000;
}
</style>
