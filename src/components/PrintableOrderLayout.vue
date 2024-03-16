<template>
    <div  class="printable-document" style="width:892.8px;height:1262.88px;background-color:white;margin-left:auto;margin-right: auto;">
        <header class="mx-5">
            <div class="columns pt-5 is-mobile">
                <div class="column has-text-left">
                    <span class="subtitle is-3">Confirmation de commande</span><br>
                    <span class="subtitle is-3">{{ soHeader["N° commande"] }}</span><br>
                    <span class="subtitle is-6">{{ new Date().toLocaleString() }}</span><br>
                    
                </div>
                <div class="column has-text-right">
                    <img src="@/assets/images/cosmos_logo.jpeg" alt="" style="max-width: 160px;" class="mt-5">
                </div>
            </div>

            <div class="columns pt-5">
                <div class="column has-text-left">
                    <span class="subtitle is-5">{{ soHeader["Nom du client"] }}</span><br>
                    <span class="subtitle is-5">{{ soHeader["Contact client"] }}</span><br>
                    <span class="subtitle is-5">{{ soHeader["Adresse du client"] }}</span><br>
                    <span class="subtitle is-5">{{ soHeader["Code postal client"] }}</span>
                    <span class="subtitle is-5">{{ soHeader["Ville du client"] }}</span><br>
                    <span class="subtitle is-5">{{ soHeader["Nom région client"] }}</span>
                    
                </div>
                <div class="column has-text-right">
                    <span class="subtitle is-5">COSMOS S.A.</span><br>
                    <span class="subtitle is-5">5 av. Pierre de Coubertin</span><br>
                    <span class="subtitle is-5">B.P. 155</span><br>
                    <span class="subtitle is-5">75008 Paris</span>
                </div>
            </div>
        </header>

        <main class="mx-5 my-5">
            <div class="columns is-mobile">
                <div class="column has-text-left">
                    <span class="title is-6">N° doc. externe</span><br>
                    <span class="subtitle is-5">{{ soHeader['N° doc. externe'] }}</span><br>
                </div>
                <div class="column has-text-left">
                    <span class="title is-6">Vendeur</span><br>
                    <span class="subtitle is-5">{{ soHeader['Code vendeur'] }}</span><br>
                </div>
                <div class="column has-text-left">
                    <span class="title is-6">N° devis</span><br>
                    <span class="subtitle is-5">{{ soHeader['N° devis'] }}</span><br>
                </div>
                <div class="column has-text-left">
                    <span class="title is-6">Conditions de livraison</span><br>
                    <span class="subtitle is-5">{{ soHeader['Condition de livraison'] }}</span><br>
                </div>
            </div>

            <div class="table-container my-5">
                <table class="table is-striped is-fullwidth my-5">
                    <thead class=" my-5">
                        <tr style="border-bottom: 3px solid black;" class=""> 
                            <th class="has-text-left  is-size-7" >N°</th>
                            <th class="has-text-left  is-size-7" >Description</th>
                            <th class="has-text-right  is-size-7" >Quantité</th>
                            <th class="has-text-right  is-size-7" >PU HT</th>
                            <th class="has-text-right  is-size-7" >%Remise HT</th>
                            <th class="has-text-right  is-size-7" >% TVA</th>
                            <th class="has-text-right  is-size-7" >Montant ligne HT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :id="soLine['N° ligne']" v-for="line of soLine" :key="line">
                            <td class="has-text-left"> {{ line['N° article'] }}</td>
                            <td class="has-text-left"> {{ line['Description'] }}</td>
                            <td class="has-text-right"> {{ line['Quantité'] }} {{ line['Code unité'] }}</td>
                            <td class="has-text-right"> {{ line['Prix unitaire HT'] }}</td>                
                            <td class="has-text-right"> -{{ line['% remise ligne'] }}</td>                
                            <td class="has-text-right"> {{ line['% TVA'] }}</td>                
                            <td class="has-text-right"> {{ line['Montant ligne HT'] }}</td>                
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="columns is-mobile">
                <div class="column is-half is-offset-half">
                    <div class="columns is-mobile">
                        <div class="column has-text-left">
                            <span class="subtitle is-5">Sous-total</span><br>
                            <span class="subtitle is-5">TVA 20%</span><br>
                        </div>
                        <div class="column has-text-right">
                            <span class="subtitle is-5">{{ soHeader['Sous-total HT'] }}</span><br>
                            <span class="subtitle is-5">{{ soHeader['Total TVA'] }}</span><br>
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns is-mobile">
                <div class="column is-half is-offset-half">
                    <div class="columns is-mobile is-gapless" style="border-bottom: 2px solid black;">
                        <div class="column has-text-left">
                            <span class="title is-5">Total {{ soHeader['Code devise'] }} TTC</span><br>
                        </div>
                        <div class="column has-text-right">
                            <span class="title is-5">{{ soHeader['Total TTC'] }}</span><br>
                        </div>
                    </div>
                </div>
            </div>

        </main>
 
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
        <footer class="footer my-5" style=" margin-left: auto;margin-right: auto;">
            
            <div class="content has-text-left">
                <div class="columns is-mobile">
                    <div class="column">
                        <span>N° identif. intracomm.</span><br>
                        <span>FR77777777777</span><br><br>
                        <span>Banque Mondiale</span><br>
                        <span>17206 99-99-888</span><br>

                    </div>
                    <div class="column">
                        <span>Page d'accueil</span><br>
                        <span></span><br><br>
                        <span>N° compte international (IBAN)</span><br>
                        <span>FR1420041010050500013M02606</span><br>
                    </div>
                    <div class="column">
                        <span>N° téléphone</span><br>
                        <span>01 66 66 66 66</span><br><br>
                        <span>Code SWIFT</span><br>
                        <span></span><br>
                    </div>
                    <div class="column">
                        <span>Adresse e-mail</span><br>
                        <span></span><br><br>
                        <span>N° CCP</span><br>
                        <span>888-9999</span><br>
                    </div>
                </div>                
            </div>

        </footer>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'printable-order-layout',
    props:['idRoute'],
    data(){
        return {
            soHeader:'',
            soLine:'',
            //id:this.$route.params.id,
            hostname:window.location.hostname

        }
    },
    mounted(){
        axios.get(`http://${this.hostname}:3000/app/${this.idRoute}`)
        .then(result => {
            this.soHeader = result.data[0],
            this.soLine = result.data[1]
            console.log(this.soHeader)

        }).catch(err=>console.log(err))
    }
}
</script>