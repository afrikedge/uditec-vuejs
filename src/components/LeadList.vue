<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <prospect-list-ribbon 
        pageTitle="Prospects"
        componentwithPresentationView="leadListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onDeleteSearchData="()=>this.eltToSearch=''"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="leadListRightInfoMaxWidth"
        routeForNewCard="NewLead"
        :newCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        ></prospect-list-ribbon>


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
            <div class="column is-narrow " style="margin-left: auto;margin-right: auto;" v-if="filteredLeadList.length == 0 && res_fetching_data_occur">
                Aucun enregistrement n'a été trouvé
            </div>
            <div class="column mt-5" id="lead-column" style="overflow: scroll;" v-if="res_fetching_data_occur && filteredLeadList.length > 0 && presentationView=='list' && !error_fetching_data_occur">
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Ville</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Téléphone</th>
                            <th class="has-background-light has-text-grey has-text-centered has-text-weight-normal is-size-7" style="min-width: 100px;">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr :id="Lead['No_']" v-for="Lead of dividedLeadList" :key="Lead['No_']" class="is-narrow" @mouseover="setLineShadow(Lead['No_'])" @mouseout="removeLineShadow(Lead['No_'])" @click="selectLine(Lead['No_'])">
                                <td class="has-text-left has-background-light"> 
                                    <router-link :to="`/LeadCard/${ Lead['No_'] }`">
                                        <a href="#" class="has-text-orange">
                                            {{ Lead['No_']  }}
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left has-background-light is-narrow">{{ Lead['Name']  }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForleadType',Lead['Lead Type']) }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForlegalStatus',Lead['Legal Status']) }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{ displayLabel('optionLabelListForIDMode',Lead['Identification Mode']) }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['Sales Mode']}}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['Salesperson Code']}}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['City']}}</td>                
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['Phone No_']}}</td>    
                                <td class="has-text-centered has-background-light is-narrow has-text-danger has-text-weight-bold">
                                    <span class="tag is-white box py-0 px-2" v-if="Lead['Approval Status'] == 0 || Lead['Approval Status'] == 1">
                                        {{ displayLabel('optionLabelListForApprovalStatus',Lead['Approval Status']) }}
                                    </span>
                                    <span class="tag is-warning is-light box py-0 px-2" v-else-if="(Lead['Approval Status'] >1 && Lead['Approval Status'] <=6) || Lead['Approval Status'] == 12">
                                        {{ displayLabel('optionLabelListForApprovalStatus',Lead['Approval Status']) }}
                                    </span>
                                    <span class="tag is-danger is-light box py-0 px-2" v-else-if="Lead['Approval Status']==9 || Lead['Approval Status']==10">
                                        {{ displayLabel('optionLabelListForApprovalStatus',Lead['Approval Status']) }}
                                    </span>
                                    <span class="tag is-success box py-0 px-2" v-else>
                                        {{ displayLabel('optionLabelListForApprovalStatus',Lead['Approval Status']) }}
                                    </span>
                                </td>  
                                            
                            </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && filteredLeadList.length > 0 && presentationView=='mosaique' && !error_fetching_data_occur">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':leadInfoCompMaxWidth=='0px', 'is-one-third':leadInfoCompMaxWidth=='800px'}" v-for="Lead of dividedLeadList" :key="Lead['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        
                                        <router-link :to="`/LeadCard/${ Lead['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ Lead['No_'] }} 
                                            </a>
                                        </router-link>
                            
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ Lead['Name'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ Lead['E-Mail'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ Lead['City'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{ Lead['Post Code'] }}</span>
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
            <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && filteredLeadList.length > 0 && presentationView=='mosaique haute' && !error_fetching_data_occur">
                <div class="columns is-multiline is-gapless">
                    <div :class="{'column':true, 'is-2':leadInfoCompMaxWidth=='0px', 'is-one-third':leadInfoCompMaxWidth=='800px'}" v-for="Lead of dividedLeadList" :key="Lead['No_']">
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
                                        
                                                <router-link :to="`/LeadCard/${ Lead['No_'] }`">
                                                    <a href="#" class="has-text-orange">
                                                        {{ Lead['No_'] }} 
                                                    </a>
                                                </router-link>
                            
                                            </span>
                                        </p>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left has-text-orange py-0 mt-1" >
                                                <span class="is-size-7 is-underlined">{{ Lead['Name'] }}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0 mt-1">
                                                <span class="is-size-7">{{ Lead['E-Mail'] }}</span>
                                            </div>
                                        </div>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left py-0" >
                                                <span class="is-size-7">{{ Lead['City'] }}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0">
                                                <span class="is-size-7">{{ Lead['Post Code'] }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <prospect-info class="Lead-info"></prospect-info>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredLeadList.length) && (currentPage !== Math.ceil(filteredLeadList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredLeadList.length">
        <a href="#" @click="nextPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
            <span class="icon">
                <i class="fas fa-chevron-right"></i>
            </span>                
        </a>
    </div>
    
</template>

<script scoped>
import ProspectInfo from './ProspectInfo.vue'
import ProspectListRibbon from './RibbonForLists.vue'
import { computed, onBeforeMount,  ref } from 'vue'
import axios from 'axios'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'

export default {
    name:'lead-list',
    components:{
        ProspectInfo,ProspectListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['leadListPresentation']
        }
    },
    setup() {
        const hostname = window.location.hostname
        const router = useRouter()
        const LeadList = ref([])
       

        //sac de label de notre liste
        const labelBag = {
            optionLabelListForleadType:ref([]),
            optionLabelListForApprovalStatus:ref([]),
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
        const filteredLeadList = computed(()=>
        LeadList.value
        .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['E-Mail']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        ),)


//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(40)
        const dividedLeadList = computed(()=>{
            if(eltToSearch.value){
                return filteredLeadList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredLeadList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredLeadList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }


//Gestion de la récupération de la liste à afficher
        const res_fetching_data_occur = ref(false)
        const error_fetching_data_occur = ref(false)
        function getLeadList(){
            axios.get(`http://${hostname}:5000/app/getLeadList`)
            .then((result) => { 
                LeadList.value = result.data.recordset;
                res_fetching_data_occur.value = true
                if(LeadList.value.length > 0)
                    setTimeout(()=>selectLine(dividedLeadList.value[0]['No_']),1000)

                getOptionLabelList('[Lead Type]','optionLabelListForleadType')
                getOptionLabelList('[Approval Status]','optionLabelListForApprovalStatus')
                getOptionLabelList('[Legal Status]','optionLabelListForlegalStatus')
                getOptionLabelList('[Identification Mode]','optionLabelListForIDMode')
            })
            .catch(()=>{
                error_fetching_data_occur.value = true
            });
        }


        
//Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`leadCard/${selectedLine.value}`)
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

        //Gestion des évènements, erreurs et trigger
        onBeforeMount(() => {
            getLeadList()
        })

        

        // expose to template and other options API hooks
        return {
            labelBag,displayLabel,
            LeadList,filteredLeadList,eltToSearch,
            dividedLeadList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectLine,displaySelectedLineCard,
            res_fetching_data_occur,error_fetching_data_occur

        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant prospectInfo
            leadInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.leadListRightInfoMaxWidth,
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.leadInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('leadListRightInfoMaxWidth','800px')
                this.leadInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('leadListRightInfoMaxWidth','0px')
                this.leadInfoCompMaxWidth='0px'
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
.Lead-info{
    max-width: v-bind(leadInfoCompMaxWidth);
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
.has-background-orange-light{
    background-color: rgba(255, 155, 118, 0.332);
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
