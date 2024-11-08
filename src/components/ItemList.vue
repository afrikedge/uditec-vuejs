<template>
    <div class="my-5 mx-5" style="position:fixed;top:150px;bottom: 0px; width:auto;right:6%;left:6%">
        
        <item-list-ribbon 
        pageTitle="Articles"
        componentwithPresentationView="itemListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        @onDeleteSearchData="()=>this.eltToSearch=''"
        @onClickingDisplayBtn="displaySelectedLineCard"
        componentWithCompInfo="itemListRightInfoMaxWidth"
        :displayCardBtnDisabled="false"
        ></item-list-ribbon>


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
            <div class="column is-narrow " style="margin-left: auto;margin-right: auto;" v-if="filteredItemList.length == 0 && res_fetching_data_occur">
                Aucun enregistrement n'a été trouvé
            </div>
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="res_fetching_data_occur && filteredItemList.length > 0 && presentationView=='list' && !error_fetching_data_occur">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="width: 200px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow">Désignation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="width: 100px;">Code catégorie</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="width: 250px;">Description catégorie</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;" >Mode de livraison</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Stock</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;" >Poids brut</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;" >Poids net</th>
                            <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;" >Volume unitaire</th>
                            <!---th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;" >Code barre</th---->
                        </tr>   
                    </thead>
                    <tbody>
                        <tr :id="item['No_']" v-for="item of dividedItemList" :key="item['No_']" @mouseover="setLineShadow(item['No_'])" @mouseout="removeLineShadow(item['No_'])" @click="selectLine(item['No_'])">
                            <td class="has-text-left has-background-light py-2"> 
                                <router-link :to="`/ItemCard/${ item['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ item['No_'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light py-2 is-narrow"> {{item['Description']}}</td>
                            <td class="has-text-left has-background-light py-2"> {{item['Item Category Code']}}</td>
                            <td class="has-text-left has-background-light py-2"> {{item['Item Category Name']}}</td>
                            <td class="has-text-left has-background-light py-2"> {{item['Sales Unit of Measure']}}</td>  
                            <td class="has-text-left has-background-light py-2"> {{item['Shipment Method']}}</td>
                            <td class="has-text-right has-background-light py-2"> {{formatAmount(item['Unit Price'])}}</td>
                            <td class="has-text-right has-background-light py-2"> {{item['Stock']}}</td>
                            <td class="has-text-right has-background-light py-2"> {{item['Gross Weight']}}</td>
                            <td class="has-text-right has-background-light py-2"> {{item['Net Weight']}}</td>
                            <td class="has-text-right has-background-light py-2"> {{item['Unit Volume']}}</td>
                            <!----td class="has-text-left has-background-light py-2"> {{item['Bar Code']}}</td--->
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && filteredItemList.length > 0 && presentationView=='mosaique' && !error_fetching_data_occur">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':itemInfoCompMaxWidth=='0px', 'is-one-third':itemInfoCompMaxWidth=='800px'}"  v-for="item of dividedItemList" :key="item['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/pc.jpeg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey">{{ item['No_'] }}</span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0 mt-1" >
                                        <router-link :to="`/ItemCard/${ item['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                <span class="is-size-7 is-underlined">{{ item['Description'] }} </span>
                                            </a>
                                        </router-link>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{item['Item Category Code'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ item['Net Weight'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{item['Base Unit of Measure']}}</span>
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
            <div class="column" style="overflow-y: scroll;" v-if="res_fetching_data_occur && filteredItemList.length > 0 && presentationView=='mosaique haute' && !error_fetching_data_occur">
                <div class="columns is-multiline is-gapless">
                    <div :class="{'column':true, 'is-3':itemInfoCompMaxWidth=='0px', 'is-one-third':itemInfoCompMaxWidth=='800px'}" v-for="item of dividedItemList" :key="item['No_']">
                        <div class="has-background-white m-1" >
                            <div class="card-is-hoverable box" style="height:500px">
                                <div class="">
                                    <div class="has-text-left">
                                        <a href="#">
                                            <span class="py-0">...</span>
                                        </a>
                                    </div>
                                    <div class="is-flex is-justify-content-center">
                                        <figure class="image is-256x256">
                                            <img class="" :src="require(`@/assets/images/pc.jpeg`)">
                                        </figure>
                                    </div>
                                    <hr class="rounded">
                                    <div class="has-background-white shadow p-3" style="position: relative; bottom:150px">
                                        <p class="has-text-left ">
                                            <span class="subtitle is-6 has-text-grey">{{ item['No_'] }}</span>
                                        </p>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left has-text-orange py-0 mt-1" >
                                                <router-link :to="`/ItemCard/${ item['No_'] }`">
                                                    <a href="#" class="has-text-orange">
                                                        <span class="is-size-7 is-underlined">{{ item['Description'] }}</span> 
                                                    </a>
                                                </router-link>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0 mt-1">
                                                <span class="is-size-7">{{ item['Item Category Code'] }}</span>
                                            </div>
                                        </div>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left py-0" >
                                                <span class="is-size-7">{{ item['Sales Unit of Measure'] }}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0">
                                                <span class="is-size-7">{{item['Unit Volume']}}</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
            
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <item-info class="item-info"></item-info>
        </div>
    </div>
    <div style="position: absolute; bottom: 0px; left:0px" v-if="(pageSize < filteredItemList.length) && (currentPage !== Math.ceil(filteredItemList.length/pageSize))">
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
    <div style="position: absolute; top: 50%; bottom: 50%; right:10px" v-if="currentPage*pageSize < filteredItemList.length">
        <a href="#" @click="nextPage" class="button has-text-orange" style="width: 50px; height:50px; border-radius: 50px;">
            <span class="icon">
                <i class="fas fa-chevron-right"></i>
            </span>                
        </a>
    </div>

</template>

<script>
import ItemInfo from './ItemInfo.vue'
import ItemListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import { computed,onBeforeMount,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { useRouter } from 'vue-router'

export default {
    name:'item-list',
    components:{
        ItemInfo,ItemListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['itemListPresentation']
        }
    },
    setup() {
        const hostname = window.location.hostname
        const router = useRouter()
        const itemList= ref([])



//Gestion de la recherche
        const eltToSearch = ref('')
        const filteredItemList = computed(()=>
            itemList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Item Category Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Item Category Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Description']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
        )


//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(50)
        const dividedItemList = computed(()=>{
            if(eltToSearch.value){
                return filteredItemList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredItemList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredItemList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }


//Gestion de la récupération de la liste des contrats à afficher
        const res_fetching_data_occur = ref(false)
        const error_fetching_data_occur = ref(false)
        function getItemList(){
            axios.get(`http://${hostname}:5000/app/getItemList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result => {
                itemList.value = result.data.recordset
                res_fetching_data_occur.value = true
                if(itemList.value.length > 0)
                    setTimeout(()=>selectLine(dividedItemList.value[0]['No_']),1000)
            }).catch(()=>{
                error_fetching_data_occur.value = true
            })
        }


//Gestion des formatages
        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
            }else{
                return 0
            }
        }


        //Gestion de la sélection d'une ligne
        const selectedLine = ref('')
        function displaySelectedLineCard(){
            if(selectedLine.value)
                router.push(`itemCard/${selectedLine.value}`)
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
        onBeforeMount(()=>{
            getItemList()
        })
    
    // expose to template and other options API hooks
        return {
            itemList,
            eltToSearch,filteredItemList,
            dividedItemList,pageSize,currentPage,nextPage,prevPage,
            selectedLine,selectLine,displaySelectedLineCard,
            formatAmount,
            res_fetching_data_occur,error_fetching_data_occur
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            itemInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.itemListRightInfoMaxWidth,
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.itemInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('itemListRightInfoMaxWidth','800px')
                this.itemInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('itemListRightInfoMaxWidth','0px')
                this.itemInfoCompMaxWidth='0px'
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
.item-info{
    max-width: v-bind(itemInfoCompMaxWidth);
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

