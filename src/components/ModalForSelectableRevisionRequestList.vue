<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-50 shadow has-background-light" style="border: none;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Demandes de revision |
                    </span>
                </div>
                <input-search class="column is-narrow" > </input-search>
            </div>

            <div class="columns" style="max-height: 650px;">
            <div class="column mt-5" id="customer-column" style="overflow-y: visible;overflow-x: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° demande</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Conditions de paiement (Proposé)</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Limite de crédit (Proposé)</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de paiement (Proposé)</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Régime TVA (Proposé)</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">% Acompte exigé (Proposé)</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr :id="elt['No_']" v-for="(elt,index) of revisionRequestList" :key="index" @click="$emit('onGettingLineFromSelectableRevisionRequestListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow"> 
                                    {{ elt['Revision No_'] }} 
                                </td>
                                <td class="has-text-left is-narrow"> {{ elt['Status'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['A01 Sales Mode$4d67ed39-21ba-4099-96f5-1ba73cf2c432'] }} </td>                
                                <td class="has-text-left is-narrow"> {{ elt['New Payment Terms Code'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['New Credit limit (LCY)'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['New Payment Method Code'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['New VAT Bus_ Posting Group'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['New Prepayment _'] }}</td>                
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
import { ref } from 'vue'

export default{
    name:'modal-for-selectable-contact-list',
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
        //const eltToSearch = ref('')
        const revisionRequestList = ref([])

        // const filteredContactList = computed(()=> {
        // if(props.customerNo)
        //     return elementList.value
        //     .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        //         || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        //         || new String(row['Contact']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        //         || new String(row['City']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        //         && row['Customer No_']==props.customerNo
        //     )
        // else
        //     return elementList.value
        //     .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        //         || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        //         || new String(row['Contact']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        //         || new String(row['City']).toLowerCase().includes(eltToSearch.value.toLowerCase())
        //     )
        // })
        
        return {
            revisionRequestList
        }
    },
    mounted(){
        axios.get(`http://${this.hostname}:5000/app/getRevisionRequestList?customerNo=${this.customerNo}`)
        .then(result => {
            this.revisionRequestList=result.data
        }).catch(err=>console.log(err))

    },

}

</script>