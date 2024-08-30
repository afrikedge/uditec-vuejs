<template>
    <!-- <div class="my-5 mx-5">
      <s-o-list-ribbon 
        pageTitle="Commandes vente"
        routeForNewCard="NewSaleOrder"
        componentwithPresentationView="orderListPresentation"
        :hasAThirdPresentation="false"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        @onInputSearchData="(eltToSearch)=>this.eltToSearch=eltToSearch"
        componentWithCompInfo="orderListRightInfoMaxWidth"
        :newCardBtnDisabled="false"
        :editCardBtnDisabled="false"
        :printCardBtnDisabled="false"
        :displayCardBtnDisabled="false"
        :convertQuoteBtnDisabled="true"
      ></s-o-list-ribbon>
  
      <div class="columns is-vcentered">
        <div class="column is-narrow is-small">
          <div class="field px-2 has-addons">
            <div class="control select">
              <select v-model="newSearchColumn" class="has-border-bottom-orange">
                <option value="No_">N°</option>
                <option value="Sell-to Customer No_">Code client</option>
                <option value="Sell-to Customer Name">Nom du client</option>
                <option value="Salesperson Code">Code vendeur</option>
                <option value="Location Code">Code magasin</option>
                <option value="Document Date">Date commande</option>
                <option value="Total Amount">Montant HT</option>
                <option value="Processing Status">Statut traitement</option>
              </select>
            </div>
            <div class="control">
              <a href="#" class="button has-border-bottom-orange" @click="addSearchCriterion">
                <span class="icon is-small is-left">
                  <i class="fas fa-plus"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
  
      <div class="columns is-vcentered" v-for="(criterion, index) in searchCriteria" :key="index">
        <div class="column is-narrow">
            <div class="field px-2 has-addons">
              <div class="control">
                <span>{{ getColumnLabel(criterion.column) }}</span>
              </div>
              <div class="control has-a-size" v-if="criterion.column !='Processing Status'">
                <input :type="getInput(criterion.column)" v-model="eltToSearch" class="input has-border-bottom-orange" placeholder="Rechercher...">
              
              </div>
              <div class="control select" v-else>
                <select class="has-border-bottom-orange is-small" v-model="eltToSearch">
                  <option v-for="(label, value) in optionLabelList" :key="value" :value="value">
                     {{ label.Description }}
                  </option>
                </select>
              </div>
              <div class="control">
                <a href="#" class="button has-border-bottom-orange" @click="removeSearchCriterion(index)">
                  <span class="icon is-small is-left">
                    <i class="fas fa-close"></i>
                  </span>
                </a>
              </div>
            </div>
        </div>
      </div>
  
      <div class="has-background-light columns" style="height: 750px;">
        <div class="column mt-5" id="customer-column" style="overflow: scroll;" v-if="presentationView=='list'">
          <table class="table is-narrow is-hoverable is-fullwidth tableFixHead">
            <thead class="my-2">
              <tr>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N°</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code client</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Nom du client</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code contact</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code vendeur</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code campagne</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Code magasin</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Crédit disponible</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date commande</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Date d'échéance</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant acompte TTC</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant HT</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Montant TTC</th>
                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">Statut traitement</th>
              </tr>
            </thead>
            <tbody>
              <tr id="" v-for="saleOrder of filteredSOList" :key="saleOrder['No_']">
                 <td class="has-text-left has-background-light is-narrow"> 
                    <router-link :to="`/SaleOrderCard/${ saleOrder['No_'] }`">
                      <a href="#" class="has-text-orange">
                        {{ saleOrder['No_'] }} 
                      </a>
                    </router-link>
                  </td>
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Sell-to Customer No_'] }}</td>
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Sell-to Customer Name'] }}</td>
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Sell-to Contact No_]'] }}</td>
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Salesperson Code'] }}</td>
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Campaign No_'] }}</td>
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Location Code'] }}</td>                
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Available credit'] }}</td>                
                  <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleOrder['Document Date']) }}</td>                
                  <td class="has-text-left has-background-light is-narrow"> {{ formatDate(saleOrder['Document Date']) }}</td>                
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder[''] }}</td>                
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Total Amount'] }}</td>                
                  <td class="has-text-left has-background-light is-narrow"> {{ saleOrder['Total Amount Including VAT'] }}</td>                
                  <td class="has-text-left has-background-light is-narrow has-text-danger" v-if="saleOrder['Processing Status']==3 ||saleOrder['Processing Status']==4"> {{ getLabel(saleOrder['Processing Status']) }}</td>                
                  <td class="has-text-left has-background-light is-narrow has-text-primary" v-else> {{ getLabel(saleOrder['Processing Status']) }}</td>                
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
          <div class="columns is-multiline">
            <div :class="{'column':true, 'is-3':customerInfoCompMaxWidth=='0px', 'is-one-third':customerInfoCompMaxWidth=='800px'}" v-for="saleOrder in filteredSOList" :key="saleOrder['No_']">
              <div class="columns p-1 card-is-hoverable">
                <div class="column has-background-white card-is-hoverable">
                  <p class="has-text-left">
                    <span class="is-size-7 has-text-grey">{{ saleOrder['No_'] }}</span>
                  </p>
                  <div class="has-text-left columns">
                    <div class="column has-text-left has-text-orange py-0 mt-1">
                      <router-link :to="'/SaleOrderCard/' + saleOrder['No_']">
                        <a href="#" class="has-text-orange">
                          <span class="is-size-7 is-underlined">{{ saleOrder['Sell-to Customer Name'] }}</span>
                        </a>
                      </router-link>
                    </div>
                    <div class="column has-text-right is-narrow py-0 mt-1">
                      <span class="is-size-7">{{ saleOrder['Total Amount Including VAT'] }}</span>
                    </div>
                  </div>
                  <div class="has-text-left columns">
                    <div class="column has-text-left py-0">
                      <span class="is-size-7">{{ saleOrder['Sell-to Contact No_'] }}</span>
                    </div>
                  </div>
                </div>
                <a class="column is-narrow has-background-orange is-flex">
                  <span class="is-align-self-center has-text-white">...</span>
                </a>
              </div>
            </div>
          </div>
        </div>
  
        <customer-info class="customer-info" v-if="true"></customer-info>
        <prospect-info class="prospect-info" v-else></prospect-info>
      </div>
    </div> -->
    
    <div class="custom-select-container">
      <div class="custom-select">
        <div class="custom-select-trigger">
          <span>{{  selectedOptionText }}</span>
          <div class="arrow"></div>
        </div>
        <div class="custom-options">
          <div class="custom-option"
               v-for="option in options"
               :key="option.value"
               :data-value="option.value"
               @click="selectOption(option)">
            {{  option.text }}
          </div>
        </div>
      </div>
    </div>


