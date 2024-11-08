<template>
    <div :class="['columns', bgColor, {'has-border-bottom':has-border-bottom}]">
        <div class="column has-text-left" >
            <div class="columns is-multiline is-mobile is-gapless is-vcentered">

                <div class="column is-narrow">
                    <span class="title is-6">{{ pageTitle }} : </span>
                </div>


                <div class="column is-narrow" v-if="updateBtnIsDisabled==false">
                    <a href="#" class="px-3 py-3" @click.prevent="$emit('onUpdatingCard')">
                        <span class="icon">
                            <i class="fas fa-arrows-rotate " :class="{'fa-pulse':!fa-pulseIsDisabled}"></i>
                        </span>
                        <span class="subtitle is-6">Actualiser</span>
                    </a>
                </div>

            </div>
        </div>


        
    </div>
</template>
<script>

export default {
name:'ribbon-for-card-form-only',
components:{
},
props:['pageTitle',
'updateBtnIsDisabled','fa-pulseIsDisabled','bgColor','has-border-bottom'],
data(){
    return {


    }
},
computed:{
  
},
methods:{
    
}

}
</script>
<style scoped>
a:hover, th:hover {
background-color: rgba(255, 68, 0, 0.068);
}
span i{
color: #ffa500;
}
.dropdown-content a:hover{
background-color: rgba(255, 68, 0, 0.067)
}

.has-border-bottom-orange{
border-bottom:3px solid orange;
}

.has-background-orange{
background-color: #ff4500;
}

.has-border-bottom{
    border-bottom:1px solid rgba(0, 0, 0, 0.284) 
}

</style>