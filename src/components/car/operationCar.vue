<template>
    <div class="rule">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem to="/allocationed/car/list">已分配车辆</BreadcrumbItem>
                <BreadcrumbItem>批量操作车辆</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>批量操作车辆</h2>
                </div>
            </div>
        </div>
        <div class="page-component-view">
            <div class="page-component-bd">
                <!--查询条件-->
                <div class="tableListForm">
                    
                </div>
                <!--操作按钮-->
                <div class="tableListOperator" style="text-align:right;">
                    <Button type="primary"  @click="sure()">确定操作</Button>
                </div>
                <div class="page-view-body">
                    <div class="pagelist">
                        <div class="pagelist-hd">
                            <span>请选择操作</span>
                        </div>
                        <div class="pagelist-bd">
                            <action @exportData="actionType"></action>
                        </div>
                    </div>
                    <div class="page-divider page-divider-horizontal "></div>
                    <div class="pagelist">
                        <div class="pagelist-hd">
                            <span>请选择车辆</span>
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
            </div>
        </div>
    </div>
</template>
<script>
    import paging from "@/components/pub/page"
    import getBranch from "@/components/pub/getBranch"
    import Action from "@/components/pub/action"
    export default {
        components:{
            getBranch,
            paging,
            Action
        },
        data () {
            return {
                dealerName:'',
                dealerId:'',
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
                        title: '中控编号',
                        key: 'middleControlNo'
                    },
                    {
                        title: '车辆状态',
                        key: 'state',
                        render:(h, params) => {
                            var str="使用中"
                            if (params.row.state==2) {
                                str="故障中"
                            }
                            return h('div', [
                                h('span',str)
                            ])
                        }
                    },
                    {
                        title: '起租时间',
                        key: 'rentTime',
                        render: (h, params) => {
                            // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                            return h('div', [
                                h('span', params.row.rentTime)
                            ])
                        }
                    },
                    {
                        title: '到期时间',
                        key: 'returnTime',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.returnTime)
                            ])
                        }
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
                    companyId: parseInt(_this.$webapi.get("companyId")),
                    pageNum:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                    status:2,
                    flag :1
                }
                this.$api.post("/vehicle/page/company",req,result=>{
                    if (result.code==0) {
                        var data  =  result.data.data 
                        if(_this.selectCar.length>0){
                            data.forEach( (obj) =>{
                                // if (obj.state==2) {
                                //     obj._disabled=true
                                // }
                                _this.selectCar.forEach((a)=>{
                                    var idx=0;
                                    if (obj.middleControlNo==a) {
                                        obj._checked= true
                                    }
                                })
                            }) 
                        }else{
                            // data.forEach((obj)=>{
                            //     if (obj.state==2) {
                            //         obj._disabled=true
                            //     }
                            // })
                        }
                        _this.data = data.concat()
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
                    if (obj==opa.middleControlNo) {
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
                                if (obj==a.middleControlNo) {
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
                                if(b == obj.middleControlNo) {
                                    idx = 1
                                }
                            })
                            if(idx ==0){
                                reset.push(obj.middleControlNo)
                            }
                        })
                    }
                }else{
                    e.forEach(function(obj){
                        reset.push(obj.middleControlNo)
                    })   
                }
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
                let data={
                    actionNo:this.actionNo,
                    list: this.selectCar
                }
                if (_this.selectCar.length>0) {
                    this.$api.post("/vehicle/operation/batch/action",data,result=>{
                        if (result.code==0) {
                            _this.$Message.success('指令发送成功');
                            // _this.$router.back(-1);
                        }else{
                            _this.$netcode.getApiCode(result)
                        }
                    })
                }else{
                    _this.$Message.error('未选择操作车辆!'); 
                }
            },
            exportData(e){
                this.branchId=e.id;
                this.list();
            },
            actionType(e){
               this.actionNo=e
            }
        }
    }
</script>
<style scoped>
    
</style>