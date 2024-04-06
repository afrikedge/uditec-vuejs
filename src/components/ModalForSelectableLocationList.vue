<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-50 shadow has-background-light" style=" background-color: rgba(255,255,255,1);border: none;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Magasins |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"> </input-search>
            </div>
              <!---------Composant rubban fiche contact----------------------->
              <contact-card-ribbon
                routeForNewCard="../NewContact"
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
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Adresse</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Ville</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">téléphone</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Contact</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr :id="elt['Code']"  v-for="(elt,index) of filteredLocationList" :key="index" @click="$emit('onGettingLineFromSelectableLocationListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow"> <strong> {{ elt['Code'] }}</strong> </td>
                                <td class="has-text-left is-narrow"> {{ elt['Name'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Address'] }} </td>                
                                <td class="has-text-left is-narrow"> {{ elt['City'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['Phone No_'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['Contact'] }}</td>                
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
    name:'modal-for-selectable-location-list',
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

        const filteredLocationList = computed(()=>
            elementList.value
            .filter((row) => new String(row['Code']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Contact']).toLowerCase().includes(eltToSearch.value)
                || new String(row['City']).toLowerCase().includes(eltToSearch.value)
                || new String(row['Address']).toLowerCase().includes(eltToSearch.value)
            )
        )
        
        return {
            eltToSearch,elementList,filteredLocationList
        }
    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getLocationList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
        .then(result => {
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    }

}

</script>