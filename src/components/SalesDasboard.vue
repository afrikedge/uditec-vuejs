<template>
    <div class="has-background-white pt-5" style="height:auto; width:auto;overflow-y: scroll; position:fixed;top:153px;bottom: 0px; width:auto;right:0%;left:0%">
        <br><br>
        <div style="margin-left:6%;margin-right:6%;">
            <div id="first-block-dsb" class="columns pt-5 px-5">
                <div class="column is-half has-text-left">
                    <p class="subtitlte is-7 has-text-grey">Titre</p>
                    <p class="subtitle is-1">Bonjour {{ userInfo.fullName }}!</p>
                </div>
                <div class="column is-half has-text-left">
                    <p class="subtitlte is-7 has-text-grey">Actions</p>
                    <div class="columns is-multiline  is-mobile">
                        <div class="column is-narrow">
                            <div>
                                <a href="#" class="has-text-orange" @click.prevent="this.$router.push(`/NewSaleQuote`)">
                                    <span class="subtitle is-3 mr-1">+</span>
                                    <span class="subtitle is-6">Devis</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" class="has-text-orange" @click.prevent="this.$router.push(`/NewSaleOrder`)">
                                    <span class="subtitle is-3 mr-1">+</span>
                                    <span class="subtitle is-6">Commande vente</span>
                                </a>
                            </div>
                        </div>
                        <div class="column is-narrow">
                            <div class="">
                                <a href="#" class="has-text-orange"  @click.prevent="this.$router.push(`/NewLead`)">
                                    <span class="subtitle is-3 mr-1">+</span>
                                    <span class="subtitle is-6">Prospect</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" class="has-text-orange" @click.prevent="this.$router.push(`/NewShipToAddress`)">
                                    <span class="subtitle is-3 mr-1">+</span>
                                    <span class="subtitle is-6">Adresse</span>
                                </a>
                            </div>
                        </div>
                        <div class="column is-narrow">
                            <div>
                                <a href="#" class="has-text-orange" @click.prevent="this.$router.push(`/NewRecoveryActivity`)">
                                    <span class="subtitle is-3 mr-1">+</span>
                                    <span class="subtitle is-6">Activité de recouvrement</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" class="has-text-orange" @click.prevent="this.$router.push(`/NewRepossessionRequest`)">
                                    <span class="subtitle is-3 mr-1">+</span>
                                    <span class="subtitle is-6">Demande de repossession</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" class="has-text-orange" @click.prevent="this.$router.push(`/NewPaymentPromise`)">
                                    <span class="subtitle is-3 mr-1">+</span>
                                    <span class="subtitle is-6">Promesse de règlement</span>
                                </a>
                            </div>
                        </div>
                        <div class="column is-narrow">
                            <!--------div>
                                <a href="#" class="has-text-orange">
                                    <span class="subtitle is-3 mr-1">+</span>
                                    <span class="subtitle is-6"></span>
                                </a>
                            </div-------->
                        </div>
                        <div class="column"></div>
    
                        
                    </div>
                </div>
    
    
            </div><br><br>
            <div id="second-block-dsb" class="mt-5 px-5">
                <p class="title is-5 has-text-left" style="border-bottom:2px solid black;">Activités</p>
                <div class="columns is-multiline is-mobile">
                    <div class="column is-narrow mx-2">
                        <p class="title is-7 has-text-left">A Lancer</p>
                        <div class="columns is-mobile is-multiline">
                            <div class="column has-background-orange py-0 mx-1 is-narrow shadow" style="width: 150px;">
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Devis - Ouverts</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 1px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left mt-1 mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
                            
                            <div class="column has-background-orange py-0 mx-1 is-narrow shadow" style="width: 150px;" >
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Commande vente - Ouverts</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 1px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left mt-1 mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-narrow mx-2 " >
                        <p class="title is-7 has-text-left ">Commmandes vente lancées et non livrées </p>
                        <div class="columns is-mobile is-multiline" >
                            <div class="column has-background-orange py-0 mx-1 is-narrow shadow" style="width: 150px;">
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Prêtes pour expédition</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 1px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left mt-1 mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
                            
                            <div class="column has-background-orange py-0 mx-1 is-narrow shadow" style="width: 150px;" >
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Partiellement livrées</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 1px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left mt-1 mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
    
                            <div class="column  has-background-orangered py-0 mx-1 is-narrow shadow" style="width: 150px;" >
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> En retard</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 5px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left  mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-narrow mx-2 " >
                        <p class="title is-7 has-text-left "> Suivi Remises </p>
                        <div class="columns is-mobile is-multiline" >
                            <div class="column has-background-orange py-0 mx-1 is-narrow shadow" style="width: 150px;">
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Demandes en cours</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 1px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left mt-1 mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
                            
                            <div class="column has-background-orangered py-0 mx-1 is-narrow shadow" style="width: 150px;" >
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Demandes refusées</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 5px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left  mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
            <div id="third-block-dsb" class="my-5 px-5">
                <div class="columns">
                    <div class="column is-narrow">
                        <p class="title is-5 has-text-left pb-1" style="border-bottom:2px solid black;">Autres activités</p>
                        <p class="title is-7 has-text-left mx-2">Demande de revision</p>
                        <div class="columns is-mobile is-multiline">
                            <div class="column has-background-orange py-0 mx-1 is-narrow shadow" style="width: 150px;">
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Brouillon</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 1px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left mt-1 mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
                            <div class="column has-background-orange py-0 mx-1 is-narrow shadow" style="width: 150px;">
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Encours validation</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 1px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left mt-1 mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
                            <div class="column has-background-orange py-0 mx-1 is-narrow shadow" style="width: 150px;">
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Validées</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 1px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left mt-1 mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
                            <div class="column has-background-orangered py-0 mx-1 is-narrow shadow" style="width: 150px;">
                                <div class="has-text-left mt-2" style="height: 50px;">
                                    <span class="subtitle is-6 has-text-light"> Rejetées</span>
                                </div>
                                <div class="has-text-left" style="border-bottom: 5px solid white;">
                                    <span class="subtitle is-1 has-text-light"> 0 </span>
                                </div>
                                <div class="has-text-left  mb-2">
                                    <span class="subtitle is-6 has-text-light"> ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <p class="title is-5 has-text-left pb-1" style="border-bottom:2px solid black;">Points de vente</p>
                        to be continued..
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
    export default {
        setup(){
             const userInfo = useWebUserInfoStore()

             return {
                userInfo
             }
        }
    }
</script>
<style>

.has-text-orange span{
    color: orange;

}
.has-background-orangered{
    background-color: orangered;
}

.has-background-orange{
    background-color: orange;
}

</style>