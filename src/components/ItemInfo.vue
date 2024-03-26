<template>
        <div class="column is-3 has-background-white" style="overflow-y: hidden">

<!--------------Customer info header-------------->
                <div id="customer-info-header" class="tabs">
                    <ul>

<!--------------Bouton tab for Customer info content--------------->
                        <li :class="{'is-active':choosen_tab=='customer-info', 'has-background-white-orange':choosen_tab=='customer-info'}">
                            <a class="" @click="selectTab('customer-info')">
                                <span class="icon"><i class="fas fa-info" aria-hidden="true"></i></span>
                                <span class="">Détails</span>
                            </a>
                        </li>

<!--------------Bouton tab for Attached doc content--------------->
                        <li :class="{'is-active':choosen_tab=='attached-doc', 'has-background-white-orange':choosen_tab=='attached-doc'}">
                            <a @click="selectTab('attached-doc')">
                                <span class="icon is-small"><i class="fas fa-paperclip" aria-hidden="true"></i></span>
                                <span class="has-text-grey">Pièces jointes (0)</span>
                            </a>
                        </li>
                    </ul>
                </div>

<!--------------Customer info content--------------->
                <div id="customer-info-content" style="height: 600px;" v-if="choosen_tab=='customer-info'">

                    <h6 class="title is-6 has-text-left mt-2">Historique des ventes</h6>
                    <div class=" columns has-text-left">
                        <div class="column has-text-left">
                            <span class="has-text-grey">N° client : </span>
                        </div>
                        <div class="column has-text-right ">
                            <a href="#" title="Ouvrir la fiche du client 14522569">
                                14522569
                            </a>
                        </div>
                    </div>
    
                    
                    <div class="columns is-mobile mt-5 is-centered is-multiline">
                        <div class="column has-background-orange mr-1 is-3" style="min-width: 95px; min-height: 95px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-5">0</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light" >
                                Devis en cours
                            </h6>
                        </div>
                        <div class="column has-background-orange  is-3" style="min-width: 95px; min-height: 95px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-5">0</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light">
                                Commandes vente en cours
                            </h6>
                        </div>
                        <div class="column has-background-orange ml-1 is-3" style="min-width: 95px; min-height: 95px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-5">0</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light">
                                Factures vente en cours
                            </h6>
                        </div>
                        <div class="column has-background-orange mt-1 mr-1 is-3" style="min-width: 95px; min-height: 95px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-5">0</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light">
                                Retours vente en cours
                            </h6>
                        </div>
                        <div class="column has-background-orange mt-1 is-3" style="min-width: 95px; min-height: 95px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-5">0</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light">
                                Avoirs vente en cours
                            </h6>
                        </div>
                        <div class="column has-background-orange mt-1 ml-1 is-3" style="min-width: 95px; min-height: 95px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-5">0</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light">
                                Expéditions enregistrées
                            </h6>
                        </div>
                        <div class="column has-background-orange mt-1 mr-1 is-3" style="min-width: 95px; min-height: 95px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-5">0</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light">
                                Factures enregistrées
                            </h6>
                        </div>
                        <div class="column has-background-orange mt-1 is-3" style="min-width: 95px; min-height: 95px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-5">0</span>
                            </div>
                            <h6 class="subtitle is-7 has-text-left has-text-light">
                                Avoirs vente enregistrées
                            </h6>
                        </div>
                        <div class="column has-background-orange mt-1 ml-1 is-3" style="min-width: 95px; min-height: 95px;">
                            <div class="has-text-right ">
                                <span class="has-text-light subtitle is-5">0</span>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="" style="border-bottom: 1px solid rgba(0, 0, 0, 0.522);"></div>
    
                    <h6 class="title is-6 has-text-left mt-5">Statistiques client</h6>
    
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                    <div class="has-text-left">A remplir</div>
                </div>

<!--------------Attached doc content--------------->
                <div id="attached-doc-content" style="height: 600px;" v-if="choosen_tab=='attached-doc'">
                    <div  style="overflow: hidden;">
                        <h5 class="subtitle is-5 has-text-left has-border-bottom">Documents </h5>

