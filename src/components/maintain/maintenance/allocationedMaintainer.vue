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
                    <h2>{{siteNo}} 维修人员列表</h2>
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
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:300,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'default'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                path:"/worker/record/"+params.row.id,
                                                query:{
                                                    workerNo:params.row.workerNo,
                                                    workerName:params.row.name
                                                }
                                            })
                                        }
                                    }
                                }, '维修详情'),
                            ]);
                        }
                    }
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
                    "pageSize": this.pageData.pagesize,
                    "siteId": this.$route.params.id,
                }
                var _this =  this
                this.$api.post('/repairWorker/page/bySite',listdata,reset => {
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
        }
    }
</script>
