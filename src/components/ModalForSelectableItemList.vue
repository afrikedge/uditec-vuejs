<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-content box w-auto shadow" style=" background-color: rgba(255,255,255,1);border: none;">

            <div class="has-text-left mb-5">
                <h6 class="subtitle is-6 has-text-left is-flex-wrap-wrap">
                    Articles |
                </h6>
            </div>

            <div class="has-background-light columns" style="max-height: 650px;">
            <div class="column mt-5" id="customer-column" style="overflow-y: visible;overflow-x: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description 2</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code catégorie article</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code groupe produit</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code unité</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Poids Brut</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Poids net</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr id="" v-for="(elt,index) of elementList" :key="index">
                                <td class="has-text-left has-background-light"> 
                                    <router-link :to="`/ItemCard/${ elt['No_'] }`">
                                        <a href="#" class="has-text-orange">
                                            {{ elt['No_'] }} 
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Description'] }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Description 2'] }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Item Category Code'] }} </td>                
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Product Group Code'] }}</td>                
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Sales Unit of Measure'] }}</td>                
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Gross Weight'] }}</td>                
                                <td class="has-text-left has-background-light is-narrow"> {{ elt['Net Weight'] }}</td>                
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

export default{
    name:'modal-for-selectable-item-list',
    props:['isActive'],
    data(){
    return{
            ModalForSelectableItemListShowned:true,
            elementList:[]
        }
    },
    beforeMount(){
        axios.get(`http://localhost:3000/app/getItemList`)
        .then(result => {
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    }

}

</script>