<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-75 h-50 shadow has-background-light" style="border: none;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Contacts |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"> </input-search>
            </div>

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

                            <tr :id="elt['No_']" v-for="(elt,index) of filteredContactList" :key="index" @click="$emit('onGettingLineFromSelectableContactListModal',elt);$emit('closeModal')">
                                <td class="has-text-left is-narrow"> 
                                    <router-link :to="`/ContactCard/${customerName}/${ elt['No_'] }`">
                                        <a href="#" class="has-text-orange">
                                            {{ elt['No_'] }} 
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left is-narrow"> {{ elt['Name'] }}</td>
                                <td class="has-text-left is-narrow"> {{ elt['Address'] }} </td>                
                                <td class="has-text-left is-narrow"> {{ elt['City'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['Phone No_'] }}</td>                
                                <td class="has-text-left is-narrow"> {{ elt['Salesperson Code'] }}</td>                
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
    setup(props){
        const eltToSearch = ref('')
        const elementList = ref([])

        const filteredContactList = computed(()=> {
        if(props.customerNo)
            return elementList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Contact']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['City']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                && row['Customer No_']==props.customerNo
            )
        else
            return elementList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Contact']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['City']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
        })
        
        return {
            eltToSearch,elementList,filteredContactList
        }
    },
    mounted(){
        axios.get(`http://${this.hostname}:5000/app/getContactList`)
        .then(result => {
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    },

}

</script>