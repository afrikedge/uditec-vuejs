<template>
    <div :class="{'modal':true , 'is-active': true,}" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box has-background-light shadow" style="border: none; overflow: hidden;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Modes de vente |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"></input-search>
            </div>

            <div class=" columns" style="max-height: 650px; overflow-y: hidden;">
            <div class="column mt-5" id="customer-column" style="overflow-y: scroll;overflow-x: scroll;">
                <table class="table is-narrow is-hoverable">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code mode de vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Nom</th>
                        </tr>
                    </thead>
                    <tbody style="">
                        <tr  :id="elt['No_']" v-for="(elt,index) of filteredSalesModeList" :key="index" @click="$emit('onGettingLineFromSelectableSalesModeListModal',elt);$emit('closeModal')">
                            <td class="has-text-left is-narrow"> {{ elt['Code'] }} </td>
                            <td class="has-text-left is-narrow"> {{ elt['Name'] }}</td>
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
import inputSearch from './input/input-search.vue'
import { computed, ref } from 'vue'


export default{
    name:'modal-for-selectable-sales-mode-list',
    components:{
        inputSearch
    },
    data(){
        return {
            //nom de l'hote dans l'url 
            hostname:window.location.hostname
        }
    },
    setup(){
        const eltToSearch = ref('')
        const elementList = ref([])

        const filteredSalesModeList = computed(()=>
            elementList.value
            .filter((row) => new String(row['Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
      
        )
        
        return {
            eltToSearch,elementList,filteredSalesModeList
        }
    },
    props:['isActive'],
    beforeMount(){
        axios.get(`http://${this.hostname}:5000/app/getSalesModeList`)
        .then(result => {
            console.log(result)
            this.elementList=result.data
        }).catch(err=>console.log(err))

    }

}

</script>

<style>



</style>