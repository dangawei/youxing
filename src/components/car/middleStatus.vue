<template>
  <div class="rule">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>车辆管理</BreadcrumbItem>
            <BreadcrumbItem to="/allocationed/car/list">已分配车辆列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>中控在线状态列表</h2>
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
                <!-- <Button type="primary" @click="returnCars">批量还车</Button> -->
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
    <return-car-component v-if="returnCarShow" :exportData="returnCarShow"></return-car-component>
  </div>
</template>
<script>
    import paging from "./../pub/page" 
    import returnCarComponent from "./returnCarComponent"
    import startDate from "@/components/pub/startDateCar"
    import endDate from "@/components/pub/endDateCar"
    import {vm} from "@/js/vm.js"
export default {
    components:{
        paging,
        returnCarComponent,
        startDate,
        endDate
    },
    data () {
        return {
            addshow:false,
            editshow:false,
            pageshow:true,
            returnCarShow:false,
            editData:{},
            formCustom:{
                vehicleNo:'',
                middleControlNo:'',
                importStartTime:'',
                importEndTime:'',
                vehicleModelId:'',
                expireStartTime:'',
                expireEndTime:'',
                subordinateName:''
            },
            account:'',
            accept:"appliction/json",
            middleArray:[],
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
                {
                    title: '中控编号',
                    key: 'middleControlNo'
                },
                {
                    title: '上线或离线时间',
                    key: 'onLineTime'
                },
                {
                    title: '状态',
                    key: 'onOffLine',
                    render: (h, params) => {
                        var str = "在线";
                        if (params.row.onOffLine== -1) {
                            str="离线"
                        }
                        return h('div', [
                            h('span', str)
                        ])
                    }
                }
            ],
            data: []
        }
    },
    created(){
        // var _this=this
        // console.log(1111);
        // vm.$on("eventName",function(e){
        //       var item = e || []            
        //       _this.list(item)
        // }) 
        this.list(this.$webapi.get("middleControlNo"))
    },
    mounted() {
        // vm.$on("eventName",function(e){
        //     console.log(e);
        // })
    },
    methods:{
        list(item){
            let _this=this;
            let data={
                list:JSON.parse(item),
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize
            }
            this.$api.post("/middle/page/log",data,result=>{
                if (result.code==0) {
                    _this.data=result.data.data
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount
                    _this.pageshow = true
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        pageComponentDate (e) { 
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        returnCar(){
            let _this=this;
            let data={
                "companyId": 12,
                "list": [],
                "parentId": 1
            }
            this.$api.post("/vehicle/return/company",data,result=>{
                if (result.code==0) {
                    _this.data=result.data.data
                    _this.pageData.pageCount = result.data.totalPage
                    _this.pageData.pagesize = result.data.pageSize
                    _this.pageData.totalCount = result.data.totalCount                    
                }else{
                    _this.$netcode.getApiCode(result)
                }
            }) 
        },
        returnCars(){
            this.$router.push("/branch/returncars")
        },
        handleSubmit (name) {
            this.pageshow = false
            this.pageData.pageCurrent = 1
            this.list()
        },
        startExport(e){
            this.formCustom.expireStartTime=e
        },
        endExport(e){
            this.formCustom.expireEndTime=e
        },
    }
  }
</script>