</template>


<!-- <script>
// import CustomerInfo from './CustomerInfo.vue'
// import ProspectInfo from './ProspectInfo.vue'
// import SOListRibbon from './RibbonForLists.vue'
// import axios from 'axios'
// import { ref, computed } from 'vue'
// import { useNavigationTabStore } from '@/Stores/NavigationTab'
// import { useWebUserInfoStore } from '@/Stores/WebUserInfo'

// export default {
//   name: 'sale-quote-list',
//   components: {
//     CustomerInfo,
//     ProspectInfo,
//     SOListRibbon
//   },
//   computed:{
//         presentationView(){
//             return useNavigationTabStore().presentationForPageList['orderListPresentation']
//         },
//         // filteredSOList() {
//         //     return this.saleOrderList.filter((row) => {
//         //         const searchValue = new String(this.eltToSearch).toLowerCase();
//         //         if (this.isDateColumn) {
//         //             return new Date(row[this.searchColumn]).toISOString().slice(0, 10) === searchValue;
//         //         } else if (this.isNumberColumn) {
//         //             return Number(row[this.searchColumn]) === Number(this.eltToSearch);
//         //         } else if (this.isStatusColumn) {
//         //             return row[this.searchColumn] === Number(this.eltToSearch);
//         //         } else {
//         //             return new String(row[this.searchColumn]).toLowerCase().includes(searchValue);
//         //         }
//         //     });
//         // }
//     },
//   setup() {
//     const saleOrderList = ref([])
//     const optionLabelList = ref([])
//     const eltToSearch = ref('')
//     const newSearchColumn = ref('')
//     const searchCriteria = ref([])

//     const addSearchCriterion = () => {
//       if (newSearchColumn.value) {
//         searchCriteria.value.push({ column: newSearchColumn.value, value: '' })
//         newSearchColumn.value = ''
//       }
//     }

//     const removeSearchCriterion = (index) => {
//       searchCriteria.value.splice(index, 1)
//     }

//     const getColumnLabel = (column) => {
//       const labels = {
//         'No_': 'N°',
//         'Sell-to Customer No_': 'Code client',
//         'Sell-to Customer Name': 'Nom du client',
//         'Salesperson Code': 'Code vendeur',
//         'Location Code': 'Code magasin',
//         'Document Date': 'Date commande',
//         'Total Amount': 'Montant HT',
//         'Processing Status': 'Statut traitement'
//       }
//       return labels[column]
//     }

//     const getInput = (column) => {
//       switch (column) {
//         case 'Document Date':
//           return 'date'
//         case 'Total Amount':
//           return 'number'
//         default:
//           return 'text'
//       }
//     }

//     const filteredSOList = computed(() => {
//       return saleOrderList.value.filter((row) => {
       
