<template>
    <div>
        <h6 class="subtitle is-6 has-text-left is-flex-wrap-wrap">
            {{ pageTitle }} | Date de travail : {{ new Date().toDateString() }}
        </h6>
        <h3 class="subtitle is-3 has-text-left " style="position:relative; top:-10px">
            <div class="columns">
                <div class="column">
                    <a href="#" @click.prevent="$emit('onGoingBackToList')">
                        <span class="icon-text has-text-light mr-3 p-2 has-background-grey-lighter" style="min-width: 20px; min-height: 20px; border-radius: 20px;">
                            <span class="icon ">
                                <i class="fas fa-chevron-left"></i>
                            </span>
                        </span>
                    </a>
                    <span class="has-text-orange"> {{ soNo }} </span>  -
                    <span>{{ soDesc }}</span>
                </div>
                <div class="column has-text-right">
                    <a href="#" @click.prevent="goHome">
                        <span class="icon-text has-text-grey-lighter  p-2 " >
                            <span class="icon">
                                <i class="fas fa-house"></i>
                            </span>
                        </span>
                    </a>
                </div>
            </div>
        </h3>
        <div class="has-text-left">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { useNavigationTabStore } from '@/Stores/NavigationTab';

export default {
    name:'header-for-card',
    components:{
    },
    props:['soNo','soDesc','pageTitle'],
    methods:{
        goHome(){
            useNavigationTabStore().setActiveTab('dashboard')
            this.$router.push('/')
        }
    }
    
}
</script>
<style>
.has-text-orange{
    color:rgb(255, 166, 0);
}
</style>