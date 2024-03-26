<template>
    <div >
        <iframe width="1500" height="1000" :src="src" frameborder="0"></iframe>

    </div>
</template>
<script>

export default {
    name: 'report-viewer',
    props:['orderNo'],
    data(){
        return {
            src:''
        }
    },
    mounted(){
        this.src=`http://localhost/ReportServer/Pages/ReportViewer.aspx?/rapport+test/Commande+vente+test&rs:embed=true&rs:Toolbar=False&rc:Parameters=False&OrderNum=${this.orderNo}`
    }
}
</script>