<template>
    <div class="my-5 mx-5">
        
        <item-list-ribbon 
        pageTitle="Articles"
        componentwithPresentationView="itemListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="itemListRightInfoMaxWidth"
        ></item-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="width: 200px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="width: 100px;">Désignation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="width: 250px;">Code catégorie</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="width: 250px;">Description catégorie</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="width: 100px;">Unité de vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="width: 100px;">Prix unitaire</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Mode livraison</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;" >Poids brut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;" >Poids net</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;" >Volume unitaire</th>
                            
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="item of filteredItemList" :key="item['No_']">
                            <td class="has-text-left has-background-light py-2"> 
                                <router-link :to="`/ItemCard/${ item['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ item['No_'] }} 
                                    </a>
                                </router-link>
                            </td>

                            <td class="has-text-left has-background-light py-2"> {{item['Description']}}</td>

                            <td class="has-text-left has-background-light py-2"> {{item['Item Category Code']}}</td>

                            <td class="has-text-left has-background-light py-2 is-narrow"> {{item['Item Category Name']}}</td>

                            <td class="has-text-left has-background-light py-2"> {{item['Sales Unit of Measure']}}</td>  
                            
                            <td class="has-text-left has-background-light py-2"> {{item['']}}</td>

                            <td class="has-text-left has-background-light py-2"> {{item['Shipment Method']}}</td>

                            <td class="has-text-left has-background-light py-2"> {{item['Gross Weight']}}</td>

                            <td class="has-text-left has-background-light py-2"> {{item['Net Weight']}}</td>

                            <td class="has-text-left has-background-light py-2"> {{item['Unit Volume']}}</td>
                
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':itemInfoCompMaxWidth=='0px', 'is-one-third':itemInfoCompMaxWidth=='800px'}"  v-for="item of filteredItemList" :key="item['No_']">
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
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique haute'">
                <div class="columns is-multiline is-gapless">
                    <div :class="{'column':true, 'is-3':itemInfoCompMaxWidth=='0px', 'is-one-third':itemInfoCompMaxWidth=='800px'}" v-for="item of filteredItemList" :key="item['No_']">
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

</template>

<script>
import ItemInfo from './ItemInfo.vue'
import ItemListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import { computed,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'

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
    const itemList= ref([])
    const eltToSearch = ref('')
    const filteredItemList = computed(()=>
        itemList.value
        .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Item Category Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Item Category Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Description']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        )
    )
    
    // expose to template and other options API hooks
        return {
            itemList,eltToSearch,filteredItemList
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant customerInfo
            itemInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.itemListRightInfoMaxWidth,
            
            //nom de l'hote dans l'url 
            hostname:window.location.hostname        
        }
    },
    methods:{
        getData(data){
            console.log(data)
        },
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

    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getItemList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
        .then(result => {
            this.itemList=result.data.recordset
        }).catch(err=>console.log(err))
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
.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
 }
</style>

