<template>
    <div :class="{'modal':true , 'is-active': true,}" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-75 shadow has-background-light shadow" style="border: none; overflow: hidden;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Clients |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"></input-search>
            </div>

            <div class=" columns" style="max-height: 650px; overflow-y: hidden;">
            <div class="column mt-5" id="customer-column" style="overflow-y: scroll;overflow-x: scroll;">
                <table class="table is-narrow is-hoverable">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom du client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Ville</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Téléphone</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Adresse:Ligne 1</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Contact principal</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Groupe client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Délai de paiement</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de livraison</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Catégorie TVA</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr  :id="elt['No_']" v-for="(elt,index) of filteredCustomerList" :key="index" @click="$emit('onGettingLineFromSelectableCustomerListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow tableFix1stColumn has-background-light"> 
                                    <router-link :to="`/CustomerCard/${ elt['No_'] }`">
                                        <a href="#" class="has-text-orange ">
                                            {{ elt['No_'] }} 
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left is-narrow"> {{ elt['Name'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['City'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Phone No_'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Address'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Primary Contact No_'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Customer Posting Group'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Payment Terms Code'] }}</td>                    
                                <td class="has-text-left is-narrow"> {{ elt['Shipment Method Code'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['VAT Bus_Posting Group'] }}</td>        
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
    name:'modal-for-selectable-customer-list',
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

        const filteredCustomerList = computed(()=>
            elementList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Contact']).toLowerCase().includes(eltToSearch.value)
            )
      
        )
        
        return {
            eltToSearch,elementList,filteredCustomerList
        }
    },
    props:['isActive'],
    beforeMount(){
        axios.get(`http://${this.hostname}:3000/app/getCustomerList`)
        .then(result => {
            console.log(result)
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