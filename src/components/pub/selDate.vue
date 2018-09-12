<template>
    <Row>
        <Col span="12">
            <DatePicker type="date" format="yyyy-MM-dd" placeholder="选择时间" style="width: 280px" v-model="date" @on-change="selDate(date)"></DatePicker>
        </Col>
    </Row>
</template>
<script>
    export default {
        prop:["importDate"],
        data(){
            return {
                date:""
            }
        },
        methods:{
            selDate(e){
                console.log(e);
            }
        }
    }
</script>