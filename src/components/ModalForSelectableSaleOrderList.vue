<template>
    <div :class="{'modal':true , 'is-active': true,}" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-75 shadow has-background-light shadow" style="border: none; overflow: hidden;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Commandes vente |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"></input-search>
            </div>

            <div class=" columns" style="max-height: 650px; overflow-y: hidden;">
            <div class="column mt-5" id="customer-column" style="overflow-y: scroll;overflow-x: scroll;">
                <table class="table is-narrow is-hoverable">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom du client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code contact</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code vendeur</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code campagne</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant HT</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant TTC</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr  :id="elt['No_']" v-for="(elt,index) of filteredSOList" :key="index" @click="$emit('onGettingLineFromSelectableSOListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow tableFix1stColumn has-background-light"> 
                                        <strong class="has-text-orange ">
                                            {{ elt['No_'] }} 
                                        </strong>
                                </td>
                                <td class="has-text-left is-narrow"> {{ elt['Sell-to Customer No_'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Sell-to Customer Name'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Sell-to Contact No_'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Salesperson Code'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Campaign No_'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Total Amount'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Total Amount Including VAT'] }}</td>                    
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
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'



export default{
    name:'modal-for-selectable-sale-order-list',
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

        const filteredSOList = computed(()=>
            elementList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Sell-to Customer No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Sell-to Customer Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Sell-to Contact No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
      
        )
        
        return {
            eltToSearch,elementList,filteredSOList
        }
    },
    props:['isActive'],
    beforeMount(){
        axios.get(`http://${this.hostname}:5000/app/getSOList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
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