<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-auto h-50 shadow has-background-light" style="border: none;">

            <div class="has-text-left mb-5 columns">
                <div>
                    <span class="subtitle  has-text-left column is-narrow">
                        Emplacements magasin |
                    </span>
                </div>
                <input-search class="column is-narrow" v-model="eltToSearch"> </input-search>
            </div>

            <div class="columns" style="max-height: 650px;">
            <div class="column mt-5" id="customer-column" style="overflow-y: visible;overflow-x: scroll;">
                <table class="table  is-narrow is-hoverable">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code</th>
                        </tr>
                    </thead>
                    <tbody>

                            <tr :id="elt['Bin Code']" v-for="(elt,indexLBL) of filteredLocationBinList" :key="indexLBL" @click="$emit('onGettingLineFromSelectableLocationBinListModal',elt['Bin Code']);$emit('closeModal')">
                                <td class="has-text-left is-narrow"> 
                                    {{ elt['Bin Code'] }} 
                                </td>       
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
import { computed, onBeforeMount, ref } from 'vue'
//import NewShipToAddress from './NewShipToAddress.vue'


export default{
    name:'modal-for-selectable-contact-list',
    props:['locationCode','itemCode','isActive'],
    data(){
        return {
        }
    },
    components:{
        inputSearch,
        //NewShipToAddress,
    },
    setup(props){
        const eltToSearch = ref('')
        const elementList = ref([])
        const hostname = window.location.hostname


        const filteredLocationBinList = computed(()=>
            elementList.value
            .filter((row) => new String(row['Bin Code']).toLowerCase().includes(eltToSearch.value)
            )
        )

        function getLocationBinList(){
            axios.get(`http://${hostname}:5000/app/getLocationBinList?locationCode=${props.locationCode}&itemCode=${props.itemCode}`)
            .then(result => {
                elementList.value=result.data
            }).catch(err=>console.log(err))
        }

        onBeforeMount(() =>{
            getLocationBinList()
        })
        
        return {
            eltToSearch,elementList,filteredLocationBinList,getLocationBinList
        }
    },

}

</script>