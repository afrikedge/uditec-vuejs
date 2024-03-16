<template>
        <button :class="['button', 'box', 'has-icons-left','shadow', 'hover',iconeColor]" :type="buttonType">
            <span class="icon-text">
                <span :class="['icon is-small']">
                    <i :class="[buttonIcone]"></i>
                    <slot></slot> 
                </span> 

            </span>
        </button>
</template>
<script>
export default {
    name:'button-vue',
    props:['buttonType','buttonIcone','iconeColor','textColor']
        
}
</script>
<style scoped>
.hover span{
    transform: scaleX(1);
    transition: transform 0.2s;
}
.hover:hover span{
    transform: scale(1.1,1.1);
}

.hover{
    border: none;
}
</style>