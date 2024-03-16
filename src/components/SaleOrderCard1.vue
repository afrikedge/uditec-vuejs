<template>
    <div :class="{'modal':true , 'is-active': true }" >
        <div class="modal-background has-background-white" style="opacity:0.7" v-on:click="goBack">
        </div>
        <div id="scrollBlock"  class="modal-card box  shadow is-rounded h-100" style="width:90%;">
            <s-o-card-Header :soNo="soHeader['N° commande']" :soDesc="soHeader['Nom du client']" pageTitle="Commande vente">
                <button class="button is-warning shadow" @click="showSOOverview()">Imprimer</button>
            </s-o-card-Header>
            <div id="soBody" class="mt-2 columns" style="overflow-y: scroll;">
                <div class="column is-9" style="overflow-y: scroll;">
                    <div id="general">
                        <h5 class="subtitle is-5 has-text-left has-border-bottom">Général </h5>
                        <div id="general_content" class="columns">
                            <div class="column">
                                <input-text labelInputText="N° client" :valueInputText="soHeader['Code client']" ></input-text>
                                <input-text labelInputText="Nom du client" :valueInputText="soHeader['Nom du client']" ></input-text>
                                <input-text labelInputText="Contact" :valueInputText="soHeader['Contact client']" ></input-text>
                                <input-text labelInputText="Adresse" :valueInputText="soHeader['Adresse du client']" ></input-text>
                                <input-text labelInputText="Ville" :valueInputText="soHeader['Ville du client']" ></input-text>
                                <input-text labelInputText="Code postal" :valueInputText="soHeader['Code postal client']" ></input-text>
                                <input-text labelInputText="Code pays/région" :valueInputText="soHeader['Code région client']" ></input-text>
                                <input-text labelInputText="Code vendeur" :valueInputText="soHeader['Code vendeur']" ></input-text>
                            </div>
                            <div class="column">
                                <input-text labelInputText="Date commande" :valueInputText="new Date(soHeader['Date de commande']).toDateString()" ></input-text>
                                <input-text labelInputText="Date comptabilisation " :valueInputText="new Date(soHeader['Date comptabilisation']).toDateString()" ></input-text>
                                <input-text labelInputText="Date document" :valueInputText="new Date(soHeader['Date document']).toDateString()" ></input-text>
                                <input-text labelInputText="Date d'échéance" :valueInputText="new Date(soHeader[`Date d'échéance`]).toDateString()" ></input-text>
                                <input-text labelInputText="N° doc. externe" :valueInputText="soHeader['N° doc. externe']" ></input-text>
                                <input-text labelInputText="N° devis" :valueInputText="soHeader['N° devis']" ></input-text>
                                <input-text labelInputText="Utilisateur affecté" :valueInputText="soHeader['Code utilisateur assigné']" ></input-text>
                                <input-text labelInputText="Statut" :valueInputText="soHeader['Statut']" ></input-text>
    
                            </div>
                        </div>                    
                    </div> <br><br>
                       
                    <div id="articles" ref="content">
                        <h5 class="subtitle is-5 has-text-left has-border-bottom">Lignes </h5>
                        <div class="table-container">
                        <table class="table is-striped is-bordered is-narrow  is-fullwidth">
                        <!-- Your table content -->
                        <thead class="has-background-light my-2">
                            <tr> 
                            <th class="has-text-grey has-text-left has-text-weight-normal is-size-6" >Type</th>
                            <th class="has-text-grey has-text-left has-text-weight-normal is-size-6" >N°</th>
                            <th class="has-text-grey has-text-left has-text-weight-normal is-size-6" >Description</th>
                            <th class="has-text-grey has-text-left has-text-weight-normal is-size-6" >Code magasin</th>
                            <th class="has-text-grey has-text-left has-text-weight-normal is-size-6" >Quantité</th>
                            <th class="has-text-grey has-text-left has-text-weight-normal is-size-6" >Code unité</th>
                            <th class="has-text-grey has-text-left has-text-weight-normal is-size-6" >Prix unitaire HT</th>
                            <th class="has-text-grey has-text-left has-text-weight-normal is-size-6" >% remise ligne</th>
                            <th class="has-text-grey has-text-left has-text-weight-normal is-size-6" >Montant ligne HT</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            <tr :id="soLine['N° ligne']" v-for="line of soLine" :key="line">
                            <td class="has-text-left"> {{ line['Type'] }}</td>
                            <td class="has-text-left"> {{ line['N° article'] }}</td>
                            <td class="has-text-left"> {{ line['Description'] }}</td>
                            <td class="has-text-left"> {{ line['Code magasin'] }}</td>
                            <td class="has-text-left"> {{ line['Quantité'] }}</td>
                            <td class="has-text-left"> {{ line['Code unité'] }}</td>                
                            <td class="has-text-left"> {{ line['Prix unitaire HT'] }}</td>                
                            <td class="has-text-left"> {{ line['% remise ligne'] }}</td>                
                            <td class="has-text-left"> {{ line['Montant ligne HT'] }}</td>                
                            </tr>
                        </tbody>
                    </table>
                        </div>
    
                        <div class="columns" id="line_total">
                            <div class="column">
                                <input-text3 labelInputText="Sous-total HT" :valueInputText="soHeader['Sous-total HT']" :devise="soHeader['Code devise']"></input-text3>
                                <input-text3 labelInputText="Montant remise facture HT" :valueInputText="soHeader['Montant remise facture HT']" :devise="soHeader['Code devise']"></input-text3>
                                <input-text3 labelInputText="%remise facture" :devise="soHeader['Code devise']" ></input-text3>
                            </div>
                            <div class="column">
                                <input-text3 labelInputText="Total HT" :valueInputText="soHeader['Total HT']" :devise="soHeader['Code devise']" ></input-text3>
                                <input-text3 labelInputText="Total TVA" :valueInputText="soHeader['Total TVA']" :devise="soHeader['Code devise']"></input-text3>
                                <input-text3 labelInputText="Total TTC" :valueInputText="soHeader['Total TTC']" :devise="soHeader['Code devise']"></input-text3>
                            </div>
                        </div> 
                    </div><br>
                </div>
                <div class="column " id="attached" style="overflow-y: scroll;"   >
                    <div  style="overflow: hidden;">
                        <h5 class="subtitle is-5 has-text-left has-border-bottom">Documents </h5>
                        <div class="columns is-mobile">
                            <div class="column is-orange ml-3 mr-1 ">
                                <h5 class="subtitle is-5 has-text-right has-text-light mb-5">
                                    0
                                </h5>
                                <div class="my-1 has-text-white">-</div>
                                <h6 class="subtitle is-6 has-text-left has-text-light">
                                    Pcs jointes
                                </h6>
                            </div>
                            <div class="column is-orange">
                                <h5 class="subtitle is-5 has-text-right has-text-light mb-5">
                                    0
                                </h5>
                                <div class="my-1 has-text-white">-</div>
                                <h6 class="subtitle is-6 has-text-left has-text-light">
                                    Notes
                                </h6>
                            </div>
                            <div class="column is-orange mr-3 ml-1">
                                <h5 class="subtitle is-5 has-text-right has-text-light mb-5">
                                    {{ docLinks.length }}
                                </h5>
                                <div class="my-1 has-text-white">-</div>
                                <h6 class="subtitle is-6 has-text-left has-text-light ">
                                    Liens
                                </h6>
                            </div>
                        </div>

                        <div class="">
                            <div class="has-text-left has-border-bottom-small">
                                    <button class="button is-small is-orange hover" v-on:click="toggleLinkWindowDisplay">
                                        Add link 
                                        <span class="mx-1 subtitle is-4 has-text-white">+</span>
                                    </button>
                                </div>
                        </div>

                        <div class="mt-5" v-if="noDocLink">
                            <Span class="subtitle is-6 "> Rien à afficher...</Span>
                        </div>

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

                        <div :class="{'modal':true, 'is-active':linkWindowOpened}">
                        <div class="modal-background has-background-white" style="opacity:0.7" v-on:click="toggleLinkWindowDisplay"></div>
                        <div class="modal-card w-75">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Ajouter un lien</p>
                                <button class="delete" aria-label="close" v-on:click="toggleLinkWindowDisplay"></button>
                            </header>

                            <section class="modal-card-body">
                                
                                <div class="notification is-primary is-left is-rounded " v-if="uploadSuccess_occur">
                                    <button class="delete" @click="uploadSuccess_occur=false"></button>
                                    <span class="icon has-text-white">
                                        <i class="fas fa-ban"></i>
                                    </span>
                                    Le fichier a été enregistré dans le serveur de fichiers!
                                </div>

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
                            <footer class="modal-card-foot">
                            <button class="button is-orange" @click="upload()">Valider</button>
                            <button class="button">Annuler</button>
                            </footer>
                        </div>
                        </div>
                        

                    </div>
                </div>
            </div>

        </div>


        
        <div :class="{'modal':true, 'is-active':true}" v-if="SOOverviewOpened" style="">
            <div class="modal-background has-background-white"></div>
            <div class="modal-card  has-background-grey-lighter w-100 py-5" style="overflow:scroll;">
                <div ref="content"  class="">
                    <printable-order-layout1 id="element-to-convert" :idRoute="this.id" ></printable-order-layout1>
                </div>
            </div>
        </div>

        <div :class="{'modal':true, 'is-active':SOOverviewOpened}" v-if="SOOverviewOpened" style="">
            <div class="modal-background has-background-white"></div>
            <div class="modal-card  has-background-grey-lighter w-100 py-5" style="overflow:scroll;" v-on:click.prevent="closePrintableSOOverviewDisplay">
                <div ref="content"  class="">
                    <!----printable-order-layout id="element-to-convert" :idRoute="this.id" ></printable-order-layout--->
                    <report-viewer :orderNo="id"></report-viewer>
                </div>
                <div class="box has-background-dark mx-1 has-text-white" style="position:fixed;bottom:50px;left:auto">
                   <button class="button is-white" @click.prevent="downloadPDF()">
                    download
                   </button> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SOCardHeader from './HeaderForCard.vue';
