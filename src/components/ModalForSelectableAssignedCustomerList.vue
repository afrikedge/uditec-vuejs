<template>
    <div :class="{'modal':true , 'is-active': true,}" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-75  has-background-light shadow" style="border: none; overflow: hidden;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Listes des affectations |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"></input-search>
            </div>

            <div class=" columns" style="max-height: 650px; overflow-y: hidden;">
            <div class="column mt-5" id="customer-column" style="overflow-y: scroll;overflow-x: scroll;">
                <table class="table is-narrow is-hoverable">
                    <thead class=" my-2">
                        <tr> 
                            <th class="tableFix1stColumn has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° affectation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Mode de vente</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Affecté à</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Encours</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Encours échue</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée le</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Crée par</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr  :id="elt['No_']" v-for="(elt,index) of filteredAssignedCustomerList" :key="index" @click="$emit('onGettingLineFromSelectableAssignedCustomerListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow tableFix1stColumn has-background-light"> 
                                    {{ elt['No_'] }} 
                                </td>
                                <td class="has-text-left is-narrow"> {{ elt['Customer No_'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Name'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Sales Mode'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Assigned to'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Customer Status'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Balance Amount'] }}</td>                    
                                <td class="has-text-left is-narrow"> {{ elt['Balance Due'] }}</td>   
                                <td class="has-text-left is-narrow"> {{ formatDateHour(elt['Assigned on']) }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Assigned by'] }}</td>
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
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import { computed, ref, } from 'vue'


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
        const filteredAssignedCustomerList = computed(()=>
            elementList.value
            .filter((row) => (new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Contact']).toLowerCase().includes(eltToSearch.value.toLowerCase()))
                && new String(row['Assigned to']) == useWebUserInfoStore().name
            )
      
        )
        
        return {
            eltToSearch,elementList,filteredAssignedCustomerList
        }
    },
    props:['isActive'],
    beforeMount(){
        axios.get(`http://${this.hostname}:5000/app/getAssignedCustomerList`)
        .then(result => {
            this.elementList=result.data
        }).catch(err=>console.log(err))

    },
    methods:{
        formatDateHour(date){
            if(date){
                const dateString = new String(date)
                if (dateString.includes('1753')) return ''
                else return new Date(date).toLocaleDateString() + ' à ' +new Date(date).toLocaleTimeString()
            }else{
                return ''
            }
        },
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