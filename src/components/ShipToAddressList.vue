<template>
    <div class="my-5 mx-5">
        
        <ship-to-address-list-ribbon 
        pageTitle="Adresses de livraison"
        :hasAThirdPresentation="false"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        routeForNewCard="../NewShipToAddress"
        :newCardBtnDisabled="false"
        :editCardBtnDisabled="false"
        ></ship-to-address-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="customer-column" style="overflow: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code adresse</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Nom de l'adresse</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code client</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Adresse : Ligne 1</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Adresse : Ligne 2</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Ville</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr id="" v-for="shipToAddress of filteredshipToAddressList" :key="shipToAddress['Code']" class="is-narrow">
                            <td class="has-text-left has-background-light"> 
                                <router-link :to="`/ShipToAddressCard/${ shipToAddress['Customer No_'] }/${ shipToAddress['Code'] }`">
                                    <a href="#" class="has-text-orange">
                                        {{ shipToAddress['Code'] }} 
                                    </a>
                                </router-link>
                            </td>
                            <td class="has-text-left has-background-light is-narrow"> {{ shipToAddress['Name']}}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ shipToAddress['Customer No_']}}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ shipToAddress['Address'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ shipToAddress['Address 2'] }}</td>
                            <td class="has-text-left has-background-light is-narrow"> {{ shipToAddress['City'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="shipToAddress of filteredshipToAddressList" :key="shipToAddress['Code']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        
                                        <router-link :to="`/ShipToAddressCard/${ shipToAddress['Customer No_'] }/${ shipToAddress['Code'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ shipToAddress['Code'] }} 
                                            </a>
                                        </router-link>
                            
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ shipToAddress['Name'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ shipToAddress['Customer No_'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ shipToAddress['City'] }}</span>
                                    </div>
                                   
                                </div>
                            </div>
                            <a class="column is-narrow has-background-orange is-flex ">
                                <span class="is-align-self-center has-text-white">...</span>

                            </a>
                        </div>
                    </div>
                </div>
            </div--->
        </div>
    </div>
    
</template>

<script scoped>
import shipToAddressListRibbon from './RibbonForLists.vue'
import axios from 'axios'
import {computed ,ref } from 'vue'
import { useNavigationTabStore } from '@/Stores/NavigationTab'


export default {

    name:'ship-to-address-list',
    components:{
        shipToAddressListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['shipToAddressPresentation']
        }
    },
    setup() {
        const  shipToAddressList = ref([])
        const eltToSearch = ref('')
        const filteredshipToAddressList = computed(()=>
            shipToAddressList.value
            .filter((row) => new String(row['Code']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['Address']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                    || new String(row['City']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
        )
        // expose to template and other options API hooks
        return {
            shipToAddressList,
            eltToSearch,
            filteredshipToAddressList
        }
    },
    data(){
        return {

            //indique la route active
            shipToAddressListId:this.$route.params.id,
            
            //nom de l'hote dans l'url 
            hostname:window.location.hostname       
        }
    },
    methods:{
    },
    
    mounted(){
        axios.get(`http://${this.hostname}:5000/app/getshipToAddressList/${this.shipToAddressListId}`)
        .then((result) => {
            this.shipToAddressList = result.data;
        })
        .catch(err=>console.log(err));
      
    }
}

</script>

<style scoped>
.customer-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}
.has-text-orange{
    color: orange;
}
.has-text-orangered{
    color: orangered;
}
.has-background-orange{
    background-color: rgb(255, 155, 118);
}
.has-background-orange:hover {
    background-color: rgb(255, 68, 0);
}
.card-is-hoverable:hover{
    background-color: rgba(255, 68, 0, 0.068)
}
hr.rounded {
  border-top: 8px solid #bbb;
  border-radius: 5px;
}
.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
 }

</style>
