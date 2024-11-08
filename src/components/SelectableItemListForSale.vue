<template>
    <div style="overflow-x: scroll;overflow-y: hidden;" class="shadow">
        <table class="table  is-narrow is-hoverable is-fullwidth">
            <thead class=" my-2">
                <tr> 
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description 2</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code catégorie article</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code groupe produit</th>
                    <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Unité de vente</th>
                    <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Prix de base</th>
                    <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Stock</th>
                    <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Poids Brut</th>
                    <th class="has-background-light has-text-grey has-text-right has-text-weight-normal is-size-7" style="min-width: 100px;">Poids net</th>
                </tr>
            </thead>
            <tbody style="">
                <tr  v-for="(elt,index) of dividedItemList" :key="index" @click="$emit('onGettingLineFromSelectableItemList',elt)">
                    <td class="has-text-left has-background-light "> 
                        <span class="has-text-weight-semibold"> {{ elt['No_'] }}</span>
                    </td>
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Description'] }}</td>
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Description 2'] }}</td>
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Item Category Code'] }} </td>                
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Product Group Code'] }}</td>                
                    <td class="has-text-left has-background-light is-narrow"> {{ elt['Sales Unit of Measure'] }}</td>                
                    <td class="has-text-right has-background-light is-narrow"> {{ formatAmount(elt['Unit Price']) }}</td>                
                    <td class="has-text-right has-background-light is-narrow"> {{ elt['Stock'] }}</td>                
                    <td class="has-text-right has-background-light is-narrow"> {{ elt['Gross Weight'] }}</td>                
                    <td class="has-text-right has-background-light is-narrow"> {{ elt['Net Weight'] }}</td>                
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import { computed, ref} from 'vue'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'


export default{
    name:'selectable-item-list-for-sale',
    props:['itemCode','itemDescription'],
    data(){
        return {
            //nom de l'hote dans l'url 
            hostname:window.location.hostname
        }
    },
    setup(props){


        const itemCodeToSearch = ref('')
        const itemDescriptionToSearch = ref('')
        const elementList = ref([])

        const filteredItemList = computed(()=>
            elementList.value
            .filter((row) => new String(row['Description']).toLocaleLowerCase().includes(new String(props.itemDescription).toLowerCase())
            && new String(row['No_']).toLocaleLowerCase().includes(new String(props.itemCode).toLocaleLowerCase())
                
            )
        )


        //Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(200)
        const dividedItemList = computed(()=>{
            if(itemCodeToSearch.value || itemDescriptionToSearch.value){
                return filteredItemList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredItemList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })



        function formatAmount(number){
            if(number || number>=0){
                return new Intl.NumberFormat('fr-FR', { style: 'decimal' ,minimumFractionDigits: 2, }).format(number)
            }else{
                return 0
            }
        }
  
        return {
            itemCodeToSearch,itemDescriptionToSearch,elementList,filteredItemList,formatAmount,dividedItemList
        }

    },
    mounted(){
        axios.get(`http://${this.hostname}:5000/app/getItemList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
        .then(result => {
            this.elementList=result.data.recordset
        }).catch(err=>console.log(err))

    },
}
</script>