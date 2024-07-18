<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-50 shadow has-background-light" style="border: none;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Contrat |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"> </input-search>
            </div>
              <!---------Composant rubban fiche contrat garantie----------------------->
              <contact-card-ribbon
                routeForNewCard="../NewServiceRequest"
                @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
                componentWithCompInfo="contactCardRightInfoMaxWidth"
                :newCardBtnIsDisabled="false"
                :editCardBtnDisabled="true"
                :readOnlyModeDisabled="true"
                ></contact-card-ribbon>

            <div class="columns" style="max-height: 650px;">
            <div class="column mt-5" id="customer-column" style="overflow-y: visible;overflow-x: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Article</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Numéro série</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Ligne Document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date début</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Plan de garantie</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date fin</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Extension de garantie</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date fin Extension</th>
                        </tr>
                    </thead>
                    <tbody>

                            <tr :id="elt['Code']" v-for="(elt,index) of filteredContractList" :key="index" @click="$emit('onGettingLineFromSelectableWarrantyContractListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow"> 
                                    <router-link :to="`/ServiceRequestCard/${ elt['Item No_'] }`">
                                        <a href="#" class="has-text-orange">
                                            {{ elt['Item No_'] }} 
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left is-narrow"> {{ elt['Serial N0_'] }} </td>                
                                <td class="has-text-left is-narrow"> {{ elt['Customer No_'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['Document Type'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['Document No_'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['Line No_'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ formatDate(elt['Starting Date']) }}</td>                       
                                <td class="has-text-left is-narrow"> {{ elt['Warranty Plan No_'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ formatDate(elt['Ending Date']) }}</td>                       
                                <td class="has-text-left is-narrow"> {{ elt['Extended Plan No_'] }}</td>                               
                                <td class="has-text-left is-narrow"> {{ formatDate(elt['Extended End Date']) }}</td>                       
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
    name:'modal-for-selectable-warranty-contract-list',
    props:['isActive'],
    data(){
        return {
            //nom de l'hote dans l'url 
            hostname:window.location.hostname
        }
    },
    components:{
        inputSearch
    },
    methods: {
        formatDate(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        },
    },
    setup(){
        const eltToSearch = ref('')
        const elementList = ref([])

        const filteredContractList = computed(()=>
            elementList.value
            .filter((row) => new String(row['Item No_']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Customer No_']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Document No_']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Warranty Plan No_']).toLowerCase().includes(eltToSearch.value)
            )
        )
        
        return {
            eltToSearch,elementList,filteredContractList
        }
    },
    beforeMount(){
        axios.get(`http://${this.hostname}:3000/app/getServiceRequestList`)
        .then(result => {
            console.log(result)
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    }

}

</script>