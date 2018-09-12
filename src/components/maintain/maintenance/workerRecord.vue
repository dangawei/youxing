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
                    <h2>{{this.$route.query.workerName}}--维修记录列表</h2>
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
                            <Row>
                                <Col :xs="24" :sm="24" :md="24" :lg="24">
                                    <div class="">
                                        <Table border ref="selection" :columns="columnsdata" :data="data"
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
                    <Button type="primary"  @click="back()">返回</Button>
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
                workerNo:'',
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
                        title: '维修人员编号',
                        key: 'workerNo'
                    },
                    {
                        title: '维修车辆编号',
                        key: 'vehicleNo'
                    },
                    {
                        title: '故障类型',
                        key: 'faultTypeName',
                        render:(h,params)=>{
                            return h('div',[
                                h('span',params.row.faultRecordVO.faultTypeName)
                            ])
                        }
                    },
                    {
                        title: '分配维修时间',
                        key: 'startTime'
                    },
                    {
                        title: '维修结束时间',
                        key: 'endTime'
                    },
                    // {
                    //     title: '故障类型',
                    //     key: 'faultRecordId'
                    // },
                    {
                        title: '维修结果',
                        key: 'repairResult',
                        render: (h, params) => {
                            let str=""
                            switch (params.row.repairResult){
                                case 1:
                                    str="已修复"
                                    break;
                                case 2:
                                    str="修理中"
                                    break;
                                case 3:
                                    str="未修好"
                                    break;
                                case 4:
                                    str="已报废"
                                    break;
                            }
                            return h('div', [
                                h('span', str)
                            ])
                        }
                    },
                ],
                data: []
            }
        },
        created(){
            this.workerNo=this.$route.query.workerNo
            this.list();
            // console.log(this.$route.params.id)
        },
        methods: {
            list () {
                var listdata = {
                    "pageNum": this.pageData.pageCurrent,
                    "pageSize": this.pageData.pagesize,
                    // "repairResult": ,
                    // "vehicleNo": "mc12340001",
                    "workerNo": this.$route.query.workerNo
                }
                var _this =  this
                
                this.$api.post('/repairRecord/page',listdata,reset => {
                    if (reset.code === 0) {
                        _this.data=reset.data.data
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
            pageComponentDate (e) {
                var _this=this;
                this.pageData.pageCurrent = e.pageCurrent
                this.pageData.pagesize = e.pagesize
                this.list()
            },
            back(){
                this.$router.back(-1);
            }
        }
    }
</script>