<!--------------Orange counter sqarre bubble-------------->
                        <div class="columns is-mobile">
                            <div class="column has-background-orange ml-3 mr-1 ">
                                <h5 class="subtitle is-5 has-text-right has-text-light mb-5">
                                    0
                                </h5>
                                <div class="my-1 has-text-white">-</div>
                                <h6 class="subtitle is-6 has-text-left has-text-light">
                                    Pcs jointes
                                </h6>
                            </div>
                            <div class="column has-background-orange">
                                <h5 class="subtitle is-5 has-text-right has-text-light mb-5">
                                    0
                                </h5>
                                <div class="my-1 has-text-white">-</div>
                                <h6 class="subtitle is-6 has-text-left has-text-light">
                                    Notes
                                </h6>
                            </div>
                            <div class="column has-background-orange mr-3 ml-1">
                                <h5 class="subtitle is-5 has-text-right has-text-light mb-5">
                                    15
                                </h5>
                                <div class="my-1 has-text-white">-</div>
                                <h6 class="subtitle is-6 has-text-left has-text-light ">
                                    Liens
                                </h6>
                            </div>
                        </div>

<!--------------Bouton to add links--------------->
                        <div class="">
                            <div class="has-text-left has-border-bottom-small">
                                <button class="button is-small is-warning shadow" v-on:click="toggleLinkWindowDisplay">
                                    <span class="has-text-white">Add link </span>
                                    <span class="mx-1 subtitle is-4 has-text-white">+</span>
                                </button>
                            </div>
                        </div>

<!--------------Text displayed when no doclink has been found--------------->
                        <div class="mt-5" v-if="noDocLink">
                            <Span class="subtitle is-6 "> Rien à afficher...</Span>
                        </div>

<!--------------Display the list of attached doc links of the current document4------------------->
                        <div class="mt-5" v-else >
                            <div class="has-background-light py-1 my-2" v-for="docLink of docLinks" :key="docLink" style="border-radius:10px" >
                                <article class="media" >
                                    <div class="media-left" >
                                        <figure class="image is-64x64">
                                            <img :src="require(`@/assets/images/PDF-Logo-mini.jpeg`)" alt="Pdf file" v-if="docLink['Type lien'].includes('pdf')">
                                            <img :src="require(`@/assets/images/Ms-Excel-Logo-mini.png`)" alt="Excel file" v-else-if="docLink['Type lien'].includes('excel')||docLink['Type lien'].includes('sheet')">
                                            <img :src="require(`@/assets/images/Ms-Word-Logo-mini.png`)" alt="Word file" v-else-if="docLink['Type lien'].includes('word')">
                                            <img :src="require(`@/assets/images/Photo-Logo.jpg`)" alt="image file" v-else-if="docLink['Type lien'].includes('image')">
                                            <img :src="require(`@/assets/images/File-Logo.png`)" alt="other file" v-else>
                                        </figure>
                                    </div>
                                    <div class="media-content" >
                                        <div class="content mx-1">
                                            <p class="has-text-left " >
                                                <strong class="mr-2"> {{ docLink["type cible"]+' ' }} {{ docLink["type cible"]=="Ligne"?' '+docLink["N° cible"]:'' }}</strong> 
                                                <small>{{ new Date(docLink["date création"]).toLocaleDateString() }}</small>
                                                <br>
                                                <strong style="color:  rgb(255, 102, 0);">
                                                    {{ docLink["nom"] }}
                                                </strong>
                                                <br>
                                                <span class="">
                                                    {{ docLink["Description"] }}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>

