<template>
    <div class="my-5 mx-5">
        
        <item-list-ribbon 
        pageTitle="Articles"
        componentwithPresentationView="itemListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        componentWithCompInfo="itemListRightInfoMaxWidth"
        ></item-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>

                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;" > Type</th>
                            
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>

                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Bloque</th>

                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de mesure de base</th>

                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de mesure de vente</th>

                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code de catégorie d'article </th>

                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code de groupe de produit</th>

                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Product Group Code</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="item of itemList" :key="item['No_']">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/ItemCard/${ item['No_'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ item['No_'] }} 
                                    </a>
                                </router-link>
                            </td>

                            <td class="has-text-left has-background-light"> {{item['No_']}}</td>

                            <td class="has-text-left has-background-light"> {{item['Type']}}</td>

                            <td class="has-text-left has-background-light"> {{item['Description']}}</td>

                            
                            <td class="has-text-left has-background-light"> {{item['Bloque']}}</td>


                            <td class="has-text-left has-background-light"> {{item['Sales Unit of Measure']}}</td>

                            <td class="has-text-left has-background-light"> {{item['Base Unit of Measure']}}</td>

                            <td class="has-text-left has-background-light"> {{item['Sales Unit of Measure']}}</td>

                            <td class="has-text-left has-background-light"> {{item['Item Category Code']}}</td>

                            <td class="has-text-left has-background-light"> {{item['Search Description']}}</td>

                              <td class="has-text-left has-background-light"> {{item['Product Group Code']}}</td>          
                                            
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':itemInfoCompMaxWidth=='0px', 'is-one-third':itemInfoCompMaxWidth=='800px'}"  v-for="item of itemList" :key="item['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                            <router-link :to="`/ItemCard/${ item['No_'] }`">
                                                <a href="#" class="has-text-orange">
                                                    {{ item['No_'] }} 
                                                </a>
                                            </router-link>
                                       
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{item['Search Description']}}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{item['Description 2'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ item['Description 2'] }}</span>
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
                    <div :class="{'column':true, 'is-2':itemInfoCompMaxWidth=='0px', 'is-one-third':itemInfoCompMaxWidth=='800px'}" v-for="item of itemList" :key="item['No_']">
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
                                            <img class="" :src="require(`@/assets/images/pc.jpeg`)">
                                        </figure>
                                    </div>
                                    <hr class="rounded">
                                    <div class="">
                                        <p class="has-text-left ">
                                            <span class="is-size-7 has-text-grey has-background-light">
                                                <router-link :to="`/ItemCard/${ item['No_'] }`">
                                                    <a href="#" class="has-text-orange">
                                                        {{ item['No_'] }} 
                                                    </a>
                                                </router-link>
                                           
                                        </span>
                                        </p>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left has-text-orange py-0 mt-1" >
                                                <span class="is-size-7 is-underlined">{{item['Search Description']}}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0 mt-1">
                                                <span class="is-size-7">{{ item['Item Category Code'] }}</span>
                                            </div>
                                        </div>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left py-0" >
                                                <span class="is-size-7">{{ item['Description 2'] }}</span>
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
import { ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'

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
    
    // expose to template and other options API hooks
        return {
            itemList
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
        axios.get(`http://${this.hostname}:3000/app/getItemList`)
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

