<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem>维修管理</BreadcrumbItem>
              <BreadcrumbItem to="/maintenance/list">维修站点列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>{{this.$route.query.siteName}}详情</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-view allm20">
            <div class="page-view-body">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120" label-position="left">
                <div class="pagelist">
                    <div class="pagelist-hd">基本信息</div>
                    <div class="pagelist-bd" v-if="baseInfoShow">
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="维修站点名:" prop="siteName">
                                    <p>{{formItem.baseInfo.siteName}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="维修站点编号:" prop="siteNo">
                                    <p>{{formItem.baseInfo.siteNo}}</p>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="经度:" prop="longitude">
                                    <p>{{formItem.baseInfo.longitude}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="纬度:" prop="latitude">
                                    <p>{{formItem.baseInfo.latitude}}</p>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="地址:" prop="address">
                                    <p>{{formItem.baseInfo.address}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="12">
                                <FormItem label="创建时间:" prop="createAt">
                                    <p>{{formItem.baseInfo.createAt}}</p>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div class="page-divider page-divider-horizontal "></div>
                <div class="pagelist">
                    <div class="pagelist-hd">关联经销商</div>
                    <div class="pagelist-bd" v-if="dealerShow">
                        <div class="">
                            <i-table border :columns="columnsdata" :data="dealerArray"></i-table>
                        </div>
                    </div>
                </div>
                <div class="page-divider page-divider-horizontal "></div>
                <div class="pagelist">
                    <div class="pagelist-hd">关联的维修人员</div>
                    <div class="pagelist-bd" v-if="maintainerShow">
                        <div class="">
                            <i-table border :columns="columnsMaintainer" :data="maintainerArray"></i-table>
                        </div>
                    </div>
                </div>
                <div style="text-align:center;margin-top:15px;">
                    <Button type="primary"  @click="back()">返回</Button>
                </div>
            </Form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// import Pages from '@/components/pub/page.vue'
export default {
    name: 'index',
    components: {
        // Paging:Pages,
    },
    created() {

    },
    data () {
        return {
            baseInfoShow:false,
            dealerShow:false,
            maintainerShow:false,
            pageshow:false,
            pagemaintainerShow:false,
            formItem: {},
            detailData:[],
            maintainerArray:[],
            dealerArray:[],
            ruleValidate: {

            },
            // 分页
            pageData:{
                //分页数
                arrPageSize:[5,10,15,20],
                //分页大小
                pagesize:5,
                //总分页数
                pageCount:1,
                //当前页面
                pageCurrent:1,
                //总数
                totalCount:10
            },
            // 分页
            pageDataCar:{
                //分页数
                arrPageSize:[5,10,15,20],
                //分页大小
                pagesize:5,
                //总分页数
                pageCount:1,
                //当前页面
                pageCurrent:1,
                //总数
                totalCount:10
            },
            columnsdata: [
                {
                    title: '经销商名字',
                    key: 'name',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.name)
                        ])
                    }
                },
                {
                    title: '地址',
                    key: 'address',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.address)
                        ])
                    }
                },
                {
                    title: '电话',
                    key: 'telephone',
                    render:(h,params)=>{
                        return h('div',[
                            h("span",params.row.telephone)
                        ])
                    }
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
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:280,
                    render: (h, params) => {
                        var str="inline-block"
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                    display:str
                                },
                                on: {
                                    click: () => {
                                        this.removeRelate(params.row)
                                    }
                                }
                            }, '取消关联'),
                        ]);
                    }
                }
            ],
            columnsMaintainer: [
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
        }
    },
    mounted(){
        this.getMaintenanceInfo()
        this.getDealerArray();
    },
    methods: {
        getMaintenanceInfo() {
            let _this = this
            let datas={
                id:this.$route.query.siteId
            }
            this.$api.post("/repairSite/getOne", datas, reset => {
                if (reset.code === 0) {
                    // _this.$Message.success("!");
                    _this.formItem.baseInfo=reset.data
                    _this.maintainerArray=reset.data.list
                    _this.baseInfoShow=true
                    _this.maintainerShow=true;
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        getDealerArray(){
            let _this=this;
            let req={
                siteId:this.$route.query.siteId
            }
            this.$api.post("/siteCompany/dealers/bySite",req,result=>{
                if (result.code==0) {
                    _this.dealerArray=result.data
                    _this.dealerShow=true;
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        // pageComponentDate (e) {
        //     this.pageData.pageCurrent = e.pageCurrent
        //     this.pageData.pagesize = e.pagesize
        //     this.getDealerArray()
        // },
        back(){
            this.$router.back(-1);
        },
        removeRelate(e){
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要取消关联吗?</p>',
                onOk: () => {
                   this.remove(e)
                },
                onCancel: () => {

                }
            });
        },
        remove(e){
            let _this=this;
            let req={
                id:e.id,
                parentId:e.parentId
            }
            this.$api.post("/siteCompany/cancelRelate",req,result=>{
                if (result.code==0) {
                    _this.getDealerArray();
                    _this.$Message.success("解除成功!")
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
