<template>
    <div class="my-5 mx-5">
        
        <prospect-list-ribbon 
        pageTitle="Prospects"
        componentwithPresentationView="leadListPresentation"
        :hasAThirdPresentation="true"
        @onHidingOrShowingComponentInfo="hideOrShowComponentInfo"
        componentWithCompInfo="leadListRightInfoMaxWidth"
        routeForNewCard="NewLead"
        :newCardBtnDisabled="true"
        :editCardBtnDisabled="true"
        :readOnlyModeDisabled="true"
        ></prospect-list-ribbon>


        <div class="has-background-light columns" style="height: 750px;">
            <div class="column mt-5" id="lead-column" style="overflow: scroll;" v-if="presentationView=='list'">
                <table class="table  is-narrow is-hoverable is-fullwidth tableFixHead">
                    <thead class=" my-2">
                        <tr> 
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7 is-narrow" style="min-width: 100px;">N°</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Nom</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Adresse</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Ville</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N° téléphone</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code vendeur</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Adresse e-mail</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code postal</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Type prospect</th>
                            <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Pays/région</th>

                        </tr>
                    </thead>
                    <tbody>
                            <tr id="" v-for="Lead of LeadList" :key="Lead['No_']" class="is-narrow">
                                <td class="has-text-left has-background-light"> 
                                    <router-link :to="`/LeadCard/${ Lead['No_'] }`">
                                        <a href="#" class="has-text-orange">
                                            {{ Lead['No_']  }}
                                        </a>
                                    </router-link>
                                </td>
                                <td class="has-text-left has-background-light is-narrow">{{ Lead['Name']  }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{ Lead['Address'] }}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['City']}}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['Phone No_']}}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['Salesperson Code']}}</td>
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['E-Mail']}}</td>                
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['Post Code']}}</td>    
                                
                                <td class="has-text-left has-background-light is-narrow" v-if="Lead['Lead Type']==0||Lead['Lead Type']==1"> {{ getLabel(Lead['Lead Type']) }}</td>                
                                <td class="has-text-left has-background-light is-narrow has-text-primary" v-else> {{ getLabel(Lead['Type']) }}</td>  
                
                                <td class="has-text-left has-background-light is-narrow"> {{Lead['County']}}</td>                
                            
                            </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique'">
                <div class="columns is-multiline">
                    <div :class="{'column':true, 'is-3':leadInfoCompMaxWidth=='0px', 'is-one-third':leadInfoCompMaxWidth=='800px'}" v-for="Lead of LeadList" :key="Lead['No_']">
                        <div class=" columns p-1 card-is-hoverable">
                            <div class="column is-narrow has-background-white">
                                <figure class="image is-64x64">
                                    <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                </figure>
                            </div>
                            <div class="column has-background-white card-is-hoverable">
                                <p class="has-text-left ">
                                    <span class="is-size-7 has-text-grey has-background-light">
                                        
                                        <router-link :to="`/LeadCard/${ Lead['No_'] }`">
                                            <a href="#" class="has-text-orange">
                                                {{ Lead['No_'] }} 
                                            </a>
                                        </router-link>
                            
                                    </span>
                                </p>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left has-text-orange py-0 mt-1" >
                                        <span class="is-size-7 is-underlined">{{ Lead['Name'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0 mt-1">
                                        <span class="is-size-7">{{ Lead['E-Mail'] }}</span>
                                    </div>
                                </div>
                                <div class="has-text-left columns">
                                    <div class="column has-text-left py-0" >
                                        <span class="is-size-7">{{ Lead['City'] }}</span>
                                    </div>
                                    <div class="column has-text-right is-narrow py-0">
                                        <span class="is-size-7">{{ Lead['Post Code'] }}</span>
                                    </div>
                                </div>
                            </div>
                            <a class="column is-narrow has-background-orange is-flex ">
                                <span class="is-align-self-center has-text-white">...</span>

                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column" style="overflow-y: scroll;" v-if="presentationView=='mosaique haute'">
                <div class="columns is-multiline is-gapless">
                    <div :class="{'column':true, 'is-2':leadInfoCompMaxWidth=='0px', 'is-one-third':leadInfoCompMaxWidth=='800px'}" v-for="Lead of LeadList" :key="Lead['No_']">
                        <div class="has-background-white m-1">
                            <div class="card-is-hoverable box">
                                <div class="">
                                    <div class="has-text-left">
                                        <a href="#">
                                            <span class="py-0">...</span>
                                        </a>
                                    </div>
                                    <div class="is-flex is-justify-content-center">
                                        <figure class="image is-128x128">
                                            <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                        </figure>
                                    </div>
                                    <hr class="rounded">
                                    <div class="">
                                        <p class="has-text-left ">
                                            <span class="is-size-7 has-text-grey has-background-light">
                                        
                                                <router-link :to="`/LeadCard/${ Lead['No_'] }`">
                                                    <a href="#" class="has-text-orange">
                                                        {{ Lead['No_'] }} 
                                                    </a>
                                                </router-link>
                            
                                            </span>
                                        </p>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left has-text-orange py-0 mt-1" >
                                                <span class="is-size-7 is-underlined">{{ Lead['Name'] }}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0 mt-1">
                                                <span class="is-size-7">{{ Lead['E-Mail'] }}</span>
                                            </div>
                                        </div>
                                        <div class="has-text-left columns">
                                            <div class="column has-text-left py-0" >
                                                <span class="is-size-7">{{ Lead['City'] }}</span>
                                            </div>
                                            <div class="column has-text-right is-narrow py-0">
                                                <span class="is-size-7">{{ Lead['Post Code'] }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <prospect-info class="Lead-info"></prospect-info>
        </div>
    </div>
    
</template>

<script scoped>
import ProspectInfo from './ProspectInfo.vue'
import ProspectListRibbon from './RibbonForLists.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useNavigationTabStore } from '@/Stores/NavigationTab'
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'

export default {
    name:'lead-list',
    components:{
        ProspectInfo,ProspectListRibbon
    },
    computed:{
        presentationView(){
            return useNavigationTabStore().presentationForPageList['leadListPresentation']
        }
    },
    setup() {
        const LeadList = ref([])
        const optionLabelList = ref([])

        

        // expose to template and other options API hooks
        return {
            LeadList,
            optionLabelList,
        }
    },
    data(){
        return {
            //taille (largeur) initiale du composant prospectInfo
            leadInfoCompMaxWidth:useNavigationTabStore().tabRightInfo.leadListRightInfoMaxWidth,
            
            //nom de l'hote dans l'url 
            hostname:window.location.hostname       
        }
    },
    methods:{
        /////////////////////////methode pour masquer ou afficher le composant info à droite
        hideOrShowComponentInfo(){
            if(this.leadInfoCompMaxWidth=='0px') {
                useNavigationTabStore().setMaxWidth('leadListRightInfoMaxWidth','800px')
                this.leadInfoCompMaxWidth='800px'
            }
            else {
                useNavigationTabStore().setMaxWidth('leadListRightInfoMaxWidth','0px')
                this.leadInfoCompMaxWidth='0px'
            }
        },


        getLabel(fieldValue){
            if (this.optionLabelList[Number(fieldValue)]){
                return this.optionLabelList[Number(fieldValue)]['Description']
            }
        }

    },
    mounted(){
        axios
        .get(`http://${this.hostname}:3000/app/getLeadList`)
        .then((result) => { 
          this.LeadList = result.data.recordset;
        })
        .catch(err=>console.log(err));

        const language = useWebUserInfoStore().defaultLanguage
        const field = '[Lead Type]'
        if(this.LeadList.length==0){
            axios.get(`http://${this.hostname}:3000/app/getOptionLabelList?lg=${language}&fd=${field}`)
            .then(result => {
                this.optionLabelList = result.data.recordset
            }).catch(err=>console.log(err))
        }
    }
}

</script>

<style scoped>
.Lead-info{
    max-width: v-bind(leadInfoCompMaxWidth);
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
