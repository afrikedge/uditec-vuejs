<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box shadow has-background-light" style=" background-color: rgba(255,255,255,1);border: none;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Conditions de paiement|
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Calcul dare d'échéance</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">multi-deadlines ?</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">% Acompte exigé</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr :id="elt['Code']"  v-for="(elt,index) of filteredPaymentTermList" :key="index" @click="$emit('onGettingLineFromSelectablePaymentTermListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow"> <strong> {{ elt['Code'] }}</strong> </td>
                                <td class="has-text-left is-narrow"> {{ elt['Description'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Sales Mode'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Due Date Calculation'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Multi-deadlines'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Prepayment'] }}</td>
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
    name:'modal-for-selectable-payment-term-list',
    props:['isActive','salesMode'],
    data(){
        return {
            //nom de l'hote dans l'url 
            hostname:window.location.hostname
        }
    },
    methods:{

    },
    components:{
        inputSearch
    },
    setup(props){
        const eltToSearch = ref('')
        const elementList = ref([])

        const filteredPaymentTermList = computed(()=>
            elementList.value
            .filter((row) => (new String(row['Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Description']).toLowerCase().includes(eltToSearch.value.toLowerCase()))
                && row['Sales Mode'] == props.salesMode 
            )
        )
        
        return {
            eltToSearch,elementList,filteredPaymentTermList
        }
    },
    beforeMount(){
        axios.get(`http://${this.hostname}:3000/app/getPaymentTermList`)
        .then(result => {
            this.elementList=result.data
        }).catch(err=>console.log(err))

    }

}

</script>