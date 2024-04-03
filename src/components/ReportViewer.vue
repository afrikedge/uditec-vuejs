<template>
    <div>
        <iframe width="1500" height="1000" :src="src" frameborder="0"></iframe>
    </div>
</template>
<script>

export default {
    name: 'report-viewer',
    props:['documentNo','documentRdl','rdlParameter','src'],
    data(){
        return {
        }
    },
    mounted(){
        // console.log('rdlParameter',this.rdlParameter)
        // console.log('documentRdl',this.documentRdl)
        // console.log('documentNo',this.documentNo)
        
    }
}
</script>