<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-50 shadow has-background-light" style="border: none;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Conducteur |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"> </input-search>
            </div>
              <!---------Composant rubban fiche contact----------------------->
              <contact-card-ribbon
                routeForNewCard="../NewTransportOrder"
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Identifiant</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Numéro CIN</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom complet</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Numéro permis de conduire</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date expiration permis</th>
                        </tr>
                    </thead>
                    <tbody>

                            <tr :id="elt['Code']" v-for="(elt,index) of filteredDriverList" :key="index" @click="$emit('onGettingLineFromSelectableDriverListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow"> 
                                    <router-link :to="`/TransportOrderCard/${ elt['Code'] }`">
                                        <a href="#" class="has-text-orange">
                                            {{ elt['Code'] }} 
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left is-narrow"> {{ elt['Identification N°'] }} </td>                
                                <td class="has-text-left is-narrow"> {{ elt['Name'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['License N°'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ formatDate(elt['Expiration Date']) }}</td>                       
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
    name:'modal-for-selectable-driver-list',
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

        const filteredDriverList = computed(()=>
            elementList.value
            .filter((row) => new String(row['Code']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Identification N°']).toLowerCase().includes(eltToSearch.value)
                || new String(row['License N°']).toLowerCase().includes(eltToSearch.value)
            )
        )
        
        return {
            eltToSearch,elementList,filteredDriverList
        }
    },
    beforeMount(){
        axios.get(`http://${this.hostname}:3000/app/getTransportOrderList`)
        .then(result => {
            console.log(result)
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    }

}

</script>