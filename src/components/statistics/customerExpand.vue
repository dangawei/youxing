<template>
    <div>
        <Row class="expand-row" v-for="item in data">
            <Col span="6">
                <span class="expand-key">车辆编号:{{item.vehicleNo}}</span>
            </Col>
            <Col span="6">
                <span class="expand-value">起租时间:{{item.rentTime}}</span>
            </Col>
            <Col span="6">
                <span class="expand-value">还车时间:{{item.returnTime}}</span>
            </Col>
            <Col span="6">
                <span class="expand-value">真实还车时间:{{item.trueReturnTime}}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        data(){
            return{
                data:Object
            }
        },
        mounted(){
            console.log(this.row)
            this.data=this.row
        }
    };
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>