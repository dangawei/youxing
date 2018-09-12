<template>
    <div class="rule">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>经销商管理</BreadcrumbItem>
                <BreadcrumbItem to="/dealer/list">经销商列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>{{dealerName}} 车辆分配</h2>
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
                    
                </div>
                <div class="page-view-body">
                    <div class="pagelist">
                        <div class="pagelist-hd">选择配置时间</div>
                        <div class="pagelist-bd">
                            <Form>
                            <Row>
                                <Col :xs="24" :sm="24" :md="12" :lg="12">
                                    <div class="textIndent">
                                        <FormItem label="配置起始时间:" prop="branchName">
                                            <start-date @exportDate="startDate"></start-date>
                                        </FormItem>
                                    </div>
                                </Col>
                                <Col :xs="24" :sm="24" :md="12" :lg="12">
                                    <div class="textIndent">
                                        <FormItem label="还车时间:" prop="branchName">
                                            <end-date @exportDate="endDate"></end-date>
                                        </FormItem>
                                    </div>
                                </Col>
                            </Row>
                            </Form>
                        </div>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                    <div class="pagelist">
                        <div class="pagelist-hd">
                            <span>选择配置车辆</span>
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
                    <Button type="primary"  @click="sure()">确定分配</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import paging from "@/components/pub/page"
    import startDate from "@/components/pub/startDate"
    import endDate from "@/components/pub/endDate"
    export default {
        components:{
            startDate,
            endDate,
            paging
        },
        data () {
            return {
                dealerName:'',
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
                selectCar:[],
                startDates:"",
                endDates:"",
                pageshow:false,
                columnsdata: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '车辆编号',
                        key: 'vehicleNo'
                    },
                    {
                        title: '分配给分公司时间',
                        key: 'prentRentTime'
                    },
                    {
                        title: '到期时间',
                        key: 'prentReturnTime'
                    },
                ],
                data: []
            }
        },
        created(){
            this.dealerName=this.$route.query.dealerName
            this.list();
        },
        methods: {
            list(){
                let _this=this;
                let req={
                    "companyId": this.$route.params.branchId,
                    "pageNum": this.pageData.pageCurrent,
                    "pageSize": this.pageData.pagesize,
                    "status": 1
                }
                this.$api.post("/vehicle/page/branchCompany",req,result=>{
                    if (result.code==0) {
                        var data  =  result.data.data 
                        if(_this.selectCar.length>0){
                            data.forEach( (obj) =>{
                                _this.selectCar.forEach((a)=>{
                                    var idx=0;
                                    if (obj.vehicleId==a) {
                                        obj._checked= true
                                    }
                                })
                            }) 
                        }
                        _this.data = data
                        _this.pageData.pageCount = result.data.totalPage
                        _this.pageData.pagesize = result.data.pageSize
                        _this.pageData.totalCount = result.data.totalCount
                        _this.pageshow = true                    
                    }else{
                        _this.$netcode.getApiCode(result)
                    }
                })
            },
            selectCancel(all,opa){
                var _this=this;
                this.selectCar.forEach(function(obj,j){
                    if (obj==opa.vehicleId) {
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
                                if (obj==a.vehicleId) {
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
                                if(b == obj.vehicleId) {
                                    idx = 1
                                }
                            })
                            if(idx ==0){
                                reset.push(obj.vehicleId)
                            }
                        })
                    }
                }else{
                    e.forEach(function(obj){
                        reset.push(obj.vehicleId)
                    })   
                }
                // console.log(reset)
                _this.selectCar = reset.concat()
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            pageComponentDate (e) { 
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            sure(){
                let _this=this;
                var start=new Date(this.startDates).getTime()
                var end=new Date(this.endDates).getTime()
                let data={
                    "parentId":parseInt(this.$route.params.branchId),
                    "companyId": parseInt(this.$route.params.dealerId),
                    "list": _this.selectCar,
                    "rentTime": this.startDates+" 00:00:00",
                    "returnTime": this.endDates+" 00:00:00"
                }
                if (_this.selectCar.length>0) {
                    if (this.startDates) {
                        if (end>=start) {
                            this.$api.post("/vehicle/allot/company_two",data,result=>{
                                if (result.code==0) {
                                    _this.$Message.success('分配成功');
                                    _this.$router.back(-1);
                                }else{
                                    _this.$netcode.getApiCode(result)
                                }
                            })
                        }else{
                            _this.$Message.error('还车配置时间有误!');
                        }
                    }else{
                        _this.$Message.error('配置起始时间不能为空!');
                    }
                    
                }else{
                    _this.$Message.error('未选择配置车辆'); 
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
<style scoped>
    
</style>