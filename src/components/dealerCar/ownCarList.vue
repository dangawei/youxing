<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>车辆管理</BreadcrumbItem>
			<BreadcrumbItem>已分配车辆列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>已分配车辆列表</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
			    <Form :model="formCustom" :label-width="100">
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="车辆编号" prop="vehicleNo">
                                <Input type="text" v-model="formCustom.vehicleNo"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="中控编号" prop="middleControlNo">
                                <Input type="text" v-model="formCustom.middleControlNo"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="车辆类型" prop="vehicleModelId">
                                <Select v-model="formCustom.vehicleModelId">
                                    <Option value="" key="">全部</Option>
                                    <Option :value="2" :key="2">二轮车</Option>
                                    <Option :value="3" :key="3">三轮车</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem label="归属用户名" prop="customerName">
                                <Input type="text" v-model="formCustom.customerName"></Input>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="出租的开始时间 ">
                                <start-date @exportDate="startExport"></start-date>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="8">
                            <FormItem label="出租的到期时间 ">
                                <end-date @exportDate="endExport"></end-date>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :sm="24" :md="8" :lg="6">
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
			  <!-- <Button type="primary"  @click="add()">导入车辆信息(excel)</Button> -->
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
        <div>
           <add-fault-car v-if="importShow" :importShow="importShow" :importData="importData" @exportShow="exportShow"></add-fault-car>
        </div>
    </div>
  </div>
</template>
<script>
    import paging from "./../pub/page"
    import addFaultCar from './addFaultCar.vue'
    import startDate from "@/components/pub/startDateCar"
    import endDate from "@/components/pub/endDateCar" 
export default {
    components:{
        paging,
        addFaultCar,
        startDate,
        endDate
    },
    data () {
        return {
            importShow:false,
            importData:"",
            pageshow:true,
            editData:{},
            formCustom:{
                vehicleNo:'',
                middleControlNo:'',
                importStartTime:'',
                importEndTime:'',
                vehicleModelId:'',
                expireStartTime:'',
                expireEndTime:'',
                customerName:''
            },
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
                            h('span',params.row.returnTime)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:220,
                    render: (h, params) => {
                        var str=false
                        if (params.row.state==2) {
                            str=true
                        }
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    disabled:str
                                },
                                style: {
                                    marginRight: '5px',
                                },
                                on: {
                                    click: () => {
                                        this.reportFault(params.row);
                                    }
                                }
                            },"故障上报")
                        ])
                    }
                },
            ],
            data: []
        }
    },
    mounted() {
      	this.list()
    },
    methods:{
        list(){
            let _this=this;
            let data={
                companyId: parseInt(_this.$webapi.get("companyId")),
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
                status:2,
                flag :3
            }
            if (this.formCustom.vehicleNo) {
                data.vehicleNo=this.formCustom.vehicleNo
            }
            if (this.formCustom.middleControlNo) {
                data.middleControlNo=this.formCustom.middleControlNo
            }
            if (this.formCustom.customerName) {
                data.customerName=this.formCustom.customerName
            }
            if (this.formCustom.expireStartTime) {
                data.expireStartTime=this.formCustom.expireStartTime+" 00:00:00"
            }
            if (this.formCustom.expireEndTime) {
                data.expireEndTime=this.formCustom.expireEndTime+" 00:00:00"
            }
            if (this.formCustom.vehicleModelId) {
                data.vehicleModelId=this.formCustom.vehicleModelId
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
        pageComponentDate (e) { 
            this.pageData.pageCurrent = e.pageCurrent
            this.pageData.pagesize = e.pagesize
            this.list()
        },
        exportShow(e){
            this.importShow=e.show
            this.list();
        },
        returnCar(e){
            let _this=this;
            let data={
                "companyId":this.$webapi.get("companyId"),
                "vehicleNo": e.vehicleNo
            }
            this.$api.post("/vehicle/return/customer",data,result=>{
                if (result.code==0) {
                    _this.$Message.success("还车成功!")
                    _this.list();
                }else{
                    _this.$netcode.getApiCode(result)
                }
            })
        },
        reportFault(e){
            this.importShow=true;
            this.importData=e;
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
