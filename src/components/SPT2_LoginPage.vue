<template>
    <div id="LoginBlock">
        <div class=" has-background-danger modal is-active" id="mainModal">
            <div id="this" class="modal-background ">
            </div>
            <div class="modal-card  box  is-rounded ">
                <full-rounded-bubble1/>
                <header class="modal-card-header mt-5 ">
                    <figure class="image is-128x128 " style="margin-right:auto;margin-left:auto;">
                        <img src="../assets/images/sport_2000.jpg" alt="">
                    </figure>
                </header>

                <!---div class="notification is-danger is-left is-rounded ">
                    <button class="delete"></button>
                    <span class="icon has-text-white">
                        <i class="fas fa-ban"></i>
                        il y'a une erreur
                    </span>
                </div---->
                <article v-if="errorInputMessage" class="message is-danger shadow">
                    <div class="message-header">
                            <span class="subtitle is-7 m-0 has-text-white"> 
                                <span class="icon ">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </span>
                                {{ errorInputMessage }}
                            </span>
                        <button class="delete" aria-label="delete" @click="errorInputMessage=''"></button>
                    </div>
                </article>
                <article v-if="successInputMessage" class="message is-primary shadow">
                    <div class="message-header">
                            <span class="subtitle is-7 m-0 has-text-white"> 
                                <span class="icon ">
                                    <i class="fas fa-check"></i>
                                </span>
                                {{ successInputMessage }}
                                <span class="icon ">
                                    <i class="fas fa-arrows-rotate fa-pulse"></i>
                                </span>
                            </span>
                        <button class="delete" aria-label="delete" @click="successInputMessage=''"></button>
                    </div>
                </article>
                <form  @submit.prevent="loginUser">

                    <section class="modal-card-body">
                        <div class="field mb-3 mx-5  has-border-bottom">
                            <div class="control has-icons-left form-floating ">
                                <input v-model="loginInput" class="form-control input is-normal  is-light" type="text" placeholder="login" required>
                                <label class="label mx-5 " for="text"><strong>Code utilisateur</strong> </label>
                                <span class="icon is-small is-left my-1">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div> 
                        </div>

                        <div class="field mx-5  has-border-bottom">
                            <div class="control has-icons-left form-floating">
                                <input v-model="mdpInput" class="form-control input is-normal is-light has-border-bottom" :type="type_of_mdp_Field" placeholder="mdp"  required>
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
                            <buttonVue class=" is-fullwidth is-large is-responsive" buttonType="submit" buttonIcone="fas fa-user" iconeColor="is-danger" textColor="has-text-white" style="background-color:#a20d01;overflow: hidden;">
                                Valider
                                <bubble-for-button1/>
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
    import fullRoundedBubble1 from './dynamicBubbles/SPT2_FullRoundedBubble.vue'
    import bubbleForButton1 from './dynamicBubbles/SPT2_BubbleForButton.vue'
    import { useWebUserInfoStore } from '@/Stores/WebUserInfo'
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'

import axios from 'axios'
    export default {
        components:{
            buttonVue,
            fullRoundedBubble1,
            bubbleForButton1
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
        },
        setup(){
            const loginInput = ref('')
            const mdpInput = ref('')
            const errorInputMessage = ref('')
            const successInputMessage = ref('')
            const hostname = window.location.hostname   
            const router = useRouter()
    


            // function getUser(){
            //     axios.get(`http://${hostname}:5000/app/getWebUserInfo?userCode=${loginInput.value}`)
            //     .then( result => {
            //         console.log(result)
            //     })
            // }
            function getCustomerUserInfo(){
                if(useWebUserInfoStore().defaultCustomerNo){
                    axios.get(`http://${hostname}:5000/app/getCustomerCard/${useWebUserInfoStore().defaultCustomerNo}`)
                    .then(result => {
                        useWebUserInfoStore().fillWebUserCustomerInfo(result.data.recordset[0])
                        window.localStorage.setItem("userCustomerData", JSON.stringify(result.data.recordset[0]))
                    }).catch(err=>console.log(err))
                }
            }

            function loginUser(){
                axios.get(`http://${hostname}:5000/app/getUserInfo?webUser=${loginInput.value}`)
                .then( result => {
                    if(mdpInput.value!=='Password01'){
                        errorInputMessage.value ='Utilisateur ou mot de passe incorrect'
                    }else{
                        if(errorInputMessage.value){
                            errorInputMessage.value=''
                        }
                        successInputMessage.value='Identifiants valides! Redirection...'
                        let userData = result.data[0]
                        useWebUserInfoStore().fillWebUserInfo(userData)
                        getCustomerUserInfo()
                        window.localStorage.setItem("userData", JSON.stringify(userData));
                        setTimeout(()=> router.push({name:'SPT2_SalesContainerPage'}),3000)
                    }
                })
                .catch(err => {
                    if(err.response.data.message){
                        console.log(err)
                        errorInputMessage.value = err.response.data.message
                    }
                })
                
                
            }

            onMounted(() => {
                if( window.localStorage.getItem("userData")){
                    router.push({name:'SPT2_SalesContainerPage'})
                }
            })

            return {
                loginInput,mdpInput,
                loginUser,
                errorInputMessage,successInputMessage,
            }
        }
    }

</script>

<style scoped>
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
    border-bottom:3px solid #a20d01;
}

</style>