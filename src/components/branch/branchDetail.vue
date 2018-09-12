<template>
<div>
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
              <BreadcrumbItem to="/">首页</BreadcrumbItem>
              <BreadcrumbItem>分公司管理</BreadcrumbItem>
              <BreadcrumbItem to="/branch/list">分公司列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>{{this.$route.query.branchName}}详情</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-view allm20">
            <div class="page-view-body">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120">
                <div class="pagelist">
                    <div class="pagelist-hd">基本信息</div>
                    <div class="pagelist-bd" v-if="baseInfoShow">
                        <Row>
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                                <FormItem label="公司名:" prop="name">
                                    <p>{{formItem.baseInfo.name}}</p>
                                </FormItem>
                            </Col>
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                                <FormItem label="电话:" prop="telephone">
                                    <p>{{formItem.baseInfo.telephone}}</p>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :xs="24" :sm="24" :md="8" :lg="8">
                                <FormItem label="地址:" prop="address">
                                    <p>{{formItem.baseInfo.address}}</p>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div class="page-divider page-divider-horizontal "></div>
                <div class="pagelist">
                    <div class="pagelist-hd">下属经销商列表</div>
                    <div class="pagelist-bd" v-if="dealerShow">
                        <div class="">
                            <i-table border :columns="columnsdata" :data="dealerArray"></i-table>
                            <div class="mt20">
                                <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="page-divider page-divider-horizontal "></div>
                <div class="pagelist">
                    <div class="pagelist-hd">拥有车辆列表</div>
                    <div class="pagelist-bd" v-if="carShow">
                        <div class="">
                            <i-table border :columns="columnsCar" :data="carArray"></i-table>
                            <div class="mt20">
                                <paging :pageData="pageDataCar" @pageComponentDate="pageCar" v-if="pageCarShow"></paging>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align:center;margin-bottom:15px;">
                    <Button type="primary"  @click="back()">返回</Button>
                </div>
            </Form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Pages from '@/components/pub/page.vue'
export default {
  name: 'index',
  components: {
    Paging:Pages,
  },
    created() {
    },
    data () {
        return {
            baseInfoShow:false,
            dealerShow:false,
            carShow:false,
            pageshow:false,
            pageCarShow:false,
            formItem: {},
            detailData:[],
            carArray:[],
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
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                    display:str
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            path:"/branch/dealer/car/"+params.row.id,
                                            query:{
                                                dealerName:params.row.name
                                            }
                                        })
                                    }
                                }
                            }, '拥有车辆'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                    display:str
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            path:"/bduser/list/"+params.row.parentId+"/"+params.row.id,
                                            query:{
                                                dealerName:params.row.name
                                            }
                                        })
                                    }
                                }
                            }, '查看人员'),
                        ]);
                    }
                }
            ],
            columnsCar: [
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
                    key: 'middleControlNo',
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
                    title: '已分配经销商名称',
                    key: 'subordinateName',
                    render: (h, params) => {
                        return h('div', [
                            h('span',params.row.subordinateName)
                        ])
                    }
                },
                {
                    title: '车辆类型(轮)',
                    key: 'vehicleModelId',
                    render: (h, params) => {
                        // var str=''
                        // if (params.row.vehicleState==1) {
                        //     str="未分配"
                        // }
                        return h('div', [
                            h('span', params.row.vehicleModelId)
                        ])
                    }
                },
                {
                    title: '租用开始时间',
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
                        // var str = this.$webapi.gettime('date',(params.row.createdAt)/1000)
                        return h('div', [
                            h('span', params.row.returnTime)
                        ])
                    }
                },
            ],
        }
    },
    mounted(){
        this.getBranchInfo()
        this.getDealerArray();
        this.getCarArray();
    },
    methods: {
        getBranchInfo () {
            let _this = this
            let datas={
                name: this.$route.query.branchName,
                pageNum: 1,
                pageSize: 1,
                parentId: this.$webapi.get("companyId"),
            }
            this.$api.post("/company/page", datas, reset => {
                if (reset.code === 0) {
                    // _this.$Message.success("!");
                    _this.formItem.baseInfo=reset.data.data[0]
                    _this.baseInfoShow=true
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        getDealerArray(){
            let _this=this;
            let req={
                "pageNum": this.pageData.pageCurrent,
                "pageSize": this.pageData.pagesize,
                "parentId": this.$route.params.companyId
            }
            this.$api.post("/company/page",req,result=>{
                if (result.code==0) {
                    _this.dealerArray=result.data.data
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount
                    _this.dealerShow=true;
                    _this.pageshow=true;
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        getCarArray(){
            let _this=this;
            let data={
                companyId: this.$route.params.companyId,
                pageNum:this.pageDataCar.pageCurrent,
                pageSize:this.pageDataCar.pagesize,
                flag :2
            }
            this.$api.post("/vehicle/page/company",data,result=>{
                if (result.code==0) {
                    _this.carArray=result.data.data
                    _this.pageDataCar.pageCount = result.data.totalPage
                    _this.pageDataCar.pagesize = result.data.pageSize
                    _this.pageDataCar.totalCount = result.data.totalCount
                    _this.carShow=true
                    _this.pageCarShow = true                         
                }else if (result.code==9) {
                    _this.carArray=[]
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        pageComponentDate (e) {
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.getDealerArray()
        },
        pageCar(e) {
            this.pageDataCar.pageCurrent = e.pageCurrent
            this.pageDataCar.pagesize = e.pagesize
            this.getCarArray()
        },
        back(){
            this.$router.back(-1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
