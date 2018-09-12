<template>
    <div class="rule">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem>分公司管理</BreadcrumbItem>
                <BreadcrumbItem to="/branch/list">分公司列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>{{branchName}}车辆分配</h2>
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
                    <Button type="primary"  @click="sure()">确定分配</Button>
                </div>
                <div class="page-view-body">
                    <div class="pagelist">
                        <div class="pagelist-hd">选择配置时间</div>
                        <div class="pagelist-bd">
                            <Form>
                            <Row>
                                <Col :xs="24" :sm="24" :md="12" :lg="12">
                                    <div class="textIndent">
                                        <FormItem label="配置时间:" prop="branchName">
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
                    <!-- <Button type="primary"  @click="sure()">确定分配</Button> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import paging from "./../pub/page"
    import startDate from "@/components/pub/startDate"
    import endDate from "@/components/pub/endDate"
    export default {
        components:{
            startDate,
            endDate,
            paging,
        },
        data () {
            return {
                branchName:'',
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
                        title: '车辆编号',
                        key: 'vehicleNo'
                    },
                    {
                        title: '导入时间',
                        key: 'createAt',
                        render: (h, params) => {
                            // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                            return h('div', [
                                h('span', params.row.createAt)
                            ])
                        }
                    }
                ],
                data: []
            }
        },
        created(){
            this.branchName=this.$route.query.branchName
            this.list();
            // console.log(this.$route.params.id)
        },
        methods: {
            list(){
                let _this=this;
                let req={
                    "pageNum": this.pageData.pageCurrent,
                    "pageSize": this.pageData.pagesize,
                    "status": 1
                }
                this.$api.post("/vehicle/page/headCompany",req,result=>{
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
                var _this=this;
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            sure(){
                let _this=this;
                var start=new Date(this.startDates).getTime()
                var end=new Date(this.endDates).getTime()
                let data={
                    "parentId":this.$webapi.get("companyId"),
                    "companyId": this.$route.params.id,
                    "list": _this.selectCar,
                    "rentTime": this.startDates+" 00:00:00",
                    "returnTime": this.endDates+" 00:00:00"
                }
                if (_this.selectCar.length>0) {
                    if (end>=start) {
                        this.$api.post("/vehicle/allot/company",data,result=>{
                            if (result.code==0) {
                                _this.$Message.success('分配成功');
                                _this.$router.push("/branch/list")                   
                            }else{
                                _this.$netcode.getApiCode(result)
                            }
                        })
                    }else{
                        _this.$Message.error('还车配置时间有误!');
                    }
                }else{
                    this.$Message.warning('没有选择配置车辆!');
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