<!----------------------This modal show the form to submit a new attached doc link----------------->
                        <div :class="{'modal':true, 'is-active':linkWindowOpened}">
                            <div class="modal-background has-background-white" style="opacity:0.7" v-on:click="toggleLinkWindowDisplay"></div>
                            <div class="modal-card w-75">

        <!----------------------represent the header of the modal----------------->
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Ajouter un lien</p>
                                    <button class="delete" aria-label="close" v-on:click="toggleLinkWindowDisplay"></button>
                                </header>

        <!----------------------represent the body of the modal----------------->
                                <section class="modal-card-body">

            <!----------------------Notification sent when the new attached has been successfully saved------------>
                                    <div class="notification is-primary is-left is-rounded " v-if="uploadSuccess_occur">
                                        <button class="delete" @click="uploadSuccess_occur=false"></button>
                                        <span class="icon has-text-white">
                                            <i class="fas fa-ban"></i>
                                        </span>
                                        Le fichier a été enregistré dans le serveur de fichiers!
                                    </div>

            <!----------------------1st input of the form------------>
                                    <div class="field is-horizontal">
                                        <div class="field-label">
                                            <label class="label">Entête / Linges</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field is-narrow">
                                            <div class="control">
                                                <label class="radio">
                                                <input type="radio" name="member" value="chbxHeader" v-model="chbxChecked" checked>
                                                Entête
                                                </label>
                                                <label class="radio">
                                                <input type="radio" name="member" value="chbxLine" v-model="chbxChecked">
                                                Lignes
                                                </label>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

            <!----------------------2nd input of the form------------>                                  
                                    <div class="field is-horizontal" v-show="chbxChecked=='chbxLine'">
                                        <div class="field-label is-normal">
                                            <label class="label">Lignes</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field is-narrow">
                                            <div class="control">
                                                <div class="select is-fullwidth">
                                                <select v-model="lineToAttachDoc" required>
                                                    <option value=""></option> 
                                                    <option :value="line['N° ligne']" v-for="line of soLine" :key="line"> {{ line['N° ligne'] }} - {{ line['N° article'] }} - {{ line['Description'] }}</option>
                                                </select>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

            <!----------------------3rd input of the form------------>
                                    <div class="field is-horizontal">
                                        <div class="field-label is-normal">
                                            <label class="label">Description</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                            <div class="control">
                                                <textarea class="textarea" placeholder="Description du document" v-model="linkDescription"></textarea>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

            <!----------------------4th input of the form------------>
                                    <div class="field is-horizontal">
                                        <div class="field-label is-normal">
                                            <label class="label">Lien source</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                            <div class="control">
                                                <input class="input " type="text" placeholder="">
                                            </div>
                                            </div>
                                        </div>
                                    </div>

            <!----------------------Last input of the form------------>
                                    <img src="" id="previewDocLogo" style="max-width: 100px;" >
                                    <span>
                                        {{ fileName }}
                                    </span>
                                    <div class="file is-centered is-boxed is-warning has-name">

                                        <label class="file-label">
                                            <input class="file-input" type="file" name="resume" @change="(e)=> loadFile(e)"  >
                                            <span class="file-cta">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label ">
                                                Charger le fichier
                                            </span>
                                            </span>
                                            <span class="file-name" v-show="!fileName">
                                                Screen Shot 2017-07-29 at 15.54.25.png
                                            </span>
                                            <span class="file-name has-text-primary" v-show="fileName">
                                                Fichier chargé
                                            </span>
                                        </label>
                                    </div>
                                    <img src="" id="previewImage" style="max-width: 200px;">
                                    
                                </section>

        <!----------------------represent the footer of the modal----------------->
                                <footer class="modal-card-foot">
                                    <button class="button is-orange" @click="upload()">Valider</button>
                                    <button class="button">Annuler</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
</template>
<script>
export default {
    name:'item-info',
    components:{
    },
    data(){
        return {
            choosen_tab:'customer-info'
        }
    },
    methods:{
        selectTab(tab_name){
            this.choosen_tab=tab_name
        }
    }

}

</script>
<style scoped>
a:hover {
    background-color: rgba(255, 68, 0, 0.068);
}

span i{
    color: orange;
}
.dropdown-content a:hover{
    background-color: rgba(255, 68, 0, 0.068)
}

.has-border-bottom-orange{
    border-bottom:3px solid orange;
}

.has-background-orange{
    background-color: orangered;
}

.has-background-white-orange{
    background-color: rgba(255, 68, 0, 0.068)
}

#customer-info-content{
    overflow-y:scroll;
    overflow-x: hidden;
}
</style>