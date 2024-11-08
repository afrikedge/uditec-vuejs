<template>
    <div :class="{'modal':true , 'is-active': true,}" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-75  has-background-light shadow" style="border: none; overflow: hidden;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Factures vente enregistrées |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"></input-search>
            </div>

            <div class=" columns" style="max-height: 650px; overflow-y: hidden;">
            <div class="column mt-5" id="customer-column" style="overflow-y: scroll;overflow-x: scroll;">
                <table class="table is-narrow is-hoverable">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom du client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code Contact</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom du contact</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr  :id="elt['No_']" v-for="(elt,index) of filteredInvoiceList" :key="index" @click="$emit('onGettingLineFromSelectableInvoiceListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow tableFix1stColumn has-background-light"> 
                                    <a href="#" class="has-text-orange ">
                                        {{ elt['Document No_'] }} 
                                    </a>
                                </td>
                                <td class="has-text-left is-narrow"> {{ formatDate(elt['Posting Date']) }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Customer No_'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Name'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Contact No_'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Contact Name'] }}</td>
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
    name:'modal-for-selectable-invoice-list',
    props:['customerNo','isActive'],

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

        const filteredInvoiceList = computed(()=>
            elementList.value
            .filter((row) => new String(row['Document No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Contact Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Description']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
      
        )
        function formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')||dateString.includes('1900-')) return ''
            else return new Date(date).toLocaleDateString()
        }
        
        return {
            eltToSearch,elementList,filteredInvoiceList,formatDate
        }
    },
    beforeMount(){
        axios.get(`http://${this.hostname}:5000/app/getSIlist/${this.customerNo}`)
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