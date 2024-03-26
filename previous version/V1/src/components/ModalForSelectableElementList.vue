<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="ModalForSelectableElementListShowned">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="ModalForSelectableElementListShowned=false"></div>
        <div class="modal-content box w-auto shadow" style=" background-color: rgba(255,255,255,1);border: none;">

            <div class="has-text-left mb-5">
                <h6 class="subtitle is-6 has-text-left is-flex-wrap-wrap">
                    {{ listTitle }} |
                </h6>
            </div>

            <div class="has-background-light columns" style="max-height: 650px; max-width: 850px;">
            <div class="column mt-5" id="customer-column" style="overflow-y: visible;overflow-x: scroll;">
                <table class="table  is-narrow is-hoverable is-fullwidth">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° Donneur d'ordre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom donneur d'ordre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Contact donneur d'ordre</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date document</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date comptabilisation</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code magasin</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date de fin de validité devis</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Date livraison demandée</th>
                        </tr>
                    </thead>
                    <tbody style="">

                            <tr id="" v-for="(elt,index) of elementList" :key="index">
                                <td class="has-text-left has-background-light"> 
                                    <router-link :to="`/${ cardTitle }/${ elt['No_'] }`">
                                        <a href="#" class="has-text-orange">
                                            {{ elt['No_'] }} 
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left has-background-light"> </td>
                                <td class="has-text-left has-background-light is-narrow"> </td>
                                <td class="has-text-left has-background-light is-narrow"> </td>
                                <td class="has-text-left has-background-light is-narrow"> </td>                
                                <td class="has-text-left has-background-light is-narrow"> </td>                
                                <td class="has-text-left has-background-light is-narrow"> </td>                
                                <td class="has-text-left has-background-light is-narrow"> </td>                
                                <td class="has-text-left has-background-light is-narrow"> </td>                               
                                <td class="has-text-left has-background-light is-narrow"> </td>                               
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>

        </div>
        <button class=" modal-close is-large has-background-dark is-large is-danger" aria-label="close" @click.prevent="ModalForSelectableElementListShowned=false"></button>
    </div>
</template>
<script>
import axios from 'axios'

export default{
    name:'modal-for-selectable-element-list',
    props:['getAction','listTitle','cardTitle'],
    data(){
    return{
            ModalForSelectableElementListShowned:true,
            elementList:[],
            //nom de l'hote dans l'url 
            hostname:window.location.hostname

        }
    },
    beforeMount(){
        console.log(this.getAction)
        console.log(this.listTitle)
        console.log(this.cardTitle)
        axios.get(`http://${this.hostname}:3000/app/${this.getAction}`)
        .then(result => {
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    }

}

</script>