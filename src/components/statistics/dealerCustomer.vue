<template>
  <div class="rule">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
            <BreadcrumbItem to="/home">首页</BreadcrumbItem>
            <BreadcrumbItem>统计管理</BreadcrumbItem>
            <BreadcrumbItem to="/statistics/customer">经销商用户统计</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>经销商用户统计</h2>
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
            <Row>
                <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="">
                        <Table border :columns="columnsdata" :data="data"></Table>
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
    import customerExpand from "./customerExpand"
export default {
    components:{
        paging,
        customerExpand
    },
    data () {
        return {
            pageshow:true,
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
            columnsdata: [
                // {
                //     type: 'expand',
                //     width: 100,
                //     render: (h, params) => {
                //         return h(customerExpand, {
                //             props: {
                //                 row: params.row
                //             }
                //         })
                //     }
                // },
                {
                    title: '用户账号',
                    key: 'loginName',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.loginName)
                        ])
                    }
                },
                {
                    title: '用户名',
                    key: 'customerName',
                    render:(h,params)=>{
                        var info=params.row.customerInfo
                        var str=''
                        if (info==null) {
                            str=''
                        }else{
                            str=params.row.customerInfo.customerName
                        }
                        return h('div',[
                            h("span",str)
                        ])
                    }
                },
                {
                    title: '所属分公司',
                    key: 'companyName',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.companyName)
                        ])
                    }
                },
                {
                    title: '所属经销商',
                    key: 'companyTwoName',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.companyTwoName)
                        ])
                    }
                },
                {
                    title: '电话',
                    key: 'mobilePhone',
                    render:(h,params)=>{
                        var info=params.row.customerInfo
                        var str=''
                        if (info==null) {
                            str=''
                        }else{
                            str=params.row.customerInfo.mobilePhone
                        }
                        return h('div',[
                            h("span",str)
                        ])
                    }
                },
                {
                    title: '骑行公里数',
                    key: 'mileage'
                },
                {
                    title: '租车时长',
                    key: 'rentVehicleTime'
                },
            ],
            data: []
        }
    },
    created(){
        this.list()
    },
    mounted() {
        
    },
    methods:{
        list(){
            let _this=this;
            let req={
                companyId:Number.parseInt(this.$webapi.get("companyId")),
                pageNum: this.pageData.pageCurrent,
                pageSize: this.pageData.pagesize,
                flag:3
            }
            this.$api.post("/statistics/customer/page",req,result=>{
                if (result.code==0) {
                    _this.data=result.data.data
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount
                    _this.pageData.pageCurrent = result.data.currentPage
                    _this.pageshow=true;
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        pageComponentDate (e) { 
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        }
    }
  }
</script>
