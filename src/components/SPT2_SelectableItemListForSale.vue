<template>
    <div style="overflow-x: scroll;overflow-y: hidden">
        <table class="table  is-narrow is-hoverable is-fullwidth">
            <thead class=" my-2">
                <tr> 
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Catégorie</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Variante</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">UV</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Stock</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">P.U.</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code barre</th>
                </tr>
            </thead>
            <tbody style="">
                <tr  v-for="(elt,index) of filteredItemList" :key="index" @click="$emit('onGettingLineFromSelectableItemList',elt)">
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Item Category Code'] }} </td>                
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['No_'] }} </td>
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Description'] }}</td>
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Variant Code'] }}</td>
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Sales Unit of Measure'] }}</td>                
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Stock'] }}</td>                
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Unit Price'] }}</td>                
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Bar Code'] }}</td>                
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import { computed, onMounted, ref} from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'


export default{
    name:'spt2-selectable-item-list-for-sale',
    props:['elementToSearch'],
    setup(props){


        const elementList = ref([])
        const hostname = window.location.hostname

        const filteredItemList = computed(()=>
            elementList.value
            .filter((row) => 
                //(
                    new String(row['Description']).toLocaleLowerCase().includes(new String(props.elementToSearch).toLowerCase())
            ||  new String(row['No_']).toLocaleLowerCase().includes(new String(props.elementToSearch).toLocaleLowerCase())
            ||  new String(row['Bar Code']).toLocaleLowerCase().includes(new String(props.elementToSearch).toLocaleLowerCase())
            ||  new String(row['Item Category Code']).toLocaleLowerCase().includes(new String(props.elementToSearch).toLocaleLowerCase())
                //) && Number(row['Stock']) > 0
            )
        )


        onMounted(()=>{
            axios.get(`http://${hostname}:3000/app/getItemList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
            .then(result => {
                console.log('salut',result)
                elementList.value=result.data.recordset
            }).catch(err=>console.log(err))
        })
  
        return {
            elementList,filteredItemList
        }

    },
}
</script>