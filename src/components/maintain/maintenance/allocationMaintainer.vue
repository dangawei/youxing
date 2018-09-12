<template>
    <div class="rule">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem>维修管理</BreadcrumbItem>
                <BreadcrumbItem to="/maintenance/list">维修站点列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>给 {{siteNo}} 分配维修人员</h2>
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
                        <Button type="primary"  @click="sure()">确定分配</Button>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                    <div class="pagelist">
                        <div class="pagelist-hd">
                            <span>选择配置维修人员</span>
                        </div>
                        <div class="pagelist-bd">
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                    <div class="">
                                        <Table border ref="selection" :columns="columnsdata" :data="data"
                                            @on-select-cancel="selectCancel"
                                            @on-selection-change="selectChange"
                                            @on-select-all="allChange"
                                        ></Table>
                                        <div class="mt20">
                                            <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div style="text-align:center;margin-bottom:15px;">
                    <!-- <Button type="primary"  @click="sure()">确定分配</Button> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import paging from "@/components/pub/page"
    export default {
        components:{
            paging,
        },
        data () {
            return {
                maintenanceNo:'',
                // 分页
                pageData:{
                    //分页数
                    arrPageSize:[5,10,15,20],
                    //分页大小
                    pagesize:15,
                    //总分页数
                    pageCount:1,
                    //当前页面
                    pageCurrent:1,
                    //总数
                    totalCount:10
                },
                pageshow:false,
                // 选择车辆
                selectCar:[],
                startDates:"",
                endDates:"",
                allCar:[],
                columnsdata: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '身份编号',
                        key: 'idCard'
                    },
                    {
                        title: '手机',
                        key: 'phone'
                    },
                    {
                        title: '工号',
                        key: 'workerNo'
                    },
                ],
                data: []
            }
        },
        created(){
            this.siteNo=this.$route.query.siteNo
            this.list();
            // console.log(this.$route.params.id)
        },
        methods: {
            list(){
                var listdata = {
                    "pageNum": this.pageData.pageCurrent,
                    "pageSize": this.pageData.pagesize
                }
                var _this =  this
                this.$api.post('/repairWorker/page/unallot',listdata,reset => {
                    if (reset.code === 0) {
                        var data  =  reset.data.data
                        if(_this.selectCar.length>0){
                            if (data!=null) {
                                data.forEach( (obj) =>{
                                    _this.selectCar.forEach((a)=>{
                                        var idx=0;
                                        if (obj.vehicleId==a) {
                                            obj._checked= true
                                        }
                                    })
                                }) 
                            }
                            
                        }
                        if (data==null) {
                            _this.data=[]
                        }else{
                            _this.data=data
                        }
                        _this.pageData.pageCount = reset.data.totalPage
                        _this.pageData.pagesize = reset.data.pageSize
                        _this.pageData.totalCount = reset.data.totalCount
                        _this.pageData.pageCurrent = reset.data.currentPage
                        _this.pageshow=true
                    } else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            selectCancel(all,opa){
                var _this=this;
                this.selectCar.forEach(function(obj,j){
                    if (obj==opa.id) {
                        _this.selectCar.splice(j,1);
                    }
                })
            },
            allChange(opa){
                var _this=this;
                if (opa) {
                    this.allCar=[];
                    this.allCar=opa;
                }
            },
            // 选中项事件
            selectChange(e){
                var result=[];
                var reset = this.selectCar.concat();
                var _this=this; 
                if(reset.length>0){
                    if (e.length==0) {
                        // var resetBox=reset.concat();
                        reset.forEach(function(obj,j){
                            var flag=true;
                            _this.allCar.forEach(function(a,b){
                                if (obj==a.id) {
                                    // resetBox.splice(j,1);
                                    // delete reset[j];
                                    flag=false;
                                }
                            })
                            if (flag) {
                                result.push(reset[j]);
                            }
                        })
                        reset=result.concat();
                    }else{
                       e.forEach(function(obj){
                            var idx = 0
                            reset.forEach((b) =>{
                                if(b == obj.id) {
                                    idx = 1
                                }
                            })
                            if(idx ==0){
                                reset.push(obj.id)
                            }
                        })
                    }
                }else{
                    e.forEach(function(obj){
                        reset.push(obj.id)
                    })   
                }
                // console.log(reset)
                _this.selectCar = reset.concat()
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            pageComponentDate (e) {
                var _this=this;
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            sure(){
                let _this=this;
                if (_this.selectCar.length!=0) {
                    let data={
                        "siteId": this.$route.params.id,
                        "list": _this.selectCar
                    }
                    this.$api.post("/RepairWorkerSite/allot",data,result=>{
                        if (result.code==0) {
                            _this.$Message.success('分配成功');
                            _this.$router.push("/maintenance/list")                   
                        }else{
                            _this.$netcode.getApiCode(result)
                        }
                    })
                }else{
                    this.$Message.warning('没有选择配置人员!');
                }
                
            },
            startDate(e){
                this.startDates=e
            },
            endDate(e){
                this.endDates=e
            }
        }
    }
</script>
