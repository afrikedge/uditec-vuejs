<template>
    <div  class="printable-document" style="width:2480px;height:3508px;background-color:white;margin-left:auto;margin-right: auto;overflow: visible;">
        <div style="width:2480px;height:3508px;position:relative;overflow: visible;">

            <header class="mx-5">
                <div class="columns pt-5 is-mobile">
                    <div class="column has-text-left">
                        <span class="subtitle" style="font-size: 90px;">Confirmation de commande</span><br>
                        <span class="subtitle" style="font-size: 90px;">{{ soHeader["N° commande"] }}</span><br>
                        <span class="subtitle" style="font-size: 50px;">{{ new Date().toLocaleString() }}</span><br>
                        
                    </div>
                    <div class="column has-text-right py-5"><br><br>
                        <img src="@/assets/images/cosmos_logo.jpeg" alt=""  class="mt-5">
                    </div>
                </div>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
    
                <div class="columns pt-5">
                    <div class="column has-text-left">
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader["Nom du client"] }}</span><br>
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader["Contact client"] }}</span><br>
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader["Adresse du client"] }}</span><br>
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader["Code postal client"] }}</span>
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader["Ville du client"] }}</span><br>
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader["Nom région client"] }}</span>
                        
                    </div>
                    <div class="column has-text-right">
                        <span class="subtitle" style="font-size: 60px;">COSMOS S.A.</span><br>
                        <span class="subtitle" style="font-size: 60px;">5 av. Pierre de Coubertin</span><br>
                        <span class="subtitle" style="font-size: 60px;">B.P. 155</span><br>
                        <span class="subtitle" style="font-size: 60px;">75008 Paris</span>
                    </div>
                </div>
            </header><br><br><br><br><br><br>
    
            <main class="mx-5 my-5">
                <div class="columns is-mobile">
                    <div class="column has-text-left">
                        <span class="title" style="font-size: 50px;">N° doc. externe</span><br>
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader['N° doc. externe'] }}</span><br>
                    </div>
                    <div class="column has-text-left">
                        <span class="title" style="font-size: 50px;">Vendeur</span><br>
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader['Code vendeur'] }}</span><br>
                    </div>
                    <div class="column has-text-left">
                        <span class="title" style="font-size: 50px;">N° devis</span><br>
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader['N° devis'] }}</span><br>
                    </div>
                    <div class="column has-text-left">
                        <span class="title" style="font-size: 50px;">Conditions de livraison</span><br>
                        <span class="subtitle" style="font-size: 60px;">{{ soHeader['Condition de livraison'] }}</span><br>
                    </div>
                </div>
                <br><br>
    
                <div class="table-container my-5">
                    <table class="table is-striped is-fullwidth my-5">
                        <thead class=" my-5">
                            <tr style="border-bottom: 7px solid black;" class=""> 
                                <th class="has-text-left" style="font-size: 35px;" >N°</th>
                                <th class="has-text-left" style="font-size: 35px" >Description</th>
                                <th class="has-text-right" style="font-size: 35px" >Quantité</th>
                                <th class="has-text-right" style="font-size: 35px" >PU HT</th>
                                <th class="has-text-right" style="font-size: 35px" >%Remise HT</th>
                                <th class="has-text-right" style="font-size: 35px">% TVA</th>
                                <th class="has-text-right" style="font-size: 35px">Montant ligne HT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :id="soLine['N° ligne']" v-for="line of soLine" :key="line">
                                <td class="has-text-left" style="font-size: 50px;"> {{ line['N° article'] }}</td>
                                <td class="has-text-left" style="font-size: 50px;"> {{ line['Description'] }}</td>
                                <td class="has-text-right" style="font-size: 50px;"> {{ line['Quantité'] }} {{ line['Code unité'] }}</td>
                                <td class="has-text-right" style="font-size: 50px;"> {{ line['Prix unitaire HT'] }}</td>                
                                <td class="has-text-right" style="font-size: 50px;"> -{{ line['% remise ligne'] }}</td>                
                                <td class="has-text-right" style="font-size: 50px;"> {{ line['% TVA'] }}</td>                
                                <td class="has-text-right" style="font-size: 50px;"> {{ line['Montant ligne HT'] }}</td>                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br><br>
    
                <div class="columns is-mobile">
                    <div class="column is-half is-offset-half">
                        <div class="columns is-mobile">
                            <div class="column has-text-left">
                                <span class="subtitle" style="font-size: 60px;">Sous-total</span><br>
                                <span class="subtitle" style="font-size: 60px;">TVA 20%</span><br>
                            </div>
                            <div class="column has-text-right">
                                <span class="subtitle" style="font-size: 60px;">{{ soHeader['Sous-total HT'] }}</span><br>
                                <span class="subtitle" style="font-size: 60px;">{{ soHeader['Total TVA'] }}</span><br>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="columns is-mobile">
                    <div class="column is-half is-offset-half">
                        <div class="columns is-mobile is-gapless" style="border-bottom: 10px solid black;">
                            <div class="column has-text-left">
                                <span class="title" style="font-size: 60px;">Total {{ soHeader['Code devise'] }} TTC</span><br>
                            </div>
                            <div class="column has-text-right">
                                <span class="title" style="font-size: 60px;">{{ soHeader['Total TTC'] }}</span><br>
                            </div>
                        </div>
                    </div>
                </div>
    
            </main>
     
            <footer class="footer my-5" style="position:absolute;bottom:0;width:2480px">
                
                <div class="content has-text-left">
                    <div class="columns is-mobile">
                        <div class="column">
                            <span style="font-size: 40px;">N° identif. intracomm.</span><br>
                            <span style="font-size: 40px;">FR77777777777</span><br><br>
                            <span style="font-size: 40px;">Banque Mondiale</span><br>
                            <span style="font-size: 40px;">17206 99-99-888</span><br>
    
                        </div>
                        <div class="column">
                            <span style="font-size: 40px;">Page d'accueil</span><br>
                            <span style="font-size: 40px;"></span><br><br>
                            <span style="font-size: 40px;">N° compte international (IBAN)</span><br>
                            <span style="font-size: 40px;">FR1420041010050500013M02606</span><br>
                        </div>
                        <div class="column">
                            <span style="font-size: 40px;">N° téléphone</span><br>
                            <span style="font-size: 40px;">01 66 66 66 66</span><br><br>
                            <span style="font-size: 40px;">Code SWIFT</span><br>
                            <span style="font-size: 40px;"></span><br>
                        </div>
                        <div class="column">
                            <span style="font-size: 40px;">Adresse e-mail</span><br>
                            <span style="font-size: 40px;"></span><br><br>
                            <span style="font-size: 40px;">N° CCP</span><br>
                            <span style="font-size: 40px;">888-9999</span><br>
                        </div>
                    </div>                
                </div>
    
            </footer>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'printable-order-layout1',
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