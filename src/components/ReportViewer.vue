<template>
    <div>
        <iframe width="1500" height="1000" :src="src" frameborder="0"></iframe>
    </div>
</template>
<script>

export default {
    name: 'report-viewer',
    props:['documentNo','documentRdl','rdlParameter'],
    data(){
        return {
            src:''
        }
    },
    mounted(){
        // console.log('rdlParameter',this.rdlParameter)
        // console.log('documentRdl',this.documentRdl)
        // console.log('documentNo',this.documentNo)
        this.src=`http://108.175.0.116:8083/ReportServer/Pages/ReportViewer.aspx?/WebApp/${this.documentRdl}&rs:Toolbar=False&rc:Parameters=False&rs:embed=true&${this.rdlParameter}=${this.documentNo}`
    }
}
</script>