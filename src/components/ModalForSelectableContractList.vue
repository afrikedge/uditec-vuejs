<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-50 shadow has-background-light" style="border: none;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Contrats |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"> </input-search>
            </div>

            <div class="columns" style="max-height: 650px;">
            <div class="column mt-5" id="customer-column" style="overflow-y: visible;overflow-x: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type de compte</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date début OP</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Durée OP (Mois)</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date fin OP</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Durée (Mois)</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr :id="elt['No_']" v-for="(elt,index) of filteredContractList" :key="index" @click="$emit('onGettingLineFromSelectableContractListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow"> {{ elt['No_'] }} </td>
                                <td class="has-text-left is-narrow"> {{ elt['Account Type'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['OP Starting Date'] }} </td>                
                                <td class="has-text-left is-narrow"> {{ elt['OP Duration (Month)'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['OP Ending Date'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['Duration (Month)'] }}</td>                
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
    name:'modal-for-selectable-contract-list',
    props:['customerNo','isActive'],
    data(){
        return {
            //nom de l'hote dans l'url 
            hostname:window.location.hostname
        }
    },
    components:{
        inputSearch
    },
    setup(){
        const eltToSearch = ref('')
        const elementList = ref([])

        const filteredContractList = computed(()=>
            elementList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase()))
        )
        
        return {
            eltToSearch,elementList,filteredContractList
        }
    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getCUCList?customerId=${this.customerNo}`)
        .then(result => {
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    },

}

</script>