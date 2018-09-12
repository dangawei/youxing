<template>
    <div class="rule">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem>维修管理</BreadcrumbItem>
                <BreadcrumbItem to="/fault/car/list">故障车辆列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>分配维修{{workerData.vehicleNo}}车辆人员</h2>
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
                    <!-- <Button type="primary"  @click="sure()">确定分配</Button> -->
                </div>
                <div class="page-view-body">
                    <div class="pagelist">
                        <div class="pagelist-bd">
                        <Form ref="workerData" :model="workerData" :rules="ruleValidate" label-position="left">
                            <Row v-if="isArray">
                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                    <FormItem :label="item.siteName" prop="siteNo" v-for="item in siteData" :label-width="120">
                                         <RadioGroup v-model="workerData.workerNo" type="button">
                                            <Radio :label="cell.workerNo" v-for="cell in item.list" :true-value="cell.workerNo">{{cell.name}}</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row v-if="isObject">
                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                    <FormItem :label="siteData.siteName" prop="siteNo" :label-width="120">
                                         <RadioGroup v-model="workerData.workerNo" type="button">
                                            <Radio :label="cell.workerNo" v-for="cell in siteData.list" :true-value="cell.workerNo">{{cell.name}}</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                            
                        </div>
                    </div>
                </div>
                <div style="text-align:center;margin-bottom:15px;">
                    <Button type="primary"  @click="sure()">生成维修记录</Button>
                    <Button type="primary"  @click="back()">返回</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components:{
              
        },
        data () {
            return {
                vehicleNo:'',
                workerNo:'',
                show:false,
                workerData:{
                    siteNo:'',
                    vehicleNo:'',
                    workerNo:''
                },
                siteData:[],
                workers:[],
                ruleValidate:{},
                isObject:false,
                isArray:false
            }
        },
        created(){
            this.workerData.vehicleNo=this.$route.query.vehicleNo
            // console.log(this.$route.params.id)
            this.list();
        },
        methods: {
            list () {
                var listdata = {
                    "vehicleNo": this.$route.query.vehicleNo
                    // "vehicleNo": "bike123001"
                }
                var _this =  this
                this.$api.post('/repairSite/site/byVehicleNo',listdata,reset => {
                    if (reset.code === 0) {
                        let e=reset.data
                        var  gettype=Object.prototype.toString
                        if (gettype.call(e)=="[object Object]") {
                            _this.getMaintenanceInfo(e.id)
                        }else{
                            if (e.length>0) {
                                _this.siteData=reset.data
                                _this.isArray=true
                                _this.isObject=false
                            }else{
                                _this.$Message.error("未找到车辆位置!")
                            }
                        }
                    } else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            getMaintenanceInfo(e) {
                let _this = this
                let datas={
                    id:e
                }
                this.$api.post("/repairSite/getOne", datas, reset => {
                    if (reset.code === 0) {
                        // _this.$Message.success("!");
                        _this.siteData=reset.data
                        _this.isObject=true
                        _this.isArray=false
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            sure(){
                var d=new Date();
                d=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+' 00:00:00'
                var listdata = {
                    "workerNo": this.workerData.workerNo,
                    "vehicleNo": this.workerData.vehicleNo,
                    "faultRecordId": this.$route.params.id,
                    "startTime":d
                }
                var _this =  this
                if (this.workerData.workerNo) {
                    this.$api.post('/repairRecord/add',listdata,reset => {
                        if (reset.code === 0) {
                            _this.$Message.success("分配成功");
                            _this.$router.push("/maintenance/record/list")
                        } else {
                            _this.$netcode.getApiCode(reset)
                        }
                    }) 
                }else{
                    _this.$Message.error("未选择维修人员");
                }
                
            },
            back(){
                this.$router.back(-1);
            }
            // change(e){
                // var _this=this;
                // try{
                //     this.siteData.forEach((obj)=>{
                //         if (obj.id==e) {
                //             _this.workers=obj.list
                //             console.log(obj);
                //             foreach.break=new Error("stop");
                //         }
                //     })
                // }catch(e){
                //     if(e.message==="foreach is not defined") {
                //         return;
                //     }else throw e;
                // }
            // }
        }
    }
</script>
