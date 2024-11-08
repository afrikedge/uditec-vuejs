<template>
    <div :class="{'modal':true , 'is-active': true }" v-if="isActive">
        <div class="modal-background has-background-dark" style="opacity:0.2" @click.prevent="$emit('closeModal')"></div>
        <div class="modal-card w-50 h-50">
            <header class="modal-card-head has-text-left">
                <div class="modal-card-title">
                    <div class="columns is-vcentered">
                        <div class="column is-narrow">Contacts</div>
                        <div class="column is-narrow">
                            <input-search v-model="eltToSearch" > </input-search> 
                        </div>
                        <div class="column">
                            <a href="#" class="button has-background-orange has-text-white " @click.prevent="$emit('onDisplayingContactCreationModal')">
                                <span class="icon mr-1">
                                    <i class="fas fa-plus"></i>
                                </span>
                                Nouveau
                            </a>
                        </div>
                    </div>
                </div>      
                <button class="delete is-large" aria-label="close" @click.prevent="$emit('closeModal')"></button>
            </header>
            <section class="modal-card-body">
                <div class="loader" v-if="!res_fetching_data_occur && !error_fetching_data_occur"></div>
                <div class="column is-narrow " style="margin: auto;" v-if="error_fetching_data_occur">
                    <article class="message is-danger">
                        <div class="message-header">
                            <p>Error</p>
                            <button class="delete" aria-label="delete"></button>
                        </div>
                        <div class="message-body">
                            L'application n'a pas pu obtenir de résultat 
                        </div>
                    </article>
                </div>
                <div class="column is-narrow " style="margin-left: auto;margin-right: auto;" v-if="filteredContactList.length == 0 && res_fetching_data_occur">
                    Aucun enregistrement n'a été trouvé
                </div>
                <div v-if="res_fetching_data_occur && filteredContactList.length > 0 && !error_fetching_data_occur">
                    <table class="table  is-narrow is-hoverable is-fullwidth shadow tableFixHead">
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
                        <tbody>
                            <tr :id="elt['No_']" v-for="(elt,index) of dividedContactList" :key="index"  @mouseover="setLineShadow(elt['No_'])" @mouseout="removeLineShadow(elt['No_'])">
                                <td class="has-text-left is-narrow"> 
                                    <a href="#" class="has-text-orange" @click.prevent="$emit('onDisplayingContactCard',elt['No_'])">
                                        {{ elt['No_'] }} 
                                    </a>
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
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button has-text-orange" @click="prevPage" v-if="currentPage > 1">
                        <span class="icon">
                            <i class="fas fa-chevron-left"></i>
                        </span>    
                    </button>
                    <button class="button has-background-orange has-text-white" @click="pageSize = pageSize + 50" v-if="(pageSize < filteredContactList.length) && (currentPage !== Math.ceil(filteredContactList.length/pageSize))">
                        Charger plus
                    </button>
                    <button class="button has-text-orange" @click="nextPage" v-if="currentPage*pageSize < filteredContactList.length">
                        <span class="icon">
                            <i class="fas fa-chevron-right"></i>
                        </span>    
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import inputSearch from './input/input-search.vue'
import { computed, onMounted, ref } from 'vue'

export default{
    name:'modal-for-contact-list',
    props:['customerNo','isActive'],
    data(){
        return {
        }
    },
    components:{
        inputSearch,
    },
    setup(props){
        const elementList = ref([])
        const hostname = window.location.hostname
        
        //Gestion de la recherche
        const eltToSearch = ref('')
        const filteredContactList = computed(()=> {
            return elementList.value
            .filter((row) => new String(row['No_']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Name']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['Contact']).toLowerCase().includes(eltToSearch.value.toLowerCase())
                || new String(row['City']).toLowerCase().includes(eltToSearch.value.toLowerCase())
            )
        })



//Gestion de la pagination
        const currentPage = ref(1)
        const pageSize = ref(50)
        const dividedContactList = computed(()=>{
            if(eltToSearch.value){
                return filteredContactList.value
                .filter((row, index) => {
                    let start = (0)*pageSize.value;
                    let end = currentPage.value*pageSize.value;
                    if(index >= start && index < end) return true;
                })
            }else {
                return filteredContactList.value
                    .filter((row, index) => {
                        let start = (currentPage.value-1)*pageSize.value;
                        let end = currentPage.value*pageSize.value;
                        if(index >= start && index < end) return true;
                    })
            }
        })
        function nextPage(){
            if((currentPage.value*pageSize.value) < filteredContactList.value.length) currentPage.value++;
        }
        function prevPage(){
            if(currentPage.value > 1) currentPage.value--
        }


//Gestion de la récupération de la liste à afficher
        const res_fetching_data_occur = ref(false)
        const error_fetching_data_occur = ref(false)
        function getContactList(){
            axios.get(`http://${hostname}:5000/app/getContactListOfCustomer?customerId=${props.customerNo}`)
            .then(result => {
                elementList.value=result.data.recordset
                res_fetching_data_occur.value = true
            }).catch(()=>{
                error_fetching_data_occur.value = true
            })
        }

        onMounted(() => {
            getContactList()
        })
        
        return {
            eltToSearch,elementList,filteredContactList,
            dividedContactList,pageSize,currentPage,nextPage,prevPage,
            getContactList,
            res_fetching_data_occur,error_fetching_data_occur
        }
    },
    methods:{
        setLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.add('is-hovered-td')
            myElt.classList.add('shadow')
        },
        removeLineShadow(id){
            const myElt=document.getElementById(id)
            myElt.classList.remove('is-hovered-td')
            myElt.classList.remove('shadow')
        },
    },
}
</script>
<style scoped>
.has-background-orange{
  background-color: orange;
}
.has-text-orange{
  color: orange;
}
    .tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: -22px; /* table head will be placed from the top of the table and sticks to it */
        z-index: 15000;
    }
    .is-hovered-td{
        position: relative;
        top:1px;
        z-index: 1000;
    }

.loader {
  margin: auto;
  border: 20px solid #EAF0F6;
  border-radius: 50%;
  border-top: 20px solid orange;
  width: 200px;
  height: 200px;
  animation: spinner 4s linear infinite;
}
@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>