<template>
    <div class="column is-3 has-background-white p-1" style="overflow-y: hidden">

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
                            <span class="has-text-grey">Pièces jointes ({{ documentLinks.length}})</span>
                        </a>
                    </li>
                </ul>
            </div>

<!--------------Customer info content--------------->
            <div id="customer-info-content" style="height: 600px;" v-if="choosen_tab=='customer-info'">
                <h6 class="title is-6 has-text-left mt-2">Historique des ventes</h6>
                <div class=" columns has-text-left">
                    <div class="column has-text-left">
                        <span class="has-text-grey">N° prospect : </span>
                    </div>
                    <div class="column has-text-right ">
                        <a href="#" :title="'Ouvrir la fiche du prospect '+ leadNo" v-if="leadNo">
                            {{ leadNo }}
                        </a>
                        <a href="#" title="Ouvrir la fiche du client 14522569" v-else>
                            14522569
                        </a>
                    </div>
                </div>
                <div class="columns is-mobile mt-5 is-centered is-multiline ">
                    <div class="column has-background-orange mr-1 mb-1 is-2 " style="width: 90px; height: 90px;">
                        <div class="has-text-right ">
                            <span class="has-text-light subtitle is-5">0</span>
                        </div>
                        <h6 class="subtitle is-7 has-text-left has-text-light" >
                            Devis en cours
                        </h6>
                    </div>
                    <div class="column has-background-orange mr-1 mb-1 is-2 " style="width: 90px; height: 90px;">
                        <div class="has-text-right ">
                            <span class="has-text-light subtitle is-5">0</span>
                        </div>
                        <h6 class="subtitle is-7 has-text-left has-text-light">
                            Commandes vente en cours
                        </h6>
                    </div>
                    <div class="column has-background-orange mr-1 mb-1 is-2" style="width: 90px; height: 90px;">
                        <div class="has-text-right ">
                            <span class="has-text-light subtitle is-5">0</span>
                        </div>
                        <h6 class="subtitle is-7 has-text-left has-text-light">
                            Factures vente en cours
                        </h6>
                    </div>
                    <div class="column has-background-orange mr-1 mb-1 is-2" style="width: 90px; height: 90px;">
                        <div class="has-text-right ">
                            <span class="has-text-light subtitle is-5">0</span>
                        </div>
                        <h6 class="subtitle is-7 has-text-left has-text-light">
                            Retours vente en cours
                        </h6>
                    </div>
                    <div class="column has-background-orange mr-1 mb-1 is-2" style="width: 90px; height: 90px;">
                        <div class="has-text-right ">
                            <span class="has-text-light subtitle is-5">0</span>
                        </div>
                        <h6 class="subtitle is-7 has-text-left has-text-light">
                            Avoirs vente en cours
                        </h6>
                    </div>
                    <div class="column has-background-orange mr-1 mb-1 is-2" style="width: 90px; height: 90px;">
                        <div class="has-text-right ">
                            <span class="has-text-light subtitle is-5">0</span>
                        </div>
                        <h6 class="subtitle is-7 has-text-left has-text-light">
                            Expéditions enregistrées
                        </h6>
                    </div>
                    <div class="column has-background-orange mr-1 mb-1 is-2" style="width: 90px; height: 90px;">
                        <div class="has-text-right ">
                            <span class="has-text-light subtitle is-5">0</span>
                        </div>
                        <h6 class="subtitle is-7 has-text-left has-text-light">
                            Factures enregistrées
                        </h6>
                    </div>
                    <div class="column has-background-orange mr-1 mb-1 is-2" style="width: 90px; height: 90px;">
                        <div class="has-text-right ">
                            <span class="has-text-light subtitle is-5">0</span>
                        </div>
                        <h6 class="subtitle is-7 has-text-left has-text-light">
                            Avoirs vente enregistrées
                        </h6>
                    </div>
                    <div class="column has-background-orange mr-1 mb-1 is-2" style="width: 90px; height: 90px;">
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
            <div id="customer-info-content" style="height: 600px;" v-if="choosen_tab=='attached-doc'">
                <h5 class="subtitle is-5 has-text-left has-border-bottom">Documents </h5>

