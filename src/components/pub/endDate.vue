<template>
    <Row>
        <Col span="12">
            <DatePicker type="date" format="yyyy-MM-dd" placeholder="选择时间" style="width: 246px" v-model="date" @on-change="selDate(date=$event)" :options="disabled"></DatePicker>
        </Col>
    </Row>
</template>
<script>
    export default {
        props:["importDate"],
        data(){
            return {
                date:'',
                disabled:{
                    disabledDate(time){
                        return time && time.valueOf() < Date.now();
                    }
                }
            }
        },
        created(){
            if (this.importDate) {
                var d=new Date(this.importDate)
                this.date=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                this.$emit("exportDate",this.date)
            }else{
                var d=new Date();
                this.date=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                this.$emit("exportDate",this.date)
            }
        },
        methods:{
            selDate(e){
                this.$emit("exportDate",e)
            }
        }
    }
</script>