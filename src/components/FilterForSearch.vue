<template>
    <div>
        <div class="columns has-background-light is-multiline is-mobile is-gapless is-vcentered" style="max-width: 300px;height: 50px;">
            <div class="column  is-11 is-narrow has-text-left">
                <span class="title  is-6">{{ pageTitle }} </span>
            </div>
            <div class="column  is-narrow has-text-right">
                <span class="icon  has-text-orange">
                    <i class="fas fa-close"></i>
                </span>
            </div>
                
        </div>

        <div class="columns has-background-light is-multiline is-mobile is-gapless is-vcentered" style="max-width: 300px;">
            <div class="column is-11 is-narrow has-text-left">  
                <span class="subtitle has-text-orange is-6">Tous:</span>
            </div>
            <div class="column  is-narrow has-text-right">
                <span>...</span>
            </div>       
        </div>

        <div class="columns  has-background-light is-multiline is-mobile is-gapless is-vcentered" style="border-top:1px solid rgba(0, 0, 0, 0.284);min-width: 300px;max-height: 100px;">
            <div class="column has-text-left is-12 is-narrow">
                <span class="subtitle is-6">Filtrer la liste par :</span>
            </div>
        </div>

        <div v-for="(criterion, index) in searchCriteria" :key="index">
           
            <div class="columns  has-background-light is-multiline is-mobile is-gapless is-vcentered" style="min-width: 300px;">
                <div class="column has-text-left is-narrow is-12">
                    <a href="#" class="is-small" @click="removeSearchCriterion(index)">
                        <span class="icon has-text-orange is-small is-left">
                            <i class="fas fa-close"></i>
                        </span>
                    </a>
                    <span class="subtitle is-6">{{ getColumnLabel(criterion.column) }}</span>
                    <div class="columns  has-background-light is-multiline is-mobile is-gapless is-vcentered" style="min-width: 300px;">
                        <div class="column has-text-left is-narrow is-12">
                            <div class="has-a-size" v-if="criterion.column !='Processing Status'">
                                <input class="input is-small" :type="getInput(criterion.column)" v-model="searchInput_data"  @input.prevent="$emit('onInputSearchData',searchInput_data)" :placeholder="getPlacehorder(criterion.column)" style="border-radius:5px;">
                            </div>
                            <div class="select control" v-else>
                                <select class="has-a-size is-small"  v-model="searchInput_data" @change.prevent="$emit('onInputSearchData',searchInput_data)">
                                    <option v-for="(label, value) in optionLabelList" :key="value" :value="value">
                                        {{ label.Description }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns  has-text-left has-background-light is-multiline is-mobile is-gapless is-vcentered" style="min-width: 300px;height:50px;">
            <div class="column is-narrow is-12" v-if="!searchInput_isDisabled">
                <div class="field px-2 has-addons">
                    <div class="custom-select is-small">
                        <div class="custom-select-trigger control" style="width:250px;border-radius:5px;height:3rem;"></div>
                        <div class="custom-options" style="border-radius:5px;">
                            <li class="has-text-orange" disabled>Champs visibles</li>
                            <li  class="custom-option"
                                v-for="option in options" 
                                :key="option.value"  
                                :data-value="option.value" 
                                @click="selectOption(option.value)">
                                {{ option.label }}
                            </li>
                        </div> 
                    </div>
                    <div class="control ">
                        <a href="#" class="button" @click="searchInput_isDisabled=true" style="height:3rem;">
                            <span class="icon has-text-orange is-size-5">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div> 
            <div class="column  has-text-left is-narrow is-12"  v-else>   
                <a href="#" class="px-3 py-3 is-left has-text-orange" @click="searchInput_isDisabled=false;searchInput_data=''">
                    <span class="icon is-size-4 is-medium is-left">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span class="subtitle is-6">Filtre...</span>
                </a>
            </div> 
                    
            <!-- <div class="column is-narrow" v-for="(criterion, index) in searchCriteria" :key="index">
                <div class="field px-2 has-addons">
                    <div class="control">
                        <span>{{ getColumnLabel(criterion.column) }}</span>
                    </div>
                    <div class="control has-icons-left has-a-size" v-if="criterion.column !='Processing Status'">
                        <input :type="getInput(criterion.column)" v-model="searchInput_data"  @input.prevent="$emit('onInputSearchData',searchInput_data)" class="input is-small has-border-bottom-orange" placeholder="Rechercher...">
                        <span class="icon has-text-orange is-small is-left">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                    <div class="control " v-else>
                        <select  v-model="searchInput_data" @change.prevent="$emit('onInputSearchData',searchInput_data)" class=" has-a-size has-border-bottom-orange">
                            <option v-for="(label, value) in optionLabelList" :key="value" :value="value">
                                {{ label.Description }}
                            </option>
                        </select>
                    </div>
                    <div class="control">
                        <a href="#" class="button is-small has-border-bottom-orange" @click="removeSearchCriterion(index)">
                            <span class="icon is-small is-left">
                                <i class="fas fa-close"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>  -->
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name:'filter-for-search',
    components:{

    },
    
    data(){
        return {
            
            //indique la variable qui contiendra les données à rechercher
            searchInput_data:''
        }
    },
    props:['pageTitle','optionLabelList'],
    
    setup() {
        const newSearchColumn = ref('');
        const searchCriteria = ref([]);
        //permet d'afficher la zone de recherche
        const searchInput_isDisabled = ref(true);
        const selectedOption = ref('');

        const options = ref([
            { label: 'N°', value: 'No_' },
            { label: 'Code client', value: 'Sell-to Customer No_' },
            { label: 'Nom du client', value: 'Sell-to Customer Name' },
            { label: 'Code vendeur', value: 'Salesperson Code' },
            { label: 'Code magasin', value: 'Location Code' },
            { label: 'Date commande', value: 'Document Date' },
            { label: 'Montant HT', value: 'Total Amount' },
            { label: 'Statut traitement', value: 'Processing Status' },
        ]);

        const selectOption = (value) => {
            newSearchColumn.value = value;
            addSearchCriterion();
        };


        const addSearchCriterion = () => {
            if (newSearchColumn.value) {
                searchCriteria.value.push({ column: newSearchColumn.value, value: '' });
                newSearchColumn.value = '';
                searchInput_isDisabled.value = true;
            }
        }

        const removeSearchCriterion = (index) => {
            searchCriteria.value.splice(index, 1)
        }

        const getColumnLabel = (column) => {
            const labels = {
                'No_': 'N°',
                'Sell-to Customer No_': 'Code client',
                'Sell-to Customer Name': 'Nom du client',
                'Salesperson Code': 'Code vendeur',
                'Location Code': 'Code magasin',
                'Document Date': 'Date commande',
                'Total Amount': 'Montant HT',
                'Processing Status': 'Statut traitement'
            }
            return labels[column]
        }

        const getInput = (column) => {
            switch (column) {
                case 'Document Date':
                return 'date'
                case 'Total Amount':
                return 'number'
                default:
                return 'text'
            }
        }

        const getPlacehorder = (column) => {
            switch (column) {
                case 'No_':
                return 'Entrer N°'
                case 'Sell-to Customer No_':
                return 'Entrer Code client'
                case 'Sell-to Customer Name':
                return 'Entrer Nom du client'
                case 'Salesperson Code':
                return 'Entrer Code vendeur'
                case 'Location Code':
                return 'Entrer Code magasin'
                case 'Total Amount':
                return 'Entrer Montant HT'
            }
        }

        return {
            newSearchColumn,
            searchCriteria,
            addSearchCriterion,
            removeSearchCriterion,
            getColumnLabel,
            getInput,
            getPlacehorder,
            searchInput_isDisabled,
            options,
            selectOption,
            selectedOption
        }
    }
}
</script>


<style scoped>
a:hover {
    background-color: rgba(255, 68, 0, 0.068);
}
.has-border-bottom-orange{
    border-bottom:3px solid orange;
}

.has-background-orange{
    background-color: #ff4500;
}

.has-text-orange{
    color:3px solid orange;
}


.custom-select {
  position: relative;
}

.custom-select-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ece9e9;
}

.custom-option {
  padding: 10px;
  cursor: pointer;
}

.custom-option:hover {
  background-color: orange;
}

.arrow {
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
}

li {
    list-style: none;
    background:white;
    width:235px;
    overflow-y: auto;
}

.has-a-size {
 width: 300px;
 height: 2.5rem;
}
</style>
