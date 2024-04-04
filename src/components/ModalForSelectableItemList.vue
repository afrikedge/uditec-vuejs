<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-75 has-background-light shadow" style=" background-color: rgba(255,255,255,1);border: none;">

            <div class="has-text-left columns mb-5">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Articles |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"></input-search>
            </div>

            <div class="has-background-light columns" style="max-height: 650px;">
            <div class="column mt-5" id="customer-column" style="overflow-y: visible;overflow-x: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description 2</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code catégorie article</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code groupe produit</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code unité</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Poids Brut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Poids net</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr id="" v-for="(elt,index) of filteredItemList" :key="index" @click="$emit('onGettingLineFromSelectableItemListModal',elt);$emit('closeModal')"> 
                                <td class="has-text-left has-background-light"> 
                                    <router-link :to="`/ItemCard/${ elt['No_'] }`">
                                        <a href="#" class="has-text-orange">
                                            {{ elt['No_'] }} 
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Description'] }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Description 2'] }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Item Category Code'] }} </td>                
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Product Group Code'] }}</td>                
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Sales Unit of Measure'] }}</td>                
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Gross Weight'] }}</td>                
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Net Weight'] }}</td>                
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>

        </div>
        <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="$emit('closeModal')"></button>
    </div>
</template>
<script>
import axios from 'axios'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import inputSearch from './input/input-search.vue'
import { computed, ref } from 'vue'

export default{
    name:'modal-for-selectable-item-list',
    components:{
        inputSearch
    },
    props:['isActive'],
    data(){
    return{
            hostname:window.location.hostname
        }
    },
    setup(){
        const eltToSearch = ref('')
        const elementList = ref([])

        const filteredItemList = computed(()=>
            elementList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Description']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Item Category Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
      
        )
        
        return {
            eltToSearch,elementList,filteredItemList
        }
    },
    beforeMount(){
        axios.get(`http://${this.hostname}:3000/app/getItemList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
        .then(result => {
            console.log(result)
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    }

}

</script>