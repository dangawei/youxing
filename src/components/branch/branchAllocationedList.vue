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
                    <h2>{{branchName}}已拥有车辆</h2>
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
            <!-- <add-admin :addshow="addshow" @addShowComponent="ashow" v-if="addshow"></add-admin>
            <edit-admin :editshow="editshow" :editData="editData" @editShowComponent="eshow" v-if="editshow"></edit-admin> -->
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
                        title: '创建时间',
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
                    "companyId": this.$route.params.id,
                    "pageNum": this.pageData.pageCurrent,
                    "pageSize": this.pageData.pagesize
                }
                this.$api.post("/vehicle/page/branchCompany",req,result=>{
                    if (result.code==0) {
                        _this.data  =  result.data.data
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
            }
        }
    }
</script>
