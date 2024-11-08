<template>
    <div :class="{'modal':true , 'is-active': true,}" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-75  has-background-light shadow" style="border: none; overflow: hidden;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Articles Facturés |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"></input-search>
            </div>

            <div class=" columns" style="max-height: 650px; overflow-y: hidden;">
            <div class="column mt-5" id="customer-column" style="overflow-y: scroll;overflow-x: scroll;">
                <table class="table is-narrow is-hoverable">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code article</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr  :id="elt['No_']" v-for="(elt,index) of filteredInvoiceLine" :key="index" @click="$emit('onGettingLineFromSelectableInvoiceLineModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow tableFix1stColumn has-background-light is-narrow"> 
                                    <a href="#" class="has-text-orange ">
                                        {{ elt['Item No_'] }} 
                                    </a>
                                </td>
                                <td class="has-text-left is-narrow"> {{ elt['Description'] }}</td>
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
    name:'modal-for-selectable-invoice-line',
    props:['documentNo','isActive'],
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

        const filteredInvoiceLine = computed(()=>
            elementList.value
            .filter((row) => new String(row['Item No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Description']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
      
        )
        
        return {
            eltToSearch,elementList,filteredInvoiceLine
        }
    },
    beforeMount(){
        axios.get(`http://${this.hostname}:5000/app/getSIline/${this.documentNo}`)
        .then(result => {
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    }

}

</script>

<style>

.tableFixHead{
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
    z-index: 20;
 }

.tableFix1stColumn {
    position: sticky;
    left:-15px;
    z-index: 10;

}
.tableFixHead1{
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
    z-index: 5000;
    left: -15px;
    width:100px

}


</style>