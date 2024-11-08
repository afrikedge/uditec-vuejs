<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <customer-list-ribbon 
        pageTitle="Demandes de remise"
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Objet</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Remise demandée (%)</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Remise accordé  (%)</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Crée le</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Crée par</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="discount['No_']" v-for="discount of  dividedDiscountList" :key="discount['No_']" class="is-narrow" @mouseover="setLineShadow(discount['No_'])" @mouseout="removeLineShadow(discount['No_'])" @click="selectLine(discount['No_'])">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/DiscountRequestCard?documentNo=${ discount['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ discount['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ discount['Subject'] }}</td>
                            <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(discount['Requested Discount']) }}</td>
                            <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(discount['Approuved Discount']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ formatDateHour(discount['Created on']) }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ discount['Created by'] }}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredDiscountList.length) && (currentPage !== Math.ceil(filteredDiscountList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredDiscountList.length">
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
import { useRouter } from 'vue-router'


export default {

    name:'discountrequest-list',
    components:{
        CustomerListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['customerListPresentation']
        }
    },
    setup() {
        const discountList = ref([])
        const router = useRouter()
        const hostname = window.location.hostname 


//Gestion de la recherche
        const eltToSearch = ref('')
        const  filteredDiscountList = computed(()=>
            discountList.value
            .filter((row) => new String(row['Status']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Activity Type']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            ),
        )



//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(40)
        const dividedDiscountList = computed(()=>{
            if(eltToSearch.value){
                return filteredDiscountList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredDiscountList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredDiscountList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }


        //fonction pour obtenir la liste à afficher
        function getDiscountRequestList(){
            axios.get(`http://${hostname}:5000/app/getDiscountRequestList`)
            .then((result) => {
                discountList.value = result.data;
                if(discountList.value.length > 0)
                    setTimeout(()=>selectLine(discountList.value[0]['No_']),1000)
            })
            .catch(err=>console.log(err));
        }


//Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`DiscountRequestCard?documentNo=${selectedLine.value}`)
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
            getDiscountRequestList()
        })


        // expose to template and other options API hooks
        return {
            discountList,eltToSearch,filteredDiscountList,
            dividedDiscountList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectLine,displaySelectedLineCard,
        }
    },
    data(){
        return {

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
