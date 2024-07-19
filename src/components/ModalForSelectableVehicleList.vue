<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-50 shadow has-background-light" style="border: none;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Véhicule |
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Immatriculation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type de véhicule</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Marque</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Modèle</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Longueur utile en mètre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Largeur utile en mètre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Hauteur utile en mètre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Volume utile en mètre cube</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Charge utilise en Kilogramme</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Transporteur</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Chauffeur par défaut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Statut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code Immobilisation</th>

                       
                        </tr>
                    </thead>
                    <tbody>

                            <tr :id="elt['Registration N°']" v-for="(elt,index) of filteredVehiculeList" :key="index" @click="$emit('onGettingLineFromSelectableVehiculeListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow"> 
                                    <router-link :to="`/TransportOrderCard/${ elt['Registration N°'] }`">
                                        <a href="#" class="has-text-orange">
                                            {{ elt['Registration N°'] }} 
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left is-narrow"> {{ elt['Vehicle Type'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Brand'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Model'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Useful length (m)'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Useful width (m)'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Useful height (m)'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Useful volume (cbm)'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Payload (kg)'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Carrier N°'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Default Drive N°'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Vehicle Status'] }} </td> 
                                <td class="has-text-left is-narrow"> {{ elt['Fixed Asset N°'] }} </td> 
                                
                                                 
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
    name:'modal-for-selectable-vehicle-list',
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
    setup(){
        const eltToSearch = ref('')
        const elementList = ref([])

        const filteredVehiculeList = computed(()=>
            elementList.value
            .filter((row) => new String(row['Registration N°']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Vehicle Type']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Brand']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Model']).toLowerCase().includes(eltToSearch.value)
               
            )
        )
        
        return {
            eltToSearch,elementList,filteredVehiculeList
        }
    },
    beforeMount(){
        axios.get(`http://${this.hostname}:3000/app/getVehiculeList`)
        .then(result => {
            console.log(result)
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    }

}

</script>