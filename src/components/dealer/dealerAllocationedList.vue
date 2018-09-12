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
                    <h2>{{dealerName}}已拥有车辆</h2>
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
                    <Button type="primary" @click="sure()">去还车</Button>
                </div>
                <Row>
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                        <div class="">
                            <Table border ref="selection" :columns="columnsdata" :data="data"></Table>
                            <div class="mt20">
                                <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
    import paging from "./../pub/page"
    export default {
        components:{
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
                columnsdata: [
                    {
                        title: '车辆编号',
                        key: 'vehicleNo'
                    },
                    {
                        title: '车辆名称',
                        key: 'vehicleName'
                    },
                    {
                        title: '中控编号',
                        key: 'vehicleState',
                        render: (h, params) => {
                            // var str=''
                            // if (params.row.vehicleState==1) {
                            //     str="未分配"
                            // }
                            return h('div', [
                                h('span',params.row.middleControlNo)
                            ])
                        }
                    },
                    {
                        title: '分配骑手名称',
                        key: 'customerName'
                    },
                    {
                        title: '车辆类型(轮)',
                        key: 'vehicleModelId',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.vehicleModelId)
                            ])
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            var str="使用中"
                            if (params.row.state==2) {
                                str="故障中"
                            }
                            return h('div', [
                                h('span', str)
                            ])
                        }
                    },
                    {
                        title: '分配给用户时间',
                        key: 'createAt',
                        render: (h, params) => {
                            // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                            return h('div', [
                                h('span', params.row.createAt)
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
            // console.log(this.$route.params.id)
        },
        methods: {
            list(){
                // let _this=this;
                // let req={
                //     "companyId": this.$route.params.id,
                //     "pageNum": this.pageData.pageCurrent,
                //     "pageSize": this.pageData.pagesize
                // }
                // this.$api.post("/vehicle/page/dealer",req,result=>{
                //     if (result.code==0) {
                //         _this.data  =  result.data.data
                //         _this.pageData.pageCount = result.data.totalPage
                //         _this.pageData.pagesize = result.data.pageSize
                //         _this.pageData.totalCount = result.data.totalCount
                //         _this.pageshow = true                    
                //     }else{
                //         _this.$netcode.getApiCode(result)
                //     }
                // })
                let _this=this;
                let data={
                    companyId: this.$route.params.id,
                    pageNum:_this.pageData.pageCurrent,
                    pageSize:_this.pageData.pagesize,
                    flag :3
                }
                this.$api.post("/vehicle/page/company",data,result=>{
                    if (result.code==0) {
                        _this.data=result.data.data
                        _this.pageData.pageCount = result.data.totalPage
                        _this.pageData.pagesize = result.data.pageSize
                        _this.pageData.totalCount = result.data.totalCount
                        _this.pageshow = true                      
                    }else if (result.code==9) {
                        _this.data=[]
                    }else{
                        _this.$netcode.getApiCode(result)
                    }
                })
            },
            selectCancel(all,opa){
                var _this=this;
                this.selectCar.forEach(function(obj,j){
                    if (obj==opa.vehicleNo) {
                        _this.selectCar.splice(j,1);
                    }
                })
            },
            pageComponentDate (e) {
                var _this=this;
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            sure(){
                this.$router.push("/dealer/return/"+this.$route.params.id)
            }
        }
    }
</script>
