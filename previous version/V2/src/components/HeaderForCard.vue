<template>
    <div>
        <h6 class="subtitle is-6 has-text-left is-flex-wrap-wrap">
            {{ pageTitle }} | Date de travail : {{ new Date().toDateString() }}
        </h6>
        <h3 class="subtitle is-3 has-text-left " style="position:relative; top:-10px">
            <span class="has-text-orange"> {{ soNo }} </span>  -
            <span>{{ soDesc }}</span>
        </h3>
        <div class="has-text-left">
            <slot></slot>
        </div>
    </div>
</template>
<script>

export default {
    name:'header-for-card',
    components:{
    },
    props:['soNo','soDesc','pageTitle']
    
}
</script>
<style>
.has-text-orange{
    color:rgb(255, 166, 0);
}
</style>