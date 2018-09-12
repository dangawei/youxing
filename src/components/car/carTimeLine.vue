<template>
    <div class="rule">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>车辆管理</BreadcrumbItem>
                <BreadcrumbItem to="/allocationed/car/list">已分配车辆列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>{{this.$route.query.vehicleNo}}车辆流转详情</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                   
                </div>
                <!--操作按钮-->
                <div class="tableListOperator">
                  <!-- <Button type="primary"  @click="add()">导入车辆信息(excel)</Button> -->
                </div>
                <Row>
                    <Col :xs="24" :sm="24" :md="12" :lg="12">
                        <div class="cen">
                            <Timeline>
                                <TimelineItem v-for="item in data">
                                    <p class="time">{{item.company?item.company.name:item.customerId}}</p>
                                    <p class="content">分配时间:{{item.createAt}}</p>
                                </TimelineItem>
                            </Timeline>
                        </div>
                    </Col>
                </Row>

            </div>
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div style="text-align: center;">
                        <Button type="primary"  @click="back()">返回</Button>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
     
export default {
    components:{
        
    },
    data () {
        return {
            data:[]
        }
    },
    mounted() {
      	this.list()
    },
    methods:{
    	list(){
            
            let _this=this;
            let data={
                "vehicleId": this.$route.params.id
            }
            this.$api.post("/vehicle/allot/detail",data,result=>{
                if (result.code==0) {
                    if (result.data.customerBusiness) {
                        var datas=result.data.companyVehicleVOList.concat();
                        datas.push(result.data.customerBusiness)
                        _this.data=datas
                        // console.log(_this.data);
                    }else{
                        _this.data=result.data.companyVehicleVOList
                    }
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        back(){
            this.$router.go(-1);
        }
    }
  }
</script>
<style scoped>
    .cen{
        margin: 0 auto;
    }
    .time{
        font-size: 14px;
        font-weight: 700;
        margin: 0;
    }
    .content{
        padding-left: 5px;
        margin: 5px;
        font-size: 14px;
    }
</style>