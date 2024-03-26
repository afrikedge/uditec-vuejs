<template>
    <div id="LoginBlock">
        <div class=" has-background-danger modal is-active" id="mainModal">
            <div id="this" class="modal-background ">
            </div>
            <div class="modal-card  box  is-rounded ">
                <full-rounded-bubble/>
                <header class="modal-card-header mt-5">
                    <img src="../assets/images/cosmos_logo.jpeg" alt="">
                </header>

                <!---div class="notification is-danger is-left is-rounded ">
                    <button class="delete"></button>
                    <span class="icon has-text-white">
                        <i class="fas fa-ban"></i>
                        il y'a une erreur
                    </span>
                </div---->

                <form>
                    <section class="modal-card-body">
                        <div class="field mb-3 mx-5  has-border-bottom">
                            <div class="control has-icons-left form-floating ">
                                <input class="form-control input is-normal  is-light" type="text" placeholder="login" required>
                                <label class="label mx-5 " for="text"><strong>Code utilisateur</strong> </label>
                                <span class="icon is-small is-left my-1">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div> 
                        </div>

                        <div class="field mx-5  has-border-bottom">
                            <div class="control has-icons-left form-floating">
                                <input class="form-control input is-normal is-light has-border-bottom" :type="type_of_mdp_Field" placeholder="mdp"  required>
                                <label class="label mx-5 " for="password"><strong>Mot de passe </strong> </label>
                                <span class="icon is-small is-left my-1 ">
                                    <i class="fas fa-key "></i>
                                </span>
                            </div>
                        </div>

                        <p class="has-text-info has-text-left mt-2 mx-5">
                            <a @click.prevent="toggleMDPView()" class="has-text-danger"> {{ action_on_mdp_field }} le mot de passe</a> 
                        </p>
                        <div class="control mt-5">
                            <buttonVue class=" is-fullwidth is-large is-responsive" buttonType="submit" buttonIcone="fas fa-user" iconeColor="is-primary" textColor="has-text-white" style="background-color:rgb(255, 85, 0) ;overflow: hidden;">
                                Valider
                                <bubble-for-button/>
                            </buttonVue>
                        </div>
                    </section>  
                </form>
            </div>
        </div>
    </div>

</template>

<script>
    import buttonVue from '../components/input/Button'
    import fullRoundedBubble from '../components/dynamicBubbles/FullRoundedBubble.vue'
    import bubbleForButton from '../components/dynamicBubbles/BubbleForButton.vue'
    export default {
        components:{
            buttonVue,
            fullRoundedBubble,
            bubbleForButton
        },
        data(){
            return {
                action_on_mdp_field:'Afficher',
                type_of_mdp_Field:'password',
            }
        },
        methods:{
            toggleMDPView(){
                this.type_of_mdp_Field = (this.type_of_mdp_Field == 'password') ? 'text' : 'password';
                this.action_on_mdp_field = (this.action_on_mdp_field == 'Afficher') ? 'Masquer': 'Afficher';
            },
        }
    }

</script>

<style>
.scroll::-webkit-scrollbar, #card_detail_column::-webkit-scrollbar {
  display: none;
}
#mainModal{
    background-image: url("../assets/images/fond1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}
#this{
    opacity: 0.4;
}
.has-border-bottom{
    border-bottom:3px solid rgb(255, 166, 0);
}

</style>