//           const searchValue = new String(eltToSearch.value).toLowerCase();
//           if (newSearchColumn.value === 'Document Date') {
//             return new Date(row[newSearchColumn.value]).toISOString().slice(0, 10) === searchValue;
//           } else if (newSearchColumn.value === 'Total Amount') {
//             return Number(row[newSearchColumn.value]) === Number(eltToSearch.value);
//           } else if (newSearchColumn.value === 'Processing Status') {
//             return  row[newSearchColumn.value] === Number(eltToSearch.value);
//           } else {
//             return new String(row[newSearchColumn.value]).toLowerCase().includes(searchValue);
//           }
        
//       })
//     })

//     return {
//       eltToSearch,
//       saleOrderList,
//       optionLabelList,
//       searchCriteria,
//       newSearchColumn,
//       addSearchCriterion,
//       removeSearchCriterion,
//       getColumnLabel,
//       getInput,
//       filteredSOList
//     }
//   },
//   data() {
//     return {
//       //taille (largeur) initiale du composant customerInfo
//       customerInfoCompMaxWidth: useNavigationTabStore().tabRightInfo.orderListRightInfoMaxWidth,
//       hostname: window.location.hostname
//     }
//   },
//   methods: {
//     hideOrShowComponentInfo(){
//       if(this.customerInfoCompMaxWidth=='0px') {
//         useNavigationTabStore().setMaxWidth('orderListRightInfoMaxWidth','800px')
//         this.customerInfoCompMaxWidth='800px'
//       }
//       else {
//         useNavigationTabStore().setMaxWidth('orderListRightInfoMaxWidth','0px')
//         this.customerInfoCompMaxWidth='0px'
//       }
//     },


//     formatDate(date){
//       if (new String(date).includes('1753-')) return ''
//       else return new Date(date).toLocaleDateString()
//     },

//     getLabel(fieldValue){
//       if (this.optionLabelList[Number(fieldValue)]){
//         return this.optionLabelList[Number(fieldValue)]['Description']
//       }
//     },
//   },
//   mounted(){
//         axios.get(`http://${this.hostname}:3000/app/getSOList?respCenter=${useWebUserInfoStore().responsibilityCenter}`)
//         .then(result => {
//             this.saleOrderList=result.data.recordset
//         }).catch(err=>console.log(err))

//         const language = useWebUserInfoStore().defaultLanguage
//         const field = '[Processing Status]'
//         if(this.saleOrderList.length==0){
//             axios.get(`http://${this.hostname}:3000/app/getOptionLabelList?lg=${language}&fd=${field}`)
//             .then(result => {
//                 this.optionLabelList = result.data.recordset
//             }).catch(err=>console.log(err))
//         }
//     },
 
// }
</script> -->

<script>
export default {
  data() {
    return {
      options: [
        { value: 'No_', text: 'N°' },
        { value: 'Sell-to Customer No_', text: 'Code client' },
        { value: 'Sell-to Customer Name', text: 'Nom du client' },
        { value: 'Salesperson Code', text: 'Code vendeur' },
        { value: 'Location Code', text: 'Code magasin' },
        { value: 'Document Date', text: 'Date commande' },
        { value: 'Total Amount', text: 'Montant HT' },
        { value: 'Processing Status', text: 'Statut traitement' }
      ],
      selectedOption: '',
    };
  },
  computed: {
    selectedOptionText() {
      const selected = this.options.find(option => option.value === this.selectedOption);
      return selected ? selected.text : 'Champs visibles';
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option.value;
      this.$emit('input', option.value);
    }
  }
};
</script>




<style scoped>
/*
Adjust the styles as needed to accommodate the new layout and functionality. You might need to 
tweak some existing styles or add new ones to ensure everything looks good.
*/
.custom-select-container {
  position: relative;
  width: 200px;
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
  border: 1px solid #ccc;
}

.custom-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 2;
  max-height: 500px;
  overflow-y: auto;
}

.custom-option {
  padding: 10px;
  cursor: pointer;
}

.custom-option:hover {
  background-color: #f2f2f2;
}

.arrow {
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
}


.field {
  margin-bottom: 0.5rem;
}

.select {
  margin-right: 0.5rem;
}

.control {
  display: flex;
  align-items: center;
}

.button {
  margin-left: 0.5rem;
}

.has-a-size {
 width: 200px;
 margin-right: 20px;
 
}

.customer-info,prospect-info{
    max-width: v-bind(customerInfoCompMaxWidth);
    transition: max-width 0.5s;
}
a:hover, th:hover {
    background-color: rgba(255, 68, 0, 0.068);
}
span i{
    color: #ffa500;
}
.has-background-orange{
    background-color: rgb(255, 155, 118);
}
.has-border-bottom-orange{
    border-bottom:3px solid orange;
}
.has-background-orange:hover {
    background-color: rgb(255, 68, 0);
}
.tableFixHead thead th {
    position: sticky; /* make the table heads sticky */
    top: -15px; /* table head will be placed from the top of the table and sticks to it */
 }
</style>
