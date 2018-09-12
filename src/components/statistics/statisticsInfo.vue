<template>
    <div class="box">
        <Row :gutter="16">
            <Col :xs="6" :sm="6" :md="6" :lg="6">
                <div>
                    <Row>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                            <div class="tl-top">
                                <car-fault-type></car-fault-type>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                            <div class="tl-top">
                                <car-fault-percent></car-fault-percent>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col :xs="18" :sm="18" :md="18" :lg="18">
                <div class="car-site-map">
                    <car-site-map :zoomNum="5"></car-site-map>
                </div>
                <div>
                    <h3>已分配车辆分布图</h3>
                </div>
            </Col>
            <!-- <Col :xs="5" :sm="5" :md="5" :lg="5">
                <div>
                    <Row>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                            <div class="tl-top">
                                
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                            <div class="tl-top">
                                
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col :xs="24" :sm="24" :md="24" :lg="24">
                            <div class="tl-top">
                                
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col> -->
        </Row>
        <br>
        <Row :gutter="16">
            <Col :xs="6" :sm="6" :md="6" :lg="6">
                <div class="tl-top">
                    <car-ing></car-ing>           
                </div>
            </Col>
            <Col :xs="6" :sm="6" :md="6" :lg="6">
                <div class="tl-top b-color">
                    <average-mileage></average-mileage>            
                </div>
            </Col>
            <Col :xs="6" :sm="6" :md="6" :lg="6">
                <div class="tl-top b-color">
                    <car-number-chart></car-number-chart>            
                </div>
            </Col>
            <Col :xs="6" :sm="6" :md="6" :lg="6">
                <div class="tl-top b-color">
                     <register></register>           
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    import carSiteMap from "@/components/pub/carSiteMap"
    import carNumberChart from "@/components/pub/carNumberChart"
    import averageMileage from "@/components/pub/averageMileage"
    // import exchangeBattery from "@/components/pub/exchangeBattery"
    import register from "@/components/pub/register"
    import carFaultPercent from "@/components/pub/carFaultPercent"
    import carFaultType from "@/components/pub/carFaultType"
    import carIng from "@/components/pub/carIng"
    export default {
        components:{
            carSiteMap,
            carNumberChart,
            averageMileage,
            register,
            carIng,
            carFaultPercent,
            carFaultType
        },
        data(){
            return {

            }
        },
        created(){

        },
        methods:{
            
        }
    }
</script>
<style scoped lang="less">
    .box{
        min-width: 1200px;
        padding: 14px 14px;
        text-align: center;
        background-color: white;
    }
    .tl-top{
        height: 256px;
        // background-color: #5A9BD5;
        border:2px solid #51719B;
        margin-bottom: 10px;
    }
    h3{
        margin:5px auto;

    }
    .car-site-map{
        height: 512px;
    }
    .b-color{
        background-color: transparent;
    }
</style>