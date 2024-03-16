<template>
    <div class="">
        <h6 class="subtitle is-6 has-text-left is-flex-wrap-wrap">
            {{ pageTitle }} | Date de travail : {{ new Date().toDateString() }}
        </h6>
    </div>
</template>
<script>

export default {
    name:'header-for-list',
    components:{
    },
    props:['pageTitle']
    
}
</script>
<style>
.has-text-orange{
    color:rgb(255, 166, 0);
}
</style>