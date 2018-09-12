<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem to="/">首页</BreadcrumbItem>
			<BreadcrumbItem>车辆管理</BreadcrumbItem>
			<BreadcrumbItem>分公司租用即将到期列表</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>分公司租用即将到期列表</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
                <Form :model="formCustom" :label-width="100">
                    <Row>
                        <Col :xs="24" :sm="24" :md="8" :lg="5">
                            <FormItem label="车辆编号" prop="vehicleNo">
                                <Input type="text" v-model="formCustom.vehicleNo"></Input>
                            </FormItem>
                        </Col>
                        <!-- <Col :xs="24" :sm="24" :md="8" :lg="5">
                            <FormItem label="车辆类型" prop="vehicleModelId">
                                <Select v-model="formCustom.vehicleModelId">
                                    <Option value="" key="">全部</Option>
                                    <Option :value="2" :key="2">二轮车</Option>
                                    <Option :value="3" :key="3">三轮车</Option>
                                </Select>
                            </FormItem>
                        </Col> -->
                        <Col :xs="24" :sm="24" :md="8" :lg="5">
                            <FormItem label="归属分公司" prop="subordinateName">
                                <Input type="text" v-model="formCustom.subordinateName"></Input>
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
			    <Button type="primary" @click="returnCars">批量还车</Button>
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
            header:{
                // 'Content-Type': 'multipart/form-data'
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
                    title: '已分配分公司名称',
                    key: 'subordinateName',
                    render: (h, params) => {
                        return h('div', [
                            h('span',params.row.subordinateName)
                        ])
                    }
                },
                {
                    title: '开始租用时间',
                    key: 'rentTime',
                    render: (h, params) => {
                        return h('div', [
                            h('span',params.row.rentTime)
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
                {
                    title: '剩余租期时间',
                    key: 'days',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.days)
                        ])
                    }
                },
                {
                    title: '真实还车时间',
                    key: 'trueReturnTime',
                    render: (h, params) => {
                        var str = params.row.trueReturnTime;
                        if (str==null) {
                            str="未还"
                        }
                        return h('div', [
                            h('span', str)
                        ])
                    }
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     align: 'center',
                //     render: (h, params)=> {
                //         return h('div',[
                //             h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     // size: 'small'
                //                 },
                //                 style: {
                //                     marginRight: '5px',
                //                     color:'#fff'
                //                 },
                //                 on: {
                //                     click: () => {
                //                        this.returnCar(params.row) 
                //                     }
                //                 }
                //             }, '还车')
                //         ]);
                //     }
                // }
            ],
            data: []
        }
    },
    created(){
        this.header.token = this.$webapi.get("token");
        this.companyId=this.$webapi.get("companyId")
    },
    mounted() {
      	this.list()
    },
    methods:{
    	list(){
    		let _this=this;
    		let data={
                companyId: _this.$webapi.get("companyId"),
                pageNum:_this.pageData.pageCurrent,
                pageSize:_this.pageData.pagesize,
                type: 3,
                vehicleNo:_this.formCustom.vehicleNo,
                flag:1
    		}
            if (this.formCustom.vehicleNo) {
                data.vehicleNo=this.formCustom.vehicleNo
            }
            if (this.formCustom.middleControlNo) {
                data.middleControlNo=this.formCustom.middleControlNo
            }
            if (this.formCustom.subordinateName) {
                data.subordinateName=this.formCustom.subordinateName
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
    		this.$api.post("/vehicle/rent/immediately/expire",data,result=>{
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