<!--------------Orange counter sqarre bubble-------------->
                <div class="columns is-mobile">
                    <div class="column has-background-orange ml-3 mr-1 ">
                        <h5 class="subtitle is-5 has-text-right has-text-light mb-5">
                            {{ documentLinks.length }}
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
                            0
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
                        <button class="button is-small is-warning shadow" v-on:click.prevent="getFile('fileUpload1')">
                            <span class="has-text-white">Joindre un document </span>
                            <span class="mx-1 subtitle is-4 has-text-white">+</span>
                        </button>
                    </div>
                </div>
                <input v-show="false" class="input is-small" id="fileUpload1" type="file" @change="(e)=> uploadFile(e)" >
                
                <div>
<!---------Composant message d'enregistrement en cours ou d'erreur ou de success----------------------->      
                    <article v-if="submitting_message" class="" >
                        <span class="icon">
                            <i class="fas fa-spinner fa-pulse"></i>
                        </span>
                        <span class="subtitle is-7"> Enregistrement en cours </span>
                    </article>
        
                    <article v-if="error_message" class="message is-danger shadow" >
                        <div class="message-header">
                            <p class="is-size-7">
                                <span class="icon has-text-danger">
                                <i class="fas fa-exclamation-triangle"></i>
                                </span>
                                Error Message
                            </p>
                            <button class="delete" aria-label="delete" @click="error_message='';error_message_code=''"></button>
                        </div>
                        <div class="message-body is-size-7">
                            <span> {{ error_message }}</span><br>
                            <span v-if="error_message_code"> Code erreur: {{ error_message_code }}</span>
                        </div>
                    </article>
        
                    <article v-if="success_message" class="message is-primary shadow">
                        <div class="message-header">
                                <span class="subtitle is-7 m-0 has-text-white"> 
                                    <span class="icon ">
                                        <i class="fas fa-spinner fa-pulse"></i>
                                    </span>
                                    {{ success_message }}
                                </span>
                            <button class="delete" aria-label="delete" @click="success_message=''"></button>
                        </div>
                    </article>
                </div>

<!--------------Display the list of attached doc links of the current document4------------------->
                <div class="mt-5" style="height: 600px;">
                    <div class="has-background-warning-light box py-2 my-2 mx-3" v-for="docLink of documentLinks" :key="docLink['Document Name']" style="border-radius:10px" >
                        <article class="media" >
                            <div class="media-left" >
                                <figure class="image is-32x32">
                                    <img :src="require(`@/assets/images/PDF-Logo-mini.jpeg`)" alt="Pdf file">
                                    <!---img :src="require(`@/assets/images/Ms-Excel-Logo-mini.png`)" alt="Excel file" v-else-if="docLink['Type lien'].includes('excel')||docLink['Type lien'].includes('sheet')"--->
                                    <!---img :src="require(`@/assets/images/Ms-Word-Logo-mini.png`)" alt="Word file" v-else-if="docLink['Type lien'].includes('word')"--->
                                    <!---img :src="require(`@/assets/images/Photo-Logo.jpg`)" alt="image file" v-else-if="docLink['Type lien'].includes('image')"--->
                                    <!---img :src="require(`@/assets/images/File-Logo.png`)" alt="other file"--->
                                </figure>
                            </div>
                            <div class="media-content" >
                                <div class="content mx-1">
                                    <div class="columns is-vcentered ">
                                        <div class="column has-text-left">
                                            <small class="subtitle is-7">{{ formatDate(docLink["$systemcreatedAt"]) }}</small>
                                            <br>
                                            <span class="title is-7">
                                                <b>{{ docLink["Document Name"] }}</b>
                                            </span>
                                        </div>
                                        <div class="column is-narrow">
                                            <a  class="mx-2 has-background-white shadow p-2"  style="min-width: 20px; min-height: 20px; border-radius: 20px;" @click.prevent="openFile(docLink['Link'])">
                                                <span class="icon">
                                                    <i class="fas fa-share"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'