import inputText from './input/input-text.vue'
import inputText3 from './input/input-text1.vue'
import printableOrderLayout1 from './PrintableOrderLayout1.vue'
//import printableOrderLayout from './PrintableOrderLayout.vue'
import ReportViewer from './ReportViewer.vue'
import axios from 'axios';
//import html2pdf from 'html2pdf.js'
import jsPDF from 'jspdf'; 
import html2canvas from "html2canvas";


export default {
    name:'sale-order-card',
    components:{
        SOCardHeader,inputText,inputText3,printableOrderLayout1,ReportViewer
    },
    data(){
        return{
            id:this.$route.params.id,
            soHeader:'',
            soLine:'',
            hostname:window.location.hostname,
            linkWindowOpened:false,
            chbxChecked:'chbxHeader',
            lineToAttachDoc:'',
            logoToAttachDoc:'',
            linkDescription:'',
            fileName:'',
            file:'',
            uploadSuccess_occur:false,
            noDocLink:true,
            docLinks:[],
            SOOverviewOpened:false
        }
    },
    methods:{
        closePrintableSOOverviewDisplay(){
            this.SOOverviewOpened=false
        },
        downloadPDF () {
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'px',
                format: 'a4',
                hotfixes: ['px_scaling'],
            });

            html2canvas(document.getElementById('element-to-convert'), {
                width: 2480,
                height: 3508
            }).then((canvas) => {
                const img = canvas.toDataURL("image/jpeg");
                doc.addImage(img, "jpeg", 10, 10, 765, 1082.1);
                doc.save("p&lstatement.pdf");
            })
        },
        showSOOverview(){
            this.SOOverviewOpened=true

        },
        open(link){
            window.open(`file:///${link}`)
        },
        toggleLinkWindowDisplay(){
            this.linkWindowOpened = !this.linkWindowOpened
            console.log(this.linkDescription.fjj)

        },
        loadFile(e){
            this.file = e.target.files[0];
            if(this.file.size > 0)
                this.fileName= this.file.name
           //console.log(this.file.type)
            const preview = document.getElementById('previewImage');
            const previewDocLogo = document.getElementById('previewDocLogo');

            if (this.file.type.includes('image')){
                const reader = new FileReader();
                reader.addEventListener("load", function () {
                    preview.src = reader.result;
                }, false);
                reader.readAsDataURL(this.file);
            }
            if (this.file.type.includes('pdf')){
                previewDocLogo.src = require(`@/assets/images/PDF-Logo.png`)
            }
            if (this.file.type.includes('excel')){
                previewDocLogo.src = require(`@/assets/images/Microsoft-Excel-Logo.png`)
            }
            if (this.file.type.includes('sheet')){
                previewDocLogo.src = require(`@/assets/images/Microsoft-Excel-Logo.png`)
            }
            if (this.file.type.includes('word')){
                previewDocLogo.src = require(`@/assets/images/Microsoft-Word-Logo.png`)
            }
            

  
        },
        upload(){
            const DocumentDetail = {
                type:'Commande vente',
                header : this.soHeader['N° commande'],
                target : this.chbxChecked=='chbxHeader'?this.soHeader['N° commande']:this.lineToAttachDoc,
                targetType : this.chbxChecked=='chbxHeader'?'Entête':'Ligne',
                description : this.linkDescription,
            }

            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('document', JSON.stringify(DocumentDetail));
            

            axios.post(`http://${this.hostname}:3000/app/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                } 
            ).then(
                ()=> this.uploadSuccess_occur =true
            ).catch(
                ()=>console.log('non ok')
            )
        }
    
    },
    computed:{
        showfileName(){
            return this.fileName
        }

    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/getSOCard/${this.id}`)
        .then(result => {
            //console.log(this.$route)
            this.soHeader = result.data[0],
            this.soLine = result.data[1]
        }).catch(err=>console.log(err))

        axios.get(`http://${this.hostname}:3000/app/docLink/${this.id}`)
        .then(result => {
            const docLinks = result.data.docLink
            console.log(docLinks)
            if(docLinks.length >0){
                this.noDocLink = false;
                this.docLinks = docLinks;

            }
           
        }).catch(err=>console.log(err))

    },
    watch:{
        uploadSuccess_occur(){
            axios.get(`http://${this.hostname}:3000/app/docLink/${this.id}`)
            .then(result => {
                const docLinks = result.data.docLink
                console.log(docLinks)
                if(docLinks.length >0){
                    this.noDocLink = false;
                    this.docLinks = docLinks;

                }
            
            }).catch(err=>console.log(err))
        },
    },
    
}
</script>
<style scoped>
.has-border-bottom{
    border-bottom:3px solid rgb(255, 166, 0);
    color:  rgb(255, 166, 0);
}

.has-border-bottom-small{
    border-bottom:1px solid rgb(255, 166, 0);
    color:  rgb(255, 166, 0);
}

.is-orange{
    background-color: rgb(255, 102, 0) ;
    color: white;
}

.columns::-webkit-scrollbar, #card_detail_column::-webkit-scrollbar {
  display: none;
}
#attached::-webkit-scrollbar, #card_detail_column::-webkit-scrollbar {
  display: none;
}
</style>