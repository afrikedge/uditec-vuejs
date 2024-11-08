<template>
    <table class="table  is-narrow is-hoverable is-fullwidth is-bordered tableFixHead">
        <thead class=" my-2">
            <tr> 
                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-6 tableFix1stColumn" style="min-width: 100px; z-index:50">Code</th>
                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-6" style="min-width: 100px;">Description</th>
                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-6" style="min-width: 100px;">Variante</th>
                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-6" style="min-width: 100px;">UV</th>
                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-6" style="min-width: 100px;">Stock</th>
                <th class="has-background-red has-text-white has-text-right has-text-weight-normal is-size-6" style="min-width: 100px;">P.U.</th>
                <th class="has-background-red has-text-white has-text-left has-text-weight-normal is-size-6" style="min-width: 100px;">Code barre</th>
            </tr>
        </thead>
        <tbody style="">
            <tr  v-for="(elt,index) of filteredItemList" :key="index" @click.prevent="$emit('onGettingLineFromSelectableItemList',elt)">
                <td class="has-text-left has-background-dark has-text-white is-narrow tableFix1stColumn">
                    <a class="has-text-white my-5" @click.stop="$emit('onGettingItemNoFromSelectableItemList',elt['No_'])">
                        <span>{{ elt['No_'] }} </span>
                    </a> 
                </td>
                <td class="has-text-left has-background-light is-narrow"> {{ elt['Description'] }}</td>
                <td class="has-text-left has-background-light is-narrow"> {{ elt['Variant Code'] }}</td>
                <td class="has-text-left has-background-light is-narrow"> {{ elt['Sales Unit of Measure'] }}</td>                
                <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Stock']) }}</td>                
                <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Unit Price']) }}</td>                
                <td class="has-text-left has-background-light is-narrow"> {{ elt['Bar Code'] }}</td>                
            </tr>
        </tbody>
    </table>
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

    function formatAmount(number){
        if(number || number>=0){
            return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
        }else{
            return 0
        }
    }


    onMounted(()=>{
        axios.get(`http://${hostname}:5000/app/getItemList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
        .then(result => {
            console.log('salut',result)
            elementList.value=result.data.recordset
        }).catch(err=>console.log(err))
    })

    return {
        elementList,filteredItemList,formatAmount
    }

},
}
</script>
<style scoped>
.tableFixHead thead tr th {
position: sticky; /* make the table heads sticky */
top: -5px; /* table head will be placed from the top of the table and sticks to it */
}
.has-background-red{
background-color:#a20d01
}

.tableFix1stColumn {
position: sticky;
left:-05px;
z-index: 10;
}
</style>