export default {
name:'customer-info',
props:['documentNo','documentType','function','leadNo'],
components:{
},
setup(props){
    const documentLinks = ref([])
    const hostname = window.location.hostname


    //variable de soumission forme
    const submitting_message=ref('') 

    //variable d'erreur serveur
    const error_message=ref('')
    const error_message_code =ref('')

    //variable de success serveur
    const success_message=ref('')

    //fonction de récupération des liens du document
    function getDocumentLinkList(){
        axios.get(`http://${hostname}:5000/app/getDocumentLinkList?functionCode=${props.documentType}&documentNo=${props.documentNo}`)
        .then(result => {
             documentLinks.value = result.data
             documentLinks.value.map(x => x['Link'] = new String(x['Link']).split('/').join('\\'))
        }).catch(err=>console.log('2',err))
    }

//fonctions pour enregistrer le lien dans la BD
    function saveLink(data){
        axios.post(`http://${hostname}:5000/app/getBCWSResponse?company=${useWebUserInfoStore().activeCompanyId}`,data)
        .then(() => {
            submitting_message.value=''
            success_message.value='Enregistrement réussi'
            error_message.value=''
            setTimeout(()=>success_message.value='',5000)
        })
        .catch((err) => {
            submitting_message.value=''
            error_message.value = err
        })
    }

    function submitForm(docName,docLink,docType,docNo){
        const JSData = {
            Parameter:'documentlink_insert',
            webUserName:useWebUserInfoStore().name,
            //'Record Id':'',
            'Function':docType,
            'No_':docNo,
            'Document Name':docName,
            'Link':docLink,
        }
        saveLink(formatToBCJsonData(JSData))
    }

    

//fonctions de formattage
    function formatToBCJsonData(data){
        const JSONFormatedData = JSON.stringify(data).split('"').join('\\"')
        const JSONDataToSend = '{'+ '"inputJson":'+'"'+JSONFormatedData+'"' +'}'
        console.log(JSONDataToSend)
        return {data:JSONDataToSend}
    }

//Gestion des trigger et évènements
    watch(success_message, () => {
        getDocumentLinkList()
    })
    onMounted(()=>{
        if(props.documentNo)
            getDocumentLinkList()
    })



    return {
        documentLinks,
        submitting_message,error_message,error_message_code,success_message,
        submitForm,
    }

},
data(){
    return {
        choosen_tab:'customer-info',
        hostname:window.location.hostname,
        fileToUpload:'',
        fileNameToUpload:''
    }
},
methods:{
    formatDate(date){
        if(date){
            const dateString = new String(date)
            if (dateString.includes('1753-')) return ''
            else return new Date(date).toLocaleDateString()
        }else{
            return ''
        }
    },
    selectTab(tab_name){
        this.choosen_tab=tab_name
    },
    getFile(id){
        if(this.documentNo && this.documentType)
            document.getElementById(id).click()
    },
    loadFile(e){
        this.fileToUpload = e.target.files[0]
        if(this.fileToUpload.size > 0)
            this.fileNameToUpload= this.fileToUpload.name
    },
    uploadFile(e){
        this.submitting_message='Enregistrement en cours'
        this.loadFile(e)
        const docNo = new String(this.documentNo).split('/').join('_')

        const DocumentDetail = {
            type:this.documentType,
            documentNo:docNo,
        }
        let formData = new FormData();
        formData.append('file', this.fileToUpload);
        formData.append('document', JSON.stringify(DocumentDetail));

        axios.post(`http://${this.hostname}:5000/app/upload1`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } 
        ).then(
            (resp)=> {
                console.log(resp)
                let docName = resp.data.name
                let docLink = resp.data.link
                docLink = new String(docLink).split('\\').join('/')
                this.submitForm(docName,docLink,this.documentType,this.documentNo)
                
        })
        .catch(
            (err)=>console.log(err)
        )
    },
    openFile(link){
        window.open(`http://${this.hostname}:5000/app/getAPI/openFile?link=${link}`,null)
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

#customer-info-content,#attached-doc-content{
overflow-y:scroll;
overflow-x: hidden;
}
</style>