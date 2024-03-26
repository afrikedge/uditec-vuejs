<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100 has-background-light" style="width:96%;padding: 0;">
 
<!---------Composant entête liste contacts----------------------->      
            <div id="card-header-comp" class="has-background-white py-5 ">
                <ContactListHeader class="w-100 mx-2" pageTitle="CTT00001 . Contact gérald LTD" />
            </div>
            
<!---------Composant rubban liste contacts----------------------->
            <div id="card-ribbon-comp" class="mt-3 mx-5">
                <contact-list-ribbon class="mx-5" pageTitle="Contacts"></contact-list-ribbon>
            </div>

<!---------Section liste des contacts----------------------->      
            <div class="has-background-light mt-5" style="overflow-y: scroll;">
                <div class="column mt-5" id="customer-column" style="overflow-y: scroll;" v-if="true">
                    <table class="table  is-narrow is-hoverable is-fullwidth">
                        <thead class=" my-2">
                            <tr> 
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;" > Type</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">N°</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Description</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code magasin</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Quantité</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Code unité</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Prix unitaire HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">% remise ligne</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                                <th class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px;">Montant ligne HT</th>
                            </tr>   
                        </thead>
                        <tbody>
                            <tr id="" v-for="elt of [1,2,3,4,5,6,7,8,9,11,10,12,13,14,145,14,1,1,1,4,4,4,44,4,7]" :key="elt">
                                <td class="has-text-left has-background-light"> salut</td>
                                <td class="has-text-left has-background-light"> salut</td>
                                <td class="has-text-left has-background-light"> salut</td>
                                <td class="has-text-left has-background-light"> slaut</td>
                                <td class="has-text-left has-background-light"> slaut</td>
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                                <td class="has-text-left has-background-light"> slaut</td>                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="column"  v-if="false">
                    <div class="columns is-multiline">
                        <div class="column is-3" v-for="elt of [1,2,3,4,5,6,7,8,9,11,10,12,13,14,145,14,1,1,1,4,4,4,44,4,7]" :key="elt">
                            <div class=" columns p-1 card-is-hoverable">
                                <div class="column is-narrow has-background-white">
                                    <figure class="image is-64x64">
                                        <img class="is-rounded" :src="require(`@/assets/images/gerald1.jpg`)">
                                    </figure>
                                </div>
                                <div class="column has-background-white card-is-hoverable">
                                    <p class="has-text-left ">
                                        <span class="is-size-7 has-text-grey">100526</span>
                                    </p>
                                    <div class="has-text-left columns">
                                        <div class="column has-text-left has-text-orange py-0 mt-1" >
                                            <span class="is-size-7 is-underlined">Monsieur Gérald OK.</span>
                                        </div>
                                        <div class="column has-text-right is-narrow py-0 mt-1">
                                            <span class="is-size-7">100 225,45</span>
                                        </div>
                                    </div>
                                    <div class="has-text-left columns">
                                        <div class="column has-text-left py-0" >
                                            <span class="is-size-7">Mr. BigBlackShaow</span>
                                        </div>
                                        <div class="column has-text-right is-narrow py-0">
                                            <span class="is-size-7">75 225,45</span>
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
                <div class="column" v-if="false">
                    <div class="columns is-multiline is-gapless">
                        <div class="column is-2 p-2 " v-for="elt of [1,2,3,4,5,6,7,8,9,11,10,12,13,14,145,14,1,1,1,4,4,4,44,4,7]" :key="elt">
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
                                                <span class="is-size-7 has-text-grey">100526</span>
                                            </p>
                                            <div class="has-text-left columns">
                                                <div class="column has-text-left has-text-orange py-0 mt-1" >
                                                    <span class="is-size-7 is-underlined">Monsieur Gérald OK.</span>
                                                </div>
                                                <div class="column has-text-right is-narrow py-0 mt-1">
                                                    <span class="is-size-7">100 225,45</span>
                                                </div>
                                            </div>
                                            <div class="has-text-left columns">
                                                <div class="column has-text-left py-0" >
                                                    <span class="is-size-7">Mr. BigBlackShaow</span>
                                                </div>
                                                <div class="column has-text-right is-narrow py-0">
                                                    <span class="is-size-7">75 225,45</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>
<script>
import ContactListRibbon from './RibbonForLists.vue'
import ContactListHeader from './HeaderForList.vue'

export default {
    name:'contact-list',
    components:{
        ContactListRibbon,ContactListHeader
    },
}

</script>